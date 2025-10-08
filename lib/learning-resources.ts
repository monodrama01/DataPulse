// 学习资源数据结构

export interface LearningItem {
  id: string
  term: string
  definition: string
  example?: string
  code?: string
  category?: string
  subcategory?: string
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  type?: 'function' | 'concept' | 'tool' | 'technique'
}

export interface LearningSection {
  id: string
  title: string
  description: string
  icon: string
  color: string
  items: LearningItem[]
  tips?: string[]
}

// Jupyter Notebook 使用指南
export const jupyterNotebookGuide: LearningSection = {
  id: 'jupyter-notebook',
  title: 'Jupyter Notebook 使用指南',
  description: '掌握Jupyter Notebook的核心功能和最佳实践',
  icon: '📓',
  color: 'from-orange-500 to-red-500',
  items: [
    {
      id: 'cell-types',
      term: 'Cell Types (单元格类型)',
      definition: 'Jupyter中的三种主要单元格类型',
      example: 'Code Cell: 执行Python代码\nMarkdown Cell: 编写文档\nRaw Cell: 原始文本',
      category: '基础概念',
      difficulty: 'beginner'
    },
    {
      id: 'magic-commands',
      term: 'Magic Commands (魔法命令)',
      definition: '以%或%%开头的特殊命令，用于增强功能',
      example: '%time: 测量执行时间\n%matplotlib inline: 内联显示图表\n%%writefile: 写入文件',
      category: '进阶功能',
      difficulty: 'intermediate'
    },
    {
      id: 'kernel-management',
      term: 'Kernel Management (内核管理)',
      definition: '管理Python解释器进程，执行代码的后端',
      example: 'Restart Kernel: 重启内核\nInterrupt Kernel: 中断执行\nChange Kernel: 切换Python版本',
      category: '系统管理',
      difficulty: 'intermediate'
    },
    {
      id: 'shortcuts',
      term: 'Keyboard Shortcuts (快捷键)',
      definition: '提高效率的常用快捷键组合',
      example: 'Shift+Enter: 运行单元格\nCtrl+Enter: 运行不跳转\nA: 在上方插入\nB: 在下方插入',
      category: '效率技巧',
      difficulty: 'beginner'
    },
    {
      id: 'extensions',
      term: 'Extensions (扩展插件)',
      definition: '增强Jupyter功能的第三方插件',
      example: 'nbextensions: 界面增强\nVariable Inspector: 变量查看器\nTable of Contents: 目录生成',
      category: '进阶功能',
      difficulty: 'advanced'
    }
  ],
  tips: [
    '使用Markdown单元格写文档，让Notebook更易读',
    '定期保存工作，使用Ctrl+S快捷键',
    '合理使用魔法命令提高分析效率',
    '保持代码单元格简洁，一个单元格一个功能',
    '使用版本控制管理重要的Notebook文件'
  ]
}

// XMind 使用指南
export const xmindGuide: LearningSection = {
  id: 'xmind-guide',
  title: 'XMind 思维导图指南',
  description: '学会用XMind整理思路，提升逻辑思维能力',
  icon: '🧠',
  color: 'from-purple-500 to-indigo-500',
  items: [
    {
      id: 'mind-map-types',
      term: 'Map Types (导图类型)',
      definition: 'XMind支持的不同思维导图结构',
      example: 'Logic Chart: 逻辑图\nTree Chart: 树状图\nOrg Chart: 组织架构图\nFishbone: 鱼骨图',
      category: '基础概念',
      difficulty: 'beginner'
    },
    {
      id: 'topic-management',
      term: 'Topic Management (主题管理)',
      definition: '创建和管理思维导图的主题节点',
      example: 'Central Topic: 中心主题\nMain Topic: 主要主题\nSubtopic: 子主题\nFloating Topic: 浮动主题',
      category: '基础操作',
      difficulty: 'beginner'
    },
    {
      id: 'visual-elements',
      term: 'Visual Elements (视觉元素)',
      definition: '增强导图表现力的视觉组件',
      example: 'Icons: 图标\nImages: 图片\nLabels: 标签\nBoundaries: 边界框',
      category: '美化技巧',
      difficulty: 'intermediate'
    },
    {
      id: 'advanced-features',
      term: 'Advanced Features (高级功能)',
      definition: 'XMind的专业级功能特性',
      example: 'Gantt Chart: 甘特图\nBrainstorming: 头脑风暴\nPresentation: 演示模式\nExport Options: 导出选项',
      category: '高级功能',
      difficulty: 'advanced'
    }
  ],
  tips: [
    '先确定中心主题，再逐步展开分支',
    '使用颜色和图标区分不同类别',
    '保持每个分支的信息简洁明了',
    '定期整理和更新思维导图',
    '善用模板提高制作效率'
  ]
}

