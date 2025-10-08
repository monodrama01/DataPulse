"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, Layers, Zap, TrendingUp, BarChart3, Users,
  CheckCircle2, XCircle, Sparkles, AlertTriangle,
  FileText, Code, Network, ShoppingCart, Building2, Wallet
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

export default function RelationalDatabasesPage() {
  const { theme } = useTheme();

  // 主流关系型数据库
  const databases = [
    {
      name: "MySQL",
      icon: Database,
      color: "text-blue-600",
      bgColor: theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
      description: "全球最流行的开源数据库",
      features: ["InnoDB存储引擎", "ACID事务", "主从复制", "分区表", "全文索引", "JSON支持"],
      advantages: ["开源免费", "生态成熟", "易学易用", "社区活跃", "性能优秀"],
      disadvantages: ["企业功能弱", "复杂查询慢", "全文搜索弱"],
      bestFor: "Web应用、中小企业、互联网公司",
      marketShare: "开源数据库第一（60%+）",
      difficulty: "⭐⭐ 易学",
      license: "开源（GPL/商业双许可）"
    },
    {
      name: "PostgreSQL",
      icon: Database,
      color: "text-cyan-600",
      bgColor: theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-50',
      description: "最先进的开源关系型数据库",
      features: ["MVCC并发", "复杂查询优秀", "JSON/JSONB", "GIS扩展", "窗口函数", "递归查询"],
      advantages: ["功能强大", "SQL标准完善", "扩展性强", "数据完整性好"],
      disadvantages: ["学习曲线陡", "生态不如MySQL", "运维复杂"],
      bestFor: "复杂分析、地理数据、企业级应用",
      marketShare: "开源数据库第二，增长最快",
      difficulty: "⭐⭐⭐ 中等",
      license: "开源（PostgreSQL许可）"
    },
    {
      name: "SQL Server",
      icon: Database,
      color: "text-red-600",
      bgColor: theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
      description: "微软企业级数据库",
      features: ["T-SQL语言", "SSRS报表", "SSIS集成", "Always On高可用", "列存储索引", "内存优化表"],
      advantages: ["企业级功能全", "与微软生态集成", "管理工具强", "性能优秀"],
      disadvantages: ["商业授权贵", "仅限Windows（Linux有限）", "锁定微软生态"],
      bestFor: "Windows企业、.NET应用、BI分析",
      marketShare: "企业市场占有率高",
      difficulty: "⭐⭐⭐ 中等",
      license: "商业授权（有Express免费版）"
    },
    {
      name: "Oracle",
      icon: Database,
      color: "text-orange-600",
      bgColor: theme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
      description: "企业级数据库霸主",
      features: ["RAC集群", "分区表", "并行查询", "PL/SQL", "闪回技术", "数据仓库优化"],
      advantages: ["功能最强大", "性能最优秀", "企业级高可用", "大型应用首选"],
      disadvantages: ["价格昂贵", "学习成本高", "运维复杂", "锁定厂商"],
      bestFor: "大型企业、核心系统、金融电信",
      marketShare: "企业级市场霸主",
      difficulty: "⭐⭐⭐⭐ 较难",
      license: "商业授权（非常昂贵）"
    },
    {
      name: "SQLite",
      icon: Database,
      color: "text-green-600",
      bgColor: theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
      description: "嵌入式轻量级数据库",
      features: ["零配置", "单文件存储", "跨平台", "事务支持", "SQL标准", "小巧快速"],
      advantages: ["极其轻量", "无需服务器", "适合嵌入", "部署简单"],
      disadvantages: ["无并发写入", "功能有限", "不适合大数据"],
      bestFor: "移动应用、桌面软件、原型开发",
      marketShare: "嵌入式数据库第一",
      difficulty: "⭐ 非常易",
      license: "开源（公有领域）"
    },
    {
      name: "MariaDB",
      icon: Database,
      color: "text-purple-600",
      bgColor: theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
      description: "MySQL的增强分支",
      features: ["兼容MySQL", "更多存储引擎", "线程池", "并行复制", "虚拟列", "JSON支持"],
      advantages: ["完全开源", "性能优化", "新功能快", "兼容MySQL"],
      disadvantages: ["生态不如MySQL", "部分特性不兼容", "社区较小"],
      bestFor: "MySQL替代、需要新特性的应用",
      marketShare: "MySQL替代品首选",
      difficulty: "⭐⭐ 易学",
      license: "开源（GPL）"
    }
  ];

  // 进阶SQL技能
  const advancedSkills = [
    {
      category: "窗口函数",
      icon: TrendingUp,
      color: "bg-blue-500",
      description: "不分组的聚合计算",
      skills: [
        {
          name: "排名函数",
          syntax: "ROW_NUMBER(), RANK(), DENSE_RANK()",
          useCase: "计算排名、去重、分页",
          example: "销售排名、成绩排名、Top N查询"
        },
        {
          name: "聚合窗口",
          syntax: "SUM() OVER(), AVG() OVER()",
          useCase: "累计求和、移动平均",
          example: "累计销售额、7日移动平均"
        },
        {
          name: "偏移函数",
          syntax: "LAG(), LEAD(), FIRST_VALUE()",
          useCase: "环比、同比计算",
          example: "本月vs上月、年同比增长"
        }
      ]
    },
    {
      category: "公用表表达式 (CTE)",
      icon: Code,
      color: "bg-green-500",
      description: "WITH子句定义临时结果集",
      skills: [
        {
          name: "简单CTE",
          syntax: "WITH tmp AS (SELECT ...) SELECT * FROM tmp",
          useCase: "提高可读性、避免子查询嵌套",
          example: "复杂报表查询分步骤"
        },
        {
          name: "递归CTE",
          syntax: "WITH RECURSIVE ...",
          useCase: "层级数据查询",
          example: "组织架构、评论树、路径查找"
        },
        {
          name: "多CTE组合",
          syntax: "WITH cte1 AS (...), cte2 AS (...)",
          useCase: "复杂逻辑分解",
          example: "多步骤数据处理"
        }
      ]
    },
    {
      category: "存储过程与函数",
      icon: Zap,
      color: "bg-purple-500",
      description: "封装可重用的SQL逻辑",
      skills: [
        {
          name: "存储过程",
          syntax: "CREATE PROCEDURE proc_name()",
          useCase: "复杂业务逻辑封装",
          example: "订单处理、数据清洗、批量操作"
        },
        {
          name: "自定义函数",
          syntax: "CREATE FUNCTION func_name() RETURNS",
          useCase: "可复用的计算逻辑",
          example: "日期处理、字符串解析、业务规则"
        },
        {
          name: "触发器",
          syntax: "CREATE TRIGGER ON INSERT/UPDATE",
          useCase: "自动化操作",
          example: "审计日志、数据同步、约束检查"
        }
      ]
    },
    {
      category: "性能优化",
      icon: Sparkles,
      color: "bg-orange-500",
      description: "提升查询速度",
      skills: [
        {
          name: "索引优化",
          syntax: "CREATE INDEX, EXPLAIN",
          useCase: "加速查询",
          example: "复合索引、覆盖索引、索引失效分析"
        },
        {
          name: "查询优化",
          syntax: "避免SELECT *、子查询优化",
          useCase: "减少扫描、提高效率",
          example: "JOIN优化、UNION vs UNION ALL"
        },
        {
          name: "执行计划分析",
          syntax: "EXPLAIN / EXPLAIN ANALYZE",
          useCase: "诊断慢查询",
          example: "找出全表扫描、索引选择问题"
        }
      ]
    }
  ];

  // 数据库设计基础
  const designConcepts = [
    {
      title: "数据库范式",
      icon: Layers,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      concepts: [
        { name: "第一范式 (1NF)", desc: "字段不可再分，原子性", example: "地址拆分为省市区" },
        { name: "第二范式 (2NF)", desc: "消除部分依赖", example: "订单明细表分离产品信息" },
        { name: "第三范式 (3NF)", desc: "消除传递依赖", example: "员工表不存部门名称，只存部门ID" },
        { name: "反范式化", desc: "为性能牺牲范式", example: "冗余字段减少JOIN" }
      ],
      benefit: "减少数据冗余，保证数据一致性"
    },
    {
      title: "索引设计",
      icon: Zap,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      concepts: [
        { name: "B-Tree索引", desc: "默认索引类型", example: "主键、唯一键、常规索引" },
        { name: "哈希索引", desc: "等值查询快", example: "精确匹配查询" },
        { name: "全文索引", desc: "文本搜索", example: "文章搜索、关键词匹配" },
        { name: "组合索引", desc: "多列索引", example: "最左前缀原则" }
      ],
      benefit: "加速查询，但增加写入成本"
    },
    {
      title: "数据类型选择",
      icon: FileText,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      concepts: [
        { name: "数值类型", desc: "INT vs BIGINT", example: "根据范围选择合适类型" },
        { name: "字符类型", desc: "CHAR vs VARCHAR", example: "定长用CHAR，变长用VARCHAR" },
        { name: "日期类型", desc: "DATE, DATETIME, TIMESTAMP", example: "选择合适的时间精度" },
        { name: "JSON类型", desc: "灵活的半结构化数据", example: "配置信息、扩展属性" }
      ],
      benefit: "节省存储空间，提高性能"
    }
  ];

  // 真实应用场景
  const scenarios = [
    {
      title: "电商订单系统",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      challenge: "高并发下单、订单查询性能",
      solution: "读写分离 + 分库分表 + 索引优化",
      architecture: [
        "主库处理写入（下单、支付）",
        "从库处理查询（订单列表、详情）",
        "按用户ID分库（水平分片）",
        "按时间分表（历史订单归档）",
        "复合索引（用户ID + 订单时间）"
      ],
      benefits: ["支持高并发", "查询性能优秀", "数据量可控"],
      database: "MySQL（主） + PostgreSQL（分析）",
      keySkills: ["索引优化", "分库分表", "主从复制"]
    },
    {
      title: "企业BI报表系统",
      icon: BarChart3,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      challenge: "复杂SQL分析、大数据量聚合",
      solution: "数据仓库 + 窗口函数 + 物化视图",
      architecture: [
        "OLTP数据库 → ETL → 数据仓库",
        "维度建模（星型/雪花模型）",
        "窗口函数计算同比环比",
        "物化视图预聚合",
        "列存储索引加速"
      ],
      benefits: ["复杂分析快速", "历史数据完整", "不影响业务库"],
      database: "SQL Server / PostgreSQL",
      keySkills: ["窗口函数", "CTE", "物化视图"]
    },
    {
      title: "用户行为分析",
      icon: Users,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      challenge: "海量日志数据查询和分析",
      solution: "分区表 + 时序优化 + 索引策略",
      architecture: [
        "按日期分区存储日志",
        "自动归档老数据",
        "复合索引（用户ID + 时间）",
        "定期统计汇总到聚合表",
        "冷热数据分离"
      ],
      benefits: ["查询速度快", "存储成本低", "维护简单"],
      database: "PostgreSQL / MySQL",
      keySkills: ["分区表", "索引优化", "数据归档"]
    },
    {
      title: "金融交易系统",
      icon: Wallet,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      challenge: "ACID事务保证、高可用性",
      solution: "事务隔离 + 存储过程 + 主备切换",
      architecture: [
        "严格的ACID事务",
        "存储过程封装业务逻辑",
        "两阶段提交保证一致性",
        "Oracle RAC高可用集群",
        "实时备份和容灾"
      ],
      benefits: ["数据强一致性", "金融级可靠", "审计完整"],
      database: "Oracle / SQL Server",
      keySkills: ["事务管理", "存储过程", "高可用"]
    },
    {
      title: "SaaS多租户系统",
      icon: Building2,
      color: "bg-gradient-to-br from-indigo-500 to-blue-500",
      challenge: "租户数据隔离、性能均衡",
      solution: "Schema隔离 + 行级安全 + 连接池",
      architecture: [
        "方案1：每个租户独立数据库",
        "方案2：共享数据库，Schema隔离",
        "方案3：共享Schema，tenant_id字段",
        "行级安全策略（RLS）",
        "连接池复用"
      ],
      benefits: ["数据隔离安全", "资源高效利用", "扩展性好"],
      database: "PostgreSQL（RLS强）/ MySQL",
      keySkills: ["多租户设计", "安全策略", "性能优化"]
    },
    {
      title: "数据迁移与同步",
      icon: Network,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      challenge: "异构数据库之间迁移",
      solution: "ETL工具 + CDC + 双写策略",
      architecture: [
        "评估源和目标数据库差异",
        "数据类型映射和转换",
        "CDC实时捕获变更",
        "双写验证数据一致性",
        "逐步切换流量"
      ],
      benefits: ["平滑迁移", "业务不中断", "数据一致"],
      database: "跨数据库迁移",
      keySkills: ["数据迁移", "CDC", "数据校验"]
    }
  ];

  // 学习路径
  const learningPath = [
    {
      stage: "SQL 基础巩固",
      duration: "复习1周",
      color: "bg-blue-500",
      content: [
        "增删改查（CRUD）操作",
        "WHERE条件过滤",
        "JOIN多表关联",
        "GROUP BY聚合分组",
        "ORDER BY排序"
      ]
    },
    {
      stage: "进阶SQL技能",
      duration: "2-3周",
      color: "bg-green-500",
      content: [
        "窗口函数（ROW_NUMBER, RANK等）",
        "CTE公用表表达式",
        "子查询优化",
        "UNION、INTERSECT、EXCEPT",
        "CASE WHEN条件表达式"
      ]
    },
    {
      stage: "数据库设计",
      duration: "2-3周",
      color: "bg-purple-500",
      content: [
        "数据库范式理解",
        "ER图设计",
        "主键、外键、约束",
        "索引设计原则",
        "数据类型选择"
      ]
    },
    {
      stage: "性能优化与运维",
      duration: "持续深化",
      color: "bg-orange-500",
      content: [
        "EXPLAIN执行计划分析",
        "索引优化策略",
        "慢查询诊断和优化",
        "备份恢复策略",
        "主从复制、读写分离"
      ]
    }
  ];

  // 工具对比表
  const comparisonTable = [
    { db: "MySQL", 类型: "开源", 难度: "易", 性能: "高", 功能: "中", 成本: "免费", 适合: "Web应用" },
    { db: "PostgreSQL", 类型: "开源", 难度: "中", 性能: "高", 功能: "强", 成本: "免费", 适合: "复杂分析" },
    { db: "SQL Server", 类型: "商业", 难度: "中", 性能: "高", 功能: "强", 成本: "较高", 适合: "企业BI" },
    { db: "Oracle", 类型: "商业", 难度: "难", 性能: "极高", 功能: "最强", 成本: "昂贵", 适合: "大型企业" },
    { db: "SQLite", 类型: "开源", 难度: "易", 性能: "中", 功能: "弱", 成本: "免费", 适合: "嵌入式" },
    { db: "MariaDB", 类型: "开源", 难度: "易", 性能: "高", 功能: "中", 成本: "免费", 适合: "MySQL替代" }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Database className="h-12 w-12 text-white" />
              <h1 className="text-5xl font-bold text-white">关系型数据库进阶</h1>
            </div>
            <p className="text-xl text-white/90 mb-6">
              从SQL到数据库设计的全面进阶
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white text-pink-600 px-4 py-2 text-sm">
                📊 进阶SQL
              </Badge>
              <Badge className="bg-white text-rose-600 px-4 py-2 text-sm">
                🏗️ 数据库设计
              </Badge>
              <Badge className="bg-white text-red-600 px-4 py-2 text-sm">
                ⚡ 性能优化
              </Badge>
              <Badge className="bg-white text-orange-600 px-4 py-2 text-sm">
                🔧 实战应用
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* 为什么需要进阶学习 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            为什么要深入学习关系型数据库？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  提升查询效率
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-sm">
                  掌握<strong>窗口函数、CTE</strong>等进阶SQL，可以让复杂查询效率提升<strong>10倍+</strong>。
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                  <p className="text-xs">
                    💡 很多分析师只会基础SQL，进阶技能是差异化竞争力。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-6 w-6 text-green-600" />
                  理解数据架构
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-sm">
                  了解<strong>数据库设计、索引、范式</strong>，能更好地理解数据结构，提出优化建议。
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                  <p className="text-xs">
                    💡 与数据工程师/DBA沟通无障碍，职业发展更顺畅。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  解决实际问题
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="text-sm">
                  掌握<strong>性能优化、慢查询诊断</strong>，能独立解决数据库瓶颈问题。
                </p>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                  <p className="text-xs">
                    💡 不再等DBA帮忙，自己就能优化慢查询。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 主流关系型数据库 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            主流关系型数据库对比
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            选择适合的数据库平台
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databases.map((db, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${db.bgColor}`}>
                      <db.icon className={`h-6 w-6 ${db.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{db.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {db.license}
                      </CardDescription>
                    </div>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {db.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      ⚙️ 核心特性
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {db.features.slice(0, 4).map((feat, fidx) => (
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
                      {db.advantages.slice(0, 3).map((adv, aidx) => (
                        <li key={aidx}>• {adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                    <h4 className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      ⚠️ 劣势
                    </h4>
                    <ul className={`space-y-0.5 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {db.disadvantages.map((dis, didx) => (
                        <li key={didx}>• {dis}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      <strong>💡 最适合：</strong> {db.bestFor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={`font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                      {db.difficulty}
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {db.marketShare}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 对比表 */}
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle>数据库选型对比表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      {['数据库', '类型', '难度', '性能', '功能', '成本', '适合场景'].map((header, idx) => (
                        <th key={idx} className={`text-left py-3 px-4 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, idx) => (
                      <tr 
                        key={idx}
                        className={`border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
                      >
                        <td className={`py-3 px-4 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {row.db}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.类型}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.难度}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.性能}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.功能}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.成本}
                        </td>
                        <td className={`py-3 px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.适合}
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

      {/* 进阶SQL技能 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            进阶SQL技能
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            超越基础SQL的高级技巧
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedSkills.map((category, idx) => (
              <Card 
                key={idx}
                className={`hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <CardHeader>
                  <div className={`w-full h-2 ${category.color} rounded-full mb-3`}></div>
                  <div className="flex items-center gap-3">
                    <category.icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                    <div>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, sidx) => (
                    <div 
                      key={sidx}
                      className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                    >
                      <h4 className={`font-semibold text-sm mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        {skill.name}
                      </h4>
                      <div className={`p-2 mb-2 rounded font-mono text-xs ${theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'}`}>
                        {skill.syntax}
                      </div>
                      <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        💡 {skill.useCase}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        📦 {skill.example}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 数据库设计基础 */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gradient-to-br from-pink-50 to-rose-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            数据库设计基础
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            理解数据库架构和优化原理
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designConcepts.map((concept, idx) => (
              <Card 
                key={idx}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
                }`}
              >
                <div className={`${concept.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <concept.icon className="h-8 w-8" />
                    <h3 className="text-xl font-bold">{concept.title}</h3>
                  </div>
                </div>

                <CardContent className="pt-6 space-y-3">
                  {concept.concepts.map((item, iidx) => (
                    <div 
                      key={iidx}
                      className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                    >
                      <h4 className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        {item.name}
                      </h4>
                      <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.desc}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        💡 {item.example}
                      </p>
                    </div>
                  ))}

                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'} mt-4`}>
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      ✨ {concept.benefit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 真实应用场景 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            真实应用场景
          </h2>
          <p className={`text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            关系型数据库在实际业务中的应用
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
                      ⚠️ 挑战
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.challenge}
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
                      🏗️ 技术架构
                    </h4>
                    <div className="space-y-2">
                      {scenario.architecture.map((step, sidx) => (
                        <div key={sidx} className="flex items-start gap-2">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
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

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      💾 {scenario.database}
                    </span>
                    <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>
                      🔑 {scenario.keySkills}
                    </span>
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
            从基础SQL到数据库专家
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
          <Card className={`mt-12 ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-pink-700' : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200'} border-2`}>
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
                    <li>• 先掌握MySQL/PostgreSQL一种</li>
                    <li>• 在实际项目中练习进阶SQL</li>
                    <li>• 学会看EXPLAIN执行计划</li>
                    <li>• 理解索引原理和优化策略</li>
                    <li>• 动手设计完整数据库</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <XCircle className="h-5 w-5" />
                    常见误区
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 只学语法不做项目</li>
                    <li>• 贪多求全学所有数据库</li>
                    <li>• 不理解索引乱加索引</li>
                    <li>• 忽视数据库设计范式</li>
                    <li>• 不会用EXPLAIN分析性能</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                    <AlertTriangle className="h-5 w-5" />
                    学习重点
                  </h4>
                  <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 窗口函数（必须掌握）</li>
                    <li>• CTE和递归查询</li>
                    <li>• 索引设计和优化</li>
                    <li>• 数据库范式理解</li>
                    <li>• 慢查询诊断和优化</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            深入关系型数据库，成为SQL高手
          </h2>
          <p className="text-xl text-white/90 mb-8">
            从查询到设计，全面掌握数据库技能
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sql">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                SQL 基础回顾 →
              </Button>
            </Link>
            <Link href="/big-data">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                学习大数据技术 →
              </Button>
            </Link>
            <Link href="/nosql">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100">
                NoSQL 数据库 →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

