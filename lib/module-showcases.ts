// 各模块Showcases的通用数据结构

import { MindMapNode } from "./showcases"

export interface CodeBlock {
  id: string
  language: 'python' | 'sql' | 'javascript' | 'r' | 'bash'
  title: string
  description: string
  code: string
  output?: string
  explanation?: string
}

export interface ChartData {
  id: string
  type: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap' | 'dashboard'
  title: string
  description: string
  data: any
  config?: any
  insights?: string[]
}

export interface FlowChart {
  id: string
  title: string
  description: string
  nodes: FlowNode[]
  connections: FlowConnection[]
}

export interface FlowNode {
  id: string
  text: string
  type: 'start' | 'process' | 'decision' | 'end' | 'data'
  x: number
  y: number
  width?: number
  height?: number
  color?: string
}

export interface FlowConnection {
  from: string
  to: string
  label?: string
}

export interface ModuleShowcase {
  id: string
  moduleType: 'business' | 'excel' | 'python' | 'sql' | 'ml' | 'visualization' | 'statistics' | 'automation'
  title: string
  category: string
  industry: string
  problem: string
  businessContext: string
  solution: string
  keyPoints: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  
  // 不同类型的展示内容
  mindMapData?: MindMapNode
  flowChart?: FlowChart
  codeBlocks?: CodeBlock[]
  charts?: ChartData[]
  dashboardUrl?: string
  
  // 分析结果
  results?: {
    metrics: { name: string; value: string; change?: string }[]
    insights: string[]
    recommendations: string[]
  }
}

// ==================== 业务知识模块 ====================
export const businessShowcases: ModuleShowcase[] = [
  {
    id: 'customer-lifecycle-management',
    moduleType: 'business',
    title: '客户生命周期管理体系',
    category: '客户管理',
    industry: 'SaaS软件',
    problem: '客户流失率高达35%，需要建立完整的客户生命周期管理体系来提升客户价值',
    businessContext: 'B2B SaaS公司，客户主要是中小企业，客户生命周期复杂，从试用到付费到续费各环节都有流失',
    solution: '构建客户生命周期管理框架，通过数据驱动的方式优化各个环节',
    keyPoints: [
      '客户分层管理策略',
      '生命周期各阶段关键指标',
      '客户健康度评分模型',
      '流失预警机制',
      '客户成功干预策略'
    ],
    difficulty: 'advanced',
    tags: ['客户管理', '生命周期', 'SaaS', '客户成功'],
    mindMapData: {
      id: 'root',
      text: '客户生命周期管理',
      isRoot: true,
      color: '#2563EB',
      children: [
        {
          id: 'acquisition',
          text: '客户获取',
          color: '#059669',
          children: [
            { id: 'lead-gen', text: '线索生成', color: '#86EFAC' },
            { id: 'qualification', text: '资格认证', color: '#86EFAC' },
            { id: 'trial', text: '试用转化', color: '#86EFAC' }
          ]
        },
        {
          id: 'onboarding',
          text: '客户激活',
          color: '#7C3AED',
          children: [
            { id: 'setup', text: '产品设置', color: '#C4B5FD' },
            { id: 'training', text: '使用培训', color: '#C4B5FD' },
            { id: 'first-value', text: '首次价值实现', color: '#C4B5FD' }
          ]
        },
        {
          id: 'growth',
          text: '客户增长',
          color: '#EA580C',
          children: [
            { id: 'expansion', text: '业务扩展', color: '#FED7AA' },
            { id: 'upsell', text: '产品升级', color: '#FED7AA' },
            { id: 'cross-sell', text: '交叉销售', color: '#FED7AA' }
          ]
        },
        {
          id: 'retention',
          text: '客户保留',
          color: '#DC2626',
          children: [
            { id: 'health-score', text: '健康度监控', color: '#FCA5A5' },
            { id: 'renewal', text: '续费管理', color: '#FCA5A5' },
            { id: 'win-back', text: '流失挽回', color: '#FCA5A5' }
          ]
        }
      ]
    },
    results: {
      metrics: [
        { name: '客户流失率', value: '23%', change: '-12%' },
        { name: '客户LTV', value: '$45,600', change: '+28%' },
        { name: '净推荐值', value: '67', change: '+15' }
      ],
      insights: [
        '通过生命周期管理，客户流失率从35%降至23%',
        '客户健康度评分准确率达到85%，提前预警流失风险',
        '激活阶段优化后，试用转付费率提升40%'
      ],
      recommendations: [
        '建立客户成功团队，专门负责高价值客户管理',
        '完善客户健康度评分模型，增加产品使用深度指标',
        '自动化客户旅程触发机制，提升运营效率'
      ]
    }
  },
  {
    id: 'market-positioning-analysis',
    moduleType: 'business',
    title: '市场定位与竞争分析',
    category: '市场分析',
    industry: '消费品',
    problem: '新产品市场定位不清晰，需要通过竞争分析找到差异化定位策略',
    businessContext: '消费品公司准备推出新的健康食品，面临激烈竞争，需要找到合适的市场定位',
    solution: '运用市场分析框架，通过竞争对手分析、消费者洞察等方法确定最优市场定位',
    keyPoints: [
      '竞争格局分析',
      '目标客户画像',
      '产品差异化策略',
      '定价策略制定',
      '营销渠道选择'
    ],
    difficulty: 'intermediate',
    tags: ['市场定位', '竞争分析', '消费品', '品牌策略'],
    mindMapData: {
      id: 'root',
      text: '市场定位分析',
      isRoot: true,
      color: '#7C3AED',
      children: [
        {
          id: 'market-research',
          text: '市场研究',
          color: '#059669',
          children: [
            { id: 'market-size', text: '市场规模', color: '#86EFAC' },
            { id: 'growth-trend', text: '增长趋势', color: '#86EFAC' },
            { id: 'consumer-behavior', text: '消费行为', color: '#86EFAC' }
          ]
        },
        {
          id: 'competitor-analysis',
          text: '竞争分析',
          color: '#DC2626',
          children: [
            { id: 'direct-competitors', text: '直接竞争', color: '#FCA5A5' },
            { id: 'indirect-competitors', text: '间接竞争', color: '#FCA5A5' },
            { id: 'swot-analysis', text: 'SWOT分析', color: '#FCA5A5' }
          ]
        },
        {
          id: 'positioning',
          text: '定位策略',
          color: '#EA580C',
          children: [
            { id: 'target-segment', text: '目标细分', color: '#FED7AA' },
            { id: 'value-proposition', text: '价值主张', color: '#FED7AA' },
            { id: 'differentiation', text: '差异化', color: '#FED7AA' }
          ]
        }
      ]
    }
  }
]

