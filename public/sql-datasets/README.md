# SQL练习题数据集

本目录包含10个真实的CSV数据集，对应SQL练习页面的各个题目。

---

## 📁 数据集清单

| 数据集 | 行数 | 大小 | 对应题目 | 说明 |
|--------|------|------|---------|------|
| `orders.csv` | 252 | 8.7 KB | 窗口函数-题1 | 用户订单记录 |
| `daily_sales.csv` | 180 | 3.7 KB | 窗口函数-题2 | 日销售额数据 |
| `monthly_sales.csv` | 72 | 1.6 KB | 窗口函数-题3 | 月度销售数据 |
| `transactions.csv` | 464 | 16.5 KB | 窗口函数-题4 | 交易明细流水 |
| `user_logins.csv` | 671 | 11.2 KB | 窗口函数-题5 | 用户登录记录 |
| `product_sales.csv` | 16 | 0.5 KB | 基础查询-题1 | 商品销售统计 |
| `employees.csv` | 60 | 2.4 KB | 基础查询-题2 | 员工信息表 |
| `student_scores.csv` | 500 | 14.2 KB | 业务应用-题1 | 学生成绩表 |
| `page_views.csv` | 1,026 | 36.5 KB | 业务应用-题2 | 页面访问日志 |
| `inventory_changes.csv` | 546 | 18.8 KB | 业务应用-题3 | 库存变动记录 |

**总计**: 10个数据集 | 3,787行数据 | ~115 KB

---

## 📖 数据集详细说明

### 1. orders.csv - 用户订单记录

**字段**:
- `order_id`: 订单ID
- `user_id`: 用户ID (101-150)
- `amount`: 订单金额 (30-300元)
- `created_at`: 创建时间 (2024-01-01 ~ 2024-03-31)

**业务场景**: 电商订单数据，每个用户有2-8笔订单

**SQL题目**: 计算每个用户最近一次订单金额（ROW_NUMBER窗口函数）

---

### 2. daily_sales.csv - 日销售额数据

**字段**:
- `product_id`: 商品ID (1, 2, 3)
- `sale_date`: 销售日期 (60天)
- `amount`: 销售额

**业务场景**: 3个商品的日销售额，包含趋势和随机波动

**SQL题目**: 计算7日移动平均销售额（ROWS窗口帧）

---

### 3. monthly_sales.csv - 月度销售数据

**字段**:
- `product_id`: 商品ID (P001, P002, P003)
- `year`: 年份 (2023, 2024)
- `month`: 月份 (1-12)
- `amount`: 销售额

**业务场景**: 2年24个月的月度销售数据，含同比增长

**SQL题目**: 计算同比增长率（LAG窗口函数）

---

### 4. transactions.csv - 交易明细流水

**字段**:
- `transaction_id`: 交易ID
- `user_id`: 用户ID (1001-1050)
- `amount`: 交易金额
- `transaction_date`: 交易时间

**业务场景**: 50个用户的464笔交易记录

**SQL题目**: 计算用户累计消费金额（SUM窗口函数）

---

### 5. user_logins.csv - 用户登录记录

**字段**:
- `user_id`: 用户ID (2001-2030)
- `login_date`: 登录日期

**业务场景**: 30个用户的连续登录记录，包含中断

**SQL题目**: 计算最大连续登录天数（复杂窗口函数）

---

### 6. product_sales.csv - 商品销售统计

**字段**:
- `product_id`: 商品ID
- `product_name`: 商品名称
- `category`: 商品类别（4类，每类4个商品）
- `sales`: 销量

**业务场景**: 16个商品的销售统计，分属4个类别

**SQL题目**: 计算每个类别的销售排名（RANK/DENSE_RANK）

---

### 7. employees.csv - 员工信息表

**字段**:
- `employee_id`: 员工ID (1001+)
- `name`: 姓名
- `department`: 部门 (5个部门)
- `position`: 职位 (经理/主管/专员/助理)
- `salary`: 工资 (5000-30000)

**业务场景**: 5个部门共60名员工的薪资数据

**SQL题目**: 查询高于部门平均工资的员工（子查询）

---

### 8. student_scores.csv - 学生成绩表

**字段**:
- `student_id`: 学号 (10001-10100)
- `student_name`: 姓名
- `subject`: 科目 (数学/语文/英语/物理/化学)
- `score`: 成绩 (60-100)

**业务场景**: 100个学生，5门课程的成绩数据

**SQL题目**: 计算每个学生的平均分和排名

---

### 9. page_views.csv - 页面访问日志

**字段**:
- `session_id`: 会话ID (5001-5200)
- `user_id`: 用户ID (1-100)
- `page_url`: 页面URL (/home, /product, /cart, /checkout, /about)
- `visit_time`: 访问时间

**业务场景**: 200个会话的页面访问路径，模拟购物漏斗

