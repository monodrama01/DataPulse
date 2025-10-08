const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动数据分析网站...\n');

// 启动后端
console.log('[1/2] 启动后端服务 (FastAPI)...');
const backend = spawn('.venv/Scripts/python.exe', ['-m', 'uvicorn', 'backend.main:app', '--host', '127.0.0.1', '--port', '8000', '--reload'], {
  stdio: 'inherit',
  shell: true
});

// 等待2秒后启动前端
setTimeout(() => {
  console.log('[2/2] 启动前端服务 (Next.js)...');
  const frontend = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  frontend.on('spawn', () => {
    console.log('\n✅ 启动完成！');
    console.log('🌐 前端地址: http://localhost:3000');
    console.log('🔧 后端地址: http://localhost:8000');
    console.log('📊 API文档: http://localhost:8000/docs\n');
  });

  // 处理退出
  process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭服务...');
    backend.kill();
    frontend.kill();
    process.exit();
  });

}, 2000);

backend.on('spawn', () => {
  console.log('✅ 后端服务已启动');
});

backend.on('error', (err) => {
  console.error('❌ 后端启动失败:', err.message);
});