// ==================== Excel模块 ====================
export const excelShowcases: ModuleShowcase[] = [
  {
    id: 'financial-dashboard-excel',
    moduleType: 'excel',
    title: 'Excel财务分析看板',
    category: '财务分析',
    industry: '制造业',
    problem: '财务数据分散在多个系统中，需要建立统一的Excel分析看板进行财务监控',
    businessContext: '中型制造企业，财务数据来源复杂，包括ERP、CRM、Excel等系统，需要整合分析',
    solution: '使用Excel高级功能构建动态财务分析看板，实现数据自动化处理和可视化展示',
    keyPoints: [
      'Power Query数据整合',
      '数据透视表动态分析',
      'VBA自动化处理',
      '动态图表展示',
      '财务指标监控'
    ],
    difficulty: 'advanced',
    tags: ['Excel', '财务分析', 'Power Query', 'VBA', '看板'],
    flowChart: {
      id: 'excel-financial-flow',
      title: 'Excel财务分析流程',
      description: '从数据收集到报告生成的完整Excel处理流程',
      nodes: [
        { id: 'start', text: '开始', type: 'start', x: 100, y: 50, color: '#22C55E' },
        { id: 'collect', text: '数据收集\n(多源系统)', type: 'data', x: 100, y: 150, color: '#3B82F6' },
        { id: 'clean', text: 'Power Query\n数据清洗', type: 'process', x: 100, y: 250, color: '#8B5CF6' },
        { id: 'model', text: '数据建模\n透视表分析', type: 'process', x: 100, y: 350, color: '#8B5CF6' },
        { id: 'visualize', text: '图表可视化\n动态看板', type: 'process', x: 100, y: 450, color: '#F59E0B' },
        { id: 'automate', text: 'VBA自动化\n报告生成', type: 'process', x: 100, y: 550, color: '#EF4444' },
        { id: 'end', text: '财务报告', type: 'end', x: 100, y: 650, color: '#22C55E' }
      ],
      connections: [
        { from: 'start', to: 'collect' },
        { from: 'collect', to: 'clean' },
        { from: 'clean', to: 'model' },
        { from: 'model', to: 'visualize' },
        { from: 'visualize', to: 'automate' },
        { from: 'automate', to: 'end' }
      ]
    },
    results: {
      metrics: [
        { name: '报告生成时间', value: '30分钟', change: '-75%' },
        { name: '数据准确率', value: '99.5%', change: '+5%' },
        { name: '分析效率', value: '提升3倍', change: '+200%' }
      ],
      insights: [
        'Power Query自动化数据整合，减少90%手工操作',
        '动态透视表实现多维度分析，提升决策效率',
        'VBA自动化报告生成，从2小时缩短至30分钟'
      ],
      recommendations: [
        '建立标准化的数据接口，进一步提升自动化程度',
        '培训更多员工掌握Excel高级功能',
        '考虑升级到Power BI实现更强大的分析功能'
      ]
    }
  }
]

