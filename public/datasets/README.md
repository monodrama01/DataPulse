# 📊 真实电商业务数据集

本目录包含**基于真实业务逻辑生成的电商数据集**，用于Jupyter Notebook数据分析演示。

所有数据集都遵循真实的业务场景，包含合理的数据分布、趋势、季节性和噪声，适合用于学习和展示数据分析技能。

---

## 📁 数据集清单

| 文件名 | 对应项目 | 规模 | 大小 | 说明 |
|--------|---------|------|------|------|
| `online_retail_transactions.csv` | **RFM分析** | 2,870行 × 11列 | 264 KB | 在线零售交易明细 |
| `daily_sales_timeseries.csv` | **销售预测** | 730行 × 10列 | 43 KB | 2年日销售时间序列 |
| `customer_churn_features.csv` | **流失预测** | 5,000行 × 27列 | 773 KB | 用户流失特征（26维） |
| `market_basket_transactions.csv` | **关联规则** | 28,010行 × 9列 | 2,218 KB | 购物篮交易（10K订单） |

**总计**: 36,610 条记录，~3.3 MB

---

## 📖 数据集详细说明

### 1️⃣ 在线零售交易数据集

**文件**: `online_retail_transactions.csv`  
**用途**: RFM客户价值分层分析  
**规模**: 2,870笔交易 | 300个客户 | 20种商品

#### 字段说明

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `InvoiceNo` | String | 发票编号 | INV000001 |
| `StockCode` | String | 商品代码 | P0001 |
| `Description` | String | 商品名称 | 手机 |
| `Quantity` | Integer | 购买数量 | 1 |
| `InvoiceDate` | DateTime | 交易时间 | 2023-01-05 14:23:00 |
| `UnitPrice` | Float | 单价（元） | 3999.00 |
| `CustomerID` | String | 客户ID | C00001 |
| `Country` | String | 国家 | China |
| `Category` | String | 商品类别 | 电子产品 |
| `Discount` | Float | 折扣金额（元） | 200.00 |
| `TotalAmount` | Float | 订单总额（元） | 3799.00 |

#### 业务特点

- **客户分层**: 
  - 高价值客户 (10%): 8-20笔交易，高消费
  - 中价值客户 (30%): 3-8笔交易，中等消费
  - 低价值客户 (60%): 1-3笔交易，低消费

- **商品分布**: 5大类别
  - 电子产品: 手机、笔记本、耳机、移动电源等
  - 服装鞋帽: 衬衫、连衣裙、运动鞋、背包
  - 食品饮料: 咖啡豆、茶叶、坚果、巧克力
  - 家居家装: 台灯、床品、沙发、餐具
  - 图书音像: Python书籍、商业分析书等

- **时间范围**: 2023年全年 (365天)

#### 适用分析

✅ RFM模型构建（Recency, Frequency, Monetary）  
✅ 客户生命周期价值分析  
✅ 客户分群与精准营销  
✅ 复购行为分析  
✅ 客户流失预警  

---

### 2️⃣ 日销售时间序列数据集

**文件**: `daily_sales_timeseries.csv`  
**用途**: 销售趋势预测与季节性分解  
**规模**: 730天连续数据（2年完整周期）

#### 字段说明

| 字段 | 类型 | 说明 | 范围 |
|------|------|------|------|
| `date` | Date | 日期 | 2022-01-01 ~ 2023-12-31 |
| `sales_amount` | Float | 日销售额（元） | 25,000 ~ 180,000 |
| `order_count` | Integer | 订单数 | 50 ~ 850 |
| `customer_count` | Integer | 客户数 | 40 ~ 650 |
| `avg_order_value` | Float | 客单价（元） | 计算得出 |
| `conversion_rate` | Float | 转化率 | 0.018 ~ 0.055 |
| `is_promotion` | Integer | 促销标记 | 0/1 |
| `visitor_count` | Integer | **访客数** | 计算得出 |
| `new_customer_count` | Integer | **新客数** | 20-30%客户数 |
| `return_rate` | Float | **退货率** | 0.01 ~ 0.05 |

