// 增强的学习资源数据结构 - 基于Python数据分析关键词的设计风格

export interface LearningItem {
  id: string
  term: string
  definition: string
  example?: string
  code?: string
  category: string
  subcategory: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'function' | 'concept' | 'tool' | 'technique' | 'shortcut'
}

export interface LearningSection {
  id: string
  title: string
  description: string
  icon: string
  color: string
  headerGradient: string
  items: LearningItem[]
  tips: string[]
}

// 1. Jupyter Notebook 使用指南
export const jupyterNotebookGuide: LearningSection = {
  id: 'jupyter-notebook',
  title: 'Jupyter Notebook 使用指南',
  description: '掌握Jupyter Notebook的核心功能和最佳实践',
  icon: '📓',
  color: 'from-orange-400 to-amber-500',
  headerGradient: 'from-red-600 to-purple-600',
  items: [
    {
      id: 'cell-types',
      term: 'Cell Types (单元格类型)',
      definition: 'Jupyter Notebook的三种主要单元格类型',
      subcategory: 'Core Concepts',
      category: '基础概念',
      difficulty: 'beginner',
      type: 'concept',
      code: 'Code Cell: 执行Python代码\nMarkdown Cell: 编写文档\nRaw Cell: 原始文本',
      example: 'Code单元格用于编写和执行Python代码，Markdown单元格用于编写富文本说明。'
    },
    {
      id: 'magic-commands',
      term: 'Magic Commands (魔法命令)',
      definition: '以%或%%开头的特殊命令，用于增强功能',
      subcategory: 'Magic Commands',
      category: '进阶功能',
      difficulty: 'intermediate',
      type: 'function',
      code: '%time: 测量执行时间\n%matplotlib inline: 内联显示图表\n%%writefile: 写入文件\n%load: 加载文件',
      example: '%time sum(range(100))\n%matplotlib inline\n%%writefile test.py'
    },
    {
      id: 'kernel-management',
      term: 'Kernel Management (内核管理)',
      definition: '管理Python解释器和执行环境',
      subcategory: 'Kernel Management',
      category: '系统管理',
      difficulty: 'intermediate',
      type: 'technique',
      code: 'Restart Kernel: 重启内核\nInterrupt Kernel: 中断执行\nChange Kernel: 切换内核\nKernel Gateway: 远程内核',
      example: '内核重启后所有变量会清空，但代码单元格保留。'
    }
  ],
  tips: [
    '使用Shift+Enter运行单元格并跳转到下一个',
    '使用Ctrl+Enter运行单元格并保持在当前单元格',
    '使用A在上方插入单元格，B在下方插入单元格',
    '使用M将单元格转换为Markdown，Y转换为Code',
    '安装nbextensions可以获得更多实用功能'
  ]
}

// 2. XMind 思维导图指南
export const xmindGuide: LearningSection = {
  id: 'xmind-guide',
  title: 'XMind 思维导图指南',
  description: '学会用XMind整理思路，提升逻辑思维能力',
  icon: '🧠',
  color: 'from-purple-500 to-pink-500',
  headerGradient: 'from-purple-600 to-pink-600',
  items: [
    {
      id: 'basic-structures',
      term: 'Basic Structures (基础结构)',
      definition: 'XMind中的基本思维导图结构类型',
      subcategory: 'Map Structures',
      category: '基础结构',
      difficulty: 'beginner',
      type: 'concept',
      code: 'Central Topic: 中心主题\nMain Topic: 主要主题\nSubtopic: 子主题\nFloating Topic: 浮动主题',
      example: '从中心主题开始，向外扩展主要主题，再添加子主题形成层次结构。'
    },
    {
      id: 'visual-elements',
      term: 'Visual Elements (视觉元素)',
      definition: '增强思维导图视觉效果的元素',
      subcategory: 'Visual Design',
      category: '视觉设计',
      difficulty: 'intermediate',
      type: 'tool',
      code: 'Icons: 图标标识\nLabels: 标签分类\nBoundaries: 边界框\nRelationships: 关系线',
      example: '使用图标快速识别不同类型的内容，用标签进行分类管理。'
    },
    {
      id: 'advanced-features',
      term: 'Advanced Features (高级功能)',
      definition: 'XMind的高级功能和应用技巧',
      subcategory: 'Advanced Features',
      category: '高级功能',
      difficulty: 'advanced',
      type: 'technique',
      code: 'Drill Down: 钻取详细\nGantt Chart: 甘特图\nMatrix: 矩阵图\nFishbone: 鱼骨图',
      example: '使用钻取功能管理复杂项目，用甘特图制定时间计划。'
    }
  ],
  tips: [
    '保持主题简洁，每个节点不超过7个关键词',
    '使用颜色和图标增强视觉层次',
    '定期整理和更新思维导图内容',
    '结合快捷键提高创建效率',
    '导出多种格式便于分享和展示'
  ]
}

