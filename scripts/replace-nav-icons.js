const fs = require('fs');
const path = require('path');

// 需要处理的文件列表
const filesToProcess = [
  'app/data-thinking/page.tsx',
  'app/business/page.tsx',
  'app/statistics/page.tsx',
  'app/visualization/page.tsx',
  'app/excel/page.tsx',
  'app/machine-learning/page.tsx',
  'app/automation/page.tsx',
  'app/deep-learning/page.tsx',
  'app/window-functions/page.tsx',
  'app/sql/page.tsx',
];

// Emoji 到 Lucide 图标的映射
const emojiToLucideMap = {
  '📖': 'BookOpen',
  '📊': 'BarChart3',
  '🧠': 'Brain',
  '🎯': 'Target',
  '🏃': 'Activity',
  '⚠️': 'AlertTriangle',
  '🚀': 'Rocket',
  '💼': 'Briefcase',
  '🏢': 'Building2',
  '🛒': 'ShoppingCart',
  '✈️': 'Plane',
  '🍽️': 'Utensils',
  '🏥': 'Stethoscope',
  '🏭': 'Factory',
  '🎮': 'Gamepad2',
  '📈': 'TrendingUp',
  '🔬': 'Microscope',
  '📉': 'TrendingDown',
  '🎲': 'Dices',
  '👥': 'Users',
  '🌐': 'Globe',
  '📱': 'Smartphone',
  '💡': 'Lightbulb',
  '🔍': 'Search',
  '⚡': 'Zap',
  '🎨': 'Palette',
  '🌈': 'Rainbow',
  '🎭': 'Drama',
  '📝': 'FileEdit',
  '🖼️': 'Image',
  '📅': 'Calendar',
  '🔄': 'RotateCw',
  '🤖': 'Bot',
  '🧪': 'TestTube',
  '💻': 'Code',
  '📚': 'BookOpen',
  '🌟': 'Star',
  '🎓': 'GraduationCap',
  '🔮': 'Eye',
  '🎪': 'PartyPopper',
};

function processFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  文件不存在: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;
  let changeCount = 0;

  // 替换导航中的 emoji 为 getLucideIcon
  // 匹配模式：<span>emoji</span> 在导航链接中
  Object.entries(emojiToLucideMap).forEach(([emoji, lucideName]) => {
    // 替换导航中的 <span>emoji</span>
    const oldPattern1 = new RegExp(`<span>${emoji}</span>`, 'g');
    const newPattern1 = `{getLucideIcon('${emoji}', 'w-5 h-5 text-[#19bcc8]')}`;
    
    const matches1 = content.match(oldPattern1);
    if (matches1) {
      content = content.replace(oldPattern1, newPattern1);
      changeCount += matches1.length;
      modified = true;
    }

    // 替换页面标题处的 emoji
    const oldPattern2 = new RegExp(`<span>${emoji}</span>`, 'g');
    if (content.match(oldPattern2)) {
      // 这个已经在上面处理了
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ 已处理: ${filePath}`);
    console.log(`   替换了 ${changeCount} 个导航图标`);
  } else {
    console.log(`ℹ️  无需修改: ${filePath}`);
  }
}

// 执行批量处理
console.log('🎨 开始替换导航图标为 Lucide...\n');

filesToProcess.forEach((file, index) => {
  console.log(`[${index + 1}/${filesToProcess.length}] 处理: ${file}`);
  try {
    processFile(file);
  } catch (error) {
    console.error(`❌ 处理失败: ${file}`, error.message);
  }
  console.log('');
});

console.log('✨ 导航图标替换完成！');
