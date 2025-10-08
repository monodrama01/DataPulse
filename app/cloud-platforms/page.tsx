"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, Database, Zap, TrendingUp, BarChart3, Package,
  Server, Activity, CheckCircle2, XCircle, FileText,
  Sparkles, Users, Code, Lock, DollarSign
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function CloudPlatformsPage() {
  const { theme } = useTheme();

  // 主流云平台
  const platforms = [
    {
      name: "AWS (Amazon)",
      icon: Cloud,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "全球市场份额第一的云服务商",
      dataServices: ["S3存储", "Redshift数仓", "EMR大数据", "QuickSight BI"],
      advantages: ["服务最全面", "生态最成熟", "全球覆盖广", "企业认可度高"],
      disadvantages: ["定价复杂", "学习曲线陡", "中国区受限"],
      bestFor: "大型企业、全球业务、完整数据平台",
      marketShare: "32%"
    },
    {
      name: "Google Cloud",
      icon: Database,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "数据分析和AI领域的领先者",
      dataServices: ["BigQuery数仓", "Dataproc", "Looker BI", "Vertex AI"],
      advantages: ["BigQuery强大", "AI/ML领先", "数据分析友好", "按需计费"],
      disadvantages: ["市场份额小", "企业支持弱", "中国不可用"],
      bestFor: "数据分析、机器学习、实时分析",
      marketShare: "10%"
    },
    {
      name: "Azure (微软)",
      icon: Server,
      color: "text-blue-500",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "企业级云服务，与微软生态深度集成",
      dataServices: ["Azure SQL", "Synapse分析", "Power BI", "HDInsight"],
      advantages: ["企业级稳定", "Office集成", "混合云强", "中国可用"],
      disadvantages: ["界面复杂", "文档不够清晰", "创新速度慢"],
      bestFor: "微软技术栈企业、混合云、中国业务",
      marketShare: "23%"
    },
    {
      name: "阿里云",
      icon: Cloud,
      color: "text-orange-500",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "中国市场领导者",
      dataServices: ["MaxCompute", "DataWorks", "Quick BI", "PAI机器学习"],
      advantages: ["中国市场强", "网络稳定", "中文支持好", "性价比高"],
      disadvantages: ["国际化弱", "部分服务不成熟", "文档质量参差"],
      bestFor: "中国业务、中小企业、电商数据",
      marketShare: "中国40%+"
    },
    {
      name: "腾讯云",
      icon: Database,
      color: "text-blue-400",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "社交和游戏领域优势明显",
      dataServices: ["CDB数据库", "EMR", "云数据仓库", "BI报表"],
      advantages: ["游戏行业强", "社交数据优势", "性价比高", "腾讯生态"],
      disadvantages: ["企业级弱", "数据服务少", "创新不足"],
      bestFor: "游戏行业、社交应用、中小企业",
      marketShare: "中国18%"
    },
    {
      name: "Snowflake",
      icon: Sparkles,
      color: "text-cyan-600",
      bgColor: theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50',
      description: "云原生数据仓库独角兽",
      dataServices: ["云数据仓库", "数据共享", "数据市场", "Snowpark"],
      advantages: ["纯数据仓库", "性能优秀", "存算分离", "跨云支持"],
      disadvantages: ["只有数仓", "成本较高", "功能单一"],
      bestFor: "企业级数据仓库、数据共享、分析需求",
      marketShare: "数据仓库领域领先"
    }
  ];

  // 云端数据服务分类
  const dataServices = [
    {
      category: "数据存储",
      icon: Database,
      color: "bg-blue-500",
      services: [
        {
          name: "对象存储",
          examples: "S3、Azure Blob、OSS",
          useCase: "存储原始数据、日志、备份"
        },
        {
          name: "关系数据库",
          examples: "RDS、Cloud SQL、Azure SQL",
          useCase: "业务数据、结构化数据"
        },
        {
          name: "NoSQL数据库",
          examples: "DynamoDB、CosmosDB、MongoDB Atlas",
          useCase: "非结构化、高并发数据"
        },
        {
          name: "数据仓库",
          examples: "Redshift、BigQuery、Synapse",
          useCase: "OLAP分析、BI报表"
        }
      ]
    },
    {
      category: "数据处理",
      icon: Zap,
      color: "bg-green-500",
      services: [
        {
          name: "大数据计算",
          examples: "EMR、Dataproc、HDInsight",
          useCase: "Spark/Hadoop大数据处理"
        },
        {
          name: "ETL服务",
          examples: "Glue、Data Fusion、Data Factory",
          useCase: "数据抽取转换加载"
        },
        {
          name: "流处理",
          examples: "Kinesis、Dataflow、Stream Analytics",
          useCase: "实时数据处理分析"
        },
        {
          name: "无服务器计算",
          examples: "Lambda、Cloud Functions、Azure Functions",
          useCase: "轻量级数据处理"
        }
      ]
    },
    {
      category: "数据分析",
      icon: BarChart3,
      color: "bg-purple-500",
      services: [
        {
          name: "BI工具",
          examples: "QuickSight、Looker、Power BI Service",
          useCase: "可视化报表、仪表板"
        },
        {
          name: "交互查询",
          examples: "Athena、BigQuery、Synapse",
          useCase: "即席SQL分析"
        },
        {
          name: "数据湖分析",
          examples: "Lake Formation、Data Lake Analytics",
          useCase: "非结构化数据分析"
        },
        {
          name: "机器学习",
          examples: "SageMaker、Vertex AI、Azure ML",
          useCase: "预测分析、模型训练"
        }
      ]
    },
    {
      category: "数据治理",
      icon: Lock,
      color: "bg-orange-500",
      services: [
        {
          name: "数据目录",
          examples: "Glue Catalog、Data Catalog",
          useCase: "元数据管理、数据发现"
        },
        {
          name: "数据质量",
          examples: "DataQuality、Data Prep",
          useCase: "数据清洗、质量监控"
        },
        {
          name: "访问控制",
          examples: "IAM、RBAC、数据脱敏",
          useCase: "权限管理、数据安全"
        },
        {
          name: "数据血缘",
          examples: "数据沿袭跟踪",
          useCase: "追溯数据来源和流转"
        }
      ]
    }
  ];

  // 云端数据架构场景
  const architectures = [
    {
      title: "云数据仓库架构",
      icon: Database,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "企业级云端数据分析平台",
      scenario: "电商公司构建全渠道数据分析平台",
      components: [
        "数据源：业务数据库、日志、第三方API",
        "数据采集：实时CDC + 定时批量导入",
        "数据存储：S3数据湖 + Redshift数据仓库",
        "数据处理：Glue ETL清洗转换",
        "数据分析：QuickSight BI仪表板",
        "数据治理：Glue Catalog元数据管理"
      ],
      benefits: ["弹性扩展", "按需付费", "维护成本低", "查询性能高"],
      cost: "中等（$5K-20K/月）"
    },
    {
      title: "大数据分析平台",
      icon: Zap,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      description: "处理PB级数据的云上Spark集群",
      scenario: "互联网公司用户行为分析",
      components: [
        "数据采集：Kafka实时流 + S3批量数据",
        "数据处理：EMR Spark集群计算",
        "数据存储：S3 Parquet格式",
        "数据查询：Athena即席查询",
        "机器学习：SageMaker训练推荐模型",
        "可视化：集成Tableau/Superset"
      ],
      benefits: ["处理海量数据", "自动扩缩容", "成本可控", "开发效率高"],
      cost: "较高（$10K-50K/月）"
    },
    {
      title: "实时数据分析",
      icon: Activity,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      description: "毫秒级实时数据处理和分析",
      scenario: "金融风控实时监控系统",
      components: [
        "数据流：Kinesis实时数据流",
        "流处理：Kinesis Analytics实时计算",
        "存储：DynamoDB热数据 + S3冷数据",
        "告警：SNS实时告警通知",
        "仪表板：CloudWatch实时监控",
        "归档：Glacier长期存储"
      ],
      benefits: ["实时响应", "高可用", "自动告警", "成本分层"],
      cost: "中等（$3K-15K/月）"
    },
    {
      title: "Serverless数据平台",
      icon: Cloud,
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      description: "全托管、按查询付费的数据平台",
      scenario: "初创公司快速搭建数据分析",
      components: [
        "数据源：API Gateway + Lambda采集",
        "数据存储：S3数据湖",
        "数据查询：Athena按需查询",
        "数据处理：Lambda轻量ETL",
        "可视化：QuickSight托管BI",
        "调度：EventBridge定时触发"
      ],
      benefits: ["零运维", "按使用付费", "快速上线", "弹性无限"],
      cost: "低（$500-3K/月）"
    },
    {
      title: "数据湖架构",
      icon: Package,
      color: "bg-gradient-to-br from-indigo-500 to-blue-500",
      description: "统一存储所有类型数据",
      scenario: "集团公司数据中台建设",
      components: [
        "数据湖：S3分层存储（bronze/silver/gold）",
        "元数据：Glue Catalog统一管理",
        "数据质量：Glue DataQuality检查",
        "访问控制：Lake Formation权限",
        "多引擎：Athena、EMR、Redshift共享",
        "数据共享：跨账号数据共享"
      ],
      benefits: ["统一存储", "多工具访问", "数据治理", "成本优化"],
      cost: "灵活（按存储和计算分开）"
    },
    {
      title: "混合云数据分析",
      icon: Server,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      description: "本地+云端混合部署",
      scenario: "传统企业渐进式上云",
      components: [
        "本地数据：私有数据库、文件服务器",
        "数据同步：Direct Connect专线",
        "云端缓存：ElastiCache加速",
        "云端计算：EMR按需启动",
        "结果回传：VPN安全传输",
        "灾备：云端备份和恢复"
      ],
      benefits: ["数据安全", "渐进迁移", "灵活扩展", "成本可控"],
      cost: "中高（$8K-30K/月+专线）"
    }
  ];

  // 从数据分析师到数据工程师
  const careerPath = [
    {
      stage: "数据分析师",
      skills: ["SQL查询", "Excel/BI工具", "统计分析", "可视化"],
      limitations: ["数据由他人提供", "分析规模受限", "无法自动化", "依赖IT部门"]
    },
    {
      stage: "高级数据分析师",
      skills: ["Python/R", "高级SQL", "机器学习", "数据清洗"],
      newSkills: ["开始接触云平台", "了解数据流程", "简单ETL"]
    },
    {
      stage: "数据工程师",
      skills: ["云平台架构", "大数据技术", "ETL开发", "数据治理"],
      responsibilities: ["搭建数据平台", "优化数据架构", "保障数据质量", "支持分析师"]
    }
  ];

  // 学习路径
  const learningPath = [
    {
      stage: "云基础认知",
      duration: "1-2周",
      color: "bg-blue-500",
      content: [
        "理解云计算基本概念",
        "注册云平台账号（AWS/阿里云）",
        "了解基础服务（计算、存储、网络）",
        "掌握基本操作（控制台、CLI）",
        "理解付费模式和成本"
      ]
    },
    {
      stage: "数据服务实践",
      duration: "4-6周",
      color: "bg-green-500",
      content: [
        "使用云数据库（RDS）",
        "对象存储实践（S3/OSS）",
        "数据仓库入门（BigQuery/Redshift）",
        "BI服务使用（QuickSight/Power BI）",
        "简单ETL流程搭建"
      ]
    },
    {
      stage: "大数据技术",
      duration: "2-3个月",
      color: "bg-purple-500",
      content: [
        "托管Spark集群（EMR/Dataproc）",
        "数据湖架构理解",
        "实时流处理（Kinesis/Kafka）",
        "机器学习平台（SageMaker）",
        "数据编排调度（Airflow）"
      ]
    },
    {
      stage: "架构与治理",
      duration: "持续深化",
      color: "bg-orange-500",
      content: [
        "完整数据平台设计",
        "成本优化实践",
        "数据安全与合规",
        "性能优化调优",
        "云认证考取（可选）"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Cloud className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">云计算平台</h1>
            </div>
            <p className="text-xl text-white/90 mb-4">
              弹性扩展的云端数据服务
            </p>
            <p className="text-lg text-white/80 mb-6">
              💡 进阶技能 · 适合想转型数据工程的分析师
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-cyan-600 px-4 py-2 text-sm">
                ☁️ 云端数据仓库
              </Badge>
              <Badge className="bg-white text-blue-600 px-4 py-2 text-sm">
                🚀 大数据服务
              </Badge>
              <Badge className="bg-white text-indigo-600 px-4 py-2 text-sm">
                📊 云端BI
              </Badge>
              <Badge className="bg-white text-purple-600 px-4 py-2 text-sm">
                🤖 机器学习
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么学习云平台 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            为什么数据分析师要了解云平台？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-cyan-600" />
                  行业趋势
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <p className="text-sm mb-2">📊 <strong>85%+企业</strong>使用云服务</p>
                  <p className="text-xs text-gray-500">越来越多数据迁移到云端</p>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <p className="text-sm mb-2">💰 <strong>市场需求</strong>云技能薪资溢价30%+</p>
                  <p className="text-xs text-gray-500">掌握云技能的分析师更受欢迎</p>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <p className="text-sm mb-2">🚀 <strong>职业发展</strong>向数据工程师转型的必经之路</p>
                  <p className="text-xs text-gray-500">云是现代数据架构的基础</p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                  实际价值
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "⚡", title: "更强大的计算", desc: "处理本地无法处理的大数据" },
                  { icon: "💰", title: "降低成本", desc: "按需使用，无需采购硬件" },
                  { icon: "🔧", title: "更多工具", desc: "丰富的托管数据服务" },
                  { icon: "👥", title: "团队协作", desc: "云端共享数据和分析" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                          {item.title}
                        </h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 主流云平台 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            主流云平台对比
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            选择适合的云平台开始学习
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, idx) => (
              <Card 
                key={idx} 
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                      <platform.icon className={`h-6 w-6 ${platform.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        📊 市场份额：{platform.marketShare}
                      </CardDescription>
                    </div>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {platform.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🗄️ 数据服务
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {platform.dataServices.map((service, sidx) => (
                        <div 
                          key={sidx} 
                          className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 flex items-center gap-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      <CheckCircle2 className="h-4 w-4" />
                      优势
                    </h4>
                    <ul className="space-y-1">
                      {platform.advantages.map((adv, aidx) => (
                        <li key={aidx} className={`text-xs flex items-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 flex items-center gap-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      <XCircle className="h-4 w-4" />
                      劣势
                    </h4>
                    <ul className="space-y-1">
                      {platform.disadvantages.map((dis, didx) => (
                        <li key={didx} className={`text-xs flex items-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-red-500 mt-0.5">✗</span>
                          <span>{dis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      💡 最适合：{platform.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 云端数据服务 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            云端数据服务分类
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            了解云上的数据工具箱
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataServices.map((category, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${category.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-2 mb-2">
                    <category.icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.services.map((service, sidx) => (
                      <div 
                        key={sidx}
                        className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                      >
                        <h4 className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          {service.name}
                        </h4>
                        <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                          {service.examples}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          💡 {service.useCase}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 云端数据架构 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-cyan-50 to-blue-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            典型云端数据架构
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            真实场景的云上数据方案
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architectures.map((arch, idx) => (
              <Card 
                key={idx}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <div className={`${arch.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <arch.icon className="h-8 w-8" />
                    <div>
                      <h3 className="text-xl font-bold">{arch.title}</h3>
                      <p className="text-sm text-white/90">{arch.description}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-6 space-y-4">
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      📋 应用场景
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {arch.scenario}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🏗️ 架构组件
                    </h4>
                    <div className="space-y-2">
                      {arch.components.map((component, cidx) => (
                        <div key={cidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs flex items-center justify-center font-bold">
                            {cidx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {component}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✨ 优势特点
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {arch.benefits.map((benefit, bidx) => (
                        <Badge key={bidx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                      💰 成本参考：{arch.cost}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 职业发展路径 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            从数据分析师到数据工程师
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            云技能助力职业转型
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerPath.map((stage, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 relative ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                {idx < careerPath.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 bg-cyan-500 rounded-full text-white flex items-center justify-center z-10">
                    →
                  </div>
                )}
                <CardHeader>
                  <div className={`w-full h-2 ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-purple-500' : 'bg-cyan-500'} rounded-full mb-3`}></div>
                  <CardTitle className="text-lg">{stage.stage}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心技能
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill, sidx) => (
                        <Badge key={sidx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {stage.newSkills && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                      <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                        🆕 新增技能
                      </h4>
                      <ul className="space-y-1">
                        {stage.newSkills.map((skill, nidx) => (
                          <li key={nidx} className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            • {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stage.limitations && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                      <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                        ⚠️ 局限性
                      </h4>
                      <ul className="space-y-1">
                        {stage.limitations.map((limit, lidx) => (
                          <li key={lidx} className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            • {limit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stage.responsibilities && (
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50'}`}>
                      <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>
                        💼 工作职责
                      </h4>
                      <ul className="space-y-1">
                        {stage.responsibilities.map((resp, ridx) => (
                          <li key={ridx} className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            • {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            学习路径规划
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            循序渐进掌握云端数据技能
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
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200'} border-2`}>
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
                    <li>• 注册免费套餐实践（AWS/GCP）</li>
                    <li>• 从数据服务入手，不要学计算网络</li>
                    <li>• 动手搭建完整数据项目</li>
                    <li>• 关注成本，及时关闭资源</li>
                    <li>• 考取云认证（可选）</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 只看文档不动手实践</li>
                    <li>• 学太多计算网络基础服务</li>
                    <li>• 忽视成本导致账单意外</li>
                    <li>• 追求全面而非聚焦数据</li>
                    <li>• 不了解本地方案盲目上云</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <FileText className="h-5 w-5" />
                    推荐资源
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• AWS/GCP官方免费培训</li>
                    <li>• 阿里云天池实验室</li>
                    <li>• Coursera云计算课程</li>
                    <li>• DataCamp云数据课程</li>
                    <li>• 云服务商官方文档</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            掌握云技能，开启数据工程之路
          </h2>
          <p className="text-xl text-white/90 mb-8">
            云是现代数据分析的基础设施
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/big-data">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100">
                学习大数据技术 →
              </Button>
            </Link>
            <Link href="/sql">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100">
                SQL查询基础 →
              </Button>
            </Link>
            <Link href="/python">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100">
                Python数据处理 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

