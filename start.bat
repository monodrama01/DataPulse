@echo off
echo 正在启动数据分析网站...
echo.

echo [1/3] 检查后端依赖...
if not exist ".venv" (
    echo 创建虚拟环境...
    python -m venv .venv
)

echo [2/3] 启动后端服务 (FastAPI)...
start "Backend Server" cmd /k ".\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

echo [3/3] 启动前端服务 (Next.js)...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ✅ 启动完成！
echo 🌐 前端地址: http://localhost:3000
echo 🔧 后端地址: http://localhost:8000
echo 📊 API文档: http://localhost:8000/docs
echo.
echo 提示: 两个命令窗口将会打开，请保持它们运行
echo 按任意键退出此窗口...
pause >nul
