#!/usr/bin/env python3
"""
数据库初始化脚本
"""

import pymysql
import bcrypt

# 数据库连接配置
DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'li441195092',
    'database': 'windows',
    'charset': 'utf8mb4',
    'autocommit': True
}

def create_tables():
    """创建数据库表"""
    try:
        # 先连接MySQL服务器（不指定数据库）
        config_without_db = DB_CONFIG.copy()
        config_without_db.pop('database')
        
        connection = pymysql.connect(**config_without_db)
        cursor = connection.cursor()
        
        print("🔗 连接MySQL服务器成功")
        
        # 创建数据库（如果不存在）
        cursor.execute("CREATE DATABASE IF NOT EXISTS windows CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        cursor.execute("USE windows")
        print("✅ 创建/使用数据库 'windows'")
        
        connection.close()
        
        # 重新连接到指定数据库
        connection = pymysql.connect(**DB_CONFIG)
        cursor = connection.cursor()
        
        print("🔗 连接到数据库 'windows' 成功")
        
        # 创建管理员用户表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL COMMENT '管理员用户名',
                password VARCHAR(255) NOT NULL COMMENT '密码哈希',
                email VARCHAR(100) COMMENT '邮箱',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) COMMENT='管理员用户表'
        """)
        print("✅ 创建 admin_users 表")
        
        # 创建文本内容表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS content_texts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                position_key VARCHAR(100) NOT NULL COMMENT '前端展示位置标识',
                title VARCHAR(200) NOT NULL COMMENT '内容标题',
                content LONGTEXT NOT NULL COMMENT '富文本内容',
                page_path VARCHAR(200) COMMENT '所属页面路径',
                status ENUM('draft', 'published') DEFAULT 'published' COMMENT '状态',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_position_key (position_key),
                INDEX idx_page_path (page_path)
            ) COMMENT='文本内容表'
        """)
        print("✅ 创建 content_texts 表")
        
        # 创建代码片段表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS content_codes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(200) NOT NULL COMMENT '代码片段标题',
                language VARCHAR(50) NOT NULL COMMENT '编程语言',
                code LONGTEXT NOT NULL COMMENT '代码内容',
                description TEXT COMMENT '代码描述',
                position_key VARCHAR(100) COMMENT '前端展示位置标识',
                page_path VARCHAR(200) COMMENT '所属页面路径',
                status ENUM('draft', 'published') DEFAULT 'published',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_language (language),
                INDEX idx_position_key (position_key)
            ) COMMENT='代码片段表'
        """)
        print("✅ 创建 content_codes 表")
        
        # 创建图表表
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS content_charts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(200) NOT NULL COMMENT '图表标题',
                chart_type ENUM('line', 'bar', 'pie', 'scatter') NOT NULL COMMENT '图表类型',
                data_source ENUM('upload', 'generated') NOT NULL COMMENT '数据来源',
                file_path VARCHAR(500) COMMENT '上传文件路径',
                chart_data JSON COMMENT '图表数据',
                chart_config JSON COMMENT '图表配置',
                display_size ENUM('small', 'medium', 'large') DEFAULT 'medium' COMMENT '展示尺寸',
                position_key VARCHAR(100) COMMENT '前端展示位置标识',
                page_path VARCHAR(200) COMMENT '所属页面路径',
                status ENUM('draft', 'published') DEFAULT 'published',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_chart_type (chart_type),
                INDEX idx_position_key (position_key)
            ) COMMENT='图表表'
        """)
        print("✅ 创建 content_charts 表")
        
        # 创建默认管理员账户
        password_hash = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        cursor.execute("""
            INSERT INTO admin_users (username, password, email) VALUES 
            (%s, %s, %s)
            ON DUPLICATE KEY UPDATE username = username
        """, ('admin', password_hash, 'admin@example.com'))
        print("✅ 创建默认管理员账户: admin / admin123")
        
        # 插入示例内容
        cursor.execute("""
            INSERT INTO content_texts (position_key, title, content, page_path) VALUES 
            (%s, %s, %s, %s),
            (%s, %s, %s, %s),
            (%s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE content = VALUES(content)
        """, (
            'homepage_hero_title', '首页主标题', '<h1>机器学习探索平台</h1>', '/',
            'homepage_hero_description', '首页描述', '<p>深入了解 scikit-learn 的强大功能，从基础到进阶的完整学习路径</p>', '/',
            'svm_intro', 'SVM算法介绍', '<p class="text-lg leading-relaxed mb-4">支持向量机是一种强大的监督学习算法，可以用于分类和回归任务。SVM的核心思想是找到一个最优的决策边界（超平面），使得不同类别的数据点被最大间隔地分开。</p>', '/machine-learning/supervised/svm'
        ))
        
        cursor.execute("""
            INSERT INTO content_codes (title, language, code, description, position_key, page_path) VALUES 
            (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE code = VALUES(code)
        """, (
            'SVM基础示例', 'python', 
            '''from sklearn import svm
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
import numpy as np

# 创建示例数据
X, y = make_classification(n_samples=1000, n_features=4, 
                         n_redundant=0, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

# 创建SVM分类器
clf = svm.SVC(kernel='rbf')  # 使用RBF核

# 训练模型
clf.fit(X_train, y_train)

# 进行预测
predictions = clf.predict(X_test)

# 查看准确率
accuracy = clf.score(X_test, y_test)
print(f"准确率: {accuracy:.3f}")

# 查看支持向量数量
print(f"支持向量数量: {clf.n_support_}")
print(f"支持向量: {clf.support_vectors_.shape}")''',
            'SVM分类器的基本使用方法', 'svm_basic_example', '/machine-learning/supervised/svm'
        ))
        print("✅ 插入示例内容")
        
        print("\n🎉 数据库初始化完成！")
        print("📋 创建的表:")
        print("  - admin_users (管理员用户)")
        print("  - content_texts (文本内容)")
        print("  - content_codes (代码片段)")
        print("  - content_charts (图表)")
        print("\n🔑 默认管理员账户:")
        print("  用户名: admin")
        print("  密码: admin123")
        
        connection.close()
        
    except Exception as e:
        print(f"❌ 数据库初始化失败: {e}")

if __name__ == "__main__":
    print("🚀 开始初始化数据库...")
    create_tables()
