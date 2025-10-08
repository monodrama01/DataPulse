"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, Zap, Network, FileJson, Key, Layers,
  TrendingUp, CheckCircle2, XCircle, AlertTriangle,
  Sparkles, Search, BarChart3, Users, ShoppingCart, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function NoSQLPage() {
  const { theme } = useTheme();

  // NoSQL vs SQL 对比
  const comparison = {
    nosql: {
      structure: "灵活的 Schema",
      scaling: "水平扩展（分布式）",
      transactions: "最终一致性",
      relations: "嵌套/引用",
      performance: "高并发读写优秀",
      bestFor: "大数据、高并发、灵活数据"
    },
    sql: {
      structure: "固定的表结构",
      scaling: "垂直扩展（升级硬件）",
      transactions: "ACID 强一致性",
      relations: "外键关联",
      performance: "复杂查询优秀",
      bestFor: "事务处理、复杂关联"
    }
  };

  // NoSQL 四大类型
  const types = [
    {
      type: "文档型数据库",
      icon: FileJson,
      color: "bg-green-500",
      description: "存储 JSON/BSON 文档",
      examples: ["MongoDB", "CouchDB", "DocumentDB"],
      dataModel: "{ name: 'Alice', age: 25, tags: ['dev', 'ai'] }",
      advantages: ["灵活Schema", "易于理解", "嵌套数据", "开发友好"],
      useCases: ["内容管理", "用户画像", "产品目录", "移动应用后端"],
      marketShare: "最流行",
      learning: "⭐⭐⭐⭐⭐ 易学，推荐入门"
    },
    {
      type: "键值型数据库",
      icon: Key,
      color: "bg-red-500",
      description: "最简单的 Key-Value 存储",
      examples: ["Redis", "Memcached", "DynamoDB"],
      dataModel: "user:1001 → { name: 'Alice', status: 'online' }",
      advantages: ["极快速度", "简单高效", "易扩展", "低延迟"],
      useCases: ["缓存", "会话存储", "实时排行榜", "消息队列"],
      marketShare: "Redis 最受欢迎",
      learning: "⭐⭐⭐⭐⭐ 简单实用"
    },
    {
      type: "列族型数据库",
      icon: Layers,
      color: "bg-blue-500",
      description: "按列存储，适合大数据",
      examples: ["Cassandra", "HBase", "ScyllaDB"],
      dataModel: "RowKey → {ColumnFamily:Column → Value}",
      advantages: ["海量数据", "高写入", "分布式", "可用性高"],
      useCases: ["时序数据", "日志存储", "物联网", "消息记录"],
      marketShare: "大数据场景常用",
      learning: "⭐⭐⭐ 学习曲线较陡"
    },
    {
      type: "图数据库",
      icon: Network,
      color: "bg-purple-500",
      description: "存储节点和关系",
      examples: ["Neo4j", "ArangoDB", "OrientDB"],
      dataModel: "(User)-[:FOLLOWS]->(User)",
      advantages: ["关系查询", "图算法", "深度遍历", "推荐系统"],
      useCases: ["社交网络", "知识图谱", "风控反欺诈", "推荐引擎"],
      marketShare: "垂直领域强",
      learning: "⭐⭐⭐⭐ 需要图论基础"
    }
  ];

  // 主流 NoSQL 工具
  const tools = [
    {
      name: "MongoDB",
      type: "文档型",
      icon: Database,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "最流行的 NoSQL 数据库",
      features: ["JSON 文档存储", "丰富的查询语言", "自动分片", "副本集高可用", "聚合管道", "事务支持"],
      advantages: ["开发友好", "生态成熟", "文档丰富", "Atlas云服务"],
      disadvantages: ["内存占用高", "Join性能弱", "License变更争议"],
      bestFor: "Web应用、内容管理、快速开发",
      marketShare: "60%+ 文档数据库市场",
      difficulty: "⭐⭐ 易学",
      dataAnalysis: "支持聚合管道做复杂分析"
    },
    {
      name: "Redis",
      type: "键值型 + 数据结构",
      icon: Zap,
      color: "text-red-600",
      bgColor: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
      description: "内存数据库，性能极致",
      features: ["多种数据结构", "持久化选项", "发布订阅", "Lua脚本", "集群模式", "过期策略"],
      advantages: ["超快速度", "丰富数据类型", "简单易用", "应用广泛"],
      disadvantages: ["内存限制", "数据丢失风险", "单线程（传统）"],
      bestFor: "缓存、会话、排行榜、消息队列",
      marketShare: "键值数据库霸主",
      difficulty: "⭐⭐ 非常易学",
      dataAnalysis: "实时数据聚合、HyperLogLog统计"
    },
    {
      name: "Elasticsearch",
      type: "搜索引擎 + 分析",
      icon: Search,
      color: "text-yellow-600",
      bgColor: theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50',
      description: "分布式搜索和分析引擎",
      features: ["全文搜索", "实时索引", "聚合分析", "ELK日志栈", "地理搜索", "机器学习"],
      advantages: ["搜索强大", "可视化Kibana", "横向扩展", "准实时"],
      disadvantages: ["资源消耗大", "运维复杂", "强一致性弱"],
      bestFor: "日志分析、全文搜索、实时监控",
      marketShare: "搜索领域第一",
      difficulty: "⭐⭐⭐ 中等",
      dataAnalysis: "强大的聚合分析能力，日志数据挖掘"
    },
    {
      name: "Cassandra",
      type: "列族型",
      icon: Layers,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "分布式宽列存储",
      features: ["无主架构", "线性扩展", "高可用", "多数据中心", "CQL查询", "时序优化"],
      advantages: ["高写入性能", "无单点故障", "地理分布", "成熟稳定"],
      disadvantages: ["学习曲线陡", "没有Join", "运维复杂"],
      bestFor: "物联网、时序数据、消息记录",
      marketShare: "企业级大数据常用",
      difficulty: "⭐⭐⭐⭐ 较难",
      dataAnalysis: "海量时序数据分析"
    },
    {
      name: "Neo4j",
      type: "图数据库",
      icon: Network,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "原生图数据库",
      features: ["Cypher查询语言", "ACID事务", "图算法库", "可视化界面", "路径查询", "社区检测"],
      advantages: ["关系查询快", "直观建模", "算法丰富", "可视化好"],
      disadvantages: ["扩展性限制", "小众生态", "企业版贵"],
      bestFor: "社交网络、推荐系统、知识图谱",
      marketShare: "图数据库第一",
      difficulty: "⭐⭐⭐ 中等",
      dataAnalysis: "关系分析、影响力分析、路径挖掘"
    },
    {
      name: "DynamoDB",
      type: "键值/文档型（AWS）",
      icon: Database,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "AWS 托管 NoSQL",
      features: ["全托管", "按需扩展", "全球表", "流式处理", "事务支持", "备份恢复"],
      advantages: ["零运维", "高可用SLA", "与AWS集成", "性能稳定"],
      disadvantages: ["锁定AWS", "成本较高", "查询限制多"],
      bestFor: "AWS生态、Serverless应用",
      marketShare: "云原生首选",
      difficulty: "⭐⭐ 易用",
      dataAnalysis: "与 Athena/EMR 集成分析"
    }
  ];

  // 应用场景
  const scenarios = [
    {
      title: "高并发缓存层",
      icon: Zap,
      color: "bg-gradient-to-br from-red-500 to-orange-500",
      problem: "数据库查询压力大，响应慢",
      solution: "Redis 缓存热点数据",
      architecture: [
        "用户请求 → 先查 Redis 缓存",
        "缓存命中 → 直接返回（毫秒级）",
        "缓存未命中 → 查数据库 → 写入缓存",
        "设置过期时间，自动淘汰"
      ],
      benefits: ["响应速度提升 10-100 倍", "数据库负载降低 80%+", "成本降低"],
      examples: "电商商品详情、用户信息、配置数据",
      tools: "Redis + MySQL"
    },
    {
      title: "内容管理系统",
      icon: FileJson,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      problem: "内容结构多变，频繁改表",
      solution: "MongoDB 存储灵活文档",
      architecture: [
        "文章/产品存为 JSON 文档",
        "不同类型有不同字段",
        "无需提前定义表结构",
        "嵌套存储评论、标签等"
      ],
      benefits: ["开发速度快", "无需频繁改表", "易于扩展", "适合敏捷开发"],
      examples: "博客系统、电商产品目录、CMS平台",
      tools: "MongoDB + Node.js"
    },
    {
      title: "日志分析平台",
      icon: Search,
      color: "bg-gradient-to-br from-yellow-500 to-amber-500",
      problem: "海量日志难以搜索和分析",
      solution: "Elasticsearch 全文搜索 + 聚合分析",
      architecture: [
        "应用日志 → Logstash 采集",
        "Elasticsearch 索引和存储",
        "Kibana 可视化仪表板",
        "实时搜索和告警"
      ],
      benefits: ["秒级搜索海量日志", "实时聚合分析", "可视化监控", "异常告警"],
      examples: "运维监控、业务日志分析、安全审计",
      tools: "ELK Stack (Elasticsearch + Logstash + Kibana)"
    },
    {
      title: "实时排行榜",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      problem: "实时排名计算和展示",
      solution: "Redis Sorted Set 有序集合",
      architecture: [
        "用户得分存入 Sorted Set",
        "自动按分数排序",
        "ZINCRBY 增加分数",
        "ZRANGE 获取排名"
      ],
      benefits: ["毫秒级更新", "自动排序", "支持分页", "高并发"],
      examples: "游戏排行榜、热搜榜、用户积分榜",
      tools: "Redis Sorted Set"
    },
    {
      title: "社交网络关系",
      icon: Users,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      problem: "复杂的好友关系和推荐",
      solution: "Neo4j 图数据库",
      architecture: [
        "用户节点 + 关注关系边",
        "Cypher 查询好友的好友",
        "图算法计算影响力",
        "推荐潜在好友"
      ],
      benefits: ["深度关系查询快", "推荐算法强", "可视化直观", "社区发现"],
      examples: "社交好友推荐、关系链分析、影响力排名",
      tools: "Neo4j + Cypher"
    },
    {
      title: "物联网时序数据",
      icon: BarChart3,
      color: "bg-gradient-to-br from-indigo-500 to-blue-500",
      problem: "海量传感器数据写入和查询",
      solution: "Cassandra 列族存储",
      architecture: [
        "按时间分区存储",
        "传感器ID + 时间戳为主键",
        "支持高并发写入",
        "按时间范围聚合查询"
      ],
      benefits: ["超高写入吞吐", "线性扩展", "无单点故障", "时序优化"],
      examples: "智能设备监控、车联网、工业传感器",
      tools: "Cassandra + Kafka"
    }
  ];

  // 工具选型对比表
  const comparisonTable = [
    { tool: "MongoDB", type: "文档", 难度: "易", 性能: "高", 扩展: "好", 适合: "Web应用", 数据分析: "★★★★" },
    { tool: "Redis", type: "键值", 难度: "易", 性能: "极高", 扩展: "好", 适合: "缓存", 数据分析: "★★★" },
    { tool: "Elasticsearch", type: "搜索", 难度: "中", 性能: "高", 扩展: "优秀", 适合: "日志分析", 数据分析: "★★★★★" },
    { tool: "Cassandra", type: "列族", 难度: "难", 性能: "极高", 扩展: "优秀", 适合: "时序数据", 数据分析: "★★★★" },
    { tool: "Neo4j", type: "图", 难度: "中", 性能: "中", 扩展: "中", 适合: "关系分析", 数据分析: "★★★★" },
    { tool: "DynamoDB", type: "键值", 难度: "易", 性能: "高", 扩展: "优秀", 适合: "AWS应用", 数据分析: "★★★" }
  ];

  // 学习路径
  const learningPath = [
    {
      stage: "NoSQL 基础",
      duration: "1-2周",
      color: "bg-green-500",
      content: [
        "理解 NoSQL vs SQL 区别",
        "了解四大 NoSQL 类型",
        "学习 CAP 定理",
        "理解最终一致性",
        "选择合适的 NoSQL 类型"
      ]
    },
    {
      stage: "MongoDB 实践",
      duration: "2-3周",
      color: "bg-blue-500",
      content: [
        "安装和基本操作（CRUD）",
        "文档建模设计",
        "查询和索引优化",
        "聚合管道（Aggregation）",
        "副本集和分片入门"
      ]
    },
    {
      stage: "Redis 缓存",
      duration: "1-2周",
      color: "bg-red-500",
      content: [
        "五大数据结构使用",
        "缓存策略（LRU、过期）",
        "发布订阅模式",
        "持久化配置",
        "缓存穿透/击穿/雪崩"
      ]
    },
    {
      stage: "高级应用",
      duration: "持续深化",
      color: "bg-purple-500",
      content: [
        "Elasticsearch 日志分析",
        "图数据库入门（可选）",
        "NoSQL 与 SQL 混合使用",
        "性能调优和监控",
        "数据建模最佳实践"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Database className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">NoSQL 数据库</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              高性能分布式数据存储
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-red-600 px-4 py-2 text-sm">
                🚀 高并发
              </Badge>
              <Badge className="bg-white text-orange-600 px-4 py-2 text-sm">
                📈 易扩展
              </Badge>
              <Badge className="bg-white text-amber-600 px-4 py-2 text-sm">
                ⚡ 高性能
              </Badge>
              <Badge className="bg-white text-yellow-600 px-4 py-2 text-sm">
                🔧 灵活Schema
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* NoSQL vs SQL */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            NoSQL vs 关系型数据库
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* NoSQL */}
            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Database className="h-8 w-8 text-orange-600" />
                  NoSQL 数据库
                </CardTitle>
                <CardDescription className="text-base">灵活、高性能、分布式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "数据结构", value: comparison.nosql.structure, icon: "📝" },
                  { label: "扩展方式", value: comparison.nosql.scaling, icon: "📈" },
                  { label: "事务模型", value: comparison.nosql.transactions, icon: "🔄" },
                  { label: "关系处理", value: comparison.nosql.relations, icon: "🔗" },
                  { label: "性能特点", value: comparison.nosql.performance, icon: "⚡" },
                  { label: "最适合", value: comparison.nosql.bestFor, icon: "✨" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                          {item.label}
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SQL */}
            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Database className="h-8 w-8 text-blue-600" />
                  关系型数据库 (SQL)
                </CardTitle>
                <CardDescription className="text-base">严格、可靠、事务强</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "数据结构", value: comparison.sql.structure, icon: "📋" },
                  { label: "扩展方式", value: comparison.sql.scaling, icon: "⬆️" },
                  { label: "事务模型", value: comparison.sql.transactions, icon: "🔒" },
                  { label: "关系处理", value: comparison.sql.relations, icon: "🔗" },
                  { label: "性能特点", value: comparison.sql.performance, icon: "💎" },
                  { label: "最适合", value: comparison.sql.bestFor, icon: "✨" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                          {item.label}
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 选择建议 */}
          <Card className={`mt-8 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                如何选择？
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  <CheckCircle2 className="h-5 w-5" />
                  选择 NoSQL 如果：
                </h4>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• 数据结构频繁变化</li>
                  <li>• 需要高并发读写（百万级QPS）</li>
                  <li>• 海量数据需要分布式存储</li>
                  <li>• 对最终一致性可接受</li>
                  <li>• 快速开发，敏捷迭代</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                  <CheckCircle2 className="h-5 w-5" />
                  选择 SQL 如果：
                </h4>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• 需要 ACID 强事务（如金融）</li>
                  <li>• 复杂的多表关联查询</li>
                  <li>• 数据完整性要求高</li>
                  <li>• 团队熟悉 SQL</li>
                  <li>• 数据规模可控（TB级以下）</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NoSQL 四大类型 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            NoSQL 四大类型
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            选择适合场景的数据库类型
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {types.map((type, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${type.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${type.color}`}>
                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{type.type}</CardTitle>
                      <CardDescription className="text-xs">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      📦 代表产品
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((ex, eidx) => (
                        <Badge key={eidx} variant="outline" className="text-xs">
                          {ex}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg font-mono text-xs ${theme === 'dark' ? 'bg-gray-900/50 text-green-400' : 'bg-gray-900 text-green-400'}`}>
                    {type.dataModel}
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✅ 优势
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {type.advantages.map((adv, aidx) => (
                        <div 
                          key={aidx}
                          className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                        >
                          {adv}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      💼 适用场景
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {type.useCases.map((uc, uidx) => (
                        <Badge key={uidx} className="text-xs bg-blue-600 text-white">
                          {uc}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      📊 {type.marketShare}
                    </div>
                    <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                      {type.learning}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 主流 NoSQL 工具 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            主流 NoSQL 数据库
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            深入了解每个数据库的特点
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

                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                      <strong>📊 数据分析：</strong> {tool.dataAnalysis}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      📈 {tool.marketShare}
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                      {tool.difficulty}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 工具对比表 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            工具选型对比
          </h2>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        工具
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        类型
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        难度
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        性能
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        扩展性
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        适合场景
                      </th>
                      <th className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        数据分析
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, idx) => (
                      <tr 
                        key={idx}
                        className={`border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
                      >
                        <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {row.tool}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.type}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.难度}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.性能}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.扩展}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.适合}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          {row.数据分析}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 真实应用场景 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实应用场景
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            NoSQL 在实际业务中的应用
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
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      ❌ 问题
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.problem}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✅ 解决方案
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🏗️ 架构流程
                    </h4>
                    <div className="space-y-2">
                      {scenario.architecture.map((step, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                            {sidx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      ✨ 收益
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {scenario.benefits.map((benefit, bidx) => (
                        <Badge key={bidx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                      <strong>📦 示例：</strong> {scenario.examples}
                    </p>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>🔧 技术栈：</strong> {scenario.tools}
                    </p>
                  </div>
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
            循序渐进掌握 NoSQL
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
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                学习建议与最佳实践
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
                    <li>• 从 MongoDB 和 Redis 开始</li>
                    <li>• 先做小项目实践（Todo、博客）</li>
                    <li>• 理解 CAP 定理和一致性</li>
                    <li>• 学习数据建模最佳实践</li>
                    <li>• NoSQL + SQL 混合使用</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• "NoSQL 能替代 SQL"（不能）</li>
                    <li>• 无脑选择 MongoDB（看场景）</li>
                    <li>• 把 Redis 当持久化数据库</li>
                    <li>• 忽视数据建模设计</li>
                    <li>• 不考虑一致性问题</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <AlertTriangle className="h-5 w-5" />
                    选型建议
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 缓存层：首选 Redis</li>
                    <li>• Web应用：MongoDB 很合适</li>
                    <li>• 日志分析：Elasticsearch</li>
                    <li>• 时序数据：Cassandra/InfluxDB</li>
                    <li>• 关系分析：Neo4j</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            掌握 NoSQL，应对高并发大数据场景
          </h2>
          <p className="text-xl text-white/90 mb-8">
            NoSQL 是现代应用的标配
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/big-data">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                学习大数据技术 →
              </Button>
            </Link>
            <Link href="/sql">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                SQL 数据库基础 →
              </Button>
            </Link>
            <Link href="/python">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Python 数据处理 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

