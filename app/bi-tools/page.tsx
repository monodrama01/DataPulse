"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, PieChart, LineChart, Activity,
  Eye, Layers, Zap, Users, Building2, ShoppingCart,
  DollarSign, Package, Sparkles, CheckCircle2, XCircle,
  FileText, Monitor, Cloud, Database
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function BIToolsPage() {
  const { theme } = useTheme();

  // 核心BI工具介绍
  const tools = [
    {
      name: "Tableau Desktop",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "业界领先的数据可视化工具",
      features: ["拖拽式界面", "强大的可视化能力", "实时数据连接", "交互式仪表板"],
      advantages: ["可视化效果出色", "易于上手", "社区资源丰富", "支持多种数据源"],
      disadvantages: ["价格较高", "大数据性能一般", "需要Desktop授权"],
      bestFor: "数据分析师、业务团队的可视化报表",
      price: "个人版 $70/月，专业版需企业授权"
    },
    {
      name: "Power BI",
      icon: TrendingUp,
      color: "text-yellow-600",
      bgColor: theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50',
      description: "微软推出的商业智能平台",
      features: ["与Office深度集成", "DAX数据建模", "自动化报表", "移动端支持"],
      advantages: ["性价比极高", "Excel用户友好", "云端协作便捷", "持续更新迭代"],
      disadvantages: ["学习曲线陡峭", "复杂计算较难", "依赖微软生态"],
      bestFor: "企业级BI解决方案，Office用户",
      price: "Pro版 $10/月，Premium按容量计费"
    },
    {
      name: "Looker (Google)",
      icon: Eye,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "基于LookML的现代化BI平台",
      features: ["LookML建模语言", "云原生架构", "版本控制", "API优先设计"],
      advantages: ["代码化管理", "数据一致性强", "协作能力出色", "与GCP集成"],
      disadvantages: ["学习成本高", "需要编程基础", "价格昂贵"],
      bestFor: "技术团队、大型企业数据团队",
      price: "企业级授权，年费数万美元"
    },
    {
      name: "QlikView/Qlik Sense",
      icon: Layers,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "关联分析引擎的BI工具",
      features: ["关联数据模型", "内存计算", "自助式分析", "移动BI"],
      advantages: ["数据关联强大", "响应速度快", "灵活的探索", "企业级稳定"],
      disadvantages: ["界面相对传统", "学习门槛较高", "价格不菲"],
      bestFor: "需要复杂数据关联的企业应用",
      price: "企业授权制，按用户数计费"
    },
    {
      name: "Metabase",
      icon: Database,
      color: "text-teal-600",
      bgColor: theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-50',
      description: "开源轻量级BI工具",
      features: ["开源免费", "简单易用", "SQL查询界面", "问题式查询"],
      advantages: ["完全免费", "快速部署", "轻量级", "适合中小团队"],
      disadvantages: ["功能相对简单", "可视化选项有限", "不适合大规模"],
      bestFor: "初创公司、中小企业快速搭建BI",
      price: "开源版免费，企业版 $500/月起"
    },
    {
      name: "Apache Superset",
      icon: Activity,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "Airbnb开源的现代化BI平台",
      features: ["开源免费", "丰富的图表类型", "SQL Lab", "支持大数据"],
      advantages: ["完全开源", "可扩展性强", "支持多数据源", "活跃社区"],
      disadvantages: ["需要技术能力", "界面不够精致", "文档不够完善"],
      bestFor: "技术团队、数据工程师自建BI",
      price: "完全免费开源"
    }
  ];

  // 应用场景
  const applications = [
    {
      title: "销售业绩仪表板",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "实时监控销售数据与业绩指标",
      tools: ["Power BI", "Tableau"],
      scenarios: [
        "实时展示销售额、订单量、客单价",
        "按地区、产品线、销售员维度切片",
        "同比环比增长趋势分析",
        "目标达成率与预警提醒",
        "移动端随时查看关键指标"
      ],
      benefits: ["决策效率提升40%", "数据透明度提高", "目标管理清晰化"],
      kpi: ["销售额", "转化率", "客户获取成本", "复购率"]
    },
    {
      title: "财务分析报表",
      icon: DollarSign,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      description: "财务数据的多维度分析与预算管理",
      tools: ["Power BI", "Qlik Sense"],
      scenarios: [
        "收入、成本、利润的动态分析",
        "预算执行与偏差跟踪",
        "现金流预测与资金管理",
        "部门费用对比与成本控制",
        "财务指标钻取分析"
      ],
      benefits: ["预算编制时间减少50%", "成本节约15%", "财务合规性提升"],
      kpi: ["净利润率", "ROI", "现金流", "预算偏差率"]
    },
    {
      title: "运营监控大屏",
      icon: Monitor,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      description: "实时业务运营数据大屏展示",
      tools: ["Tableau", "Superset"],
      scenarios: [
        "实时订单量、交易额大屏展示",
        "物流配送状态地图可视化",
        "客服响应时效与满意度",
        "库存周转与缺货预警",
        "异常指标自动报警"
      ],
      benefits: ["异常发现速度提升60%", "协同效率提高", "管理可视化"],
      kpi: ["实时GMV", "订单履约率", "客诉率", "库存周转天数"]
    },
    {
      title: "客户分析洞察",
      icon: Users,
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      description: "客户行为分析与精准营销",
      tools: ["Tableau", "Looker"],
      scenarios: [
        "客户画像与细分群体分析",
        "用户生命周期价值(LTV)计算",
        "流失预警与挽留策略",
        "营销活动效果评估",
        "用户行为漏斗分析"
      ],
      benefits: ["营销ROI提升35%", "客户留存率提高20%", "精准触达"],
      kpi: ["CAC", "LTV", "留存率", "NPS净推荐值"]
    },
    {
      title: "供应链管理",
      icon: Package,
      color: "bg-gradient-to-br from-indigo-500 to-blue-500",
      description: "端到端供应链数据分析",
      tools: ["Qlik Sense", "Power BI"],
      scenarios: [
        "供应商绩效评估与对比",
        "采购成本分析与优化",
        "库存水平与安全库存监控",
        "物流效率与配送时效",
        "需求预测与补货建议"
      ],
      benefits: ["库存成本降低25%", "缺货率下降40%", "采购效率提升"],
      kpi: ["采购成本", "库存周转率", "准时交付率", "缺货率"]
    },
    {
      title: "人力资源分析",
      icon: Building2,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      description: "员工数据分析与人才管理",
      tools: ["Power BI", "Tableau"],
      scenarios: [
        "员工流失率分析与预测",
        "招聘漏斗与效率分析",
        "薪酬对标与结构分析",
        "培训投入与效果评估",
        "组织健康度仪表板"
      ],
      benefits: ["招聘周期缩短30%", "离职率降低15%", "人效提升"],
      kpi: ["离职率", "人均产值", "招聘周期", "培训完成率"]
    }
  ];

  // BI实施步骤
  const implementationSteps = [
    {
      step: "需求调研",
      icon: FileText,
      color: "bg-blue-500",
      tasks: [
        "明确业务目标与痛点",
        "确定关键分析指标（KPI）",
        "梳理数据来源与口径",
        "了解用户角色与权限",
        "评估现有IT基础设施"
      ]
    },
    {
      step: "数据准备",
      icon: Database,
      color: "bg-green-500",
      tasks: [
        "建立数据仓库或数据湖",
        "设计维度建模（星型/雪花）",
        "ETL流程开发与调度",
        "数据质量检查与治理",
        "历史数据迁移与清洗"
      ]
    },
    {
      step: "报表开发",
      icon: BarChart3,
      color: "bg-purple-500",
      tasks: [
        "设计仪表板布局与交互",
        "创建数据模型与计算字段",
        "开发核心报表与可视化",
        "配置数据刷新策略",
        "性能优化与测试"
      ]
    },
    {
      step: "上线运维",
      icon: Cloud,
      color: "bg-orange-500",
      tasks: [
        "用户培训与文档编写",
        "权限配置与数据安全",
        "监控报表性能与可用性",
        "收集用户反馈并迭代",
        "定期更新与维护"
      ]
    }
  ];

  // 工具选择对比
  const comparison = [
    { feature: "易用性", tableau: "⭐⭐⭐⭐⭐", powerbi: "⭐⭐⭐⭐", looker: "⭐⭐", qlik: "⭐⭐⭐", metabase: "⭐⭐⭐⭐⭐", superset: "⭐⭐⭐" },
    { feature: "可视化", tableau: "⭐⭐⭐⭐⭐", powerbi: "⭐⭐⭐⭐", looker: "⭐⭐⭐⭐", qlik: "⭐⭐⭐", metabase: "⭐⭐⭐", superset: "⭐⭐⭐⭐" },
    { feature: "数据建模", tableau: "⭐⭐⭐", powerbi: "⭐⭐⭐⭐⭐", looker: "⭐⭐⭐⭐⭐", qlik: "⭐⭐⭐⭐", metabase: "⭐⭐", superset: "⭐⭐⭐" },
    { feature: "性能", tableau: "⭐⭐⭐⭐", powerbi: "⭐⭐⭐⭐", looker: "⭐⭐⭐⭐", qlik: "⭐⭐⭐⭐⭐", metabase: "⭐⭐⭐", superset: "⭐⭐⭐⭐" },
    { feature: "协作", tableau: "⭐⭐⭐", powerbi: "⭐⭐⭐⭐⭐", looker: "⭐⭐⭐⭐⭐", qlik: "⭐⭐⭐⭐", metabase: "⭐⭐⭐", superset: "⭐⭐⭐" },
    { feature: "价格", tableau: "贵", powerbi: "便宜", looker: "很贵", qlik: "贵", metabase: "免费", superset: "免费" },
    { feature: "企业级", tableau: "⭐⭐⭐⭐⭐", powerbi: "⭐⭐⭐⭐⭐", looker: "⭐⭐⭐⭐⭐", qlik: "⭐⭐⭐⭐⭐", metabase: "⭐⭐⭐", superset: "⭐⭐⭐⭐" },
    { feature: "适合团队", tableau: "中大型", powerbi: "所有规模", looker: "大型", qlik: "大型", metabase: "小型", superset: "中型" }
  ];

  // 学习路径
  const learningPath = [
    {
      stage: "BI基础",
      duration: "1-2周",
      color: "bg-blue-500",
      content: [
        "理解BI基本概念与价值",
        "学习数据仓库基础知识",
        "掌握常见图表类型与使用场景",
        "了解KPI指标体系设计",
        "熟悉维度与度量的概念"
      ]
    },
    {
      stage: "工具实操",
      duration: "1-2个月",
      color: "bg-green-500",
      content: [
        "选择并安装BI工具",
        "连接数据源与数据准备",
        "创建基础图表与仪表板",
        "学习筛选器与参数使用",
        "掌握常用计算字段"
      ]
    },
    {
      stage: "进阶技能",
      duration: "2-3个月",
      color: "bg-purple-500",
      content: [
        "数据建模与关系设计",
        "高级计算与表计算",
        "交互式仪表板设计",
        "性能优化最佳实践",
        "用户权限与数据安全"
      ]
    },
    {
      stage: "企业应用",
      duration: "持续实践",
      color: "bg-orange-500",
      content: [
        "业务需求分析与转化",
        "端到端BI项目实施",
        "团队协作与版本管理",
        "数据治理与质量保证",
        "用户培训与推广"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">商业智能 BI</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              企业级数据可视化与自助式分析平台
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-green-600 px-4 py-2 text-sm">
                📊 数据可视化
              </Badge>
              <Badge className="bg-white text-teal-600 px-4 py-2 text-sm">
                📈 交互式仪表板
              </Badge>
              <Badge className="bg-white text-cyan-600 px-4 py-2 text-sm">
                🎯 自助式分析
              </Badge>
              <Badge className="bg-white text-blue-600 px-4 py-2 text-sm">
                💼 业务洞察
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 什么是BI */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            什么是商业智能（BI）？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-green-600" />
                  核心定义
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="leading-relaxed">
                  商业智能（Business Intelligence）是将企业数据转化为<strong className="text-green-600">可操作洞察</strong>的技术和流程，通过数据可视化、报表和仪表板，帮助管理层做出<strong className="text-green-600">数据驱动的决策</strong>。
                </p>
                <div className="pl-4 border-l-4 border-green-500 py-2">
                  <p className="text-sm">
                    BI的核心价值在于<strong>让数据说话</strong>，让每个业务人员都能快速理解数据、发现问题、做出决策。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  BI的价值
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "⚡", title: "快速决策", desc: "实时数据让决策更快更准" },
                  { icon: "🎯", title: "问题发现", desc: "异常指标自动预警提醒" },
                  { icon: "👥", title: "团队协作", desc: "统一数据口径消除争议" },
                  { icon: "📈", title: "业绩提升", desc: "数据驱动业务持续增长" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
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

      {/* 核心工具详解 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            主流BI工具详解
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            选择最适合企业需求的BI平台
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
                      <CardDescription className="text-xs mt-1">
                        💰 {tool.price}
                      </CardDescription>
                    </div>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tool.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🛠️ 核心特性
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.features.map((feature, fidx) => (
                        <div 
                          key={fidx} 
                          className={`text-xs p-2 rounded ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                        >
                          {feature}
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
                      {tool.advantages.map((adv, aidx) => (
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
                      {tool.disadvantages.map((dis, didx) => (
                        <li key={didx} className={`text-xs flex items-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-red-500 mt-0.5">✗</span>
                          <span>{dis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      💡 最适合：{tool.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 工具对比表 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            BI工具全方位对比
          </h2>

          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                      <th className={`text-left p-3 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        对比维度
                      </th>
                      <th className={`text-center p-3 font-semibold text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        Tableau
                      </th>
                      <th className={`text-center p-3 font-semibold text-xs ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        Power BI
                      </th>
                      <th className={`text-center p-3 font-semibold text-xs ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                        Looker
                      </th>
                      <th className={`text-center p-3 font-semibold text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        Qlik
                      </th>
                      <th className={`text-center p-3 font-semibold text-xs ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>
                        Metabase
                      </th>
                      <th className={`text-center p-3 font-semibold text-xs ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                        Superset
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className={`${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700/50`}
                      >
                        <td className={`p-3 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.feature}
                        </td>
                        <td className={`p-3 text-center text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.tableau}
                        </td>
                        <td className={`p-3 text-center text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.powerbi}
                        </td>
                        <td className={`p-3 text-center text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.looker}
                        </td>
                        <td className={`p-3 text-center text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.qlik}
                        </td>
                        <td className={`p-3 text-center text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.metabase}
                        </td>
                        <td className={`p-3 text-center text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.superset}
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

      {/* 实际应用场景 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-green-50 to-teal-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实业务场景应用
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            BI工具如何驱动业务增长
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, idx) => (
              <Card 
                key={idx}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
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
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🛠️ 推荐工具
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {app.tools.map((tool, tidx) => (
                        <Badge key={tidx} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      📊 应用场景
                    </h4>
                    <div className="space-y-2">
                      {app.scenarios.map((scenario, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs flex items-center justify-center font-bold">
                            {sidx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {scenario}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      💡 业务价值
                    </h4>
                    <div className="space-y-1">
                      {app.benefits.map((benefit, bidx) => (
                        <p key={bidx} className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          • {benefit}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      📈 关键指标
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {app.kpi.map((kpi, kidx) => (
                        <Badge key={kidx} className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BI实施步骤 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            BI项目实施步骤
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从需求到上线的完整流程
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${step.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-2 mb-2">
                    <step.icon className={`h-6 w-6 ${step.color.replace('bg-', 'text-')}`} />
                    <CardTitle className="text-lg">{step.step}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.tasks.map((task, tidx) => (
                      <li 
                        key={tidx} 
                        className={`text-sm flex items-start gap-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        <span className={`${step.color.replace('bg-', 'text-')} mt-1`}>▸</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
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
            从零基础到BI专家的成长之路
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
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'} border-2`}>
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
                    <li>• 从业务需求出发学习BI</li>
                    <li>• 先掌握一个工具再拓展</li>
                    <li>• 多看优秀仪表板案例</li>
                    <li>• 注重数据可视化设计原则</li>
                    <li>• 培养数据敏感度和思维</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 追求炫酷特效忽视实用性</li>
                    <li>• 图表堆砌缺乏重点</li>
                    <li>• 忽略数据质量和准确性</li>
                    <li>• 不考虑用户使用习惯</li>
                    <li>• 只学工具不懂业务</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <FileText className="h-5 w-5" />
                    推荐资源
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Tableau Public优秀作品</li>
                    <li>• Power BI官方学习路径</li>
                    <li>• 《数据可视化之美》书籍</li>
                    <li>• DataCamp BI课程</li>
                    <li>• 各工具社区论坛</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 选择建议 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            如何选择BI工具？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2`}>
              <CardHeader>
                <CardTitle>💰 预算有限的中小企业</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-blue-600">推荐：Power BI 或 Metabase</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Power BI性价比极高（$10/月）</li>
                  <li>✓ Metabase开源免费快速部署</li>
                  <li>✓ 功能足够满足基本需求</li>
                  <li>✓ 学习成本相对较低</li>
                  <li>✓ 适合快速启动BI项目</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} border-2`}>
              <CardHeader>
                <CardTitle>🎨 追求可视化效果的团队</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-green-600">推荐：Tableau</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 业界最强的可视化能力</li>
                  <li>✓ 拖拽式操作直观便捷</li>
                  <li>✓ 丰富的图表类型和定制性</li>
                  <li>✓ 适合制作精美报告和演示</li>
                  <li>✓ 数据分析师的首选工具</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2`}>
              <CardHeader>
                <CardTitle>🏢 大型企业级应用</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-purple-600">推荐：Looker 或 Qlik</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 企业级稳定性和安全性</li>
                  <li>✓ 强大的数据建模能力</li>
                  <li>✓ 支持大规模用户并发</li>
                  <li>✓ 完善的权限和治理机制</li>
                  <li>✓ 专业的技术支持服务</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
              <CardHeader>
                <CardTitle>👨‍💻 技术团队自建BI</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-orange-600">推荐：Apache Superset</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 完全开源可自由定制</li>
                  <li>✓ 支持各类大数据源</li>
                  <li>✓ 适合技术驱动的团队</li>
                  <li>✓ 无授权费用限制</li>
                  <li>✓ 可集成到现有系统</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            开启数据可视化之旅
          </h2>
          <p className="text-xl text-white/90 mb-8">
            用BI工具让数据说话，驱动业务增长
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/visualization">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                学习数据可视化 →
              </Button>
            </Link>
            <Link href="/sql">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                掌握SQL查询 →
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                查看BI项目案例 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

