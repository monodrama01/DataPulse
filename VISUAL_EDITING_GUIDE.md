# 🎨 可视化内容编辑系统使用指南

## 🚀 快速开始

### 1. 启动系统
```bash
# 启动前端
npm run dev

# 启动后端（新终端）
python api/server.py
```

### 2. 管理员登录
- 访问：http://localhost:3000/admin
- 用户名：`admin`
- 密码：`admin123`

### 3. 开启编辑模式
登录后，在任何页面URL后添加 `?admin=true`

例如：
- http://localhost:3000/machine-learning/supervised/svm?admin=true
- http://localhost:3000/test-edit?admin=true

## 🎯 核心功能

### ✨ 可视化编辑
- **所见即所得**：直接在页面上编辑内容
- **悬停编辑**：鼠标悬停显示彩色编辑按钮
- **实时保存**：编辑后立即保存到数据库

### 🎨 多种内容类型

| 类型 | 按钮颜色 | 图标 | 功能 |
|------|----------|------|------|
| 文本 | 🔵 蓝色 | 📄 | HTML富文本编辑 |
| 代码 | 🟢 绿色 | 💻 | 多语言代码编辑 |
| 图表 | 🟣 紫色 | 📊 | ECharts图表生成 |
| 列表 | 🟠 橙色 | 📋 | 有序/无序列表 |
| 标题 | 🔴 红色 | 📝 | 标题级别编辑 |

### 📊 ECharts图表支持

#### 支持的图表类型：
1. **折线图** - 趋势分析
2. **柱状图** - 数据对比
3. **饼图** - 比例展示

#### 图表尺寸：
- 小：300px
- 中：400px  
- 大：500px

#### 自定义配置：
支持完整的ECharts配置JSON，包括：
- 标题、图例
- 坐标轴设置
- 数据系列
- 颜色主题
- 交互功能

## 🛠️ 使用方法

### 📝 编辑文本内容
1. 悬停在文本上，点击🔵蓝色按钮
2. 在弹出的编辑器中修改内容
3. 支持HTML标签：
   ```html
   <h1>一级标题</h1>
   <h2>二级标题</h2>
   <p>段落文字</p>
   <strong>加粗</strong>
   <em>斜体</em>
   <ul><li>列表项</li></ul>
   <a href="#">链接</a>
   ```

### 💻 编辑代码片段
1. 悬停在代码区域，点击🟢绿色按钮
2. 设置代码标题和语言类型
3. 支持的语言：
   - Python
   - JavaScript/TypeScript
   - SQL
   - HTML/CSS
   - Bash
   - JSON

### 📊 创建/编辑图表
1. 悬停在图表区域，点击🟣紫色按钮
2. 选择图表类型（折线图/柱状图/饼图）
3. 编辑ECharts配置JSON
4. 实时预览图表效果
5. 设置显示尺寸

#### 示例配置：

**折线图：**
```json
{
  "title": { "text": "销售趋势" },
  "tooltip": { "trigger": "axis" },
  "xAxis": { 
    "type": "category", 
    "data": ["1月", "2月", "3月", "4月", "5月", "6月"] 
  },
  "yAxis": { "type": "value" },
  "series": [{ 
    "data": [120, 200, 150, 80, 70, 110], 
    "type": "line" 
  }]
}
```

**柱状图：**
```json
{
  "title": { "text": "产品销量对比" },
  "tooltip": { "trigger": "axis" },
  "xAxis": { 
    "type": "category", 
    "data": ["产品A", "产品B", "产品C", "产品D"] 
  },
  "yAxis": { "type": "value" },
  "series": [{ 
    "data": [320, 302, 301, 334], 
    "type": "bar",
    "itemStyle": { "color": "#3b82f6" }
  }]
}
```

**饼图：**
```json
{
  "title": { "text": "市场份额" },
  "tooltip": { "trigger": "item" },
  "series": [{
    "type": "pie",
    "radius": "60%",
    "data": [
      { "value": 1048, "name": "搜索引擎" },
      { "value": 735, "name": "直接访问" },
      { "value": 580, "name": "邮件营销" },
      { "value": 484, "name": "联盟广告" }
    ]
  }]
}
```

## 🎯 测试页面

### 完整功能测试
访问：http://localhost:3000/test-edit?admin=true

包含所有内容类型的测试示例

### 实际应用示例
访问：http://localhost:3000/machine-learning/supervised/svm?admin=true

在真实页面中使用编辑功能

## 🔧 开发集成

### 在组件中使用

```tsx
import { UniversalEditableContent } from "@/components/UniversalEditableContent"

// 文本内容
<UniversalEditableContent
  positionKey="unique_key_1"
  contentType="text"
  fallbackContent="<p>默认内容</p>"
  pagePath="/current/page"
/>

// 代码片段
<UniversalEditableContent
  positionKey="unique_key_2"
  contentType="code"
  fallbackContent="print('Hello World')"
  pagePath="/current/page"
/>

// 图表
<UniversalEditableContent
  positionKey="unique_key_3"
  contentType="chart"
  pagePath="/current/page"
/>
```

### 添加管理员工具栏

```tsx
import { AdminToolbar } from "@/components/AdminToolbar"

// 在页面底部添加
<AdminToolbar />
```

## 💡 最佳实践

### 1. 位置键命名
使用描述性的位置键：
```tsx
positionKey="homepage_intro_text"      // ✅ 好
positionKey="svm_performance_chart"    // ✅ 好
positionKey="text1"                    // ❌ 不好
```

### 2. 内容分类
- 长文本 → `contentType="text"`
- 标题 → `contentType="heading"`
- 代码示例 → `contentType="code"`
- 数据展示 → `contentType="chart"`
- 功能列表 → `contentType="list"`

### 3. 后备内容
始终提供有意义的后备内容：
```tsx
fallbackContent="<p>这里将显示产品介绍...</p>"  // ✅ 好
fallbackContent=""                              // ❌ 不好
```

## 🚨 注意事项

1. **权限控制**：只有登录的管理员才能看到编辑按钮
2. **数据备份**：编辑前建议备份重要数据
3. **浏览器兼容**：建议使用现代浏览器（Chrome、Firefox、Edge）
4. **网络连接**：编辑功能需要稳定的网络连接
5. **JSON格式**：图表配置必须是有效的JSON格式

## 🔍 故障排除

### 编辑按钮不显示
- 检查是否已登录管理员
- 确认URL包含 `?admin=true`
- 检查浏览器控制台错误

### 保存失败
- 检查后端服务是否运行
- 查看网络请求状态
- 验证数据格式是否正确

### 图表不显示
- 检查ECharts配置JSON格式
- 确认数据结构正确
- 查看浏览器控制台错误

## 📞 技术支持

如有问题，请检查：
1. 浏览器开发者工具的Console面板
2. 网络请求状态
3. 后端服务日志

---

🎉 **享受可视化编辑的便利吧！**
