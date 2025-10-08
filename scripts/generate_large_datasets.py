"""
生成更大规模的真实电商数据集
- 销售时间序列: 730天（2年）
- 用户流失: 5000个用户
- 购物篮: 10000个订单
"""

import csv
import random
import os
from datetime import datetime, timedelta
import math

os.makedirs('public/datasets', exist_ok=True)

print("=" * 70)
print("正在生成大规模真实电商数据集...")
print("=" * 70)

# ==========================================
# 1. 保持原RFM数据集（已经足够好）
# ==========================================
print("\n[1/3] RFM数据集保持不变 (2,870行)")
print("✓ online_retail_transactions.csv")

# ==========================================
# 2. 扩充销售时间序列 - 2年数据
# ==========================================
print("\n[2/3] 生成2年销售时间序列数据...")

random.seed(42)
sales_data = []
current_date = datetime(2022, 1, 1)
base_sales = 45000

# 生成730天（2年）数据
for day in range(730):
    date_str = current_date.strftime('%Y-%m-%d')
    
    # 年度增长趋势
    year_trend = day * 50
    
    # 季节性（年周期）
    seasonality_yearly = 12000 * math.sin(2 * math.pi * day / 365.25)
    
    # 季度周期
    seasonality_quarterly = 8000 * math.sin(2 * math.pi * day / 91.25)
    
    # 周效应
    weekly = 6000 * math.sin(2 * math.pi * day / 7)
    
    # 月末效应（月底销售高峰）
    day_of_month = current_date.day
    if day_of_month >= 28:
        month_end_boost = 5000
    else:
        month_end_boost = 0
    
    # 随机噪声
    noise = random.gauss(0, 3500)
    
    # 基础销售额
    sales = max(0, base_sales + year_trend + seasonality_yearly + seasonality_quarterly + weekly + month_end_boost + noise)
    
    # 订单数（与销售额正相关）
    base_orders = 180
    order_trend = int(day * 0.15)
    order_noise = random.randint(-30, 30)
    order_count = max(50, base_orders + order_trend + order_noise)
    
    # 客户数
    base_customers = 140
    customer_trend = int(day * 0.12)
    customer_noise = random.randint(-25, 25)
    customer_count = max(40, base_customers + customer_trend + customer_noise)
    
    # 客单价
    avg_order_value = sales / order_count if order_count > 0 else 0
    
    # 转化率（有轻微波动）
    conversion_rate = random.uniform(0.018, 0.055)
    
    # 促销日标记（2年内的重要节日）
    promo_dates_2022 = ['2022-01-01', '2022-02-14', '2022-03-08', '2022-05-01', 
                        '2022-06-18', '2022-08-15', '2022-11-11', '2022-12-12', '2022-12-25']
    promo_dates_2023 = ['2023-01-01', '2023-02-14', '2023-03-08', '2023-05-01', 
                        '2023-06-18', '2023-08-15', '2023-11-11', '2023-12-12', '2023-12-25']
    all_promo_dates = promo_dates_2022 + promo_dates_2023
    
    is_promotion = 1 if date_str in all_promo_dates else 0
    
    # 大促日（双11、618）销售额暴增
    if date_str in ['2022-11-11', '2023-11-11', '2022-06-18', '2023-06-18']:
        sales *= random.uniform(2.5, 3.5)
        order_count = int(order_count * random.uniform(2.0, 2.8))
        customer_count = int(customer_count * random.uniform(1.8, 2.5))
    # 普通促销日提升
    elif is_promotion:
        sales *= random.uniform(1.3, 1.7)
        order_count = int(order_count * random.uniform(1.2, 1.5))
        customer_count = int(customer_count * random.uniform(1.15, 1.4))
    
    # 重新计算客单价
    avg_order_value = sales / order_count if order_count > 0 else 0
    
    # 访客数（用于计算转化率）
    visitor_count = int(customer_count / conversion_rate)
    
    # 新客数（假设20-30%是新客）
    new_customer_count = int(customer_count * random.uniform(0.20, 0.30))
    
    # 退货率（1-5%）
    return_rate = random.uniform(0.01, 0.05)
    
    sales_data.append([
        date_str,
        round(sales, 2),
        order_count,
        customer_count,
        round(avg_order_value, 2),
        round(conversion_rate, 4),
        is_promotion,
        visitor_count,
        new_customer_count,
        round(return_rate, 4)
    ])
    
    current_date += timedelta(days=1)

