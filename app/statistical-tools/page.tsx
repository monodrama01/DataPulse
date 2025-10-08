"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, BarChart3, LineChart, PieChart, Activity, 
  Calculator, BookOpen, Microscope, Users, Heart,
  Building2, ShoppingBag, GraduationCap, Sparkles,
  CheckCircle2, XCircle, FileText
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function StatisticalToolsPage() {
  const { theme } = useTheme();

  // 核心工具介绍
  const tools = [
    {
      name: "R 语言",
      icon: LineChart,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "开源统计计算和图形化编程语言",
      features: ["强大的统计分析库", "丰富的可视化包", "活跃的开源社区", "支持机器学习"],
      advantages: ["免费开源", "灵活定制", "海量扩展包(18000+)", "学术界首选"],
      disadvantages: ["学习曲线陡峭", "内存占用较大", "速度相对较慢"],
      bestFor: "科研、学术研究、数据探索性分析",
      price: "免费"
    },
    {
      name: "SPSS Statistics",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "IBM推出的商业统计分析软件",
      features: ["图形化操作界面", "自动化报告生成", "内置经典统计方法", "易于上手"],
      advantages: ["界面友好", "无需编程", "结果解读清晰", "企业级支持"],
      disadvantages: ["价格昂贵", "灵活性有限", "依赖GUI操作"],
      bestFor: "社会科学、市场调研、医学统计",
      price: "商业授权（年费制）"
    },
    {
      name: "SAS Analytics",
      icon: Activity,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "企业级高级分析平台",
      features: ["全面的分析功能", "数据管理能力强", "企业级性能", "行业解决方案"],
      advantages: ["稳定可靠", "处理大数据集", "完善的技术支持", "合规性强"],
      disadvantages: ["成本极高", "学习难度大", "闭源生态"],
      bestFor: "金融、医药、政府等大型机构",
      price: "企业级授权（数万美元/年）"
    },
    {
      name: "Stata 计量经济学",
      icon: Calculator,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "专注于计量经济学的统计软件",
      features: ["面板数据分析", "时间序列建模", "因果推断方法", "简洁的命令语法"],
      advantages: ["经济学专业", "命令简洁", "结果可复现", "学习资源丰富"],
      disadvantages: ["功能相对专一", "价格较高", "图形化能力一般"],
      bestFor: "经济学研究、政策评估、面板数据分析",
      price: "商业授权（学生版/专业版）"
    }
  ];

  // 应用场景
  const applications = [
    {
      title: "医学临床试验",
      icon: Heart,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      description: "药物疗效评估与生存分析",
      tools: ["SPSS", "SAS", "R"],
      methods: [
        "描述性统计分析患者基线特征",
        "t检验/方差分析比较组间差异",
        "卡方检验分析分类变量关联",
        "生存分析（Kaplan-Meier曲线）",
        "多因素回归控制混杂因素"
      ],
      example: "评估新药治疗效果，对比试验组与对照组的治愈率、副作用发生率，绘制生存曲线"
    },
    {
      title: "市场调研分析",
      icon: ShoppingBag,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "消费者行为与满意度研究",
      tools: ["SPSS", "R", "Stata"],
      methods: [
        "问卷信度效度检验（Cronbach's α）",
        "因子分析提取潜在维度",
        "聚类分析划分消费者群体",
        "回归分析影响因素识别",
        "对应分析品牌定位研究"
      ],
      example: "分析客户满意度调查数据，识别关键影响因素，细分目标客户群体"
    },
    {
      title: "经济政策评估",
      icon: Building2,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      description: "政策效果因果推断",
      tools: ["Stata", "R", "SAS"],
      methods: [
        "双重差分法（DID）评估政策效果",
        "断点回归设计（RDD）",
        "工具变量法处理内生性",
        "面板数据固定效应模型",
        "合成控制法构建反事实"
      ],
      example: "评估最低工资政策对就业的影响，使用DID方法比较政策实施前后的变化"
    },
    {
      title: "教育测评研究",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-purple-500 to-indigo-500",
      description: "考试数据与学习效果分析",
      tools: ["SPSS", "R"],
      methods: [
        "项目反应理论(IRT)分析试题",
        "多层线性模型处理嵌套数据",
        "重复测量方差分析学习进步",
        "路径分析探索影响机制",
        "缺失数据处理与插补"
      ],
      example: "分析学生考试成绩，评估试题质量，研究教学方法对学习效果的影响"
    },
    {
      title: "社会学调查",
      icon: Users,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      description: "社会现象与人群特征研究",
      tools: ["SPSS", "Stata", "R"],
      methods: [
        "交叉表分析与卡方检验",
        "Logistic回归分析二分类结果",
        "有序回归处理等级变量",
        "中介效应与调节效应检验",
        "抽样权重调整"
      ],
      example: "研究社会经济地位对健康的影响，控制年龄、性别等混杂因素"
    },
    {
      title: "质量控制分析",
      icon: Microscope,
      color: "bg-gradient-to-br from-pink-500 to-rose-500",
      description: "工业生产过程监控",
      tools: ["SAS", "R"],
      methods: [
        "控制图监测过程稳定性",
        "过程能力分析(Cpk, Ppk)",
        "实验设计(DOE)优化参数",
        "方差分析比较工艺方案",
        "可靠性分析与寿命预测"
      ],
      example: "监控生产线产品质量，识别异常波动，通过DOE优化工艺参数"
    }
  ];

  // 统计方法分类
  const methods = [
    {
      category: "描述性统计",
      color: "bg-blue-500",
      techniques: [
        { name: "集中趋势", desc: "均值、中位数、众数" },
        { name: "离散程度", desc: "标准差、方差、四分位距" },
        { name: "分布形态", desc: "偏度、峰度、直方图" },
        { name: "相关分析", desc: "Pearson/Spearman相关" }
      ]
    },
    {
      category: "推断性统计",
      color: "bg-green-500",
      techniques: [
        { name: "假设检验", desc: "t检验、Z检验、F检验" },
        { name: "方差分析", desc: "单因素/多因素ANOVA" },
        { name: "非参数检验", desc: "Mann-Whitney U、Wilcoxon" },
        { name: "卡方检验", desc: "独立性检验、拟合优度" }
      ]
    },
    {
      category: "回归分析",
      color: "bg-purple-500",
      techniques: [
        { name: "线性回归", desc: "简单/多元线性回归" },
        { name: "逻辑回归", desc: "二分类/多分类Logistic" },
        { name: "Poisson回归", desc: "计数数据建模" },
        { name: "生存分析", desc: "Cox比例风险模型" }
      ]
    },
    {
      category: "多元统计",
      color: "bg-orange-500",
      techniques: [
        { name: "因子分析", desc: "降维与潜变量提取" },
        { name: "主成分分析", desc: "PCA降维" },
        { name: "聚类分析", desc: "K-means、层次聚类" },
        { name: "判别分析", desc: "分类与预测" }
      ]
    }
  ];

  // 工具对比表
  const comparison = [
    { feature: "价格", r: "免费开源", spss: "年费制", sas: "极昂贵", stata: "一次性购买" },
    { feature: "易用性", r: "需要编程", spss: "图形界面", sas: "较复杂", stata: "命令为主" },
    { feature: "统计功能", r: "⭐⭐⭐⭐⭐", spss: "⭐⭐⭐⭐", sas: "⭐⭐⭐⭐⭐", stata: "⭐⭐⭐⭐" },
    { feature: "可视化", r: "⭐⭐⭐⭐⭐", spss: "⭐⭐⭐", sas: "⭐⭐⭐", stata: "⭐⭐" },
    { feature: "数据处理", r: "⭐⭐⭐⭐", spss: "⭐⭐⭐", sas: "⭐⭐⭐⭐⭐", stata: "⭐⭐⭐⭐" },
    { feature: "扩展性", r: "⭐⭐⭐⭐⭐", spss: "⭐⭐", sas: "⭐⭐⭐", stata: "⭐⭐⭐" },
    { feature: "社区支持", r: "⭐⭐⭐⭐⭐", spss: "⭐⭐⭐", sas: "⭐⭐⭐⭐", stata: "⭐⭐⭐⭐" },
    { feature: "适合人群", r: "程序员/研究者", spss: "初学者/商业", sas: "企业/机构", stata: "经济学家" }
  ];

  // 学习路径
  const learningPath = [
    {
      stage: "统计基础",
      duration: "1-2个月",
      color: "bg-blue-500",
      content: [
        "概率论基础概念",
        "描述性统计与数据可视化",
        "概率分布（正态、t、F、卡方）",
        "抽样分布与中心极限定理",
        "假设检验基本原理"
      ]
    },
    {
      stage: "工具入门",
      duration: "1-2个月",
      color: "bg-green-500",
      content: [
        "选择合适的统计软件",
        "数据导入与清洗",
        "基础统计分析操作",
        "常用统计检验实践",
        "结果解读与报告撰写"
      ]
    },
    {
      stage: "高级方法",
      duration: "2-3个月",
      color: "bg-purple-500",
      content: [
        "多元回归分析与诊断",
        "广义线性模型(GLM)",
        "多层/混合效应模型",
        "时间序列与面板数据",
        "因果推断方法(DID、RDD)"
      ]
    },
    {
      stage: "专业应用",
      duration: "持续深化",
      color: "bg-orange-500",
      content: [
        "领域专业统计方法",
        "实验设计与样本量计算",
        "复杂数据结构处理",
        "学术论文统计分析",
        "可重复性研究实践"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">统计分析工具</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              专业统计建模与假设检验的强大工具体系
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-blue-600 px-4 py-2 text-sm">
                📊 统计建模
              </Badge>
              <Badge className="bg-white text-indigo-600 px-4 py-2 text-sm">
                🔬 假设检验
              </Badge>
              <Badge className="bg-white text-purple-600 px-4 py-2 text-sm">
                📈 数据可视化
              </Badge>
              <Badge className="bg-white text-pink-600 px-4 py-2 text-sm">
                🎓 科研分析
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 什么是统计分析工具 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            什么是统计分析工具？
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
                  统计分析工具是用于<strong className="text-blue-600">数据探索、统计建模、假设检验和结果可视化</strong>的专业软件，帮助研究者从数据中发现规律、验证假设、做出推断。
                </p>
                <div className="pl-4 border-l-4 border-blue-500 py-2">
                  <p className="text-sm">
                    与一般数据分析工具不同，统计软件强调<strong>统计学理论的严谨性</strong>，提供完整的统计检验、置信区间和p值计算。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 核心价值 */}
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  为什么需要统计工具？
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "🔬", title: "科学验证", desc: "基于统计推断做出可靠结论" },
                  { icon: "📊", title: "专业分析", desc: "内置经典统计方法和检验" },
                  { icon: "📝", title: "学术发表", desc: "输出符合期刊要求的结果" },
                  { icon: "🎯", title: "决策支持", desc: "量化不确定性提供依据" }
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
            主流统计工具详解
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            根据需求选择最适合的统计分析软件
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {/* 核心特性 */}
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

                  {/* 优势 */}
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

                  {/* 劣势 */}
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

                  {/* 最适合 */}
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
            工具全方位对比
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
                      <th className={`text-center p-3 font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        R 语言
                      </th>
                      <th className={`text-center p-3 font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        SPSS
                      </th>
                      <th className={`text-center p-3 font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                        SAS
                      </th>
                      <th className={`text-center p-3 font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                        Stata
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
                        <td className={`p-3 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.r}
                        </td>
                        <td className={`p-3 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.spss}
                        </td>
                        <td className={`p-3 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.sas}
                        </td>
                        <td className={`p-3 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {row.stata}
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

      {/* 统计方法分类 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            常用统计方法分类
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            系统掌握核心统计分析技术
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.map((method, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${method.color} rounded-full mb-3`}></div>
                  <CardTitle className="text-lg">{method.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {method.techniques.map((tech, tidx) => (
                      <div 
                        key={tidx}
                        className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                      >
                        <h4 className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          {tech.name}
                        </h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {tech.desc}
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

      {/* 实际应用场景 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实业务场景应用
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            统计工具如何解决实际研究问题
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
                  {/* 推荐工具 */}
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

                  {/* 分析方法 */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      📊 分析方法
                    </h4>
                    <div className="space-y-2">
                      {app.methods.map((method, midx) => (
                        <div key={midx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs flex items-center justify-center font-bold">
                            {midx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {method}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 应用示例 */}
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      💡 应用示例
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {app.example}
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
            从统计基础到专业应用的系统成长路径
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
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                学习建议与资源
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
                    <li>• 先学统计理论再学软件操作</li>
                    <li>• 使用真实数据集练习分析</li>
                    <li>• 关注结果解读而非按钮点击</li>
                    <li>• 学习可重复性研究方法</li>
                    <li>• 阅读优秀论文的统计部分</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 忽视前提假设盲目使用方法</li>
                    <li>• p值小于0.05就认为有意义</li>
                    <li>• 数据挖掘寻找显著性结果</li>
                    <li>• 只报告支持假设的结果</li>
                    <li>• 混淆相关与因果关系</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <BookOpen className="h-5 w-5" />
                    推荐资源
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 《R语言实战》（入门经典）</li>
                    <li>• Coursera统计推断课程</li>
                    <li>• Cross Validated问答社区</li>
                    <li>• 各软件官方文档和教程</li>
                    <li>• 《统计学习方法》（李航）</li>
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
            如何选择统计工具？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2`}>
              <CardHeader>
                <CardTitle>🎓 学生/研究者</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-blue-600">推荐：R 语言</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 完全免费，学习成本低</li>
                  <li>✓ 学术界广泛使用，论文复现</li>
                  <li>✓ 最新统计方法快速实现</li>
                  <li>✓ 强大的可视化能力</li>
                  <li>✓ 培养编程思维，求职加分</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} border-2`}>
              <CardHeader>
                <CardTitle>🏢 商业分析师</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-green-600">推荐：SPSS</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 图形界面操作简单</li>
                  <li>✓ 快速上手产出结果</li>
                  <li>✓ 自动生成专业报告</li>
                  <li>✓ 企业购买有技术支持</li>
                  <li>✓ 市场调研行业标准</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2`}>
              <CardHeader>
                <CardTitle>🏦 大型企业/机构</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-purple-600">推荐：SAS</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 企业级稳定性和安全性</li>
                  <li>✓ 处理超大规模数据集</li>
                  <li>✓ 全面的技术支持服务</li>
                  <li>✓ 满足合规性要求</li>
                  <li>✓ 金融/医药行业认可度高</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
              <CardHeader>
                <CardTitle>📊 经济学研究者</CardTitle>
              </CardHeader>
              <CardContent className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                <p className="mb-4">
                  <strong className="text-orange-600">推荐：Stata</strong>
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 计量经济学专业工具</li>
                  <li>✓ 面板数据分析强大</li>
                  <li>✓ 命令简洁易于复现</li>
                  <li>✓ 经济学期刊认可</li>
                  <li>✓ 因果推断方法丰富</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            掌握统计分析，让数据说话
          </h2>
          <p className="text-xl text-white/90 mb-8">
            从统计基础到专业应用，系统提升数据分析能力
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/statistics">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                学习统计基础 →
              </Button>
            </Link>
            <Link href="/python">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Python数据分析 →
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                查看实战项目 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