// 3. 数据分析英文词汇
export const dataAnalysisVocabulary: LearningSection = {
  id: 'data-analysis-vocabulary',
  title: '数据分析英文词汇',
  description: '掌握数据分析领域的核心英文术语',
  icon: '🔤',
  color: 'from-green-500 to-blue-500',
  headerGradient: 'from-green-600 to-blue-600',
  items: [
    {
      id: 'statistical-terms',
      term: 'Statistical Terms (统计术语)',
      definition: '数据分析中常用的统计学术语',
      subcategory: 'Statistical Terms',
      category: '统计概念',
      difficulty: 'beginner',
      type: 'concept',
      code: 'Mean: 平均值\nMedian: 中位数\nMode: 众数\nStandard Deviation: 标准差',
      example: 'The mean value is 15.5, while the median is 14.0.'
    },
    {
      id: 'data-processing',
      term: 'Data Processing (数据处理)',
      definition: '数据清洗和预处理相关术语',
      subcategory: 'Data Processing',
      category: '数据处理',
      difficulty: 'intermediate',
      type: 'technique',
      code: 'Data Cleaning: 数据清洗\nNull Values: 空值\nOutliers: 异常值\nNormalization: 标准化',
      example: 'We need to handle null values before data analysis.'
    },
    {
      id: 'ml-terminology',
      term: 'ML Terminology (机器学习术语)',
      definition: '机器学习和AI相关的专业术语',
      subcategory: 'Machine Learning',
      category: '机器学习',
      difficulty: 'advanced',
      type: 'concept',
      code: 'Feature Engineering: 特征工程\nModel Training: 模型训练\nCross Validation: 交叉验证\nOverfitting: 过拟合',
      example: 'Feature engineering is crucial for model performance.'
    }
  ],
  tips: [
    '建立英文术语和中文概念的对应关系',
    '在实际项目中使用英文术语增强理解',
    '阅读英文技术文档提高专业水平',
    '关注行业最新术语和缩写',
    '与国际团队协作时使用标准术语'
  ]
}

// 4. Python 数据分析关键词
export const pythonKeywords: LearningSection = {
  id: 'python-keywords',
  title: 'Python 数据分析关键词',
  description: 'Python数据分析中的核心库和函数',
  icon: '🐍',
  color: 'from-blue-500 to-cyan-500',
  headerGradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      id: 'pandas-core',
      term: 'Pandas Core Functions',
      definition: 'Pandas库的核心数据操作函数',
      subcategory: 'Pandas Core Functions',
      category: 'Pandas',
      difficulty: 'intermediate',
      type: 'function',
      code: 'read_csv(): 读取CSV\ngroupby(): 分组聚合\nmerge(): 数据合并\npivot_table(): 透视表',
      example: 'df = pd.read_csv("data.csv")\ndf.groupby("category").sum()'
    },
    {
      id: 'numpy-operations',
      term: 'NumPy Operations',
      definition: 'NumPy数组操作和数学函数',
      subcategory: 'NumPy Operations',
      category: 'NumPy',
      difficulty: 'beginner',
      type: 'function',
      code: 'np.array(): 创建数组\nnp.mean(): 计算均值\nnp.reshape(): 改变形状\nnp.where(): 条件选择',
      example: 'arr = np.array([1, 2, 3])\nnp.mean(arr)'
    },
    {
      id: 'matplotlib-plotting',
      term: 'Matplotlib Plotting',
      definition: 'Matplotlib绘图函数和图表类型',
      subcategory: 'Matplotlib Plotting',
      category: 'Matplotlib',
      difficulty: 'intermediate',
      type: 'function',
      code: 'plt.plot(): 线图\nplt.scatter(): 散点图\nplt.bar(): 柱状图\nplt.hist(): 直方图',
      example: 'plt.plot(x, y)\nplt.scatter(x, y)\nplt.show()'
    }
  ],
  tips: [
    '先掌握pandas和numpy基础操作',
    '通过Jupyter Notebook练习代码',
    '多看官方文档和示例',
    '从简单的数据集开始练习',
    '结合实际项目应用学到的知识'
  ]
}