// 数据分析英文词汇
export const dataAnalysisVocabulary: LearningSection = {
  id: 'data-analysis-vocabulary',
  title: '数据分析英文词汇',
  description: '掌握数据分析领域的核心英文术语',
  icon: '🔤',
  color: 'from-green-500 to-teal-500',
  items: [
    {
      id: 'basic-terms',
      term: 'Dataset (数据集)',
      definition: '用于分析的完整数据集合',
      example: 'Training Dataset: 训练数据集\nTest Dataset: 测试数据集\nValidation Dataset: 验证数据集',
      category: '基础术语',
      difficulty: 'beginner'
    },
    {
      id: 'data-types',
      term: 'Data Types (数据类型)',
      definition: '数据的不同分类和特征',
      example: 'Numerical: 数值型\nCategorical: 分类型\nOrdinal: 有序型\nNominal: 名义型',
      category: '数据类型',
      difficulty: 'beginner'
    },
    {
      id: 'statistical-measures',
      term: 'Statistical Measures (统计指标)',
      definition: '描述数据特征的统计量',
      example: 'Mean: 均值\nMedian: 中位数\nMode: 众数\nStandard Deviation: 标准差',
      category: '统计指标',
      difficulty: 'intermediate'
    },
    {
      id: 'data-cleaning',
      term: 'Data Cleaning (数据清洗)',
      definition: '处理数据质量问题的过程',
      example: 'Missing Values: 缺失值\nOutliers: 异常值\nDuplicates: 重复值\nInconsistency: 不一致性',
      category: '数据处理',
      difficulty: 'intermediate'
    },
    {
      id: 'visualization-terms',
      term: 'Visualization Terms (可视化术语)',
      definition: '数据可视化相关的专业词汇',
      example: 'Histogram: 直方图\nScatter Plot: 散点图\nHeatmap: 热力图\nDashboard: 仪表盘',
      category: '数据可视化',
      difficulty: 'intermediate'
    }
  ],
  tips: [
    '建议制作英文-中文对照表加深记忆',
    '在实际项目中多使用英文术语',
    '关注国外数据科学博客和论文',
    '参与英文技术社区讨论',
    '定期复习和更新词汇库'
  ]
}