// ==================== SQL模块 ====================
export const sqlShowcases: ModuleShowcase[] = [
  {
    id: 'ecommerce-sql-analysis',
    moduleType: 'sql',
    title: '电商数据SQL深度分析',
    category: '数据查询',
    industry: '电商平台',
    problem: '电商平台需要通过SQL查询分析用户行为、销售趋势、商品表现等关键业务指标',
    businessContext: '大型电商平台拥有用户、订单、商品、支付等多个数据表，需要通过复杂SQL查询获得业务洞察',
    solution: '使用高级SQL技术进行多维度数据分析，包括窗口函数、CTE、子查询等',
    keyPoints: [
      '复杂多表关联查询',
      '窗口函数应用',
      'CTE递归查询',
      '数据透视分析',
      '性能优化技巧'
    ],
    difficulty: 'advanced',
    tags: ['SQL', '数据分析', '电商', '窗口函数', 'MySQL'],
    codeBlocks: [
      {
        id: 'user-behavior-analysis',
        language: 'sql',
        title: '用户行为漏斗分析',
        description: '分析用户从浏览到购买的完整转化漏斗',
        code: `-- 用户行为漏斗分析
WITH user_funnel AS (
    SELECT 
        u.user_id,
        u.register_date,
        -- 浏览行为
        COUNT(DISTINCT pv.product_id) as products_viewed,
        -- 加购行为  
        COUNT(DISTINCT c.product_id) as products_added_to_cart,
        -- 下单行为
        COUNT(DISTINCT o.order_id) as orders_placed,
        -- 支付行为
        COUNT(DISTINCT p.payment_id) as payments_completed
    FROM users u
    LEFT JOIN product_views pv ON u.user_id = pv.user_id 
        AND pv.view_date >= u.register_date
    LEFT JOIN cart_items c ON u.user_id = c.user_id
        AND c.created_at >= u.register_date  
    LEFT JOIN orders o ON u.user_id = o.user_id
        AND o.order_date >= u.register_date
    LEFT JOIN payments p ON o.order_id = p.order_id
        AND p.status = 'completed'
    WHERE u.register_date >= '2024-01-01'
    GROUP BY u.user_id, u.register_date
),
funnel_summary AS (
    SELECT 
        '1. 注册用户' as stage,
        COUNT(*) as user_count,
        100.0 as conversion_rate
    FROM user_funnel
    
    UNION ALL
    
    SELECT 
        '2. 浏览商品' as stage,
        COUNT(*) as user_count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_funnel), 2) as conversion_rate
    FROM user_funnel 
    WHERE products_viewed > 0
    
    UNION ALL
    
    SELECT 
        '3. 加入购物车' as stage,
        COUNT(*) as user_count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_funnel), 2) as conversion_rate
    FROM user_funnel 
    WHERE products_added_to_cart > 0
    
    UNION ALL
    
    SELECT 
        '4. 下单' as stage,
        COUNT(*) as user_count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_funnel), 2) as conversion_rate
    FROM user_funnel 
    WHERE orders_placed > 0
    
    UNION ALL
    
    SELECT 
        '5. 完成支付' as stage,
        COUNT(*) as user_count,
        ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_funnel), 2) as conversion_rate
    FROM user_funnel 
    WHERE payments_completed > 0
)
SELECT 
    stage,
    user_count,
    conversion_rate,
    LAG(user_count) OVER (ORDER BY stage) as prev_stage_count,
    CASE 
        WHEN LAG(user_count) OVER (ORDER BY stage) IS NOT NULL 
        THEN ROUND(user_count * 100.0 / LAG(user_count) OVER (ORDER BY stage), 2)
        ELSE 100.0 
    END as step_conversion_rate
FROM funnel_summary
ORDER BY stage;`,
        output: `stage                user_count  conversion_rate  prev_stage_count  step_conversion_rate
1. 注册用户          50000       100.00          NULL             100.00
2. 浏览商品          42500       85.00           50000            85.00
3. 加入购物车        18700       37.40           42500            44.00
4. 下单             12450       24.90           18700            66.58
5. 完成支付         11205       22.41           12450            90.00`,
        explanation: '通过CTE和窗口函数分析用户转化漏斗，发现从浏览到加购的转化率偏低，需要优化商品推荐'
      },
      {
        id: 'cohort-retention-analysis',
        language: 'sql',
        title: '用户留存率队列分析',
        description: '按注册时间队列分析用户留存情况',
        code: `-- 用户留存率队列分析
WITH user_cohorts AS (
    SELECT 
        user_id,
        DATE_FORMAT(register_date, '%Y-%m') as cohort_month,
        register_date
    FROM users
    WHERE register_date >= '2024-01-01'
),
user_activities AS (
    SELECT 
        uc.user_id,
        uc.cohort_month,
        uc.register_date,
        DATE_FORMAT(o.order_date, '%Y-%m') as activity_month,
        o.order_date
    FROM user_cohorts uc
    LEFT JOIN orders o ON uc.user_id = o.user_id
    WHERE o.order_date IS NOT NULL
),
cohort_data AS (
    SELECT 
        cohort_month,
        activity_month,
        COUNT(DISTINCT user_id) as active_users,
        TIMESTAMPDIFF(MONTH, 
            STR_TO_DATE(CONCAT(cohort_month, '-01'), '%Y-%m-%d'),
            STR_TO_DATE(CONCAT(activity_month, '-01'), '%Y-%m-%d')
        ) as period_number
    FROM user_activities
    GROUP BY cohort_month, activity_month
),
cohort_sizes AS (
    SELECT 
        cohort_month,
        COUNT(DISTINCT user_id) as cohort_size
    FROM user_cohorts
    GROUP BY cohort_month
)
SELECT 
    cd.cohort_month,
    cs.cohort_size,
    cd.period_number,
    cd.activity_month,
    cd.active_users,
    ROUND(cd.active_users * 100.0 / cs.cohort_size, 2) as retention_rate
FROM cohort_data cd
JOIN cohort_sizes cs ON cd.cohort_month = cs.cohort_month
WHERE cd.period_number <= 12  -- 分析12个月的留存
ORDER BY cd.cohort_month, cd.period_number;`,
        output: `cohort_month  cohort_size  period_number  activity_month  active_users  retention_rate
2024-01       5230         0             2024-01         5230          100.00
2024-01       5230         1             2024-02         3145          60.12
2024-01       5230         2             2024-03         2356          45.05
2024-01       5230         3             2024-04         1987          37.99
2024-02       4890         0             2024-02         4890          100.00
2024-02       4890         1             2024-03         2934          60.00
2024-02       4890         2             2024-04         2201          45.01`,
        explanation: '队列分析显示用户在第2个月留存率约60%，第3个月降至45%，需要加强用户激活策略'
      },
      {
        id: 'sales-trend-analysis',
        language: 'sql',
        title: '销售趋势与同比分析',
        description: '分析销售趋势，计算同比增长率和移动平均',
        code: `-- 销售趋势与同比分析
WITH monthly_sales AS (
    SELECT 
        DATE_FORMAT(order_date, '%Y-%m') as month,
        YEAR(order_date) as year,
        MONTH(order_date) as month_num,
        COUNT(DISTINCT order_id) as order_count,
        COUNT(DISTINCT user_id) as active_customers,
        SUM(total_amount) as total_revenue,
        AVG(total_amount) as avg_order_value
    FROM orders 
    WHERE order_status = 'completed'
        AND order_date >= '2023-01-01'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m'), YEAR(order_date), MONTH(order_date)
),
sales_with_trends AS (
    SELECT 
        month,
        year,
        month_num,
        order_count,
        active_customers,
        total_revenue,
        avg_order_value,
        -- 环比增长
        LAG(total_revenue) OVER (ORDER BY month) as prev_month_revenue,
        ROUND((total_revenue - LAG(total_revenue) OVER (ORDER BY month)) * 100.0 / 
              LAG(total_revenue) OVER (ORDER BY month), 2) as mom_growth_rate,
        -- 同比增长  
        LAG(total_revenue, 12) OVER (ORDER BY month) as same_month_last_year,
        ROUND((total_revenue - LAG(total_revenue, 12) OVER (ORDER BY month)) * 100.0 / 
              LAG(total_revenue, 12) OVER (ORDER BY month), 2) as yoy_growth_rate,
        -- 3个月移动平均
        ROUND(AVG(total_revenue) OVER (
            ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ), 2) as three_month_ma,
        -- 排名
        ROW_NUMBER() OVER (ORDER BY total_revenue DESC) as revenue_rank
    FROM monthly_sales
)
SELECT 
    month,
    FORMAT(total_revenue, 0) as total_revenue,
    FORMAT(three_month_ma, 0) as three_month_ma,
    CONCAT(IFNULL(mom_growth_rate, 0), '%') as mom_growth,
    CONCAT(IFNULL(yoy_growth_rate, 0), '%') as yoy_growth,
    order_count,
    active_customers,
    ROUND(avg_order_value, 2) as avg_order_value,
    revenue_rank
FROM sales_with_trends
WHERE year >= 2024
ORDER BY month DESC;`,
        output: `month     total_revenue  three_month_ma  mom_growth  yoy_growth  order_count  active_customers  avg_order_value  revenue_rank
2024-03   2,456,780     2,234,560      8.5%        23.4%       12,450       8,934            197.25           2
2024-02   2,267,890     2,156,340      -2.3%       18.7%       11,890       8,456            190.75           5
2024-01   2,321,450     2,089,120      15.2%       21.2%       12,100       8,678            191.86           3`,
        explanation: '销售数据显示2024年整体增长良好，同比增长率保持在18-23%之间，3月份表现最佳'
      }
    ]
  }
]

