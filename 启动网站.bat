@echo off
chcp 65001 >nul
echo 🚀 正在启动数据分析网站...
echo.

echo [1/2] 启动后端服务 (FastAPI)...
start "Backend Server" cmd /k ".\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo [2/2] 启动前端服务 (Next.js)...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ 启动完成！
echo 🌐 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:8000
echo 📊 API文档: http://localhost:8000/docs
echo.
echo 提示: 两个命令窗口已打开，请保持它们运行
pause
