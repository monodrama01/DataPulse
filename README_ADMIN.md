# 🎯 后台管理系统 - 快速使用指南

## 🚀 一键启动（Windows）

双击运行 `start_admin_system.bat` 文件，系统会自动：
- ✅ 检查数据库连接
- ✅ 初始化数据库表
- ✅ 启动前端和后端服务
- ✅ 自动打开管理页面

## 📱 访问管理后台

1. **地址**: http://localhost:3000/admin
2. **账户**: `admin`
3. **密码**: `admin123`

## 🎨 主要功能

### 📝 文本内容管理
- 富文本编辑（支持HTML标签）
- 位置标识系统（精确控制显示位置）
- 实时预览和保存

### 💻 代码片段管理  
- 多语言支持（Python, JavaScript, SQL等）
- 自动语法高亮
- 代码标题和描述

### 📊 图表管理
- 文件上传（PNG, JPG, SVG）
- 数据生成图表
- 三种尺寸选择

## 🔗 在页面中使用动态内容

```tsx
import { DynamicText, DynamicCode, DynamicChart } from '@/components/DynamicContent'

export default function YourPage() {
  return (
    <div>
      {/* 动态文本 */}
      <DynamicText positionKey="page_intro" />
      
      {/* 动态代码 */}
      <DynamicCode positionKey="example_code" />
      
      {/* 动态图表 */}
      <DynamicChart positionKey="analysis_chart" />
    </div>
  )
}
```

## 🛠️ 手动启动（如果自动启动失败）

### 1. 初始化数据库
```bash
mysql -h localhost -u root -pli441195092 windows < database/schema.sql
```

### 2. 启动后端API
```bash
cd api
pip install -r requirements.txt
python server.py
```

### 3. 启动前端
```bash
npm run dev
```

## ❓ 常见问题

**Q: 数据库连接失败？**
A: 确保MySQL服务已启动，检查用户名密码是否正确

**Q: 端口被占用？**  
A: 确保5000和3000端口未被其他程序占用

**Q: 内容不显示？**
A: 检查position_key是否正确，确保后端API服务正常运行

**Q: 如何修改管理员密码？**
A: 在数据库中更新admin_users表的password字段

## 🎉 开始使用

现在你可以：
1. 🎯 **无需改代码更新内容** - 通过后台直接编辑
2. 🔄 **实时内容同步** - 前端立即显示更新
3. 📍 **精确位置控制** - 通过位置标识控制显示位置
4. 🎨 **多种内容类型** - 文本、代码、图表统一管理

享受无代码内容管理的便利吧！✨