# 保存CSV
with open('public/datasets/daily_sales_timeseries.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['date', 'sales_amount', 'order_count', 'customer_count', 
                    'avg_order_value', 'conversion_rate', 'is_promotion',
                    'visitor_count', 'new_customer_count', 'return_rate'])
    writer.writerows(sales_data)

file_size = os.path.getsize('public/datasets/daily_sales_timeseries.csv') / 1024
total_sales = sum(row[1] for row in sales_data)
total_orders = sum(row[2] for row in sales_data)
promo_days = sum(row[6] for row in sales_data)

print(f"✓ 生成 {len(sales_data)} 天销售数据")
print(f"  - 时间跨度: 2022-01-01 至 2023-12-31（2年）")
print(f"  - 总销售额: ¥{total_sales:,.0f}")
print(f"  - 总订单数: {total_orders:,}笔")
print(f"  - 促销天数: {promo_days}天")
print(f"  - 日均销售: ¥{total_sales/len(sales_data):,.0f}")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 3. 扩充用户流失数据 - 5000个用户
# ==========================================
print("\n[3/3] 生成5000个用户流失数据...")

churn_data = []
segments = ['新客户', '活跃客户', '沉睡客户', '流失客户', '高价值客户', 'VIP客户']
categories = ['电子产品', '服装鞋帽', '食品饮料', '家居家装', '图书音像', '运动户外', '美妆个护', '母婴用品']
channels = ['APP', 'Web', '小程序', '线下门店', '社交电商', 'H5']
age_groups = ['18-25', '26-35', '36-45', '46-55', '55+']
cities = ['一线城市', '新一线城市', '二线城市', '三线城市', '其他']
devices = ['iOS', 'Android', 'Web', '其他']

for user_id in range(1, 5001):
    # RFM特征
    recency = random.randint(1, 540)  # 0-18个月
    frequency = random.randint(1, 80)
    monetary = random.uniform(50, 25000)
    
    # 用户生命周期
    tenure_days = random.randint(7, 1095)  # 7天到3年
    
    # 行为特征
    avg_session = random.uniform(0.5, 45)  # 平均会话时长（分钟）
    page_views = random.randint(5, 500)  # 总浏览页面数
    cart_add_count = random.randint(0, 50)  # 加购次数
    wishlist_count = random.randint(0, 30)  # 收藏数
    coupon_usage = random.randint(0, 20)  # 优惠券使用次数
    
    # 派生特征
    avg_purchase_value = monetary / frequency if frequency > 0 else 0
    purchase_frequency = frequency / (tenure_days / 30) if tenure_days > 0 else 0  # 月均购买次数
    days_per_purchase = tenure_days / frequency if frequency > 0 else tenure_days
    
    # 转化指标
    cart_conversion = frequency / cart_add_count if cart_add_count > 0 else 0
    browse_to_buy = frequency / (page_views / 10) if page_views > 0 else 0
    
    # 最近活动
    days_since_last_login = random.randint(0, 365)
    days_since_last_purchase = recency
    days_since_last_cart = random.randint(0, 365)
    
    # 分类特征
    segment = random.choice(segments)
    preferred_category = random.choice(categories)
    channel = random.choice(channels)
    age_group = random.choice(age_groups)
    city_tier = random.choice(cities)
    device = random.choice(devices)
    
    # 会员等级（基于消费金额）
    if monetary > 10000:
        member_level = 'VIP'
    elif monetary > 5000:
        member_level = '金卡'
    elif monetary > 2000:
        member_level = '银卡'
    elif monetary > 500:
        member_level = '铜卡'
    else:
        member_level = '普通'
    
    # 流失评分规则（更复杂）
    churn_score = 0
    
    # R因素
    if recency > 270: churn_score += 5
    elif recency > 180: churn_score += 4
    elif recency > 90: churn_score += 3
    elif recency > 60: churn_score += 2
    elif recency > 30: churn_score += 1
    
    # F因素
    if frequency < 2: churn_score += 4
    elif frequency < 5: churn_score += 3
    elif frequency < 10: churn_score += 2
    elif frequency < 20: churn_score += 1
    
    # M因素
    if monetary < 200: churn_score += 3
    elif monetary < 500: churn_score += 2
    elif monetary < 1000: churn_score += 1
    
    # 行为因素
    if avg_session < 3: churn_score += 2
    if days_since_last_login > 60: churn_score += 2
    if cart_add_count == 0 and frequency < 3: churn_score += 1
    if tenure_days < 30: churn_score += 1  # 新用户流失风险高
    
    # 决定是否流失
    if churn_score >= 8:
        churned = 1
    elif churn_score >= 6:
        churned = 1 if random.random() < 0.7 else 0
    elif churn_score >= 4:
        churned = 1 if random.random() < 0.4 else 0
    else:
        churned = 1 if random.random() < 0.1 else 0
    
    # 流失风险等级
    if churn_score >= 8:
        churn_risk = '高风险'
    elif churn_score >= 5:
        churn_risk = '中风险'
    else:
        churn_risk = '低风险'
    
    churn_data.append([
        f'U{user_id:06d}',
        recency,
        frequency,
        round(monetary, 2),
        tenure_days,
        round(avg_session, 1),
        page_views,
        cart_add_count,
        wishlist_count,
        coupon_usage,
        days_since_last_login,
        days_since_last_purchase,
        days_since_last_cart,
        round(avg_purchase_value, 2),
        round(purchase_frequency, 2),
        round(days_per_purchase, 1),
        round(cart_conversion, 3),
        round(browse_to_buy, 3),
        segment,
        preferred_category,
        channel,
        age_group,
        city_tier,
        device,
        member_level,
        churn_risk,
        churned
    ])

