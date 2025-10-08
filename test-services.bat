@echo off
chcp 65001 >nul
echo 🧪 测试前后端服务状态...
echo.

echo [1/3] 测试后端服务 (FastAPI)...
curl -s http://localhost:8000/docs > nul
if %errorlevel% == 0 (
    echo ✅ 后端服务正常运行 - http://localhost:8000
) else (
    echo ❌ 后端服务未运行
)

echo.
echo [2/3] 测试前端服务 (Next.js)...
curl -s http://localhost:3000 > nul
if %errorlevel% == 0 (
    echo ✅ 前端服务正常运行 - http://localhost:3000
) else (
    echo ❌ 前端服务未运行
)

echo.
echo [3/3] 测试API连通性...
curl -s http://localhost:8000/openapi.json > nul
if %errorlevel% == 0 (
    echo ✅ API接口正常响应
) else (
    echo ❌ API接口无响应
)

echo.
echo 📋 服务访问地址：
echo 🌐 前端网站: http://localhost:3000
echo 🔧 后端API: http://localhost:8000
echo 📊 API文档: http://localhost:8000/docs
echo 🔍 API规范: http://localhost:8000/redoc
echo.
pause
