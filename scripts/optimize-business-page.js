const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/business/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('开始优化业务知识页面...\n');

// 1. 替换行业分析按钮为品牌色
content = content.replace(
  /bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500\/50/g,
  'bg-[#19bcc8] hover:bg-[#17a8b4] text-white shadow-lg'
);

content = content.replace(
  /bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-400\/50/g,
  'bg-[#19bcc8] hover:bg-[#17a8b4] text-white shadow-lg'
);

console.log('✓ 已替换行业分析按钮样式');

// 2. 替换返回顶部按钮
content = content.replace(
  /<Button[\s\S]*?onClick={scrollToTop}[\s\S]*?<ChevronUp[\s\S]*?\/Button>/,
  `<button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-[#19bcc8] hover:bg-[#17a8b4] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="返回顶部"
      >
        <ArrowUp className="h-6 w-6" />
      </button>`
);

console.log('✓ 已替换返回顶部按钮样式');

// 保存文件
fs.writeFileSync(filePath, content, 'utf-8');
console.log('\n✅ 业务知识页面优化完成！');


