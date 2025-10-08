#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据库初始化脚本
"""
import pymysql
import bcrypt

# 数据库连接配置
DB_CONFIG = {
    'host': 'bj-cynosdbmysql-grp-pez5q1kx.sql.tencentcdb.com',
    'port': 23398,
    'user': 'root',
    'password': '114514LZY!',
    'database': 'analysis_web',
    'charset': 'utf8mb4',
    'autocommit': True
}

def get_db_connection():
    """获取数据库连接"""
    try:
        connection = pymysql.connect(**DB_CONFIG)
        return connection
    except Exception as e:
        print(f"数据库连接失败: {e}")
        return None

def check_admin_user():
    """检查管理员用户"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM admin_users WHERE username = 'admin'")
        user = cursor.fetchone()
        
        if user:
            print(f"管理员用户已存在: {user}")
            # 测试密码验证
            test_password = "admin123"
            if bcrypt.checkpw(test_password.encode('utf-8'), user['password'].encode('utf-8')):
                print("密码验证成功")
            else:
                print("密码验证失败")
            return True
        else:
            print("管理员用户不存在")
            # 创建管理员用户
            password_hash = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            cursor.execute(
                "INSERT INTO admin_users (username, password, email) VALUES (%s, %s, %s)",
                ('admin', password_hash, 'admin@example.com')
            )
            print("管理员用户创建成功")
            return True
            
    except Exception as e:
        print(f"检查管理员用户失败: {e}")
        return False
    finally:
        conn.close()

def check_tables():
    """检查数据库表是否存在"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        print("现有数据库表:")
        for table in tables:
            print(f"  - {table[0]}")
        return True
    except Exception as e:
        print(f"检查数据库表失败: {e}")
        return False
    finally:
        conn.close()

if __name__ == "__main__":
    print("=== 数据库状态检查 ===")
    
    print("\n1. 检查数据库表...")
    check_tables()
    
    print("\n2. 检查管理员用户...")
    check_admin_user()
    
    print("\n=== 检查完成 ===")