// ==================== 机器学习模块 ====================
export const mlShowcases: ModuleShowcase[] = [
  {
    id: 'customer-churn-prediction',
    moduleType: 'ml',
    title: '客户流失预测模型',
    category: '预测建模',
    industry: '电信运营商',
    problem: '电信运营商客户流失率高达15%，需要建立预测模型提前识别高风险客户',
    businessContext: '电信公司拥有大量客户行为数据，包括通话记录、套餐使用、客服记录等，需要预测哪些客户可能流失',
    solution: '使用机器学习算法构建客户流失预测模型，实现精准营销和客户挽留',
    keyPoints: [
      '特征工程与选择',
      '模型训练与调优',
      '模型解释与可视化',
      '业务价值评估',
      '模型部署策略'
    ],
    difficulty: 'advanced',
    tags: ['机器学习', '客户流失', '预测模型', 'Python', 'XGBoost'],
    codeBlocks: [
      {
        id: 'data-preprocessing',
        language: 'python',
        title: '数据预处理和特征工程',
        description: '清洗数据并创建预测特征',
        code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns

# 加载客户数据
df = pd.read_csv('telecom_customer_data.csv')

# 数据预处理
def preprocess_data(df):
    # 处理缺失值
    df['total_charges'] = pd.to_numeric(df['total_charges'], errors='coerce')
    df['total_charges'].fillna(df['total_charges'].median(), inplace=True)
    
    # 创建新特征
    df['avg_monthly_charges'] = df['total_charges'] / df['tenure']
    df['charges_per_service'] = df['monthly_charges'] / (
        df['phone_service'] + df['internet_service'] + 
        df['online_security'] + df['tech_support'] + 1
    )
    
    # 客户价值分层
    df['customer_value'] = pd.qcut(df['total_charges'], 
                                  q=4, 
                                  labels=['Low', 'Medium', 'High', 'Premium'])
    
    # 服务使用强度
    service_cols = ['phone_service', 'multiple_lines', 'internet_service',
                   'online_security', 'online_backup', 'device_protection',
                   'tech_support', 'streaming_tv', 'streaming_movies']
    df['service_intensity'] = df[service_cols].sum(axis=1)
    
    return df

df = preprocess_data(df)

# 特征选择
feature_cols = ['tenure', 'monthly_charges', 'total_charges', 
               'avg_monthly_charges', 'charges_per_service', 
               'service_intensity', 'contract', 'payment_method',
               'paperless_billing', 'customer_value']

# 编码分类变量
le_dict = {}
for col in ['contract', 'payment_method', 'customer_value']:
    le = LabelEncoder()
    df[col + '_encoded'] = le.fit_transform(df[col])
    le_dict[col] = le

# 准备建模数据
X = df[['tenure', 'monthly_charges', 'total_charges', 'avg_monthly_charges',
        'charges_per_service', 'service_intensity', 'paperless_billing',
        'contract_encoded', 'payment_method_encoded', 'customer_value_encoded']]
y = df['churn']

print("特征工程完成")
print(f"数据形状: {X.shape}")
print(f"流失率: {y.mean():.2%}")`,
        output: `特征工程完成
数据形状: (7043, 10)
流失率: 26.54%`,
        explanation: '创建了客户价值分层、平均月费、服务强度等业务特征，为模型提供更好的预测能力'
      },
      {
        id: 'model-training',
        language: 'python',
        title: '模型训练与评估',
        description: '训练多种机器学习模型并进行性能对比',
        code: `from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, roc_auc_score, roc_curve
from sklearn.model_selection import cross_val_score, GridSearchCV
import warnings
warnings.filterwarnings('ignore')

# 数据分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 特征标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 定义模型
models = {
    'Logistic Regression': LogisticRegression(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingClassifier(random_state=42),
    'XGBoost': XGBClassifier(random_state=42, eval_metric='logloss'),
    'SVM': SVC(probability=True, random_state=42)
}

# 模型训练和评估
results = {}
for name, model in models.items():
    print(f"\\n训练 {name}...")
    
    # 选择是否使用标准化数据
    if name in ['Logistic Regression', 'SVM']:
        X_train_use = X_train_scaled
        X_test_use = X_test_scaled
    else:
        X_train_use = X_train
        X_test_use = X_test
    
    # 训练模型
    model.fit(X_train_use, y_train)
    
    # 预测
    y_pred = model.predict(X_test_use)
    y_prob = model.predict_proba(X_test_use)[:, 1]
    
    # 评估指标
    auc_score = roc_auc_score(y_test, y_prob)
    cv_scores = cross_val_score(model, X_train_use, y_train, cv=5, scoring='roc_auc')
    
    results[name] = {
        'AUC': auc_score,
        'CV_AUC_Mean': cv_scores.mean(),
        'CV_AUC_Std': cv_scores.std(),
        'Model': model
    }
    
    print(f"AUC: {auc_score:.4f}")
    print(f"CV AUC: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")

# 结果汇总
results_df = pd.DataFrame({
    name: [scores['AUC'], scores['CV_AUC_Mean'], scores['CV_AUC_Std']] 
    for name, scores in results.items()
}, index=['Test_AUC', 'CV_AUC_Mean', 'CV_AUC_Std']).T

print("\\n模型性能对比:")
print(results_df.round(4))

# 选择最佳模型
best_model_name = results_df['Test_AUC'].idxmax()
best_model = results[best_model_name]['Model']
print(f"\\n最佳模型: {best_model_name} (AUC: {results_df.loc[best_model_name, 'Test_AUC']:.4f})")`,
        output: `训练 Logistic Regression...
AUC: 0.8461
CV AUC: 0.8445 (+/- 0.0156)

训练 Random Forest...
AUC: 0.8523
CV AUC: 0.8501 (+/- 0.0134)

训练 Gradient Boosting...
AUC: 0.8578
CV AUC: 0.8556 (+/- 0.0142)

训练 XGBoost...
AUC: 0.8634
CV AUC: 0.8612 (+/- 0.0128)

训练 SVM...
AUC: 0.8445
CV AUC: 0.8423 (+/- 0.0167)

模型性能对比:
                    Test_AUC  CV_AUC_Mean  CV_AUC_Std
Logistic Regression   0.8461       0.8445      0.0078
Random Forest         0.8523       0.8501      0.0067
Gradient Boosting     0.8578       0.8556      0.0071
XGBoost              0.8634       0.8612      0.0064
SVM                  0.8445       0.8423      0.0084

最佳模型: XGBoost (AUC: 0.8634)`,
        explanation: 'XGBoost模型表现最佳，AUC达到0.863，具有良好的客户流失预测能力'
      }
    ],
    results: {
      metrics: [
        { name: '模型准确率', value: '86.3%', change: '+5.2%' },
        { name: '召回率', value: '78.5%', change: '+12.3%' },
        { name: '精确率', value: '82.1%', change: '+8.7%' }
      ],
      insights: [
        'XGBoost模型在客户流失预测上表现最佳，AUC达到0.863',
        '合约类型和客户价值是最重要的预测特征',
        '模型能够提前3个月预测客户流失风险，准确率超过85%'
      ],
      recommendations: [
        '对高风险客户实施精准挽留策略，预计可降低流失率30%',
        '优化月付费客户的服务体验，重点关注低价值客户群体',
        '建立实时预测系统，每月更新客户风险评分'
      ]
    }
  }
]

// ==================== Python模块 ====================
export const pythonShowcases: ModuleShowcase[] = [
  {
    id: 'sales-forecasting-python',
    moduleType: 'python',
    title: 'Python销售预测分析',
    category: '预测分析',
    industry: '零售电商',
    problem: '电商平台需要准确预测未来3个月的销售趋势，优化库存和营销策略',
    businessContext: '大型电商平台，拥有海量历史销售数据，需要建立精确的预测模型指导业务决策',
    solution: '使用Python构建时间序列预测模型，结合机器学习算法提升预测准确性',
    keyPoints: [
      '时间序列分析',
      '特征工程',
      '模型选择与优化',
      '预测结果可视化',
      '业务洞察提取'
    ],
    difficulty: 'advanced',
    tags: ['Python', '预测分析', '时间序列', '机器学习', '电商'],
    codeBlocks: [
      {
        id: 'data-preparation',
        language: 'python',
        title: '数据准备和探索性分析',
        description: '加载销售数据，进行基础的探索性分析',
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# 加载销售数据
df = pd.read_csv('sales_data.csv')
df['date'] = pd.to_datetime(df['date'])
df = df.set_index('date')

# 数据基本信息
print("数据形状:", df.shape)
print("时间范围:", df.index.min(), "到", df.index.max())
print("缺失值:", df.isnull().sum())

# 销售趋势可视化
plt.figure(figsize=(15, 6))
plt.subplot(1, 2, 1)
df['sales'].plot(title='销售额趋势', color='steelblue')
plt.ylabel('销售额')

plt.subplot(1, 2, 2)
df['sales'].resample('M').sum().plot(kind='bar', title='月度销售额', color='lightcoral')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
        output: `数据形状: (1095, 5)
时间范围: 2021-01-01 到 2023-12-31
缺失值: sales    0
       category    0
       region      0
       dtype: int64`,
        explanation: '首先加载和探索数据，了解销售趋势和数据质量，为后续建模做准备'
      },
      {
        id: 'feature-engineering',
        language: 'python',
        title: '特征工程',
        description: '创建时间特征和滞后特征，提升模型预测能力',
        code: `from sklearn.preprocessing import LabelEncoder
from statsmodels.tsa.seasonal import seasonal_decompose

# 创建时间特征
df['year'] = df.index.year
df['month'] = df.index.month
df['day'] = df.index.day
df['dayofweek'] = df.index.dayofweek
df['quarter'] = df.index.quarter

# 创建滞后特征
for lag in [1, 7, 30]:
    df[f'sales_lag_{lag}'] = df['sales'].shift(lag)

# 创建滚动统计特征
df['sales_ma_7'] = df['sales'].rolling(window=7).mean()
df['sales_ma_30'] = df['sales'].rolling(window=30).mean()
df['sales_std_7'] = df['sales'].rolling(window=7).std()

# 季节性分解
decomposition = seasonal_decompose(df['sales'], model='additive', period=365)
df['trend'] = decomposition.trend
df['seasonal'] = decomposition.seasonal
df['residual'] = decomposition.resid

# 可视化季节性分解
fig, axes = plt.subplots(4, 1, figsize=(15, 12))
df['sales'].plot(ax=axes[0], title='原始数据')
df['trend'].plot(ax=axes[1], title='趋势')
df['seasonal'].plot(ax=axes[2], title='季节性')
df['residual'].plot(ax=axes[3], title='残差')
plt.tight_layout()
plt.show()

print("特征工程完成，新增特征数量:", df.shape[1] - 5)`,
        explanation: '通过特征工程创建时间特征、滞后特征和统计特征，帮助模型更好地捕捉数据模式'
      },
      {
        id: 'model-training',
        language: 'python',
        title: '模型训练和评估',
        description: '使用多种算法训练预测模型，选择最佳模型',
        code: `from sklearn.model_selection import train_test_split, TimeSeriesSplit
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor

# 准备训练数据
features = ['year', 'month', 'day', 'dayofweek', 'quarter', 
           'sales_lag_1', 'sales_lag_7', 'sales_lag_30',
           'sales_ma_7', 'sales_ma_30', 'sales_std_7']

# 删除缺失值
data = df[features + ['sales']].dropna()
X = data[features]
y = data['sales']

# 时间序列分割
tscv = TimeSeriesSplit(n_splits=5)
models = {
    'Linear Regression': LinearRegression(),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'Gradient Boosting': GradientBoostingRegressor(n_estimators=100, random_state=42),
    'XGBoost': XGBRegressor(n_estimators=100, random_state=42)
}

# 模型评估
results = {}
for name, model in models.items():
    mae_scores = []
    rmse_scores = []
    r2_scores = []
    
    for train_idx, val_idx in tscv.split(X):
        X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
        y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]
        
        model.fit(X_train, y_train)
        y_pred = model.predict(X_val)
        
        mae_scores.append(mean_absolute_error(y_val, y_pred))
        rmse_scores.append(np.sqrt(mean_squared_error(y_val, y_pred)))
        r2_scores.append(r2_score(y_val, y_pred))
    
    results[name] = {
        'MAE': np.mean(mae_scores),
        'RMSE': np.mean(rmse_scores),
        'R2': np.mean(r2_scores)
    }

# 打印结果
results_df = pd.DataFrame(results).T
print("模型性能对比:")
print(results_df.round(4))`,
        output: `模型性能对比:
                    MAE      RMSE        R2
Linear Regression   2847.23  3654.89   0.7234
Random Forest       2156.78  2891.45   0.8456
Gradient Boosting   2098.34  2798.67   0.8523
XGBoost            2034.56  2723.12   0.8612`,
        explanation: 'XGBoost模型表现最佳，R²达到0.86，将用于最终预测'
      }
    ],
    charts: [
      {
        id: 'sales-trend',
        type: 'line',
        title: '销售额趋势分析',
        description: '过去3年的销售趋势和预测结果',
        data: {
          labels: ['2021-Q1', '2021-Q2', '2021-Q3', '2021-Q4', '2022-Q1', '2022-Q2', '2022-Q3', '2022-Q4', '2023-Q1', '2023-Q2', '2023-Q3', '2023-Q4', '2024-Q1预测', '2024-Q2预测', '2024-Q3预测'],
          datasets: [
            {
              label: '实际销售额',
              data: [850000, 920000, 1050000, 1200000, 900000, 980000, 1150000, 1350000, 950000, 1080000, 1250000, 1450000, null, null, null],
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            },
            {
              label: '预测销售额',
              data: [null, null, null, null, null, null, null, null, null, null, null, null, 1020000, 1180000, 1380000],
              borderColor: '#EF4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderDash: [5, 5]
            }
          ]
        },
        insights: [
          '销售额呈现明显的季节性特征，Q4通常是销售高峰',
          '预测模型显示2024年销售额将继续增长15-20%',
          '模型准确率达到86%，可以为库存规划提供可靠依据'
        ]
      }
    ]
  }
]

// ==================== 数据可视化模块 ====================
export const visualizationShowcases: ModuleShowcase[] = [
  {
    id: 'sales-dashboard-powerbi',
    moduleType: 'visualization',
    title: 'Power BI销售分析看板',
    category: '商业智能',
    industry: '零售连锁',
    problem: '零售连锁企业需要实时监控各门店销售表现，快速识别业务异常',
    businessContext: '拥有200+门店的零售连锁企业，需要统一的数据看板监控销售、库存、客户等关键指标',
    solution: '使用Power BI构建交互式销售分析看板，实现数据的实时监控和多维分析',
    keyPoints: [
      '实时数据连接',
      '多维度KPI监控',
      '交互式图表设计',
      '移动端适配',
      '权限管理'
    ],
    difficulty: 'intermediate',
    tags: ['Power BI', '数据可视化', '销售分析', '看板', 'KPI'],
    charts: [
      {
        id: 'sales-overview',
        type: 'dashboard',
        title: '销售总览看板',
        description: '展示关键销售指标和趋势',
        data: {},
        insights: [
          '销售额同比增长15.2%，超出预期目标',
          '华东区域表现最佳，占总销售额的35%',
          '移动端销售占比持续提升，达到42%'
        ]
      },
      {
        id: 'regional-performance',
        type: 'bar',
        title: '区域销售表现',
        description: '各区域销售额对比分析',
        data: {},
        insights: [
          '华东区域领先，华南区域增长最快',
          '西北区域需要加强市场拓展',
          '一线城市贡献60%的销售额'
        ]
      }
    ],
    dashboardUrl: 'https://app.powerbi.com/view?r=example-dashboard',
    results: {
      metrics: [
        { name: '决策效率', value: '提升60%', change: '+60%' },
        { name: '数据准确性', value: '99.2%', change: '+8.5%' },
        { name: '用户满意度', value: '4.7/5', change: '+0.8' }
      ],
      insights: [
        'Power BI看板将数据分析时间从4小时缩短至15分钟',
        '实时监控功能帮助及时发现并处理了85%的业务异常',
        '移动端看板让管理层随时随地掌握业务状况'
      ],
      recommendations: [
        '扩展看板功能，增加预测分析模块',
        '建立数据质量监控体系',
        '培训更多业务人员使用自助分析功能'
      ]
    }
  }
  ,
  {
    id: 'excel-pivot-charts',
    moduleType: 'visualization',
    title: 'Excel 透视表与动态图表',
    category: '办公分析',
    industry: '通用场景',
    problem: '需要在无需代码的情况下，快速完成多维分析与汇报图表输出',
    businessContext: '业务同学以 Excel 为主工作环境，需低门槛实现数据透视与图表联动展示',
    solution: '使用 Power Query 整合数据，透视表建模，基于切片器/时间线构建动态图表',
    keyPoints: [
      'Power Query 数据整合',
      '透视表维度/度量设计',
      '切片器与时间线联动',
      '动态图表与参数化',
      '模板与导出' 
    ],
    difficulty: 'beginner',
    tags: ['Excel', '透视表', 'Power Query', '动态图表'],
    charts: [
      { id: 'pivot-bar', type: 'bar', title: '品类销售对比', description: '按品类的销售额柱状图', data: {} },
      { id: 'pivot-line', type: 'line', title: '月度趋势', description: '按月份的销售趋势折线图', data: {} }
    ],
    results: {
      metrics: [
        { name: '制作效率', value: '↑3x' },
        { name: '学习门槛', value: '低' }
      ],
      insights: [
        '透视表与切片器满足大部分多维分析需求',
        '模板化图表输出大幅提升汇报效率'
      ],
      recommendations: [
        '规范源数据字段命名与类型',
        '建立标准化的透视表模板库'
      ]
    }
  },
  {
    id: 'tableau-exploration',
    moduleType: 'visualization',
    title: 'Tableau 探索式分析',
    category: '可视化探索',
    industry: '互联网',
    problem: '需要快速通过可视化交互发现数据模式与异常',
    businessContext: '数据分析师在探索阶段需要多维切片、下钻、联动高效完成洞察',
    solution: '利用 Tableau 的维度/度量拖拽与仪表板动作，实现跨图表联动与下钻',
    keyPoints: [
      '拖拽式建图',
      '仪表板联动',
      '参数与计算字段',
      '下钻与层级'
    ],
    difficulty: 'intermediate',
    tags: ['Tableau', '探索式分析', '仪表板'],
    charts: [
      { id: 'explore-scatter', type: 'scatter', title: '价格-销量关系', description: '变量关系探索', data: {} },
      { id: 'explore-heatmap', type: 'heatmap', title: '时段-品类热力', description: '密度热点识别', data: {} }
    ]
  },
  {
    id: 'python-mpl-seaborn',
    moduleType: 'visualization',
    title: 'Python · Matplotlib 与 Seaborn 出图规范',
    category: '科研/数据科学',
    industry: '通用',
    problem: '需要可复现、高质量、可批量生成的图表以支撑分析与论文',
    businessContext: '数据科学场景强调脚本化与可复现，要求精细化控制图形元素',
    solution: '使用 Matplotlib 精细控制样式，Seaborn 快速高级出图，统一主题和字体',
    keyPoints: [
      '主题与字体管理',
      '子图布局与复合图',
      '统计图（箱线/小提琴/回归）',
      '高分辨率导出'
    ],
    difficulty: 'advanced',
    tags: ['Matplotlib', 'Seaborn', '科研绘图', '批量出图'],
    charts: [
      { id: 'sns-box', type: 'dashboard', title: '分布统计组合图', description: '箱线/分布/回归组合', data: {} }
    ],
    results: {
      metrics: [ { name: '出图一致性', value: '↑' } ],
      insights: [ '统一主题后报告观感显著提升' ],
      recommendations: [ '沉淀绘图模板与主题文件' ]
    }
  },
  {
    id: 'echarts-interaction',
    moduleType: 'visualization',
    title: 'ECharts 交互联动案例',
    category: 'Web可视化',
    industry: '运营分析',
    problem: '需要在 Web 中提供高交互的大屏/看板体验',
    businessContext: '前端展示需要联动筛选、Tooltip、缩放以及导出能力',
    solution: '使用 ECharts 构建联动图表，统一主题与交互规范，支持导出PNG/CSV',
    keyPoints: [
      '联动与下钻',
      '主题与色板',
      '性能与懒加载',
      '导出与响应式'
    ],
    difficulty: 'intermediate',
    tags: ['ECharts', '联动', '大屏', '前端'],
    charts: [
      { id: 'linkage-bar-line', type: 'dashboard', title: '柱线联动', description: '选择联动/缩放', data: {} },
      { id: 'geo-heat', type: 'heatmap', title: '地理热力', description: '地区热点', data: {} }
    ]
  }
]

// ==================== 统计分析模块 ====================
export const statisticsShowcases: ModuleShowcase[] = [
  {
    id: 'ab-test-analysis',
    moduleType: 'statistics',
    title: 'A/B测试统计分析',
    category: '实验设计',
    industry: '互联网产品',
    problem: '产品改版需要通过A/B测试验证效果，确保数据驱动的决策制定',
    businessContext: '电商平台准备改版商品详情页，需要通过A/B测试验证新版本对转化率的影响',
    solution: '设计严格的A/B测试实验，使用统计学方法分析实验结果',
    keyPoints: [
      '实验设计原理',
      '样本量计算',
      '假设检验',
      '置信区间',
      '统计显著性'
    ],
    difficulty: 'advanced',
    tags: ['A/B测试', '假设检验', '统计分析', '实验设计'],
    codeBlocks: [
      {
        id: 'ab-test-design',
        language: 'python',
        title: 'A/B测试设计与样本量计算',
        description: '计算达到统计显著性所需的样本量',
        code: `import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt
from statsmodels.stats.power import ttest_power
from statsmodels.stats.proportion import proportions_ztest, proportion_effectsize

# A/B测试参数设置
baseline_conversion_rate = 0.12  # 当前转化率12%
minimum_detectable_effect = 0.02  # 最小检测效应2%
alpha = 0.05  # 显著性水平
power = 0.8   # 统计功效

# 计算样本量
effect_size = proportion_effectsize(
    baseline_conversion_rate, 
    baseline_conversion_rate + minimum_detectable_effect
)

from statsmodels.stats.power import zt_ind_solve_power
sample_size = zt_ind_solve_power(
    effect_size=effect_size,
    power=power,
    alpha=alpha,
    alternative='two-sided'
)

print(f"A/B测试设计参数:")
print(f"基线转化率: {baseline_conversion_rate:.1%}")
print(f"最小检测效应: {minimum_detectable_effect:.1%}")
print(f"显著性水平: {alpha}")
print(f"统计功效: {power}")
print(f"效应量: {effect_size:.4f}")
print(f"每组所需样本量: {int(sample_size):,}")
print(f"总样本量: {int(sample_size * 2):,}")

# 模拟实验数据
np.random.seed(42)
n_control = n_treatment = int(sample_size)

# 控制组数据（原版本）
control_conversions = np.random.binomial(1, baseline_conversion_rate, n_control)
control_conversion_rate = control_conversions.mean()

# 实验组数据（新版本，假设有2%的提升）
treatment_conversion_rate = baseline_conversion_rate + minimum_detectable_effect
treatment_conversions = np.random.binomial(1, treatment_conversion_rate, n_treatment)
actual_treatment_rate = treatment_conversions.mean()

print(f"\\n实验结果:")
print(f"控制组转化率: {control_conversion_rate:.3%}")
print(f"实验组转化率: {actual_treatment_rate:.3%}")
print(f"绝对提升: {actual_treatment_rate - control_conversion_rate:.3%}")
print(f"相对提升: {(actual_treatment_rate - control_conversion_rate) / control_conversion_rate:.1%}")`,
        output: `A/B测试设计参数:
基线转化率: 12.0%
最小检测效应: 2.0%
显著性水平: 0.05
统计功效: 0.8
效应量: 0.1677
每组所需样本量: 2,234
总样本量: 4,468

实验结果:
控制组转化率: 11.9%
实验组转化率: 13.8%
相对提升: 16.0%`,
        explanation: '通过功效分析计算出每组需要2,234个样本才能检测到2%的转化率提升'
      }
    ]
  }
]

// ==================== 自动化脚本模块 ====================
export const automationShowcases: ModuleShowcase[] = [
  {
    id: 'data-pipeline-automation',
    moduleType: 'automation',
    title: '数据处理自动化流水线',
    category: '数据工程',
    industry: '金融科技',
    problem: '每日需要处理大量交易数据，手工操作效率低且容易出错',
    businessContext: '金融科技公司每天产生TB级交易数据，需要自动化的数据处理和报告生成流程',
    solution: '使用Python构建自动化数据处理流水线，实现从数据采集到报告生成的全流程自动化',
    keyPoints: [
      '数据采集自动化',
      '数据清洗与验证',
      '定时任务调度',
      '异常监控告警',
      '报告自动生成'
    ],
    difficulty: 'advanced',
    tags: ['Python', '自动化', '数据流水线', 'ETL', '定时任务'],
    codeBlocks: [
      {
        id: 'data-pipeline',
        language: 'python',
        title: '自动化数据处理流水线',
        description: '构建完整的数据ETL自动化流程',
        code: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import schedule
import time
import logging
import smtplib
from email.mime.text import MimeText
from pathlib import Path

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('data_pipeline.log'),
        logging.StreamHandler()
    ]
)

class DataPipeline:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
    def extract_data(self, date):
        """数据提取"""
        try:
            self.logger.info(f"开始提取 {date} 的数据")
            
            # 模拟从多个数据源提取数据
            sources = ['transactions', 'users', 'products']
            extracted_data = {}
            
            for source in sources:
                # 这里应该是实际的数据库连接或API调用
                data = pd.read_csv(f'data/{source}_{date}.csv')
                extracted_data[source] = data
                self.logger.info(f"从 {source} 提取了 {len(data)} 条记录")
                
            return extracted_data
            
        except Exception as e:
            self.logger.error(f"数据提取失败: {str(e)}")
            self.send_alert(f"数据提取失败: {str(e)}")
            raise
            
    def transform_data(self, raw_data):
        """数据转换"""
        try:
            self.logger.info("开始数据转换")
            
            # 数据清洗
            transactions = raw_data['transactions']
            
            # 删除重复记录
            transactions = transactions.drop_duplicates(subset=['transaction_id'])
            
            # 处理缺失值
            transactions['amount'] = pd.to_numeric(transactions['amount'], errors='coerce')
            transactions = transactions.dropna(subset=['amount'])
            
            # 数据验证
            invalid_amounts = transactions[transactions['amount'] <= 0]
            if len(invalid_amounts) > 0:
                self.logger.warning(f"发现 {len(invalid_amounts)} 条无效金额记录")
                transactions = transactions[transactions['amount'] > 0]
            
            # 创建汇总指标
            daily_summary = transactions.groupby('date').agg({
                'amount': ['sum', 'mean', 'count'],
                'user_id': 'nunique'
            }).round(2)
            
            daily_summary.columns = ['total_amount', 'avg_amount', 'transaction_count', 'unique_users']
            
            transformed_data = {
                'transactions': transactions,
                'daily_summary': daily_summary
            }
            
            self.logger.info("数据转换完成")
            return transformed_data
            
        except Exception as e:
            self.logger.error(f"数据转换失败: {str(e)}")
            raise
            
    def load_data(self, transformed_data, date):
        """数据加载"""
        try:
            self.logger.info("开始数据加载")
            
            # 保存到数据库或数据仓库
            output_dir = Path(f'output/{date}')
            output_dir.mkdir(parents=True, exist_ok=True)
            
            for table_name, data in transformed_data.items():
                output_path = output_dir / f'{table_name}.csv'
                data.to_csv(output_path, index=False)
                self.logger.info(f"已保存 {table_name} 到 {output_path}")
                
            self.logger.info("数据加载完成")
            
        except Exception as e:
            self.logger.error(f"数据加载失败: {str(e)}")
            raise
            
    def generate_report(self, transformed_data, date):
        """生成报告"""
        try:
            self.logger.info("开始生成报告")
            
            daily_summary = transformed_data['daily_summary']
            
            # 生成HTML报告
            html_report = f"""
            <html>
            <head><title>Daily Transaction Report - {date}</title></head>
            <body>
                <h1>每日交易报告 - {date}</h1>
                <h2>关键指标</h2>
                <table border="1">
                    <tr><th>指标</th><th>值</th></tr>
                    <tr><td>总交易额</td><td>¥{daily_summary['total_amount'].iloc[0]:,.2f}</td></tr>
                    <tr><td>平均交易额</td><td>¥{daily_summary['avg_amount'].iloc[0]:,.2f}</td></tr>
                    <tr><td>交易笔数</td><td>{daily_summary['transaction_count'].iloc[0]:,}</td></tr>
                    <tr><td>活跃用户数</td><td>{daily_summary['unique_users'].iloc[0]:,}</td></tr>
                </table>
            </body>
            </html>
            """
            
            # 保存报告
            report_path = f'reports/daily_report_{date}.html'
            with open(report_path, 'w', encoding='utf-8') as f:
                f.write(html_report)
                
            self.logger.info(f"报告已生成: {report_path}")
            return report_path
            
        except Exception as e:
            self.logger.error(f"报告生成失败: {str(e)}")
            raise
            
    def send_alert(self, message):
        """发送告警邮件"""
        try:
            # 这里应该是实际的邮件发送逻辑
            self.logger.info(f"发送告警: {message}")
        except Exception as e:
            self.logger.error(f"告警发送失败: {str(e)}")
            
    def run_daily_pipeline(self, date=None):
        """运行每日数据流水线"""
        if date is None:
            date = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
            
        try:
            self.logger.info(f"开始运行 {date} 的数据流水线")
            
            # ETL流程
            raw_data = self.extract_data(date)
            transformed_data = self.transform_data(raw_data)
            self.load_data(transformed_data, date)
            report_path = self.generate_report(transformed_data, date)
            
            self.logger.info("数据流水线运行成功")
            return True
            
        except Exception as e:
            self.logger.error(f"数据流水线运行失败: {str(e)}")
            return False

# 使用示例
config = {
    'database_url': 'postgresql://user:pass@localhost/db',
    'email_config': {
        'smtp_server': 'smtp.gmail.com',
        'username': 'alert@company.com',
        'password': 'password'
    }
}

pipeline = DataPipeline(config)

# 设置定时任务
schedule.every().day.at("06:00").do(pipeline.run_daily_pipeline)

print("数据流水线已启动，每日06:00自动运行")
print("使用 Ctrl+C 停止程序")`,
        output: `数据流水线已启动，每日06:00自动运行
使用 Ctrl+C 停止程序`,
        explanation: '构建了完整的数据ETL自动化流水线，包括数据提取、转换、加载和报告生成，支持异常处理和告警机制'
      }
    ]
  }
]

// 获取指定模块的showcases
export const getModuleShowcases = (moduleType: string) => {
  switch (moduleType) {
    case 'business':
      return businessShowcases
    case 'excel':
      return excelShowcases
    case 'python':
      return pythonShowcases
    case 'sql':
      return sqlShowcases
    case 'ml':
      return mlShowcases
    case 'visualization':
      return visualizationShowcases
    case 'statistics':
      return statisticsShowcases
    case 'automation':
      return automationShowcases
    default:
      return []
  }
}

// 获取所有模块的showcases
export const getAllModuleShowcases = () => {
  return [
    ...businessShowcases,
    ...excelShowcases,
    ...pythonShowcases,
    ...sqlShowcases,
    ...mlShowcases,
    ...visualizationShowcases,
    ...statisticsShowcases,
    ...automationShowcases
  ]
}
