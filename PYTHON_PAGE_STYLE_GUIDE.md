# Python页面样式配置完整指南

## 📋 目录
1. [颜色系统](#颜色系统)
2. [代码块样式](#代码块样式)
3. [布局结构](#布局结构)
4. [组件样式](#组件样式)
5. [交互效果](#交互效果)
6. [完整代码示例](#完整代码示例)

---

## 🎨 颜色系统

### 品牌色
```javascript
主品牌色: #19bcc8  // 青绿色，用于所有强调元素
悬停色: #17a8b4    // 品牌色深色版本
```

### 代码块配色
```javascript
// 代码块背景和边框
backgroundColor: '#e8f5f3'  // 淡青绿色背景
borderColor: '#19bcc8'      // 品牌色边框

// 代码文字颜色
注释行（# 开头）: '#888'   // 灰色
普通代码: '#000'           // 黑色
```

### 文字颜色
```javascript
// 浅色模式
一级标题: 'text-gray-900'
二级标题: 'text-gray-900'
正文: 'text-gray-700'
辅助文字: 'text-gray-600'

// 深色模式
一级标题: 'text-gray-100'
二级标题: 'text-gray-100'
正文: 'text-gray-300'
辅助文字: 'text-gray-400'
```

### 背景颜色
```javascript
// 浅色模式
全局背景: 'bg-gray-50'
卡片背景: 'bg-white'
侧边栏: 'bg-white/95'
内容区背景: 'bg-gray-50'

// 深色模式
全局背景: 'bg-gray-900'
卡片背景: 'bg-gray-800'
侧边栏: 'bg-gray-800/95'
内容区背景: 'bg-gray-900/50'
```

### 边框颜色
```javascript
// 浅色模式
默认边框: 'border-gray-200'
激活边框: 'border-[#19bcc8]'

// 深色模式
默认边框: 'border-gray-700'
激活边框: 'border-[#19bcc8]'
```

---

## 💻 代码块样式

### 核心配置
```javascript
// <pre> 标签样式
<pre 
  className="p-4 rounded-lg border overflow-x-auto font-mono text-sm"
  style={{
    backgroundColor: '#e8f5f3',  // 淡青绿色背景
    borderColor: '#19bcc8',      // 品牌色边框
    color: '#000'                // 默认黑色文字
  }}
>
```

### 代码渲染逻辑
```javascript
<code>
  {item.code.split('\n').map((line, idx, arr) => {
    const isComment = line.trim().startsWith('#');
    const prevLine = idx > 0 ? arr[idx - 1].trim() : '';
    // 如果当前行是注释，且前一行不是空行也不是注释，则添加空行
    const needsSpace = isComment && prevLine.length > 0 && !prevLine.startsWith('#');
    
    return (
      <div key={idx}>
        {needsSpace && <div>&nbsp;</div>}
        <div style={{ color: isComment ? '#888' : '#000' }}>
          {line || '\u00A0'}
        </div>
      </div>
    );
  })}
</code>
```

### 关键特性
1. ✅ **注释自动识别**: 以 `#` 开头的行显示为灰色 `#888`
2. ✅ **自动空行**: 注释前自动添加空行（如果前一行是代码）
3. ✅ **空行占位**: 使用 `\u00A0` 防止空行被折叠
4. ✅ **性能优化**: 简单逻辑，无正则处理，不影响性能

---

## 📐 布局结构

### 页面容器
```javascript
<div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
```

### 最大宽度容器
```javascript
<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
```

### 侧边栏 + 主内容区
```javascript
<div className="flex gap-8">
  {/* 侧边栏 */}
  <aside className="hidden lg:block w-72 flex-shrink-0">
    ...
  </aside>
  
  {/* 主内容区 */}
  <main className="flex-1 min-w-0">
    ...
  </main>
</div>
```

---

## 🎯 组件样式

### 1. 面包屑导航
```javascript
<div className={isDark ? 'bg-gray-800 border-gray-700 border-b sticky top-0 z-10' : 'bg-white border-gray-200 border-b sticky top-0 z-10'}>
  <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center space-x-2 h-16">
      <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
        <Home size={20} />
        <span className="font-medium">主页</span>
      </Link>
      <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>/</span>
      <span className={isDark ? 'text-gray-100 font-medium' : 'text-gray-900 font-medium'}>Python数据分析</span>
    </div>
  </div>
</div>
```

### 2. 侧边栏导航
```javascript
<div className={isDark ? 'sticky top-24 bg-gray-800/95 border-gray-700 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto' : 'sticky top-24 bg-white/95 border-gray-200 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto'}>
  <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
    {getLucideIcon('📖', 'w-6 h-6 text-[#19bcc8]')}
    <span className={isDark ? 'text-gray-100' : 'text-gray-800'}>目录导航</span>
  </h3>
  <nav className="space-y-1.5">
    {navItems.map((item) => {
      const isActive = activeSection === item.id
      return (
        <a
          key={item.id}
          href={'#' + item.id}
          className={
            'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
            (isActive
              ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
              : (isDark ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
            )
          }
        >
          {getLucideIcon(item.icon, 'w-5 h-5 text-[#19bcc8]')}
          <span className={'text-sm font-medium ' + (isActive ? 'text-[#19bcc8]' : (isDark ? 'text-gray-200' : 'text-gray-700'))}>
            {item.label}
          </span>
        </a>
      )
    })}
  </nav>
</div>
```

### 3. PART标题卡片
```javascript
<div className={'rounded-xl p-6 shadow-sm border mb-10 ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
  <div className="flex items-center gap-4 mb-3">
    <div className="w-1 h-12 bg-[#19bcc8] rounded-full"></div>
    <h2 className={'text-3xl font-extrabold ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>{part.title}</h2>
  </div>
  <p className={'text-base ml-5 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>{part.subtitle}</p>
</div>
```

### 4. 内容卡片
```javascript
<div className={'rounded-xl border p-5 transition-all duration-300 shadow-sm hover:shadow-md ' + (isDark ? 'bg-gray-800 border-gray-700 hover:border-[#19bcc8]' : 'bg-white border-gray-200 hover:border-[#19bcc8]')}>
  <div className="flex items-start gap-4">
    {getLucideIcon(item.emoji, 'w-6 h-6 text-[#19bcc8] flex-shrink-0 mt-1')}
    <div className="flex-1 min-w-0">
      <h3 className={'text-lg font-bold mb-2 flex items-center gap-2 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
        {item.title}
      </h3>
      <p className={'mb-3 text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-700')}>
        {item.desc}
      </p>
      {/* 详细说明区域 */}
      {item.detail && (
        <div className={'p-4 rounded-lg border-l-2 border-[#19bcc8] mb-4 ' + (isDark ? 'bg-gray-900/50' : 'bg-gray-50')}>
          {item.detail.split('\\n').map((part, i) => (
            <p key={i} className={'text-sm mb-2 last:mb-0 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>
              {part.startsWith('**') ? (
                <>
                  <span className="font-bold text-[#19bcc8]">{part.split('**')[1]}</span>
                  {part.split('**')[2]}
                </>
              ) : (
                part
              )}
            </p>
          ))}
        </div>
      )}
      {/* 代码块 */}
      {item.code && (
        <pre 
          className="p-4 rounded-lg border overflow-x-auto font-mono text-sm"
          style={{
            backgroundColor: '#e8f5f3',
            borderColor: '#19bcc8',
            color: '#000'
          }}
        >
          {/* 代码渲染逻辑见上方 */}
        </pre>
      )}
    </div>
  </div>
</div>
```

### 5. 返回顶部按钮
```javascript
{showBackToTop && (
  <button
    onClick={scrollToTop}
    className={
      'fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 bg-[#19bcc8] hover:bg-[#17a8b4] text-white'
    }
    aria-label="返回顶部"
  >
    <ArrowUp className="w-6 h-6" />
  </button>
)}
```

### 6. 模块分隔线（统一三点样式）
```jsx
{partIdx < parts.length - 1 && (
  <div className="flex justify-center items-center gap-2 my-16">
    <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
    <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
    <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
  </div>
)}
```

---

## ✨ 交互效果

### 滚动高亮（子优先 + 中线命中）
```jsx
useEffect(() => {
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 400)

    const childSections = [
      // 子模块 id（从上到下顺序）
      // 例如：'aarrr-model', 'ecommerce-model', ...
    ]
    const parentSections = [
      // 父级 section id（从上到下顺序）
      // 例如：'overview', 'business-cognition', ...
    ]

    let found = null
    const mid = window.innerHeight / 2

    // 1) 子元素优先：命中视口中线即高亮
    for (const id of childSections) {
      const el = document.getElementById(id)
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (r.top <= mid && r.bottom >= mid) { found = id; break }
    }

    // 2) 若未命中，再检测父元素
    if (!found) {
      for (const id of parentSections) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom >= mid) { found = id; break }
      }
    }

    if (found) setActiveSection(found)
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

要点：
- 子优先：先检测具体卡片，再检测父级 Section。
- 中线命中：当元素覆盖视口中线时判定为“当前”。
- 顺序重要：`childSections`/`parentSections` 按页面从上到下排序。

### Hover效果
```javascript
// 导航项 hover
hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30

// 卡片 hover
hover:shadow-md hover:border-[#19bcc8]

// 按钮 hover
hover:scale-110 hover:bg-[#17a8b4]
```

---

## 🔧 完整代码示例

### 必要的 imports
```javascript
"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon"
import { Home, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"
```

### 组件状态
```javascript
export default function PythonPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState('intro')
  const [showBackToTop, setShowBackToTop] = useState(false)
  
  const isDark = theme === 'dark'
  
  // ... 其他逻辑
}
```

---

## 📝 应用到其他模块的步骤

### 1. 复制导入和状态管理
- 复制所有 import 语句
- 复制 `useState` 和 `useEffect` 逻辑
- 修改 `sections` 数组为对应模块的section id

### 2. 复制代码块样式
```javascript
// 直接复制这段代码
<pre 
  className="p-4 rounded-lg border overflow-x-auto font-mono text-sm"
  style={{
    backgroundColor: '#e8f5f3',
    borderColor: '#19bcc8',
    color: '#000'
  }}
>
  <code>
    {item.code.split('\n').map((line, idx, arr) => {
      const isComment = line.trim().startsWith('#');
      const prevLine = idx > 0 ? arr[idx - 1].trim() : '';
      const needsSpace = isComment && prevLine.length > 0 && !prevLine.startsWith('#');
      
      return (
        <div key={idx}>
          {needsSpace && <div>&nbsp;</div>}
          <div style={{ color: isComment ? '#888' : '#000' }}>
            {line || '\u00A0'}
          </div>
        </div>
      );
    })}
  </code>
</pre>
```

### 3. 统一颜色类名
- 所有品牌色: `text-[#19bcc8]` 或 `bg-[#19bcc8]` 或 `border-[#19bcc8]`
- 激活状态: `bg-[#19bcc8]/10` `border-[#19bcc8]`
- Hover: `hover:bg-[#19bcc8]/5` `hover:border-[#19bcc8]/30`

### 4. 复制卡片样式
- PART标题卡片
- 内容卡片
- 详细说明区域
- 分隔线

### 5. 检查清单
- [ ] 代码块背景色: `#e8f5f3`
- [ ] 代码块边框色: `#19bcc8`
- [ ] 注释颜色: `#888`
- [ ] 普通代码颜色: `#000`
- [ ] 注释前自动空行
- [ ] 所有图标使用 `getLucideIcon()`
- [ ] 导航高亮使用 `text-[#19bcc8]`
- [ ] 返回顶部按钮 `bg-[#19bcc8]`

---

## 🎨 快速参考

### 品牌色使用场景
| 场景 | 类名/样式 |
|------|----------|
| 图标颜色 | `text-[#19bcc8]` |
| 激活状态背景 | `bg-[#19bcc8]/10` |
| 激活状态边框 | `border-[#19bcc8]` |
| 激活状态文字 | `text-[#19bcc8]` |
| Hover背景 | `hover:bg-[#19bcc8]/5` |
| Hover边框 | `hover:border-[#19bcc8]/30` |
| 按钮背景 | `bg-[#19bcc8]` |
| 按钮Hover | `hover:bg-[#17a8b4]` |
| 代码块边框 | `borderColor: '#19bcc8'` |
| 强调色 | `border-l-2 border-[#19bcc8]` |

### 间距规范
| 元素 | 间距 |
|------|------|
| 卡片内边距 | `p-5` 或 `p-6` |
| 标题底部间距 | `mb-6` 或 `mb-8` |
| 段落间距 | `mb-3` 或 `mb-4` |
| PART之间间距 | `space-y-24` |
| 分隔线上下间距 | `my-16` |
| 导航项间距 | `space-y-1.5` |

---

## ✅ 完成！

这份配置指南包含了Python页面的所有样式细节，可以直接复制到其他模块使用！

---

## ⚠️ 重要注意事项

### 1. **禁止使用的样式**
❌ **不要使用五颜六色的渐变背景**
- 错误示例：`bg-gradient-to-br from-blue-900/30 to-purple-900/30`
- 错误示例：`bg-gradient-to-r from-blue-50 via-blue-100/50`
- 正确做法：统一使用白色或灰色背景
  - 浅色模式：`bg-white` 或 `bg-gray-50`
  - 深色模式：`bg-gray-800` 或 `bg-gray-900`

❌ **不要使用彩色边框**
- 错误示例：`border-blue-700`、`border-purple-500/30`
- 正确做法：统一使用灰色或品牌色边框
  - 普通边框：`border-gray-200` (浅色) / `border-gray-700` (深色)
  - 强调边框：`border-[#19bcc8]`

❌ **不要使用彩色阴影**
- 错误示例：`shadow-lg shadow-blue-500/30`
- 正确做法：使用普通阴影 `shadow-sm` 或 `shadow-md`

❌ **标题不要使用渐变文字**
- 错误示例：`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200`
- 正确做法：使用纯色文字
  - 一级标题：`text-gray-900` (浅色) / `text-gray-100` (深色)
  - 品牌色强调：`text-[#19bcc8]`

### 2. **图表颜色例外**
✅ **图表可以使用多种颜色**
- 数据可视化图表（ECharts、D3.js等）可以保留彩色
- 这有助于区分不同数据系列
- 示例：漏斗图、象限图、对比图等

### 3. **必须遵守的规范**

#### 一级标题（PART标题）
```jsx
<div className={'rounded-xl p-6 shadow-sm border mb-10 ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
  <div className="flex items-center gap-4 mb-3">
    <div className="w-1 h-12 bg-[#19bcc8] rounded-full"></div>
    <h2 className={'text-3xl font-extrabold ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
      PART 01 标题名称
    </h2>
  </div>
  <p className={'text-base ml-5 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>
    副标题说明文字
  </p>
</div>
```

#### 二级标题（内容卡片标题）
```jsx
<div className={'rounded-xl border p-5 transition-all duration-300 shadow-sm hover:shadow-md ' + (isDark ? 'bg-gray-800 border-gray-700 hover:border-[#19bcc8]' : 'bg-white border-gray-200 hover:border-[#19bcc8]')}>
  <div className="flex items-start gap-4">
    {getLucideIcon('🎯', 'w-6 h-6 text-[#19bcc8] flex-shrink-0 mt-1')}
    <div className="flex-1 min-w-0">
      <h3 className={'text-lg font-bold mb-2 flex items-center gap-2 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
        标题名称
      </h3>
      <p className={'mb-3 text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-700')}>
        描述文字
      </p>
      {/* 内容 */}
    </div>
  </div>
</div>
```

#### 模块间隔
```jsx
{/* 不同PART之间的分隔线 */}
<div className="flex items-center justify-center my-16">
  <div className={'w-2 h-2 rounded-full mx-2 bg-[#19bcc8]'}></div>
  <div className={'w-2 h-2 rounded-full mx-2 bg-[#19bcc8]'}></div>
  <div className={'w-2 h-2 rounded-full mx-2 bg-[#19bcc8]'}></div>
</div>
```

#### Section间隔
- 每个 section: `mb-16` 或 `mb-20`
- 卡片之间: `space-y-6`
- PART之间: `my-16` (三个点分隔)

### 4. **图标使用规范**
✅ **统一使用 `getLucideIcon()`**
```jsx
{getLucideIcon('🎯', 'w-6 h-6 text-[#19bcc8]')}
```

❌ **不要直接使用emoji文字**
```jsx
<div className="text-4xl">🎯</div>  // 错误！
```

❌ **不要直接导入Lucide组件**
```jsx
<Brain className="h-6 w-6" />  // 错误！应该用getLucideIcon
```

### 5. **详细说明区域**
```jsx
<div className={'p-4 rounded-lg border-l-2 border-[#19bcc8] mb-4 ' + (isDark ? 'bg-gray-900/50' : 'bg-gray-50')}>
  <p className={'text-sm mb-2 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>
    <span className="font-bold text-[#19bcc8]">标签名称</span>
    内容文字
  </p>
</div>
```

### 6. **禁止的图标包装样式**
❌ **不要使用彩色渐变图标背景**
```jsx
// 错误示例
<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
  <Brain className="h-7 w-7 text-white" />
</div>
```

✅ **正确做法：直接使用品牌色图标**
```jsx
{getLucideIcon('🧠', 'w-6 h-6 text-[#19bcc8]')}
```

---

## 📝 完整检查清单

应用到新页面时，请检查：

- [ ] 所有渐变背景已移除，改为 `bg-white` 或 `bg-gray-50` (浅色) / `bg-gray-800` (深色)
- [ ] 所有彩色边框已移除，改为 `border-gray-200` 或 `border-[#19bcc8]`
- [ ] 所有彩色阴影已移除，改为 `shadow-sm`
- [ ] 一级标题使用左侧品牌色竖线 + `text-3xl font-extrabold`
- [ ] 二级标题使用品牌色图标 + `text-lg font-bold`
- [ ] 所有图标使用 `getLucideIcon()` 函数
- [ ] 图标颜色统一为 `text-[#19bcc8]`
- [ ] 模块间使用三个点分隔 (`my-16`)
- [ ] 卡片间距为 `space-y-6`
- [ ] Section间距为 `mb-16` 或 `mb-20`
- [ ] Hover效果为 `hover:shadow-md hover:border-[#19bcc8]`
- [ ] 图表颜色可以保留（不受限制）

---

## 🎨 允许保留颜色的场景

**可以使用多种颜色的场景：**
1. 数据可视化图表（ECharts、D3、Canvas等）
2. 数据统计数字（如 `text-[#19bcc8]` 用于强调数字）
3. Badge标签（如 `bg-[#19bcc8]`）
4. 品牌色强调元素（限定使用 `#19bcc8` 和 `#17a8b4`）

**禁止使用多种颜色的场景：**
1. 背景色（统一白色/灰色）
2. 边框色（统一灰色或品牌色）
3. 标题文字（统一灰色或品牌色）
4. 卡片装饰（不要用彩色渐变）

---

这份配置指南确保所有页面视觉风格统一、专业、简洁！
