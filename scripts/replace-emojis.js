const fs = require('fs');
const path = require('path');

// 需要处理的文件列表 - 所有包含emoji的文件
const filesToProcess = [
  // 主要页面
  'app/page.tsx',
  'app/visualization/page.tsx',
  'app/machine-learning/page.tsx',
  'app/automation/page.tsx',
  'app/excel/page.tsx',
  'app/deep-learning/page.tsx',
  'app/window-functions/page.tsx',
  'app/statistics/page.tsx',
  'app/business/page.tsx',
  'app/data-thinking/page.tsx',
  // Excel模板页面 (11个)
  'app/excel/templates/sales-tracker/page.tsx',
  'app/excel/templates/okr/page.tsx',
  'app/excel/templates/gantt/page.tsx',
  'app/excel/templates/performance/page.tsx',
  'app/excel/templates/profit-loss/page.tsx',
  'app/excel/templates/budget/page.tsx',
  'app/excel/templates/crm/page.tsx',
  'app/excel/templates/reimbursement/page.tsx',
  'app/excel/templates/attendance/page.tsx',
  'app/excel/templates/recruitment/page.tsx',
  'app/excel/templates/inventory-abc/page.tsx',
  // 行业页面 (6个)
  'app/business/industries/food/page.tsx',
  'app/business/industries/retail/page.tsx',
  'app/business/industries/travel/page.tsx',
  'app/business/industries/healthcare/page.tsx',
  'app/business/industries/manufacturing/page.tsx',
  'app/business/industries/ecommerce/page.tsx',
  // 可视化相关组件
  'app/machine-learning/visualizations.tsx',
  'app/statistics/visualizations.tsx',
  'app/business/industries/food/visualizations.tsx',
  'app/business/industries/retail/visualizations.tsx',
  'app/business/industries/travel/visualizations.tsx',
  // 其他模块
  'app/machine-learning/advanced-modules.tsx',
  // 导航组件
  'components/navigation.tsx',
];

// Emoji 替换映射
const emojiReplacements = {
  // 直接在 JSX 中的 emoji (如 <span>🎯</span>)
  pattern1: /(<[^>]*>)\s*([🎯📊🚀⚡📈💡🔍📅🏆🥇🔄🎲💰👥🐍📚🧪🌲🐌🔌🛡️🐼⚠️💳🗺️🏢✅👤🔢🌐⚙️🔐🖥️🔑📐🗂️💬➕🗑️🔒📥📋📄🔗🚫✂️🔀🏅🎖️📂☁️🖥️🎨📣🛒❤️☕✈️🍽️🏥🚚🏭🎮💳🎬📖🎓💼📉🌟🎁✨🔥💪🚩📌🔔📝🖊️✏️📏🧮🔬🧬🧩🏹🌈🔮🎭🖼️🖇️📎⛓️🔁🔂🔃🤖🌳📱🔧🎪💾🧠💻🔢])\s*(<\/[^>]*>)/g,
  
  // 在数组中的 emoji (如 ['📊', '🎯'])
  pattern2: /['"]([🎯📊🚀⚡📈💡🔍📅🏆🥇🔄🎲💰👥🐍📚🧪🌲🐌🔌🛡️🐼⚠️💳🗺️🏢✅👤🔢🌐⚙️🔐🖥️🔑📐🗂️💬➕🗑️🔒📥📋📄🔗🚫✂️🔀🏅🎖️📂☁️🎨📣🛒❤️☕✈️🍽️🏥🚚🏭🎮💳🎬📖🎓💼📉🌟🎁✨🔥💪🚩📌🔔📝🖊️✏️📏🧮🔬🧬🧩🏹🌈🔮🎭🖼️🖇️📎⛓️🔁🔂🔃🤖🌳📱🔧🎪💾🧠💻])['"],?/g,
};

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;

  // 检查是否已经导入了 getLucideIcon
  const hasImport = content.includes('getLucideIcon');
  
  if (!hasImport) {
    // 添加导入语句
    const importStatement = `import { getLucideIcon } from "@/components/LucideIcon";\n`;
    
    // 在第一个 import 之后添加
    if (content.includes('import ')) {
      const firstImportEnd = content.indexOf('\n', content.indexOf('import '));
      content = content.slice(0, firstImportEnd + 1) + importStatement + content.slice(firstImportEnd + 1);
      modified = true;
      console.log(`✅ 添加导入语句: ${filePath}`);
    }
  }

  // 记录找到的 emoji
  const emojisFound = new Set();

  // 模式1: 替换 JSX 中的单个 emoji
  // <span>🎯</span> -> <span>{getLucideIcon('🎯', 'w-5 h-5 text-[#19bcc8]')}</span>
  content = content.replace(
    /(<(?:span|div)[^>]*>)\s*([🎯📊🚀⚡📈💡🔍📅🏆🥇🔄🎲💰👥🐍📚🧪🌲🐌🔌🛡️🐼⚠️💳🗺️🏢✅👤🔢🌐⚙️🔐🖥️🔑📐🗂️💬➕🗑️🔒📥📋📄🔗🚫✂️🔀🏅🎖️📂☁️🎨📣🛒❤️☕✈️🍽️🏥🚚🏭🎮💳🎬📖🎓💼📉🌟🎁✨🔥💪🚩📌🔔📝🖊️✏️📏🧮🔬🧬🧩🏹🌈🔮🎭🖼️🖇️📎⛓️🔁🔂🔃🤖🌳📱🔧🎪💾🧠💻🔢])\s*(<\/(?:span|div)>)/g,
    (match, openTag, emoji, closeTag) => {
      emojisFound.add(emoji);
      modified = true;
      return `${openTag}{getLucideIcon('${emoji}', 'w-5 h-5 text-[#19bcc8]')}${closeTag}`;
    }
  );

  // 模式2: 替换文本中直接的 emoji（标题等）
  // 🎯 数据分析 -> {getLucideIcon('🎯', 'inline w-6 h-6')} 数据分析
  content = content.replace(
    /(?<!['"`{])\s*([🎯📊🚀⚡📈💡🔍📅🏆🥇🔄🎲💰👥🐍📚🧪🌲🐌🔌🛡️🐼⚠️💳🗺️🏢✅👤🔢🌐⚙️🔐🖥️🔑📐🗂️💬➕🗑️🔒📥📋📄🔗🚫✂️🔀])\s+(?=[A-Za-z\u4e00-\u9fa5])/g,
    (match, emoji) => {
      emojisFound.add(emoji);
      modified = true;
      return ` {getLucideIcon('${emoji}', 'inline w-6 h-6 text-[#19bcc8]')} `;
    }
  );

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ 已处理: ${filePath}`);
    if (emojisFound.size > 0) {
      console.log(`   找到 ${emojisFound.size} 个 emoji: ${Array.from(emojisFound).join(' ')}`);
    }
  } else {
    console.log(`ℹ️  无需修改: ${filePath}`);
  }
}

// 执行批量处理
console.log('🚀 开始批量替换 emoji 图标...\n');

filesToProcess.forEach((file, index) => {
  console.log(`[${index + 1}/${filesToProcess.length}] 处理: ${file}`);
  try {
    processFile(file);
  } catch (error) {
    console.error(`❌ 处理失败: ${file}`, error.message);
  }
  console.log('');
});

console.log('✨ 批量处理完成！');