// 5. 机器学习术语
export const machineLearningTerms: LearningSection = {
  id: 'machine-learning-terms',
  title: '机器学习术语',
  description: '机器学习领域的核心概念和算法',
  icon: '🤖',
  color: 'from-red-500 to-purple-500',
  headerGradient: 'from-red-600 to-purple-600',
  items: [
    {
      id: 'supervised-learning',
      term: 'Supervised Learning (监督学习)',
      definition: '使用标记数据训练模型的机器学习方法',
      subcategory: 'Learning Types',
      category: '学习类型',
      difficulty: 'beginner',
      type: 'concept',
      code: 'Classification: 分类问题\nRegression: 回归问题\nLabeled Data: 标记数据\nTarget Variable: 目标变量',
      example: '分类预测邮件是否为垃圾邮件，回归预测房价数值。'
    },
    {
      id: 'model-evaluation',
      term: 'Model Evaluation (模型评估)',
      definition: '评估机器学习模型性能的指标和方法',
      subcategory: 'Model Evaluation',
      category: '模型评估',
      difficulty: 'intermediate',
      type: 'technique',
      code: 'Accuracy: 准确率\nPrecision: 精确率\nRecall: 召回率\nF1-Score: F1分数',
      example: 'accuracy_score(y_true, y_pred)\nclassification_report(y_true, y_pred)'
    },
    {
      id: 'deep-learning',
      term: 'Deep Learning (深度学习)',
      definition: '基于神经网络的机器学习方法',
      subcategory: 'Deep Learning',
      category: '深度学习',
      difficulty: 'advanced',
      type: 'concept',
      code: 'Neural Network: 神经网络\nBackpropagation: 反向传播\nGradient Descent: 梯度下降\nDropout: 丢弃法',
      example: 'model = Sequential()\nmodel.add(Dense(128, activation="relu"))'
    }
  ],
  tips: [
    '理解算法原理比记住公式更重要',
    '从简单的线性模型开始学习',
    '多做实验比较不同算法性能',
    '关注数据质量和特征工程',
    '学会解释模型结果和业务价值'
  ]
}

// 6. 常用指标简写词典
export const metricsAbbreviations: LearningSection = {
  id: 'metrics-abbreviations',
  title: '常用指标简写词典',
  description: '数据分析和商业指标的常用简写',
  icon: '📊',
  color: 'from-yellow-500 to-orange-500',
  headerGradient: 'from-yellow-600 to-orange-600',
  items: [
    {
      id: 'business-metrics',
      term: 'Business Metrics (商业指标)',
      definition: '电商和互联网业务的核心指标',
      subcategory: 'Business Metrics',
      category: '商业指标',
      difficulty: 'beginner',
      type: 'concept',
      code: 'GMV: Gross Merchandise Volume\nROI: Return on Investment\nCTR: Click Through Rate\nCVR: Conversion Rate',
      example: 'GMV = 成交总额，ROI = 投资回报率'
    },
    {
      id: 'user-metrics',
      term: 'User Metrics (用户指标)',
      definition: '用户行为和留存相关指标',
      subcategory: 'User Metrics',
      category: '用户指标',
      difficulty: 'intermediate',
      type: 'concept',
      code: 'DAU: Daily Active Users\nMAU: Monthly Active Users\nLTV: Lifetime Value\nCAC: Customer Acquisition Cost',
      example: 'DAU = 日活跃用户数，LTV = 用户生命周期价值'
    },
    {
      id: 'financial-metrics',
      term: 'Financial Metrics (财务指标)',
      definition: '财务分析和投资相关指标',
      subcategory: 'Financial Metrics',
      category: '财务指标',
      difficulty: 'advanced',
      type: 'concept',
      code: 'EBITDA: Earnings Before Interest\nARPU: Average Revenue Per User\nMRR: Monthly Recurring Revenue\nChurn Rate: 流失率',
      example: 'EBITDA = 息税折旧及摊销前利润，ARPU = 每用户平均收入'
    }
  ],
  tips: [
    '理解指标的业务含义比记住公式重要',
    '建立指标体系而不是孤立看单个指标',
    '关注指标的变化趋势和异常值',
    '结合行业特点选择合适的指标',
    '定期审查和更新指标定义'
  ]
}

