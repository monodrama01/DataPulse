const fs = require('fs');
const path = require('path');

// 需要处理的文件列表
const filesToProcess = [
  'app/data-thinking/page.tsx',
  'app/business/page.tsx',
  'app/statistics/page.tsx',
  'app/visualization/page.tsx',
  'app/machine-learning/page.tsx',
  'app/automation/page.tsx',
  'app/excel/page.tsx',
  'app/deep-learning/page.tsx',
  'app/window-functions/page.tsx',
  'app/sql/page.tsx',
];

// 颜色替换映射 - 将各种颜色统一为 #19bcc8
const colorReplacements = [
  // 蓝色系
  { old: /text-blue-600/g, new: 'text-[#19bcc8]' },
  { old: /text-blue-700/g, new: 'text-[#17a8b4]' },
  { old: /text-blue-500/g, new: 'text-[#19bcc8]' },
  { old: /text-blue-400/g, new: 'text-[#19bcc8]' },
  { old: /text-blue-300/g, new: 'text-[#19bcc8]' },
  { old: /hover:text-blue-600/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-blue-700/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-blue-400/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-blue-300/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:bg-blue-50/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /hover:bg-blue-900\/30/g, new: 'hover:bg-[#19bcc8]/20' },
  { old: /hover:bg-blue-900\/20/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /bg-blue-50/g, new: 'bg-[#19bcc8]/10' },
  { old: /bg-blue-100/g, new: 'bg-[#19bcc8]/20' },
  { old: /bg-blue-900\/30/g, new: 'bg-[#19bcc8]/20' },
  { old: /bg-blue-900\/20/g, new: 'bg-[#19bcc8]/10' },
  { old: /border-blue-500/g, new: 'border-[#19bcc8]' },
  { old: /border-blue-600/g, new: 'border-[#19bcc8]' },
  { old: /border-blue-200/g, new: 'border-[#19bcc8]/30' },
  
  // 绿色系
  { old: /text-green-600/g, new: 'text-[#19bcc8]' },
  { old: /text-green-700/g, new: 'text-[#17a8b4]' },
  { old: /text-green-500/g, new: 'text-[#19bcc8]' },
  { old: /text-green-400/g, new: 'text-[#19bcc8]' },
  { old: /text-green-300/g, new: 'text-[#19bcc8]' },
  { old: /hover:text-green-600/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-green-700/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-green-300/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:bg-green-50/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /hover:bg-green-900\/30/g, new: 'hover:bg-[#19bcc8]/20' },
  { old: /hover:bg-green-900\/20/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /bg-green-50/g, new: 'bg-[#19bcc8]/10' },
  { old: /bg-green-100/g, new: 'bg-[#19bcc8]/20' },
  { old: /bg-green-900\/30/g, new: 'bg-[#19bcc8]/20' },
  { old: /border-green-500/g, new: 'border-[#19bcc8]' },
  { old: /border-green-200/g, new: 'border-[#19bcc8]/30' },
  
  // 紫色系
  { old: /text-purple-600/g, new: 'text-[#19bcc8]' },
  { old: /text-purple-700/g, new: 'text-[#17a8b4]' },
  { old: /text-purple-500/g, new: 'text-[#19bcc8]' },
  { old: /text-purple-400/g, new: 'text-[#19bcc8]' },
  { old: /text-purple-300/g, new: 'text-[#19bcc8]' },
  { old: /hover:text-purple-600/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-purple-700/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:text-purple-300/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:bg-purple-50/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /hover:bg-purple-900\/30/g, new: 'hover:bg-[#19bcc8]/20' },
  { old: /hover:bg-purple-900\/20/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /bg-purple-50/g, new: 'bg-[#19bcc8]/10' },
  { old: /bg-purple-100/g, new: 'bg-[#19bcc8]/20' },
  { old: /bg-purple-900\/30/g, new: 'bg-[#19bcc8]/20' },
  { old: /border-purple-500/g, new: 'border-[#19bcc8]' },
  { old: /border-purple-200/g, new: 'border-[#19bcc8]/30' },
  
  // 橙色系
  { old: /text-orange-600/g, new: 'text-[#19bcc8]' },
  { old: /text-orange-500/g, new: 'text-[#19bcc8]' },
  { old: /text-orange-400/g, new: 'text-[#19bcc8]' },
  { old: /hover:text-orange-600/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:bg-orange-50/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /hover:bg-orange-900\/20/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /bg-orange-50/g, new: 'bg-[#19bcc8]/10' },
  { old: /bg-orange-900\/30/g, new: 'bg-[#19bcc8]/20' },
  { old: /border-orange-500/g, new: 'border-[#19bcc8]' },
  
  // 粉色系
  { old: /text-pink-600/g, new: 'text-[#19bcc8]' },
  { old: /text-pink-500/g, new: 'text-[#19bcc8]' },
  { old: /text-pink-400/g, new: 'text-[#19bcc8]' },
  { old: /hover:text-pink-600/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:bg-pink-50/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /hover:bg-pink-900\/20/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /bg-pink-50/g, new: 'bg-[#19bcc8]/10' },
  { old: /bg-pink-900\/30/g, new: 'bg-[#19bcc8]/20' },
  { old: /border-pink-500/g, new: 'border-[#19bcc8]' },
  
  // indigo系
  { old: /text-indigo-600/g, new: 'text-[#19bcc8]' },
  { old: /text-indigo-500/g, new: 'text-[#19bcc8]' },
  { old: /text-indigo-400/g, new: 'text-[#19bcc8]' },
  { old: /hover:text-indigo-600/g, new: 'hover:text-[#17a8b4]' },
  { old: /hover:bg-indigo-50/g, new: 'hover:bg-[#19bcc8]/10' },
  { old: /bg-indigo-50/g, new: 'bg-[#19bcc8]/10' },
  { old: /bg-indigo-900\/30/g, new: 'bg-[#19bcc8]/20' },
  { old: /border-indigo-500/g, new: 'border-[#19bcc8]' },
];

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;
  let changeCount = 0;

  // 应用所有颜色替换
  colorReplacements.forEach(({ old, new: newColor }) => {
    const matches = content.match(old);
    if (matches) {
      content = content.replace(old, newColor);
      changeCount += matches.length;
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ 已处理: ${filePath}`);
    console.log(`   替换了 ${changeCount} 处颜色`);
  } else {
    console.log(`ℹ️  无需修改: ${filePath}`);
  }
}

// 执行批量处理
console.log('🎨 开始统一颜色配色...\n');

filesToProcess.forEach((file, index) => {
  console.log(`[${index + 1}/${filesToProcess.length}] 处理: ${file}`);
  try {
    processFile(file);
  } catch (error) {
    console.error(`❌ 处理失败: ${file}`, error.message);
  }
  console.log('');
});

console.log('✨ 颜色统一完成！');