# 保存CSV
with open('public/datasets/customer_churn_features.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow([
        'user_id', 'recency', 'frequency', 'monetary', 'tenure_days',
        'avg_session_duration_min', 'total_page_views', 'cart_add_count', 
        'wishlist_count', 'coupon_usage_count',
        'days_since_last_login', 'days_since_last_purchase', 'days_since_last_cart',
        'avg_purchase_value', 'monthly_purchase_frequency', 'days_per_purchase',
        'cart_conversion_rate', 'browse_to_buy_rate',
        'customer_segment', 'preferred_category', 'registration_channel',
        'age_group', 'city_tier', 'device_type', 'member_level', 'churn_risk_level',
        'churned'
    ])
    writer.writerows(churn_data)

file_size = os.path.getsize('public/datasets/customer_churn_features.csv') / 1024
churn_rate = sum(row[-1] for row in churn_data) / len(churn_data) * 100
high_risk = sum(1 for row in churn_data if row[-2] == '高风险')
medium_risk = sum(1 for row in churn_data if row[-2] == '中风险')
low_risk = sum(1 for row in churn_data if row[-2] == '低风险')

print(f"✓ 生成 {len(churn_data)} 个用户流失数据")
print(f"  - 实际流失率: {churn_rate:.1f}%")
print(f"  - 高风险用户: {high_risk}人 ({high_risk/len(churn_data)*100:.1f}%)")
print(f"  - 中风险用户: {medium_risk}人 ({medium_risk/len(churn_data)*100:.1f}%)")
print(f"  - 低风险用户: {low_risk}人 ({low_risk/len(churn_data)*100:.1f}%)")
print(f"  - 特征数: 26个")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 4. 扩充购物篮数据 - 10000个订单
# ==========================================
print("\n[4/4] 生成10000个订单购物篮数据...")