#### 数据特征

- **长期趋势**: 2年销售额持续上升（年增长率~50%）
- **季节性**: 包含年度和季度双重周期性波动
- **周效应**: 每周7天的销售规律
- **月末效应**: 每月28-31日销售高峰
- **促销影响**: 18个促销日（2年）
  - 大促: 双11、618（销售额+150-250%）
  - 中促: 元旦、情人节、妇女节、五一、815、双12、圣诞节（+30-70%）
- **随机噪声**: 符合真实业务的随机波动（σ=3,500元）

#### 适用分析

✅ ARIMA时间序列预测  
✅ 季节性分解（STL/X-13）  
✅ 趋势分析与增长率计算  
✅ 促销效果评估  
✅ 同比/环比分析  

#### 统计摘要

- **总销售额**: ¥47,664,397（2年）
- **日均销售额**: ¥65,294
- **总订单数**: 173,219笔
- **日均订单**: 237笔
- **峰值销售日**: 双11（销售额可达¥180,000+）
- **促销天数**: 18天（2年）
- **年增长率**: ~50%

---

### 3️⃣ 用户流失特征数据集

**文件**: `customer_churn_features.csv`  
**用途**: 构建流失预测机器学习模型  
**规模**: 5,000个用户 | 26个特征维度

#### 字段说明

| 字段 | 类型 | 说明 | 用途 |
|------|------|------|------|
| `user_id` | String | 用户ID | 主键 |
| **RFM特征** | | | |
| `recency` | Integer | 最近购买距今天数 (1-540天) | RFM-R |
| `frequency` | Integer | 历史购买次数 (1-80次) | RFM-F |
| `monetary` | Float | 累计消费金额 (50-25,000元) | RFM-M |
| **生命周期特征** | | | |
| `tenure_days` | Integer | 用户生命周期 (7-1095天) | 基础特征 |
| **行为特征** | | | |
| `avg_session_duration_min` | Float | 平均会话时长 (0.5-45分钟) | 活跃度 |
| `total_page_views` | Integer | 总浏览页面数 (5-500页) | 互动度 |
| `cart_add_count` | Integer | 加购次数 (0-50次) | 购买意向 |
| `wishlist_count` | Integer | 收藏数 (0-30个) | 兴趣度 |
| `coupon_usage_count` | Integer | 优惠券使用次数 (0-20次) | 价格敏感度 |
| **时间特征** | | | |
| `days_since_last_login` | Integer | 距上次登录天数 | 活跃度 |
| `days_since_last_purchase` | Integer | 距上次购买天数 | 购买时效 |
| `days_since_last_cart` | Integer | 距上次加购天数 | 意向时效 |
| **派生特征** | | | |
| `avg_purchase_value` | Float | 平均客单价（元） | 消费水平 |
| `monthly_purchase_frequency` | Float | 月均购买次数 | 购买频率 |
| `days_per_purchase` | Float | 平均购买间隔（天） | 购买周期 |
| `cart_conversion_rate` | Float | 加购转化率 | 转化能力 |
| `browse_to_buy_rate` | Float | 浏览购买率 | 决策效率 |
| **分类特征** | | | |
| `customer_segment` | String | 客户分群 (6类) | 业务标签 |
| `preferred_category` | String | 偏好品类 (8类) | 品类偏好 |
| `registration_channel` | String | 注册渠道 (6类) | 获客渠道 |
| `age_group` | String | 年龄段 (5类) | 人口统计 |
| `city_tier` | String | 城市等级 (5类) | 地域特征 |
| `device_type` | String | 设备类型 (4类) | 使用习惯 |
| `member_level` | String | 会员等级 (5级) | 价值层级 |
| **目标与风险** | | | |
| `churn_risk_level` | String | 流失风险等级 (高/中/低) | 风险评估 |
| `churned` | Integer | **是否流失（目标变量）** | **0/1** |

