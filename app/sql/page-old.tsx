"use client"

import React from "react"
import { Navigation } from "@/components/navigation"
import { Home, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function SQLPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = React.useState<string>("")
  const [showBackToTop, setShowBackToTop] = React.useState(false)

  // 监听滚动，显示/隐藏返回顶部按钮
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 返回顶部函数
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  React.useEffect(() => {
    const sections = ['intro'];
    
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
    { id: 'intro', icon: '🎯', label: 'SQL知识体系', color: 'purple' }
  ];

  const parts = [] as any[];  // 临时空数组测试
  const partsOld = [
    {
      id: 'env',
      num: 1,
      title: "基础环境层",
      subtitle: "30 min 可搞定，却决定后续 50% 的报错",
      color: "from-blue-500 to-cyan-600",
      darkColor: "from-blue-900 to-cyan-900",
      items: [
        { 
          emoji: "🔢", 
          title: "版本选择", 
          desc: "5.7仍占企业60%，但8.0的CTE/窗口函数/JSON可让分析代码量−40%",
          detail: "新人建议直接8.0，生产环境再用5.7向下兼容即可",
          code: `-- 查看MySQL版本
SELECT VERSION();

-- 查看是否支持窗口函数（8.0+）
SHOW VARIABLES LIKE 'version';

-- 检查字符集支持
SHOW CHARACTER SET;`
        },
        { 
          emoji: "🌐", 
          title: "字符集与排序规则 ☆", 
          desc: "必须 utf8mb4 + utf8mb4_0900_ai_ci",
          detail: "gbk导致LIKE大小写敏感、emoji写入失败",
          code: `-- 查看当前数据库字符集
SHOW VARIABLES LIKE 'character%';

-- 创建数据库时指定字符集
CREATE DATABASE analytics 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_0900_ai_ci;

-- 修改现有表的字符集
ALTER TABLE users 
  CONVERT TO CHARACTER SET utf8mb4 
  COLLATE utf8mb4_0900_ai_ci;`
        },
        { 
          emoji: "⚙️", 
          title: "安装参数", 
          desc: "--sql-mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO",
          detail: "把警告变报错，提前暴露脏数据",
          code: `-- 查看当前SQL模式
SELECT @@sql_mode;

-- 临时设置严格模式（当前会话）
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_DATE';

-- 永久设置（需修改my.cnf或my.ini）
[mysqld]
sql_mode=STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION`
        },
        { 
          emoji: "🔐", 
          title: "三权限模型", 
          desc: "user → db → table，分析师只给SELECT + SHOW VIEW",
          detail: "防止误删，字段级权限控制",
          code: `-- 创建只读分析师账号
CREATE USER 'analyst'@'%' IDENTIFIED BY 'secure_password';

-- 授予数据库级SELECT权限
GRANT SELECT ON analytics.* TO 'analyst'@'%';

-- 授予特定表的查询权限
GRANT SELECT ON analytics.orders TO 'analyst'@'%';

-- 查看用户权限
SHOW GRANTS FOR 'analyst'@'%';

-- 撤销权限
REVOKE SELECT ON analytics.sensitive_table FROM 'analyst'@'%';`
        },
        { 
          emoji: "💻", 
          title: "客户端", 
          desc: "CLI必须会：--safe-updates、--pager、--vertical",
          detail: "GUI推荐DBeaver（免费）+ MySQL Workbench（ER图）",
          code: `-- 安全模式登录（防止误删全表）
mysql -u root -p --safe-updates

-- 分页显示长结果
mysql -u root -p --pager='less -S'

-- 垂直显示结果（适合宽表）
SELECT * FROM users LIMIT 1\\G

-- 导出查询结果到CSV
mysql -u root -p -e "SELECT * FROM orders" > orders.csv

-- 执行SQL脚本
mysql -u root -p analytics < init_schema.sql`
        }
      ]
    },
    {
      id: 'ddl',
      num: 2,
      title: "数据定义层 DDL",
      subtitle: "分析师不建模，但必须读得懂建模",
      color: "from-green-500 to-emerald-600",
      darkColor: "from-green-900 to-emerald-900",
      items: [
        { 
          emoji: "🔤", 
          title: "五大基础类型深度对比", 
          desc: "INT(1)≠只能存1位；DECIMAL(10,2)占5 Byte比FLOAT准且省",
          detail: "DATE与DATETIME 6 vs 8 Byte；VARCHAR(255)是InnoDB页分裂临界点；TEXT/BLOB无默认值且触发磁盘临时表",
          code: `-- 数值类型对比
CREATE TABLE type_demo (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- 8 Byte，推荐
  age TINYINT UNSIGNED,           -- 1 Byte，0~255
  price DECIMAL(10,2),            -- 精确金额，5 Byte
  score FLOAT,                    -- 4 Byte，有精度损失
  amount DOUBLE                   -- 8 Byte，科学计算
);

-- 字符串类型对比
CREATE TABLE string_demo (
  username VARCHAR(50),           -- 变长，最多50字符
  email VARCHAR(255),             -- InnoDB页分裂临界点
  description TEXT,               -- 超过255用TEXT，无默认值
  avatar BLOB                     -- 二进制，不建议存DB
);

-- 日期类型对比
CREATE TABLE date_demo (
  birthday DATE,                  -- 3 Byte，'1000-01-01' ~ '9999-12-31'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 8 Byte
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- 4 Byte，到2038年
);`
        },
        { 
          emoji: "🔑", 
          title: "主键选型 ☆", 
          desc: "业务主键（身份证、手机号）必挂唯一索引",
          detail: "但主键仍用BIGINT UNSIGNED AUTO_INCREMENT，减少二级索引回表",
          code: `-- ❌ 不推荐：业务字段作主键
CREATE TABLE users_bad (
  id_card CHAR(18) PRIMARY KEY,
  name VARCHAR(50)
);

-- ✅ 推荐：自增主键 + 业务字段唯一索引
CREATE TABLE users_good (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_card CHAR(18) NOT NULL,
  phone CHAR(11) NOT NULL,
  name VARCHAR(50),
  UNIQUE KEY uk_id_card (id_card),
  UNIQUE KEY uk_phone (phone)
);

-- 查看表结构
SHOW CREATE TABLE users_good;

-- 查看索引
SHOW INDEX FROM users_good;`
        },
        { 
          emoji: "📐", 
          title: "范式与反范式的成本", 
          desc: "三范式减少30%存储，但可能把一次查询拆成5张表JOIN",
          detail: "宽表+冗余字段可把报表从3s→0.3s，却带来15%更新异常风险",
          code: `-- ❌ 三范式：节省存储，但查询慢
CREATE TABLE orders (
  order_id BIGINT PRIMARY KEY,
  user_id BIGINT,
  product_id BIGINT,
  created_at DATETIME
);

-- 查询需要多次JOIN
SELECT o.order_id, u.name, p.title, o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;

-- ✅ 反范式：冗余字段，查询快
CREATE TABLE orders_wide (
  order_id BIGINT PRIMARY KEY,
  user_id BIGINT,
  user_name VARCHAR(50),       -- 冗余
  product_id BIGINT,
  product_title VARCHAR(200),  -- 冗余
  created_at DATETIME
);

-- 一张表搞定
SELECT order_id, user_name, product_title, created_at
FROM orders_wide;`
        },
        { 
          emoji: "📦", 
          title: "分区表", 
          desc: "RANGE/LIST分区对时间序报表可提速10×",
          detail: "⚠️ NULL分区会扫全表；分析师必须会看EXPLAIN PARTITIONS",
          code: `-- 按月分区（时间序列数据）
CREATE TABLE sales (
  id BIGINT,
  sale_date DATE NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (id, sale_date)
) PARTITION BY RANGE (YEAR(sale_date) * 100 + MONTH(sale_date)) (
  PARTITION p202401 VALUES LESS THAN (202402),
  PARTITION p202402 VALUES LESS THAN (202403),
  PARTITION p202403 VALUES LESS THAN (202404),
  PARTITION pmax VALUES LESS THAN MAXVALUE
);

-- 查看分区执行计划
EXPLAIN PARTITIONS
SELECT * FROM sales 
WHERE sale_date BETWEEN '2024-02-01' AND '2024-02-29';

-- 删除旧分区（快速清理历史数据）
ALTER TABLE sales DROP PARTITION p202401;`
        }
      ]
    },
    {
      id: 'dml',
      num: 3,
      title: "数据操作层 DML",
      subtitle: "80% 工作量都在这一层",
      color: "from-yellow-500 to-orange-600",
      darkColor: "from-yellow-900 to-orange-900",
      items: [
        { 
          emoji: "✏️", 
          title: "增删改", 
          desc: "INSERT...ON DUPLICATE KEY UPDATE 实现 存在即更新 语义",
          detail: "⚠️ REPLACE INTO会主键变化触发删除+插入，自增ID被浪费",
          code: `-- 普通插入
INSERT INTO users (name, email) VALUES ('张三', 'zhang@example.com');

-- 批量插入（推荐）
INSERT INTO users (name, email) VALUES
  ('张三', 'zhang@example.com'),
  ('李四', 'li@example.com'),
  ('王五', 'wang@example.com');

-- ✅ 存在即更新（推荐）
INSERT INTO daily_stats (date, uv, pv) VALUES ('2024-10-03', 1000, 5000)
ON DUPLICATE KEY UPDATE uv = VALUES(uv), pv = VALUES(pv);

-- ❌ REPLACE INTO（慎用，会重置自增ID）
REPLACE INTO daily_stats (date, uv, pv) VALUES ('2024-10-03', 1000, 5000);

-- 更新
UPDATE users SET status = 'active' WHERE id = 123;

-- 删除
DELETE FROM users WHERE created_at < '2020-01-01';`
        },
        { 
          emoji: "🔄", 
          title: "事务四大特性及隔离级别", 
          desc: "读未提交出现 脏读 导致 COUNT 不准",
          detail: "可重复读 + MVCC 保证一致性读，但会读 快照 非最新数据，财务对账需用 READ COMMITTED",
          code: `-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 开启事务
START TRANSACTION;

-- 业务逻辑
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

-- 提交
COMMIT;

-- 或回滚
ROLLBACK;

-- 设置隔离级别（会话级）
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 死锁示例（两个事务互相等待）
-- 事务1：UPDATE users SET name='A' WHERE id=1; UPDATE users SET name='B' WHERE id=2;
-- 事务2：UPDATE users SET name='C' WHERE id=2; UPDATE users SET name='D' WHERE id=1;`
        },
        { 
          emoji: "📥", 
          title: "批量导入 ☆", 
          desc: "LOAD DATA LOCAL INFILE比Workbench快50×",
          detail: "记得加SET autocommit=0; ... COMMIT;把10万行一次性刷盘",
          code: `-- 批量导入CSV（最快）
LOAD DATA LOCAL INFILE '/path/to/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n'
IGNORE 1 ROWS
(name, email, @created_at)
SET created_at = STR_TO_DATE(@created_at, '%Y-%m-%d %H:%i:%s');

-- 关闭自动提交，手动批量提交
SET autocommit = 0;
INSERT INTO users (name, email) VALUES (...);  -- 重复10万次
COMMIT;
SET autocommit = 1;

-- 清空表（快速）
TRUNCATE TABLE temp_table;

-- 删除表
DROP TABLE IF EXISTS old_table;`
        },
        { 
          emoji: "🔤", 
          title: "编码踩坑", 
          desc: "CSV GBK→表UTF8MB4时，0xC4E3会被截断，出现乱码",
          detail: "iconv -f GBK -t UTF-8 file.csv -o file_utf8.csv提前转",
          code: `-- 检查表字符集
SHOW CREATE TABLE users;

-- 修改表字符集
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 修改单个字段字符集
ALTER TABLE users MODIFY COLUMN name VARCHAR(50) CHARACTER SET utf8mb4;

-- 导入前转换编码（Linux/Mac）
iconv -f GBK -t UTF-8 data_gbk.csv -o data_utf8.csv

-- Windows PowerShell转换
Get-Content .\\data_gbk.csv -Encoding Default | Set-Content .\\data_utf8.csv -Encoding UTF8`
        }
      ]
    },
    {
      id: 'dql',
      num: 4,
      title: "查询核心层 DQL",
      subtitle: "整个知识体系的 心脏",
      color: "from-red-500 to-pink-600",
      darkColor: "from-red-900 to-pink-900",
      items: [
        { 
          emoji: "🔢", 
          title: "执行顺序（必背）", 
          desc: "FROM→ON→JOIN→WHERE→GROUP BY→HAVING→SELECT→ORDER BY→LIMIT",
          detail: "记住就能解释 WHY：WHERE 里不能用 SELECT 别名 这一经典错误",
          code: `-- ❌ 错误：WHERE里不能用SELECT别名
SELECT name, age * 2 AS double_age
FROM users
WHERE double_age > 30;  -- 报错：Unknown column 'double_age'

-- ✅ 正确：用原始表达式
SELECT name, age * 2 AS double_age
FROM users
WHERE age * 2 > 30;

-- ✅ 或者用子查询/CTE
WITH t AS (
  SELECT name, age * 2 AS double_age FROM users
)
SELECT * FROM t WHERE double_age > 30;`
        },
        { 
          emoji: "🔍", 
          title: "单表过滤 ☆", 
          desc: "字符串必须单引号；日期推荐DATE(pay_time)='2025-10-03'",
          detail: "会命中索引范围，而函数索引MySQL 8.0才支持",
          code: `-- 基础过滤
SELECT * FROM orders WHERE status = 'paid' AND amount > 100;

-- 日期过滤（推荐）
SELECT * FROM orders WHERE DATE(created_at) = '2024-10-03';

-- 多条件
SELECT * FROM users 
WHERE age BETWEEN 18 AND 35 
  AND city IN ('北京', '上海', '深圳')
  AND status = 'active';

-- NULL判断
SELECT * FROM users WHERE email IS NOT NULL;
SELECT * FROM users WHERE deleted_at IS NULL;`
        },
        { 
          emoji: "📊", 
          title: "范围与集合", 
          desc: "BETWEEN是闭区间；IN (1,2,3)元素>200会退化成全表",
          detail: "⚠️ NOT IN里有NULL直接返回空集",
          code: `-- BETWEEN（闭区间，包含边界）
SELECT * FROM orders WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';

-- IN（推荐元素<200）
SELECT * FROM products WHERE category_id IN (1, 3, 5, 7);

-- ⚠️ NOT IN遇到NULL返回空
SELECT * FROM users WHERE id NOT IN (1, 2, NULL);  -- 返回空集！

-- ✅ 正确：先过滤NULL
SELECT * FROM users WHERE id NOT IN (SELECT id FROM blacklist WHERE id IS NOT NULL);`
        },
        { 
          emoji: "🔎", 
          title: "模糊查询", 
          desc: "LIKE '%开发'无法用到索引，全文检索用InnoDB Full-Text或ES",
          detail: "前缀LIKE '开发%'可享range优化",
          code: `-- ✅ 前缀匹配（可用索引）
SELECT * FROM users WHERE name LIKE '张%';

-- ❌ 后缀/中缀匹配（全表扫描）
SELECT * FROM users WHERE name LIKE '%三';
SELECT * FROM users WHERE name LIKE '%经理%';

-- 全文检索（MySQL 5.7+）
CREATE FULLTEXT INDEX ft_content ON articles(title, content);
SELECT * FROM articles WHERE MATCH(title, content) AGAINST('数据分析' IN NATURAL LANGUAGE MODE);

-- REGEXP正则（慢）
SELECT * FROM users WHERE email REGEXP '^[a-z0-9]+@gmail\\\\.com$';`
        },
        { 
          emoji: "🎯", 
          title: "去重", 
          desc: "DISTINCT会隐式排序，大数据用GROUP BY效率相同但语义更直观",
          detail: "COUNT(DISTINCT a,b)内部会转GROUP BY，8.0已支持组合索引加速",
          code: `-- 单列去重
SELECT DISTINCT city FROM users;

-- 多列去重
SELECT DISTINCT city, age FROM users;

-- 聚合去重
SELECT COUNT(DISTINCT user_id) AS uv FROM page_views;

-- 多列聚合去重（8.0+）
SELECT COUNT(DISTINCT user_id, session_id) FROM events;

-- GROUP BY替代（语义更清晰）
SELECT city FROM users GROUP BY city;`
        },
        { 
          emoji: "📄", 
          title: "分页", 
          desc: "LIMIT 1000000,10先扫100万行",
          detail: "延迟游标（seek method）改写成WHERE id>上次最大值 LIMIT 10，毫秒级",
          code: `-- ❌ 深分页慢（扫描100万行）
SELECT * FROM orders ORDER BY id LIMIT 1000000, 10;

-- ✅ 延迟关联（推荐）
SELECT o.* FROM orders o
INNER JOIN (
  SELECT id FROM orders ORDER BY id LIMIT 1000000, 10
) t ON o.id = t.id;

-- ✅ 游标分页（最快）
SELECT * FROM orders 
WHERE id > 12345678  -- 上次最后一条的ID
ORDER BY id LIMIT 10;`
        },
        { 
          emoji: "📈", 
          title: "聚合与分组 ☆", 
          desc: "WITH ROLLUP可一次性得小计总计",
          detail: "GROUPING() 函数区分 NULL 是原始值还是汇总值",
          code: `-- 基础分组聚合
SELECT city, COUNT(*) AS cnt, AVG(age) AS avg_age
FROM users
GROUP BY city;

-- HAVING过滤（聚合后）
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
HAVING cnt > 100;

-- WITH ROLLUP（小计+总计）
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city WITH ROLLUP;

-- GROUPING()区分NULL
SELECT 
  CASE WHEN GROUPING(city) = 1 THEN '总计' ELSE city END AS city,
  COUNT(*) AS cnt
FROM users
GROUP BY city WITH ROLLUP;`
        },
        { 
          emoji: "🔗", 
          title: "子查询", 
          desc: "IN/EXISTS区别：外表大用EXISTS，小表用IN",
          detail: "相关子查询会循环N次，8.0的hash semi-join已自动优化",
          code: `-- 标量子查询（返回单值）
SELECT name, (SELECT AVG(salary) FROM employees) AS avg_salary FROM employees;

-- IN子查询（小表驱动）
SELECT * FROM users WHERE city_id IN (SELECT id FROM cities WHERE region = '华南');

-- EXISTS子查询（大表驱动）
SELECT * FROM users u WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'paid'
);

-- NOT EXISTS（找无订单用户）
SELECT * FROM users u WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);`
        },
        { 
          emoji: "🪟", 
          title: "窗口函数（8.0杀手特性）☆", 
          desc: "ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC)",
          detail: "秒算 城市内 TopN；无需再套变量或 JOIN 自表",
          code: `-- 排名（每个城市薪资Top3）
SELECT name, city, salary,
  ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS rn
FROM employees;

-- 过滤Top3
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn <= 3;

-- 累计求和
SELECT date, sales,
  SUM(sales) OVER (ORDER BY date) AS cumulative_sales
FROM daily_sales;

-- 同比（去年同月）
SELECT month, sales,
  LAG(sales, 12) OVER (ORDER BY month) AS last_year_sales
FROM monthly_sales;`
        },
        { 
          emoji: "📋", 
          title: "CTE公共表表达式", 
          desc: "WITH t AS (...)可链式调用，逻辑分层",
          detail: "替代过去 堆叠子查询 导致的缩进地狱",
          code: `-- 单层CTE
WITH active_users AS (
  SELECT * FROM users WHERE status = 'active'
)
SELECT city, COUNT(*) FROM active_users GROUP BY city;

-- 链式CTE
WITH 
  active_users AS (
    SELECT * FROM users WHERE status = 'active'
  ),
  high_value_users AS (
    SELECT * FROM active_users WHERE total_spent > 10000
  )
SELECT * FROM high_value_users;

-- 递归CTE（员工层级）
WITH RECURSIVE emp_tree AS (
  SELECT id, name, manager_id, 1 AS level FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, et.level + 1
  FROM employees e
  JOIN emp_tree et ON e.manager_id = et.id
)
SELECT * FROM emp_tree;`
        }
      ]
    },
    {
      id: 'join',
      num: 5,
      title: "多表关联层 JOIN",
      subtitle: "分析师最难啃的骨头",
      color: "from-purple-500 to-indigo-600",
      darkColor: "from-purple-900 to-indigo-900",
      items: [
        { 
          emoji: "🔗", 
          title: "算法内幕", 
          desc: "Nested Loop、Block Nested Loop、Hash Join（8.0.18仅支持等值）",
          detail: "小表驱动大表，内存够大可调join_buffer_size",
          code: `-- INNER JOIN（交集）
SELECT u.name, o.order_id, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN（左表全保留）
SELECT u.name, COALESCE(o.order_id, '无订单') AS order_info
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN（右表全保留）
SELECT u.name, o.order_id
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- 查看执行计划
EXPLAIN SELECT * FROM users u INNER JOIN orders o ON u.id = o.user_id;`
        },
        { 
          emoji: "📊", 
          title: "三大范式→JOIN口诀 ☆", 
          desc: "一对多：主表LEFT JOIN从表，从表主键仍唯一",
          detail: "多对多：中间表JOIN两边，注意中间表可以带业务属性（权重、创建时间）",
          code: `-- 一对多：用户→订单
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- 多对多：学生↔课程
SELECT s.name, c.title, sc.score
FROM students s
INNER JOIN student_courses sc ON s.id = sc.student_id
INNER JOIN courses c ON sc.course_id = c.id;

-- 三表JOIN
SELECT o.order_id, u.name, p.title
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id;`
        },
        { 
          emoji: "🎯", 
          title: "三种JOIN场景", 
          desc: "① 补齐维度：LEFT JOIN字典表，NULL用COALESCE填默认值",
          detail: "② 过滤数据：INNER JOIN 白名单表，比 IN 子查询易读；③ 找差异：LEFT JOIN + WHERE 从表.id IS NULL 实现 反选，比 NOT IN 更稳（不怕 NULL）",
          code: `-- ① 补齐维度（字典表）
SELECT o.*, COALESCE(d.status_name, '未知') AS status_name
FROM orders o
LEFT JOIN status_dict d ON o.status = d.status_code;

-- ② 过滤数据（白名单）
SELECT u.* FROM users u
INNER JOIN vip_list v ON u.id = v.user_id;

-- ③ 找差异（反选：从未下单的用户）
SELECT u.* FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;`
        },
        { 
          emoji: "🔄", 
          title: "自关联", 
          desc: "员工上下级、订单相邻状态，用两次表别名即可",
          detail: "层级深度≤3可用递归CTE，>3建议图数据库",
          code: `-- 自关联：员工及其经理
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- 递归CTE：完整组织架构
WITH RECURSIVE org AS (
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, org.level + 1
  FROM employees e
  JOIN org ON e.manager_id = org.id
)
SELECT * FROM org ORDER BY level, id;`
        },
        { 
          emoji: "⚠️", 
          title: "性能红线", 
          desc: "ON字段类型不一致会隐式CAST，索引失效",
          detail: "关联字段字符集/排序规则不同，MySQL会创建临时表+filesort",
          code: `-- ❌ 类型不一致（索引失效）
SELECT * FROM users u
JOIN orders o ON u.id = CAST(o.user_id AS CHAR);  -- 隐式转换

-- ✅ 确保类型一致
SELECT * FROM users u
JOIN orders o ON u.id = o.user_id;

-- 检查字段类型
SHOW COLUMNS FROM users LIKE 'id';
SHOW COLUMNS FROM orders LIKE 'user_id';

-- 查看JOIN性能
EXPLAIN FORMAT=JSON
SELECT * FROM users u JOIN orders o ON u.id = o.user_id;`
        }
      ]
    },
    {
      id: 'functions',
      num: 6,
      title: "函数与表达式层",
      subtitle: "让 数据清洗 在 SQL 里一次完成",
      color: "from-pink-500 to-rose-600",
      darkColor: "from-pink-900 to-rose-900",
      items: [
        { 
          emoji: "🔤", 
          title: "字符串 ☆", 
          desc: "SUBSTRING_INDEX('a,b,c',',',2)得'a,b'",
          detail: "regexp_replace() 8.0才支持，5.7用REPLACE+LIKE循环",
          code: `-- 字符串截取
SELECT SUBSTRING('Hello World', 1, 5);  -- 'Hello'
SELECT LEFT('Hello', 2);  -- 'He'
SELECT RIGHT('Hello', 2);  -- 'lo'

-- 分割字符串
SELECT SUBSTRING_INDEX('a,b,c', ',', 2);  -- 'a,b'
SELECT SUBSTRING_INDEX('a,b,c', ',', -1);  -- 'c'

-- 拼接
SELECT CONCAT('Hello', ' ', 'World');
SELECT CONCAT_WS(',', 'a', 'b', 'c');  -- 'a,b,c'

-- 替换
SELECT REPLACE('Hello World', 'World', 'MySQL');

-- 大小写
SELECT UPPER('hello'), LOWER('HELLO');

-- 去空格
SELECT TRIM('  hello  '), LTRIM('  left'), RTRIM('right  ');`
        },
        { 
          emoji: "📅", 
          title: "日期", 
          desc: "DATE_ADD、DATEDIFF、TIMESTAMPDIFF(SECOND,...)",
          detail: "推荐把 周、月、年 维度做成日历表，避免函数计算导致无法走索引",
          code: `-- 当前时间
SELECT NOW(), CURDATE(), CURTIME();

-- 日期加减
SELECT DATE_ADD('2024-10-03', INTERVAL 7 DAY);
SELECT DATE_SUB('2024-10-03', INTERVAL 1 MONTH);

-- 日期差值
SELECT DATEDIFF('2024-10-03', '2024-01-01');  -- 天数
SELECT TIMESTAMPDIFF(HOUR, '2024-10-03 08:00:00', '2024-10-03 18:00:00');  -- 小时

-- 提取日期部分
SELECT YEAR(NOW()), MONTH(NOW()), DAY(NOW());
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s');

-- 本周、本月
SELECT DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AS week_start;
SELECT DATE_FORMAT(CURDATE(), '%Y-%m-01') AS month_start;`
        },
        { 
          emoji: "🔄", 
          title: "类型转换", 
          desc: "CAST(expr AS SIGNED)比expr+0安全",
          detail: "隐式转换'123abc'→123会报警，严格模式直接报错",
          code: `-- 显式类型转换
SELECT CAST('123' AS SIGNED);
SELECT CAST('3.14' AS DECIMAL(10,2));
SELECT CAST('2024-10-03' AS DATE);

-- 数值转换
SELECT CONVERT('123', SIGNED INTEGER);

-- 安全转换（遇到非法值返回NULL）
SELECT CAST('abc' AS SIGNED);  -- 严格模式报错，否则返回0`
        },
        { 
          emoji: "🎯", 
          title: "条件函数", 
          desc: "CASE WHEN能嵌套在聚合里：SUM(CASE WHEN sex='女' THEN 1 ELSE 0 END)/COUNT(*)",
          detail: "IF()仅两层判断，可读性差",
          code: `-- CASE WHEN（推荐）
SELECT name, age,
  CASE 
    WHEN age < 18 THEN '未成年'
    WHEN age < 60 THEN '成年人'
    ELSE '老年人'
  END AS age_group
FROM users;

-- CASE在聚合中
SELECT 
  SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid_amount,
  SUM(CASE WHEN status = 'refund' THEN amount ELSE 0 END) AS refund_amount
FROM orders;

-- IF函数（简单判断）
SELECT name, IF(age >= 18, '成年', '未成年') AS is_adult FROM users;

-- COALESCE（返回第一个非NULL值）
SELECT name, COALESCE(phone, email, '无联系方式') AS contact FROM users;`
        },
        { 
          emoji: "📊", 
          title: "行列互换", 
          desc: "CASE + GROUP BY 实现 手工透视",
          detail: "8.0提供JSON_ARRAYAGG、JSON_OBJECTAGG可直接输出JSON给前端",
          code: `-- 行转列（透视表）
SELECT 
  city,
  SUM(CASE WHEN gender = '男' THEN 1 ELSE 0 END) AS male_count,
  SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS female_count
FROM users
GROUP BY city;

-- JSON聚合（8.0+）
SELECT city, JSON_ARRAYAGG(name) AS names
FROM users
GROUP BY city;

SELECT city, JSON_OBJECTAGG(name, age) AS user_info
FROM users
GROUP BY city;

-- GROUP_CONCAT（拼接）
SELECT city, GROUP_CONCAT(name SEPARATOR ', ') AS users
FROM users
GROUP BY city;`
        }
      ]
    },
    {
      id: 'optimization',
      num: 7,
      title: "性能优化层",
      subtitle: "把 3 min 的查询压到 300 ms",
      color: "from-orange-500 to-amber-600",
      darkColor: "from-orange-900 to-amber-900",
      items: [
        { 
          emoji: "📊", 
          title: "执行计划 ☆", 
          desc: "EXPLAIN FORMAT=JSON看cost",
          detail: "关注type=ALL（全表）、Using filesort、Using temporary",
          code: `-- 查看执行计划
EXPLAIN SELECT * FROM orders WHERE user_id = 123;

-- 详细执行计划（JSON格式）
EXPLAIN FORMAT=JSON SELECT * FROM orders WHERE user_id = 123;

-- 分析type字段
-- ALL: 全表扫描（最慢）
-- index: 索引扫描
-- range: 索引范围扫描
-- ref: 非唯一索引查找
-- eq_ref: 唯一索引查找
-- const: 主键/唯一索引常量查找（最快）

-- 关注Extra字段
-- Using filesort: 需要额外排序（慢）
-- Using temporary: 需要临时表（慢）
-- Using index: 覆盖索引（快）`
        },
        { 
          emoji: "🔍", 
          title: "索引策略", 
          desc: "联合索引(a,b,c)只能跳b不能跳a；范围列放最后",
          detail: "ORDER BY a DESC,b ASC无法完全用索引",
          code: `-- 创建索引
CREATE INDEX idx_user_status ON orders(user_id, status);

-- 联合索引最左前缀原则
-- ✅ 可用索引: WHERE user_id=1
-- ✅ 可用索引: WHERE user_id=1 AND status='paid'
-- ❌ 不可用: WHERE status='paid'

-- 范围列放最后
CREATE INDEX idx_age_city ON users(city, age);  -- 推荐
-- WHERE city='北京' AND age BETWEEN 18 AND 35  -- 都能用到

-- 查看索引
SHOW INDEX FROM orders;

-- 删除索引
DROP INDEX idx_old ON orders;`
        },
        { 
          emoji: "✅", 
          title: "覆盖索引", 
          desc: "二级索引叶子节点已含SELECT字段，无需回表",
          detail: "explain里出现Using index",
          code: `-- ❌ 需要回表（Extra: 无Using index）
CREATE INDEX idx_user ON orders(user_id);
SELECT user_id, order_id, amount FROM orders WHERE user_id = 123;

-- ✅ 覆盖索引（Extra: Using index）
CREATE INDEX idx_cover ON orders(user_id, order_id, amount);
SELECT user_id, order_id, amount FROM orders WHERE user_id = 123;

-- 验证
EXPLAIN SELECT user_id, order_id, amount FROM orders WHERE user_id = 123;
-- Extra字段显示 "Using index" 即为覆盖索引`
        },
        { 
          emoji: "❌", 
          title: "索引失效十大场景", 
          desc: "① 对列运算 ② 隐式转换 ③ OR两侧都有索引但优化器放弃 ④ LIKE '%xx' ⑤ <>或NOT IN",
          detail: "⑥ 函数索引8.0前不支持 ⑦ 多列排序方向混用 ⑧ 表统计信息过旧 ⑨ 小表全表更快 ⑩ 强制锁读SELECT...LOCK IN SHARE MODE"
        },
        { 
          emoji: "📈", 
          title: "直方图（8.0新特性）", 
          desc: "ANALYZE TABLE...UPDATE HISTOGRAM",
          detail: "可给非索引列建立数据分布地图，解决倾斜数据（90% 订单状态 = 已完成）走错索引"
        },
        { 
          emoji: "📄", 
          title: "大数据分页", 
          desc: "游标分页+延迟关联：先SELECT id FROM t WHERE...ORDER BY id LIMIT 10000,10",
          detail: "→再JOIN原表取行，把回表成本延后"
        },
        { 
          emoji: "⚡", 
          title: "并行执行（8.0.14）", 
          desc: "innodb_parallel_read_threads可加速COUNT(*)全表",
          detail: "分析场景可调4-8"
        },
        { 
          emoji: "💡", 
          title: "hints提示", 
          desc: "强制索引：SELECT * FROM t USE INDEX(idx_a) WHERE a=1",
          detail: "忽略索引：IGNORE INDEX(idx_b)"
        }
      ]
    },
    {
      id: 'window',
      num: 8,
      title: "统计与窗口层",
      subtitle: "Excel透视表 → SQL 一键实现 · 完整教程见 👉 窗口函数专题页",
      color: "from-teal-500 to-cyan-600",
      darkColor: "from-teal-900 to-cyan-900",
      entryLink: "/window-functions",
      items: [
        { 
          emoji: "🪟", 
          title: "窗口函数框架", 
          desc: "ROW_NUMBER、RANK、DENSE_RANK、PERCENT_RANK、CUME_DIST、NTILE",
          detail: "LAG/LEAD、FIRST_VALUE/LAST_VALUE",
          code: `-- 排名函数
SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,  -- 1,2,3,4
  RANK() OVER (ORDER BY salary DESC) AS rank,           -- 1,2,2,4
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank -- 1,2,2,3
FROM employees;

-- 分组排名（每个部门Top3）
SELECT * FROM (
  SELECT name, dept, salary,
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
) t WHERE rn <= 3;

-- 前后对比
SELECT month, sales,
  LAG(sales, 1) OVER (ORDER BY month) AS last_month,
  LEAD(sales, 1) OVER (ORDER BY month) AS next_month
FROM monthly_sales;`
        },
        { 
          emoji: "📈", 
          title: "累计计算", 
          desc: "SUM(sales) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
          detail: "得日累计销售额",
          code: `-- 累计求和
SELECT date, sales,
  SUM(sales) OVER (ORDER BY date) AS cumulative_sales
FROM daily_sales;

-- 移动平均（7日）
SELECT date, sales,
  AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS ma7
FROM daily_sales;

-- 累计占比
SELECT date, sales,
  SUM(sales) OVER (ORDER BY date) / SUM(sales) OVER () AS cumulative_pct
FROM daily_sales;`
        },
        { 
          emoji: "🔄", 
          title: "同期对比", 
          desc: "LAG(sales,12) OVER (PARTITION BY month ORDER BY year)",
          detail: "直接取去年同月数据",
          code: `-- 同比（去年同月）
SELECT month, sales,
  LAG(sales, 12) OVER (ORDER BY month) AS last_year,
  (sales - LAG(sales, 12) OVER (ORDER BY month)) / LAG(sales, 12) OVER (ORDER BY month) AS yoy
FROM monthly_sales;

-- 环比（上月）
SELECT month, sales,
  LAG(sales, 1) OVER (ORDER BY month) AS last_month,
  (sales - LAG(sales, 1) OVER (ORDER BY month)) / LAG(sales, 1) OVER (ORDER BY month) AS mom
FROM monthly_sales;`
        },
        { 
          emoji: "🎯", 
          title: "Top-N每组", 
          desc: "WITH t AS (SELECT *,ROW_NUMBER()OVER(PARTITION BY dept ORDER BY score DESC) rn FROM emp)",
          detail: "SELECT * FROM t WHERE rn<=3",
          code: `-- 每个部门薪资Top3
WITH ranked AS (
  SELECT name, dept, salary,
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn <= 3;

-- 每个城市年龄最大的用户
SELECT * FROM (
  SELECT name, city, age,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY age DESC) AS rn
  FROM users
) t WHERE rn = 1;`
        },
        { 
          emoji: "📊", 
          title: "占比/累计占比", 
          desc: "RATIO_TO_REPORT(sales) OVER (PARTITION BY region)一步出百分比",
          detail: "MySQL无此函数，可用sales/SUM(sales) OVER()等价",
          code: `-- 全局占比
SELECT city, sales,
  sales / SUM(sales) OVER () AS pct
FROM city_sales;

-- 分组占比（每个区域内占比）
SELECT region, city, sales,
  sales / SUM(sales) OVER (PARTITION BY region) AS pct_in_region
FROM city_sales;

-- 累计占比
SELECT city, sales,
  SUM(sales) OVER (ORDER BY sales DESC) / SUM(sales) OVER () AS cumulative_pct
FROM city_sales;`
        }
      ]
    },
    {
      id: 'timeseries',
      num: 9,
      title: "时间序列层",
      subtitle: "分析师最常用专题",
      color: "from-indigo-500 to-violet-600",
      darkColor: "from-indigo-900 to-violet-900",
      items: [
        { 
          emoji: "📅", 
          title: "日历表", 
          desc: "一次性生成10年日期维度（date,week,month,quarter,year,is_weekend,holiday）",
          detail: "所有报表直接JOIN，避免函数计算",
          code: `-- 生成日历表（2020-2030）
WITH RECURSIVE dates AS (
  SELECT '2020-01-01' AS date
  UNION ALL
  SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM dates WHERE date < '2030-12-31'
)
SELECT 
  date,
  YEAR(date) AS year,
  MONTH(date) AS month,
  DAY(date) AS day,
  QUARTER(date) AS quarter,
  WEEKDAY(date) AS weekday,
  IF(WEEKDAY(date) IN (5,6), 1, 0) AS is_weekend
FROM dates;

-- 使用日历表
SELECT c.date, COALESCE(SUM(o.amount), 0) AS gmv
FROM calendar c
LEFT JOIN orders o ON DATE(o.created_at) = c.date
WHERE c.date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY c.date;`
        },
        { 
          emoji: "🔗", 
          title: "连续区间", 
          desc: "用ROW_NUMBER()减日期得grp，再GROUP BY grp找最大/最小日期",
          detail: "可统计用户连续签到、设备连续在线",
          code: `-- 找连续签到区间
WITH t AS (
  SELECT user_id, login_date,
    DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) AS grp
  FROM user_logins
)
SELECT user_id, MIN(login_date) AS start_date, MAX(login_date) AS end_date,
  DATEDIFF(MAX(login_date), MIN(login_date)) + 1 AS consecutive_days
FROM t
GROUP BY user_id, grp
HAVING consecutive_days >= 7;  -- 连续7天以上`
        },
        { 
          emoji: "📊", 
          title: "同比环比", 
          desc: "统一封装VIEW：_yoy表用LAG(year_month,12)计算同比",
          detail: "_mom表用LAG(month,1)计算环比",
          code: `-- 同比环比视图
CREATE VIEW v_sales_yoy_mom AS
SELECT 
  DATE_FORMAT(date, '%Y-%m') AS month,
  SUM(amount) AS sales,
  LAG(SUM(amount), 1) OVER (ORDER BY DATE_FORMAT(date, '%Y-%m')) AS last_month,
  LAG(SUM(amount), 12) OVER (ORDER BY DATE_FORMAT(date, '%Y-%m')) AS last_year,
  (SUM(amount) - LAG(SUM(amount), 1) OVER (ORDER BY DATE_FORMAT(date, '%Y-%m'))) / 
    LAG(SUM(amount), 1) OVER (ORDER BY DATE_FORMAT(date, '%Y-%m')) AS mom,
  (SUM(amount) - LAG(SUM(amount), 12) OVER (ORDER BY DATE_FORMAT(date, '%Y-%m'))) / 
    LAG(SUM(amount), 12) OVER (ORDER BY DATE_FORMAT(date, '%Y-%m')) AS yoy
FROM orders
GROUP BY DATE_FORMAT(date, '%Y-%m');`
        },
        { 
          emoji: "📈", 
          title: "累计留存", 
          desc: "第N日留存=COUNT(DISTINCT IF(datediff(login_date,reg_date)=N,uid,NULL))/COUNT(DISTINCT uid)",
          detail: "即可一行出1-30日留存数组",
          code: `-- N日留存（一次性计算1-30日）
SELECT 
  reg_date,
  COUNT(DISTINCT user_id) AS new_users,
  COUNT(DISTINCT IF(DATEDIFF(login_date, reg_date) = 1, user_id, NULL)) / COUNT(DISTINCT user_id) AS d1,
  COUNT(DISTINCT IF(DATEDIFF(login_date, reg_date) = 7, user_id, NULL)) / COUNT(DISTINCT user_id) AS d7,
  COUNT(DISTINCT IF(DATEDIFF(login_date, reg_date) = 30, user_id, NULL)) / COUNT(DISTINCT user_id) AS d30
FROM (
  SELECT r.user_id, r.reg_date, l.login_date
  FROM registrations r
  LEFT JOIN logins l ON r.user_id = l.user_id AND l.login_date BETWEEN r.reg_date AND DATE_ADD(r.reg_date, INTERVAL 30 DAY)
) t
GROUP BY reg_date;`
        }
      ]
    },
    {
      id: 'templates',
      num: 10,
      title: "实战模板层",
      subtitle: "直接复制改表名就能跑",
      color: "from-rose-500 to-red-600",
      darkColor: "from-rose-900 to-red-900",
      items: [
        { 
          emoji: "📊", 
          title: "用户行为宽表", 
          desc: "CREATE TABLE dws_user_day AS SELECT uid,date,SUM(IF(type='pv',1,0)) pv,SUM(IF(type='order',amt,0)) gmv",
          detail: "MAX(IF(type='pay',1,0)) is_pay FROM dwd_log GROUP BY uid,date",
          code: `-- 用户日级宽表（DWS层）
CREATE TABLE dws_user_day AS
SELECT 
  user_id,
  DATE(event_time) AS date,
  COUNT(DISTINCT IF(event_type = 'page_view', session_id, NULL)) AS pv,
  COUNT(DISTINCT IF(event_type = 'click', session_id, NULL)) AS clicks,
  SUM(IF(event_type = 'order', amount, 0)) AS gmv,
  MAX(IF(event_type = 'pay', 1, 0)) AS is_pay,
  MAX(IF(event_type = 'pay', amount, 0)) AS pay_amount
FROM dwd_user_events
WHERE date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY user_id, DATE(event_time);

-- 增量更新（每日）
INSERT INTO dws_user_day
SELECT ... FROM dwd_user_events WHERE date = CURDATE()
ON DUPLICATE KEY UPDATE pv = VALUES(pv), gmv = VALUES(gmv);`
        },
        { 
          emoji: "🔄", 
          title: "复购率", 
          desc: "WITH t1 AS (SELECT uid,DATE_FORMAT(trade_date,'%Y-%m') m FROM orders WHERE status='paid' GROUP BY uid,m)",
          detail: "SELECT m,COUNT(DISTINCT uid) buyers,COUNT(DISTINCT IF(uid IN (购买次数>1),uid,NULL)) rep_buyers,rep/buyers rate",
          code: `-- 月度复购率
WITH monthly_buyers AS (
  SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    user_id
  FROM orders
  WHERE status = 'paid'
  GROUP BY DATE_FORMAT(order_date, '%Y-%m'), user_id
),
repeat_buyers AS (
  SELECT month, user_id, COUNT(*) AS purchase_months
  FROM monthly_buyers
  GROUP BY month, user_id
  HAVING purchase_months > 1
)
SELECT 
  mb.month,
  COUNT(DISTINCT mb.user_id) AS total_buyers,
  COUNT(DISTINCT rb.user_id) AS repeat_buyers,
  COUNT(DISTINCT rb.user_id) / COUNT(DISTINCT mb.user_id) AS repeat_rate
FROM monthly_buyers mb
LEFT JOIN repeat_buyers rb ON mb.month = rb.month AND mb.user_id = rb.user_id
GROUP BY mb.month;`
        },
        { 
          emoji: "🎯", 
          title: "漏斗转化", 
          desc: "CREATE TEMPORARY TABLE funnel AS SELECT uid,MIN(IF(step='曝光',ts,NULL)) t1,MIN(IF(step='点击',ts,NULL)) t2",
          detail: "MIN(IF(step='下单',ts,NULL)) t3 FROM log GROUP BY uid; 再SELECT COUNT统计各步转化",
          code: `-- 漏斗转化分析
WITH funnel AS (
  SELECT 
    user_id,
    MIN(IF(event = 'impression', event_time, NULL)) AS t1,
    MIN(IF(event = 'click', event_time, NULL)) AS t2,
    MIN(IF(event = 'add_cart', event_time, NULL)) AS t3,
    MIN(IF(event = 'order', event_time, NULL)) AS t4,
    MIN(IF(event = 'pay', event_time, NULL)) AS t5
  FROM events
  WHERE date = '2024-10-03'
  GROUP BY user_id
)
SELECT 
  COUNT(IF(t1 IS NOT NULL, 1, NULL)) AS step1_impression,
  COUNT(IF(t2 IS NOT NULL, 1, NULL)) AS step2_click,
  COUNT(IF(t3 IS NOT NULL, 1, NULL)) AS step3_cart,
  COUNT(IF(t4 IS NOT NULL, 1, NULL)) AS step4_order,
  COUNT(IF(t5 IS NOT NULL, 1, NULL)) AS step5_pay,
  COUNT(IF(t2 IS NOT NULL, 1, NULL)) / COUNT(IF(t1 IS NOT NULL, 1, NULL)) AS cvr_1_2,
  COUNT(IF(t5 IS NOT NULL, 1, NULL)) / COUNT(IF(t1 IS NOT NULL, 1, NULL)) AS cvr_1_5
FROM funnel;`
        }
      ]
    },
    {
      id: 'bi',
      num: 11,
      title: "BI连接与自动化层",
      subtitle: "把SQL变成仪表盘",
      color: "from-lime-500 to-green-600",
      darkColor: "from-lime-900 to-green-900",
      items: [
        { 
          emoji: "📊", 
          title: "MySQL ↔ PowerBI", 
          desc: "直连模式：服务器端执行SQL，返回聚合结果",
          detail: "建议把JOIN、WHERE全写在Native Query，减少本地内存",
          code: `-- PowerBI中使用原生SQL（推荐）
let
  Source = MySQL.Database("localhost", "analytics"),
  CustomSQL = Value.NativeQuery(Source, "
    SELECT 
      DATE_FORMAT(order_date, '%Y-%m') AS month,
      SUM(amount) AS gmv,
      COUNT(DISTINCT user_id) AS buyers
    FROM orders
    WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
  ", null)
in
  CustomSQL`
        },
        { 
          emoji: "🔧", 
          title: "参数化SQL", 
          desc: "PowerBI支持[StartDate]参数，WHERE dt BETWEEN [StartDate] AND [EndDate]",
          detail: "实现模板复用",
          code: `-- PowerBI参数化查询
-- 1. 创建参数：StartDate, EndDate
-- 2. 在查询中使用
let
  Source = MySQL.Database("localhost", "analytics"),
  CustomSQL = Value.NativeQuery(Source, "
    SELECT * FROM orders 
    WHERE order_date BETWEEN '" & StartDate & "' AND '" & EndDate & "'
  ", null)
in
  CustomSQL

-- Python自动化刷新
import pyodbc
conn = pyodbc.connect('DSN=MySQL;UID=user;PWD=pass')
cursor = conn.cursor()
cursor.execute("CALL refresh_dws_tables()")
conn.commit()`
        },
        { 
          emoji: "🔄", 
          title: "刷新策略", 
          desc: "用MySQL EVENT每天02:00写dws汇总表，BI只读汇总，10s打开报表",
          detail: "避免直接抽明细",
          code: `-- MySQL定时任务（每天02:00刷新汇总表）
CREATE EVENT refresh_dws_daily
ON SCHEDULE EVERY 1 DAY STARTS '2024-01-01 02:00:00'
DO
BEGIN
  TRUNCATE TABLE dws_sales_daily;
  INSERT INTO dws_sales_daily
  SELECT 
    DATE(order_date) AS date,
    SUM(amount) AS gmv,
    COUNT(*) AS orders
  FROM orders
  WHERE DATE(order_date) = CURDATE() - INTERVAL 1 DAY
  GROUP BY DATE(order_date);
END;

-- 查看事件
SHOW EVENTS;`
        },
        { 
          emoji: "🔐", 
          title: "行级安全", 
          desc: "CREATE VIEW v_sales AS SELECT * FROM sales WHERE region=USER()",
          detail: "BI 取 VIEW，自动实现区域可见（例如：华南经理只看华南）",
          code: `-- 创建行级安全视图
CREATE VIEW v_sales_regional AS
SELECT * FROM sales
WHERE region = (
  SELECT region FROM user_permissions 
  WHERE username = USER()
);

-- PowerBI/Tableau直接查询视图
SELECT * FROM v_sales_regional;

-- 动态权限表
CREATE TABLE user_permissions (
  username VARCHAR(50),
  region VARCHAR(50)
);
INSERT INTO user_permissions VALUES ('manager_south', '华南');`
        }
      ]
    },
    {
      id: 'resources',
      num: 12,
      title: "学习路径 & 资源",
      subtitle: "从入门到精通的完整路线图",
      color: "from-emerald-500 to-teal-600",
      darkColor: "from-emerald-900 to-teal-900",
      items: [
        { 
          emoji: "📖", 
          title: "① 7天入门", 
          desc: "官方文档 Tutorial + 刷完 LeetCode Database Easy 15 题",
          detail: "掌握SELECT、WHERE、JOIN、GROUP BY基础语法"
        },
        { 
          emoji: "📚", 
          title: "② 14天进阶", 
          desc: "窗口函数 + JOIN性能调优 + 把公司3个月日志洗成宽表",
          detail: "学会使用EXPLAIN、理解索引原理"
        },
        { 
          emoji: "🚀", 
          title: "③ 30天实战", 
          desc: "独立搭建日报、周活、漏斗、留存4张仪表盘，SQL单条≤1s",
          detail: "掌握性能优化、窗口函数、时间序列分析"
        },
        { 
          emoji: "🎯", 
          title: "④ 持续深挖", 
          desc: "官方《High Performance MySQL》第 4 版 + 公众号 MySQL技术内幕、捡田螺的小男孩",
          detail: "跟踪8.0.3x的hash join、instant DDL、并行扫描新特性"
        }
      ]
    },
    {
      id: 'analysis-templates',
      num: 13,
      title: "数据分析必备SQL模板库",
      subtitle: "10+拿来即用的完整分析模板",
      color: "from-blue-500 to-purple-600",
      darkColor: "from-blue-900 to-purple-900",
      items: [
        {
          emoji: "👥",
          title: "RFM客户分层",
          desc: "Recency(最近购买)、Frequency(购买频次)、Monetary(消费金额)三维度分层",
          detail: "识别高价值客户、沉睡客户、流失预警",
          code: `-- RFM客户分层模型
WITH rfm_base AS (
  SELECT 
    user_id,
    DATEDIFF(CURDATE(), MAX(order_date)) AS recency,
    COUNT(DISTINCT order_id) AS frequency,
    SUM(amount) AS monetary
  FROM orders
  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
  GROUP BY user_id
),
rfm_score AS (
  SELECT *,
    NTILE(5) OVER (ORDER BY recency DESC) AS r_score,
    NTILE(5) OVER (ORDER BY frequency) AS f_score,
    NTILE(5) OVER (ORDER BY monetary) AS m_score
  FROM rfm_base
)
SELECT 
  user_id,
  CONCAT(r_score, f_score, m_score) AS rfm_score,
  CASE 
    WHEN r_score >= 4 AND f_score >= 4 THEN '重要价值客户'
    WHEN r_score >= 4 AND f_score < 4 THEN '重要发展客户'
    WHEN r_score < 4 AND f_score >= 4 THEN '重要保持客户'
    WHEN r_score < 2 AND f_score < 2 THEN '流失客户'
    ELSE '一般客户'
  END AS customer_type
FROM rfm_score;`
        },
        {
          emoji: "📈",
          title: "同期群分析(Cohort)",
          desc: "按注册月份分组，追踪各群体的留存/付费变化",
          detail: "识别产品生命周期，优化新用户体验",
          code: `-- 同期群留存分析
WITH cohort AS (
  SELECT 
    user_id,
    DATE_FORMAT(MIN(reg_date), '%Y-%m') AS cohort_month
  FROM users
  GROUP BY user_id
),
user_activity AS (
  SELECT 
    u.user_id,
    c.cohort_month,
    DATE_FORMAT(u.activity_date, '%Y-%m') AS activity_month,
    PERIOD_DIFF(
      DATE_FORMAT(u.activity_date, '%Y%m'),
      DATE_FORMAT(c.cohort_month, '%Y%m')
    ) AS month_number
  FROM user_activities u
  JOIN cohort c ON u.user_id = c.user_id
)
SELECT 
  cohort_month,
  month_number,
  COUNT(DISTINCT user_id) AS active_users,
  COUNT(DISTINCT user_id) * 100.0 / 
    FIRST_VALUE(COUNT(DISTINCT user_id)) OVER (PARTITION BY cohort_month ORDER BY month_number) AS retention_rate
FROM user_activity
GROUP BY cohort_month, month_number
ORDER BY cohort_month, month_number;`
        },
        {
          emoji: "🔬",
          title: "AB测试结果分析",
          desc: "计算转化率差异、置信区间、显著性检验",
          detail: "科学决策实验效果",
          code: `-- AB测试结果分析
WITH ab_summary AS (
  SELECT 
    experiment_group,
    COUNT(DISTINCT user_id) AS total_users,
    SUM(IF(converted = 1, 1, 0)) AS conversions,
    SUM(IF(converted = 1, 1, 0)) * 1.0 / COUNT(DISTINCT user_id) AS cvr
  FROM ab_test_results
  WHERE experiment_id = 'exp_001'
  GROUP BY experiment_group
),
ab_compare AS (
  SELECT 
    a.experiment_group AS group_a,
    b.experiment_group AS group_b,
    a.cvr AS cvr_a,
    b.cvr AS cvr_b,
    (b.cvr - a.cvr) / a.cvr AS lift,
    -- 简化的Z检验（实际应用建议用Python scipy）
    (b.cvr - a.cvr) / SQRT(
      (a.cvr * (1 - a.cvr) / a.total_users) + 
      (b.cvr * (1 - b.cvr) / b.total_users)
    ) AS z_score
  FROM ab_summary a
  CROSS JOIN ab_summary b
  WHERE a.experiment_group = 'control' AND b.experiment_group = 'treatment'
)
SELECT *, 
  CASE 
    WHEN ABS(z_score) > 1.96 THEN '显著(p<0.05)'
    WHEN ABS(z_score) > 1.65 THEN '边缘显著(p<0.1)'
    ELSE '不显著'
  END AS significance
FROM ab_compare;`
        },
        {
          emoji: "💰",
          title: "GMV拆解分析",
          desc: "GMV = 用户数 × 转化率 × 客单价，多维度拆解增长来源",
          detail: "定位增长瓶颈",
          code: `-- GMV多维度拆解
WITH daily_metrics AS (
  SELECT 
    DATE(order_date) AS date,
    COUNT(DISTINCT user_id) AS active_users,
    COUNT(DISTINCT IF(status='paid', user_id, NULL)) AS paying_users,
    COUNT(DISTINCT IF(status='paid', order_id, NULL)) AS paid_orders,
    SUM(IF(status='paid', amount, 0)) AS gmv
  FROM orders
  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  GROUP BY DATE(order_date)
)
SELECT 
  date,
  active_users,
  paying_users,
  paying_users * 1.0 / active_users AS conversion_rate,
  gmv / paying_users AS arpu,
  paid_orders * 1.0 / paying_users AS order_frequency,
  gmv / paid_orders AS aov,
  gmv,
  -- 同比
  LAG(gmv, 7) OVER (ORDER BY date) AS gmv_last_week,
  (gmv - LAG(gmv, 7) OVER (ORDER BY date)) / LAG(gmv, 7) OVER (ORDER BY date) AS wow_growth
FROM daily_metrics
ORDER BY date DESC;`
        },
        {
          emoji: "🎯",
          title: "用户流失预警",
          desc: "基于行为特征，预测30天内可能流失的用户",
          detail: "提前干预，降低流失率",
          code: `-- 用户流失预警模型
WITH user_features AS (
  SELECT 
    user_id,
    DATEDIFF(CURDATE(), MAX(last_active_date)) AS days_since_active,
    COUNT(DISTINCT DATE(activity_date)) AS active_days_30d,
    SUM(session_duration) / COUNT(*) AS avg_session_duration,
    COUNT(DISTINCT feature_used) AS feature_diversity
  FROM user_activities
  WHERE activity_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  GROUP BY user_id
),
churn_score AS (
  SELECT *,
    CASE 
      WHEN days_since_active > 14 THEN 50
      WHEN days_since_active > 7 THEN 30
      ELSE 0
    END +
    CASE 
      WHEN active_days_30d < 5 THEN 30
      WHEN active_days_30d < 10 THEN 15
      ELSE 0
    END +
    CASE 
      WHEN avg_session_duration < 60 THEN 20
      ELSE 0
    END AS churn_risk_score
  FROM user_features
)
SELECT 
  user_id,
  days_since_active,
  active_days_30d,
  churn_risk_score,
  CASE 
    WHEN churn_risk_score >= 70 THEN '高危流失'
    WHEN churn_risk_score >= 40 THEN '中危流失'
    ELSE '健康'
  END AS risk_level
FROM churn_score
WHERE churn_risk_score >= 40
ORDER BY churn_risk_score DESC;`
        },
        {
          emoji: "📊",
          title: "渠道归因分析",
          desc: "多触点归因模型：首次、末次、线性、时间衰减",
          detail: "评估各渠道真实贡献",
          code: `-- 多触点归因分析
WITH user_touchpoints AS (
  SELECT 
    user_id,
    channel,
    touchpoint_time,
    conversion_time,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY touchpoint_time) AS touch_order,
    COUNT(*) OVER (PARTITION BY user_id) AS total_touches,
    DATEDIFF(conversion_time, touchpoint_time) AS days_to_conversion
  FROM marketing_touchpoints
  WHERE conversion_time IS NOT NULL
)
SELECT 
  channel,
  -- 首次归因
  SUM(IF(touch_order = 1, 1, 0)) AS first_touch_conversions,
  -- 末次归因
  SUM(IF(touch_order = total_touches, 1, 0)) AS last_touch_conversions,
  -- 线性归因
  SUM(1.0 / total_touches) AS linear_attribution,
  -- 时间衰减归因（越接近转化，权重越高）
  SUM(POW(0.5, days_to_conversion / 7)) AS time_decay_attribution
FROM user_touchpoints
GROUP BY channel
ORDER BY linear_attribution DESC;`
        },
        {
          emoji: "📉",
          title: "异常检测SQL",
          desc: "基于3-sigma原则或IQR方法检测数据异常",
          detail: "及时发现数据质量问题或业务异常",
          code: `-- 异常检测（3-sigma方法）
WITH daily_stats AS (
  SELECT 
    DATE(order_date) AS date,
    SUM(amount) AS gmv
  FROM orders
  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
  GROUP BY DATE(order_date)
),
stats_summary AS (
  SELECT 
    AVG(gmv) AS mean_gmv,
    STDDEV(gmv) AS std_gmv
  FROM daily_stats
)
SELECT 
  d.date,
  d.gmv,
  s.mean_gmv,
  s.std_gmv,
  (d.gmv - s.mean_gmv) / s.std_gmv AS z_score,
  CASE 
    WHEN ABS((d.gmv - s.mean_gmv) / s.std_gmv) > 3 THEN '严重异常'
    WHEN ABS((d.gmv - s.mean_gmv) / s.std_gmv) > 2 THEN '异常'
    ELSE '正常'
  END AS anomaly_status
FROM daily_stats d
CROSS JOIN stats_summary s
WHERE ABS((d.gmv - s.mean_gmv) / s.std_gmv) > 2
ORDER BY ABS((d.gmv - s.mean_gmv) / s.std_gmv) DESC;`
        },
        {
          emoji: "🔄",
          title: "用户生命周期价值(LTV)",
          desc: "预测用户未来价值，优化获客成本",
          detail: "LTV > CAC 确保盈利",
          code: `-- 用户生命周期价值(LTV)计算
WITH user_metrics AS (
  SELECT 
    user_id,
    DATEDIFF(CURDATE(), MIN(order_date)) AS customer_age_days,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(amount) AS total_revenue,
    AVG(amount) AS avg_order_value,
    DATEDIFF(MAX(order_date), MIN(order_date)) / NULLIF(COUNT(DISTINCT order_id) - 1, 0) AS avg_days_between_orders
  FROM orders
  WHERE status = 'paid'
  GROUP BY user_id
  HAVING customer_age_days > 0
),
ltv_calculation AS (
  SELECT 
    user_id,
    total_revenue AS historical_value,
    -- 简化LTV预测：假设用户保持当前购买频率
    CASE 
      WHEN avg_days_between_orders > 0 THEN
        avg_order_value * (365 / avg_days_between_orders) * 2  -- 预测未来2年
      ELSE total_revenue
    END AS predicted_ltv,
    total_orders,
    customer_age_days
  FROM user_metrics
)
SELECT 
  CASE 
    WHEN predicted_ltv >= 10000 THEN '高价值(>1万)'
    WHEN predicted_ltv >= 5000 THEN '中价值(5k-1万)'
    WHEN predicted_ltv >= 1000 THEN '普通价值(1k-5k)'
    ELSE '低价值(<1k)'
  END AS ltv_segment,
  COUNT(*) AS user_count,
  AVG(predicted_ltv) AS avg_ltv,
  SUM(predicted_ltv) AS total_ltv
FROM ltv_calculation
GROUP BY ltv_segment
ORDER BY avg_ltv DESC;`
        }
      ]
    },
    {
      id: 'visualizations',
      num: 14,
      title: "SQL可视化图解",
      subtitle: "用图说话，一图胜千言",
      color: "from-green-500 to-teal-600",
      darkColor: "from-green-900 to-teal-900",
      items: [
        {
          emoji: "🔗",
          title: "JOIN类型韦恩图",
          desc: "INNER/LEFT/RIGHT/FULL JOIN的集合关系",
          detail: "理解JOIN的本质：集合运算",
          code: `-- JOIN类型对比（ASCII图示）
/*
INNER JOIN (交集)        LEFT JOIN (左表全保留)      RIGHT JOIN (右表全保留)
    ┌─────┐                  ┌─────┐                  ┌─────┐
    │  A  │                  │ A+AB│                  │  B  │
    └──┬──┘                  └──┬──┘                  └──┬──┘
       │ AB                     │ AB                     │ AB
    ┌──┴──┐                  ┌──┴──┐                  ┌──┴──┐
    │  B  │                  │  B  │                  │ A+AB│
    └─────┘                  └─────┘                  └─────┘

FULL OUTER JOIN (并集，MySQL不支持，需UNION模拟)
    ┌─────┐
    │A+AB+B│
    └─────┘
*/

-- INNER JOIN示例
SELECT u.name, o.order_id
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN示例
SELECT u.name, o.order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN模拟
SELECT u.name, o.order_id FROM users u LEFT JOIN orders o ON u.id = o.user_id
UNION
SELECT u.name, o.order_id FROM users u RIGHT JOIN orders o ON u.id = o.user_id;`
        },
        {
          emoji: "🌳",
          title: "索引B+Tree结构图",
          desc: "理解B+Tree为什么查询快",
          detail: "叶子节点链式连接，范围查询高效",
          code: `-- B+Tree索引结构示意
/*
                   [50]                    ← 根节点(非叶子)
                  /    \\
            [20,40]    [60,80]            ← 非叶子节点
           /  |  \\      /  |  \\
     [10,15] [25,35] [45] [55] [65,75] [85,95]  ← 叶子节点(存数据)
        ↓      ↓      ↓    ↓     ↓       ↓
      data   data   data data  data    data
       ← ← ← ← 双向链表 → → → → →

特点：
1. 非叶子节点只存索引，不存数据
2. 叶子节点存完整数据行（聚集索引）或主键（二级索引）
3. 叶子节点形成链表，范围查询只需遍历叶子
4. 树高度通常3-4层，可存储百万级数据
*/

-- 查看索引使用情况
EXPLAIN SELECT * FROM users WHERE id = 50;
-- type: const（最快）

EXPLAIN SELECT * FROM users WHERE id BETWEEN 20 AND 60;
-- type: range（利用叶子链表）

EXPLAIN SELECT * FROM users WHERE name LIKE '张%';
-- type: range（前缀索引）`
        },
        {
          emoji: "📊",
          title: "SQL执行顺序流程图",
          desc: "从FROM到LIMIT的完整执行流程",
          detail: "理解为什么 WHERE 里不能用 SELECT 别名",
          code: `-- SQL执行顺序图示
/*
┌─────────────────────────────────────────────┐
│  SELECT name, age * 2 AS double_age         │
│  FROM users                                  │
│  WHERE age > 18                              │
│  GROUP BY city                               │
│  HAVING COUNT(*) > 10                        │
│  ORDER BY double_age DESC                    │
│  LIMIT 10;                                   │
└─────────────────────────────────────────────┘
                    ↓
执行顺序：
① FROM users               ← 确定数据源
② WHERE age > 18           ← 行过滤（不能用别名）
③ GROUP BY city            ← 分组
④ HAVING COUNT(*) > 10     ← 组过滤
⑤ SELECT name, age * 2     ← 选择列（生成别名）
⑥ ORDER BY double_age      ← 排序（可以用别名）
⑦ LIMIT 10                 ← 限制行数

关键点：
- WHERE在SELECT之前，所以不能用SELECT别名
- HAVING在GROUP BY之后，用于过滤分组
- ORDER BY在SELECT之后，所以可以用别名
*/

-- 正确写法
SELECT name, age * 2 AS double_age
FROM users
WHERE age > 18  -- 用原始列名
ORDER BY double_age DESC;  -- 可以用别名`
        },
        {
          emoji: "🔍",
          title: "EXPLAIN执行计划解读",
          desc: "type、Extra字段含义及优化方向",
          detail: "看懂执行计划是优化的第一步",
          code: `-- EXPLAIN各字段含义
/*
┌──────┬─────────┬───────┬──────┬─────────────┬──────────┬─────────┬─────┬─────────┬──────────────────┐
│ id   │ type    │ table │ key  │ key_len     │ ref      │ rows    │ ... │ Extra                    │
├──────┼─────────┼───────┼──────┼─────────────┼──────────┼─────────┼─────┼─────────────────────────┤
│ 1    │ const   │ users │ PK   │ 8           │ const    │ 1       │ ... │ Using index              │
│ 2    │ range   │ orders│ idx  │ 4           │ NULL     │ 100     │ ... │ Using where              │
│ 3    │ ALL     │ logs  │ NULL │ NULL        │ NULL     │ 1000000 │ ... │ Using filesort           │
└──────┴─────────┴───────┴──────┴─────────────┴──────────┴─────────┴─────┴─────────────────────────┘

type字段（性能从好到坏）：
✅ const      - 主键/唯一索引常量查询（最快）
✅ eq_ref     - 唯一索引JOIN
✅ ref        - 非唯一索引查询
⚠️  range     - 索引范围扫描
❌ index      - 全索引扫描
❌ ALL        - 全表扫描（最慢）

Extra字段：
✅ Using index            - 覆盖索引，无需回表（最优）
✅ Using index condition  - 索引下推
⚠️  Using where           - 使用WHERE过滤
❌ Using filesort         - 需要额外排序（慢）
❌ Using temporary        - 需要临时表（慢）
*/

-- 查看执行计划
EXPLAIN SELECT * FROM users WHERE id = 1;
EXPLAIN FORMAT=JSON SELECT * FROM orders WHERE user_id IN (1,2,3);`
        },
        {
          emoji: "⚡",
          title: "索引失效场景图解",
          desc: "10种常见索引失效情况",
          detail: "避免索引失效，让查询飞起来",
          code: `-- 索引失效十大场景
/*
✅ 使用索引                    ❌ 索引失效

1. 原始列查询                  对列运算
   WHERE age = 18               WHERE age + 1 = 19

2. 字符串加引号                类型隐式转换
   WHERE phone = '13800138000'  WHERE phone = 13800138000

3. 前缀匹配                    中缀/后缀匹配
   WHERE name LIKE '张%'         WHERE name LIKE '%三%'

4. 联合索引最左前缀            跳过最左列
   WHERE a=1 AND b=2             WHERE b=2 AND c=3

5. 等值查询                    NOT IN / <>
   WHERE status = 'active'       WHERE status != 'active'

6. 范围列放最后                范围列在中间
   WHERE a=1 AND b BETWEEN 1,10  WHERE a BETWEEN 1,10 AND b=2

7. 单一排序方向                混合排序方向
   ORDER BY a DESC, b DESC       ORDER BY a DESC, b ASC

8. 覆盖索引                    非覆盖索引
   SELECT id,name (索引列)       SELECT * (包含非索引列)

9. 小表驱动大表                大表驱动小表
   小表 LEFT JOIN 大表           大表 LEFT JOIN 小表

10. 统计信息准确               统计信息过期
    定期 ANALYZE TABLE            长时间未更新统计
*/

-- 验证索引使用
EXPLAIN SELECT * FROM users WHERE age = 18;  -- ✅ type: ref
EXPLAIN SELECT * FROM users WHERE age + 1 = 19;  -- ❌ type: ALL`
        }
      ]
    },
    {
      id: 'optimization-cases',
      num: 15,
      title: "性能优化实战案例",
      subtitle: "从3秒到0.3秒的真实优化过程",
      color: "from-red-500 to-orange-600",
      darkColor: "from-red-900 to-orange-900",
      items: [
        {
          emoji: "🐌",
          title: "案例1：慢查询优化（3s→0.1s）",
          desc: "订单列表分页查询优化全过程",
          detail: "深度分页+多表JOIN+排序优化",
          code: `-- ❌ 慢查询（3秒，扫描100万行）
SELECT o.*, u.name, p.title
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN products p ON o.product_id = p.id
WHERE o.status = 'paid'
ORDER BY o.created_at DESC
LIMIT 1000000, 20;

-- 问题诊断
EXPLAIN SELECT ...;
-- type: ALL, rows: 1000000, Extra: Using filesort

-- ✅ 优化后（0.1秒）
-- 步骤1：延迟关联（只在子查询中分页）
SELECT o.*, u.name, p.title
FROM (
  SELECT id FROM orders 
  WHERE status = 'paid'
  ORDER BY created_at DESC
  LIMIT 1000000, 20
) t
INNER JOIN orders o ON t.id = o.id
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN products p ON o.product_id = p.id;

-- 步骤2：添加覆盖索引
CREATE INDEX idx_status_created ON orders(status, created_at, id);

-- 步骤3：游标分页（最优方案）
SELECT o.*, u.name, p.title
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN products p ON o.product_id = p.id
WHERE o.status = 'paid' AND o.id < 12345678  -- 上次最后ID
ORDER BY o.id DESC
LIMIT 20;

-- 性能对比：
-- 原始：3s，扫描100万行
-- 延迟关联：0.5s，扫描100万行但只回表20次
-- 游标分页：0.1s，只扫描20行`
        },
        {
          emoji: "📊",
          title: "案例2：聚合查询优化（5s→0.2s）",
          desc: "大数据量聚合+分组优化",
          detail: "利用汇总表+增量更新",
          code: `-- ❌ 慢查询（5秒，全表扫描+聚合）
SELECT 
  DATE(order_date) AS date,
  COUNT(*) AS orders,
  SUM(amount) AS gmv,
  COUNT(DISTINCT user_id) AS buyers
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY DATE(order_date);

-- ✅ 优化方案：创建汇总表
CREATE TABLE dws_orders_daily (
  date DATE PRIMARY KEY,
  orders INT,
  gmv DECIMAL(10,2),
  buyers INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 每日增量更新（凌晨2点执行）
INSERT INTO dws_orders_daily (date, orders, gmv, buyers)
SELECT 
  DATE(order_date) AS date,
  COUNT(*) AS orders,
  SUM(amount) AS gmv,
  COUNT(DISTINCT user_id) AS buyers
FROM orders
WHERE DATE(order_date) = CURDATE() - INTERVAL 1 DAY
ON DUPLICATE KEY UPDATE
  orders = VALUES(orders),
  gmv = VALUES(gmv),
  buyers = VALUES(buyers);

-- 查询直接读汇总表（0.2秒）
SELECT * FROM dws_orders_daily 
WHERE date >= '2024-01-01'
ORDER BY date DESC;`
        },
        {
          emoji: "🔗",
          title: "案例3：JOIN优化（10s→1s）",
          desc: "多表关联性能提升",
          detail: "小表驱动+索引优化+子查询改写",
          code: `-- ❌ 慢查询（10秒，大表驱动）
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'paid'
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name;

-- 问题：
-- 1. users表1000万行，orders表5000万行
-- 2. 大表驱动小表
-- 3. JOIN条件中有额外过滤

-- ✅ 优化步骤1：先过滤再JOIN
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN (
  SELECT user_id, id FROM orders WHERE status = 'paid'
) o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
GROUP BY u.id, u.name;

-- ✅ 优化步骤2：添加索引
CREATE INDEX idx_created ON users(created_at);
CREATE INDEX idx_user_status ON orders(user_id, status);

-- ✅ 优化步骤3：改用子查询（最优）
SELECT 
  u.name,
  (SELECT COUNT(*) FROM orders WHERE user_id = u.id AND status = 'paid') AS order_count
FROM users u
WHERE u.created_at >= '2024-01-01';

-- 性能对比：10s → 1s`
        },
        {
          emoji: "📈",
          title: "案例4：COUNT(*)优化（30s→2s）",
          desc: "亿级数据COUNT优化",
          detail: "近似统计+定期更新计数表",
          code: `-- ❌ 慢查询（30秒，全表扫描）
SELECT COUNT(*) FROM orders WHERE status = 'paid';

-- ✅ 方案1：使用EXPLAIN估算（瞬间，误差±10%）
EXPLAIN SELECT COUNT(*) FROM orders WHERE status = 'paid';
-- rows字段显示估算行数

-- ✅ 方案2：创建计数表（推荐）
CREATE TABLE stats_counter (
  stat_name VARCHAR(50) PRIMARY KEY,
  stat_value BIGINT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 触发器自动更新
DELIMITER $$
CREATE TRIGGER orders_paid_count_insert
AFTER INSERT ON orders FOR EACH ROW
BEGIN
  IF NEW.status = 'paid' THEN
    UPDATE stats_counter SET stat_value = stat_value + 1 WHERE stat_name = 'paid_orders';
  END IF;
END$$
DELIMITER ;

-- 查询（2秒）
SELECT stat_value FROM stats_counter WHERE stat_name = 'paid_orders';

-- ✅ 方案3：定期批量更新（夜间）
INSERT INTO stats_counter (stat_name, stat_value)
SELECT 'paid_orders', COUNT(*) FROM orders WHERE status = 'paid'
ON DUPLICATE KEY UPDATE stat_value = VALUES(stat_value);`
        }
      ]
    },
    {
      id: 'python-mysql',
      num: 16,
      title: "Python × MySQL 最佳实践",
      subtitle: "完整数据分析工作流",
      color: "from-yellow-500 to-amber-600",
      darkColor: "from-yellow-900 to-amber-900",
      items: [
        {
          emoji: "🔌",
          title: "连接池配置",
          desc: "高并发场景下的连接管理",
          detail: "避免频繁创建/销毁连接",
          code: `# 安装依赖
# pip install pymysql pandas sqlalchemy DBUtils

# 方案1：pymysql + DBUtils连接池
from dbutils.pooled_db import PooledDB
import pymysql

pool = PooledDB(
    creator=pymysql,
    maxconnections=10,      # 最大连接数
    mincached=2,            # 最小空闲连接
    maxcached=5,            # 最大空闲连接
    blocking=True,          # 连接池满时阻塞等待
    host='localhost',
    user='analyst',
    password='password',
    database='analytics',
    charset='utf8mb4'
)

# 使用连接
conn = pool.connection()
cursor = conn.cursor()
cursor.execute("SELECT * FROM orders LIMIT 10")
data = cursor.fetchall()
cursor.close()
conn.close()  # 归还连接池

# 方案2：SQLAlchemy（推荐）
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine(
    'mysql+pymysql://analyst:password@localhost/analytics?charset=utf8mb4',
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True  # 自动检测失效连接
)

# 直接读取为DataFrame
df = pd.read_sql("SELECT * FROM orders WHERE status='paid'", engine)`
        },
        {
          emoji: "🛡️",
          title: "SQL注入防护",
          desc: "参数化查询，100%防注入",
          detail: "永远不要用字符串拼接SQL",
          code: `import pymysql

conn = pymysql.connect(host='localhost', user='root', database='analytics')
cursor = conn.cursor()

# ❌ 危险：SQL注入风险
user_input = "1 OR 1=1"  # 恶意输入
sql = f"SELECT * FROM users WHERE id = {user_input}"  # 返回所有数据！

# ✅ 安全：参数化查询
user_id = request.get('user_id')
sql = "SELECT * FROM users WHERE id = %s"
cursor.execute(sql, (user_id,))

# ✅ 多参数
sql = "SELECT * FROM orders WHERE user_id = %s AND status = %s"
cursor.execute(sql, (user_id, 'paid'))

# ✅ IN查询
ids = [1, 2, 3, 4, 5]
placeholders = ','.join(['%s'] * len(ids))
sql = f"SELECT * FROM users WHERE id IN ({placeholders})"
cursor.execute(sql, ids)

cursor.close()
conn.close()`
        },
        {
          emoji: "📊",
          title: "pandas完整工作流",
          desc: "从MySQL到数据分析的一站式流程",
          detail: "读取→清洗→分析→写回",
          code: `import pandas as pd
from sqlalchemy import create_engine

# 创建引擎
engine = create_engine('mysql+pymysql://user:pass@localhost/analytics')

# 1. 读取数据
df = pd.read_sql("""
    SELECT 
        o.order_id,
        o.user_id,
        o.amount,
        o.created_at,
        u.name,
        u.city
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    WHERE o.created_at >= '2024-01-01'
""", engine)

# 2. 数据清洗
df['created_at'] = pd.to_datetime(df['created_at'])
df['date'] = df['created_at'].dt.date
df = df.dropna(subset=['amount'])
df = df[df['amount'] > 0]

# 3. 数据分析
daily_gmv = df.groupby('date').agg({
    'order_id': 'count',
    'amount': 'sum',
    'user_id': 'nunique'
}).rename(columns={
    'order_id': 'orders',
    'amount': 'gmv',
    'user_id': 'buyers'
})

# 4. 写回数据库
daily_gmv.to_sql(
    'dws_daily_summary',
    engine,
    if_exists='replace',  # append/replace/fail
    index=True,
    chunksize=1000  # 分批插入
)

print("数据已写入 dws_daily_summary 表")`
        },
        {
          emoji: "⚡",
          title: "批量操作优化",
          desc: "10万行数据插入优化（60s→3s）",
          detail: "批量+事务+LOAD DATA",
          code: `import pymysql
import pandas as pd

conn = pymysql.connect(host='localhost', user='root', database='analytics')
cursor = conn.cursor()

# ❌ 慢：逐行插入（60秒）
for row in data:
    cursor.execute("INSERT INTO logs (user_id, action) VALUES (%s, %s)", row)
    conn.commit()

# ✅ 快：批量插入 + 单次提交（5秒）
sql = "INSERT INTO logs (user_id, action) VALUES (%s, %s)"
cursor.executemany(sql, data)
conn.commit()

# ✅ 更快：LOAD DATA INFILE（3秒）
# 1. 导出CSV
df.to_csv('/tmp/logs.csv', index=False, header=False)

# 2. 批量导入
cursor.execute("""
    LOAD DATA LOCAL INFILE '/tmp/logs.csv'
    INTO TABLE logs
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\\n'
    (user_id, action)
""")
conn.commit()

# ✅ pandas方式（最简单）
df.to_sql('logs', engine, if_exists='append', index=False, chunksize=5000)

cursor.close()
conn.close()`
        },
        {
          emoji: "🔄",
          title: "自动化数据同步",
          desc: "定时从MySQL抽取数据到本地分析",
          detail: "APScheduler + pandas + 增量更新",
          code: `from apscheduler.schedulers.blocking import BlockingScheduler
from sqlalchemy import create_engine
import pandas as pd
from datetime import datetime, timedelta

engine = create_engine('mysql+pymysql://user:pass@localhost/analytics')

def sync_daily_data():
    """每天凌晨2点同步昨日数据"""
    yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
    
    # 读取昨日数据
    df = pd.read_sql(f"""
        SELECT * FROM orders 
        WHERE DATE(created_at) = '{yesterday}'
    """, engine)
    
    # 保存到本地
    df.to_parquet(f'data/orders_{yesterday}.parquet')
    print(f"✅ 同步完成：{len(df)}条数据")

def sync_incremental():
    """增量同步（每小时）"""
    # 读取上次同步时间
    with open('last_sync.txt', 'r') as f:
        last_sync = f.read().strip()
    
    # 增量查询
    df = pd.read_sql(f"""
        SELECT * FROM orders 
        WHERE updated_at > '{last_sync}'
    """, engine)
    
    if len(df) > 0:
        # 追加到本地文件
        df.to_parquet('data/orders_incremental.parquet', append=True)
        
        # 更新同步时间
        with open('last_sync.txt', 'w') as f:
            f.write(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        
        print(f"✅ 增量同步：{len(df)}条")

# 定时任务
scheduler = BlockingScheduler()
scheduler.add_job(sync_daily_data, 'cron', hour=2, minute=0)  # 每天2点
scheduler.add_job(sync_incremental, 'interval', hours=1)       # 每小时
scheduler.start()`
        }
      ]
    },
    {
      id: 'common-mistakes',
      num: 17,
      title: "常见错误避坑指南",
      subtitle: "❌ 错误 vs ✅ 正确对比",
      color: "from-pink-500 to-red-600",
      darkColor: "from-pink-900 to-red-900",
      items: [
        {
          emoji: "⚠️",
          title: "WHERE里使用SELECT别名",
          desc: "❌ WHERE double_age > 30 → ✅ WHERE age * 2 > 30",
          detail: "WHERE在SELECT之前执行，别名还未生成",
          code: `-- ❌ 错误：WHERE不能用SELECT别名
SELECT name, age * 2 AS double_age
FROM users
WHERE double_age > 30;  -- 报错：Unknown column

-- ✅ 正确方案1：用原始表达式
SELECT name, age * 2 AS double_age
FROM users
WHERE age * 2 > 30;

-- ✅ 正确方案2：用子查询
SELECT * FROM (
  SELECT name, age * 2 AS double_age FROM users
) t WHERE double_age > 30;`
        },
        {
          emoji: "🔢",
          title: "COUNT(*)误用",
          desc: "❌ COUNT(*) = 0 → ✅ COUNT(*) > 0 或用EXISTS",
          detail: "COUNT永远返回数字，不会返回NULL",
          code: `-- ❌ 错误：COUNT(*)永远>=0，条件恒真
SELECT * FROM users WHERE (SELECT COUNT(*) FROM orders WHERE user_id = users.id) = 0;

-- ✅ 正确：用NOT EXISTS（更快）
SELECT * FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- ✅ 或者：用LEFT JOIN + NULL判断
SELECT u.* FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;`
        },
        {
          emoji: "🚫",
          title: "NOT IN遇到NULL",
          desc: "❌ NOT IN (1, 2, NULL) 返回空集",
          detail: "NULL的三值逻辑导致意外结果",
          code: `-- ❌ 危险：NOT IN包含NULL返回空集
SELECT * FROM users WHERE id NOT IN (1, 2, NULL);  -- 返回0行！

-- ✅ 正确：先过滤NULL
SELECT * FROM users 
WHERE id NOT IN (SELECT id FROM blacklist WHERE id IS NOT NULL);

-- ✅ 更好：用NOT EXISTS
SELECT * FROM users u
WHERE NOT EXISTS (SELECT 1 FROM blacklist b WHERE b.id = u.id);`
        },
        {
          emoji: "📅",
          title: "日期字段加函数",
          desc: "❌ DATE(created_at) = '2024-10-03' 索引失效",
          detail: "对索引列使用函数会导致全表扫描",
          code: `-- ❌ 索引失效：对列使用函数
SELECT * FROM orders WHERE DATE(created_at) = '2024-10-03';

-- ✅ 正确：用范围查询
SELECT * FROM orders 
WHERE created_at >= '2024-10-03 00:00:00' 
  AND created_at < '2024-10-04 00:00:00';

-- ✅ MySQL 8.0：创建函数索引
CREATE INDEX idx_date ON orders((DATE(created_at)));`
        },
        {
          emoji: "🔗",
          title: "ON vs WHERE的区别",
          desc: "LEFT JOIN中过滤条件位置影响结果",
          detail: "ON过滤右表，WHERE过滤结果集",
          code: `-- 场景：查询所有用户及其已支付订单数

-- ❌ 错误：WHERE过滤掉了无订单用户
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.status = 'paid'  -- 变成了INNER JOIN！
GROUP BY u.id;

-- ✅ 正确：在ON中过滤
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'paid'
GROUP BY u.id;`
        }
      ]
    },
    {
      id: 'scenario-map',
      num: 18,
      title: "业务场景→SQL速查表",
      subtitle: "我要做XXX分析，该用什么SQL？",
      color: "from-violet-500 to-purple-600",
      darkColor: "from-violet-900 to-purple-900",
      items: [
        {
          emoji: "👥",
          title: "用户分析场景",
          desc: "新增、活跃、留存、流失、分层",
          detail: "用户生命周期全流程SQL",
          code: `-- 1. 新增用户（按日）
SELECT DATE(reg_date) AS date, COUNT(*) AS new_users
FROM users GROUP BY DATE(reg_date);

-- 2. 活跃用户（DAU/MAU）
SELECT COUNT(DISTINCT user_id) AS dau FROM logs WHERE DATE(event_time) = CURDATE();

-- 3. N日留存
SELECT reg_date,
  COUNT(DISTINCT user_id) AS new_users,
  COUNT(DISTINCT IF(DATEDIFF(login_date, reg_date) = 1, user_id, NULL)) / COUNT(DISTINCT user_id) AS d1_retention
FROM (SELECT r.user_id, r.reg_date, l.login_date FROM registrations r LEFT JOIN logins l ON r.user_id = l.user_id) t
GROUP BY reg_date;

-- 4. 流失用户（30天未登录）
SELECT * FROM users WHERE DATEDIFF(CURDATE(), last_login_date) > 30;

-- 5. RFM客户分层（见PART 13）`
        },
        {
          emoji: "💰",
          title: "交易分析场景",
          desc: "GMV、客单价、复购、漏斗",
          detail: "电商核心指标SQL",
          code: `-- 1. GMV统计
SELECT DATE(order_date) AS date, SUM(amount) AS gmv
FROM orders WHERE status = 'paid' GROUP BY DATE(order_date);

-- 2. 客单价（ARPU）
SELECT SUM(amount) / COUNT(DISTINCT user_id) AS arpu FROM orders WHERE status = 'paid';

-- 3. 复购率（见PART 13）
WITH monthly_buyers AS (...)

-- 4. 转化漏斗（见PART 10）
WITH funnel AS (...)

-- 5. 同比环比
SELECT month, sales,
  LAG(sales, 1) OVER (ORDER BY month) AS last_month,
  LAG(sales, 12) OVER (ORDER BY month) AS last_year
FROM monthly_sales;`
        },
        {
          emoji: "📊",
          title: "运营分析场景",
          desc: "渠道、活动、AB测试、异常监控",
          detail: "运营决策支持SQL",
          code: `-- 1. 渠道效果对比
SELECT channel, COUNT(*) AS users, SUM(amount) AS revenue
FROM users u LEFT JOIN orders o ON u.id = o.user_id
GROUP BY channel ORDER BY revenue DESC;

-- 2. 活动效果评估
SELECT activity_id,
  COUNT(DISTINCT user_id) AS participants,
  SUM(IF(converted=1, 1, 0)) AS conversions,
  SUM(IF(converted=1, 1, 0)) / COUNT(DISTINCT user_id) AS cvr
FROM activity_logs GROUP BY activity_id;

-- 3. AB测试（见PART 13）
WITH ab_summary AS (...)

-- 4. 异常监控（3-sigma，见PART 13）
WITH daily_stats AS (...)`
        },
        {
          emoji: "📦",
          title: "产品分析场景",
          desc: "功能使用、留存、路径分析",
          detail: "产品优化方向SQL",
          code: `-- 1. 功能使用频次
SELECT feature_name, COUNT(*) AS usage_count
FROM feature_logs GROUP BY feature_name ORDER BY usage_count DESC;

-- 2. 功能留存
SELECT feature_name,
  COUNT(DISTINCT IF(day_diff = 1, user_id, NULL)) / COUNT(DISTINCT user_id) AS d1_retention
FROM (SELECT user_id, feature_name, DATEDIFF(event_date, first_use_date) AS day_diff FROM ...) t
GROUP BY feature_name;

-- 3. 用户路径分析
SELECT 
  CONCAT(step1, ' → ', step2, ' → ', step3) AS path,
  COUNT(*) AS user_count
FROM user_journey GROUP BY path ORDER BY user_count DESC LIMIT 10;`
        },
        {
          emoji: "🎯",
          title: "快速决策场景",
          desc: "Top N、排名、占比、趋势",
          detail: "高管最关心的SQL",
          code: `-- 1. Top N（销售额前10城市）
SELECT city, SUM(amount) AS gmv FROM orders
GROUP BY city ORDER BY gmv DESC LIMIT 10;

-- 2. 排名（每个类目Top3商品）
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
  FROM products
) SELECT * FROM ranked WHERE rn <= 3;

-- 3. 占比（各城市GMV占比）
SELECT city, SUM(amount) AS gmv,
  SUM(amount) / SUM(SUM(amount)) OVER () AS pct
FROM orders GROUP BY city;

-- 4. 趋势（7日移动平均）
SELECT date, sales,
  AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS ma7
FROM daily_sales;`
        }
      ]
    },
    {
      id: 'data-warehouse',
      num: 19,
      title: "数据仓库基础",
      subtitle: "分析师90%时间都在处理数仓数据",
      color: "from-sky-500 to-blue-600",
      darkColor: "from-sky-900 to-blue-900",
      items: [
        {
          emoji: "🏢",
          title: "四层架构：ODS→DWD→DWS→ADS",
          desc: "数据从原始到可用的完整链路",
          detail: "ODS(操作数据层)→DWD(明细数据层)→DWS(汇总数据层)→ADS(应用数据层)",
          code: `-- ODS层：原始数据，保持与业务系统一致
CREATE TABLE ods_orders (
  order_id BIGINT,
  user_id BIGINT,
  product_id BIGINT,
  amount DECIMAL(10,2),
  status VARCHAR(20),
  created_at DATETIME,
  -- 分区字段
  dt DATE COMMENT '数据日期'
) COMMENT 'ODS层：订单原始数据';

-- DWD层：清洗后的明细数据
CREATE TABLE dwd_orders (
  order_id BIGINT PRIMARY KEY,
  user_id BIGINT,
  user_name VARCHAR(50),      -- 关联维度表
  product_id BIGINT,
  product_name VARCHAR(200),  -- 关联维度表
  amount DECIMAL(10,2),
  status VARCHAR(20),
  created_at DATETIME,
  dt DATE
) COMMENT 'DWD层：订单明细宽表';

-- DWS层：按主题汇总
CREATE TABLE dws_user_order_summary (
  user_id BIGINT,
  order_count INT,
  total_amount DECIMAL(10,2),
  avg_amount DECIMAL(10,2),
  first_order_date DATE,
  last_order_date DATE,
  dt DATE,
  PRIMARY KEY (user_id, dt)
) COMMENT 'DWS层：用户订单汇总表';

-- ADS层：应用层，直接给BI/报表
CREATE TABLE ads_daily_gmv (
  date DATE PRIMARY KEY,
  gmv DECIMAL(10,2),
  orders INT,
  buyers INT,
  new_buyers INT
) COMMENT 'ADS层：每日GMV指标表';`
        },
        {
          emoji: "📊",
          title: "维度表 vs 事实表",
          desc: "维度表描述谁/什么/哪里，事实表记录发生了什么",
          detail: "维度表变化慢（用户、商品），事实表增长快（订单、日志）",
          code: `-- 维度表：用户维度（慢变化）
CREATE TABLE dim_user (
  user_id BIGINT PRIMARY KEY,
  user_name VARCHAR(50),
  gender CHAR(1),
  city VARCHAR(50),
  level VARCHAR(20),
  register_date DATE,
  -- SCD Type 1：直接覆盖
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) COMMENT '用户维度表';

-- 维度表：产品维度
CREATE TABLE dim_product (
  product_id BIGINT PRIMARY KEY,
  product_name VARCHAR(200),
  category VARCHAR(50),
  brand VARCHAR(50),
  price DECIMAL(10,2),
  updated_at DATETIME
) COMMENT '产品维度表';

-- 事实表：订单事实（快速增长）
CREATE TABLE fact_orders (
  order_id BIGINT PRIMARY KEY,
  user_id BIGINT,          -- 外键 → dim_user
  product_id BIGINT,       -- 外键 → dim_product
  amount DECIMAL(10,2),    -- 度量值
  quantity INT,            -- 度量值
  created_at DATETIME,
  dt DATE
) COMMENT '订单事实表';

-- 关联查询（星型模型）
SELECT 
  d.date,
  u.city,
  p.category,
  SUM(f.amount) AS gmv,
  COUNT(f.order_id) AS orders
FROM fact_orders f
JOIN dim_user u ON f.user_id = u.user_id
JOIN dim_product p ON f.product_id = p.product_id
JOIN dim_date d ON f.dt = d.date
GROUP BY d.date, u.city, p.category;`
        },
        {
          emoji: "🔄",
          title: "拉链表（SCD Type 2）",
          desc: "记录维度数据的历史变化，支持时间旅行查询",
          detail: "用start_date和end_date标记每条记录的有效期，9999-12-31表示当前有效",
          code: `-- 拉链表结构
CREATE TABLE dim_user_scd (
  user_id BIGINT,
  user_name VARCHAR(50),
  level VARCHAR(20),        -- 可变字段
  city VARCHAR(50),         -- 可变字段
  start_date DATE,          -- 生效日期
  end_date DATE,            -- 失效日期（9999-12-31表示当前）
  is_current BOOLEAN,       -- 1表示当前有效记录
  PRIMARY KEY (user_id, start_date)
) COMMENT '用户拉链表';

-- 初始化数据
INSERT INTO dim_user_scd 
SELECT user_id, user_name, level, city, 
  register_date AS start_date, 
  '9999-12-31' AS end_date, 
  1 AS is_current
FROM dim_user;

-- 更新拉链表（用户level从普通会员→VIP）
-- 步骤1：关闭旧记录
UPDATE dim_user_scd 
SET end_date = '2024-10-03', is_current = 0
WHERE user_id = 12345 AND is_current = 1;

-- 步骤2：插入新记录
INSERT INTO dim_user_scd VALUES
(12345, 'Alice', 'VIP', '北京', '2024-10-04', '9999-12-31', 1);

-- 查询某个时间点的用户信息（时间旅行）
SELECT * FROM dim_user_scd
WHERE user_id = 12345 
  AND '2024-09-01' BETWEEN start_date AND end_date;

-- 查询当前有效记录
SELECT * FROM dim_user_scd WHERE is_current = 1;`
        },
        {
          emoji: "⚡",
          title: "增量 vs 全量更新",
          desc: "增量更新只处理新增/变化数据，全量更新重新计算所有数据",
          detail: "增量：快，但逻辑复杂；全量：慢，但逻辑简单",
          code: `-- 全量更新（简单但慢）
TRUNCATE TABLE dws_user_order_summary;

INSERT INTO dws_user_order_summary
SELECT 
  user_id,
  COUNT(*) AS order_count,
  SUM(amount) AS total_amount,
  AVG(amount) AS avg_amount,
  MIN(created_at) AS first_order_date,
  MAX(created_at) AS last_order_date,
  CURDATE() AS dt
FROM dwd_orders
GROUP BY user_id;

-- 增量更新（快但复杂）
-- 步骤1：找出昨天有新订单的用户
CREATE TEMPORARY TABLE tmp_changed_users AS
SELECT DISTINCT user_id 
FROM dwd_orders 
WHERE dt = DATE_SUB(CURDATE(), INTERVAL 1 DAY);

-- 步骤2：删除这些用户的旧汇总
DELETE FROM dws_user_order_summary 
WHERE user_id IN (SELECT user_id FROM tmp_changed_users);

-- 步骤3：重新计算这些用户的汇总
INSERT INTO dws_user_order_summary
SELECT 
  user_id,
  COUNT(*) AS order_count,
  SUM(amount) AS total_amount,
  AVG(amount) AS avg_amount,
  MIN(created_at) AS first_order_date,
  MAX(created_at) AS last_order_date,
  CURDATE() AS dt
FROM dwd_orders
WHERE user_id IN (SELECT user_id FROM tmp_changed_users)
GROUP BY user_id;`
        },
        {
          emoji: "🌳",
          title: "数据血缘（Data Lineage）",
          desc: "追溯数据从源头到报表的完整链路",
          detail: "知道每个字段来自哪张表、经过哪些加工，出问题能快速定位",
          code: `-- 示例：GMV报表的数据血缘
/*
数据血缘图：
业务系统 orders 表
  ↓ (ETL每日凌晨)
ODS层 ods_orders (dt分区)
  ↓ (清洗+关联维度)
DWD层 dwd_orders (宽表)
  ↓ (按日期聚合)
DWS层 dws_daily_gmv
  ↓ (格式化+指标计算)
ADS层 ads_daily_gmv
  ↓
Power BI报表
*/

-- 用注释记录血缘关系
CREATE TABLE dws_daily_gmv (
  date DATE PRIMARY KEY,
  gmv DECIMAL(10,2) COMMENT '来源: SUM(dwd_orders.amount) WHERE status=paid',
  orders INT COMMENT '来源: COUNT(DISTINCT dwd_orders.order_id)',
  buyers INT COMMENT '来源: COUNT(DISTINCT dwd_orders.user_id)',
  created_at DATETIME COMMENT '数据生成时间'
) COMMENT '血缘: dwd_orders → 按日期聚合 → 本表';

-- 查看表结构和注释
SHOW CREATE TABLE dws_daily_gmv;
DESC dws_daily_gmv;`
        },
        {
          emoji: "📅",
          title: "分区策略",
          desc: "按日期/类型分区，提升查询性能10-100倍",
          detail: "查询只扫描相关分区，避免全表扫描",
          code: `-- 按日期分区（最常用）
CREATE TABLE fact_orders_partitioned (
  order_id BIGINT,
  user_id BIGINT,
  amount DECIMAL(10,2),
  created_at DATETIME
) PARTITION BY RANGE (TO_DAYS(created_at)) (
  PARTITION p202401 VALUES LESS THAN (TO_DAYS('2024-02-01')),
  PARTITION p202402 VALUES LESS THAN (TO_DAYS('2024-03-01')),
  PARTITION p202403 VALUES LESS THAN (TO_DAYS('2024-04-01')),
  PARTITION pmax VALUES LESS THAN MAXVALUE
);

-- 查看分区信息
SELECT 
  PARTITION_NAME,
  TABLE_ROWS,
  DATA_LENGTH / 1024 / 1024 AS data_mb
FROM information_schema.PARTITIONS
WHERE TABLE_NAME = 'fact_orders_partitioned';

-- 查询时自动分区裁剪
EXPLAIN PARTITIONS
SELECT * FROM fact_orders_partitioned
WHERE created_at >= '2024-02-01' AND created_at < '2024-03-01';
-- 只扫描 p202402 分区

-- 删除历史分区（快速清理旧数据）
ALTER TABLE fact_orders_partitioned DROP PARTITION p202401;`
        }
      ]
    },
    {
      id: 'data-quality',
      num: 20,
      title: "数据质量检查（DQ）",
      subtitle: "脏数据导致的分析错误占bug的60%",
      color: "from-amber-500 to-orange-600",
      darkColor: "from-amber-900 to-orange-900",
      items: [
        {
          emoji: "✅",
          title: "完整性检查（Completeness）",
          desc: "检查NULL、空字符串、缺失值",
          detail: "核心字段不能为空，关联字段必须完整",
          code: `-- DQ模板1：主键NULL检查
SELECT 
  'orders表主键NULL检查' AS check_name,
  COUNT(*) AS null_count,
  CASE 
    WHEN COUNT(*) = 0 THEN '✅ 通过'
    ELSE '❌ 失败'
  END AS status
FROM orders 
WHERE order_id IS NULL;

-- DQ模板2：关键字段空值率
SELECT 
  '用户表关键字段空值统计' AS check_name,
  SUM(CASE WHEN user_name IS NULL OR user_name = '' THEN 1 ELSE 0 END) AS name_null,
  SUM(CASE WHEN phone IS NULL OR phone = '' THEN 1 ELSE 0 END) AS phone_null,
  SUM(CASE WHEN city IS NULL OR city = '' THEN 1 ELSE 0 END) AS city_null,
  COUNT(*) AS total,
  ROUND(SUM(CASE WHEN user_name IS NULL THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS name_null_pct
FROM users;

-- DQ模板3：外键完整性检查
SELECT 
  '订单表外键完整性检查' AS check_name,
  COUNT(*) AS orphan_count
FROM orders o
LEFT JOIN users u ON o.user_id = u.user_id
WHERE u.user_id IS NULL;  -- 找出订单表中不存在的用户ID`
        },
        {
          emoji: "🔗",
          title: "一致性检查（Consistency）",
          desc: "检查关联完整性、枚举值、业务逻辑",
          detail: "订单状态只能是规定的几个值，金额和数量的逻辑关系",
          code: `-- DQ模板4：枚举值检查
SELECT 
  '订单状态枚举值检查' AS check_name,
  status,
  COUNT(*) AS count
FROM orders
WHERE status NOT IN ('pending', 'paid', 'shipped', 'completed', 'cancelled')
GROUP BY status;

-- DQ模板5：业务逻辑一致性检查
SELECT 
  '订单金额逻辑检查' AS check_name,
  COUNT(*) AS error_count
FROM orders
WHERE total_amount != unit_price * quantity;  -- 总金额应该等于单价*数量

-- DQ模板6：日期逻辑一致性
SELECT 
  '日期逻辑检查' AS check_name,
  COUNT(*) AS error_count
FROM orders
WHERE ship_date < order_date  -- 发货日期不能早于下单日期
   OR complete_date < ship_date;  -- 完成日期不能早于发货日期`
        },
        {
          emoji: "🎯",
          title: "准确性检查（Accuracy）",
          desc: "检查范围、格式、异常值",
          detail: "年龄不能为负数，手机号必须11位，金额不能超出合理范围",
          code: `-- DQ模板7：数值范围检查
SELECT 
  '订单金额范围检查' AS check_name,
  SUM(CASE WHEN amount < 0 THEN 1 ELSE 0 END) AS negative_count,
  SUM(CASE WHEN amount > 1000000 THEN 1 ELSE 0 END) AS abnormal_high,
  SUM(CASE WHEN amount = 0 THEN 1 ELSE 0 END) AS zero_count
FROM orders;

-- DQ模板8：格式检查（正则）
SELECT 
  '手机号格式检查' AS check_name,
  COUNT(*) AS error_count
FROM users
WHERE phone IS NOT NULL 
  AND phone NOT REGEXP '^1[3-9][0-9]{9}$';  -- 中国手机号格式

-- DQ模板9：身份证格式检查
SELECT 
  '身份证格式检查' AS check_name,
  COUNT(*) AS error_count
FROM users
WHERE id_card IS NOT NULL
  AND (LENGTH(id_card) NOT IN (15, 18)  -- 15位或18位
       OR id_card NOT REGEXP '^[0-9X]{15,18}$');`
        },
        {
          emoji: "⏰",
          title: "及时性检查（Timeliness）",
          desc: "检查数据延迟、更新频率",
          detail: "监控数据是否按时更新，避免使用过期数据",
          code: `-- DQ模板10：数据新鲜度检查（T+1）
SELECT 
  '订单表数据新鲜度检查' AS check_name,
  MAX(dt) AS latest_date,
  DATEDIFF(CURDATE(), MAX(dt)) AS delay_days,
  CASE 
    WHEN DATEDIFF(CURDATE(), MAX(dt)) <= 1 THEN '✅ 正常'
    WHEN DATEDIFF(CURDATE(), MAX(dt)) <= 3 THEN '⚠️ 延迟'
    ELSE '❌ 严重延迟'
  END AS status
FROM dwd_orders;

-- DQ模板11：分区数据完整性检查
SELECT 
  '近7天数据分区检查' AS check_name,
  d.date,
  COALESCE(o.row_count, 0) AS row_count,
  CASE 
    WHEN o.row_count IS NULL THEN '❌ 缺失'
    WHEN o.row_count < 100 THEN '⚠️ 数据量异常'
    ELSE '✅ 正常'
  END AS status
FROM (
  SELECT DATE_SUB(CURDATE(), INTERVAL n DAY) AS date
  FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 
        UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t
) d
LEFT JOIN (
  SELECT dt, COUNT(*) AS row_count FROM dwd_orders GROUP BY dt
) o ON d.date = o.dt
ORDER BY d.date DESC;`
        },
        {
          emoji: "🔢",
          title: "唯一性检查（Uniqueness）",
          desc: "检查主键、唯一键是否真的唯一",
          detail: "防止数据重复导致的指标翻倍",
          code: `-- DQ模板12：主键重复检查
SELECT 
  '订单表主键重复检查' AS check_name,
  order_id,
  COUNT(*) AS duplicate_count
FROM orders
GROUP BY order_id
HAVING COUNT(*) > 1;

-- DQ模板13：唯一键重复检查
SELECT 
  '用户手机号重复检查' AS check_name,
  phone,
  COUNT(*) AS duplicate_count,
  GROUP_CONCAT(user_id) AS user_ids
FROM users
WHERE phone IS NOT NULL
GROUP BY phone
HAVING COUNT(*) > 1;

-- DQ模板14：业务唯一性检查（同一用户同一天只能下一单）
SELECT 
  '用户每日订单唯一性检查' AS check_name,
  user_id,
  DATE(created_at) AS order_date,
  COUNT(*) AS order_count
FROM orders
GROUP BY user_id, DATE(created_at)
HAVING COUNT(*) > 1;`
        },
        {
          emoji: "📊",
          title: "完整DQ检查流程",
          desc: "一键运行所有质量检查，生成质量报告",
          detail: "每日自动化执行，发现问题立即告警",
          code: `-- 完整DQ检查脚本（存储过程）
DELIMITER $$
CREATE PROCEDURE sp_data_quality_check(IN check_date DATE)
BEGIN
  -- 创建DQ结果表
  CREATE TABLE IF NOT EXISTS dq_check_results (
    check_date DATE,
    check_name VARCHAR(100),
    check_type VARCHAR(50),
    error_count INT,
    total_count INT,
    error_rate DECIMAL(5,2),
    status VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  -- 清空今日检查结果
  DELETE FROM dq_check_results WHERE check_date = check_date;
  
  -- 1. 完整性检查
  INSERT INTO dq_check_results (check_date, check_name, check_type, error_count, total_count, error_rate, status)
  SELECT 
    check_date,
    '订单主键NULL检查',
    '完整性',
    COUNT(*),
    (SELECT COUNT(*) FROM orders WHERE dt = check_date),
    ROUND(COUNT(*) / (SELECT COUNT(*) FROM orders WHERE dt = check_date) * 100, 2),
    CASE WHEN COUNT(*) = 0 THEN '✅ 通过' ELSE '❌ 失败' END
  FROM orders 
  WHERE dt = check_date AND order_id IS NULL;
  
  -- 2. 唯一性检查
  INSERT INTO dq_check_results (check_date, check_name, check_type, error_count, total_count, status)
  SELECT 
    check_date,
    '订单主键重复检查',
    '唯一性',
    COUNT(*),
    (SELECT COUNT(DISTINCT order_id) FROM orders WHERE dt = check_date),
    CASE WHEN COUNT(*) = 0 THEN '✅ 通过' ELSE '❌ 失败' END
  FROM (
    SELECT order_id, COUNT(*) AS cnt
    FROM orders WHERE dt = check_date
    GROUP BY order_id HAVING cnt > 1
  ) t;
  
  -- 3. 准确性检查
  INSERT INTO dq_check_results (check_date, check_name, check_type, error_count, total_count, error_rate, status)
  SELECT 
    check_date,
    '订单金额异常检查',
    '准确性',
    SUM(CASE WHEN amount < 0 OR amount > 1000000 THEN 1 ELSE 0 END),
    COUNT(*),
    ROUND(SUM(CASE WHEN amount < 0 OR amount > 1000000 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2),
    CASE WHEN SUM(CASE WHEN amount < 0 OR amount > 1000000 THEN 1 ELSE 0 END) = 0 THEN '✅ 通过' ELSE '⚠️ 警告' END
  FROM orders WHERE dt = check_date;
  
  -- 生成DQ报告
  SELECT 
    check_type,
    COUNT(*) AS check_count,
    SUM(CASE WHEN status = '✅ 通过' THEN 1 ELSE 0 END) AS pass_count,
    SUM(CASE WHEN status LIKE '%失败%' THEN 1 ELSE 0 END) AS fail_count,
    ROUND(SUM(CASE WHEN status = '✅ 通过' THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS pass_rate
  FROM dq_check_results
  WHERE check_date = check_date
  GROUP BY check_type;
END$$
DELIMITER ;

-- 执行DQ检查
CALL sp_data_quality_check(CURDATE());

-- 查看详细结果
SELECT * FROM dq_check_results 
WHERE check_date = CURDATE() 
ORDER BY check_type, check_name;`
        }
      ]
    },
    {
      id: 'data-sampling',
      num: 21,
      title: "数据采样技巧",
      subtitle: "面对亿级数据，全量查询不现实，需要科学抽样",
      color: "from-emerald-500 to-teal-600",
      darkColor: "from-emerald-900 to-teal-900",
      items: [
        {
          emoji: "🎲",
          title: "随机抽样（Simple Random Sampling）",
          desc: "每条记录都有相等的概率被选中",
          detail: "适用于数据分布均匀的场景，快速评估整体趋势",
          code: `-- 方法1：使用RAND()（简单但性能差）
SELECT * FROM orders
ORDER BY RAND()
LIMIT 10000;  -- 抽取1万条

-- 方法2：使用ROW_NUMBER()（推荐，性能好）
SELECT * FROM (
  SELECT *, 
    ROW_NUMBER() OVER (ORDER BY RAND()) AS rn
  FROM orders
) t
WHERE rn <= 10000;

-- 方法3：使用TABLESAMPLE（MySQL 8.0.16+，最快）
-- 注意：TABLESAMPLE抽取的是数据页，不是精确行数
SELECT * FROM orders TABLESAMPLE SYSTEM(1);  -- 抽取约1%的数据页

-- 方法4：按ID取模（确定性抽样，可复现）
SELECT * FROM orders
WHERE order_id % 100 < 10;  -- 抽取约10%

-- 方法5：固定种子的随机抽样（可复现）
SELECT * FROM (
  SELECT *, 
    ROW_NUMBER() OVER (ORDER BY MD5(CONCAT(order_id, '2024'))) AS rn,
    COUNT(*) OVER () AS total
  FROM orders
) t
WHERE rn <= total * 0.1;  -- 抽取10%`
        },
        {
          emoji: "📊",
          title: "分层抽样（Stratified Sampling）",
          desc: "按照某个特征（如城市、类别）分组，每组独立抽样",
          detail: "保证各子群体都有代表性，适用于数据分布不均的场景",
          code: `-- 场景：确保每个城市都有足够样本
-- 每个城市抽取1000条订单
WITH city_sample AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY RAND()) AS rn
  FROM orders
)
SELECT * FROM city_sample
WHERE rn <= 1000;

-- 按比例分层抽样（每个城市抽10%）
WITH city_stats AS (
  SELECT 
    *,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY RAND()) AS rn,
    COUNT(*) OVER (PARTITION BY city) AS city_total
  FROM orders
)
SELECT * FROM city_stats
WHERE rn <= city_total * 0.1;

-- 多维度分层抽样（按城市+产品类别）
WITH multi_strata AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY city, product_category 
      ORDER BY RAND()
    ) AS rn
  FROM orders
)
SELECT * FROM multi_strata
WHERE rn <= 500;  -- 每个组合抽500条`
        },
        {
          emoji: "🔢",
          title: "系统抽样（Systematic Sampling）",
          desc: "每隔N条记录取1条，简单高效",
          detail: "适用于有序数据，但要注意周期性偏差",
          code: `-- 方法1：每10行取1行
SELECT * FROM (
  SELECT *, 
    ROW_NUMBER() OVER (ORDER BY order_id) AS rn
  FROM orders
) t
WHERE rn % 10 = 0;

-- 方法2：动态计算间隔（抽取指定数量）
SET @target_count = 10000;
SET @total_count = (SELECT COUNT(*) FROM orders);
SET @interval = FLOOR(@total_count / @target_count);

SELECT * FROM (
  SELECT *, 
    ROW_NUMBER() OVER (ORDER BY order_id) AS rn
  FROM orders
) t
WHERE rn % @interval = 0;

-- 方法3：按日期系统抽样（每月1号的数据）
SELECT * FROM orders
WHERE DAY(order_date) = 1;

-- 方法4：按小时系统抽样（每天0点、6点、12点、18点）
SELECT * FROM orders
WHERE HOUR(order_time) IN (0, 6, 12, 18);`
        },
        {
          emoji: "⏰",
          title: "时间窗口抽样",
          desc: "基于时间段的抽样策略",
          detail: "适用于时间序列数据，快速分析趋势",
          code: `-- 场景1：每天随机抽1小时的数据
WITH daily_hour AS (
  SELECT 
    DATE(order_time) AS order_date,
    FLOOR(RAND() * 24) AS sample_hour
  FROM (SELECT DISTINCT DATE(order_time) FROM orders) t
)
SELECT o.*
FROM orders o
JOIN daily_hour dh 
  ON DATE(o.order_time) = dh.order_date
  AND HOUR(o.order_time) = dh.sample_hour;

-- 场景2：每周抽1天
SELECT * FROM orders
WHERE WEEKDAY(order_date) = 2;  -- 每周三

-- 场景3：滑动窗口抽样（最近7天每天抽1000条）
WITH recent_days AS (
  SELECT DATE_SUB(CURDATE(), INTERVAL n DAY) AS sample_date
  FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 
        UNION SELECT 4 UNION SELECT 5 UNION SELECT 6) t
),
daily_sample AS (
  SELECT o.*,
    ROW_NUMBER() OVER (
      PARTITION BY DATE(o.order_time) 
      ORDER BY RAND()
    ) AS rn
  FROM orders o
  JOIN recent_days rd ON DATE(o.order_time) = rd.sample_date
)
SELECT * FROM daily_sample WHERE rn <= 1000;`
        },
        {
          emoji: "🎯",
          title: "条件抽样（Conditional Sampling）",
          desc: "基于业务条件的智能抽样",
          detail: "优先抽取高价值样本，提升分析效率",
          code: `-- 场景1：高价值订单全量 + 低价值订单抽样
SELECT * FROM orders WHERE amount > 10000  -- 高价值全量
UNION ALL
SELECT * FROM (
  SELECT *, 
    ROW_NUMBER() OVER (ORDER BY RAND()) AS rn
  FROM orders 
  WHERE amount <= 10000
) t WHERE rn <= 5000;  -- 低价值抽5000条

-- 场景2：新用户全量 + 老用户抽样
SELECT o.* FROM orders o
JOIN users u ON o.user_id = u.user_id
WHERE DATEDIFF(CURDATE(), u.register_date) <= 30  -- 新用户全量
UNION ALL
SELECT o.* FROM (
  SELECT o.*, 
    ROW_NUMBER() OVER (ORDER BY RAND()) AS rn
  FROM orders o
  JOIN users u ON o.user_id = u.user_id
  WHERE DATEDIFF(CURDATE(), u.register_date) > 30
) t WHERE rn <= 10000;  -- 老用户抽1万

-- 场景3：异常值优先抽样
SELECT * FROM orders 
WHERE amount < 0 OR amount > 100000  -- 异常值全量
UNION ALL
SELECT * FROM (
  SELECT *, 
    ROW_NUMBER() OVER (ORDER BY RAND()) AS rn
  FROM orders 
  WHERE amount BETWEEN 0 AND 100000
) t WHERE rn <= 10000;  -- 正常值抽样`
        },
        {
          emoji: "📈",
          title: "抽样误差评估与样本量计算",
          desc: "如何确定需要抽多少样本？",
          detail: "基于置信度和误差范围计算最小样本量",
          code: `-- 计算样本量公式（95%置信度，±5%误差）
-- n = (Z² × p × (1-p)) / E²
-- Z=1.96（95%置信度），p=0.5（最保守估计），E=0.05（5%误差）
-- n ≈ 385

-- 实际应用：评估抽样的代表性
WITH population_stats AS (
  SELECT 
    AVG(amount) AS pop_avg,
    STDDEV(amount) AS pop_std,
    COUNT(*) AS pop_count
  FROM orders
),
sample_stats AS (
  SELECT 
    AVG(amount) AS sample_avg,
    STDDEV(amount) AS sample_std,
    COUNT(*) AS sample_count
  FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY RAND()) AS rn
    FROM orders
  ) t WHERE rn <= 10000
)
SELECT 
  p.pop_avg,
  s.sample_avg,
  ABS(p.pop_avg - s.sample_avg) AS avg_diff,
  ABS(p.pop_avg - s.sample_avg) / p.pop_avg * 100 AS error_pct,
  p.pop_std,
  s.sample_std,
  -- 标准误差
  p.pop_std / SQRT(s.sample_count) AS standard_error,
  -- 95%置信区间
  s.sample_avg - 1.96 * (p.pop_std / SQRT(s.sample_count)) AS ci_lower,
  s.sample_avg + 1.96 * (p.pop_std / SQRT(s.sample_count)) AS ci_upper
FROM population_stats p, sample_stats s;

-- 不同样本量的误差对比
SELECT 
  sample_size,
  AVG(amount) AS sample_avg,
  (SELECT AVG(amount) FROM orders) AS pop_avg,
  ABS(AVG(amount) - (SELECT AVG(amount) FROM orders)) / (SELECT AVG(amount) FROM orders) * 100 AS error_pct
FROM (
  SELECT 
    amount,
    CASE 
      WHEN rn <= 100 THEN 100
      WHEN rn <= 1000 THEN 1000
      WHEN rn <= 10000 THEN 10000
      WHEN rn <= 100000 THEN 100000
    END AS sample_size
  FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY RAND()) AS rn
    FROM orders
  ) t
  WHERE rn <= 100000
) t
GROUP BY sample_size
ORDER BY sample_size;`
        }
      ]
    }
  ].slice(0, 1);  // 临时：只取第1个part，定位问题
  
  // 验证数组闭合
  const partsLength = parts.length;

  return (
    <div className={isDark ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-gray-50'}>
      <Navigation />

      {/* 面包屑导航 */}
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
          
          {/* 左侧导航 */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className={`sticky top-24 ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className="text-xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                📖 目录导航
              </h3>
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  const colorMap: Record<string, string> = {
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
                    emerald: 'border-emerald-500 bg-emerald-500/10'
                  }
                  const color = colorMap[item.color] || 'border-gray-500 bg-gray-500/10'
                  
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ` +
                        (isActive
                          ? (color + ' shadow-md')
                          : (isDark ? 'border-transparent hover:bg-gray-700/50' : 'border-transparent hover:bg-gray-100')
                        )
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 min-w-0">
            
            {/* 标题区 */}
            <section id="intro" className="mb-12 scroll-mt-24">
              <div className={`rounded-3xl p-10 shadow-2xl relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' : 'bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700'}`}>
                {/* 装饰性背景 */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-center gap-6">
                  <div className="w-2 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
                  <div>
                    <h1 className="text-6xl font-black text-white mb-3 tracking-tight">
                      MySQL 完整知识体系
                    </h1>
                    <p className="text-2xl text-white/95 font-medium">
                      从0到独立完成企业级数据分析任务 · 21个模块全覆盖
                    </p>
                    <div className="flex gap-4 mt-4">
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        110+ SQL代码
                      </span>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        3600+ 行内容
                      </span>
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        95% 场景覆盖
                      </span>
                    </div>
                  </div>
            </div>
          </div>

              <div className={`mt-6 rounded-xl p-6 border-2 ${isDark ? 'bg-gray-800 border-blue-600' : 'bg-blue-50 border-blue-300'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                  📖 本体系特点
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="text-3xl mb-2">🎯</div>
                    <div className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>实战导向</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      基于MySQL 8.0官方文档、实际业务场景与高频面试考点
                        </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="text-3xl mb-2">🚀</div>
                    <div className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>体系完整</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      覆盖95%企业数据分析场景，☆标注面试/实战最高频内容
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} border-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="text-3xl mb-2">📚</div>
                    <div className={`font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>四维深挖</div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      必须掌握深度 ➜ 典型业务场景 ➜ 易踩坑点 ➜ 可继续深挖
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 21个PART */}
            <div className="space-y-20">
              {parts.map((part, index) => (
                <div key={part.id}>
                  {index > 0 && (
                    <div className={`mb-20 ${isDark ? 'border-t-2 border-gray-700' : 'border-t-2 border-gray-300'}`}></div>
                  )}
                  <section id={part.id} className="scroll-mt-24">
                    <div className={`rounded-3xl p-8 shadow-2xl relative overflow-hidden ${isDark ? 'bg-gradient-to-br ' + part.darkColor : 'bg-gradient-to-br ' + part.color}`}>
                      {/* 装饰性光晕 */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                      
                      <div className="relative flex items-center gap-5">
                      <div className="w-1.5 h-14 bg-gradient-to-b from-white to-white/50 rounded-full shadow-lg"></div>
                      <div className="flex-1">
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
                          PART {part.num.toString().padStart(2, '0')} · {part.title}
                        </h2>
                        <p className="text-lg text-white/95 font-medium">{part.subtitle}</p>
                      </div>
                      {part.entryLink && (
                        <Link 
                          href={part.entryLink}
                          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                            isDark 
                              ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg' 
                              : 'bg-white/90 text-gray-900 hover:bg-white shadow-xl'
                          }`}
                        >
                          📖 进入专题页
                      </Link>
                      )}
                    </div>
                    </div>
                    
                    <div className={`mt-4 rounded-xl p-6 border-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="space-y-3">
                      {part.items.map((item: any, idx: number) => (
                        <div key={idx} className={`p-5 rounded-2xl ${isDark ? 'bg-gray-700/60 hover:bg-gray-700 hover:shadow-xl' : 'bg-white hover:bg-gray-50 hover:shadow-2xl'} transition-all duration-200 border-2 ${isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`}>
                          <div className="flex items-start gap-4">
                            <span className="text-3xl flex-shrink-0 mt-1">{item.emoji}</span>
                            <div className="flex-1">
                              <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                                {item.title}
                              </h4>
                              <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {item.desc}
                              </p>
                              {item.detail && (
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1 pl-3 border-l-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                                  💡 {item.detail}
                                </p>
                              )}
                              {item.code && (
                                <pre className={`mt-3 p-5 rounded-xl overflow-x-auto text-sm ${isDark ? 'bg-gray-950 text-green-400' : 'bg-gray-950 text-green-300'} border-2 ${isDark ? 'border-green-700' : 'border-green-800'} shadow-lg font-mono leading-relaxed`}>
                                  <code>{item.code}</code>
                                </pre>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    </div>
                  </section>
                </div>
              ))}
            </div>

            {/* 页尾总结 */}
            <div className={`mt-12 rounded-xl p-8 border-2 ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                🎉 MySQL 完整知识体系已全部展开 - 21个模块全覆盖
              </h3>
              <div className={`text-sm space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="font-semibold text-center text-xs leading-relaxed">
                  📚 基础12层：环境→DDL→DML→DQL→JOIN→函数→优化→窗口→时序→模板→BI→资源<br/>
                  🚀 高级9模块：分析模板库→SQL可视化→优化实战→Python实践→避坑指南→场景速查→数据仓库→数据质量→数据采样
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>📊 核心统计</h4>
                    <ul className="text-xs space-y-1">
                      <li>• 21个完整模块</li>
                      <li>• 110+ 可复制SQL代码</li>
                      <li>• 3400+ 行实战内容</li>
                    </ul>
          </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-700'}`}>🎓 学习路径</h4>
                    <ul className="text-xs space-y-1">
                      <li>• 7天入门：基础语法</li>
                      <li>• 14天进阶：窗口+优化</li>
                      <li>• 30天实战：独立分析</li>
                    </ul>
        </div>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>✨ 实战能力</h4>
                    <ul className="text-xs space-y-1">
                      <li>• 95%企业场景覆盖</li>
                      <li>• 3s→0.1s性能优化</li>
                      <li>• Python×MySQL集成</li>
                    </ul>
      </div>
    </div>
                <p className={`text-xs text-center mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  💡 从基础到高级，从理论到实战，一站式SQL学习路线 | ☆标注为面试/实战最高频 | 祝你学习顺利！
                </p>
              </div>
            </div>

          </main>
        </div>

        {/* 返回顶部按钮 */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
            }`}
            aria-label="返回顶部"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  )
}