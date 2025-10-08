@echo off
echo ====================================================
echo          后台管理系统 - 快速启动器
echo ====================================================
echo.

echo 1. 检查数据库连接...
mysql -h localhost -u root -pli441195092 -e "USE windows; SHOW TABLES;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 数据库连接失败，请检查MySQL服务是否启动
    echo    或者手动执行: mysql -h localhost -u root -pli441195092 windows ^< database/schema.sql
    pause
    exit /b 1
)
echo ✅ 数据库连接正常

echo.
echo 2. 初始化数据库表（如果需要）...
mysql -h localhost -u root -pli441195092 windows < database/schema.sql 2>nul
echo ✅ 数据库表已就绪

echo.
echo 3. 启动服务...
echo 📋 服务信息:
echo    - 前端地址: http://localhost:3000
echo    - 后台管理: http://localhost:3000/admin
echo    - API地址: http://localhost:5000
echo    - 管理员账户: admin / admin123
echo.

echo 🚀 启动前端服务...
start "前端服务" cmd /k "npm run dev"

echo.
echo ⏳ 等待3秒后启动后端服务...
timeout /t 3 /nobreak >nul

echo 🚀 启动后端API服务...
start "后端API服务" cmd /k "cd api && python server.py"

echo.
echo ✅ 服务启动完成！
echo.
echo 📖 使用说明:
echo    1. 等待服务完全启动（约10-15秒）
echo    2. 访问 http://localhost:3000/admin
echo    3. 使用账户 admin / admin123 登录
echo    4. 开始管理你的网站内容！
echo.
echo 按任意键打开管理页面...
pause >nul

start http://localhost:3000/admin

echo.
echo 服务已在后台运行，关闭此窗口不会停止服务
echo 要停止服务，请关闭对应的命令行窗口
pause