// 7. SQL 函数速查
export const sqlFunctions: LearningSection = {
  id: 'sql-functions',
  title: 'SQL 函数速查',
  description: 'SQL数据库操作中的核心函数',
  icon: '🗄️',
  color: 'from-emerald-500 to-teal-600',
  headerGradient: 'from-blue-600 to-cyan-600',
  items: [
    {
      id: 'aggregate-functions',
      term: 'Aggregate Functions (聚合函数)',
      definition: 'SQL中用于统计计算的聚合函数',
      subcategory: 'Aggregate Functions',
      category: '聚合函数',
      difficulty: 'beginner',
      type: 'function',
      code: 'COUNT(): 计数\nSUM(): 求和\nAVG(): 平均值\nMAX(), MIN(): 最大最小值',
      example: 'SELECT COUNT(*), AVG(price) FROM products GROUP BY category'
    },
    {
      id: 'window-functions',
      term: 'Window Functions (窗口函数)',
      definition: 'SQL高级分析函数，用于复杂数据分析',
      subcategory: 'Window Functions',
      category: '窗口函数',
      difficulty: 'intermediate',
      type: 'function',
      code: 'ROW_NUMBER(): 行号\nRANK(): 排名\nLAG(), LEAD(): 取前后值\nNTILE(): 分组',
      example: 'SELECT *, ROW_NUMBER() OVER (ORDER BY sales DESC) as rank FROM sales_data'
    },
    {
      id: 'string-functions',
      term: 'String Functions (字符串函数)',
      definition: '字符串处理和文本分析函数',
      subcategory: 'String Functions',
      category: '字符串函数',
      difficulty: 'intermediate',
      type: 'function',
      code: 'CONCAT(): 字符串连接\nSUBSTRING(): 截取子串\nREPLACE(): 替换\nUPPER(), LOWER(): 大小写转换',
      example: 'SELECT CONCAT(first_name, " ", last_name) as full_name FROM users'
    }
  ],
  tips: [
    '熟练掌握GROUP BY和聚合函数的组合使用',
    '学会使用窗口函数解决复杂分析问题',
    '注意NULL值的处理和影响',
    '理解SQL执行顺序优化查询性能',
    '多练习复杂查询的编写和调试'
  ]
}

// 8. Excel 快捷键
export const excelShortcuts: LearningSection = {
  id: 'excel-shortcuts',
  title: 'Excel 快捷键',
  description: '提高Excel操作效率的快捷键组合',
  icon: '⌨️',
  color: 'from-green-500 to-teal-500',
  headerGradient: 'from-green-600 to-teal-600',
  items: [
    {
      id: 'basic-shortcuts',
      term: 'Basic Shortcuts (基础快捷键)',
      definition: 'Excel中最常用的基础操作快捷键',
      subcategory: 'Basic Operations',
      category: '基础操作',
      difficulty: 'beginner',
      type: 'shortcut',
      code: 'Ctrl+C: 复制\nCtrl+V: 粘贴\nCtrl+Z: 撤销\nCtrl+S: 保存',
      example: '使用Ctrl+C复制单元格，Ctrl+V粘贴到目标位置'
    },
    {
      id: 'navigation-shortcuts',
      term: 'Navigation Shortcuts (导航快捷键)',
      definition: '快速移动和选择单元格的快捷键',
      subcategory: 'Navigation',
      category: '导航操作',
      difficulty: 'intermediate',
      type: 'shortcut',
      code: 'Ctrl+Home: 回到A1\nCtrl+End: 跳到最后\nCtrl+Arrow: 快速移动\nShift+Space: 选择行',
      example: '使用Ctrl+End快速跳转到数据区域的最后一个单元格'
    },
    {
      id: 'formula-shortcuts',
      term: 'Formula Shortcuts (公式快捷键)',
      definition: '公式编辑和函数输入的快捷键',
      subcategory: 'Formula Editing',
      category: '公式编辑',
      difficulty: 'advanced',
      type: 'shortcut',
      code: 'F2: 编辑单元格\nF4: 绝对引用切换\nCtrl+Shift+Enter: 数组公式\nAlt+=: 自动求和',
      example: '使用F4在相对引用和绝对引用之间切换'
    }
  ],
  tips: [
    '每天练习几个新的快捷键，逐步形成肌肉记忆',
    '将最常用的快捷键贴在显示器边缘',
    '学会快捷键组合使用提高效率',
    '自定义快捷键适应个人工作习惯',
    '使用快捷键可以减少鼠标操作，提高工作效率'
  ]
}

