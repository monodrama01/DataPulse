# PowerShell 启动脚本
Write-Host "🚀 正在启动数据分析网站..." -ForegroundColor Green
Write-Host ""

# 检查虚拟环境
Write-Host "[1/3] 检查后端依赖..." -ForegroundColor Yellow
if (!(Test-Path ".venv")) {
    Write-Host "创建虚拟环境..." -ForegroundColor Blue
    python -m venv .venv
}

# 启动后端
Write-Host "[2/3] 启动后端服务 (FastAPI)..." -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", ".\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload" -WindowStyle Normal

# 等待2秒让后端启动
Start-Sleep -Seconds 2

# 启动前端
Write-Host "[3/3] 启动前端服务 (Next.js)..." -ForegroundColor Yellow
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ 启动完成！" -ForegroundColor Green
Write-Host "🌐 前端地址: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 后端地址: http://localhost:8000" -ForegroundColor Cyan  
Write-Host "📊 API文档: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "提示: 两个 PowerShell 窗口将会打开，请保持它们运行" -ForegroundColor Magenta
Write-Host "按任意键退出此窗口..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