#### 流失定义规则

用户被标记为流失（`churned=1`）如果满足以下条件（评分机制）：

```python
churn_score = 0

# R因素（最近购买）
if recency > 270天: churn_score += 5
elif recency > 180天: churn_score += 4
elif recency > 90天: churn_score += 3
elif recency > 60天: churn_score += 2
elif recency > 30天: churn_score += 1

# F因素（购买频次）
if frequency < 2次: churn_score += 4
elif frequency < 5次: churn_score += 3
elif frequency < 10次: churn_score += 2
elif frequency < 20次: churn_score += 1

# M因素（消费金额）
if monetary < 200元: churn_score += 3
elif monetary < 500元: churn_score += 2
elif monetary < 1000元: churn_score += 1

# 行为因素
if avg_session < 3分钟: churn_score += 2
if days_since_last_login > 60天: churn_score += 2
if cart_add_count == 0 and frequency < 3: churn_score += 1
if tenure_days < 30天: churn_score += 1  # 新用户流失风险

# 流失判定
if churn_score >= 8: churned = 1 (100%)
elif churn_score >= 6: churned = 1 (70%概率)
elif churn_score >= 4: churned = 1 (40%概率)
else: churned = 1 (10%概率)
```

*注: 包含概率性判定以模拟真实场景的不确定性*

#### 数据分布

- **流失率**: ~62.3%（实际流失率）
- **风险分布**:
  - 高风险: 17.7% (885人)
  - 中风险: 63.9% (3,197人)
  - 低风险: 18.4% (918人)
- **客户分群**: 新客户、活跃客户、沉睡客户、流失客户、高价值客户、VIP客户（6类）
- **偏好品类**: 电子产品、服装鞋帽、食品饮料、家居家装、图书音像、运动户外、美妆个护、母婴用品（8类）
- **注册渠道**: APP、Web、小程序、线下门店、社交电商、H5（6类）
- **年龄段**: 18-25、26-35、36-45、46-55、55+（5类）
- **城市等级**: 一线、新一线、二线、三线、其他（5类）
- **设备类型**: iOS、Android、Web、其他（4类）
- **会员等级**: VIP、金卡、银卡、铜卡、普通（5级）

#### 适用分析

✅ 二分类模型（Logistic回归、随机森林、XGBoost、LightGBM）  
✅ 特征重要性分析  
✅ 流失预警与干预策略  
✅ 生存分析（Survival Analysis）  
✅ A/B测试（挽回策略效果评估）  

---

### 4️⃣ 购物篮交易数据集

**文件**: `market_basket_transactions.csv`  
**用途**: 商品关联规则挖掘（Apriori / FP-Growth）  
**规模**: 10,000个订单 | 28,010条记录 | 48种商品

#### 字段说明

| 字段 | 类型 | 说明 | 示例/范围 |
|------|------|------|------|
| `order_id` | String | 订单ID | ORD0000001 ~ ORD0010000 |
| `order_datetime` | DateTime | 下单时间（精确到秒） | 2022-01-15 14:23:45 |
| `product_name` | String | 商品名称 | 手机壳 |
| `category` | String | 商品类别（6大类） | 手机配件 |
| `quantity` | Integer | 购买数量 | 1 ~ 4（加权：60%, 25%, 10%, 5%） |
| `unit_price` | Float | 单价（元，含±15%浮动） | 10 ~ 250 |
| `discount` | Float | **折扣金额（20%商品有折扣）** | 0 ~ 30% |
| `total_amount` | Float | 小计（元，扣除折扣后） | 计算得出 |
| `payment_method` | String | **支付方式（5种）** | 支付宝/微信/信用卡/花呗/京东 |

#### 商品关联规则（预设）

以下是数据生成时内置的**强关联规则**，可用于验证算法结果：