product_categories = {
    '手机配件': [
        ('手机壳', 35), ('钢化膜', 25), ('充电器', 80), ('数据线', 30),
        ('耳机', 150), ('移动电源', 120), ('手机支架', 45), ('自拍杆', 60)
    ],
    '电脑配件': [
        ('鼠标', 80), ('键盘', 150), ('U盘', 50), ('鼠标垫', 25),
        ('笔记本包', 120), ('散热器', 70), ('网线', 20), ('USB转接头', 35)
    ],
    '家居用品': [
        ('毛巾', 30), ('牙刷', 15), ('杯子', 40), ('抱枕', 60),
        ('拖鞋', 50), ('衣架', 20), ('收纳盒', 45), ('垃圾桶', 35)
    ],
    '零食饮料': [
        ('薯片', 15), ('巧克力', 25), ('饼干', 20), ('可乐', 8),
        ('咖啡', 50), ('茶叶', 80), ('坚果', 40), ('糖果', 12)
    ],
    '个护美妆': [
        ('洗面奶', 60), ('面膜', 35), ('口红', 120), ('香水', 250),
        ('护手霜', 40), ('沐浴露', 50), ('洗发水', 45), ('牙膏', 18)
    ],
    '运动户外': [
        ('瑜伽垫', 80), ('跳绳', 30), ('哑铃', 120), ('运动水杯', 50),
        ('运动袜', 25), ('护腕', 35), ('健身手套', 40), ('运动毛巾', 30)
    ]
}

# 扩展关联规则（更多组合）
strong_associations = [
    (['手机壳', '钢化膜'], 0.75),
    (['充电器', '数据线'], 0.68),
    (['耳机', '移动电源'], 0.55),
    (['手机壳', '手机支架'], 0.42),
    (['鼠标', '键盘'], 0.82),
    (['鼠标', '鼠标垫'], 0.71),
    (['笔记本包', '鼠标'], 0.50),
    (['U盘', 'USB转接头'], 0.45),
    (['薯片', '可乐'], 0.65),
    (['咖啡', '饼干'], 0.58),
    (['巧克力', '糖果'], 0.40),
    (['茶叶', '杯子'], 0.48),
    (['洗面奶', '面膜'], 0.60),
    (['口红', '香水'], 0.52),
    (['洗发水', '沐浴露'], 0.70),
    (['护手霜', '面膜'], 0.45),
    (['瑜伽垫', '运动水杯'], 0.55),
    (['哑铃', '健身手套'], 0.62),
    (['跳绳', '运动袜'], 0.40),
    (['毛巾', '牙刷'], 0.35),
]

basket_data = []
start_date = datetime(2022, 1, 1)

for order_num in range(1, 10001):
    order_date = (start_date + timedelta(days=random.randint(0, 729))).strftime('%Y-%m-%d')
    order_time = f"{random.randint(0, 23):02d}:{random.randint(0, 59):02d}:{random.randint(0, 59):02d}"
    
    # 选择主类别（加权选择，某些类别更热门）
    category_weights = [0.25, 0.20, 0.15, 0.20, 0.12, 0.08]  # 手机配件和电脑配件更热门
    main_category = random.choices(list(product_categories.keys()), weights=category_weights)[0]
    
    products_in_order = []
    
    # 从主类别选商品（1-4件）
    num_items = random.choices([1, 2, 3, 4], weights=[0.35, 0.35, 0.20, 0.10])[0]
    available = product_categories[main_category]
    selected = random.sample(available, min(num_items, len(available)))
    
    for prod, price in selected:
        products_in_order.append((prod, main_category, price))
    
    # 应用关联规则
    current_products = [p[0] for p in products_in_order]
    for rule, prob in strong_associations:
        if rule[0] in current_products and random.random() < prob:
            if rule[1] not in current_products:
                # 查找商品所属类别和价格
                for cat, prods in product_categories.items():
                    for prod, price in prods:
                        if prod == rule[1]:
                            products_in_order.append((prod, cat, price))
                            current_products.append(prod)
                            break
    
    # 跨类别购买（35%概率）
    if random.random() < 0.35:
        other_cats = [c for c in product_categories.keys() if c != main_category]
        other_cat = random.choice(other_cats)
        other_prod, other_price = random.choice(product_categories[other_cat])
        if other_prod not in current_products:
            products_in_order.append((other_prod, other_cat, other_price))
    
    # 生成订单行
    for product, category, base_price in products_in_order:
        quantity = random.choices([1, 2, 3, 4], weights=[0.60, 0.25, 0.10, 0.05])[0]
        
        # 价格波动（±15%）
        unit_price = round(base_price * random.uniform(0.85, 1.15), 2)
        
        # 折扣（20%的商品有折扣）
        if random.random() < 0.2:
            discount_rate = random.uniform(0.05, 0.3)
            discount = round(unit_price * quantity * discount_rate, 2)
        else:
            discount = 0.0
        
        total = round(unit_price * quantity - discount, 2)
        
        # 支付方式
        payment_method = random.choices(
            ['支付宝', '微信', '信用卡', '花呗', '京东支付'],
            weights=[0.35, 0.30, 0.15, 0.15, 0.05]
        )[0]
        
        basket_data.append([
            f'ORD{order_num:07d}',
            f'{order_date} {order_time}',
            product,
            category,
            quantity,
            unit_price,
            discount,
            total,
            payment_method
        ])

