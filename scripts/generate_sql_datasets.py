"""
为SQL练习题目生成真实的CSV数据集
每个题目对应一个或多个CSV文件
"""
import csv
import os
from datetime import datetime, timedelta
import random

os.makedirs('public/sql-datasets', exist_ok=True)

print("=" * 70)
print("正在生成SQL练习题数据集...")
print("=" * 70)

# ==========================================
# 题目1：计算每个用户最近一次订单金额
# ==========================================
print("\n[1/10] 生成订单数据集 (orders.csv)...")

random.seed(42)
orders_data = []
base_date = datetime(2024, 1, 1)

# 生成100个用户的订单数据
for user_id in range(101, 151):  # 50个用户
    num_orders = random.randint(2, 8)  # 每人2-8笔订单
    for i in range(num_orders):
        order_date = base_date + timedelta(days=random.randint(0, 90))
        orders_data.append({
            'order_id': len(orders_data) + 1,
            'user_id': user_id,
            'amount': round(random.uniform(30, 300), 2),
            'created_at': order_date.strftime('%Y-%m-%d %H:%M:%S')
        })

# 排序
orders_data.sort(key=lambda x: x['order_id'])

with open('public/sql-datasets/orders.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['order_id', 'user_id', 'amount', 'created_at'])
    writer.writeheader()
    writer.writerows(orders_data)

print(f"✓ orders.csv ({len(orders_data)} 行)")

# ==========================================
# 题目2：计算7日移动平均销售额
# ==========================================
print("\n[2/10] 生成日销售数据集 (daily_sales.csv)...")

daily_sales_data = []
start_date = datetime(2024, 1, 1)

# 生成3个产品的60天销售数据
for product_id in [1, 2, 3]:
    base_amount = random.uniform(80, 150)
    for day in range(60):
        sale_date = start_date + timedelta(days=day)
        # 添加趋势和噪声
        trend = day * 0.5
        noise = random.gauss(0, 10)
        amount = round(base_amount + trend + noise, 2)
        
        daily_sales_data.append({
            'product_id': product_id,
            'sale_date': sale_date.strftime('%Y-%m-%d'),
            'amount': amount
        })

with open('public/sql-datasets/daily_sales.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['product_id', 'sale_date', 'amount'])
    writer.writeheader()
    writer.writerows(daily_sales_data)

print(f"✓ daily_sales.csv ({len(daily_sales_data)} 行)")

# ==========================================
# 题目3：同比增长率计算
# ==========================================
print("\n[3/10] 生成月度销售数据集 (monthly_sales.csv)...")

monthly_sales_data = []
months = []
for year in [2023, 2024]:
    for month in range(1, 13):
        months.append((year, month))

for product_id in ['P001', 'P002', 'P003']:
    base_amount = random.uniform(50000, 100000)
    for year, month in months:
        # 2024年比2023年增长10-30%
        growth_factor = 1.0 if year == 2023 else random.uniform(1.1, 1.3)
        seasonal_factor = 1 + 0.2 * abs(6 - month) / 6  # 年中最高
        amount = round(base_amount * growth_factor * seasonal_factor + random.gauss(0, 5000), 2)
        
        monthly_sales_data.append({
            'product_id': product_id,
            'year': year,
            'month': month,
            'amount': amount
        })

with open('public/sql-datasets/monthly_sales.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['product_id', 'year', 'month', 'amount'])
    writer.writeheader()
    writer.writerows(monthly_sales_data)

print(f"✓ monthly_sales.csv ({len(monthly_sales_data)} 行)")

# ==========================================
# 题目4：用户累计消费金额
# ==========================================
print("\n[4/10] 生成交易明细数据集 (transactions.csv)...")

transactions_data = []
transaction_date = datetime(2024, 1, 1)

for user_id in range(1001, 1051):  # 50个用户
    num_trans = random.randint(5, 15)
    for i in range(num_trans):
        transaction_date += timedelta(hours=random.randint(1, 48))
        transactions_data.append({
            'transaction_id': len(transactions_data) + 1,
            'user_id': user_id,
            'amount': round(random.uniform(20, 200), 2),
            'transaction_date': transaction_date.strftime('%Y-%m-%d %H:%M:%S')
        })

with open('public/sql-datasets/transactions.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['transaction_id', 'user_id', 'amount', 'transaction_date'])
    writer.writeheader()
    writer.writerows(transactions_data)

print(f"✓ transactions.csv ({len(transactions_data)} 行)")

# ==========================================
# 题目5：连续登录天数
# ==========================================
print("\n[5/10] 生成用户登录记录数据集 (user_logins.csv)...")

user_logins_data = []
login_date = datetime(2024, 1, 1)

for user_id in range(2001, 2031):  # 30个用户
    # 生成连续登录序列
    current_date = login_date + timedelta(days=random.randint(0, 10))
    
    # 随机生成2-4段连续登录
    for segment in range(random.randint(2, 4)):
        consecutive_days = random.randint(3, 10)
        for day in range(consecutive_days):
            user_logins_data.append({
                'user_id': user_id,
                'login_date': current_date.strftime('%Y-%m-%d')
            })
            current_date += timedelta(days=1)
        
        # 间隔几天
        current_date += timedelta(days=random.randint(2, 7))

with open('public/sql-datasets/user_logins.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['user_id', 'login_date'])
    writer.writeheader()
    writer.writerows(user_logins_data)

print(f"✓ user_logins.csv ({len(user_logins_data)} 行)")

# ==========================================
# 题目6：商品销售排名
# ==========================================
print("\n[6/10] 生成商品销售数据集 (product_sales.csv)...")

product_sales_data = []
categories = ['电子产品', '服装鞋帽', '食品饮料', '家居家装']
product_names = {
    '电子产品': ['手机', '耳机', '充电宝', '数据线'],
    '服装鞋帽': ['T恤', '牛仔裤', '运动鞋', '背包'],
    '食品饮料': ['咖啡', '茶叶', '坚果', '巧克力'],
    '家居家装': ['台灯', '抱枕', '收纳盒', '挂钟']
}

product_id = 1
for category in categories:
    for product_name in product_names[category]:
        sales = random.randint(100, 1000)
        product_sales_data.append({
            'product_id': product_id,
            'product_name': product_name,
            'category': category,
            'sales': sales
        })
        product_id += 1

with open('public/sql-datasets/product_sales.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['product_id', 'product_name', 'category', 'sales'])
    writer.writeheader()
    writer.writerows(product_sales_data)

print(f"✓ product_sales.csv ({len(product_sales_data)} 行)")

# ==========================================
# 题目7：员工工资数据
# ==========================================
print("\n[7/10] 生成员工数据集 (employees.csv)...")

employees_data = []
departments = ['技术部', '市场部', '运营部', '财务部', '人力资源部']
positions = ['经理', '主管', '专员', '助理']

employee_id = 1001
for dept in departments:
    dept_size = random.randint(8, 15)
    for i in range(dept_size):
        position = random.choice(positions)
        base_salary = {
            '经理': random.randint(20000, 30000),
            '主管': random.randint(15000, 20000),
            '专员': random.randint(8000, 15000),
            '助理': random.randint(5000, 8000)
        }[position]
        
        employees_data.append({
            'employee_id': employee_id,
            'name': f'员工{employee_id}',
            'department': dept,
            'position': position,
            'salary': base_salary
        })
        employee_id += 1

with open('public/sql-datasets/employees.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['employee_id', 'name', 'department', 'position', 'salary'])
    writer.writeheader()
    writer.writerows(employees_data)

print(f"✓ employees.csv ({len(employees_data)} 行)")

# ==========================================
# 题目8：学生成绩数据
# ==========================================
print("\n[8/10] 生成学生成绩数据集 (student_scores.csv)...")

student_scores_data = []
subjects = ['数学', '语文', '英语', '物理', '化学']

for student_id in range(10001, 10101):  # 100个学生
    for subject in subjects:
        score = random.randint(60, 100)
        student_scores_data.append({
            'student_id': student_id,
            'student_name': f'学生{student_id}',
            'subject': subject,
            'score': score
        })

with open('public/sql-datasets/student_scores.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['student_id', 'student_name', 'subject', 'score'])
    writer.writeheader()
    writer.writerows(student_scores_data)

print(f"✓ student_scores.csv ({len(student_scores_data)} 行)")

# ==========================================
# 题目9：页面访问日志
# ==========================================
print("\n[9/10] 生成页面访问数据集 (page_views.csv)...")

page_views_data = []
pages = ['/home', '/product', '/cart', '/checkout', '/about']
visit_time = datetime(2024, 1, 1)

for session_id in range(5001, 5201):  # 200个会话
    user_id = random.randint(1, 100)
    num_pages = random.randint(2, 8)
    
    for i in range(num_pages):
        page = pages[min(i, len(pages)-1)]  # 按漏斗顺序
        visit_time += timedelta(seconds=random.randint(10, 180))
        
        page_views_data.append({
            'session_id': session_id,
            'user_id': user_id,
            'page_url': page,
            'visit_time': visit_time.strftime('%Y-%m-%d %H:%M:%S')
        })

with open('public/sql-datasets/page_views.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['session_id', 'user_id', 'page_url', 'visit_time'])
    writer.writeheader()
    writer.writerows(page_views_data)

print(f"✓ page_views.csv ({len(page_views_data)} 行)")

# ==========================================
# 题目10：库存变动记录
# ==========================================
print("\n[10/10] 生成库存变动数据集 (inventory_changes.csv)...")

inventory_changes_data = []
change_date = datetime(2024, 1, 1)

for product_id in range(3001, 3021):  # 20个商品
    # 初始库存
    current_stock = random.randint(100, 500)
    
    # 生成30天的变动记录
    for day in range(30):
        change_date_str = (change_date + timedelta(days=day)).strftime('%Y-%m-%d')
        
        # 入库
        if random.random() < 0.3:
            change_qty = random.randint(50, 200)
            current_stock += change_qty
            inventory_changes_data.append({
                'change_id': len(inventory_changes_data) + 1,
                'product_id': product_id,
                'change_type': '入库',
                'change_quantity': change_qty,
                'change_date': change_date_str,
                'stock_after': current_stock
            })
        
        # 出库
        if random.random() < 0.6:
            change_qty = random.randint(10, 50)
            current_stock -= change_qty
            inventory_changes_data.append({
                'change_id': len(inventory_changes_data) + 1,
                'product_id': product_id,
                'change_type': '出库',
                'change_quantity': change_qty,
                'change_date': change_date_str,
                'stock_after': current_stock
            })

with open('public/sql-datasets/inventory_changes.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['change_id', 'product_id', 'change_type', 
                                           'change_quantity', 'change_date', 'stock_after'])
    writer.writeheader()
    writer.writerows(inventory_changes_data)

print(f"✓ inventory_changes.csv ({len(inventory_changes_data)} 行)")

# ==========================================
# 统计摘要
# ==========================================
print("\n" + "=" * 70)
print("✅ SQL数据集生成完成！")
print("=" * 70)

datasets = [
    ('orders.csv', len(orders_data), '用户订单'),
    ('daily_sales.csv', len(daily_sales_data), '日销售额'),
    ('monthly_sales.csv', len(monthly_sales_data), '月度销售'),
    ('transactions.csv', len(transactions_data), '交易明细'),
    ('user_logins.csv', len(user_logins_data), '登录记录'),
    ('product_sales.csv', len(product_sales_data), '商品销售'),
    ('employees.csv', len(employees_data), '员工信息'),
    ('student_scores.csv', len(student_scores_data), '学生成绩'),
    ('page_views.csv', len(page_views_data), '页面访问'),
    ('inventory_changes.csv', len(inventory_changes_data), '库存变动')
]

print("\n📊 数据集清单：\n")
for filename, rows, desc in datasets:
    print(f"  {filename:30s} {rows:>5} 行  - {desc}")

total_rows = sum(rows for _, rows, _ in datasets)
print(f"\n总计: 10个数据集，{total_rows:,} 行数据")
print("\n📁 保存位置: public/sql-datasets/")
print("=" * 70)


