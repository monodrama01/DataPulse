"""
生成基于真实业务逻辑的电商数据集（无需额外依赖）
"""

import csv
import random
import os
from datetime import datetime, timedelta

# 创建输出目录
os.makedirs('public/datasets', exist_ok=True)

print("=" * 60)
print("正在生成真实电商数据集...")
print("=" * 60)

# ==========================================
# 1. RFM分析数据集 - 在线零售交易数据
# ==========================================
print("\n[1/4] 生成RFM分析数据集...")

random.seed(42)

products = [
    ('手机', '电子产品', 3999), ('笔记本电脑', '电子产品', 6999),
    ('无线耳机', '电子产品', 599), ('移动电源', '电子产品', 199),
    ('男士衬衫', '服装鞋帽', 299), ('女士连衣裙', '服装鞋帽', 399),
    ('运动鞋', '服装鞋帽', 599), ('背包', '服装鞋帽', 249),
    ('咖啡豆', '食品饮料', 89), ('坚果礼盒', '食品饮料', 129),
    ('茶叶', '食品饮料', 159), ('巧克力', '食品饮料', 69),
    ('台灯', '家居家装', 159), ('床上四件套', '家居家装', 399),
    ('沙发', '家居家装', 2999), ('餐具套装', '家居家装', 299),
    ('Python编程书', '图书音像', 89), ('商业分析书', '图书音像', 99),
    ('蓝牙音箱', '电子产品', 299), ('智能手表', '电子产品', 1299)
]

rfm_data = []
start_date = datetime(2023, 1, 1)
end_date = datetime(2023, 12, 31)

# 生成300个客户的交易记录
for customer_id in range(1, 301):
    customer_code = f'C{customer_id:05d}'
    
    # 客户类型：高价值(10%), 中价值(30%), 低价值(60%)
    rand = random.random()
    if rand < 0.1:
        num_transactions = random.randint(8, 20)
        value_multiplier = random.uniform(1.5, 3.0)
    elif rand < 0.4:
        num_transactions = random.randint(3, 8)
        value_multiplier = random.uniform(0.8, 1.5)
    else:
        num_transactions = random.randint(1, 3)
        value_multiplier = random.uniform(0.5, 0.8)
    
    # 生成交易日期
    current_date = start_date + timedelta(days=random.randint(0, 60))
    
    for trans_num in range(num_transactions):
        if current_date > end_date:
            break
            
        # 每笔交易购买1-3种商品
        num_items = random.randint(1, 4)
        selected_products = random.sample(products, min(num_items, len(products)))
        
        for product_name, category, base_price in selected_products:
            prod_idx = products.index((product_name, category, base_price))
            quantity = random.randint(1, 4)
            price = base_price * value_multiplier * random.uniform(0.9, 1.1)
            discount = 0 if random.random() > 0.3 else price * random.uniform(0.05, 0.2)
            total = price * quantity - discount
            
            rfm_data.append([
                f'INV{len(rfm_data):06d}',  # InvoiceNo
                f'P{prod_idx:04d}',  # StockCode
                product_name,  # Description
                quantity,
                current_date.strftime('%Y-%m-%d %H:%M:%S'),  # InvoiceDate
                round(price, 2),  # UnitPrice
                customer_code,  # CustomerID
                'China',  # Country
                category,  # Category
                round(discount, 2),  # Discount
                round(total, 2)  # TotalAmount
            ])
        
        # 下次购买间隔
        current_date += timedelta(days=random.randint(7, 60))

# 按日期排序
rfm_data.sort(key=lambda x: x[4])

# 保存CSV
with open('public/datasets/online_retail_transactions.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['InvoiceNo', 'StockCode', 'Description', 'Quantity', 'InvoiceDate', 
                    'UnitPrice', 'CustomerID', 'Country', 'Category', 'Discount', 'TotalAmount'])
    writer.writerows(rfm_data)

file_size = os.path.getsize('public/datasets/online_retail_transactions.csv') / 1024
print(f"✓ 生成 {len(rfm_data)} 行交易数据")
print(f"  - 客户数: 300个")
print(f"  - 商品数: {len(products)}种")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 2. 销售时间序列数据集
# ==========================================
print("\n[2/4] 生成销售时间序列数据集...")

import math

