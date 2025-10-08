const fs = require('fs');
const path = require('path');

// 定义品牌色
const BRAND_COLOR = '#19bcc8';

// 需要处理的文件列表
const files = [
  'app/python/page.tsx',
  'app/sql/page.tsx',
  'app/excel/page.tsx',
  'app/visualization/page.tsx',
  'app/machine-learning/page.tsx',
  'app/automation/page.tsx',
  'app/deep-learning/page.tsx',
  'app/data-thinking/page.tsx',
  'app/business/page.tsx',
  'app/statistics/page.tsx'
];

// 样式替换规则
const styleReplacements = [
  // 1. 统一图标颜色
  {
    pattern: /text-purple-\d+|text-blue-\d+|text-green-\d+|text-yellow-\d+|text-red-\d+|text-pink-\d+|text-indigo-\d+|text-orange-\d+|text-teal-\d+|text-cyan-\d+|text-rose-\d+|text-amber-\d+|text-lime-\d+|text-emerald-\d+|text-violet-\d+|text-fuchsia-\d+|text-sky-\d+/g,
    replacement: 'text-[#19bcc8]',
    context: 'icon'
  },
  
  // 2. 统一激活状态边框
  {
    pattern: /border-purple-\d+|border-blue-\d+|border-green-\d+|border-yellow-\d+|border-red-\d+|border-pink-\d+|border-indigo-\d+|border-orange-\d+|border-teal-\d+|border-cyan-\d+/g,
    replacement: 'border-[#19bcc8]',
    context: 'active border'
  },
  
  // 3. 统一激活状态背景
  {
    pattern: /bg-purple-\d+\/\d+|bg-blue-\d+\/\d+|bg-green-\d+\/\d+|bg-yellow-\d+\/\d+|bg-red-\d+\/\d+|bg-pink-\d+\/\d+|bg-indigo-\d+\/\d+|bg-orange-\d+\/\d+|bg-teal-\d+\/\d+|bg-cyan-\d+\/\d+/g,
    replacement: 'bg-[#19bcc8]/10',
    context: 'active background'
  },
  
  // 4. 替换彩色渐变背景为简洁的灰色或品牌色
  {
    pattern: /bg-gradient-to-br from-purple-\d+ (?:via-\w+-\d+ )?to-\w+-\d+/g,
    replacement: 'bg-gradient-to-br from-gray-800 to-gray-700',
    context: 'gradient background (dark)'
  },
  {
    pattern: /bg-gradient-to-r from-purple-\d+ (?:via-\w+-\d+ )?to-\w+-\d+/g,
    replacement: 'bg-gradient-to-r from-gray-800 to-gray-700',
    context: 'gradient background (horizontal)'
  },
  
  // 5. 主标题颜色
  {
    pattern: /text-\w+-\d+ font-(?:black|extrabold|bold)/g,
    replacement: 'text-gray-900 font-extrabold',
    context: 'main title'
  }
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    styleReplacements.forEach(rule => {
      const before = content;
      content = content.replace(rule.pattern, rule.replacement);
      if (before !== content) {
        modified = true;
        console.log(`  ✓ Updated ${rule.context} in ${path.basename(filePath)}`);
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${path.basename(filePath)} updated successfully\n`);
    } else {
      console.log(`ℹ️  ${path.basename(filePath)} - no changes needed\n`);
    }
    
    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

console.log('🎨 Starting visual style unification...\n');
console.log(`Brand color: ${BRAND_COLOR}\n`);

let totalModified = 0;

files.forEach(file => {
  if (processFile(file)) {
    totalModified++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`✨ Complete! Modified ${totalModified}/${files.length} files`);
console.log('='.repeat(50));