// Python数据分析关键词
export const pythonKeywords: LearningSection = {
  id: 'python-keywords',
  title: 'Python 数据分析关键词',
  description: 'Python数据分析中的核心库和函数',
  icon: '🐍',
  color: 'from-blue-500 to-cyan-500',
  items: [
    {
      id: 'pandas-functions',
      term: 'Pandas Core Functions',
      definition: 'Pandas库的核心数据操作函数',
      example: 'read_csv(): 读取CSV\ngroupby(): 分组聚合\nmerge(): 数据合并\npivot_table(): 透视表',
      category: 'Pandas',
      difficulty: 'intermediate'
    },
    {
      id: 'numpy-operations',
      term: 'NumPy Operations',
      definition: 'NumPy数组操作和数学函数',
      example: 'np.array(): 创建数组\nnp.mean(): 计算均值\nnp.reshape(): 改变形状\nnp.where(): 条件选择',
      category: 'NumPy',
      difficulty: 'beginner'
    },
    {
      id: 'matplotlib-plotting',
      term: 'Matplotlib Plotting',
      definition: 'Matplotlib绘图函数和方法',
      example: 'plt.plot(): 线图\nplt.scatter(): 散点图\nplt.hist(): 直方图\nplt.subplots(): 子图',
      category: 'Matplotlib',
      difficulty: 'intermediate'
    },
    {
      id: 'seaborn-visualization',
      term: 'Seaborn Visualization',
      definition: 'Seaborn高级统计图表函数',
      example: 'sns.heatmap(): 热力图\nsns.boxplot(): 箱线图\nsns.pairplot(): 配对图\nsns.regplot(): 回归图',
      category: 'Seaborn',
      difficulty: 'intermediate'
    },
    {
      id: 'sklearn-modeling',
      term: 'Scikit-learn Modeling',
      definition: '机器学习建模相关函数',
      example: 'train_test_split(): 数据分割\nfit(): 模型训练\npredict(): 预测\nscore(): 评分',
      category: 'Scikit-learn',
      difficulty: 'advanced'
    }
  ],
  tips: [
    '多查阅官方文档了解函数参数',
    '通过实际项目练习函数使用',
    '关注函数的返回值类型',
    '学会使用help()查看函数说明',
    '掌握链式操作提高代码效率'
  ]
}

// 机器学习术语
export const machineLearningTerms: LearningSection = {
  id: 'machine-learning-terms',
  title: '机器学习术语词典',
  description: '机器学习领域的核心概念和算法',
  icon: '🤖',
  color: 'from-red-500 to-pink-500',
  items: [
    {
      id: 'learning-types',
      term: 'Learning Types (学习类型)',
      definition: '机器学习的主要分类方法',
      example: 'Supervised Learning: 监督学习\nUnsupervised Learning: 无监督学习\nReinforcement Learning: 强化学习',
      category: '基础概念',
      difficulty: 'beginner'
    },
    {
      id: 'algorithms',
      term: 'Common Algorithms (常用算法)',
      definition: '机器学习中的经典算法',
      example: 'Linear Regression: 线性回归\nRandom Forest: 随机森林\nSVM: 支持向量机\nK-Means: K均值聚类',
      category: '算法',
      difficulty: 'intermediate'
    },
    {
      id: 'evaluation-metrics',
      term: 'Evaluation Metrics (评估指标)',
      definition: '模型性能评估的关键指标',
      example: 'Accuracy: 准确率\nPrecision: 精确率\nRecall: 召回率\nF1-Score: F1分数\nAUC-ROC: ROC曲线下面积',
      category: '模型评估',
      difficulty: 'intermediate'
    },
    {
      id: 'model-issues',
      term: 'Model Issues (模型问题)',
      definition: '机器学习中常见的模型问题',
      example: 'Overfitting: 过拟合\nUnderfitting: 欠拟合\nBias: 偏差\nVariance: 方差',
      category: '模型诊断',
      difficulty: 'advanced'
    },
    {
      id: 'deep-learning',
      term: 'Deep Learning (深度学习)',
      definition: '深度学习相关的专业术语',
      example: 'Neural Network: 神经网络\nBackpropagation: 反向传播\nGradient Descent: 梯度下降\nActivation Function: 激活函数',
      category: '深度学习',
      difficulty: 'advanced'
    }
  ],
  tips: [
    '理论学习与实践相结合',
    '关注算法的适用场景',
    '掌握评估指标的计算方法',
    '了解算法的优缺点',
    '跟进最新的研究进展'
  ]
}

