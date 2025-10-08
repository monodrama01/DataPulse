-- 后台管理系统数据库表结构
-- 使用你现有的数据库连接信息

-- 1. 管理员用户表
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '管理员用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码哈希',
    email VARCHAR(100) COMMENT '邮箱',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT='管理员用户表';

-- 2. 文本内容表
CREATE TABLE IF NOT EXISTS content_texts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position_key VARCHAR(100) NOT NULL COMMENT '前端展示位置标识，如homepage_intro',
    title VARCHAR(200) NOT NULL COMMENT '内容标题',
    content LONGTEXT NOT NULL COMMENT '富文本内容',
    page_path VARCHAR(200) COMMENT '所属页面路径，如/machine-learning/svm',
    status ENUM('draft', 'published') DEFAULT 'published' COMMENT '状态：草稿/已发布',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_position_key (position_key),
    INDEX idx_page_path (page_path)
) COMMENT='文本内容表';

-- 3. 代码片段表
CREATE TABLE IF NOT EXISTS content_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL COMMENT '代码片段标题',
    language VARCHAR(50) NOT NULL COMMENT '编程语言：python, sql, javascript等',
    code LONGTEXT NOT NULL COMMENT '代码内容',
    description TEXT COMMENT '代码描述',
    position_key VARCHAR(100) COMMENT '前端展示位置标识',
    page_path VARCHAR(200) COMMENT '所属页面路径',
    status ENUM('draft', 'published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_language (language),
    INDEX idx_position_key (position_key)
) COMMENT='代码片段表';

-- 4. 图表表
CREATE TABLE IF NOT EXISTS content_charts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL COMMENT '图表标题',
    chart_type ENUM('line', 'bar', 'pie', 'scatter') NOT NULL COMMENT '图表类型',
    data_source ENUM('upload', 'generated') NOT NULL COMMENT '数据来源：上传文件/生成',
    file_path VARCHAR(500) COMMENT '上传文件路径',
    chart_data JSON COMMENT '图表数据（生成图表时使用）',
    chart_config JSON COMMENT '图表配置（颜色、样式等）',
    display_size ENUM('small', 'medium', 'large') DEFAULT 'medium' COMMENT '展示尺寸',
    position_key VARCHAR(100) COMMENT '前端展示位置标识',
    page_path VARCHAR(200) COMMENT '所属页面路径',
    status ENUM('draft', 'published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_chart_type (chart_type),
    INDEX idx_position_key (position_key)
) COMMENT='图表表';

-- 5. 页面配置表
CREATE TABLE IF NOT EXISTS page_configs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_path VARCHAR(200) UNIQUE NOT NULL COMMENT '页面路径',
    page_title VARCHAR(200) NOT NULL COMMENT '页面标题',
    description TEXT COMMENT '页面描述',
    meta_keywords VARCHAR(500) COMMENT 'SEO关键词',
    is_active BOOLEAN DEFAULT TRUE COMMENT '是否激活',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT='页面配置表';

-- 6. 项目管理表
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT '项目标题',
    description TEXT COMMENT '项目描述',
    category ENUM('notebook', 'excel', 'dashboard', 'sql') NOT NULL COMMENT '项目分类',
    file_path VARCHAR(500) COMMENT '文件路径',
    link_url VARCHAR(500) COMMENT '外部链接(用于dashboard)',
    thumbnail VARCHAR(500) COMMENT '缩略图路径',
    tags TEXT COMMENT '标签JSON数组',
    author VARCHAR(50) COMMENT '作者',
    file_size BIGINT DEFAULT 0 COMMENT '文件大小(字节)',
    download_count INT DEFAULT 0 COMMENT '下载次数',
    view_count INT DEFAULT 0 COMMENT '查看次数',
    status ENUM('draft', 'published') DEFAULT 'published' COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_author (author),
    INDEX idx_created_at (created_at),
    INDEX idx_status (status)
) COMMENT='项目管理表';

-- 插入默认管理员账户 (用户名: admin, 密码: admin123)
INSERT INTO admin_users (username, password, email) VALUES 
('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiuJBmqE.Gqe', 'admin@example.com')
ON DUPLICATE KEY UPDATE username = username;

-- 插入一些示例内容
INSERT INTO content_texts (position_key, title, content, page_path) VALUES 
('homepage_hero_title', '首页主标题', '<h1>机器学习探索平台</h1>', '/'),
('homepage_hero_description', '首页描述', '<p>深入了解 scikit-learn 的强大功能，从基础到进阶的完整学习路径</p>', '/'),
('svm_intro', 'SVM算法介绍', '<p>支持向量机是一种强大的监督学习算法...</p>', '/machine-learning/supervised/svm')
ON DUPLICATE KEY UPDATE content = VALUES(content);

INSERT INTO content_codes (title, language, code, description, position_key, page_path) VALUES 
('SVM基础示例', 'python', 'from sklearn import svm\nfrom sklearn.datasets import make_classification\n\n# 创建数据\nX, y = make_classification(n_samples=100, n_features=4)\n\n# 训练SVM\nclf = svm.SVC()\nclf.fit(X, y)', 'SVM分类器的基本使用方法', 'svm_basic_example', '/machine-learning/supervised/svm')
ON DUPLICATE KEY UPDATE code = VALUES(code);

-- 插入示例项目数据
INSERT INTO projects (id, title, description, category, file_path, link_url, thumbnail, tags, author, file_size, download_count, view_count, created_at, updated_at) VALUES
(1, '电商用户行为分析', '基于用户购买数据的行为分析和预测模型构建', 'notebook', '/projects/notebooks/ecommerce-analysis.ipynb', NULL, '/images/projects/notebook-1.webp', '["数据分析", "Python", "机器学习", "用户行为"]', '数据分析师', 2621440, 145, 0, '2024-01-15 10:00:00', '2024-01-15 10:00:00'),
(2, '销售数据看板', '实时销售数据监控和KPI展示看板', 'dashboard', NULL, 'https://app.powerbi.com/view?r=eyJrIjoiExample', '/images/projects/dashboard-1.webp', '["Power BI", "销售分析", "实时监控"]', 'BI工程师', 0, 89, 0, '2024-01-10 14:30:00', '2024-01-10 14:30:00'),
(3, '财务报表分析模板', '企业财务数据分析和可视化Excel模板', 'excel', '/projects/excel/financial-analysis-template.xlsx', NULL, '/images/projects/excel-1.webp', '["Excel", "财务分析", "模板", "图表"]', '财务分析师', 5452595, 267, 0, '2024-01-08 09:15:00', '2024-01-08 09:15:00'),
(4, '客户细分SQL查询', '基于RFM模型的客户价值分析SQL脚本', 'sql', '/projects/sql/customer-segmentation.sql', NULL, '/images/projects/sql-1.webp', '["SQL", "客户分析", "RFM模型"]', '数据工程师', 15360, 78, 0, '2024-01-05 16:45:00', '2024-01-05 16:45:00')
ON DUPLICATE KEY UPDATE title = VALUES(title);
