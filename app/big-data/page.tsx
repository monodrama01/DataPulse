"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, Database, Server, Layers, Cloud, TrendingUp, 
  GitBranch, Activity, BarChart3, FileText, ShoppingCart,
  Users, Heart, Video, DollarSign, Globe, Sparkles
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function BigDataPage() {
  const { theme } = useTheme()

  // 核心技术栈
  const technologies = [
    {
      name: "Apache Spark",
      icon: Zap,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "分布式内存计算引擎",
      features: ["批处理与流处理", "内存计算加速", "支持多种语言", "机器学习库MLlib"],
      useCase: "大规模数据ETL处理和实时计算"
    },
    {
      name: "Hadoop/HDFS",
      icon: Database,
      color: "text-yellow-600",
      bgColor: theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50',
      description: "分布式存储与计算框架",
      features: ["海量数据存储", "容错性强", "成本低廉", "水平扩展"],
      useCase: "PB级数据的存储与批处理"
    },
    {
      name: "Hive/Presto",
      icon: Server,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "分布式SQL查询引擎",
      features: ["SQL查询接口", "快速交互查询", "支持多数据源", "OLAP分析"],
      useCase: "数据仓库查询和即席分析"
    },
    {
      name: "Flink 流计算",
      icon: Activity,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "实时流处理框架",
      features: ["低延迟处理", "事件驱动", "状态管理", "精确一次语义"],
      useCase: "实时数据流分析和事件处理"
    },
    {
      name: "Kafka 消息队列",
      icon: GitBranch,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "分布式消息流平台",
      features: ["高吞吐量", "持久化存储", "发布订阅模式", "流式处理"],
      useCase: "日志收集、消息传递、流数据管道"
    },
    {
      name: "HBase/Cassandra",
      icon: Layers,
      color: "text-red-600",
      bgColor: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
      description: "分布式NoSQL数据库",
      features: ["列式存储", "高并发读写", "自动分片", "线性扩展"],
      useCase: "海量结构化数据的随机读写"
    }
  ]

  // 应用场景
  const applications = [
    {
      title: "电商推荐系统",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
      description: "基于用户行为的实时推荐",
      technologies: ["Spark MLlib", "Kafka", "HBase"],
      metrics: ["转化率提升30%", "实时响应<100ms", "日处理10亿+行为"],
      process: [
        "采集用户浏览、点击、购买行为",
        "Kafka实时传输行为数据流",
        "Spark Streaming实时计算用户兴趣",
        "机器学习模型生成个性化推荐",
        "HBase存储用户画像和推荐结果"
      ]
    },
    {
      title: "金融风控系统",
      icon: DollarSign,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      description: "实时交易风险监测与预警",
      technologies: ["Flink", "Druid", "Elasticsearch"],
      metrics: ["延迟<50ms", "准确率99.5%", "日交易量千万级"],
      process: [
        "实时采集交易行为数据",
        "Flink流计算引擎实时分析",
        "基于规则引擎和ML模型识别异常",
        "触发预警并自动拦截可疑交易",
        "结果存入Elasticsearch供查询分析"
      ]
    },
    {
      title: "智慧城市交通",
      icon: Globe,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "城市交通流量预测与优化",
      technologies: ["Spark", "Kafka", "TimeSeries DB"],
      metrics: ["拥堵降低25%", "预测准确率92%", "覆盖5000+路口"],
      process: [
        "物联网设备采集交通流量数据",
        "Kafka消息队列实时传输",
        "Spark批处理历史数据建模",
        "时间序列预测未来交通状况",
        "优化信号灯配时方案"
      ]
    },
    {
      title: "医疗健康分析",
      icon: Heart,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      description: "病患数据分析与疾病预测",
      technologies: ["Hadoop", "Hive", "Spark MLlib"],
      metrics: ["样本量百万级", "早期预警率85%", "诊断辅助准确率90%"],
      process: [
        "整合电子病历、检查报告等数据",
        "HDFS存储海量医疗影像和文本",
        "Hive构建医疗数据仓库",
        "Spark进行疾病相关性分析",
        "机器学习模型辅助诊断决策"
      ]
    },
    {
      title: "社交媒体分析",
      icon: Users,
      color: "bg-gradient-to-br from-purple-500 to-indigo-500",
      description: "舆情监测与用户行为分析",
      technologies: ["Kafka", "Spark", "Elasticsearch"],
      metrics: ["日均10亿+消息", "实时热点挖掘", "情感分析准确率88%"],
      process: [
        "爬虫采集社交媒体公开数据",
        "Kafka分布式消息队列缓冲",
        "Spark Streaming实时处理分析",
        "NLP技术提取关键词和情感",
        "可视化展示舆情趋势和热点话题"
      ]
    },
    {
      title: "视频推荐平台",
      icon: Video,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      description: "个性化内容推荐与分析",
      technologies: ["Hive", "Spark", "Redis"],
      metrics: ["观看时长提升40%", "推荐点击率15%", "用户留存率提升20%"],
      process: [
        "收集用户观看历史和互动数据",
        "Hive构建用户行为数据仓库",
        "Spark离线计算推荐模型",
        "Redis缓存热门推荐结果",
        "实时调整推荐策略优化体验"
      ]
    }
  ]

  // 学习路径
  const learningPath = [
    {
      level: "基础阶段",
      duration: "1-2个月",
      color: "bg-green-500",
      topics: [
        "Linux基础命令和Shell脚本",
        "分布式系统基本概念",
        "Hadoop生态基础（HDFS、MapReduce）",
        "SQL和Hive数据查询"
      ]
    },
    {
      level: "进阶阶段",
      duration: "2-3个月",
      color: "bg-blue-500",
      topics: [
        "Spark核心原理与编程（RDD、DataFrame）",
        "Kafka消息队列的使用",
        "HBase/Cassandra NoSQL数据库",
        "数据仓库建模与ETL流程"
      ]
    },
    {
      level: "高级阶段",
      duration: "3-4个月",
      color: "bg-purple-500",
      topics: [
        "Flink实时流处理框架",
        "Spark调优与性能优化",
        "数据湖架构（Delta Lake、Iceberg）",
        "大数据机器学习（MLlib、TensorFlow）"
      ]
    },
    {
      level: "实战阶段",
      duration: "持续实践",
      color: "bg-orange-500",
      topics: [
        "完整数据平台架构设计",
        "实时数据处理Pipeline搭建",
        "大规模数据治理与质量保证",
        "云原生大数据方案（EMR、Dataproc）"
      ]
    }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">大数据技术</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              处理海量数据的分布式计算与存储技术体系
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-orange-600 px-4 py-2 text-sm">
                🚀 分布式计算
              </Badge>
              <Badge className="bg-white text-red-600 px-4 py-2 text-sm">
                💾 海量存储
              </Badge>
              <Badge className="bg-white text-pink-600 px-4 py-2 text-sm">
                ⚡ 实时处理
              </Badge>
              <Badge className="bg-white text-purple-600 px-4 py-2 text-sm">
                📊 数据分析
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 什么是大数据 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            什么是大数据技术？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 定义 */}
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  核心定义
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="leading-relaxed">
                  大数据技术是指用于<strong className="text-orange-600">采集、存储、管理和分析</strong>海量、高速、多样化数据的技术工具和方法论。
                </p>
                <div className="pl-4 border-l-4 border-orange-500 py-2">
                  <p className="text-sm">
                    传统数据库和分析工具难以在合理时间内处理的数据集，就需要大数据技术来解决。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 5V特征 */}
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  大数据5V特征
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Volume (容量)", desc: "数据规模达到TB、PB甚至EB级" },
                  { name: "Velocity (速度)", desc: "数据产生和处理速度极快" },
                  { name: "Variety (多样性)", desc: "结构化、半结构化、非结构化数据" },
                  { name: "Value (价值)", desc: "数据密度低但蕴含高价值" },
                  { name: "Veracity (真实性)", desc: "数据质量和准确性参差不齐" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                      {item.name}
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 核心价值 */}
          <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-orange-600" />
                为什么需要大数据技术？
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { icon: "📈", title: "业务增长", desc: "互联网应用产生海量用户数据" },
                  { icon: "🎯", title: "精准决策", desc: "基于数据洞察做出更好决策" },
                  { icon: "⚡", title: "实时响应", desc: "毫秒级处理和反馈用户行为" },
                  { icon: "💰", title: "成本优化", desc: "分布式架构降低单位成本" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 核心技术栈 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            核心技术栈详解
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            掌握这些技术，构建完整的大数据处理能力
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, idx) => (
              <Card 
                key={idx} 
                className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${tech.bgColor}`}>
                      <tech.icon className={`h-6 w-6 ${tech.color}`} />
                    </div>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </div>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心特性
                    </h4>
                    <ul className="space-y-1">
                      {tech.features.map((feature, fidx) => (
                        <li key={fidx} className={`text-sm flex items-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      💡 典型应用：{tech.useCase}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 实际应用场景 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实业务场景应用
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            大数据技术如何解决实际业务问题
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, idx) => (
              <Card 
                key={idx}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                {/* 标题栏 */}
                <div className={`${app.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <app.icon className="h-8 w-8" />
                    <div>
                      <h3 className="text-xl font-bold">{app.title}</h3>
                      <p className="text-sm text-white/90">{app.description}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-6 space-y-4">
                  {/* 技术栈 */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🛠️ 使用技术
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {app.technologies.map((tech, tidx) => (
                        <Badge key={tidx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 关键指标 */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      📊 关键指标
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {app.metrics.map((metric, midx) => (
                        <div 
                          key={midx} 
                          className={`p-2 rounded text-center ${
                            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                          }`}
                        >
                          <p className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {metric}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 处理流程 */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🔄 处理流程
                    </h4>
                    <div className="space-y-2">
                      {app.process.map((step, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs flex items-center justify-center font-bold">
                            {sidx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            学习路径规划
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从零开始系统掌握大数据技术
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
                  <CardTitle className="text-lg">{stage.level}</CardTitle>
                  <CardDescription>⏱️ {stage.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.topics.map((topic, tidx) => (
                      <li 
                        key={tidx} 
                        className={`text-sm flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className={`${stage.color.replace('bg-', 'text-')} mt-1`}>▸</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 学习建议 */}
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                学习建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    <span>✅</span> 推荐做法
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 先掌握Linux和SQL基础</li>
                    <li>• 多动手搭建本地环境实践</li>
                    <li>• 参与开源项目积累经验</li>
                    <li>• 关注技术博客和社区</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <span>❌</span> 常见误区
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 只看文档不动手实践</li>
                    <li>• 追求新技术忽视基础</li>
                    <li>• 不了解业务场景盲目学</li>
                    <li>• 轻视数据质量和治理</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <span>📚</span> 推荐资源
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Spark官方文档和教程</li>
                    <li>• Hadoop权威指南（书籍）</li>
                    <li>• Coursera大数据课程</li>
                    <li>• GitHub优秀开源项目</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 行业趋势 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            行业发展趋势
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-6 w-6 text-blue-600" />
                  云原生大数据
                </CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                <p className="mb-3">
                  云服务商提供的托管式大数据服务成为主流，降低运维成本，提高弹性扩展能力。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">AWS EMR</Badge>
                  <Badge variant="outline">Google Dataproc</Badge>
                  <Badge variant="outline">Azure HDInsight</Badge>
                  <Badge variant="outline">阿里云MaxCompute</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-green-600" />
                  实时数据湖
                </CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                <p className="mb-3">
                  Delta Lake、Iceberg等技术让数据湖支持ACID事务和实时更新，统一批流处理。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Delta Lake</Badge>
                  <Badge variant="outline">Apache Iceberg</Badge>
                  <Badge variant="outline">Apache Hudi</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  AI与大数据融合
                </CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                <p className="mb-3">
                  机器学习和深度学习直接集成到大数据平台，实现端到端的智能数据分析。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Spark MLlib</Badge>
                  <Badge variant="outline">TensorFlow on Spark</Badge>
                  <Badge variant="outline">PyTorch Distributed</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                  数据治理与隐私
                </CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                <p className="mb-3">
                  随着数据法规趋严，数据质量管理、血缘追踪和隐私保护成为必备能力。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">数据血缘</Badge>
                  <Badge variant="outline">元数据管理</Badge>
                  <Badge variant="outline">隐私计算</Badge>
                  <Badge variant="outline">GDPR合规</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            开始你的大数据学习之旅
          </h2>
          <p className="text-xl text-white/90 mb-8">
            从基础到实战，系统掌握大数据核心技术
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/python">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                学习Python基础 →
              </Button>
            </Link>
            <Link href="/sql">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                掌握SQL查询 →
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                查看实战项目 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

