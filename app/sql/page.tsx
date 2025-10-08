"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Home, ArrowUp, Database } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { getLucideIcon } from "@/components/LucideIcon";

// 使用通用图标函数
const getIcon = (iconName: string, className?: string) => {
  return getLucideIcon(iconName, className, 1, true);
};

export default function SQLPage() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = React.useState<string>("");
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const sections = [
      'intro', 'env', 'ddl', 'dml', 'dql', 'join', 'functions',
      'optimization', 'window', 'timeseries', 'templates', 'bi', 'resources',
      'analysis-templates', 'visualizations', 'optimization-cases', 
      'python-mysql', 'common-mistakes', 'scenario-map', 'data-warehouse', 'data-quality', 'data-sampling'
    ];
    
    const observers = sections.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
      );
      
      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  const isDark = theme === 'dark';

  const navItems = [
    { id: 'intro', icon: '🎯', label: 'SQL知识体系', color: 'purple' },
    { id: 'env', icon: '⚙️', label: '01. 基础环境层', color: 'blue' },
    { id: 'ddl', icon: '🏗️', label: '02. 数据定义DDL', color: 'green' },
    { id: 'dml', icon: '✏️', label: '03. 数据操作DML', color: 'yellow' },
    { id: 'dql', icon: '🔍', label: '04. 查询核心DQL', color: 'red' },
    { id: 'join', icon: '🔗', label: '05. 多表关联JOIN', color: 'pink' },
    { id: 'functions', icon: '🧮', label: '06. 函数与表达式', color: 'indigo' },
    { id: 'optimization', icon: '⚡', label: '07. 性能优化', color: 'orange' },
    { id: 'window', icon: '📊', label: '08. 统计与窗口', color: 'teal' },
    { id: 'timeseries', icon: '📅', label: '09. 时间序列', color: 'cyan' },
    { id: 'templates', icon: '📦', label: '10. 实战模板', color: 'rose' },
    { id: 'bi', icon: '📈', label: '11. BI连接与自动化', color: 'lime' },
    { id: 'resources', icon: '📚', label: '12. 学习路径', color: 'emerald' },
    { id: 'analysis-templates', icon: '🎯', label: '13. 分析模板库', color: 'blue' },
    { id: 'visualizations', icon: '📊', label: '14. SQL可视化', color: 'green' },
    { id: 'optimization-cases', icon: '🚀', label: '15. 优化实战', color: 'red' },
    { id: 'python-mysql', icon: '🐍', label: '16. Python实践', color: 'yellow' },
    { id: 'common-mistakes', icon: '⚠️', label: '17. 避坑指南', color: 'pink' },
    { id: 'scenario-map', icon: '🗺️', label: '18. 场景速查', color: 'violet' },
    { id: 'data-warehouse', icon: '🏢', label: '19. 数据仓库基础', color: 'sky' },
    { id: 'data-quality', icon: '✅', label: '20. 数据质量检查', color: 'amber' },
    { id: 'data-sampling', icon: '🎲', label: '21. 数据采样技巧', color: 'emerald' }
  ];

  const parts = [
    {
      id: 'env',
      title: 'PART 01 基础环境层',
      subtitle: '选对版本 + 配对字符集 = 少踩50%的坑',
      items: [
        {
          emoji: '🔢',
          title: '版本选择（5.7 vs 8.0）☆',
          desc: '8.0新增窗口函数、CTE、JSON增强、隐藏索引等核心特性',
          detail: '**典型业务场景**：数据分析99%场景建议MySQL 8.0（窗口函数是刚需）\\n**易踩坑点**：老项目5.7无法用RANK()等函数，需改用自连接模拟\\n**可继续深挖**：InnoDB存储引擎改进、REDO日志优化、Instant DDL',
          code: `-- 查看MySQL版本\nSELECT VERSION();\n\n-- 查看是否支持窗口函数（8.0+）\nSHOW VARIABLES LIKE 'version';\n\n-- 检查字符集支持\nSHOW CHARACTER SET;`
        },
        {
          emoji: '🌐',
          title: '字符集配置（utf8mb4）☆',
          desc: '必须用utf8mb4（真正的UTF-8），避免表情符等4字节字符乱码',
          detail: '**典型业务场景**：用户昵称含emoji、生僻字，utf8（最多3字节）会截断\\n**易踩坑点**：建表时忘记指定COLLATE导致排序异常（utf8mb4_general_ci vs utf8mb4_unicode_ci）\\n**可继续深挖**：utf8mb4_0900_ai_ci（8.0默认，性能更好）',
          code: `-- 查看当前字符集\nSHOW VARIABLES LIKE 'character_set%';\n\n-- 建表时指定字符集\nCREATE TABLE users (\n  id BIGINT PRIMARY KEY,\n  nickname VARCHAR(50) COLLATE utf8mb4_unicode_ci\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n-- 修改已有表的字符集\nALTER TABLE old_table CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
        },
        {
          emoji: '⚙️',
          title: 'SQL Mode设置',
          desc: '严格模式避免隐式数据截断，ONLY_FULL_GROUP_BY强制规范GROUP BY',
          detail: '**典型业务场景**：生产环境必开STRICT_TRANS_TABLES防止脏数据\\n**易踩坑点**：开发环境宽松、生产严格，导致上线后INSERT失败\\n**可继续深挖**：NO_ZERO_DATE、ERROR_FOR_DIVISION_BY_ZERO等模式',
          code: `-- 查看当前SQL Mode\nSELECT @@sql_mode;\n\n-- 推荐的生产环境配置\nSET GLOBAL sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION,ONLY_FULL_GROUP_BY';\n\n-- 测试ONLY_FULL_GROUP_BY\n-- ❌ 错误写法（非聚合列未出现在GROUP BY中）\nSELECT user_id, user_name, COUNT(*) FROM orders GROUP BY user_id;\n\n-- ✅ 正确写法\nSELECT user_id, MAX(user_name), COUNT(*) FROM orders GROUP BY user_id;`
        },
        {
          emoji: '🔐',
          title: '权限管理基础',
          desc: '最小权限原则：分析师只给SELECT，开发给CREATE/ALTER，DBA全权限',
          detail: '**典型业务场景**：数据分析师账号误删生产表（应只读）\\n**易踩坑点**：用root做日常开发、忘记FLUSH PRIVILEGES\\n**可继续深挖**：角色（Role）、动态权限（8.0+）',
          code: `-- 创建只读用户（数据分析师）\nCREATE USER 'analyst'@'%' IDENTIFIED BY 'SecurePass123!';\nGRANT SELECT ON company_db.* TO 'analyst'@'%';\nFLUSH PRIVILEGES;\n\n-- 创建开发用户\nCREATE USER 'developer'@'%' IDENTIFIED BY 'DevPass456!';\nGRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER ON dev_db.* TO 'developer'@'%';\nFLUSH PRIVILEGES;\n\n-- 查看用户权限\nSHOW GRANTS FOR 'analyst'@'%';`
        },
        {
          emoji: '🖥️',
          title: '客户端工具选择',
          desc: 'CLI适合脚本/运维，DBeaver/Workbench适合可视化操作',
          detail: '**典型业务场景**：日常分析用GUI工具，自动化脚本用CLI\\n**易踩坑点**：GUI工具默认LIMIT 1000导致分析结果不全\\n**可继续深挖**：DataGrip、Navicat、mycli（带自动补全的CLI）',
          code: `-- MySQL CLI登录\nmysql -h localhost -u root -p\n\n-- 执行SQL文件\nmysql -u root -p database_name < script.sql\n\n-- 导出查询结果到CSV\nmysql -u root -p -e \"SELECT * FROM users\" --batch --skip-column-names > users.csv\n\n-- DBeaver连接字符串\njdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC&characterEncoding=utf8mb4`
        }
      ]
    },
    {
      id: 'ddl',
      title: 'PART 02 数据定义层（DDL）',
      subtitle: '建表即建规矩，90%的性能问题源于建表不规范',
      items: [
        {
          emoji: '📊',
          title: '数据类型选型 ☆',
          desc: 'INT存ID、DECIMAL存金额、VARCHAR存文本、DATETIME存时间',
          detail: '**典型业务场景**：金额用FLOAT导致0.01元计算误差、手机号用INT导致前导0丢失\\n**易踩坑点**：VARCHAR(255)和VARCHAR(10)存储空间动态分配，但索引长度受限\\n**可继续深挖**：TINYINT/BIGINT范围、CHAR定长 vs VARCHAR变长、TEXT性能影响',
          code: `-- ❌ 错误示例\nCREATE TABLE bad_design (\n  phone INT,              -- 手机号会丢失前导0\n  amount FLOAT,           -- 金额有精度问题\n  status VARCHAR(255)     -- 状态只有3种值却用255长度\n);\n\n-- ✅ 推荐示例\nCREATE TABLE good_design (\n  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  phone CHAR(11) NOT NULL COMMENT '手机号',\n  amount DECIMAL(10,2) NOT NULL COMMENT '金额（元）',\n  status TINYINT NOT NULL COMMENT '状态：1=待支付 2=已支付 3=已取消',\n  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';`
        },
        {
          emoji: '🔑',
          title: '主键选型 ☆',
          desc: '优先自增BIGINT主键，业务字段加唯一索引',
          detail: '**典型业务场景**：用身份证/手机号做主键，后期合并数据或更正错误时无法修改\\n**易踩坑点**：UUID主键导致页分裂、插入性能下降50%\\n**可继续深挖**：雪花ID、复合主键的场景（如关联表）',
          code: `-- ❌ 不推荐：业务字段作主键\nCREATE TABLE users_bad (\n  id_card CHAR(18) PRIMARY KEY,\n  name VARCHAR(50)\n);\n\n-- ✅ 推荐：自增主键 + 业务字段唯一索引\nCREATE TABLE users_good (\n  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  id_card CHAR(18) NOT NULL,\n  phone CHAR(11) NOT NULL,\n  name VARCHAR(50),\n  UNIQUE KEY uk_id_card (id_card),\n  UNIQUE KEY uk_phone (phone)\n);\n\n-- 查看表结构\nSHOW CREATE TABLE users_good;\n\n-- 查看索引\nSHOW INDEX FROM users_good;`
        },
        {
          emoji: '📐',
          title: '范式设计原则（1NF/2NF/3NF）',
          desc: '第三范式：消除传递依赖，一张表只描述一个实体',
          detail: '**典型业务场景**：订单表存商品名称（冗余），商品改名后历史订单显示错误\\n**易踩坑点**：过度范式化导致JOIN过多影响性能，需适度反范式\\n**可继续深挖**：BCNF、反范式化场景（如宽表）',
          code: `-- ❌ 违反3NF（存在传递依赖：订单→商品ID→商品名称）\nCREATE TABLE orders_bad (\n  order_id BIGINT PRIMARY KEY,\n  product_id BIGINT,\n  product_name VARCHAR(100),  -- 冗余字段\n  amount DECIMAL(10,2)\n);\n\n-- ✅ 符合3NF（拆分成订单表 + 商品表）\nCREATE TABLE orders (\n  order_id BIGINT PRIMARY KEY,\n  product_id BIGINT,\n  amount DECIMAL(10,2)\n);\n\nCREATE TABLE products (\n  product_id BIGINT PRIMARY KEY,\n  product_name VARCHAR(100)\n);\n\n-- 查询时JOIN获取商品名称\nSELECT o.order_id, p.product_name, o.amount\nFROM orders o\nJOIN products p ON o.product_id = p.product_id;`
        },
        {
          emoji: '🗂️',
          title: '分区表设计',
          desc: '按时间/地区分区，单表亿级数据查询优化利器',
          detail: '**典型业务场景**：订单表按月分区，查询当月数据只扫描单分区，性能提升10倍\\n**易踩坑点**：分区键必须包含在主键/唯一索引中\\n**可继续深挖**：RANGE/HASH/LIST分区、分区裁剪（Partition Pruning）',
          code: `-- 按月分区的订单表\nCREATE TABLE orders_partitioned (\n  order_id BIGINT NOT NULL,\n  user_id BIGINT,\n  order_date DATE NOT NULL,\n  amount DECIMAL(10,2),\n  PRIMARY KEY (order_id, order_date)  -- 分区键必须在主键中\n)\nPARTITION BY RANGE (YEAR(order_date) * 100 + MONTH(order_date)) (\n  PARTITION p202401 VALUES LESS THAN (202402),\n  PARTITION p202402 VALUES LESS THAN (202403),\n  PARTITION p202403 VALUES LESS THAN (202404),\n  PARTITION p_future VALUES LESS THAN MAXVALUE\n);\n\n-- 查看分区信息\nSELECT PARTITION_NAME, TABLE_ROWS FROM information_schema.PARTITIONS\nWHERE TABLE_NAME = 'orders_partitioned';\n\n-- 查询自动分区裁剪\nEXPLAIN SELECT * FROM orders_partitioned WHERE order_date = '2024-02-15';`
        },
        {
          emoji: '💬',
          title: '注释规范',
          desc: '表注释说明业务含义，列注释说明枚举值/单位',
          detail: '**典型业务场景**：接手他人项目，靠注释快速理解表结构\\n**易踩坑点**：修改表结构后忘记更新注释\\n**可继续深挖**：使用数据字典工具自动生成文档',
          code: `CREATE TABLE orders (\n  order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT '订单ID',\n  user_id BIGINT NOT NULL COMMENT '用户ID（关联users表）',\n  status TINYINT NOT NULL DEFAULT 1 COMMENT '订单状态：1=待支付 2=已支付 3=已发货 4=已完成 5=已取消',\n  amount DECIMAL(10,2) NOT NULL COMMENT '订单金额（元）',\n  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',\n  INDEX idx_user_id (user_id),\n  INDEX idx_created_at (created_at)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单主表-记录所有交易订单';\n\n-- 查看表注释\nSHOW TABLE STATUS LIKE 'orders';\n\n-- 查看列注释\nSHOW FULL COLUMNS FROM orders;`
        }
      ]
    },
    {
      id: 'dml',
      title: 'PART 03 数据操作层（DML）',
      subtitle: '增删改的正确姿势，避免误删库跑路',
      items: [
        {
          emoji: '➕',
          title: 'INSERT 去重插入 ☆',
          desc: 'INSERT IGNORE、ON DUPLICATE KEY UPDATE、REPLACE INTO三种去重策略',
          detail: '**典型业务场景**：爬虫数据入库，主键冲突时更新而非报错\\n**易踩坑点**：REPLACE INTO会删除旧记录再插入（触发器、外键受影响）\\n**可继续深挖**：批量插入性能优化、INSERT延迟写入',
          code: `-- ❌ 普通INSERT（主键冲突会报错）\nINSERT INTO users (id, name) VALUES (1, 'Alice');\n\n-- ✅ 方法1：INSERT IGNORE（冲突时静默跳过）\nINSERT IGNORE INTO users (id, name) VALUES (1, 'Alice');\n\n-- ✅ 方法2：ON DUPLICATE KEY UPDATE（冲突时更新）\nINSERT INTO users (id, name, login_count)\nVALUES (1, 'Alice', 1)\nON DUPLICATE KEY UPDATE login_count = login_count + 1;\n\n-- ✅ 方法3：REPLACE INTO（删除后重新插入）\nREPLACE INTO users (id, name) VALUES (1, 'Alice Updated');\n\n-- 批量插入（推荐，比逐条快10倍）\nINSERT INTO users (name, email) VALUES\n  ('User1', 'u1@example.com'),\n  ('User2', 'u2@example.com'),\n  ('User3', 'u3@example.com');`
        },
        {
          emoji: '🔄',
          title: 'UPDATE 安全更新 ☆',
          desc: '必加WHERE条件，生产环境开启safe-updates模式',
          detail: '**典型业务场景**：误执行UPDATE users SET password=xxx 导致全表密码被改\\n**易踩坑点**：UPDATE JOIN时不加WHERE导致关联表全更新\\n**可继续深挖**：LIMIT限制影响行数、LOW_PRIORITY降低锁优先级',
          code: `-- ⚠️ 危险操作（缺少WHERE会全表更新）\nUPDATE users SET status = 0;\n\n-- ✅ 正确做法（加WHERE + LIMIT保护）\nUPDATE users SET status = 0 WHERE id = 12345 LIMIT 1;\n\n-- 开启安全模式（阻止无WHERE的UPDATE/DELETE）\nSET sql_safe_updates = 1;\n\n-- 批量更新（用CASE WHEN）\nUPDATE users\nSET level = CASE\n  WHEN total_amount >= 10000 THEN 'VIP'\n  WHEN total_amount >= 1000 THEN 'Gold'\n  ELSE 'Normal'\nEND\nWHERE updated_at < CURDATE();\n\n-- 基于JOIN的更新\nUPDATE orders o\nJOIN users u ON o.user_id = u.id\nSET o.discount = 0.9\nWHERE u.level = 'VIP' AND o.order_date >= '2024-01-01';`
        },
        {
          emoji: '🗑️',
          title: 'DELETE 软删除 vs 硬删除 ☆',
          desc: '核心数据必须软删除（加deleted_at字段），日志表可硬删除',
          detail: '**典型业务场景**：用户"注销"账号实际是软删除，保留数据用于审计\\n**易踩坑点**：软删除后忘记在WHERE中过滤deleted_at IS NULL\\n**可继续深挖**：逻辑删除的索引优化、TRUNCATE vs DELETE性能差异',
          code: `-- ❌ 硬删除（数据不可恢复）\nDELETE FROM users WHERE id = 12345;\n\n-- ✅ 软删除（推荐用于核心业务表）\nALTER TABLE users ADD COLUMN deleted_at DATETIME DEFAULT NULL COMMENT '删除时间';\n\nUPDATE users SET deleted_at = NOW() WHERE id = 12345;\n\n-- 查询时过滤已删除数据\nSELECT * FROM users WHERE deleted_at IS NULL;\n\n-- 创建视图简化查询\nCREATE VIEW users_active AS\nSELECT * FROM users WHERE deleted_at IS NULL;\n\n-- 硬删除适用场景：清理历史日志\nDELETE FROM api_logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);\n\n-- 快速清空表（比DELETE快，但不可回滚）\nTRUNCATE TABLE temp_table;`
        },
        {
          emoji: '🔒',
          title: '事务处理（ACID） ☆',
          desc: 'BEGIN + COMMIT/ROLLBACK，保证操作原子性',
          detail: '**典型业务场景**：转账操作（扣款+加款必须同时成功或同时失败）\\n**易踩坑点**：忘记COMMIT导致长事务锁表、autocommit=1时单句自动提交\\n**可继续深挖**：隔离级别（READ COMMITTED/REPEATABLE READ）、MVCC机制',
          code: `-- 转账事务示例\nSTART TRANSACTION;\n\n-- 扣款\nUPDATE accounts SET balance = balance - 100 WHERE user_id = 1;\n\n-- 加款\nUPDATE accounts SET balance = balance + 100 WHERE user_id = 2;\n\n-- 检查余额是否合法\nSELECT balance FROM accounts WHERE user_id = 1;\n\n-- 如果检查通过则提交\nCOMMIT;\n\n-- 如果检查失败则回滚\n-- ROLLBACK;\n\n-- 查看当前隔离级别\nSELECT @@transaction_isolation;\n\n-- 设置隔离级别\nSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;`
        },
        {
          emoji: '📥',
          title: 'LOAD DATA 批量导入',
          desc: '百万级数据导入首选，比INSERT快100倍',
          detail: '**典型业务场景**：从CSV文件导入历史数据到MySQL\\n**易踩坑点**：字段顺序不匹配、日期格式不一致、字符集编码错误\\n**可继续深挖**：LOCAL关键字、FIELDS TERMINATED BY自定义分隔符',
          code: `-- 准备CSV文件：users.csv\n-- id,name,email,created_at\n-- 1,Alice,alice@example.com,2024-01-01\n-- 2,Bob,bob@example.com,2024-01-02\n\n-- 导入CSV数据\nLOAD DATA LOCAL INFILE '/path/to/users.csv'\nINTO TABLE users\nFIELDS TERMINATED BY ','\nLINES TERMINATED BY '\\n'\nIGNORE 1 LINES  -- 跳过表头\n(id, name, email, @created_at)\nSET created_at = STR_TO_DATE(@created_at, '%Y-%m-%d');\n\n-- 查看导入进度\nSHOW PROCESSLIST;\n\n-- 导出数据到CSV\nSELECT * FROM users\nINTO OUTFILE '/tmp/users_export.csv'\nFIELDS TERMINATED BY ','\nLINES TERMINATED BY '\\n';`
        }
      ]
    },
    {
      id: 'dql',
      title: 'PART 04 查询核心（DQL）',
      subtitle: 'SELECT是数据分析师的80%工作，掌握执行顺序是关键',
      items: [
        {
          emoji: '📋',
          title: '执行顺序（必背）☆',
          desc: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT',
          detail: '**典型业务场景**：WHERE里不能用SELECT的别名，必须用原始字段\\n**易踩坑点**：GROUP BY后才能用聚合函数，ORDER BY可以用SELECT别名\\n**可继续深挖**：子查询、CTE改变执行顺序',
          code: `-- ❌ 错误：WHERE里不能用SELECT别名\nSELECT name, age * 2 AS double_age\nFROM users\nWHERE double_age > 30;  -- 报错：Unknown column 'double_age'\n\n-- ✅ 正确：用原始表达式\nSELECT name, age * 2 AS double_age\nFROM users\nWHERE age * 2 > 30;\n\n-- ✅ 或者用子查询/CTE\nWITH t AS (\n  SELECT name, age * 2 AS double_age FROM users\n)\nSELECT * FROM t WHERE double_age > 30;`
        },
        {
          emoji: '🔍',
          title: 'WHERE 过滤条件 ☆',
          desc: '=、>、<、IN、BETWEEN、LIKE、IS NULL 六大核心操作符',
          detail: '**典型业务场景**：多条件组合（AND/OR优先级、括号的使用）\\n**易踩坑点**：NULL值必须用IS NULL而非=NULL\\n**可继续深挖**：索引对WHERE的影响、函数导致索引失效',
          code: `-- 基础过滤\nSELECT * FROM orders WHERE status = 1;\n\n-- 范围查询\nSELECT * FROM orders WHERE amount BETWEEN 100 AND 500;\n\n-- 集合查询\nSELECT * FROM users WHERE city IN ('北京', '上海', '深圳');\n\n-- 模糊查询\nSELECT * FROM products WHERE name LIKE '%手机%';\n\n-- NULL值判断（❌ 不能用 = NULL）\nSELECT * FROM users WHERE deleted_at IS NULL;\n\n-- 多条件组合（注意优先级）\nSELECT * FROM orders\nWHERE (status = 1 OR status = 2) AND amount > 100;`
        },
        {
          emoji: '📊',
          title: 'GROUP BY 分组聚合 ☆',
          desc: 'COUNT、SUM、AVG、MAX、MIN 五大聚合函数',
          detail: '**典型业务场景**：统计各类目销售额、用户活跃度分析\\n**易踩坑点**：SELECT的非聚合列必须出现在GROUP BY中（ONLY_FULL_GROUP_BY）\\n**可继续深挖**：WITH ROLLUP生成小计、GROUP_CONCAT字符串聚合',
          code: `-- 基础分组统计\nSELECT category, COUNT(*) AS cnt, SUM(amount) AS total\nFROM orders\nGROUP BY category;\n\n-- 多字段分组\nSELECT city, gender, AVG(age) AS avg_age\nFROM users\nGROUP BY city, gender;\n\n-- HAVING过滤分组结果（WHERE无法用聚合函数）\nSELECT user_id, COUNT(*) AS order_count\nFROM orders\nGROUP BY user_id\nHAVING order_count >= 5;\n\n-- WITH ROLLUP生成小计和总计\nSELECT category, SUM(amount) AS total\nFROM orders\nGROUP BY category WITH ROLLUP;\n\n-- GROUP_CONCAT字符串聚合\nSELECT user_id, GROUP_CONCAT(product_name SEPARATOR ', ') AS products\nFROM orders\nGROUP BY user_id;`
        },
        {
          emoji: '🎯',
          title: 'DISTINCT 去重',
          desc: '对结果集去重，注意与GROUP BY的区别',
          detail: '**典型业务场景**：统计活跃用户数（去重user_id）\\n**易踩坑点**：DISTINCT对所有列生效，不能只对部分列去重\\n**可继续深挖**：DISTINCT vs GROUP BY性能对比',
          code: `-- 单列去重\nSELECT DISTINCT city FROM users;\n\n-- 多列组合去重\nSELECT DISTINCT city, gender FROM users;\n\n-- 统计去重数量\nSELECT COUNT(DISTINCT user_id) AS active_users\nFROM orders\nWHERE order_date >= '2024-01-01';\n\n-- ❌ 错误：不能只对部分列去重\n-- SELECT DISTINCT city, name FROM users;  -- 是对(city,name)组合去重\n\n-- ✅ 如果只想对city去重，用GROUP BY\nSELECT city, MAX(name) FROM users GROUP BY city;`
        },
        {
          emoji: '📄',
          title: 'ORDER BY + LIMIT 分页 ☆',
          desc: '排序+分页是数据展示的标配',
          detail: '**典型业务场景**：商品列表按销量排序、分页加载数据\\n**易踩坑点**：深分页性能问题（LIMIT 100000,10很慢）、ORDER BY NULL值排序\\n**可继续深挖**：延迟关联优化深分页、OFFSET替代方案',
          code: `-- 基础排序\nSELECT * FROM products ORDER BY price DESC;\n\n-- 多字段排序\nSELECT * FROM orders ORDER BY status ASC, created_at DESC;\n\n-- 分页查询（第1页，每页10条）\nSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 0;\n\n-- 分页查询（第3页，每页10条）\nSELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;\n\n-- Top N查询\nSELECT * FROM products ORDER BY sales DESC LIMIT 5;\n\n-- ⚡ 深分页优化（延迟关联）\n-- ❌ 慢查询\nSELECT * FROM orders ORDER BY id LIMIT 100000, 10;\n\n-- ✅ 优化方案\nSELECT o.* FROM orders o\nINNER JOIN (\n  SELECT id FROM orders ORDER BY id LIMIT 100000, 10\n) t ON o.id = t.id;`
        },
        {
          emoji: '🔄',
          title: '子查询 vs CTE',
          desc: 'WITH AS (CTE) 让复杂查询更清晰易读',
          detail: '**典型业务场景**：多层嵌套统计、临时结果集复用\\n**易踩坑点**：子查询在SELECT中每行都执行一次（性能差）\\n**可继续深挖**：递归CTE、物化视图',
          code: `-- ❌ 传统子查询（难读）\nSELECT *\nFROM orders\nWHERE amount > (\n  SELECT AVG(amount) FROM orders\n);\n\n-- ✅ CTE写法（清晰）\nWITH avg_order AS (\n  SELECT AVG(amount) AS avg_amt FROM orders\n)\nSELECT o.*\nFROM orders o, avg_order\nWHERE o.amount > avg_order.avg_amt;\n\n-- 多个CTE链式调用\nWITH user_orders AS (\n  SELECT user_id, COUNT(*) AS cnt FROM orders GROUP BY user_id\n),\nactive_users AS (\n  SELECT user_id FROM user_orders WHERE cnt >= 5\n)\nSELECT u.name, uo.cnt\nFROM users u\nJOIN user_orders uo ON u.id = uo.user_id\nWHERE u.id IN (SELECT user_id FROM active_users);`
        }
      ]
    },
    {
      id: 'join',
      title: 'PART 05 多表关联（JOIN）',
      subtitle: '关联查询是数据分析的核心技能，90%复杂查询都要用',
      items: [
        {
          emoji: '🔗',
          title: 'JOIN 类型对比 ☆',
          desc: 'INNER JOIN（交集）、LEFT JOIN（左表全保留）、RIGHT JOIN（右表全保留）',
          detail: '**典型业务场景**：订单关联用户（LEFT JOIN保留所有订单）\\n**易踩坑点**：LEFT JOIN后WHERE条件写错位置导致变INNER JOIN\\n**可继续深挖**：FULL OUTER JOIN（MySQL不支持，需UNION模拟）',
          code: `-- INNER JOIN（只保留匹配的记录）\nSELECT u.name, o.order_id\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- LEFT JOIN（保留左表所有记录）\nSELECT u.name, o.order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n\n-- RIGHT JOIN（保留右表所有记录，少用）\nSELECT u.name, o.order_id\nFROM users u\nRIGHT JOIN orders o ON u.id = o.user_id;\n\n-- ⚠️ LEFT JOIN易踩坑\n-- ❌ 错误：WHERE条件把LEFT JOIN变成了INNER JOIN\nSELECT u.name, o.order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.status = 1;  -- 过滤掉了没有订单的用户\n\n-- ✅ 正确：用ON条件或IS NOT NULL\nSELECT u.name, o.order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id AND o.status = 1;`
        },
        {
          emoji: '⚡',
          title: 'JOIN 算法优化',
          desc: 'Nested Loop、Hash Join、Index Join 三种算法',
          detail: '**典型业务场景**：大表JOIN优化（百万级数据）\\n**易踩坑点**：JOIN字段没加索引导致全表扫描\\n**可继续深挖**：EXPLAIN分析JOIN类型、JOIN顺序优化',
          code: `-- 查看JOIN执行计划\nEXPLAIN SELECT u.name, o.order_id\nFROM users u\nJOIN orders o ON u.id = o.user_id;\n\n-- 优化关键：JOIN字段必须有索引\nCREATE INDEX idx_user_id ON orders(user_id);\n\n-- 小表驱动大表（MySQL优化器会自动调整）\n-- ✅ 推荐：小表在前\nSELECT *\nFROM small_table s\nJOIN big_table b ON s.id = b.s_id;\n\n-- 使用STRAIGHT_JOIN强制JOIN顺序（慎用）\nSELECT *\nFROM small_table\nSTRAIGHT_JOIN big_table ON small_table.id = big_table.s_id;`
        },
        {
          emoji: '🔄',
          title: '自连接（Self Join）',
          desc: '同一张表自己和自己关联，常用于树形结构、排名',
          detail: '**典型业务场景**：员工-上级关系、商品类目层级、找出重复数据\\n**易踩坑点**：必须用别名区分、笛卡尔积风险\\n**可继续深挖**：递归CTE处理无限层级',
          code: `-- 查询员工及其上级\nSELECT e1.name AS employee, e2.name AS manager\nFROM employees e1\nLEFT JOIN employees e2 ON e1.manager_id = e2.id;\n\n-- 找出同城市的用户配对\nSELECT u1.name AS user1, u2.name AS user2, u1.city\nFROM users u1\nJOIN users u2 ON u1.city = u2.city AND u1.id < u2.id;\n\n-- 找出重复的手机号\nSELECT u1.phone, COUNT(*) AS duplicate_count\nFROM users u1\nJOIN users u2 ON u1.phone = u2.phone AND u1.id != u2.id\nGROUP BY u1.phone;`
        },
        {
          emoji: '🎯',
          title: '多表JOIN最佳实践',
          desc: '3表以上JOIN的写法和性能优化',
          detail: '**典型业务场景**：订单-用户-商品三表关联统计\\n**易踩坑点**：JOIN顺序影响性能、中间结果集过大\\n**可继续深挖**：先聚合再JOIN、临时表拆解复杂JOIN',
          code: `-- 三表关联：订单-用户-商品\nSELECT \n  u.name AS user_name,\n  p.product_name,\n  o.amount\nFROM orders o\nJOIN users u ON o.user_id = u.id\nJOIN products p ON o.product_id = p.id\nWHERE o.order_date >= '2024-01-01';\n\n-- ⚡ 优化：先聚合再JOIN（减少JOIN行数）\nWITH order_summary AS (\n  SELECT user_id, SUM(amount) AS total\n  FROM orders\n  WHERE order_date >= '2024-01-01'\n  GROUP BY user_id\n)\nSELECT u.name, os.total\nFROM users u\nJOIN order_summary os ON u.id = os.user_id;`
        },
        {
          emoji: '🚫',
          title: 'CROSS JOIN（笛卡尔积）',
          desc: '生成所有组合，慎用！',
          detail: '**典型业务场景**：生成日期序列、商品SKU组合\\n**易踩坑点**：忘记加ON条件变成CROSS JOIN导致结果爆炸\\n**可继续深挖**：用CROSS JOIN生成辅助表',
          code: `-- ⚠️ 危险：笛卡尔积（100行 × 100行 = 10000行）\nSELECT * FROM users CROSS JOIN orders;\n\n-- ✅ 合理使用：生成日期序列\nWITH RECURSIVE dates AS (\n  SELECT '2024-01-01' AS date\n  UNION ALL\n  SELECT DATE_ADD(date, INTERVAL 1 DAY)\n  FROM dates\n  WHERE date < '2024-01-31'\n)\nSELECT * FROM dates;\n\n-- 生成商品SKU组合\nSELECT \n  c.color,\n  s.size,\n  CONCAT(c.color, '-', s.size) AS sku\nFROM colors c\nCROSS JOIN sizes s;`
        }
      ]
    },
    {
      id: 'functions',
      title: 'PART 06 函数与表达式层',
      subtitle: '掌握常用函数，写SQL效率提升3倍',
      items: [
        {
          emoji: '✂️',
          title: '字符串函数 ☆',
          desc: 'CONCAT、SUBSTRING、REPLACE、TRIM、LENGTH 必备函数',
          detail: '**典型业务场景**：拼接姓名、提取手机号前3位、清洗数据\\n**易踩坑点**：SUBSTRING索引从1开始（不是0）、中文字符长度问题\\n**可继续深挖**：正则表达式REGEXP_REPLACE（8.0+）',
          code: `-- 字符串拼接\nSELECT CONCAT(last_name, first_name) AS full_name FROM users;\n\n-- 提取子串（索引从1开始）\nSELECT SUBSTRING(phone, 1, 3) AS area_code FROM users;\n\n-- 替换字符串\nSELECT REPLACE(email, '@gmail.com', '@company.com') FROM users;\n\n-- 去除空格\nSELECT TRIM(name) FROM users;\nSELECT LTRIM(name), RTRIM(name) FROM users;\n\n-- 字符串长度\nSELECT LENGTH(name), CHAR_LENGTH(name) FROM users;\n\n-- 大小写转换\nSELECT UPPER(city), LOWER(city) FROM users;\n\n-- 字符串分割（8.0+）\nSELECT SUBSTRING_INDEX('a-b-c', '-', 1) AS first_part;  -- 'a'`
        },
        {
          emoji: '📅',
          title: '日期时间函数 ☆',
          desc: 'NOW、DATE_FORMAT、DATE_ADD、DATEDIFF 时间处理利器',
          detail: '**典型业务场景**：计算用户注册天数、月报周报统计、时间范围过滤\\n**易踩坑点**：时区问题、日期格式字符串 vs DATE类型\\n**可继续深挖**：UNIX_TIMESTAMP时间戳转换',
          code: `-- 当前时间\nSELECT NOW(), CURDATE(), CURTIME();\n\n-- 日期格式化\nSELECT DATE_FORMAT(created_at, '%Y-%m-%d') AS date FROM orders;\nSELECT DATE_FORMAT(created_at, '%Y年%m月') AS month FROM orders;\n\n-- 日期计算\nSELECT DATE_ADD(NOW(), INTERVAL 7 DAY) AS next_week;\nSELECT DATE_SUB(NOW(), INTERVAL 1 MONTH) AS last_month;\n\n-- 日期差值\nSELECT DATEDIFF(NOW(), created_at) AS days_since_register FROM users;\n\n-- 提取日期部分\nSELECT YEAR(created_at), MONTH(created_at), DAY(created_at) FROM orders;\n\n-- 时间戳转换\nSELECT UNIX_TIMESTAMP(created_at) AS timestamp FROM orders;\nSELECT FROM_UNIXTIME(1704067200) AS datetime;`
        },
        {
          emoji: '🔄',
          title: '类型转换函数',
          desc: 'CAST、CONVERT、STR_TO_DATE 类型转换必备',
          detail: '**典型业务场景**：字符串转数字、日期格式转换\\n**易踩坑点**：隐式转换导致索引失效\\n**可继续深挖**：JSON_EXTRACT处理JSON字段',
          code: `-- 类型转换\nSELECT CAST('123' AS UNSIGNED) AS num;\nSELECT CAST(amount AS CHAR) AS amount_str FROM orders;\n\n-- 日期字符串转换\nSELECT STR_TO_DATE('2024-01-15', '%Y-%m-%d') AS date;\n\n-- ⚠️ 隐式转换导致索引失效\n-- ❌ 慢查询（user_id是INT，传了字符串）\nSELECT * FROM orders WHERE user_id = '12345';\n\n-- ✅ 正确做法\nSELECT * FROM orders WHERE user_id = 12345;\n\n-- JSON处理（8.0+）\nSELECT JSON_EXTRACT(meta, '$.city') AS city FROM users;`
        },
        {
          emoji: '🎲',
          title: '条件判断函数 ☆',
          desc: 'CASE WHEN、IF、IFNULL、COALESCE 条件逻辑必备',
          detail: '**典型业务场景**：状态码转文本、NULL值处理、分段统计\\n**易踩坑点**：CASE WHEN顺序很重要（从上到下匹配）\\n**可继续深挖**：嵌套CASE WHEN、NULLIF函数',
          code: `-- CASE WHEN（推荐）\nSELECT \n  order_id,\n  CASE status\n    WHEN 1 THEN '待支付'\n    WHEN 2 THEN '已支付'\n    WHEN 3 THEN '已发货'\n    ELSE '未知'\n  END AS status_text\nFROM orders;\n\n-- CASE WHEN范围判断\nSELECT \n  name,\n  CASE\n    WHEN age < 18 THEN '未成年'\n    WHEN age < 60 THEN '成年'\n    ELSE '老年'\n  END AS age_group\nFROM users;\n\n-- IF函数（简单条件）\nSELECT IF(amount > 100, 'high', 'low') AS level FROM orders;\n\n-- NULL值处理\nSELECT IFNULL(phone, '无') AS phone FROM users;\nSELECT COALESCE(phone, email, '无联系方式') AS contact FROM users;`
        },
        {
          emoji: '🔢',
          title: '数学与聚合函数',
          desc: 'ROUND、CEIL、FLOOR、ABS、MOD 数值处理',
          detail: '**典型业务场景**：金额四舍五入、百分比计算\\n**易踩坑点**：整数除法结果仍是整数\\n**可继续深挖**：RAND()随机数、POW()幂运算',
          code: `-- 四舍五入\nSELECT ROUND(amount, 2) AS rounded FROM orders;\n\n-- 向上/向下取整\nSELECT CEIL(4.3), FLOOR(4.8);  -- 5, 4\n\n-- 绝对值\nSELECT ABS(-10);  -- 10\n\n-- 取余\nSELECT MOD(10, 3);  -- 1\n\n-- ⚠️ 整数除法陷阱\nSELECT 5 / 2;  -- 2.5000（MySQL会自动转DECIMAL）\nSELECT 5 DIV 2;  -- 2（整除）\n\n-- 百分比计算\nSELECT \n  category,\n  SUM(amount) AS total,\n  ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM orders), 2) AS percentage\nFROM orders\nGROUP BY category;`
        },
        {
          emoji: '🔀',
          title: '行转列（PIVOT）',
          desc: '用CASE WHEN + SUM实现Excel透视表效果',
          detail: '**典型业务场景**：月度销售额对比、各地区销量统计\\n**易踩坑点**：MySQL无原生PIVOT语法，需手动实现\\n**可继续深挖**：动态SQL生成PIVOT',
          code: `-- 原始数据：category | month | amount\n-- 目标：category | 1月 | 2月 | 3月\n\nSELECT \n  category,\n  SUM(CASE WHEN MONTH(order_date) = 1 THEN amount ELSE 0 END) AS '1月',\n  SUM(CASE WHEN MONTH(order_date) = 2 THEN amount ELSE 0 END) AS '2月',\n  SUM(CASE WHEN MONTH(order_date) = 3 THEN amount ELSE 0 END) AS '3月'\nFROM orders\nWHERE YEAR(order_date) = 2024\nGROUP BY category;\n\n-- 列转行（UNPIVOT）\nSELECT category, '1月' AS month, jan_amount AS amount FROM pivot_table\nUNION ALL\nSELECT category, '2月', feb_amount FROM pivot_table\nUNION ALL\nSELECT category, '3月', mar_amount FROM pivot_table;`
        }
      ]
    },
    {
      id: 'optimization',
      title: 'PART 07 性能优化层',
      subtitle: '慢查询优化是进阶必备技能，懂EXPLAIN是关键',
      items: [
        {
          emoji: '🔍',
          title: 'EXPLAIN 执行计划 ☆',
          desc: 'type、key、rows、Extra 四大核心字段必看',
          detail: '**典型业务场景**：分析慢查询原因、验证索引是否生效\\n**易踩坑点**：type=ALL（全表扫描）、Extra=Using filesort（文件排序）\\n**可继续深挖**：EXPLAIN FORMAT=JSON、SHOW WARNINGS查看优化后的SQL',
          code: `-- 查看执行计划\nEXPLAIN SELECT * FROM orders WHERE user_id = 12345;\n\n-- 关键字段解读：\n-- type: ALL(全表扫描) < index < range < ref < eq_ref < const\n-- key: 实际使用的索引\n-- rows: 扫描行数（越少越好）\n-- Extra: Using index(覆盖索引), Using filesort(需优化)\n\n-- 示例：优化前后对比\n-- ❌ 优化前（type=ALL，全表扫描）\nEXPLAIN SELECT * FROM orders WHERE YEAR(order_date) = 2024;\n\n-- ✅ 优化后（type=range，使用索引）\nEXPLAIN SELECT * FROM orders \nWHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';\n\n-- 查看优化器重写后的SQL\nEXPLAIN SELECT * FROM orders WHERE user_id = 12345;\nSHOW WARNINGS;`
        },
        {
          emoji: '🚀',
          title: '索引设计原则 ☆',
          desc: '高频WHERE/JOIN字段建索引，遵循最左前缀原则',
          detail: '**典型业务场景**：WHERE user_id=? AND status=? 建复合索引(user_id, status)\\n**易踩坑点**：索引太多影响INSERT性能、字符串字段建全文索引\\n**可继续深挖**：索引下推、索引合并',
          code: `-- 单列索引\nCREATE INDEX idx_user_id ON orders(user_id);\n\n-- 复合索引（最左前缀原则）\nCREATE INDEX idx_user_status ON orders(user_id, status);\n\n-- ✅ 以下查询可以用到索引\nSELECT * FROM orders WHERE user_id = 123;\nSELECT * FROM orders WHERE user_id = 123 AND status = 1;\n\n-- ❌ 以下查询无法用到索引（违反最左前缀）\nSELECT * FROM orders WHERE status = 1;\n\n-- 唯一索引\nCREATE UNIQUE INDEX uk_phone ON users(phone);\n\n-- 查看表的索引\nSHOW INDEX FROM orders;\n\n-- 删除索引\nDROP INDEX idx_user_id ON orders;`
        },
        {
          emoji: '⚡',
          title: '覆盖索引优化',
          desc: '查询列全在索引中，避免回表查询',
          detail: '**典型业务场景**：SELECT id, user_id FROM orders WHERE user_id=? 可用覆盖索引\\n**易踩坑点**：SELECT * 无法用覆盖索引\\n**可继续深挖**：InnoDB聚簇索引、二级索引',
          code: `-- 创建覆盖索引\nCREATE INDEX idx_user_status_amount ON orders(user_id, status, amount);\n\n-- ✅ 覆盖索引查询（Extra: Using index）\nEXPLAIN SELECT user_id, status, amount \nFROM orders \nWHERE user_id = 12345;\n\n-- ❌ 需要回表（Extra: 无Using index）\nEXPLAIN SELECT user_id, status, amount, created_at \nFROM orders \nWHERE user_id = 12345;\n\n-- 实战案例：统计查询优化\n-- ❌ 优化前（全表扫描）\nSELECT COUNT(*) FROM orders WHERE status = 1;\n\n-- ✅ 优化后（索引覆盖）\nCREATE INDEX idx_status ON orders(status);\nSELECT COUNT(*) FROM orders WHERE status = 1;`
        },
        {
          emoji: '🚫',
          title: '索引失效场景 ☆',
          desc: '函数、类型转换、NOT、!=、LIKE %xx 导致索引失效',
          detail: '**典型业务场景**：WHERE YEAR(date)=2024 改成 date BETWEEN ... \\n**易踩坑点**：隐式类型转换（字符串字段传数字）\\n**可继续深挖**：OR条件索引失效、全文索引',
          code: `-- ❌ 索引失效场景1：函数操作\nSELECT * FROM orders WHERE YEAR(order_date) = 2024;\n-- ✅ 改写\nSELECT * FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';\n\n-- ❌ 索引失效场景2：隐式类型转换\nSELECT * FROM orders WHERE user_id = '12345';  -- user_id是INT\n-- ✅ 改写\nSELECT * FROM orders WHERE user_id = 12345;\n\n-- ❌ 索引失效场景3：LIKE前置%\nSELECT * FROM products WHERE name LIKE '%手机';\n-- ✅ 改写（如果业务允许）\nSELECT * FROM products WHERE name LIKE '手机%';\n\n-- ❌ 索引失效场景4：NOT、!=\nSELECT * FROM orders WHERE status != 1;\n-- ✅ 改写\nSELECT * FROM orders WHERE status IN (2, 3, 4, 5);\n\n-- ❌ 索引失效场景5：OR连接不同列\nSELECT * FROM orders WHERE user_id = 123 OR product_id = 456;\n-- ✅ 改写（UNION）\nSELECT * FROM orders WHERE user_id = 123\nUNION\nSELECT * FROM orders WHERE product_id = 456;`
        },
        {
          emoji: '📊',
          title: '直方图统计信息（8.0+）',
          desc: '帮助优化器选择更优执行计划',
          detail: '**典型业务场景**：数据分布不均时优化器选错索引\\n**易踩坑点**：需手动ANALYZE TABLE更新统计信息\\n**可继续深挖**：InnoDB统计信息采样',
          code: `-- 创建直方图\nANALYZE TABLE orders UPDATE HISTOGRAM ON user_id, status;\n\n-- 查看直方图信息\nSELECT * FROM information_schema.COLUMN_STATISTICS \nWHERE TABLE_NAME = 'orders';\n\n-- 删除直方图\nANALYZE TABLE orders DROP HISTOGRAM ON user_id;\n\n-- 更新表统计信息\nANALYZE TABLE orders;`
        },
        {
          emoji: '💡',
          title: 'SQL优化技巧汇总',
          desc: '分页优化、IN优化、COUNT优化等实战技巧',
          detail: '**典型业务场景**：深分页、大IN列表、COUNT(*)慢查询\\n**易踩坑点**：盲目优化导致代码复杂度上升\\n**可继续深挖**：分库分表、读写分离',
          code: `-- 技巧1：深分页优化（延迟关联）\n-- ❌ 慢（LIMIT偏移量大）\nSELECT * FROM orders ORDER BY id LIMIT 1000000, 20;\n-- ✅ 快（先取ID再关联）\nSELECT o.* FROM orders o\nINNER JOIN (\n  SELECT id FROM orders ORDER BY id LIMIT 1000000, 20\n) t ON o.id = t.id;\n\n-- 技巧2：IN列表优化\n-- ❌ IN超过1000个值性能差\nSELECT * FROM orders WHERE user_id IN (1,2,3,...,10000);\n-- ✅ 用临时表JOIN\nCREATE TEMPORARY TABLE tmp_users (user_id BIGINT);\nINSERT INTO tmp_users VALUES (1),(2),(3),...;\nSELECT o.* FROM orders o JOIN tmp_users t ON o.user_id = t.user_id;\n\n-- 技巧3：COUNT(*)优化\n-- ❌ 慢（全表扫描）\nSELECT COUNT(*) FROM orders;\n-- ✅ 快（用索引）\nSELECT COUNT(*) FROM orders WHERE status >= 0;  -- status有索引\n\n-- 技巧4：避免SELECT *\nSELECT id, user_id, amount FROM orders;  -- 只查需要的列`
        }
      ]
    },
    {
      id: 'window',
      title: 'PART 08 统计与窗口层',
      subtitle: '窗口函数是Excel透视表的SQL实现，8.0+必学',
      items: [
        {
          emoji: '🏆',
          title: 'ROW_NUMBER 排名 ☆',
          desc: '生成连续排名，常用于Top N、去重',
          detail: '**典型业务场景**：每个类目取销量前3的商品、去重保留最新记录\\n**易踩坑点**：忘记ORDER BY导致排名无意义\\n**可继续深挖**：PARTITION BY分组排名',
          code: `-- 全局排名\nSELECT \n  product_name,\n  sales,\n  ROW_NUMBER() OVER (ORDER BY sales DESC) AS rank\nFROM products;\n\n-- 分组排名（每个类目独立排名）\nSELECT \n  category,\n  product_name,\n  sales,\n  ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rank\nFROM products;\n\n-- 实战：每个类目取Top 3\nWITH ranked AS (\n  SELECT \n    category,\n    product_name,\n    sales,\n    ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn\n  FROM products\n)\nSELECT * FROM ranked WHERE rn <= 3;\n\n-- 实战：去重（保留最新记录）\nWITH ranked AS (\n  SELECT \n    *,\n    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn\n  FROM orders\n)\nSELECT * FROM ranked WHERE rn = 1;`
        },
        {
          emoji: '🥇',
          title: 'RANK / DENSE_RANK',
          desc: 'RANK并列排名有间隔，DENSE_RANK无间隔',
          detail: '**典型业务场景**：成绩排名、销售排行榜\\n**易踩坑点**：RANK并列后跳号（1,2,2,4），DENSE_RANK不跳（1,2,2,3）\\n**可继续深挖**：PERCENT_RANK百分位排名',
          code: `-- 三种排名函数对比\nSELECT \n  student_name,\n  score,\n  ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num,   -- 1,2,3,4\n  RANK() OVER (ORDER BY score DESC) AS rank,            -- 1,2,2,4\n  DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank -- 1,2,2,3\nFROM students;\n\n-- 实战：销售排行榜（允许并列）\nSELECT \n  salesperson,\n  amount,\n  RANK() OVER (ORDER BY amount DESC) AS sales_rank\nFROM sales\nWHERE year = 2024;`
        },
        {
          emoji: '📊',
          title: 'SUM/AVG/COUNT OVER ☆',
          desc: '聚合窗口函数，保留明细行同时计算汇总',
          detail: '**典型业务场景**：累计销售额、移动平均、占比计算\\n**易踩坑点**：忘记ORDER BY导致全分区聚合\\n**可继续深挖**：ROWS BETWEEN滑动窗口',
          code: `-- 累计销售额\nSELECT \n  order_date,\n  amount,\n  SUM(amount) OVER (ORDER BY order_date) AS cumulative_amount\nFROM orders;\n\n-- 占比计算\nSELECT \n  category,\n  amount,\n  amount * 100.0 / SUM(amount) OVER () AS percentage\nFROM orders;\n\n-- 与分组平均值对比\nSELECT \n  city,\n  salary,\n  AVG(salary) OVER (PARTITION BY city) AS city_avg,\n  salary - AVG(salary) OVER (PARTITION BY city) AS diff\nFROM employees;\n\n-- 移动平均（3日均值）\nSELECT \n  date,\n  amount,\n  AVG(amount) OVER (\n    ORDER BY date\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n  ) AS moving_avg_3d\nFROM daily_sales;`
        },
        {
          emoji: '🔄',
          title: 'LAG / LEAD 偏移 ☆',
          desc: '获取前N行/后N行的值，常用于环比、同比',
          detail: '**典型业务场景**：计算增长率、连续登录检测\\n**易踩坑点**：第一行LAG返回NULL\\n**可继续深挖**：FIRST_VALUE、LAST_VALUE',
          code: `-- 计算环比增长率\nSELECT \n  month,\n  revenue,\n  LAG(revenue) OVER (ORDER BY month) AS prev_revenue,\n  (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month) AS growth_rate\nFROM monthly_revenue;\n\n-- 同比增长（去年同月）\nSELECT \n  year,\n  month,\n  revenue,\n  LAG(revenue, 12) OVER (ORDER BY year, month) AS last_year_revenue\nFROM monthly_revenue;\n\n-- 连续登录检测\nWITH login_with_next AS (\n  SELECT \n    user_id,\n    login_date,\n    LEAD(login_date) OVER (PARTITION BY user_id ORDER BY login_date) AS next_login\n  FROM user_logins\n)\nSELECT * FROM login_with_next\nWHERE DATEDIFF(next_login, login_date) = 1;`
        },
        {
          emoji: '🎯',
          title: 'NTILE 分桶',
          desc: '将数据平均分成N组，常用于RFM分层',
          detail: '**典型业务场景**：用户分层（高中低价值）、AB测试分组\\n**易踩坑点**：数据量不能被N整除时桶大小不同\\n**可继续深挖**：自定义分层逻辑',
          code: `-- RFM模型：将用户分5层\nWITH rfm AS (\n  SELECT \n    user_id,\n    DATEDIFF(CURDATE(), MAX(order_date)) AS recency,\n    COUNT(*) AS frequency,\n    SUM(amount) AS monetary\n  FROM orders\n  GROUP BY user_id\n)\nSELECT \n  user_id,\n  NTILE(5) OVER (ORDER BY recency DESC) AS r_score,\n  NTILE(5) OVER (ORDER BY frequency) AS f_score,\n  NTILE(5) OVER (ORDER BY monetary) AS m_score\nFROM rfm;\n\n-- AB测试分组（随机分2组）\nSELECT \n  user_id,\n  NTILE(2) OVER (ORDER BY RAND()) AS ab_group\nFROM users;`
        },
        {
          emoji: '💡',
          title: '窗口函数实战案例',
          desc: '综合应用：留存分析、连续问题、帕累托分析',
          detail: '**典型业务场景**：次日留存率、连续N天登录、80/20法则\\n**易踩坑点**：窗口函数不能嵌套，需用子查询\\n**可继续深挖**：递归CTE处理复杂逻辑',
          code: `-- 案例1：次日留存率\nWITH first_login AS (\n  SELECT user_id, MIN(login_date) AS first_date\n  FROM user_logins\n  GROUP BY user_id\n),\nnext_day_login AS (\n  SELECT DISTINCT fl.user_id\n  FROM first_login fl\n  JOIN user_logins ul ON fl.user_id = ul.user_id\n  WHERE ul.login_date = DATE_ADD(fl.first_date, INTERVAL 1 DAY)\n)\nSELECT \n  COUNT(DISTINCT fl.user_id) AS new_users,\n  COUNT(DISTINCT ndl.user_id) AS retained_users,\n  COUNT(DISTINCT ndl.user_id) * 100.0 / COUNT(DISTINCT fl.user_id) AS retention_rate\nFROM first_login fl\nLEFT JOIN next_day_login ndl ON fl.user_id = ndl.user_id;\n\n-- 案例2：帕累托分析（找出贡献80%销售额的商品）\nWITH product_sales AS (\n  SELECT \n    product_id,\n    SUM(amount) AS total,\n    SUM(SUM(amount)) OVER () AS grand_total\n  FROM orders\n  GROUP BY product_id\n),\nwith_cumulative AS (\n  SELECT \n    product_id,\n    total,\n    SUM(total) OVER (ORDER BY total DESC) AS cumulative,\n    grand_total\n  FROM product_sales\n)\nSELECT * FROM with_cumulative\nWHERE cumulative <= grand_total * 0.8;`
        }
      ]
    },
    {
      id: 'timeseries',
      title: 'PART 09 时间序列层',
      subtitle: '时间维度分析是数据分析的核心场景',
      items: [
        {
          emoji: '📅',
          title: '日期辅助表 ☆',
          desc: '生成连续日期序列，填补缺失日期',
          detail: '**典型业务场景**：销售额趋势图（缺失日期补0）\\n**易踩坑点**：JOIN日期表后数据量爆炸\\n**可继续深挖**：节假日标记、工作日/周末',
          code: `-- 方法1：递归CTE生成日期表（8.0+）\nWITH RECURSIVE dates AS (\n  SELECT '2024-01-01' AS date\n  UNION ALL\n  SELECT DATE_ADD(date, INTERVAL 1 DAY)\n  FROM dates\n  WHERE date < '2024-12-31'\n)\nSELECT * FROM dates;\n\n-- 方法2：物理日期表（推荐，性能更好）\nCREATE TABLE dim_date (\n  date DATE PRIMARY KEY,\n  year INT,\n  month INT,\n  day INT,\n  weekday INT,\n  is_weekend BOOLEAN,\n  is_holiday BOOLEAN\n);\n\n-- 填充日期数据\nINSERT INTO dim_date\nWITH RECURSIVE dates AS (\n  SELECT '2020-01-01' AS date\n  UNION ALL\n  SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM dates WHERE date < '2030-12-31'\n)\nSELECT \n  date,\n  YEAR(date),\n  MONTH(date),\n  DAY(date),\n  WEEKDAY(date),\n  WEEKDAY(date) IN (5,6),\n  0\nFROM dates;\n\n-- 使用：填补缺失日期\nSELECT \n  d.date,\n  IFNULL(SUM(o.amount), 0) AS daily_sales\nFROM dim_date d\nLEFT JOIN orders o ON d.date = DATE(o.order_date)\nWHERE d.date BETWEEN '2024-01-01' AND '2024-01-31'\nGROUP BY d.date\nORDER BY d.date;`
        },
        {
          emoji: '📈',
          title: '同比环比计算 ☆',
          desc: 'YoY（Year-over-Year）、MoM（Month-over-Month）',
          detail: '**典型业务场景**：月度经营报表、业绩对比分析\\n**易踩坑点**：跨年环比需特殊处理\\n**可继续深挖**：复合增长率CAGR',
          code: `-- 环比增长率（MoM）\nWITH monthly_sales AS (\n  SELECT \n    DATE_FORMAT(order_date, '%Y-%m') AS month,\n    SUM(amount) AS revenue\n  FROM orders\n  GROUP BY month\n)\nSELECT \n  month,\n  revenue,\n  LAG(revenue) OVER (ORDER BY month) AS prev_month,\n  (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / \n    LAG(revenue) OVER (ORDER BY month) AS mom_growth\nFROM monthly_sales;\n\n-- 同比增长率（YoY）\nWITH monthly_sales AS (\n  SELECT \n    YEAR(order_date) AS year,\n    MONTH(order_date) AS month,\n    SUM(amount) AS revenue\n  FROM orders\n  GROUP BY year, month\n)\nSELECT \n  year,\n  month,\n  revenue,\n  LAG(revenue, 12) OVER (ORDER BY year, month) AS last_year,\n  (revenue - LAG(revenue, 12) OVER (ORDER BY year, month)) * 100.0 / \n    LAG(revenue, 12) OVER (ORDER BY year, month) AS yoy_growth\nFROM monthly_sales;`
        },
        {
          emoji: '🔄',
          title: '留存分析',
          desc: '次日留存、7日留存、30日留存',
          detail: '**典型业务场景**：新用户留存率、功能留存分析\\n**易踩坑点**：首次行为定义不清、活跃定义模糊\\n**可继续深挖**：Cohort分析、留存曲线',
          code: `-- 次日/7日/30日留存率\nWITH first_action AS (\n  SELECT \n    user_id,\n    MIN(DATE(action_time)) AS first_date\n  FROM user_actions\n  GROUP BY user_id\n),\nretention AS (\n  SELECT \n    fa.first_date,\n    COUNT(DISTINCT fa.user_id) AS new_users,\n    COUNT(DISTINCT CASE WHEN DATEDIFF(ua.action_time, fa.first_date) = 1 THEN fa.user_id END) AS day1,\n    COUNT(DISTINCT CASE WHEN DATEDIFF(ua.action_time, fa.first_date) = 7 THEN fa.user_id END) AS day7,\n    COUNT(DISTINCT CASE WHEN DATEDIFF(ua.action_time, fa.first_date) = 30 THEN fa.user_id END) AS day30\n  FROM first_action fa\n  LEFT JOIN user_actions ua ON fa.user_id = ua.user_id\n  GROUP BY fa.first_date\n)\nSELECT \n  first_date,\n  new_users,\n  day1 * 100.0 / new_users AS retention_day1,\n  day7 * 100.0 / new_users AS retention_day7,\n  day30 * 100.0 / new_users AS retention_day30\nFROM retention\nORDER BY first_date;`
        },
        {
          emoji: '🎯',
          title: '滑动窗口统计',
          desc: '移动平均、累计指标、滚动求和',
          detail: '**典型业务场景**：7日均值平滑曲线、累计GMV\\n**易踩坑点**：窗口边界定义（ROWS vs RANGE）\\n**可继续深挖**：指数加权移动平均EMA',
          code: `-- 7日移动平均\nSELECT \n  date,\n  sales,\n  AVG(sales) OVER (\n    ORDER BY date\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ) AS ma7\nFROM daily_sales;\n\n-- 累计GMV\nSELECT \n  date,\n  gmv,\n  SUM(gmv) OVER (ORDER BY date) AS cumulative_gmv\nFROM daily_gmv\nWHERE YEAR(date) = 2024;\n\n-- 滚动30天活跃用户数\nSELECT \n  date,\n  COUNT(DISTINCT user_id) OVER (\n    ORDER BY date\n    RANGE BETWEEN INTERVAL 29 DAY PRECEDING AND CURRENT ROW\n  ) AS mau\nFROM user_daily_active;`
        },
        {
          emoji: '⏰',
          title: '时间段分析',
          desc: '小时分布、工作日/周末、节假日对比',
          detail: '**典型业务场景**：订单时段分布、周末促销效果\\n**易踩坑点**：时区问题、夏令时\\n**可继续深挖**：自定义业务周期（财年）',
          code: `-- 订单时段分布\nSELECT \n  HOUR(order_time) AS hour,\n  COUNT(*) AS order_count\nFROM orders\nGROUP BY hour\nORDER BY hour;\n\n-- 工作日 vs 周末对比\nSELECT \n  CASE \n    WHEN WEEKDAY(order_date) IN (5, 6) THEN '周末'\n    ELSE '工作日'\n  END AS day_type,\n  COUNT(*) AS order_count,\n  SUM(amount) AS total_amount\nFROM orders\nGROUP BY day_type;\n\n-- 节假日效果分析\nSELECT \n  d.is_holiday,\n  COUNT(o.order_id) AS order_count,\n  AVG(o.amount) AS avg_amount\nFROM dim_date d\nLEFT JOIN orders o ON d.date = DATE(o.order_date)\nWHERE d.date BETWEEN '2024-01-01' AND '2024-12-31'\nGROUP BY d.is_holiday;`
        },
        {
          emoji: '🔍',
          title: '时间序列实战案例',
          desc: '连续活跃、间隔分析、时间漏斗',
          detail: '**典型业务场景**：连续7天登录用户、平均购买间隔\\n**易踩坑点**：连续性判断逻辑复杂\\n**可继续深挖**：Sessionization（会话切分）',
          code: `-- 案例1：连续7天登录用户\nWITH login_with_rank AS (\n  SELECT \n    user_id,\n    login_date,\n    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS rn,\n    DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS grp\n  FROM user_logins\n),\ncontinuous AS (\n  SELECT \n    user_id,\n    grp,\n    COUNT(*) AS continuous_days\n  FROM login_with_rank\n  GROUP BY user_id, grp\n  HAVING COUNT(*) >= 7\n)\nSELECT DISTINCT user_id FROM continuous;\n\n-- 案例2：平均购买间隔\nWITH order_gaps AS (\n  SELECT \n    user_id,\n    order_date,\n    DATEDIFF(\n      order_date,\n      LAG(order_date) OVER (PARTITION BY user_id ORDER BY order_date)\n    ) AS gap_days\n  FROM orders\n)\nSELECT \n  user_id,\n  AVG(gap_days) AS avg_purchase_interval\nFROM order_gaps\nWHERE gap_days IS NOT NULL\nGROUP BY user_id;`
        }
      ]
    },
    {
      id: 'templates',
      title: 'PART 10 实战模板层',
      subtitle: '10大高频SQL模板，拿来即用',
      items: [
        {
          emoji: '👥',
          title: '用户行为分析模板 ☆',
          desc: '活跃用户、新增用户、DAU/MAU计算',
          detail: '**典型业务场景**：日报周报必备指标\\n**易踩坑点**：活跃定义不统一、去重逻辑错误\\n**可继续深挖**：WAU、留存用户、流失用户',
          code: `-- DAU（日活跃用户数）\nSELECT \n  DATE(action_time) AS date,\n  COUNT(DISTINCT user_id) AS dau\nFROM user_actions\nWHERE DATE(action_time) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)\nGROUP BY date;\n\n-- MAU（月活跃用户数）\nSELECT \n  DATE_FORMAT(action_time, '%Y-%m') AS month,\n  COUNT(DISTINCT user_id) AS mau\nFROM user_actions\nGROUP BY month;\n\n-- 新增用户\nWITH first_action AS (\n  SELECT user_id, MIN(DATE(action_time)) AS first_date\n  FROM user_actions\n  GROUP BY user_id\n)\nSELECT \n  first_date,\n  COUNT(*) AS new_users\nFROM first_action\nGROUP BY first_date;`
        },
        {
          emoji: '🔄',
          title: '复购率分析模板',
          desc: '首购/复购用户、复购率、复购周期',
          detail: '**典型业务场景**：电商核心指标、用户价值评估\\n**易踩坑点**：时间窗口选择、复购定义\\n**可继续深挖**：N次复购率、复购间隔分布',
          code: `-- 复购率统计\nWITH user_order_count AS (\n  SELECT \n    user_id,\n    COUNT(*) AS order_count\n  FROM orders\n  WHERE order_date >= '2024-01-01'\n  GROUP BY user_id\n)\nSELECT \n  COUNT(CASE WHEN order_count = 1 THEN 1 END) AS first_purchase,\n  COUNT(CASE WHEN order_count >= 2 THEN 1 END) AS repurchase,\n  COUNT(CASE WHEN order_count >= 2 THEN 1 END) * 100.0 / COUNT(*) AS repurchase_rate\nFROM user_order_count;`
        },
        {
          emoji: '🎯',
          title: 'RFM模型完整模板',
          desc: 'Recency, Frequency, Monetary 用户分层',
          detail: '**典型业务场景**：精准营销、用户分群\\n**易踩坑点**：分数计算方式、阈值设定\\n**可继续深挖**：RFM自动分层、标签体系',
          code: `-- RFM完整实现\nWITH rfm_base AS (\n  SELECT \n    user_id,\n    DATEDIFF(CURDATE(), MAX(order_date)) AS recency,\n    COUNT(DISTINCT order_id) AS frequency,\n    SUM(amount) AS monetary\n  FROM orders\n  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)\n  GROUP BY user_id\n),\nrfm_score AS (\n  SELECT *,\n    NTILE(5) OVER (ORDER BY recency DESC) AS r_score,\n    NTILE(5) OVER (ORDER BY frequency) AS f_score,\n    NTILE(5) OVER (ORDER BY monetary) AS m_score\n  FROM rfm_base\n)\nSELECT \n  user_id,\n  CONCAT(r_score, f_score, m_score) AS rfm_code,\n  CASE \n    WHEN r_score >= 4 AND f_score >= 4 THEN '重要价值客户'\n    WHEN r_score >= 4 AND f_score < 4 THEN '重要发展客户'\n    WHEN r_score < 4 AND f_score >= 4 THEN '重要保持客户'\n    WHEN r_score < 2 AND f_score < 2 THEN '流失客户'\n    ELSE '一般客户'\n  END AS customer_type\nFROM rfm_score;`
        }
      ]
    },
    {
      id: 'bi',
      title: 'PART 11 BI连接与自动化层',
      subtitle: 'SQL不只是查询，还要对接BI工具和Python',
      items: [
        {
          emoji: '📊',
          title: 'PowerBI / Tableau 对接',
          desc: '参数化SQL、增量刷新、行级安全',
          detail: '**典型业务场景**：BI报表自动刷新、权限控制\\n**易踩坑点**：参数格式不匹配、全量刷新性能差\\n**可继续深挖**：DirectQuery vs Import模式',
          code: `-- PowerBI参数化查询示例\n-- 在PowerBI中创建参数：StartDate、EndDate\nSELECT *\nFROM orders\nWHERE order_date >= '@StartDate' \n  AND order_date < '@EndDate';\n\n-- 增量刷新策略（只刷新近30天数据）\nSELECT *\nFROM orders\nWHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);\n\n-- 行级安全（RLS）\n-- 假设当前用户存储在PowerBI变量中\nSELECT *\nFROM sales\nWHERE region = '@CurrentUserRegion';`
        },
        {
          emoji: '🐍',
          title: 'Python × MySQL 集成 ☆',
          desc: 'pymysql、pandas.read_sql、sqlalchemy连接池',
          detail: '**典型业务场景**：自动化报表、数据ETL\\n**易踩坑点**：SQL注入风险、连接未关闭\\n**可继续深挖**：异步查询、批量写入优化',
          code: `# Python集成示例\nimport pymysql\nimport pandas as pd\nfrom sqlalchemy import create_engine\n\n# 方法1：pymysql基础用法\nconn = pymysql.connect(\n    host='localhost',\n    user='root',\n    password='password',\n    database='mydb',\n    charset='utf8mb4'\n)\n\ntry:\n    with conn.cursor() as cursor:\n        # ✅ 参数化查询（防SQL注入）\n        sql = \"SELECT * FROM users WHERE id = %s\"\n        cursor.execute(sql, (user_id,))\n        result = cursor.fetchall()\nfinally:\n    conn.close()\n\n# 方法2：pandas快速读取（推荐）\nengine = create_engine('mysql+pymysql://root:password@localhost/mydb?charset=utf8mb4')\ndf = pd.read_sql(\"SELECT * FROM orders WHERE order_date >= '2024-01-01'\", engine)\n\n# 写入DataFrame到MySQL\ndf.to_sql('temp_table', engine, if_exists='replace', index=False)`
        },
        {
          emoji: '⏰',
          title: 'SQL定时任务',
          desc: 'Event Scheduler、存储过程、Linux Cron',
          detail: '**典型业务场景**：每日数据汇总、定时清理日志\\n**易踩坑点**：Event Scheduler未开启、时区问题\\n**可继续深挖**：异常监控、任务依赖管理',
          code: `-- 开启Event Scheduler\nSET GLOBAL event_scheduler = ON;\n\n-- 创建每日汇总任务\nCREATE EVENT daily_summary\nON SCHEDULE EVERY 1 DAY\nSTARTS '2024-01-01 00:00:00'\nDO\nBEGIN\n  INSERT INTO daily_stats (date, total_orders, total_amount)\n  SELECT \n    CURDATE() - INTERVAL 1 DAY,\n    COUNT(*),\n    SUM(amount)\n  FROM orders\n  WHERE DATE(order_date) = CURDATE() - INTERVAL 1 DAY;\nEND;\n\n-- 查看所有事件\nSHOW EVENTS;\n\n-- 删除事件\nDROP EVENT daily_summary;`
        }
      ]
    },
    {
      id: 'resources',
      title: 'PART 12 学习路径 & 资源',
      subtitle: '从入门到精通的完整学习地图',
      items: [
        {
          emoji: '🎯',
          title: '学习阶段规划',
          desc: '入门 → 进阶 → 高级 三阶段路线图',
          detail: '**入门阶段**：DDL/DML/DQL基础、单表查询、聚合函数（1-2周）\\n**进阶阶段**：JOIN关联、子查询、窗口函数、索引优化（2-4周）\\n**高级阶段**：执行计划分析、性能调优、分区表、存储过程（1-2月）',
          code: `-- 入门练习题\n-- 1. 查询销售额最高的10个商品\nSELECT product_name, SUM(amount) AS total\nFROM orders\nGROUP BY product_name\nORDER BY total DESC\nLIMIT 10;\n\n-- 2. 计算每个用户的平均订单金额\nSELECT user_id, AVG(amount) AS avg_amount\nFROM orders\nGROUP BY user_id;\n\n-- 进阶练习题\n-- 3. 找出连续3天都有登录的用户\nWITH login_with_rank AS (\n  SELECT \n    user_id,\n    login_date,\n    DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS grp\n  FROM user_logins\n)\nSELECT user_id, COUNT(*) AS continuous_days\nFROM login_with_rank\nGROUP BY user_id, grp\nHAVING COUNT(*) >= 3;`
        },
        {
          emoji: '📚',
          title: '推荐学习资源',
          desc: '官方文档、在线平台、实战项目',
          detail: '**官方文档**：MySQL 8.0 Reference Manual（必读）\\n**在线练习**：LeetCode SQL专题、牛客网SQL实战\\n**进阶书籍**：《高性能MySQL》、《SQL必知必会》\\n**实战项目**：电商数据分析、用户行为分析、AB测试分析',
          code: `-- LeetCode经典题目推荐\n-- 1. 第N高的薪水（窗口函数）\n-- 2. 部门工资前三高的员工（DENSE_RANK）\n-- 3. 行程和用户（复杂JOIN + 聚合）\n-- 4. 连续出现的数字（自连接）\n-- 5. 换座位（CASE WHEN + LEAD/LAG）\n\n-- 牛客网SQL实战推荐\n-- 1. 用户登录行为分析\n-- 2. 各类型业务销售统计\n-- 3. 试卷作答统计分析`
        },
        {
          emoji: '💡',
          title: '高频面试题汇总',
          desc: 'SQL执行顺序、索引失效、窗口函数、慢查询优化',
          detail: '**必考题**：\\n1. SQL执行顺序（FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT）\\n2. 索引失效的5种场景\\n3. INNER JOIN vs LEFT JOIN区别\\n4. 窗口函数实现Top N\\n5. EXPLAIN各字段含义',
          code: `-- 高频面试题示例\n\n-- Q1: 查询每个部门工资最高的员工\nWITH ranked AS (\n  SELECT \n    *,\n    RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rk\n  FROM employees\n)\nSELECT * FROM ranked WHERE rk = 1;\n\n-- Q2: 删除重复数据（保留ID最小的）\nDELETE FROM users\nWHERE id NOT IN (\n  SELECT MIN(id) FROM users GROUP BY email\n);\n\n-- Q3: 连续登录N天的用户\n-- （见时间序列章节完整实现）`
        }
      ]
    },
    {
      id: 'analysis-templates',
      title: 'PART 13 数据分析必备SQL模板库',
      subtitle: '8大高频分析场景，复制即用',
      items: [
        {
          emoji: '📊',
          title: 'RFM客户分层 ☆',
          desc: 'Recency、Frequency、Monetary三维度用户分群',
          detail: '**典型业务场景**：精准营销、用户价值评估、个性化推荐\\n**易踩坑点**：时间窗口选择、分数阈值设定\\n**可继续深挖**：动态RFM、加权RFM',
          code: `-- RFM客户分层完整SQL\nWITH rfm_base AS (\n  SELECT \n    user_id,\n    DATEDIFF(CURDATE(), MAX(order_date)) AS recency,\n    COUNT(DISTINCT order_id) AS frequency,\n    SUM(amount) AS monetary\n  FROM orders\n  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)\n  GROUP BY user_id\n),\nrfm_score AS (\n  SELECT *,\n    NTILE(5) OVER (ORDER BY recency DESC) AS r_score,\n    NTILE(5) OVER (ORDER BY frequency) AS f_score,\n    NTILE(5) OVER (ORDER BY monetary) AS m_score\n  FROM rfm_base\n)\nSELECT \n  user_id,\n  CONCAT(r_score, f_score, m_score) AS rfm_code,\n  CASE \n    WHEN r_score >= 4 AND f_score >= 4 THEN '重要价值客户'\n    WHEN r_score >= 4 AND f_score < 4 THEN '重要发展客户'\n    WHEN r_score < 4 AND f_score >= 4 THEN '重要保持客户'\n    WHEN r_score < 2 AND f_score < 2 THEN '流失客户'\n    ELSE '一般客户'\n  END AS customer_type\nFROM rfm_score;`
        },
        {
          emoji: '👥',
          title: '同期群分析（Cohort） ☆',
          desc: '按注册时间分组，观察不同批次用户的留存表现',
          detail: '**典型业务场景**：新用户留存追踪、产品迭代效果对比\\n**易踩坑点**：时间粒度选择、活跃定义\\n**可继续深挖**：行为Cohort、漏斗Cohort',
          code: `-- Cohort留存分析\nWITH user_cohort AS (\n  SELECT \n    user_id,\n    DATE_FORMAT(MIN(order_date), '%Y-%m') AS cohort_month\n  FROM orders\n  GROUP BY user_id\n),\nuser_activity AS (\n  SELECT \n    uc.cohort_month,\n    DATE_FORMAT(o.order_date, '%Y-%m') AS activity_month,\n    COUNT(DISTINCT o.user_id) AS active_users\n  FROM user_cohort uc\n  JOIN orders o ON uc.user_id = o.user_id\n  GROUP BY uc.cohort_month, activity_month\n),\ncohort_size AS (\n  SELECT cohort_month, COUNT(*) AS cohort_size\n  FROM user_cohort\n  GROUP BY cohort_month\n)\nSELECT \n  ua.cohort_month,\n  ua.activity_month,\n  ua.active_users,\n  cs.cohort_size,\n  ROUND(ua.active_users * 100.0 / cs.cohort_size, 2) AS retention_rate,\n  PERIOD_DIFF(\n    CAST(REPLACE(ua.activity_month, '-', '') AS UNSIGNED),\n    CAST(REPLACE(ua.cohort_month, '-', '') AS UNSIGNED)\n  ) AS month_number\nFROM user_activity ua\nJOIN cohort_size cs ON ua.cohort_month = cs.cohort_month\nORDER BY ua.cohort_month, ua.activity_month;`
        },
        {
          emoji: '🧪',
          title: 'AB测试结果分析',
          desc: '对照组/实验组转化率对比、显著性检验',
          detail: '**典型业务场景**：功能上线AB测试、营销活动效果评估\\n**易踩坑点**：样本量不足、辛普森悖论\\n**可继续深挖**：卡方检验、置信区间计算',
          code: `-- AB测试转化率对比\nWITH ab_stats AS (\n  SELECT \n    ab_group,\n    COUNT(DISTINCT user_id) AS total_users,\n    COUNT(DISTINCT CASE WHEN converted = 1 THEN user_id END) AS converted_users,\n    COUNT(DISTINCT CASE WHEN converted = 1 THEN user_id END) * 100.0 / COUNT(DISTINCT user_id) AS conversion_rate\n  FROM ab_test_data\n  GROUP BY ab_group\n)\nSELECT \n  a.ab_group AS group_a,\n  a.conversion_rate AS rate_a,\n  b.ab_group AS group_b,\n  b.conversion_rate AS rate_b,\n  (b.conversion_rate - a.conversion_rate) AS lift,\n  ROUND((b.conversion_rate - a.conversion_rate) * 100.0 / a.conversion_rate, 2) AS lift_percentage\nFROM ab_stats a\nCROSS JOIN ab_stats b\nWHERE a.ab_group = 'control' AND b.ab_group = 'treatment';`
        },
        {
          emoji: '💰',
          title: 'GMV拆解分析',
          desc: 'GMV = 访客数 × 转化率 × 客单价',
          detail: '**典型业务场景**：GMV下降归因、增长驱动力分析\\n**易踩坑点**：口径不一致、重复计算\\n**可继续深挖**：多维度拆解、趋势分解',
          code: `-- GMV三要素拆解\nWITH daily_metrics AS (\n  SELECT \n    DATE(order_date) AS date,\n    COUNT(DISTINCT user_id) AS visitors,\n    COUNT(DISTINCT CASE WHEN amount > 0 THEN user_id END) AS buyers,\n    COUNT(DISTINCT CASE WHEN amount > 0 THEN user_id END) * 100.0 / COUNT(DISTINCT user_id) AS conversion_rate,\n    SUM(amount) / COUNT(DISTINCT CASE WHEN amount > 0 THEN user_id END) AS avg_order_value,\n    SUM(amount) AS gmv\n  FROM orders\n  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)\n  GROUP BY date\n)\nSELECT \n  date,\n  visitors,\n  conversion_rate,\n  avg_order_value,\n  gmv,\n  LAG(gmv) OVER (ORDER BY date) AS prev_gmv,\n  gmv - LAG(gmv) OVER (ORDER BY date) AS gmv_change\nFROM daily_metrics\nORDER BY date;`
        }
      ]
    },
    {
      id: 'visualizations',
      title: 'PART 14 SQL可视化图解',
      subtitle: '抽象概念可视化，一图胜千言',
      items: [
        {
          emoji: '🔗',
          title: 'JOIN类型韦恩图',
          desc: 'INNER、LEFT、RIGHT、FULL OUTER JOIN的直观对比',
          detail: '**典型业务场景**：理解JOIN语义、选择正确JOIN类型\\n**易踩坑点**：LEFT JOIN + WHERE变INNER JOIN\\n**可继续深挖**：SEMI JOIN、ANTI JOIN',
          code: `/*\nJOIN类型对比（ASCII图示）\n\nINNER JOIN (交集)        LEFT JOIN (左表全保留)      RIGHT JOIN (右表全保留)\n    ┌─────┐                  ┌─────┐                  ┌─────┐\n    │  A  │                  │ A+AB│                  │  B  │\n    └──┬──┘                  └──┬──┘                  └──┬──┘\n       │ AB                     │ AB                     │ AB\n    ┌──┴──┐                  ┌──┴──┐                  ┌──┴──┐\n    │  B  │                  │  B  │                  │ A+AB│\n    └─────┘                  └─────┘                  └─────┘\n\nFULL OUTER JOIN (并集，MySQL需UNION模拟)\n    ┌─────┐\n    │A+AB+B│\n    └─────┘\n*/\n\n-- INNER JOIN示例\nSELECT u.name, o.order_id\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- LEFT JOIN示例\nSELECT u.name, o.order_id\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;\n\n-- FULL OUTER JOIN模拟\nSELECT u.name, o.order_id FROM users u LEFT JOIN orders o ON u.id = o.user_id\nUNION\nSELECT u.name, o.order_id FROM users u RIGHT JOIN orders o ON u.id = o.user_id;`
        },
        {
          emoji: '🌲',
          title: '索引B+Tree结构图',
          desc: 'MySQL InnoDB索引底层数据结构',
          detail: '**典型业务场景**：理解索引原理、优化索引设计\\n**易踩坑点**：聚簇索引 vs 二级索引、回表查询\\n**可继续深挖**：页分裂、页合并',
          code: `/*\nB+Tree索引结构（简化示例）\n\n非叶子节点（索引页）\n        [10, 20, 30]\n       /    |    |    \\\n      /     |    |     \\\n叶子节点（数据页，双向链表）\n[1,5,8] ↔ [10,15,18] ↔ [20,25,28] ↔ [30,35,38]\n   ↓          ↓           ↓           ↓\n  数据       数据        数据        数据\n\n特点：\n1. 非叶子节点只存索引，不存数据\n2. 叶子节点存储完整数据行（聚簇索引）或主键值（二级索引）\n3. 叶子节点通过双向链表连接，支持范围查询\n4. 树的高度通常为3-4层，可存储百万级数据\n*/\n\n-- 聚簇索引（主键索引）\nCREATE TABLE users (\n  id BIGINT PRIMARY KEY,  -- 聚簇索引\n  name VARCHAR(50)\n);\n\n-- 二级索引（需要回表）\nCREATE INDEX idx_name ON users(name);\n\n-- 覆盖索引（无需回表）\nCREATE INDEX idx_name_id ON users(name, id);`
        },
        {
          emoji: '📊',
          title: 'EXPLAIN执行计划解读',
          desc: 'type、key、rows、Extra字段含义图解',
          detail: '**典型业务场景**：慢查询分析、索引优化验证\\n**易踩坑点**：type=ALL全表扫描、Extra=Using filesort\\n**可继续深挖**：EXPLAIN FORMAT=JSON',
          code: `/*\nEXPLAIN关键字段解读\n\n┌─────────────────────────────────────────────────────────┐\n│ type（访问类型，性能从优到劣）                           │\n├─────────────────────────────────────────────────────────┤\n│ system > const > eq_ref > ref > range > index > ALL     │\n│   ↑最优                                          ↑最差  │\n└─────────────────────────────────────────────────────────┘\n\n┌─────────────────────────────────────────────────────────┐\n│ Extra（额外信息）                                        │\n├─────────────────────────────────────────────────────────┤\n│ ✅ Using index         - 覆盖索引，无需回表（最优）      │\n│ ✅ Using where         - WHERE过滤（正常）               │\n│ ⚠️ Using filesort      - 文件排序（需优化）             │\n│ ⚠️ Using temporary     - 使用临时表（需优化）           │\n└─────────────────────────────────────────────────────────┘\n*/\n\n-- 示例：优化前后对比\n-- ❌ 优化前（type=ALL，全表扫描）\nEXPLAIN SELECT * FROM orders WHERE YEAR(order_date) = 2024;\n\n-- ✅ 优化后（type=range，使用索引）\nEXPLAIN SELECT * FROM orders \nWHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`
        }
      ]
    },
    {
      id: 'optimization-cases',
      title: 'PART 15 性能优化实战案例',
      subtitle: '真实慢查询优化，3秒→0.1秒的魔法',
      items: [
        {
          emoji: '🐌',
          title: '慢查询优化案例1：3s→0.1s',
          desc: '问题：大表全表扫描 | 解决：添加索引+覆盖索引',
          detail: '**问题分析**：WHERE条件字段无索引，导致全表扫描\\n**优化手段**：创建复合索引、使用覆盖索引\\n**性能提升**：30倍',
          code: `-- ❌ 优化前（执行时间：3.2秒）\nSELECT user_id, order_date, amount\nFROM orders\nWHERE status = 1 AND order_date >= '2024-01-01'\nORDER BY order_date DESC\nLIMIT 100;\n\n-- EXPLAIN分析：type=ALL, rows=1000000\n\n-- ✅ 优化步骤1：创建复合索引\nCREATE INDEX idx_status_date ON orders(status, order_date);\n\n-- 优化步骤2：调整为覆盖索引\nCREATE INDEX idx_status_date_amount ON orders(status, order_date, amount, user_id);\n\n-- ✅ 优化后（执行时间：0.1秒）\nSELECT user_id, order_date, amount\nFROM orders\nWHERE status = 1 AND order_date >= '2024-01-01'\nORDER BY order_date DESC\nLIMIT 100;\n\n-- EXPLAIN分析：type=range, rows=1200, Extra=Using index`
        },
        {
          emoji: '📊',
          title: '聚合查询优化案例2：5s→0.2s',
          desc: '问题：大表GROUP BY慢 | 解决：先过滤再聚合',
          detail: '**问题分析**：全表GROUP BY，临时表过大\\n**优化手段**：WHERE提前过滤、添加索引\\n**性能提升**：25倍',
          code: `-- ❌ 优化前（执行时间：5.1秒）\nSELECT \n  user_id,\n  COUNT(*) AS order_count,\n  SUM(amount) AS total_amount\nFROM orders\nGROUP BY user_id\nHAVING total_amount > 1000;\n\n-- EXPLAIN分析：Extra=Using temporary\n\n-- ✅ 优化后（执行时间：0.2秒）\n-- 步骤1：先用子查询过滤\nWITH user_total AS (\n  SELECT \n    user_id,\n    SUM(amount) AS total_amount\n  FROM orders\n  WHERE order_date >= '2024-01-01'  -- 提前过滤\n  GROUP BY user_id\n  HAVING total_amount > 1000\n)\nSELECT \n  ut.user_id,\n  COUNT(o.order_id) AS order_count,\n  ut.total_amount\nFROM user_total ut\nJOIN orders o ON ut.user_id = o.user_id\nGROUP BY ut.user_id, ut.total_amount;\n\n-- 步骤2：添加索引\nCREATE INDEX idx_user_date ON orders(user_id, order_date);`
        },
        {
          emoji: '🔗',
          title: 'JOIN优化案例3：10s→1s',
          desc: '问题：大表JOIN无索引 | 解决：索引+先聚合再JOIN',
          detail: '**问题分析**：JOIN字段无索引，Nested Loop全表扫描\\n**优化手段**：添加JOIN索引、先聚合减少JOIN行数\\n**性能提升**：10倍',
          code: `-- ❌ 优化前（执行时间：10.5秒）\nSELECT \n  u.name,\n  COUNT(o.order_id) AS order_count,\n  SUM(o.amount) AS total_amount\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE o.order_date >= '2024-01-01'\nGROUP BY u.id, u.name;\n\n-- EXPLAIN分析：type=ALL (orders表), Extra=Using join buffer\n\n-- ✅ 优化后（执行时间：1.0秒）\n-- 步骤1：添加JOIN索引\nCREATE INDEX idx_user_id ON orders(user_id);\n\n-- 步骤2：先聚合再JOIN（减少JOIN行数）\nWITH order_summary AS (\n  SELECT \n    user_id,\n    COUNT(*) AS order_count,\n    SUM(amount) AS total_amount\n  FROM orders\n  WHERE order_date >= '2024-01-01'\n  GROUP BY user_id\n)\nSELECT \n  u.name,\n  os.order_count,\n  os.total_amount\nFROM users u\nJOIN order_summary os ON u.id = os.user_id;\n\n-- EXPLAIN分析：type=ref, Extra=Using index`
        }
      ]
    },
    {
      id: 'python-mysql',
      title: 'PART 16 Python × MySQL 最佳实践',
      subtitle: 'Python操作MySQL的正确姿势',
      items: [
        {
          emoji: '🔌',
          title: '连接池配置 ☆',
          desc: 'SQLAlchemy连接池，避免频繁建立连接',
          detail: '**典型业务场景**：Web应用数据库连接、定时任务脚本\\n**易踩坑点**：连接未释放导致耗尽、连接超时\\n**可继续深挖**：连接池监控、动态调整池大小',
          code: `# SQLAlchemy连接池最佳实践\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.pool import QueuePool\n\n# 创建带连接池的引擎\nengine = create_engine(\n    'mysql+pymysql://user:password@localhost/dbname?charset=utf8mb4',\n    poolclass=QueuePool,\n    pool_size=10,           # 连接池大小\n    max_overflow=20,        # 超出pool_size后最多创建20个\n    pool_timeout=30,        # 获取连接超时时间（秒）\n    pool_recycle=3600,      # 连接回收时间（避免MySQL 8小时超时）\n    pool_pre_ping=True,     # 使用前ping测试连接是否有效\n    echo=False              # 不打印SQL日志\n)\n\n# 使用连接池\nwith engine.connect() as conn:\n    result = conn.execute(\"SELECT * FROM users LIMIT 10\")\n    for row in result:\n        print(row)`
        },
        {
          emoji: '🛡️',
          title: 'SQL注入防护 ☆',
          desc: '参数化查询，永远不要拼接SQL',
          detail: '**典型业务场景**：用户输入查询、动态条件过滤\\n**易踩坑点**：字符串拼接导致SQL注入漏洞\\n**可继续深挖**：ORM防注入、PreparedStatement',
          code: `import pymysql\n\n# ❌ 危险：SQL注入风险\nuser_input = \"1' OR '1'='1\"\nsql = f\"SELECT * FROM users WHERE id = '{user_input}'\"  # 危险！\n\n# ✅ 正确：参数化查询\nconn = pymysql.connect(host='localhost', user='root', password='pwd', db='mydb')\ncursor = conn.cursor()\n\n# 方法1：使用占位符%s\nuser_id = 123\nsql = \"SELECT * FROM users WHERE id = %s\"\ncursor.execute(sql, (user_id,))  # 注意要传tuple\n\n# 方法2：多个参数\nsql = \"SELECT * FROM users WHERE id = %s AND status = %s\"\ncursor.execute(sql, (user_id, 1))\n\n# 方法3：字典参数（推荐）\nsql = \"SELECT * FROM users WHERE id = %(id)s AND status = %(status)s\"\ncursor.execute(sql, {'id': user_id, 'status': 1})\n\nresults = cursor.fetchall()\nconn.close()`
        },
        {
          emoji: '🐼',
          title: 'Pandas工作流 ☆',
          desc: 'read_sql → DataFrame → to_sql 数据分析黄金组合',
          detail: '**典型业务场景**：数据提取-清洗-分析-回写\\n**易踩坑点**：大表内存溢出、数据类型丢失\\n**可继续深挖**：分块读取、dtype指定',
          code: `import pandas as pd\nfrom sqlalchemy import create_engine\n\nengine = create_engine('mysql+pymysql://user:pwd@localhost/db')\n\n# 读取数据到DataFrame\ndf = pd.read_sql(\n    \"SELECT * FROM orders WHERE order_date >= '2024-01-01'\",\n    engine\n)\n\n# 数据分析处理\ndf['month'] = pd.to_datetime(df['order_date']).dt.month\nmonthly_summary = df.groupby('month').agg({\n    'order_id': 'count',\n    'amount': 'sum'\n}).reset_index()\n\n# 写回数据库\nmonthly_summary.to_sql(\n    'monthly_stats',\n    engine,\n    if_exists='replace',  # append/replace/fail\n    index=False,\n    dtype={'month': 'INT', 'order_id': 'INT', 'amount': 'DECIMAL(10,2)'}\n)\n\n# 大表分块读取（避免内存溢出）\nchunksize = 10000\nfor chunk in pd.read_sql(\"SELECT * FROM big_table\", engine, chunksize=chunksize):\n    process(chunk)`
        }
      ]
    },
    {
      id: 'common-mistakes',
      title: 'PART 17 常见错误避坑指南',
      subtitle: '这些坑，90%的人都踩过',
      items: [
        {
          emoji: '⚠️',
          title: '错误1：WHERE中使用SELECT别名',
          desc: 'SQL执行顺序：WHERE在SELECT之前',
          detail: '**错误原因**：WHERE执行时SELECT的别名还不存在\\n**解决方案**：用原始表达式或子查询/CTE\\n**出现频率**：⭐⭐⭐⭐⭐',
          code: `-- ❌ 错误写法\nSELECT name, age * 2 AS double_age\nFROM users\nWHERE double_age > 30;  -- 报错：Unknown column 'double_age'\n\n-- ✅ 解决方案1：用原始表达式\nSELECT name, age * 2 AS double_age\nFROM users\nWHERE age * 2 > 30;\n\n-- ✅ 解决方案2：用子查询\nSELECT * FROM (\n  SELECT name, age * 2 AS double_age FROM users\n) t\nWHERE double_age > 30;\n\n-- ✅ 解决方案3：用CTE（推荐）\nWITH t AS (\n  SELECT name, age * 2 AS double_age FROM users\n)\nSELECT * FROM t WHERE double_age > 30;`
        },
        {
          emoji: '🔢',
          title: '错误2：COUNT(*)的常见误用',
          desc: 'COUNT(*)、COUNT(1)、COUNT(col)的区别',
          detail: '**错误原因**：不理解COUNT对NULL的处理\\n**解决方案**：COUNT(col)会忽略NULL，COUNT(*)不会\\n**出现频率**：⭐⭐⭐⭐',
          code: `-- 示例数据\nCREATE TABLE test (id INT, name VARCHAR(50));\nINSERT INTO test VALUES (1, 'Alice'), (2, NULL), (3, 'Bob');\n\n-- COUNT(*)：统计所有行（包括NULL）\nSELECT COUNT(*) FROM test;  -- 结果：3\n\n-- COUNT(name)：统计name非NULL的行\nSELECT COUNT(name) FROM test;  -- 结果：2\n\n-- COUNT(DISTINCT name)：统计name去重后的非NULL行\nSELECT COUNT(DISTINCT name) FROM test;  -- 结果：2\n\n-- ❌ 常见错误：想统计用户数，但字段可能为NULL\nSELECT COUNT(user_name) FROM orders;  -- 如果user_name有NULL会少统计\n\n-- ✅ 正确写法\nSELECT COUNT(DISTINCT user_id) FROM orders;  -- 用主键或非NULL字段`
        },
        {
          emoji: '🚫',
          title: '错误3：NOT IN遇到NULL陷阱',
          desc: 'NOT IN子查询返回NULL会导致整个结果为空',
          detail: '**错误原因**：NULL的三值逻辑（TRUE/FALSE/UNKNOWN）\\n**解决方案**：用NOT EXISTS或IS NOT NULL过滤\\n**出现频率**：⭐⭐⭐',
          code: `-- 示例数据\nCREATE TABLE orders (id INT, user_id INT);\nINSERT INTO orders VALUES (1, 1), (2, 2), (3, NULL);\n\n-- ❌ 错误：NOT IN遇到NULL返回空结果\nSELECT * FROM users\nWHERE id NOT IN (SELECT user_id FROM orders);  -- 结果：空（因为有NULL）\n\n-- ✅ 解决方案1：过滤NULL\nSELECT * FROM users\nWHERE id NOT IN (SELECT user_id FROM orders WHERE user_id IS NOT NULL);\n\n-- ✅ 解决方案2：用NOT EXISTS（推荐）\nSELECT * FROM users u\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.user_id = u.id\n);`
        }
      ]
    },
    {
      id: 'scenario-map',
      title: 'PART 18 业务场景→SQL速查表',
      subtitle: '按业务场景快速查找SQL模板',
      items: [
        {
          emoji: '👤',
          title: '用户分析场景',
          desc: 'DAU/MAU、新增用户、活跃用户、流失用户',
          detail: '**适用场景**：日报周报、用户运营、产品分析\\n**核心指标**：DAU、MAU、新增、留存、流失\\n**常用技巧**：DISTINCT去重、时间窗口、窗口函数',
          code: `-- 1. DAU（日活跃用户数）\nSELECT DATE(action_time) AS date, COUNT(DISTINCT user_id) AS dau\nFROM user_actions\nWHERE DATE(action_time) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)\nGROUP BY date;\n\n-- 2. 新增用户（首次行为的用户）\nWITH first_action AS (\n  SELECT user_id, MIN(DATE(action_time)) AS first_date\n  FROM user_actions GROUP BY user_id\n)\nSELECT first_date, COUNT(*) AS new_users\nFROM first_action GROUP BY first_date;\n\n-- 3. 流失用户（30天未活跃）\nSELECT user_id, MAX(DATE(action_time)) AS last_active\nFROM user_actions\nGROUP BY user_id\nHAVING DATEDIFF(CURDATE(), MAX(action_time)) > 30;`
        },
        {
          emoji: '💳',
          title: '交易分析场景',
          desc: 'GMV、客单价、复购率、支付转化',
          detail: '**适用场景**：财务报表、业务复盘、增长分析\\n**核心指标**：GMV、订单数、客单价、转化率\\n**常用技巧**：SUM聚合、CASE WHEN分类、同比环比',
          code: `-- 1. GMV、订单数、客单价\nSELECT \n  DATE(order_date) AS date,\n  SUM(amount) AS gmv,\n  COUNT(*) AS order_count,\n  AVG(amount) AS avg_order_value\nFROM orders\nWHERE order_date >= '2024-01-01'\nGROUP BY date;\n\n-- 2. 支付转化率（下单→支付）\nWITH order_funnel AS (\n  SELECT \n    DATE(created_at) AS date,\n    COUNT(*) AS created_orders,\n    COUNT(CASE WHEN status = 'paid' THEN 1 END) AS paid_orders\n  FROM orders\n  GROUP BY date\n)\nSELECT \n  date,\n  paid_orders * 100.0 / created_orders AS payment_rate\nFROM order_funnel;`
        },
        {
          emoji: '📊',
          title: '运营分析场景',
          desc: '渠道效果、活动ROI、内容分析',
          detail: '**适用场景**：营销复盘、渠道优化、活动评估\\n**核心指标**：转化率、ROI、CPA、CAC\\n**常用技巧**：GROUP BY分组、JOIN关联、占比计算',
          code: `-- 1. 渠道效果对比\nSELECT \n  channel,\n  COUNT(DISTINCT user_id) AS uv,\n  COUNT(*) AS clicks,\n  COUNT(CASE WHEN converted = 1 THEN 1 END) AS conversions,\n  COUNT(CASE WHEN converted = 1 THEN 1 END) * 100.0 / COUNT(*) AS cvr\nFROM channel_data\nGROUP BY channel\nORDER BY conversions DESC;\n\n-- 2. 活动ROI分析\nSELECT \n  campaign_id,\n  SUM(cost) AS total_cost,\n  SUM(revenue) AS total_revenue,\n  (SUM(revenue) - SUM(cost)) * 100.0 / SUM(cost) AS roi\nFROM campaigns\nGROUP BY campaign_id;`
        }
      ]
    },
    {
      id: 'data-warehouse',
      title: 'PART 19 数据仓库基础',
      subtitle: '数仓分层、拉链表、增量ETL',
      items: [
        {
          emoji: '🏢',
          title: '四层架构（ODS→DWD→DWS→ADS）☆',
          desc: 'ODS原始层、DWD明细层、DWS汇总层、ADS应用层',
          detail: '**典型业务场景**：企业级数据仓库建设\\n**易踩坑点**：层次不清、过度设计\\n**可继续深挖**：维度建模、数据血缘',
          code: `-- ODS层（原始数据）\nCREATE TABLE ods_orders (\n  order_id BIGINT,\n  user_id BIGINT,\n  amount DECIMAL(10,2),\n  created_at DATETIME,\n  etl_date DATE  -- 数据日期\n) COMMENT 'ODS订单表';\n\n-- DWD层（明细数据，清洗后）\nCREATE TABLE dwd_orders (\n  order_id BIGINT PRIMARY KEY,\n  user_id BIGINT,\n  product_id BIGINT,\n  amount DECIMAL(10,2),\n  status TINYINT,\n  order_date DATE,\n  etl_date DATE\n) COMMENT 'DWD订单明细表';\n\n-- DWS层（汇总数据）\nCREATE TABLE dws_user_order_1d (\n  user_id BIGINT,\n  stat_date DATE,\n  order_count INT,\n  total_amount DECIMAL(10,2),\n  PRIMARY KEY (user_id, stat_date)\n) COMMENT 'DWS用户订单日汇总';\n\n-- ADS层（应用数据）\nCREATE TABLE ads_user_portrait (\n  user_id BIGINT PRIMARY KEY,\n  user_level VARCHAR(20),\n  total_orders INT,\n  total_amount DECIMAL(10,2),\n  last_order_date DATE\n) COMMENT 'ADS用户画像表';`
        },
        {
          emoji: '🔗',
          title: '拉链表（SCD Type 2）☆',
          desc: '保留历史变化记录，实现时间旅行查询',
          detail: '**典型业务场景**：用户等级变化追踪、商品价格历史\\n**易踩坑点**：更新逻辑复杂、查询需加时间条件\\n**可继续深挖**：全量拉链、增量拉链',
          code: `-- 拉链表结构\nCREATE TABLE dim_user_zip (\n  user_id BIGINT,\n  user_name VARCHAR(50),\n  level VARCHAR(20),\n  start_date DATE,      -- 生效日期\n  end_date DATE,        -- 失效日期（9999-12-31表示当前）\n  is_current BOOLEAN,   -- 是否当前记录\n  PRIMARY KEY (user_id, start_date)\n) COMMENT '用户拉链表';\n\n-- 初始化（从当前表导入）\nINSERT INTO dim_user_zip\nSELECT user_id, user_name, level, CURDATE(), '9999-12-31', 1\nFROM dim_user;\n\n-- 拉链表更新（用户等级变化）\n-- Step1：关闭旧记录\nUPDATE dim_user_zip \nSET end_date = '2024-10-03', is_current = 0\nWHERE user_id = 12345 AND is_current = 1;\n\n-- Step2：插入新记录\nINSERT INTO dim_user_zip VALUES\n(12345, 'Alice', 'VIP', '2024-10-04', '9999-12-31', 1);\n\n-- 查询某时间点的用户信息（时间旅行）\nSELECT * FROM dim_user_zip\nWHERE '2024-09-01' BETWEEN start_date AND end_date;`
        }
      ]
    },
    {
      id: 'data-quality',
      title: 'PART 20 数据质量检查（DQ）',
      subtitle: '5大数据质量维度检查模板',
      items: [
        {
          emoji: '✅',
          title: '完整性检查',
          desc: '检查NULL值、缺失率、必填字段',
          detail: '**典型业务场景**：数据接入验收、ETL质量监控\\n**易踩坑点**：业务NULL vs 技术NULL\\n**可继续深挖**：字段级/行级完整性',
          code: `-- 1. 字段缺失率检查\nSELECT \n  'user_id' AS field_name,\n  COUNT(*) AS total_rows,\n  COUNT(user_id) AS non_null_rows,\n  COUNT(*) - COUNT(user_id) AS null_rows,\n  ROUND((COUNT(*) - COUNT(user_id)) * 100.0 / COUNT(*), 2) AS null_rate\nFROM orders\nUNION ALL\nSELECT 'phone', COUNT(*), COUNT(phone), COUNT(*) - COUNT(phone), \n       ROUND((COUNT(*) - COUNT(phone)) * 100.0 / COUNT(*), 2)\nFROM orders;\n\n-- 2. 必填字段检查\nSELECT COUNT(*) AS invalid_rows\nFROM orders\nWHERE user_id IS NULL OR amount IS NULL OR order_date IS NULL;`
        },
        {
          emoji: '🔄',
          title: '一致性检查',
          desc: '主外键一致性、枚举值合法性、逻辑一致性',
          detail: '**典型业务场景**：关联表数据校验、状态机检查\\n**易踩坑点**：软删除数据、历史遗留脏数据\\n**可继续深挖**：跨表一致性、时间一致性',
          code: `-- 1. 主外键一致性（孤儿记录检查）\nSELECT o.order_id, o.user_id\nFROM orders o\nLEFT JOIN users u ON o.user_id = u.id\nWHERE u.id IS NULL;  -- 订单表中存在但用户表中不存在的user_id\n\n-- 2. 枚举值合法性\nSELECT DISTINCT status\nFROM orders\nWHERE status NOT IN (1, 2, 3, 4, 5);  -- 检查非法状态值\n\n-- 3. 逻辑一致性（退款金额不能大于订单金额）\nSELECT order_id, amount, refund_amount\nFROM orders\nWHERE refund_amount > amount;`
        },
        {
          emoji: '🎯',
          title: '准确性检查',
          desc: '数值范围、格式校验、重复数据',
          detail: '**典型业务场景**：异常值检测、数据清洗\\n**易踩坑点**：边界值判断、浮点精度\\n**可继续深挖**：统计分布检查、3σ原则',
          code: `-- 1. 数值范围检查\nSELECT COUNT(*) AS invalid_rows\nFROM orders\nWHERE amount < 0 OR amount > 1000000;  -- 金额异常\n\n-- 2. 格式校验（手机号）\nSELECT user_id, phone\nFROM users\nWHERE phone NOT REGEXP '^1[3-9][0-9]{9}$';  -- 非法手机号\n\n-- 3. 唯一性检查（主键重复）\nSELECT user_id, COUNT(*) AS dup_count\nFROM users\nGROUP BY user_id\nHAVING COUNT(*) > 1;`
        }
      ]
    },
    {
      id: 'data-sampling',
      title: 'PART 21 数据采样技巧',
      subtitle: '6种采样方法，快速获取样本数据',
      items: [
        {
          emoji: '🎲',
          title: '简单随机采样 ☆',
          desc: '每行等概率被抽取，适合均匀分布数据',
          detail: '**典型业务场景**：A/B测试分组、数据探索\\n**易踩坑点**：RAND()性能差、不可复现\\n**可继续深挖**：固定种子采样、分层采样',
          code: `-- 方法1：RAND()随机采样（简单但性能差）\nSELECT * FROM orders\nORDER BY RAND()\nLIMIT 1000;\n\n-- 方法2：取模采样（性能好，但不够随机）\nSELECT * FROM orders\nWHERE id % 100 = 0  -- 1%采样率\nLIMIT 1000;\n\n-- 方法3：ROW_NUMBER随机采样（推荐）\nWITH numbered AS (\n  SELECT *, ROW_NUMBER() OVER (ORDER BY RAND()) AS rn\n  FROM orders\n)\nSELECT * FROM numbered WHERE rn <= 1000;`
        },
        {
          emoji: '📊',
          title: '分层采样（Stratified Sampling）',
          desc: '按类别比例采样，保证样本代表性',
          detail: '**典型业务场景**：不均衡数据采样、用户分群分析\\n**易踩坑点**：层内样本量过小、分层字段选择\\n**可继续深挖**：等比分层、等量分层',
          code: `-- 按城市分层采样（每个城市采样100条）\nWITH city_sample AS (\n  SELECT \n    *,\n    ROW_NUMBER() OVER (PARTITION BY city ORDER BY RAND()) AS rn\n  FROM users\n)\nSELECT * FROM city_sample WHERE rn <= 100;\n\n-- 按比例分层采样（每个城市采样10%）\nWITH city_rank AS (\n  SELECT \n    *,\n    ROW_NUMBER() OVER (PARTITION BY city ORDER BY RAND()) AS rn,\n    COUNT(*) OVER (PARTITION BY city) AS city_total\n  FROM users\n)\nSELECT * FROM city_rank\nWHERE rn <= city_total * 0.1;`
        },
        {
          emoji: '⏰',
          title: '时间窗口采样',
          desc: '按时间段采样，适合时间序列数据',
          detail: '**典型业务场景**：趋势分析、性能测试数据准备\\n**易踩坑点**：节假日数据偏差、时区问题\\n**可继续深挖**：滑动窗口、固定间隔采样',
          code: `-- 每天采样1000条\nWITH daily_sample AS (\n  SELECT \n    *,\n    ROW_NUMBER() OVER (PARTITION BY DATE(created_at) ORDER BY RAND()) AS rn\n  FROM orders\n)\nSELECT * FROM daily_sample WHERE rn <= 1000;\n\n-- 每小时采样100条\nWITH hourly_sample AS (\n  SELECT \n    *,\n    ROW_NUMBER() OVER (\n      PARTITION BY DATE(created_at), HOUR(created_at) \n      ORDER BY RAND()\n    ) AS rn\n  FROM orders\n)\nSELECT * FROM hourly_sample WHERE rn <= 100;`
        }
      ]
    }
  ];

  return (
    <div className={isDark ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-gray-50'}>
      <Navigation />

      <div className={isDark ? 'bg-gray-800 border-gray-700 border-b sticky top-0 z-10' : 'bg-white border-gray-200 border-b sticky top-0 z-10'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-2">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={isDark ? 'text-gray-100 font-medium' : 'text-gray-900 font-medium'}>SQL</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className={isDark ? 'sticky top-24 bg-gray-800/95 border-gray-700 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto' : 'sticky top-24 bg-white/95 border-gray-200 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto'}>
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                {getIcon('📖', 'w-6 h-6 text-[#19bcc8]')}
                <span className={isDark ? 'text-gray-100' : 'text-gray-800'}>目录导航</span>
              </h3>
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const colorMap = {
                    purple: 'border-purple-500 bg-purple-500/10',
                    blue: 'border-blue-500 bg-blue-500/10',
                    green: 'border-green-500 bg-green-500/10',
                    yellow: 'border-yellow-500 bg-yellow-500/10',
                    red: 'border-red-500 bg-red-500/10',
                    pink: 'border-pink-500 bg-pink-500/10',
                    indigo: 'border-indigo-500 bg-indigo-500/10',
                    orange: 'border-orange-500 bg-orange-500/10',
                    teal: 'border-teal-500 bg-teal-500/10',
                    cyan: 'border-cyan-500 bg-cyan-500/10',
                    fuchsia: 'border-fuchsia-500 bg-fuchsia-500/10',
                    lime: 'border-lime-500 bg-lime-500/10',
                    rose: 'border-rose-500 bg-rose-500/10',
                    emerald: 'border-emerald-500 bg-emerald-500/10',
                    violet: 'border-violet-500 bg-violet-500/10',
                    sky: 'border-sky-500 bg-sky-500/10',
                    amber: 'border-amber-500 bg-amber-500/10'
                  };
                  const color = colorMap[item.color as keyof typeof colorMap] || 'border-gray-500 bg-gray-500/10';
                  
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
                      {getIcon(item.icon, 'w-5 h-5 text-[#19bcc8]')}
                      <span className={'text-sm font-medium ' + (isActive ? 'text-[#19bcc8]' : (isDark ? 'text-gray-200 hover:text-[#19bcc8]' : 'text-gray-700'))}>
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-[#19bcc8] shadow-lg">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <h1 className={'text-5xl font-black ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                  SQL
                </h1>
              </div>
              <p className={'text-lg ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>
                数据分析师必备SQL完整知识体系
              </p>
          </div>

            <section id="intro" className="mb-12 scroll-mt-24">
              <div className={'mt-6 rounded-xl p-6 border-2 ' + (isDark ? 'bg-gray-800 border-[#19bcc8]' : 'bg-[#19bcc8]/5 border-[#19bcc8]/30')}>
                <h3 className={'text-xl font-bold mb-4 flex items-center gap-2 ' + (isDark ? 'text-[#19bcc8]' : 'text-[#19bcc8]')}>
                  {getIcon('📚', 'w-6 h-6')}
                  本体系特点
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={'p-4 rounded-lg border-2 ' + (isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')}>
                    <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-lg bg-[#19bcc8]/10">
                      {getIcon('🎯', 'w-6 h-6 text-[#19bcc8]')}
                    </div>
                    <div className={'font-semibold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>实战导向</div>
                    <div className={'text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-600')}>
                      基于MySQL 8.0官方文档、实际业务场景与高频面试考点
                    </div>
                  </div>
                  <div className={'p-4 rounded-lg border-2 ' + (isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')}>
                    <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-lg bg-[#19bcc8]/10">
                      {getIcon('🚀', 'w-6 h-6 text-[#19bcc8]')}
                        </div>
                    <div className={'font-semibold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>体系完整</div>
                    <div className={'text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-600')}>
                      覆盖95%企业数据分析场景，☆标注面试/实战最高频内容
                  </div>
                </div>
                  <div className={'p-4 rounded-lg border-2 ' + (isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200')}>
                    <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-lg bg-[#19bcc8]/10">
                      {getIcon('📚', 'w-6 h-6 text-[#19bcc8]')}
                    </div>
                    <div className={'font-semibold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>四维深挖</div>
                    <div className={'text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-600')}>
                      必须掌握深度 ➜ 典型业务场景 ➜ 易踩坑点 ➜ 可继续深挖
            </div>
          </div>
        </div>
      </div>
            </section>

            <div className="space-y-32">
              {parts.map((part) => (
                <section key={part.id} id={part.id} className="scroll-mt-24">
                  <div className={'rounded-xl p-6 shadow-sm border mb-10 ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-1 h-12 bg-[#19bcc8] rounded-full"></div>
                      <h2 className={'text-3xl font-extrabold ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>{part.title}</h2>
                    </div>
                    <p className={'text-base ml-5 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>{part.subtitle}</p>
                  </div>


                  <div className="grid grid-cols-1 gap-8">
                    {part.items.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className={'p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ' + (isDark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400')}
                      >
                        <div className="flex items-start gap-4">
                          <div className={'flex-shrink-0 p-2 rounded-lg ' + (isDark ? 'bg-[#19bcc8]/10' : 'bg-[#19bcc8]/10')}>
                            {getIcon(item.emoji, 'w-6 h-6 text-[#19bcc8]')}
    </div>

                          <div className="flex-1 min-w-0">
                            <h3 className={'text-lg font-bold mb-2 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                              {item.title}
                            </h3>
                            <p className={'text-sm mb-3 ' + (isDark ? 'text-gray-300' : 'text-gray-700')}>
                              {item.desc}
                            </p>
                            {item.detail && (
                              <div className={'text-sm pl-4 border-l-2 mb-4 ' + (isDark ? 'text-gray-400 border-gray-600' : 'text-gray-600 border-gray-300')}>
                                {item.detail.split('\\n').map((line: string, i: number) => (
                                  <p key={i} className={i > 0 ? 'mt-1' : ''}>
                                    {line.split('**').map((part: string, j: number) =>
                                      j % 2 === 1 ? (
                                        <strong key={j} className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                                          {part}
                                        </strong>
                                      ) : (
                                        part
                                      )
                                    )}
                                  </p>
                                ))}
                              </div>
                            )}
                            {item.code && (
                              <pre className={'p-5 rounded-xl border-2 border-green-600 bg-gray-950 overflow-x-auto shadow-lg ' + (isDark ? '' : '')}>
                                <code className="text-sm text-green-400 leading-relaxed">{item.code}</code>
                              </pre>
                            )}
                          </div>
                  </div>
                </div>
              ))}
            </div>


                  <div className={'mt-12 mb-20 border-t-2 ' + (isDark ? 'border-gray-700' : 'border-gray-200')}></div>
                </section>
              ))}
          </div>

          </main>
        </div>


        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={
              'fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ' +
              (isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white')
            }
            aria-label="返回顶部"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>

  );
}

