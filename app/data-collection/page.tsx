"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Download, Globe, FileJson, Database, Zap,
  Code, Network, FileText, CheckCircle2, XCircle, AlertTriangle,
  Sparkles, TrendingUp, ShoppingCart, Users, BarChart3, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function DataCollectionPage() {
  const { theme } = useTheme();

  // 主流数据采集工具
  const tools = [
    {
      name: "Scrapy",
      type: "专业爬虫框架",
      icon: Network,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "Python 最强大的爬虫框架",
      features: ["异步并发爬取", "中间件机制", "自动去重", "分布式爬虫", "数据管道", "自动限速"],
      advantages: ["高性能", "可扩展性强", "生态丰富", "适合大规模爬取"],
      disadvantages: ["学习曲线陡", "对新手不友好", "配置复杂"],
      bestFor: "大规模爬虫项目、专业爬虫工程师",
      difficulty: "⭐⭐⭐⭐ 较难",
      speed: "★★★★★ 极快",
      usage: "企业级爬虫首选"
    },
    {
      name: "Beautiful Soup",
      type: "HTML/XML 解析库",
      icon: Code,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "最易用的网页解析工具",
      features: ["HTML解析", "CSS选择器", "导航树遍历", "自动编码检测", "容错性强", "简洁API"],
      advantages: ["极易上手", "文档友好", "容错性好", "适合初学者"],
      disadvantages: ["性能较慢", "功能单一", "需配合requests"],
      bestFor: "简单爬虫、数据提取、学习入门",
      difficulty: "⭐⭐ 易学",
      speed: "★★★ 中等",
      usage: "入门首选、小项目"
    },
    {
      name: "Selenium",
      type: "浏览器自动化",
      icon: Globe,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "模拟真实浏览器操作",
      features: ["真实浏览器", "执行JavaScript", "处理动态加载", "截图功能", "多浏览器支持", "无头模式"],
      advantages: ["处理JS渲染", "绕过反爬", "可视化调试", "适合动态页面"],
      disadvantages: ["速度慢", "资源消耗大", "不稳定"],
      bestFor: "动态网页、JS渲染页面、反爬网站",
      difficulty: "⭐⭐⭐ 中等",
      speed: "★★ 慢",
      usage: "动态网页必备"
    },
    {
      name: "Requests + lxml",
      type: "轻量爬虫组合",
      icon: Zap,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "HTTP库 + 快速解析器",
      features: ["简洁HTTP请求", "XPath支持", "性能优秀", "轻量级", "易于调试", "会话管理"],
      advantages: ["速度快", "代码简洁", "灵活性高", "学习成本低"],
      disadvantages: ["需要手写逻辑", "无内置调度", "功能基础"],
      bestFor: "中小型项目、API调用、快速原型",
      difficulty: "⭐⭐ 易学",
      speed: "★★★★ 快",
      usage: "快速开发常用"
    },
    {
      name: "Pandas I/O",
      type: "数据读取库",
      icon: FileJson,
      color: "text-cyan-600",
      bgColor: theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50',
      description: "多格式数据导入",
      features: ["CSV/Excel读取", "数据库连接", "JSON处理", "HTML表格", "剪贴板读取", "远程文件"],
      advantages: ["格式丰富", "自动推断类型", "与分析无缝", "一行代码搞定"],
      disadvantages: ["只读结构化数据", "不适合爬虫", "内存占用大"],
      bestFor: "结构化数据导入、数据分析前处理",
      difficulty: "⭐ 非常易",
      speed: "★★★★ 快",
      usage: "数据分析师必会"
    },
    {
      name: "Apache Airflow",
      type: "数据编排调度",
      icon: Network,
      color: "text-red-600",
      bgColor: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
      description: "工作流调度平台",
      features: ["DAG工作流", "定时调度", "任务依赖", "失败重试", "监控告警", "Web界面"],
      advantages: ["可视化管理", "企业级稳定", "可扩展", "社区活跃"],
      disadvantages: ["部署复杂", "学习成本高", "资源消耗大"],
      bestFor: "ETL流程、定时采集、数据管道",
      difficulty: "⭐⭐⭐⭐ 较难",
      speed: "★★★ 中等",
      usage: "企业数据工程"
    }
  ];

  // 数据来源分类
  const dataSources = [
    {
      category: "网页数据",
      icon: Globe,
      color: "bg-blue-500",
      description: "从网站抓取公开信息",
      methods: [
        {
          name: "静态网页爬取",
          tools: "Beautiful Soup + Requests",
          example: "新闻网站、产品列表、企业信息",
          difficulty: "简单"
        },
        {
          name: "动态网页爬取",
          tools: "Selenium + Chrome",
          example: "社交媒体、电商评论、动态加载页面",
          difficulty: "中等"
        },
        {
          name: "大规模爬虫",
          tools: "Scrapy 分布式",
          example: "搜索引擎索引、行业数据库、全站爬取",
          difficulty: "困难"
        }
      ],
      challenges: ["反爬虫机制", "验证码识别", "IP封禁", "动态加载"],
      legalNotes: "⚠️ 遵守 robots.txt、服务条款、隐私政策"
    },
    {
      category: "API 接口",
      icon: Zap,
      color: "bg-green-500",
      description: "通过接口获取结构化数据",
      methods: [
        {
          name: "REST API 调用",
          tools: "Requests + JSON",
          example: "第三方数据服务、开放平台、SaaS产品",
          difficulty: "简单"
        },
        {
          name: "认证API",
          tools: "OAuth 2.0 / API Key",
          example: "社交媒体API、支付接口、企业系统",
          difficulty: "中等"
        },
        {
          name: "GraphQL",
          tools: "gql / requests",
          example: "GitHub API、现代化API",
          difficulty: "中等"
        }
      ],
      challenges: ["请求限流", "认证授权", "数据分页", "错误处理"],
      legalNotes: "✅ 最推荐的方式，稳定且合规"
    },
    {
      category: "数据库导出",
      icon: Database,
      color: "bg-purple-500",
      description: "从现有数据库获取数据",
      methods: [
        {
          name: "SQL 数据库",
          tools: "pandas.read_sql() / SQLAlchemy",
          example: "MySQL、PostgreSQL、SQL Server",
          difficulty: "简单"
        },
        {
          name: "NoSQL 数据库",
          tools: "pymongo / redis-py",
          example: "MongoDB、Redis、Elasticsearch",
          difficulty: "中等"
        },
        {
          name: "数据仓库",
          tools: "专用驱动 / ODBC",
          example: "Snowflake、BigQuery、Redshift",
          difficulty: "中等"
        }
      ],
      challenges: ["权限控制", "大表查询", "编码问题", "连接池管理"],
      legalNotes: "✅ 企业内部数据获取标准方式"
    },
    {
      category: "文件导入",
      icon: FileText,
      color: "bg-orange-500",
      description: "读取各种格式的文件",
      methods: [
        {
          name: "表格文件",
          tools: "pandas (CSV/Excel/Parquet)",
          example: "数据报告、导出文件、统计数据",
          difficulty: "非常简单"
        },
        {
          name: "JSON/XML",
          tools: "json / lxml / pandas",
          example: "配置文件、数据交换、API响应",
          difficulty: "简单"
        },
        {
          name: "日志文件",
          tools: "正则表达式 / logparser",
          example: "服务器日志、应用日志、访问日志",
          difficulty: "中等"
        }
      ],
      challenges: ["编码问题", "大文件处理", "格式不统一", "数据质量"],
      legalNotes: "✅ 安全合规，推荐方式"
    },
    {
      category: "实时流数据",
      icon: TrendingUp,
      color: "bg-red-500",
      description: "采集实时产生的数据流",
      methods: [
        {
          name: "消息队列",
          tools: "Kafka / RabbitMQ",
          example: "用户行为、IoT传感器、系统事件",
          difficulty: "困难"
        },
        {
          name: "WebSocket",
          tools: "websocket-client",
          example: "股票行情、聊天消息、实时更新",
          difficulty: "中等"
        },
        {
          name: "日志流",
          tools: "Fluentd / Logstash",
          example: "应用日志、监控数据、审计日志",
          difficulty: "中等"
        }
      ],
      challenges: ["数据丢失", "顺序保证", "反压处理", "状态管理"],
      legalNotes: "✅ 企业内部数据流"
    }
  ];

  // 真实应用场景
  const scenarios = [
    {
      title: "电商竞品价格监控",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      goal: "实时监控竞品价格变化",
      dataSource: "电商网站产品页面",
      solution: "Scrapy 定时爬取 + 价格变动告警",
      workflow: [
        "定义要监控的商品链接列表",
        "Scrapy 每小时爬取价格和库存",
        "数据存入 MySQL 数据库",
        "价格变化触发邮件/微信告警",
        "生成价格趋势图表"
      ],
      benefits: ["及时调整定价策略", "发现促销机会", "竞争力分析"],
      techStack: "Scrapy + MySQL + Airflow",
      difficulty: "中等"
    },
    {
      title: "社交媒体情感分析",
      icon: MessageSquare,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      goal: "分析品牌在社交媒体的口碑",
      dataSource: "微博/Twitter/小红书 API",
      solution: "API调用 + NLP情感分析",
      workflow: [
        "通过官方API搜索品牌关键词",
        "采集帖子、评论、转发数据",
        "文本预处理和情感分析",
        "统计正负面评论占比",
        "可视化情感趋势变化"
      ],
      benefits: ["品牌舆情监控", "危机公关预警", "用户洞察"],
      techStack: "Requests + SnowNLP + Pandas",
      difficulty: "中等"
    },
    {
      title: "招聘数据分析",
      icon: Users,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      goal: "分析行业薪资和技能需求",
      dataSource: "招聘网站职位列表",
      solution: "BeautifulSoup 爬取 + 数据清洗",
      workflow: [
        "爬取特定职位的招聘信息",
        "提取薪资范围、技能要求、公司规模",
        "数据清洗和标准化",
        "统计分析和可视化",
        "生成行业报告"
      ],
      benefits: ["了解市场行情", "指导职业规划", "招聘策略优化"],
      techStack: "BeautifulSoup + Pandas + Matplotlib",
      difficulty: "简单"
    },
    {
      title: "金融数据采集",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      goal: "获取股票、外汇等金融数据",
      dataSource: "财经网站 + 金融API",
      solution: "API调用为主 + 网页爬取为辅",
      workflow: [
        "调用 Tushare/AKShare 金融API",
        "补充爬取财报、公告等信息",
        "数据入库（时序数据库）",
        "计算技术指标",
        "构建量化策略回测"
      ],
      benefits: ["量化交易", "投资研究", "风险分析"],
      techStack: "Tushare + pandas + InfluxDB",
      difficulty: "中等"
    },
    {
      title: "房产数据分析",
      icon: BarChart3,
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      goal: "分析房价趋势和影响因素",
      dataSource: "房产中介网站",
      solution: "Selenium处理动态加载 + 数据建模",
      workflow: [
        "Selenium 模拟浏览器滚动加载",
        "爬取房源价格、面积、地理位置",
        "调用地图API获取周边配套",
        "数据清洗和特征工程",
        "建立房价预测模型"
      ],
      benefits: ["房价趋势分析", "投资决策支持", "价格预测"],
      techStack: "Selenium + Pandas + Scikit-learn",
      difficulty: "较难"
    },
    {
      title: "企业数据整合",
      icon: Database,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      goal: "整合多个数据源到数据仓库",
      dataSource: "业务系统 + 第三方服务 + 文件",
      solution: "Airflow编排ETL流程",
      workflow: [
        "定义DAG工作流",
        "从多个数据库抽取数据",
        "调用第三方API获取外部数据",
        "数据清洗转换加载到数仓",
        "定时调度 + 失败告警"
      ],
      benefits: ["数据统一管理", "自动化数据流", "可靠性保证"],
      techStack: "Airflow + SQL + Python",
      difficulty: "困难"
    }
  ];

  // 爬虫合规指南
  const compliance = {
    legal: [
      "✅ 遵守网站 robots.txt 文件规定",
      "✅ 只爬取公开信息，不破解加密数据",
      "✅ 遵守网站服务条款和使用协议",
      "✅ 尊重知识产权和隐私权",
      "✅ 合理控制爬取频率，不影响网站正常运行"
    ],
    illegal: [
      "❌ 爬取个人隐私信息（手机号、身份证）",
      "❌ 破解反爬机制、绕过登录验证",
      "❌ 高频爬取导致网站瘫痪（DDoS）",
      "❌ 商业化出售爬取的数据",
      "❌ 爬取付费内容进行传播"
    ],
    bestPractices: [
      "💡 优先使用官方API而非爬虫",
      "💡 设置User-Agent，标明爬虫身份",
      "💡 控制并发数，添加延时（1-3秒）",
      "💡 遵循robots.txt文件规定",
      "💡 只用于个人学习或合规的商业用途",
      "💡 不存储敏感个人信息"
    ]
  };

  // 学习路径
  const learningPath = [
    {
      stage: "入门基础",
      duration: "1-2周",
      color: "bg-blue-500",
      content: [
        "HTTP协议和网页结构（HTML/CSS）",
        "Python Requests 库使用",
        "Beautiful Soup 解析网页",
        "正则表达式提取数据",
        "了解 robots.txt 和爬虫规范"
      ]
    },
    {
      stage: "进阶技能",
      duration: "2-3周",
      color: "bg-green-500",
      content: [
        "Scrapy 框架入门",
        "XPath 和 CSS 选择器",
        "处理 Cookie 和 Session",
        "Selenium 自动化浏览器",
        "处理 Ajax 动态加载"
      ]
    },
    {
      stage: "反爬与高级",
      duration: "3-4周",
      color: "bg-purple-500",
      content: [
        "识别和应对反爬虫机制",
        "代理IP池搭建",
        "验证码识别（OCR）",
        "分布式爬虫 Scrapy-Redis",
        "数据存储（MySQL/MongoDB）"
      ]
    },
    {
      stage: "工程化实践",
      duration: "持续深化",
      color: "bg-orange-500",
      content: [
        "Airflow 调度和监控",
        "爬虫性能优化",
        "异常处理和日志管理",
        "容器化部署（Docker）",
        "数据采集合规与风险控制"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">数据采集工具</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              网页抓取与自动化数据收集
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-yellow-600 px-4 py-2 text-sm">
                🕷️ 网页爬虫
              </Badge>
              <Badge className="bg-white text-amber-600 px-4 py-2 text-sm">
                🔌 API调用
              </Badge>
              <Badge className="bg-white text-orange-600 px-4 py-2 text-sm">
                📊 数据导入
              </Badge>
              <Badge className="bg-white text-red-600 px-4 py-2 text-sm">
                ⚙️ 自动化调度
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么需要数据采集 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            为什么数据采集如此重要？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-6 w-6 text-blue-600" />
                  数据是分析的前提
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-sm">
                  <strong>70%的数据分析时间</strong>花在数据采集和清洗上。没有数据，再好的分析技能也无用武之地。
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                  <p className="text-xs">
                    💡 会采集数据的分析师能自主获取数据，不依赖他人。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  拓展数据来源
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-sm">
                  公司内部数据有限，<strong>外部数据</strong>（竞品、市场、舆情）往往需要主动采集。
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                  <p className="text-xs">
                    💡 爬虫、API调用能获取海量互联网公开数据。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-orange-600" />
                  提升职业竞争力
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-sm">
                  <strong>会爬虫的数据分析师</strong>薪资普遍高20-30%，能承担更多数据项目。
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
                  <p className="text-xs">
                    💡 爬虫技能是从分析师到数据工程师的桥梁。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 主流数据采集工具 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            主流数据采集工具
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            选择适合场景的采集工具
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${tool.bgColor}`}>
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {tool.type}
                      </CardDescription>
                    </div>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tool.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      ⚙️ 核心特性
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {tool.features.slice(0, 4).map((feat, fidx) => (
                        <div 
                          key={fidx}
                          className={`text-xs p-1.5 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                        >
                          {feat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✅ 优势
                    </h4>
                    <ul className={`space-y-0.5 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {tool.advantages.map((adv, aidx) => (
                        <li key={aidx}>• {adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      ⚠️ 劣势
                    </h4>
                    <ul className={`space-y-0.5 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {tool.disadvantages.map((dis, didx) => (
                        <li key={didx}>• {dis}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      <strong>💡 最适合：</strong> {tool.bestFor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-1">
                      <span className={`font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                        {tool.difficulty}
                      </span>
                      <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>
                        {tool.speed}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tool.usage}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 数据来源分类 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            数据来源分类
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            了解不同类型的数据获取方式
          </p>

          <div className="space-y-6">
            {dataSources.map((source, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${source.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-3">
                    <source.icon className={`h-8 w-8 ${source.color.replace('bg-', 'text-')}`} />
                    <div>
                      <CardTitle className="text-xl">{source.category}</CardTitle>
                      <CardDescription>{source.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {source.methods.map((method, midx) => (
                      <div 
                        key={midx}
                        className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                      >
                        <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          {method.name}
                        </h4>
                        <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                          🔧 {method.tools}
                        </p>
                        <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          📦 {method.example}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            method.difficulty === '简单' || method.difficulty === '非常简单' ? 'border-green-500 text-green-600' :
                            method.difficulty === '中等' ? 'border-yellow-500 text-yellow-600' :
                            'border-red-500 text-red-600'
                          }`}
                        >
                          {method.difficulty}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
                      <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                        ⚠️ 常见挑战
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {source.challenges.map((challenge, cidx) => (
                          <Badge key={cidx} variant="outline" className="text-xs">
                            {challenge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                      <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                        {source.legalNotes}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 真实应用场景 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-yellow-50 to-orange-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实应用场景
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            数据采集在实际业务中的应用
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario, idx) => (
              <Card 
                key={idx}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <div className={`${scenario.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <scenario.icon className="h-8 w-8" />
                    <h3 className="text-xl font-bold">{scenario.title}</h3>
                  </div>
                </div>

                <CardContent className="pt-6 space-y-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      🎯 目标
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.goal}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      📊 数据来源
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.dataSource}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                      💡 解决方案
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🔄 实施流程
                    </h4>
                    <div className="space-y-2">
                      {scenario.workflow.map((step, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                            {sidx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                      ✨ 业务价值
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {scenario.benefits.map((benefit, bidx) => (
                        <Badge key={bidx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      🔧 {scenario.techStack}
                    </span>
                    <Badge 
                      variant="outline"
                      className={
                        scenario.difficulty === '简单' ? 'border-green-500 text-green-600' :
                        scenario.difficulty === '中等' ? 'border-yellow-500 text-yellow-600' :
                        'border-red-500 text-red-600'
                      }
                    >
                      {scenario.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 爬虫合规指南 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            爬虫合规指南
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
            ⚠️ 重要！爬虫涉及法律风险，必须了解合规要求
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-6 w-6" />
                  合法合规
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {compliance.legal.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                      <span>{item.replace('✅ ', '')}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-red-900/30 to-rose-900/30 border-red-700' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <XCircle className="h-6 w-6" />
                  违法行为
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {compliance.illegal.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                      <span>{item.replace('❌ ', '')}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Sparkles className="h-6 w-6" />
                  最佳实践
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {compliance.bestPractices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5">→</span>
                      <span>{item.replace('💡 ', '')}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className={`mt-8 ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                法律风险提示
              </CardTitle>
            </CardHeader>
            <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="text-sm">
                <strong>中国相关法律：</strong>《网络安全法》《数据安全法》《个人信息保护法》《反不正当竞争法》
              </p>
              <p className="text-sm">
                <strong>典型案例：</strong>
              </p>
              <ul className="text-sm space-y-1 pl-4">
                <li>• 爬取并出售简历数据 → 判刑3年（侵犯公民个人信息罪）</li>
                <li>• 爬取竞对数据用于商业 → 不正当竞争，民事赔偿</li>
                <li>• 高频爬取导致网站瘫痪 → 破坏计算机信息系统罪</li>
              </ul>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/50' : 'bg-red-100'}`}>
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                  ⚠️ 爬虫仅供学习研究，商业化使用务必咨询法律顾问！
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 学习路径 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            学习路径规划
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从零到精通数据采集
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPath.map((stage, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${stage.color} rounded-full mb-3`}></div>
                  <CardTitle className="text-lg">{stage.stage}</CardTitle>
                  <CardDescription>⏱️ {stage.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.content.map((item, cidx) => (
                      <li 
                        key={cidx} 
                        className={`text-sm flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className={`${stage.color.replace('bg-', 'text-')} mt-1`}>▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 学习建议 */}
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-700' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                学习建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    <CheckCircle2 className="h-5 w-5" />
                    推荐做法
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 从 Beautiful Soup 开始学习</li>
                    <li>• 先爬简单静态网站练手</li>
                    <li>• 学会查看网页源代码和Network</li>
                    <li>• 尊重 robots.txt 和法律法规</li>
                    <li>• 优先使用官方API而非爬虫</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 一上来就学 Scrapy（太难）</li>
                    <li>• 无视反爬机制暴力爬取</li>
                    <li>• 不考虑法律风险</li>
                    <li>• 不设置延时导致IP被封</li>
                    <li>• 爬取敏感个人信息</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <AlertTriangle className="h-5 w-5" />
                    工具选型
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 静态网页：Beautiful Soup</li>
                    <li>• 动态网页：Selenium</li>
                    <li>• 大规模爬虫：Scrapy</li>
                    <li>• API调用：Requests</li>
                    <li>• 数据导入：Pandas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            掌握数据采集，自主获取数据资源
          </h2>
          <p className="text-xl text-white/90 mb-8">
            数据采集是数据分析的第一步
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/data-cleaning-tools">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
                数据清洗工具 →
              </Button>
            </Link>
            <Link href="/python">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
                Python 编程基础 →
              </Button>
            </Link>
            <Link href="/sql">
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
                SQL 数据查询 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