sales_data = []
current_date = datetime(2023, 1, 1)
base_sales = 50000

for day in range(365):
    date_str = current_date.strftime('%Y-%m-%d')
    
    # 趋势 + 季节性 + 周期性 + 噪声
    trend = day * 40
    seasonality = 10000 * math.sin(2 * math.pi * day / 365.25 * 4)
    weekly = 5000 * math.sin(2 * math.pi * day / 7)
    noise = random.gauss(0, 3000)
    
    sales = max(0, base_sales + trend + seasonality + weekly + noise)
    order_count = random.randint(180, 220) + int(trend / 100)
    customer_count = random.randint(130, 170) + int(trend / 150)
    avg_order_value = sales / order_count if order_count > 0 else 0
    conversion_rate = random.uniform(0.02, 0.05)
    
    # 促销日标记
    promo_dates = ['2023-01-01', '2023-02-14', '2023-03-08', '2023-05-01', 
                   '2023-06-18', '2023-11-11', '2023-12-12', '2023-12-25']
    is_promotion = 1 if date_str in promo_dates else 0
    
    # 促销日销售额提升
    if is_promotion:
        sales *= random.uniform(1.2, 1.5)
        order_count = int(order_count * random.uniform(1.2, 1.4))
    
    sales_data.append([
        date_str,
        round(sales, 2),
        order_count,
        customer_count,
        round(avg_order_value, 2),
        round(conversion_rate, 4),
        is_promotion
    ])
    
    current_date += timedelta(days=1)

# 保存CSV
with open('public/datasets/daily_sales_timeseries.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['date', 'sales_amount', 'order_count', 'customer_count', 
                    'avg_order_value', 'conversion_rate', 'is_promotion'])
    writer.writerows(sales_data)

file_size = os.path.getsize('public/datasets/daily_sales_timeseries.csv') / 1024
total_sales = sum(row[1] for row in sales_data)
print(f"✓ 生成 365 天销售数据")
print(f"  - 总销售额: ¥{total_sales:,.0f}")
print(f"  - 促销天数: {sum(row[6] for row in sales_data)}天")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 3. 用户流失预测数据集
# ==========================================
print("\n[3/4] 生成用户流失预测数据集...")

churn_data = []
segments = ['新客户', '活跃客户', '沉睡客户', '流失客户']
categories = ['电子产品', '服装鞋帽', '食品饮料', '家居家装', '图书音像']
channels = ['APP', 'Web', '小程序', '线下']
age_groups = ['18-25', '26-35', '36-45', '46-55', '55+']

for user_id in range(1, 1001):
    recency = random.randint(1, 365)
    frequency = random.randint(1, 50)
    monetary = random.uniform(100, 10000)
    tenure_days = random.randint(30, 730)
    avg_session = random.uniform(2, 30)
    avg_purchase_value = monetary / frequency
    
    # 流失规则
    churn_score = 0
    if recency > 180: churn_score += 3
    elif recency > 90: churn_score += 2
    elif recency > 30: churn_score += 1
    
    if frequency < 3: churn_score += 2
    if monetary < 500: churn_score += 1
    if avg_session < 5: churn_score += 1
    
    churned = 1 if churn_score >= 4 else 0
    
    # 10%随机性
    if random.random() < 0.1:
        churned = 1 - churned
    
    churn_data.append([
        f'U{user_id:06d}',
        recency,
        frequency,
        round(monetary, 2),
        tenure_days,
        round(avg_session, 1),
        recency,
        frequency,
        round(avg_purchase_value, 2),
        random.choice(segments),
        random.choice(categories),
        random.choice(channels),
        random.choice(age_groups),
        churned
    ])

# 保存CSV
with open('public/datasets/customer_churn_features.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['user_id', 'recency', 'frequency', 'monetary', 'tenure_days',
                    'avg_session_duration_min', 'days_since_last_purchase', 'total_purchases',
                    'avg_purchase_value', 'customer_segment', 'preferred_category',
                    'registration_channel', 'age_group', 'churned'])
    writer.writerows(churn_data)

file_size = os.path.getsize('public/datasets/customer_churn_features.csv') / 1024
churn_rate = sum(row[-1] for row in churn_data) / len(churn_data) * 100
print(f"✓ 生成 1000 个用户流失数据")
print(f"  - 流失率: {churn_rate:.1f}%")
print(f"  - 特征数: 13个")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 4. 购物篮分析数据集
# ==========================================
print("\n[4/4] 生成购物篮分析数据集...")

