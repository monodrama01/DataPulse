"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, Database, FileSpreadsheet, Code, Filter,
  Trash2, AlertTriangle, CheckCircle2, XCircle, FileText,
  TrendingUp, Users, ShoppingCart, Activity, Zap
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function DataCleaningToolsPage() {
  const { theme } = useTheme();

  // 核心工具介绍
  const tools = [
    {
      name: "Pandas (Python)",
      icon: Code,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "Python数据处理的瑞士军刀",
      features: ["DataFrame操作", "缺失值处理", "数据转换", "强大的API"],
      advantages: ["功能最强大", "灵活度极高", "生态丰富", "可编程自动化"],
      disadvantages: ["学习曲线陡", "大数据性能限制", "需要编程基础"],
      bestFor: "复杂数据清洗、自动化处理、大规模批处理",
      price: "开源免费"
    },
    {
      name: "Excel Power Query",
      icon: FileSpreadsheet,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "Excel内置的数据转换工具",
      features: ["可视化操作", "步骤可重现", "多数据源连接", "自动刷新"],
      advantages: ["无需编程", "界面友好", "与Excel无缝集成", "易于上手"],
      disadvantages: ["功能相对有限", "处理大数据慢", "依赖Excel"],
      bestFor: "中小规模数据、业务人员自助清洗",
      price: "Excel自带，免费"
    },
    {
      name: "OpenRefine",
      icon: Filter,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "开源的交互式数据清洗工具",
      features: ["聚类去重", "批量编辑", "数据对账", "操作可回溯"],
      advantages: ["完全免费", "专为清洗设计", "可视化操作", "强大的去重"],
      disadvantages: ["界面较老", "学习资源少", "性能一般"],
      bestFor: "脏数据清洗、文本规范化、重复数据处理",
      price: "开源免费"
    },
    {
      name: "Trifacta Wrangler",
      icon: Sparkles,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "AI驱动的数据准备平台",
      features: ["智能建议", "可视化分析", "协作功能", "企业级性能"],
      advantages: ["AI辅助清洗", "用户体验好", "学习成本低", "效率高"],
      disadvantages: ["价格昂贵", "云端服务", "依赖网络"],
      bestFor: "企业级数据准备、团队协作清洗",
      price: "商业授权，有免费试用"
    },
    {
      name: "SQL",
      icon: Database,
      color: "text-yellow-600",
      bgColor: theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50',
      description: "数据库查询语言进行数据清洗",
      features: ["批量处理", "连接转换", "窗口函数", "存储过程"],
      advantages: ["处理大数据快", "直接在库中清洗", "标准化语言", "性能强"],
      disadvantages: ["语法复杂", "调试困难", "缺乏可视化"],
      bestFor: "数据库内清洗、大规模数据处理",
      price: "免费（需数据库）"
    },
    {
      name: "R (dplyr/tidyr)",
      icon: TrendingUp,
      color: "text-red-600",
      bgColor: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
      description: "R语言的数据清洗生态",
      features: ["管道操作", "整洁数据", "函数式编程", "统计集成"],
      advantages: ["语法简洁", "统计分析强", "可视化好", "学术界流行"],
      disadvantages: ["学习曲线", "内存占用大", "不如Pandas灵活"],
      bestFor: "统计分析前的数据准备、学术研究",
      price: "开源免费"
    }
  ];

  // 常见数据质量问题
  const dataQualityIssues = [
    {
      category: "缺失值",
      icon: AlertTriangle,
      color: "bg-red-500",
      problems: [
        "空值（NULL、NaN、None）",
        "隐藏缺失（空字符串、0、-999）",
        "部分缺失（incomplete records）"
      ],
      solutions: [
        "删除缺失行/列（dropna）",
        "填充固定值（fillna）",
        "前向/后向填充（ffill/bfill）",
        "插值法填充（interpolate）",
        "预测模型填充（KNN、回归）"
      ]
    },
    {
      category: "重复数据",
      icon: Trash2,
      color: "bg-orange-500",
      problems: [
        "完全重复记录",
        "部分字段重复",
        "逻辑重复（不同ID同实体）"
      ],
      solutions: [
        "drop_duplicates()去重",
        "按关键字段去重（subset参数）",
        "模糊匹配去重（FuzzyWuzzy）",
        "聚类去重（OpenRefine）",
        "保留首次/最后出现（keep参数）"
      ]
    },
    {
      category: "数据类型",
      icon: Code,
      color: "bg-blue-500",
      problems: [
        "数字存为文本",
        "日期格式不统一",
        "布尔值表示混乱（0/1, Y/N, True/False）"
      ],
      solutions: [
        "astype()强制转换",
        "pd.to_datetime()解析日期",
        "pd.to_numeric()转数字",
        "自定义转换函数（apply）",
        "正则表达式提取（str.extract）"
      ]
    },
    {
      category: "异常值",
      icon: Activity,
      color: "bg-purple-500",
      problems: [
        "超出合理范围（年龄200岁）",
        "统计离群点（3σ之外）",
        "业务逻辑异常（负收入）"
      ],
      solutions: [
        "IQR方法检测（四分位距）",
        "Z-score标准化检测",
        "业务规则过滤",
        "可视化检查（箱线图、散点图）",
        "分箱处理（winsorize）"
      ]
    },
    {
      category: "格式不一致",
      icon: FileText,
      color: "bg-green-500",
      problems: [
        "大小写不统一",
        "前后空格",
        "分隔符不一致",
        "单位不统一"
      ],
      solutions: [
        "str.strip()去空格",
        "str.lower()/upper()统一大小写",
        "str.replace()替换字符",
        "正则表达式规范化",
        "apply()自定义标准化函数"
      ]
    },
    {
      category: "数据不一致",
      icon: CheckCircle2,
      color: "bg-yellow-500",
      problems: [
        "同一实体多种表述（北京/BJ/Beijing）",
        "编码不一致",
        "逻辑矛盾（结束日期早于开始日期）"
      ],
      solutions: [
        "建立映射字典统一",
        "使用标准分类编码",
        "数据验证规则",
        "关联表对账",
        "业务逻辑校验"
      ]
    }
  ];

  // 数据清洗流程
  const cleaningWorkflow = [
    {
      step: "数据探索",
      icon: Database,
      color: "bg-blue-500",
      tasks: [
        "查看数据结构（shape、dtypes、info）",
        "统计描述（describe、value_counts）",
        "缺失值统计（isnull().sum()）",
        "重复值检查（duplicated()）",
        "可视化分布（直方图、箱线图）"
      ]
    },
    {
      step: "缺失值处理",
      icon: AlertTriangle,
      color: "bg-red-500",
      tasks: [
        "识别缺失值模式（MCAR/MAR/MNAR）",
        "决定删除或填充策略",
        "填充缺失值（均值/中位数/众数）",
        "标记缺失（创建缺失指示列）",
        "验证处理效果"
      ]
    },
    {
      step: "异常值处理",
      icon: Activity,
      color: "bg-purple-500",
      tasks: [
        "统计方法检测（IQR、Z-score）",
        "可视化识别异常点",
        "业务规则验证",
        "决定保留/删除/修正",
        "记录处理决策"
      ]
    },
    {
      step: "数据转换",
      icon: Sparkles,
      color: "bg-green-500",
      tasks: [
        "类型转换（数字、日期、分类）",
        "格式标准化（大小写、空格）",
        "数据归一化/标准化",
        "特征工程（衍生字段）",
        "编码转换（Label/One-Hot）"
      ]
    },
    {
      step: "去重与合并",
      icon: Trash2,
      color: "bg-orange-500",
      tasks: [
        "完全重复去重",
        "模糊匹配去重",
        "多表关联合并（join/merge）",
        "数据对账验证",
        "解决冲突数据"
      ]
    },
    {
      step: "验证与导出",
      icon: CheckCircle2,
      color: "bg-teal-500",
      tasks: [
        "数据质量检查（完整性、准确性）",
        "业务规则验证",
        "生成清洗报告",
        "导出清洗后数据",
        "文档记录清洗过程"
      ]
    }
  ];

  // 实际应用场景
  const applications = [
    {
      title: "客户数据整合",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      description: "多渠道客户数据的清洗与合并",
      challenge: "线上线下、多系统的客户信息存在重复、格式不一致、字段缺失",
      tools: ["Pandas", "OpenRefine"],
      steps: [
        "统一客户ID格式（手机号、邮箱标准化）",
        "模糊匹配识别同一客户（姓名+电话）",
        "缺失字段填充（从其他数据源补充）",
        "地址标准化（省市区统一格式）",
        "去除测试数据和无效客户",
        "生成唯一客户主数据"
      ],
      result: "客户去重率达85%，数据完整度从60%提升到95%"
    },
    {
      title: "销售数据清洗",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      description: "销售订单数据的质量提升",
      challenge: "订单金额异常、日期错误、产品名称不规范",
      tools: ["SQL", "Power Query"],
      steps: [
        "识别并修正负金额订单",
        "日期格式统一（YYYY-MM-DD）",
        "产品名称标准化（建立映射表）",
        "补充缺失的订单状态",
        "删除重复订单",
        "计算衍生字段（客单价、利润率）"
      ],
      result: "异常订单从8%降至0.5%，数据分析准确性大幅提升"
    },
    {
      title: "问卷调查数据清理",
      icon: FileText,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      description: "在线问卷数据的清洗与编码",
      challenge: "开放题回答混乱、选项不一致、无效问卷多",
      tools: ["Pandas", "Excel"],
      steps: [
        "剔除答题时间过短的无效问卷",
        "开放题文本清洗（去特殊字符）",
        "选项编码统一（是/否 → 1/0）",
        "逻辑一致性检查",
        "缺失值模式分析",
        "分类变量数值化编码"
      ],
      result: "有效问卷率从75%提升到92%，可分析性显著提高"
    },
    {
      title: "财务数据规范化",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      description: "财务报表数据的标准化处理",
      challenge: "多部门格式不统一、科目编码混乱、金额单位不一",
      tools: ["Excel Power Query", "SQL"],
      steps: [
        "会计科目编码标准化",
        "金额单位统一（万元/元）",
        "日期格式统一（会计期间）",
        "借贷平衡校验",
        "跨期数据对账",
        "汇率转换统一"
      ],
      result: "财务报表生成时间从3天缩短到4小时，准确率99.9%"
    },
    {
      title: "社交媒体文本清洗",
      icon: Sparkles,
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      description: "用户评论和反馈的文本规范化",
      challenge: "表情符号、特殊字符、网络用语、繁简体混杂",
      tools: ["Pandas", "正则表达式"],
      steps: [
        "去除表情符号和特殊字符",
        "繁简体转换统一",
        "网络用语规范化",
        "分词和停用词过滤",
        "去除重复评论",
        "情感标签标注"
      ],
      result: "文本清洗效率提升10倍，NLP分析准确率提高25%"
    },
    {
      title: "传感器数据清理",
      icon: Activity,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      description: "IoT设备时序数据的清洗",
      challenge: "数据丢失、传感器故障、时间戳不准、噪声干扰",
      tools: ["Pandas", "SQL"],
      steps: [
        "时间戳对齐和重采样",
        "异常值检测（3σ法则）",
        "缺失值插值（线性/样条）",
        "平滑滤波去噪声",
        "传感器漂移校准",
        "数据完整性验证"
      ],
      result: "数据可用率从78%提升到96%，分析结果更可靠"
    }
  ];

  // 学习路径
  const learningPath = [
    {
      stage: "基础知识",
      duration: "1-2周",
      color: "bg-blue-500",
      content: [
        "数据质量6大维度理解",
        "常见数据问题识别",
        "Excel基础数据处理",
        "SQL基础查询",
        "数据清洗思维建立"
      ]
    },
    {
      stage: "工具掌握",
      duration: "2-4周",
      color: "bg-green-500",
      content: [
        "Pandas核心操作",
        "Power Query使用",
        "正则表达式基础",
        "OpenRefine实践",
        "可视化探索数据"
      ]
    },
    {
      stage: "进阶技能",
      duration: "1-2个月",
      color: "bg-purple-500",
      content: [
        "缺失值高级处理",
        "异常值检测算法",
        "模糊匹配技术",
        "自动化清洗脚本",
        "数据质量监控"
      ]
    },
    {
      stage: "实战应用",
      duration: "持续实践",
      color: "bg-orange-500",
      content: [
        "真实项目数据清洗",
        "构建清洗Pipeline",
        "编写清洗文档",
        "质量报告生成",
        "最佳实践总结"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">数据清洗工具</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              让脏数据变干净，数据分析80%的时间都在做这件事
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-indigo-600 px-4 py-2 text-sm">
                🧹 数据清洗
              </Badge>
              <Badge className="bg-white text-purple-600 px-4 py-2 text-sm">
                ✨ 质量提升
              </Badge>
              <Badge className="bg-white text-pink-600 px-4 py-2 text-sm">
                🔧 格式规范
              </Badge>
              <Badge className="bg-white text-red-600 px-4 py-2 text-sm">
                📊 准备分析
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 什么是数据清洗 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            为什么数据清洗如此重要？
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  数据清洗的本质
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="leading-relaxed">
                  数据清洗（Data Cleaning）是指<strong className="text-purple-600">识别并纠正数据集中的错误、不一致和不准确</strong>的过程，确保数据的<strong className="text-purple-600">完整性、准确性和一致性</strong>。
                </p>
                <div className="pl-4 border-l-4 border-purple-500 py-2">
                  <p className="text-sm">
                    "Garbage In, Garbage Out" - 脏数据导致错误分析结论，数据清洗是数据分析的<strong>第一道关</strong>。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-pink-600" />
                  数据清洗的价值
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: "📊", title: "提高准确性", desc: "分析结果更可靠可信" },
                  { icon: "⚡", title: "提升效率", desc: "减少后续分析的返工" },
                  { icon: "💰", title: "节省成本", desc: "避免错误决策的损失" },
                  { icon: "🎯", title: "支持决策", desc: "高质量数据驱动决策" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>
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

          {/* 统计数据 */}
          <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'} border-2`}>
            <CardContent className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">80%</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    数据分析时间花在数据准备
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    企业数据存在质量问题
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-600 mb-2">$15M</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    脏数据年均损失（中型企业）
                  </p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-600 mb-2">3倍</div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    清洗后分析效率提升
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 核心工具详解 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            主流数据清洗工具
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            选择适合的工具，让清洗事半功倍
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

      {/* 常见数据质量问题 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            常见数据质量问题
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            识别问题是解决问题的第一步
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataQualityIssues.map((issue, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${issue.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-2 mb-2">
                    <issue.icon className={`h-6 w-6 ${issue.color.replace('bg-', 'text-')}`} />
                    <CardTitle className="text-lg">{issue.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      ⚠️ 常见问题
                    </h4>
                    <ul className="space-y-1">
                      {issue.problems.map((problem, pidx) => (
                        <li key={pidx} className={`text-xs flex items-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-red-500 mt-0.5">•</span>
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✅ 解决方案
                    </h4>
                    <ul className="space-y-1">
                      {issue.solutions.map((solution, sidx) => (
                        <li key={sidx} className={`text-xs flex items-start gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <span className="text-green-500 mt-0.5">▸</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 数据清洗流程 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            标准数据清洗流程
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            6步完成高质量数据清洗
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningWorkflow.map((step, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${step.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full ${step.color} text-white flex items-center justify-center font-bold`}>
                      {idx + 1}
                    </div>
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

      {/* 实际应用场景 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实应用场景
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            看看数据清洗如何解决实际问题
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
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      ⚠️ 面临挑战
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {app.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      🛠️ 使用工具
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
                      🔄 清洗步骤
                    </h4>
                    <div className="space-y-2">
                      {app.steps.map((step, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs flex items-center justify-center font-bold">
                            {sidx + 1}
                          </div>
                          <p className={`text-sm flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✨ 清洗效果
                    </h4>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {app.result}
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
            从零开始成为数据清洗专家
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
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'} border-2`}>
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
                    <li>• 从真实数据集练习清洗</li>
                    <li>• 先探索后清洗，了解数据</li>
                    <li>• 记录清洗步骤便于复现</li>
                    <li>• 清洗前备份原始数据</li>
                    <li>• 验证清洗结果的准确性</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 直接删除所有缺失值</li>
                    <li>• 不了解业务盲目清洗</li>
                    <li>• 过度清洗丢失信息</li>
                    <li>• 不记录清洗逻辑</li>
                    <li>• 清洗后不验证质量</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <FileText className="h-5 w-5" />
                    推荐资源
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• Pandas官方文档</li>
                    <li>• Kaggle数据清洗教程</li>
                    <li>• OpenRefine官方指南</li>
                    <li>• 《Python数据清洗实战》</li>
                    <li>• DataCamp清洗课程</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            掌握数据清洗，让分析事半功倍
          </h2>
          <p className="text-xl text-white/90 mb-8">
            高质量数据是优质分析的基础
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/python">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                学习Python清洗 →
              </Button>
            </Link>
            <Link href="/sql">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                SQL数据处理 →
              </Button>
            </Link>
            <Link href="/excel">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Excel数据清洗 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

