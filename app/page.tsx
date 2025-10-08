"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, BarChart3, FileSpreadsheet, Brain, TrendingUp, PieChart, Zap, Code, Users, Briefcase, Search } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

interface Skill {
  name: string
  description: string
  icon: any
  color: string
  applications: string
  mastered: string
  image: string
  href?: string
}

const skills: Skill[] = [
  {
    name: "数据思维",
    description: "用数据驱动决策的思维方式",
    icon: Brain,
    color: "text-[#19bcc8]",
    applications: "业务分析、决策支持",
    mastered: "数据敏感度、逻辑思维",
    image: "/images/thought.webp",
    href: "/data-thinking"
  },
  {
    name: "业务知识",
    description: "深入理解业务场景和需求",
    icon: Users,
    color: "text-[#19bcc8]",
    applications: "行业分析、业务优化",
    mastered: "业务理解、需求分析",
    image: "/images/business.webp",
    href: "/business"
  },
  {
    name: "统计分析",
    description: "基于统计学的数据分析",
    icon: BarChart3,
    color: "text-[#19bcc8]",
    applications: "假设检验、相关性分析",
    mastered: "统计方法、结果解释",
    image: "/images/statistics.webp",
    href: "/statistics"
  },
  {
    name: "EXCEL",
    description: "强大的数据处理和分析工具",
    icon: FileSpreadsheet,
    color: "text-[#19bcc8]",
    applications: "数据整理、基础分析",
    mastered: "函数、透视表、图表",
    image: "/images/excel.webp",
    href: "/excel"
  },
  {
    name: "SQL",
    description: "数据库查询和分析语言",
    icon: Database,
    color: "text-[#19bcc8]",
    applications: "数据提取、分析查询",
    mastered: "复杂查询、性能优化",
    image: "/images/SQL.webp",
    href: "/sql"
  },
  {
    name: "Python",
    description: "数据科学的核心编程语言",
    icon: Code,
    color: "text-[#19bcc8]",
    applications: "数据分析、机器学习",
    mastered: "Pandas、NumPy、可视化",
    image: "/images/python.webp",
    href: "/python"
  },
  {
    name: "数据可视化",
    description: "将数据转化为直观图表",
    icon: PieChart,
    color: "text-[#19bcc8]",
    applications: "报告制作、趋势展示",
    mastered: "图表设计、交互展示",
    image: "/images/BI.webp",
    href: "/visualization"
  },
  {
    name: "机器学习",
    description: "AI驱动的数据分析方法",
    icon: TrendingUp,
    color: "text-[#19bcc8]",
    applications: "预测分析、模式识别",
    mastered: "算法应用、模型评估",
    image: "/images/ML.webp",
    href: "/machine-learning"
  },
  {
    name: "自动化脚本",
    description: "提高工作效率的自动化工具",
    icon: Zap,
    color: "text-[#19bcc8]",
    applications: "流程自动化、批量处理",
    mastered: "脚本编写、任务调度",
    image: "/images/AI.webp",
    href: "/automation"
  }
]