**SQL题目**: 计算转化漏斗（多表关联+聚合）

---

### 10. inventory_changes.csv - 库存变动记录

**字段**:
- `change_id`: 变动ID
- `product_id`: 商品ID (3001-3020)
- `change_type`: 变动类型 (入库/出库)
- `change_quantity`: 变动数量
- `change_date`: 变动日期
- `stock_after`: 变动后库存

**业务场景**: 20个商品30天的库存进出记录

**SQL题目**: 计算每个商品的库存周转率

---

## 🔧 使用方法

### 在SQL中导入

```sql
-- MySQL示例
LOAD DATA INFILE 'orders.csv'
INTO TABLE orders
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

### 在Python中使用

```python
import pandas as pd

# 读取数据
df = pd.read_csv('orders.csv')

# 示例：计算每个用户最近一次订单
df['created_at'] = pd.to_datetime(df['created_at'])
result = df.sort_values('created_at').groupby('user_id').last()[['amount']]
print(result)
```

### 在SQL练习页面中使用

1. 打开"SQL & Pandas 练习题"页面
2. 选择对应题目
3. 点击"查看数据集"按钮
4. 下载CSV文件到本地
5. 在MySQL/PostgreSQL/SQLite中导入
6. 编写SQL查询验证答案

---

## 📊 数据特点

### 真实性
- ✅ 基于真实业务场景生成
- ✅ 包含合理的数据分布和趋势
- ✅ 有随机噪声和异常值
- ✅ 时间序列符合业务规律

### 复杂度
- ✅ 数据规模适中（60-1000行）
- ✅ 包含多种数据类型（数值/字符/日期）
- ✅ 有一对多关系
- ✅ 适合练习各种SQL技巧

### 可扩展性
- ✅ 可修改生成脚本扩大规模
- ✅ 可添加更多字段
- ✅ 可调整业务规则

---

## 🎯 学习建议

### 初级（基础查询）
1. 先从`product_sales.csv`和`employees.csv`开始
2. 练习SELECT、WHERE、GROUP BY
3. 掌握聚合函数（COUNT、SUM、AVG）

### 中级（窗口函数）
1. 使用`orders.csv`练习ROW_NUMBER
2. 使用`daily_sales.csv`练习移动平均
3. 使用`monthly_sales.csv`练习LAG/LEAD

### 高级（复杂查询）
1. 使用`transactions.csv`练习累计求和
2. 使用`user_logins.csv`练习连续序列
3. 使用`page_views.csv`练习漏斗分析

---

## 🔄 数据更新

### 重新生成

```bash
python scripts/generate_sql_datasets.py
```

### 自定义参数

修改脚本中的参数：
- 用户数量
- 时间范围
- 数据规模
- 业务规则

---

## 📝 题目对照表

| 数据集 | 题目编号 | 难度 | 核心技术点 |
|--------|---------|------|-----------|
| orders.csv | sql-win-1 | ⭐⭐⭐ | ROW_NUMBER |
| daily_sales.csv | sql-win-2 | ⭐⭐⭐ | 窗口帧（ROWS） |
| monthly_sales.csv | sql-win-3 | ⭐⭐⭐⭐ | LAG/同比 |
| transactions.csv | sql-win-4 | ⭐⭐⭐ | SUM OVER |
| user_logins.csv | sql-win-5 | ⭐⭐⭐⭐⭐ | 连续序列 |
| product_sales.csv | sql-basic-1 | ⭐⭐ | RANK |
| employees.csv | sql-basic-2 | ⭐⭐ | 子查询 |
| student_scores.csv | sql-business-1 | ⭐⭐⭐ | 透视表 |
| page_views.csv | sql-business-2 | ⭐⭐⭐⭐ | 漏斗分析 |
| inventory_changes.csv | sql-business-3 | ⭐⭐⭐⭐ | 库存计算 |

---

## 💡 扩展练习

### 组合使用多个数据集

```sql
-- 结合orders.csv和transactions.csv
-- 分析用户的订单频率和交易金额的关系
SELECT 
    o.user_id,
    COUNT(DISTINCT o.order_id) as order_count,
    COUNT(t.transaction_id) as transaction_count,
    SUM(t.amount) as total_amount
FROM orders o
LEFT JOIN transactions t ON o.user_id = t.user_id
GROUP BY o.user_id;
```

### 时间序列分析

```sql
-- 使用daily_sales.csv
-- 计算销售额的移动平均和标准差
SELECT 
    sale_date,
    amount,
    AVG(amount) OVER(ORDER BY sale_date ROWS 6 PRECEDING) as ma_7,
    STDDEV(amount) OVER(ORDER BY sale_date ROWS 29 PRECEDING) as std_30
FROM daily_sales;
```

---

*生成脚本: `scripts/generate_sql_datasets.py`*  
*最后更新: 2023-10-05*


