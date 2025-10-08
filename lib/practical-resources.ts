// 实战资源库数据结构

export interface ResourceItem {
  id: string
  title: string
  description: string
  link?: string
  tags: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  type: 'tutorial' | 'dataset' | 'tool' | 'interview' | 'article' | 'course'
}

export interface ResourceCategory {
  id: string
  title: string
  description: string
  icon: string
  color: string
  items: ResourceItem[]
}

// 1. 学习资料推荐
export const learningMaterials: ResourceCategory = {
  id: 'learning-materials',
  title: '学习资料推荐',
  description: '精选优质学习资源，系统提升数据分析能力',
  icon: 'BookOpen',
  color: 'from-cyan-500 to-blue-500',
  items: [
    {
      id: 'python-basics',
      title: 'Python数据分析入门教程',
      description: '从零开始学习Python数据分析，涵盖Pandas、NumPy等核心库',
      link: 'https://www.kaggle.com/learn/python',
      tags: ['Python', 'Pandas', '入门'],
      difficulty: 'beginner',
      type: 'tutorial'
    },
    {
      id: 'python-100-days',
      title: 'Python-100天从新手到大师',
      description: '系统的Python学习路线，包含基础语法、数据分析、Web开发等',
      link: 'https://github.com/jackfrued/Python-100-Days',
      tags: ['Python', '系统学习', '项目实战'],
      difficulty: 'beginner',
      type: 'course'
    },
    {
      id: 'pandas-cookbook',
      title: 'Pandas数据处理实战手册',
      description: '50+真实数据处理案例，掌握数据清洗、转换、分析技巧',
      link: 'https://pandas.pydata.org/docs/user_guide/cookbook.html',
      tags: ['Pandas', '数据处理', '案例'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'numpy-tutorial',
      title: 'NumPy科学计算完全指南',
      description: '数组操作、矩阵运算、线性代数、随机数生成等核心功能',
      link: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
      tags: ['NumPy', '科学计算', '数组'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'sql-practice',
      title: 'LeetCode SQL题库精讲',
      description: 'LeetCode上150+SQL题目详解，涵盖所有知识点',
      link: 'https://leetcode.com/studyplan/top-sql-50/',
      tags: ['SQL', 'LeetCode', '算法'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'sql-window-functions',
      title: 'SQL窗口函数完全指南',
      description: 'ROW_NUMBER、RANK、LAG、LEAD等窗口函数深度解析',
      link: 'https://mode.com/sql-tutorial/sql-window-functions/',
      tags: ['SQL', '窗口函数', '进阶'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'sql-optimization',
      title: 'SQL性能优化实战',
      description: '索引优化、查询优化、执行计划分析等性能调优技巧',
      link: 'https://use-the-index-luke.com/',
      tags: ['SQL', '性能优化', '进阶'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'statistics-course',
      title: '统计学基础与应用',
      description: '描述性统计、概率分布、假设检验、方差分析等',
      link: 'https://www.khanacademy.org/math/statistics-probability',
      tags: ['统计学', '理论', '应用'],
      difficulty: 'intermediate',
      type: 'course'
    },
    {
      id: 'ab-testing',
      title: 'AB测试完全指南',
      description: '实验设计、样本量计算、统计显著性检验、结果解读',
      link: 'https://exp-platform.com/Documents/2013-02-EXPAS.pdf',
      tags: ['AB测试', '实验设计', '统计'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'excel-advanced',
      title: 'Excel数据分析实战',
      description: '数据透视表、Power Query、Power Pivot高级应用',
      link: 'https://support.microsoft.com/zh-cn/office/excel-视频培训-9bc05390-e94c-46af-a5b3-d7c22f6990bb',
      tags: ['Excel', '数据透视', '进阶'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'excel-vba',
      title: 'Excel VBA自动化编程',
      description: '用VBA实现数据自动化处理和报表生成',
      link: 'https://learn.microsoft.com/zh-cn/office/vba/library-reference/concepts/getting-started-with-vba-in-office',
      tags: ['Excel', 'VBA', '自动化'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'data-viz-matplotlib',
      title: 'Matplotlib可视化从入门到精通',
      description: '折线图、柱状图、散点图、热力图等各类图表绘制',
      link: 'https://matplotlib.org/stable/tutorials/index.html',
      tags: ['Matplotlib', '可视化', 'Python'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'data-viz-seaborn',
      title: 'Seaborn统计可视化实战',
      description: '基于统计的高级可视化，美观的默认样式',
      link: 'https://seaborn.pydata.org/tutorial.html',
      tags: ['Seaborn', '统计可视化', 'Python'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'data-viz-plotly',
      title: 'Plotly交互式图表开发',
      description: '创建交互式、动态的数据可视化图表',
      link: 'https://plotly.com/python/',
      tags: ['Plotly', '交互式', '动态图表'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'data-viz-echarts',
      title: 'ECharts数据可视化实战',
      description: '前端可视化利器，丰富的图表类型和交互效果',
      link: 'https://echarts.apache.org/zh/index.html',
      tags: ['ECharts', '前端', '可视化'],
      difficulty: 'intermediate',
      type: 'tutorial'
    },
    {
      id: 'machine-learning',
      title: '机器学习实战（周志华）',
      description: '西瓜书-机器学习经典教材，理论与实践结合',
      link: 'https://github.com/Vay-keen/Machine-learning-learning-notes',
      tags: ['机器学习', '理论', '经典教材'],
      difficulty: 'advanced',
      type: 'course'
    },
    {
      id: 'ml-sklearn',
      title: 'Scikit-learn机器学习实战',
      description: '分类、回归、聚类、降维等算法的Python实现',
      link: 'https://scikit-learn.org/stable/tutorial/index.html',
      tags: ['Scikit-learn', '机器学习', 'Python'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'deep-learning',
      title: '深度学习入门（吴恩达）',
      description: 'Coursera深度学习专项课程，从基础到实战',
      link: 'https://www.coursera.org/specializations/deep-learning',
      tags: ['深度学习', '神经网络', 'Coursera'],
      difficulty: 'advanced',
      type: 'course'
    },
    {
      id: 'time-series',
      title: '时间序列分析完全指南',
      description: 'ARIMA、Prophet、LSTM等时序预测方法',
      link: 'https://otexts.com/fpp2/',
      tags: ['时间序列', '预测', '进阶'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'data-mining',
      title: '数据挖掘原理与实践',
      description: '关联规则、聚类分析、异常检测等数据挖掘技术',
      link: 'https://www.coursera.org/specializations/data-mining',
      tags: ['数据挖掘', '算法', '实践'],
      difficulty: 'advanced',
      type: 'course'
    }
  ]
}

// 2. 工具使用技巧
export const toolTips: ResourceCategory = {
  id: 'tool-tips',
  title: '工具使用技巧',
  description: '提升工作效率的实用工具和快捷技巧',
  icon: 'Wrench',
  color: 'from-teal-500 to-cyan-500',
  items: [
    {
      id: 'jupyter-shortcuts',
      title: 'Jupyter Notebook 快捷键大全',
      description: 'Shift+Enter运行、Ctrl+Enter原地运行、A/B插入、DD删除、M转Markdown、Y转代码',
      tags: ['Jupyter', '快捷键', '效率'],
      difficulty: 'beginner',
      type: 'tool'
    },
    {
      id: 'jupyter-magic',
      title: 'Jupyter Magic命令详解',
      description: '%timeit计时、%debug调试、%%writefile写文件、%load加载代码等',
      tags: ['Jupyter', 'Magic命令', '进阶'],
      difficulty: 'intermediate',
      type: 'tool'
    },
    {
      id: 'jupyter-extensions',
      title: 'Jupyter扩展插件推荐',
      description: 'Table of Contents目录、Code folding折叠、Variable Inspector变量查看器',
      tags: ['Jupyter', '插件', '扩展'],
      difficulty: 'intermediate',
      type: 'tool'
    },
    {
      id: 'vscode-data',
      title: 'VS Code 数据分析插件推荐',
      description: 'Python、Jupyter、Pylance、Data Wrangler、Rainbow CSV等必备插件',
      tags: ['VS Code', '插件', '开发环境'],
      difficulty: 'beginner',
      type: 'tool'
    },
    {
      id: 'vscode-shortcuts',
      title: 'VS Code 快捷键速查',
      description: 'Ctrl+P快速打开、Ctrl+Shift+P命令面板、Alt+↑↓移动行、Ctrl+D多光标',
      tags: ['VS Code', '快捷键', '效率'],
      difficulty: 'beginner',
      type: 'tool'
    },
    {
      id: 'vscode-remote',
      title: 'VS Code远程开发配置',
      description: 'SSH连接服务器、Docker容器开发、WSL子系统使用',
      tags: ['VS Code', '远程开发', '配置'],
      difficulty: 'advanced',
      type: 'tool'
    },
    {
      id: 'git-basics',
      title: 'Git版本控制基础',
      description: 'clone克隆、add添加、commit提交、push推送、pull拉取、branch分支',
      tags: ['Git', '版本控制', '基础'],
      difficulty: 'beginner',
      type: 'tutorial'
    },
    {
      id: 'git-advanced',
      title: 'Git进阶技巧',
      description: 'rebase变基、cherry-pick挑选、stash暂存、reset回退、merge合并策略',
      tags: ['Git', '进阶', '技巧'],
      difficulty: 'advanced',
      type: 'tutorial'
    },
    {
      id: 'github-actions',
      title: 'GitHub Actions自动化',
      description: '持续集成CI/CD、自动化测试、定时任务、自动部署',
      tags: ['GitHub', '自动化', 'CI/CD'],
      difficulty: 'advanced',
      type: 'tool'
    },
    {
      id: 'navicat-tips',
      title: 'Navicat 数据库管理技巧',
      description: '数据库连接、SQL编辑器、数据导入导出、数据同步、ER图设计',
      tags: ['Navicat', '数据库', 'SQL'],
      difficulty: 'intermediate',
      type: 'tool'
    },
    {
      id: 'dbeaver-tutorial',
      title: 'DBeaver 免费数据库工具',
      description: '支持多种数据库、SQL编辑、ER图、数据可视化、免费开源',
      tags: ['DBeaver', '数据库', '免费'],
      difficulty: 'beginner',
      type: 'tool'
    },
    {
      id: 'excel-shortcuts',
      title: 'Excel 快捷键速查表',
      description: 'Ctrl+T表格、Ctrl+Shift+L筛选、Alt+=求和、F4锁定引用、Ctrl+方向键快速跳转',
      tags: ['Excel', '快捷键', '效率'],
      difficulty: 'beginner',
      type: 'tool'
    },
    {
      id: 'excel-functions',
      title: 'Excel常用函数大全',
      description: 'VLOOKUP/XLOOKUP查找、SUMIFS条件求和、COUNTIFS条件计数、IF逻辑判断',
      tags: ['Excel', '函数', '公式'],
      difficulty: 'intermediate',
      type: 'tool'
    },
    {
      id: 'excel-pivot',
      title: 'Excel数据透视表实战',
      description: '创建透视表、字段拖放、切片器、时间线、计算字段、透视图',
      tags: ['Excel', '透视表', '分析'],
      difficulty: 'intermediate',
      type: 'tool'
    },
    {
      id: 'excel-powerquery',
      title: 'Power Query数据整理',
      description: 'M语言、数据合并、列转换、行筛选、自定义函数、参数化查询',
      tags: ['Power Query', '数据整理', 'ETL'],
      difficulty: 'advanced',
      type: 'tool'
    },
    {
      id: 'powerbi-tips',
      title: 'Power BI DAX函数精讲',
      description: 'CALCULATE、FILTER、ALL、VALUES、RELATED等核心DAX函数',
      tags: ['Power BI', 'DAX', '计算'],
      difficulty: 'advanced',
      type: 'tool'
    },
    {
      id: 'powerbi-modeling',
      title: 'Power BI数据建模',
      description: '星型模型、雪花模型、表关系、度量值、计算列、层次结构',
      tags: ['Power BI', '数据建模', '架构'],
      difficulty: 'advanced',
      type: 'tool'
    },
    {
      id: 'tableau-tutorial',
      title: 'Tableau可视化入门',
      description: '维度和度量、标记卡、筛选器、仪表板、故事板、参数',
      tags: ['Tableau', '可视化', '入门'],
      difficulty: 'intermediate',
      type: 'tool'
    },
    {
      id: 'tableau-calc',
      title: 'Tableau计算字段高级应用',
      description: '表计算、LOD表达式、参数动态计算、窗口函数',
      tags: ['Tableau', '计算', '进阶'],
      difficulty: 'advanced',
      type: 'tool'
    },
    {
      id: 'anaconda-env',
      title: 'Anaconda环境管理',
      description: 'conda创建环境、包管理、环境导出导入、jupyter配置',
      tags: ['Anaconda', '环境管理', 'Python'],
      difficulty: 'beginner',
      type: 'tool'
    }
  ]
}

// 3. 数据集资源
export const datasets: ResourceCategory = {
  id: 'datasets',
  title: '数据集资源',
  description: '练习和项目所需的优质数据集',
  icon: 'Database',
  color: 'from-blue-500 to-teal-500',
  items: [
    {
      id: 'kaggle',
      title: 'Kaggle 数据集平台',
      description: '全球最大的数据科学社区，50000+数据集，涵盖各行各业',
      link: 'https://www.kaggle.com/datasets',
      tags: ['Kaggle', '综合', '社区'],
      type: 'dataset'
    },
    {
      id: 'kaggle-titanic',
      title: 'Kaggle Titanic数据集',
      description: '经典入门数据集，泰坦尼克号乘客生存预测',
      link: 'https://www.kaggle.com/c/titanic',
      tags: ['Kaggle', '入门', '分类'],
      difficulty: 'beginner',
      type: 'dataset'
    },
    {
      id: 'kaggle-house',
      title: 'Kaggle房价预测数据集',
      description: '波士顿房价数据，回归分析经典案例',
      link: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques',
      tags: ['Kaggle', '回归', '房价'],
      difficulty: 'beginner',
      type: 'dataset'
    },
    {
      id: 'uci',
      title: 'UCI机器学习数据库',
      description: '600+经典机器学习数据集，论文引用率最高',
      link: 'https://archive.ics.uci.edu/ml/index.php',
      tags: ['UCI', '机器学习', '经典'],
      type: 'dataset'
    },
    {
      id: 'uci-iris',
      title: 'UCI Iris鸢尾花数据集',
      description: '最著名的分类数据集，机器学习Hello World',
      link: 'https://archive.ics.uci.edu/ml/datasets/iris',
      tags: ['UCI', '分类', '入门'],
      difficulty: 'beginner',
      type: 'dataset'
    },
    {
      id: 'gov-data-cn',
      title: '国家统计局数据',
      description: 'GDP、人口、物价、就业等宏观经济数据',
      link: 'https://data.stats.gov.cn/',
      tags: ['政府数据', '宏观经济', '时间序列'],
      type: 'dataset'
    },
    {
      id: 'gov-data-us',
      title: 'Data.gov 美国政府数据',
      description: '30万+数据集，覆盖农业、气候、教育、能源等领域',
      link: 'https://data.gov/',
      tags: ['政府数据', '美国', '综合'],
      type: 'dataset'
    },
    {
      id: 'ecommerce-data',
      title: '电商用户行为数据集',
      description: '浏览、加购、下单、支付完整链路数据',
      link: 'https://www.kaggle.com/datasets/mkechinov/ecommerce-behavior-data-from-multi-category-store',
      tags: ['电商', '用户行为', '真实场景'],
      difficulty: 'intermediate',
      type: 'dataset'
    },
    {
      id: 'retail-data',
      title: '零售销售数据集',
      description: 'Online Retail数据集，50万+交易记录',
      link: 'https://archive.ics.uci.edu/ml/datasets/Online+Retail',
      tags: ['零售', '销售', 'RFM分析'],
      difficulty: 'intermediate',
      type: 'dataset'
    },
    {
      id: 'finance-stock',
      title: 'Yahoo Finance股票数据',
      description: '全球股票历史价格、交易量数据，免费API',
      link: 'https://finance.yahoo.com/',
      tags: ['金融', '股票', 'API'],
      difficulty: 'intermediate',
      type: 'dataset'
    },
    {
      id: 'finance-crypto',
      title: '加密货币历史数据',
      description: 'CoinMarketCap加密货币价格、市值数据',
      link: 'https://coinmarketcap.com/',
      tags: ['金融', '加密货币', '时间序列'],
      difficulty: 'advanced',
      type: 'dataset'
    },
    {
      id: 'covid19-data',
      title: 'COVID-19疫情数据',
      description: '全球疫情时间序列数据，约翰霍普金斯大学整理',
      link: 'https://github.com/CSSEGISandData/COVID-19',
      tags: ['疫情', '时间序列', '公共卫生'],
      difficulty: 'intermediate',
      type: 'dataset'
    },
    {
      id: 'movie-data',
      title: 'IMDB电影数据集',
      description: '电影评分、票房、演员、导演等信息',
      link: 'https://www.imdb.com/interfaces/',
      tags: ['电影', '推荐系统', '文本'],
      difficulty: 'intermediate',
      type: 'dataset'
    },
    {
      id: 'image-mnist',
      title: 'MNIST手写数字数据集',
      description: '70000张手写数字图片，计算机视觉入门',
      link: 'http://yann.lecun.com/exdb/mnist/',
      tags: ['图像', '深度学习', '分类'],
      difficulty: 'intermediate',
      type: 'dataset'
    },
    {
      id: 'text-imdb',
      title: 'IMDB电影评论数据集',
      description: '50000条电影评论，情感分析经典数据',
      link: 'https://ai.stanford.edu/~amaas/data/sentiment/',
      tags: ['文本', 'NLP', '情感分析'],
      difficulty: 'advanced',
      type: 'dataset'
    },
    {
      id: 'sample-data',
      title: 'Seaborn内置数据集',
      description: 'tips、iris、titanic等小型练习数据集',
      link: 'https://github.com/mwaskom/seaborn-data',
      tags: ['样本', '练习', '入门'],
      difficulty: 'beginner',
      type: 'dataset'
    },
    {
      id: 'sample-sales',
      title: 'Sample Superstore数据',
      description: 'Tableau官方样本数据，零售订单数据',
      link: 'https://community.tableau.com/s/question/0D54T00000CWeX8SAL/sample-superstore-sales-excelxls',
      tags: ['样本', '零售', 'Tableau'],
      difficulty: 'beginner',
      type: 'dataset'
    },
    {
      id: 'world-bank',
      title: '世界银行开放数据',
      description: '全球发展指标数据，GDP、人口、教育、健康等',
      link: 'https://data.worldbank.org/',
      tags: ['世界银行', '国际', '经济'],
      type: 'dataset'
    },
    {
      id: 'google-trends',
      title: 'Google Trends数据',
      description: '谷歌搜索趋势数据，了解公众关注热点',
      link: 'https://trends.google.com/',
      tags: ['Google', '趋势', '搜索'],
      type: 'dataset'
    },
    {
      id: 'weather-data',
      title: '气象历史数据',
      description: '温度、降水、风速等气象观测数据',
      link: 'https://www.ncdc.noaa.gov/',
      tags: ['气象', '时间序列', '预测'],
      difficulty: 'intermediate',
      type: 'dataset'
    }
  ]
}

// 4. 面试题库
export const interviewQuestions: ResourceCategory = {
  id: 'interview-questions',
  title: '面试题库',
  description: '数据分析师常见面试题及解答思路',
  icon: 'Lightbulb',
  color: 'from-cyan-400 to-blue-500',
  items: [
    {
      id: 'sql-interview-top50',
      title: 'SQL面试TOP50题',
      description: 'JOIN连接、GROUP BY分组、子查询、窗口函数等高频考点',
      tags: ['SQL', '面试', '高频'],
      difficulty: 'intermediate',
      type: 'interview'
    },
    {
      id: 'sql-leetcode',
      title: 'LeetCode SQL题解',
      description: 'LeetCode数据库题目完整解答，从简单到困难',
      tags: ['SQL', 'LeetCode', '刷题'],
      difficulty: 'intermediate',
      type: 'interview'
    },
    {
      id: 'sql-window',
      title: 'SQL窗口函数面试题',
      description: 'ROW_NUMBER排名、LAG/LEAD同比环比、累计求和等',
      tags: ['SQL', '窗口函数', '进阶'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'sql-optimization',
      title: 'SQL性能优化面试题',
      description: '索引使用、查询优化、执行计划分析',
      tags: ['SQL', '性能优化', '高级'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'python-interview',
      title: 'Python数据分析面试题',
      description: 'Pandas数据处理、NumPy数组操作、常见坑点',
      tags: ['Python', 'Pandas', '面试'],
      difficulty: 'intermediate',
      type: 'interview'
    },
    {
      id: 'pandas-tricks',
      title: 'Pandas面试常考操作',
      description: 'groupby分组、merge合并、pivot透视、apply应用',
      tags: ['Pandas', '操作', '技巧'],
      difficulty: 'intermediate',
      type: 'interview'
    },
    {
      id: 'python-coding',
      title: 'Python编程题精选',
      description: '列表推导式、字典操作、函数式编程、装饰器',
      tags: ['Python', '编程', '算法'],
      difficulty: 'intermediate',
      type: 'interview'
    },
    {
      id: 'statistics-concepts',
      title: '统计学概念面试题',
      description: '期望方差、正态分布、中心极限定理、置信区间',
      tags: ['统计学', '概念', '理论'],
      difficulty: 'intermediate',
      type: 'interview'
    },
    {
      id: 'ab-testing-interview',
      title: 'AB测试面试必考',
      description: '实验设计、样本量计算、显著性检验、P值解释',
      tags: ['AB测试', '实验', '统计'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'hypothesis-testing',
      title: '假设检验面试题',
      description: 'T检验、卡方检验、方差分析ANOVA、非参数检验',
      tags: ['假设检验', '统计', '进阶'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'case-ecommerce',
      title: '电商业务分析案例',
      description: '用户增长、GMV下降分析、转化率优化',
      tags: ['业务分析', '电商', '案例'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'case-retention',
      title: '用户留存分析案例',
      description: '留存率定义、Cohort分析、流失预警',
      tags: ['业务分析', '留存', '用户'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'case-metrics',
      title: '核心指标设计案例',
      description: '北极星指标、关键指标体系、指标拆解',
      tags: ['业务分析', '指标', '思维'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'excel-interview',
      title: 'Excel面试实操题',
      description: 'VLOOKUP查找、SUMIFS求和、数据透视表',
      tags: ['Excel', '实操', '函数'],
      difficulty: 'beginner',
      type: 'interview'
    },
    {
      id: 'excel-advanced-interview',
      title: 'Excel高级面试题',
      description: 'Power Query ETL、Power Pivot建模、数组公式',
      tags: ['Excel', '高级', '进阶'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'ml-interview',
      title: '机器学习面试题',
      description: '监督学习、无监督学习、特征工程、模型评估',
      tags: ['机器学习', '算法', '理论'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'ml-practice',
      title: '机器学习实战题',
      description: '分类问题、回归问题、聚类分析、异常检测',
      tags: ['机器学习', '实战', '项目'],
      difficulty: 'advanced',
      type: 'interview'
    },
    {
      id: 'behavior-star',
      title: '行为面试STAR法则',
      description: 'Situation情境、Task任务、Action行动、Result结果',
      tags: ['软技能', 'STAR', '方法论'],
      type: 'interview'
    },
    {
      id: 'behavior-project',
      title: '项目经历面试题',
      description: '如何介绍项目、遇到的挑战、解决方案、数据驱动决策',
      tags: ['软技能', '项目', '经验'],
      type: 'interview'
    },
    {
      id: 'behavior-teamwork',
      title: '团队协作面试题',
      description: '跨部门沟通、冲突处理、需求澄清、汇报技巧',
      tags: ['软技能', '沟通', '协作'],
      type: 'interview'
    }
  ]
}

// 5. 行业报告与文章
export const articlesReports: ResourceCategory = {
  id: 'articles-reports',
  title: '行业报告与文章',
  description: '了解行业动态和最新趋势',
  icon: 'FileText',
  color: 'from-teal-400 to-blue-500',
  items: [
    {
      id: 'industry-reports',
      title: 'Gartner数据分析报告',
      description: 'Gartner Magic Quadrant魔力象限，数据分析工具评估',
      tags: ['Gartner', '行业报告', '权威'],
      type: 'article'
    },
    {
      id: 'mckinsey-analytics',
      title: '麦肯锡数据分析洞察',
      description: '麦肯锡咨询公司关于数据驱动决策的研究报告',
      tags: ['麦肯锡', '咨询', '商业洞察'],
      type: 'article'
    },
    {
      id: 'alibaba-tech',
      title: '阿里巴巴技术博客',
      description: '阿里数据中台、大数据架构、业务分析实践',
      tags: ['阿里', '技术博客', '大厂'],
      type: 'article'
    },
    {
      id: 'bytedance-tech',
      title: '字节跳动技术博客',
      description: '字节AB实验平台、增长分析、推荐算法',
      tags: ['字节', '技术博客', '算法'],
      type: 'article'
    },
    {
      id: 'netflix-tech',
      title: 'Netflix Tech Blog',
      description: 'Netflix数据团队分享的AB测试、推荐系统经验',
      tags: ['Netflix', '国际', 'AB测试'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'airbnb-data',
      title: 'Airbnb Data Science Blog',
      description: 'Airbnb数据科学团队的实验设计、因果推断实践',
      tags: ['Airbnb', '数据科学', '因果推断'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'towards-datascience',
      title: 'Towards Data Science',
      description: 'Medium上最大的数据科学社区，海量优质文章',
      tags: ['Medium', '社区', '综合'],
      type: 'article'
    },
    {
      id: 'kdnuggets',
      title: 'KDnuggets数据科学门户',
      description: '数据科学、机器学习、AI领域的新闻和教程',
      tags: ['门户', '新闻', '教程'],
      type: 'article'
    },
    {
      id: 'data-cleaning',
      title: '数据清洗最佳实践',
      description: '缺失值处理、异常值检测、数据标准化方法',
      tags: ['数据清洗', '最佳实践', '方法论'],
      difficulty: 'intermediate',
      type: 'article'
    },
    {
      id: 'feature-engineering',
      title: '特征工程完全指南',
      description: '特征选择、特征构造、特征降维技术',
      tags: ['特征工程', '机器学习', '进阶'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'model-evaluation',
      title: '模型评估与选择',
      description: '准确率、召回率、F1、ROC-AUC等评估指标',
      tags: ['模型评估', '指标', '方法'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'career-roadmap',
      title: '数据分析师职业路线图',
      description: '从初级到高级的技能要求、学习路径、薪资水平',
      tags: ['职业规划', '路线图', '发展'],
      type: 'article'
    },
    {
      id: 'interview-exp',
      title: '数据分析师面经分享',
      description: '一二线互联网公司面试经验、题目汇总',
      tags: ['面经', '面试', '经验'],
      type: 'article'
    },
    {
      id: 'salary-report',
      title: '数据分析师薪资报告',
      description: '不同城市、不同级别数据分析师的薪资水平',
      tags: ['薪资', '报告', '参考'],
      type: 'article'
    },
    {
      id: 'chatgpt-data',
      title: 'ChatGPT与数据分析',
      description: 'AI大模型如何辅助数据分析工作',
      tags: ['ChatGPT', 'AI', '前沿'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'llm-sql',
      title: 'LLM生成SQL实践',
      description: '大语言模型自动生成SQL查询的应用',
      tags: ['LLM', 'SQL', '自动化'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'real-time-analytics',
      title: '实时数据分析架构',
      description: 'Kafka、Flink实时数据流处理',
      tags: ['实时', '架构', '大数据'],
      difficulty: 'advanced',
      type: 'article'
    },
    {
      id: 'data-governance',
      title: '数据治理最佳实践',
      description: '数据质量、数据安全、元数据管理',
      tags: ['数据治理', '管理', '规范'],
      difficulty: 'advanced',
      type: 'article'
    }
  ]
}

// 6. 在线工具与平台
export const onlineTools: ResourceCategory = {
  id: 'online-tools',
  title: '在线工具与平台',
  description: '无需安装，在线即用的数据分析工具',
  icon: 'Link2',
  color: 'from-blue-400 to-cyan-500',
  items: [
    {
      id: 'regex-tester',
      title: 'Regex101 正则测试',
      description: '在线测试正则表达式，实时匹配结果，详细解释',
      link: 'https://regex101.com/',
      tags: ['正则', '测试', '在线'],
      type: 'tool'
    },
    {
      id: 'sql-formatter',
      title: 'SQL Formatter',
      description: '美化SQL代码，支持多种数据库语法',
      link: 'https://sql formatter.org/',
      tags: ['SQL', '格式化', '美化'],
      type: 'tool'
    },
    {
      id: 'sql-fiddle',
      title: 'SQL Fiddle',
      description: '在线SQL测试平台，无需本地数据库',
      link: 'http://sqlfiddle.com/',
      tags: ['SQL', '在线', '测试'],
      type: 'tool'
    },
    {
      id: 'db-fiddle',
      title: 'DB Fiddle',
      description: '支持MySQL、PostgreSQL、SQLite的在线数据库',
      link: 'https://www.db-fiddle.com/',
      tags: ['SQL', '数据库', '在线'],
      type: 'tool'
    },
    {
      id: 'json-viewer',
      title: 'JSON Editor Online',
      description: '可视化JSON编辑器，树形视图、格式化',
      link: 'https://jsoneditoronline.org/',
      tags: ['JSON', '编辑', '可视化'],
      type: 'tool'
    },
    {
      id: 'json-diff',
      title: 'JSON Diff',
      description: '比较两个JSON文件的差异',
      link: 'https://www.jsondiff.com/',
      tags: ['JSON', '对比', '工具'],
      type: 'tool'
    },
    {
      id: 'color-brewer',
      title: 'ColorBrewer配色工具',
      description: '为地图和数据可视化选择配色方案',
      link: 'https://colorbrewer2.org/',
      tags: ['配色', '可视化', '地图'],
      type: 'tool'
    },
    {
      id: 'coolors',
      title: 'Coolors调色板生成器',
      description: '快速生成漂亮的配色方案',
      link: 'https://coolors.co/',
      tags: ['配色', '调色板', '设计'],
      type: 'tool'
    },
    {
      id: 'markdown-typora',
      title: 'Typora在线版',
      description: '所见即所得的Markdown编辑器',
      link: 'https://markdown-here.com/index.html',
      tags: ['Markdown', '编辑', '所见即所得'],
      type: 'tool'
    },
    {
      id: 'markdown-table',
      title: 'Markdown Table Generator',
      description: '在线生成Markdown表格',
      link: 'https://www.tablesgenerator.com/markdown_tables',
      tags: ['Markdown', '表格', '生成'],
      type: 'tool'
    },
    {
      id: 'mockaroo',
      title: 'Mockaroo数据生成器',
      description: '生成各种格式的测试数据CSV、JSON、SQL',
      link: 'https://www.mockaroo.com/',
      tags: ['测试数据', '生成器', 'Mock'],
      type: 'tool'
    },
    {
      id: 'faker-js',
      title: 'Faker.js数据模拟',
      description: 'JavaScript测试数据生成库',
      link: 'https://fakerjs.dev/',
      tags: ['测试数据', 'JavaScript', 'Mock'],
      type: 'tool'
    },
    {
      id: 'csvkit',
      title: 'CSVKit在线工具',
      description: 'CSV文件处理、转换、分析',
      link: 'https://csvkit.readthedocs.io/',
      tags: ['CSV', '数据处理', '在线'],
      type: 'tool'
    },
    {
      id: 'data-converter',
      title: '数据格式转换器',
      description: 'CSV、JSON、XML、SQL格式互转',
      link: 'https://www.convertcsv.com/',
      tags: ['格式转换', '数据', '工具'],
      type: 'tool'
    },
    {
      id: 'cron-expression',
      title: 'Cron表达式生成器',
      description: '生成和验证定时任务Cron表达式',
      link: 'https://crontab.guru/',
      tags: ['Cron', '定时任务', '生成'],
      type: 'tool'
    },
    {
      id: 'timestamp-converter',
      title: '时间戳转换工具',
      description: '时间戳与日期时间互转',
      link: 'https://www.epochconverter.com/',
      tags: ['时间戳', '转换', '工具'],
      type: 'tool'
    },
    {
      id: 'diff-checker',
      title: 'Diff Checker文本对比',
      description: '对比两段文本或代码的差异',
      link: 'https://www.diffchecker.com/',
      tags: ['文本对比', 'Diff', '工具'],
      type: 'tool'
    },
    {
      id: 'base64-encoder',
      title: 'Base64编解码',
      description: 'Base64编码解码工具',
      link: 'https://www.base64encode.org/',
      tags: ['Base64', '编码', '解码'],
      type: 'tool'
    }
  ]
}

// 汇总所有资源
export const practicalResources: ResourceCategory[] = [
  learningMaterials,
  toolTips,
  datasets,
  interviewQuestions,
  articlesReports,
  onlineTools
]

// 搜索功能
export function searchPracticalResources(query: string): ResourceCategory[] {
  if (!query.trim()) return practicalResources

  const lowerQuery = query.toLowerCase()
  
  return practicalResources
    .map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
    }))
    .filter(category => category.items.length > 0)
}

// 根据ID获取资源
export function getPracticalResourceById(id: string): ResourceCategory | undefined {
  return practicalResources.find(category => category.id === id)
}

// 根据类型筛选
export function filterByType(type: string): ResourceCategory[] {
  if (type === 'all') return practicalResources
  
  return practicalResources
    .map(category => ({
      ...category,
      items: category.items.filter(item => item.type === type)
    }))
    .filter(category => category.items.length > 0)
}

// 根据难度筛选
export function filterByDifficulty(difficulty: string): ResourceCategory[] {
  if (difficulty === 'all') return practicalResources
  
  return practicalResources
    .map(category => ({
      ...category,
      items: category.items.filter(item => item.difficulty === difficulty)
    }))
    .filter(category => category.items.length > 0)
}