| 商品A | 商品B | 支持度 | 置信度 | 说明 |
|-------|-------|--------|--------|------|
| 手机壳 | 钢化膜 | 75% | 高 | 手机配件黄金组合 |
| 充电器 | 数据线 | 68% | 高 | 充电套装 |
| 耳机 | 移动电源 | 55% | 中 | 移动办公套装 |
| 手机壳 | 手机支架 | 42% | 中 | 手机周边 |
| 鼠标 | 键盘 | 82% | 高 | 电脑外设核心组合 |
| 鼠标 | 鼠标垫 | 71% | 高 | 鼠标套装 |
| 笔记本包 | 鼠标 | 50% | 中 | 笔记本配件 |
| U盘 | USB转接头 | 45% | 中 | USB套装 |
| 薯片 | 可乐 | 65% | 高 | 零食饮料组合 |
| 咖啡 | 饼干 | 58% | 中 | 下午茶组合 |
| 巧克力 | 糖果 | 40% | 中 | 甜食组合 |
| 茶叶 | 杯子 | 48% | 中 | 茶具组合 |
| 洗面奶 | 面膜 | 60% | 中 | 护肤套装 |
| 口红 | 香水 | 52% | 中 | 彩妆组合 |
| 洗发水 | 沐浴露 | 70% | 高 | 洗护套装 |
| 护手霜 | 面膜 | 45% | 中 | 护肤品 |
| 瑜伽垫 | 运动水杯 | 55% | 中 | 健身套装 |
| 哑铃 | 健身手套 | 62% | 中 | 力量训练套装 |
| 跳绳 | 运动袜 | 40% | 中 | 有氧运动装备 |
| 毛巾 | 牙刷 | 35% | 中 | 日用品组合 |

**共20组关联规则** - 涵盖6大类别商品

#### 商品分类（6大类，48种商品）

- **手机配件** (8种): 手机壳、钢化膜、充电器、数据线、耳机、移动电源、手机支架、自拍杆
- **电脑配件** (8种): 鼠标、键盘、U盘、鼠标垫、笔记本包、散热器、网线、USB转接头
- **家居用品** (8种): 毛巾、牙刷、杯子、抱枕、拖鞋、衣架、收纳盒、垃圾桶
- **零食饮料** (8种): 薯片、巧克力、饼干、可乐、咖啡、茶叶、坚果、糖果
- **个护美妆** (8种): 洗面奶、面膜、口红、香水、护手霜、沐浴露、洗发水、牙膏
- **运动户外** (8种): 瑜伽垫、跳绳、哑铃、运动水杯、运动袜、护腕、健身手套、运动毛巾

#### 业务规律

- **主类别购买**: 每个订单主要购买1个类别的商品（1-3件）
- **关联购买**: 根据预设关联规则自动添加相关商品
- **跨类别购买**: 30%的订单会购买其他类别商品

#### 适用分析

✅ Apriori算法（支持度、置信度、提升度）  
✅ FP-Growth算法  
✅ 关联规则可视化  
✅ 商品推荐系统  
✅ 货架摆放优化  
✅ 捆绑销售策略  

#### 统计摘要

- **订单数**: 10,000个
- **商品种类**: 48种（6大类）
- **交易记录数**: 28,010条
- **总交易额**: ¥2,407,539
- **平均每单商品数**: 2.80件
- **平均客单价**: ¥240.75
- **折扣订单占比**: ~20%
- **时间跨度**: 2022-01-01 ~ 2023-12-31（2年）

---

## 🎯 数据生成方法论

### 设计原则

1. **真实性**: 遵循真实电商业务逻辑
2. **复杂性**: 包含趋势、季节性、周期、噪声
3. **规模性**: 数据量适中（1K-10K行），便于演示和快速加载
4. **可解释性**: 数据生成规则清晰，结果可预测
5. **多样性**: 涵盖不同的分析场景和算法

### 技术实现

数据集使用纯Python生成（`scripts/generate_realistic_datasets.py`），无需额外依赖库。

