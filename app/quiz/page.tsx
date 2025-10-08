"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Sigma, Layers, ListChecks, FileText, ChevronDown, ChevronUp, Table, FileCode } from "lucide-react"

type CategoryKey = "all" | "window" | "basic" | "business" | "interview"

interface Problem {
  id: string
  title: string
  category: Exclude<CategoryKey, "all">
  difficulty: 1 | 2 | 3 | 4 | 5
  keywords: string[]
  tables: string
  sampleData: string
  expectedOutput: string
  description: string
  sqlSolutions: string[]
  pandasSolutions: string[]
  explanation: string
  dataset?: string  // CSV数据集文件名
}

const categoryMeta: { key: Exclude<CategoryKey, "all">; label: string; icon: any }[] = [
  { key: "window", label: "窗口函数", icon: Layers },
  { key: "basic", label: "基础题", icon: Sigma },
  { key: "business", label: "业务应用", icon: ListChecks },
  { key: "interview", label: "面试常见", icon: FileText },
]

const problems: Problem[] = [
  // ========== 窗口函数题 ==========
  {
    id: "sql-win-1",
    title: "计算每个用户最近一次订单金额",
    category: "window",
    difficulty: 3,
    keywords: ["ROW_NUMBER", "分组排序", "最近记录"],
    tables: `orders(order_id INT, user_id INT, amount DECIMAL, created_at DATETIME)`,
    dataset: "orders.csv",
    sampleData: `| order_id | user_id | amount | created_at          |
|----------|---------|--------|---------------------|
| 1        | 101     | 50.00  | 2024-01-10 10:00:00 |
| 2        | 101     | 80.00  | 2024-01-15 14:30:00 |
| 3        | 102     | 120.00 | 2024-01-12 09:20:00 |
| 4        | 101     | 65.00  | 2024-01-20 16:45:00 |
| 5        | 103     | 200.00 | 2024-01-18 11:10:00 |`,
    expectedOutput: `| user_id | amount |
|---------|--------|
| 101     | 65.00  |
| 102     | 120.00 |
| 103     | 200.00 |`,
    description: "取每个用户最近一单的订单金额",
    sqlSolutions: [
      `-- 解法1：ROW_NUMBER
WITH ranked AS (
  SELECT user_id, amount, created_at,
         ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
)
SELECT user_id, amount
FROM ranked
WHERE rn = 1;`,
      `-- 解法2：子查询
SELECT o1.user_id, o1.amount
FROM orders o1
WHERE o1.created_at = (
  SELECT MAX(created_at) 
  FROM orders o2 
  WHERE o2.user_id = o1.user_id
);`,
    ],
    pandasSolutions: [
      `# 方法1：排序后去重
df_sorted = df.sort_values(['user_id', 'created_at'], ascending=[True, False])
result = df_sorted.drop_duplicates(subset=['user_id'], keep='first')[['user_id', 'amount']]`,
      `# 方法2：groupby + last
result = df.sort_values('created_at').groupby('user_id').last()[['amount']].reset_index()`,
    ],
    explanation: "经典窗口函数应用。ROW_NUMBER 按用户分组、按时间倒序排序，取第1条。注意处理时间相同的情况。",
  },
  {
    id: "sql-win-2",
    title: "计算7日移动平均销售额",
    category: "window",
    difficulty: 3,
    keywords: ["窗口帧", "ROWS", "移动平均"],
    tables: `daily_sales(product_id INT, sale_date DATE, amount DECIMAL)`,
    dataset: "daily_sales.csv",
    sampleData: `| product_id | sale_date  | amount |
|------------|------------|--------|
| 1          | 2024-01-01 | 100    |
| 1          | 2024-01-02 | 120    |
| 1          | 2024-01-03 | 110    |
| 1          | 2024-01-04 | 130    |
| 1          | 2024-01-05 | 140    |
| 1          | 2024-01-06 | 115    |
| 1          | 2024-01-07 | 125    |
| 1          | 2024-01-08 | 135    |`,
    expectedOutput: `| product_id | sale_date  | ma7    |
|------------|------------|--------|
| 1          | 2024-01-01 | 100.00 |
| 1          | 2024-01-02 | 110.00 |
| 1          | 2024-01-03 | 110.00 |
| 1          | 2024-01-04 | 115.00 |
| 1          | 2024-01-05 | 120.00 |
| 1          | 2024-01-06 | 119.17 |
| 1          | 2024-01-07 | 120.00 |
| 1          | 2024-01-08 | 125.00 |`,
    description: "为每个商品计算其销售额的7日移动平均",
    sqlSolutions: [
      `SELECT product_id, sale_date,
       ROUND(AVG(amount) OVER(
         PARTITION BY product_id 
         ORDER BY sale_date
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ), 2) AS ma7
FROM daily_sales;`,
    ],
    pandasSolutions: [
      `df = df.sort_values(['product_id', 'sale_date'])
df['ma7'] = df.groupby('product_id')['amount'].transform(
    lambda x: x.rolling(7, min_periods=1).mean().round(2)
)`,
    ],
    explanation: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW 覆盖当前行和前6行共7天。min_periods=1 保证不足7天也计算。",
  },
  {
    id: "sql-win-3",
    title: "计算每个员工的工资排名（允许并列）",
    category: "window",
    difficulty: 2,
    keywords: ["RANK", "排名", "并列"],
    tables: `employees(emp_id INT, dept_id INT, name VARCHAR, salary DECIMAL)`,
    sampleData: `| emp_id | dept_id | name  | salary |
|--------|---------|-------|--------|
| 1      | 10      | Alice | 8000   |
| 2      | 10      | Bob   | 9000   |
| 3      | 10      | Carol | 9000   |
| 4      | 20      | David | 7500   |
| 5      | 20      | Eve   | 8500   |`,
    expectedOutput: `| emp_id | dept_id | name  | salary | rank_num |
|--------|---------|-------|--------|----------|
| 2      | 10      | Bob   | 9000   | 1        |
| 3      | 10      | Carol | 9000   | 1        |
| 1      | 10      | Alice | 8000   | 3        |
| 5      | 20      | Eve   | 8500   | 1        |
| 4      | 20      | David | 7500   | 2        |`,
    description: "在各部门内按工资降序排名，工资相同排名相同",
    sqlSolutions: [
      `SELECT emp_id, dept_id, name, salary,
       RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rank_num
FROM employees;`,
    ],
    pandasSolutions: [
      `df['rank_num'] = df.groupby('dept_id')['salary'].rank(method='min', ascending=False).astype(int)`,
    ],
    explanation: "RANK() 遇到并列时会跳号（如1,2,2,4），DENSE_RANK() 不跳号（1,2,2,3），ROW_NUMBER() 强制不重复。",
  },
  {
    id: "sql-win-4",
    title: "找出连续登录≥3天的用户",
    category: "window",
    difficulty: 5,
    keywords: ["连续性", "日期差分组", "窗口函数"],
    tables: `user_logins(user_id INT, login_date DATE)`,
    sampleData: `| user_id | login_date |
|---------|------------|
| 1       | 2024-01-01 |
| 1       | 2024-01-02 |
| 1       | 2024-01-03 |
| 1       | 2024-01-05 |
| 2       | 2024-01-01 |
| 2       | 2024-01-03 |
| 3       | 2024-01-10 |
| 3       | 2024-01-11 |
| 3       | 2024-01-12 |
| 3       | 2024-01-13 |`,
    expectedOutput: `| user_id |
|---------|
| 1       |
| 3       |`,
    description: "输出所有连续登录天数≥3的用户ID",
    sqlSolutions: [
      `-- 日期减行号成组法
WITH base AS (
  SELECT DISTINCT user_id, login_date
  FROM user_logins
),
ranked AS (
  SELECT user_id, login_date,
         ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) AS rn
  FROM base
),
grp AS (
  SELECT user_id, login_date,
         DATE_SUB(login_date, INTERVAL rn DAY) AS grp_key
  FROM ranked
),
streaks AS (
  SELECT user_id, grp_key, COUNT(*) AS days
  FROM grp
  GROUP BY user_id, grp_key
)
SELECT DISTINCT user_id
FROM streaks
WHERE days >= 3;`,
    ],
    pandasSolutions: [
      `df = df[['user_id','login_date']].drop_duplicates()
df = df.sort_values(['user_id','login_date'])
df['rn'] = df.groupby('user_id').cumcount()
df['grp_key'] = df['login_date'] - pd.to_timedelta(df['rn'], unit='D')
streaks = df.groupby(['user_id','grp_key']).size()
result = streaks[streaks >= 3].reset_index()['user_id'].unique()`,
    ],
    explanation: "高频面试题！核心技巧：连续日期 - 连续整数 = 常数。先去重、排序、编号，再分组统计。用户1有连续3天(1-2-3)，用户3有连续4天(10-11-12-13)。",
  },

  // ========== 基础题 ==========
  {
    id: "sql-basic-1",
    title: "统计每个省份的用户数量",
    category: "basic",
    difficulty: 1,
    keywords: ["GROUP BY", "COUNT"],
    tables: `users(user_id INT, name VARCHAR, province VARCHAR, created_at DATE)`,
    sampleData: `| user_id | name  | province | created_at |
|---------|-------|----------|------------|
| 1       | 张三  | 北京     | 2024-01-01 |
| 2       | 李四  | 上海     | 2024-01-02 |
| 3       | 王五  | 北京     | 2024-01-03 |
| 4       | 赵六  | 广东     | 2024-01-04 |
| 5       | 孙七  | 北京     | 2024-01-05 |
| 6       | 周八  | 上海     | 2024-01-06 |`,
    expectedOutput: `| province | user_cnt |
|----------|----------|
| 北京     | 3        |
| 上海     | 2        |
| 广东     | 1        |`,
    description: "按省份分组统计用户数，按用户数降序",
    sqlSolutions: [
      `SELECT province, COUNT(*) AS user_cnt
FROM users
GROUP BY province
ORDER BY user_cnt DESC;`,
    ],
    pandasSolutions: [
      `result = df.groupby('province').size().sort_values(ascending=False).rename('user_cnt').reset_index()`,
    ],
    explanation: "最基础的分组统计。注意NULL省份的处理因数据库而异。",
  },
  {
    id: "sql-basic-2",
    title: "找出销售额Top3的商品",
    category: "basic",
    difficulty: 2,
    keywords: ["聚合", "LIMIT", "排序"],
    tables: `orders(order_id INT, product_id INT, amount DECIMAL, order_date DATE)`,
    sampleData: `| order_id | product_id | amount | order_date |
|----------|------------|--------|------------|
| 1        | 101        | 100    | 2024-01-01 |
| 2        | 102        | 250    | 2024-01-02 |
| 3        | 101        | 150    | 2024-01-03 |
| 4        | 103        | 300    | 2024-01-04 |
| 5        | 102        | 200    | 2024-01-05 |
| 6        | 101        | 180    | 2024-01-06 |
| 7        | 104        | 120    | 2024-01-07 |`,
    expectedOutput: `| product_id | total_sales |
|------------|-------------|
| 102        | 450         |
| 101        | 430         |
| 103        | 300         |`,
    description: "统计每个商品总销售额，取前3名",
    sqlSolutions: [
      `SELECT product_id, SUM(amount) AS total_sales
FROM orders
GROUP BY product_id
ORDER BY total_sales DESC
LIMIT 3;`,
    ],
    pandasSolutions: [
      `result = df.groupby('product_id')['amount'].sum().nlargest(3).rename('total_sales').reset_index()`,
    ],
    explanation: "先聚合后排序再限制行数。nlargest更简洁。商品102总销售450，101总销售430，103总销售300。",
  },
  {
    id: "sql-basic-3",
    title: "找出既买过A又买过B的用户",
    category: "basic",
    difficulty: 3,
    keywords: ["HAVING", "IN", "交集"],
    tables: `orders(order_id INT, user_id INT, product_id INT)`,
    sampleData: `| order_id | user_id | product_id |
|----------|---------|------------|
| 1        | 1       | 1          |
| 2        | 1       | 2          |
| 3        | 2       | 1          |
| 4        | 3       | 2          |
| 5        | 4       | 1          |
| 6        | 4       | 2          |
| 7        | 4       | 3          |`,
    expectedOutput: `| user_id |
|---------|
| 1       |
| 4       |`,
    description: "找出同时购买过product_id=1和product_id=2的用户",
    sqlSolutions: [
      `-- 解法1：HAVING COUNT DISTINCT
SELECT user_id
FROM orders
WHERE product_id IN (1, 2)
GROUP BY user_id
HAVING COUNT(DISTINCT product_id) = 2;`,
      `-- 解法2：INTERSECT
SELECT DISTINCT user_id FROM orders WHERE product_id = 1
INTERSECT
SELECT DISTINCT user_id FROM orders WHERE product_id = 2;`,
    ],
    pandasSolutions: [
      `# 方法1：集合交集
set1 = set(df[df['product_id']==1]['user_id'])
set2 = set(df[df['product_id']==2]['user_id'])
result = pd.Series(list(set1 & set2), name='user_id')`,
      `# 方法2：groupby nunique
temp = df[df['product_id'].isin([1,2])].groupby('user_id')['product_id'].nunique()
result = temp[temp==2].index.to_series(name='user_id')`,
    ],
    explanation: "HAVING过滤分组后结果。确保用DISTINCT避免重复购买影响。用户1买过1和2，用户4也买过1和2。",
  },
  {
    id: "sql-basic-4",
    title: "LEFT JOIN 找出未下单用户",
    category: "basic",
    difficulty: 2,
    keywords: ["LEFT JOIN", "NULL检查", "反连接"],
    tables: `users(user_id INT, name VARCHAR)\norders(order_id INT, user_id INT)`,
    sampleData: `users表:
| user_id | name  |
|---------|-------|
| 1       | Alice |
| 2       | Bob   |
| 3       | Carol |
| 4       | David |

orders表:
| order_id | user_id |
|----------|---------|
| 101      | 1       |
| 102      | 1       |
| 103      | 3       |`,
    expectedOutput: `| user_id | name  |
|---------|-------|
| 2       | Bob   |
| 4       | David |`,
    description: "找出注册了但从未下过单的用户",
    sqlSolutions: [
      `-- 解法1：LEFT JOIN + NULL
SELECT u.user_id, u.name
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.user_id IS NULL;`,
      `-- 解法2：NOT EXISTS
SELECT user_id, name
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.user_id
);`,
      `-- 解法3：NOT IN（注意NULL问题）
SELECT user_id, name
FROM users
WHERE user_id NOT IN (SELECT user_id FROM orders WHERE user_id IS NOT NULL);`,
    ],
    pandasSolutions: [
      `# 方法1：isin
ordered = set(orders['user_id'].dropna())
result = users[~users['user_id'].isin(ordered)]`,
      `# 方法2：merge indicator
result = users.merge(orders[['user_id']], on='user_id', how='left', indicator=True)
result = result[result['_merge']=='left_only'][['user_id', 'name']]`,
    ],
    explanation: "反连接的三种实现。NOT IN要注意NULL陷阱，建议用NOT EXISTS或LEFT JOIN。用户2和4从未下单。",
  },

  // ========== 业务应用题 ==========
  {
    id: "sql-biz-1",
    title: "计算用户留存率（次日留存）",
    category: "business",
    difficulty: 4,
    keywords: ["留存", "自连接", "日期计算"],
    tables: `user_logins(user_id INT, login_date DATE)`,
    sampleData: `| user_id | login_date |
|---------|------------|
| 1       | 2024-01-01 |
| 1       | 2024-01-02 |
| 2       | 2024-01-01 |
| 3       | 2024-01-01 |
| 3       | 2024-01-02 |
| 4       | 2024-01-02 |
| 4       | 2024-01-03 |`,
    expectedOutput: `| first_date | total_users | retained_users | retention_rate |
|------------|-------------|----------------|----------------|
| 2024-01-01 | 3           | 2              | 66.67          |
| 2024-01-02 | 1           | 1              | 100.00         |`,
    description: "计算每个注册日的用户在次日的留存率",
    sqlSolutions: [
      `WITH first_login AS (
  SELECT user_id, MIN(login_date) AS first_date
  FROM user_logins
  GROUP BY user_id
),
next_day AS (
  SELECT f.first_date, f.user_id,
         CASE WHEN l.login_date IS NOT NULL THEN 1 ELSE 0 END AS retained
  FROM first_login f
  LEFT JOIN user_logins l 
    ON f.user_id = l.user_id 
    AND l.login_date = DATE_ADD(f.first_date, INTERVAL 1 DAY)
)
SELECT first_date,
       COUNT(*) AS total_users,
       SUM(retained) AS retained_users,
       ROUND(100.0 * SUM(retained) / COUNT(*), 2) AS retention_rate
FROM next_day
GROUP BY first_date;`,
    ],
    pandasSolutions: [
      `first_login = df.groupby('user_id')['login_date'].min().rename('first_date').reset_index()
first_login['next_date'] = first_login['first_date'] + pd.Timedelta(days=1)
merged = first_login.merge(df, left_on=['user_id','next_date'], right_on=['user_id','login_date'], how='left')
merged['retained'] = merged['login_date'].notna().astype(int)
result = merged.groupby('first_date').agg(
    total_users=('user_id', 'count'),
    retained_users=('retained', 'sum')
)
result['retention_rate'] = round(100 * result['retained_users'] / result['total_users'], 2)`,
    ],
    explanation: "留存分析核心：找首次时间，自连接次日数据，计算占比。1月1日新增3人(1,2,3)，次日回来2人(1,3)，留存率66.67%。",
  },
  {
    id: "sql-biz-2",
    title: "RFM模型用户分层",
    category: "business",
    difficulty: 5,
    keywords: ["RFM", "用户分层", "NTILE"],
    tables: `orders(order_id INT, user_id INT, amount DECIMAL, order_date DATE)`,
    sampleData: `| order_id | user_id | amount | order_date |
|----------|---------|--------|------------|
| 1        | 1       | 100    | 2024-01-01 |
| 2        | 1       | 150    | 2024-01-15 |
| 3        | 2       | 200    | 2024-01-20 |
| 4        | 3       | 50     | 2024-01-05 |
| 5        | 3       | 80     | 2024-01-10 |
| 6        | 3       | 120    | 2024-01-25 |
| 7        | 4       | 500    | 2024-01-30 |

假设当前日期：2024-02-01`,
    expectedOutput: `| user_id | recency | frequency | monetary | R_score | F_score | M_score |
|---------|---------|-----------|----------|---------|---------|---------|
| 1       | 17      | 2         | 250      | 3       | 3       | 3       |
| 2       | 12      | 1         | 200      | 4       | 2       | 2       |
| 3       | 7       | 3         | 250      | 5       | 4       | 3       |
| 4       | 2       | 1         | 500      | 5       | 2       | 5       |`,
    description: "计算每个用户的R（最近一次）、F（频次）、M（金额），并分5档",
    sqlSolutions: [
      `WITH rfm_raw AS (
  SELECT user_id,
         DATEDIFF('2024-02-01', MAX(order_date)) AS recency,
         COUNT(*) AS frequency,
         SUM(amount) AS monetary
  FROM orders
  GROUP BY user_id
)
SELECT user_id, recency, frequency, monetary,
       NTILE(5) OVER(ORDER BY recency ASC) AS R_score,
       NTILE(5) OVER(ORDER BY frequency DESC) AS F_score,
       NTILE(5) OVER(ORDER BY monetary DESC) AS M_score
FROM rfm_raw;`,
    ],
    pandasSolutions: [
      `current_date = pd.Timestamp('2024-02-01')
rfm = df.groupby('user_id').agg(
    recency=('order_date', lambda x: (current_date - x.max()).days),
    frequency=('order_id', 'count'),
    monetary=('amount', 'sum')
).reset_index()
rfm['R_score'] = pd.qcut(rfm['recency'], 5, labels=range(5,0,-1), duplicates='drop')
rfm['F_score'] = pd.qcut(rfm['frequency'], 5, labels=range(1,6), duplicates='drop')
rfm['M_score'] = pd.qcut(rfm['monetary'], 5, labels=range(1,6), duplicates='drop')`,
    ],
    explanation: "RFM是用户价值分层经典模型。R越小越好（最近），F和M越大越好。NTILE分档，qcut等频分箱。用户4最近消费(R=5)且金额最高(M=5)是高价值用户。",
  },

  // ========== 面试常见题 ==========
  {
    id: "sql-interview-1",
    title: "第N高的薪水",
    category: "interview",
    difficulty: 3,
    keywords: ["排名", "DENSE_RANK", "去重"],
    tables: `employees(emp_id INT, name VARCHAR, salary DECIMAL)`,
    sampleData: `| emp_id | name  | salary |
|--------|-------|--------|
| 1      | Alice | 8000   |
| 2      | Bob   | 9000   |
| 3      | Carol | 7000   |
| 4      | David | 9000   |
| 5      | Eve   | 8500   |`,
    expectedOutput: `第2高薪水：8500
（如果求第1高则是9000，第3高则是8000）`,
    description: "找出第2高的薪水，如果不存在返回NULL",
    sqlSolutions: [
      `-- 解法1：LIMIT OFFSET
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`,
      `-- 解法2：DENSE_RANK
SELECT salary
FROM (
  SELECT DISTINCT salary, 
         DENSE_RANK() OVER(ORDER BY salary DESC) AS rk
  FROM employees
) t
WHERE rk = 2
LIMIT 1;`,
    ],
    pandasSolutions: [
      `# 方法1：nlargest
result = df['salary'].nlargest(2).iloc[-1] if len(df['salary'].unique()) >= 2 else None`,
      `# 方法2：rank
df['rk'] = df['salary'].rank(method='dense', ascending=False)
result = df[df['rk']==2]['salary'].iloc[0] if 2 in df['rk'].values else None`,
    ],
    explanation: "LeetCode经典题。注意去重、处理不存在的情况。DENSE_RANK更通用，可改N。薪水从高到低：9000(第1), 8500(第2), 8000(第3), 7000(第4)。",
  },
  {
    id: "sql-interview-2",
    title: "部门工资前三高的所有员工",
    category: "interview",
    difficulty: 4,
    keywords: ["分组排名", "DENSE_RANK", "TOP-N"],
    tables: `employees(emp_id INT, dept_id INT, name VARCHAR, salary DECIMAL)`,
    sampleData: `| emp_id | dept_id | name  | salary |
|--------|---------|-------|--------|
| 1      | 1       | Alice | 8000   |
| 2      | 1       | Bob   | 9000   |
| 3      | 1       | Carol | 9000   |
| 4      | 1       | David | 7000   |
| 5      | 1       | Eve   | 8500   |
| 6      | 2       | Frank | 6000   |
| 7      | 2       | Grace | 7500   |
| 8      | 2       | Henry | 7500   |`,
    expectedOutput: `| dept_id | emp_id | name  | salary |
|---------|--------|-------|--------|
| 1       | 2      | Bob   | 9000   |
| 1       | 3      | Carol | 9000   |
| 1       | 5      | Eve   | 8500   |
| 1       | 1      | Alice | 8000   |
| 2       | 7      | Grace | 7500   |
| 2       | 8      | Henry | 7500   |
| 2       | 6      | Frank | 6000   |`,
    description: "每个部门取工资前3高的所有员工（工资相同都保留）",
    sqlSolutions: [
      `WITH ranked AS (
  SELECT emp_id, dept_id, name, salary,
         DENSE_RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) AS rk
  FROM employees
)
SELECT dept_id, emp_id, name, salary
FROM ranked
WHERE rk <= 3
ORDER BY dept_id, salary DESC, emp_id;`,
    ],
    pandasSolutions: [
      `df['rk'] = df.groupby('dept_id')['salary'].rank(method='dense', ascending=False)
result = df[df['rk'] <= 3].sort_values(['dept_id','salary','emp_id'], ascending=[True,False,True])[['dept_id','emp_id','name','salary']]`,
    ],
    explanation: "LeetCode 185题。DENSE_RANK保证排名不跳号，适合取前N。部门1前3档：9000(1档)、8500(2档)、8000(3档)；部门2前3档：7500(1档)、6000(2档)。",
  },
  {
    id: "sql-interview-3",
    title: "上升的温度",
    category: "interview",
    difficulty: 2,
    keywords: ["自连接", "日期比较", "LAG"],
    tables: `weather(id INT, record_date DATE, temperature INT)`,
    sampleData: `| id | record_date | temperature |
|----|-------------|-------------|
| 1  | 2024-01-01  | 10          |
| 2  | 2024-01-02  | 15          |
| 3  | 2024-01-03  | 12          |
| 4  | 2024-01-04  | 18          |
| 5  | 2024-01-06  | 20          |`,
    expectedOutput: `| id |
|----|
| 2  |
| 4  |`,
    description: "找出温度比前一天高的所有日期",
    sqlSolutions: [
      `-- 解法1：自连接
SELECT w1.id
FROM weather w1
INNER JOIN weather w2
  ON w1.record_date = DATE_ADD(w2.record_date, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature;`,
      `-- 解法2：窗口函数
WITH lagged AS (
  SELECT id, record_date, temperature,
         LAG(temperature) OVER(ORDER BY record_date) AS prev_temp,
         LAG(record_date) OVER(ORDER BY record_date) AS prev_date
  FROM weather
)
SELECT id
FROM lagged
WHERE temperature > prev_temp
  AND DATEDIFF(record_date, prev_date) = 1;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('record_date')
df['prev_temp'] = df['temperature'].shift(1)
df['prev_date'] = df['record_date'].shift(1)
df['date_diff'] = (df['record_date'] - df['prev_date']).dt.days
result = df[(df['temperature'] > df['prev_temp']) & (df['date_diff'] == 1)][['id']]`,
    ],
    explanation: "LeetCode 197题。注意日期不一定连续，需检查相差1天。id=2: 15>10(前一天)；id=4: 18>12(前一天)；id=5虽然20>18但不是前一天。",
  },
  {
    id: "sql-interview-4",
    title: "分数排名（无间隙）",
    category: "interview",
    difficulty: 2,
    keywords: ["DENSE_RANK", "排名"],
    tables: `scores(id INT, score DECIMAL)`,
    sampleData: `| id | score |
|----|-------|
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |`,
    expectedOutput: `| score | rank |
|-------|------|
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |`,
    description: "对分数降序排名，相同分数相同排名，排名连续无间隙",
    sqlSolutions: [
      `SELECT score,
       DENSE_RANK() OVER(ORDER BY score DESC) AS rank
FROM scores
ORDER BY score DESC;`,
    ],
    pandasSolutions: [
      `df['rank'] = df['score'].rank(method='dense', ascending=False).astype(int)
result = df[['score', 'rank']].sort_values('score', ascending=False)`,
    ],
    explanation: "LeetCode 178题。DENSE_RANK排名连续（1,2,2,3），RANK会跳号（1,2,2,4）。分数4.00排名1，3.85排名2，3.65排名3。",
  },
  
  // ========== 新增10题 ==========
  {
    id: "sql-win-5",
    title: "计算同比增长率",
    category: "window",
    difficulty: 4,
    keywords: ["LAG", "同比", "增长率"],
    tables: `monthly_sales(sale_month DATE, amount DECIMAL)`,
    sampleData: `| sale_month | amount |
|------------|--------|
| 2023-01-01 | 10000  |
| 2023-02-01 | 12000  |
| 2023-03-01 | 11000  |
| 2024-01-01 | 15000  |
| 2024-02-01 | 16000  |
| 2024-03-01 | 14000  |`,
    expectedOutput: `| sale_month | amount | yoy_growth |
|------------|--------|------------|
| 2023-01-01 | 10000  | NULL       |
| 2023-02-01 | 12000  | NULL       |
| 2023-03-01 | 11000  | NULL       |
| 2024-01-01 | 15000  | 50.00      |
| 2024-02-01 | 16000  | 33.33      |
| 2024-03-01 | 14000  | 27.27      |`,
    description: "计算每月销售额相比去年同期的增长率（百分比）",
    sqlSolutions: [
      `SELECT sale_month, amount,
       ROUND(100.0 * (amount - LAG(amount, 12) OVER(ORDER BY sale_month)) 
             / LAG(amount, 12) OVER(ORDER BY sale_month), 2) AS yoy_growth
FROM monthly_sales
ORDER BY sale_month;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('sale_month')
df['last_year'] = df['amount'].shift(12)
df['yoy_growth'] = round(100 * (df['amount'] - df['last_year']) / df['last_year'], 2)
result = df[['sale_month', 'amount', 'yoy_growth']]`,
    ],
    explanation: "同比YoY：与去年同期比较。LAG(amount, 12)取12个月前的值。2024年1月15000比2023年1月10000增长50%。",
  },
  {
    id: "sql-basic-5",
    title: "计算每月新增用户数",
    category: "basic",
    difficulty: 2,
    keywords: ["DATE_FORMAT", "GROUP BY", "时间截断"],
    tables: `users(user_id INT, name VARCHAR, created_at DATETIME)`,
    sampleData: `| user_id | name  | created_at          |
|---------|-------|---------------------|
| 1       | Alice | 2024-01-15 10:00:00 |
| 2       | Bob   | 2024-01-20 14:30:00 |
| 3       | Carol | 2024-02-05 09:15:00 |
| 4       | David | 2024-02-18 16:45:00 |
| 5       | Eve   | 2024-02-25 11:20:00 |
| 6       | Frank | 2024-03-10 13:50:00 |`,
    expectedOutput: `| month   | new_users |
|---------|-----------|
| 2024-01 | 2         |
| 2024-02 | 3         |
| 2024-03 | 1         |`,
    description: "按月统计新注册用户数",
    sqlSolutions: [
      `-- MySQL
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month,
       COUNT(*) AS new_users
FROM users
GROUP BY month
ORDER BY month;`,
      `-- PostgreSQL
SELECT TO_CHAR(created_at, 'YYYY-MM') AS month,
       COUNT(*) AS new_users
FROM users
GROUP BY month
ORDER BY month;`,
    ],
    pandasSolutions: [
      `df['month'] = df['created_at'].dt.to_period('M').astype(str)
result = df.groupby('month').size().rename('new_users').reset_index()`,
    ],
    explanation: "不同数据库时间格式化函数不同。MySQL用DATE_FORMAT，PostgreSQL用TO_CHAR。Pandas用dt.to_period('M')按月分组。",
  },
  {
    id: "sql-basic-6",
    title: "CASE WHEN 多条件分段",
    category: "basic",
    difficulty: 2,
    keywords: ["CASE WHEN", "条件聚合", "分段统计"],
    tables: `orders(order_id INT, amount DECIMAL, status VARCHAR)`,
    sampleData: `| order_id | amount | status    |
|----------|--------|-----------|
| 1        | 50     | completed |
| 2        | 150    | completed |
| 3        | 80     | cancelled |
| 4        | 300    | completed |
| 5        | 600    | completed |
| 6        | 120    | pending   |`,
    expectedOutput: `| low_orders | mid_orders | high_orders | completed_total |
|------------|------------|-------------|-----------------|
| 1          | 2          | 2           | 4               |

说明：<100为low，100-500为mid，>500为high；只统计completed订单`,
    description: "统计已完成订单的金额分布：<100, 100-500, >500 各多少单",
    sqlSolutions: [
      `SELECT 
  SUM(CASE WHEN amount < 100 THEN 1 ELSE 0 END) AS low_orders,
  SUM(CASE WHEN amount BETWEEN 100 AND 500 THEN 1 ELSE 0 END) AS mid_orders,
  SUM(CASE WHEN amount > 500 THEN 1 ELSE 0 END) AS high_orders,
  COUNT(*) AS completed_total
FROM orders
WHERE status = 'completed';`,
    ],
    pandasSolutions: [
      `completed = df[df['status'] == 'completed']
result = pd.Series({
    'low_orders': (completed['amount'] < 100).sum(),
    'mid_orders': completed['amount'].between(100, 500).sum(),
    'high_orders': (completed['amount'] > 500).sum(),
    'completed_total': len(completed)
})`,
    ],
    explanation: "条件聚合经典模式。CASE WHEN配合SUM实现分段计数。先WHERE筛选completed，再分段统计：50(low)、150和300(mid)、600(high)。",
  },
  {
    id: "sql-basic-7",
    title: "自连接找出经理及其下属",
    category: "basic",
    difficulty: 3,
    keywords: ["自连接", "层级关系"],
    tables: `employees(emp_id INT, name VARCHAR, manager_id INT)`,
    sampleData: `| emp_id | name  | manager_id |
|--------|-------|------------|
| 1      | Alice | NULL       |
| 2      | Bob   | 1          |
| 3      | Carol | 1          |
| 4      | David | 2          |
| 5      | Eve   | 2          |
| 6      | Frank | 3          |`,
    expectedOutput: `| manager_name | subordinate_name |
|--------------|------------------|
| Alice        | Bob              |
| Alice        | Carol            |
| Bob          | David            |
| Bob          | Eve              |
| Carol        | Frank            |`,
    description: "列出每个经理及其直接下属的名字",
    sqlSolutions: [
      `SELECT 
  m.name AS manager_name,
  e.name AS subordinate_name
FROM employees e
INNER JOIN employees m ON e.manager_id = m.emp_id
ORDER BY m.name, e.name;`,
    ],
    pandasSolutions: [
      `result = df.merge(
    df, 
    left_on='manager_id', 
    right_on='emp_id', 
    suffixes=('_sub', '_mgr')
)[['name_mgr', 'name_sub']].rename(columns={
    'name_mgr': 'manager_name',
    'name_sub': 'subordinate_name'
}).sort_values(['manager_name', 'subordinate_name'])`,
    ],
    explanation: "自连接：表与自己关联。e表是下属视角，m表是经理视角。通过e.manager_id = m.emp_id建立关系。Alice管理Bob和Carol，Bob管理David和Eve。",
  },
  {
    id: "sql-win-6",
    title: "计算用户购买间隔天数",
    category: "window",
    difficulty: 3,
    keywords: ["LAG", "日期差", "DATEDIFF"],
    tables: `orders(order_id INT, user_id INT, order_date DATE)`,
    sampleData: `| order_id | user_id | order_date |
|----------|---------|------------|
| 1        | 1       | 2024-01-01 |
| 2        | 1       | 2024-01-05 |
| 3        | 1       | 2024-01-12 |
| 4        | 2       | 2024-01-03 |
| 5        | 2       | 2024-01-20 |
| 6        | 3       | 2024-01-15 |`,
    expectedOutput: `| order_id | user_id | order_date | days_since_last |
|----------|---------|------------|-----------------|
| 1        | 1       | 2024-01-01 | NULL            |
| 2        | 1       | 2024-01-05 | 4               |
| 3        | 1       | 2024-01-12 | 7               |
| 4        | 2       | 2024-01-03 | NULL            |
| 5        | 2       | 2024-01-20 | 17              |
| 6        | 3       | 2024-01-15 | NULL            |`,
    description: "计算每个用户两次购买之间的间隔天数",
    sqlSolutions: [
      `SELECT order_id, user_id, order_date,
       DATEDIFF(order_date, LAG(order_date) OVER(PARTITION BY user_id ORDER BY order_date)) AS days_since_last
FROM orders
ORDER BY user_id, order_date;`,
    ],
    pandasSolutions: [
      `df = df.sort_values(['user_id', 'order_date'])
df['prev_date'] = df.groupby('user_id')['order_date'].shift(1)
df['days_since_last'] = (df['order_date'] - df['prev_date']).dt.days
result = df[['order_id', 'user_id', 'order_date', 'days_since_last']]`,
    ],
    explanation: "LAG获取上一行数据。用户1：首单无间隔，第2单间隔4天(1/5-1/1)，第3单间隔7天(1/12-1/5)。每个用户独立计算。",
  },
  {
    id: "sql-biz-3",
    title: "漏斗转化率分析",
    category: "business",
    difficulty: 4,
    keywords: ["漏斗", "转化率", "CASE WHEN"],
    tables: `user_events(user_id INT, event_type VARCHAR, event_time DATETIME)`,
    sampleData: `| user_id | event_type | event_time          |
|---------|------------|---------------------|
| 1       | visit      | 2024-01-01 10:00:00 |
| 1       | register   | 2024-01-01 10:05:00 |
| 1       | add_cart   | 2024-01-01 10:10:00 |
| 1       | purchase   | 2024-01-01 10:15:00 |
| 2       | visit      | 2024-01-01 11:00:00 |
| 2       | register   | 2024-01-01 11:05:00 |
| 3       | visit      | 2024-01-01 12:00:00 |
| 3       | register   | 2024-01-01 12:05:00 |
| 3       | add_cart   | 2024-01-01 12:10:00 |
| 4       | visit      | 2024-01-01 13:00:00 |`,
    expectedOutput: `| total_visits | registered | added_cart | purchased | reg_rate | cart_rate | purchase_rate |
|--------------|------------|------------|-----------|----------|-----------|---------------|
| 4            | 3          | 2          | 1         | 75.00    | 50.00     | 25.00         |`,
    description: "计算访问→注册→加购→购买各环节人数及转化率",
    sqlSolutions: [
      `WITH funnel AS (
  SELECT 
    COUNT(DISTINCT user_id) AS total_visits,
    COUNT(DISTINCT CASE WHEN event_type = 'register' THEN user_id END) AS registered,
    COUNT(DISTINCT CASE WHEN event_type = 'add_cart' THEN user_id END) AS added_cart,
    COUNT(DISTINCT CASE WHEN event_type = 'purchase' THEN user_id END) AS purchased
  FROM user_events
)
SELECT 
  total_visits, registered, added_cart, purchased,
  ROUND(100.0 * registered / total_visits, 2) AS reg_rate,
  ROUND(100.0 * added_cart / total_visits, 2) AS cart_rate,
  ROUND(100.0 * purchased / total_visits, 2) AS purchase_rate
FROM funnel;`,
    ],
    pandasSolutions: [
      `funnel = {
    'total_visits': df['user_id'].nunique(),
    'registered': df[df['event_type']=='register']['user_id'].nunique(),
    'added_cart': df[df['event_type']=='add_cart']['user_id'].nunique(),
    'purchased': df[df['event_type']=='purchase']['user_id'].nunique()
}
result = pd.Series({
    **funnel,
    'reg_rate': round(100 * funnel['registered'] / funnel['total_visits'], 2),
    'cart_rate': round(100 * funnel['added_cart'] / funnel['total_visits'], 2),
    'purchase_rate': round(100 * funnel['purchased'] / funnel['total_visits'], 2)
})`,
    ],
    explanation: "漏斗分析关注各环节流失。4人访问→3人注册(75%)→2人加购(50%)→1人购买(25%)。用COUNT DISTINCT去重，CASE WHEN筛选事件类型。",
  },
  {
    id: "sql-interview-5",
    title: "删除重复的电子邮箱（保留ID最小）",
    category: "interview",
    difficulty: 3,
    keywords: ["DELETE", "自连接", "去重"],
    tables: `person(id INT PRIMARY KEY, email VARCHAR)`,
    sampleData: `| id | email            |
|----|------------------|
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
| 4  | mary@example.com |
| 5  | bob@example.com  |`,
    expectedOutput: `删除后保留：
| id | email            |
|----|------------------|
| 1  | john@example.com |
| 2  | bob@example.com  |
| 4  | mary@example.com |`,
    description: "保留email相同的记录中id最小的那条，删除其他（仅展示逻辑，Pandas返回清洗后数据）",
    sqlSolutions: [
      `-- 解法1：自连接DELETE
DELETE p1
FROM person p1
INNER JOIN person p2
  ON p1.email = p2.email
  AND p1.id > p2.id;`,
      `-- 解法2：子查询（部分数据库）
DELETE FROM person
WHERE id NOT IN (
  SELECT MIN(id)
  FROM person
  GROUP BY email
);`,
    ],
    pandasSolutions: [
      `# 保留每个email的最小id
result = df.sort_values('id').drop_duplicates(subset=['email'], keep='first')`,
    ],
    explanation: "LeetCode 196题。DELETE自连接技巧：p1.id > p2.id 确保只删除id较大的重复项。john@example.com保留id=1删除3，bob@example.com保留id=2删除5。",
  },
  {
    id: "sql-interview-6",
    title: "查找重复的电子邮箱",
    category: "interview",
    difficulty: 2,
    keywords: ["GROUP BY", "HAVING", "去重"],
    tables: `person(id INT, email VARCHAR)`,
    sampleData: `| id | email            |
|----|------------------|
| 1  | a@example.com    |
| 2  | b@example.com    |
| 3  | a@example.com    |
| 4  | c@example.com    |
| 5  | b@example.com    |
| 6  | b@example.com    |`,
    expectedOutput: `| email         |
|---------------|
| a@example.com |
| b@example.com |`,
    description: "找出所有重复出现的电子邮箱",
    sqlSolutions: [
      `SELECT email
FROM person
GROUP BY email
HAVING COUNT(*) > 1;`,
    ],
    pandasSolutions: [
      `email_counts = df['email'].value_counts()
result = email_counts[email_counts > 1].index.to_series(name='email').reset_index(drop=True)`,
    ],
    explanation: "LeetCode 182题。GROUP BY + HAVING是查找重复的标准方法。a@example.com出现2次，b@example.com出现3次，都是重复邮箱。",
  },
  {
    id: "sql-biz-4",
    title: "计算用户生命周期价值（LTV）",
    category: "business",
    difficulty: 4,
    keywords: ["LTV", "用户价值", "首单时间"],
    tables: `orders(order_id INT, user_id INT, amount DECIMAL, order_date DATE)`,
    sampleData: `| order_id | user_id | amount | order_date |
|----------|---------|--------|------------|
| 1        | 1       | 100    | 2024-01-05 |
| 2        | 1       | 150    | 2024-01-20 |
| 3        | 1       | 80     | 2024-02-10 |
| 4        | 2       | 200    | 2024-01-15 |
| 5        | 2       | 120    | 2024-01-30 |
| 6        | 3       | 500    | 2024-02-01 |`,
    expectedOutput: `| user_id | first_order_date | total_orders | ltv   | days_active |
|---------|------------------|--------------|-------|-------------|
| 1       | 2024-01-05       | 3            | 330   | 36          |
| 2       | 2024-01-15       | 2            | 320   | 15          |
| 3       | 2024-02-01       | 1            | 500   | 0           |`,
    description: "计算每个用户的生命周期价值（总消费）、订单数、活跃天数",
    sqlSolutions: [
      `SELECT 
  user_id,
  MIN(order_date) AS first_order_date,
  COUNT(*) AS total_orders,
  SUM(amount) AS ltv,
  DATEDIFF(MAX(order_date), MIN(order_date)) AS days_active
FROM orders
GROUP BY user_id
ORDER BY ltv DESC;`,
    ],
    pandasSolutions: [
      `result = df.groupby('user_id').agg(
    first_order_date=('order_date', 'min'),
    total_orders=('order_id', 'count'),
    ltv=('amount', 'sum'),
    days_active=('order_date', lambda x: (x.max() - x.min()).days)
).reset_index().sort_values('ltv', ascending=False)`,
    ],
    explanation: "LTV（Life Time Value）是用户总价值。用户1消费330元、3单、活跃36天；用户3虽然单笔最高但只消费1次。业务中LTV是衡量用户价值的关键指标。",
  },
  {
    id: "sql-interview-7",
    title: "交换座位号",
    category: "interview",
    difficulty: 3,
    keywords: ["CASE WHEN", "MOD", "奇偶处理"],
    tables: `seat(id INT, student VARCHAR)`,
    sampleData: `| id | student |
|----|---------|
| 1  | Alice   |
| 2  | Bob     |
| 3  | Carol   |
| 4  | David   |
| 5  | Eve     |`,
    expectedOutput: `| id | student |
|----|---------|
| 1  | Bob     |
| 2  | Alice   |
| 3  | David   |
| 4  | Carol   |
| 5  | Eve     |

说明：相邻学生交换座位，id=1和2交换，3和4交换，5是奇数总数保持不变`,
    description: "相邻学生交换座位，如果总数是奇数，最后一个不变",
    sqlSolutions: [
      `SELECT 
  CASE 
    WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM seat) THEN id
    WHEN id % 2 = 1 THEN id + 1
    ELSE id - 1
  END AS id,
  student
FROM seat
ORDER BY id;`,
    ],
    pandasSolutions: [
      `max_id = df['id'].max()
df['new_id'] = df['id'].apply(lambda x: 
    x if (x % 2 == 1 and x == max_id) else (x+1 if x%2==1 else x-1)
)
result = df[['new_id','student']].rename(columns={'new_id':'id'}).sort_values('id')`,
    ],
    explanation: "LeetCode 626题。关键是处理奇数总数的边界情况。奇数id+1，偶数id-1，但最后一个奇数id(5)保持不变。MOD判断奇偶：1和2交换，3和4交换，5不变。",
  },
  
  // ========== 再增10题（更具代表性） ==========
  {
    id: "sql-win-7",
    title: "计算累计占比（累计百分比）",
    category: "window",
    difficulty: 4,
    keywords: ["累计和", "SUM OVER", "百分比"],
    tables: `products(product_id INT, product_name VARCHAR, sales DECIMAL)`,
    sampleData: `| product_id | product_name | sales  |
|------------|--------------|--------|
| 1          | iPhone       | 50000  |
| 2          | iPad         | 30000  |
| 3          | MacBook      | 25000  |
| 4          | AirPods      | 15000  |
| 5          | Watch        | 10000  |`,
    expectedOutput: `| product_id | product_name | sales  | cumulative_pct |
|------------|--------------|--------|----------------|
| 1          | iPhone       | 50000  | 38.46          |
| 2          | iPad         | 30000  | 61.54          |
| 3          | MacBook      | 25000  | 80.77          |
| 4          | AirPods      | 15000  | 92.31          |
| 5          | Watch        | 10000  | 100.00         |`,
    description: "计算按销售额排序后，每个产品的累计销售占比（帕累托分析）",
    sqlSolutions: [
      `SELECT 
  product_id, product_name, sales,
  ROUND(100.0 * SUM(sales) OVER(ORDER BY sales DESC) 
        / SUM(sales) OVER(), 2) AS cumulative_pct
FROM products
ORDER BY sales DESC;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('sales', ascending=False)
total = df['sales'].sum()
df['cumulative_pct'] = round(100 * df['sales'].cumsum() / total, 2)
result = df[['product_id', 'product_name', 'sales', 'cumulative_pct']]`,
    ],
    explanation: "帕累托分析（二八法则）常用。前2个产品(iPhone+iPad)占61.54%销售额。累计和窗口有ORDER BY，总和窗口无ORDER BY。",
  },
  {
    id: "sql-basic-8",
    title: "透视表：行转列",
    category: "basic",
    difficulty: 3,
    keywords: ["PIVOT", "行转列", "CASE WHEN"],
    tables: `sales(product VARCHAR, quarter VARCHAR, amount DECIMAL)`,
    sampleData: `| product | quarter | amount |
|---------|---------|--------|
| iPhone  | Q1      | 1000   |
| iPhone  | Q2      | 1200   |
| iPad    | Q1      | 800    |
| iPad    | Q2      | 900    |
| Mac     | Q1      | 600    |
| Mac     | Q2      | 700    |`,
    expectedOutput: `| product | Q1   | Q2   |
|---------|------|------|
| iPhone  | 1000 | 1200 |
| iPad    | 800  | 900  |
| Mac     | 600  | 700  |`,
    description: "将季度从行转为列，每个产品一行",
    sqlSolutions: [
      `-- 通用CASE WHEN方法
SELECT product,
  MAX(CASE WHEN quarter = 'Q1' THEN amount END) AS Q1,
  MAX(CASE WHEN quarter = 'Q2' THEN amount END) AS Q2
FROM sales
GROUP BY product
ORDER BY product;`,
      `-- MySQL 8.0+ 专用PIVOT（部分数据库支持）
SELECT * FROM sales
PIVOT (
  MAX(amount)
  FOR quarter IN ('Q1', 'Q2')
) ORDER BY product;`,
    ],
    pandasSolutions: [
      `# 方法1：pivot
result = df.pivot(index='product', columns='quarter', values='amount').reset_index()`,
      `# 方法2：pivot_table
result = df.pivot_table(index='product', columns='quarter', values='amount', aggfunc='max').reset_index()`,
    ],
    explanation: "行转列是数据分析常见需求。CASE WHEN配合聚合函数是通用方法。Pandas的pivot更简洁直观。",
  },
  {
    id: "sql-interview-8",
    title: "树结构：查找所有子节点",
    category: "interview",
    difficulty: 5,
    keywords: ["递归CTE", "树遍历", "层级查询"],
    tables: `categories(id INT, name VARCHAR, parent_id INT)`,
    sampleData: `| id | name       | parent_id |
|----|------------|-----------|
| 1  | 电子产品   | NULL      |
| 2  | 手机       | 1         |
| 3  | 电脑       | 1         |
| 4  | iPhone     | 2         |
| 5  | Android    | 2         |
| 6  | 笔记本     | 3         |
| 7  | 台式机     | 3         |`,
    expectedOutput: `查询"电子产品"(id=1)的所有子节点：
| id | name       | level |
|----|------------|-------|
| 2  | 手机       | 1     |
| 3  | 电脑       | 1     |
| 4  | iPhone     | 2     |
| 5  | Android    | 2     |
| 6  | 笔记本     | 2     |
| 7  | 台式机     | 2     |`,
    description: "查找指定分类的所有子节点（包括子子节点）",
    sqlSolutions: [
      `-- 递归CTE
WITH RECURSIVE tree AS (
  -- 锚点：根节点
  SELECT id, name, parent_id, 0 AS level
  FROM categories
  WHERE id = 1
  
  UNION ALL
  
  -- 递归：查找子节点
  SELECT c.id, c.name, c.parent_id, t.level + 1
  FROM categories c
  INNER JOIN tree t ON c.parent_id = t.id
)
SELECT id, name, level
FROM tree
WHERE level > 0
ORDER BY level, id;`,
    ],
    pandasSolutions: [
      `# 递归查找子节点
def find_children(df, parent_id, level=0):
    children = df[df['parent_id'] == parent_id].copy()
    if len(children) == 0:
        return pd.DataFrame()
    children['level'] = level
    result = children.copy()
    for child_id in children['id']:
        result = pd.concat([result, find_children(df, child_id, level+1)])
    return result

result = find_children(df, 1, 1)[['id', 'name', 'level']]`,
    ],
    explanation: "递归CTE是处理树形结构的标准方法。WITH RECURSIVE定义锚点和递归部分。电子产品→手机/电脑→iPhone/Android/笔记本/台式机。",
  },
  {
    id: "sql-biz-5",
    title: "同期群分析（Cohort Analysis）",
    category: "business",
    difficulty: 5,
    keywords: ["同期群", "留存矩阵", "时间序列"],
    tables: `user_activity(user_id INT, first_active_month DATE, activity_month DATE)`,
    sampleData: `| user_id | first_active_month | activity_month |
|---------|-------------------|----------------|
| 1       | 2024-01-01        | 2024-01-01     |
| 1       | 2024-01-01        | 2024-02-01     |
| 1       | 2024-01-01        | 2024-03-01     |
| 2       | 2024-01-01        | 2024-01-01     |
| 2       | 2024-01-01        | 2024-02-01     |
| 3       | 2024-02-01        | 2024-02-01     |
| 3       | 2024-02-01        | 2024-03-01     |`,
    expectedOutput: `| cohort_month | month_0 | month_1 | month_2 |
|--------------|---------|---------|---------|
| 2024-01      | 2       | 2       | 1       |
| 2024-02      | 1       | 0       | 1       |

说明：2024-01群组2人，M0有2人活跃，M1有2人，M2有1人`,
    description: "按用户首次活跃月份分组，计算各月留存人数",
    sqlSolutions: [
      `SELECT 
  DATE_FORMAT(first_active_month, '%Y-%m') AS cohort_month,
  COUNT(DISTINCT CASE WHEN PERIOD_DIFF(
    DATE_FORMAT(activity_month, '%Y%m'),
    DATE_FORMAT(first_active_month, '%Y%m')
  ) = 0 THEN user_id END) AS month_0,
  COUNT(DISTINCT CASE WHEN PERIOD_DIFF(
    DATE_FORMAT(activity_month, '%Y%m'),
    DATE_FORMAT(first_active_month, '%Y%m')
  ) = 1 THEN user_id END) AS month_1,
  COUNT(DISTINCT CASE WHEN PERIOD_DIFF(
    DATE_FORMAT(activity_month, '%Y%m'),
    DATE_FORMAT(first_active_month, '%Y%m')
  ) = 2 THEN user_id END) AS month_2
FROM user_activity
GROUP BY cohort_month
ORDER BY cohort_month;`,
    ],
    pandasSolutions: [
      `df['cohort_month'] = df['first_active_month'].dt.to_period('M')
df['activity_period'] = df['activity_month'].dt.to_period('M')
df['months_diff'] = (df['activity_period'] - df['cohort_month']).apply(lambda x: x.n)

cohort = df.pivot_table(
    index='cohort_month',
    columns='months_diff',
    values='user_id',
    aggfunc='nunique',
    fill_value=0
).rename(columns=lambda x: f'month_{x}')`,
    ],
    explanation: "同期群分析是用户留存分析的高级方法。按首次活跃时间分组，追踪每群用户在后续月份的活跃情况。PERIOD_DIFF计算月份差。",
  },
  {
    id: "sql-interview-9",
    title: "中位数计算",
    category: "interview",
    difficulty: 4,
    keywords: ["中位数", "MEDIAN", "百分位数"],
    tables: `salaries(emp_id INT, salary DECIMAL)`,
    sampleData: `| emp_id | salary |
|--------|--------|
| 1      | 5000   |
| 2      | 6000   |
| 3      | 7000   |
| 4      | 8000   |
| 5      | 9000   |
| 6      | 15000  |`,
    expectedOutput: `| median_salary |
|---------------|
| 7500          |

说明：排序后中间两个值(7000, 8000)的平均值`,
    description: "计算所有员工薪水的中位数",
    sqlSolutions: [
      `-- 方法1：ROW_NUMBER（通用）
WITH ranked AS (
  SELECT salary,
         ROW_NUMBER() OVER(ORDER BY salary) AS rn,
         COUNT(*) OVER() AS cnt
  FROM salaries
)
SELECT AVG(salary) AS median_salary
FROM ranked
WHERE rn IN (FLOOR((cnt + 1) / 2.0), CEIL((cnt + 1) / 2.0));`,
      `-- 方法2：PERCENTILE_CONT（部分数据库）
SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY salary) AS median_salary
FROM salaries;`,
    ],
    pandasSolutions: [
      `median_salary = df['salary'].median()
result = pd.Series({'median_salary': median_salary})`,
    ],
    explanation: "中位数是统计分析重要指标。奇数个取中间，偶数个取中间两数平均。排序：5000,6000,7000,8000,9000,15000，中位数=(7000+8000)/2=7500。",
  },
  {
    id: "sql-basic-9",
    title: "UNION vs UNION ALL 区别",
    category: "basic",
    difficulty: 2,
    keywords: ["UNION", "集合运算", "去重"],
    tables: `orders_2023(order_id INT, amount DECIMAL)\norders_2024(order_id INT, amount DECIMAL)`,
    sampleData: `orders_2023表:
| order_id | amount |
|----------|--------|
| 1        | 100    |
| 2        | 200    |
| 3        | 150    |

orders_2024表:
| order_id | amount |
|----------|--------|
| 3        | 150    |
| 4        | 300    |
| 5        | 250    |`,
    expectedOutput: `UNION（去重）结果：
| order_id | amount |
|----------|--------|
| 1        | 100    |
| 2        | 200    |
| 3        | 150    |
| 4        | 300    |
| 5        | 250    |

UNION ALL（不去重）结果6行，包含两个order_id=3的记录`,
    description: "合并两年的订单数据，对比UNION和UNION ALL的区别",
    sqlSolutions: [
      `-- UNION：自动去重
SELECT order_id, amount FROM orders_2023
UNION
SELECT order_id, amount FROM orders_2024
ORDER BY order_id;`,
      `-- UNION ALL：保留重复
SELECT order_id, amount FROM orders_2023
UNION ALL
SELECT order_id, amount FROM orders_2024
ORDER BY order_id;`,
    ],
    pandasSolutions: [
      `# UNION：去重
result_union = pd.concat([df_2023, df_2024]).drop_duplicates()`,
      `# UNION ALL：不去重
result_union_all = pd.concat([df_2023, df_2024])`,
    ],
    explanation: "UNION去重（慢），UNION ALL不去重（快）。order_id=3的订单在两表都有，UNION返回5行，UNION ALL返回6行。实际应用：确定无重复时用UNION ALL性能更好。",
  },
  {
    id: "sql-win-8",
    title: "计算移动中位数",
    category: "window",
    difficulty: 5,
    keywords: ["移动中位数", "PERCENTILE_CONT", "复杂窗口"],
    tables: `stock_prices(trade_date DATE, price DECIMAL)`,
    sampleData: `| trade_date | price |
|------------|-------|
| 2024-01-01 | 100   |
| 2024-01-02 | 105   |
| 2024-01-03 | 95    |
| 2024-01-04 | 110   |
| 2024-01-05 | 102   |
| 2024-01-06 | 108   |
| 2024-01-07 | 115   |`,
    expectedOutput: `| trade_date | price | median_3d |
|------------|-------|-----------|
| 2024-01-01 | 100   | 100.00    |
| 2024-01-02 | 105   | 102.50    |
| 2024-01-03 | 95    | 100.00    |
| 2024-01-04 | 110   | 105.00    |
| 2024-01-05 | 102   | 102.00    |
| 2024-01-06 | 108   | 108.00    |
| 2024-01-07 | 115   | 108.00    |`,
    description: "计算股价的3日移动中位数（技术分析指标）",
    sqlSolutions: [
      `-- 使用数组聚合+中位数函数（PostgreSQL示例）
SELECT trade_date, price,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) OVER (
    ORDER BY trade_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS median_3d
FROM stock_prices;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('trade_date')
df['median_3d'] = df['price'].rolling(3, min_periods=1).median()`,
    ],
    explanation: "移动中位数比移动平均更抗异常值。技术分析常用。第4天：前3天价格[105,95,110]，中位数=105。Pandas的rolling().median()简洁。",
  },
  {
    id: "sql-biz-6",
    title: "用户流失预警（沉睡用户）",
    category: "business",
    difficulty: 4,
    keywords: ["流失预警", "日期计算", "用户分层"],
    tables: `user_logins(user_id INT, login_date DATE)`,
    sampleData: `| user_id | login_date |
|---------|------------|
| 1       | 2024-01-01 |
| 1       | 2024-01-15 |
| 2       | 2023-12-01 |
| 2       | 2023-12-15 |
| 3       | 2024-01-20 |
| 3       | 2024-01-25 |
| 4       | 2023-11-01 |

假设当前日期：2024-02-01`,
    expectedOutput: `| user_id | last_login | days_inactive | status        |
|---------|------------|---------------|---------------|
| 1       | 2024-01-15 | 17            | 活跃用户      |
| 2       | 2023-12-15 | 48            | 沉睡用户      |
| 3       | 2024-01-25 | 7             | 活跃用户      |
| 4       | 2023-11-01 | 92            | 流失用户      |

说明：7天内=活跃，7-30天=沉睡，30天以上=流失`,
    description: "识别沉睡和流失用户，按最后登录时间分类",
    sqlSolutions: [
      `WITH last_active AS (
  SELECT user_id, MAX(login_date) AS last_login
  FROM user_logins
  GROUP BY user_id
),
with_status AS (
  SELECT user_id, last_login,
         DATEDIFF('2024-02-01', last_login) AS days_inactive,
         CASE 
           WHEN DATEDIFF('2024-02-01', last_login) <= 7 THEN '活跃用户'
           WHEN DATEDIFF('2024-02-01', last_login) <= 30 THEN '沉睡用户'
           ELSE '流失用户'
         END AS status
  FROM last_active
)
SELECT * FROM with_status
ORDER BY days_inactive;`,
    ],
    pandasSolutions: [
      `current_date = pd.Timestamp('2024-02-01')
last_active = df.groupby('user_id')['login_date'].max().rename('last_login').reset_index()
last_active['days_inactive'] = (current_date - last_active['last_login']).dt.days
last_active['status'] = last_active['days_inactive'].apply(
    lambda x: '活跃用户' if x <= 7 else ('沉睡用户' if x <= 30 else '流失用户')
)
result = last_active.sort_values('days_inactive')`,
    ],
    explanation: "用户生命周期管理关键指标。活跃≤7天、沉睡7-30天、流失>30天。用户2有48天未登录属于沉睡，用户4有92天属于流失，需要召回策略。",
  },
  {
    id: "sql-interview-10",
    title: "找出工资超过经理的员工",
    category: "interview",
    difficulty: 3,
    keywords: ["自连接", "比较查询"],
    tables: `employees(emp_id INT, name VARCHAR, salary DECIMAL, manager_id INT)`,
    sampleData: `| emp_id | name  | salary | manager_id |
|--------|-------|--------|------------|
| 1      | Alice | 10000  | NULL       |
| 2      | Bob   | 8000   | 1          |
| 3      | Carol | 9000   | 1          |
| 4      | David | 7000   | 2          |
| 5      | Eve   | 8500   | 2          |`,
    expectedOutput: `| emp_name | emp_salary | manager_name | manager_salary |
|----------|------------|--------------|----------------|
| Carol    | 9000       | Alice        | 10000          |
| Eve      | 8500       | Bob          | 8000           |

说明：Carol工资9000未超过Alice的10000(不输出)，应为Eve超过Bob`,
    description: "找出工资超过其直接经理的所有员工",
    sqlSolutions: [
      `SELECT 
  e.name AS emp_name,
  e.salary AS emp_salary,
  m.name AS manager_name,
  m.salary AS manager_salary
FROM employees e
INNER JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;`,
    ],
    pandasSolutions: [
      `result = df.merge(
    df,
    left_on='manager_id',
    right_on='emp_id',
    suffixes=('_emp', '_mgr')
)
result = result[result['salary_emp'] > result['salary_mgr']][[
    'name_emp', 'salary_emp', 'name_mgr', 'salary_mgr'
]].rename(columns={
    'name_emp': 'emp_name',
    'salary_emp': 'emp_salary',
    'name_mgr': 'manager_name',
    'salary_mgr': 'manager_salary'
})`,
    ],
    explanation: "LeetCode 181题。自连接比较员工与经理。Eve(8500) > Bob(8000)，输出Eve。Carol(9000)虽高但未超过Alice(10000)。",
  },
  {
    id: "sql-basic-10",
    title: "列转行（反透视）",
    category: "basic",
    difficulty: 3,
    keywords: ["UNPIVOT", "列转行", "UNION ALL"],
    tables: `quarterly_sales(product VARCHAR, Q1 DECIMAL, Q2 DECIMAL, Q3 DECIMAL)`,
    sampleData: `| product | Q1   | Q2   | Q3   |
|---------|------|------|------|
| iPhone  | 1000 | 1200 | 1100 |
| iPad    | 800  | 900  | 850  |`,
    expectedOutput: `| product | quarter | amount |
|---------|---------|--------|
| iPhone  | Q1      | 1000   |
| iPhone  | Q2      | 1200   |
| iPhone  | Q3      | 1100   |
| iPad    | Q1      | 800    |
| iPad    | Q2      | 900    |
| iPad    | Q3      | 850    |`,
    description: "将季度列转为行（反透视，行转列的逆操作）",
    sqlSolutions: [
      `-- 方法1：UNION ALL
SELECT product, 'Q1' AS quarter, Q1 AS amount FROM quarterly_sales
UNION ALL
SELECT product, 'Q2' AS quarter, Q2 AS amount FROM quarterly_sales
UNION ALL
SELECT product, 'Q3' AS quarter, Q3 AS amount FROM quarterly_sales
ORDER BY product, quarter;`,
      `-- 方法2：UNPIVOT（部分数据库支持）
SELECT product, quarter, amount
FROM quarterly_sales
UNPIVOT (
  amount FOR quarter IN (Q1, Q2, Q3)
) ORDER BY product, quarter;`,
    ],
    pandasSolutions: [
      `# melt函数
result = df.melt(
    id_vars=['product'],
    value_vars=['Q1', 'Q2', 'Q3'],
    var_name='quarter',
    value_name='amount'
).sort_values(['product', 'quarter'])`,
    ],
    explanation: "列转行是行转列的逆操作。UNION ALL是通用方法，每列写一个SELECT。Pandas的melt()函数专门用于此场景，简洁高效。",
  },
  
  // ========== 第四批10题 ==========
  {
    id: "sql-win-9",
    title: "计算环比增长率",
    category: "window",
    difficulty: 3,
    keywords: ["LAG", "环比", "MoM"],
    tables: `monthly_revenue(revenue_month DATE, revenue DECIMAL)`,
    sampleData: `| revenue_month | revenue |
|---------------|---------|
| 2024-01-01    | 100000  |
| 2024-02-01    | 120000  |
| 2024-03-01    | 115000  |
| 2024-04-01    | 130000  |
| 2024-05-01    | 135000  |`,
    expectedOutput: `| revenue_month | revenue | mom_growth |
|---------------|---------|------------|
| 2024-01-01    | 100000  | NULL       |
| 2024-02-01    | 120000  | 20.00      |
| 2024-03-01    | 115000  | -4.17      |
| 2024-04-01    | 130000  | 13.04      |
| 2024-05-01    | 135000  | 3.85       |`,
    description: "计算每月收入相比上月的增长率（环比MoM）",
    sqlSolutions: [
      `SELECT revenue_month, revenue,
       ROUND(100.0 * (revenue - LAG(revenue) OVER(ORDER BY revenue_month)) 
             / LAG(revenue) OVER(ORDER BY revenue_month), 2) AS mom_growth
FROM monthly_revenue
ORDER BY revenue_month;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('revenue_month')
df['last_month'] = df['revenue'].shift(1)
df['mom_growth'] = round(100 * (df['revenue'] - df['last_month']) / df['last_month'], 2)
result = df[['revenue_month', 'revenue', 'mom_growth']]`,
    ],
    explanation: "环比MoM（Month over Month）：与上月比较。2月120000比1月100000增长20%，3月115000比2月120000下降4.17%。",
  },
  {
    id: "sql-interview-11",
    title: "体育比赛积分排名",
    category: "interview",
    difficulty: 3,
    keywords: ["聚合", "排序", "COALESCE"],
    tables: `matches(match_id INT, team_id INT, opponent_id INT, goals_scored INT, goals_conceded INT)`,
    sampleData: `| match_id | team_id | opponent_id | goals_scored | goals_conceded |
|----------|---------|-------------|--------------|----------------|
| 1        | 1       | 2           | 3            | 1              |
| 2        | 2       | 1           | 1            | 3              |
| 3        | 1       | 3           | 2            | 2              |
| 4        | 3       | 1           | 2            | 2              |
| 5        | 2       | 3           | 1            | 0              |
| 6        | 3       | 2           | 0            | 1              |

规则：赢=3分，平=1分，输=0分`,
    expectedOutput: `| team_id | matches | wins | draws | losses | points | goal_diff |
|---------|---------|------|-------|--------|--------|-----------|
| 1       | 2       | 1    | 1     | 0      | 4      | 3         |
| 2       | 2       | 1    | 0     | 1      | 3      | 0         |
| 3       | 2       | 0    | 1     | 1      | 1      | -3        |`,
    description: "计算每支球队的积分、胜平负场次和净胜球",
    sqlSolutions: [
      `SELECT team_id,
       COUNT(*) AS matches,
       SUM(CASE WHEN goals_scored > goals_conceded THEN 1 ELSE 0 END) AS wins,
       SUM(CASE WHEN goals_scored = goals_conceded THEN 1 ELSE 0 END) AS draws,
       SUM(CASE WHEN goals_scored < goals_conceded THEN 1 ELSE 0 END) AS losses,
       SUM(CASE 
         WHEN goals_scored > goals_conceded THEN 3
         WHEN goals_scored = goals_conceded THEN 1
         ELSE 0
       END) AS points,
       SUM(goals_scored - goals_conceded) AS goal_diff
FROM matches
GROUP BY team_id
ORDER BY points DESC, goal_diff DESC;`,
    ],
    pandasSolutions: [
      `df['result'] = df.apply(lambda x: 
    'win' if x['goals_scored'] > x['goals_conceded'] else 
    ('draw' if x['goals_scored'] == x['goals_conceded'] else 'loss'), axis=1)
df['points'] = df['result'].map({'win': 3, 'draw': 1, 'loss': 0})
df['goal_diff'] = df['goals_scored'] - df['goals_conceded']

result = df.groupby('team_id').agg(
    matches=('match_id', 'count'),
    wins=('result', lambda x: (x=='win').sum()),
    draws=('result', lambda x: (x=='draw').sum()),
    losses=('result', lambda x: (x=='loss').sum()),
    points=('points', 'sum'),
    goal_diff=('goal_diff', 'sum')
).reset_index().sort_values(['points', 'goal_diff'], ascending=False)`,
    ],
    explanation: "体育积分榜经典问题。队1：1胜1平4分净胜3球；队2：1胜1负3分；队3：1平1负1分净负3球。多重CASE WHEN计算不同结果。",
  },
  {
    id: "sql-basic-11",
    title: "字符串拼接与分组",
    category: "basic",
    difficulty: 2,
    keywords: ["GROUP_CONCAT", "STRING_AGG", "聚合拼接"],
    tables: `student_courses(student_id INT, student_name VARCHAR, course_name VARCHAR)`,
    sampleData: `| student_id | student_name | course_name |
|------------|--------------|-------------|
| 1          | Alice        | Math        |
| 1          | Alice        | Physics     |
| 1          | Alice        | Chemistry   |
| 2          | Bob          | Math        |
| 2          | Bob          | English     |
| 3          | Carol        | Physics     |`,
    expectedOutput: `| student_id | student_name | courses                  | course_count |
|------------|--------------|--------------------------|--------------|
| 1          | Alice        | Chemistry, Math, Physics | 3            |
| 2          | Bob          | English, Math            | 2            |
| 3          | Carol        | Physics                  | 1            |`,
    description: "按学生分组，将所选课程拼接为一个字符串",
    sqlSolutions: [
      `-- MySQL
SELECT student_id, student_name,
       GROUP_CONCAT(course_name ORDER BY course_name) AS courses,
       COUNT(*) AS course_count
FROM student_courses
GROUP BY student_id, student_name
ORDER BY student_id;`,
      `-- PostgreSQL
SELECT student_id, student_name,
       STRING_AGG(course_name, ', ' ORDER BY course_name) AS courses,
       COUNT(*) AS course_count
FROM student_courses
GROUP BY student_id, student_name
ORDER BY student_id;`,
    ],
    pandasSolutions: [
      `result = df.groupby(['student_id', 'student_name']).agg(
    courses=('course_name', lambda x: ', '.join(sorted(x))),
    course_count=('course_name', 'count')
).reset_index()`,
    ],
    explanation: "字符串聚合函数：MySQL用GROUP_CONCAT，PostgreSQL用STRING_AGG。Alice选了3门课拼接为'Chemistry, Math, Physics'。",
  },
  {
    id: "sql-biz-7",
    title: "计算客单价和人均消费",
    category: "business",
    difficulty: 3,
    keywords: ["客单价", "AVG", "业务指标"],
    tables: `orders(order_id INT, user_id INT, amount DECIMAL, order_date DATE)`,
    sampleData: `| order_id | user_id | amount | order_date |
|----------|---------|--------|------------|
| 1        | 1       | 100    | 2024-01-01 |
| 2        | 1       | 150    | 2024-01-05 |
| 3        | 2       | 200    | 2024-01-03 |
| 4        | 3       | 80     | 2024-01-04 |
| 5        | 3       | 120    | 2024-01-06 |
| 6        | 3       | 100    | 2024-01-08 |`,
    expectedOutput: `| total_gmv | total_orders | total_users | avg_order_value | avg_user_value |
|-----------|--------------|-------------|-----------------|----------------|
| 750       | 6            | 3           | 125.00          | 250.00         |

说明：客单价=总GMV/订单数，人均消费=总GMV/用户数`,
    description: "计算总GMV、客单价（平均订单金额）和人均消费金额",
    sqlSolutions: [
      `SELECT 
  SUM(amount) AS total_gmv,
  COUNT(*) AS total_orders,
  COUNT(DISTINCT user_id) AS total_users,
  ROUND(SUM(amount) / COUNT(*), 2) AS avg_order_value,
  ROUND(SUM(amount) / COUNT(DISTINCT user_id), 2) AS avg_user_value
FROM orders;`,
    ],
    pandasSolutions: [
      `result = pd.Series({
    'total_gmv': df['amount'].sum(),
    'total_orders': len(df),
    'total_users': df['user_id'].nunique(),
    'avg_order_value': round(df['amount'].mean(), 2),
    'avg_user_value': round(df['amount'].sum() / df['user_id'].nunique(), 2)
})`,
    ],
    explanation: "电商核心指标。GMV=750，6笔订单，客单价=125；3个用户，人均消费=250。用户1消费250，用户2消费200，用户3消费300。",
  },
  {
    id: "sql-interview-12",
    title: "连续数字序列",
    category: "interview",
    difficulty: 4,
    keywords: ["连续性", "LAG", "分组"],
    tables: `numbers(num INT)`,
    sampleData: `| num |
|-----|
| 1   |
| 2   |
| 3   |
| 5   |
| 6   |
| 7   |
| 8   |
| 10  |`,
    expectedOutput: `| start_num | end_num | count |
|-----------|---------|-------|
| 1         | 3       | 3     |
| 5         | 8       | 4     |
| 10        | 10      | 1     |`,
    description: "找出所有连续数字序列的起始、结束和长度",
    sqlSolutions: [
      `WITH groups AS (
  SELECT num,
         num - ROW_NUMBER() OVER(ORDER BY num) AS grp
  FROM numbers
),
ranges AS (
  SELECT grp,
         MIN(num) AS start_num,
         MAX(num) AS end_num,
         COUNT(*) AS count
  FROM groups
  GROUP BY grp
)
SELECT start_num, end_num, count
FROM ranges
ORDER BY start_num;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('num')
df['rn'] = range(len(df))
df['grp'] = df['num'] - df['rn']
result = df.groupby('grp').agg(
    start_num=('num', 'min'),
    end_num=('num', 'max'),
    count=('num', 'count')
).reset_index(drop=True)`,
    ],
    explanation: "连续数字问题经典解法：num - ROW_NUMBER = 常数。序列[1,2,3]差值都是相同的，可分为一组。[5,6,7,8]是另一组。",
  },
  {
    id: "sql-win-10",
    title: "计算每个类别的占比",
    category: "window",
    difficulty: 3,
    keywords: ["百分比", "SUM OVER", "占比"],
    tables: `category_sales(category VARCHAR, sales DECIMAL)`,
    sampleData: `| category    | sales  |
|-------------|--------|
| Electronics | 50000  |
| Clothing    | 30000  |
| Food        | 15000  |
| Books       | 10000  |
| Sports      | 5000   |`,
    expectedOutput: `| category    | sales  | pct    |
|-------------|--------|--------|
| Electronics | 50000  | 45.45  |
| Clothing    | 30000  | 27.27  |
| Food        | 15000  | 13.64  |
| Books       | 10000  | 9.09   |
| Sports      | 5000   | 4.55   |`,
    description: "计算每个类别销售额占总销售额的百分比",
    sqlSolutions: [
      `SELECT category, sales,
       ROUND(100.0 * sales / SUM(sales) OVER(), 2) AS pct
FROM category_sales
ORDER BY sales DESC;`,
    ],
    pandasSolutions: [
      `df['pct'] = round(100 * df['sales'] / df['sales'].sum(), 2)
result = df.sort_values('sales', ascending=False)`,
    ],
    explanation: "占比计算：当前值/总和*100。Electronics销售50000占总销售110000的45.45%。窗口函数SUM() OVER()计算总和。",
  },
  {
    id: "sql-basic-12",
    title: "多表关联查询",
    category: "basic",
    difficulty: 3,
    keywords: ["INNER JOIN", "多表", "关联"],
    tables: `orders(order_id INT, user_id INT, product_id INT, quantity INT)\nusers(user_id INT, user_name VARCHAR)\nproducts(product_id INT, product_name VARCHAR, price DECIMAL)`,
    sampleData: `orders表:
| order_id | user_id | product_id | quantity |
|----------|---------|------------|----------|
| 1        | 1       | 101        | 2        |
| 2        | 2       | 102        | 1        |
| 3        | 1       | 103        | 3        |

users表:
| user_id | user_name |
|---------|-----------|
| 1       | Alice     |
| 2       | Bob       |

products表:
| product_id | product_name | price |
|------------|--------------|-------|
| 101        | iPhone       | 5000  |
| 102        | iPad         | 3000  |
| 103        | AirPods      | 1000  |`,
    expectedOutput: `| order_id | user_name | product_name | quantity | total_amount |
|----------|-----------|--------------|----------|--------------|
| 1        | Alice     | iPhone       | 2        | 10000        |
| 2        | Bob       | iPad         | 1        | 3000         |
| 3        | Alice     | AirPods      | 3        | 3000         |`,
    description: "关联三张表，计算每笔订单的总金额",
    sqlSolutions: [
      `SELECT 
  o.order_id,
  u.user_name,
  p.product_name,
  o.quantity,
  o.quantity * p.price AS total_amount
FROM orders o
INNER JOIN users u ON o.user_id = u.user_id
INNER JOIN products p ON o.product_id = p.product_id
ORDER BY o.order_id;`,
    ],
    pandasSolutions: [
      `result = orders.merge(users, on='user_id') \\
               .merge(products, on='product_id')
result['total_amount'] = result['quantity'] * result['price']
result = result[['order_id', 'user_name', 'product_name', 'quantity', 'total_amount']]`,
    ],
    explanation: "多表JOIN基础。orders关联users获取用户名，关联products获取价格，计算总金额=数量*单价。订单1：2*5000=10000。",
  },
  {
    id: "sql-biz-8",
    title: "新老客户分析",
    category: "business",
    difficulty: 4,
    keywords: ["新老客户", "首单", "分类"],
    tables: `orders(order_id INT, user_id INT, amount DECIMAL, order_date DATE)`,
    sampleData: `| order_id | user_id | amount | order_date |
|----------|---------|--------|------------|
| 1        | 1       | 100    | 2024-01-05 |
| 2        | 2       | 150    | 2024-01-10 |
| 3        | 1       | 120    | 2024-01-15 |
| 4        | 3       | 200    | 2024-01-20 |
| 5        | 2       | 180    | 2024-01-25 |
| 6        | 1       | 90     | 2024-01-30 |

分析2024年1月16日至31日的订单`,
    expectedOutput: `| period_start | period_end | new_customers | old_customers | new_gmv | old_gmv |
|--------------|------------|---------------|---------------|---------|---------|
| 2024-01-16   | 2024-01-31 | 1             | 2             | 200     | 270     |

说明：期间内首单的是新客户（user_id=3），之前有订单的是老客户（user_id=1,2）`,
    description: "分析指定时间段内新老客户的数量和GMV贡献",
    sqlSolutions: [
      `WITH period_orders AS (
  SELECT *
  FROM orders
  WHERE order_date BETWEEN '2024-01-16' AND '2024-01-31'
),
first_orders AS (
  SELECT user_id, MIN(order_date) AS first_date
  FROM orders
  GROUP BY user_id
),
classified AS (
  SELECT p.*,
         CASE 
           WHEN f.first_date >= '2024-01-16' THEN 'new'
           ELSE 'old'
         END AS customer_type
  FROM period_orders p
  JOIN first_orders f ON p.user_id = f.user_id
)
SELECT 
  '2024-01-16' AS period_start,
  '2024-01-31' AS period_end,
  COUNT(DISTINCT CASE WHEN customer_type = 'new' THEN user_id END) AS new_customers,
  COUNT(DISTINCT CASE WHEN customer_type = 'old' THEN user_id END) AS old_customers,
  SUM(CASE WHEN customer_type = 'new' THEN amount ELSE 0 END) AS new_gmv,
  SUM(CASE WHEN customer_type = 'old' THEN amount ELSE 0 END) AS old_gmv
FROM classified;`,
    ],
    pandasSolutions: [
      `period_start = pd.Timestamp('2024-01-16')
period_end = pd.Timestamp('2024-01-31')
period_orders = df[(df['order_date'] >= period_start) & (df['order_date'] <= period_end)]
first_orders = df.groupby('user_id')['order_date'].min()

period_orders = period_orders.merge(first_orders.rename('first_date'), on='user_id')
period_orders['customer_type'] = period_orders['first_date'].apply(
    lambda x: 'new' if x >= period_start else 'old'
)

result = pd.Series({
    'period_start': period_start,
    'period_end': period_end,
    'new_customers': period_orders[period_orders['customer_type']=='new']['user_id'].nunique(),
    'old_customers': period_orders[period_orders['customer_type']=='old']['user_id'].nunique(),
    'new_gmv': period_orders[period_orders['customer_type']=='new']['amount'].sum(),
    'old_gmv': period_orders[period_orders['customer_type']=='old']['amount'].sum()
})`,
    ],
    explanation: "新老客户分析是运营关键指标。期间内首单=新客户，之前有单=老客户。用户3首单在1/20属新客，用户1、2老客户贡献270。",
  },
  {
    id: "sql-interview-13",
    title: "找出部门人数超过5人的部门",
    category: "interview",
    difficulty: 2,
    keywords: ["HAVING", "COUNT", "过滤"],
    tables: `employees(emp_id INT, name VARCHAR, dept_id INT)`,
    sampleData: `| emp_id | name    | dept_id |
|--------|---------|---------|
| 1      | Alice   | 1       |
| 2      | Bob     | 1       |
| 3      | Carol   | 2       |
| 4      | David   | 1       |
| 5      | Eve     | 2       |
| 6      | Frank   | 1       |
| 7      | Grace   | 1       |
| 8      | Henry   | 2       |
| 9      | Ivy     | 3       |
| 10     | Jack    | 1       |`,
    expectedOutput: `| dept_id | emp_count |
|---------|-----------|
| 1       | 6         |`,
    description: "找出员工数量至少为5人的部门",
    sqlSolutions: [
      `SELECT dept_id, COUNT(*) AS emp_count
FROM employees
GROUP BY dept_id
HAVING COUNT(*) >= 5
ORDER BY emp_count DESC;`,
    ],
    pandasSolutions: [
      `dept_counts = df.groupby('dept_id').size().rename('emp_count').reset_index()
result = dept_counts[dept_counts['emp_count'] >= 5]`,
    ],
    explanation: "LeetCode 1084题变体。HAVING用于过滤分组后的结果。部门1有6人符合条件，部门2有3人、部门3有1人不符合。",
  },
  {
    id: "sql-win-11",
    title: "计算每日新增与累计用户",
    category: "window",
    difficulty: 3,
    keywords: ["累计", "去重", "日期分组"],
    tables: `user_registrations(user_id INT, reg_date DATE)`,
    sampleData: `| user_id | reg_date   |
|---------|------------|
| 1       | 2024-01-01 |
| 2       | 2024-01-01 |
| 3       | 2024-01-02 |
| 4       | 2024-01-03 |
| 5       | 2024-01-03 |
| 6       | 2024-01-03 |
| 7       | 2024-01-04 |`,
    expectedOutput: `| reg_date   | daily_new | cumulative_total |
|------------|-----------|------------------|
| 2024-01-01 | 2         | 2                |
| 2024-01-02 | 1         | 3                |
| 2024-01-03 | 3         | 6                |
| 2024-01-04 | 1         | 7                |`,
    description: "统计每日新增用户数和累计总用户数",
    sqlSolutions: [
      `WITH daily AS (
  SELECT reg_date, COUNT(*) AS daily_new
  FROM user_registrations
  GROUP BY reg_date
)
SELECT reg_date, daily_new,
       SUM(daily_new) OVER(ORDER BY reg_date) AS cumulative_total
FROM daily
ORDER BY reg_date;`,
    ],
    pandasSolutions: [
      `daily = df.groupby('reg_date').size().rename('daily_new').reset_index()
daily = daily.sort_values('reg_date')
daily['cumulative_total'] = daily['daily_new'].cumsum()`,
    ],
    explanation: "增长趋势分析。每日新增：1/1有2人，1/2有1人，1/3有3人。累计总数：通过SUM() OVER窗口或cumsum()计算。",
  },
  
  // ========== 第五批10题（最终批次） ==========
  {
    id: "sql-interview-14",
    title: "大陆问题（岛屿数量SQL版）",
    category: "interview",
    difficulty: 5,
    keywords: ["递归CTE", "图遍历", "连通分量"],
    tables: `grid(row_num INT, col_num INT, value INT)`,
    sampleData: `| row_num | col_num | value |
|---------|---------|-------|
| 1       | 1       | 1     |
| 1       | 2       | 1     |
| 1       | 3       | 0     |
| 2       | 1       | 1     |
| 2       | 2       | 0     |
| 2       | 3       | 1     |
| 3       | 1       | 0     |
| 3       | 2       | 1     |
| 3       | 3       | 1     |

说明：1代表陆地，0代表水，上下左右相邻的1属于同一岛屿`,
    expectedOutput: `| island_count |
|--------------|
| 3            |

说明：(1,1)(1,2)(2,1)是岛1，(2,3)是岛2，(3,2)(3,3)是岛3`,
    description: "计算网格中岛屿的数量（相邻1的连通分量）",
    sqlSolutions: [
      `-- 使用递归CTE（简化版，实际需要更复杂的逻辑）
WITH RECURSIVE islands AS (
  SELECT row_num, col_num, value,
         ROW_NUMBER() OVER(ORDER BY row_num, col_num) AS cell_id
  FROM grid
  WHERE value = 1
)
-- 实际实现需要并查集或BFS，SQL较复杂
-- 此处展示思路：标记连通分量
SELECT COUNT(DISTINCT island_id) AS island_count
FROM (
  -- 需要复杂的连通性判断逻辑
  SELECT * FROM islands
) grouped;`,
    ],
    pandasSolutions: [
      `# 使用DFS标记岛屿
def count_islands(grid_df):
    grid = grid_df.pivot(index='row_num', columns='col_num', values='value').fillna(0).astype(int)
    visited = set()
    count = 0
    
    def dfs(r, c):
        if (r, c) in visited or r < 0 or r >= len(grid) or c < 0 or c >= len(grid.columns):
            return
        if grid.iloc[r, c] == 0:
            return
        visited.add((r, c))
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for r in range(len(grid)):
        for c in range(len(grid.columns)):
            if grid.iloc[r, c] == 1 and (r, c) not in visited:
                dfs(r, c)
                count += 1
    return count

result = count_islands(df)`,
    ],
    explanation: "图论经典问题。SQL实现困难，需要递归CTE模拟BFS/DFS。Pandas可用递归标记。此题展示SQL在图算法上的局限性。",
  },
  {
    id: "sql-biz-9",
    title: "AB测试结果分析",
    category: "business",
    difficulty: 4,
    keywords: ["AB测试", "转化率", "假设检验"],
    tables: `ab_test(user_id INT, group_name VARCHAR, converted INT)`,
    sampleData: `| user_id | group_name | converted |
|---------|------------|-----------|
| 1       | A          | 1         |
| 2       | A          | 0         |
| 3       | A          | 1         |
| 4       | A          | 0         |
| 5       | A          | 1         |
| 6       | B          | 1         |
| 7       | B          | 1         |
| 8       | B          | 0         |
| 9       | B          | 1         |
| 10      | B          | 1         |

说明：converted=1表示转化，0表示未转化`,
    expectedOutput: `| group_name | total_users | conversions | conversion_rate |
|------------|-------------|-------------|-----------------|
| A          | 5           | 3           | 60.00           |
| B          | 5           | 4           | 80.00           |`,
    description: "分析AB测试两组的转化率",
    sqlSolutions: [
      `SELECT 
  group_name,
  COUNT(*) AS total_users,
  SUM(converted) AS conversions,
  ROUND(100.0 * SUM(converted) / COUNT(*), 2) AS conversion_rate
FROM ab_test
GROUP BY group_name
ORDER BY group_name;`,
    ],
    pandasSolutions: [
      `result = df.groupby('group_name').agg(
    total_users=('user_id', 'count'),
    conversions=('converted', 'sum')
).reset_index()
result['conversion_rate'] = round(100 * result['conversions'] / result['total_users'], 2)`,
    ],
    explanation: "AB测试是产品优化关键方法。A组转化率60%，B组80%。实际需要统计显著性检验（如卡方检验）判断差异是否显著。",
  },
  {
    id: "sql-win-12",
    title: "计算用户活跃天数占比",
    category: "window",
    difficulty: 4,
    keywords: ["活跃度", "COUNT DISTINCT", "日期范围"],
    tables: `user_activity(user_id INT, activity_date DATE)`,
    sampleData: `| user_id | activity_date |
|---------|---------------|
| 1       | 2024-01-01    |
| 1       | 2024-01-05    |
| 1       | 2024-01-10    |
| 2       | 2024-01-02    |
| 2       | 2024-01-03    |
| 2       | 2024-01-04    |
| 2       | 2024-01-05    |
| 3       | 2024-01-15    |

分析时间段：2024-01-01 到 2024-01-15（共15天）`,
    expectedOutput: `| user_id | active_days | total_days | activity_rate |
|---------|-------------|------------|---------------|
| 1       | 3           | 15         | 20.00         |
| 2       | 4           | 15         | 26.67         |
| 3       | 1           | 15         | 6.67          |`,
    description: "计算每个用户在指定时间段内的活跃天数占比",
    sqlSolutions: [
      `WITH params AS (
  SELECT 
    DATE('2024-01-01') AS start_date,
    DATE('2024-01-15') AS end_date,
    DATEDIFF('2024-01-15', '2024-01-01') + 1 AS total_days
),
user_active AS (
  SELECT user_id,
         COUNT(DISTINCT activity_date) AS active_days
  FROM user_activity
  WHERE activity_date BETWEEN '2024-01-01' AND '2024-01-15'
  GROUP BY user_id
)
SELECT 
  user_id,
  active_days,
  (SELECT total_days FROM params) AS total_days,
  ROUND(100.0 * active_days / (SELECT total_days FROM params), 2) AS activity_rate
FROM user_active
ORDER BY activity_rate DESC;`,
    ],
    pandasSolutions: [
      `start_date = pd.Timestamp('2024-01-01')
end_date = pd.Timestamp('2024-01-15')
total_days = (end_date - start_date).days + 1

period_activity = df[(df['activity_date'] >= start_date) & (df['activity_date'] <= end_date)]
result = period_activity.groupby('user_id')['activity_date'].nunique().rename('active_days').reset_index()
result['total_days'] = total_days
result['activity_rate'] = round(100 * result['active_days'] / total_days, 2)
result = result.sort_values('activity_rate', ascending=False)`,
    ],
    explanation: "用户活跃度分析。用户1活跃3天占20%，用户2活跃4天占26.67%。活跃度高的用户粘性强，是运营重点关注对象。",
  },
  {
    id: "sql-basic-13",
    title: "NULL值处理与COALESCE",
    category: "basic",
    difficulty: 2,
    keywords: ["NULL", "COALESCE", "IFNULL"],
    tables: `products(product_id INT, product_name VARCHAR, price DECIMAL, discount DECIMAL)`,
    sampleData: `| product_id | product_name | price | discount |
|------------|--------------|-------|----------|
| 1          | iPhone       | 5000  | 500      |
| 2          | iPad         | 3000  | NULL     |
| 3          | MacBook      | 8000  | 800      |
| 4          | AirPods      | 1000  | NULL     |
| 5          | Watch        | 2000  | 0        |`,
    expectedOutput: `| product_id | product_name | price | discount | final_price |
|------------|--------------|-------|----------|-------------|
| 1          | iPhone       | 5000  | 500      | 4500        |
| 2          | iPad         | 3000  | 0        | 3000        |
| 3          | MacBook      | 8000  | 800      | 7200        |
| 4          | AirPods      | 1000  | 0        | 1000        |
| 5          | Watch        | 2000  | 0        | 2000        |`,
    description: "将NULL折扣视为0，计算最终价格",
    sqlSolutions: [
      `-- 方法1：COALESCE
SELECT 
  product_id, product_name, price,
  COALESCE(discount, 0) AS discount,
  price - COALESCE(discount, 0) AS final_price
FROM products;`,
      `-- 方法2：IFNULL (MySQL)
SELECT 
  product_id, product_name, price,
  IFNULL(discount, 0) AS discount,
  price - IFNULL(discount, 0) AS final_price
FROM products;`,
    ],
    pandasSolutions: [
      `df['discount'] = df['discount'].fillna(0)
df['final_price'] = df['price'] - df['discount']
result = df[['product_id', 'product_name', 'price', 'discount', 'final_price']]`,
    ],
    explanation: "NULL处理是SQL基础。COALESCE返回第一个非NULL值，IFNULL只接受2个参数。iPad和AirPods的NULL折扣被替换为0。",
  },
  {
    id: "sql-interview-15",
    title: "股票买卖最佳时机",
    category: "interview",
    difficulty: 4,
    keywords: ["最大差值", "窗口函数", "累计最小值"],
    tables: `stock_prices(trade_date DATE, price DECIMAL)`,
    sampleData: `| trade_date | price |
|------------|-------|
| 2024-01-01 | 100   |
| 2024-01-02 | 80    |
| 2024-01-03 | 120   |
| 2024-01-04 | 90    |
| 2024-01-05 | 150   |
| 2024-01-06 | 110   |`,
    expectedOutput: `| buy_date   | sell_date  | buy_price | sell_price | profit |
|------------|------------|-----------|------------|--------|
| 2024-01-02 | 2024-01-05 | 80        | 150        | 70     |

说明：在1月2日买入80元，1月5日卖出150元，利润最大70元`,
    description: "找出最佳买入和卖出日期，使利润最大化（只能交易一次）",
    sqlSolutions: [
      `WITH price_analysis AS (
  SELECT 
    trade_date, price,
    MIN(price) OVER(ORDER BY trade_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS min_before,
    price - MIN(price) OVER(ORDER BY trade_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS potential_profit
  FROM stock_prices
),
best_sell AS (
  SELECT *
  FROM price_analysis
  ORDER BY potential_profit DESC
  LIMIT 1
),
best_buy AS (
  SELECT trade_date AS buy_date, price AS buy_price
  FROM stock_prices
  WHERE price = (SELECT min_before FROM best_sell)
    AND trade_date < (SELECT trade_date FROM best_sell)
  ORDER BY trade_date
  LIMIT 1
)
SELECT 
  bb.buy_date,
  bs.trade_date AS sell_date,
  bb.buy_price,
  bs.price AS sell_price,
  bs.potential_profit AS profit
FROM best_buy bb, best_sell bs;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('trade_date')
df['min_before'] = df['price'].cummin()
df['profit'] = df['price'] - df['min_before']
max_profit_row = df.loc[df['profit'].idxmax()]
buy_date = df[df['price'] == max_profit_row['min_before']]['trade_date'].iloc[0]
result = pd.Series({
    'buy_date': buy_date,
    'sell_date': max_profit_row['trade_date'],
    'buy_price': max_profit_row['min_before'],
    'sell_price': max_profit_row['price'],
    'profit': max_profit_row['profit']
})`,
    ],
    explanation: "LeetCode 121题变体。关键是计算当前价格与之前最低价的差值。累计最小价MIN() OVER配合当前价格，找最大差值即最大利润。",
  },
  {
    id: "sql-biz-10",
    title: "商品库存预警",
    category: "business",
    difficulty: 3,
    keywords: ["库存管理", "安全库存", "预警"],
    tables: `inventory(product_id INT, product_name VARCHAR, current_stock INT, daily_sales_avg DECIMAL, lead_time_days INT)`,
    sampleData: `| product_id | product_name | current_stock | daily_sales_avg | lead_time_days |
|------------|--------------|---------------|-----------------|----------------|
| 1          | iPhone       | 50            | 10.5            | 7              |
| 2          | iPad         | 100           | 5.2             | 7              |
| 3          | MacBook      | 20            | 3.8             | 10             |
| 4          | AirPods      | 200           | 15.0            | 5              |
| 5          | Watch        | 30            | 8.5             | 7              |

安全库存=日均销量*补货周期*1.5（安全系数）`,
    expectedOutput: `| product_id | product_name | current_stock | safe_stock | shortage | status |
|------------|--------------|---------------|------------|----------|--------|
| 1          | iPhone       | 50            | 110.25     | -60.25   | 缺货   |
| 2          | iPad         | 100           | 54.60      | 45.40    | 正常   |
| 3          | MacBook      | 20            | 57.00      | -37.00   | 缺货   |
| 4          | AirPods      | 200           | 112.50     | 87.50    | 正常   |
| 5          | Watch        | 30            | 89.25      | -59.25   | 缺货   |`,
    description: "计算安全库存，识别需要补货的商品",
    sqlSolutions: [
      `SELECT 
  product_id, product_name, current_stock,
  ROUND(daily_sales_avg * lead_time_days * 1.5, 2) AS safe_stock,
  ROUND(current_stock - (daily_sales_avg * lead_time_days * 1.5), 2) AS shortage,
  CASE 
    WHEN current_stock < daily_sales_avg * lead_time_days * 1.5 THEN '缺货'
    ELSE '正常'
  END AS status
FROM inventory
ORDER BY shortage;`,
    ],
    pandasSolutions: [
      `df['safe_stock'] = round(df['daily_sales_avg'] * df['lead_time_days'] * 1.5, 2)
df['shortage'] = round(df['current_stock'] - df['safe_stock'], 2)
df['status'] = df['shortage'].apply(lambda x: '正常' if x >= 0 else '缺货')
result = df[['product_id', 'product_name', 'current_stock', 'safe_stock', 'shortage', 'status']].sort_values('shortage')`,
    ],
    explanation: "供应链管理关键指标。安全库存=日销量×补货周期×安全系数。iPhone需110单但只有50单，缺货60单需紧急补货。",
  },
  {
    id: "sql-win-13",
    title: "滑动窗口最大值",
    category: "window",
    difficulty: 4,
    keywords: ["滑动窗口", "MAX OVER", "ROWS"],
    tables: `sensor_data(timestamp DATETIME, temperature DECIMAL)`,
    sampleData: `| timestamp           | temperature |
|---------------------|-------------|
| 2024-01-01 00:00:00 | 20.5        |
| 2024-01-01 01:00:00 | 22.3        |
| 2024-01-01 02:00:00 | 19.8        |
| 2024-01-01 03:00:00 | 25.1        |
| 2024-01-01 04:00:00 | 23.7        |
| 2024-01-01 05:00:00 | 21.2        |`,
    expectedOutput: `| timestamp           | temperature | max_3hour |
|---------------------|-------------|-----------|
| 2024-01-01 00:00:00 | 20.5        | 20.5      |
| 2024-01-01 01:00:00 | 22.3        | 22.3      |
| 2024-01-01 02:00:00 | 19.8        | 22.3      |
| 2024-01-01 03:00:00 | 25.1        | 25.1      |
| 2024-01-01 04:00:00 | 23.7        | 25.1      |
| 2024-01-01 05:00:00 | 21.2        | 25.1      |`,
    description: "计算最近3小时的最高温度",
    sqlSolutions: [
      `SELECT timestamp, temperature,
       MAX(temperature) OVER(
         ORDER BY timestamp
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS max_3hour
FROM sensor_data;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('timestamp')
df['max_3hour'] = df['temperature'].rolling(3, min_periods=1).max()`,
    ],
    explanation: "滑动窗口经典应用。ROWS BETWEEN 2 PRECEDING AND CURRENT ROW覆盖最近3个时间点。第4行：前3小时[19.8,22.3,25.1]最大值25.1。",
  },
  {
    id: "sql-basic-14",
    title: "子查询：标量子查询",
    category: "basic",
    difficulty: 3,
    keywords: ["子查询", "标量子查询", "比较"],
    tables: `employees(emp_id INT, name VARCHAR, salary DECIMAL, dept_id INT)`,
    sampleData: `| emp_id | name  | salary | dept_id |
|--------|-------|--------|---------|
| 1      | Alice | 8000   | 1       |
| 2      | Bob   | 9000   | 1       |
| 3      | Carol | 7000   | 2       |
| 4      | David | 8500   | 2       |
| 5      | Eve   | 9500   | 1       |`,
    expectedOutput: `| emp_id | name  | salary | avg_salary | diff   |
|--------|-------|--------|------------|--------|
| 1      | Alice | 8000   | 8400.00    | -400   |
| 2      | Bob   | 9000   | 8400.00    | 600    |
| 3      | Carol | 7000   | 8400.00    | -1400  |
| 4      | David | 8500   | 8400.00    | 100    |
| 5      | Eve   | 9500   | 8400.00    | 1100   |`,
    description: "查询每个员工工资与全公司平均工资的差值",
    sqlSolutions: [
      `SELECT 
  emp_id, name, salary,
  (SELECT ROUND(AVG(salary), 2) FROM employees) AS avg_salary,
  salary - (SELECT AVG(salary) FROM employees) AS diff
FROM employees
ORDER BY emp_id;`,
    ],
    pandasSolutions: [
      `avg_salary = round(df['salary'].mean(), 2)
df['avg_salary'] = avg_salary
df['diff'] = df['salary'] - avg_salary
result = df[['emp_id', 'name', 'salary', 'avg_salary', 'diff']]`,
    ],
    explanation: "标量子查询返回单一值。全公司平均工资8400，Alice比平均低400，Eve比平均高1100。子查询在SELECT和WHERE中都常用。",
  },
  {
    id: "sql-interview-16",
    title: "好友推荐（共同好友）",
    category: "interview",
    difficulty: 5,
    keywords: ["图查询", "自连接", "共同好友"],
    tables: `friendships(user_id INT, friend_id INT)`,
    sampleData: `| user_id | friend_id |
|---------|-----------|
| 1       | 2         |
| 1       | 3         |
| 2       | 3         |
| 2       | 4         |
| 3       | 4         |
| 3       | 5         |
| 4       | 5         |

说明：双向关系，1-2表示1和2是好友`,
    expectedOutput: `为用户1推荐好友（不是直接好友但有共同好友）:
| user_id | recommended_friend | common_friends_count |
|---------|-------------------|----------------------|
| 1       | 4                 | 2                    |
| 1       | 5                 | 1                    |

说明：用户1的好友是2和3，用户4与2和3都是好友（2个共同好友）`,
    description: "为指定用户推荐好友（基于共同好友数量）",
    sqlSolutions: [
      `WITH all_friends AS (
  SELECT user_id, friend_id FROM friendships
  UNION
  SELECT friend_id AS user_id, user_id AS friend_id FROM friendships
),
target_friends AS (
  SELECT friend_id
  FROM all_friends
  WHERE user_id = 1
),
potential_friends AS (
  SELECT f2.friend_id, COUNT(*) AS common_friends_count
  FROM all_friends f1
  JOIN all_friends f2 ON f1.friend_id = f2.user_id
  WHERE f1.user_id = 1
    AND f2.friend_id != 1
    AND f2.friend_id NOT IN (SELECT friend_id FROM target_friends)
  GROUP BY f2.friend_id
)
SELECT 
  1 AS user_id,
  friend_id AS recommended_friend,
  common_friends_count
FROM potential_friends
ORDER BY common_friends_count DESC;`,
    ],
    pandasSolutions: [
      `# 构建双向关系
all_friends = pd.concat([
    df[['user_id', 'friend_id']],
    df[['friend_id', 'user_id']].rename(columns={'friend_id': 'user_id', 'user_id': 'friend_id'})
])

target_user = 1
direct_friends = set(all_friends[all_friends['user_id'] == target_user]['friend_id'])
recommendations = {}

for friend in direct_friends:
    friends_of_friend = set(all_friends[all_friends['user_id'] == friend]['friend_id'])
    for potential in friends_of_friend:
        if potential != target_user and potential not in direct_friends:
            recommendations[potential] = recommendations.get(potential, 0) + 1

result = pd.DataFrame([
    {'user_id': target_user, 'recommended_friend': k, 'common_friends_count': v}
    for k, v in sorted(recommendations.items(), key=lambda x: -x[1])
])`,
    ],
    explanation: "社交网络推荐算法。用户1的好友是2和3，他们的好友中用户4（与2、3都是好友）是最佳推荐。图查询在SQL中实现复杂。",
  },
  {
    id: "sql-biz-11",
    title: "渠道归因分析（最后触点）",
    category: "business",
    difficulty: 4,
    keywords: ["归因", "转化路径", "ROW_NUMBER"],
    tables: `user_touches(user_id INT, channel VARCHAR, touch_time DATETIME, converted INT)`,
    sampleData: `| user_id | channel | touch_time          | converted |
|---------|---------|---------------------|-----------|
| 1       | Google  | 2024-01-01 10:00:00 | 0         |
| 1       | Facebook| 2024-01-02 11:00:00 | 0         |
| 1       | Email   | 2024-01-03 12:00:00 | 1         |
| 2       | Google  | 2024-01-01 09:00:00 | 0         |
| 2       | Google  | 2024-01-04 10:00:00 | 1         |
| 3       | Facebook| 2024-01-02 14:00:00 | 0         |
| 3       | Email   | 2024-01-05 15:00:00 | 0         |`,
    expectedOutput: `| channel  | touches | conversions | conversion_rate | attributed_conversions |
|----------|---------|-------------|-----------------|------------------------|
| Email    | 2       | 1           | 50.00           | 1                      |
| Facebook | 2       | 0           | 0.00            | 0                      |
| Google   | 3       | 1           | 33.33           | 1                      |

说明：最后触点归因，用户1转化归因给Email，用户2归因给Google`,
    description: "计算各渠道的转化率，并使用最后触点归因模型",
    sqlSolutions: [
      `WITH last_touch AS (
  SELECT user_id, channel, converted,
         ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY touch_time DESC) AS rn
  FROM user_touches
  WHERE converted = 1
)
SELECT 
  u.channel,
  COUNT(*) AS touches,
  SUM(u.converted) AS conversions,
  ROUND(100.0 * SUM(u.converted) / COUNT(*), 2) AS conversion_rate,
  COUNT(DISTINCT CASE WHEN lt.rn = 1 THEN u.user_id END) AS attributed_conversions
FROM user_touches u
LEFT JOIN last_touch lt ON u.user_id = lt.user_id AND u.channel = lt.channel
GROUP BY u.channel
ORDER BY attributed_conversions DESC;`,
    ],
    pandasSolutions: [
      `# 最后触点归因
converted_users = df[df['converted'] == 1].groupby('user_id').agg(
    last_channel=('channel', 'last')
).reset_index()

result = df.groupby('channel').agg(
    touches=('user_id', 'count'),
    conversions=('converted', 'sum')
).reset_index()
result['conversion_rate'] = round(100 * result['conversions'] / result['touches'], 2)

attribution = converted_users['last_channel'].value_counts().rename('attributed_conversions')
result = result.merge(attribution, left_on='channel', right_index=True, how='left').fillna(0)
result['attributed_conversions'] = result['attributed_conversions'].astype(int)`,
    ],
    explanation: "营销归因分析。最后触点模型将转化归功于转化前最后接触的渠道。用户1最后触点是Email，用户2是Google。不同归因模型影响ROI计算。",
  },
  
  // ========== 第六批10题（行业场景） ==========
  {
    id: "sql-biz-12",
    title: "【金融】信用卡欺诈检测",
    category: "business",
    difficulty: 4,
    keywords: ["异常检测", "风控", "时间窗口"],
    tables: `transactions(txn_id INT, card_id VARCHAR, amount DECIMAL, merchant VARCHAR, txn_time DATETIME, location VARCHAR)`,
    sampleData: `| txn_id | card_id | amount | merchant | txn_time            | location |
|--------|---------|--------|----------|---------------------|----------|
| 1      | C001    | 100    | 超市A    | 2024-01-01 10:00:00 | 北京     |
| 2      | C001    | 5000   | 电器B    | 2024-01-01 10:05:00 | 上海     |
| 3      | C001    | 8000   | 珠宝C    | 2024-01-01 10:08:00 | 广州     |
| 4      | C002    | 200    | 餐厅D    | 2024-01-01 11:00:00 | 北京     |
| 5      | C002    | 150    | 咖啡E    | 2024-01-01 12:00:00 | 北京     |
| 6      | C001    | 50     | 便利店F  | 2024-01-01 15:00:00 | 北京     |

规则：10分钟内3笔以上交易 或 单笔>5000 或 短时间跨城市`,
    expectedOutput: `| card_id | suspicious_txns | total_amount | risk_reason               |
|---------|-----------------|--------------|---------------------------|
| C001    | 3               | 13000        | 10分钟3笔+高额+异地       |

说明：卡C001在5-8分钟内完成3笔，且跨越北京-上海-广州`,
    description: "识别可疑交易（高频、高额、异地）",
    sqlSolutions: [
      `WITH txn_analysis AS (
  SELECT 
    card_id, txn_id, amount, txn_time, location,
    LAG(location) OVER(PARTITION BY card_id ORDER BY txn_time) AS prev_location,
    LAG(txn_time) OVER(PARTITION BY card_id ORDER BY txn_time) AS prev_time,
    COUNT(*) OVER(
      PARTITION BY card_id 
      ORDER BY txn_time 
      RANGE BETWEEN INTERVAL 10 MINUTE PRECEDING AND CURRENT ROW
    ) AS cnt_10min
  FROM transactions
),
suspicious AS (
  SELECT card_id, txn_id, amount,
    CASE 
      WHEN cnt_10min >= 3 THEN '高频交易'
      WHEN amount > 5000 THEN '高额交易'
      WHEN location != prev_location AND TIMESTAMPDIFF(MINUTE, prev_time, txn_time) < 60 THEN '异地交易'
      ELSE NULL
    END AS risk_flag
  FROM txn_analysis
)
SELECT 
  card_id,
  COUNT(*) AS suspicious_txns,
  SUM(amount) AS total_amount,
  GROUP_CONCAT(DISTINCT risk_flag SEPARATOR '+') AS risk_reason
FROM suspicious
WHERE risk_flag IS NOT NULL
GROUP BY card_id
HAVING COUNT(*) >= 2;`,
    ],
    pandasSolutions: [
      `df = df.sort_values(['card_id', 'txn_time'])
df['prev_location'] = df.groupby('card_id')['location'].shift()
df['prev_time'] = df.groupby('card_id')['txn_time'].shift()
df['time_diff'] = (df['txn_time'] - df['prev_time']).dt.total_seconds() / 60

# 标记风险
df['risk_flag'] = None
df.loc[df['amount'] > 5000, 'risk_flag'] = '高额交易'
df.loc[(df['location'] != df['prev_location']) & (df['time_diff'] < 60), 'risk_flag'] = '异地交易'

# 10分钟窗口计数
df['cnt_10min'] = df.groupby('card_id')['txn_time'].rolling('10min').count().reset_index(0, drop=True)
df.loc[df['cnt_10min'] >= 3, 'risk_flag'] = '高频交易'

result = df[df['risk_flag'].notna()].groupby('card_id').agg(
    suspicious_txns=('txn_id', 'count'),
    total_amount=('amount', 'sum'),
    risk_reason=('risk_flag', lambda x: '+'.join(x.unique()))
).reset_index()`,
    ],
    explanation: "金融风控核心场景。C001卡10分钟内北京→上海→广州3笔交易，金额13000，明显异常。实际需结合机器学习模型综合判断。",
  },
  {
    id: "sql-biz-13",
    title: "【电商】动态定价分析",
    category: "business",
    difficulty: 4,
    keywords: ["价格弹性", "收益最大化", "ABtest"],
    tables: `pricing_test(product_id INT, price DECIMAL, impressions INT, clicks INT, orders INT, revenue DECIMAL, test_date DATE)`,
    sampleData: `| product_id | price | impressions | clicks | orders | revenue | test_date  |
|------------|-------|-------------|--------|--------|---------|------------|
| 101        | 100   | 10000       | 500    | 50     | 5000    | 2024-01-01 |
| 101        | 120   | 10000       | 450    | 40     | 4800    | 2024-01-02 |
| 101        | 80    | 10000       | 600    | 70     | 5600    | 2024-01-03 |
| 101        | 90    | 10000       | 550    | 60     | 5400    | 2024-01-04 |
| 101        | 110   | 10000       | 480    | 45     | 4950    | 2024-01-05 |`,
    expectedOutput: `| product_id | optimal_price | max_revenue | conversion_rate | elasticity_index |
|------------|---------------|-------------|-----------------|------------------|
| 101        | 80            | 5600        | 0.70            | -1.25            |

说明：价格从100降到80，转化率从0.5%升至0.7%，收益从5000升至5600`,
    description: "找出收益最大化的最优定价",
    sqlSolutions: [
      `WITH price_metrics AS (
  SELECT 
    product_id, price, revenue,
    ROUND(100.0 * orders / impressions, 2) AS conversion_rate,
    ROW_NUMBER() OVER(PARTITION BY product_id ORDER BY revenue DESC) AS revenue_rank,
    LAG(price) OVER(PARTITION BY product_id ORDER BY price) AS prev_price,
    LAG(orders) OVER(PARTITION BY product_id ORDER BY price) AS prev_orders
  FROM pricing_test
),
elasticity AS (
  SELECT 
    product_id, price, revenue, conversion_rate,
    CASE 
      WHEN prev_price IS NOT NULL THEN
        ROUND(((orders - prev_orders) / prev_orders) / ((price - prev_price) / prev_price), 2)
      ELSE NULL
    END AS elasticity_index
  FROM price_metrics
  JOIN pricing_test USING(product_id, price)
)
SELECT 
  product_id,
  price AS optimal_price,
  revenue AS max_revenue,
  conversion_rate,
  COALESCE(elasticity_index, 0) AS elasticity_index
FROM elasticity
WHERE revenue = (SELECT MAX(revenue) FROM pricing_test WHERE product_id = elasticity.product_id);`,
    ],
    pandasSolutions: [
      `df['conversion_rate'] = round(100 * df['orders'] / df['impressions'], 2)
df = df.sort_values(['product_id', 'price'])

# 价格弹性系数
df['prev_price'] = df.groupby('product_id')['price'].shift()
df['prev_orders'] = df.groupby('product_id')['orders'].shift()
df['elasticity_index'] = round(
    ((df['orders'] - df['prev_orders']) / df['prev_orders']) / 
    ((df['price'] - df['prev_price']) / df['prev_price']), 2
)

# 找最优价格
idx = df.groupby('product_id')['revenue'].idxmax()
result = df.loc[idx, ['product_id', 'price', 'revenue', 'conversion_rate', 'elasticity_index']].rename(columns={'price': 'optimal_price', 'revenue': 'max_revenue'})
result['elasticity_index'] = result['elasticity_index'].fillna(0)`,
    ],
    explanation: "电商动态定价核心。弹性系数-1.25表示价格每降10%，需求增12.5%。80元时收益最大5600，平衡了价格与销量。",
  },
  {
    id: "sql-biz-14",
    title: "【物流】配送路线优化",
    category: "business",
    difficulty: 5,
    keywords: ["TSP问题", "路径优化", "成本最小化"],
    tables: `deliveries(order_id INT, warehouse VARCHAR, customer_addr VARCHAR, distance_km DECIMAL, priority INT, delivery_time DATETIME)
routes(route_id INT, stops VARCHAR, total_distance DECIMAL, total_orders INT)`,
    sampleData: `| order_id | warehouse | customer_addr | distance_km | priority | delivery_time       |
|----------|-----------|---------------|-------------|----------|---------------------|
| 1        | 仓库A     | 朝阳区        | 5.2         | 1        | 2024-01-01 10:00:00 |
| 2        | 仓库A     | 海淀区        | 8.3         | 2        | 2024-01-01 10:30:00 |
| 3        | 仓库A     | 朝阳区        | 5.5         | 1        | 2024-01-01 11:00:00 |
| 4        | 仓库A     | 丰台区        | 12.0        | 3        | 2024-01-01 14:00:00 |
| 5        | 仓库A     | 海淀区        | 8.1         | 2        | 2024-01-01 15:00:00 |
| 6        | 仓库A     | 朝阳区        | 4.8         | 1        | 2024-01-01 16:00:00 |

说明：优先级1=当日达，2=次日达，3=标准`,
    expectedOutput: `按区域和优先级分组配送建议：
| route_group | orders | avg_distance | priority_mix | suggested_route      |
|-------------|--------|--------------|--------------|----------------------|
| 朝阳-高优   | 3      | 5.17         | 1            | 1→3→6（同区顺路）    |
| 海淀-中优   | 2      | 8.20         | 2            | 2→5（同区集中配送）  |
| 丰台-低优   | 1      | 12.00        | 3            | 4（单独配送）        |`,
    description: "将订单按区域和优先级分组，优化配送路线",
    sqlSolutions: [
      `WITH route_groups AS (
  SELECT 
    customer_addr,
    priority,
    CONCAT(customer_addr, '-', 
      CASE priority 
        WHEN 1 THEN '高优' 
        WHEN 2 THEN '中优' 
        ELSE '低优' 
      END
    ) AS route_group,
    COUNT(*) AS orders,
    ROUND(AVG(distance_km), 2) AS avg_distance,
    GROUP_CONCAT(order_id ORDER BY delivery_time SEPARATOR '→') AS order_sequence
  FROM deliveries
  GROUP BY customer_addr, priority
)
SELECT 
  route_group,
  orders,
  avg_distance,
  priority AS priority_mix,
  CONCAT(order_sequence, '（', 
    CASE 
      WHEN orders >= 3 THEN '同区顺路'
      WHEN orders = 2 THEN '同区集中配送'
      ELSE '单独配送'
    END, '）'
  ) AS suggested_route
FROM route_groups
JOIN (SELECT DISTINCT customer_addr, priority FROM deliveries) d 
  USING(customer_addr, priority)
ORDER BY priority, avg_distance;`,
    ],
    pandasSolutions: [
      `df['priority_label'] = df['priority'].map({1: '高优', 2: '中优', 3: '低优'})
df['route_group'] = df['customer_addr'] + '-' + df['priority_label']

result = df.groupby('route_group').agg(
    orders=('order_id', 'count'),
    avg_distance=('distance_km', lambda x: round(x.mean(), 2)),
    priority_mix=('priority', 'first'),
    order_sequence=('order_id', lambda x: '→'.join(map(str, sorted(x))))
).reset_index()

result['suggested_route'] = result.apply(lambda row: 
    f"{row['order_sequence']}（{'同区顺路' if row['orders'] >= 3 else '同区集中配送' if row['orders'] == 2 else '单独配送'}）", 
    axis=1
)
result = result.sort_values(['priority_mix', 'avg_distance'])`,
    ],
    explanation: "物流配送优化。朝阳区3个高优订单可顺路配送节省成本，海淀区2单集中配送。实际需考虑时效、车辆容量、交通状况。",
  },
  {
    id: "sql-biz-15",
    title: "【游戏】玩家流失预警",
    category: "business",
    difficulty: 4,
    keywords: ["流失预测", "留存", "生命周期"],
    tables: `player_activity(player_id INT, login_date DATE, playtime_min INT, recharge_amount DECIMAL, level INT)`,
    sampleData: `| player_id | login_date | playtime_min | recharge_amount | level |
|-----------|------------|--------------|-----------------|-------|
| 1         | 2024-01-01 | 120          | 100             | 10    |
| 1         | 2024-01-02 | 90           | 0               | 11    |
| 1         | 2024-01-03 | 60           | 0               | 11    |
| 2         | 2024-01-01 | 180          | 500             | 15    |
| 2         | 2024-01-02 | 150          | 0               | 16    |
| 2         | 2024-01-08 | 30           | 0               | 16    |
| 3         | 2024-01-01 | 200          | 1000            | 20    |
| 3         | 2024-01-02 | 180          | 0               | 21    |
| 3         | 2024-01-03 | 170          | 200             | 22    |

分析日期：2024-01-10`,
    expectedOutput: `| player_id | days_since_last | playtime_trend | recharge_total | churn_risk |
|-----------|-----------------|----------------|----------------|------------|
| 1         | 7               | 下降50%        | 100            | 高风险     |
| 2         | 2               | 下降83%        | 500            | 中风险     |
| 3         | 7               | 稳定           | 1200           | 低风险     |

说明：玩家1时长从120降至60，7天未登录，高风险流失`,
    description: "识别流失风险玩家（长时间未登录、时长下降、付费但不活跃）",
    sqlSolutions: [
      `WITH player_stats AS (
  SELECT 
    player_id,
    DATEDIFF('2024-01-10', MAX(login_date)) AS days_since_last,
    SUM(recharge_amount) AS recharge_total,
    FIRST_VALUE(playtime_min) OVER(PARTITION BY player_id ORDER BY login_date) AS first_playtime,
    FIRST_VALUE(playtime_min) OVER(PARTITION BY player_id ORDER BY login_date DESC) AS last_playtime,
    COUNT(DISTINCT login_date) AS active_days
  FROM player_activity
  GROUP BY player_id
),
risk_analysis AS (
  SELECT 
    player_id,
    days_since_last,
    CONCAT(
      CASE 
        WHEN last_playtime < first_playtime * 0.7 THEN '下降'
        WHEN last_playtime > first_playtime * 1.2 THEN '上升'
        ELSE '稳定'
      END,
      ROUND(100.0 * (first_playtime - last_playtime) / first_playtime, 0), '%'
    ) AS playtime_trend,
    recharge_total,
    CASE 
      WHEN days_since_last > 7 AND recharge_total > 0 THEN '高风险'
      WHEN days_since_last > 3 OR last_playtime < first_playtime * 0.5 THEN '中风险'
      ELSE '低风险'
    END AS churn_risk
  FROM player_stats
)
SELECT * FROM risk_analysis
ORDER BY FIELD(churn_risk, '高风险', '中风险', '低风险');`,
    ],
    pandasSolutions: [
      `analysis_date = pd.Timestamp('2024-01-10')
df_sorted = df.sort_values(['player_id', 'login_date'])

player_stats = df.groupby('player_id').agg(
    days_since_last=(('login_date', lambda x: (analysis_date - x.max()).days),
    recharge_total=('recharge_amount', 'sum'),
    first_playtime=('playtime_min', 'first'),
    last_playtime=('playtime_min', 'last'),
    active_days=('login_date', 'nunique')
).reset_index()

# 趋势和风险
player_stats['playtime_trend'] = player_stats.apply(
    lambda r: f"下降{round(100*(r['first_playtime']-r['last_playtime'])/r['first_playtime'])}%" 
    if r['last_playtime'] < r['first_playtime']*0.7 else "稳定", axis=1
)

player_stats['churn_risk'] = '低风险'
player_stats.loc[(player_stats['days_since_last'] > 3) | (player_stats['last_playtime'] < player_stats['first_playtime']*0.5), 'churn_risk'] = '中风险'
player_stats.loc[(player_stats['days_since_last'] > 7) & (player_stats['recharge_total'] > 0), 'churn_risk'] = '高风险'

result = player_stats[['player_id', 'days_since_last', 'playtime_trend', 'recharge_total', 'churn_risk']]`,
    ],
    explanation: "游戏运营关键指标。玩家1付费后游戏时长骤降50%且7天未登录，高流失风险需运营介入（发放礼包、客服回访）。",
  },
  {
    id: "sql-biz-16",
    title: "【教育】学习效果分析",
    category: "business",
    difficulty: 3,
    keywords: ["学习路径", "知识图谱", "效果评估"],
    tables: `learning_records(student_id INT, course_id INT, video_progress DECIMAL, quiz_score INT, study_time_min INT, complete_date DATE)`,
    sampleData: `| student_id | course_id | video_progress | quiz_score | study_time_min | complete_date |
|------------|-----------|----------------|------------|----------------|---------------|
| 1          | 101       | 1.0            | 85         | 120            | 2024-01-05    |
| 1          | 102       | 0.8            | 70         | 90             | NULL          |
| 1          | 103       | 1.0            | 90         | 150            | 2024-01-15    |
| 2          | 101       | 1.0            | 95         | 100            | 2024-01-03    |
| 2          | 102       | 1.0            | 88         | 110            | 2024-01-10    |
| 2          | 103       | 0.5            | 60         | 50             | NULL          |
| 3          | 101       | 0.6            | 65         | 80             | NULL          |
| 3          | 102       | 0.3            | 50         | 40             | NULL          |

说明：video_progress=1.0表示视频全看完，quiz_score满分100`,
    expectedOutput: `| student_id | courses_completed | avg_score | total_time | efficiency_score | learning_status |
|------------|-------------------|-----------|------------|------------------|-----------------|
| 2          | 2                 | 91.5      | 210        | 92.38            | 优秀            |
| 1          | 2                 | 87.5      | 270        | 86.11            | 良好            |
| 3          | 0                 | 57.5      | 120        | 50.83            | 需要辅导        |

说明：效率分数=平均成绩*(完成率*100)/(学习时长/60)`,
    description: "评估学生学习效果和效率",
    sqlSolutions: [
      `WITH student_metrics AS (
  SELECT 
    student_id,
    COUNT(CASE WHEN complete_date IS NOT NULL THEN 1 END) AS courses_completed,
    ROUND(AVG(quiz_score), 1) AS avg_score,
    SUM(study_time_min) AS total_time,
    ROUND(AVG(video_progress) * 100, 1) AS avg_completion_rate
  FROM learning_records
  GROUP BY student_id
),
efficiency AS (
  SELECT 
    *,
    ROUND(avg_score * avg_completion_rate / (total_time / 60.0), 2) AS efficiency_score,
    CASE 
      WHEN avg_score >= 85 AND courses_completed >= 2 THEN '优秀'
      WHEN avg_score >= 70 OR courses_completed >= 1 THEN '良好'
      ELSE '需要辅导'
    END AS learning_status
  FROM student_metrics
)
SELECT * FROM efficiency
ORDER BY efficiency_score DESC;`,
    ],
    pandasSolutions: [
      `student_metrics = df.groupby('student_id').agg(
    courses_completed=('complete_date', lambda x: x.notna().sum()),
    avg_score=('quiz_score', lambda x: round(x.mean(), 1)),
    total_time=('study_time_min', 'sum'),
    avg_completion_rate=('video_progress', lambda x: round(x.mean() * 100, 1))
).reset_index()

student_metrics['efficiency_score'] = round(
    student_metrics['avg_score'] * student_metrics['avg_completion_rate'] / (student_metrics['total_time'] / 60), 2
)

student_metrics['learning_status'] = '需要辅导'
student_metrics.loc[(student_metrics['avg_score'] >= 70) | (student_metrics['courses_completed'] >= 1), 'learning_status'] = '良好'
student_metrics.loc[(student_metrics['avg_score'] >= 85) & (student_metrics['courses_completed'] >= 2), 'learning_status'] = '优秀'

result = student_metrics.sort_values('efficiency_score', ascending=False)`,
    ],
    explanation: "在线教育核心指标。学生2效率最高（92.38），用时少但成绩好。学生3多门课未完成且成绩差，需班主任介入辅导。",
  },
  {
    id: "sql-interview-17",
    title: "【医疗】患者就诊路径分析",
    category: "interview",
    difficulty: 5,
    keywords: ["序列模式", "路径挖掘", "桑基图"],
    tables: `patient_visits(patient_id INT, visit_seq INT, department VARCHAR, diagnosis VARCHAR, visit_date DATE)`,
    sampleData: `| patient_id | visit_seq | department | diagnosis | visit_date |
|------------|-----------|------------|-----------|------------|
| 1          | 1         | 急诊       | 发热      | 2024-01-01 |
| 1          | 2         | 内科       | 肺炎      | 2024-01-02 |
| 1          | 3         | 放射科     | CT检查    | 2024-01-02 |
| 1          | 4         | 内科       | 复查      | 2024-01-05 |
| 2          | 1         | 急诊       | 胸痛      | 2024-01-03 |
| 2          | 2         | 心内科     | 心绞痛    | 2024-01-03 |
| 2          | 3         | 放射科     | 造影      | 2024-01-04 |
| 3          | 1         | 急诊       | 发热      | 2024-01-05 |
| 3          | 2         | 内科       | 感冒      | 2024-01-05 |`,
    expectedOutput: `常见就诊路径（支持度>1）：
| path_pattern                    | patient_count | avg_visits | avg_duration_days |
|---------------------------------|---------------|------------|-------------------|
| 急诊→内科→放射科→内科           | 1             | 4          | 4.0               |
| 急诊→心内科→放射科              | 1             | 3          | 1.0               |
| 急诊→内科                       | 2             | 2          | 0.0               |

说明：发热患者多数路径为急诊→内科，重症需放射科检查`,
    description: "分析患者常见就诊路径，识别转诊模式",
    sqlSolutions: [
      `WITH patient_paths AS (
  SELECT 
    patient_id,
    GROUP_CONCAT(department ORDER BY visit_seq SEPARATOR '→') AS path_pattern,
    COUNT(*) AS total_visits,
    DATEDIFF(MAX(visit_date), MIN(visit_date)) AS duration_days
  FROM patient_visits
  GROUP BY patient_id
),
path_stats AS (
  SELECT 
    path_pattern,
    COUNT(*) AS patient_count,
    ROUND(AVG(total_visits), 1) AS avg_visits,
    ROUND(AVG(duration_days), 1) AS avg_duration_days
  FROM patient_paths
  GROUP BY path_pattern
  HAVING patient_count >= 1
)
SELECT * FROM path_stats
ORDER BY patient_count DESC, avg_visits DESC;`,
    ],
    pandasSolutions: [
      `patient_paths = df.sort_values(['patient_id', 'visit_seq']).groupby('patient_id').agg(
    path_pattern=('department', lambda x: '→'.join(x)),
    total_visits=('visit_seq', 'count'),
    duration_days=('visit_date', lambda x: (x.max() - x.min()).days)
).reset_index()

path_stats = patient_paths.groupby('path_pattern').agg(
    patient_count=('patient_id', 'count'),
    avg_visits=('total_visits', lambda x: round(x.mean(), 1)),
    avg_duration_days=('duration_days', lambda x: round(x.mean(), 1))
).reset_index()

result = path_stats[path_stats['patient_count'] >= 1].sort_values(['patient_count', 'avg_visits'], ascending=[False, False])`,
    ],
    explanation: "医疗数据挖掘。急诊→内科是最常见路径。重症患者会转放射科做影像检查。可用于优化分诊流程、资源配置。",
  },
  {
    id: "sql-biz-17",
    title: "【零售】商品关联分析（购物篮）",
    category: "business",
    difficulty: 4,
    keywords: ["关联规则", "频繁项集", "推荐系统"],
    tables: `order_items(order_id INT, product_name VARCHAR, quantity INT, price DECIMAL)`,
    sampleData: `| order_id | product_name | quantity | price |
|----------|--------------|----------|-------|
| 1        | 牛奶         | 2        | 10    |
| 1        | 面包         | 1        | 5     |
| 2        | 牛奶         | 1        | 10    |
| 2        | 面包         | 1        | 5     |
| 2        | 黄油         | 1        | 8     |
| 3        | 牛奶         | 1        | 10    |
| 3        | 咖啡         | 1        | 15    |
| 4        | 面包         | 2        | 5     |
| 4        | 黄油         | 1        | 8     |
| 5        | 牛奶         | 1        | 10    |
| 5        | 面包         | 1        | 5     |
| 5        | 黄油         | 1        | 8     |
| 5        | 咖啡         | 1        | 15    |`,
    expectedOutput: `| product_a | product_b | co_occurrence | support | confidence | lift  |
|-----------|-----------|---------------|---------|------------|-------|
| 牛奶      | 面包      | 3             | 0.60    | 0.75       | 1.25  |
| 面包      | 黄油      | 3             | 0.60    | 0.75       | 1.50  |
| 牛奶      | 黄油      | 2             | 0.40    | 0.50       | 1.00  |

说明：牛奶和面包共同出现3次，支持度60%，置信度75%，提升度1.25`,
    description: "计算商品关联规则（支持度、置信度、提升度）",
    sqlSolutions: [
      `WITH product_orders AS (
  SELECT DISTINCT order_id, product_name
  FROM order_items
),
total_orders AS (
  SELECT COUNT(DISTINCT order_id) AS total FROM order_items
),
pairs AS (
  SELECT 
    p1.product_name AS product_a,
    p2.product_name AS product_b,
    COUNT(DISTINCT p1.order_id) AS co_occurrence
  FROM product_orders p1
  JOIN product_orders p2 ON p1.order_id = p2.order_id AND p1.product_name < p2.product_name
  GROUP BY p1.product_name, p2.product_name
),
metrics AS (
  SELECT 
    product_a, product_b, co_occurrence,
    ROUND(co_occurrence * 1.0 / (SELECT total FROM total_orders), 2) AS support,
    ROUND(co_occurrence * 1.0 / (SELECT COUNT(DISTINCT order_id) FROM product_orders WHERE product_name = product_a), 2) AS confidence,
    ROUND(
      (co_occurrence * 1.0 / (SELECT total FROM total_orders)) / 
      ((SELECT COUNT(DISTINCT order_id) FROM product_orders WHERE product_name = product_a) * 1.0 / (SELECT total FROM total_orders) *
       (SELECT COUNT(DISTINCT order_id) FROM product_orders WHERE product_name = product_b) * 1.0 / (SELECT total FROM total_orders)),
    2) AS lift
  FROM pairs
)
SELECT * FROM metrics
WHERE support >= 0.3
ORDER BY lift DESC, support DESC;`,
    ],
    pandasSolutions: [
      `from itertools import combinations

total_orders = df['order_id'].nunique()
product_counts = df.groupby('product_name')['order_id'].nunique()

# 生成商品对
pairs = []
for order_id, group in df.groupby('order_id'):
    products = group['product_name'].unique()
    for p1, p2 in combinations(sorted(products), 2):
        pairs.append({'product_a': p1, 'product_b': p2, 'order_id': order_id})

pairs_df = pd.DataFrame(pairs)
co_occurrence = pairs_df.groupby(['product_a', 'product_b']).size().reset_index(name='co_occurrence')

co_occurrence['support'] = round(co_occurrence['co_occurrence'] / total_orders, 2)
co_occurrence['confidence'] = round(co_occurrence.apply(
    lambda r: r['co_occurrence'] / product_counts[r['product_a']], axis=1), 2)
co_occurrence['lift'] = round(co_occurrence.apply(
    lambda r: (r['co_occurrence'] / total_orders) / 
    ((product_counts[r['product_a']] / total_orders) * (product_counts[r['product_b']] / total_orders)), axis=1), 2)

result = co_occurrence[co_occurrence['support'] >= 0.3].sort_values(['lift', 'support'], ascending=[False, False])`,
    ],
    explanation: "零售推荐核心算法。牛奶→面包提升度1.25表示买牛奶的人买面包的概率比随机高25%。可用于货架布局、捆绑促销。",
  },
  {
    id: "sql-win-14",
    title: "【制造业】设备故障预测",
    category: "window",
    difficulty: 4,
    keywords: ["时序分析", "异常检测", "预测性维护"],
    tables: `sensor_readings(machine_id VARCHAR, timestamp DATETIME, temperature DECIMAL, vibration DECIMAL, pressure DECIMAL)`,
    sampleData: `| machine_id | timestamp           | temperature | vibration | pressure |
|------------|---------------------|-------------|-----------|----------|
| M001       | 2024-01-01 00:00:00 | 75.0        | 2.1       | 100      |
| M001       | 2024-01-01 01:00:00 | 76.5        | 2.3       | 102      |
| M001       | 2024-01-01 02:00:00 | 85.0        | 3.5       | 105      |
| M001       | 2024-01-01 03:00:00 | 92.0        | 4.2       | 110      |
| M001       | 2024-01-01 04:00:00 | 95.0        | 4.8       | 115      |
| M002       | 2024-01-01 00:00:00 | 72.0        | 2.0       | 98       |
| M002       | 2024-01-01 01:00:00 | 73.0        | 2.1       | 99       |
| M002       | 2024-01-01 02:00:00 | 74.0        | 2.2       | 100      |

阈值：温度>90 或 振动>4.0 或 压力>110 或 3小时内上升>15%`,
    expectedOutput: `| machine_id | alert_time          | temperature | temp_increase | vibration | vib_increase | risk_level |
|------------|---------------------|-------------|---------------|-----------|--------------|------------|
| M001       | 2024-01-01 03:00:00 | 92.0        | 20.7%         | 4.2       | 100.0%       | 高风险     |
| M001       | 2024-01-01 04:00:00 | 95.0        | 11.7%         | 4.8       | 37.1%        | 高风险     |

说明：M001设备温度和振动持续攀升，需立即检修`,
    description: "监测设备参数异常，预警故障风险",
    sqlSolutions: [
      `WITH metrics_change AS (
  SELECT 
    machine_id, timestamp, temperature, vibration, pressure,
    LAG(temperature, 3) OVER(PARTITION BY machine_id ORDER BY timestamp) AS temp_3h_ago,
    LAG(vibration, 3) OVER(PARTITION BY machine_id ORDER BY timestamp) AS vib_3h_ago,
    ROUND(100.0 * (temperature - LAG(temperature, 3) OVER(PARTITION BY machine_id ORDER BY timestamp)) / 
      LAG(temperature, 3) OVER(PARTITION BY machine_id ORDER BY timestamp), 1) AS temp_increase,
    ROUND(100.0 * (vibration - LAG(vibration, 3) OVER(PARTITION BY machine_id ORDER BY timestamp)) / 
      LAG(vibration, 3) OVER(PARTITION BY machine_id ORDER BY timestamp), 1) AS vib_increase
  FROM sensor_readings
),
risk_detect AS (
  SELECT 
    machine_id, timestamp AS alert_time, temperature, temp_increase, vibration, vib_increase,
    CASE 
      WHEN temperature > 90 OR vibration > 4.0 OR pressure > 110 OR temp_increase > 15 THEN '高风险'
      WHEN temperature > 80 OR vibration > 3.0 OR pressure > 105 OR temp_increase > 10 THEN '中风险'
      ELSE '正常'
    END AS risk_level
  FROM metrics_change
  WHERE temperature > 90 OR vibration > 4.0 OR pressure > 110 OR temp_increase > 15
)
SELECT * FROM risk_detect
ORDER BY machine_id, alert_time;`,
    ],
    pandasSolutions: [
      `df = df.sort_values(['machine_id', 'timestamp'])

df['temp_3h_ago'] = df.groupby('machine_id')['temperature'].shift(3)
df['vib_3h_ago'] = df.groupby('machine_id')['vibration'].shift(3)
df['temp_increase'] = round(100 * (df['temperature'] - df['temp_3h_ago']) / df['temp_3h_ago'], 1)
df['vib_increase'] = round(100 * (df['vibration'] - df['vib_3h_ago']) / df['vib_3h_ago'], 1)

df['risk_level'] = '正常'
df.loc[(df['temperature'] > 80) | (df['vibration'] > 3.0) | (df['pressure'] > 105) | (df['temp_increase'] > 10), 'risk_level'] = '中风险'
df.loc[(df['temperature'] > 90) | (df['vibration'] > 4.0) | (df['pressure'] > 110) | (df['temp_increase'] > 15), 'risk_level'] = '高风险'

result = df[df['risk_level'] == '高风险'][['machine_id', 'timestamp', 'temperature', 'temp_increase', 'vibration', 'vib_increase', 'risk_level']].rename(columns={'timestamp': 'alert_time'})`,
    ],
    explanation: "工业IoT预测性维护。M001设备温度3小时上升20.7%，振动翻倍，高风险预警。可避免计划外停机，降低维护成本。",
  },
  {
    id: "sql-biz-18",
    title: "【房产】楼盘估值模型",
    category: "business",
    difficulty: 4,
    keywords: ["估值", "特征工程", "回归分析"],
    tables: `properties(property_id INT, district VARCHAR, area_sqm DECIMAL, age_years INT, floor INT, total_floors INT, price DECIMAL, sold_date DATE)`,
    sampleData: `| property_id | district | area_sqm | age_years | floor | total_floors | price  | sold_date  |
|-------------|----------|----------|-----------|-------|--------------|--------|------------|
| 1           | 朝阳     | 90       | 5         | 10    | 20           | 900    | 2024-01-15 |
| 2           | 朝阳     | 120      | 3         | 15    | 25           | 1320   | 2024-01-20 |
| 3           | 海淀     | 80       | 10        | 5     | 15           | 880    | 2024-01-18 |
| 4           | 海淀     | 100      | 2         | 8     | 18           | 1200   | 2024-01-22 |
| 5           | 丰台     | 85       | 15        | 3     | 12           | 680    | 2024-01-25 |
| 6           | 朝阳     | 95       | 5         | 12    | 22           | 950    | 2024-01-28 |

说明：price单位万元`,
    expectedOutput: `| district | avg_price_sqm | sample_count | price_range      | premium_ratio |
|----------|---------------|--------------|------------------|---------------|
| 朝阳     | 10.74         | 3            | 900万-1320万     | 1.13          |
| 海淀     | 11.56         | 2            | 880万-1200万     | 1.22          |
| 丰台     | 8.00          | 1            | 680万           | 0.84          |

说明：海淀均价11.56万/平，比全市均价高22%，朝阳高13%`,
    description: "分析各区域房价水平和溢价率",
    sqlSolutions: [
      `WITH district_stats AS (
  SELECT 
    district,
    ROUND(AVG(price / area_sqm), 2) AS avg_price_sqm,
    COUNT(*) AS sample_count,
    CONCAT(MIN(price), '万-', MAX(price), '万') AS price_range
  FROM properties
  GROUP BY district
),
city_avg AS (
  SELECT ROUND(AVG(price / area_sqm), 2) AS city_avg_price FROM properties
)
SELECT 
  district, avg_price_sqm, sample_count, price_range,
  ROUND(avg_price_sqm / (SELECT city_avg_price FROM city_avg), 2) AS premium_ratio
FROM district_stats
ORDER BY avg_price_sqm DESC;`,
    ],
    pandasSolutions: [
      `df['price_per_sqm'] = df['price'] / df['area_sqm']
city_avg = df['price_per_sqm'].mean()

district_stats = df.groupby('district').agg(
    avg_price_sqm=('price_per_sqm', lambda x: round(x.mean(), 2)),
    sample_count=('property_id', 'count'),
    price_range=('price', lambda x: f"{x.min()}万-{x.max()}万")
).reset_index()

district_stats['premium_ratio'] = round(district_stats['avg_price_sqm'] / city_avg, 2)
result = district_stats.sort_values('avg_price_sqm', ascending=False)`,
    ],
    explanation: "房地产估值基础。海淀学区房溢价率1.22（比均价高22%），朝阳CBD区域1.13。实际模型需加入地铁、学校等POI特征。",
  },
  {
    id: "sql-biz-19",
    title: "【广告】投放效果归因（多触点）",
    category: "business",
    difficulty: 5,
    keywords: ["多触点归因", "Shapley值", "线性归因"],
    tables: `ad_touches(user_id INT, channel VARCHAR, touch_time DATETIME, cost DECIMAL, converted INT)`,
    sampleData: `| user_id | channel  | touch_time          | cost | converted |
|---------|----------|---------------------|------|-----------|
| 1       | SEM      | 2024-01-01 10:00:00 | 5    | 0         |
| 1       | Display  | 2024-01-02 11:00:00 | 3    | 0         |
| 1       | Social   | 2024-01-03 12:00:00 | 2    | 0         |
| 1       | Email    | 2024-01-04 13:00:00 | 1    | 1         |
| 2       | SEM      | 2024-01-01 09:00:00 | 5    | 0         |
| 2       | Email    | 2024-01-02 10:00:00 | 1    | 1         |
| 3       | Display  | 2024-01-03 14:00:00 | 3    | 0         |
| 3       | Social   | 2024-01-04 15:00:00 | 2    | 0         |

说明：用户1经过SEM→Display→Social→Email后转化`,
    expectedOutput: `使用线性归因模型（每个触点平均分配）：
| channel | total_cost | conversions | attributed_value | ROI   |
|---------|------------|-------------|------------------|-------|
| SEM     | 10         | 2           | 0.75             | 7.5%  |
| Email   | 2          | 2           | 0.75             | 37.5% |
| Display | 6          | 1           | 0.25             | 4.2%  |
| Social  | 4          | 1           | 0.25             | 6.3%  |

说明：用户1转化分配给4个渠道各0.25，用户2分配给2个渠道各0.5`,
    description: "多触点归因：将转化价值分配给用户旅程中的所有触点",
    sqlSolutions: [
      `WITH user_paths AS (
  SELECT 
    user_id,
    MAX(converted) AS is_converted,
    COUNT(*) AS touch_count
  FROM ad_touches
  GROUP BY user_id
  HAVING MAX(converted) = 1
),
attribution AS (
  SELECT 
    a.channel,
    a.cost,
    1.0 / p.touch_count AS attributed_value
  FROM ad_touches a
  JOIN user_paths p ON a.user_id = p.user_id
  WHERE p.is_converted = 1
),
metrics AS (
  SELECT 
    channel,
    SUM(cost) AS total_cost,
    COUNT(DISTINCT CASE WHEN attributed_value > 0 THEN user_id END) AS conversions,
    ROUND(SUM(attributed_value), 2) AS attributed_value
  FROM attribution
  JOIN ad_touches USING(channel, cost)
  GROUP BY channel
)
SELECT 
  channel, total_cost, conversions, attributed_value,
  CONCAT(ROUND(100.0 * attributed_value / total_cost, 1), '%') AS ROI
FROM metrics
ORDER BY attributed_value DESC;`,
    ],
    pandasSolutions: [
      `# 识别转化用户
converted_users = df[df['converted'] == 1]['user_id'].unique()
df_converted = df[df['user_id'].isin(converted_users)]

# 计算每个用户的触点数
touch_counts = df_converted.groupby('user_id').size()
df_converted['attributed_value'] = df_converted['user_id'].map(lambda x: 1.0 / touch_counts[x])

# 按渠道汇总
channel_metrics = df.groupby('channel').agg(
    total_cost=('cost', 'sum'),
    conversions=('user_id', lambda x: x[x.isin(converted_users)].nunique())
).reset_index()

attribution_sum = df_converted.groupby('channel')['attributed_value'].sum().round(2)
channel_metrics = channel_metrics.merge(attribution_sum.rename('attributed_value'), on='channel', how='left').fillna(0)
channel_metrics['ROI'] = (100 * channel_metrics['attributed_value'] / channel_metrics['total_cost']).round(1).astype(str) + '%'

result = channel_metrics.sort_values('attributed_value', ascending=False)`,
    ],
    explanation: "营销归因高级模型。线性归因给每个触点平均分配权重。Email ROI最高37.5%，SEM虽成本高但作为首次触点价值大。",
  },
  
  // ========== 第七批10题（更多行业） ==========
  {
    id: "sql-biz-20",
    title: "【保险】理赔欺诈识别",
    category: "business",
    difficulty: 5,
    keywords: ["欺诈检测", "异常模式", "关联分析"],
    tables: `claims(claim_id INT, policy_id INT, claimant_name VARCHAR, claim_date DATE, claim_amount DECIMAL, hospital VARCHAR, diagnosis VARCHAR, doctor_name VARCHAR)`,
    sampleData: `| claim_id | policy_id | claimant_name | claim_date | claim_amount | hospital | diagnosis | doctor_name |
|----------|-----------|---------------|------------|--------------|----------|-----------|-------------|
| 1        | 1001      | 张三          | 2024-01-05 | 50000        | 人民医院 | 骨折      | 李医生      |
| 2        | 1002      | 李四          | 2024-01-06 | 48000        | 人民医院 | 骨折      | 李医生      |
| 3        | 1003      | 王五          | 2024-01-07 | 52000        | 人民医院 | 骨折      | 李医生      |
| 4        | 1004      | 赵六          | 2024-01-10 | 51000        | 人民医院 | 骨折      | 李医生      |
| 5        | 1005      | 张三          | 2024-02-01 | 30000        | 仁爱医院 | 扭伤      | 王医生      |
| 6        | 1006      | 钱七          | 2024-01-15 | 20000        | 中心医院 | 感冒      | 陈医生      |
| 7        | 1007      | 孙八          | 2024-01-20 | 80000        | 人民医院 | 骨折      | 李医生      |

规则：同一医生+医院短期内高频理赔，或个人多次理赔`,
    expectedOutput: `| risk_pattern           | claim_count | total_amount | involved_persons | risk_score |
|------------------------|-------------|--------------|------------------|------------|
| 人民医院-李医生-骨折   | 5           | 281000       | 张三,李四,王五,赵六,孙八 | 95         |
| 张三-多次理赔          | 2           | 80000        | 张三             | 75         |

说明：李医生5例骨折高额理赔，金额相近，疑似团伙欺诈`,
    description: "识别理赔欺诈模式（医生+医院+诊断集中，个人频繁理赔）",
    sqlSolutions: [
      `WITH doctor_hospital_pattern AS (
  SELECT 
    CONCAT(hospital, '-', doctor_name, '-', diagnosis) AS risk_pattern,
    COUNT(*) AS claim_count,
    SUM(claim_amount) AS total_amount,
    GROUP_CONCAT(DISTINCT claimant_name) AS involved_persons,
    CASE 
      WHEN COUNT(*) >= 4 AND STDDEV(claim_amount) < AVG(claim_amount) * 0.1 THEN 95
      WHEN COUNT(*) >= 3 THEN 80
      ELSE 50
    END AS risk_score
  FROM claims
  WHERE claim_date >= DATE_SUB(CURDATE(), INTERVAL 60 DAY)
  GROUP BY hospital, doctor_name, diagnosis
  HAVING COUNT(*) >= 3
),
individual_pattern AS (
  SELECT 
    CONCAT(claimant_name, '-多次理赔') AS risk_pattern,
    COUNT(*) AS claim_count,
    SUM(claim_amount) AS total_amount,
    claimant_name AS involved_persons,
    75 AS risk_score
  FROM claims
  WHERE claim_date >= DATE_SUB(CURDATE(), INTERVAL 180 DAY)
  GROUP BY claimant_name
  HAVING COUNT(*) >= 2
)
SELECT * FROM (
  SELECT * FROM doctor_hospital_pattern
  UNION ALL
  SELECT * FROM individual_pattern
) combined
WHERE risk_score >= 75
ORDER BY risk_score DESC, total_amount DESC;`,
    ],
    pandasSolutions: [
      `from datetime import datetime, timedelta

df['claim_date'] = pd.to_datetime(df['claim_date'])
recent_date = df['claim_date'].max()

# 医生-医院-诊断模式
pattern1 = df[df['claim_date'] >= recent_date - timedelta(days=60)].groupby(['hospital', 'doctor_name', 'diagnosis']).agg(
    claim_count=('claim_id', 'count'),
    total_amount=('claim_amount', 'sum'),
    involved_persons=('claimant_name', lambda x: ','.join(x.unique())),
    amount_std=('claim_amount', 'std'),
    amount_avg=('claim_amount', 'mean')
).reset_index()
pattern1['risk_pattern'] = pattern1['hospital'] + '-' + pattern1['doctor_name'] + '-' + pattern1['diagnosis']
pattern1['risk_score'] = 50
pattern1.loc[pattern1['claim_count'] >= 3, 'risk_score'] = 80
pattern1.loc[(pattern1['claim_count'] >= 4) & (pattern1['amount_std'] < pattern1['amount_avg'] * 0.1), 'risk_score'] = 95
pattern1 = pattern1[pattern1['claim_count'] >= 3][['risk_pattern', 'claim_count', 'total_amount', 'involved_persons', 'risk_score']]

# 个人多次理赔
pattern2 = df[df['claim_date'] >= recent_date - timedelta(days=180)].groupby('claimant_name').agg(
    claim_count=('claim_id', 'count'),
    total_amount=('claim_amount', 'sum')
).reset_index()
pattern2 = pattern2[pattern2['claim_count'] >= 2]
pattern2['risk_pattern'] = pattern2['claimant_name'] + '-多次理赔'
pattern2['involved_persons'] = pattern2['claimant_name']
pattern2['risk_score'] = 75
pattern2 = pattern2[['risk_pattern', 'claim_count', 'total_amount', 'involved_persons', 'risk_score']]

result = pd.concat([pattern1, pattern2]).sort_values(['risk_score', 'total_amount'], ascending=[False, False])`,
    ],
    explanation: "保险风控核心。李医生5例骨折理赔金额在48000-52000间，标准差小疑似串通。张三半年内2次理赔也需关注。实际需结合更多特征。",
  },
  {
    id: "sql-biz-21",
    title: "【酒店】动态房价优化（RevPAR）",
    category: "business",
    difficulty: 4,
    keywords: ["收益管理", "RevPAR", "入住率"],
    tables: `hotel_inventory(hotel_id INT, date DATE, total_rooms INT, occupied_rooms INT, avg_price DECIMAL, revenue DECIMAL)`,
    sampleData: `| hotel_id | date       | total_rooms | occupied_rooms | avg_price | revenue |
|----------|------------|-------------|----------------|-----------|---------|
| 1        | 2024-01-01 | 100         | 70             | 500       | 35000   |
| 1        | 2024-01-02 | 100         | 85             | 480       | 40800   |
| 1        | 2024-01-03 | 100         | 95             | 520       | 49400   |
| 1        | 2024-01-04 | 100         | 60             | 450       | 27000   |
| 2        | 2024-01-01 | 150         | 120            | 400       | 48000   |
| 2        | 2024-01-02 | 150         | 135            | 420       | 56700   |
| 2        | 2024-01-03 | 150         | 140            | 450       | 63000   |

RevPAR = 实际收益 / 总房间数，衡量每间房平均收益（含空置）`,
    expectedOutput: `| hotel_id | avg_occupancy_rate | avg_adr | revpar | optimal_price_suggestion |
|----------|-------------------|---------|--------|--------------------------|
| 2        | 88.33%            | 423.33  | 373.89 | 维持当前定价             |
| 1        | 77.50%            | 487.50  | 378.00 | 降价5%提升入住率         |

说明：酒店1入住率77.5%低于行业85%，建议降价刺激需求`,
    description: "计算RevPAR，优化房价策略",
    sqlSolutions: [
      `WITH hotel_metrics AS (
  SELECT 
    hotel_id,
    ROUND(100.0 * AVG(occupied_rooms) / AVG(total_rooms), 2) AS avg_occupancy_rate,
    ROUND(AVG(avg_price), 2) AS avg_adr,
    ROUND(AVG(revenue / total_rooms), 2) AS revpar
  FROM hotel_inventory
  GROUP BY hotel_id
),
pricing_advice AS (
  SELECT 
    *,
    CASE 
      WHEN avg_occupancy_rate >= 85 AND revpar >= 350 THEN '维持当前定价'
      WHEN avg_occupancy_rate < 75 THEN '降价5%提升入住率'
      WHEN avg_occupancy_rate > 90 THEN '涨价10%优化收益'
      ELSE '小幅调整测试市场反应'
    END AS optimal_price_suggestion
  FROM hotel_metrics
)
SELECT * FROM pricing_advice
ORDER BY revpar DESC;`,
    ],
    pandasSolutions: [
      `hotel_metrics = df.groupby('hotel_id').agg(
    avg_occupancy_rate=('occupied_rooms', lambda x: round(100 * x.mean() / df.groupby('hotel_id')['total_rooms'].mean()[x.name], 2)),
    avg_adr=('avg_price', lambda x: round(x.mean(), 2)),
    revpar=('revenue', lambda x: round((x / df[df['hotel_id'] == x.name]['total_rooms']).mean(), 2))
).reset_index()

def pricing_advice(row):
    if row['avg_occupancy_rate'] >= 85 and row['revpar'] >= 350:
        return '维持当前定价'
    elif row['avg_occupancy_rate'] < 75:
        return '降价5%提升入住率'
    elif row['avg_occupancy_rate'] > 90:
        return '涨价10%优化收益'
    else:
        return '小幅调整测试市场反应'

hotel_metrics['optimal_price_suggestion'] = hotel_metrics.apply(pricing_advice, axis=1)
hotel_metrics['avg_occupancy_rate'] = hotel_metrics['avg_occupancy_rate'].astype(str) + '%'
result = hotel_metrics.sort_values('revpar', ascending=False)`,
    ],
    explanation: "酒店收益管理核心指标。RevPAR=入住率×ADR（平均房价）。酒店1虽单价高但入住率低，降价可提升总收益。酒店2表现优秀。",
  },
  {
    id: "sql-biz-22",
    title: "【餐饮】翻台率与高峰时段分析",
    category: "business",
    difficulty: 3,
    keywords: ["翻台率", "时段分析", "坪效"],
    tables: `restaurant_orders(order_id INT, table_id INT, party_size INT, order_time DATETIME, finish_time DATETIME, amount DECIMAL)`,
    sampleData: `| order_id | table_id | party_size | order_time          | finish_time         | amount |
|----------|----------|------------|---------------------|---------------------|--------|
| 1        | 1        | 4          | 2024-01-01 12:00:00 | 2024-01-01 13:00:00 | 280    |
| 2        | 1        | 2          | 2024-01-01 13:15:00 | 2024-01-01 14:00:00 | 150    |
| 3        | 1        | 3          | 2024-01-01 18:30:00 | 2024-01-01 20:00:00 | 420    |
| 4        | 2        | 6          | 2024-01-01 12:30:00 | 2024-01-01 14:00:00 | 680    |
| 5        | 2        | 4          | 2024-01-01 18:00:00 | 2024-01-01 19:30:00 | 520    |
| 6        | 3        | 2          | 2024-01-01 19:00:00 | 2024-01-01 20:00:00 | 180    |
| 7        | 1        | 4          | 2024-01-01 20:15:00 | 2024-01-01 21:30:00 | 360    |

营业时间：12:00-22:00，共10小时`,
    expectedOutput: `| table_id | turnover_rate | total_orders | avg_dining_time | revenue_per_hour | peak_period |
|----------|---------------|--------------|-----------------|------------------|-------------|
| 1        | 4             | 4            | 67.5            | 121.0            | 晚餐        |
| 2        | 2             | 2            | 82.5            | 120.0            | 午餐+晚餐   |
| 3        | 1             | 1            | 60.0            | 18.0             | 晚餐        |

说明：桌1翻台率4次/天最高，平均用餐67.5分钟，每小时营收121元`,
    description: "计算翻台率、用餐时长、时段营收",
    sqlSolutions: [
      `WITH table_metrics AS (
  SELECT 
    table_id,
    COUNT(*) AS total_orders,
    COUNT(*) / 10.0 AS turnover_rate,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, order_time, finish_time)), 1) AS avg_dining_time,
    ROUND(SUM(amount) / 10.0, 1) AS revenue_per_hour,
    CASE 
      WHEN SUM(CASE WHEN HOUR(order_time) BETWEEN 12 AND 14 THEN 1 ELSE 0 END) >= 1 
           AND SUM(CASE WHEN HOUR(order_time) BETWEEN 18 AND 21 THEN 1 ELSE 0 END) >= 1 THEN '午餐+晚餐'
      WHEN SUM(CASE WHEN HOUR(order_time) BETWEEN 12 AND 14 THEN 1 ELSE 0 END) >= 1 THEN '午餐'
      WHEN SUM(CASE WHEN HOUR(order_time) BETWEEN 18 AND 21 THEN 1 ELSE 0 END) >= 1 THEN '晚餐'
      ELSE '其他'
    END AS peak_period
  FROM restaurant_orders
  GROUP BY table_id
)
SELECT * FROM table_metrics
ORDER BY revenue_per_hour DESC;`,
    ],
    pandasSolutions: [
      `df['order_time'] = pd.to_datetime(df['order_time'])
df['finish_time'] = pd.to_datetime(df['finish_time'])
df['dining_minutes'] = (df['finish_time'] - df['order_time']).dt.total_seconds() / 60
df['hour'] = df['order_time'].dt.hour

operating_hours = 10

table_metrics = df.groupby('table_id').agg(
    total_orders=('order_id', 'count'),
    avg_dining_time=('dining_minutes', lambda x: round(x.mean(), 1)),
    revenue_per_hour=('amount', lambda x: round(x.sum() / operating_hours, 1)),
    lunch_orders=('hour', lambda x: sum((x >= 12) & (x <= 14))),
    dinner_orders=('hour', lambda x: sum((x >= 18) & (x <= 21)))
).reset_index()

table_metrics['turnover_rate'] = table_metrics['total_orders'] / operating_hours

def get_peak(row):
    if row['lunch_orders'] >= 1 and row['dinner_orders'] >= 1:
        return '午餐+晚餐'
    elif row['lunch_orders'] >= 1:
        return '午餐'
    elif row['dinner_orders'] >= 1:
        return '晚餐'
    return '其他'

table_metrics['peak_period'] = table_metrics.apply(get_peak, axis=1)
result = table_metrics[['table_id', 'turnover_rate', 'total_orders', 'avg_dining_time', 'revenue_per_hour', 'peak_period']].sort_values('revenue_per_hour', ascending=False)`,
    ],
    explanation: "餐饮经营核心指标。桌1翻台率4次坪效最高，用餐时间控制在67分钟利于周转。可针对低翻台率桌位优化座位安排或推出限时优惠。",
  },
  {
    id: "sql-interview-18",
    title: "【社交媒体】影响力传播路径（病毒系数）",
    category: "interview",
    difficulty: 5,
    keywords: ["病毒传播", "K因子", "网络效应"],
    tables: `user_invites(inviter_id INT, invitee_id INT, invite_time DATETIME, accepted INT)`,
    sampleData: `| inviter_id | invitee_id | invite_time         | accepted |
|------------|------------|---------------------|----------|
| 1          | 2          | 2024-01-01 10:00:00 | 1        |
| 1          | 3          | 2024-01-01 11:00:00 | 1        |
| 1          | 4          | 2024-01-01 12:00:00 | 0        |
| 2          | 5          | 2024-01-02 09:00:00 | 1        |
| 2          | 6          | 2024-01-02 10:00:00 | 1        |
| 2          | 7          | 2024-01-02 11:00:00 | 1        |
| 3          | 8          | 2024-01-03 14:00:00 | 1        |
| 5          | 9          | 2024-01-04 15:00:00 | 1        |
| 5          | 10         | 2024-01-04 16:00:00 | 0        |

病毒系数K = 平均邀请成功数，K>1表示增长`,
    expectedOutput: `| generation | user_count | invites_sent | successful_invites | k_factor | growth_rate |
|------------|------------|--------------|-----------------------|----------|-------------|
| 0          | 1          | 3            | 2                     | 2.00     | -           |
| 1          | 2          | 5            | 4                     | 2.00     | 100%        |
| 2          | 4          | 2            | 1                     | 0.25     | -75%        |

说明：前2代K因子为2（每用户带来2个新用户），第3代衰减到0.25`,
    description: "分析用户增长的病毒传播效应（K因子、代际增长）",
    sqlSolutions: [
      `WITH RECURSIVE generations AS (
  -- 第0代：种子用户
  SELECT 1 AS inviter_id, 0 AS generation
  UNION ALL
  -- 递归计算后续代
  SELECT ui.invitee_id, g.generation + 1
  FROM generations g
  JOIN user_invites ui ON g.inviter_id = ui.inviter_id AND ui.accepted = 1
  WHERE g.generation < 10
),
gen_stats AS (
  SELECT 
    g.generation,
    COUNT(DISTINCT g.inviter_id) AS user_count,
    COUNT(ui.invitee_id) AS invites_sent,
    SUM(ui.accepted) AS successful_invites
  FROM generations g
  LEFT JOIN user_invites ui ON g.inviter_id = ui.inviter_id
  GROUP BY g.generation
)
SELECT 
  generation,
  user_count,
  invites_sent,
  successful_invites,
  ROUND(successful_invites * 1.0 / user_count, 2) AS k_factor,
  CASE 
    WHEN LAG(user_count) OVER(ORDER BY generation) IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (user_count - LAG(user_count) OVER(ORDER BY generation)) / LAG(user_count) OVER(ORDER BY generation), 0), '%')
  END AS growth_rate
FROM gen_stats
ORDER BY generation;`,
    ],
    pandasSolutions: [
      `# 构建代际关系
generations = {1: 0}  # 种子用户
queue = [1]
max_gen = 10

while queue and max(generations.values()) < max_gen:
    current = queue.pop(0)
    current_gen = generations[current]
    
    invites = df[(df['inviter_id'] == current) & (df['accepted'] == 1)]
    for invitee in invites['invitee_id']:
        if invitee not in generations:
            generations[invitee] = current_gen + 1
            queue.append(invitee)

# 统计每代指标
gen_df = pd.DataFrame(list(generations.items()), columns=['user_id', 'generation'])
invite_stats = df.merge(gen_df, left_on='inviter_id', right_on='user_id', how='right')

result = invite_stats.groupby('generation').agg(
    user_count=('user_id', 'nunique'),
    invites_sent=('invitee_id', 'count'),
    successful_invites=('accepted', 'sum')
).reset_index()

result['k_factor'] = round(result['successful_invites'] / result['user_count'], 2)
result['growth_rate'] = result['user_count'].pct_change().fillna(0).apply(lambda x: f"{int(x*100)}%" if x != 0 else "-")`,
    ],
    explanation: "增长黑客核心指标。K因子2表示每个用户带来2个新用户，实现指数增长。第3代衰减需优化邀请机制（奖励、分享便捷性）。",
  },
  {
    id: "sql-biz-23",
    title: "【出行】拼车匹配优化",
    category: "business",
    difficulty: 4,
    keywords: ["匹配算法", "路径优化", "空间索引"],
    tables: `ride_requests(request_id INT, user_id INT, pickup_lat DECIMAL, pickup_lng DECIMAL, dropoff_lat DECIMAL, dropoff_lng DECIMAL, request_time DATETIME, max_detour_min INT)`,
    sampleData: `| request_id | user_id | pickup_lat | pickup_lng | dropoff_lat | dropoff_lng | request_time        | max_detour_min |
|------------|---------|------------|------------|-------------|-------------|---------------------|----------------|
| 1          | 101     | 39.900     | 116.400    | 39.920      | 116.450     | 2024-01-01 08:00:00 | 10             |
| 2          | 102     | 39.905     | 116.405    | 39.925      | 116.455     | 2024-01-01 08:02:00 | 15             |
| 3          | 103     | 39.950     | 116.500    | 39.970      | 116.550     | 2024-01-01 08:01:00 | 10             |
| 4          | 104     | 39.902     | 116.402    | 39.918      | 116.448     | 2024-01-01 08:03:00 | 20             |

说明：使用简化距离计算，实际需Haversine公式`,
    expectedOutput: `| pool_id | matched_users     | pickup_proximity | dropoff_proximity | estimated_savings |
|---------|-------------------|------------------|-------------------|-------------------|
| P1      | 101,102,104       | 0.008            | 0.010             | 35%               |
| P2      | 103               | -                | -                 | 0%                |

说明：用户101、102、104上车点相近（0.008度≈900米），可拼车节省35%费用`,
    description: "根据上下车位置、时间窗口匹配拼车订单",
    sqlSolutions: [
      `WITH proximity_pairs AS (
  SELECT 
    r1.request_id AS req1,
    r2.request_id AS req2,
    r1.user_id AS user1,
    r2.user_id AS user2,
    SQRT(POW(r1.pickup_lat - r2.pickup_lat, 2) + POW(r1.pickup_lng - r2.pickup_lng, 2)) AS pickup_dist,
    SQRT(POW(r1.dropoff_lat - r2.dropoff_lat, 2) + POW(r1.dropoff_lng - r2.dropoff_lng, 2)) AS dropoff_dist,
    ABS(TIMESTAMPDIFF(MINUTE, r1.request_time, r2.request_time)) AS time_diff
  FROM ride_requests r1
  JOIN ride_requests r2 ON r1.request_id < r2.request_id
  WHERE SQRT(POW(r1.pickup_lat - r2.pickup_lat, 2) + POW(r1.pickup_lng - r2.pickup_lng, 2)) < 0.01
    AND SQRT(POW(r1.dropoff_lat - r2.dropoff_lat, 2) + POW(r1.dropoff_lng - r2.dropoff_lng, 2)) < 0.01
    AND ABS(TIMESTAMPDIFF(MINUTE, r1.request_time, r2.request_time)) <= 5
),
pools AS (
  SELECT 
    ROW_NUMBER() OVER() AS pool_id,
    GROUP_CONCAT(DISTINCT user1, ',', user2) AS matched_users,
    ROUND(AVG(pickup_dist), 3) AS pickup_proximity,
    ROUND(AVG(dropoff_dist), 3) AS dropoff_proximity,
    CONCAT(ROUND(30 + COUNT(*) * 5, 0), '%') AS estimated_savings
  FROM proximity_pairs
  GROUP BY req1
  HAVING COUNT(*) >= 1
)
SELECT 
  CONCAT('P', pool_id) AS pool_id,
  matched_users,
  pickup_proximity,
  dropoff_proximity,
  estimated_savings
FROM pools
UNION ALL
SELECT 
  'P2' AS pool_id,
  CAST(user_id AS CHAR) AS matched_users,
  '-' AS pickup_proximity,
  '-' AS dropoff_proximity,
  '0%' AS estimated_savings
FROM ride_requests
WHERE request_id NOT IN (SELECT req1 FROM proximity_pairs UNION SELECT req2 FROM proximity_pairs);`,
    ],
    pandasSolutions: [
      `import numpy as np

def distance(lat1, lng1, lat2, lng2):
    return np.sqrt((lat1 - lat2)**2 + (lng1 - lng2)**2)

pools = []
matched = set()

for i, row1 in df.iterrows():
    if row1['request_id'] in matched:
        continue
    
    pool = [row1['user_id']]
    pickup_dists = []
    dropoff_dists = []
    
    for j, row2 in df.iterrows():
        if i >= j or row2['request_id'] in matched:
            continue
        
        pickup_dist = distance(row1['pickup_lat'], row1['pickup_lng'], row2['pickup_lat'], row2['pickup_lng'])
        dropoff_dist = distance(row1['dropoff_lat'], row1['dropoff_lng'], row2['dropoff_lat'], row2['dropoff_lng'])
        time_diff = abs((pd.to_datetime(row1['request_time']) - pd.to_datetime(row2['request_time'])).total_seconds() / 60)
        
        if pickup_dist < 0.01 and dropoff_dist < 0.01 and time_diff <= 5:
            pool.append(row2['user_id'])
            matched.add(row2['request_id'])
            pickup_dists.append(pickup_dist)
            dropoff_dists.append(dropoff_dist)
    
    if len(pool) > 1:
        pools.append({
            'pool_id': f'P{len(pools)+1}',
            'matched_users': ','.join(map(str, pool)),
            'pickup_proximity': round(np.mean(pickup_dists), 3),
            'dropoff_proximity': round(np.mean(dropoff_dists), 3),
            'estimated_savings': f"{30 + len(pool) * 5}%"
        })

result = pd.DataFrame(pools)`,
    ],
    explanation: "共享出行核心算法。用户101、102、104上下车点相近（<1km），时间窗口5分钟内，可拼车。3人拼车节省35%成本，提升车辆利用率。",
  },
  {
    id: "sql-win-15",
    title: "【能源】智能电网负荷预测",
    category: "window",
    difficulty: 4,
    keywords: ["时序预测", "移动平均", "趋势分析"],
    tables: `power_consumption(timestamp DATETIME, region VARCHAR, load_mw DECIMAL, temperature DECIMAL, is_holiday INT)`,
    sampleData: `| timestamp           | region | load_mw | temperature | is_holiday |
|---------------------|--------|---------|-------------|------------|
| 2024-01-01 00:00:00 | 北京   | 12000   | -5          | 1          |
| 2024-01-01 01:00:00 | 北京   | 11500   | -6          | 1          |
| 2024-01-01 02:00:00 | 北京   | 11000   | -6          | 1          |
| 2024-01-01 12:00:00 | 北京   | 15000   | 2           | 1          |
| 2024-01-01 18:00:00 | 北京   | 18000   | -1          | 1          |
| 2024-01-01 19:00:00 | 北京   | 19000   | -2          | 1          |
| 2024-01-01 20:00:00 | 北京   | 18500   | -3          | 1          |
| 2024-01-02 12:00:00 | 北京   | 16000   | 3           | 0          |

说明：load_mw为用电负荷（兆瓦）`,
    expectedOutput: `| timestamp           | region | actual_load | ma_3h | ma_24h | peak_flag | forecast_next_hour |
|---------------------|--------|-------------|-------|--------|-----------|---------------------|
| 2024-01-01 18:00:00 | 北京   | 18000       | 16000 | 14500  | 高峰      | 18800               |
| 2024-01-01 19:00:00 | 北京   | 19000       | 18500 | 14800  | 高峰      | 19200               |
| 2024-01-01 20:00:00 | 北京   | 18500       | 18833 | 15000  | 高峰      | 18200               |

说明：19点达到峰值19000MW，3小时移动平均18500MW，预测下一小时略降`,
    description: "基于历史数据预测电力负荷，识别用电高峰",
    sqlSolutions: [
      `WITH load_metrics AS (
  SELECT 
    timestamp, region, load_mw AS actual_load, temperature,
    ROUND(AVG(load_mw) OVER(PARTITION BY region ORDER BY timestamp ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS ma_3h,
    ROUND(AVG(load_mw) OVER(PARTITION BY region ORDER BY timestamp ROWS BETWEEN 23 PRECEDING AND CURRENT ROW), 0) AS ma_24h,
    LAG(load_mw, 1) OVER(PARTITION BY region ORDER BY timestamp) AS prev_1h,
    LAG(load_mw, 2) OVER(PARTITION BY region ORDER BY timestamp) AS prev_2h,
    CASE 
      WHEN load_mw > AVG(load_mw) OVER(PARTITION BY region) * 1.2 THEN '高峰'
      WHEN load_mw < AVG(load_mw) OVER(PARTITION BY region) * 0.8 THEN '低谷'
      ELSE '正常'
    END AS peak_flag
  FROM power_consumption
),
forecasts AS (
  SELECT 
    *,
    ROUND(actual_load + (actual_load - prev_1h) * 0.5, 0) AS forecast_next_hour
  FROM load_metrics
  WHERE prev_2h IS NOT NULL
)
SELECT 
  timestamp, region, actual_load, ma_3h, ma_24h, peak_flag, forecast_next_hour
FROM forecasts
WHERE peak_flag = '高峰'
ORDER BY timestamp;`,
    ],
    pandasSolutions: [
      `df = df.sort_values(['region', 'timestamp'])

df['ma_3h'] = df.groupby('region')['load_mw'].rolling(3, min_periods=1).mean().reset_index(0, drop=True).round(0)
df['ma_24h'] = df.groupby('region')['load_mw'].rolling(24, min_periods=1).mean().reset_index(0, drop=True).round(0)
df['prev_1h'] = df.groupby('region')['load_mw'].shift(1)
df['prev_2h'] = df.groupby('region')['load_mw'].shift(2)

region_avg = df.groupby('region')['load_mw'].mean()
df['peak_flag'] = '正常'
df.loc[df.apply(lambda r: r['load_mw'] > region_avg[r['region']] * 1.2, axis=1), 'peak_flag'] = '高峰'
df.loc[df.apply(lambda r: r['load_mw'] < region_avg[r['region']] * 0.8, axis=1), 'peak_flag'] = '低谷'

df['forecast_next_hour'] = (df['load_mw'] + (df['load_mw'] - df['prev_1h']) * 0.5).round(0)

result = df[df['peak_flag'] == '高峰'][['timestamp', 'region', 'load_mw', 'ma_3h', 'ma_24h', 'peak_flag', 'forecast_next_hour']].rename(columns={'load_mw': 'actual_load'})`,
    ],
    explanation: "智能电网核心。19点用电高峰19000MW，超日均20%。移动平均平滑波动，简单预测基于趋势延续。实际需ARIMA、LSTM等模型。",
  },
  {
    id: "sql-biz-24",
    title: "【内容平台】创作者分级与激励",
    category: "business",
    difficulty: 4,
    keywords: ["创作者经济", "分级体系", "激励机制"],
    tables: `creator_metrics(creator_id INT, content_count INT, total_views BIGINT, total_likes INT, total_comments INT, followers INT, revenue DECIMAL, join_date DATE)`,
    sampleData: `| creator_id | content_count | total_views | total_likes | total_comments | followers | revenue | join_date  |
|------------|---------------|-------------|-------------|----------------|-----------|---------|------------|
| 1          | 50            | 5000000     | 250000      | 50000          | 100000    | 50000   | 2023-01-15 |
| 2          | 120           | 1200000     | 60000       | 12000          | 20000     | 12000   | 2023-06-01 |
| 3          | 200           | 800000      | 40000       | 8000           | 15000     | 8000    | 2022-12-01 |
| 4          | 10            | 100000      | 5000        | 1000           | 2000      | 1000    | 2024-01-01 |
| 5          | 80            | 3000000     | 150000      | 30000          | 50000     | 30000   | 2023-03-20 |

说明：根据粉丝、互动、产出综合评级`,
    expectedOutput: `| creator_id | tier | avg_views_per_content | engagement_rate | content_velocity | suggested_bonus |
|------------|------|----------------------|-----------------|------------------|-----------------|
| 1          | S    | 100000               | 6.00%           | 高产             | 10000           |
| 5          | A    | 37500                | 6.00%           | 高产             | 5000            |
| 2          | B    | 10000                | 6.00%           | 高产             | 2000            |
| 3          | C    | 4000                 | 6.00%           | 超高产           | 1000            |
| 4          | D    | 10000                | 6.00%           | 新人             | 500             |

说明：S级创作者平均每作品10万播放，互动率6%，建议激励1万元`,
    description: "根据内容质量、互动率、粉丝数对创作者分级，制定激励策略",
    sqlSolutions: [
      `WITH creator_analysis AS (
  SELECT 
    creator_id,
    ROUND(total_views * 1.0 / content_count, 0) AS avg_views_per_content,
    ROUND(100.0 * (total_likes + total_comments) / total_views, 2) AS engagement_rate,
    ROUND(content_count * 1.0 / (DATEDIFF(CURDATE(), join_date) / 30.0), 1) AS monthly_content,
    CASE 
      WHEN content_count / (DATEDIFF(CURDATE(), join_date) / 30.0) >= 10 THEN '超高产'
      WHEN content_count / (DATEDIFF(CURDATE(), join_date) / 30.0) >= 5 THEN '高产'
      WHEN DATEDIFF(CURDATE(), join_date) < 90 THEN '新人'
      ELSE '普通'
    END AS content_velocity
  FROM creator_metrics
),
tiering AS (
  SELECT 
    creator_id, avg_views_per_content, engagement_rate, content_velocity,
    CASE 
      WHEN avg_views_per_content >= 50000 AND engagement_rate >= 5 THEN 'S'
      WHEN avg_views_per_content >= 20000 AND engagement_rate >= 4 THEN 'A'
      WHEN avg_views_per_content >= 8000 AND engagement_rate >= 3 THEN 'B'
      WHEN avg_views_per_content >= 3000 THEN 'C'
      ELSE 'D'
    END AS tier
  FROM creator_analysis
)
SELECT 
  creator_id, tier, avg_views_per_content, 
  CONCAT(engagement_rate, '%') AS engagement_rate, 
  content_velocity,
  CASE tier
    WHEN 'S' THEN 10000
    WHEN 'A' THEN 5000
    WHEN 'B' THEN 2000
    WHEN 'C' THEN 1000
    ELSE 500
  END AS suggested_bonus
FROM tiering
ORDER BY FIELD(tier, 'S', 'A', 'B', 'C', 'D');`,
    ],
    pandasSolutions: [
      `df['join_date'] = pd.to_datetime(df['join_date'])
today = pd.Timestamp.today()

df['avg_views_per_content'] = (df['total_views'] / df['content_count']).round(0).astype(int)
df['engagement_rate'] = round(100 * (df['total_likes'] + df['total_comments']) / df['total_views'], 2)
df['months_active'] = ((today - df['join_date']).dt.days / 30.0).round(1)
df['monthly_content'] = (df['content_count'] / df['months_active']).round(1)

df['content_velocity'] = '普通'
df.loc[df['months_active'] < 3, 'content_velocity'] = '新人'
df.loc[df['monthly_content'] >= 5, 'content_velocity'] = '高产'
df.loc[df['monthly_content'] >= 10, 'content_velocity'] = '超高产'

df['tier'] = 'D'
df.loc[df['avg_views_per_content'] >= 3000, 'tier'] = 'C'
df.loc[(df['avg_views_per_content'] >= 8000) & (df['engagement_rate'] >= 3), 'tier'] = 'B'
df.loc[(df['avg_views_per_content'] >= 20000) & (df['engagement_rate'] >= 4), 'tier'] = 'A'
df.loc[(df['avg_views_per_content'] >= 50000) & (df['engagement_rate'] >= 5), 'tier'] = 'S'

tier_bonus = {'S': 10000, 'A': 5000, 'B': 2000, 'C': 1000, 'D': 500}
df['suggested_bonus'] = df['tier'].map(tier_bonus)

result = df[['creator_id', 'tier', 'avg_views_per_content', 'engagement_rate', 'content_velocity', 'suggested_bonus']].sort_values('tier')`,
    ],
    explanation: "创作者经济核心。S级创作者单作品10万播放+6%互动率，平台应重点激励。分级体系帮助精准运营，提升整体内容质量。",
  },
  {
    id: "sql-biz-25",
    title: "【农业】农产品溯源与质量追踪",
    category: "business",
    difficulty: 3,
    keywords: ["溯源", "供应链", "质量追溯"],
    tables: `product_trace(batch_id VARCHAR, stage VARCHAR, location VARCHAR, operator VARCHAR, timestamp DATETIME, temperature DECIMAL, quality_score INT)`,
    sampleData: `| batch_id | stage    | location | operator | timestamp           | temperature | quality_score |
|----------|----------|----------|----------|---------------------|-------------|---------------|
| B001     | 种植     | 农场A    | 张三     | 2024-01-01 08:00:00 | 25          | 95            |
| B001     | 采摘     | 农场A    | 李四     | 2024-02-01 10:00:00 | 28          | 93            |
| B001     | 包装     | 加工厂B  | 王五     | 2024-02-02 14:00:00 | 22          | 92            |
| B001     | 运输     | 冷链车C  | 赵六     | 2024-02-03 06:00:00 | 5           | 90            |
| B001     | 仓储     | 仓库D    | 钱七     | 2024-02-04 09:00:00 | 4           | 88            |
| B001     | 零售     | 超市E    | 孙八     | 2024-02-05 15:00:00 | 18          | 85            |
| B002     | 种植     | 农场F    | 周九     | 2024-01-05 08:00:00 | 26          | 90            |
| B002     | 采摘     | 农场F    | 吴十     | 2024-02-05 10:00:00 | 30          | 85            |

说明：全程质量评分100分制`,
    expectedOutput: `| batch_id | total_stages | total_duration_days | quality_drop | temp_violations | traceability_score |
|----------|--------------|---------------------|--------------|-----------------|-------------------|
| B001     | 6            | 34                  | 10           | 0               | 优秀              |
| B002     | 2            | 31                  | 5            | 1               | 良好              |

说明：B001批次经6个环节，质量从95降至85（下降10分），全程温控合格`,
    description: "追踪农产品从种植到零售全流程，评估质量变化",
    sqlSolutions: [
      `WITH batch_journey AS (
  SELECT 
    batch_id,
    COUNT(DISTINCT stage) AS total_stages,
    DATEDIFF(MAX(timestamp), MIN(timestamp)) AS total_duration_days,
    MAX(quality_score) - MIN(quality_score) AS quality_drop,
    SUM(CASE 
      WHEN stage = '运输' AND (temperature < 0 OR temperature > 10) THEN 1
      WHEN stage = '仓储' AND (temperature < 0 OR temperature > 8) THEN 1
      WHEN stage NOT IN ('运输', '仓储') AND (temperature < 15 OR temperature > 30) THEN 1
      ELSE 0
    END) AS temp_violations,
    GROUP_CONCAT(CONCAT(stage, '(', operator, ')') ORDER BY timestamp SEPARATOR '→') AS full_trace
  FROM product_trace
  GROUP BY batch_id
),
scoring AS (
  SELECT 
    *,
    CASE 
      WHEN total_stages >= 5 AND quality_drop <= 10 AND temp_violations = 0 THEN '优秀'
      WHEN total_stages >= 4 AND quality_drop <= 15 AND temp_violations <= 1 THEN '良好'
      WHEN quality_drop <= 20 THEN '合格'
      ELSE '需改进'
    END AS traceability_score
  FROM batch_journey
)
SELECT 
  batch_id, total_stages, total_duration_days, quality_drop, temp_violations, traceability_score
FROM scoring
ORDER BY traceability_score, quality_drop;`,
    ],
    pandasSolutions: [
      `df['timestamp'] = pd.to_datetime(df['timestamp'])

batch_summary = df.groupby('batch_id').agg(
    total_stages=('stage', 'nunique'),
    total_duration_days=('timestamp', lambda x: (x.max() - x.min()).days),
    quality_drop=('quality_score', lambda x: x.max() - x.min()),
    first_quality=('quality_score', 'first'),
    last_quality=('quality_score', 'last')
).reset_index()

# 温度异常检测
def check_temp_violation(row):
    if row['stage'] == '运输' and not (0 <= row['temperature'] <= 10):
        return 1
    if row['stage'] == '仓储' and not (0 <= row['temperature'] <= 8):
        return 1
    if row['stage'] not in ['运输', '仓储'] and not (15 <= row['temperature'] <= 30):
        return 1
    return 0

df['violation'] = df.apply(check_temp_violation, axis=1)
violations = df.groupby('batch_id')['violation'].sum().rename('temp_violations')
batch_summary = batch_summary.merge(violations, on='batch_id')

def score_traceability(row):
    if row['total_stages'] >= 5 and row['quality_drop'] <= 10 and row['temp_violations'] == 0:
        return '优秀'
    if row['total_stages'] >= 4 and row['quality_drop'] <= 15 and row['temp_violations'] <= 1:
        return '良好'
    if row['quality_drop'] <= 20:
        return '合格'
    return '需改进'

batch_summary['traceability_score'] = batch_summary.apply(score_traceability, axis=1)
result = batch_summary[['batch_id', 'total_stages', 'total_duration_days', 'quality_drop', 'temp_violations', 'traceability_score']]`,
    ],
    explanation: "农业供应链溯源。B001批次6个环节全程可追溯，质量下降10分在合理范围，温控合格。区块链+IoT可实现实时监控，保障食品安全。",
  },
  {
    id: "sql-interview-19",
    title: "【招聘】候选人漏斗与转化分析",
    category: "interview",
    difficulty: 3,
    keywords: ["漏斗分析", "转化率", "招聘效率"],
    tables: `recruitment_funnel(candidate_id INT, stage VARCHAR, stage_date DATE, result VARCHAR, source VARCHAR)`,
    sampleData: `| candidate_id | stage        | stage_date | result  | source   |
|--------------|--------------|------------|---------|----------|
| 1            | 简历投递     | 2024-01-01 | 通过    | 招聘网站 |
| 1            | 简历筛选     | 2024-01-02 | 通过    | 招聘网站 |
| 1            | 初试         | 2024-01-05 | 通过    | 招聘网站 |
| 1            | 复试         | 2024-01-10 | 通过    | 招聘网站 |
| 1            | Offer        | 2024-01-15 | 接受    | 招聘网站 |
| 2            | 简历投递     | 2024-01-01 | 通过    | 内推     |
| 2            | 简历筛选     | 2024-01-02 | 通过    | 内推     |
| 2            | 初试         | 2024-01-06 | 淘汰    | 内推     |
| 3            | 简历投递     | 2024-01-02 | 通过    | 校招     |
| 3            | 简历筛选     | 2024-01-03 | 淘汰    | 校招     |
| 4            | 简历投递     | 2024-01-03 | 通过    | 猎头     |
| 4            | 简历筛选     | 2024-01-04 | 通过    | 猎头     |
| 4            | 初试         | 2024-01-08 | 通过    | 猎头     |
| 4            | 复试         | 2024-01-12 | 淘汰    | 猎头     |`,
    expectedOutput: `各渠道招聘漏斗转化：
| source   | submitted | screened | first_interview | second_interview | offer_accepted | overall_conversion |
|----------|-----------|----------|-----------------|------------------|----------------|-------------------|
| 招聘网站 | 1         | 1        | 1               | 1                | 1              | 100.0%            |
| 内推     | 1         | 1        | 1               | 0                | 0              | 0.0%              |
| 校招     | 1         | 1        | 0               | 0                | 0              | 0.0%              |
| 猎头     | 1         | 1        | 1               | 1                | 0              | 0.0%              |

说明：招聘网站渠道转化率100%（1/1），猎头虽进入复试但未通过`,
    description: "分析招聘各环节转化率，识别瓶颈",
    sqlSolutions: [
      `WITH stage_counts AS (
  SELECT 
    source,
    COUNT(DISTINCT CASE WHEN stage = '简历投递' THEN candidate_id END) AS submitted,
    COUNT(DISTINCT CASE WHEN stage = '简历筛选' AND result = '通过' THEN candidate_id END) AS screened,
    COUNT(DISTINCT CASE WHEN stage = '初试' AND result = '通过' THEN candidate_id END) AS first_interview,
    COUNT(DISTINCT CASE WHEN stage = '复试' AND result = '通过' THEN candidate_id END) AS second_interview,
    COUNT(DISTINCT CASE WHEN stage = 'Offer' AND result = '接受' THEN candidate_id END) AS offer_accepted
  FROM recruitment_funnel
  GROUP BY source
)
SELECT 
  source, submitted, screened, first_interview, second_interview, offer_accepted,
  CONCAT(ROUND(100.0 * offer_accepted / NULLIF(submitted, 0), 1), '%') AS overall_conversion
FROM stage_counts
ORDER BY offer_accepted DESC, submitted DESC;`,
    ],
    pandasSolutions: [
      `stage_order = ['简历投递', '简历筛选', '初试', '复试', 'Offer']

funnel = df.groupby('source').apply(lambda g: pd.Series({
    'submitted': g[g['stage'] == '简历投递']['candidate_id'].nunique(),
    'screened': g[(g['stage'] == '简历筛选') & (g['result'] == '通过')]['candidate_id'].nunique(),
    'first_interview': g[(g['stage'] == '初试') & (g['result'] == '通过')]['candidate_id'].nunique(),
    'second_interview': g[(g['stage'] == '复试') & (g['result'] == '通过')]['candidate_id'].nunique(),
    'offer_accepted': g[(g['stage'] == 'Offer') & (g['result'] == '接受')]['candidate_id'].nunique()
})).reset_index()

funnel['overall_conversion'] = (100 * funnel['offer_accepted'] / funnel['submitted']).round(1).astype(str) + '%'
result = funnel.sort_values(['offer_accepted', 'submitted'], ascending=[False, False])`,
    ],
    explanation: "招聘效率分析。招聘网站渠道全流程转化100%但样本少。内推和猎头初试通过率高但复试淘汰，可能技能匹配但文化契合度低。",
  },
  {
    id: "sql-biz-26",
    title: "【航空】航班准点率与延误分析",
    category: "business",
    difficulty: 4,
    keywords: ["准点率", "延误分析", "运营效率"],
    tables: `flights(flight_id INT, flight_no VARCHAR, origin VARCHAR, destination VARCHAR, scheduled_time DATETIME, actual_time DATETIME, delay_reason VARCHAR)`,
    sampleData: `| flight_id | flight_no | origin | destination | scheduled_time      | actual_time         | delay_reason |
|-----------|-----------|--------|-------------|---------------------|---------------------|--------------|
| 1         | CA1001    | 北京   | 上海        | 2024-01-01 08:00:00 | 2024-01-01 08:10:00 | 天气         |
| 2         | CA1002    | 上海   | 北京        | 2024-01-01 10:00:00 | 2024-01-01 10:05:00 | NULL         |
| 3         | CA1003    | 北京   | 广州        | 2024-01-01 12:00:00 | 2024-01-01 13:30:00 | 航空管制     |
| 4         | CA1004    | 广州   | 北京        | 2024-01-01 15:00:00 | 2024-01-01 15:00:00 | NULL         |
| 5         | CA1005    | 北京   | 深圳        | 2024-01-01 18:00:00 | 2024-01-01 19:20:00 | 机械故障     |
| 6         | CA1006    | 深圳   | 北京        | 2024-01-01 21:00:00 | 2024-01-01 21:45:00 | 前序航班延误 |
| 7         | CA1007    | 北京   | 成都        | 2024-01-02 09:00:00 | 2024-01-02 09:00:00 | NULL         |

说明：延误15分钟以上计为不准点`,
    expectedOutput: `| route           | total_flights | on_time_count | on_time_rate | avg_delay_min | top_delay_reason |
|-----------------|---------------|---------------|--------------|---------------|------------------|
| 北京-上海       | 1             | 1             | 100.0%       | 10            | 天气             |
| 北京-成都       | 1             | 1             | 100.0%       | 0             | -                |
| 上海-北京       | 1             | 1             | 100.0%       | 5             | -                |
| 广州-北京       | 1             | 1             | 100.0%       | 0             | -                |
| 北京-广州       | 1             | 0             | 0.0%         | 90            | 航空管制         |
| 北京-深圳       | 1             | 0             | 0.0%         | 80            | 机械故障         |
| 深圳-北京       | 1             | 0             | 0.0%         | 45            | 前序航班延误     |

说明：北京-广州航线准点率0%，平均延误90分钟，主因航空管制`,
    description: "统计航线准点率，分析延误原因",
    sqlSolutions: [
      `WITH flight_delays AS (
  SELECT 
    CONCAT(origin, '-', destination) AS route,
    flight_id,
    TIMESTAMPDIFF(MINUTE, scheduled_time, actual_time) AS delay_minutes,
    CASE WHEN TIMESTAMPDIFF(MINUTE, scheduled_time, actual_time) <= 15 THEN 1 ELSE 0 END AS is_on_time,
    delay_reason
  FROM flights
),
route_stats AS (
  SELECT 
    route,
    COUNT(*) AS total_flights,
    SUM(is_on_time) AS on_time_count,
    ROUND(100.0 * SUM(is_on_time) / COUNT(*), 1) AS on_time_rate,
    ROUND(AVG(delay_minutes), 0) AS avg_delay_min,
    SUBSTRING_INDEX(GROUP_CONCAT(delay_reason ORDER BY delay_minutes DESC), ',', 1) AS top_delay_reason
  FROM flight_delays
  GROUP BY route
)
SELECT 
  route, total_flights, on_time_count,
  CONCAT(on_time_rate, '%') AS on_time_rate,
  avg_delay_min,
  COALESCE(NULLIF(top_delay_reason, ''), '-') AS top_delay_reason
FROM route_stats
ORDER BY on_time_rate DESC, avg_delay_min;`,
    ],
    pandasSolutions: [
      `df['scheduled_time'] = pd.to_datetime(df['scheduled_time'])
df['actual_time'] = pd.to_datetime(df['actual_time'])
df['delay_minutes'] = (df['actual_time'] - df['scheduled_time']).dt.total_seconds() / 60
df['is_on_time'] = (df['delay_minutes'] <= 15).astype(int)
df['route'] = df['origin'] + '-' + df['destination']

route_stats = df.groupby('route').agg(
    total_flights=('flight_id', 'count'),
    on_time_count=('is_on_time', 'sum'),
    avg_delay_min=('delay_minutes', lambda x: round(x.mean(), 0)),
    top_delay_reason=('delay_reason', lambda x: x.mode()[0] if not x.mode().empty and pd.notna(x.mode()[0]) else '-')
).reset_index()

route_stats['on_time_rate'] = (100 * route_stats['on_time_count'] / route_stats['total_flights']).round(1).astype(str) + '%'
result = route_stats[['route', 'total_flights', 'on_time_count', 'on_time_rate', 'avg_delay_min', 'top_delay_reason']].sort_values(['on_time_rate', 'avg_delay_min'], ascending=[False, True])`,
    ],
    explanation: "航空运营核心指标。北京-广州延误90分钟因航空管制，属不可控因素。机械故障（可控）需加强维护。准点率影响客户满意度和航司品牌。",
  },
  {
    id: "sql-biz-27",
    title: "【快消品】经销商库存健康度分析",
    category: "business",
    difficulty: 3,
    keywords: ["库存周转", "动销率", "渠道管理"],
    tables: `dealer_inventory(dealer_id INT, dealer_name VARCHAR, region VARCHAR, sku VARCHAR, stock_qty INT, sales_last_30d INT, purchase_price DECIMAL)`,
    sampleData: `| dealer_id | dealer_name | region | sku    | stock_qty | sales_last_30d | purchase_price |
|-----------|-------------|--------|--------|-----------|----------------|----------------|
| 1         | 经销商A     | 华北   | SKU001 | 500       | 400            | 10             |
| 1         | 经销商A     | 华北   | SKU002 | 1000      | 100            | 15             |
| 1         | 经销商A     | 华北   | SKU003 | 200       | 180            | 20             |
| 2         | 经销商B     | 华东   | SKU001 | 800       | 700            | 10             |
| 2         | 经销商B     | 华东   | SKU002 | 1500      | 50             | 15             |
| 3         | 经销商C     | 华南   | SKU001 | 300       | 280            | 10             |
| 3         | 经销商C     | 华南   | SKU003 | 100       | 90             | 20             |

说明：动销率 = 最近30天销量 / 当前库存`,
    expectedOutput: `| dealer_id | dealer_name | region | total_stock_value | sell_through_rate | turnover_days | health_status |
|-----------|-------------|--------|-------------------|-------------------|---------------|---------------|
| 3         | 经销商C     | 华南   | 5000              | 92.5%             | 3.2           | 健康          |
| 2         | 经销商B     | 华东   | 30500             | 32.6%             | 9.2           | 一般          |
| 1         | 经销商A     | 华北   | 23000             | 40.0%             | 7.5           | 一般          |

说明：经销商C动销率92.5%最健康，3.2天可周转一次。经销商A的SKU002滞销严重`,
    description: "评估经销商库存健康度（动销率、周转天数、库存结构）",
    sqlSolutions: [
      `WITH dealer_metrics AS (
  SELECT 
    dealer_id,
    dealer_name,
    region,
    SUM(stock_qty * purchase_price) AS total_stock_value,
    ROUND(100.0 * SUM(sales_last_30d) / SUM(stock_qty), 1) AS sell_through_rate,
    ROUND(30.0 * SUM(stock_qty) / NULLIF(SUM(sales_last_30d), 0), 1) AS turnover_days
  FROM dealer_inventory
  GROUP BY dealer_id, dealer_name, region
),
health_scoring AS (
  SELECT 
    *,
    CASE 
      WHEN sell_through_rate >= 80 AND turnover_days <= 5 THEN '健康'
      WHEN sell_through_rate >= 50 AND turnover_days <= 10 THEN '一般'
      ELSE '预警'
    END AS health_status
  FROM dealer_metrics
)
SELECT 
  dealer_id, dealer_name, region, total_stock_value,
  CONCAT(sell_through_rate, '%') AS sell_through_rate,
  turnover_days,
  health_status
FROM health_scoring
ORDER BY sell_through_rate DESC;`,
    ],
    pandasSolutions: [
      `dealer_metrics = df.groupby(['dealer_id', 'dealer_name', 'region']).agg(
    total_stock_value=('purchase_price', lambda x: (df.loc[x.index, 'stock_qty'] * x).sum()),
    total_stock=('stock_qty', 'sum'),
    total_sales=('sales_last_30d', 'sum')
).reset_index()

dealer_metrics['sell_through_rate'] = round(100 * dealer_metrics['total_sales'] / dealer_metrics['total_stock'], 1)
dealer_metrics['turnover_days'] = round(30 * dealer_metrics['total_stock'] / dealer_metrics['total_sales'], 1)

def health_status(row):
    if row['sell_through_rate'] >= 80 and row['turnover_days'] <= 5:
        return '健康'
    elif row['sell_through_rate'] >= 50 and row['turnover_days'] <= 10:
        return '一般'
    return '预警'

dealer_metrics['health_status'] = dealer_metrics.apply(health_status, axis=1)
dealer_metrics['sell_through_rate'] = dealer_metrics['sell_through_rate'].astype(str) + '%'

result = dealer_metrics[['dealer_id', 'dealer_name', 'region', 'total_stock_value', 'sell_through_rate', 'turnover_days', 'health_status']].sort_values('turnover_days')`,
    ],
    explanation: "快消品渠道管理核心。经销商C动销率92.5%周转快，库存健康。经销商A的SKU002库存1000但月销仅100，需促销或退货，避免资金占用和过期。",
  },
  
  // ========== 第八批10题（面试高频） ==========
  {
    id: "sql-interview-20",
    title: "第N高的薪水（LeetCode 177）",
    category: "interview",
    difficulty: 3,
    keywords: ["DENSE_RANK", "第N高", "排名"],
    tables: `employees(id INT, name VARCHAR, salary DECIMAL)`,
    sampleData: `| id | name  | salary |
|----|-------|--------|
| 1  | Alice | 8000   |
| 2  | Bob   | 9000   |
| 3  | Carol | 9000   |
| 4  | David | 7000   |
| 5  | Eve   | 10000  |
| 6  | Frank | 8000   |

求第2高的薪水（去重后）`,
    expectedOutput: `| nth_highest_salary |
|--------------------|
| 9000               |

说明：薪水去重后排序：10000, 9000, 8000, 7000，第2高是9000`,
    description: "查询第N高的薪水（N=2，去重）",
    sqlSolutions: [
      `-- 方法1：DENSE_RANK
WITH ranked_salaries AS (
  SELECT 
    salary,
    DENSE_RANK() OVER(ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT DISTINCT salary AS nth_highest_salary
FROM ranked_salaries
WHERE rnk = 2;`,
      `-- 方法2：子查询+LIMIT OFFSET
SELECT DISTINCT salary AS nth_highest_salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`,
      `-- 方法3：相关子查询
SELECT DISTINCT e1.salary AS nth_highest_salary
FROM employees e1
WHERE 1 = (
  SELECT COUNT(DISTINCT e2.salary)
  FROM employees e2
  WHERE e2.salary > e1.salary
);`,
    ],
    pandasSolutions: [
      `# 方法1：去重后排序取第N个
n = 2
unique_salaries = df['salary'].drop_duplicates().sort_values(ascending=False).reset_index(drop=True)
result = unique_salaries.iloc[n-1] if len(unique_salaries) >= n else None`,
      `# 方法2：使用rank
df['rank'] = df['salary'].rank(method='dense', ascending=False)
result = df[df['rank'] == 2]['salary'].iloc[0] if len(df[df['rank'] == 2]) > 0 else None`,
    ],
    explanation: "LeetCode经典题。DENSE_RANK保证并列不跳号（9000出现2次但排名连续）。LIMIT OFFSET简单但需注意去重。",
  },
  {
    id: "sql-interview-21",
    title: "部门工资前三高的员工（LeetCode 185）",
    category: "interview",
    difficulty: 4,
    keywords: ["DENSE_RANK", "分组排名", "TOP N"],
    tables: `employees(id INT, name VARCHAR, salary DECIMAL, dept_id INT)
departments(dept_id INT, dept_name VARCHAR)`,
    sampleData: `employees:
| id | name   | salary | dept_id |
|----|--------|--------|---------|
| 1  | Alice  | 8000   | 1       |
| 2  | Bob    | 9000   | 1       |
| 3  | Carol  | 7000   | 1       |
| 4  | David  | 9000   | 2       |
| 5  | Eve    | 8500   | 2       |
| 6  | Frank  | 8500   | 2       |
| 7  | Grace  | 7500   | 2       |

departments:
| dept_id | dept_name |
|---------|-----------|
| 1       | IT        |
| 2       | Sales     |`,
    expectedOutput: `| dept_name | name  | salary |
|-----------|-------|--------|
| IT        | Bob   | 9000   |
| IT        | Alice | 8000   |
| IT        | Carol | 7000   |
| Sales     | David | 9000   |
| Sales     | Eve   | 8500   |
| Sales     | Frank | 8500   |

说明：每个部门薪水前3高的员工，并列算一个名次`,
    description: "查询每个部门工资前三高的员工",
    sqlSolutions: [
      `WITH ranked_emp AS (
  SELECT 
    e.name, e.salary, d.dept_name,
    DENSE_RANK() OVER(PARTITION BY e.dept_id ORDER BY e.salary DESC) AS salary_rank
  FROM employees e
  JOIN departments d ON e.dept_id = d.dept_id
)
SELECT dept_name, name, salary
FROM ranked_emp
WHERE salary_rank <= 3
ORDER BY dept_name, salary DESC;`,
    ],
    pandasSolutions: [
      `merged = employees.merge(departments, on='dept_id')
merged['salary_rank'] = merged.groupby('dept_id')['salary'].rank(method='dense', ascending=False)
result = merged[merged['salary_rank'] <= 3][['dept_name', 'name', 'salary']].sort_values(['dept_name', 'salary'], ascending=[True, False])`,
    ],
    explanation: "分组TopN经典题。DENSE_RANK确保并列不影响名次（Sales部门Eve和Frank都是第2名）。窗口函数PARTITION BY实现分组排名。",
  },
  {
    id: "sql-interview-22",
    title: "连续出现的数字（LeetCode 180）",
    category: "interview",
    difficulty: 4,
    keywords: ["连续性", "自连接", "LAG"],
    tables: `logs(id INT, num INT)`,
    sampleData: `| id | num |
|----|-----|
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |

找出至少连续出现3次的数字`,
    expectedOutput: `| consecutive_num |
|-----------------|
| 1               |

说明：数字1在id=1,2,3连续出现3次`,
    description: "找出至少连续出现三次的数字",
    sqlSolutions: [
      `-- 方法1：自连接
SELECT DISTINCT l1.num AS consecutive_num
FROM logs l1
JOIN logs l2 ON l1.id = l2.id - 1 AND l1.num = l2.num
JOIN logs l3 ON l2.id = l3.id - 1 AND l2.num = l3.num;`,
      `-- 方法2：窗口函数LAG
WITH num_check AS (
  SELECT 
    num,
    LAG(num, 1) OVER(ORDER BY id) AS prev1,
    LAG(num, 2) OVER(ORDER BY id) AS prev2
  FROM logs
)
SELECT DISTINCT num AS consecutive_num
FROM num_check
WHERE num = prev1 AND num = prev2;`,
      `-- 方法3：分组标记法
WITH grouped AS (
  SELECT 
    num,
    id - ROW_NUMBER() OVER(PARTITION BY num ORDER BY id) AS grp
  FROM logs
)
SELECT DISTINCT num AS consecutive_num
FROM grouped
GROUP BY num, grp
HAVING COUNT(*) >= 3;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('id').reset_index(drop=True)
df['prev1'] = df['num'].shift(1)
df['prev2'] = df['num'].shift(2)
result = df[(df['num'] == df['prev1']) & (df['num'] == df['prev2'])]['num'].unique()`,
      `# 分组标记法
df = df.sort_values('id').reset_index(drop=True)
df['grp'] = df['id'] - df.groupby('num').cumcount()
consecutive = df.groupby(['num', 'grp']).size()
result = consecutive[consecutive >= 3].reset_index()['num'].unique()`,
    ],
    explanation: "连续性问题经典解法。方法1自连接简单直观。方法3分组标记法最优雅：id-行号相同表示连续。",
  },
  {
    id: "sql-interview-23",
    title: "换座位（LeetCode 626）",
    category: "interview",
    difficulty: 3,
    keywords: ["CASE WHEN", "行交换", "MOD"],
    tables: `seat(id INT, student VARCHAR)`,
    sampleData: `| id | student |
|----|---------|
| 1  | Abbot   |
| 2  | Doris   |
| 3  | Emerson |
| 4  | Green   |
| 5  | Jeames  |

交换相邻学生座位，最后一个奇数座位不变`,
    expectedOutput: `| id | student |
|----|---------|
| 1  | Doris   |
| 2  | Abbot   |
| 3  | Green   |
| 4  | Emerson |
| 5  | Jeames  |

说明：1↔2, 3↔4, 5保持不变`,
    description: "交换相邻座位的学生",
    sqlSolutions: [
      `-- 方法1：CASE WHEN
SELECT 
  CASE 
    WHEN id % 2 = 1 AND id < (SELECT MAX(id) FROM seat) THEN id + 1
    WHEN id % 2 = 0 THEN id - 1
    ELSE id
  END AS id,
  student
FROM seat
ORDER BY id;`,
      `-- 方法2：使用COALESCE和LAG/LEAD
SELECT 
  id,
  CASE 
    WHEN id % 2 = 1 THEN COALESCE(LEAD(student) OVER(ORDER BY id), student)
    ELSE LAG(student) OVER(ORDER BY id)
  END AS student
FROM seat
ORDER BY id;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('id').reset_index(drop=True)
max_id = df['id'].max()

df['new_id'] = df['id'].apply(lambda x: 
    x + 1 if x % 2 == 1 and x < max_id else
    x - 1 if x % 2 == 0 else x
)
result = df.sort_values('new_id')[['new_id', 'student']].rename(columns={'new_id': 'id'})`,
      `# 使用shift
df = df.sort_values('id').reset_index(drop=True)
df['student'] = df.apply(lambda row:
    df.loc[row.name + 1, 'student'] if row['id'] % 2 == 1 and row.name < len(df) - 1 else
    df.loc[row.name - 1, 'student'] if row['id'] % 2 == 0 else
    row['student'], axis=1
)`,
    ],
    explanation: "位置交换问题。奇数座位+1，偶数座位-1，最后奇数保持。LEAD/LAG窗口函数更优雅，避免子查询。",
  },
  {
    id: "sql-interview-24",
    title: "体育馆的人流量（LeetCode 601）",
    category: "interview",
    difficulty: 5,
    keywords: ["连续性", "滑动窗口", "复杂条件"],
    tables: `stadium(id INT, visit_date DATE, people INT)`,
    sampleData: `| id | visit_date | people |
|----|------------|--------|
| 1  | 2024-01-01 | 10     |
| 2  | 2024-01-02 | 109    |
| 3  | 2024-01-03 | 150    |
| 4  | 2024-01-04 | 99     |
| 5  | 2024-01-05 | 145    |
| 6  | 2024-01-06 | 1455   |
| 7  | 2024-01-07 | 199    |
| 8  | 2024-01-09 | 188    |

找出连续3天及以上people>=100的所有记录`,
    expectedOutput: `| id | visit_date | people |
|----|------------|--------|
| 2  | 2024-01-02 | 109    |
| 3  | 2024-01-03 | 150    |
| 4  | 2024-01-04 | 99     |  -- 这条不符合，因为只有id 5,6,7连续>=100
| 5  | 2024-01-05 | 145    |
| 6  | 2024-01-06 | 1455   |
| 7  | 2024-01-07 | 199    |

说明：id=5,6,7连续3天>=100，id=8断开`,
    description: "找出连续3天及以上人流量≥100的记录",
    sqlSolutions: [
      `WITH filtered AS (
  SELECT 
    id, visit_date, people,
    id - ROW_NUMBER() OVER(ORDER BY id) AS grp
  FROM stadium
  WHERE people >= 100
),
valid_groups AS (
  SELECT grp
  FROM filtered
  GROUP BY grp
  HAVING COUNT(*) >= 3
)
SELECT f.id, f.visit_date, f.people
FROM filtered f
WHERE f.grp IN (SELECT grp FROM valid_groups)
ORDER BY f.id;`,
      `-- 方法2：窗口函数检查前后
WITH check_consecutive AS (
  SELECT 
    id, visit_date, people,
    LAG(people, 1) OVER(ORDER BY id) AS prev1,
    LAG(people, 2) OVER(ORDER BY id) AS prev2,
    LEAD(people, 1) OVER(ORDER BY id) AS next1,
    LEAD(people, 2) OVER(ORDER BY id) AS next2
  FROM stadium
  WHERE people >= 100
)
SELECT DISTINCT id, visit_date, people
FROM check_consecutive
WHERE 
  (prev2 >= 100 AND prev1 >= 100) OR
  (prev1 >= 100 AND next1 >= 100) OR
  (next1 >= 100 AND next2 >= 100);`,
    ],
    pandasSolutions: [
      `df = df[df['people'] >= 100].sort_values('id').reset_index(drop=True)
df['grp'] = df['id'] - (df.index + 1)
group_counts = df.groupby('grp').size()
valid_groups = group_counts[group_counts >= 3].index
result = df[df['grp'].isin(valid_groups)][['id', 'visit_date', 'people']].sort_values('id')`,
    ],
    explanation: "连续性高级应用。分组标记法：id-行号相同表示连续。过滤people>=100后，找连续3个及以上的组，再返回完整记录。",
  },
  {
    id: "sql-interview-25",
    title: "行程和用户（LeetCode 262）",
    category: "interview",
    difficulty: 5,
    keywords: ["取消率", "日期聚合", "外连接"],
    tables: `trips(id INT, client_id INT, driver_id INT, city VARCHAR, status VARCHAR, request_date DATE)
users(user_id INT, banned VARCHAR, role VARCHAR)`,
    sampleData: `trips:
| id | client_id | driver_id | city | status              | request_date |
|----|-----------|-----------|------|---------------------|--------------|
| 1  | 1         | 10        | 北京 | completed           | 2024-01-01   |
| 2  | 2         | 11        | 北京 | cancelled_by_driver | 2024-01-01   |
| 3  | 3         | 12        | 上海 | completed           | 2024-01-01   |
| 4  | 4         | 13        | 上海 | cancelled_by_client | 2024-01-02   |
| 5  | 1         | 10        | 北京 | completed           | 2024-01-02   |
| 6  | 2         | 11        | 北京 | completed           | 2024-01-02   |

users:
| user_id | banned | role   |
|---------|--------|--------|
| 1       | No     | client |
| 2       | Yes    | client |
| 3       | No     | client |
| 10      | No     | driver |
| 11      | No     | driver |
| 13      | Yes    | driver |

计算非禁止用户的取消率（2024-01-01到2024-01-02）`,
    expectedOutput: `| date       | cancellation_rate |
|------------|-------------------|
| 2024-01-01 | 0.33              |
| 2024-01-02 | 0.00              |

说明：1月1日3单有1单取消（id=2），取消率33%。1月2日排除id=4（client被ban），剩2单全完成`,
    description: "计算非禁止用户的订单取消率",
    sqlSolutions: [
      `WITH valid_trips AS (
  SELECT 
    t.request_date,
    t.status,
    CASE WHEN t.status LIKE 'cancelled%' THEN 1 ELSE 0 END AS is_cancelled
  FROM trips t
  JOIN users c ON t.client_id = c.user_id AND c.banned = 'No' AND c.role = 'client'
  JOIN users d ON t.driver_id = d.user_id AND d.banned = 'No' AND d.role = 'driver'
  WHERE t.request_date BETWEEN '2024-01-01' AND '2024-01-02'
)
SELECT 
  request_date AS date,
  ROUND(SUM(is_cancelled) * 1.0 / COUNT(*), 2) AS cancellation_rate
FROM valid_trips
GROUP BY request_date
ORDER BY request_date;`,
    ],
    pandasSolutions: [
      `# 过滤非禁止用户
valid_clients = users[(users['banned'] == 'No') & (users['role'] == 'client')]['user_id']
valid_drivers = users[(users['banned'] == 'No') & (users['role'] == 'driver')]['user_id']

valid_trips = trips[
    (trips['client_id'].isin(valid_clients)) & 
    (trips['driver_id'].isin(valid_drivers)) &
    (trips['request_date'] >= '2024-01-01') &
    (trips['request_date'] <= '2024-01-02')
].copy()

valid_trips['is_cancelled'] = valid_trips['status'].str.startswith('cancelled').astype(int)

result = valid_trips.groupby('request_date').agg(
    cancellation_rate=('is_cancelled', lambda x: round(x.mean(), 2))
).reset_index().rename(columns={'request_date': 'date'})`,
    ],
    explanation: "复杂过滤+聚合问题。关键是JOIN两次users表分别验证client和driver非禁止。LIKE 'cancelled%'匹配所有取消状态。",
  },
  {
    id: "sql-interview-26",
    title: "查找重复的电子邮箱（LeetCode 182）",
    category: "interview",
    difficulty: 2,
    keywords: ["GROUP BY", "HAVING", "去重"],
    tables: `person(id INT, email VARCHAR)`,
    sampleData: `| id | email           |
|----|-----------------|
| 1  | a@b.com         |
| 2  | c@d.com         |
| 3  | a@b.com         |
| 4  | e@f.com         |
| 5  | c@d.com         |
| 6  | c@d.com         |`,
    expectedOutput: `| email   |
|---------|
| a@b.com |
| c@d.com |

说明：a@b.com出现2次，c@d.com出现3次`,
    description: "查找所有重复的电子邮箱",
    sqlSolutions: [
      `-- 方法1：GROUP BY + HAVING
SELECT email
FROM person
GROUP BY email
HAVING COUNT(*) > 1;`,
      `-- 方法2：子查询
SELECT DISTINCT p1.email
FROM person p1
JOIN person p2 ON p1.email = p2.email AND p1.id != p2.id;`,
    ],
    pandasSolutions: [
      `email_counts = df['email'].value_counts()
result = email_counts[email_counts > 1].index.to_list()`,
      `# 或使用duplicated
result = df[df.duplicated(subset=['email'], keep=False)]['email'].unique()`,
    ],
    explanation: "基础去重题。HAVING COUNT(*) > 1过滤重复项。方法2自连接找相同email但不同id的记录，需DISTINCT去重。",
  },
  {
    id: "sql-interview-27",
    title: "删除重复的电子邮箱（LeetCode 196）",
    category: "interview",
    difficulty: 2,
    keywords: ["DELETE", "自连接", "ROW_NUMBER"],
    tables: `person(id INT PRIMARY KEY, email VARCHAR)`,
    sampleData: `| id | email   |
|----|---------|
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |

删除重复email，保留id最小的`,
    expectedOutput: `删除后表内容：
| id | email   |
|----|---------|
| 1  | a@b.com |
| 2  | c@d.com |

说明：id=3被删除，因为email=a@b.com已存在id=1`,
    description: "删除重复的email，保留最小id",
    sqlSolutions: [
      `-- 方法1：DELETE自连接
DELETE p1
FROM person p1
JOIN person p2 ON p1.email = p2.email AND p1.id > p2.id;`,
      `-- 方法2：使用子查询（某些数据库）
DELETE FROM person
WHERE id NOT IN (
  SELECT MIN(id)
  FROM person
  GROUP BY email
);`,
      `-- 方法3：窗口函数（需临时表）
WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) AS rn
  FROM person
)
DELETE FROM person
WHERE id IN (SELECT id FROM ranked WHERE rn > 1);`,
    ],
    pandasSolutions: [
      `# 保留每个email的最小id
df = df.sort_values('id').drop_duplicates(subset=['email'], keep='first')`,
      `# 或使用groupby
min_ids = df.groupby('email')['id'].min()
df = df[df['id'].isin(min_ids)]`,
    ],
    explanation: "DELETE操作经典题。方法1自连接最简洁：删除id大于同email其他记录的行。注意MySQL不允许直接DELETE FROM WHERE子查询同表。",
  },
  {
    id: "sql-interview-28",
    title: "温度上升（LeetCode 197）",
    category: "interview",
    difficulty: 2,
    keywords: ["自连接", "日期比较", "LAG"],
    tables: `weather(id INT, record_date DATE, temperature INT)`,
    sampleData: `| id | record_date | temperature |
|----|-------------|-------------|
| 1  | 2024-01-01  | 10          |
| 2  | 2024-01-02  | 25          |
| 3  | 2024-01-03  | 20          |
| 4  | 2024-01-04  | 30          |
| 5  | 2024-01-05  | 28          |`,
    expectedOutput: `| id |
|----|
| 2  |
| 4  |

说明：id=2温度25比前一天10高，id=4温度30比前一天20高`,
    description: "找出温度比前一天高的日期",
    sqlSolutions: [
      `-- 方法1：自连接
SELECT w1.id
FROM weather w1
JOIN weather w2 ON w1.record_date = DATE_ADD(w2.record_date, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature;`,
      `-- 方法2：LAG窗口函数
WITH temp_compare AS (
  SELECT 
    id, record_date, temperature,
    LAG(temperature) OVER(ORDER BY record_date) AS prev_temp,
    LAG(record_date) OVER(ORDER BY record_date) AS prev_date
  FROM weather
)
SELECT id
FROM temp_compare
WHERE temperature > prev_temp 
  AND DATEDIFF(record_date, prev_date) = 1;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('record_date').reset_index(drop=True)
df['prev_temp'] = df['temperature'].shift(1)
df['prev_date'] = df['record_date'].shift(1)
df['date_diff'] = (df['record_date'] - df['prev_date']).dt.days

result = df[(df['temperature'] > df['prev_temp']) & (df['date_diff'] == 1)]['id']`,
    ],
    explanation: "日期比较题。方法1自连接要求日期连续（DATE_ADD）。方法2LAG更通用，但需检查日期间隔防止跳日。",
  },
  {
    id: "sql-interview-29",
    title: "上升的温度（变种：最长连续上升）",
    category: "interview",
    difficulty: 4,
    keywords: ["连续性", "最长子序列", "分组"],
    tables: `weather(id INT, record_date DATE, temperature INT)`,
    sampleData: `| id | record_date | temperature |
|----|-------------|-------------|
| 1  | 2024-01-01  | 10          |
| 2  | 2024-01-02  | 15          |
| 3  | 2024-01-03  | 20          |
| 4  | 2024-01-04  | 18          |
| 5  | 2024-01-05  | 22          |
| 6  | 2024-01-06  | 25          |
| 7  | 2024-01-07  | 26          |
| 8  | 2024-01-08  | 24          |

找出最长连续温度上升的天数`,
    expectedOutput: `| start_date | end_date   | consecutive_days | temp_increase |
|------------|------------|------------------|---------------|
| 2024-01-01 | 2024-01-03 | 3                | 10            |
| 2024-01-05 | 2024-01-07 | 3                | 4             |

说明：1/1→1/3连续3天上升10度，1/5→1/7连续3天上升4度`,
    description: "找出最长连续温度上升的时间段",
    sqlSolutions: [
      `WITH temp_change AS (
  SELECT 
    record_date, temperature,
    LAG(temperature) OVER(ORDER BY record_date) AS prev_temp,
    CASE 
      WHEN temperature > LAG(temperature) OVER(ORDER BY record_date) THEN 0
      ELSE 1
    END AS is_break
  FROM weather
),
grouped AS (
  SELECT 
    record_date, temperature,
    SUM(is_break) OVER(ORDER BY record_date) AS grp
  FROM temp_change
  WHERE prev_temp IS NOT NULL AND temperature > prev_temp
),
streak_stats AS (
  SELECT 
    MIN(record_date) AS start_date,
    MAX(record_date) AS end_date,
    COUNT(*) AS consecutive_days,
    MAX(temperature) - MIN(temperature) AS temp_increase
  FROM grouped
  GROUP BY grp
)
SELECT *
FROM streak_stats
WHERE consecutive_days = (SELECT MAX(consecutive_days) FROM streak_stats)
ORDER BY start_date;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('record_date').reset_index(drop=True)
df['prev_temp'] = df['temperature'].shift(1)
df['is_increase'] = (df['temperature'] > df['prev_temp']).astype(int)
df['is_break'] = (df['is_increase'] == 0).astype(int)
df['grp'] = df['is_break'].cumsum()

increase_only = df[df['is_increase'] == 1].copy()
streaks = increase_only.groupby('grp').agg(
    start_date=('record_date', 'min'),
    end_date=('record_date', 'max'),
    consecutive_days=('record_date', 'count'),
    temp_increase=('temperature', lambda x: x.max() - x.min())
).reset_index(drop=True)

max_days = streaks['consecutive_days'].max()
result = streaks[streaks['consecutive_days'] == max_days]`,
    ],
    explanation: "连续性变种。标记非上升处为断点，累积和分组。找出每组的起止日期、天数、温差。最后筛选最长的组。",
  },
  
  // ========== 第九批10题（业务应用深化） ==========
  {
    id: "sql-biz-28",
    title: "【SaaS】MRR月度经常性收入分析",
    category: "business",
    difficulty: 4,
    keywords: ["MRR", "ARR", "订阅收入", "增长分析"],
    tables: `subscriptions(subscription_id INT, customer_id INT, plan_type VARCHAR, monthly_fee DECIMAL, start_date DATE, end_date DATE, status VARCHAR)`,
    sampleData: `| subscription_id | customer_id | plan_type | monthly_fee | start_date | end_date   | status   |
|-----------------|-------------|-----------|-------------|------------|------------|----------|
| 1               | 101         | Basic     | 99          | 2024-01-01 | NULL       | active   |
| 2               | 102         | Pro       | 299         | 2024-01-01 | NULL       | active   |
| 3               | 103         | Basic     | 99          | 2024-01-15 | NULL       | active   |
| 4               | 104         | Pro       | 299         | 2024-02-01 | NULL       | active   |
| 5               | 105         | Basic     | 99          | 2024-01-10 | 2024-02-10 | churned  |
| 6               | 106         | Enterprise| 999         | 2024-02-01 | NULL       | active   |
| 7               | 102         | Enterprise| 999         | 2024-02-15 | NULL       | active   |

说明：customer 102从Pro升级到Enterprise`,
    expectedOutput: `| month      | new_mrr | expansion_mrr | churned_mrr | net_mrr | total_mrr | growth_rate |
|------------|---------|---------------|-------------|---------|-----------|-------------|
| 2024-01    | 497     | 0             | 0           | 497     | 497       | -           |
| 2024-02    | 1298    | 700           | -99         | 1899    | 2396      | 382.1%      |

说明：2月新增Pro+Enterprise=1298，客户102升级+700，客户105流失-99`,
    description: "计算SaaS订阅业务的MRR增长（新增、扩展、流失）",
    sqlSolutions: [
      `WITH monthly_changes AS (
  SELECT 
    DATE_FORMAT(start_date, '%Y-%m') AS month,
    customer_id,
    monthly_fee AS new_mrr,
    0 AS expansion_mrr,
    0 AS churned_mrr
  FROM subscriptions
  WHERE start_date IS NOT NULL
  
  UNION ALL
  
  SELECT 
    DATE_FORMAT(s2.start_date, '%Y-%m') AS month,
    s2.customer_id,
    0 AS new_mrr,
    s2.monthly_fee - s1.monthly_fee AS expansion_mrr,
    0 AS churned_mrr
  FROM subscriptions s1
  JOIN subscriptions s2 ON s1.customer_id = s2.customer_id 
    AND s2.start_date > s1.start_date
    AND s1.status = 'churned'
  
  UNION ALL
  
  SELECT 
    DATE_FORMAT(end_date, '%Y-%m') AS month,
    customer_id,
    0 AS new_mrr,
    0 AS expansion_mrr,
    -monthly_fee AS churned_mrr
  FROM subscriptions
  WHERE end_date IS NOT NULL AND status = 'churned'
),
monthly_summary AS (
  SELECT 
    month,
    SUM(new_mrr) AS new_mrr,
    SUM(expansion_mrr) AS expansion_mrr,
    SUM(churned_mrr) AS churned_mrr,
    SUM(new_mrr + expansion_mrr + churned_mrr) AS net_mrr
  FROM monthly_changes
  GROUP BY month
)
SELECT 
  month,
  new_mrr, expansion_mrr, churned_mrr, net_mrr,
  SUM(net_mrr) OVER(ORDER BY month) AS total_mrr,
  CASE 
    WHEN LAG(SUM(net_mrr) OVER(ORDER BY month)) OVER(ORDER BY month) IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * net_mrr / LAG(SUM(net_mrr) OVER(ORDER BY month)) OVER(ORDER BY month), 1), '%')
  END AS growth_rate
FROM monthly_summary
ORDER BY month;`,
    ],
    pandasSolutions: [
      `df['start_month'] = pd.to_datetime(df['start_date']).dt.to_period('M')
df['end_month'] = pd.to_datetime(df['end_date']).dt.to_period('M')

# 新增MRR
new_mrr = df.groupby('start_month')['monthly_fee'].sum().rename('new_mrr')

# 流失MRR
churned = df[df['status'] == 'churned'].copy()
churned_mrr = churned.groupby('end_month')['monthly_fee'].sum().mul(-1).rename('churned_mrr')

# 扩展MRR（升级）- 简化版
expansion_data = []
for cid in df['customer_id'].unique():
    cust_subs = df[df['customer_id'] == cid].sort_values('start_date')
    if len(cust_subs) > 1:
        for i in range(1, len(cust_subs)):
            expansion_data.append({
                'month': pd.to_datetime(cust_subs.iloc[i]['start_date']).to_period('M'),
                'expansion': cust_subs.iloc[i]['monthly_fee'] - cust_subs.iloc[i-1]['monthly_fee']
            })
expansion_mrr = pd.DataFrame(expansion_data).groupby('month')['expansion'].sum().rename('expansion_mrr')

result = pd.DataFrame({'new_mrr': new_mrr, 'expansion_mrr': expansion_mrr, 'churned_mrr': churned_mrr}).fillna(0)
result['net_mrr'] = result['new_mrr'] + result['expansion_mrr'] + result['churned_mrr']
result['total_mrr'] = result['net_mrr'].cumsum()
result['growth_rate'] = result['net_mrr'].pct_change().mul(100).round(1).astype(str) + '%'
result.loc[result['growth_rate'] == 'nan%', 'growth_rate'] = '-'`,
    ],
    explanation: "SaaS核心指标。MRR=新增+扩展-流失。2月新增1298（Pro+Enterprise），扩展700（客户102升级），流失99，净增1899，总MRR达2396。",
  },
  {
    id: "sql-biz-29",
    title: "【营销】优惠券ROI与核销分析",
    category: "business",
    difficulty: 3,
    keywords: ["优惠券", "核销率", "ROI", "营销效果"],
    tables: `coupons(coupon_id INT, coupon_code VARCHAR, discount_amount DECIMAL, min_purchase DECIMAL, issue_date DATE, expire_date DATE, issued_count INT)
orders(order_id INT, user_id INT, coupon_code VARCHAR, order_amount DECIMAL, discount_used DECIMAL, order_date DATE)`,
    sampleData: `coupons:
| coupon_id | coupon_code | discount_amount | min_purchase | issue_date | expire_date | issued_count |
|-----------|-------------|-----------------|--------------|------------|-------------|--------------|
| 1         | NEW50       | 50              | 200          | 2024-01-01 | 2024-01-31  | 1000         |
| 2         | VIP100      | 100             | 500          | 2024-01-01 | 2024-01-31  | 500          |
| 3         | SAVE20      | 20              | 100          | 2024-01-15 | 2024-02-15  | 2000         |

orders:
| order_id | user_id | coupon_code | order_amount | discount_used | order_date |
|----------|---------|-------------|--------------|---------------|------------|
| 1        | 1       | NEW50       | 250          | 50            | 2024-01-10 |
| 2        | 2       | NEW50       | 300          | 50            | 2024-01-12 |
| 3        | 3       | VIP100      | 600          | 100           | 2024-01-15 |
| 4        | 4       | SAVE20      | 150          | 20            | 2024-01-20 |
| 5        | 5       | SAVE20      | 120          | 20            | 2024-01-22 |
| 6        | 6       | NULL        | 200          | 0             | 2024-01-25 |`,
    expectedOutput: `| coupon_code | issued | used | redemption_rate | total_discount | total_revenue | roi   |
|-------------|--------|------|-----------------|----------------|---------------|-------|
| NEW50       | 1000   | 2    | 0.2%            | 100            | 550           | 5.50  |
| VIP100      | 500    | 1    | 0.2%            | 100            | 600           | 6.00  |
| SAVE20      | 2000   | 2    | 0.1%            | 40             | 270           | 6.75  |

说明：NEW50核销2张，带来550收入，补贴100，ROI=5.5（每1元补贴带来5.5元收入）`,
    description: "分析优惠券核销率和投入产出比",
    sqlSolutions: [
      `WITH coupon_usage AS (
  SELECT 
    coupon_code,
    COUNT(*) AS used,
    SUM(discount_used) AS total_discount,
    SUM(order_amount) AS total_revenue
  FROM orders
  WHERE coupon_code IS NOT NULL
  GROUP BY coupon_code
)
SELECT 
  c.coupon_code,
  c.issued_count AS issued,
  COALESCE(u.used, 0) AS used,
  CONCAT(ROUND(100.0 * COALESCE(u.used, 0) / c.issued_count, 1), '%') AS redemption_rate,
  COALESCE(u.total_discount, 0) AS total_discount,
  COALESCE(u.total_revenue, 0) AS total_revenue,
  ROUND(COALESCE(u.total_revenue, 0) / NULLIF(COALESCE(u.total_discount, 0), 0), 2) AS roi
FROM coupons c
LEFT JOIN coupon_usage u ON c.coupon_code = u.coupon_code
ORDER BY roi DESC;`,
    ],
    pandasSolutions: [
      `coupon_usage = orders[orders['coupon_code'].notna()].groupby('coupon_code').agg(
    used=('order_id', 'count'),
    total_discount=('discount_used', 'sum'),
    total_revenue=('order_amount', 'sum')
).reset_index()

result = coupons.merge(coupon_usage, on='coupon_code', how='left').fillna(0)
result['redemption_rate'] = (100 * result['used'] / result['issued_count']).round(1).astype(str) + '%'
result['roi'] = (result['total_revenue'] / result['total_discount'].replace(0, 1)).round(2)
result = result[['coupon_code', 'issued_count', 'used', 'redemption_rate', 'total_discount', 'total_revenue', 'roi']].rename(columns={'issued_count': 'issued'})
result = result.sort_values('roi', ascending=False)`,
    ],
    explanation: "优惠券营销效果分析。SAVE20虽核销率最低（0.1%）但ROI最高（6.75），因为门槛低促成更多小额订单。核销率低需优化推送策略。",
  },
  {
    id: "sql-biz-30",
    title: "【电商】商品组合推荐（协同过滤）",
    category: "business",
    difficulty: 5,
    keywords: ["协同过滤", "相似度", "推荐算法"],
    tables: `user_purchases(user_id INT, product_id INT, purchase_date DATE, rating INT)`,
    sampleData: `| user_id | product_id | purchase_date | rating |
|---------|------------|---------------|--------|
| 1       | 101        | 2024-01-01    | 5      |
| 1       | 102        | 2024-01-02    | 4      |
| 1       | 103        | 2024-01-03    | 5      |
| 2       | 101        | 2024-01-05    | 5      |
| 2       | 102        | 2024-01-06    | 5      |
| 2       | 104        | 2024-01-07    | 4      |
| 3       | 101        | 2024-01-08    | 4      |
| 3       | 103        | 2024-01-09    | 5      |
| 3       | 105        | 2024-01-10    | 3      |
| 4       | 102        | 2024-01-11    | 5      |
| 4       | 104        | 2024-01-12    | 4      |

为购买了101、102的用户推荐商品`,
    expectedOutput: `为购买101、102的用户推荐：
| recommended_product | score | purchased_by_similar_users |
|---------------------|-------|----------------------------|
| 103                 | 10    | 1,3                        |
| 104                 | 9     | 2,4                        |
| 105                 | 3     | 3                          |

说明：用户1、2购买了101和102，他们还购买了103(用户1)、104(用户2)，相似用户行为推荐`,
    description: "基于用户协同过滤推荐商品",
    sqlSolutions: [
      `WITH target_users AS (
  SELECT DISTINCT user_id
  FROM user_purchases
  WHERE product_id IN (101, 102)
  GROUP BY user_id
  HAVING COUNT(DISTINCT product_id) = 2
),
similar_users AS (
  SELECT DISTINCT up.user_id
  FROM user_purchases up
  WHERE up.product_id IN (101, 102)
    AND up.user_id NOT IN (SELECT user_id FROM target_users)
  GROUP BY up.user_id
  HAVING COUNT(DISTINCT up.product_id) >= 1
),
recommendations AS (
  SELECT 
    up.product_id AS recommended_product,
    SUM(up.rating) AS score,
    GROUP_CONCAT(DISTINCT up.user_id ORDER BY up.user_id) AS purchased_by_similar_users
  FROM user_purchases up
  WHERE up.user_id IN (SELECT user_id FROM target_users UNION SELECT user_id FROM similar_users)
    AND up.product_id NOT IN (101, 102)
  GROUP BY up.product_id
)
SELECT * FROM recommendations
ORDER BY score DESC;`,
    ],
    pandasSolutions: [
      `# 找出购买了101和102的用户
target_products = {101, 102}
user_products = df.groupby('user_id')['product_id'].apply(set)
target_users = user_products[user_products == target_products].index

# 找出相似用户（至少购买了101或102之一）
similar_users = user_products[user_products.apply(lambda x: len(x & target_products) >= 1)].index
all_users = set(target_users) | set(similar_users)

# 统计推荐商品
recommendations = df[
    (df['user_id'].isin(all_users)) & 
    (~df['product_id'].isin(target_products))
].groupby('product_id').agg(
    score=('rating', 'sum'),
    purchased_by_similar_users=('user_id', lambda x: ','.join(map(str, sorted(x.unique()))))
).reset_index().rename(columns={'product_id': 'recommended_product'})

result = recommendations.sort_values('score', ascending=False)`,
    ],
    explanation: "协同过滤推荐。用户1、2都买了101+102，他们还买了103、104，说明这些商品有关联。评分总和作为推荐分数，103得分10最高。",
  },
  {
    id: "sql-biz-31",
    title: "【金融】信贷逾期预警模型",
    category: "business",
    difficulty: 4,
    keywords: ["信贷风险", "逾期预测", "信用评分"],
    tables: `loans(loan_id INT, user_id INT, loan_amount DECIMAL, loan_date DATE, due_date DATE, repayment_date DATE, status VARCHAR)
users(user_id INT, age INT, income DECIMAL, credit_score INT, loan_count INT)`,
    sampleData: `loans:
| loan_id | user_id | loan_amount | loan_date  | due_date   | repayment_date | status   |
|---------|---------|-------------|------------|------------|----------------|----------|
| 1       | 1       | 10000       | 2024-01-01 | 2024-02-01 | 2024-02-01     | paid     |
| 2       | 1       | 15000       | 2024-02-15 | 2024-03-15 | NULL           | pending  |
| 3       | 2       | 20000       | 2024-01-10 | 2024-02-10 | 2024-02-15     | overdue  |
| 4       | 2       | 25000       | 2024-02-20 | 2024-03-20 | NULL           | pending  |
| 5       | 3       | 5000        | 2024-01-05 | 2024-02-05 | 2024-02-03     | paid     |
| 6       | 3       | 8000        | 2024-02-10 | 2024-03-10 | NULL           | pending  |

users:
| user_id | age | income | credit_score | loan_count |
|---------|-----|--------|--------------|------------|
| 1       | 30  | 80000  | 720          | 2          |
| 2       | 45  | 60000  | 650          | 2          |
| 3       | 28  | 90000  | 750          | 2          |

预测当前pending贷款的逾期风险`,
    expectedOutput: `| loan_id | user_id | loan_amount | days_to_due | overdue_history | debt_to_income | risk_score | risk_level |
|---------|---------|-------------|-------------|-----------------|----------------|------------|------------|
| 4       | 2       | 25000       | 28          | 1               | 0.75           | 75         | 高风险     |
| 6       | 3       | 8000        | 28          | 0               | 0.09           | 25         | 低风险     |
| 2       | 1       | 15000       | 28          | 0               | 0.31           | 35         | 中风险     |

说明：用户2有逾期记录+负债收入比0.75，评分75为高风险`,
    description: "基于历史还款和用户特征预测逾期风险",
    sqlSolutions: [
      `WITH pending_loans AS (
  SELECT 
    loan_id, user_id, loan_amount,
    DATEDIFF(due_date, CURDATE()) AS days_to_due
  FROM loans
  WHERE status = 'pending'
),
user_risk AS (
  SELECT 
    u.user_id,
    COUNT(CASE WHEN l.status = 'overdue' THEN 1 END) AS overdue_history,
    ROUND(SUM(CASE WHEN l.status IN ('pending', 'overdue') THEN l.loan_amount ELSE 0 END) / u.income, 2) AS debt_to_income,
    u.credit_score
  FROM users u
  LEFT JOIN loans l ON u.user_id = l.user_id
  GROUP BY u.user_id, u.income, u.credit_score
)
SELECT 
  pl.loan_id, pl.user_id, pl.loan_amount, pl.days_to_due,
  ur.overdue_history,
  ur.debt_to_income,
  ROUND(
    (ur.overdue_history * 30) + 
    (ur.debt_to_income * 50) + 
    ((800 - ur.credit_score) / 10)
  , 0) AS risk_score,
  CASE 
    WHEN ROUND((ur.overdue_history * 30) + (ur.debt_to_income * 50) + ((800 - ur.credit_score) / 10), 0) >= 60 THEN '高风险'
    WHEN ROUND((ur.overdue_history * 30) + (ur.debt_to_income * 50) + ((800 - ur.credit_score) / 10), 0) >= 30 THEN '中风险'
    ELSE '低风险'
  END AS risk_level
FROM pending_loans pl
JOIN user_risk ur ON pl.user_id = ur.user_id
ORDER BY risk_score DESC;`,
    ],
    pandasSolutions: [
      `# 待还款贷款
pending = loans[loans['status'] == 'pending'].copy()
pending['days_to_due'] = (pd.to_datetime(pending['due_date']) - pd.Timestamp.today()).dt.days

# 用户风险特征
user_risk = loans.groupby('user_id').agg(
    overdue_history=('status', lambda x: (x == 'overdue').sum())
)

# 负债收入比
pending_debt = loans[loans['status'].isin(['pending', 'overdue'])].groupby('user_id')['loan_amount'].sum()
user_risk = user_risk.merge(users[['user_id', 'income', 'credit_score']], on='user_id')
user_risk['debt_to_income'] = (pending_debt / user_risk['income']).fillna(0).round(2)

# 风险评分
result = pending.merge(user_risk, on='user_id')
result['risk_score'] = (
    result['overdue_history'] * 30 + 
    result['debt_to_income'] * 50 + 
    (800 - result['credit_score']) / 10
).round(0)

result['risk_level'] = result['risk_score'].apply(lambda x: 
    '高风险' if x >= 60 else '中风险' if x >= 30 else '低风险'
)

result = result[['loan_id', 'user_id', 'loan_amount', 'days_to_due', 'overdue_history', 'debt_to_income', 'risk_score', 'risk_level']].sort_values('risk_score', ascending=False)`,
    ],
    explanation: "信贷风控评分模型。用户2有1次逾期（30分）+负债收入比0.75（37.5分）+信用分650低（15分）=总分75高风险，需催收介入。",
  },
  {
    id: "sql-biz-32",
    title: "【供应链】供应商绩效评估",
    category: "business",
    difficulty: 3,
    keywords: ["供应商管理", "交付准时率", "质量合格率"],
    tables: `purchase_orders(po_id INT, supplier_id INT, order_date DATE, required_date DATE, delivery_date DATE, quantity INT, defect_count INT, total_amount DECIMAL)`,
    sampleData: `| po_id | supplier_id | order_date | required_date | delivery_date | quantity | defect_count | total_amount |
|-------|-------------|------------|---------------|---------------|----------|--------------|--------------|
| 1     | 1           | 2024-01-01 | 2024-01-10    | 2024-01-09    | 1000     | 10           | 50000        |
| 2     | 1           | 2024-01-15 | 2024-01-25    | 2024-01-27    | 1500     | 30           | 75000        |
| 3     | 1           | 2024-02-01 | 2024-02-10    | 2024-02-10    | 2000     | 15           | 100000       |
| 4     | 2           | 2024-01-05 | 2024-01-15    | 2024-01-14    | 800      | 5            | 40000        |
| 5     | 2           | 2024-01-20 | 2024-01-30    | 2024-02-02    | 1200     | 20           | 60000        |
| 6     | 3           | 2024-01-10 | 2024-01-20    | 2024-01-20    | 1000     | 5            | 50000        |
| 7     | 3           | 2024-02-05 | 2024-02-15    | 2024-02-14    | 1500     | 8            | 75000        |`,
    expectedOutput: `| supplier_id | order_count | on_time_delivery_rate | quality_rate | avg_lead_time | total_spend | performance_score | tier |
|-------------|-------------|----------------------|--------------|---------------|-------------|-------------------|------|
| 3           | 2           | 100.0%               | 99.5%        | 9.5           | 125000      | 98.5              | A    |
| 1           | 3           | 66.7%                | 98.8%        | 9.7           | 225000      | 88.4              | B    |
| 2           | 2           | 50.0%                | 98.8%        | 10.5          | 100000      | 82.7              | B    |

说明：供应商3准时率100%+质量率99.5%，综合评分98.5为A级`,
    description: "评估供应商交付准时率、质量合格率和综合绩效",
    sqlSolutions: [
      `WITH supplier_metrics AS (
  SELECT 
    supplier_id,
    COUNT(*) AS order_count,
    ROUND(100.0 * SUM(CASE WHEN delivery_date <= required_date THEN 1 ELSE 0 END) / COUNT(*), 1) AS on_time_delivery_rate,
    ROUND(100.0 * (SUM(quantity) - SUM(defect_count)) / SUM(quantity), 1) AS quality_rate,
    ROUND(AVG(DATEDIFF(delivery_date, order_date)), 1) AS avg_lead_time,
    SUM(total_amount) AS total_spend
  FROM purchase_orders
  GROUP BY supplier_id
),
scoring AS (
  SELECT 
    *,
    ROUND(
      (on_time_delivery_rate * 0.4) + 
      (quality_rate * 0.4) + 
      (CASE WHEN avg_lead_time <= 10 THEN 20 ELSE 20 - (avg_lead_time - 10) END)
    , 1) AS performance_score
  FROM supplier_metrics
)
SELECT 
  supplier_id, order_count,
  CONCAT(on_time_delivery_rate, '%') AS on_time_delivery_rate,
  CONCAT(quality_rate, '%') AS quality_rate,
  avg_lead_time, total_spend, performance_score,
  CASE 
    WHEN performance_score >= 90 THEN 'A'
    WHEN performance_score >= 80 THEN 'B'
    WHEN performance_score >= 70 THEN 'C'
    ELSE 'D'
  END AS tier
FROM scoring
ORDER BY performance_score DESC;`,
    ],
    pandasSolutions: [
      `supplier_metrics = df.groupby('supplier_id').agg(
    order_count=('po_id', 'count'),
    on_time=('po_id', lambda x: ((pd.to_datetime(df.loc[x.index, 'delivery_date']) <= pd.to_datetime(df.loc[x.index, 'required_date'])).sum())),
    total_orders=('po_id', 'count'),
    quality_good=('quantity', 'sum'),
    total_qty=('quantity', 'sum'),
    defects=('defect_count', 'sum'),
    avg_lead_time=('po_id', lambda x: ((pd.to_datetime(df.loc[x.index, 'delivery_date']) - pd.to_datetime(df.loc[x.index, 'order_date'])).dt.days.mean())),
    total_spend=('total_amount', 'sum')
).reset_index()

supplier_metrics['on_time_delivery_rate'] = round(100 * supplier_metrics['on_time'] / supplier_metrics['total_orders'], 1)
supplier_metrics['quality_rate'] = round(100 * (supplier_metrics['quality_good'] - supplier_metrics['defects']) / supplier_metrics['total_qty'], 1)
supplier_metrics['avg_lead_time'] = supplier_metrics['avg_lead_time'].round(1)

supplier_metrics['performance_score'] = (
    supplier_metrics['on_time_delivery_rate'] * 0.4 + 
    supplier_metrics['quality_rate'] * 0.4 + 
    supplier_metrics['avg_lead_time'].apply(lambda x: 20 if x <= 10 else max(0, 20 - (x - 10)))
).round(1)

supplier_metrics['tier'] = supplier_metrics['performance_score'].apply(lambda x:
    'A' if x >= 90 else 'B' if x >= 80 else 'C' if x >= 70 else 'D'
)

result = supplier_metrics[['supplier_id', 'order_count', 'on_time_delivery_rate', 'quality_rate', 'avg_lead_time', 'total_spend', 'performance_score', 'tier']].sort_values('performance_score', ascending=False)
result['on_time_delivery_rate'] = result['on_time_delivery_rate'].astype(str) + '%'
result['quality_rate'] = result['quality_rate'].astype(str) + '%'`,
    ],
    explanation: "供应商绩效管理。评分=准时率×40%+质量率×40%+交期评分20%。供应商3全部准时交付+次品率0.5%，综合98.5分评为A级优质供应商。",
  },
  {
    id: "sql-biz-33",
    title: "【会员体系】积分有效期与沉淀分析",
    category: "business",
    difficulty: 3,
    keywords: ["积分系统", "有效期", "沉淀率"],
    tables: `points_transactions(txn_id INT, user_id INT, points INT, txn_type VARCHAR, txn_date DATE, expire_date DATE, status VARCHAR)`,
    sampleData: `| txn_id | user_id | points | txn_type | txn_date   | expire_date | status   |
|--------|---------|--------|----------|------------|-------------|----------|
| 1      | 1       | 1000   | earn     | 2024-01-01 | 2025-01-01  | active   |
| 2      | 1       | -500   | redeem   | 2024-01-15 | NULL        | complete |
| 3      | 1       | 500    | earn     | 2024-02-01 | 2025-02-01  | active   |
| 4      | 2       | 2000   | earn     | 2024-01-10 | 2025-01-10  | active   |
| 5      | 2       | -100   | redeem   | 2024-01-20 | NULL        | complete |
| 6      | 3       | 800    | earn     | 2023-01-15 | 2024-01-15  | expired  |
| 7      | 3       | 1000   | earn     | 2024-02-01 | 2025-02-01  | active   |
| 8      | 4       | 1500   | earn     | 2024-01-05 | 2025-01-05  | active   |
| 9      | 4       | -1500  | redeem   | 2024-01-25 | NULL        | complete |

分析当前时间2024-02-15的积分状况`,
    expectedOutput: `| user_id | earned_points | redeemed_points | expired_points | active_points | expiring_30d | redemption_rate |
|---------|---------------|-----------------|----------------|---------------|--------------|-----------------|
| 1       | 1500          | 500             | 0              | 1000          | 0            | 33.3%           |
| 2       | 2000          | 100             | 0              | 1900          | 0            | 5.0%            |
| 3       | 1800          | 0               | 800            | 1000          | 0            | 0.0%            |
| 4       | 1500          | 1500            | 0              | 0             | 0            | 100.0%          |

说明：用户4积分全部核销（100%），用户3有800积分过期沉淀`,
    description: "分析用户积分余额、过期、核销情况",
    sqlSolutions: [
      `WITH user_points AS (
  SELECT 
    user_id,
    SUM(CASE WHEN txn_type = 'earn' THEN points ELSE 0 END) AS earned_points,
    SUM(CASE WHEN txn_type = 'redeem' THEN -points ELSE 0 END) AS redeemed_points,
    SUM(CASE WHEN status = 'expired' THEN points ELSE 0 END) AS expired_points,
    SUM(CASE WHEN status = 'active' THEN points WHEN txn_type = 'redeem' THEN points ELSE 0 END) AS active_points,
    SUM(CASE WHEN status = 'active' AND expire_date <= DATE_ADD('2024-02-15', INTERVAL 30 DAY) THEN points ELSE 0 END) AS expiring_30d
  FROM points_transactions
  GROUP BY user_id
)
SELECT 
  user_id, earned_points, redeemed_points, expired_points, active_points, expiring_30d,
  CONCAT(ROUND(100.0 * redeemed_points / NULLIF(earned_points, 0), 1), '%') AS redemption_rate
FROM user_points
ORDER BY user_id;`,
    ],
    pandasSolutions: [
      `analysis_date = pd.Timestamp('2024-02-15')

user_points = df.groupby('user_id').apply(lambda g: pd.Series({
    'earned_points': g[g['txn_type'] == 'earn']['points'].sum(),
    'redeemed_points': -g[g['txn_type'] == 'redeem']['points'].sum(),
    'expired_points': g[g['status'] == 'expired']['points'].sum(),
    'active_points': g[g['status'] == 'active']['points'].sum() + g[g['txn_type'] == 'redeem']['points'].sum(),
    'expiring_30d': g[
        (g['status'] == 'active') & 
        (pd.to_datetime(g['expire_date']) <= analysis_date + pd.Timedelta(days=30))
    ]['points'].sum()
})).reset_index()

user_points['redemption_rate'] = (100 * user_points['redeemed_points'] / user_points['earned_points']).round(1).astype(str) + '%'
result = user_points.sort_values('user_id')`,
    ],
    explanation: "会员积分运营。用户4核销率100%活跃度高，用户2有1900积分沉淀需促销激活。用户3积分过期800造成损失，需提醒机制。",
  },
  {
    id: "sql-biz-34",
    title: "【直播】主播带货效果分析",
    category: "business",
    difficulty: 4,
    keywords: ["直播电商", "转化率", "GMV", "观看时长"],
    tables: `live_sessions(session_id INT, streamer_id INT, start_time DATETIME, end_time DATETIME, peak_viewers INT, total_views INT)
live_orders(order_id INT, session_id INT, user_id INT, product_id INT, order_amount DECIMAL, order_time DATETIME)`,
    sampleData: `live_sessions:
| session_id | streamer_id | start_time          | end_time            | peak_viewers | total_views |
|------------|-------------|---------------------|---------------------|--------------|-------------|
| 1          | 1           | 2024-01-01 20:00:00 | 2024-01-01 22:00:00 | 5000         | 8000        |
| 2          | 1           | 2024-01-08 20:00:00 | 2024-01-08 22:30:00 | 6000         | 10000       |
| 3          | 2           | 2024-01-03 19:00:00 | 2024-01-03 21:00:00 | 3000         | 5000        |
| 4          | 2           | 2024-01-10 19:00:00 | 2024-01-10 21:30:00 | 3500         | 6000        |

live_orders:
| order_id | session_id | user_id | product_id | order_amount | order_time          |
|----------|------------|---------|------------|--------------|---------------------|
| 1        | 1          | 101     | 1001       | 299          | 2024-01-01 20:30:00 |
| 2        | 1          | 102     | 1002       | 499          | 2024-01-01 21:00:00 |
| 3        | 1          | 103     | 1001       | 299          | 2024-01-01 21:30:00 |
| 4        | 2          | 104     | 1003       | 799          | 2024-01-08 20:45:00 |
| 5        | 2          | 105     | 1003       | 799          | 2024-01-08 21:15:00 |
| 6        | 2          | 106     | 1001       | 299          | 2024-01-08 22:00:00 |
| 7        | 3          | 107     | 1004       | 399          | 2024-01-03 19:30:00 |
| 8        | 3          | 108     | 1004       | 399          | 2024-01-03 20:00:00 |`,
    expectedOutput: `| streamer_id | session_count | avg_duration_min | avg_peak_viewers | total_gmv | conversion_rate | gmv_per_viewer |
|-------------|---------------|------------------|------------------|-----------|-----------------|----------------|
| 1           | 2             | 135              | 5500             | 2894      | 0.05%           | 0.32           |
| 2           | 2             | 120              | 3250             | 798       | 0.03%           | 0.14           |

说明：主播1平均峰值5500人，GMV 2894元，每千次观看产生320元GMV`,
    description: "分析直播间流量、转化率和GMV效率",
    sqlSolutions: [
      `WITH session_metrics AS (
  SELECT 
    s.streamer_id,
    s.session_id,
    TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time) AS duration_min,
    s.peak_viewers,
    s.total_views,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.order_amount), 0) AS session_gmv
  FROM live_sessions s
  LEFT JOIN live_orders o ON s.session_id = o.session_id
  GROUP BY s.streamer_id, s.session_id, s.start_time, s.end_time, s.peak_viewers, s.total_views
),
streamer_summary AS (
  SELECT 
    streamer_id,
    COUNT(*) AS session_count,
    ROUND(AVG(duration_min), 0) AS avg_duration_min,
    ROUND(AVG(peak_viewers), 0) AS avg_peak_viewers,
    SUM(session_gmv) AS total_gmv,
    SUM(order_count) AS total_orders,
    SUM(total_views) AS total_views
  FROM session_metrics
  GROUP BY streamer_id
)
SELECT 
  streamer_id, session_count, avg_duration_min, avg_peak_viewers, total_gmv,
  CONCAT(ROUND(100.0 * total_orders / total_views, 2), '%') AS conversion_rate,
  ROUND(total_gmv / total_views, 2) AS gmv_per_viewer
FROM streamer_summary
ORDER BY total_gmv DESC;`,
    ],
    pandasSolutions: [
      `sessions['duration_min'] = (pd.to_datetime(sessions['end_time']) - pd.to_datetime(sessions['start_time'])).dt.total_seconds() / 60

session_gmv = orders.groupby('session_id').agg(
    order_count=('order_id', 'count'),
    session_gmv=('order_amount', 'sum')
).reset_index()

session_metrics = sessions.merge(session_gmv, on='session_id', how='left').fillna(0)

streamer_summary = session_metrics.groupby('streamer_id').agg(
    session_count=('session_id', 'count'),
    avg_duration_min=('duration_min', lambda x: round(x.mean(), 0)),
    avg_peak_viewers=('peak_viewers', lambda x: round(x.mean(), 0)),
    total_gmv=('session_gmv', 'sum'),
    total_orders=('order_count', 'sum'),
    total_views=('total_views', 'sum')
).reset_index()

streamer_summary['conversion_rate'] = (100 * streamer_summary['total_orders'] / streamer_summary['total_views']).round(2).astype(str) + '%'
streamer_summary['gmv_per_viewer'] = (streamer_summary['total_gmv'] / streamer_summary['total_views']).round(2)

result = streamer_summary.sort_values('total_gmv', ascending=False)`,
    ],
    explanation: "直播电商核心指标。主播1转化率0.05%，每千次观看GMV 320元，表现优于主播2。可优化选品、话术、福利提升转化。",
  },
  {
    id: "sql-biz-35",
    title: "【O2O】骑手配送效率与满意度",
    category: "business",
    difficulty: 3,
    keywords: ["配送效率", "履约率", "骑手管理"],
    tables: `deliveries(delivery_id INT, rider_id INT, order_time DATETIME, pickup_time DATETIME, delivery_time DATETIME, promised_time DATETIME, distance_km DECIMAL, rating INT)`,
    sampleData: `| delivery_id | rider_id | order_time          | pickup_time         | delivery_time       | promised_time       | distance_km | rating |
|-------------|----------|---------------------|---------------------|---------------------|---------------------|-------------|--------|
| 1           | 1        | 2024-01-01 12:00:00 | 2024-01-01 12:10:00 | 2024-01-01 12:35:00 | 2024-01-01 12:40:00 | 3.5         | 5      |
| 2           | 1        | 2024-01-01 13:00:00 | 2024-01-01 13:08:00 | 2024-01-01 13:28:00 | 2024-01-01 13:30:00 | 2.8         | 5      |
| 3           | 1        | 2024-01-01 14:00:00 | 2024-01-01 14:15:00 | 2024-01-01 14:50:00 | 2024-01-01 14:45:00 | 4.2         | 3      |
| 4           | 2        | 2024-01-01 12:05:00 | 2024-01-01 12:12:00 | 2024-01-01 12:38:00 | 2024-01-01 12:40:00 | 3.2         | 5      |
| 5           | 2        | 2024-01-01 13:10:00 | 2024-01-01 13:18:00 | 2024-01-01 13:45:00 | 2024-01-01 13:50:00 | 3.0         | 4      |
| 6           | 3        | 2024-01-01 12:20:00 | 2024-01-01 12:30:00 | 2024-01-01 13:00:00 | 2024-01-01 12:55:00 | 3.8         | 4      |
| 7           | 3        | 2024-01-01 14:00:00 | 2024-01-01 14:12:00 | 2024-01-01 14:45:00 | 2024-01-01 14:50:00 | 4.0         | 5      |`,
    expectedOutput: `| rider_id | order_count | on_time_rate | avg_delivery_time | avg_speed_kmh | avg_rating | performance_level |
|----------|-------------|--------------|-------------------|---------------|------------|-------------------|
| 2        | 2           | 100.0%       | 29.0              | 6.6           | 4.5        | 优秀              |
| 3        | 2           | 50.0%        | 32.5              | 7.0           | 4.5        | 良好              |
| 1        | 3           | 66.7%        | 31.0              | 6.4           | 4.3        | 良好              |

说明：骑手2准时率100%+配送29分钟+评分4.5，综合表现优秀`,
    description: "评估骑手配送准时率、速度和服务质量",
    sqlSolutions: [
      `WITH rider_metrics AS (
  SELECT 
    rider_id,
    COUNT(*) AS order_count,
    ROUND(100.0 * SUM(CASE WHEN delivery_time <= promised_time THEN 1 ELSE 0 END) / COUNT(*), 1) AS on_time_rate,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, pickup_time, delivery_time)), 1) AS avg_delivery_time,
    ROUND(AVG(distance_km / (TIMESTAMPDIFF(MINUTE, pickup_time, delivery_time) / 60.0)), 1) AS avg_speed_kmh,
    ROUND(AVG(rating), 1) AS avg_rating
  FROM deliveries
  GROUP BY rider_id
)
SELECT 
  rider_id, order_count,
  CONCAT(on_time_rate, '%') AS on_time_rate,
  avg_delivery_time, avg_speed_kmh, avg_rating,
  CASE 
    WHEN on_time_rate >= 90 AND avg_rating >= 4.5 THEN '优秀'
    WHEN on_time_rate >= 80 AND avg_rating >= 4.0 THEN '良好'
    WHEN on_time_rate >= 70 THEN '合格'
    ELSE '需改进'
  END AS performance_level
FROM rider_metrics
ORDER BY on_time_rate DESC, avg_rating DESC;`,
    ],
    pandasSolutions: [
      `df['delivery_time_min'] = (pd.to_datetime(df['delivery_time']) - pd.to_datetime(df['pickup_time'])).dt.total_seconds() / 60
df['on_time'] = (pd.to_datetime(df['delivery_time']) <= pd.to_datetime(df['promised_time'])).astype(int)
df['speed_kmh'] = df['distance_km'] / (df['delivery_time_min'] / 60)

rider_metrics = df.groupby('rider_id').agg(
    order_count=('delivery_id', 'count'),
    on_time_rate=('on_time', lambda x: round(100 * x.mean(), 1)),
    avg_delivery_time=('delivery_time_min', lambda x: round(x.mean(), 1)),
    avg_speed_kmh=('speed_kmh', lambda x: round(x.mean(), 1)),
    avg_rating=('rating', lambda x: round(x.mean(), 1))
).reset_index()

def performance_level(row):
    if row['on_time_rate'] >= 90 and row['avg_rating'] >= 4.5:
        return '优秀'
    elif row['on_time_rate'] >= 80 and row['avg_rating'] >= 4.0:
        return '良好'
    elif row['on_time_rate'] >= 70:
        return '合格'
    return '需改进'

rider_metrics['performance_level'] = rider_metrics.apply(performance_level, axis=1)
rider_metrics['on_time_rate'] = rider_metrics['on_time_rate'].astype(str) + '%'
result = rider_metrics.sort_values(['on_time_rate', 'avg_rating'], ascending=[False, False])`,
    ],
    explanation: "O2O配送运营。骑手2准时率100%+时速6.6km/h+评分4.5最优。骑手1有1单超时5分钟导致差评，需优化路线规划。",
  },
  {
    id: "sql-biz-36",
    title: "【电商】退货率与退货原因分析",
    category: "business",
    difficulty: 3,
    keywords: ["退货率", "售后分析", "质量问题"],
    tables: `orders(order_id INT, product_id INT, user_id INT, order_date DATE, quantity INT, amount DECIMAL)
returns(return_id INT, order_id INT, return_date DATE, return_reason VARCHAR, refund_amount DECIMAL, status VARCHAR)`,
    sampleData: `orders:
| order_id | product_id | user_id | order_date | quantity | amount |
|----------|------------|---------|------------|----------|--------|
| 1        | 101        | 1       | 2024-01-01 | 1        | 299    |
| 2        | 101        | 2       | 2024-01-02 | 2        | 598    |
| 3        | 102        | 3       | 2024-01-03 | 1        | 499    |
| 4        | 102        | 4       | 2024-01-04 | 1        | 499    |
| 5        | 103        | 5       | 2024-01-05 | 1        | 199    |
| 6        | 101        | 6       | 2024-01-06 | 1        | 299    |

returns:
| return_id | order_id | return_date | return_reason | refund_amount | status    |
|-----------|----------|-------------|---------------|---------------|-----------|
| 1         | 1        | 2024-01-10  | 质量问题      | 299           | completed |
| 2         | 3        | 2024-01-12  | 不喜欢        | 499           | completed |
| 3         | 6        | 2024-01-15  | 质量问题      | 299           | completed |`,
    expectedOutput: `| product_id | total_orders | return_orders | return_rate | total_sales | return_loss | top_return_reason |
|------------|--------------|---------------|-------------|-------------|-------------|-------------------|
| 101        | 3            | 2             | 66.7%       | 1196        | 598         | 质量问题          |
| 102        | 2            | 1             | 50.0%       | 998         | 499         | 不喜欢            |
| 103        | 1            | 0             | 0.0%        | 199         | 0           | -                 |

说明：商品101退货率66.7%，主因质量问题，需紧急改进`,
    description: "分析各商品退货率和主要退货原因",
    sqlSolutions: [
      `WITH product_returns AS (
  SELECT 
    o.product_id,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COUNT(DISTINCT r.order_id) AS return_orders,
    SUM(o.amount) AS total_sales,
    COALESCE(SUM(r.refund_amount), 0) AS return_loss,
    (SELECT return_reason 
     FROM returns r2 
     JOIN orders o2 ON r2.order_id = o2.order_id 
     WHERE o2.product_id = o.product_id 
     GROUP BY return_reason 
     ORDER BY COUNT(*) DESC 
     LIMIT 1) AS top_return_reason
  FROM orders o
  LEFT JOIN returns r ON o.order_id = r.order_id AND r.status = 'completed'
  GROUP BY o.product_id
)
SELECT 
  product_id, total_orders, return_orders,
  CONCAT(ROUND(100.0 * return_orders / total_orders, 1), '%') AS return_rate,
  total_sales, return_loss,
  COALESCE(top_return_reason, '-') AS top_return_reason
FROM product_returns
ORDER BY return_rate DESC;`,
    ],
    pandasSolutions: [
      `# 合并订单和退货
order_returns = orders.merge(returns[returns['status'] == 'completed'], on='order_id', how='left')

product_stats = orders.groupby('product_id').agg(
    total_orders=('order_id', 'nunique'),
    total_sales=('amount', 'sum')
).reset_index()

return_stats = order_returns[order_returns['return_id'].notna()].groupby('product_id').agg(
    return_orders=('order_id', 'nunique'),
    return_loss=('refund_amount', 'sum'),
    top_return_reason=('return_reason', lambda x: x.mode()[0] if len(x.mode()) > 0 else '-')
).reset_index()

result = product_stats.merge(return_stats, on='product_id', how='left').fillna({'return_orders': 0, 'return_loss': 0, 'top_return_reason': '-'})
result['return_rate'] = (100 * result['return_orders'] / result['total_orders']).round(1).astype(str) + '%'
result = result[['product_id', 'total_orders', 'return_orders', 'return_rate', 'total_sales', 'return_loss', 'top_return_reason']].sort_values('return_orders', ascending=False)`,
    ],
    explanation: "售后分析关键指标。商品101退货率66.7%且主因质量问题，需立即下架检查。商品102退货因\"不喜欢\"属正常，可优化商详图。",
  },
  {
    id: "sql-biz-37",
    title: "【人力资源】员工离职预测模型",
    category: "business",
    difficulty: 4,
    keywords: ["离职预测", "员工留存", "HR分析"],
    tables: `employees(emp_id INT, dept VARCHAR, position VARCHAR, tenure_months INT, salary DECIMAL, last_promotion_months INT, performance_score INT, satisfaction_score INT, overtime_hours INT, status VARCHAR)`,
    sampleData: `| emp_id | dept  | position | tenure_months | salary | last_promotion_months | performance_score | satisfaction_score | overtime_hours | status |
|--------|-------|----------|---------------|--------|-----------------------|-------------------|-------------------|----------------|--------|
| 1      | Sales | Senior   | 36            | 80000  | 12                    | 85                | 4                 | 20             | active |
| 2      | IT    | Junior   | 24            | 60000  | 24                    | 70                | 3                 | 50             | left   |
| 3      | Sales | Manager  | 48            | 100000 | 6                     | 90                | 5                 | 10             | active |
| 4      | IT    | Senior   | 18            | 75000  | 18                    | 65                | 2                 | 60             | left   |
| 5      | HR    | Junior   | 12            | 55000  | 12                    | 80                | 4                 | 15             | active |
| 6      | IT    | Junior   | 30            | 62000  | 30                    | 75                | 3                 | 45             | left   |

预测当前active员工的离职风险`,
    expectedOutput: `| emp_id | dept  | position | tenure_months | flight_risk_score | risk_level | key_risk_factors                    |
|--------|-------|----------|---------------|-------------------|------------|-------------------------------------|
| 5      | HR    | Junior   | 12            | 45                | 中风险     | 入职不满18月,满意度中等             |
| 1      | Sales | Senior   | 36            | 35                | 低风险     | 加班较多但满意度高                  |
| 3      | Sales | Manager  | 48            | 15                | 低风险     | 近期晋升+高绩效+高满意度            |

说明：员工5入职仅12月+未晋升+满意度3，离职风险45分为中风险`,
    description: "基于多维度特征预测员工离职风险",
    sqlSolutions: [
      `WITH active_employees AS (
  SELECT *
  FROM employees
  WHERE status = 'active'
),
risk_scoring AS (
  SELECT 
    emp_id, dept, position, tenure_months,
    (CASE 
      WHEN tenure_months < 18 THEN 20
      WHEN tenure_months < 36 THEN 10
      ELSE 0
    END) +
    (CASE 
      WHEN last_promotion_months > 24 THEN 25
      WHEN last_promotion_months > 18 THEN 15
      ELSE 0
    END) +
    (CASE 
      WHEN satisfaction_score <= 2 THEN 30
      WHEN satisfaction_score <= 3 THEN 15
      ELSE 0
    END) +
    (CASE 
      WHEN performance_score < 70 THEN 15
      ELSE 0
    END) +
    (CASE 
      WHEN overtime_hours > 40 THEN 10
      ELSE 0
    END) AS flight_risk_score,
    CONCAT_WS(',',
      CASE WHEN tenure_months < 18 THEN '入职不满18月' END,
      CASE WHEN last_promotion_months > 24 THEN '超2年未晋升' END,
      CASE WHEN satisfaction_score <= 3 THEN '满意度中等' END,
      CASE WHEN performance_score < 70 THEN '绩效偏低' END,
      CASE WHEN overtime_hours > 40 THEN '加班过多' END
    ) AS key_risk_factors
  FROM active_employees
)
SELECT 
  emp_id, dept, position, tenure_months, flight_risk_score,
  CASE 
    WHEN flight_risk_score >= 50 THEN '高风险'
    WHEN flight_risk_score >= 30 THEN '中风险'
    ELSE '低风险'
  END AS risk_level,
  key_risk_factors
FROM risk_scoring
ORDER BY flight_risk_score DESC;`,
    ],
    pandasSolutions: [
      `active = df[df['status'] == 'active'].copy()

def calculate_risk(row):
    score = 0
    factors = []
    
    if row['tenure_months'] < 18:
        score += 20
        factors.append('入职不满18月')
    elif row['tenure_months'] < 36:
        score += 10
    
    if row['last_promotion_months'] > 24:
        score += 25
        factors.append('超2年未晋升')
    elif row['last_promotion_months'] > 18:
        score += 15
    
    if row['satisfaction_score'] <= 2:
        score += 30
        factors.append('满意度低')
    elif row['satisfaction_score'] <= 3:
        score += 15
        factors.append('满意度中等')
    
    if row['performance_score'] < 70:
        score += 15
        factors.append('绩效偏低')
    
    if row['overtime_hours'] > 40:
        score += 10
        factors.append('加班过多')
    
    return pd.Series({'flight_risk_score': score, 'key_risk_factors': ','.join(factors)})

risk_data = active.apply(calculate_risk, axis=1)
active = pd.concat([active, risk_data], axis=1)

active['risk_level'] = active['flight_risk_score'].apply(lambda x:
    '高风险' if x >= 50 else '中风险' if x >= 30 else '低风险'
)

result = active[['emp_id', 'dept', 'position', 'tenure_months', 'flight_risk_score', 'risk_level', 'key_risk_factors']].sort_values('flight_risk_score', ascending=False)`,
    ],
    explanation: "HR离职预测模型。员工5风险分45（入职12月20分+未晋升0分+满意度3分15分+加班15h0分）=中风险，建议1对1沟通改善。",
  },
  
  // ========== 第十批15题（窗口函数专题） ==========
  {
    id: "sql-win-11",
    title: "【窗口函数】销售排名与累计占比",
    category: "window",
    difficulty: 3,
    keywords: ["RANK", "DENSE_RANK", "累计求和", "占比"],
    tables: `sales(sales_id INT, salesperson VARCHAR, amount DECIMAL, sale_date DATE)`,
    sampleData: `| sales_id | salesperson | amount | sale_date  |
|----------|-------------|--------|------------|
| 1        | Alice       | 5000   | 2024-01-10 |
| 2        | Bob         | 5000   | 2024-01-12 |
| 3        | Charlie     | 4500   | 2024-01-15 |
| 4        | David       | 4000   | 2024-01-18 |
| 5        | Eve         | 3500   | 2024-01-20 |
| 6        | Frank       | 3000   | 2024-01-22 |`,
    expectedOutput: `| salesperson | amount | rank | dense_rank | cum_amount | cum_pct |
|-------------|--------|------|------------|------------|---------|
| Alice       | 5000   | 1    | 1          | 5000       | 20.0%   |
| Bob         | 5000   | 1    | 1          | 10000      | 40.0%   |
| Charlie     | 4500   | 3    | 2          | 14500      | 58.0%   |
| David       | 4000   | 4    | 3          | 18500      | 74.0%   |
| Eve         | 3500   | 5    | 4          | 22000      | 88.0%   |
| Frank       | 3000   | 6    | 5          | 25000      | 100.0%  |

说明：Alice和Bob同分并列第1，RANK跳到3，DENSE_RANK为2`,
    description: "计算销售排名、累计金额和累计占比",
    sqlSolutions: [
      `SELECT 
  salesperson,
  amount,
  RANK() OVER(ORDER BY amount DESC) AS rank,
  DENSE_RANK() OVER(ORDER BY amount DESC) AS dense_rank,
  SUM(amount) OVER(ORDER BY amount DESC, salesperson 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_amount,
  CONCAT(ROUND(100.0 * SUM(amount) OVER(ORDER BY amount DESC, salesperson 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) / 
    SUM(amount) OVER(), 1), '%') AS cum_pct
FROM sales
ORDER BY amount DESC, salesperson;`,
      `WITH ranked AS (
  SELECT 
    salesperson, amount,
    RANK() OVER(ORDER BY amount DESC) AS rank,
    DENSE_RANK() OVER(ORDER BY amount DESC) AS dense_rank,
    SUM(amount) OVER(ORDER BY amount DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_amount,
    SUM(amount) OVER() AS total_amount
  FROM sales
)
SELECT 
  salesperson, amount, rank, dense_rank, cum_amount,
  CONCAT(ROUND(100.0 * cum_amount / total_amount, 1), '%') AS cum_pct
FROM ranked
ORDER BY amount DESC, salesperson;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('amount', ascending=False).reset_index(drop=True)
df['rank'] = df['amount'].rank(method='min', ascending=False).astype(int)
df['dense_rank'] = df['amount'].rank(method='dense', ascending=False).astype(int)
df['cum_amount'] = df['amount'].cumsum()
df['cum_pct'] = (100 * df['cum_amount'] / df['amount'].sum()).round(1).astype(str) + '%'
result = df[['salesperson', 'amount', 'rank', 'dense_rank', 'cum_amount', 'cum_pct']]`,
    ],
    explanation: "窗口函数排名与累计。RANK()遇到并列会跳号，DENSE_RANK()连续。累计求和用于计算帕累托分析（二八法则）。",
  },
  {
    id: "sql-win-12",
    title: "【窗口函数】环比与同比增长率",
    category: "window",
    difficulty: 3,
    keywords: ["LAG", "环比", "同比", "增长率"],
    tables: `monthly_revenue(month DATE, revenue DECIMAL)`,
    sampleData: `| month      | revenue |
|------------|---------|
| 2023-01-01 | 100000  |
| 2023-02-01 | 105000  |
| 2023-03-01 | 110000  |
| 2024-01-01 | 120000  |
| 2024-02-01 | 130000  |
| 2024-03-01 | 135000  |`,
    expectedOutput: `| month      | revenue | mom_growth | yoy_growth |
|------------|---------|------------|------------|
| 2023-01-01 | 100000  | -          | -          |
| 2023-02-01 | 105000  | 5.0%       | -          |
| 2023-03-01 | 110000  | 4.8%       | -          |
| 2024-01-01 | 120000  | 9.1%       | 20.0%      |
| 2024-02-01 | 130000  | 8.3%       | 23.8%      |
| 2024-03-01 | 135000  | 3.8%       | 22.7%      |

说明：MoM环比=与上月对比，YoY同比=与去年同月对比`,
    description: "计算月环比(MoM)和年同比(YoY)增长率",
    sqlSolutions: [
      `SELECT 
  month,
  revenue,
  CASE 
    WHEN LAG(revenue, 1) OVER(ORDER BY month) IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (revenue - LAG(revenue, 1) OVER(ORDER BY month)) / 
         LAG(revenue, 1) OVER(ORDER BY month), 1), '%')
  END AS mom_growth,
  CASE 
    WHEN LAG(revenue, 12) OVER(ORDER BY month) IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (revenue - LAG(revenue, 12) OVER(ORDER BY month)) / 
         LAG(revenue, 12) OVER(ORDER BY month), 1), '%')
  END AS yoy_growth
FROM monthly_revenue
ORDER BY month;`,
    ],
    pandasSolutions: [
      `df['month'] = pd.to_datetime(df['month'])
df = df.sort_values('month')

df['prev_month_revenue'] = df['revenue'].shift(1)
df['prev_year_revenue'] = df['revenue'].shift(12)

df['mom_growth'] = ((df['revenue'] - df['prev_month_revenue']) / df['prev_month_revenue'] * 100).round(1)
df['yoy_growth'] = ((df['revenue'] - df['prev_year_revenue']) / df['prev_year_revenue'] * 100).round(1)

df['mom_growth'] = df['mom_growth'].fillna('-').apply(lambda x: f"{x}%" if x != '-' else '-')
df['yoy_growth'] = df['yoy_growth'].fillna('-').apply(lambda x: f"{x}%" if x != '-' else '-')

result = df[['month', 'revenue', 'mom_growth', 'yoy_growth']]`,
    ],
    explanation: "LAG()取上一行数据。环比用LAG(1)取上月，同比用LAG(12)取去年同月。2024-01月同比2023-01月增长20%。",
  },
  {
    id: "sql-win-13",
    title: "【窗口函数】分组内排名TopN",
    category: "window",
    difficulty: 3,
    keywords: ["PARTITION BY", "ROW_NUMBER", "分组排名"],
    tables: `products(product_id INT, category VARCHAR, product_name VARCHAR, sales DECIMAL)`,
    sampleData: `| product_id | category    | product_name | sales |
|------------|-------------|--------------|-------|
| 1          | Electronics | Phone A      | 5000  |
| 2          | Electronics | Phone B      | 4500  |
| 3          | Electronics | Laptop X     | 4000  |
| 4          | Books       | Novel A      | 3000  |
| 5          | Books       | Novel B      | 2500  |
| 6          | Books       | Novel C      | 2000  |
| 7          | Clothing    | Shirt A      | 1500  |
| 8          | Clothing    | Shirt B      | 1200  |`,
    expectedOutput: `| category    | product_name | sales | rank_in_category |
|-------------|--------------|-------|------------------|
| Electronics | Phone A      | 5000  | 1                |
| Electronics | Phone B      | 4500  | 2                |
| Books       | Novel A      | 3000  | 1                |
| Books       | Novel B      | 2500  | 2                |
| Clothing    | Shirt A      | 1500  | 1                |
| Clothing    | Shirt B      | 1200  | 2                |

说明：每个类别取销售额Top 2的商品`,
    description: "每个分类中选出销售额前2名的商品",
    sqlSolutions: [
      `WITH ranked AS (
  SELECT 
    category, product_name, sales,
    ROW_NUMBER() OVER(PARTITION BY category ORDER BY sales DESC) AS rank_in_category
  FROM products
)
SELECT category, product_name, sales, rank_in_category
FROM ranked
WHERE rank_in_category <= 2
ORDER BY category, rank_in_category;`,
      `SELECT category, product_name, sales, rank_in_category
FROM (
  SELECT 
    category, product_name, sales,
    ROW_NUMBER() OVER(PARTITION BY category ORDER BY sales DESC) AS rank_in_category
  FROM products
) t
WHERE rank_in_category <= 2
ORDER BY category, rank_in_category;`,
    ],
    pandasSolutions: [
      `df['rank_in_category'] = df.groupby('category')['sales'].rank(method='first', ascending=False).astype(int)
result = df[df['rank_in_category'] <= 2][['category', 'product_name', 'sales', 'rank_in_category']].sort_values(['category', 'rank_in_category'])`,
    ],
    explanation: "PARTITION BY实现分组排名。ROW_NUMBER()每行唯一编号，常用于TopN问题。每个类别独立排序取前2名。",
  },
  {
    id: "sql-win-14",
    title: "【窗口函数】移动平均与移动总和",
    category: "window",
    difficulty: 4,
    keywords: ["ROWS BETWEEN", "移动平均", "滑动窗口"],
    tables: `daily_orders(order_date DATE, order_count INT)`,
    sampleData: `| order_date | order_count |
|------------|-------------|
| 2024-01-01 | 100         |
| 2024-01-02 | 120         |
| 2024-01-03 | 110         |
| 2024-01-04 | 130         |
| 2024-01-05 | 140         |
| 2024-01-06 | 125         |
| 2024-01-07 | 135         |`,
    expectedOutput: `| order_date | order_count | ma_3 | ma_7 | rolling_sum_3 |
|------------|-------------|------|------|---------------|
| 2024-01-01 | 100         | 100  | 100  | 100           |
| 2024-01-02 | 120         | 110  | 110  | 220           |
| 2024-01-03 | 110         | 110  | 110  | 330           |
| 2024-01-04 | 130         | 120  | 115  | 360           |
| 2024-01-05 | 140         | 127  | 122  | 380           |
| 2024-01-06 | 125         | 132  | 122  | 395           |
| 2024-01-07 | 135         | 133  | 123  | 400           |

说明：ma_3为3日移动平均，ma_7为7日移动平均，rolling_sum_3为3日滚动总和`,
    description: "计算订单的移动平均和滚动求和",
    sqlSolutions: [
      `SELECT 
  order_date,
  order_count,
  ROUND(AVG(order_count) OVER(ORDER BY order_date 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS ma_3,
  ROUND(AVG(order_count) OVER(ORDER BY order_date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 0) AS ma_7,
  SUM(order_count) OVER(ORDER BY order_date 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS rolling_sum_3
FROM daily_orders
ORDER BY order_date;`,
    ],
    pandasSolutions: [
      `df['order_date'] = pd.to_datetime(df['order_date'])
df = df.sort_values('order_date')

df['ma_3'] = df['order_count'].rolling(window=3, min_periods=1).mean().round(0).astype(int)
df['ma_7'] = df['order_count'].rolling(window=7, min_periods=1).mean().round(0).astype(int)
df['rolling_sum_3'] = df['order_count'].rolling(window=3, min_periods=1).sum().astype(int)

result = df[['order_date', 'order_count', 'ma_3', 'ma_7', 'rolling_sum_3']]`,
    ],
    explanation: "ROWS BETWEEN定义滑动窗口。2 PRECEDING表示当前行和前2行共3行。移动平均用于平滑波动，识别趋势。",
  },
  {
    id: "sql-win-15",
    title: "【窗口函数】首次与末次值提取",
    category: "window",
    difficulty: 3,
    keywords: ["FIRST_VALUE", "LAST_VALUE", "RANGE BETWEEN"],
    tables: `user_actions(user_id INT, action_date DATE, action_type VARCHAR)`,
    sampleData: `| user_id | action_date | action_type |
|---------|-------------|-------------|
| 1       | 2024-01-01  | login       |
| 1       | 2024-01-05  | purchase    |
| 1       | 2024-01-10  | logout      |
| 2       | 2024-01-02  | login       |
| 2       | 2024-01-08  | purchase    |
| 3       | 2024-01-03  | login       |`,
    expectedOutput: `| user_id | action_date | action_type | first_action | last_action | days_since_first |
|---------|-------------|-------------|--------------|-------------|------------------|
| 1       | 2024-01-01  | login       | login        | logout      | 0                |
| 1       | 2024-01-05  | purchase    | login        | logout      | 4                |
| 1       | 2024-01-10  | logout      | login        | logout      | 9                |
| 2       | 2024-01-02  | login       | login        | purchase    | 0                |
| 2       | 2024-01-08  | purchase    | login        | purchase    | 6                |
| 3       | 2024-01-03  | login       | login        | login       | 0                |

说明：每个用户的首次和末次操作，以及距首次操作的天数`,
    description: "提取每个用户的首次和末次操作",
    sqlSolutions: [
      `SELECT 
  user_id,
  action_date,
  action_type,
  FIRST_VALUE(action_type) OVER(PARTITION BY user_id ORDER BY action_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS first_action,
  LAST_VALUE(action_type) OVER(PARTITION BY user_id ORDER BY action_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_action,
  DATEDIFF(action_date, 
    FIRST_VALUE(action_date) OVER(PARTITION BY user_id ORDER BY action_date)) AS days_since_first
FROM user_actions
ORDER BY user_id, action_date;`,
    ],
    pandasSolutions: [
      `df['action_date'] = pd.to_datetime(df['action_date'])
df = df.sort_values(['user_id', 'action_date'])

df['first_action'] = df.groupby('user_id')['action_type'].transform('first')
df['last_action'] = df.groupby('user_id')['action_type'].transform('last')
df['first_date'] = df.groupby('user_id')['action_date'].transform('first')
df['days_since_first'] = (df['action_date'] - df['first_date']).dt.days

result = df[['user_id', 'action_date', 'action_type', 'first_action', 'last_action', 'days_since_first']]`,
    ],
    explanation: "FIRST_VALUE和LAST_VALUE提取窗口内首尾值。UNBOUNDED FOLLOWING确保取到最后一行，用于分析用户行为路径。",
  },
  {
    id: "sql-win-16",
    title: "【窗口函数】中位数与百分位数",
    category: "window",
    difficulty: 4,
    keywords: ["PERCENTILE_CONT", "NTILE", "中位数"],
    tables: `salaries(emp_id INT, department VARCHAR, salary DECIMAL)`,
    sampleData: `| emp_id | department | salary |
|--------|------------|--------|
| 1      | IT         | 80000  |
| 2      | IT         | 85000  |
| 3      | IT         | 90000  |
| 4      | IT         | 95000  |
| 5      | Sales      | 60000  |
| 6      | Sales      | 65000  |
| 7      | Sales      | 70000  |
| 8      | Sales      | 75000  |`,
    expectedOutput: `| department | emp_count | median_salary | p25_salary | p75_salary | quartile_group |
|------------|-----------|---------------|------------|------------|----------------|
| IT         | 4         | 87500         | 82500      | 92500      | 各员工分组1-4  |
| Sales      | 4         | 67500         | 62500      | 72500      | 各员工分组1-4  |

说明：中位数P50、第一四分位数P25、第三四分位数P75`,
    description: "计算各部门薪资的中位数和四分位数",
    sqlSolutions: [
      `-- MySQL 8.0+ / PostgreSQL
WITH dept_stats AS (
  SELECT 
    department,
    COUNT(*) AS emp_count,
    PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY salary) AS median_salary,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY salary) AS p25_salary,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY salary) AS p75_salary
  FROM salaries
  GROUP BY department
),
quartiles AS (
  SELECT 
    emp_id, department, salary,
    NTILE(4) OVER(PARTITION BY department ORDER BY salary) AS quartile_group
  FROM salaries
)
SELECT 
  s.department,
  s.emp_count,
  s.median_salary,
  s.p25_salary,
  s.p75_salary
FROM dept_stats s
ORDER BY s.department;`,
      `-- MySQL兼容方案（使用AVG模拟）
WITH ranked AS (
  SELECT 
    department, salary,
    ROW_NUMBER() OVER(PARTITION BY department ORDER BY salary) AS rn,
    COUNT(*) OVER(PARTITION BY department) AS cnt
  FROM salaries
)
SELECT 
  department,
  cnt AS emp_count,
  AVG(CASE WHEN rn IN (FLOOR((cnt+1)/2.0), CEIL((cnt+1)/2.0)) THEN salary END) AS median_salary,
  AVG(CASE WHEN rn IN (FLOOR((cnt+1)/4.0), CEIL((cnt+1)/4.0)) THEN salary END) AS p25_salary,
  AVG(CASE WHEN rn IN (FLOOR(3*(cnt+1)/4.0), CEIL(3*(cnt+1)/4.0)) THEN salary END) AS p75_salary
FROM ranked
GROUP BY department, cnt
ORDER BY department;`,
    ],
    pandasSolutions: [
      `result = df.groupby('department').agg(
    emp_count=('emp_id', 'count'),
    median_salary=('salary', lambda x: x.quantile(0.50)),
    p25_salary=('salary', lambda x: x.quantile(0.25)),
    p75_salary=('salary', lambda x: x.quantile(0.75))
).reset_index()

# 添加四分位分组
df['quartile_group'] = df.groupby('department')['salary'].transform(
    lambda x: pd.qcut(x, 4, labels=['Q1', 'Q2', 'Q3', 'Q4'], duplicates='drop')
)`,
    ],
    explanation: "PERCENTILE_CONT计算百分位数。NTILE(4)将数据分为4组。中位数P50是中间值，P25和P75用于箱线图分析。",
  },
  {
    id: "sql-win-17",
    title: "【窗口函数】连续登录天数统计",
    category: "window",
    difficulty: 4,
    keywords: ["LAG", "连续性", "分组标记", "ROW_NUMBER"],
    tables: `user_logins(user_id INT, login_date DATE)`,
    sampleData: `| user_id | login_date |
|---------|------------|
| 1       | 2024-01-01 |
| 1       | 2024-01-02 |
| 1       | 2024-01-03 |
| 1       | 2024-01-05 |
| 1       | 2024-01-06 |
| 2       | 2024-01-01 |
| 2       | 2024-01-03 |
| 2       | 2024-01-04 |`,
    expectedOutput: `| user_id | streak_start | streak_end | consecutive_days |
|---------|--------------|------------|------------------|
| 1       | 2024-01-01   | 2024-01-03 | 3                |
| 1       | 2024-01-05   | 2024-01-06 | 2                |
| 2       | 2024-01-01   | 2024-01-01 | 1                |
| 2       | 2024-01-03   | 2024-01-04 | 2                |

说明：识别每个用户的连续登录区间`,
    description: "计算用户的连续登录天数",
    sqlSolutions: [
      `WITH date_diff AS (
  SELECT 
    user_id, login_date,
    ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) AS rn,
    DATE_SUB(login_date, INTERVAL 
      ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) DAY) AS grp
  FROM user_logins
),
streaks AS (
  SELECT 
    user_id,
    MIN(login_date) AS streak_start,
    MAX(login_date) AS streak_end,
    COUNT(*) AS consecutive_days
  FROM date_diff
  GROUP BY user_id, grp
)
SELECT * FROM streaks
ORDER BY user_id, streak_start;`,
    ],
    pandasSolutions: [
      `df['login_date'] = pd.to_datetime(df['login_date'])
df = df.sort_values(['user_id', 'login_date'])

# 日期减去行号，连续日期会得到相同的组标识
df['rn'] = df.groupby('user_id').cumcount()
df['grp'] = df['login_date'] - pd.to_timedelta(df['rn'], unit='D')

# 按组统计
result = df.groupby(['user_id', 'grp']).agg(
    streak_start=('login_date', 'min'),
    streak_end=('login_date', 'max'),
    consecutive_days=('login_date', 'count')
).reset_index(drop=True).sort_values(['user_id', 'streak_start'])

result = result[['user_id', 'streak_start', 'streak_end', 'consecutive_days']]`,
    ],
    explanation: "连续性经典算法：日期-行号=分组键。连续日期减去递增行号得到相同值，用于识别连续区间。",
  },
  {
    id: "sql-win-18",
    title: "【窗口函数】产品价格变化追踪",
    category: "window",
    difficulty: 3,
    keywords: ["LAG", "LEAD", "价格变化", "涨跌幅"],
    tables: `price_history(product_id INT, price DECIMAL, effective_date DATE)`,
    sampleData: `| product_id | price | effective_date |
|------------|-------|----------------|
| 1          | 100   | 2024-01-01     |
| 1          | 105   | 2024-01-15     |
| 1          | 110   | 2024-02-01     |
| 1          | 108   | 2024-02-15     |
| 2          | 200   | 2024-01-01     |
| 2          | 220   | 2024-01-20     |`,
    expectedOutput: `| product_id | effective_date | price | prev_price | next_price | change_amt | change_pct |
|------------|----------------|-------|------------|------------|------------|------------|
| 1          | 2024-01-01     | 100   | NULL       | 105        | NULL       | NULL       |
| 1          | 2024-01-15     | 105   | 100        | 110        | 5          | 5.0%       |
| 1          | 2024-02-01     | 110   | 105        | 108        | 5          | 4.8%       |
| 1          | 2024-02-15     | 108   | 110        | NULL       | -2         | -1.8%      |
| 2          | 2024-01-01     | 200   | NULL       | 220        | NULL       | NULL       |
| 2          | 2024-01-20     | 220   | 200        | NULL       | 20         | 10.0%      |

说明：追踪价格变化，计算涨跌幅度`,
    description: "追踪产品价格的历史变化",
    sqlSolutions: [
      `SELECT 
  product_id,
  effective_date,
  price,
  LAG(price) OVER(PARTITION BY product_id ORDER BY effective_date) AS prev_price,
  LEAD(price) OVER(PARTITION BY product_id ORDER BY effective_date) AS next_price,
  price - LAG(price) OVER(PARTITION BY product_id ORDER BY effective_date) AS change_amt,
  CASE 
    WHEN LAG(price) OVER(PARTITION BY product_id ORDER BY effective_date) IS NULL THEN NULL
    ELSE CONCAT(ROUND(100.0 * (price - LAG(price) OVER(PARTITION BY product_id ORDER BY effective_date)) / 
         LAG(price) OVER(PARTITION BY product_id ORDER BY effective_date), 1), '%')
  END AS change_pct
FROM price_history
ORDER BY product_id, effective_date;`,
    ],
    pandasSolutions: [
      `df['effective_date'] = pd.to_datetime(df['effective_date'])
df = df.sort_values(['product_id', 'effective_date'])

df['prev_price'] = df.groupby('product_id')['price'].shift(1)
df['next_price'] = df.groupby('product_id')['price'].shift(-1)
df['change_amt'] = df['price'] - df['prev_price']
df['change_pct'] = (100 * df['change_amt'] / df['prev_price']).round(1)
df['change_pct'] = df['change_pct'].apply(lambda x: f"{x}%" if pd.notna(x) else None)

result = df[['product_id', 'effective_date', 'price', 'prev_price', 'next_price', 'change_amt', 'change_pct']]`,
    ],
    explanation: "LAG取前值，LEAD取后值。用于价格监控、趋势分析。产品1在2月15日价格下调2元（-1.8%）。",
  },
  {
    id: "sql-win-19",
    title: "【窗口函数】库存周转率分析",
    category: "window",
    difficulty: 4,
    keywords: ["AVG OVER", "滚动平均", "周转率"],
    tables: `inventory(product_id INT, date DATE, stock_qty INT, sales_qty INT)`,
    sampleData: `| product_id | date       | stock_qty | sales_qty |
|------------|------------|-----------|-----------|
| 1          | 2024-01-01 | 1000      | 100       |
| 1          | 2024-01-02 | 900       | 120       |
| 1          | 2024-01-03 | 780       | 80        |
| 1          | 2024-01-04 | 700       | 150       |
| 1          | 2024-01-05 | 550       | 100       |
| 1          | 2024-01-06 | 450       | 90        |
| 1          | 2024-01-07 | 360       | 110       |`,
    expectedOutput: `| product_id | date       | stock_qty | sales_qty | avg_stock_7d | avg_sales_7d | turnover_days |
|------------|------------|-----------|-----------|--------------|--------------|---------------|
| 1          | 2024-01-01 | 1000      | 100       | 1000         | 100          | 10.0          |
| 1          | 2024-01-02 | 900       | 120       | 950          | 110          | 8.6           |
| 1          | 2024-01-03 | 780       | 80        | 893          | 100          | 8.9           |
| 1          | 2024-01-04 | 700       | 150       | 845          | 113          | 7.5           |
| 1          | 2024-01-05 | 550       | 100       | 786          | 110          | 7.1           |
| 1          | 2024-01-06 | 450       | 90        | 730          | 107          | 6.8           |
| 1          | 2024-01-07 | 360       | 110       | 677          | 107          | 6.3           |

说明：周转天数=平均库存/平均日销量，越低越好`,
    description: "计算产品库存周转天数",
    sqlSolutions: [
      `SELECT 
  product_id,
  date,
  stock_qty,
  sales_qty,
  ROUND(AVG(stock_qty) OVER(PARTITION BY product_id ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 0) AS avg_stock_7d,
  ROUND(AVG(sales_qty) OVER(PARTITION BY product_id ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 0) AS avg_sales_7d,
  ROUND(AVG(stock_qty) OVER(PARTITION BY product_id ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) / 
    NULLIF(AVG(sales_qty) OVER(PARTITION BY product_id ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 0), 1) AS turnover_days
FROM inventory
ORDER BY product_id, date;`,
    ],
    pandasSolutions: [
      `df['date'] = pd.to_datetime(df['date'])
df = df.sort_values(['product_id', 'date'])

df['avg_stock_7d'] = df.groupby('product_id')['stock_qty'].transform(
    lambda x: x.rolling(window=7, min_periods=1).mean().round(0)
)
df['avg_sales_7d'] = df.groupby('product_id')['sales_qty'].transform(
    lambda x: x.rolling(window=7, min_periods=1).mean().round(0)
)
df['turnover_days'] = (df['avg_stock_7d'] / df['avg_sales_7d']).round(1)

result = df[['product_id', 'date', 'stock_qty', 'sales_qty', 'avg_stock_7d', 'avg_sales_7d', 'turnover_days']]`,
    ],
    explanation: "库存周转天数=平均库存/日均销量。7日滚动平均平滑波动。周转天数从10降至6.3，说明库存效率提升。",
  },
  {
    id: "sql-win-20",
    title: "【窗口函数】客户生命周期价值(LTV)",
    category: "window",
    difficulty: 4,
    keywords: ["累计求和", "首次购买", "复购分析"],
    tables: `customer_orders(customer_id INT, order_date DATE, order_amount DECIMAL)`,
    sampleData: `| customer_id | order_date | order_amount |
|-------------|------------|--------------|
| 1           | 2024-01-01 | 100          |
| 1           | 2024-01-15 | 150          |
| 1           | 2024-02-01 | 200          |
| 2           | 2024-01-10 | 80           |
| 2           | 2024-01-20 | 120          |
| 3           | 2024-01-05 | 200          |`,
    expectedOutput: `| customer_id | order_date | order_amount | order_number | cumulative_value | days_since_first | avg_order_value |
|-------------|------------|--------------|--------------|------------------|------------------|-----------------|
| 1           | 2024-01-01 | 100          | 1            | 100              | 0                | 100             |
| 1           | 2024-01-15 | 150          | 2            | 250              | 14               | 125             |
| 1           | 2024-02-01 | 200          | 3            | 450              | 31               | 150             |
| 2           | 2024-01-10 | 80           | 1            | 80               | 0                | 80              |
| 2           | 2024-01-20 | 120          | 2            | 200              | 10               | 100             |
| 3           | 2024-01-05 | 200          | 1            | 200              | 0                | 200             |

说明：客户1累计贡献450元，平均订单价值150元`,
    description: "计算客户的累计消费和生命周期价值",
    sqlSolutions: [
      `SELECT 
  customer_id,
  order_date,
  order_amount,
  ROW_NUMBER() OVER(PARTITION BY customer_id ORDER BY order_date) AS order_number,
  SUM(order_amount) OVER(PARTITION BY customer_id ORDER BY order_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_value,
  DATEDIFF(order_date, 
    FIRST_VALUE(order_date) OVER(PARTITION BY customer_id ORDER BY order_date)) AS days_since_first,
  ROUND(AVG(order_amount) OVER(PARTITION BY customer_id ORDER BY order_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 0) AS avg_order_value
FROM customer_orders
ORDER BY customer_id, order_date;`,
    ],
    pandasSolutions: [
      `df['order_date'] = pd.to_datetime(df['order_date'])
df = df.sort_values(['customer_id', 'order_date'])

df['order_number'] = df.groupby('customer_id').cumcount() + 1
df['cumulative_value'] = df.groupby('customer_id')['order_amount'].cumsum()
df['first_order_date'] = df.groupby('customer_id')['order_date'].transform('first')
df['days_since_first'] = (df['order_date'] - df['first_order_date']).dt.days
df['avg_order_value'] = df.groupby('customer_id')['order_amount'].expanding().mean().round(0).values

result = df[['customer_id', 'order_date', 'order_amount', 'order_number', 'cumulative_value', 'days_since_first', 'avg_order_value']]`,
    ],
    explanation: "LTV分析核心指标。累计消费反映客户价值，平均订单价值衡量客单价。客户1在31天内完成3单，LTV达450元。",
  },
  {
    id: "sql-win-21",
    title: "【窗口函数】会话时长与间隔分析",
    category: "window",
    difficulty: 4,
    keywords: ["LEAD", "时间差", "会话分析"],
    tables: `user_events(user_id INT, event_time DATETIME, event_type VARCHAR)`,
    sampleData: `| user_id | event_time          | event_type |
|---------|---------------------|------------|
| 1       | 2024-01-01 10:00:00 | page_view  |
| 1       | 2024-01-01 10:05:00 | click      |
| 1       | 2024-01-01 10:10:00 | page_view  |
| 1       | 2024-01-01 10:35:00 | page_view  |
| 2       | 2024-01-01 11:00:00 | page_view  |
| 2       | 2024-01-01 11:03:00 | click      |`,
    expectedOutput: `| user_id | event_time          | event_type | next_event_time     | gap_minutes | session_id |
|---------|---------------------|------------|---------------------|-------------|------------|
| 1       | 2024-01-01 10:00:00 | page_view  | 2024-01-01 10:05:00 | 5           | 1          |
| 1       | 2024-01-01 10:05:00 | click      | 2024-01-01 10:10:00 | 5           | 1          |
| 1       | 2024-01-01 10:10:00 | page_view  | 2024-01-01 10:35:00 | 25          | 1          |
| 1       | 2024-01-01 10:35:00 | page_view  | NULL                | NULL        | 2          |
| 2       | 2024-01-01 11:00:00 | page_view  | 2024-01-01 11:03:00 | 3           | 1          |
| 2       | 2024-01-01 11:03:00 | click      | NULL                | NULL        | 1          |

说明：超过15分钟视为新会话，用户1有2个会话`,
    description: "识别用户会话并计算事件间隔",
    sqlSolutions: [
      `WITH gaps AS (
  SELECT 
    user_id, event_time, event_type,
    LEAD(event_time) OVER(PARTITION BY user_id ORDER BY event_time) AS next_event_time,
    TIMESTAMPDIFF(MINUTE, event_time, 
      LEAD(event_time) OVER(PARTITION BY user_id ORDER BY event_time)) AS gap_minutes,
    CASE 
      WHEN TIMESTAMPDIFF(MINUTE, event_time, 
           LEAD(event_time) OVER(PARTITION BY user_id ORDER BY event_time)) > 15 
           OR LEAD(event_time) OVER(PARTITION BY user_id ORDER BY event_time) IS NULL 
      THEN 1 ELSE 0 
    END AS is_session_end
  FROM user_events
),
sessions AS (
  SELECT 
    *,
    SUM(is_session_end) OVER(PARTITION BY user_id ORDER BY event_time 
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) + 1 AS session_id
  FROM gaps
)
SELECT user_id, event_time, event_type, next_event_time, gap_minutes, session_id
FROM sessions
ORDER BY user_id, event_time;`,
    ],
    pandasSolutions: [
      `df['event_time'] = pd.to_datetime(df['event_time'])
df = df.sort_values(['user_id', 'event_time'])

df['next_event_time'] = df.groupby('user_id')['event_time'].shift(-1)
df['gap_minutes'] = (df['next_event_time'] - df['event_time']).dt.total_seconds() / 60
df['is_session_end'] = ((df['gap_minutes'] > 15) | (df['gap_minutes'].isna())).astype(int)
df['session_id'] = df.groupby('user_id')['is_session_end'].cumsum() + 1

result = df[['user_id', 'event_time', 'event_type', 'next_event_time', 'gap_minutes', 'session_id']]`,
    ],
    explanation: "会话化（Sessionization）。间隔超过15分钟视为新会话。累计标记生成session_id。用于用户行为路径分析。",
  },
  {
    id: "sql-win-22",
    title: "【窗口函数】波峰波谷检测",
    category: "window",
    difficulty: 5,
    keywords: ["LAG", "LEAD", "峰值检测", "拐点"],
    tables: `stock_prices(trade_date DATE, close_price DECIMAL)`,
    sampleData: `| trade_date | close_price |
|------------|-------------|
| 2024-01-01 | 100         |
| 2024-01-02 | 105         |
| 2024-01-03 | 110         |
| 2024-01-04 | 108         |
| 2024-01-05 | 103         |
| 2024-01-06 | 105         |
| 2024-01-07 | 102         |`,
    expectedOutput: `| trade_date | close_price | prev_price | next_price | point_type |
|------------|-------------|------------|------------|------------|
| 2024-01-01 | 100         | NULL       | 105        | -          |
| 2024-01-02 | 105         | 100        | 110        | -          |
| 2024-01-03 | 110         | 105        | 108        | 波峰       |
| 2024-01-04 | 108         | 110        | 103        | -          |
| 2024-01-05 | 103         | 108        | 105        | 波谷       |
| 2024-01-06 | 105         | 103        | 102        | 波峰       |
| 2024-01-07 | 102         | 105        | NULL       | -          |

说明：波峰=比前后都高，波谷=比前后都低`,
    description: "检测股价的波峰和波谷",
    sqlSolutions: [
      `WITH price_window AS (
  SELECT 
    trade_date,
    close_price,
    LAG(close_price) OVER(ORDER BY trade_date) AS prev_price,
    LEAD(close_price) OVER(ORDER BY trade_date) AS next_price
  FROM stock_prices
)
SELECT 
  trade_date,
  close_price,
  prev_price,
  next_price,
  CASE 
    WHEN prev_price IS NOT NULL AND next_price IS NOT NULL THEN
      CASE 
        WHEN close_price > prev_price AND close_price > next_price THEN '波峰'
        WHEN close_price < prev_price AND close_price < next_price THEN '波谷'
        ELSE '-'
      END
    ELSE '-'
  END AS point_type
FROM price_window
ORDER BY trade_date;`,
    ],
    pandasSolutions: [
      `df['trade_date'] = pd.to_datetime(df['trade_date'])
df = df.sort_values('trade_date')

df['prev_price'] = df['close_price'].shift(1)
df['next_price'] = df['close_price'].shift(-1)

def detect_point(row):
    if pd.isna(row['prev_price']) or pd.isna(row['next_price']):
        return '-'
    if row['close_price'] > row['prev_price'] and row['close_price'] > row['next_price']:
        return '波峰'
    if row['close_price'] < row['prev_price'] and row['close_price'] < row['next_price']:
        return '波谷'
    return '-'

df['point_type'] = df.apply(detect_point, axis=1)
result = df[['trade_date', 'close_price', 'prev_price', 'next_price', 'point_type']]`,
    ],
    explanation: "拐点检测算法。波峰=价格>前值且>后值，波谷相反。用于技术分析、趋势反转识别。",
  },
  {
    id: "sql-win-23",
    title: "【窗口函数】分组累计占比(帕累托分析)",
    category: "window",
    difficulty: 3,
    keywords: ["累计占比", "二八法则", "ABC分类"],
    tables: `product_sales(product_id INT, product_name VARCHAR, sales_amount DECIMAL)`,
    sampleData: `| product_id | product_name | sales_amount |
|------------|--------------|--------------|
| 1          | Product A    | 50000        |
| 2          | Product B    | 30000        |
| 3          | Product C    | 20000        |
| 4          | Product D    | 15000        |
| 5          | Product E    | 10000        |
| 6          | Product F    | 8000         |
| 7          | Product G    | 5000         |
| 8          | Product H    | 2000         |`,
    expectedOutput: `| product_name | sales_amount | cum_sales | cum_pct | abc_class |
|--------------|--------------|-----------|---------|-----------|
| Product A    | 50000        | 50000     | 35.7%   | A         |
| Product B    | 30000        | 80000     | 57.1%   | A         |
| Product C    | 20000        | 100000    | 71.4%   | A         |
| Product D    | 15000        | 115000    | 82.1%   | B         |
| Product E    | 10000        | 125000    | 89.3%   | B         |
| Product F    | 8000         | 133000    | 95.0%   | C         |
| Product G    | 5000         | 138000    | 98.6%   | C         |
| Product H    | 2000         | 140000    | 100.0%  | C         |

说明：A类（累计≤80%）占3个产品贡献71.4%销售额`,
    description: "进行ABC分类分析（帕累托分析）",
    sqlSolutions: [
      `WITH cumulative AS (
  SELECT 
    product_name,
    sales_amount,
    SUM(sales_amount) OVER(ORDER BY sales_amount DESC 
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cum_sales,
    SUM(sales_amount) OVER() AS total_sales
  FROM product_sales
),
with_pct AS (
  SELECT 
    product_name,
    sales_amount,
    cum_sales,
    ROUND(100.0 * cum_sales / total_sales, 1) AS cum_pct
  FROM cumulative
)
SELECT 
  product_name,
  sales_amount,
  cum_sales,
  CONCAT(cum_pct, '%') AS cum_pct,
  CASE 
    WHEN cum_pct <= 80 THEN 'A'
    WHEN cum_pct <= 95 THEN 'B'
    ELSE 'C'
  END AS abc_class
FROM with_pct
ORDER BY sales_amount DESC;`,
    ],
    pandasSolutions: [
      `df = df.sort_values('sales_amount', ascending=False).reset_index(drop=True)
df['cum_sales'] = df['sales_amount'].cumsum()
df['total_sales'] = df['sales_amount'].sum()
df['cum_pct'] = (100 * df['cum_sales'] / df['total_sales']).round(1)

def classify_abc(pct):
    if pct <= 80:
        return 'A'
    elif pct <= 95:
        return 'B'
    return 'C'

df['abc_class'] = df['cum_pct'].apply(classify_abc)
df['cum_pct'] = df['cum_pct'].astype(str) + '%'

result = df[['product_name', 'sales_amount', 'cum_sales', 'cum_pct', 'abc_class']]`,
    ],
    explanation: "帕累托（二八法则）ABC分类。A类（累计80%）为核心产品，B类（80-95%）为重要产品，C类（>95%）为长尾产品。",
  },
  {
    id: "sql-win-24",
    title: "【窗口函数】同比环比综合分析",
    category: "window",
    difficulty: 4,
    keywords: ["LAG", "多周期对比", "增长分析"],
    tables: `monthly_metrics(year INT, month INT, revenue DECIMAL, orders INT)`,
    sampleData: `| year | month | revenue | orders |
|------|-------|---------|--------|
| 2023 | 1     | 100000  | 1000   |
| 2023 | 2     | 105000  | 1050   |
| 2023 | 3     | 110000  | 1100   |
| 2024 | 1     | 120000  | 1200   |
| 2024 | 2     | 130000  | 1300   |
| 2024 | 3     | 135000  | 1350   |`,
    expectedOutput: `| year_month | revenue | orders | mom_rev | yoy_rev | mom_orders | yoy_orders |
|------------|---------|--------|---------|---------|------------|------------|
| 2023-01    | 100000  | 1000   | -       | -       | -          | -          |
| 2023-02    | 105000  | 1050   | 5.0%    | -       | 5.0%       | -          |
| 2023-03    | 110000  | 1100   | 4.8%    | -       | 4.8%       | -          |
| 2024-01    | 120000  | 1200   | 9.1%    | 20.0%   | 9.1%       | 20.0%      |
| 2024-02    | 130000  | 1300   | 8.3%    | 23.8%   | 8.3%       | 23.8%      |
| 2024-03    | 135000  | 1350   | 3.8%    | 22.7%   | 3.8%       | 22.7%      |

说明：2024-01月收入环比增长9.1%，同比增长20.0%`,
    description: "计算收入和订单的环比、同比增长",
    sqlSolutions: [
      `WITH ordered AS (
  SELECT 
    CONCAT(year, '-', LPAD(month, 2, '0')) AS year_month,
    revenue, orders,
    LAG(revenue, 1) OVER(ORDER BY year, month) AS prev_month_rev,
    LAG(revenue, 12) OVER(ORDER BY year, month) AS prev_year_rev,
    LAG(orders, 1) OVER(ORDER BY year, month) AS prev_month_orders,
    LAG(orders, 12) OVER(ORDER BY year, month) AS prev_year_orders
  FROM monthly_metrics
)
SELECT 
  year_month, revenue, orders,
  CASE 
    WHEN prev_month_rev IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (revenue - prev_month_rev) / prev_month_rev, 1), '%')
  END AS mom_rev,
  CASE 
    WHEN prev_year_rev IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (revenue - prev_year_rev) / prev_year_rev, 1), '%')
  END AS yoy_rev,
  CASE 
    WHEN prev_month_orders IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (orders - prev_month_orders) / prev_month_orders, 1), '%')
  END AS mom_orders,
  CASE 
    WHEN prev_year_orders IS NULL THEN '-'
    ELSE CONCAT(ROUND(100.0 * (orders - prev_year_orders) / prev_year_orders, 1), '%')
  END AS yoy_orders
FROM ordered
ORDER BY year_month;`,
    ],
    pandasSolutions: [
      `df = df.sort_values(['year', 'month'])
df['year_month'] = df['year'].astype(str) + '-' + df['month'].astype(str).str.zfill(2)

df['mom_rev'] = (100 * (df['revenue'] - df['revenue'].shift(1)) / df['revenue'].shift(1)).round(1)
df['yoy_rev'] = (100 * (df['revenue'] - df['revenue'].shift(12)) / df['revenue'].shift(12)).round(1)
df['mom_orders'] = (100 * (df['orders'] - df['orders'].shift(1)) / df['orders'].shift(1)).round(1)
df['yoy_orders'] = (100 * (df['orders'] - df['orders'].shift(12)) / df['orders'].shift(12)).round(1)

for col in ['mom_rev', 'yoy_rev', 'mom_orders', 'yoy_orders']:
    df[col] = df[col].apply(lambda x: f"{x}%" if pd.notna(x) else '-')

result = df[['year_month', 'revenue', 'orders', 'mom_rev', 'yoy_rev', 'mom_orders', 'yoy_orders']]`,
    ],
    explanation: "多指标多周期对比。环比看短期趋势，同比看长期增长。2024年1月同比增长20%，说明业务稳健增长。",
  },
  {
    id: "sql-win-25",
    title: "【窗口函数】最长连续趋势识别",
    category: "window",
    difficulty: 5,
    keywords: ["连续性", "趋势识别", "累计标记"],
    tables: `daily_kpi(date DATE, kpi_value DECIMAL)`,
    sampleData: `| date       | kpi_value |
|------------|-----------|
| 2024-01-01 | 100       |
| 2024-01-02 | 105       |
| 2024-01-03 | 110       |
| 2024-01-04 | 108       |
| 2024-01-05 | 112       |
| 2024-01-06 | 115       |
| 2024-01-07 | 120       |
| 2024-01-08 | 118       |`,
    expectedOutput: `| trend_type | start_date | end_date   | days | start_value | end_value | total_change |
|------------|------------|------------|------|-------------|-----------|--------------|
| 上升       | 2024-01-01 | 2024-01-03 | 3    | 100         | 110       | 10           |
| 上升       | 2024-01-04 | 2024-01-07 | 4    | 108         | 120       | 12           |

说明：最长上升趋势为1月4日-7日，持续4天，增长12`,
    description: "识别KPI的最长连续上升和下降趋势",
    sqlSolutions: [
      `WITH trends AS (
  SELECT 
    date, kpi_value,
    LAG(kpi_value) OVER(ORDER BY date) AS prev_value,
    CASE 
      WHEN kpi_value > LAG(kpi_value) OVER(ORDER BY date) THEN 'up'
      WHEN kpi_value < LAG(kpi_value) OVER(ORDER BY date) THEN 'down'
      ELSE 'flat'
    END AS trend
  FROM daily_kpi
),
grouped AS (
  SELECT 
    date, kpi_value, trend,
    SUM(CASE WHEN trend != LAG(trend, 1, trend) OVER(ORDER BY date) THEN 1 ELSE 0 END) 
      OVER(ORDER BY date) AS grp
  FROM trends
  WHERE trend IN ('up', 'down')
),
trend_periods AS (
  SELECT 
    CASE WHEN trend = 'up' THEN '上升' ELSE '下降' END AS trend_type,
    MIN(date) AS start_date,
    MAX(date) AS end_date,
    COUNT(*) AS days,
    FIRST_VALUE(kpi_value) OVER(PARTITION BY grp ORDER BY date) AS start_value,
    LAST_VALUE(kpi_value) OVER(PARTITION BY grp ORDER BY date 
      ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS end_value
  FROM grouped
  GROUP BY trend, grp
)
SELECT 
  trend_type, start_date, end_date, days, start_value, end_value,
  end_value - start_value AS total_change
FROM trend_periods
WHERE trend_type = '上升'
ORDER BY days DESC
LIMIT 1;`,
    ],
    pandasSolutions: [
      `df['date'] = pd.to_datetime(df['date'])
df = df.sort_values('date')

df['prev_value'] = df['kpi_value'].shift(1)
df['trend'] = df.apply(lambda r: 'up' if r['kpi_value'] > r['prev_value'] 
                       else ('down' if r['kpi_value'] < r['prev_value'] else 'flat'), axis=1)

# 标记趋势变化
df['trend_change'] = (df['trend'] != df['trend'].shift(1)).astype(int)
df['grp'] = df['trend_change'].cumsum()

# 过滤并统计
trends_df = df[df['trend'].isin(['up', 'down'])].copy()
result = trends_df.groupby(['trend', 'grp']).agg(
    start_date=('date', 'min'),
    end_date=('date', 'max'),
    days=('date', 'count'),
    start_value=('kpi_value', 'first'),
    end_value=('kpi_value', 'last')
).reset_index()

result['trend_type'] = result['trend'].map({'up': '上升', 'down': '下降'})
result['total_change'] = result['end_value'] - result['start_value']
result = result[result['trend_type'] == '上升'].nlargest(1, 'days')[
    ['trend_type', 'start_date', 'end_date', 'days', 'start_value', 'end_value', 'total_change']
]`,
    ],
    explanation: "连续趋势识别。标记上升/下降，遇到反转累加分组标记。最长上升趋势4天增长12，用于趋势强度评估。",
  },
]

function Difficulty({ level }: { level: Problem["difficulty"] }) {
  return (
    <div className="flex items-center gap-1" aria-label="difficulty">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < level ? "text-teal-500 text-lg" : "text-gray-300 text-lg"}>★</span>
      ))}
    </div>
  )
}

export default function QuizPage() {
  const { theme } = useTheme()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [solutionMode, setSolutionMode] = useState<Record<string, "sql" | "pandas">>({})

  const filtered = useMemo(() => {
    if (activeCategory === "all") return problems
    return problems.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const totalByCat = useMemo(() => {
    const base: Record<CategoryKey, number> = { all: problems.length, window: 0, basic: 0, business: 0, interview: 0 }
    problems.forEach(p => { base[p.category] += 1 })
    return base
  }, [])

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <Navigation />

      {/* 顶部区块：蓝绿主题介绍 */}
      <section className="py-10" style={{
        background: 'linear-gradient(90deg, rgba(20,184,166,0.12) 0%, rgba(6,182,212,0.12) 50%, rgba(59,130,246,0.10) 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={theme === 'dark' ? 'bg-gray-800 border border-gray-700 rounded-2xl p-6' : 'bg-white border border-gray-200 rounded-2xl p-6'}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                <Database className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
              </div>
              <h1 className={theme === 'dark' ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-900'}>
                SQL / Pandas 静态题库
              </h1>
              <Badge className="bg-teal-600 text-white text-sm">{problems.length} 题精选</Badge>
            </div>
            <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              每题包含：完整表结构 · 示例数据 · 预期输出 · SQL/Pandas双解法 · 详细讲解
            </CardDescription>
          </div>
        </div>
      </section>

      {/* 分类切换 */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {([
              { key: "all", label: `全部(${totalByCat.all})`, icon: Database },
              ...categoryMeta.map(m => ({ key: m.key, label: `${m.label}(${totalByCat[m.key]})`, icon: m.icon }))
            ] as { key: CategoryKey; label: string; icon: any }[]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={[
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                  activeCategory === key
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-transparent shadow-lg'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-200 border-gray-700 hover:border-teal-500 hover:shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400 hover:shadow-md'
                ].join(' ')}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 列表区 */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：说明卡片 */}
          <div className="lg:col-span-1 space-y-4">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700 sticky top-4' : 'bg-white border-gray-200 sticky top-4'}>
              <CardHeader>
                <CardTitle className={theme === 'dark' ? 'text-white flex items-center gap-2' : 'text-gray-900 flex items-center gap-2'}>
                  <FileCode className="h-5 w-5 text-teal-600" />
                  题目特色
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-teal-600">✓</span> 完整表结构定义
                  </p>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-teal-600">✓</span> 示例数据 + 预期输出
                  </p>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-teal-600">✓</span> SQL + Pandas 双解法
                  </p>
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-teal-600">✓</span> 多种实现思路对比
                  </p>
                  <p className="font-semibold flex items-center gap-2">
                    <span className="text-teal-600">✓</span> 详细原理 + 案例讲解
                  </p>
                </div>
                <div className="pt-3 border-t" style={{borderColor: theme==='dark'?'#374151':'#e5e7eb'}}>
                  <p className={theme==='dark'?'text-gray-400 text-xs':'text-gray-500 text-xs'}>
                    💡 建议：先看示例数据理解题意，独立思考后再查看答案
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：题目列表 */}
          <div className="lg:col-span-2 space-y-6">
            {filtered.map(p => {
              const isOpen = !!expanded[p.id]
              const mode = solutionMode[p.id] ?? 'sql'
              return (
                <Card key={p.id} className={theme === 'dark' ? 'border-2 border-gray-700 bg-gray-800 hover:border-teal-600 transition-all' : 'border-2 border-gray-200 bg-white hover:border-teal-400 hover:shadow-lg transition-all'}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-teal-500"></span>
                          <span className={theme==='dark'?'text-white':'text-gray-900'}>{p.title}</span>
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <Badge className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs">
                            {categoryMeta.find(c => c.key === p.category)?.label}
                          </Badge>
                          <Difficulty level={p.difficulty} />
                          {p.keywords.map(k => (
                            <span key={k} className={theme === 'dark' ? 'text-xs px-2 py-1 rounded-md bg-gray-700 text-cyan-300' : 'text-xs px-2 py-1 rounded-md bg-teal-50 text-teal-700 border border-teal-200'}>
                              #{k}
                            </span>
                          ))}
                        </div>
                        
                        {/* 表结构 */}
                        <div className={theme==='dark'?'bg-gray-900 border border-gray-600 rounded-lg p-3 mb-3':'bg-gray-50 border border-gray-300 rounded-lg p-3 mb-3'}>
                          <div className="flex items-center gap-2 mb-1">
                            <Table className="h-4 w-4 text-teal-600" />
                            <span className={theme==='dark'?'text-xs font-semibold text-gray-300':'text-xs font-semibold text-gray-700'}>表结构</span>
                          </div>
                          <code className={theme==='dark'?'text-xs text-emerald-300':'text-xs text-gray-800'}>
                            {p.tables}
                          </code>
                        </div>

                        {/* 题目描述 */}
                        <p className={"text-sm font-medium mb-3 " + (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}>
                          {p.description}
                        </p>

                        {/* 示例数据 */}
                        <div className={theme==='dark'?'bg-gray-900 border border-gray-600 rounded-lg p-3 mb-3':'bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3'}>
                          <div className="flex items-center gap-2 mb-2">
                            <Database className="h-4 w-4 text-blue-600" />
                            <span className={theme==='dark'?'text-xs font-semibold text-blue-400':'text-xs font-semibold text-blue-700'}>示例数据</span>
                          </div>
                          <pre className={theme==='dark'?'text-xs text-gray-300 overflow-x-auto':'text-xs text-gray-700 overflow-x-auto whitespace-pre'}>
{p.sampleData}
                          </pre>
                        </div>

                        {/* 预期输出 */}
                        <div className={theme==='dark'?'bg-gray-900 border border-gray-600 rounded-lg p-3':'bg-green-50 border border-green-200 rounded-lg p-3'}>
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className={theme==='dark'?'text-xs font-semibold text-green-400':'text-xs font-semibold text-green-700'}>预期输出</span>
                          </div>
                          <pre className={theme==='dark'?'text-xs text-gray-300 overflow-x-auto':'text-xs text-gray-700 overflow-x-auto whitespace-pre'}>
{p.expectedOutput}
                          </pre>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className={theme === 'dark' ? 'border-teal-600 text-teal-400 hover:bg-teal-900/30' : 'border-teal-500 text-teal-600 hover:bg-teal-50'}
                        onClick={() => setExpanded(prev => ({ ...prev, [p.id]: !prev[p.id] }))}
                      >
                        {isOpen ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
                        <span className="ml-1">{isOpen ? '收起' : '查看答案'}</span>
                      </Button>
                    </div>
                  </CardHeader>
                  {isOpen && (
                    <CardContent className="pt-0 border-t" style={{borderColor: theme==='dark'?'#374151':'#e5e7eb'}}>
                      {/* 模式切换 */}
                      <div className="my-4 inline-flex rounded-lg border overflow-hidden" style={{borderColor: theme==='dark'?'#4b5563':'#d1d5db'}}>
                        <button
                          className={[
                            'px-4 py-2 text-sm font-medium transition-colors',
                            mode === 'sql' 
                              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white' 
                              : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50')
                          ].join(' ')}
                          onClick={() => setSolutionMode(prev => ({ ...prev, [p.id]: 'sql' }))}
                        >SQL 解法</button>
                        <button
                          className={[
                            'px-4 py-2 text-sm font-medium border-l transition-colors',
                            mode === 'pandas' 
                              ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-transparent' 
                              : (theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300')
                          ].join(' ')}
                          onClick={() => setSolutionMode(prev => ({ ...prev, [p.id]: 'pandas' }))}
                        >Pandas 解法</button>
                      </div>

                      {/* 代码区 */}
                      {mode === 'sql' ? (
                        <div className="space-y-3">
                          {p.sqlSolutions.map((code, idx) => (
                            <div key={idx}>
                              {p.sqlSolutions.length > 1 && (
                                <div className={theme==='dark'?'text-xs font-semibold text-teal-400 mb-2':'text-xs font-semibold text-teal-600 mb-2'}>
                                  💻 解法 {idx + 1}
                                </div>
                              )}
                              <pre className={theme === 'dark' 
                                ? 'p-4 rounded-lg bg-black text-emerald-300 border border-gray-700 overflow-x-auto text-sm leading-relaxed font-mono' 
                                : 'p-4 rounded-lg bg-gray-900 text-emerald-300 border border-gray-300 overflow-x-auto text-sm leading-relaxed font-mono'
                              }>
{code}
                              </pre>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {p.pandasSolutions.map((code, idx) => (
                            <div key={idx}>
                              {p.pandasSolutions.length > 1 && (
                                <div className={theme==='dark'?'text-xs font-semibold text-cyan-400 mb-2':'text-xs font-semibold text-cyan-600 mb-2'}>
                                  🐍 方法 {idx + 1}
                                </div>
                              )}
                              <pre className={theme === 'dark' 
                                ? 'p-4 rounded-lg bg-black text-cyan-300 border border-gray-700 overflow-x-auto text-sm leading-relaxed font-mono' 
                                : 'p-4 rounded-lg bg-gray-900 text-cyan-300 border border-gray-300 overflow-x-auto text-sm leading-relaxed font-mono'
                              }>
{code}
                              </pre>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 讲解 */}
                      <div className={"mt-4 p-4 rounded-lg text-sm leading-relaxed " + (theme === 'dark' ? 'bg-gray-900 border border-teal-700 text-gray-200' : 'bg-teal-50 border border-teal-300 text-gray-800')}>
                        <div className="flex items-start gap-2">
                          <span className="text-teal-600 font-bold text-lg flex-shrink-0">💡</span>
                          <div>
                            <span className="font-bold text-teal-600">思路讲解：</span>
                            <span className="ml-2">{p.explanation}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}

            {filtered.length === 0 && (
              <div className={theme === 'dark' ? 'text-center py-12 text-gray-400' : 'text-center py-12 text-gray-600'}>
                暂无该分类题目
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 返回入口 */}
      <section className="py-8 border-t" style={{ borderColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-center">
          <Link href="/sql">
            <Button variant="outline" className={theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}>
              ← 返回 SQL 页面
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg">
              回到首页
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
