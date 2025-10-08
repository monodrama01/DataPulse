// 项目类型定义
export type ProjectCategory = 'notebook' | 'excel' | 'dashboard' | 'sql'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  filePath?: string      // notebook/excel/sql 文件路径
  linkUrl?: string       // dashboard 的分享链接
  thumbnail?: string     // 缩略图路径
  tags: string[]         // 项目标签
  createdAt: string
  updatedAt: string
  author?: string
  fileSize?: number      // 文件大小 (bytes)
  downloadCount?: number // 下载次数
}

// 项目分类配置
export const projectCategories = {
  notebook: {
    name: 'Notebook 项目',
    description: 'Jupyter Notebook 数据分析项目',
    icon: 'BookOpen',
    color: 'from-cyan-500 to-blue-500',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    acceptedFiles: '.ipynb',
    maxFileSize: 50 * 1024 * 1024, // 50MB
  },
  excel: {
    name: 'Excel 项目',
    description: 'Excel 数据分析和可视化项目',
    icon: 'FileSpreadsheet',
    color: 'from-teal-500 to-cyan-500',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    acceptedFiles: '.xlsx,.xls,.csv',
    maxFileSize: 100 * 1024 * 1024, // 100MB
  },
  dashboard: {
    name: 'Dashboard 看板',
    description: 'Power BI / Tableau 交互式看板',
    icon: 'LayoutDashboard',
    color: 'from-blue-500 to-teal-500',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    acceptedFiles: '',
    maxFileSize: 0,
  },
  sql: {
    name: 'SQL 项目',
    description: 'SQL 查询和数据库分析项目',
    icon: 'Database',
    color: 'from-cyan-400 to-blue-500',
    badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    acceptedFiles: '.sql,.txt',
    maxFileSize: 10 * 1024 * 1024, // 10MB
  }
}