product_groups = {
    '手机配件': ['手机壳', '钢化膜', '充电器', '数据线', '耳机', '移动电源'],
    '电脑配件': ['鼠标', '键盘', 'U盘', '鼠标垫', '笔记本包', '散热器'],
    '家居用品': ['毛巾', '牙刷', '杯子', '抱枕', '拖鞋', '衣架'],
    '零食饮料': ['薯片', '巧克力', '饼干', '可乐', '咖啡', '茶叶']
}

# 关联规则
strong_associations = [
    (['手机壳', '钢化膜'], 0.7),
    (['充电器', '数据线'], 0.6),
    (['耳机', '移动电源'], 0.5),
    (['鼠标', '键盘'], 0.8),
    (['鼠标', '鼠标垫'], 0.7),
    (['薯片', '可乐'], 0.6),
    (['咖啡', '饼干'], 0.5),
]

basket_data = []

for order_num in range(1, 2001):
    order_date = (start_date + timedelta(days=random.randint(0, 365))).strftime('%Y-%m-%d')
    
    # 选择主类别
    main_category = random.choice(list(product_groups.keys()))
    products_in_order = []
    
    # 从主类别选商品
    num_items = random.randint(1, 4)
    available = product_groups[main_category]
    products_in_order.extend(random.sample(available, min(num_items, len(available))))
    
    # 关联规则
    for rule, prob in strong_associations:
        if rule[0] in products_in_order and random.random() < prob:
            if rule[1] not in products_in_order:
                products_in_order.append(rule[1])
    
    # 跨类别购买（30%概率）
    if random.random() < 0.3:
        other_cats = [c for c in product_groups.keys() if c != main_category]
        other_cat = random.choice(other_cats)
        other_prod = random.choice(product_groups[other_cat])
        if other_prod not in products_in_order:
            products_in_order.append(other_prod)
    
    # 生成订单行
    for product in products_in_order:
        category = next(cat for cat, prods in product_groups.items() if product in prods)
        quantity = random.randint(1, 4)
        unit_price = round(random.uniform(10, 200), 2)
        total = round(quantity * unit_price, 2)
        
        basket_data.append([
            f'ORD{order_num:06d}',
            order_date,
            product,
            category,
            quantity,
            unit_price,
            total
        ])

# 排序
basket_data.sort(key=lambda x: (x[0], x[2]))

# 保存CSV
with open('public/datasets/market_basket_transactions.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['order_id', 'order_date', 'product_name', 'category', 
                    'quantity', 'unit_price', 'total_amount'])
    writer.writerows(basket_data)

file_size = os.path.getsize('public/datasets/market_basket_transactions.csv') / 1024
unique_orders = len(set(row[0] for row in basket_data))
unique_products = len(set(row[2] for row in basket_data))
print(f"✓ 生成 {len(basket_data)} 条购物篮记录")
print(f"  - 订单数: {unique_orders}个")
print(f"  - 商品数: {unique_products}种")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 摘要
# ==========================================
print("\n" + "=" * 60)
print("✅ 所有数据集生成完成！")
print("=" * 60)
print("\n📊 数据集清单：")
print("""
1. online_retail_transactions.csv
   ✓ RFM客户价值分析
   ✓ 300个客户的真实交易模式
   ✓ 包含商品类别、折扣、金额

2. daily_sales_timeseries.csv
   ✓ 销售趋势预测 (ARIMA)
   ✓ 365天连续数据
   ✓ 包含季节性、促销、噪声

3. customer_churn_features.csv
   ✓ 用户流失预测建模
   ✓ 1000个用户，13个特征
   ✓ RFM + 行为 + 人口统计

4. market_basket_transactions.csv
   ✓ 购物篮关联规则挖掘
   ✓ 2000个订单
   ✓ 预设强关联规则
""")
print("💡 特点:")
print("  • 基于真实业务逻辑生成")
print("  • 包含趋势、季节性、噪声")
print("  • 符合实际数据分布")
print("  • 规模适中，便于演示")
print("\n📁 所有文件已保存到: public/datasets/")
print("=" * 60)


