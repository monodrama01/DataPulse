// 技能页面数据结构和类型定义

export interface Skill {
  id: string
  name: string
  level: number // 1-100 熟练度
  category: SkillCategory
  description: string
  tools: string[]
  relatedProjects: string[] // 项目ID数组
}

export type SkillCategory = 'analysis' | 'processing' | 'visualization' | 'statistics' | 'tools'

export interface SkillGroup {
  id: SkillCategory
  name: string
  icon: string
  description: string
  color: string
  skills: Skill[]
}

// 技能雷达图数据
export interface RadarData {
  name: string
  level: number
  fullMark: number
}

// 技能数据定义
export const skillsData: Skill[] = [
  // 数据分析方法
  {
    id: 'comparative_analysis',
    name: '对比分析',
    level: 90,
    category: 'analysis',
    description: '同比/环比分析，趋势对比，多维度对比分析',
    tools: ['Excel', 'Python', 'SQL'],
    relatedProjects: ['1', '3']
  },
  {
    id: 'funnel_analysis',
    name: '漏斗分析',
    level: 85,
    category: 'analysis',
    description: '用户转化漏斗，业务流程分析，转化率优化',
    tools: ['Python', 'SQL', 'Power BI'],
    relatedProjects: ['1', '2']
  },
  {
    id: 'retention_analysis',
    name: '留存分析',
    level: 80,
    category: 'analysis',
    description: '用户留存率分析，生命周期价值计算',
    tools: ['Python', 'SQL'],
    relatedProjects: ['1']
  },
  {
    id: 'rfm_analysis',
    name: 'RFM用户分层',
    level: 88,
    category: 'analysis',
    description: '基于消费频次、金额、时间的用户价值分析',
    tools: ['Python', 'SQL'],
    relatedProjects: ['4']
  },
  {
    id: 'ab_testing',
    name: 'A/B测试',
    level: 75,
    category: 'analysis',
    description: 'A/B测试设计、实施与结果分析',
    tools: ['Python', '统计学'],
    relatedProjects: ['1']
  },

  // 数据处理与查询
  {
    id: 'python_pandas',
    name: 'Python (Pandas)',
    level: 92,
    category: 'processing',
    description: '数据清洗、转换、聚合分析，数据建模',
    tools: ['Pandas', 'NumPy', 'Jupyter'],
    relatedProjects: ['1', '2']
  },
  {
    id: 'python_numpy',
    name: 'Python (NumPy)',
    level: 85,
    category: 'processing',
    description: '数值计算、数组操作、科学计算',
    tools: ['NumPy', 'Python'],
    relatedProjects: ['1', '2']
  },
  {
    id: 'sql_mysql',
    name: 'SQL (MySQL)',
    level: 90,
    category: 'processing',
    description: 'SQL查询、窗口函数、存储过程，数据库设计',
    tools: ['MySQL', 'Navicat'],
    relatedProjects: ['3', '4']
  },
  {
    id: 'excel_advanced',
    name: 'Excel高级功能',
    level: 88,
    category: 'processing',
    description: '数据透视表、Power Query、Power Pivot、VBA',
    tools: ['Excel', 'Power Query', 'Power Pivot'],
    relatedProjects: ['3']
  },

  // 数据可视化
  {
    id: 'powerbi',
    name: 'Power BI',
    level: 85,
    category: 'visualization',
    description: '交互式仪表盘设计，DAX函数，数据建模',
    tools: ['Power BI', 'DAX'],
    relatedProjects: ['2', '3']
  },
  {
    id: 'tableau',
    name: 'Tableau',
    level: 70,
    category: 'visualization',
    description: '数据可视化、交互式图表设计',
    tools: ['Tableau'],
    relatedProjects: ['2']
  },
  {
    id: 'python_viz',
    name: 'Python可视化',
    level: 82,
    category: 'visualization',
    description: 'Matplotlib、Seaborn、Plotly图表制作',
    tools: ['Matplotlib', 'Seaborn', 'Plotly'],
    relatedProjects: ['1', '2']
  },
  {
    id: 'excel_charts',
    name: 'Excel图表',
    level: 90,
    category: 'visualization',
    description: '专业图表设计、动态图表、报表制作',
    tools: ['Excel'],
    relatedProjects: ['3']
  },

  // 统计与建模
  {
    id: 'descriptive_stats',
    name: '描述性统计',
    level: 85,
    category: 'statistics',
    description: '均值、方差、分布分析，数据探索',
    tools: ['Python', 'Excel'],
    relatedProjects: ['1', '2']
  },
  {
    id: 'hypothesis_testing',
    name: '假设检验',
    level: 80,
    category: 'statistics',
    description: 't检验、卡方检验、方差分析',
    tools: ['Python', 'R'],
    relatedProjects: ['1']
  },
  {
    id: 'time_series',
    name: '时间序列分析',
    level: 75,
    category: 'statistics',
    description: '趋势分析、季节性分解、预测模型',
    tools: ['Python', 'Excel'],
    relatedProjects: ['2']
  },

  // 工具
  {
    id: 'jupyter',
    name: 'Jupyter Notebook',
    level: 90,
    category: 'tools',
    description: '交互式数据分析环境，代码文档化',
    tools: ['Jupyter', 'Python'],
    relatedProjects: ['1', '2']
  },
  {
    id: 'navicat',
    name: 'Navicat',
    level: 85,
    category: 'tools',
    description: '数据库管理、查询优化、数据导入导出',
    tools: ['Navicat', 'MySQL'],
    relatedProjects: ['3', '4']
  },
  {
    id: 'linux_basics',
    name: 'Linux基础',
    level: 70,
    category: 'tools',
    description: '命令行操作、文件管理、脚本编写',
    tools: ['Linux', 'Shell'],
    relatedProjects: []
  },
  {
    id: 'github',
    name: 'GitHub',
    level: 80,
    category: 'tools',
    description: '版本控制、代码管理、协作开发',
    tools: ['Git', 'GitHub'],
    relatedProjects: ['1', '2']
  }
]

