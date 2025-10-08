#!/usr/bin/env python3
"""
快速启动后端服务脚本
"""

import subprocess
import sys
import os

def check_python_version():
    """检查Python版本"""
    if sys.version_info < (3, 7):
        print("❌ 需要Python 3.7或更高版本")
        sys.exit(1)
    print(f"✅ Python版本: {sys.version}")

def install_dependencies():
    """安装Python依赖"""
    print("📦 安装Python依赖...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "api/requirements.txt"], 
                      check=True)
        print("✅ 依赖安装成功")
    except subprocess.CalledProcessError:
        print("❌ 依赖安装失败")
        sys.exit(1)

def start_backend():
    """启动后端服务"""
    print("🚀 启动后端API服务...")
    os.chdir("api")
    try:
        subprocess.run([sys.executable, "server.py"], check=True)
    except KeyboardInterrupt:
        print("\n👋 服务已停止")
    except subprocess.CalledProcessError as e:
        print(f"❌ 服务启动失败: {e}")

if __name__ == "__main__":
    print("🔧 后台管理系统 - 后端服务启动器")
    print("=" * 50)
    
    check_python_version()
    
    # 询问是否需要安装依赖
    install_deps = input("是否需要安装Python依赖? (y/n): ").lower().strip()
    if install_deps in ['y', 'yes', '是']:
        install_dependencies()
    
    print("\n📋 服务信息:")
    print("- API地址: http://localhost:5000")
    print("- 管理员账户: admin / admin123")
    print("- 数据库: localhost:3306/windows")
    print("\n按 Ctrl+C 停止服务")
    print("=" * 50)
    
    start_backend()
