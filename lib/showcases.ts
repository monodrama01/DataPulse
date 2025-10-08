// 数据思维应用场景和分析思路

export interface BusinessScenario {
  id: string
  title: string
  category: string
  industry: string
  problem: string
  businessContext: string
  solution: string
  thinkingProcess: string[]
  keyMetrics: string[]
  tools: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  mindMapData?: MindMapNode
  tags: string[]
}

export interface MindMapNode {
  id: string
  text: string
  children?: MindMapNode[]
  color?: string
  size?: number
  isRoot?: boolean
}

// 业务场景数据
export const businessScenarios: BusinessScenario[] = [
  {
    id: 'user-retention-analysis',
    title: '用户留存率下降分析',
    category: '用户分析',
    industry: '互联网产品',
    problem: '产品的用户留存率在过去3个月持续下降，从85%降到了72%，需要找出原因并制定改进策略',
    businessContext: '一款社交类APP，用户主要通过分享内容和互动来使用产品。最近发现新用户注册后的7日留存率和30日留存率都在下降。',
    solution: '通过漏斗分析、队列分析、用户行为分析等方法，定位问题根源并提出改进建议',
    thinkingProcess: [
      '定义问题：明确留存率下降的具体表现和时间范围',
      '数据收集：获取用户行为数据、产品功能使用数据、外部环境数据',
      '维度拆解：按用户来源、功能模块、时间周期等维度分析',
      '对比分析：同比、环比分析，找出异常时间点',
      '相关性分析：分析可能影响留存的因素',
      '假设验证：基于分析结果提出假设并验证',
      '制定策略：根据根因分析结果制定改进方案'
    ],
    keyMetrics: ['7日留存率', '30日留存率', '用户活跃度', '功能使用率', '用户满意度'],
    tools: ['SQL', 'Python', 'Excel', '数据可视化工具'],
    difficulty: 'intermediate',
    tags: ['用户分析', '留存分析', '漏斗分析', '队列分析'],
    mindMapData: {
      id: 'root',
      text: '用户留存率下降分析',
      isRoot: true,
      color: '#4F46E5',
      children: [
        {
          id: 'problem',
          text: '问题定义',
          color: '#DC2626',
          children: [
            { id: 'metrics', text: '留存率指标下降', color: '#FCA5A5' },
            { id: 'timeline', text: '3个月持续下降', color: '#FCA5A5' },
            { id: 'impact', text: '业务影响评估', color: '#FCA5A5' }
          ]
        },
        {
          id: 'analysis',
          text: '分析方法',
          color: '#059669',
          children: [
            { id: 'funnel', text: '漏斗分析', color: '#86EFAC' },
            { id: 'cohort', text: '队列分析', color: '#86EFAC' },
            { id: 'behavior', text: '用户行为分析', color: '#86EFAC' },
            { id: 'comparison', text: '对比分析', color: '#86EFAC' }
          ]
        },
        {
          id: 'dimensions',
          text: '分析维度',
          color: '#7C3AED',
          children: [
            { id: 'source', text: '用户来源', color: '#C4B5FD' },
            { id: 'feature', text: '功能模块', color: '#C4B5FD' },
            { id: 'time', text: '时间周期', color: '#C4B5FD' },
            { id: 'segment', text: '用户分群', color: '#C4B5FD' }
          ]
        },
        {
          id: 'solutions',
          text: '改进策略',
          color: '#EA580C',
          children: [
            { id: 'product', text: '产品优化', color: '#FED7AA' },
            { id: 'operation', text: '运营策略', color: '#FED7AA' },
            { id: 'experience', text: '用户体验', color: '#FED7AA' }
          ]
        }
      ]
    }
  },
  {
    id: 'sales-decline-analysis',
    title: '销售额下滑原因分析',
    category: '销售分析',
    industry: '电商零售',
    problem: '电商平台某品类商品销售额连续两个季度下滑20%，需要分析原因并制定应对策略',
    businessContext: '一个综合电商平台，某个重要品类（如数码产品）的销售额出现明显下滑，影响整体GMV目标达成。',
    solution: '运用销售漏斗分析、竞品分析、价格敏感性分析等方法，全面诊断销售下滑原因',
    thinkingProcess: [
      '问题拆解：将销售额分解为流量×转化率×客单价',
      '趋势分析：分析各个指标的时间趋势变化',
      '结构分析：按商品、渠道、用户群体等维度分析',
      '竞品对比：分析市场环境和竞争态势变化',
      '用户调研：了解用户需求和购买决策变化',
      '假设检验：验证可能的影响因素',
      '策略制定：针对不同原因制定差异化策略'
    ],
    keyMetrics: ['GMV', '流量', '转化率', '客单价', '复购率', '市场份额'],
    tools: ['SQL', 'Python', 'Tableau', 'Excel'],
    difficulty: 'advanced',
    tags: ['销售分析', '漏斗分析', '竞品分析', '趋势分析'],
    mindMapData: {
      id: 'root',
      text: '销售额下滑分析',
      isRoot: true,
      color: '#DC2626',
      children: [
        {
          id: 'decomposition',
          text: '指标拆解',
          color: '#059669',
          children: [
            { id: 'traffic', text: '流量分析', color: '#86EFAC' },
            { id: 'conversion', text: '转化率分析', color: '#86EFAC' },
            { id: 'aov', text: '客单价分析', color: '#86EFAC' }
          ]
        },
        {
          id: 'dimensions',
          text: '多维分析',
          color: '#7C3AED',
          children: [
            { id: 'product', text: '商品维度', color: '#C4B5FD' },
            { id: 'channel', text: '渠道维度', color: '#C4B5FD' },
            { id: 'user', text: '用户维度', color: '#C4B5FD' },
            { id: 'time', text: '时间维度', color: '#C4B5FD' }
          ]
        },
        {
          id: 'external',
          text: '外部因素',
          color: '#EA580C',
          children: [
            { id: 'market', text: '市场环境', color: '#FED7AA' },
            { id: 'competitor', text: '竞争对手', color: '#FED7AA' },
            { id: 'season', text: '季节性因素', color: '#FED7AA' }
          ]
        }
      ]
    }
  },
  {
    id: 'marketing-roi-optimization',
    title: '营销ROI优化分析',
    category: '营销分析',
    industry: '在线教育',
    problem: '在线教育平台投放的广告ROI持续下降，需要优化投放策略提升营销效率',
    businessContext: '一个K12在线教育平台，通过多渠道投放获客，但最近发现获客成本上升，ROI下降，需要优化投放策略。',
    solution: '通过渠道分析、用户生命周期价值分析、归因分析等方法，优化营销投放策略',
    thinkingProcess: [
      '现状诊断：分析当前各渠道的投放效果和ROI表现',
      '渠道对比：横向对比不同渠道的获客成本和质量',
      'LTV分析：计算不同渠道用户的生命周期价值',
      '归因分析：分析用户转化路径和触点贡献',
      '用户画像：分析高价值用户的特征和行为',
      '策略优化：基于分析结果调整投放策略',
      '效果监控：建立监控体系持续优化'
    ],
    keyMetrics: ['ROI', 'CAC', 'LTV', '转化率', '留存率', 'ARPU'],
    tools: ['Google Analytics', 'Python', 'SQL', 'Tableau'],
    difficulty: 'advanced',
    tags: ['营销分析', 'ROI优化', 'LTV分析', '归因分析'],
    mindMapData: {
      id: 'root',
      text: '营销ROI优化',
      isRoot: true,
      color: '#7C3AED',
      children: [
        {
          id: 'current',
          text: '现状分析',
          color: '#DC2626',
          children: [
            { id: 'roi-trend', text: 'ROI趋势分析', color: '#FCA5A5' },
            { id: 'cac-analysis', text: '获客成本分析', color: '#FCA5A5' },
            { id: 'channel-performance', text: '渠道效果对比', color: '#FCA5A5' }
          ]
        },
        {
          id: 'deep-dive',
          text: '深度分析',
          color: '#059669',
          children: [
            { id: 'ltv', text: 'LTV计算', color: '#86EFAC' },
            { id: 'attribution', text: '归因分析', color: '#86EFAC' },
            { id: 'user-profile', text: '用户画像', color: '#86EFAC' }
          ]
        },
        {
          id: 'optimization',
          text: '优化策略',
          color: '#EA580C',
          children: [
            { id: 'budget', text: '预算分配优化', color: '#FED7AA' },
            { id: 'targeting', text: '定向优化', color: '#FED7AA' },
            { id: 'creative', text: '创意优化', color: '#FED7AA' }
          ]
        }
      ]
    }
  },
  {
    id: 'inventory-optimization',
    title: '库存周转率优化',
    category: '运营分析',
    industry: '传统零售',
    problem: '零售连锁店库存周转率低，资金占用严重，需要优化库存管理策略',
    businessContext: '一个拥有100+门店的零售连锁企业，库存周转率远低于行业平均水平，影响现金流和盈利能力。',
    solution: '通过ABC分析、需求预测、安全库存计算等方法，建立科学的库存管理体系',
    thinkingProcess: [
      '现状评估：分析当前库存结构和周转情况',
      'ABC分析：按销售额和利润贡献对商品分类',
      '需求分析：分析历史销售数据和季节性规律',
      '预测建模：建立需求预测模型',
      '库存策略：制定不同类别商品的库存策略',
      '补货优化：优化补货周期和数量',
      '效果监控：建立库存监控指标体系'
    ],
    keyMetrics: ['库存周转率', '缺货率', '库存成本', '毛利率', '现金流'],
    tools: ['Excel', 'Python', 'ERP系统', 'BI工具'],
    difficulty: 'intermediate',
    tags: ['运营分析', '库存管理', 'ABC分析', '需求预测'],
    mindMapData: {
      id: 'root',
      text: '库存优化分析',
      isRoot: true,
      color: '#059669',
      children: [
        {
          id: 'current-state',
          text: '现状分析',
          color: '#DC2626',
          children: [
            { id: 'turnover', text: '周转率分析', color: '#FCA5A5' },
            { id: 'structure', text: '库存结构', color: '#FCA5A5' },
            { id: 'cost', text: '库存成本', color: '#FCA5A5' }
          ]
        },
        {
          id: 'classification',
          text: '商品分类',
          color: '#7C3AED',
          children: [
            { id: 'abc', text: 'ABC分析', color: '#C4B5FD' },
            { id: 'fast-slow', text: '快慢销分析', color: '#C4B5FD' },
            { id: 'seasonality', text: '季节性分析', color: '#C4B5FD' }
          ]
        },
        {
          id: 'strategy',
          text: '优化策略',
          color: '#EA580C',
          children: [
            { id: 'replenishment', text: '补货策略', color: '#FED7AA' },
            { id: 'safety-stock', text: '安全库存', color: '#FED7AA' },
            { id: 'clearance', text: '清库策略', color: '#FED7AA' }
          ]
        }
      ]
    }
  }
]

// 获取场景分类
export const getScenarioCategories = () => {
  const categories = [...new Set(businessScenarios.map(s => s.category))]
  return categories.map(category => ({
    name: category,
    count: businessScenarios.filter(s => s.category === category).length,
    scenarios: businessScenarios.filter(s => s.category === category)
  }))
}

// 按难度筛选场景
export const getScenariosByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return businessScenarios.filter(s => s.difficulty === difficulty)
}

// 搜索场景
export const searchScenarios = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return businessScenarios.filter(scenario =>
    scenario.title.toLowerCase().includes(lowercaseQuery) ||
    scenario.problem.toLowerCase().includes(lowercaseQuery) ||
    scenario.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    scenario.industry.toLowerCase().includes(lowercaseQuery)
  )
}
