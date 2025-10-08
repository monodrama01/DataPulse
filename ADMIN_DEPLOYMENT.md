# 后台管理系统部署指南

## 📋 系统概述

这是一个完整的内容管理后台系统，让你可以无需改代码就能更新前端的文字、代码片段和图表内容。

### 技术栈
- **后端**: Python Flask + MySQL + JWT认证
- **前端**: Next.js + TypeScript + Tailwind CSS
- **数据库**: MySQL (使用你现有的数据库)

---

## 🚀 快速部署

### 1. 数据库初始化

使用你现有的数据库连接信息：
- **主机**: localhost:3306
- **数据库**: windows
- **用户**: root
- **密码**: li441195092

执行数据库初始化脚本：

```bash
# 进入项目目录
cd /path/to/your/project

# 连接数据库并执行初始化脚本
mysql -h localhost -u root -pli441195092 windows < database/schema.sql
```

### 2. 后端API服务部署

#### 安装Python依赖

```bash
# 进入API目录
cd api

# 安装依赖 (建议使用虚拟环境)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 启动后端服务

```bash
# 在api目录下运行
python server.py
```

服务将在 `http://localhost:5000` 启动

### 3. 前端集成

#### 安装前端依赖

```bash
# 在项目根目录
npm install react-syntax-highlighter
npm install @types/react-syntax-highlighter
```

#### 启动前端开发服务器

```bash
npm run dev
```

---

## 🔧 系统配置

### 默认管理员账户
- **用户名**: `admin`
- **密码**: `admin123`

### API端点配置
后端API默认运行在 `http://localhost:5000`，如需修改：

1. 编辑 `api/server.py` 中的端口配置
2. 更新前端文件中的 `API_BASE_URL`：
   - `app/admin/page.tsx`
   - `lib/content-api.ts`
   - `components/DynamicContent.tsx`

---

## 📱 使用指南

### 访问后台管理

1. 启动后端和前端服务
2. 访问 `http://localhost:3000/admin`
3. 使用默认账户登录

### 内容管理功能

#### 1. 文本内容管理
- **位置标识**: 用于标识内容在前端的显示位置，如 `homepage_intro`
- **页面路径**: 内容所属的页面，如 `/machine-learning/svm`
- **富文本支持**: 支持HTML标签，如 `<h1>`、`<p>`、`<strong>` 等

#### 2. 代码片段管理
- **支持语言**: Python, JavaScript, SQL, HTML, CSS, Bash
- **语法高亮**: 自动根据语言类型进行语法高亮
- **代码标题**: 显示在代码框上方的说明文字

#### 3. 图表管理
- **上传图表**: 支持 PNG, JPG, SVG 格式
- **生成图表**: 通过数据生成图表（可扩展）
- **尺寸控制**: 小/中/大三种展示尺寸

---

## 🔗 前端集成

### 在现有页面中使用动态内容

```tsx
import { DynamicText, DynamicCode, DynamicChart } from '@/components/DynamicContent'

export default function YourPage() {
  return (
    <div>
      {/* 动态文本内容 */}
      <DynamicText 
        positionKey="page_intro" 
        fallbackContent="<p>默认内容</p>"
        className="mb-4"
      />
      
      {/* 动态代码片段 */}
      <DynamicCode 
        positionKey="example_code"
        fallbackContent="# 默认代码示例"
        className="mb-6"
      />
      
      {/* 动态图表 */}
      <DynamicChart 
        positionKey="analysis_chart"
        className="mb-8"
      />
    </div>
  )
}
```

### 批量获取页面内容

```tsx
import { getContentByPage } from '@/lib/content-api'

// 在服务端组件中使用
export default async function MachineLearningPage() {
  const content = await getContentByPage('/machine-learning/svm')
  
  return (
    <div>
      {content.texts?.map(text => (
        <div key={text.id} dangerouslySetInnerHTML={{__html: text.content}} />
      ))}
    </div>
  )
}
```

---

## 🔐 安全配置

### 生产环境配置

1. **更改JWT密钥**:
   ```python
   # 在 api/server.py 中
   app.config['JWT_SECRET_KEY'] = 'your-super-secret-key-here'
   ```

2. **更新管理员密码**:
   ```sql
   -- 生成新密码哈希
   UPDATE admin_users SET password = '$2b$12$NewHashedPasswordHere' WHERE username = 'admin';
   ```

3. **配置CORS**:
   ```python
   # 在生产环境中限制CORS域名
   CORS(app, origins=['http://yourdomain.com'])
   ```

---

## 📊 数据库表结构

### admin_users (管理员用户表)
- `id`: 主键
- `username`: 用户名
- `password`: 密码哈希
- `email`: 邮箱
- `created_at/updated_at`: 时间戳

### content_texts (文本内容表)
- `id`: 主键
- `position_key`: 位置标识
- `title`: 标题
- `content`: 内容 (支持HTML)
- `page_path`: 页面路径
- `status`: 状态 (draft/published)

### content_codes (代码片段表)
- `id`: 主键
- `title`: 标题
- `language`: 编程语言
- `code`: 代码内容
- `description`: 描述
- `position_key`: 位置标识
- `page_path`: 页面路径

### content_charts (图表表)
- `id`: 主键
- `title`: 标题
- `chart_type`: 图表类型
- `data_source`: 数据来源 (upload/generated)
- `file_path`: 文件路径
- `chart_data`: 图表数据 (JSON)
- `display_size`: 显示尺寸

---

## 🐛 常见问题

### 1. 数据库连接失败
- 检查数据库服务是否启动
- 验证连接参数是否正确
- 确认数据库用户权限

### 2. CORS错误
- 确保后端CORS配置正确
- 检查前端API_BASE_URL设置

### 3. 文件上传失败
- 检查uploads目录权限
- 确认文件类型是否支持

### 4. 前端内容不更新
- 检查API服务是否正常运行
- 清除浏览器缓存
- 检查position_key是否正确

---

## 🔄 扩展功能

### 添加新的内容类型
1. 在数据库中创建新表
2. 在后端API中添加相应的路由
3. 在前端管理页面添加管理界面
4. 创建对应的动态组件

### 集成富文本编辑器
可以集成如TinyMCE或Quill等富文本编辑器来提升编辑体验。

### 添加图表生成功能
集成Chart.js或D3.js来支持动态图表生成。

---

## 📞 技术支持

如果在部署过程中遇到问题，请检查：

1. **日志信息**: 查看后端控制台输出
2. **网络连接**: 确保前后端能够正常通信
3. **权限设置**: 检查文件和数据库权限
4. **端口占用**: 确保5000和3000端口未被占用

部署完成后，你就可以通过后台管理系统轻松更新网站内容，无需修改代码！