**核心算法**:
- 随机数生成: `random` 模块
- 正态分布: `random.gauss()`
- 时间序列: `datetime` + 数学函数模拟趋势/季节性
- 业务规则: if-else逻辑实现客户分层、流失规则、关联规则

---

## 🔧 使用指南

### 在Notebook中查看

1. 打开任意Jupyter Notebook项目
2. 点击顶部的 **"📊 查看数据集"** 按钮
3. 在弹出窗口中浏览完整数据
4. 支持下载CSV文件到本地

### 在Python中加载

```python
import pandas as pd

# 加载RFM分析数据
df_rfm = pd.read_csv('online_retail_transactions.csv')
print(df_rfm.head())
print(df_rfm.info())

# 计算RFM指标
snapshot_date = pd.to_datetime('2024-01-01')
df_rfm['InvoiceDate'] = pd.to_datetime(df_rfm['InvoiceDate'])

rfm = df_rfm.groupby('CustomerID').agg({
    'InvoiceDate': lambda x: (snapshot_date - x.max()).days,  # Recency
    'InvoiceNo': 'nunique',  # Frequency
    'TotalAmount': 'sum'  # Monetary
}).rename(columns={
    'InvoiceDate': 'Recency',
    'InvoiceNo': 'Frequency',
    'TotalAmount': 'Monetary'
})

print(rfm.head())
```

### 在SQL中分析

```sql
-- 加载到MySQL/PostgreSQL
LOAD DATA INFILE 'online_retail_transactions.csv'
INTO TABLE transactions
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- RFM分析查询
SELECT 
    CustomerID,
    DATEDIFF('2024-01-01', MAX(InvoiceDate)) AS Recency,
    COUNT(DISTINCT InvoiceNo) AS Frequency,
    SUM(TotalAmount) AS Monetary
FROM transactions
GROUP BY CustomerID
ORDER BY Monetary DESC;
```

---

## 📚 学习资源

### 推荐阅读

- **RFM分析**: [RFM客户价值模型](https://zhuanlan.zhihu.com/p/61434503)
- **时间序列**: [ARIMA模型完全指南](https://www.statsmodels.org/stable/examples/notebooks/generated/tsa_arma_0.html)
- **流失预测**: [客户流失预测实战](https://towardsdatascience.com/churn-prediction-770d6cb582a5)
- **关联规则**: [Apriori算法详解](https://en.wikipedia.org/wiki/Apriori_algorithm)

### 相关工具

- **数据分析**: Pandas, NumPy, Jupyter
- **可视化**: Matplotlib, Seaborn, Plotly
- **机器学习**: Scikit-learn, XGBoost, LightGBM
- **关联规则**: mlxtend.frequent_patterns

---

## ⚠️ 使用声明

### 数据性质

这些数据集是**模拟生成的演示数据**，用于：
- ✅ 学习数据分析技能
- ✅ 展示分析方法和技术
- ✅ 面试作品集展示
- ✅ 算法验证和原型开发

**不适用于**:
- ❌ 学术研究论文
- ❌ 商业决策依据
- ❌ 生产环境应用

### 数据质量

虽然数据基于真实业务逻辑生成，但仍存在以下局限：
- 数据规模较小（用于演示）
- 特征维度有限
- 缺少真实世界的复杂异常情况
- 关联规则可能过于理想化

### 许可说明

这些数据集完全由我生成，不包含任何真实用户或企业信息，可自由用于学习和展示目的。

---

## 🔄 更新日志

**2023-10-05**
- 🎉 创建4个真实规模的电商数据集
- ✨ 包含RFM、时间序列、流失预测、购物篮分析
- 📊 总计10,368条记录，~713KB
- 🔧 支持在线查看和下载

---

## 📞 反馈与建议

如果您对数据集有任何建议或发现问题，欢迎反馈！

**生成脚本**: `scripts/generate_realistic_datasets.py`

---

*最后更新: 2023年10月5日*