// 常用指标简写
export const metricsAbbreviations: LearningSection = {
  id: 'metrics-abbreviations',
  title: '常用指标简写词典',
  description: '数据分析和商业指标的常用缩写',
  icon: '📊',
  color: 'from-yellow-500 to-orange-500',
  items: [
    {
      id: 'business-metrics',
      term: 'Business Metrics (商业指标)',
      definition: '商业分析中的关键指标缩写',
      example: 'KPI: Key Performance Indicator (关键绩效指标)\nROI: Return on Investment (投资回报率)\nCAC: Customer Acquisition Cost (客户获取成本)\nLTV: Lifetime Value (客户生命周期价值)',
      category: '商业指标',
      difficulty: 'intermediate'
    },
    {
      id: 'marketing-metrics',
      term: 'Marketing Metrics (营销指标)',
      definition: '数字营销中的常用指标',
      example: 'CTR: Click-Through Rate (点击率)\nCPC: Cost Per Click (每次点击成本)\nCPM: Cost Per Mille (千次展示成本)\nCPA: Cost Per Action (每次行动成本)',
      category: '营销指标',
      difficulty: 'intermediate'
    },
    {
      id: 'web-analytics',
      term: 'Web Analytics (网站分析)',
      definition: '网站分析中的关键指标',
      example: 'UV: Unique Visitors (独立访客)\nPV: Page Views (页面浏览量)\nBounce Rate: 跳出率\nSession Duration: 会话时长',
      category: '网站分析',
      difficulty: 'beginner'
    },
    {
      id: 'financial-metrics',
      term: 'Financial Metrics (财务指标)',
      definition: '财务分析中的重要指标',
      example: 'EBITDA: Earnings Before Interest, Taxes, Depreciation, and Amortization\nROE: Return on Equity (净资产收益率)\nROA: Return on Assets (资产收益率)\nGPM: Gross Profit Margin (毛利率)',
      category: '财务指标',
      difficulty: 'advanced'
    },
    {
      id: 'statistical-metrics',
      term: 'Statistical Metrics (统计指标)',
      definition: '统计分析中的常用缩写',
      example: 'SD: Standard Deviation (标准差)\nCI: Confidence Interval (置信区间)\nMAE: Mean Absolute Error (平均绝对误差)\nRMSE: Root Mean Square Error (均方根误差)',
      category: '统计指标',
      difficulty: 'intermediate'
    }
  ],
  tips: [
    '制作指标卡片便于记忆',
    '了解指标的计算公式',
    '掌握指标的业务含义',
    '关注行业特定的指标',
    '定期更新指标知识库'
  ]
}

