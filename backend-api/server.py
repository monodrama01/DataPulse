#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
后台管理系统 - 后端API服务
技术栈：Flask + MySQL + JWT认证
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import pymysql
import bcrypt
import json
import os
from datetime import datetime, timedelta
import logging
from werkzeug.utils import secure_filename
import uuid
import pathlib

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-in-production'  # 生产环境请更改
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# 启用CORS，允许前端访问
CORS(app)
jwt = JWTManager(app)

# JWT错误处理
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    logger.error("JWT令牌已过期")
    return jsonify({'error': '令牌已过期，请重新登录'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    logger.error(f"JWT令牌无效: {error}")
    return jsonify({'error': '令牌无效，请重新登录'}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    logger.error(f"缺少JWT令牌: {error}")
    return jsonify({'error': '缺少认证令牌，请先登录'}), 401

# 数据库连接配置（使用你提供的数据库信息）
DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'li441195092',  # 你的数据库密码
    'database': 'windows',      # 你的数据库名
    'charset': 'utf8mb4',
    'autocommit': True
}

# 文件上传配置
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'svg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 确保上传目录存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def get_db_connection():
    """获取数据库连接"""
    try:
        connection = pymysql.connect(**DB_CONFIG)
        return connection
    except Exception as e:
        logger.error(f"数据库连接失败: {e}")
        return None

def allowed_file(filename):
    """检查文件类型是否允许"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ==================== 认证相关API ====================

@app.route('/api/login', methods=['POST'])
def login():
    """管理员登录"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': '用户名和密码不能为空'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': '数据库连接失败'}), 500
            
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM admin_users WHERE username = %s", (username,))
        user = cursor.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            # 创建访问令牌 (确保identity是字符串)
            access_token = create_access_token(identity=str(user['id']))
            return jsonify({
                'message': '登录成功',
                'access_token': access_token,
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email']
                }
            })
        else:
            return jsonify({'error': '用户名或密码错误'}), 401
            
    except Exception as e:
        logger.error(f"登录错误: {e}")
        return jsonify({'error': '登录失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/verify-token', methods=['POST'])
@jwt_required()
def verify_token():
    """验证令牌有效性"""
    try:
        user_id = get_jwt_identity()
        logger.info(f"验证令牌，用户ID: {user_id}")
        
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, username, email FROM admin_users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if user:
            logger.info(f"令牌验证成功，用户: {user['username']}")
            return jsonify({'valid': True, 'user': user})
        else:
            logger.error(f"用户不存在，ID: {user_id}")
            return jsonify({'valid': False}), 401
            
    except Exception as e:
        logger.error(f"令牌验证错误: {e}")
        return jsonify({'valid': False}), 401
    finally:
        if 'conn' in locals():
            conn.close()

# 测试认证的简单端点
@app.route('/api/test-auth', methods=['GET'])
@jwt_required()
def test_auth():
    """测试认证端点"""
    try:
        user_id = get_jwt_identity()
        logger.info(f"认证测试成功，用户ID: {user_id}")
        return jsonify({'message': '认证成功', 'user_id': user_id}), 200
    except Exception as e:
        logger.error(f"认证测试失败: {e}")
        return jsonify({'error': '认证测试失败'}), 500

# ==================== Notes 文件管理（用于创建空笔记） ====================

@app.route('/api/notes/create', methods=['POST'])
@jwt_required()
def create_note_file():
    """创建一个新的Markdown笔记文件（content/notes/<slug>.md）"""
    try:
        data = request.get_json() or {}
        slug = (data.get('slug') or '').strip()
        title = (data.get('title') or '').strip()
        description = (data.get('description') or '').strip()

        if not slug:
            return jsonify({'error': '缺少slug'}), 400
        if not title:
            title = slug

        # 只允许简单安全的slug
        safe_slug = ''.join(c for c in slug if c.isalnum() or c in ('-', '_')).lower()
        if not safe_slug:
            return jsonify({'error': 'slug不合法'}), 400

        notes_dir = pathlib.Path(app.root_path).parent / 'content' / 'notes'
        notes_dir.mkdir(parents=True, exist_ok=True)
        note_file = notes_dir / f'{safe_slug}.md'

        if note_file.exists():
            return jsonify({'error': '同名笔记已存在'}), 409

        content = f"""---
title: {title}
description: {description}
publishedAt: {datetime.utcnow().strftime('%Y-%m-%d')}
updatedAt: {datetime.utcnow().strftime('%Y-%m-%d')}
tags: []
---

# {title}

这是新建的空白笔记，你可以在此处开始书写内容。
"""
        note_file.write_text(content, encoding='utf-8')
        return jsonify({'message': '创建成功', 'slug': safe_slug}), 201
    except Exception as e:
        logger.error(f"创建笔记失败: {e}")
        return jsonify({'error': '创建笔记失败'}), 500

# ==================== 文本内容管理API ====================

@app.route('/api/texts', methods=['GET'])
@jwt_required()
def get_texts():
    """获取文本内容列表"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        page_path = request.args.get('page_path', '')
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': '数据库连接失败'}), 500
            
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # 构建查询条件
        where_clause = "WHERE 1=1"
        params = []
        if page_path:
            where_clause += " AND page_path = %s"
            params.append(page_path)
        
        # 获取总数
        cursor.execute(f"SELECT COUNT(*) as total FROM content_texts {where_clause}", params)
        total = cursor.fetchone()['total']
        
        # 获取分页数据
        offset = (page - 1) * per_page
        cursor.execute(f"""
            SELECT * FROM content_texts {where_clause} 
            ORDER BY updated_at DESC 
            LIMIT %s OFFSET %s
        """, params + [per_page, offset])
        
        texts = cursor.fetchall()
        
        return jsonify({
            'data': texts,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        })
        
    except Exception as e:
        logger.error(f"获取文本列表错误: {e}")
        return jsonify({'error': '获取数据失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/texts', methods=['POST'])
@jwt_required()
def create_text():
    """创建文本内容"""
    try:
        data = request.get_json()
        logger.info(f"收到文本创建请求: {data}")
        
        if not data:
            logger.error("请求数据为空")
            return jsonify({'error': '请求数据为空'}), 400
        
        # 验证必需字段
        required_fields = ['position_key']
        for field in required_fields:
            if field not in data or not data[field]:
                logger.error(f"缺少必需字段: {field}, 收到的数据: {data}")
                return jsonify({'error': f'缺少必需字段: {field}'}), 400
        
        # 设置默认值
        if not data.get('title'):
            data['title'] = f"文本-{data['position_key']}"
        if not data.get('content'):
            data['content'] = ''
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # 使用 ON DUPLICATE KEY UPDATE 来处理位置键重复的情况
        cursor.execute("""
            INSERT INTO content_texts (position_key, title, content, page_path, status, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, NOW(), NOW())
            ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            content = VALUES(content),
            page_path = VALUES(page_path),
            status = VALUES(status),
            updated_at = NOW()
        """, (
            data.get('position_key'),
            data.get('title'),
            data.get('content'),
            data.get('page_path'),
            data.get('status', 'published')
        ))
        
        conn.commit()  # 提交事务
        text_id = cursor.lastrowid or 1
        
        return jsonify({'message': '保存成功', 'id': text_id}), 201
        
    except Exception as e:
        logger.error(f"创建文本错误: {e}")
        return jsonify({'error': '创建失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/texts/<int:text_id>', methods=['PUT'])
@jwt_required()
def update_text(text_id):
    """更新文本内容"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            UPDATE content_texts 
            SET position_key = %s, title = %s, content = %s, 
                page_path = %s, status = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (
            data.get('position_key'),
            data.get('title'),
            data.get('content'),
            data.get('page_path'),
            data.get('status', 'published'),
            text_id
        ))
        
        if cursor.rowcount > 0:
            return jsonify({'message': '更新成功'})
        else:
            return jsonify({'error': '文本不存在'}), 404
            
    except Exception as e:
        logger.error(f"更新文本错误: {e}")
        return jsonify({'error': '更新失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/texts/<int:text_id>', methods=['DELETE'])
@jwt_required()
def delete_text(text_id):
    """删除文本内容"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM content_texts WHERE id = %s", (text_id,))
        
        if cursor.rowcount > 0:
            return jsonify({'message': '删除成功'})
        else:
            return jsonify({'error': '文本不存在'}), 404
            
    except Exception as e:
        logger.error(f"删除文本错误: {e}")
        return jsonify({'error': '删除失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# ==================== 代码片段管理API ====================

@app.route('/api/codes', methods=['GET'])
@jwt_required()
def get_codes():
    """获取代码片段列表"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        language = request.args.get('language', '')
        
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        where_clause = "WHERE 1=1"
        params = []
        if language:
            where_clause += " AND language = %s"
            params.append(language)
        
        cursor.execute(f"SELECT COUNT(*) as total FROM content_codes {where_clause}", params)
        total = cursor.fetchone()['total']
        
        offset = (page - 1) * per_page
        cursor.execute(f"""
            SELECT * FROM content_codes {where_clause} 
            ORDER BY updated_at DESC 
            LIMIT %s OFFSET %s
        """, params + [per_page, offset])
        
        codes = cursor.fetchall()
        
        return jsonify({
            'data': codes,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        })
        
    except Exception as e:
        logger.error(f"获取代码列表错误: {e}")
        return jsonify({'error': '获取数据失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/codes', methods=['POST'])
@jwt_required()
def create_code():
    """创建代码片段"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO content_codes (title, language, code, description, position_key, page_path, status, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            language = VALUES(language),
            code = VALUES(code),
            description = VALUES(description),
            page_path = VALUES(page_path),
            status = VALUES(status),
            updated_at = NOW()
        """, (
            data.get('title'),
            data.get('language'),
            data.get('code'),
            data.get('description'),
            data.get('position_key'),
            data.get('page_path'),
            data.get('status', 'published')
        ))
        
        conn.commit()  # 提交事务
        code_id = cursor.lastrowid or 1
        
        return jsonify({'message': '创建成功', 'id': code_id}), 201
        
    except Exception as e:
        logger.error(f"创建代码错误: {e}")
        return jsonify({'error': '创建失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/codes/<int:code_id>', methods=['PUT'])
@jwt_required()
def update_code(code_id):
    """更新代码片段"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            UPDATE content_codes 
            SET title = %s, language = %s, code = %s, description = %s,
                position_key = %s, page_path = %s, status = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (
            data.get('title'),
            data.get('language'),
            data.get('code'),
            data.get('description'),
            data.get('position_key'),
            data.get('page_path'),
            data.get('status', 'published'),
            code_id
        ))
        
        if cursor.rowcount > 0:
            return jsonify({'message': '更新成功'})
        else:
            return jsonify({'error': '代码片段不存在'}), 404
            
    except Exception as e:
        logger.error(f"更新代码错误: {e}")
        return jsonify({'error': '更新失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/codes/<int:code_id>', methods=['DELETE'])
@jwt_required()
def delete_code(code_id):
    """删除代码片段"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM content_codes WHERE id = %s", (code_id,))
        
        if cursor.rowcount > 0:
            return jsonify({'message': '删除成功'})
        else:
            return jsonify({'error': '代码片段不存在'}), 404
            
    except Exception as e:
        logger.error(f"删除代码错误: {e}")
        return jsonify({'error': '删除失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# ==================== 图表管理API ====================

@app.route('/api/charts', methods=['GET'])
@jwt_required()
def get_charts():
    """获取图表列表"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        chart_type = request.args.get('chart_type', '')
        
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        where_clause = "WHERE 1=1"
        params = []
        if chart_type:
            where_clause += " AND chart_type = %s"
            params.append(chart_type)
        
        cursor.execute(f"SELECT COUNT(*) as total FROM content_charts {where_clause}", params)
        total = cursor.fetchone()['total']
        
        offset = (page - 1) * per_page
        cursor.execute(f"""
            SELECT * FROM content_charts {where_clause} 
            ORDER BY updated_at DESC 
            LIMIT %s OFFSET %s
        """, params + [per_page, offset])
        
        charts = cursor.fetchall()
        
        return jsonify({
            'data': charts,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        })
        
    except Exception as e:
        logger.error(f"获取图表列表错误: {e}")
        return jsonify({'error': '获取数据失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/charts/upload', methods=['POST'])
@jwt_required()
def upload_chart():
    """上传图表文件"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': '没有选择文件'}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': '没有选择文件'}), 400
            
        if file and allowed_file(file.filename):
            # 生成唯一文件名
            filename = secure_filename(file.filename)
            unique_filename = f"{uuid.uuid4()}_{filename}"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(file_path)
            
            # 保存到数据库
            title = request.form.get('title', '未命名图表')
            chart_type = request.form.get('chart_type', 'line')
            position_key = request.form.get('position_key', '')
            page_path = request.form.get('page_path', '')
            display_size = request.form.get('display_size', 'medium')
            
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute("""
                INSERT INTO content_charts 
                (title, chart_type, data_source, file_path, display_size, position_key, page_path)
                VALUES (%s, %s, 'upload', %s, %s, %s, %s)
            """, (title, chart_type, file_path, display_size, position_key, page_path))
            
            chart_id = cursor.lastrowid
            
            return jsonify({
                'message': '上传成功',
                'id': chart_id,
                'file_path': file_path
            }), 201
            
        else:
            return jsonify({'error': '文件类型不支持'}), 400
            
    except Exception as e:
        logger.error(f"上传图表错误: {e}")
        return jsonify({'error': '上传失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/charts/generate', methods=['POST'])
@jwt_required()
def generate_chart():
    """生成图表"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO content_charts 
            (title, chart_type, data_source, chart_data, chart_config, display_size, position_key, page_path, status, created_at, updated_at)
            VALUES (%s, %s, 'generated', %s, %s, %s, %s, %s, %s, NOW(), NOW())
            ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            chart_type = VALUES(chart_type),
            chart_data = VALUES(chart_data),
            chart_config = VALUES(chart_config),
            display_size = VALUES(display_size),
            page_path = VALUES(page_path),
            status = VALUES(status),
            updated_at = NOW()
        """, (
            data.get('title'),
            data.get('chart_type'),
            json.dumps(data.get('chart_data')),
            json.dumps(data.get('chart_config', {})),
            data.get('display_size', 'medium'),
            data.get('position_key'),
            data.get('page_path'),
            data.get('status', 'published')
        ))
        
        conn.commit()  # 提交事务
        chart_id = cursor.lastrowid or 1
        
        return jsonify({'message': '生成成功', 'id': chart_id}), 201
        
    except Exception as e:
        logger.error(f"生成图表错误: {e}")
        return jsonify({'error': '生成失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

@app.route('/api/charts/<int:chart_id>', methods=['DELETE'])
@jwt_required()
def delete_chart(chart_id):
    """删除图表"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # 获取图表信息
        cursor.execute("SELECT * FROM content_charts WHERE id = %s", (chart_id,))
        chart = cursor.fetchone()
        
        if not chart:
            return jsonify({'error': '图表不存在'}), 404
        
        # 如果是上传的文件，删除物理文件
        if chart['data_source'] == 'upload' and chart['file_path']:
            try:
                if os.path.exists(chart['file_path']):
                    os.remove(chart['file_path'])
            except Exception as e:
                logger.warning(f"删除文件失败: {e}")
        
        # 删除数据库记录
        cursor.execute("DELETE FROM content_charts WHERE id = %s", (chart_id,))
        
        return jsonify({'message': '删除成功'})
        
    except Exception as e:
        logger.error(f"删除图表错误: {e}")
        return jsonify({'error': '删除失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# ==================== 文件服务API ====================

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """提供上传文件的访问"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# ==================== 前端内容获取API（供前端页面使用）====================

@app.route('/api/public/content', methods=['GET'])
def get_public_content():
    """获取前端展示内容（无需认证）"""
    try:
        position_key = request.args.get('position_key')
        page_path = request.args.get('page_path')
        content_type = request.args.get('type', 'all')  # text, code, chart, all
        
        if not position_key and not page_path:
            return jsonify({'error': '需要指定position_key或page_path'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        result = {}
        
        # 构建查询条件
        where_conditions = ["status = 'published'"]
        params = []
        
        if position_key:
            where_conditions.append("position_key = %s")
            params.append(position_key)
        if page_path:
            where_conditions.append("page_path = %s")
            params.append(page_path)
            
        where_clause = " AND ".join(where_conditions)
        
        # 获取文本内容
        if content_type in ['text', 'all']:
            cursor.execute(f"SELECT * FROM content_texts WHERE {where_clause}", params)
            result['texts'] = cursor.fetchall()
        
        # 获取代码片段
        if content_type in ['code', 'all']:
            cursor.execute(f"SELECT * FROM content_codes WHERE {where_clause}", params)
            result['codes'] = cursor.fetchall()
        
        # 获取图表
        if content_type in ['chart', 'all']:
            cursor.execute(f"SELECT * FROM content_charts WHERE {where_clause}", params)
            result['charts'] = cursor.fetchall()
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"获取公共内容错误: {e}")
        return jsonify({'error': '获取内容失败'}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# ======================== 项目管理 API ========================

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """获取项目列表"""
    try:
        category = request.args.get('category')
        search = request.args.get('search', '')
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        
        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        
        # 构建查询条件
        where_conditions = []
        params = []
        
        if category:
            where_conditions.append("category = %s")
            params.append(category)
            
        if search:
            where_conditions.append("(title LIKE %s OR description LIKE %s OR tags LIKE %s)")
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param])
        
        where_clause = ""
        if where_conditions:
            where_clause = "WHERE " + " AND ".join(where_conditions)
        
        # 获取总数
        count_query = f"SELECT COUNT(*) as total FROM projects {where_clause}"
        cursor.execute(count_query, params)
        total = cursor.fetchone()['total']
        
        # 获取项目列表
        offset = (page - 1) * per_page
        query = f"""
        SELECT * FROM projects 
        {where_clause}
        ORDER BY created_at DESC 
        LIMIT %s OFFSET %s
        """
        cursor.execute(query, params + [per_page, offset])
        projects = cursor.fetchall()
        
        # 处理标签字段
        for project in projects:
            if project['tags']:
                try:
                    project['tags'] = json.loads(project['tags'])
                except:
                    project['tags'] = []
            else:
                project['tags'] = []
        
        cursor.close()
        connection.close()
        
        return jsonify({
            'projects': projects,
            'total': total,
            'page': page,
            'per_page': per_page,
            'total_pages': (total + per_page - 1) // per_page
        })
        
    except Exception as e:
        logger.error(f"获取项目列表失败: {str(e)}")
        return jsonify({'error': '获取项目列表失败'}), 500

@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project_detail(project_id):
    """获取项目详情"""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        
        cursor.execute("SELECT * FROM projects WHERE id = %s", (project_id,))
        project = cursor.fetchone()
        
        if not project:
            return jsonify({'error': '项目不存在'}), 404
        
        # 处理标签字段
        if project['tags']:
            try:
                project['tags'] = json.loads(project['tags'])
            except:
                project['tags'] = []
        else:
            project['tags'] = []
        
        # 更新浏览次数
        cursor.execute("UPDATE projects SET view_count = COALESCE(view_count, 0) + 1 WHERE id = %s", (project_id,))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({'project': project})
        
    except Exception as e:
        logger.error(f"获取项目详情失败: {str(e)}")
        return jsonify({'error': '获取项目详情失败'}), 500

@app.route('/api/projects', methods=['POST'])
@jwt_required()
def create_project():
    """创建新项目"""
    try:
        current_user = get_jwt_identity()
        
        # 获取表单数据
        title = request.form.get('title')
        description = request.form.get('description')
        category = request.form.get('category')
        tags = request.form.get('tags', '[]')
        link_url = request.form.get('link_url')
        
        if not all([title, description, category]):
            return jsonify({'error': '标题、描述和分类不能为空'}), 400
        
        # 处理文件上传
        file_path = None
        file_size = 0
        if 'file' in request.files:
            file = request.files['file']
            if file.filename:
                # 生成安全的文件名
                filename = secure_filename(file.filename)
                file_extension = pathlib.Path(filename).suffix
                unique_filename = f"{uuid.uuid4()}{file_extension}"
                
                # 创建上传目录
                upload_dir = f"uploads/projects/{category}"
                os.makedirs(upload_dir, exist_ok=True)
                
                file_path = os.path.join(upload_dir, unique_filename)
                file.save(file_path)
                file_size = os.path.getsize(file_path)
        
        # 处理缩略图上传
        thumbnail_path = None
        if 'thumbnail' in request.files:
            thumbnail = request.files['thumbnail']
            if thumbnail.filename:
                filename = secure_filename(thumbnail.filename)
                file_extension = pathlib.Path(filename).suffix
                unique_filename = f"thumb_{uuid.uuid4()}{file_extension}"
                
                upload_dir = "uploads/thumbnails"
                os.makedirs(upload_dir, exist_ok=True)
                
                thumbnail_path = os.path.join(upload_dir, unique_filename)
                thumbnail.save(thumbnail_path)
        
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # 插入项目数据
        query = """
        INSERT INTO projects (title, description, category, file_path, link_url, 
                            thumbnail, tags, author, file_size, created_at, updated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        
        now = datetime.now()
        cursor.execute(query, (
            title, description, category, file_path, link_url,
            thumbnail_path, tags, current_user, file_size, now, now
        ))
        
        project_id = cursor.lastrowid
        connection.commit()
        cursor.close()
        connection.close()
        
        logger.info(f"用户 {current_user} 创建了项目: {title}")
        return jsonify({
            'message': '项目创建成功',
            'project_id': project_id
        }), 201
        
    except Exception as e:
        logger.error(f"创建项目失败: {str(e)}")
        return jsonify({'error': '创建项目失败'}), 500

@app.route('/api/projects/stats', methods=['GET'])
def get_project_stats():
    """获取项目统计信息"""
    try:
        connection = get_db_connection()
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        
        # 按分类统计
        cursor.execute("""
        SELECT category, COUNT(*) as count 
        FROM projects 
        GROUP BY category
        """)
        category_stats = cursor.fetchall()
        
        # 总体统计
        cursor.execute("""
        SELECT 
            COUNT(*) as total_projects,
            COALESCE(SUM(download_count), 0) as total_downloads,
            COALESCE(SUM(view_count), 0) as total_views
        FROM projects
        """)
        total_stats = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        return jsonify({
            'category_stats': category_stats,
            'total_stats': total_stats
        })
        
    except Exception as e:
        logger.error(f"获取项目统计失败: {str(e)}")
        return jsonify({'error': '获取项目统计失败'}), 500

# ==================== 启动服务 ====================

if __name__ == '__main__':
    # 确保数据库表已创建
    logger.info("启动后台管理API服务...")
    logger.info("数据库配置:")
    logger.info(f"  主机: {DB_CONFIG['host']}:{DB_CONFIG['port']}")
    logger.info(f"  数据库: {DB_CONFIG['database']}")
    logger.info(f"  用户: {DB_CONFIG['user']}")
    
    # 开发模式启动
    app.run(debug=True, host='0.0.0.0', port=5000)