// 获取项目分类信息
export const getProjectCategory = (category: ProjectCategory) => {
  return projectCategories[category]
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 模拟项目数据 (后续将从API获取)
export const mockProjects: Project[] = [
  {
    id: '1',
    title: '电商用户购买行为RFM分析',
    description: '使用Python对电商平台用户进行RFM（最近购买、购买频率、购买金额）分析，包含数据清洗、特征工程、客户分层和可视化',
    category: 'notebook',
    filePath: '/projects/notebooks/ecommerce-rfm-analysis.ipynb',
    thumbnail: '/images/thought.webp',
    tags: ['RFM分析', 'Pandas', '客户分层', '数据可视化'],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-01-20T10:00:00Z',
    author: '数据分析师',
    fileSize: 3.2 * 1024 * 1024,
    downloadCount: 245
  },
  {
    id: '2',
    title: '电商销售漏斗转化分析',
    description: '分析用户从浏览到购买的完整路径，计算各环节转化率，识别流失节点，包含漏斗图、桑基图等可视化',
    category: 'notebook',
    filePath: '/projects/notebooks/ecommerce-funnel-analysis.ipynb',
    thumbnail: '/images/thought.webp',
    tags: ['转化分析', '漏斗模型', 'Seaborn', 'Plotly'],
    createdAt: '2025-01-18T14:30:00Z',
    updatedAt: '2025-01-18T14:30:00Z',
    author: '数据分析师',
    fileSize: 2.8 * 1024 * 1024,
    downloadCount: 189
  },
  {
    id: '3',
    title: '电商商品销售趋势与季节性分析',
    description: '基于时间序列分析电商商品销售趋势，识别季节性模式，使用ARIMA模型进行销量预测',
    category: 'notebook',
    filePath: '/projects/notebooks/ecommerce-sales-forecast.ipynb',
    thumbnail: '/images/thought.webp',
    tags: ['时间序列', 'ARIMA', '销量预测', 'Matplotlib'],
    createdAt: '2025-01-15T09:20:00Z',
    updatedAt: '2025-01-15T09:20:00Z',
    author: '数据科学家',
    fileSize: 4.1 * 1024 * 1024,
    downloadCount: 312
  },
  {
    id: '4',
    title: '电商用户流失预测模型',
    description: '构建机器学习模型预测用户流失风险，包含特征工程、模型训练（逻辑回归、随机森林）、模型评估和SHAP可解释性分析',
    category: 'notebook',
    filePath: '/projects/notebooks/ecommerce-churn-prediction.ipynb',
    thumbnail: '/images/thought.webp',
    tags: ['流失预测', 'Scikit-learn', 'SHAP', '机器学习'],
    createdAt: '2025-01-12T16:45:00Z',
    updatedAt: '2025-01-12T16:45:00Z',
    author: '机器学习工程师',
    fileSize: 5.6 * 1024 * 1024,
    downloadCount: 428
  },
  {
    id: '5',
    title: '电商商品关联规则挖掘（购物篮分析）',
    description: '使用Apriori算法挖掘商品关联规则，发现频繁项集，为商品推荐和捆绑销售提供数据支持，包含支持度、置信度、提升度分析',
    category: 'notebook',
    filePath: '/projects/notebooks/ecommerce-market-basket.ipynb',
    thumbnail: '/images/thought.webp',
    tags: ['关联规则', 'Apriori', '购物篮分析', 'MLxtend'],
    createdAt: '2025-01-10T11:30:00Z',
    updatedAt: '2025-01-10T11:30:00Z',
    author: '数据挖掘工程师',
    fileSize: 3.5 * 1024 * 1024,
    downloadCount: 367
  },
  {
    id: '6',
    title: '电商运营全景数据看板',
    description: '实时监控电商核心指标：GMV、订单量、转化率、流量分析、用户画像、商品销售TOP榜、地域分布等15+关键指标（Power BI）',
    category: 'dashboard',
    linkUrl: 'https://app.powerbi.com/view?r=eyJrIjoiExample-Ecommerce',
    thumbnail: '/images/BI.webp',
    tags: ['Power BI', '电商运营', '实时监控', 'GMV', '转化率'],
    createdAt: '2025-01-25T10:00:00Z',
    updatedAt: '2025-01-25T10:00:00Z',
    author: '电商数据分析师',
    downloadCount: 542
  },
  {
    id: '16',
    title: '用户行为分析看板',
    description: '深度分析用户行为路径、留存率、活跃度、用户生命周期价值（LTV）、漏斗转化、Cohort分析等（Tableau）',
    category: 'dashboard',
    linkUrl: 'https://public.tableau.com/views/UserBehaviorAnalysis',
    thumbnail: '/images/BI.webp',
    tags: ['Tableau', '用户行为', '留存分析', 'LTV', 'Cohort'],
    createdAt: '2025-01-23T14:20:00Z',
    updatedAt: '2025-01-23T14:20:00Z',
    author: '产品数据分析师',
    downloadCount: 467
  },
  {
    id: '17',
    title: '营销活动效果分析看板',
    description: '营销活动ROI、渠道效果对比、转化归因分析、广告投放监控、用户获取成本（CAC）、活动热力图等（Power BI）',
    category: 'dashboard',
    linkUrl: 'https://app.powerbi.com/view?r=eyJrIjoiExample-Marketing',
    thumbnail: '/images/BI.webp',
    tags: ['Power BI', '营销分析', 'ROI', '渠道归因', 'CAC'],
    createdAt: '2025-01-20T09:45:00Z',
    updatedAt: '2025-01-20T09:45:00Z',
    author: '营销数据分析师',
    downloadCount: 389
  },
  {
    id: '18',
    title: '供应链库存管理看板',
    description: '实时库存监控、周转率分析、缺货预警、采购建议、供应商绩效、成本分析、ABC分类管理等（Tableau）',
    category: 'dashboard',
    linkUrl: 'https://public.tableau.com/views/SupplyChainDashboard',
    thumbnail: '/images/BI.webp',
    tags: ['Tableau', '供应链', '库存管理', '周转率', 'ABC分析'],
    createdAt: '2025-01-18T16:30:00Z',
    updatedAt: '2025-01-18T16:30:00Z',
    author: '供应链分析师',
    downloadCount: 298
  },
  {
    id: '19',
    title: '财务报表驾驶舱',
    description: '企业财务核心指标：利润表、资产负债表、现金流量表、财务比率分析、预算执行、成本结构等（Power BI）',
    category: 'dashboard',
    linkUrl: 'https://app.powerbi.com/view?r=eyJrIjoiExample-Finance',
    thumbnail: '/images/BI.webp',
    tags: ['Power BI', '财务分析', '三大报表', '预算管理', 'KPI'],
    createdAt: '2025-01-15T11:10:00Z',
    updatedAt: '2025-01-15T11:10:00Z',
    author: '财务数据分析师',
    downloadCount: 421
  },
  {
    id: '7',
    title: '财务报表分析模板',
    description: '企业三大财务报表（资产负债表、利润表、现金流量表）自动化分析模板，包含财务比率计算、趋势分析、图表可视化',
    category: 'excel',
    filePath: '/projects/excel/financial-analysis.xlsx',
    thumbnail: '/images/excel.webp',
    tags: ['Excel', '财务分析', '三大报表', '自动化'],
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    author: '财务分析师',
    fileSize: 3.8 * 1024 * 1024,
    downloadCount: 267
  },
  {
    id: '20',
    title: '销售数据透视表分析',
    description: '使用数据透视表和切片器进行多维度销售分析，包含产品、区域、时间等多个维度的交叉分析和动态筛选',
    category: 'excel',
    filePath: '/projects/excel/sales-pivot.xlsx',
    thumbnail: '/images/excel.webp',
    tags: ['Excel', '数据透视表', '切片器', '多维分析'],
    createdAt: '2024-01-15T10:20:00Z',
    updatedAt: '2024-01-15T10:20:00Z',
    author: '数据分析师',
    fileSize: 4.5 * 1024 * 1024,
    downloadCount: 189
  },
  {
    id: '21',
    title: '员工绩效考核系统',
    description: 'KPI指标设置、绩效评分、雷达图展示，支持多维度考核和自动排名，包含权重设置和评分标准',
    category: 'excel',
    filePath: '/projects/excel/performance-evaluation.xlsx',
    thumbnail: '/images/excel.webp',
    tags: ['Excel', 'KPI', '绩效考核', '雷达图'],
    createdAt: '2024-01-18T14:30:00Z',
    updatedAt: '2024-01-18T14:30:00Z',
    author: 'HR数据专员',
    fileSize: 2.9 * 1024 * 1024,
    downloadCount: 156
  },
  {
    id: '22',
    title: '库存管理与预警系统',
    description: 'ABC分类管理、安全库存计算、自动预警提醒，包含入库出库记录、库存周转率分析和补货建议',
    category: 'excel',
    filePath: '/projects/excel/inventory-management.xlsx',
    thumbnail: '/images/excel.webp',
    tags: ['Excel', '库存管理', 'ABC分析', '条件格式'],
    createdAt: '2024-01-20T11:45:00Z',
    updatedAt: '2024-01-20T11:45:00Z',
    author: '供应链分析师',
    fileSize: 3.2 * 1024 * 1024,
    downloadCount: 142
  },
  {
    id: '23',
    title: '客户RFM分析模板',
    description: '客户价值分层分析（最近购买、购买频率、购买金额），自动计算RFM评分并生成客户分群，支持营销策略推荐',
    category: 'excel',
    filePath: '/projects/excel/customer-rfm.xlsx',
    thumbnail: '/images/excel.webp',
    tags: ['Excel', 'RFM分析', '客户分层', '营销策略'],
    createdAt: '2024-01-22T16:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
    author: '用户运营分析师',
    fileSize: 3.5 * 1024 * 1024,
    downloadCount: 178
  },
  {
    id: '24',
    title: '项目甘特图与进度追踪',
    description: '自动生成项目甘特图，任务依赖关系管理，进度百分比可视化，包含里程碑标记和延期预警',
    category: 'excel',
    filePath: '/projects/excel/project-gantt.xlsx',
    thumbnail: '/images/excel.webp',
    tags: ['Excel', '甘特图', '项目管理', '进度追踪'],
    createdAt: '2024-01-25T09:30:00Z',
    updatedAt: '2024-01-25T09:30:00Z',
    author: '项目经理',
    fileSize: 2.6 * 1024 * 1024,
    downloadCount: 134
  },
  {
    id: '8',
    title: '用户订单窗口函数分析',
    description: '使用ROW_NUMBER、LAG等窗口函数分析用户订单行为，计算最近订单、累计消费、移动平均等指标（含252行真实订单数据）',
    category: 'sql',
    filePath: '/sql-datasets/orders.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['窗口函数', 'ROW_NUMBER', '订单分析', '真实数据'],
    createdAt: '2025-01-22T10:00:00Z',
    updatedAt: '2025-01-22T10:00:00Z',
    author: '数据分析师',
    fileSize: 8.7 * 1024,
    downloadCount: 156
  },
  {
    id: '9',
    title: '时间序列销售趋势分析',
    description: '60天日销售数据的时间序列分析，计算7日移动平均、同比环比、趋势预测（含180行真实销售数据）',
    category: 'sql',
    filePath: '/sql-datasets/daily_sales.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['时间序列', '移动平均', 'ROWS窗口帧', '趋势分析'],
    createdAt: '2025-01-22T09:30:00Z',
    updatedAt: '2025-01-22T09:30:00Z',
    author: '数据分析师',
    fileSize: 3.7 * 1024,
    downloadCount: 143
  },
  {
    id: '10',
    title: '用户登录连续性分析',
    description: '分析用户连续登录天数，识别活跃用户和流失风险。经典面试题：日期差分组法（含671行登录记录）',
    category: 'sql',
    filePath: '/sql-datasets/user_logins.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['连续性分析', '高频面试题', '日期处理', 'GROUP BY'],
    createdAt: '2025-01-22T09:00:00Z',
    updatedAt: '2025-01-22T09:00:00Z',
    author: '数据分析师',
    fileSize: 11.2 * 1024,
    downloadCount: 198
  },
  {
    id: '11',
    title: '员工薪资分析与排名',
    description: '5个部门60名员工的薪资数据分析，包含部门统计、排名、高于均值员工查询等（含真实数据）',
    category: 'sql',
    filePath: '/sql-datasets/employees.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['薪资分析', 'RANK函数', '子查询', 'GROUP BY'],
    createdAt: '2025-01-22T08:30:00Z',
    updatedAt: '2025-01-22T08:30:00Z',
    author: '人力资源分析师',
    fileSize: 2.4 * 1024,
    downloadCount: 167
  },
  {
    id: '12',
    title: '学生成绩多维度分析',
    description: '100个学生5门课程成绩数据，计算总分、平均分、排名、及格率等多维度指标（含500行成绩数据）',
    category: 'sql',
    filePath: '/sql-datasets/student_scores.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['教育数据', 'CASE WHEN', 'PIVOT', '多维分析'],
    createdAt: '2025-01-21T16:00:00Z',
    updatedAt: '2025-01-21T16:00:00Z',
    author: '教育数据分析师',
    fileSize: 14.2 * 1024,
    downloadCount: 134
  },
  {
    id: '13',
    title: '页面访问漏斗转化分析',
    description: '200个会话1026条访问记录，分析从首页到支付的完整转化漏斗，计算各环节转化率（真实访问数据）',
    category: 'sql',
    filePath: '/sql-datasets/page_views.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['转化漏斗', '多表关联', '业务分析', '电商场景'],
    createdAt: '2025-01-21T15:30:00Z',
    updatedAt: '2025-01-21T15:30:00Z',
    author: '产品分析师',
    fileSize: 36.5 * 1024,
    downloadCount: 189
  },
  {
    id: '14',
    title: '库存进销存管理分析',
    description: '20个商品30天的入库出库记录，计算库存周转率、预警分析、库存成本（含546行库存变动数据）',
    category: 'sql',
    filePath: '/sql-datasets/inventory_changes.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['库存管理', '进销存', '周转率', '供应链'],
    createdAt: '2025-01-21T15:00:00Z',
    updatedAt: '2025-01-21T15:00:00Z',
    author: '供应链分析师',
    fileSize: 18.8 * 1024,
    downloadCount: 145
  },
  {
    id: '15',
    title: '交易流水累计分析',
    description: '50个用户464笔交易的流水明细，使用SUM窗口函数计算累计消费、月度汇总等（真实交易数据）',
    category: 'sql',
    filePath: '/sql-datasets/transactions.csv',
    thumbnail: '/images/SQL.webp',
    tags: ['累计求和', 'SUM OVER', '交易分析', '窗口函数'],
    createdAt: '2025-01-21T14:30:00Z',
    updatedAt: '2025-01-21T14:30:00Z',
    author: '财务分析师',
    fileSize: 16.5 * 1024,
    downloadCount: 172
  }
]

// 根据分类过滤项目
export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return mockProjects.filter(project => project.category === category)
}

// 搜索项目
export const searchProjects = (query: string, category?: ProjectCategory): Project[] => {
  let projects = category ? getProjectsByCategory(category) : mockProjects
  
  if (!query) return projects
  
  const lowercaseQuery = query.toLowerCase()
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
