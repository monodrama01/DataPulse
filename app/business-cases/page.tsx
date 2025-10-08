"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, ShoppingCart, TrendingUp, Smartphone, 
  Building2, Heart, Gamepad2, Search, Star, ChevronRight,
  GitBranch, Target, Users, BarChart3, Lightbulb, CheckCircle2,
  AlertCircle, TrendingDown, Filter, Layers
} from "lucide-react"

// 行业分类
const industries = [
  { id: "all", name: "全部", icon: Briefcase, color: "bg-gray-500" },
  { id: "ecommerce", name: "电商零售", icon: ShoppingCart, color: "bg-blue-500" },
  { id: "finance", name: "金融支付", icon: TrendingUp, color: "bg-green-500" },
  { id: "internet", name: "互联网", icon: Smartphone, color: "bg-purple-500" },
  { id: "enterprise", name: "企业服务", icon: Building2, color: "bg-orange-500" },
  { id: "healthcare", name: "医疗健康", icon: Heart, color: "bg-red-500" },
  { id: "gaming", name: "游戏娱乐", icon: Gamepad2, color: "bg-pink-500" },
]

// 业务题目数据
const businessCases = [
  {
    id: 1,
    industry: "ecommerce",
    title: "淘宝用户复购率分析",
    description: "分析用户的购买行为，计算不同时间窗口的复购率，识别高价值用户",
    difficulty: "中等",
    tags: ["用户行为", "RFM模型", "留存分析"],
    scenario: `某电商平台想要提升用户复购率。现有用户订单数据，包含：用户ID、订单时间、订单金额、商品类别等。

问题：
1. 计算30天、60天、90天的用户复购率
2. 找出复购率最高的商品类别
3. 分析首购到复购的时间间隔分布
4. 识别有流失风险的用户（长时间未复购）`,
    keyPoints: ["时间窗口计算", "用户分层", "留存曲线", "预警机制"],
    solution: `分析思路：
1. 数据准备：按用户分组，统计每个用户的订单历史
2. 复购率计算：
   - 30天复购率 = 在首次购买后30天内再次购买的用户数 / 首购用户数
   - 按不同时间窗口重复计算
3. 商品类别分析：按类别统计复购用户占比
4. 时间间隔分析：计算订单之间的时间差，绘制分布图
5. 流失预警：超过平均复购间隔2倍未购买的用户标记为高风险`,
    mindmap: {
      title: "复购率分析思维导图",
      framework: "用户生命周期分析框架",
      nodes: [
        {
          level: 1,
          title: "📊 业务目标",
          icon: Target,
          content: "提升用户复购率，增加用户LTV",
          children: [
            { text: "降低获客成本", color: "text-green-600" },
            { text: "提高用户粘性", color: "text-blue-600" },
            { text: "增加GMV贡献", color: "text-purple-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 数据探索（先看后想）",
          icon: Search,
          content: "明确数据范围和质量",
          children: [
            { text: "数据量：多少用户？多少订单？", color: "text-gray-700" },
            { text: "时间跨度：覆盖多长时间？", color: "text-gray-700" },
            { text: "数据完整性：是否有缺失值？", color: "text-red-600" },
            { text: "异常值：是否有测试订单、退款订单？", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📐 指标定义（对齐口径）",
          icon: BarChart3,
          content: "明确关键指标计算方法",
          children: [
            { text: "复购定义：首次购买后再次购买", color: "text-blue-600" },
            { text: "时间窗口：30/60/90天", color: "text-green-600" },
            { text: "排除条件：退款、取消订单", color: "text-red-600" },
            { text: "去重规则：按用户维度统计", color: "text-purple-600" }
          ]
        },
        {
          level: 1,
          title: "🎯 分析维度（多维拆解）",
          icon: Layers,
          content: "从不同角度切分数据",
          children: [
            { text: "时间维度：不同时间窗口对比", color: "text-blue-600" },
            { text: "类目维度：不同商品类别", color: "text-green-600" },
            { text: "用户维度：新老客、高低价值", color: "text-purple-600" },
            { text: "渠道维度：不同获客渠道", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📈 分析方法（技术手段）",
          icon: GitBranch,
          content: "应用数据分析技巧",
          children: [
            { text: "Cohort分析：按首购月份分组", color: "text-blue-600" },
            { text: "RFM模型：最近、频率、金额", color: "text-green-600" },
            { text: "漏斗分析：首购→复购转化率", color: "text-purple-600" },
            { text: "生存分析：复购时间分布", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "⚠️ 异常识别（发现问题）",
          icon: AlertCircle,
          content: "找出数据中的异常模式",
          children: [
            { text: "流失预警：长时间未复购用户", color: "text-red-600" },
            { text: "复购率突降：某月数据异常", color: "text-orange-600" },
            { text: "类目差异大：部分类目极低", color: "text-yellow-600" }
          ]
        },
        {
          level: 1,
          title: "💡 洞察总结（得出结论）",
          icon: Lightbulb,
          content: "提炼关键发现",
          children: [
            { text: "整体复购率水平及趋势", color: "text-blue-600" },
            { text: "高/低复购类目特征", color: "text-green-600" },
            { text: "复购时间窗口规律", color: "text-purple-600" },
            { text: "流失风险用户画像", color: "text-red-600" }
          ]
        },
        {
          level: 1,
          title: "🎬 行动建议（落地方案）",
          icon: CheckCircle2,
          content: "可执行的优化策略",
          children: [
            { text: "针对流失用户：优惠券召回", color: "text-green-600" },
            { text: "优化复购周期：首购后7天推送", color: "text-blue-600" },
            { text: "提升高复购类目占比", color: "text-purple-600" },
            { text: "建立自动化预警系统", color: "text-orange-600" }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    industry: "finance",
    title: "信用卡欺诈检测",
    description: "通过交易数据识别异常交易模式，建立欺诈检测模型",
    difficulty: "困难",
    tags: ["异常检测", "风控", "机器学习"],
    scenario: `银行需要识别信用卡欺诈交易。交易数据包含：交易金额、交易时间、商户类型、地理位置、用户历史行为等。

问题：
1. 识别异常交易特征（如大额、异地、频繁小额等）
2. 计算每笔交易的风险评分
3. 设定合理的阈值，平衡误报率和漏报率
4. 分析被标记为欺诈的交易的共同特征`,
    keyPoints: ["特征工程", "异常检测算法", "评分模型", "阈值优化"],
    solution: `分析思路：
1. 特征提取：
   - 金额特征：与用户历史平均金额对比
   - 时间特征：交易时段、与上次交易间隔
   - 地理特征：是否异地、距离上次交易地点的距离
   - 行为特征：交易频率、商户类型偏好
2. 异常评分：使用孤立森林或Z-score计算异常程度
3. 规则引擎：结合业务规则（如单日累计金额限制）
4. 模型优化：使用ROC曲线找最佳阈值`,
    mindmap: {
      title: "欺诈检测分析思维导图",
      framework: "风险控制分析框架（3W+2H）",
      nodes: [
        {
          level: 1,
          title: "🎯 Why - 为什么做",
          icon: Target,
          content: "明确业务价值和风险场景",
          children: [
            { text: "保护用户资金安全", color: "text-green-600" },
            { text: "降低银行损失（每年数亿）", color: "text-red-600" },
            { text: "提升用户信任度", color: "text-blue-600" },
            { text: "合规要求（监管政策）", color: "text-purple-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 What - 检测什么",
          icon: AlertCircle,
          content: "定义欺诈行为模式",
          children: [
            { text: "盗刷：卡片丢失或信息泄露", color: "text-red-600" },
            { text: "套现：虚假交易获取现金", color: "text-orange-600" },
            { text: "洗钱：大额可疑资金流动", color: "text-yellow-600" },
            { text: "薅羊毛：批量账号刷优惠", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "👥 Who - 谁的行为",
          icon: Users,
          content: "用户画像和行为基线",
          children: [
            { text: "建立正常用户画像", color: "text-green-600" },
            { text: "历史交易行为特征", color: "text-blue-600" },
            { text: "消费偏好和习惯", color: "text-purple-600" },
            { text: "设备和地理位置特征", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📊 How Much - 特征工程",
          icon: BarChart3,
          content: "多维度特征提取",
          children: [
            { text: "金额维度：金额、环比、同比", color: "text-green-600" },
            { text: "时间维度：时段、频率、间隔", color: "text-blue-600" },
            { text: "空间维度：地理位置、IP地址", color: "text-purple-600" },
            { text: "行为维度：商户类型、设备指纹", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "⚙️ How - 检测方法",
          icon: GitBranch,
          content: "规则引擎 + 机器学习",
          children: [
            { text: "规则引擎：专家规则（快速）", color: "text-blue-600" },
            { text: "无监督学习：孤立森林（异常检测）", color: "text-green-600" },
            { text: "监督学习：XGBoost（有标注样本）", color: "text-purple-600" },
            { text: "深度学习：LSTM（序列模式）", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "⚖️ 平衡准召率",
          icon: Layers,
          content: "阈值优化和效果评估",
          children: [
            { text: "精确率：预测欺诈中真实欺诈占比", color: "text-blue-600" },
            { text: "召回率：真实欺诈被检出的占比", color: "text-green-600" },
            { text: "误报成本：正常交易被拦截", color: "text-red-600" },
            { text: "漏报成本：欺诈交易未拦截", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📈 模型优化",
          icon: TrendingUp,
          content: "持续迭代提升效果",
          children: [
            { text: "AB测试：对比新旧模型效果", color: "text-blue-600" },
            { text: "样本平衡：SMOTE过采样", color: "text-green-600" },
            { text: "特征重要性分析", color: "text-purple-600" },
            { text: "在线学习：实时更新模型", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🎬 落地方案",
          icon: CheckCircle2,
          content: "分级处理策略",
          children: [
            { text: "高风险：直接拦截+人工审核", color: "text-red-600" },
            { text: "中风险：二次验证（短信/人脸）", color: "text-orange-600" },
            { text: "低风险：放行+监控", color: "text-green-600" },
            { text: "建立反馈闭环优化模型", color: "text-blue-600" }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    industry: "internet",
    title: "抖音视频推荐算法优化",
    description: "分析用户观看行为，优化视频推荐效果，提升用户停留时长",
    difficulty: "困难",
    tags: ["推荐系统", "A/B测试", "用户画像"],
    scenario: `抖音需要优化视频推荐算法，提升用户观看时长。数据包括：用户观看历史、点赞收藏、视频标签、观看完成率等。

问题：
1. 分析用户观看偏好，构建用户画像
2. 计算视频的质量分（播放量、完成率、互动率）
3. 设计A/B测试方案，对比新旧推荐算法效果
4. 分析推荐算法对不同用户群体的效果差异`,
    keyPoints: ["协同过滤", "内容画像", "实验设计", "效果评估"],
    solution: `分析思路：
1. 用户画像：
   - 兴趣标签：基于观看历史提取偏好标签
   - 活跃度：日均使用时长、打开频率
   - 互动倾向：点赞率、评论率、分享率
2. 视频质量分 = 0.3*播放量 + 0.4*完成率 + 0.3*互动率
3. A/B测试：
   - 实验组使用新算法，对照组使用旧算法
   - 关键指标：人均观看时长、视频播放量、留存率
   - 统计显著性检验（T检验）
4. 分层分析：按用户活跃度、年龄段、兴趣类别分别评估效果`
  },
  {
    id: 4,
    industry: "ecommerce",
    title: "京东商品动销率分析",
    description: "分析商品库存周转情况，识别滞销商品，优化库存管理",
    difficulty: "简单",
    tags: ["库存管理", "商品运营", "供应链"],
    scenario: `京东需要优化库存管理，减少滞销库存。数据包含：商品ID、入库时间、销售记录、库存数量、商品类目等。

问题：
1. 计算各商品的动销率（有销售的商品 / 总商品数）
2. 找出滞销商品（如30天内无销售）
3. 分析不同类目的库存周转天数
4. 提出滞销商品的处理建议（降价、促销、下架）`,
    keyPoints: ["动销率", "库存周转", "ABC分类", "库存优化"],
    solution: `分析思路：
1. 动销率 = 有销售的SKU数量 / 总SKU数量
2. 滞销商品筛选：
   - 标准：30/60/90天内无销售记录
   - 同时考虑库存量：滞销且库存高的商品优先处理
3. 库存周转天数 = 平均库存 / 日均销量
4. ABC分类：
   - A类（高价值）：重点监控，保证不断货
   - B类（中等）：定期检查，适度备货
   - C类（低价值）：滞销快速清理`
  },
  {
    id: 5,
    industry: "finance",
    title: "微信支付交易峰值预测",
    description: "基于历史数据预测交易峰值时间，提前做好系统扩容准备",
    difficulty: "中等",
    tags: ["时间序列", "流量预测", "容量规划"],
    scenario: `微信支付需要预测交易峰值，避免系统崩溃。历史数据包含：每小时交易量、特殊节日标记、营销活动等。

问题：
1. 识别交易量的周期性规律（日周期、周周期）
2. 分析节假日对交易量的影响倍数
3. 预测未来7天的每小时交易量
4. 给出需要扩容的时间点和建议容量`,
    keyPoints: ["周期性分析", "节假日因子", "时间序列预测", "容量规划"],
    solution: `分析思路：
1. 周期性分析：
   - 日周期：早8点、午12点、晚8点是高峰
   - 周周期：周末交易量通常高于工作日
   - 月周期：月初（发工资）、节假日前
2. 节假日因子：
   - 对比节假日与普通日的交易量倍数
   - 不同节日影响不同（春节>国庆>其他）
3. 预测模型：ARIMA或Prophet时间序列模型
4. 容量建议：预测峰值 * 1.5倍作为系统容量配置`
  },
  {
    id: 6,
    industry: "internet",
    title: "美团外卖骑手调度优化",
    description: "分析订单分布和骑手位置，优化派单算法，缩短配送时间",
    difficulty: "困难",
    tags: ["运筹优化", "实时调度", "地理分析"],
    scenario: `美团需要优化骑手调度，提升配送效率。数据包含：订单位置、骑手实时位置、配送时长、路况信息等。

问题：
1. 分析订单的时空分布特征（热点区域、高峰时段）
2. 计算骑手的平均配送时长和配送半径
3. 设计派单策略：距离优先 vs 等待时间优先 vs 综合评分
4. 分析不同策略对配送时长和骑手利用率的影响`,
    keyPoints: ["聚类分析", "距离计算", "多目标优化", "调度算法"],
    solution: `分析思路：
1. 订单聚类：使用K-means找出热点配送区域
2. 骑手画像：
   - 配送能力：单位时间配送订单数
   - 服务范围：常活动区域、最大配送半径
3. 派单评分 = 0.4*距离分数 + 0.3*等待时间分数 + 0.3*骑手负载分数
   - 距离分数：距离越近分数越高
   - 等待时间分数：订单等待越久分数越高
   - 负载分数：骑手当前订单越少分数越高
4. 效果对比：通过A/B测试对比平均配送时长和超时率`
  },
  {
    id: 7,
    industry: "enterprise",
    title: "SaaS产品用户流失预警",
    description: "分析用户行为数据，预测哪些用户有流失风险，提前采取挽留措施",
    difficulty: "中等",
    tags: ["用户流失", "预测模型", "精准营销"],
    scenario: `某SaaS公司需要降低用户流失率。数据包含：登录频率、功能使用情况、支付历史、客服咨询记录等。

问题：
1. 定义流失用户（如30天未登录）
2. 分析流失用户与活跃用户的行为差异
3. 构建流失预测模型，找出高风险用户
4. 针对不同流失原因设计挽留策略`,
    keyPoints: ["流失定义", "特征工程", "分类模型", "运营策略"],
    solution: `分析思路：
1. 流失定义：连续30天未登录 或 到期未续费
2. 特征对比：
   - 登录频率：流失用户登录频率持续下降
   - 功能使用：核心功能使用次数减少
   - 客服咨询：频繁咨询问题可能表示不满
3. 预测模型：使用逻辑回归或随机森林
   - 特征：最近7/14/30天登录次数、功能使用次数、距离续费时间
   - 标签：是否流失（1/0）
4. 挽留策略：
   - 高风险用户：客服主动联系，提供优惠
   - 功能不熟悉：推送使用教程、产品培训
   - 价格敏感：优惠券、升级套餐折扣`
  },
  {
    id: 8,
    industry: "healthcare",
    title: "医院床位周转率分析",
    description: "分析床位使用情况，优化床位分配，提高床位周转率和使用效率",
    difficulty: "简单",
    tags: ["资源优化", "运营效率", "医疗数据"],
    scenario: `某医院需要提升床位使用效率。数据包含：科室、床位号、入院时间、出院时间、病人信息等。

问题：
1. 计算各科室的床位周转率和平均住院天数
2. 分析床位空置时间和空置率
3. 找出周转率低的科室，分析原因
4. 提出优化床位分配的建议`,
    keyPoints: ["周转率", "使用率", "科室对比", "资源调配"],
    solution: `分析思路：
1. 床位周转率 = 出院人数 / 平均开放床位数
2. 平均住院天数 = 总住院天数 / 出院人数
3. 床位使用率 = 实际占用床日数 / (开放床位数 * 统计天数) * 100%
4. 科室对比：
   - 外科：周转快，平均住院天数短
   - 内科：周转慢，住院天数长
   - ICU：占用率高，周转慢
5. 优化建议：
   - 低周转科室：加快出院流程、优化治疗方案
   - 高需求科室：增加床位或动态调配其他科室床位`
  },
  {
    id: 9,
    industry: "gaming",
    title: "手游玩家付费转化分析",
    description: "分析玩家游戏行为与付费的关系，提升付费转化率和ARPU值",
    difficulty: "中等",
    tags: ["付费转化", "游戏运营", "用户分层"],
    scenario: `某手游需要提升付费率。数据包含：玩家等级、游戏时长、活动参与情况、付费历史、社交互动等。

问题：
1. 分析付费玩家与非付费玩家的行为差异
2. 找出最容易转化为付费的玩家特征（如等级、时长）
3. 计算首次付费的平均发生时间和触发条件
4. 设计针对性的付费引导策略`,
    keyPoints: ["漏斗分析", "用户分层", "转化路径", "付费设计"],
    solution: `分析思路：
1. 用户分层：
   - 大R（高额付费）：月付费>1000元
   - 小R（中额付费）：月付费100-1000元
   - 微R（小额付费）：月付费<100元
   - 白嫖党（零付费）
2. 行为对比：
   - 付费玩家游戏时长更长（日均>2小时）
   - 更多参与限时活动和社交互动
   - 更关注角色养成和竞技排名
3. 转化时机：
   - 平均在注册后第3-7天首次付费
   - 触发点：遇到难关、限时优惠、装备/角色诱惑
4. 引导策略：
   - 新手期：首充双倍、限时礼包
   - 成长期：月卡推荐、性价比套餐
   - 成熟期：专属特权、VIP福利`
  },
  {
    id: 10,
    industry: "ecommerce",
    title: "拼多多拼团转化率优化",
    description: "分析拼团数据，找出影响成团率的关键因素，优化拼团机制",
    difficulty: "中等",
    tags: ["社交电商", "转化优化", "A/B测试"],
    scenario: `拼多多需要提升拼团成功率。数据包含：拼团ID、发起人、参团人数、成团时间、商品信息、分享渠道等。

问题：
1. 计算不同商品类别的成团率
2. 分析拼团人数要求对成团率的影响（2人团 vs 5人团）
3. 分析分享渠道对拼团成功的影响（微信好友 vs 朋友圈）
4. 提出提升成团率的优化方案`,
    keyPoints: ["成团率", "社交传播", "价格策略", "用户激励"],
    solution: `分析思路：
1. 成团率 = 成功拼团数 / 发起拼团数 * 100%
2. 人数影响：
   - 2人团成团率最高（约70%）
   - 5人团成团率较低（约40%）
   - 人数越多，组团难度越大
3. 渠道效果：
   - 微信好友分享成团率高（信任度高）
   - 朋友圈传播范围广但成团率低
   - 拼团群效果最好（专属场景）
4. 优化方案：
   - 价格策略：人数多的团给更大优惠
   - 机器人助力：接近超时时机器人补位
   - 激励机制：成团奖励、分享红包
   - 降低门槛：减少拼团人数要求`
  },
  {
    id: 11,
    industry: "finance",
    title: "银行客户流失预警模型",
    description: "构建客户流失预测模型，识别高风险客户并提前干预",
    difficulty: "困难",
    tags: ["客户流失", "预测建模", "特征工程", "SQL分析"],
    scenario: `某银行客户流失率逐年上升，需要通过数据分析预测流失客户。数据包含：
- customers表：客户ID、年龄、性别、收入、开户时间、信用评分
- transactions表：交易ID、客户ID、交易时间、交易金额、交易类型
- products表：产品ID、客户ID、产品类型、开通时间、关闭时间
- service_records表：服务ID、客户ID、咨询时间、问题类型、满意度

问题：
1. 定义流失客户（如6个月无交易且关闭所有产品）
2. 分析流失客户与活跃客户的特征差异（交易频率、产品数量、服务满意度）
3. 计算流失风险评分（基于多维度特征）
4. 输出Top 100高风险客户名单及建议挽留措施`,
    keyPoints: ["流失定义", "特征提取", "多维度评分", "窗口函数", "CASE WHEN"],
    solution: `-- SQL解题思路：
-- Step 1: 定义流失客户
WITH customer_status AS (
  SELECT 
    c.customer_id,
    c.age,
    c.income,
    DATEDIFF(CURRENT_DATE, MAX(t.transaction_date)) AS days_since_last_trans,
    COUNT(DISTINCT p.product_id) AS active_products,
    AVG(s.satisfaction_score) AS avg_satisfaction
  FROM customers c
  LEFT JOIN transactions t ON c.customer_id = t.customer_id
  LEFT JOIN products p ON c.customer_id = p.customer_id AND p.close_date IS NULL
  LEFT JOIN service_records s ON c.customer_id = s.customer_id
  GROUP BY c.customer_id, c.age, c.income
),

-- Step 2: 计算流失风险评分
risk_score AS (
  SELECT 
    customer_id,
    CASE 
      WHEN days_since_last_trans > 180 THEN 40
      WHEN days_since_last_trans > 90 THEN 20
      ELSE 0 
    END AS inactivity_score,
    CASE 
      WHEN active_products = 0 THEN 30
      WHEN active_products = 1 THEN 15
      ELSE 0 
    END AS product_score,
    CASE 
      WHEN avg_satisfaction < 3 THEN 30
      WHEN avg_satisfaction < 4 THEN 10
      ELSE 0 
    END AS satisfaction_score
  FROM customer_status
)

-- Step 3: 输出高风险客户
SELECT 
  cs.customer_id,
  cs.age,
  cs.income,
  cs.days_since_last_trans,
  cs.active_products,
  cs.avg_satisfaction,
  (rs.inactivity_score + rs.product_score + rs.satisfaction_score) AS total_risk_score,
  CASE 
    WHEN rs.inactivity_score >= 20 THEN '增加互动营销'
    WHEN rs.product_score >= 15 THEN '推荐新产品'
    WHEN rs.satisfaction_score >= 10 THEN '客服主动联系'
    ELSE '持续观察'
  END AS retention_strategy
FROM customer_status cs
JOIN risk_score rs ON cs.customer_id = rs.customer_id
WHERE (rs.inactivity_score + rs.product_score + rs.satisfaction_score) >= 40
ORDER BY total_risk_score DESC
LIMIT 100;

-- 关键知识点：
-- 1. CTE分步骤构建分析逻辑
-- 2. DATEDIFF计算时间间隔
-- 3. CASE WHEN实现评分规则
-- 4. 多维度特征组合评估风险`
  },
  {
    id: 12,
    industry: "ecommerce",
    title: "电商平台GMV目标拆解",
    description: "将年度GMV目标拆解到各维度，制定可执行的增长策略",
    difficulty: "中等",
    tags: ["目标拆解", "增长分析", "SQL聚合", "同比环比"],
    scenario: `某电商平台2024年GMV目标1000亿，需要拆解目标并制定策略。数据包含：
- orders表：订单ID、用户ID、订单金额、下单时间、类目、渠道
- users表：用户ID、注册时间、用户等级、地区

问题：
1. 按月拆解GMV目标（考虑季节性因素，如618、双11）
2. 按品类拆解（基于去年各品类占比和增长潜力）
3. 按用户层级拆解（新用户、老用户、高价值用户）
4. 计算各维度需要的订单量、客单价、转化率提升幅度`,
    keyPoints: ["目标拆解", "季节性分析", "用户分层", "增长归因"],
    solution: `-- SQL解题思路：
-- Step 1: 分析历史数据的季节性
WITH monthly_gmv AS (
  SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(amount) AS gmv,
    COUNT(DISTINCT user_id) AS active_users,
    SUM(amount) / COUNT(DISTINCT user_id) AS arpu
  FROM orders
  WHERE YEAR(order_date) = 2023
  GROUP BY DATE_FORMAT(order_date, '%Y-%m')
),

-- Step 2: 计算各月权重（考虑大促）
month_weight AS (
  SELECT 
    month,
    gmv,
    gmv / SUM(gmv) OVER () AS weight
  FROM monthly_gmv
),

-- Step 3: 拆解2024年月度目标
monthly_target AS (
  SELECT 
    CONCAT('2024-', RIGHT(month, 2)) AS target_month,
    ROUND(100000000000 * weight, 2) AS target_gmv,
    gmv AS last_year_gmv,
    ROUND((100000000000 * weight - gmv) / gmv * 100, 2) AS required_growth_rate
  FROM month_weight
),

-- Step 4: 按品类拆解
category_analysis AS (
  SELECT 
    category,
    SUM(amount) AS gmv_2023,
    COUNT(DISTINCT order_id) AS order_count,
    SUM(amount) / SUM(SUM(amount)) OVER () AS gmv_ratio
  FROM orders
  WHERE YEAR(order_date) = 2023
  GROUP BY category
)

SELECT 
  category,
  gmv_2023,
  ROUND(100000000000 * gmv_ratio, 2) AS target_gmv_2024,
  ROUND((100000000000 * gmv_ratio - gmv_2023) / gmv_2023 * 100, 2) AS required_growth,
  order_count AS orders_2023,
  ROUND(100000000000 * gmv_ratio / (gmv_2023 / order_count), 0) AS estimated_orders_2024
FROM category_analysis
ORDER BY gmv_2023 DESC;

-- 关键知识点：
-- 1. 窗口函数计算占比
-- 2. DATE_FORMAT日期处理
-- 3. 同比增长率计算
-- 4. 目标倒推业务指标`
  },
  {
    id: 13,
    industry: "internet",
    title: "短视频内容质量评分系统",
    description: "构建多维度内容质量评分体系，优化内容推荐和创作者激励",
    difficulty: "中等",
    tags: ["评分模型", "内容分析", "多维度评估", "SQL算法"],
    scenario: `某短视频平台需要建立内容质量评分系统。数据包含：
- videos表：视频ID、创作者ID、发布时间、时长、标签
- video_metrics表：视频ID、播放量、点赞数、评论数、分享数、完播率、平均观看时长
- user_behavior表：用户ID、视频ID、观看时长、是否点赞、是否关注

问题：
1. 设计内容质量评分公式（播放、互动、完播率、留存等维度）
2. 计算每个视频的质量分，并按分数排名
3. 分析高质量内容的共同特征（时长、标签、发布时间）
4. 识别优质创作者（内容质量稳定性高）`,
    keyPoints: ["加权评分", "归一化处理", "百分位数", "创作者画像"],
    solution: `-- SQL解题思路：
-- Step 1: 计算各指标的归一化分数（0-100分）
WITH normalized_metrics AS (
  SELECT 
    v.video_id,
    v.creator_id,
    v.duration,
    v.tags,
    -- 播放量分数（使用对数归一化，避免头部效应）
    LEAST(100, LOG10(vm.play_count + 1) / LOG10((SELECT MAX(play_count) FROM video_metrics)) * 100) AS play_score,
    -- 互动率分数
    ((vm.like_count + vm.comment_count * 2 + vm.share_count * 3) / vm.play_count * 100) AS engagement_score,
    -- 完播率分数
    vm.completion_rate * 100 AS completion_score,
    -- 平均观看时长占比
    (vm.avg_watch_duration / v.duration * 100) AS watch_ratio_score
  FROM videos v
  JOIN video_metrics vm ON v.video_id = vm.video_id
  WHERE vm.play_count >= 100  -- 过滤掉曝光不足的视频
),

-- Step 2: 计算综合质量分（加权平均）
quality_score AS (
  SELECT 
    video_id,
    creator_id,
    duration,
    tags,
    ROUND(
      play_score * 0.2 + 
      engagement_score * 0.3 + 
      completion_score * 0.3 + 
      watch_ratio_score * 0.2,
    2) AS total_quality_score,
    NTILE(10) OVER (ORDER BY 
      play_score * 0.2 + 
      engagement_score * 0.3 + 
      completion_score * 0.3 + 
      watch_ratio_score * 0.2
    ) AS quality_tier
  FROM normalized_metrics
),

-- Step 3: 创作者质量分析
creator_quality AS (
  SELECT 
    creator_id,
    COUNT(*) AS video_count,
    AVG(total_quality_score) AS avg_quality,
    STDDEV(total_quality_score) AS quality_stability,
    MAX(total_quality_score) AS best_score
  FROM quality_score
  GROUP BY creator_id
  HAVING COUNT(*) >= 5
)

-- 输出高质量创作者
SELECT 
  cq.creator_id,
  cq.video_count,
  ROUND(cq.avg_quality, 2) AS avg_quality_score,
  ROUND(cq.quality_stability, 2) AS stability,
  CASE 
    WHEN cq.avg_quality >= 80 AND cq.quality_stability < 10 THEN '金牌创作者'
    WHEN cq.avg_quality >= 70 THEN '优质创作者'
    WHEN cq.avg_quality >= 60 THEN '潜力创作者'
    ELSE '普通创作者'
  END AS creator_tier
FROM creator_quality cq
WHERE cq.avg_quality >= 60
ORDER BY cq.avg_quality DESC, cq.quality_stability ASC;

-- 关键知识点：
-- 1. 对数归一化处理头部数据
-- 2. 加权评分模型设计
-- 3. NTILE分层分析
-- 4. 标准差评估稳定性`
  },
  {
    id: 14,
    industry: "finance",
    title: "信贷逾期风险分层管理",
    description: "根据历史还款数据预测逾期风险，实施差异化催收策略",
    difficulty: "困难",
    tags: ["风险分层", "逾期预测", "催收策略", "时间序列"],
    scenario: `某消费金融公司逾期率上升，需要优化催收策略。数据包含：
- loans表：贷款ID、用户ID、贷款金额、利率、期限、放款日期
- repayments表：还款记录ID、贷款ID、应还日期、实还日期、应还金额、实还金额
- user_profile表：用户ID、年龄、收入、职业、信用分
- call_records表：催收记录ID、贷款ID、催收时间、催收方式、是否接通

问题：
1. 计算每笔贷款的逾期天数、逾期次数、累计逾期金额
2. 构建逾期风险评分模型（用户属性 + 历史还款行为）
3. 将用户分为低/中/高风险三层，制定差异化催收策略
4. 分析催收效果（催收后还款率、接通率对还款的影响）`,
    keyPoints: ["逾期计算", "风险建模", "用户分层", "效果评估"],
    solution: `-- SQL解题思路：
-- Step 1: 计算逾期情况
WITH overdue_analysis AS (
  SELECT 
    l.loan_id,
    l.user_id,
    l.amount AS loan_amount,
    COUNT(CASE WHEN DATEDIFF(r.actual_date, r.due_date) > 0 THEN 1 END) AS overdue_count,
    MAX(DATEDIFF(r.actual_date, r.due_date)) AS max_overdue_days,
    SUM(CASE WHEN r.actual_date > r.due_date THEN r.due_amount ELSE 0 END) AS overdue_amount,
    COUNT(*) AS total_periods,
    SUM(r.due_amount) AS total_due
  FROM loans l
  JOIN repayments r ON l.loan_id = r.loan_id
  GROUP BY l.loan_id, l.user_id, l.amount
),

-- Step 2: 构建风险特征
risk_features AS (
  SELECT 
    oa.loan_id,
    oa.user_id,
    oa.overdue_count,
    oa.max_overdue_days,
    up.credit_score,
    up.income,
    up.age,
    -- 逾期率
    ROUND(oa.overdue_count * 1.0 / oa.total_periods * 100, 2) AS overdue_rate,
    -- 逾期金额占比
    ROUND(oa.overdue_amount / oa.total_due * 100, 2) AS overdue_amount_ratio,
    -- 催收接通率
    COALESCE(
      (SELECT COUNT(CASE WHEN is_connected = 1 THEN 1 END) * 1.0 / COUNT(*) 
       FROM call_records cr 
       WHERE cr.loan_id = oa.loan_id), 0
    ) AS call_connect_rate
  FROM overdue_analysis oa
  JOIN user_profile up ON oa.user_id = up.user_id
),

-- Step 3: 计算风险评分
risk_score AS (
  SELECT 
    loan_id,
    user_id,
    overdue_count,
    max_overdue_days,
    credit_score,
    -- 风险评分公式
    CASE 
      WHEN overdue_count >= 3 THEN 40
      WHEN overdue_count >= 2 THEN 25
      WHEN overdue_count >= 1 THEN 10
      ELSE 0 
    END +
    CASE 
      WHEN max_overdue_days >= 30 THEN 30
      WHEN max_overdue_days >= 15 THEN 20
      WHEN max_overdue_days >= 7 THEN 10
      ELSE 0 
    END +
    CASE 
      WHEN credit_score < 600 THEN 20
      WHEN credit_score < 700 THEN 10
      ELSE 0 
    END +
    CASE 
      WHEN call_connect_rate < 0.3 THEN 10
      WHEN call_connect_rate < 0.5 THEN 5
      ELSE 0 
    END AS total_risk_score
  FROM risk_features
)

-- Step 4: 风险分层与策略
SELECT 
  rs.user_id,
  rs.loan_id,
  rs.total_risk_score,
  CASE 
    WHEN rs.total_risk_score >= 60 THEN '高风险'
    WHEN rs.total_risk_score >= 30 THEN '中风险'
    ELSE '低风险'
  END AS risk_level,
  CASE 
    WHEN rs.total_risk_score >= 60 THEN '法务介入，上门催收'
    WHEN rs.total_risk_score >= 30 THEN '电话+短信多轮催收'
    ELSE '短信温馨提醒'
  END AS collection_strategy,
  rs.overdue_count,
  rs.max_overdue_days,
  rs.credit_score
FROM risk_score rs
WHERE rs.total_risk_score > 0
ORDER BY rs.total_risk_score DESC;

-- 关键知识点：
-- 1. DATEDIFF计算逾期天数
-- 2. 多维度特征组合评分
-- 3. 子查询计算衍生指标
-- 4. CASE WHEN分层决策`
  },
  {
    id: 15,
    industry: "ecommerce",
    title: "电商价格弹性分析",
    description: "分析商品价格与销量的关系，制定最优定价策略",
    difficulty: "中等",
    tags: ["价格弹性", "销量预测", "动态定价", "回归分析"],
    scenario: `某电商平台需要优化定价策略，最大化GMV。数据包含：
- products表：商品ID、类目、品牌、成本价
- price_history表：商品ID、日期、售价、促销标签
- sales_daily表：商品ID、日期、销量、销售额、流量

问题：
1. 计算各商品的价格弹性系数（销量变化率 / 价格变化率）
2. 识别价格敏感型商品和品质型商品
3. 分析不同价格带的销量分布，找出最优定价区间
4. 模拟不同定价策略对GMV的影响`,
    keyPoints: ["价格弹性", "弹性系数", "最优定价", "敏感度分析"],
    solution: `-- SQL解题思路：
-- Step 1: 计算价格变化与销量变化
WITH price_sales_change AS (
  SELECT 
    s.product_id,
    s.date,
    s.quantity,
    ph.price,
    LAG(ph.price) OVER (PARTITION BY s.product_id ORDER BY s.date) AS prev_price,
    LAG(s.quantity) OVER (PARTITION BY s.product_id ORDER BY s.date) AS prev_quantity
  FROM sales_daily s
  JOIN price_history ph ON s.product_id = ph.product_id AND s.date = ph.date
  WHERE ph.promotion_flag = 0  -- 排除促销期，分析正常价格弹性
),

-- Step 2: 计算价格弹性系数
price_elasticity AS (
  SELECT 
    product_id,
    date,
    price,
    quantity,
    -- 价格变化率
    (price - prev_price) / prev_price AS price_change_rate,
    -- 销量变化率
    (quantity - prev_quantity) * 1.0 / prev_quantity AS quantity_change_rate,
    -- 弹性系数 = 销量变化率 / 价格变化率
    CASE 
      WHEN (price - prev_price) / prev_price != 0 
      THEN ((quantity - prev_quantity) * 1.0 / prev_quantity) / ((price - prev_price) / prev_price)
      ELSE NULL 
    END AS elasticity_coef
  FROM price_sales_change
  WHERE prev_price IS NOT NULL AND prev_quantity > 0
),

-- Step 3: 商品弹性分类
product_elasticity_summary AS (
  SELECT 
    product_id,
    AVG(elasticity_coef) AS avg_elasticity,
    AVG(price) AS avg_price,
    SUM(quantity) AS total_sales,
    CASE 
      WHEN AVG(elasticity_coef) < -1.5 THEN '高度价格敏感'
      WHEN AVG(elasticity_coef) < -0.5 THEN '价格敏感'
      WHEN AVG(elasticity_coef) >= -0.5 THEN '价格不敏感'
      ELSE '未知'
    END AS price_sensitivity
  FROM price_elasticity
  WHERE elasticity_coef IS NOT NULL 
    AND elasticity_coef < 0  -- 正常情况下价格上升销量下降，系数为负
  GROUP BY product_id
),

-- Step 4: 最优定价分析
price_band_analysis AS (
  SELECT 
    s.product_id,
    FLOOR(ph.price / 10) * 10 AS price_band,
    SUM(s.quantity) AS sales_volume,
    SUM(s.revenue) AS gmv,
    AVG(ph.price) AS avg_price_in_band
  FROM sales_daily s
  JOIN price_history ph ON s.product_id = ph.product_id AND s.date = ph.date
  GROUP BY s.product_id, FLOOR(ph.price / 10) * 10
)

SELECT 
  pes.product_id,
  p.category,
  pes.price_sensitivity,
  ROUND(pes.avg_elasticity, 3) AS elasticity_coefficient,
  ROUND(pes.avg_price, 2) AS current_avg_price,
  -- 找出GMV最高的价格带作为建议价格
  (SELECT pba.avg_price_in_band 
   FROM price_band_analysis pba 
   WHERE pba.product_id = pes.product_id 
   ORDER BY pba.gmv DESC LIMIT 1) AS recommended_price,
  pes.total_sales
FROM product_elasticity_summary pes
JOIN products p ON pes.product_id = p.product_id
ORDER BY pes.total_sales DESC;

-- 关键知识点：
-- 1. LAG窗口函数计算环比变化
-- 2. 价格弹性系数公式
-- 3. 价格分段分析（FLOOR分桶）
-- 4. 相关子查询找最优值`
  },
  {
    id: 16,
    industry: "internet",
    title: "App Push推送效果优化",
    description: "分析推送消息的打开率和转化率，优化推送策略",
    difficulty: "简单",
    tags: ["Push推送", "转化率", "A/B测试", "时间分析"],
    scenario: `某App希望提升Push推送的效果。数据包含：
- push_records表：推送ID、用户ID、推送时间、消息类型、标题、内容
- push_actions表：推送ID、用户ID、是否打开、打开时间、是否转化、转化金额
- users表：用户ID、注册时间、活跃度、偏好标签

问题：
1. 计算不同消息类型的打开率和转化率
2. 分析推送时间对打开率的影响（按小时分析）
3. 对比不同用户群体对推送的响应差异
4. 提出推送策略优化建议（推送时间、频率、内容）`,
    keyPoints: ["打开率", "转化漏斗", "时间分析", "用户分群"],
    solution: `-- SQL解题思路：
-- Step 1: 计算推送基础指标
WITH push_metrics AS (
  SELECT 
    pr.push_type,
    HOUR(pr.push_time) AS push_hour,
    COUNT(DISTINCT pr.push_id) AS total_push,
    COUNT(DISTINCT pa.user_id) AS opened_users,
    COUNT(DISTINCT CASE WHEN pa.is_converted = 1 THEN pa.user_id END) AS converted_users,
    SUM(CASE WHEN pa.is_converted = 1 THEN pa.conversion_amount ELSE 0 END) AS total_gmv
  FROM push_records pr
  LEFT JOIN push_actions pa ON pr.push_id = pa.push_id
  GROUP BY pr.push_type, HOUR(pr.push_time)
),

-- Step 2: 计算转化率
conversion_funnel AS (
  SELECT 
    push_type,
    push_hour,
    total_push,
    opened_users,
    converted_users,
    ROUND(opened_users * 100.0 / total_push, 2) AS open_rate,
    ROUND(converted_users * 100.0 / opened_users, 2) AS conversion_rate,
    ROUND(converted_users * 100.0 / total_push, 2) AS overall_conversion,
    total_gmv
  FROM push_metrics
  WHERE total_push > 0
),

-- Step 3: 用户分群分析
user_segment_response AS (
  SELECT 
    CASE 
      WHEN DATEDIFF(CURRENT_DATE, u.register_date) <= 30 THEN '新用户'
      WHEN u.activity_level = 'high' THEN '高活用户'
      ELSE '普通用户'
    END AS user_segment,
    COUNT(DISTINCT pr.push_id) AS push_sent,
    COUNT(DISTINCT pa.user_id) AS opened,
    ROUND(COUNT(DISTINCT pa.user_id) * 100.0 / COUNT(DISTINCT pr.push_id), 2) AS segment_open_rate
  FROM push_records pr
  JOIN users u ON pr.user_id = u.user_id
  LEFT JOIN push_actions pa ON pr.push_id = pa.push_id AND pa.is_opened = 1
  GROUP BY user_segment
)

-- 输出推送效果分析
SELECT 
  cf.push_type AS '消息类型',
  cf.push_hour AS '推送时段',
  cf.total_push AS '推送量',
  cf.open_rate AS '打开率%',
  cf.conversion_rate AS '转化率%',
  cf.overall_conversion AS '整体转化率%',
  cf.total_gmv AS '转化GMV',
  CASE 
    WHEN cf.push_hour BETWEEN 8 AND 10 THEN '早高峰-推荐'
    WHEN cf.push_hour BETWEEN 12 AND 14 THEN '午间-推荐'
    WHEN cf.push_hour BETWEEN 20 AND 22 THEN '晚高峰-强推'
    ELSE '非推荐时段'
  END AS '时段建议'
FROM conversion_funnel cf
WHERE cf.total_push >= 1000  -- 过滤样本量不足的数据
ORDER BY cf.open_rate DESC, cf.conversion_rate DESC;

-- 用户分群对比
SELECT * FROM user_segment_response ORDER BY segment_open_rate DESC;

-- 关键知识点：
-- 1. HOUR提取小时维度
-- 2. 转化漏斗计算（发送→打开→转化）
-- 3. 用户分群对比分析
-- 4. 业务规则生成建议`
  },
  {
    id: 17,
    industry: "finance",
    title: "基金定投收益回测分析",
    description: "回测不同定投策略的历史收益，为用户推荐最优投资方案",
    difficulty: "困难",
    tags: ["定投策略", "收益回测", "投资建议", "时间序列"],
    scenario: `某基金平台需要为用户提供定投策略建议。数据包含：
- fund_nav表：基金代码、日期、单位净值、累计净值
- user_investments表：用户ID、基金代码、定投金额、定投日期、份额
- market_index表：日期、指数代码、指数点位

问题：
1. 回测固定金额定投策略（每月1号投1000元，持续3年）
2. 回测智能定投策略（指数下跌多投，上涨少投）
3. 对比一次性投资 vs 定投的收益差异
4. 分析不同市场环境下定投的优势（震荡市 vs 单边市）`,
    keyPoints: ["定投收益", "成本均摊", "收益对比", "策略回测"],
    solution: `-- SQL解题思路：
-- Step 1: 模拟固定定投
WITH regular_investment AS (
  SELECT 
    fund_code,
    date,
    nav,
    1000 AS invest_amount,
    1000 / nav AS shares_bought,
    SUM(1000 / nav) OVER (PARTITION BY fund_code ORDER BY date) AS cumulative_shares,
    SUM(1000) OVER (PARTITION BY fund_code ORDER BY date) AS cumulative_investment
  FROM fund_nav
  WHERE DAY(date) = 1  -- 每月1号
    AND date BETWEEN '2021-01-01' AND '2023-12-31'
),

-- 计算定投收益
regular_return AS (
  SELECT 
    fund_code,
    MAX(date) AS end_date,
    MAX(cumulative_investment) AS total_invested,
    MAX(cumulative_shares) AS total_shares,
    MAX(cumulative_shares) * (SELECT nav FROM fund_nav fn WHERE fn.fund_code = ri.fund_code AND fn.date = MAX(ri.date)) AS market_value,
    (MAX(cumulative_shares) * (SELECT nav FROM fund_nav fn WHERE fn.fund_code = ri.fund_code AND fn.date = MAX(ri.date)) - MAX(cumulative_investment)) AS profit,
    ROUND((MAX(cumulative_shares) * (SELECT nav FROM fund_nav fn WHERE fn.fund_code = ri.fund_code AND fn.date = MAX(ri.date)) - MAX(cumulative_investment)) / MAX(cumulative_investment) * 100, 2) AS return_rate
  FROM regular_investment ri
  GROUP BY fund_code
),

-- Step 2: 模拟智能定投（指数估值定投）
smart_investment AS (
  SELECT 
    fn.fund_code,
    fn.date,
    fn.nav,
    mi.index_value,
    LAG(mi.index_value, 20) OVER (ORDER BY fn.date) AS index_value_20d_ago,
    -- 智能定投金额：指数跌幅越大投入越多
    CASE 
      WHEN (mi.index_value - LAG(mi.index_value, 20) OVER (ORDER BY fn.date)) / LAG(mi.index_value, 20) OVER (ORDER BY fn.date) < -0.10 THEN 1500
      WHEN (mi.index_value - LAG(mi.index_value, 20) OVER (ORDER BY fn.date)) / LAG(mi.index_value, 20) OVER (ORDER BY fn.date) < -0.05 THEN 1200
      WHEN (mi.index_value - LAG(mi.index_value, 20) OVER (ORDER BY fn.date)) / LAG(mi.index_value, 20) OVER (ORDER BY fn.date) > 0.10 THEN 700
      WHEN (mi.index_value - LAG(mi.index_value, 20) OVER (ORDER BY fn.date)) / LAG(mi.index_value, 20) OVER (ORDER BY fn.date) > 0.05 THEN 900
      ELSE 1000
    END AS smart_amount
  FROM fund_nav fn
  JOIN market_index mi ON fn.date = mi.date
  WHERE DAY(fn.date) = 1
    AND fn.date BETWEEN '2021-01-01' AND '2023-12-31'
),

smart_return AS (
  SELECT 
    fund_code,
    SUM(smart_amount) AS total_invested,
    SUM(smart_amount / nav) AS total_shares,
    SUM(smart_amount / nav) * (SELECT nav FROM fund_nav fn WHERE fn.fund_code = si.fund_code ORDER BY fn.date DESC LIMIT 1) AS market_value,
    ROUND((SUM(smart_amount / nav) * (SELECT nav FROM fund_nav fn WHERE fn.fund_code = si.fund_code ORDER BY fn.date DESC LIMIT 1) - SUM(smart_amount)) / SUM(smart_amount) * 100, 2) AS smart_return_rate
  FROM smart_investment si
  GROUP BY fund_code
),

-- Step 3: 一次性投资对比
lumpsum_investment AS (
  SELECT 
    fund_code,
    36000 AS invest_amount,  -- 3年*12月*1000
    36000 / (SELECT nav FROM fund_nav fn WHERE fn.fund_code = f.fund_code AND fn.date = '2021-01-01') AS shares,
    36000 / (SELECT nav FROM fund_nav fn WHERE fn.fund_code = f.fund_code AND fn.date = '2021-01-01') * 
    (SELECT nav FROM fund_nav fn WHERE fn.fund_code = f.fund_code ORDER BY fn.date DESC LIMIT 1) AS final_value
  FROM (SELECT DISTINCT fund_code FROM fund_nav) f
)

-- 对比结果
SELECT 
  rr.fund_code AS '基金代码',
  rr.total_invested AS '定投总投入',
  rr.return_rate AS '固定定投收益率%',
  sr.smart_return_rate AS '智能定投收益率%',
  ROUND((li.final_value - li.invest_amount) / li.invest_amount * 100, 2) AS '一次性投资收益率%',
  CASE 
    WHEN sr.smart_return_rate > rr.return_rate AND sr.smart_return_rate > (li.final_value - li.invest_amount) / li.invest_amount * 100 
    THEN '智能定投最优'
    WHEN rr.return_rate > (li.final_value - li.invest_amount) / li.invest_amount * 100 
    THEN '固定定投优于一次性'
    ELSE '一次性投资更优'
  END AS '最优策略'
FROM regular_return rr
JOIN smart_return sr ON rr.fund_code = sr.fund_code
JOIN lumpsum_investment li ON rr.fund_code = li.fund_code
ORDER BY sr.smart_return_rate DESC;

-- 关键知识点：
-- 1. 累计求和模拟定投过程
-- 2. LAG计算指数变化率
-- 3. CASE WHEN实现智能定投规则
-- 4. 多策略收益对比`
  },
  {
    id: 18,
    industry: "ecommerce",
    title: "直播电商销售分析",
    description: "分析直播带货数据，优化直播时长、产品排序和主播选择",
    difficulty: "中等",
    tags: ["直播电商", "销售分析", "转化优化", "时间分析"],
    scenario: `某电商平台开展直播带货业务，需要优化直播效果。数据包含：
- live_streams表：直播ID、主播ID、开始时间、结束时间、峰值在线人数
- live_products表：直播ID、商品ID、上架时刻、讲解时长、点击量、销量、销售额
- live_interactions表：直播ID、用户ID、进入时间、离开时间、点赞数、评论数

问题：
1. 计算直播的核心指标（观看人数、人均观看时长、转化率、GMV）
2. 分析商品在直播中的最佳出场顺序（前期 vs 中期 vs 后期）
3. 分析讲解时长与销量的关系（是否讲解越久卖得越好？）
4. 对比不同主播的带货能力（转化率、客单价、复购率）`,
    keyPoints: ["直播指标", "商品排序", "转化分析", "主播画像"],
    solution: `-- SQL解题思路：
-- Step 1: 计算直播基础指标
WITH live_basic_metrics AS (
  SELECT 
    ls.live_id,
    ls.host_id,
    ls.start_time,
    TIMESTAMPDIFF(MINUTE, ls.start_time, ls.end_time) AS duration_minutes,
    ls.peak_viewers,
    COUNT(DISTINCT li.user_id) AS total_viewers,
    AVG(TIMESTAMPDIFF(MINUTE, li.enter_time, li.leave_time)) AS avg_watch_minutes,
    SUM(lp.sales_volume) AS total_orders,
    SUM(lp.gmv) AS total_gmv
  FROM live_streams ls
  LEFT JOIN live_interactions li ON ls.live_id = li.live_id
  LEFT JOIN live_products lp ON ls.live_id = lp.live_id
  GROUP BY ls.live_id, ls.host_id, ls.start_time, ls.end_time, ls.peak_viewers
),

-- 计算转化率
live_conversion AS (
  SELECT 
    live_id,
    host_id,
    total_viewers,
    total_orders,
    total_gmv,
    ROUND(total_orders * 100.0 / NULLIF(total_viewers, 0), 2) AS conversion_rate,
    ROUND(total_gmv / NULLIF(total_orders, 0), 2) AS avg_order_value,
    ROUND(total_gmv / NULLIF(total_viewers, 0), 2) AS gmv_per_viewer
  FROM live_basic_metrics
),

-- Step 2: 商品出场时段分析
product_timing_analysis AS (
  SELECT 
    lp.live_id,
    lp.product_id,
    TIMESTAMPDIFF(MINUTE, ls.start_time, lp.shelf_time) AS minutes_from_start,
    CASE 
      WHEN TIMESTAMPDIFF(MINUTE, ls.start_time, lp.shelf_time) <= (TIMESTAMPDIFF(MINUTE, ls.start_time, ls.end_time) * 0.3) THEN '直播前期'
      WHEN TIMESTAMPDIFF(MINUTE, ls.start_time, lp.shelf_time) <= (TIMESTAMPDIFF(MINUTE, ls.start_time, ls.end_time) * 0.7) THEN '直播中期'
      ELSE '直播后期'
    END AS timing_phase,
    lp.presentation_minutes,
    lp.click_count,
    lp.sales_volume,
    lp.gmv,
    ROUND(lp.sales_volume * 100.0 / NULLIF(lp.click_count, 0), 2) AS click_to_buy_rate
  FROM live_products lp
  JOIN live_streams ls ON lp.live_id = ls.live_id
),

-- 按时段汇总
timing_summary AS (
  SELECT 
    timing_phase,
    COUNT(*) AS product_count,
    AVG(click_to_buy_rate) AS avg_conversion,
    SUM(gmv) AS phase_gmv,
    AVG(presentation_minutes) AS avg_presentation_time
  FROM product_timing_analysis
  GROUP BY timing_phase
),

-- Step 3: 讲解时长与销量关系
presentation_impact AS (
  SELECT 
    CASE 
      WHEN presentation_minutes < 3 THEN '< 3分钟'
      WHEN presentation_minutes < 5 THEN '3-5分钟'
      WHEN presentation_minutes < 10 THEN '5-10分钟'
      ELSE '> 10分钟'
    END AS presentation_duration,
    COUNT(*) AS product_count,
    AVG(sales_volume) AS avg_sales,
    AVG(click_to_buy_rate) AS avg_conversion_rate
  FROM product_timing_analysis
  GROUP BY presentation_duration
),

-- Step 4: 主播带货能力
host_performance AS (
  SELECT 
    host_id,
    COUNT(DISTINCT live_id) AS live_count,
    AVG(conversion_rate) AS avg_conversion_rate,
    AVG(avg_order_value) AS avg_order_value,
    SUM(total_gmv) AS total_gmv,
    RANK() OVER (ORDER BY SUM(total_gmv) DESC) AS gmv_rank
  FROM live_conversion
  GROUP BY host_id
  HAVING COUNT(DISTINCT live_id) >= 3
)

-- 输出分析结果
SELECT * FROM timing_summary ORDER BY FIELD(timing_phase, '直播前期', '直播中期', '直播后期');
SELECT * FROM presentation_impact ORDER BY FIELD(presentation_duration, '< 3分钟', '3-5分钟', '5-10分钟', '> 10分钟');
SELECT * FROM host_performance ORDER BY gmv_rank;

-- 关键知识点：
-- 1. TIMESTAMPDIFF计算时间差
-- 2. 时段划分分析（前中后期）
-- 3. 分桶分析（讲解时长分段）
-- 4. RANK排名对比主播`
  },
  {
    id: 19,
    industry: "internet",
    title: "社区内容冷启动策略",
    description: "为新用户推荐合适的内容，提升留存和活跃度",
    difficulty: "中等",
    tags: ["冷启动", "推荐算法", "用户画像", "内容标签"],
    scenario: `某内容社区新用户流失率高，需要优化冷启动推荐。数据包含：
- users表：用户ID、注册时间、年龄、性别、地区、注册来源
- content表：内容ID、创作者ID、发布时间、标签、分类、质量分
- user_behavior表：用户ID、内容ID、行为类型（浏览/点赞/收藏/关注）、时间
- similar_users表：用户ID、相似用户ID、相似度分数（协同过滤预计算）

问题：
1. 分析新用户在注册后7天的行为路径（浏览→互动→留存）
2. 为新用户冷启动推荐内容（基于人口属性、热门内容、相似用户偏好）
3. 对比不同推荐策略对新用户留存率的影响
4. 识别优质种子内容（对新用户友好、转化率高）`,
    keyPoints: ["冷启动", "协同过滤", "内容标签", "留存分析"],
    solution: `-- SQL解题思路：
-- Step 1: 新用户行为路径分析
WITH new_users AS (
  SELECT 
    user_id,
    register_date,
    age,
    gender,
    region
  FROM users
  WHERE register_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
),

user_journey AS (
  SELECT 
    nu.user_id,
    DATEDIFF(ub.action_time, nu.register_date) AS days_since_register,
    COUNT(CASE WHEN ub.action_type = 'view' THEN 1 END) AS view_count,
    COUNT(CASE WHEN ub.action_type = 'like' THEN 1 END) AS like_count,
    COUNT(CASE WHEN ub.action_type = 'favorite' THEN 1 END) AS favorite_count,
    COUNT(CASE WHEN ub.action_type = 'follow' THEN 1 END) AS follow_count
  FROM new_users nu
  LEFT JOIN user_behavior ub ON nu.user_id = ub.user_id 
    AND ub.action_time BETWEEN nu.register_date AND DATE_ADD(nu.register_date, INTERVAL 7 DAY)
  GROUP BY nu.user_id, DATEDIFF(ub.action_time, nu.register_date)
),

-- 计算新用户7日留存
retention_analysis AS (
  SELECT 
    nu.user_id,
    CASE WHEN MAX(DATEDIFF(ub.action_time, nu.register_date)) >= 7 THEN 1 ELSE 0 END AS is_retained_7d,
    SUM(CASE WHEN ub.action_type IN ('like', 'favorite', 'follow') THEN 1 ELSE 0 END) AS engagement_score
  FROM new_users nu
  LEFT JOIN user_behavior ub ON nu.user_id = ub.user_id
  GROUP BY nu.user_id
),

-- Step 2: 基于人口属性的内容推荐
demographic_recommendations AS (
  SELECT 
    nu.user_id,
    nu.age,
    nu.gender,
    c.content_id,
    c.title,
    c.category,
    c.quality_score,
    -- 同年龄段、同性别用户的内容偏好
    COUNT(DISTINCT ub.user_id) AS popularity_in_segment,
    AVG(CASE WHEN ub.action_type IN ('like', 'favorite') THEN 1 ELSE 0 END) AS engagement_rate
  FROM new_users nu
  CROSS JOIN content c
  LEFT JOIN user_behavior ub ON c.content_id = ub.content_id
  LEFT JOIN users u ON ub.user_id = u.user_id 
    AND ABS(u.age - nu.age) <= 5 
    AND u.gender = nu.gender
  WHERE c.quality_score >= 80  -- 只推荐高质量内容
  GROUP BY nu.user_id, nu.age, nu.gender, c.content_id, c.title, c.category, c.quality_score
  HAVING COUNT(DISTINCT ub.user_id) >= 10  -- 至少被10人互动过
),

-- Step 3: 基于协同过滤的推荐
collaborative_recommendations AS (
  SELECT 
    nu.user_id,
    c.content_id,
    c.title,
    c.category,
    SUM(su.similarity_score) AS total_similarity,
    COUNT(DISTINCT ub.user_id) AS similar_user_interactions
  FROM new_users nu
  JOIN similar_users su ON nu.user_id = su.user_id
  JOIN user_behavior ub ON su.similar_user_id = ub.user_id 
    AND ub.action_type IN ('like', 'favorite')
  JOIN content c ON ub.content_id = c.content_id
  WHERE c.quality_score >= 75
  GROUP BY nu.user_id, c.content_id, c.title, c.category
  HAVING SUM(su.similarity_score) >= 0.5
),

-- Step 4: 热门冷启动内容（对新用户友好）
seed_content AS (
  SELECT 
    c.content_id,
    c.title,
    c.category,
    COUNT(DISTINCT CASE WHEN DATEDIFF(ub.action_time, u.register_date) <= 3 THEN ub.user_id END) AS new_user_views,
    COUNT(DISTINCT CASE WHEN DATEDIFF(ub.action_time, u.register_date) <= 3 AND ub.action_type IN ('like', 'favorite') THEN ub.user_id END) AS new_user_engagements,
    ROUND(
      COUNT(DISTINCT CASE WHEN DATEDIFF(ub.action_time, u.register_date) <= 3 AND ub.action_type IN ('like', 'favorite') THEN ub.user_id END) * 100.0 /
      NULLIF(COUNT(DISTINCT CASE WHEN DATEDIFF(ub.action_time, u.register_date) <= 3 THEN ub.user_id END), 0),
    2) AS new_user_engagement_rate
  FROM content c
  JOIN user_behavior ub ON c.content_id = ub.content_id
  JOIN users u ON ub.user_id = u.user_id
  WHERE c.quality_score >= 85
  GROUP BY c.content_id, c.title, c.category
  HAVING new_user_views >= 100 AND new_user_engagement_rate >= 10
)

-- 输出推荐结果
SELECT 
  user_id,
  content_id,
  title,
  category,
  'demographic' AS recommendation_type
FROM demographic_recommendations
ORDER BY engagement_rate DESC
LIMIT 20;

-- 输出种子内容
SELECT * FROM seed_content ORDER BY new_user_engagement_rate DESC LIMIT 50;

-- 关键知识点：
-- 1. DATEDIFF计算天数差
-- 2. CROSS JOIN生成候选集
-- 3. 协同过滤相似度加权
-- 4. 新用户行为特征提取`
  },
  {
    id: 21,
    industry: "ecommerce",
    title: "查询每日订单统计",
    description: "统计每天的订单数量和总金额，掌握基础聚合函数",
    difficulty: "简单",
    tags: ["GROUP BY", "聚合函数", "日期处理", "基础统计"],
    scenario: `某电商平台需要每日订单报表。数据表：
- orders表：订单ID(order_id)、用户ID(user_id)、订单金额(amount)、下单时间(order_date)

问题：
1. 统计每天的订单数量和总金额
2. 按日期排序，最新的在前
3. 计算每天的平均订单金额
4. 只显示订单数量大于10的日期`,
    keyPoints: ["GROUP BY", "COUNT", "SUM", "AVG", "HAVING"],
    solution: `-- SQL解法：
SELECT 
  DATE(order_date) AS order_day,
  COUNT(*) AS order_count,
  SUM(amount) AS total_amount,
  ROUND(AVG(amount), 2) AS avg_amount
FROM orders
GROUP BY DATE(order_date)
HAVING COUNT(*) > 10
ORDER BY order_day DESC;

-- Pandas解法：
import pandas as pd

df['order_day'] = pd.to_datetime(df['order_date']).dt.date
result = df.groupby('order_day').agg(
    order_count=('order_id', 'count'),
    total_amount=('amount', 'sum'),
    avg_amount=('amount', 'mean')
).reset_index()
result = result[result['order_count'] > 10]
result = result.sort_values('order_day', ascending=False)

-- 关键知识点：
-- 1. DATE函数提取日期部分
-- 2. GROUP BY分组统计
-- 3. COUNT/SUM/AVG聚合函数
-- 4. HAVING过滤分组结果`
  },
  {
    id: 22,
    industry: "ecommerce",
    title: "找出销量TOP5商品",
    description: "使用排序和限制查询销量最高的商品",
    difficulty: "简单",
    tags: ["ORDER BY", "LIMIT", "聚合", "排名"],
    scenario: `电商运营需要找出最畅销的商品。数据表：
- order_items表：订单明细ID(id)、订单ID(order_id)、商品ID(product_id)、商品名称(product_name)、购买数量(quantity)

问题：
1. 统计每个商品的总销量
2. 找出销量TOP5的商品
3. 显示商品名称和总销量
4. 按销量从高到低排序`,
    keyPoints: ["GROUP BY", "SUM", "ORDER BY", "LIMIT"],
    solution: `-- SQL解法：
SELECT 
  product_id,
  product_name,
  SUM(quantity) AS total_sales
FROM order_items
GROUP BY product_id, product_name
ORDER BY total_sales DESC
LIMIT 5;

-- Pandas解法：
result = df.groupby(['product_id', 'product_name'])['quantity'].sum().reset_index()
result.columns = ['product_id', 'product_name', 'total_sales']
result = result.sort_values('total_sales', ascending=False).head(5)

-- 关键知识点：
-- 1. GROUP BY多字段分组
-- 2. SUM求和统计
-- 3. ORDER BY DESC降序排列
-- 4. LIMIT限制返回行数`
  },
  {
    id: 23,
    industry: "internet",
    title: "用户活跃天数统计",
    description: "统计每个用户的活跃天数和最后活跃时间",
    difficulty: "简单",
    tags: ["DISTINCT", "COUNT", "MAX", "用户分析"],
    scenario: `App需要分析用户活跃情况。数据表：
- user_logs表：日志ID(id)、用户ID(user_id)、登录时间(login_time)、活动类型(action_type)

问题：
1. 统计每个用户的活跃天数（去重）
2. 找出每个用户最后一次登录时间
3. 统计每个用户的总活动次数
4. 按活跃天数降序排列`,
    keyPoints: ["COUNT DISTINCT", "MAX", "DATE", "去重"],
    solution: `-- SQL解法：
SELECT 
  user_id,
  COUNT(DISTINCT DATE(login_time)) AS active_days,
  MAX(login_time) AS last_login,
  COUNT(*) AS total_actions
FROM user_logs
GROUP BY user_id
ORDER BY active_days DESC;

-- Pandas解法：
df['login_date'] = pd.to_datetime(df['login_time']).dt.date
result = df.groupby('user_id').agg(
    active_days=('login_date', 'nunique'),
    last_login=('login_time', 'max'),
    total_actions=('id', 'count')
).reset_index()
result = result.sort_values('active_days', ascending=False)

-- 关键知识点：
-- 1. COUNT(DISTINCT field) 去重计数
-- 2. MAX获取最大值（最新时间）
-- 3. DATE提取日期用于去重
-- 4. 同时计算多个聚合指标`
  },
  {
    id: 24,
    industry: "ecommerce",
    title: "计算用户首单和复购",
    description: "识别用户的首次购买和是否有复购行为",
    difficulty: "简单",
    tags: ["MIN", "COUNT", "CASE WHEN", "用户分层"],
    scenario: `分析用户购买行为，识别新客和复购客。数据表：
- orders表：订单ID(order_id)、用户ID(user_id)、下单时间(order_date)、订单金额(amount)

问题：
1. 找出每个用户的首单时间
2. 统计每个用户的订单数量
3. 标记是否为复购用户（订单数>1）
4. 计算首单金额`,
    keyPoints: ["MIN", "COUNT", "CASE WHEN", "条件判断"],
    solution: `-- SQL解法：
SELECT 
  user_id,
  MIN(order_date) AS first_order_date,
  COUNT(*) AS order_count,
  CASE 
    WHEN COUNT(*) > 1 THEN '复购用户'
    ELSE '新用户'
  END AS user_type,
  (SELECT amount FROM orders o2 
   WHERE o2.user_id = o1.user_id 
   ORDER BY order_date LIMIT 1) AS first_order_amount
FROM orders o1
GROUP BY user_id
ORDER BY order_count DESC;

-- Pandas解法：
result = df.groupby('user_id').agg(
    first_order_date=('order_date', 'min'),
    order_count=('order_id', 'count')
).reset_index()
result['user_type'] = result['order_count'].apply(
    lambda x: '复购用户' if x > 1 else '新用户'
)
# 获取首单金额
first_orders = df.sort_values('order_date').groupby('user_id').first()
result = result.merge(first_orders[['amount']], on='user_id')
result.rename(columns={'amount': 'first_order_amount'}, inplace=True)

-- 关键知识点：
-- 1. MIN获取最早时间
-- 2. COUNT统计次数
-- 3. CASE WHEN条件判断
-- 4. 相关子查询获取首单金额`
  },
  {
    id: 25,
    industry: "internet",
    title: "统计不同类型内容的数量",
    description: "按内容类型统计数量和占比",
    difficulty: "简单",
    tags: ["GROUP BY", "COUNT", "占比计算", "分类统计"],
    scenario: `内容平台需要了解内容分布情况。数据表：
- contents表：内容ID(content_id)、内容类型(category)、发布时间(publish_date)、浏览量(views)

问题：
1. 统计每种类型的内容数量
2. 计算每种类型的占比（百分比）
3. 计算每种类型的平均浏览量
4. 按内容数量降序排列`,
    keyPoints: ["GROUP BY", "COUNT", "百分比计算", "窗口函数"],
    solution: `-- SQL解法：
SELECT 
  category,
  COUNT(*) AS content_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM contents), 2) AS percentage,
  ROUND(AVG(views), 0) AS avg_views
FROM contents
GROUP BY category
ORDER BY content_count DESC;

-- 使用窗口函数的写法：
SELECT 
  category,
  COUNT(*) AS content_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage,
  ROUND(AVG(views), 0) AS avg_views
FROM contents
GROUP BY category
ORDER BY content_count DESC;

-- Pandas解法：
result = df.groupby('category').agg(
    content_count=('content_id', 'count'),
    avg_views=('views', 'mean')
).reset_index()
result['percentage'] = (result['content_count'] / result['content_count'].sum() * 100).round(2)
result = result.sort_values('content_count', ascending=False)

-- 关键知识点：
-- 1. 子查询计算总数
-- 2. 百分比计算公式
-- 3. ROUND四舍五入
-- 4. 窗口函数SUM() OVER()`
  },
  {
    id: 26,
    industry: "finance",
    title: "查询本月新增用户",
    description: "筛选指定时间范围的数据，掌握日期过滤",
    difficulty: "简单",
    tags: ["WHERE", "日期过滤", "BETWEEN", "时间范围"],
    scenario: `查看本月新注册的用户情况。数据表：
- users表：用户ID(user_id)、用户名(username)、注册时间(register_date)、手机号(phone)

问题：
1. 查询本月注册的所有用户
2. 统计本月新增用户数量
3. 按注册时间排序
4. 显示用户ID、用户名、注册时间`,
    keyPoints: ["WHERE", "DATE函数", "BETWEEN", "本月数据"],
    solution: `-- SQL解法（当前月）：
SELECT 
  user_id,
  username,
  register_date,
  phone
FROM users
WHERE DATE_FORMAT(register_date, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m')
ORDER BY register_date DESC;

-- 或使用BETWEEN：
SELECT 
  user_id,
  username,
  register_date
FROM users
WHERE register_date BETWEEN DATE_FORMAT(CURRENT_DATE, '%Y-%m-01') 
  AND LAST_DAY(CURRENT_DATE)
ORDER BY register_date DESC;

-- 统计数量：
SELECT COUNT(*) AS new_users_count
FROM users
WHERE YEAR(register_date) = YEAR(CURRENT_DATE)
  AND MONTH(register_date) = MONTH(CURRENT_DATE);

-- Pandas解法：
df['register_date'] = pd.to_datetime(df['register_date'])
current_month = pd.Timestamp.now().to_period('M')
result = df[df['register_date'].dt.to_period('M') == current_month]
result = result.sort_values('register_date', ascending=False)

-- 关键知识点：
-- 1. DATE_FORMAT格式化日期
-- 2. YEAR/MONTH提取年月
-- 3. BETWEEN范围查询
-- 4. CURRENT_DATE当前日期`
  },
  {
    id: 27,
    industry: "ecommerce",
    title: "计算订单金额区间分布",
    description: "使用CASE WHEN对数据进行分段统计",
    difficulty: "简单",
    tags: ["CASE WHEN", "分段统计", "区间分布", "条件分组"],
    scenario: `分析订单金额分布情况。数据表：
- orders表：订单ID(order_id)、用户ID(user_id)、订单金额(amount)、订单状态(status)

问题：
1. 将订单金额分为：0-100、100-500、500-1000、1000以上
2. 统计每个金额区间的订单数量
3. 计算每个区间的订单占比
4. 只统计已完成的订单`,
    keyPoints: ["CASE WHEN", "金额分段", "条件统计", "WHERE过滤"],
    solution: `-- SQL解法：
SELECT 
  CASE 
    WHEN amount < 100 THEN '0-100元'
    WHEN amount < 500 THEN '100-500元'
    WHEN amount < 1000 THEN '500-1000元'
    ELSE '1000元以上'
  END AS amount_range,
  COUNT(*) AS order_count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders WHERE status = 'completed'), 2) AS percentage
FROM orders
WHERE status = 'completed'
GROUP BY amount_range
ORDER BY 
  CASE 
    WHEN amount < 100 THEN 1
    WHEN amount < 500 THEN 2
    WHEN amount < 1000 THEN 3
    ELSE 4
  END;

-- Pandas解法：
completed = df[df['status'] == 'completed'].copy()
completed['amount_range'] = pd.cut(
    completed['amount'],
    bins=[0, 100, 500, 1000, float('inf')],
    labels=['0-100元', '100-500元', '500-1000元', '1000元以上']
)
result = completed.groupby('amount_range').size().reset_index(name='order_count')
result['percentage'] = (result['order_count'] / result['order_count'].sum() * 100).round(2)

-- 关键知识点：
-- 1. CASE WHEN多条件判断
-- 2. 金额区间分段
-- 3. 自定义排序逻辑
-- 4. WHERE过滤条件`
  },
  {
    id: 28,
    industry: "internet",
    title: "查找重复数据",
    description: "识别和统计重复的记录",
    difficulty: "简单",
    tags: ["GROUP BY", "HAVING", "重复检测", "数据清洗"],
    scenario: `检查数据中是否存在重复记录。数据表：
- user_actions表：记录ID(id)、用户ID(user_id)、操作类型(action)、操作时间(action_time)

问题：
1. 找出同一用户在同一天有多次相同操作的记录
2. 统计重复次数
3. 只显示重复次数大于1的记录
4. 按重复次数降序排列`,
    keyPoints: ["GROUP BY", "HAVING", "DATE", "重复检测"],
    solution: `-- SQL解法：
SELECT 
  user_id,
  action,
  DATE(action_time) AS action_date,
  COUNT(*) AS duplicate_count
FROM user_actions
GROUP BY user_id, action, DATE(action_time)
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- 查看具体的重复记录：
SELECT ua.*
FROM user_actions ua
INNER JOIN (
  SELECT user_id, action, DATE(action_time) AS action_date
  FROM user_actions
  GROUP BY user_id, action, DATE(action_time)
  HAVING COUNT(*) > 1
) dup ON ua.user_id = dup.user_id 
  AND ua.action = dup.action 
  AND DATE(ua.action_time) = dup.action_date
ORDER BY ua.user_id, ua.action_time;

-- Pandas解法：
df['action_date'] = pd.to_datetime(df['action_time']).dt.date
duplicates = df.groupby(['user_id', 'action', 'action_date']).size().reset_index(name='duplicate_count')
result = duplicates[duplicates['duplicate_count'] > 1]
result = result.sort_values('duplicate_count', ascending=False)

-- 关键知识点：
-- 1. 多字段GROUP BY
-- 2. HAVING过滤分组结果
-- 3. JOIN查看明细记录
-- 4. 重复数据检测方法`
  },
  {
    id: 29,
    industry: "ecommerce",
    title: "关联查询用户订单信息",
    description: "使用JOIN连接多张表获取完整信息",
    difficulty: "简单",
    tags: ["JOIN", "LEFT JOIN", "多表关联", "表连接"],
    scenario: `需要同时查看用户和订单信息。数据表：
- users表：用户ID(user_id)、用户名(username)、注册时间(register_date)
- orders表：订单ID(order_id)、用户ID(user_id)、订单金额(amount)、下单时间(order_date)

问题：
1. 查询每个用户的订单信息（包括没有下单的用户）
2. 显示用户名、订单数量、总消费金额
3. 没有订单的用户显示0
4. 按总消费金额降序排列`,
    keyPoints: ["LEFT JOIN", "COALESCE", "多表关联", "空值处理"],
    solution: `-- SQL解法：
SELECT 
  u.user_id,
  u.username,
  u.register_date,
  COUNT(o.order_id) AS order_count,
  COALESCE(SUM(o.amount), 0) AS total_amount
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username, u.register_date
ORDER BY total_amount DESC;

-- 只查询有订单的用户（INNER JOIN）：
SELECT 
  u.user_id,
  u.username,
  COUNT(o.order_id) AS order_count,
  SUM(o.amount) AS total_amount
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username
ORDER BY total_amount DESC;

-- Pandas解法：
result = users.merge(orders, on='user_id', how='left')
result = result.groupby(['user_id', 'username', 'register_date']).agg(
    order_count=('order_id', 'count'),
    total_amount=('amount', lambda x: x.sum() if x.notna().any() else 0)
).reset_index()
result = result.sort_values('total_amount', ascending=False)

-- 关键知识点：
-- 1. LEFT JOIN保留左表所有记录
-- 2. COALESCE处理NULL值
-- 3. COUNT不计算NULL
-- 4. 多表关联后分组聚合`
  },
  {
    id: 30,
    industry: "internet",
    title: "统计每小时活跃用户数",
    description: "按小时维度统计用户活跃情况",
    difficulty: "简单",
    tags: ["HOUR", "时间分析", "COUNT DISTINCT", "时段统计"],
    scenario: `分析用户在一天中的活跃时段。数据表：
- user_logs表：日志ID(id)、用户ID(user_id)、登录时间(login_time)

问题：
1. 统计每个小时的活跃用户数（去重）
2. 统计每个小时的总访问次数
3. 按小时排序（0-23点）
4. 找出活跃用户数最多的时段`,
    keyPoints: ["HOUR函数", "COUNT DISTINCT", "时间维度", "去重统计"],
    solution: `-- SQL解法：
SELECT 
  HOUR(login_time) AS hour_of_day,
  COUNT(DISTINCT user_id) AS active_users,
  COUNT(*) AS total_visits,
  ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT user_id), 2) AS avg_visits_per_user
FROM user_logs
GROUP BY HOUR(login_time)
ORDER BY hour_of_day;

-- 找出最活跃时段：
SELECT 
  HOUR(login_time) AS peak_hour,
  COUNT(DISTINCT user_id) AS active_users
FROM user_logs
GROUP BY HOUR(login_time)
ORDER BY active_users DESC
LIMIT 1;

-- Pandas解法：
df['hour_of_day'] = pd.to_datetime(df['login_time']).dt.hour
result = df.groupby('hour_of_day').agg(
    active_users=('user_id', 'nunique'),
    total_visits=('id', 'count')
).reset_index()
result['avg_visits_per_user'] = (result['total_visits'] / result['active_users']).round(2)
result = result.sort_values('hour_of_day')

-- 关键知识点：
-- 1. HOUR()提取小时
-- 2. COUNT(DISTINCT) 去重计数
-- 3. 人均访问次数计算
-- 4. 时段分析方法`
  },
  {
    id: 31,
    industry: "ecommerce",
    title: "计算商品库存预警",
    description: "根据库存数量和销量计算预警",
    difficulty: "简单",
    tags: ["CASE WHEN", "条件判断", "库存管理", "预警"],
    scenario: `商品库存管理和预警。数据表：
- products表：商品ID(product_id)、商品名(product_name)、库存数量(stock)、安全库存(safety_stock)

问题：
1. 列出所有商品的库存情况
2. 标记库存状态：充足(>安全库存)、预警(≤安全库存)、缺货(=0)
3. 计算库存缺口（安全库存-当前库存）
4. 只显示需要补货的商品`,
    keyPoints: ["CASE WHEN", "条件判断", "计算字段", "WHERE过滤"],
    solution: `-- SQL解法：
SELECT 
  product_id,
  product_name,
  stock AS current_stock,
  safety_stock,
  CASE 
    WHEN stock = 0 THEN '缺货'
    WHEN stock <= safety_stock THEN '预警'
    ELSE '充足'
  END AS stock_status,
  CASE 
    WHEN stock < safety_stock THEN safety_stock - stock
    ELSE 0
  END AS stock_gap,
  CASE 
    WHEN stock = 0 THEN '紧急补货'
    WHEN stock <= safety_stock THEN '需要补货'
    ELSE '正常'
  END AS action_needed
FROM products
WHERE stock <= safety_stock
ORDER BY stock ASC;

-- 统计各状态商品数量：
SELECT 
  CASE 
    WHEN stock = 0 THEN '缺货'
    WHEN stock <= safety_stock THEN '预警'
    ELSE '充足'
  END AS stock_status,
  COUNT(*) AS product_count
FROM products
GROUP BY stock_status;

-- Pandas解法：
df['stock_status'] = df.apply(
    lambda x: '缺货' if x['stock'] == 0 
    else '预警' if x['stock'] <= x['safety_stock']
    else '充足',
    axis=1
)
df['stock_gap'] = df.apply(
    lambda x: max(0, x['safety_stock'] - x['stock']),
    axis=1
)
result = df[df['stock'] <= df['safety_stock']].sort_values('stock')

-- 关键知识点：
-- 1. CASE WHEN嵌套判断
-- 2. 计算派生字段
-- 3. 多级预警机制
-- 4. 业务规则实现`
  },
  {
    id: 32,
    industry: "finance",
    title: "计算用户账户余额",
    description: "根据充值和消费记录计算当前余额",
    difficulty: "简单",
    tags: ["SUM", "CASE WHEN", "余额计算", "流水统计"],
    scenario: `计算用户账户余额。数据表：
- transactions表：交易ID(id)、用户ID(user_id)、交易类型(type)、金额(amount)、交易时间(trans_time)
  type: 'recharge'(充值)、'consume'(消费)、'refund'(退款)

问题：
1. 计算每个用户的总充值、总消费、总退款
2. 计算当前账户余额
3. 统计交易次数
4. 只显示余额大于0的用户`,
    keyPoints: ["SUM", "CASE WHEN", "条件聚合", "余额计算"],
    solution: `-- SQL解法：
SELECT 
  user_id,
  SUM(CASE WHEN type = 'recharge' THEN amount ELSE 0 END) AS total_recharge,
  SUM(CASE WHEN type = 'consume' THEN amount ELSE 0 END) AS total_consume,
  SUM(CASE WHEN type = 'refund' THEN amount ELSE 0 END) AS total_refund,
  SUM(CASE WHEN type = 'recharge' THEN amount ELSE 0 END) +
  SUM(CASE WHEN type = 'refund' THEN amount ELSE 0 END) -
  SUM(CASE WHEN type = 'consume' THEN amount ELSE 0 END) AS current_balance,
  COUNT(*) AS trans_count
FROM transactions
GROUP BY user_id
HAVING current_balance > 0
ORDER BY current_balance DESC;

-- 使用正负金额的简化写法：
SELECT 
  user_id,
  SUM(CASE 
    WHEN type IN ('recharge', 'refund') THEN amount
    WHEN type = 'consume' THEN -amount
    ELSE 0
  END) AS current_balance,
  COUNT(*) AS trans_count
FROM transactions
GROUP BY user_id
HAVING current_balance > 0;

-- Pandas解法：
result = df.groupby('user_id').apply(lambda x: pd.Series({
    'total_recharge': x[x['type'] == 'recharge']['amount'].sum(),
    'total_consume': x[x['type'] == 'consume']['amount'].sum(),
    'total_refund': x[x['type'] == 'refund']['amount'].sum(),
    'trans_count': len(x)
})).reset_index()
result['current_balance'] = result['total_recharge'] + result['total_refund'] - result['total_consume']
result = result[result['current_balance'] > 0]

-- 关键知识点：
-- 1. SUM + CASE WHEN条件求和
-- 2. 余额计算公式
-- 3. HAVING过滤聚合结果
-- 4. 多类型交易统计`
  },
  {
    id: 33,
    industry: "internet",
    title: "统计文章阅读完成率",
    description: "计算文章的阅读完成率和平均阅读时长",
    difficulty: "简单",
    tags: ["平均值", "百分比", "阅读分析", "完成率"],
    scenario: `分析文章阅读情况。数据表：
- article_reads表：阅读记录ID(id)、文章ID(article_id)、用户ID(user_id)、阅读时长(read_duration)、是否读完(is_finished)

问题：
1. 统计每篇文章的总阅读次数
2. 计算阅读完成率（读完人数/总阅读人数）
3. 计算平均阅读时长
4. 按完成率降序排列`,
    keyPoints: ["AVG", "百分比计算", "SUM", "完成率"],
    solution: `-- SQL解法：
SELECT 
  article_id,
  COUNT(*) AS total_reads,
  SUM(CASE WHEN is_finished = 1 THEN 1 ELSE 0 END) AS finished_reads,
  ROUND(SUM(CASE WHEN is_finished = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS completion_rate,
  ROUND(AVG(read_duration), 2) AS avg_read_duration,
  COUNT(DISTINCT user_id) AS unique_readers
FROM article_reads
GROUP BY article_id
HAVING total_reads >= 10  -- 过滤样本量太小的文章
ORDER BY completion_rate DESC;

-- 找出高质量文章（完成率>70%且阅读量>100）：
SELECT 
  article_id,
  COUNT(*) AS total_reads,
  ROUND(SUM(CASE WHEN is_finished = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS completion_rate
FROM article_reads
GROUP BY article_id
HAVING COUNT(*) > 100 
  AND SUM(CASE WHEN is_finished = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) > 70
ORDER BY total_reads DESC;

-- Pandas解法：
result = df.groupby('article_id').agg(
    total_reads=('id', 'count'),
    finished_reads=('is_finished', 'sum'),
    avg_read_duration=('read_duration', 'mean'),
    unique_readers=('user_id', 'nunique')
).reset_index()
result['completion_rate'] = (result['finished_reads'] / result['total_reads'] * 100).round(2)
result = result[result['total_reads'] >= 10]
result = result.sort_values('completion_rate', ascending=False)

-- 关键知识点：
-- 1. 完成率计算公式
-- 2. AVG计算平均值
-- 3. COUNT(DISTINCT)去重计数
-- 4. HAVING多条件过滤`
  },
  {
    id: 34,
    industry: "ecommerce",
    title: "查询近7天每日新增用户",
    description: "统计最近一周的每日新增用户趋势",
    difficulty: "简单",
    tags: ["日期范围", "趋势分析", "DATE", "最近N天"],
    scenario: `监控最近一周的用户增长情况。数据表：
- users表：用户ID(user_id)、用户名(username)、注册时间(register_date)、注册渠道(channel)

问题：
1. 统计最近7天每天的新增用户数
2. 按日期升序排列
3. 显示注册日期和新增人数
4. 计算7天总新增`,
    keyPoints: ["DATE", "日期范围", "BETWEEN", "时间序列"],
    solution: `-- SQL解法：
SELECT 
  DATE(register_date) AS reg_date,
  COUNT(*) AS new_users
FROM users
WHERE register_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
GROUP BY DATE(register_date)
ORDER BY reg_date ASC;

-- 包含总计：
SELECT 
  DATE(register_date) AS reg_date,
  COUNT(*) AS new_users
FROM users
WHERE register_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
GROUP BY DATE(register_date)
UNION ALL
SELECT 
  '总计' AS reg_date,
  COUNT(*) AS new_users
FROM users
WHERE register_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
ORDER BY reg_date;

-- 按渠道分组统计：
SELECT 
  DATE(register_date) AS reg_date,
  channel,
  COUNT(*) AS new_users
FROM users
WHERE register_date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
GROUP BY DATE(register_date), channel
ORDER BY reg_date, channel;

-- Pandas解法：
df['register_date'] = pd.to_datetime(df['register_date'])
last_7_days = pd.Timestamp.now() - pd.Timedelta(days=7)
recent = df[df['register_date'] >= last_7_days]
result = recent.groupby(recent['register_date'].dt.date).size().reset_index(name='new_users')
result.columns = ['reg_date', 'new_users']
result = result.sort_values('reg_date')

-- 关键知识点：
-- 1. DATE_SUB计算N天前
-- 2. CURRENT_DATE当前日期
-- 3. BETWEEN日期范围
-- 4. UNION ALL合并结果`
  },
  {
    id: 35,
    industry: "internet",
    title: "找出最受欢迎的标签",
    description: "统计内容标签的使用频率",
    difficulty: "简单",
    tags: ["字符串处理", "标签统计", "TOP N", "流行度"],
    scenario: `分析内容标签的流行度。数据表：
- contents表：内容ID(content_id)、标题(title)、标签(tags)、点赞数(likes)
  tags字段格式：'tag1,tag2,tag3'（逗号分隔）

问题：
1. 统计每个标签的使用次数
2. 找出使用次数TOP10的标签
3. 计算每个标签下内容的平均点赞数
4. 按使用次数降序排列

注：此题考查字符串拆分，不同数据库实现方式不同`,
    keyPoints: ["字符串拆分", "COUNT", "GROUP BY", "标签分析"],
    solution: `-- MySQL解法（假设tags已经标准化）：
-- 如果tags是独立表：
SELECT 
  t.tag_name,
  COUNT(DISTINCT ct.content_id) AS usage_count,
  AVG(c.likes) AS avg_likes
FROM content_tags ct
JOIN tags t ON ct.tag_id = t.tag_id
JOIN contents c ON ct.content_id = c.content_id
GROUP BY t.tag_name
ORDER BY usage_count DESC
LIMIT 10;

-- 如果使用JSON数组存储标签（MySQL 5.7+）：
-- 假设tags字段是JSON数组格式
SELECT 
  tag,
  COUNT(*) AS usage_count
FROM contents,
  JSON_TABLE(tags, '$[*]' COLUMNS (tag VARCHAR(50) PATH '$')) AS jt
GROUP BY tag
ORDER BY usage_count DESC
LIMIT 10;

-- Pandas解法（推荐）：
# 拆分标签
df['tag_list'] = df['tags'].str.split(',')
tags_expanded = df.explode('tag_list')
tags_expanded['tag_list'] = tags_expanded['tag_list'].str.strip()

# 统计标签
result = tags_expanded.groupby('tag_list').agg(
    usage_count=('content_id', 'count'),
    avg_likes=('likes', 'mean')
).reset_index()
result.columns = ['tag_name', 'usage_count', 'avg_likes']
result = result.sort_values('usage_count', ascending=False).head(10)

-- 关键知识点：
-- 1. 字符串拆分方法
-- 2. 一对多关系处理
-- 3. JSON_TABLE函数（MySQL）
-- 4. Pandas的explode方法`
  },
  {
    id: 36,
    industry: "ecommerce",
    title: "【面试高频】GMV下降如何分析？",
    description: "电商平台GMV突然下降，如何系统性诊断问题并提出解决方案",
    difficulty: "中等",
    tags: ["GMV分析", "指标拆解", "归因分析", "面试必备"],
    scenario: `某电商平台本月GMV环比下降15%，老板要求找出原因并给出解决方案。

问题：
1. 如何系统性拆解GMV下降的原因？
2. 从哪些维度进行分析？
3. 如何判断是哪个环节出了问题？
4. 给出具体的分析步骤和数据验证方法`,
    keyPoints: ["指标拆解", "多维分析", "归因定位", "解决方案"],
    solution: `-- 分析框架（面试回答模板）：

第一步：拆解指标公式
GMV = 流量 × 转化率 × 客单价
进一步拆解：
- 流量 = 新用户流量 + 老用户流量
- 转化率 = 下单用户数 / 访问用户数
- 客单价 = 订单总额 / 订单数

第二步：多维度对比分析
1. 时间维度：与上月、去年同期对比
2. 渠道维度：不同流量来源（自然、广告、社交）
3. 类目维度：不同商品类别表现
4. 地域维度：不同区域市场
5. 用户维度：新老用户、不同等级

第三步：定位问题环节
-- SQL示例：计算各环节数据
WITH monthly_metrics AS (
  SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(DISTINCT user_id) AS visitors,
    COUNT(DISTINCT CASE WHEN has_order = 1 THEN user_id END) AS buyers,
    COUNT(DISTINCT order_id) AS orders,
    SUM(amount) AS gmv
  FROM user_behavior
  GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT 
  month,
  visitors,
  buyers,
  ROUND(buyers * 100.0 / visitors, 2) AS conversion_rate,
  ROUND(gmv / orders, 2) AS avg_order_value,
  gmv
FROM monthly_metrics
ORDER BY month DESC
LIMIT 2;

第四步：根因分析
可能原因及验证方法：
1. 流量下降 → 检查广告投放、SEO排名、活动力度
2. 转化率下降 → 检查页面改版、商品上下架、价格变化
3. 客单价下降 → 检查促销活动、商品结构变化

第五步：给出解决方案
- 短期：恢复流量投放、上线促销活动
- 中期：优化转化路径、调整商品结构
- 长期：建立监控预警体系

-- 面试加分项：
1. 先排除外部因素（节假日、行业波动）
2. 量化每个因素的影响程度
3. 给出可执行的优化方案
4. 建立长效监控机制`,
    mindmap: {
      title: "GMV下降诊断思维导图",
      framework: "问题诊断分析框架（5Why+鱼骨图）",
      nodes: [
        {
          level: 1,
          title: "📊 第一步：明确问题",
          icon: Target,
          content: "量化问题规模和影响",
          children: [
            { text: "GMV下降幅度：15%", color: "text-red-600" },
            { text: "下降时间：本月 vs 上月", color: "text-gray-700" },
            { text: "影响金额：具体损失多少", color: "text-orange-600" },
            { text: "排除外部因素：节假日、大促期", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 第二步：拆解指标",
          icon: Layers,
          content: "GMV = 流量 × 转化率 × 客单价",
          children: [
            { text: "流量：UV、PV、访问时长", color: "text-blue-600" },
            { text: "转化率：浏览→加购→下单", color: "text-green-600" },
            { text: "客单价：商品价格×购买数量", color: "text-purple-600" },
            { text: "计算各指标环比变化", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📐 第三步：多维拆解",
          icon: Filter,
          content: "从不同维度切分数据",
          children: [
            { text: "时间维度：日/周/月趋势", color: "text-blue-600" },
            { text: "渠道维度：自然/广告/社交", color: "text-green-600" },
            { text: "类目维度：各品类表现", color: "text-purple-600" },
            { text: "用户维度：新老客/高低价值", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🎯 第四步：定位问题",
          icon: Search,
          content: "找出贡献下降的主要维度",
          children: [
            { text: "对比各维度变化幅度", color: "text-gray-700" },
            { text: "计算贡献度：下降×占比", color: "text-blue-600" },
            { text: "找出Top3问题维度", color: "text-red-600" },
            { text: "示例：某类目下降30%且占比40%", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🔬 第五步：深挖根因",
          icon: AlertCircle,
          content: "为什么这个维度下降？",
          children: [
            { text: "流量下降：广告预算削减？竞品抢量？", color: "text-red-600" },
            { text: "转化下降：页面改版？商品缺货？", color: "text-orange-600" },
            { text: "客单价降：促销力度大？低价品占比高？", color: "text-yellow-600" },
            { text: "用5Why法追问到底层原因", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "📊 第六步：数据验证",
          icon: BarChart3,
          content: "用数据证实或证伪假设",
          children: [
            { text: "假设1：流量下降 → 查看流量趋势", color: "text-blue-600" },
            { text: "假设2：价格变化 → 对比历史价格", color: "text-green-600" },
            { text: "假设3：竞品活动 → 查看市场数据", color: "text-purple-600" },
            { text: "量化每个因素的影响", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "💡 第七步：提出方案",
          icon: Lightbulb,
          content: "分短中长期给出建议",
          children: [
            { text: "短期（1周）：恢复流量、上线活动", color: "text-red-600" },
            { text: "中期（1月）：优化转化路径", color: "text-orange-600" },
            { text: "长期（3月）：建立预警机制", color: "text-green-600" },
            { text: "每个方案都要有预期效果", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "🎬 第八步：监控复盘",
          icon: CheckCircle2,
          content: "跟踪方案效果并迭代",
          children: [
            { text: "建立日报监控GMV走势", color: "text-blue-600" },
            { text: "A/B测试验证优化效果", color: "text-green-600" },
            { text: "定期复盘总结经验", color: "text-purple-600" },
            { text: "形成标准化分析流程", color: "text-orange-600" }
          ]
        }
      ]
    }
  },
  {
    id: 37,
    industry: "internet",
    title: "【面试高频】如何提升用户留存率？",
    description: "产品上线后留存率不理想，如何分析并优化用户留存",
    difficulty: "中等",
    tags: ["留存分析", "用户行为", "产品优化", "面试热门"],
    scenario: `某App次日留存率只有30%，7日留存率15%，远低于行业平均水平。

问题：
1. 如何定义和计算留存率？
2. 从哪些角度分析留存率低的原因？
3. 如何找出流失用户的共同特征？
4. 提出具体的提升留存率的策略`,
    keyPoints: ["留存率计算", "流失分析", "用户分层", "增长策略"],
    solution: `-- 面试回答框架：

一、留存率定义和计算
-- 次日留存率
SELECT 
  DATE(register_date) AS cohort_day,
  COUNT(DISTINCT user_id) AS new_users,
  COUNT(DISTINCT CASE 
    WHEN DATEDIFF(active_date, register_date) = 1 THEN user_id 
  END) AS day1_retained,
  ROUND(COUNT(DISTINCT CASE 
    WHEN DATEDIFF(active_date, register_date) = 1 THEN user_id 
  END) * 100.0 / COUNT(DISTINCT user_id), 2) AS day1_retention_rate
FROM user_activity
GROUP BY DATE(register_date);

-- 7日留存曲线
SELECT 
  days_since_register,
  COUNT(DISTINCT user_id) AS retained_users,
  retention_rate
FROM (
  SELECT 
    u.user_id,
    DATEDIFF(a.active_date, u.register_date) AS days_since_register
  FROM users u
  LEFT JOIN activities a ON u.user_id = a.user_id
  WHERE DATEDIFF(a.active_date, u.register_date) BETWEEN 0 AND 7
) cohort
GROUP BY days_since_register
ORDER BY days_since_register;

二、多维度分析留存问题

1. 用户维度分析：
- 渠道来源：不同渠道用户留存差异
- 用户画像：年龄、地域、设备
- 注册时间：不同时期新用户表现

2. 行为维度分析：
-- 对比留存用户 vs 流失用户行为
SELECT 
  CASE WHEN is_retained = 1 THEN '留存用户' ELSE '流失用户' END AS user_type,
  AVG(sessions_day1) AS avg_sessions,
  AVG(duration_day1) AS avg_duration,
  AVG(features_used) AS avg_features
FROM user_first_day_behavior
GROUP BY user_type;

3. 产品维度分析：
- 核心功能使用率
- 新手引导完成率
- Aha时刻触达率

三、流失用户画像
-- 找出流失用户共同特征
WITH churned_users AS (
  SELECT user_id
  FROM users
  WHERE DATEDIFF(CURRENT_DATE, last_active_date) > 7
)
SELECT 
  u.channel,
  u.device_type,
  AVG(b.session_count) AS avg_sessions,
  AVG(b.duration) AS avg_duration,
  COUNT(*) AS churned_count
FROM churned_users c
JOIN users u ON c.user_id = u.user_id
JOIN user_behavior b ON c.user_id = b.user_id
GROUP BY u.channel, u.device_type
ORDER BY churned_count DESC;

四、提升策略（AARRR模型）

1. Activation（激活优化）
- 优化新手引导流程
- 降低首次使用门槛
- 快速展示核心价值

2. Retention（留存优化）
- Push推送唤醒（D1/D3/D7）
- 个性化内容推荐
- 任务体系引导
- 社交关系沉淀

3. 分层运营策略：
-- 高价值用户：VIP特权、专属客服
-- 中价值用户：活动激励、优惠券
-- 低价值用户：内容推荐、兴趣培养

五、A/B测试验证
- 对照组：现有流程
- 实验组：优化后流程
- 观察指标：次日留存、7日留存、活跃度

-- 面试加分项：
1. 结合漏斗分析找流失环节
2. 用Cohort分析看不同批次用户
3. 量化每个优化点的预期提升
4. 给出可落地的产品需求文档`,
    mindmap: {
      title: "用户留存分析思维导图",
      framework: "AARRR增长黑客模型",
      nodes: [
        {
          level: 1,
          title: "📊 定义留存指标",
          icon: BarChart3,
          content: "明确留存的计算口径",
          children: [
            { text: "次日留存：D1活跃/D0新增", color: "text-blue-600" },
            { text: "7日留存：D7活跃/D0新增", color: "text-green-600" },
            { text: "30日留存：D30活跃/D0新增", color: "text-purple-600" },
            { text: "活跃定义：打开App或完成核心动作", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 现状诊断",
          icon: Search,
          content: "与基准对比找差距",
          children: [
            { text: "当前：次日30%、7日15%", color: "text-red-600" },
            { text: "行业：次日40%、7日20%", color: "text-green-600" },
            { text: "竞品：次日45%、7日25%", color: "text-blue-600" },
            { text: "差距：有10个百分点提升空间", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📐 多维拆解",
          icon: Layers,
          content: "从不同维度找原因",
          children: [
            { text: "渠道维度：各渠道留存差异", color: "text-blue-600" },
            { text: "时间维度：留存曲线走势", color: "text-green-600" },
            { text: "行为维度：留存用户行为特征", color: "text-purple-600" },
            { text: "功能维度：核心功能使用率", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "👥 用户分层",
          icon: Users,
          content: "识别不同用户群体",
          children: [
            { text: "高留存用户：找Aha时刻", color: "text-green-600" },
            { text: "低留存用户：找流失原因", color: "text-red-600" },
            { text: "边缘用户：重点挽留对象", color: "text-yellow-600" },
            { text: "对比行为差异找规律", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "🎯 找Aha时刻",
          icon: Target,
          content: "用户感受到产品价值的时刻",
          children: [
            { text: "Facebook：7天加10个好友", color: "text-blue-600" },
            { text: "Twitter：关注30个账号", color: "text-cyan-600" },
            { text: "Dropbox：上传1个文件", color: "text-green-600" },
            { text: "分析：哪个动作与留存强相关", color: "text-purple-600" }
          ]
        },
        {
          level: 1,
          title: "🛠️ 优化策略",
          icon: Lightbulb,
          content: "针对性提升方案",
          children: [
            { text: "激活优化：新手引导、首次体验", color: "text-green-600" },
            { text: "内容优化：个性化推荐、精准匹配", color: "text-blue-600" },
            { text: "功能优化：降低使用门槛", color: "text-purple-600" },
            { text: "运营优化：Push、活动、激励", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📈 增长手段",
          icon: TrendingUp,
          content: "具体执行方法",
          children: [
            { text: "Push推送：D1/D3/D7关键节点", color: "text-blue-600" },
            { text: "任务体系：签到、成就、等级", color: "text-green-600" },
            { text: "社交沉淀：好友、内容、互动", color: "text-purple-600" },
            { text: "利益绑定：优惠券、会员权益", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🎬 验证迭代",
          icon: CheckCircle2,
          content: "A/B测试+数据监控",
          children: [
            { text: "小流量测试验证效果", color: "text-blue-600" },
            { text: "监控核心指标变化", color: "text-green-600" },
            { text: "快速迭代优化方案", color: "text-purple-600" },
            { text: "形成留存提升方法论", color: "text-orange-600" }
          ]
        }
      ]
    }
  },
  {
    id: 38,
    industry: "ecommerce",
    title: "【面试高频】如何评估营销活动效果？",
    description: "大促活动结束后，如何全面评估活动ROI和效果",
    difficulty: "中等",
    tags: ["活动评估", "ROI分析", "营销效果", "面试必问"],
    scenario: `618大促活动结束，投入了500万营销费用，GMV达到5000万。需要评估活动效果。

问题：
1. 如何全面评估活动效果？不只是ROI
2. 如何判断GMV增长是否真实有效？
3. 如何区分活动带来的增量 vs 自然增长？
4. 给出一个完整的活动复盘报告框架`,
    keyPoints: ["ROI计算", "增量分析", "归因模型", "活动复盘"],
    solution: `-- 面试标准答案框架：

一、核心指标体系

1. 财务指标：
-- ROI计算
SELECT 
  '活动ROI' AS metric,
  SUM(gmv) AS total_gmv,
  SUM(marketing_cost) AS total_cost,
  (SUM(gmv) - SUM(marketing_cost) - SUM(product_cost)) AS profit,
  ROUND((SUM(gmv) - SUM(marketing_cost) - SUM(product_cost)) / SUM(marketing_cost), 2) AS roi
FROM campaign_orders
WHERE campaign_id = '618';

2. 流量指标：
- UV、PV、点击率
- 各渠道流量占比
- 流量成本（CPC、CPM）

3. 转化指标：
-- 转化漏斗
SELECT 
  stage,
  COUNT(DISTINCT user_id) AS users,
  ROUND(COUNT(DISTINCT user_id) * 100.0 / 
    LAG(COUNT(DISTINCT user_id)) OVER (ORDER BY stage_order), 2) AS conversion_rate
FROM (
  SELECT user_id, '曝光' AS stage, 1 AS stage_order FROM campaign_exposure
  UNION ALL
  SELECT user_id, '点击' AS stage, 2 FROM campaign_click
  UNION ALL
  SELECT user_id, '加购' AS stage, 3 FROM campaign_cart
  UNION ALL
  SELECT user_id, '下单' AS stage, 4 FROM campaign_order
) funnel
GROUP BY stage, stage_order
ORDER BY stage_order;

4. 用户指标：
- 新客占比、老客复购率
- 客单价、购买件数
- 用户满意度

二、增量分析（最关键！）

问题：如何证明GMV增长是活动带来的？

方法1：同比对比
-- 对比去年同期
SELECT 
  YEAR(order_date) AS year,
  SUM(gmv) AS total_gmv,
  COUNT(DISTINCT user_id) AS buyers
FROM orders
WHERE MONTH(order_date) = 6 AND DAY(order_date) BETWEEN 16 AND 20
GROUP BY YEAR(order_date);

方法2：对照组对比
-- A组参加活动，B组不参加活动
SELECT 
  experiment_group,
  COUNT(DISTINCT user_id) AS users,
  SUM(amount) AS gmv,
  AVG(amount) AS avg_amount
FROM ab_test_orders
WHERE test_id = '618_impact'
GROUP BY experiment_group;

方法3：反事实推断
-- 预测没有活动的GMV（基于历史趋势）
WITH baseline AS (
  SELECT 
    AVG(daily_gmv) AS expected_gmv
  FROM daily_metrics
  WHERE date BETWEEN '2024-05-16' AND '2024-06-15'
    AND is_campaign_day = 0
)
SELECT 
  actual_gmv - expected_gmv AS incremental_gmv,
  (actual_gmv - expected_gmv) / marketing_cost AS incremental_roi
FROM (
  SELECT SUM(gmv) AS actual_gmv FROM orders WHERE campaign_date = '2024-06-18'
) actual
CROSS JOIN baseline;

三、多维拆解分析

1. 渠道效果对比：
-- 各渠道ROI
SELECT 
  channel,
  SUM(gmv) AS channel_gmv,
  SUM(cost) AS channel_cost,
  ROUND(SUM(gmv) / SUM(cost), 2) AS channel_roi,
  RANK() OVER (ORDER BY SUM(gmv) / SUM(cost) DESC) AS roi_rank
FROM campaign_channel_performance
GROUP BY channel;

2. 商品类目分析：
- 哪些类目卖得好？
- 哪些类目利润高？
- 哪些类目拉新效果好？

3. 用户分层分析：
-- 新老客表现
SELECT 
  CASE 
    WHEN first_order_date = campaign_date THEN '新客'
    ELSE '老客'
  END AS user_type,
  COUNT(DISTINCT user_id) AS user_count,
  SUM(amount) AS gmv,
  AVG(amount) AS avg_amount
FROM campaign_orders
GROUP BY user_type;

四、问题识别

1. 负面指标：
- 退货率是否上升？
- 利润率是否下降？
- 是否有刷单作弊？

2. 后续影响：
-- 活动后用户留存
SELECT 
  DATEDIFF(next_order_date, campaign_date) AS days_since_campaign,
  COUNT(DISTINCT user_id) AS retained_users,
  retention_rate
FROM campaign_user_retention
GROUP BY days_since_campaign
ORDER BY days_since_campaign;

五、复盘报告框架

1. 活动概况：目标、预算、实际执行
2. 核心数据：GMV、ROI、用户数、转化率
3. 增量分析：真实增量GMV、增量用户
4. 多维拆解：渠道、类目、用户、时段
5. 亮点与不足：做得好的和需改进的
6. 经验沉淀：可复用的方法和避坑指南
7. 后续行动：下次活动的优化建议

-- 面试加分点：
1. 提到"增量分析"而非只看绝对值
2. 考虑长期影响（如用户留存、品牌）
3. 给出可量化的优化建议
4. 建立活动效果评估标准`,
    mindmap: {
      title: "营销活动评估思维导图",
      framework: "活动评估四维模型（效果-效率-质量-健康度）",
      nodes: [
        {
          level: 1,
          title: "🎯 活动目标",
          icon: Target,
          content: "明确活动的核心目标",
          children: [
            { text: "主目标：GMV、新客、品牌", color: "text-blue-600" },
            { text: "次目标：清库存、拉新品", color: "text-green-600" },
            { text: "预算：投入500万", color: "text-purple-600" },
            { text: "预期ROI：1:10", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📊 效果评估",
          icon: BarChart3,
          content: "目标达成情况",
          children: [
            { text: "GMV：5000万（目标4000万）✓", color: "text-green-600" },
            { text: "新客：10万（目标8万）✓", color: "text-green-600" },
            { text: "ROI：9（目标10）△", color: "text-yellow-600" },
            { text: "完成率：125% GMV、80% 新客", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "💰 效率分析",
          icon: TrendingUp,
          content: "投入产出比",
          children: [
            { text: "获客成本：50元/人", color: "text-blue-600" },
            { text: "转化成本：100元/单", color: "text-green-600" },
            { text: "渠道ROI：信息流9、搜索12", color: "text-purple-600" },
            { text: "时段ROI：20-22点最高", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 增量分析",
          icon: Search,
          content: "真实增量vs自然增长",
          children: [
            { text: "同比去年618：+60%", color: "text-green-600" },
            { text: "环比平时：+300%", color: "text-blue-600" },
            { text: "对照组：活动组多50% GMV", color: "text-purple-600" },
            { text: "估算真实增量：3000万", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📐 多维拆解",
          icon: Layers,
          content: "不同维度表现",
          children: [
            { text: "渠道：信息流占50%、搜索30%", color: "text-blue-600" },
            { text: "类目：3C最好、服饰次之", color: "text-green-600" },
            { text: "用户：新客占40%、老客复购25%", color: "text-purple-600" },
            { text: "时段：晚上流量占60%", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "⚠️ 质量检验",
          icon: AlertCircle,
          content: "订单质量和健康度",
          children: [
            { text: "退货率：12%（正常10%）△", color: "text-yellow-600" },
            { text: "利润率：15%（正常20%）△", color: "text-orange-600" },
            { text: "作弊订单：0.5%（可接受）✓", color: "text-green-600" },
            { text: "客诉率：2%（正常1.5%）△", color: "text-red-600" }
          ]
        },
        {
          level: 1,
          title: "📈 后续影响",
          icon: TrendingUp,
          content: "活动后的长期效应",
          children: [
            { text: "新客7日留存：30%", color: "text-blue-600" },
            { text: "活动后复购率：20%", color: "text-green-600" },
            { text: "品牌搜索量：+40%", color: "text-purple-600" },
            { text: "用户满意度：4.5分", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "💡 优化建议",
          icon: Lightbulb,
          content: "下次活动改进点",
          children: [
            { text: "减少低ROI渠道投放", color: "text-blue-600" },
            { text: "提升高利润商品占比", color: "text-green-600" },
            { text: "加强活动后用户留存", color: "text-purple-600" },
            { text: "建立实时监控看板", color: "text-orange-600" }
          ]
        }
      ]
    }
  },
  {
    id: 39,
    industry: "internet",
    title: "【面试高频】A/B测试怎么做？",
    description: "产品改版需要A/B测试验证，如何设计实验和分析结果",
    difficulty: "中等",
    tags: ["AB测试", "实验设计", "假设检验", "面试热门"],
    scenario: `产品团队想要改版首页推荐算法，需要通过A/B测试验证新算法是否更好。

问题：
1. 如何设计A/B测试？需要注意哪些问题？
2. 需要多大的样本量？测试多长时间？
3. 如何判断实验结果是否显著？
4. 如何避免A/B测试的常见陷阱？`,
    keyPoints: ["实验设计", "样本量计算", "统计检验", "陷阱规避"],
    solution: `-- A/B测试完整流程（面试必背）：

一、实验设计（Before Testing）

1. 明确目标和假设：
原假设H0：新算法与旧算法效果无差异
备择假设H1：新算法效果优于旧算法
核心指标：点击率、停留时长、转化率

2. 样本量计算：
-- 公式：n = (Zα + Zβ)² × 2 × p × (1-p) / (p1-p0)²
-- 参数设置：
- 显著性水平α = 0.05（置信度95%）
- 统计功效1-β = 0.8（检验力80%）
- 基准转化率p0 = 5%
- 最小可检测差异MDE = 0.5%（期望提升到5.5%）

-- Python计算样本量
from scipy.stats import norm
import math

def calculate_sample_size(p0, mde, alpha=0.05, power=0.8):
    p1 = p0 + mde
    z_alpha = norm.ppf(1 - alpha/2)
    z_beta = norm.ppf(power)
    n = ((z_alpha + z_beta)**2 * 2 * p0 * (1-p0)) / (mde**2)
    return math.ceil(n)

n = calculate_sample_size(0.05, 0.005)
print(f"每组需要样本量：{n}")  # 约31,000

3. 实验时长：
-- 考虑因素：
- 样本量需求：每组3万人
- 周期性：至少1周（覆盖工作日+周末）
- 流量分配：50% vs 50%
- 日均UV：10万 → 需要约6天

4. 分流策略：
-- 用户ID哈希分组（保证稳定性）
SELECT 
  user_id,
  CASE 
    WHEN MOD(CONV(MD5(user_id), 16, 10), 2) = 0 THEN 'A'
    ELSE 'B'
  END AS group
FROM users;

-- 分流原则：
- 随机性：保证AB组用户无偏差
- 稳定性：同一用户始终在同一组
- 互斥性：用户只能在一个组

二、实验执行（During Testing）

1. 分组平衡性检验：
-- 检查AB组用户特征是否均衡
SELECT 
  experiment_group,
  COUNT(DISTINCT user_id) AS user_count,
  AVG(age) AS avg_age,
  AVG(historical_orders) AS avg_orders,
  COUNT(CASE WHEN gender = 'M' THEN 1 END) * 100.0 / COUNT(*) AS male_pct
FROM ab_test_users
GROUP BY experiment_group;

2. 实时监控：
- 样本量是否达标
- 是否有异常流量
- 核心指标趋势

3. SRM检查（Sample Ratio Mismatch）：
-- 检查分流比例是否符合预期
WITH group_counts AS (
  SELECT 
    experiment_group,
    COUNT(*) AS actual_count,
    COUNT(*) * 1.0 / SUM(COUNT(*)) OVER () AS actual_ratio
  FROM ab_test_users
  GROUP BY experiment_group
)
SELECT 
  experiment_group,
  actual_count,
  ROUND(actual_ratio, 4) AS actual_ratio,
  0.5 AS expected_ratio,
  ABS(actual_ratio - 0.5) AS deviation
FROM group_counts;

三、结果分析（After Testing）

1. 核心指标对比：
SELECT 
  experiment_group,
  COUNT(DISTINCT user_id) AS users,
  COUNT(DISTINCT CASE WHEN clicked = 1 THEN user_id END) AS clickers,
  ROUND(COUNT(DISTINCT CASE WHEN clicked = 1 THEN user_id END) * 100.0 / 
    COUNT(DISTINCT user_id), 2) AS ctr
FROM ab_test_results
GROUP BY experiment_group;

-- 结果示例：
-- A组（对照）：CTR = 5.0%
-- B组（实验）：CTR = 5.6%
-- 提升：+0.6个百分点（+12%相对提升）

2. 统计显著性检验（Z检验）：
-- 公式：Z = (p1 - p0) / sqrt(p*(1-p)*(1/n1 + 1/n0))
WITH metrics AS (
  SELECT 
    experiment_group,
    COUNT(*) AS n,
    SUM(CASE WHEN clicked = 1 THEN 1 ELSE 0 END) AS successes,
    SUM(CASE WHEN clicked = 1 THEN 1 ELSE 0 END) * 1.0 / COUNT(*) AS p
  FROM ab_test_results
  GROUP BY experiment_group
)
SELECT 
  a.p AS p_control,
  b.p AS p_treatment,
  (b.p - a.p) / SQRT(
    ((a.successes + b.successes) * 1.0 / (a.n + b.n)) * 
    (1 - (a.successes + b.successes) * 1.0 / (a.n + b.n)) * 
    (1.0/a.n + 1.0/b.n)
  ) AS z_score,
  CASE 
    WHEN ABS((b.p - a.p) / SQRT(...) ) >= 1.96 THEN '显著（p<0.05）'
    ELSE '不显著'
  END AS significance
FROM metrics a, metrics b
WHERE a.experiment_group = 'A' AND b.experiment_group = 'B';

-- Z值 > 1.96：显著（p<0.05，95%置信度）
-- Z值 > 2.58：高度显著（p<0.01，99%置信度）

3. 置信区间：
-- B组CTR的95%置信区间
-- CI = p ± 1.96 × sqrt(p(1-p)/n)
-- 5.6% ± 1.96 × sqrt(0.056×0.944/31000) = [5.5%, 5.7%]

4. 分层分析（避免辛普森悖论）：
-- 按用户等级分层
SELECT 
  user_level,
  experiment_group,
  ROUND(AVG(conversion_rate), 4) AS avg_conversion
FROM ab_test_by_segment
GROUP BY user_level, experiment_group
ORDER BY user_level, experiment_group;

四、常见陷阱及规避

1. 样本量不足 → 提前计算，确保足够power
2. 测试时间太短 → 至少覆盖1个完整周期
3. 多次查看peeking → 设定固定结束时间
4. 只看显著性不看业务价值 → 综合评估
5. 忽略长期影响 → 观察后续指标
6. 辛普森悖论 → 必须做分层分析

五、决策建议

1. 统计显著 + 业务有意义 → 推全
2. 统计显著但提升很小 → 权衡成本再决定
3. 不显著 → 不推全，继续优化
4. 负面影响 → 回滚

-- 面试加分点：
1. 提到样本量计算和统计功效
2. 知道SRM、辛普森悖论等陷阱
3. 强调分层分析的重要性
4. 给出完整的决策逻辑`,
    mindmap: {
      title: "A/B测试完整流程",
      framework: "科学实验方法论",
      nodes: [
        {
          level: 1,
          title: "🎯 第一步：明确目标",
          icon: Target,
          content: "假设驱动的实验设计",
          children: [
            { text: "提出假设：新算法提升CTR", color: "text-blue-600" },
            { text: "核心指标：点击率、停留时长", color: "text-green-600" },
            { text: "预期提升：+10%以上", color: "text-purple-600" },
            { text: "决策标准：显著+有业务价值", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📊 第二步：样本量计算",
          icon: BarChart3,
          content: "确保实验有足够检验力",
          children: [
            { text: "基准值：当前CTR 5%", color: "text-gray-700" },
            { text: "MDE：最小可检测差异0.5%", color: "text-blue-600" },
            { text: "α=0.05, β=0.2（power=80%）", color: "text-green-600" },
            { text: "每组需要3.1万样本", color: "text-purple-600" }
          ]
        },
        {
          level: 1,
          title: "⚙️ 第三步：分流设计",
          icon: GitBranch,
          content: "随机且稳定的分组",
          children: [
            { text: "用户ID哈希分组", color: "text-blue-600" },
            { text: "50% vs 50%分流", color: "text-green-600" },
            { text: "保证用户稳定性", color: "text-purple-600" },
            { text: "避免污染：互斥分流", color: "text-red-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 第四步：平衡性检验",
          icon: Search,
          content: "确保AB组用户可比",
          children: [
            { text: "样本量：A组3.1万 vs B组3.1万 ✓", color: "text-green-600" },
            { text: "年龄分布：无显著差异 ✓", color: "text-green-600" },
            { text: "性别比例：无显著差异 ✓", color: "text-green-600" },
            { text: "历史行为：无显著差异 ✓", color: "text-green-600" }
          ]
        },
        {
          level: 1,
          title: "📈 第五步：指标监控",
          icon: TrendingUp,
          content: "实时跟踪实验进展",
          children: [
            { text: "样本量达标情况", color: "text-blue-600" },
            { text: "核心指标趋势", color: "text-green-600" },
            { text: "异常流量检测", color: "text-red-600" },
            { text: "SRM检查（分流比例）", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📐 第六步：假设检验",
          icon: Layers,
          content: "统计显著性判断",
          children: [
            { text: "A组CTR：5.0%", color: "text-gray-600" },
            { text: "B组CTR：5.6%（+12%）", color: "text-green-600" },
            { text: "Z值：3.2（p<0.01）✓", color: "text-green-600" },
            { text: "95%置信区间：[5.5%, 5.7%]", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "⚠️ 第七步：分层分析",
          icon: AlertCircle,
          content: "避免辛普森悖论",
          children: [
            { text: "按用户等级分层", color: "text-blue-600" },
            { text: "按设备类型分层", color: "text-green-600" },
            { text: "按时段分层", color: "text-purple-600" },
            { text: "确保各层都是正向", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🎬 第八步：决策上线",
          icon: CheckCircle2,
          content: "综合评估做决策",
          children: [
            { text: "统计显著：是 ✓", color: "text-green-600" },
            { text: "业务有意义：+12% CTR ✓", color: "text-green-600" },
            { text: "无负面影响 ✓", color: "text-green-600" },
            { text: "决定：推全新算法 →", color: "text-blue-600" }
          ]
        }
      ]
    }
  },
  {
    id: 40,
    industry: "internet",
    title: "【面试高频】如何分析用户流失原因？",
    description: "产品用户流失率上升，如何系统性分析流失原因并制定挽回策略",
    difficulty: "中等",
    tags: ["流失分析", "用户画像", "挽回策略", "面试必备"],
    scenario: `某App本月用户流失率从5%上升到8%，需要找出流失原因并制定挽回策略。

问题：
1. 如何定义流失用户？
2. 如何系统性分析流失原因？
3. 流失用户有哪些共同特征？
4. 如何设计用户挽回策略？`,
    keyPoints: ["流失定义", "原因分析", "用户画像", "挽回策略"],
    solution: `-- 完整分析流程：

一、流失定义
-- 不同产品流失定义不同
- 电商：30天无购买
- 社交：7天未登录
- 工具：14天未使用核心功能
- 游戏：连续3天未登录

-- SQL定义流失用户
SELECT 
  user_id,
  last_active_date,
  DATEDIFF(CURRENT_DATE, last_active_date) AS days_inactive,
  CASE 
    WHEN DATEDIFF(CURRENT_DATE, last_active_date) >= 30 THEN '流失'
    WHEN DATEDIFF(CURRENT_DATE, last_active_date) >= 14 THEN '预流失'
    ELSE '活跃'
  END AS user_status
FROM user_activity;

二、流失原因分析框架

1. 产品体验问题：
-- 对比流失用户vs活跃用户的产品使用情况
SELECT 
  user_status,
  AVG(session_count) AS avg_sessions,
  AVG(duration_minutes) AS avg_duration,
  AVG(feature_usage_count) AS avg_features,
  AVG(error_count) AS avg_errors
FROM user_behavior_summary
GROUP BY user_status;

2. 内容/服务质量：
- 内容更新频率下降
- 推荐内容不相关
- 服务响应慢

3. 竞品冲击：
- 竞品推出新功能
- 竞品营销活动
- 行业整体下滑

4. 用户需求变化：
- 需求已满足（工具类）
- 兴趣转移（内容类）
- 生命周期结束

三、流失用户画像
-- 多维度分析流失用户特征
WITH churned_users AS (
  SELECT user_id 
  FROM users 
  WHERE DATEDIFF(CURRENT_DATE, last_active_date) >= 30
)
SELECT 
  -- 基础画像
  u.age_group,
  u.gender,
  u.city_tier,
  u.register_channel,
  
  -- 行为特征
  AVG(b.total_sessions) AS avg_sessions,
  AVG(b.total_duration) AS avg_duration,
  AVG(b.days_active) AS avg_active_days,
  
  -- 价值特征
  AVG(b.total_orders) AS avg_orders,
  AVG(b.total_amount) AS avg_amount,
  
  COUNT(*) AS churned_count
FROM churned_users c
JOIN users u ON c.user_id = u.user_id
JOIN user_behavior b ON c.user_id = b.user_id
GROUP BY u.age_group, u.gender, u.city_tier, u.register_channel
ORDER BY churned_count DESC;

四、流失预警模型
-- 预测哪些用户可能流失
WITH user_features AS (
  SELECT 
    user_id,
    -- 活跃度下降
    (last_7d_sessions - last_30d_avg_sessions) AS session_decline,
    -- 使用时长下降
    (last_7d_duration - last_30d_avg_duration) AS duration_decline,
    -- 核心功能使用减少
    (last_7d_core_actions - last_30d_avg_actions) AS action_decline,
    -- 负面反馈增加
    last_7d_complaints,
    -- 客服咨询频率
    last_7d_service_calls
  FROM user_behavior_trends
)
SELECT 
  user_id,
  -- 流失风险评分
  CASE 
    WHEN session_decline < -50 THEN 40
    WHEN session_decline < -20 THEN 20
    ELSE 0
  END +
  CASE 
    WHEN duration_decline < -60 THEN 30
    WHEN duration_decline < -30 THEN 15
    ELSE 0
  END +
  CASE 
    WHEN action_decline < -50 THEN 20
    ELSE 0
  END +
  last_7d_complaints * 5 +
  last_7d_service_calls * 3 AS churn_risk_score
FROM user_features
HAVING churn_risk_score >= 50
ORDER BY churn_risk_score DESC;

五、挽回策略设计

1. 分层挽回：
-- 高价值用户：人工电话+专属优惠
-- 中价值用户：短信/push+优惠券
-- 低价值用户：EDM+内容推荐

2. 精准触达：
SELECT 
  user_id,
  churn_risk_score,
  user_value_tier,
  CASE 
    WHEN churn_reason = '功能不满意' THEN '推送新功能教程'
    WHEN churn_reason = '内容不相关' THEN '优化推荐算法'
    WHEN churn_reason = '价格敏感' THEN '发放优惠券'
    WHEN churn_reason = '使用频率低' THEN 'Push唤醒+任务激励'
    ELSE '通用召回活动'
  END AS retention_strategy
FROM user_churn_analysis
WHERE churn_risk_score >= 50;

3. 效果追踪：
-- 挽回率计算
SELECT 
  retention_campaign_id,
  COUNT(DISTINCT user_id) AS targeted_users,
  COUNT(DISTINCT CASE WHEN is_reactivated = 1 THEN user_id END) AS reactivated_users,
  ROUND(COUNT(DISTINCT CASE WHEN is_reactivated = 1 THEN user_id END) * 100.0 / 
    COUNT(DISTINCT user_id), 2) AS reactivation_rate,
  SUM(post_campaign_gmv) AS recovered_value
FROM retention_campaign_results
GROUP BY retention_campaign_id;

-- 面试加分点：
1. 区分流失原因（产品、内容、竞品、需求）
2. 建立预警模型而非事后挽回
3. 分层分级的挽回策略
4. 计算挽回ROI（挽回成本 vs 用户价值）`,
    mindmap: {
      title: "用户流失分析思维导图",
      framework: "流失分析完整闭环",
      nodes: [
        {
          level: 1,
          title: "📊 定义流失",
          icon: Target,
          content: "明确流失的判定标准",
          children: [
            { text: "时间维度：30天未活跃", color: "text-blue-600" },
            { text: "行为维度：未使用核心功能", color: "text-green-600" },
            { text: "价值维度：消费为0", color: "text-purple-600" },
            { text: "分级：流失、预流失、活跃", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🔍 计算流失率",
          icon: BarChart3,
          content: "量化流失问题严重程度",
          children: [
            { text: "流失率 = 流失用户/期初用户", color: "text-blue-600" },
            { text: "本月：8%（上月5%）", color: "text-red-600" },
            { text: "对比行业：行业6%", color: "text-yellow-600" },
            { text: "趋势：连续3个月上升", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "📐 多维度分析",
          icon: Layers,
          content: "找出流失高发群体",
          children: [
            { text: "渠道：某渠道流失率15%", color: "text-red-600" },
            { text: "时间：注册30天内流失最多", color: "text-orange-600" },
            { text: "地域：三四线城市流失高", color: "text-yellow-600" },
            { text: "年龄：18-25岁流失率高", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "🎯 原因归类",
          icon: Search,
          content: "系统性分析流失原因",
          children: [
            { text: "产品问题：功能bug、体验差", color: "text-red-600" },
            { text: "内容问题：推荐不准、更新慢", color: "text-orange-600" },
            { text: "竞品冲击：竞品活动、新功能", color: "text-blue-600" },
            { text: "需求变化：需求满足、兴趣转移", color: "text-green-600" }
          ]
        },
        {
          level: 1,
          title: "👥 用户画像",
          icon: Users,
          content: "刻画流失用户特征",
          children: [
            { text: "低活跃：日均<10分钟", color: "text-red-600" },
            { text: "低粘性：核心功能使用少", color: "text-orange-600" },
            { text: "低价值：消费<50元", color: "text-yellow-600" },
            { text: "负反馈：投诉、差评多", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "⚠️ 预警模型",
          icon: AlertCircle,
          content: "提前识别预流失用户",
          children: [
            { text: "活跃度下降：环比-50%", color: "text-red-600" },
            { text: "使用时长下降：环比-60%", color: "text-orange-600" },
            { text: "核心动作减少：环比-50%", color: "text-yellow-600" },
            { text: "综合评分>50分：高风险", color: "text-blue-600" }
          ]
        },
        {
          level: 1,
          title: "💡 挽回策略",
          icon: Lightbulb,
          content: "分层分级精准挽回",
          children: [
            { text: "高价值：人工+专属优惠", color: "text-green-600" },
            { text: "中价值：Push+优惠券", color: "text-blue-600" },
            { text: "低价值：EDM+内容推荐", color: "text-purple-600" },
            { text: "针对原因：个性化方案", color: "text-orange-600" }
          ]
        },
        {
          level: 1,
          title: "🎬 效果评估",
          icon: CheckCircle2,
          content: "追踪挽回效果和ROI",
          children: [
            { text: "挽回率：召回用户/触达用户", color: "text-blue-600" },
            { text: "ROI：回收价值/挽回成本", color: "text-green-600" },
            { text: "长期留存：挽回后30日留存", color: "text-purple-600" },
            { text: "持续优化：迭代挽回策略", color: "text-orange-600" }
          ]
        }
      ]
    }
  },
  {
    id: 41,
    industry: "ecommerce",
    title: "【面试高频】新品如何冷启动？",
    description: "新商品上线没流量没销量，如何快速破冰获得初始流量和销量",
    difficulty: "中等",
    tags: ["冷启动", "新品运营", "流量获取", "面试热门"],
    scenario: `电商平台新上线一批商品，但流量很少，转化率也低，如何破局？

问题：
1. 新品冷启动面临哪些问题？
2. 如何为新品获取初始流量？
3. 如何提升新品的转化率？
4. 如何让新品快速进入推荐池？`,
    keyPoints: ["冷启动", "流量获取", "转化优化", "算法推荐"],
    solution: `-- 新品冷启动完整策略：

一、冷启动核心问题

1. 没有历史数据：
- 无销量、无评价、无权重
- 推荐算法无法判断质量
- 搜索排名靠后

2. 用户信任度低：
- 新品牌用户不认识
- 没有评价不敢买
- 价格优势不明显

3. 竞争激烈：
- 同类老品占据流量
- 用户习惯已形成

二、流量获取策略

1. 站内流量：
-- 分析目标用户画像
WITH target_users AS (
  SELECT 
    u.user_id,
    u.age,
    u.gender,
    u.city,
    COUNT(o.order_id) AS historical_orders,
    SUM(o.amount) AS total_spend
  FROM users u
  JOIN orders o ON u.user_id = o.user_id
  WHERE o.category = '目标类目'
    AND o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
  GROUP BY u.user_id, u.age, u.gender, u.city
  HAVING historical_orders >= 2
)
SELECT 
  age_group,
  gender,
  city_tier,
  COUNT(*) AS user_count,
  AVG(total_spend) AS avg_ltv
FROM target_users
GROUP BY age_group, gender, city_tier
ORDER BY user_count DESC;

-- 策略：
a) 搜索流量：优化标题、关键词、类目
b) 推荐流量：投放开屏、banner、feeds
c) 关联推荐：在爆款详情页推荐新品
d) 会员推送：向目标用户精准push

2. 站外流量：
- 社交媒体：小红书、抖音种草
- KOL合作：头部+腰部+尾部组合
- 内容营销：软文、测评、直播

三、转化率优化

1. 信任度建设：
-- 快速积累基础销量和评价
SELECT 
  product_id,
  -- 前100单转化率
  SUM(CASE WHEN order_rank <= 100 AND is_paid = 1 THEN 1 ELSE 0 END) * 100.0 / 100 AS early_conversion_rate,
  -- 前100单评价率
  SUM(CASE WHEN order_rank <= 100 AND has_review = 1 THEN 1 ELSE 0 END) * 100.0 / 100 AS early_review_rate
FROM (
  SELECT 
    o.product_id,
    o.order_id,
    o.is_paid,
    r.has_review,
    ROW_NUMBER() OVER (PARTITION BY o.product_id ORDER BY o.order_time) AS order_rank
  FROM orders o
  LEFT JOIN reviews r ON o.order_id = r.order_id
  WHERE o.product_status = 'new'
) ranked_orders
GROUP BY product_id;

-- 策略：
a) 新品首发价：前100名半价
b) 晒单返现：鼓励好评
c) 达人试用：免费送测评
d) 官方背书：平台认证、质检报告

2. 详情页优化：
- 视觉：高质量主图、短视频
- 文案：突出卖点、对比优势
- 评价：引导好评、处理差评
- 价格：限时优惠、凑单满减

四、算法推荐策略

1. 探索vs利用（EE问题）：
-- 新品需要更多探索机会
-- 策略：给新品更多曝光机会

2. 协同过滤冷启动：
-- 基于相似商品推荐
SELECT 
  np.new_product_id,
  sp.similar_product_id,
  sp.similarity_score,
  sp.avg_ctr,
  sp.avg_cvr
FROM new_products np
JOIN similar_products sp ON np.category = sp.category
  AND np.price_range = sp.price_range
WHERE sp.sales_rank <= 100  -- 选择爆款商品
ORDER BY sp.similarity_score DESC, sp.avg_ctr DESC
LIMIT 10;

-- 策略：
a) 在爆款商品页推荐新品
b) 向购买过爆款的用户推荐新品
c) 将新品放入爆款的推荐位

3. 内容冷启动：
-- 利用商品属性标签
SELECT 
  product_id,
  product_name,
  CONCAT_WS(',', brand, category, style, material, color) AS tags
FROM products
WHERE status = 'new';

-- 策略：
a) 标签推荐：向喜欢该标签的用户推荐
b) 场景推荐：结合使用场景推荐
c) 人群推荐：根据人群画像推荐

五、数据监控与迭代

-- 新品核心指标看板
SELECT 
  product_id,
  product_name,
  launch_date,
  DATEDIFF(CURRENT_DATE, launch_date) AS days_online,
  
  -- 流量指标
  SUM(impressions) AS total_impressions,
  SUM(clicks) AS total_clicks,
  ROUND(SUM(clicks) * 100.0 / SUM(impressions), 2) AS ctr,
  
  -- 转化指标
  SUM(orders) AS total_orders,
  ROUND(SUM(orders) * 100.0 / SUM(clicks), 2) AS cvr,
  
  -- GMV指标
  SUM(gmv) AS total_gmv,
  ROUND(SUM(gmv) / SUM(orders), 2) AS avg_order_value,
  
  -- 评价指标
  COUNT(DISTINCT review_id) AS review_count,
  ROUND(AVG(rating), 2) AS avg_rating
FROM product_daily_metrics
WHERE launch_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY product_id, product_name, launch_date
ORDER BY days_online, total_gmv DESC;

-- 面试加分点：
1. 提到探索vs利用（EE问题）
2. 区分站内、站外、算法三种流量
3. 快速积累初始数据是关键
4. 给出具体可执行的运营动作`
  },
  {
    id: 42,
    industry: "finance",
    title: "【面试高频】如何提升信用卡激活率？",
    description: "信用卡申请后未激活率高，如何分析并提升激活率",
    difficulty: "中等",
    tags: ["激活率", "转化漏斗", "用户分层", "面试常见"],
    scenario: `某银行信用卡申请到激活的转化率只有60%，需要提升激活率。

问题：
1. 如何分析激活率低的原因？
2. 不同用户群体的激活率有何差异？
3. 从申请到激活有哪些流失环节？
4. 如何设计激活促进策略？`,
    keyPoints: ["漏斗分析", "流失原因", "用户分层", "激活策略"],
    solution: `-- 完整分析框架：

一、激活漏斗分析

-- 完整转化漏斗
WITH funnel AS (
  SELECT 
    '申请提交' AS stage, 1 AS stage_order, COUNT(DISTINCT application_id) AS users
  FROM credit_card_applications
  UNION ALL
  SELECT 
    '资料审核通过', 2, COUNT(DISTINCT application_id)
  FROM credit_card_applications
  WHERE approval_status = 'approved'
  UNION ALL
  SELECT 
    '卡片邮寄', 3, COUNT(DISTINCT card_id)
  FROM credit_cards
  WHERE mail_status = 'delivered'
  UNION ALL
  SELECT 
    '收到卡片', 4, COUNT(DISTINCT card_id)
  FROM credit_cards
  WHERE receive_status = 'received'
  UNION ALL
  SELECT 
    '激活成功', 5, COUNT(DISTINCT card_id)
  FROM credit_cards
  WHERE activation_status = 'activated'
)
SELECT 
  stage,
  users,
  ROUND(users * 100.0 / LAG(users) OVER (ORDER BY stage_order), 2) AS conversion_rate,
  ROUND(users * 100.0 / FIRST_VALUE(users) OVER (ORDER BY stage_order), 2) AS overall_rate
FROM funnel
ORDER BY stage_order;

-- 结果示例：
-- 申请提交：10000人（100%）
-- 审核通过：8000人（80%，整体80%）
-- 卡片邮寄：7500人（94%，整体75%）
-- 收到卡片：7200人（96%，整体72%）
-- 激活成功：6000人（83%，整体60%）

二、流失原因分析

1. 各环节流失原因：
-- 审核未通过（20%流失）：
- 信用评分不足
- 资料不完整
- 反欺诈拦截

-- 邮寄流失（6%）：
- 地址错误退回
- 物流时间长
- 用户已搬家

-- 收到未激活（17%）：
- 忘记激活（最主要）
- 不知道如何激活
- 对权益不了解
- 已有其他银行卡

2. 用户反馈分析：
SELECT 
  churn_reason,
  COUNT(*) AS count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS pct
FROM (
  SELECT 
    CASE 
      WHEN survey_reason LIKE '%忘记%' THEN '忘记激活'
      WHEN survey_reason LIKE '%不知道%' THEN '不知道如何激活'
      WHEN survey_reason LIKE '%权益%' THEN '权益不吸引'
      WHEN survey_reason LIKE '%其他卡%' THEN '已有其他卡'
      ELSE '其他原因'
    END AS churn_reason
  FROM inactive_card_survey
) reasons
GROUP BY churn_reason
ORDER BY count DESC;

三、用户分层分析

-- 不同群体激活率对比
SELECT 
  -- 用户特征
  CASE 
    WHEN age < 25 THEN '18-24岁'
    WHEN age < 35 THEN '25-34岁'
    WHEN age < 45 THEN '35-44岁'
    ELSE '45岁以上'
  END AS age_group,
  card_type,
  application_channel,
  
  -- 激活情况
  COUNT(DISTINCT card_id) AS total_cards,
  COUNT(DISTINCT CASE WHEN is_activated = 1 THEN card_id END) AS activated_cards,
  ROUND(COUNT(DISTINCT CASE WHEN is_activated = 1 THEN card_id END) * 100.0 / 
    COUNT(DISTINCT card_id), 2) AS activation_rate,
    
  -- 激活时长
  ROUND(AVG(CASE WHEN is_activated = 1 
    THEN DATEDIFF(activation_date, receive_date) END), 1) AS avg_days_to_activate
    
FROM credit_cards
GROUP BY age_group, card_type, application_channel
ORDER BY activation_rate DESC;

-- 发现：
-- 年轻用户激活率更高（75% vs 50%）
-- 高端卡激活率更高（80% vs 55%）
-- 线上申请激活率更高（70% vs 60%）
-- 平均激活时长：5天

四、时间序列分析

-- 激活时间分布
SELECT 
  CASE 
    WHEN days_to_activate <= 3 THEN '0-3天'
    WHEN days_to_activate <= 7 THEN '4-7天'
    WHEN days_to_activate <= 14 THEN '8-14天'
    WHEN days_to_activate <= 30 THEN '15-30天'
    ELSE '30天以上'
  END AS time_bucket,
  COUNT(*) AS activation_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS pct,
  ROUND(SUM(COUNT(*)) OVER (ORDER BY days_to_activate) * 100.0 / 
    SUM(COUNT(*)) OVER (), 2) AS cumulative_pct
FROM (
  SELECT 
    card_id,
    DATEDIFF(activation_date, receive_date) AS days_to_activate
  FROM credit_cards
  WHERE is_activated = 1
) activations
GROUP BY time_bucket
ORDER BY days_to_activate;

-- 发现：
-- 40%在3天内激活
-- 70%在7天内激活
-- 90%在30天内激活
-- → 关键触达窗口：收卡后3天、7天

五、激活促进策略

1. 分阶段触达策略：
SELECT 
  card_id,
  user_id,
  receive_date,
  DATEDIFF(CURRENT_DATE, receive_date) AS days_since_receive,
  CASE 
    WHEN DATEDIFF(CURRENT_DATE, receive_date) = 1 THEN 'Day1：短信提醒+激活奖励'
    WHEN DATEDIFF(CURRENT_DATE, receive_date) = 3 THEN 'Day3：APP推送+权益介绍'
    WHEN DATEDIFF(CURRENT_DATE, receive_date) = 7 THEN 'Day7：电话外呼+限时优惠'
    WHEN DATEDIFF(CURRENT_DATE, receive_date) = 14 THEN 'Day14：加码激活礼'
    WHEN DATEDIFF(CURRENT_DATE, receive_date) = 30 THEN 'Day30：最后催活'
    ELSE NULL
  END AS touchpoint_strategy
FROM credit_cards
WHERE is_activated = 0
  AND receive_date IS NOT NULL
HAVING touchpoint_strategy IS NOT NULL;

2. 激活激励设计：
-- 不同卡种差异化激励
SELECT 
  card_type,
  AVG(approval_amount) AS avg_limit,
  CASE 
    WHEN card_type = '白金卡' THEN '激活送200元刷卡金+机场贵宾厅'
    WHEN card_type = '金卡' THEN '激活送100元刷卡金+积分双倍'
    WHEN card_type = '普卡' THEN '激活送50元刷卡金+首刷礼'
  END AS activation_incentive,
  expected_activation_rate_lift
FROM card_type_incentive_analysis;

3. 简化激活流程：
- 线上激活：APP扫码一键激活
- 智能激活：人脸识别快速激活
- 主动激活：收到卡自动激活

六、效果监控

-- 激活率提升跟踪
SELECT 
  DATE_FORMAT(receive_date, '%Y-%m') AS month,
  card_type,
  COUNT(*) AS cards_delivered,
  SUM(CASE WHEN is_activated = 1 THEN 1 ELSE 0 END) AS cards_activated,
  ROUND(SUM(CASE WHEN is_activated = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS activation_rate,
  -- 环比变化
  ROUND((SUM(CASE WHEN is_activated = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) - 
    LAG(SUM(CASE WHEN is_activated = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) 
    OVER (PARTITION BY card_type ORDER BY DATE_FORMAT(receive_date, '%Y-%m'))) , 2) AS mom_change
FROM credit_cards
WHERE receive_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
GROUP BY DATE_FORMAT(receive_date, '%Y-%m'), card_type
ORDER BY month DESC, card_type;

-- 面试加分点：
1. 完整漏斗分析找出流失环节
2. 时间序列分析找关键触达窗口
3. 分层分析找高/低激活群体
4. 给出分阶段触达策略
5. 计算激励ROI（激活成本vs用户LTV）`
  },
  {
    id: 20,
    industry: "ecommerce",
    title: "电商AB测试实验分析",
    description: "科学评估AB实验效果，避免辛普森悖论和显著性误判",
    difficulty: "困难",
    tags: ["AB测试", "统计检验", "辛普森悖论", "实验设计"],
    scenario: `某电商平台进行了一次首页改版AB测试，需要评估效果。数据包含：
- experiment_users表：用户ID、实验组（A对照组/B实验组）、分组时间
- user_actions表：用户ID、行为类型、行为时间、订单金额
- user_profile表：用户ID、用户等级、历史GMV、活跃度

问题：
1. 计算AB两组的核心指标对比（点击率、转化率、客单价、GMV）
2. 进行统计显著性检验（Z检验/T检验）
3. 分层分析，检查是否存在辛普森悖论（不同用户层级效果差异）
4. 给出实验结论和上线建议`,
    keyPoints: ["AB测试", "假设检验", "分层分析", "辛普森悖论"],
    solution: `-- SQL解题思路：
-- Step 1: 计算AB组基础指标
WITH ab_metrics AS (
  SELECT 
    eu.experiment_group,
    COUNT(DISTINCT eu.user_id) AS user_count,
    COUNT(DISTINCT CASE WHEN ua.action_type = 'click' THEN ua.user_id END) AS clicked_users,
    COUNT(DISTINCT CASE WHEN ua.action_type = 'purchase' THEN ua.user_id END) AS purchased_users,
    SUM(CASE WHEN ua.action_type = 'purchase' THEN ua.order_amount ELSE 0 END) AS total_gmv,
    -- 点击率
    ROUND(COUNT(DISTINCT CASE WHEN ua.action_type = 'click' THEN ua.user_id END) * 100.0 / COUNT(DISTINCT eu.user_id), 2) AS click_rate,
    -- 转化率
    ROUND(COUNT(DISTINCT CASE WHEN ua.action_type = 'purchase' THEN ua.user_id END) * 100.0 / COUNT(DISTINCT eu.user_id), 2) AS conversion_rate,
    -- 客单价
    ROUND(SUM(CASE WHEN ua.action_type = 'purchase' THEN ua.order_amount ELSE 0 END) / 
          NULLIF(COUNT(DISTINCT CASE WHEN ua.action_type = 'purchase' THEN ua.user_id END), 0), 2) AS avg_order_value
  FROM experiment_users eu
  LEFT JOIN user_actions ua ON eu.user_id = ua.user_id 
    AND ua.action_time >= eu.assignment_time
    AND ua.action_time <= DATE_ADD(eu.assignment_time, INTERVAL 7 DAY)
  GROUP BY eu.experiment_group
),

-- Step 2: 计算统计显著性（Z检验 for 转化率）
significance_test AS (
  SELECT 
    -- A组数据
    (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'A') AS conversion_A,
    (SELECT user_count FROM ab_metrics WHERE experiment_group = 'A') AS users_A,
    -- B组数据
    (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'B') AS conversion_B,
    (SELECT user_count FROM ab_metrics WHERE experiment_group = 'B') AS users_B,
    -- 计算Z值
    ((SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'B') - 
     (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'A')) /
    SQRT(
      (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'A') * 
      (100 - (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'A')) / 
      (SELECT user_count FROM ab_metrics WHERE experiment_group = 'A') +
      (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'B') * 
      (100 - (SELECT conversion_rate FROM ab_metrics WHERE experiment_group = 'B')) / 
      (SELECT user_count FROM ab_metrics WHERE experiment_group = 'B')
    ) AS z_score
),

-- Step 3: 分层分析（按用户等级）
stratified_analysis AS (
  SELECT 
    eu.experiment_group,
    up.user_level,
    COUNT(DISTINCT eu.user_id) AS user_count,
    COUNT(DISTINCT CASE WHEN ua.action_type = 'purchase' THEN ua.user_id END) AS purchased_users,
    ROUND(COUNT(DISTINCT CASE WHEN ua.action_type = 'purchase' THEN ua.user_id END) * 100.0 / COUNT(DISTINCT eu.user_id), 2) AS conversion_rate,
    SUM(CASE WHEN ua.action_type = 'purchase' THEN ua.order_amount ELSE 0 END) AS gmv
  FROM experiment_users eu
  JOIN user_profile up ON eu.user_id = up.user_id
  LEFT JOIN user_actions ua ON eu.user_id = ua.user_id 
    AND ua.action_time >= eu.assignment_time
  GROUP BY eu.experiment_group, up.user_level
),

-- 检查辛普森悖论
simpson_check AS (
  SELECT 
    user_level,
    MAX(CASE WHEN experiment_group = 'A' THEN conversion_rate END) AS conversion_A,
    MAX(CASE WHEN experiment_group = 'B' THEN conversion_rate END) AS conversion_B,
    MAX(CASE WHEN experiment_group = 'B' THEN conversion_rate END) - 
    MAX(CASE WHEN experiment_group = 'A' THEN conversion_rate END) AS conversion_diff
  FROM stratified_analysis
  GROUP BY user_level
)

-- 输出结果
SELECT 
  '整体对比' AS analysis_type,
  experiment_group,
  user_count,
  click_rate,
  conversion_rate,
  avg_order_value,
  total_gmv
FROM ab_metrics
UNION ALL
SELECT 
  '统计检验',
  CASE 
    WHEN ABS(z_score) >= 1.96 THEN 'B组显著优于A组 (p<0.05)'
    WHEN ABS(z_score) >= 1.65 THEN 'B组可能更好 (p<0.10)'
    ELSE '无显著差异'
  END,
  NULL, NULL, NULL, NULL, NULL
FROM significance_test;

-- 分层结果
SELECT 
  user_level,
  conversion_A,
  conversion_B,
  conversion_diff,
  CASE 
    WHEN conversion_diff > 0 THEN 'B组更好'
    WHEN conversion_diff < 0 THEN 'A组更好'
    ELSE '无差异'
  END AS layer_conclusion
FROM simpson_check
ORDER BY user_level;

-- 关键知识点：
-- 1. Z检验公式计算显著性
-- 2. 分层分析检查辛普森悖论
-- 3. SQRT/ABS数学函数
-- 4. 科学的实验评估方法`
  },
]

export default function BusinessCasesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedCase, setSelectedCase] = useState<typeof businessCases[0] | null>(null)

  const filteredCases = selectedIndustry === "all" 
    ? businessCases 
    : businessCases.filter(c => c.industry === selectedIndustry)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "简单": return "bg-green-500"
      case "中等": return "bg-yellow-500"
      case "困难": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Briefcase className="h-10 w-10 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">业务题库</h1>
              <p className="text-gray-600 dark:text-gray-400">热门行业真实业务场景，提升数据分析实战能力</p>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            共 <span className="text-purple-600 font-bold text-lg">{businessCases.length}</span> 道题目
          </div>
        </div>

        {/* 行业分类 */}
        <div className="flex flex-wrap gap-3 mb-8">
          {industries.map(industry => (
            <button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedIndustry === industry.id
                  ? `${industry.color} text-white shadow-lg scale-105`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              <industry.icon className="h-4 w-4" />
              {industry.name}
            </button>
          ))}
        </div>

        {/* 统计信息 */}
        <div className="mb-6 flex gap-4 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <GitBranch className="h-4 w-4 text-purple-600" />
            <span className="text-purple-900 dark:text-purple-100">
              {businessCases.filter(c => c.mindmap).length} 道题配备思维导图分析
            </span>
          </div>
        </div>

        {/* 题目列表 */}
        {selectedCase ? (
          // 题目详情
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{selectedCase.title}</CardTitle>
                    <Badge className={getDifficultyColor(selectedCase.difficulty)}>
                      {selectedCase.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{selectedCase.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCase.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-purple-600 border-purple-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedCase(null)}>
                  返回列表
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 思维导图分析 */}
              {selectedCase.mindmap && (
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-purple-600" />
                    {selectedCase.mindmap.title}
                  </h3>
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                    {/* 分析框架标题 */}
                    <div className="mb-6 text-center">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-base">
                        🎯 {selectedCase.mindmap.framework}
                      </Badge>
                    </div>

                    {/* 思维导图节点 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCase.mindmap.nodes.map((node, idx) => {
                        const IconComponent = node.icon
                        return (
                          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all border-l-4 border-purple-500">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <IconComponent className="h-5 w-5 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                  {node.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {node.content}
                                </p>
                              </div>
                            </div>
                            <ul className="space-y-2 ml-12">
                              {node.children.map((child, childIdx) => (
                                <li key={childIdx} className="flex items-start gap-2 text-sm">
                                  <span className="text-purple-500 mt-1">▸</span>
                                  <span className={child.color}>
                                    {child.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>

                    {/* 分析流程提示 */}
                    <div className="mt-6 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                        💡 <strong>数据分析黄金法则</strong>：
                        <span className="mx-2">明确目标 → 探索数据 → 定义指标 → 多维拆解 → 深度分析 → 发现异常 → 提炼洞察 → 落地建议</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 业务场景 */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  业务场景
                </h3>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedCase.scenario}
                </div>
              </div>

              {/* 关键知识点 */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-600" />
                  关键知识点
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedCase.keyPoints.map(point => (
                    <div key={point} className="bg-white dark:bg-gray-800 p-3 rounded-lg border-2 border-purple-100 dark:border-purple-800">
                      <p className="text-sm font-medium text-center">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 参考解法 */}
              <div>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  参考解法
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg whitespace-pre-wrap text-sm">
                  {selectedCase.solution}
                </div>
              </div>

              {/* 行动建议 */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-900 dark:text-purple-100">💡 学习建议</h4>
                <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                  <li>• 尝试用SQL或Pandas实际操作数据分析</li>
                  <li>• 思考不同分析方法的优缺点</li>
                  <li>• 关注业务目标与技术实现的平衡</li>
                  <li>• 练习将分析结果转化为可落地的建议</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          // 题目列表
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map(caseItem => (
              <Card 
                key={caseItem.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-400 relative"
                onClick={() => setSelectedCase(caseItem)}
              >
                {caseItem.mindmap && (
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      <GitBranch className="h-3 w-3 mr-1" />
                      思维导图
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(caseItem.difficulty)}>
                      {caseItem.difficulty}
                    </Badge>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {caseItem.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 空状态 */}
        {filteredCases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">该行业暂无题目，敬请期待...</p>
          </div>
        )}
      </div>
    </div>
  )
}