// 9. 数据可视化设计原则
export const dataVisualizationPrinciples: LearningSection = {
  id: 'data-visualization-principles',
  title: '数据可视化设计原则',
  description: '创建有效数据可视化的设计准则',
  icon: '🎨',
  color: 'from-violet-500 to-purple-600',
  headerGradient: 'from-violet-600 to-purple-700',
  items: [
    {
      id: 'visual-hierarchy',
      term: 'Visual Hierarchy (视觉层次)',
      definition: '通过视觉元素引导观众注意力的设计原则',
      subcategory: 'Design Principles',
      category: '设计原则',
      difficulty: 'beginner',
      type: 'concept',
      code: 'Size: 大小对比\nColor: 颜色强调\nPosition: 位置布局\nContrast: 对比度',
      example: '用更大的字体突出标题，用鲜艳颜色标记重要数据点'
    },
    {
      id: 'chart-selection',
      term: 'Chart Selection (图表选择)',
      definition: '根据数据类型和分析目的选择合适的图表',
      subcategory: 'Chart Types',
      category: '图表类型',
      difficulty: 'intermediate',
      type: 'technique',
      code: 'Bar Chart: 比较分类数据\nLine Chart: 显示趋势\nScatter Plot: 显示相关性\nHeatmap: 显示模式',
      example: '时间序列数据使用折线图，分类对比使用柱状图'
    },
    {
      id: 'color-theory',
      term: 'Color Theory (色彩理论)',
      definition: '在数据可视化中有效使用颜色的原则',
      subcategory: 'Color Design',
      category: '色彩设计',
      difficulty: 'advanced',
      type: 'concept',
      code: 'Sequential: 渐进色彩\nDiverging: 分叉色彩\nQualitative: 分类色彩\nAccessibility: 无障碍设计',
      example: '使用色盲友好的调色板，避免仅用颜色传达信息'
    }
  ],
  tips: [
    '简洁胜过复杂，避免图表过载',
    '始终考虑目标受众的理解能力',
    '使用一致的颜色和样式建立视觉规范',
    '添加必要的标签和说明文字',
    '测试图表在不同设备上的显示效果'
  ]
}

// 导出所有学习模块
export const enhancedLearningResources: LearningSection[] = [
  jupyterNotebookGuide,
  xmindGuide,
  dataAnalysisVocabulary,
  pythonKeywords,
  machineLearningTerms,
  metricsAbbreviations,
  sqlFunctions,
  excelShortcuts,
  dataVisualizationPrinciples
]

// 搜索函数
export const searchEnhancedLearningResources = (query: string): LearningSection[] => {
  if (!query.trim()) return enhancedLearningResources
  const lowerQuery = query.toLowerCase()

  return enhancedLearningResources.filter(section =>
    section.title.toLowerCase().includes(lowerQuery) ||
    section.description.toLowerCase().includes(lowerQuery) ||
    section.items.some(item =>
      item.term.toLowerCase().includes(lowerQuery) ||
      item.definition.toLowerCase().includes(lowerQuery) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery)) ||
      (item.code && item.code.toLowerCase().includes(lowerQuery)) ||
      (item.example && item.example.toLowerCase().includes(lowerQuery))
    ) ||
    section.tips?.some(tip => tip.toLowerCase().includes(lowerQuery))
  )
}

// 根据模块ID获取学习资源
export const getEnhancedLearningResourceById = (id: string): LearningSection | undefined => {
  return enhancedLearningResources.find(section => section.id === id)
}