# 排序
basket_data.sort(key=lambda x: (x[0], x[2]))

# 保存CSV
with open('public/datasets/market_basket_transactions.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['order_id', 'order_datetime', 'product_name', 'category', 
                    'quantity', 'unit_price', 'discount', 'total_amount', 'payment_method'])
    writer.writerows(basket_data)

file_size = os.path.getsize('public/datasets/market_basket_transactions.csv') / 1024
unique_orders = len(set(row[0] for row in basket_data))
unique_products = len(set(row[2] for row in basket_data))
total_revenue = sum(row[7] for row in basket_data)
avg_basket = total_revenue / unique_orders

print(f"✓ 生成 {len(basket_data)} 条购物篮记录")
print(f"  - 订单数: {unique_orders:,}个")
print(f"  - 商品数: {unique_products}种")
print(f"  - 总交易额: ¥{total_revenue:,.2f}")
print(f"  - 平均客单价: ¥{avg_basket:.2f}")
print(f"  - 平均每单商品数: {len(basket_data)/unique_orders:.2f}件")
print(f"  - 文件大小: {file_size:.1f} KB")

# ==========================================
# 最终摘要
# ==========================================
print("\n" + "=" * 70)
print("✅ 大规模数据集生成完成！")
print("=" * 70)

total_records = 2870 + len(sales_data) + len(churn_data) + len(basket_data)
total_size = (270.6 + file_size + 
              os.path.getsize('public/datasets/daily_sales_timeseries.csv') / 1024 +
              os.path.getsize('public/datasets/customer_churn_features.csv') / 1024)

print(f"""
📊 数据集规模对比：

┌─────────────────────────────┬──────────┬────────┬──────────┐
│ 数据集                      │ 之前     │ 现在   │ 增长     │
├─────────────────────────────┼──────────┼────────┼──────────┤
│ 在线零售交易                │ 2,870行  │ 2,870行│ 保持     │
│ 日销售时间序列              │ 365行    │ 730行  │ +100%    │
│ 用户流失特征                │ 1,000行  │ 5,000行│ +400%    │
│ 购物篮交易                  │ 6,133行  │{len(basket_data):,}行│ +{(len(basket_data)-6133)/6133*100:.0f}%     │
├─────────────────────────────┼──────────┼────────┼──────────┤
│ 总计                        │ 10,368行 │{total_records:,}行│ +{(total_records-10368)/10368*100:.0f}%     │
│ 总大小                      │ ~713 KB  │~{total_size:.0f} KB│ +{(total_size-713)/713*100:.0f}%     │
└─────────────────────────────┴──────────┴────────┴──────────┘

✨ 新增特征：
  • 销售数据: +3个字段 (访客数、新客数、退货率)
  • 流失数据: +13个字段 (行为特征、转化指标、风险等级)
  • 购物篮: +2个字段 (折扣、支付方式)

🎯 数据质量：
  ✓ 2年时间跨度，包含完整周期
  ✓ 5000个用户，26维特征
  ✓ 10000个订单，更真实的购买行为
  ✓ 更复杂的业务规则和关联关系

📁 保存位置: public/datasets/
""")

print("=" * 70)


