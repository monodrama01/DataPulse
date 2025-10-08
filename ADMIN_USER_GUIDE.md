# 🎯 后台管理系统 - 详细使用指南

## 📋 功能概览

后台管理系统有三个主要功能模块：
1. **📝 文本内容管理** - 管理网站的文字内容
2. **💻 代码片段管理** - 管理代码示例
3. **📊 图表管理** - 管理图片和图表

---

## 📝 文本内容管理

### ➕ 添加新文本内容

1. **点击"文本内容"标签页**
2. **点击"新增文本"按钮**
3. **填写表单**：
   - **位置标识**：如 `homepage_intro`（用于标识在前端的显示位置）
   - **页面路径**：如 `/machine-learning/svm`（内容所属页面）
   - **标题**：内容的标题
   - **内容**：支持HTML标签的富文本内容

### 📝 HTML标签示例：
```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<p>段落文字</p>
<strong>加粗文字</strong>
<em>斜体文字</em>
<ul>
  <li>无序列表项1</li>
  <li>无序列表项2</li>
</ul>
<ol>
  <li>有序列表项1</li>
  <li>有序列表项2</li>
</ol>
```

### ✏️ 编辑现有文本
1. **在文本列表中找到要编辑的内容**
2. **点击"编辑"按钮**
3. **修改内容后点击"保存"**

### 🗑️ 删除文本
1. **点击要删除内容的"删除"按钮**
2. **在弹出的确认框中点击"确定"**

---

## 💻 代码片段管理

### ➕ 添加新代码片段

1. **点击"代码片段"标签页**
2. **点击"新增代码"按钮**
3. **填写表单**：
   - **标题**：代码片段的名称，如"SVM基础示例"
   - **编程语言**：选择Python、JavaScript、SQL等
   - **位置标识**：如 `svm_example_1`
   - **页面路径**：如 `/machine-learning/supervised/svm`
   - **代码内容**：输入完整的代码
   - **描述**：代码的说明文字（可选）

### 💻 代码示例：
```python
# Python示例
from sklearn import svm
import numpy as np

# 创建数据
X = [[0, 0], [1, 1]]
y = [0, 1]

# 训练模型
clf = svm.SVC()
clf.fit(X, y)

# 预测
print(clf.predict([[2., 2.]]))
```

### ✏️ 编辑代码片段
1. **在代码列表中找到要编辑的代码**
2. **点击"编辑"按钮**
3. **修改后点击"保存"**

---

## 📊 图表管理

### 📤 上传图表文件

1. **点击"图表管理"标签页**
2. **点击"上传图表"按钮**
3. **选择图片文件**（支持PNG、JPG、SVG格式）
4. **填写图表信息**：
   - **标题**：图表名称
   - **图表类型**：选择折线图、柱状图等
   - **位置标识**：如 `analysis_chart_1`
   - **展示尺寸**：小、中、大

### 📊 生成图表（高级功能）
1. **点击"生成图表"按钮**
2. **输入图表数据**（JSON格式）
3. **配置图表样式**
4. **保存生成的图表**

---

## 🔗 在前端页面中使用内容

### 方法1：使用动态组件（推荐）

在任何页面文件中添加：

```tsx
import { DynamicText, DynamicCode, DynamicChart } from '@/components/DynamicContent'

export default function YourPage() {
  return (
    <div>
      {/* 显示文本内容 */}
      <DynamicText positionKey="homepage_intro" />
      
      {/* 显示代码片段 */}
      <DynamicCode positionKey="svm_example_1" />
      
      {/* 显示图表 */}
      <DynamicChart positionKey="analysis_chart_1" />
    </div>
  )
}
```

### 方法2：API直接调用

```tsx
// 获取特定位置的内容
const content = await fetch('http://localhost:5000/api/public/content?position_key=homepage_intro')
const data = await content.json()
```

---

## 🎯 实际使用场景

### 场景1：更新首页介绍文字

1. **后台操作**：
   - 位置标识：`homepage_intro`
   - 页面路径：`/`
   - 内容：`<h2>欢迎来到我的数据分析网站</h2><p>这里有最新的机器学习内容...</p>`

2. **前端使用**：
   ```tsx
   <DynamicText positionKey="homepage_intro" />
   ```

### 场景2：添加新的代码示例

1. **后台操作**：
   - 标题：`决策树分类示例`
   - 语言：`python`
   - 位置标识：`decision_tree_example`
   - 页面路径：`/machine-learning/supervised/decision-trees`
   - 代码：完整的Python代码

2. **前端使用**：
   ```tsx
   <DynamicCode positionKey="decision_tree_example" />
   ```

### 场景3：上传数据可视化图表

1. **后台操作**：
   - 上传PNG图片文件
   - 标题：`用户增长趋势图`
   - 位置标识：`user_growth_chart`
   - 尺寸：`medium`

2. **前端使用**：
   ```tsx
   <DynamicChart positionKey="user_growth_chart" />
   ```

---

## 🚀 最佳实践

### 📍 位置标识命名规范
- 使用英文和下划线
- 描述性命名：`page_section_content`
- 示例：
  - `homepage_hero_title`
  - `svm_intro_text`
  - `python_basic_example`
  - `sales_chart_2024`

### 📂 页面路径规范
- 使用完整路径：`/machine-learning/supervised/svm`
- 根页面使用：`/`
- 保持与实际页面路径一致

### 💾 内容管理建议
1. **定期备份**：重要内容建议复制保存
2. **测试预览**：修改后先预览再发布
3. **版本控制**：重大修改前记录原内容
4. **分类管理**：使用页面路径分类组织内容

---

## ❓ 常见问题

**Q: 为什么内容不显示？**
A: 检查position_key是否正确，确保前端页面使用了对应的动态组件

**Q: 如何批量管理内容？**
A: 可以按页面路径筛选，统一管理同一页面的所有内容

**Q: 代码高亮不正确？**
A: 确保选择了正确的编程语言类型

**Q: 图片显示不了？**
A: 检查图片格式是否支持（PNG/JPG/SVG），文件大小是否合理

---

## 🎉 开始使用

现在你可以：
1. 🎯 **立即更新网站内容** - 无需修改代码
2. 📝 **管理所有文字** - 从标题到段落
3. 💻 **更新代码示例** - 保持技术内容最新
4. 📊 **上传新图表** - 丰富视觉内容

**开始你的内容管理之旅吧！** ✨
