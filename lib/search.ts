// 搜索功能的数据结构和逻辑

export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'skill' | 'project' | 'note' | 'page'
  url: string
  tags?: string[]
  category?: string
  relevanceScore?: number
}

export interface SearchCategory {
  id: string
  name: string
  icon: string
  color: string
}

// 搜索分类
export const searchCategories: SearchCategory[] = [
  { id: 'all', name: '全部', icon: '🔍', color: 'text-gray-600' },
  { id: 'skill', name: '技能', icon: '🎯', color: 'text-blue-600' },
  { id: 'project', name: '项目', icon: '📁', color: 'text-green-600' },
  { id: 'note', name: '笔记', icon: '📝', color: 'text-purple-600' },
  { id: 'page', name: '页面', icon: '📄', color: 'text-orange-600' },
]

// 模拟搜索数据库
export const searchDatabase: SearchResult[] = [
  // 技能相关
  {
    id: 'skill-python',
    title: 'Python数据分析',
    description: 'Python在数据分析中的应用，包括Pandas、NumPy、Matplotlib等库的使用',
    type: 'skill',
    url: '/python',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    category: '编程语言'
  },
  {
    id: 'skill-sql',
    title: 'SQL数据库查询',
    description: 'SQL语言基础、高级查询、窗口函数、存储过程等数据库操作技能',
    type: 'skill',
    url: '/sql',
    tags: ['SQL', 'MySQL', '数据库', '窗口函数'],
    category: '数据库'
  },
  {
    id: 'skill-excel',
    title: 'Excel数据处理',
    description: 'Excel高级功能：数据透视表、Power Query、VBA自动化、图表制作',
    type: 'skill',
    url: '/excel',
    tags: ['Excel', 'VBA', '数据透视表', 'Power Query'],
    category: '办公软件'
  },
  {
    id: 'skill-powerbi',
    title: 'Power BI可视化',
    description: 'Power BI仪表盘设计、DAX函数、数据建模和交互式报表制作',
    type: 'skill',
    url: '/visualization',
    tags: ['Power BI', 'DAX', '数据可视化', '仪表盘'],
    category: '商业智能'
  },
  {
    id: 'skill-ml',
    title: '机器学习算法',
    description: '监督学习、无监督学习、深度学习算法及其在数据分析中的应用',
    type: 'skill',
    url: '/machine-learning',
    tags: ['机器学习', 'scikit-learn', '深度学习', '算法'],
    category: '人工智能'
  },
  {
    id: 'skill-statistics',
    title: '统计分析方法',
    description: '描述统计、假设检验、回归分析、时间序列分析等统计方法',
    type: 'skill',
    url: '/statistics',
    tags: ['统计学', '假设检验', '回归分析', 'A/B测试'],
    category: '统计学'
  },

  // 项目相关
  {
    id: 'project-ecommerce',
    title: '电商用户行为分析',
    description: '基于用户购买数据的行为分析和预测模型构建，包含RFM分析、用户画像等',
    type: 'project',
    url: '/projects/1',
    tags: ['Python', '机器学习', '用户行为', 'RFM分析'],
    category: 'Notebook项目'
  },
  {
    id: 'project-dashboard',
    title: '销售数据看板',
    description: '实时销售数据监控和KPI展示看板，支持多维度数据钻取',
    type: 'project',
    url: '/projects/2',
    tags: ['Power BI', '销售分析', '实时监控', 'KPI'],
    category: 'Dashboard看板'
  },
  {
    id: 'project-financial',
    title: '财务报表分析模板',
    description: '企业财务数据分析和可视化Excel模板，包含财务比率分析',
    type: 'project',
    url: '/projects/3',
    tags: ['Excel', '财务分析', '模板', '图表'],
    category: 'Excel项目'
  },
  {
    id: 'project-sql-rfm',
    title: '客户细分SQL查询',
    description: '基于RFM模型的客户价值分析SQL脚本，实现客户分层和价值评估',
    type: 'project',
    url: '/projects/4',
    tags: ['SQL', '客户分析', 'RFM模型', '数据挖掘'],
    category: 'SQL项目'
  },

  // 页面相关
  {
    id: 'page-skills',
    title: '技能总览',
    description: '个人技能体系展示，包含技能雷达图、熟练度评估和项目映射',
    type: 'page',
    url: '/skills',
    tags: ['技能展示', '雷达图', '能力评估'],
    category: '个人展示'
  },
  {
    id: 'page-projects',
    title: '项目作品集',
    description: '数据分析项目作品集，按类型分类展示Notebook、Excel、Dashboard等项目',
    type: 'page',
    url: '/projects',
    tags: ['项目展示', '作品集', '数据分析'],
    category: '作品展示'
  },
  {
    id: 'page-about',
    title: '关于我',
    description: '个人介绍、联系方式、职业经历和技术背景',
    type: 'page',
    url: '/about',
    tags: ['个人介绍', '联系方式', '职业背景'],
    category: '个人信息'
  },

  // 笔记相关
  {
    id: 'note-pandas-basics',
    title: 'Pandas基础操作',
    description: 'Pandas库的基本数据结构、数据读取、清洗和基础统计操作',
    type: 'note',
    url: '/notes/pandas-basics',
    tags: ['Pandas', 'DataFrame', '数据清洗'],
    category: 'Python学习'
  },
  {
    id: 'note-sql-window',
    title: 'SQL窗口函数详解',
    description: 'SQL窗口函数的使用方法，包括ROW_NUMBER、RANK、LAG等函数应用',
    type: 'note',
    url: '/notes/sql-window-functions',
    tags: ['SQL', '窗口函数', 'ROW_NUMBER', 'RANK'],
    category: 'SQL学习'
  },
  {
    id: 'note-data-viz',
    title: '数据可视化最佳实践',
    description: '数据可视化设计原则、图表选择、颜色搭配和交互设计指南',
    type: 'note',
    url: '/notes/data-visualization-guide',
    tags: ['数据可视化', '图表设计', 'UI/UX'],
    category: '设计指南'
  }
]

