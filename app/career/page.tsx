'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { 
  TrendingUp, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronUp,
  BarChart3,
  DollarSign,
  Users,
  Building2,
  BookOpen,
  Code,
  Award,
  Sparkles,
  LineChart,
  Brain,
  Rocket
} from 'lucide-react'

export default function CareerPage() {
  const [selectedCity, setSelectedCity] = useState('all')
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [skillAssessmentData, setSkillAssessmentData] = useState<{ education: string; major: string; targetIndustry: string; skills: string[] }>({
    education: '',
    major: '',
    targetIndustry: '',
    skills: []
  })
  const [predictionData, setPredictionData] = useState({
    education: '',
    experience: '',
    industry: '',
    city: ''
  })

  // 监听滚动，显示/隐藏返回顶部按钮 + 导航高亮
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
      
      // 导航高亮逻辑
      const sections = [
        'overview', 'prospect', 'requirements', 'skills', 'business', 
        'growth', 'salary', 'challenges', 'resources', 'career-ecosystem', 'community'
      ]
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 薪资数据
  const salaryData = {
    cities: {
      'beijing': { name: '北京', salary: 18024, jobs: 863, multiplier: 1.15 },
      'shanghai': { name: '上海', salary: 17500, jobs: 691, multiplier: 1.12 },
      'hangzhou': { name: '杭州', salary: 17031, jobs: 622, multiplier: 1.08 },
      'shenzhen': { name: '深圳', salary: 16800, jobs: 485, multiplier: 1.05 },
      'other': { name: '其他城市', salary: 14000, jobs: 500, multiplier: 0.95 }
    },
    industries: {
      'internet': { name: '互联网/科技', multiplier: 1.2, growth: 0.08 },
      'finance': { name: '金融/科技', multiplier: 1.35, growth: 0.06 },
      'ecommerce': { name: '电商/零售', multiplier: 1.1, growth: 0.07 },
      'manufacturing': { name: '制造业', multiplier: 0.85, growth: 0.05 },
      'education': { name: '教育/医疗', multiplier: 0.95, growth: 0.06 }
    },
    experience: {
      '0-1': { multiplier: 0.6, growth: 0.25 },
      '1-3': { multiplier: 0.8, growth: 0.15 },
      '3-5': { multiplier: 1.0, growth: 0.12 },
      '5-10': { multiplier: 1.4, growth: 0.08 },
      '10+': { multiplier: 1.8, growth: 0.05 }
    },
    education: {
      'associate': { multiplier: 0.85 },
      'bachelor': { multiplier: 1.0 },
      'master': { multiplier: 1.15 },
      'phd': { multiplier: 1.45 }
    }
  }

  // 技能清单定义
  const skillCategories = {
    core: {
      name: '核心必备技能',
      skills: [
        { id: 'sql', name: 'SQL', priority: 'high', description: '数据查询基础，必学' },
        { id: 'excel', name: 'Excel', priority: 'high', description: '快速分析和数据处理' },
        { id: 'python', name: 'Python', priority: 'high', description: '数据科学主流语言' },
        { id: 'statistics', name: '统计学基础', priority: 'high', description: '数据分析理论基础' }
      ]
    },
    visualization: {
      name: '数据可视化工具',
      skills: [
        { id: 'tableau', name: 'Tableau', priority: 'medium', description: '企业级BI工具' },
        { id: 'powerbi', name: 'Power BI', priority: 'medium', description: '微软生态BI工具' },
        { id: 'matplotlib', name: 'Matplotlib/Seaborn', priority: 'medium', description: 'Python可视化库' },
        { id: 'echarts', name: 'ECharts/D3.js', priority: 'low', description: 'Web可视化框架' }
      ]
    },
    analysis: {
      name: '分析工具',
      skills: [
        { id: 'r', name: 'R语言', priority: 'medium', description: '统计分析专用语言' },
        { id: 'spss', name: 'SPSS', priority: 'medium', description: '传统统计分析软件' },
        { id: 'sas', name: 'SAS', priority: 'low', description: '企业级统计软件' },
        { id: 'stata', name: 'Stata', priority: 'low', description: '计量经济学工具' }
      ]
    },
    advanced: {
      name: '进阶技能',
      skills: [
        { id: 'ml', name: '机器学习', priority: 'medium', description: 'AI时代必备技能' },
        { id: 'spark', name: 'Spark/Hadoop', priority: 'low', description: '大数据处理框架' },
        { id: 'docker', name: 'Docker', priority: 'low', description: '容器化部署' },
        { id: 'git', name: 'Git版本控制', priority: 'medium', description: '代码管理必备' }
      ]
    }
  }

  // 专业背景定义
  const majorCategories: Record<string, { name: string; advantage: string[]; disadvantage: string[] }> = {
    'math-stats': { name: '数学/统计学', advantage: ['statistics', 'r', 'spss', 'stata'], disadvantage: ['python', 'sql'] },
    'cs': { name: '计算机科学/软件工程', advantage: ['python', 'sql', 'git', 'ml', 'docker'], disadvantage: ['statistics', 'spss'] },
    'information-systems': { name: '信息管理与信息系统', advantage: ['sql', 'excel', 'python', 'powerbi'], disadvantage: ['r', 'spss'] },
    'data-science': { name: '数据科学/大数据', advantage: ['python', 'sql', 'ml', 'statistics', 'spark'], disadvantage: [] },
    'economics': { name: '经济学/金融学', advantage: ['stata', 'r', 'statistics', 'excel'], disadvantage: ['python', 'sql'] },
    'business': { name: '工商管理/市场营销', advantage: ['excel', 'powerbi', 'tableau'], disadvantage: ['python', 'r', 'ml'] },
    'accounting': { name: '会计学/财务管理', advantage: ['excel', 'powerbi', 'sql'], disadvantage: ['python', 'r', 'ml'] },
    'engineering': { name: '工程技术类', advantage: ['python', 'git', 'docker'], disadvantage: ['statistics', 'spss'] },
    'psychology': { name: '心理学/社会学', advantage: ['spss', 'r', 'statistics'], disadvantage: ['python', 'sql'] },
    'physics': { name: '物理学/化学', advantage: ['python', 'statistics', 'ml'], disadvantage: ['excel', 'powerbi'] },
    'geography': { name: '地理信息系统/测绘', advantage: ['python', 'sql', 'statistics'], disadvantage: ['excel', 'powerbi'] },
    'biology': { name: '生物信息学/医学', advantage: ['r', 'python', 'statistics'], disadvantage: ['excel', 'tableau'] },
    'liberal-arts': { name: '文科类专业', advantage: ['excel'], disadvantage: ['python', 'sql', 'r', 'ml'] },
    'other': { name: '其他专业', advantage: [], disadvantage: [] }
  }

  // 目标行业定义和业务知识建议
  const industryCategories = {
    'internet': {
      name: '互联网/科技',
      description: '用户增长、产品运营、流量分析',
      businessSkills: [
        { name: 'AARRR漏斗模型', description: '用户获取→激活→留存→收入→推荐的增长框架' },
        { name: 'A/B测试', description: '产品功能测试和优化决策方法' },
        { name: '用户行为分析', description: '埋点数据、用户路径、转化率分析' },
        { name: '产品指标体系', description: 'DAU/MAU、LTV、CAC等核心指标' }
      ],
      tools: ['Google Analytics', '神策数据', '友盟+', 'GrowingIO'],
      cases: ['分析APP用户流失原因', '优化电商转化漏斗', '评估广告投放ROI']
    },
    'finance': {
      name: '金融/互联网金融',
      description: '风险控制、信贷建模、投资分析',
      businessSkills: [
        { name: '风险评估模型', description: 'FICO评分、风控规则引擎、反欺诈算法' },
        { name: '信贷业务流程', description: '获客→审批→放款→催收全流程分析' },
        { name: '合规要求', description: '了解央行征信、反洗钱、数据安全法规' },
        { name: '金融产品设计', description: '利率定价、产品收益率、资产组合优化' }
      ],
      tools: ['SAS', 'MATLAB', 'R', 'Python风控库'],
      cases: ['构建个人信用评分模型', '分析资产组合风险', '预测贷款违约率']
    },
    'ecommerce': {
      name: '电商/零售',
      description: '供应链优化、客户洞察、营销效果',
      businessSkills: [
        { name: '商品分析', description: '品类管理、库存周转、销售预测' },
        { name: '客户价值分析', description: 'RFM模型、客户生命周期价值' },
        { name: '营销归因', description: '多渠道归因、促销效果评估' },
        { name: '供应链管理', description: '需求预测、库存优化、物流分析' }
      ],
      tools: ['Tableau', 'Power BI', 'MySQL', 'Python'],
      cases: ['分析双11销售数据', '优化商品推荐算法', '预测季节性需求']
    },
    'manufacturing': {
      name: '制造业',
      description: '生产优化、质量控制、设备维护',
      businessSkills: [
        { name: '生产效率分析', description: 'OEE指标、生产计划优化、瓶颈分析' },
        { name: '质量管理', description: 'SPC统计过程控制、六西格玛质量改进' },
        { name: '设备管理', description: '预测性维护、故障分析、设备利用率' },
        { name: '精益生产', description: '消除浪费、持续改进、看板管理' }
      ],
      tools: ['Minitab', 'JMP', 'SAP', 'IoT平台'],
      cases: ['预测设备故障时间', '优化生产排程', '分析产品缺陷原因']
    },
    'healthcare': {
      name: '医疗/生物医药',
      description: '临床数据、健康指标、药物研发',
      businessSkills: [
        { name: '临床试验设计', description: '随机对照试验、生存分析、疗效评估' },
        { name: '医疗数据合规', description: 'HIPAA隐私保护、FDA监管要求' },
        { name: '流行病学', description: '疾病传播模型、队列研究、病例对照' },
        { name: '医疗经济学', description: '成本效益分析、药物经济学评估' }
      ],
      tools: ['R', 'SAS', 'SPSS', 'REDCap'],
      cases: ['分析药物临床疗效', '建立疾病预测模型', '评估医疗干预效果']
    },
    'education': {
      name: '教育/在线教育',
      description: '学习分析、教学效果、用户行为',
      businessSkills: [
        { name: '学习分析', description: '学习路径优化、知识点掌握度评估' },
        { name: '教学效果评估', description: '课程完成率、学习成果测量' },
        { name: '个性化推荐', description: '学习内容推荐、难度自适应调整' },
        { name: '用户留存', description: '学员流失预警、课程优化建议' }
      ],
      tools: ['Learning Analytics工具', 'Python', 'R', 'Tableau'],
      cases: ['分析学生学习行为', '优化课程内容设计', '预测学员流失风险']
    },
    'consulting': {
      name: '咨询/市场研究',
      description: '商业分析、市场洞察、战略支持',
      businessSkills: [
        { name: '商业分析框架', description: 'SWOT、波特五力、PEST分析' },
        { name: '市场研究方法', description: '调研设计、抽样方法、数据收集' },
        { name: '财务分析', description: '财务建模、估值方法、投资回报分析' },
        { name: '战略规划', description: '商业模式设计、竞争分析、增长策略' }
      ],
      tools: ['Excel高级功能', 'SPSS', 'R', 'Tableau'],
      cases: ['市场进入策略分析', '竞争对手研究', '商业模式可行性评估']
    }
  }

  type MajorKey = keyof typeof majorCategories
  type IndustryKey = keyof typeof industryCategories
  type EducationKey = keyof typeof salaryData.education
  type ExperienceKey = keyof typeof salaryData.experience
  type CityKey = keyof typeof salaryData.cities
  type IndustrySalaryKey = keyof typeof salaryData.industries

  // 技能差距分析
  const analyzeSkillGaps = () => {
    const { education, major, targetIndustry, skills } = skillAssessmentData
    
    if (!education || !major) return null

    // 获取所有技能
    const allSkills = Object.values(skillCategories).flatMap(cat => cat.skills)
    
    // 分类技能状态
    const masteredSkills = allSkills.filter(skill => skills.includes(skill.id))
    const missingHighPriority = allSkills.filter(skill => 
      skill.priority === 'high' && !skills.includes(skill.id)
    )
    const missingMediumPriority = allSkills.filter(skill => 
      skill.priority === 'medium' && !skills.includes(skill.id)
    )

    // 根据专业背景给出建议
    const majorInfo = majorCategories[(major as MajorKey)] || majorCategories['other']
    const recommendedSkills = missingHighPriority.concat(missingMediumPriority)
      .sort((a, b) => {
        // 专业优势技能排前面
        const aAdvantage = majorInfo.advantage.includes(a.id) ? 1 : 0
        const bAdvantage = majorInfo.advantage.includes(b.id) ? 1 : 0
        if (aAdvantage !== bAdvantage) return bAdvantage - aAdvantage
        
        // 高优先级排前面
        if (a.priority !== b.priority) {
          return a.priority === 'high' ? -1 : 1
        }
        return 0
      })

    // 获取行业业务建议
    const industryInfo = targetIndustry ? industryCategories[(targetIndustry as IndustryKey)] : null

    return {
      totalSkills: allSkills.length,
      masteredCount: masteredSkills.length,
      missingHighCount: missingHighPriority.length,
      missingMediumCount: missingMediumPriority.length,
      masteredSkills,
      missingHighPriority,
      missingMediumPriority,
      recommendedSkills: recommendedSkills.slice(0, 6), // 推荐前6个
      majorAdvantage: majorInfo.advantage,
      majorDisadvantage: majorInfo.disadvantage,
      industryInfo
    }
  }

  // 薪资预测计算
  const calculateSalaryPrediction = () => {
    const { education, experience, industry, city } = predictionData
    
    if (!education || !experience || !industry || !city) {
      return null
    }

    // 基础薪资（全国平均）
    const baseSalary = 17500

    // 获取各项系数
    const eduMultiplier = salaryData.education[(education as EducationKey)]?.multiplier || 1
    const expMultiplier = salaryData.experience[(experience as ExperienceKey)]?.multiplier || 1
    const industryMultiplier = salaryData.industries[(industry as IndustrySalaryKey)]?.multiplier || 1
    const cityMultiplier = salaryData.cities[(city as CityKey)]?.multiplier || 1

    // 计算当前薪资
    const currentSalary = Math.round(baseSalary * eduMultiplier * expMultiplier * industryMultiplier * cityMultiplier)

    // 计算5年后薪资（基于行业增长率和经验增长）
    const industryGrowth = salaryData.industries[(industry as IndustrySalaryKey)]?.growth || 0.06
    const experienceGrowth = salaryData.experience[(experience as ExperienceKey)]?.growth || 0.1
    const avgGrowth = (industryGrowth + experienceGrowth) / 2
    const futureSalary = Math.round(currentSalary * Math.pow(1 + avgGrowth, 5))

    // AI技能加成
    const aiBonus = Math.round(currentSalary * 0.15)
    const futureWithAI = Math.round(futureSalary * 1.15)

    return {
      current: currentSalary,
      future: futureSalary,
      aiBonus,
      futureWithAI,
      growth: avgGrowth,
      factors: {
        education: eduMultiplier,
        experience: expMultiplier,
        industry: industryMultiplier,
        city: cityMultiplier
      }
    }
  }

  return (
    <>
    <Navigation />
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 顶部介绍 */}
        <div className="rounded-2xl p-8 mb-12 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-10 w-10" />
            <h1 className="text-3xl font-bold">数据分析师岗位全面指南（2025年更新）</h1>
          </div>
          <p className="opacity-90 mb-2">基于某招聘软件 <strong>3,455 条</strong> 岗位数据、行业图表洞察，从认知→评估→行动→跟踪的完整用户旅程。</p>
          <p className="opacity-90">中国数据分析市场预计增长至 <strong>9,704 百万美元</strong>，CAGR <strong>25.712%</strong>；强调"一半技术、一半业务"的复合能力。</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all">
              <Briefcase className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">3,455</div>
              <div className="opacity-90">总岗位数</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all">
              <DollarSign className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">17.5K</div>
              <div className="opacity-90">平均月薪</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all">
              <LineChart className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">25.7%</div>
              <div className="opacity-90">年增长率</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all">
              <Rocket className="h-6 w-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">36%</div>
              <div className="opacity-90">岗位增长</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 侧边目录 */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-4 space-y-3">
              <a href="#overview" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'overview' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                1. 概述介绍
              </a>
              <a href="#prospect" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'prospect' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                2. 岗位前景
              </a>
              <a href="#requirements" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'requirements' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                3. 要求资质
              </a>
              <a href="#skills" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'skills' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                4. 核心技能
              </a>
              <a href="#business" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'business' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                5. 业务知识
              </a>
              <a href="#growth" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'growth' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                6. 发展路径
              </a>
              <a href="#salary" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'salary' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                7. 薪资分布
              </a>
              <a href="#challenges" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'challenges' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                8. 挑战风险
              </a>
              <a href="#resources" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'resources' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                9. 实用建议
              </a>
              <a href="#career-ecosystem" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'career-ecosystem' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm flex items-center gap-2`}>
                <Award className="h-4 w-4" /> 职业生态图谱
              </a>
              <a href="#community" className={`block px-4 py-3 rounded-lg shadow transition-all ${activeSection === 'community' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold' : 'bg-white dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700'} text-sm`}>
                10. 互动社区
              </a>
            </nav>
          </aside>

          {/* 主体内容 */}
          <article className="lg:col-span-3 space-y-8">
            {/* 模块1：概述介绍 */}
            <section id="overview" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">1. 概述介绍（Overview/Introduction）</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700 mb-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Target className="h-6 w-6" /> 什么是数据分析师？
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  数据分析师是现代企业的"数据翻译者"，将原始数据转化为可执行的商业洞见。核心职责包括数据清洗、统计分析、报告制作和业务建议。
                  在 AI 时代，优秀分析师需具备<strong>"一半技术、一半业务"</strong>的复合能力，既能熟练使用 SQL/Python 等工具，又能深度理解行业逻辑。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                    <div className="font-medium text-blue-600 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" /> 核心职责
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">数据清洗、可视化、趋势分析、预测建模</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                    <div className="font-medium text-green-600 flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> 业务价值
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">支持决策、优化流程、发现机会、降低风险</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                    <div className="font-medium text-purple-600 flex items-center gap-2">
                      <Rocket className="h-4 w-4" /> 职业吸引力
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">高需求、好薪资(17.5K)、远程友好、AI协同</div>
                  </div>
                </div>
              </div>

              {/* 2025 年更新要点 */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-700 mb-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">🆕 2025年关键更新</h3>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• <strong>AI 工具普及：</strong>ChatGPT、Copilot 等降低技术门槛，但提高业务理解要求</li>
                  <li>• <strong>远程机会增加：</strong>疫情后 60% 岗位支持混合办公，地域限制减少</li>
                  <li>• <strong>行业融合加速：</strong>传统行业数字化转型，需要跨界复合人才</li>
                  <li>• <strong>伦理要求提升：</strong>数据隐私、算法偏见治理成为新技能点</li>
                </ul>
              </div>
            </section>

            {/* 模块2：岗位前景 */}
            <section id="prospect" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">2. 岗位前景（Job Market Prospects）</h2>
              <p className="mb-6">岗位需求旺盛，受 AI/大数据驱动。中国市场 2025-2035 复合增长率预计超 <strong>25%</strong>；全球市场由 2019 年 230 亿美元增至 2026 年 1330 亿美元，岗位增长 11%（2018-2028）。</p>
              
              {/* 关键指标卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <div className="text-2xl font-bold text-blue-600">25%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">北京岗位占比</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="text-2xl font-bold text-green-600">20-30万</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">年薪中位数</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="text-2xl font-bold text-purple-600">36%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">岗位增长率</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="text-2xl font-bold text-orange-600">33.4%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">AI融合增长</div>
                </div>
              </div>

              {/* 薪资预测工具 */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700">
                <h3 className="font-semibold mb-4 text-indigo-700 dark:text-indigo-300">🔮 5年薪资预测工具</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">选择您的背景条件，获得个性化薪资预测</p>
                
                {/* 选择条件 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">学历背景</label>
                    <select 
                      value={predictionData.education}
                      onChange={(e) => setPredictionData({...predictionData, education: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="">请选择</option>
                      <option value="associate">大专</option>
                      <option value="bachelor">本科</option>
                      <option value="master">硕士</option>
                      <option value="phd">博士</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">工作经验</label>
                    <select 
                      value={predictionData.experience}
                      onChange={(e) => setPredictionData({...predictionData, experience: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="">请选择</option>
                      <option value="0-1">0-1年</option>
                      <option value="1-3">1-3年</option>
                      <option value="3-5">3-5年</option>
                      <option value="5-10">5-10年</option>
                      <option value="10+">10年以上</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">目标行业</label>
                    <select 
                      value={predictionData.industry}
                      onChange={(e) => setPredictionData({...predictionData, industry: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="">请选择</option>
                      <option value="internet">互联网/科技</option>
                      <option value="finance">金融/科技</option>
                      <option value="ecommerce">电商/零售</option>
                      <option value="manufacturing">制造业</option>
                      <option value="education">教育/医疗</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">工作城市</label>
                    <select 
                      value={predictionData.city}
                      onChange={(e) => setPredictionData({...predictionData, city: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm"
                    >
                      <option value="">请选择</option>
                      <option value="beijing">北京</option>
                      <option value="shanghai">上海</option>
                      <option value="hangzhou">杭州</option>
                      <option value="shenzhen">深圳</option>
                      <option value="other">其他城市</option>
                    </select>
                  </div>
                </div>

                {/* 预测结果 */}
                {(() => {
                  const prediction = calculateSalaryPrediction()
                  if (!prediction) {
                    return (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border text-center">
                        <div className="text-gray-500 dark:text-gray-400">请选择完整的条件以获得薪资预测</div>
                      </div>
                    )
                  }

                  return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <h4 className="font-semibold text-indigo-600 mb-3 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" /> 薪资预测结果
                      </h4>
                      
                      {/* 当前vs未来对比 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400">当前预估薪资</div>
                          <div className="text-2xl font-bold text-blue-600">{prediction.current.toLocaleString()}元/月</div>
                          <div className="text-xs text-gray-500">2025年</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400">5年后预估薪资</div>
                          <div className="text-2xl font-bold text-green-600">{prediction.future.toLocaleString()}元/月</div>
                          <div className="text-xs text-gray-500">2030年</div>
                        </div>
                      </div>

                      {/* AI技能加成 */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 mb-4">
                        <div className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center gap-2">
                          <Brain className="h-4 w-4" /> AI技能加成效果
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">当前加成</div>
                            <div className="font-semibold">+{prediction.aiBonus.toLocaleString()}元 (+15%)</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">未来含AI技能</div>
                            <div className="font-semibold text-purple-600">{prediction.futureWithAI.toLocaleString()}元/月</div>
                          </div>
                        </div>
                      </div>

                      {/* 增长分析 */}
                      <div className="text-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 dark:text-gray-400">年均增长率：</span>
                          <span className="font-medium">{(prediction.growth * 100).toFixed(1)}%</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          影响因素：学历×{prediction.factors.education} · 经验×{prediction.factors.experience} · 行业×{prediction.factors.industry} · 城市×{prediction.factors.city}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </section>

            {/* 模块3：要求资质 */}
            <section id="requirements" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">3. 要求资质（Requirements and Qualifications）</h2>
              <p className="mb-6">门槛中等，本科主导（85.7%），但 AI 提升技能需求。招聘数据：经验 3-5 年主流（36.5%），大专可入门（12.3%）。</p>
              
              {/* 学历经验分布 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">学历要求分布</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>本科</span><span className="font-medium">85.7% (18K)</span></div>
                    <div className="flex justify-between"><span>大专</span><span className="font-medium">12.3% (12K)</span></div>
                    <div className="flex justify-between"><span>硕士</span><span className="font-medium">2% (16K)</span></div>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <h3 className="font-semibold mb-3 text-green-700 dark:text-green-300">经验要求分布</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>3-5年</span><span className="font-medium">36.5%</span></div>
                    <div className="flex justify-between"><span>1-3年</span><span className="font-medium">35.5%</span></div>
                    <div className="flex justify-between"><span>经验不限</span><span className="font-medium">14.3%</span></div>
                  </div>
                </div>
              </div>

              {/* 技能差距分析 */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg p-6 border border-cyan-200 dark:border-cyan-700">
                <h3 className="font-semibold mb-4 text-cyan-700 dark:text-cyan-300 flex items-center gap-2">
                  <Target className="h-5 w-5" /> 技能差距分析 & 学习建议
                </h3>
                
                {/* 基础信息选择 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">学历背景</label>
                    <select 
                      value={skillAssessmentData.education}
                      onChange={(e) => setSkillAssessmentData({...skillAssessmentData, education: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700"
                    >
                      <option value="">请选择</option>
                      <option value="associate">大专</option>
                      <option value="bachelor">本科</option>
                      <option value="master">硕士</option>
                      <option value="phd">博士</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">专业背景</label>
                    <select 
                      value={skillAssessmentData.major}
                      onChange={(e) => setSkillAssessmentData({...skillAssessmentData, major: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700"
                    >
                      <option value="">请选择专业背景</option>
                      <optgroup label="理工类">
                        <option value="math-stats">数学/统计学</option>
                        <option value="cs">计算机科学/软件工程</option>
                        <option value="information-systems">信息管理与信息系统</option>
                        <option value="data-science">数据科学/大数据</option>
                        <option value="engineering">工程技术类</option>
                        <option value="physics">物理学/化学</option>
                        <option value="geography">地理信息系统/测绘</option>
                        <option value="biology">生物信息学/医学</option>
                      </optgroup>
                      <optgroup label="商科类">
                        <option value="economics">经济学/金融学</option>
                        <option value="business">工商管理/市场营销</option>
                        <option value="accounting">会计学/财务管理</option>
                      </optgroup>
                      <optgroup label="文理类">
                        <option value="psychology">心理学/社会学</option>
                        <option value="liberal-arts">文科类专业</option>
                        <option value="other">其他专业</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">目标行业</label>
                    <select 
                      value={skillAssessmentData.targetIndustry}
                      onChange={(e) => setSkillAssessmentData({...skillAssessmentData, targetIndustry: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700"
                    >
                      <option value="">请选择目标行业</option>
                      <option value="internet">互联网/科技</option>
                      <option value="finance">金融/互联网金融</option>
                      <option value="ecommerce">电商/零售</option>
                      <option value="manufacturing">制造业</option>
                      <option value="healthcare">医疗/生物医药</option>
                      <option value="education">教育/在线教育</option>
                      <option value="consulting">咨询/市场研究</option>
                    </select>
                  </div>
                </div>

                {/* 技能选择 */}
                {skillAssessmentData.education && skillAssessmentData.major && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-3">请勾选您已掌握的技能</label>
                    <div className="space-y-4">
                      {Object.entries(skillCategories).map(([categoryKey, category]) => (
                        <div key={categoryKey} className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">{category.name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.skills.map(skill => (
                              <label key={skill.id} className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  className="mr-2"
                                  checked={skillAssessmentData.skills.includes(skill.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSkillAssessmentData({
                                        ...skillAssessmentData, 
                                        skills: [...skillAssessmentData.skills, skill.id]
                                      })
                                    } else {
                                      setSkillAssessmentData({
                                        ...skillAssessmentData, 
                                        skills: skillAssessmentData.skills.filter(s => s !== skill.id)
                                      })
                                    }
                                  }}
                                />
                                <span className="text-sm">
                                  {skill.name}
                                  {skill.priority === 'high' && <span className="text-red-500 ml-1">*</span>}
                                  {skill.priority === 'medium' && <span className="text-orange-500 ml-1">○</span>}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      <span className="text-red-500">*</span> 必备技能 · <span className="text-orange-500">○</span> 重要技能
                    </div>
                  </div>
                )}

                {/* 分析结果 */}
                {(() => {
                  const analysis = analyzeSkillGaps()
                  if (!analysis) {
                    return (
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border text-center">
                        <div className="text-gray-500 dark:text-gray-400">请选择学历和专业背景以获得技能分析</div>
                      </div>
                    )
                  }

                  return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                      <h4 className="font-semibold text-cyan-600 mb-3 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" /> 技能分析结果
                      </h4>
                      
                      {/* 技能统计 */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{analysis.masteredCount}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">已掌握技能</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="text-xl font-bold text-red-600">{analysis.missingHighCount}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">缺失必备技能</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-xl font-bold text-orange-600">{analysis.missingMediumCount}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">可补强技能</div>
                        </div>
                      </div>

                      {/* 学习建议 */}
                      {analysis.recommendedSkills.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-4">
                          <h5 className="font-medium mb-2 text-blue-700 dark:text-blue-300">🎯 推荐学习路径（按优先级排序）</h5>
                          <div className="space-y-2">
                            {analysis.recommendedSkills.map((skill, index) => (
                              <div key={skill.id} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{skill.name}</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">{skill.description}</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${
                                  skill.priority === 'high' ? 'bg-red-100 text-red-700' :
                                  skill.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {skill.priority === 'high' ? '必备' : skill.priority === 'medium' ? '重要' : '可选'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 行业业务知识建议 */}
                      {analysis.industryInfo && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 mb-4">
                          <h5 className="font-medium mb-2 text-green-700 dark:text-green-300">🏢 {analysis.industryInfo.name} - 业务知识建议</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{analysis.industryInfo.description}</p>
                          
                          {/* 业务技能 */}
                          <div className="mb-4">
                            <h6 className="font-medium text-sm mb-2">核心业务技能：</h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {analysis.industryInfo.businessSkills.map((skill, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded p-2 text-xs">
                                  <div className="font-medium text-green-600">{skill.name}</div>
                                  <div className="text-gray-600 dark:text-gray-400">{skill.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 常用工具 */}
                          <div className="mb-4">
                            <h6 className="font-medium text-sm mb-2">常用工具：</h6>
                            <div className="flex flex-wrap gap-2">
                              {analysis.industryInfo.tools.map((tool, index) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* 典型案例 */}
                          <div>
                            <h6 className="font-medium text-sm mb-2">典型分析案例：</h6>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {analysis.industryInfo.cases.join(' · ')}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 专业优势分析 */}
                      <div className="text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analysis.majorAdvantage.length > 0 && (
                            <div>
                              <span className="font-medium text-green-600">专业优势技能：</span>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {analysis.majorAdvantage.map(skillId => {
                                  const skill = Object.values(skillCategories)
                                    .flatMap(cat => cat.skills)
                                    .find(s => s.id === skillId)
                                  return skill?.name
                                }).filter(Boolean).join('、')}
                              </div>
                            </div>
                          )}
                          {analysis.majorDisadvantage.length > 0 && (
                            <div>
                              <span className="font-medium text-orange-600">需重点补强：</span>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {analysis.majorDisadvantage.map(skillId => {
                                  const skill = Object.values(skillCategories)
                                    .flatMap(cat => cat.skills)
                                    .find(s => s.id === skillId)
                                  return skill?.name
                                }).filter(Boolean).join('、')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </section>

            {/* 模块4：核心技能 */}
            <section id="skills" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">4. 核心技能（Core Skills and Focus Areas）</h2>
              <p className="mb-6">词云显示 SQL/Python 核心（频率 79%/66%），AI 趋势下机器学习/可视化上升。</p>
              
              {/* 技能分类 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-700">
                  <h3 className="font-semibold mb-3 text-red-700 dark:text-red-300">核心技能（必备）</h3>
                  <ul className="text-sm space-y-1">
                    <li>• SQL (79%) - 数据查询基础</li>
                    <li>• Python (66%) - 数据处理分析</li>
                    <li>• 统计学 (45%) - 建模基础</li>
                    <li>• Excel (38%) - 快速分析</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">可视化工具</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Tableau (22%) - 企业首选</li>
                    <li>• Power BI (18%) - 微软生态</li>
                    <li>• FineBI (12%) - 国产化</li>
                    <li>• Python可视化库</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <h3 className="font-semibold mb-3 text-green-700 dark:text-green-300">新兴技能（AI时代）</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 机器学习 (14%↗) - 预测建模</li>
                    <li>• ETL/云 (11%↗) - 数据工程</li>
                    <li>• Prompt工程 (8%↗) - AI协同</li>
                    <li>• 数据治理与伦理</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 模块5：业务知识 */}
            <section id="business" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">5. 业务知识与行业适应（Business Knowledge and Industry Adaptation）</h2>
              <p className="mb-6">
                <strong>"一半技术、一半业务"</strong> — 数据分析师的核心竞争力。技术技能（SQL/Python）提取数据，业务知识将数据转化为可执行洞见。
                21% 岗位明确提及行业经验，但实际需求更高。AI 时代，业务理解比纯技术更难被替代。
              </p>

              {/* 为什么业务知识重要 */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 mb-6 border border-orange-200 dark:border-orange-700">
                <h3 className="font-semibold mb-4 text-orange-700 dark:text-orange-300">🔗 为什么业务知识至关重要？</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2 text-blue-600">🌉 桥接数据与决策</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      技术生成报告，业务确保报告解决实际问题。如金融分析师需懂市场波动，否则数据模型无用。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-green-600 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" /> 提升职业价值
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      懂业务的分析师更易晋升，薪资高 10-20%（资深岗位平均 25K+），更易从技术转向管理。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-purple-600 flex items-center gap-2">
                      <Brain className="h-5 w-5" /> AI 补充而非取代
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      AI 可自动化技术，但业务需人类经验（洞察趋势、跨界整合）。2025年 AI+业务复合人才缺口大。
                    </p>
                  </div>
                </div>
              </div>

              {/* 行业特定要求 */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">🏢 不同行业的业务要求（基于岗位数据）</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left py-3">行业 (占比)</th>
                          <th className="text-left py-3">业务知识重点</th>
                          <th className="text-left py-3">薪资影响</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 font-medium">互联网/科技 (25%)</td>
                          <td className="py-3">用户行为、产品优化、AARRR模型、增长黑客</td>
                          <td className="py-3 text-green-600">18-25K</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 font-medium">金融/科技 (10%)</td>
                          <td className="py-3">风险评估、信贷模型、合规要求</td>
                          <td className="py-3 text-green-600">20-30K</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                          <td className="py-3 font-medium">电商/零售 (12%)</td>
                          <td className="py-3">供应链、库存管理、客户洞见</td>
                          <td className="py-3 text-blue-600">16-22K</td>
                        </tr>
                        <tr>
                          <td className="py-3 font-medium">制造业 (8%)</td>
                          <td className="py-3">IoT数据、预测维护、精益生产</td>
                          <td className="py-3 text-gray-600">12-18K</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 通用业务技能 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium mb-2 text-blue-600 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> 业务理解
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• 掌握核心 KPI（ROI、转化率、LTV、CAC）</li>
                    <li>• 理解业务流程（供应链、客户旅程、销售漏斗）</li>
                    <li>• 练习：分析公司财报，链接数据指标</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <h4 className="font-medium mb-2 text-green-600">🔍 问题解决</h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>• 从业务角度定义问题（"为什么销量降？"）</li>
                    <li>• 使用框架：SWOT分析、A/B测试、RCA</li>
                    <li>• 工具：业务画布、用户画像、竞品分析</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 其他模块简化展示 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section id="growth" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-4">6. 职业发展路径</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">从初级到资深的完整成长路径，含薪资范围和晋升要求</p>
                
                {/* 职业发展时间线 - 简化版 */}
                <div className="space-y-4">
                  {/* Level 1 */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 rounded-lg p-4 border border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-blue-700">Level 1: 初级分析师 (0-2年)</h3>
                      <span className="text-xl font-bold">10-15K</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">SQL · Excel · Python基础 | 数据清洗、基础报表</p>
                  </div>
                  
                  {/* Level 2 */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 rounded-lg p-4 border border-green-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-green-700">Level 2: 中级分析师 (2-4年)</h3>
                      <span className="text-xl font-bold">15-25K</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Python高级 · 统计分析 · BI工具 | 专题分析、A/B测试</p>
                  </div>
                  
                  {/* Level 3 */}
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 rounded-lg p-4 border border-purple-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-purple-700">Level 3: 高级分析师 (4-6年)</h3>
                      <span className="text-xl font-bold">25-40K</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">机器学习 · 业务建模 | 战略分析、复杂建模</p>
                  </div>
                  
                  {/* Level 4 */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-orange-700">Level 4: 资深专家/负责人 (6年+)</h3>
                      <span className="text-xl font-bold">40-80K+</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">战略规划 · 团队管理 | 体系搭建、战略决策</p>
                  </div>
                </div>
              </section>
              <section id="salary" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-4">7. 薪资分布详细分析</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">17.5K</div>
                    <div className="text-xs text-gray-600">全国平均</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12-25K</div>
                    <div className="text-xs text-gray-600">中位数区间</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+15%</div>
                    <div className="text-xs text-gray-600">AI技能加成</div>
                  </div>
                </div>
              </section>
              
              <section id="challenges" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-4">8. 职业挑战与应对</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" /> AI工具冲击
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">基础分析工作被替代风险高</p>
                    <p className="text-xs text-green-600"><strong>应对：</strong>深入学习业务知识，掌握AI工具成为"AI+分析师"</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200">
                    <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" /> 初级岗位饱和
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">竞争激烈，但中高级人才稀缺</p>
                    <p className="text-xs text-green-600"><strong>应对：</strong>选择细分领域深耕，尽早接触机器学习</p>
                  </div>
                </div>
              </section>
              
              <section id="resources" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-4">9. 实用学习建议</h2>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <h4 className="font-semibold text-blue-700 mb-2">🎯 0基础入门 (0-6个月)</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Excel → SQL基础 → 统计学基础</p>
                    <p className="text-xs text-gray-500 mt-1">推荐：本站核心技能模块、Kaggle Learn</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded">
                    <h4 className="font-semibold text-green-700 mb-2">🚀 进阶提升 (6-18个月)</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Python数据分析 → Tableau/Power BI → 统计建模</p>
                    <p className="text-xs text-gray-500 mt-1">推荐：Coursera、《统计学习方法》</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <h4 className="font-semibold text-purple-700 mb-2">💎 高级突破 (18个月+)</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">机器学习工程化 → 大数据平台 → 业务战略</p>
                    <p className="text-xs text-gray-500 mt-1">推荐：Fast.ai、行业会议（CDAS、ChinaBI）</p>
                  </div>
                </div>
              </section>
            </div>

            {/* 新增：数据职业生态图谱 */}
            <section id="career-ecosystem" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">数据职业生态图谱：找准定位，选对赛道</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                数据领域职位众多，从数据分析师、数据工程师到数据科学家、业务分析师...各有什么区别？如何入门和转型？
              </p>

              {/* 核心岗位关系图 */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6 border border-indigo-200 dark:border-indigo-700">
                <h3 className="font-semibold text-lg mb-4 text-indigo-700 dark:text-indigo-300">🎯 数据岗位生态全景图</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* 上游：数据基础设施 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-300">
                    <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                      <span className="text-2xl">⚙️</span> 上游：数据基础设施
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="font-semibold text-blue-600">数据工程师 (Data Engineer)</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：18-35K | 技能：Spark/Kafka/ETL</p>
                        <p className="text-xs text-gray-500 mt-1">🔧 搭建数据管道，保证数据可用</p>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="font-semibold text-blue-600">数据开发工程师</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：15-30K | 技能：SQL/Python/调度</p>
                        <p className="text-xs text-gray-500 mt-1">💾 开发数据仓库和ETL脚本</p>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="font-semibold text-blue-600">数据架构师</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：30-60K | 经验：5年+</p>
                        <p className="text-xs text-gray-500 mt-1">🏗️ 设计数据体系架构</p>
                      </div>
                    </div>
                  </div>

                  {/* 中游：数据分析与洞察 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-green-300">
                    <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-6 w-6" /> 中游：分析与洞察 <Award className="h-5 w-5 text-yellow-500" />
                      </div>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border-2 border-green-500">
                        <p className="font-semibold text-green-600">数据分析师 (本站重点)</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：10-25K | 技能：SQL/Python/BI</p>
                        <p className="text-xs text-gray-500 mt-1">📈 业务分析、报表、专题研究</p>
                      </div>
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="font-semibold text-green-600">业务分析师 (BA)</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：12-28K | 技能：业务理解+数据</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Briefcase className="h-3 w-3" /> 偏业务，深度理解业务流程
                        </p>
                      </div>
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="font-semibold text-green-600">数据挖掘工程师</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：18-35K | 技能：ML/算法/统计</p>
                        <p className="text-xs text-gray-500 mt-1">🔍 用算法从数据中找规律</p>
                      </div>
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="font-semibold text-green-600">数据科学家</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：25-50K | 学历：硕士+</p>
                        <p className="text-xs text-gray-500 mt-1">🧪 研究型，AI/ML建模专家</p>
                      </div>
                    </div>
                  </div>

                  {/* 下游：数据应用与管理 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-purple-300">
                    <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🚀</span> 下游：应用与管理
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <p className="font-semibold text-purple-600">数据产品经理</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：20-40K | 技能：产品+数据</p>
                        <p className="text-xs text-gray-500 mt-1">📱 设计数据产品和功能</p>
                      </div>
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <p className="font-semibold text-purple-600">数据策略运营</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：15-30K | 技能：运营+分析</p>
                        <p className="text-xs text-gray-500 mt-1">📢 用数据驱动运营决策</p>
                      </div>
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <p className="font-semibold text-purple-600">数据治理专家</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：25-45K | 经验：3年+</p>
                        <p className="text-xs text-gray-500 mt-1">🛡️ 数据质量、安全、合规</p>
                      </div>
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <p className="font-semibold text-purple-600">CDO (首席数据官)</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">薪资：60-150K+ | 经验：10年+</p>
                        <p className="text-xs text-gray-500 mt-1">👔 战略层，管理整个数据体系</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 关键区别对比 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <h4 className="font-semibold mb-3 text-indigo-600">🔑 数据分析师 vs 其他热门岗位：核心区别</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-3 py-2 text-left">岗位</th>
                          <th className="px-3 py-2 text-left">核心技能</th>
                          <th className="px-3 py-2 text-left">工作重点</th>
                          <th className="px-3 py-2 text-left">入门难度</th>
                          <th className="px-3 py-2 text-left">转换容易度</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        <tr className="bg-green-50 dark:bg-green-900/10">
                          <td className="px-3 py-2 font-medium">数据分析师</td>
                          <td className="px-3 py-2">SQL/Python/BI/统计学</td>
                          <td className="px-3 py-2">业务洞察、报表、专题分析</td>
                          <td className="px-3 py-2 text-green-600">★★☆☆☆ 中等</td>
                          <td className="px-3 py-2">→BA/数据挖掘/产品</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">数据工程师</td>
                          <td className="px-3 py-2">Spark/Kafka/ETL/Java</td>
                          <td className="px-3 py-2">数据管道、数仓搭建</td>
                          <td className="px-3 py-2 text-orange-600">★★★★☆ 较难</td>
                          <td className="px-3 py-2">→架构师/大数据</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">数据科学家</td>
                          <td className="px-3 py-2">ML/DL/数学/研究</td>
                          <td className="px-3 py-2">算法建模、AI研究</td>
                          <td className="px-3 py-2 text-red-600">★★★★★ 很难</td>
                          <td className="px-3 py-2">→算法专家/研究员</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">业务分析师</td>
                          <td className="px-3 py-2">业务理解+基础数据</td>
                          <td className="px-3 py-2">业务流程优化、需求分析</td>
                          <td className="px-3 py-2 text-green-600">★★☆☆☆ 易</td>
                          <td className="px-3 py-2">→产品经理/运营</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 font-medium">数据挖掘工程师</td>
                          <td className="px-3 py-2">ML/Python/特征工程</td>
                          <td className="px-3 py-2">推荐系统、风控模型</td>
                          <td className="px-3 py-2 text-orange-600">★★★★☆ 难</td>
                          <td className="px-3 py-2">→数据科学家/算法</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 职业转型路径图 */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-700">
                <h3 className="font-semibold text-lg mb-4 text-blue-700 dark:text-blue-300">🔄 职业转型路径图</h3>
                
                <div className="space-y-4">
                  {/* 从数据分析师出发的转型路径 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 text-blue-600">📍 从数据分析师出发：4条黄金转型路径</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 路径1: 技术深化 */}
                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 rounded border border-purple-200">
                        <h5 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                          <span>🔬</span> 路径1: 技术深化路线
                        </h5>
                        <div className="text-xs space-y-1">
                          <p className="font-mono">数据分析师 → 数据挖掘工程师 → 数据科学家 → 算法专家</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>适合：</strong>理工科背景，喜欢钻研技术</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>补强：</strong>机器学习、深度学习、数学建模</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>时间：</strong>2-3年</p>
                          <p className="text-green-600"><strong>薪资涨幅：</strong>+50-100%</p>
                        </div>
                      </div>

                      {/* 路径2: 业务深化 */}
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 rounded border border-green-200">
                        <h5 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" /> 路径2: 业务深化路线
                          </div>
                        </h5>
                        <div className="text-xs space-y-1">
                          <p className="font-mono">数据分析师 → 业务分析师 → 数据产品经理 → 业务负责人</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>适合：</strong>沟通能力强，对业务感兴趣</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>补强：</strong>深度业务理解、产品设计、项目管理</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>时间：</strong>3-4年</p>
                          <p className="text-green-600"><strong>薪资涨幅：</strong>+40-80%</p>
                        </div>
                      </div>

                      {/* 路径3: 工程转型 */}
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 rounded border border-blue-200">
                        <h5 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                          <span>⚙️</span> 路径3: 数据工程转型
                        </h5>
                        <div className="text-xs space-y-1">
                          <p className="font-mono">数据分析师 → 数据开发 → 数据工程师 → 数据架构师</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>适合：</strong>喜欢写代码，对底层技术感兴趣</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>补强：</strong>Spark/Kafka/ETL、Java/Scala、分布式系统</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>时间：</strong>2-3年</p>
                          <p className="text-green-600"><strong>薪资涨幅：</strong>+60-120%</p>
                        </div>
                      </div>

                      {/* 路径4: 管理路线 */}
                      <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 rounded border border-orange-200">
                        <h5 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
                          <span>👔</span> 路径4: 管理路线
                        </h5>
                        <div className="text-xs space-y-1">
                          <p className="font-mono">数据分析师 → 高级分析师 → 数据团队leader → CDO</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>适合：</strong>领导力强，战略思维好</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>补强：</strong>团队管理、战略规划、跨部门协作</p>
                          <p className="text-gray-600 dark:text-gray-400"><strong>时间：</strong>5-7年</p>
                          <p className="text-green-600"><strong>薪资涨幅：</strong>+100-200%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 其他岗位转数据分析师 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 text-green-600">🎯 其他岗位转数据分析师：入门攻略</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* 从运营转 */}
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border">
                        <h5 className="font-semibold text-green-700 mb-2">运营/市场 → 数据分析师</h5>
                        <p className="mb-2 text-gray-600 dark:text-gray-400"><strong>优势：</strong>业务理解深，知道数据用在哪</p>
                        <p className="mb-2 text-orange-600"><strong>补强：</strong>SQL(★★★★★)、Python(★★★☆☆)、统计学基础</p>
                        <p className="text-blue-600"><strong>时间：</strong>6-12个月 | <strong>难度：</strong>★★☆☆☆</p>
                      </div>

                      {/* 从开发转 */}
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
                        <h5 className="font-semibold text-blue-700 mb-2">程序员 → 数据分析师</h5>
                        <p className="mb-2 text-gray-600 dark:text-gray-400"><strong>优势：</strong>编程能力强，学工具快</p>
                        <p className="mb-2 text-orange-600"><strong>补强：</strong>业务理解(★★★★★)、统计学(★★★★☆)、可视化</p>
                        <p className="text-blue-600"><strong>时间：</strong>4-8个月 | <strong>难度：</strong>★★☆☆☆</p>
                      </div>

                      {/* 从财务/会计转 */}
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border">
                        <h5 className="font-semibold text-purple-700 mb-2">财务/会计 → 数据分析师</h5>
                        <p className="mb-2 text-gray-600 dark:text-gray-400"><strong>优势：</strong>数字敏感，Excel熟练</p>
                        <p className="mb-2 text-orange-600"><strong>补强：</strong>SQL(★★★★★)、Python(★★★★☆)、BI工具</p>
                        <p className="text-blue-600"><strong>时间：</strong>8-12个月 | <strong>难度：</strong>★★★☆☆</p>
                      </div>

                      {/* 从产品转 */}
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border">
                        <h5 className="font-semibold text-yellow-700 mb-2">产品经理 → 数据分析师</h5>
                        <p className="mb-2 text-gray-600 dark:text-gray-400"><strong>优势：</strong>懂用户需求，有产品思维</p>
                        <p className="mb-2 text-orange-600"><strong>补强：</strong>SQL(★★★★★)、统计学(★★★☆☆)、A/B测试</p>
                        <p className="text-blue-600"><strong>时间：</strong>6-10个月 | <strong>难度：</strong>★★☆☆☆</p>
                      </div>

                      {/* 从应届生 */}
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded border">
                        <h5 className="font-semibold text-indigo-700 mb-2">应届生 → 数据分析师</h5>
                        <p className="mb-2 text-gray-600 dark:text-gray-400"><strong>优势：</strong>学习能力强，时间充裕</p>
                        <p className="mb-2 text-orange-600"><strong>重点：</strong>SQL/Python/统计学 + 2-3个实战项目</p>
                        <p className="text-blue-600"><strong>时间：</strong>3-6个月 | <strong>难度：</strong>★★★☆☆</p>
                      </div>

                      {/* 从非技术岗 */}
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border">
                        <h5 className="font-semibold text-red-700 mb-2">非技术岗 → 数据分析师</h5>
                        <p className="mb-2 text-gray-600 dark:text-gray-400"><strong>挑战：</strong>零基础，需系统学习</p>
                        <p className="mb-2 text-orange-600"><strong>路径：</strong>Excel→SQL→Python→统计学→BI工具</p>
                        <p className="text-blue-600"><strong>时间：</strong>12-18个月 | <strong>难度：</strong>★★★★☆</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 实用建议 */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-5 border border-yellow-200 dark:border-yellow-700">
                <h3 className="font-semibold text-lg mb-4 text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> 转型/入门核心建议
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" /> 成功转型的关键
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                      <li>• <strong>做项目作品集：</strong>2-3个完整的数据分析项目，放在GitHub或个人网站</li>
                      <li>• <strong>选对细分领域：</strong>结合原岗位经验（如财务转金融数据分析）</li>
                      <li>• <strong>内部转岗优先：</strong>先在公司内部找数据分析相关工作</li>
                      <li>• <strong>找准切入点：</strong>从数据分析助理或实习开始也OK</li>
                      <li>• <strong>持续学习：</strong>每周至少10小时投入技能提升</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5" /> 常见误区
                    </h4>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                      <li>• <strong>只学工具不做项目：</strong>面试官要看实战能力，不是证书</li>
                      <li>• <strong>盲目追求高薪岗位：</strong>数据科学家门槛高，先从分析师做起</li>
                      <li>• <strong>忽视业务知识：</strong>技术只是工具，业务理解才是核心</li>
                      <li>• <strong>零准备就裸辞：</strong>建议边工作边学习，有收入保障</li>
                      <li>• <strong>学完Python就觉得够了：</strong>SQL、统计学同样重要</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 模块10：互动社区 */}
            <section id="community" className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-4">10. 互动社区（Interaction and Community）</h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
                <h3 className="font-semibold mb-4 text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  <Users className="h-5 w-5" /> 常见问题与互动
                </h3>
                <div className="space-y-4">
                  <details className="cursor-pointer">
                    <summary className="font-medium text-indigo-600 hover:text-indigo-800">Q: AI 会完全取代数据分析师吗？</summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 pl-4">
                      不会完全取代，但会改变工作模式。AI 擅长数据处理，人类擅长业务理解和创新。建议学习 AI 工具，成为"AI + 分析师"。
                    </p>
                  </details>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-indigo-600 hover:text-indigo-800">Q: 转行数据分析师最快需要多久？</summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 pl-4">
                      6-12 个月基础学习 + 3-6 个月实践项目。关键是从实习/初级岗位开始积累经验，重点学习业务知识。
                    </p>
                  </details>
                  <details className="cursor-pointer">
                    <summary className="font-medium text-indigo-600 hover:text-indigo-800">Q: 业务知识比技术更重要吗？</summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 pl-4">
                      两者同等重要，但业务知识更难被 AI 替代。技术是基础，业务是差异化优势。建议"一半技术、一半业务"的平衡发展。
                    </p>
                  </details>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" /> 数据来源与更新
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    数据基于某招聘软件 3,455 条岗位（2025年9月快照）。页面每季度更新，
                    建议关注最新趋势。特别感谢社区用户对"业务知识"模块的建议！
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </main>

    {/* 返回顶部按钮 */}
    {showBackToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
        aria-label="返回顶部"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    )}
    </>
  )
}