export default function Home() {
  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* Hero Section - 深蓝到浅绿渐变背景 */}
      <section className="py-12" style={{
        background: 'linear-gradient(to right, #1e3a8a 7%, #3b82f6 36%, #dcfce7 68%, #bbf7d0 94%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 左侧：标题和按钮 */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">数据分析</h1>
              <p className="text-lg text-white mb-6 italic">Data Analysis</p>
              <div className="flex gap-4">
                <Link href="/quick-analysis">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                    快捷分析
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                    精选项目
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* 右侧：要点列表 */}
            <div className="text-black">
              <ul className="space-y-3 list-disc pl-6">
                <li>用简单有效的方法，拆解数据驱动分析的常见问题</li>
                <li>专注项目落地和提升，减少空谈理论</li>
                <li>覆盖 Python、Excel 与可视化的常用实践</li>
                <li>易学易用，助力数据驱动决策</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid - 3x3 网格 */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 区域标题 */}
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              核心技能矩阵
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              数据分析师必备的9大核心能力
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name} 
                className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border-2 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-teal-400'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* 渐变装饰条 */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500"></div>
                
                <CardHeader className="pb-3">
                  {skill.href ? (
                    <Link href={skill.href} className="flex items-center gap-3 mb-3 group/link">
                      {/* 图标背景 */}
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} group-hover:scale-110 transition-transform duration-300`}>
                        <skill.icon className={`h-6 w-6 ${skill.color}`} strokeWidth={1.5} />
                      </div>
                      <CardTitle className={`text-xl font-bold ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      } group-hover/link:text-teal-600 cursor-pointer transition-colors`}>
                        {skill.name}
                      </CardTitle>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 mb-3">
                      {/* 图标背景 */}
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} group-hover:scale-110 transition-transform duration-300`}>
                        <skill.icon className={`h-6 w-6 ${skill.color}`} strokeWidth={1.5} />
                      </div>
                      <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {skill.name}
                      </CardTitle>
                    </div>
                  )}
                  <CardDescription className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {skill.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 应用场景 */}
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                    <h4 className={`text-sm font-semibold mb-1 flex items-center gap-2 ${
                      theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      应用场景
                    </h4>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {skill.applications}
                    </p>
                  </div>

                  {/* 掌握技能 */}
                  <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-green-50'}`}>
                    <h4 className={`text-sm font-semibold mb-1 flex items-center gap-2 ${
                      theme === 'dark' ? 'text-green-300' : 'text-green-700'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      掌握技能
                    </h4>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {skill.mastered}
                    </p>
                  </div>

                  {/* 图片展示区 */}
                  <div className="space-y-3">
                    <div className="relative group/img">
                      <div className={`w-full h-56 rounded-lg overflow-hidden border-2 ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      } shadow-md group-hover/img:shadow-xl transition-all duration-300 ${
                        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      }`}>
                        <img 
                          src={skill.image} 
                          alt={skill.name} 
                          className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* 图片遮罩效果 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    </div>

                    {/* Showcases按钮 */}
                    {(() => {
                      const skillToModuleMap: { [key: string]: string } = {
                        "数据思维": "showcases",
                        "业务知识": "showcases/business",
                        "EXCEL": "showcases/excel", 
                        "Python": "showcases/python",
                        "SQL": "showcases/sql",
                        "机器学习": "showcases/ml",
                        "数据可视化": "showcases/visualization",
                        "统计分析": "showcases/statistics",
                        "自动化脚本": "showcases/automation"
                      }
                      
                      const showcaseUrl = skillToModuleMap[skill.name]
                      
                      return showcaseUrl ? (
                        <Link href={`/${showcaseUrl}`} className="block">
                          <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                            {getLucideIcon('📊', 'w-5 h-5 text-white')}
                            Showcases
                            <span>→</span>
                          </button>
                        </Link>
                      ) : (
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-sm font-semibold rounded-lg cursor-not-allowed opacity-60 flex items-center justify-center gap-2">
                          {getLucideIcon('🔒', 'w-5 h-5 text-white')}
                          敬请期待
                        </button>
                      )
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 拓展技术模块 */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              拓展技术栈
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              补充核心技能之外的专业工具与平台，拓宽技术视野
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 数据采集工具 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-700' : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <Search className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/data-collection">
                    <CardTitle className="text-lg hover:text-yellow-600 cursor-pointer transition-colors">
                      数据采集工具
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Scrapy 爬虫</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Selenium 自动化</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Beautiful Soup</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>API 对接</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  网页抓取与自动化数据收集
                </p>
                <Link href="/data-collection" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 数据清洗工具 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <Zap className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/data-cleaning-tools">
                    <CardTitle className="text-lg hover:text-purple-600 cursor-pointer transition-colors">
                      数据清洗工具
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Pandas 清洗</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Power Query</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>OpenRefine</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>SQL 处理</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  专业数据清洗与质量提升工具
                </p>
                <Link href="/data-cleaning-tools" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 统计分析工具 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <TrendingUp className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/statistical-tools">
                    <CardTitle className="text-lg hover:text-blue-600 cursor-pointer transition-colors">
                      统计分析工具
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>R 语言</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>SPSS Statistics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>SAS Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Stata 计量</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  专业统计建模与假设检验工具
                </p>
                <Link href="/statistical-tools" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 商业智能BI */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <BarChart3 className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/bi-tools">
                    <CardTitle className="text-lg hover:text-green-600 cursor-pointer transition-colors">
                      商业智能 BI
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Tableau Desktop</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Power BI</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Looker/Metabase</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>QlikView/Sense</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  企业级数据可视化与报表平台
                </p>
                <Link href="/bi-tools" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 关系型数据库 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/30 to-rose-900/30 border-pink-700' : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <Database className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/relational-databases">
                    <CardTitle className="text-lg hover:text-pink-600 cursor-pointer transition-colors">
                      关系型数据库
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>MySQL/PostgreSQL</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>进阶SQL技能</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>数据库设计</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>性能优化</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  从SQL到数据库设计的全面进阶
                </p>
                <Link href="/relational-databases" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* NoSQL数据库 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-700' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <Database className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/nosql">
                    <CardTitle className="text-lg hover:text-red-600 cursor-pointer transition-colors">
                      NoSQL 数据库
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>MongoDB 文档</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Redis 缓存</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Elasticsearch</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Cassandra</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  高性能分布式数据存储
                </p>
                <Link href="/nosql" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 大数据技术 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <Zap className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <Link href="/big-data">
                    <CardTitle className="text-lg hover:text-orange-600 cursor-pointer transition-colors">
                      大数据技术
                    </CardTitle>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Apache Spark</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Hadoop/HDFS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Hive/Presto</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Flink 流计算</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  处理海量数据的分布式计算框架
                </p>
                <Link href="/big-data" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 云计算平台 */}
            <Card className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200'} border-2`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#19bcc8]/10">
                    <Database className="h-6 w-6 text-[#19bcc8]" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <Link href="/cloud-platforms">
                      <CardTitle className="text-lg hover:text-cyan-600 cursor-pointer transition-colors">
                        云计算平台
                      </CardTitle>
                    </Link>
                    <Badge className="text-xs bg-orange-500 text-white">进阶</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>AWS 数据服务</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Google BigQuery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>Azure 数据平台</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>阿里云/腾讯云</span>
                </div>
                <p className={`text-xs mt-3 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  云端数据服务 · 数据工程师进阶
                </p>
                <Link href="/cloud-platforms" className="block">
                  <Button size="sm" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs">
                    查看详情 →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* 查看详情按钮 */}
          <div className="text-center mt-10">
            <Link href="/tech-stack">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8">
                查看完整技术栈介绍 →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 题库入口区域 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SQL/Pandas 题库 */}
            <Card className={`hover:shadow-xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900 to-indigo-900 border-blue-600' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300'}`}>
              <CardContent className="py-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-[#19bcc8]/10">
                      <Database className="h-10 w-10 text-[#19bcc8]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        SQL/Pandas 题库
                      </h3>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        用 SQL 或 Pandas 解题，双模式练习数据查询与分析技能
                      </p>
                    </div>
                  </div>
                  <Link href="/quiz" className="w-full">
                    <Button size="lg" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white">
                      开始练习 →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 业务题库 */}
            <Card className={`hover:shadow-xl transition-all duration-300 border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900 to-pink-900 border-purple-600' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'}`}>
              <CardContent className="py-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-[#19bcc8]/10">
                      <Briefcase className="h-10 w-10 text-[#19bcc8]" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        业务题库
                      </h3>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        热门行业真实业务场景，提升数据分析实战能力
                      </p>
                    </div>
                  </div>
                  <Link href="/business-cases" className="w-full">
                    <Button size="lg" className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white">
                      开始挑战 →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">本网站由我个人独立设计与维护,作为数据分析学习的一部分。</p>
        </div>
      </footer>
    </div>
  )
}