// 搜索功能实现
export function searchContent(query: string, category: string = 'all'): SearchResult[] {
  if (!query.trim()) return []

  const lowercaseQuery = query.toLowerCase()
  let results = searchDatabase.filter(item => {
    // 分类过滤
    if (category !== 'all' && item.type !== category) {
      return false
    }

    // 内容匹配
    const titleMatch = item.title.toLowerCase().includes(lowercaseQuery)
    const descriptionMatch = item.description.toLowerCase().includes(lowercaseQuery)
    const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    const categoryMatch = item.category?.toLowerCase().includes(lowercaseQuery)

    return titleMatch || descriptionMatch || tagMatch || categoryMatch
  })

  // 计算相关度分数
  results = results.map(item => {
    let score = 0
    const lowerTitle = item.title.toLowerCase()
    const lowerDesc = item.description.toLowerCase()

    // 标题完全匹配得分最高
    if (lowerTitle === lowercaseQuery) score += 100
    else if (lowerTitle.includes(lowercaseQuery)) score += 50

    // 描述匹配
    if (lowerDesc.includes(lowercaseQuery)) score += 20

    // 标签匹配
    item.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(lowercaseQuery)) score += 30
    })

    // 分类匹配
    if (item.category?.toLowerCase().includes(lowercaseQuery)) score += 10

    return { ...item, relevanceScore: score }
  })

  // 按相关度排序
  return results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
}

// 获取热门搜索词
export const popularSearches = [
  'Python数据分析',
  'SQL查询',
  'Excel图表',
  'Power BI',
  '机器学习',
  'RFM分析',
  '数据可视化',
  '客户分析',
  'A/B测试',
  '时间序列'
]

// 获取搜索建议
export function getSearchSuggestions(query: string): string[] {
  if (!query.trim()) return popularSearches.slice(0, 5)

  const suggestions = new Set<string>()
  const lowercaseQuery = query.toLowerCase()

  // 从数据库中提取建议
  searchDatabase.forEach(item => {
    // 标题建议
    if (item.title.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(item.title)
    }

    // 标签建议
    item.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(tag)
      }
    })

    // 分类建议
    if (item.category?.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(item.category)
    }
  })

  return Array.from(suggestions).slice(0, 8)
}