// 其他实用学习内容
export const additionalResources: LearningSection[] = [
  {
    id: 'sql-functions',
    title: 'SQL 常用函数速查',
    description: 'SQL数据库操作中的核心函数',
    icon: '🗄️',
    color: 'from-indigo-500 to-purple-500',
    items: [
      {
        id: 'aggregate-functions',
        term: 'Aggregate Functions (聚合函数)',
        definition: 'SQL中用于汇总数据的函数',
        example: 'COUNT(): 计数\nSUM(): 求和\nAVG(): 平均值\nMAX(): 最大值\nMIN(): 最小值',
        category: '聚合函数',
        difficulty: 'beginner'
      },
      {
        id: 'window-functions',
        term: 'Window Functions (窗口函数)',
        definition: 'SQL中的高级分析函数',
        example: 'ROW_NUMBER(): 行号\nRANK(): 排名\nLAG(): 前一行值\nLEAD(): 后一行值',
        category: '窗口函数',
        difficulty: 'advanced'
      },
      {
        id: 'string-functions',
        term: 'String Functions (字符串函数)',
        definition: '处理文本数据的SQL函数',
        example: 'CONCAT(): 连接\nSUBSTRING(): 截取\nUPPER(): 转大写\nLOWER(): 转小写',
        category: '字符串函数',
        difficulty: 'intermediate'
      }
    ],
    tips: [
      '多练习复杂查询语句',
      '掌握JOIN操作的各种类型',
      '学会使用索引优化查询',
      '了解不同数据库的语法差异'
    ]
  },
  {
    id: 'excel-shortcuts',
    title: 'Excel 快捷键大全',
    description: '提高Excel操作效率的快捷键组合',
    icon: '⌨️',
    color: 'from-green-500 to-emerald-500',
    items: [
      {
        id: 'navigation-shortcuts',
        term: 'Navigation Shortcuts (导航快捷键)',
        definition: 'Excel中快速导航的快捷键',
        example: 'Ctrl+Home: 回到A1\nCtrl+End: 最后一个单元格\nCtrl+方向键: 快速移动\nF5: 定位',
        category: '导航操作',
        difficulty: 'beginner'
      },
      {
        id: 'formatting-shortcuts',
        term: 'Formatting Shortcuts (格式化快捷键)',
        definition: '快速格式化单元格的快捷键',
        example: 'Ctrl+B: 加粗\nCtrl+I: 斜体\nCtrl+U: 下划线\nCtrl+1: 格式化单元格',
        category: '格式化',
        difficulty: 'beginner'
      },
      {
        id: 'formula-shortcuts',
        term: 'Formula Shortcuts (公式快捷键)',
        definition: '公式编辑相关的快捷键',
        example: 'F2: 编辑单元格\nF4: 绝对引用切换\nCtrl+Shift+Enter: 数组公式\nAlt+=: 自动求和',
        category: '公式编辑',
        difficulty: 'intermediate'
      }
    ],
    tips: [
      '从常用快捷键开始练习',
      '制作快捷键备忘录',
      '在实际工作中强化使用',
      '学习自定义快捷键'
    ]
  },
  {
    id: 'data-visualization-principles',
    title: '数据可视化设计原则',
    description: '创建有效数据可视化的设计准则',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
    items: [
      {
        id: 'chart-selection',
        term: 'Chart Selection (图表选择)',
        definition: '根据数据类型选择合适的图表',
        example: '比较: 柱状图\n趋势: 折线图\n分布: 直方图\n关系: 散点图\n组成: 饼图',
        category: '图表类型',
        difficulty: 'beginner'
      },
      {
        id: 'color-theory',
        term: 'Color Theory (色彩理论)',
        definition: '数据可视化中的色彩运用原则',
        example: '分类数据: 使用不同色相\n数值数据: 使用色彩深浅\n强调重点: 使用对比色\n色盲友好: 避免红绿搭配',
        category: '色彩设计',
        difficulty: 'intermediate'
      },
      {
        id: 'layout-principles',
        term: 'Layout Principles (布局原则)',
        definition: '图表布局和排版的基本原则',
        example: '标题清晰: 简洁明了\n坐标轴: 合理刻度\n图例位置: 不遮挡数据\n留白适当: 避免拥挤',
        category: '布局设计',
        difficulty: 'intermediate'
      }
    ],
    tips: [
      '多参考优秀的可视化作品',
      '了解目标受众的需求',
      '保持图表简洁清晰',
      '注重数据的准确性'
    ]
  }
]

// 获取所有学习资源
export const getAllLearningResources = (): LearningSection[] => {
  return [
    jupyterNotebookGuide,
    xmindGuide,
    dataAnalysisVocabulary,
    pythonKeywords,
    machineLearningTerms,
    metricsAbbreviations,
    ...additionalResources
  ]
}

// 搜索学习资源
export const searchLearningResources = (query: string): LearningItem[] => {
  const allResources = getAllLearningResources()
  const allItems: LearningItem[] = []
  
  allResources.forEach(section => {
    allItems.push(...section.items)
  })
  
  if (!query.trim()) return allItems
  
  const lowercaseQuery = query.toLowerCase()
  return allItems.filter(item => 
    item.term.toLowerCase().includes(lowercaseQuery) ||
    item.definition.toLowerCase().includes(lowercaseQuery) ||
    item.example?.toLowerCase().includes(lowercaseQuery) ||
    item.category?.toLowerCase().includes(lowercaseQuery)
  )
}