// 技能分组配置
export const skillGroups: SkillGroup[] = [
  {
    id: 'analysis',
    name: '数据分析方法',
    icon: '📊',
    description: '对比分析、漏斗分析、留存分析、RFM用户分层、A/B测试',
    color: 'from-blue-500 to-cyan-500',
    skills: skillsData.filter(skill => skill.category === 'analysis')
  },
  {
    id: 'processing',
    name: '数据处理与查询',
    icon: '🗄️',
    description: 'Python数据处理、SQL查询、Excel高级功能',
    color: 'from-green-500 to-emerald-500',
    skills: skillsData.filter(skill => skill.category === 'processing')
  },
  {
    id: 'visualization',
    name: '数据可视化',
    icon: '📈',
    description: 'Power BI、Tableau、Python可视化、Excel图表',
    color: 'from-purple-500 to-pink-500',
    skills: skillsData.filter(skill => skill.category === 'visualization')
  },
  {
    id: 'statistics',
    name: '统计与建模',
    icon: '📐',
    description: '描述统计、假设检验、时间序列分析',
    color: 'from-orange-500 to-red-500',
    skills: skillsData.filter(skill => skill.category === 'statistics')
  },
  {
    id: 'tools',
    name: '工具',
    icon: '⚙️',
    description: 'Jupyter Notebook、Navicat、Linux、GitHub',
    color: 'from-gray-500 to-slate-600',
    skills: skillsData.filter(skill => skill.category === 'tools')
  }
]

// 生成雷达图数据
export const generateRadarData = (): RadarData[] => {
  const categoryAverages = skillGroups.map(group => {
    const avgLevel = group.skills.reduce((sum, skill) => sum + skill.level, 0) / group.skills.length
    return {
      name: group.name,
      level: Math.round(avgLevel),
      fullMark: 100
    }
  })
  
  return categoryAverages
}

// 获取技能详情
export const getSkillById = (id: string): Skill | undefined => {
  return skillsData.find(skill => skill.id === id)
}

// 获取分组技能
export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skillsData.filter(skill => skill.category === category)
}

// 获取技能相关项目
export const getSkillProjects = (skillId: string) => {
  const skill = getSkillById(skillId)
  return skill?.relatedProjects || []
}

// 技能熟练度等级
export const getSkillLevel = (level: number): { label: string; color: string } => {
  if (level >= 90) return { label: '精通', color: 'text-green-600' }
  if (level >= 80) return { label: '熟练', color: 'text-blue-600' }
  if (level >= 70) return { label: '良好', color: 'text-yellow-600' }
  if (level >= 60) return { label: '一般', color: 'text-orange-600' }
  return { label: '入门', color: 'text-gray-600' }
}
