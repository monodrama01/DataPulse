"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Github, 
  MapPin, 
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  Heart,
  Coffee,
  BookOpen,
  Target,
  TrendingUp,
  Users,
  Code,
  Database,
  BarChart3,
  Bot,
  PieChart,
  LineChart,
  Sparkles,
  Brain
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import Image from "next/image"

export default function About() {
  const { theme } = useTheme()

  const personalInfo = {
    name: "数据分析师",
    title: "Data Analyst & Business Intelligence Specialist",
    email: "2916852469@qq.com",
    location: "中国",
    github: "https://github.com/dashboard",
    experience: "0-1 年数据分析经验",
    education: "本科 · 信息管理与信息系统",
    major: "信息管理与信息系统",
    degree: "本科在读"
  }

  const highlights = [
    {
      icon: Database,
      title: "数据分析基础",
      description: "掌握Python、SQL、Excel等数据处理工具，熟练使用Jupyter Notebook、Navicat等专业工具",
      color: "text-cyan-600"
    },
    {
      icon: TrendingUp,
      title: "可视化能力",
      description: "熟练使用Power BI和Tableau进行数据可视化，能够创建清晰易懂的数据报表",
      color: "text-teal-600"
    },
    {
      icon: Code,
      title: "全栈开发",
      description: "自学Python全栈开发和机器学习，具备从数据到应用的完整技术栈",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "业务理解",
      description: "学习业务知识，能够结合业务场景进行数据分析，提供有价值的洞察",
      color: "text-emerald-600"
    }
  ]

  const timeline = [
    {
      year: "2025",
      title: "持续学习与实践",
      description: "深入学习业务知识，完善数据分析技能体系，构建个人项目作品集",
      type: "achievement"
    },
    {
      year: "2024",
      title: "全栈与机器学习进阶",
      description: "自学Python全栈开发、机器学习、Power BI和Tableau，掌握完整的数据分析技术栈",
      type: "learning"
    },
    {
      year: "2023",
      title: "数据分析专业课程",
      description: "学习Python数据分析基础、数据库原理及系统、数据分析方法与工具等核心课程",
      type: "learning"
    },
    {
      year: "2022",
      title: "开始数据分析学习之旅",
      description: "就读信息管理与信息系统专业，系统学习概率论与数理统计、线性代数、管理统计学等基础课程",
      type: "education"
    }
  ]

  const interests = [
    { name: "Python全栈开发", icon: Code },
    { name: "机器学习", icon: Bot },
    { name: "数据可视化", icon: BarChart3 },
    { name: "业务知识", icon: Briefcase },
    { name: "Excel高级应用", icon: LineChart },
    { name: "BI工具", icon: PieChart },
    { name: "数据库管理", icon: Database },
    { name: "持续学习", icon: Brain }
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 个人信息 */}
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                关于我
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100">
                {personalInfo.title}
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                我是一名在校大学生，就读于信息管理与信息系统专业，
                热爱数据分析，自学Python全栈开发与机器学习，
                致力于用数据驱动决策，创造实际价值。
              </p>
              
              {/* 联系信息 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-blue-200 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5" />
                  <a 
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-200 transition-colors"
                  >
                    GitHub Profile
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>{personalInfo.location}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5" />
                  <span>{personalInfo.experience}</span>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/projects">
                  <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50 font-semibold shadow-lg">
                    <BookOpen className="h-5 w-5 mr-2 text-cyan-600" />
                    查看项目
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button size="lg" className="bg-white/90 text-teal-700 hover:bg-white border-2 border-white font-semibold shadow-lg backdrop-blur-sm">
                    <Target className="h-5 w-5 mr-2 text-teal-700" />
                    技能展示
                  </Button>
                </Link>
                
                <a href={`mailto:${personalInfo.email}`}>
                  <Button size="lg" className="bg-white/90 text-blue-700 hover:bg-white border-2 border-white font-semibold shadow-lg backdrop-blur-sm">
                    <Mail className="h-5 w-5 mr-2 text-blue-700" />
                    联系我
                  </Button>
                </a>
              </div>
            </div>

            {/* 头像和统计 */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
                <div className="text-6xl">👨‍💻</div>
              </div>
              
              {/* 快速统计 */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-sm text-blue-100">核心技能</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">4+</div>
                  <div className="text-sm text-blue-100">项目作品</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">4年</div>
                  <div className="text-sm text-blue-100">学习历程</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-blue-100">学习热情</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心亮点 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              核心优势
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              以下是我在数据分析领域的核心竞争力和专业特长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <highlight.icon className={`h-6 w-6 ${highlight.color}`} />
                  </div>
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 教育背景与主修课程 */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              教育背景
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              系统的专业学习，为数据分析打下坚实基础
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 教育信息卡片 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-6 w-6 text-cyan-600" />
                  <CardTitle>本科在读</CardTitle>
                </div>
                <CardDescription className="text-lg font-semibold">
                  信息管理与信息系统专业
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>2022 - 2026（在读）</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    系统学习数据分析、数据库、统计学等核心课程，
                    并自学前沿技术，构建完整的数据分析知识体系。
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 学习工具 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Code className="h-6 w-6 text-teal-600" />
                  <CardTitle>熟练使用的工具</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-600">Jupyter Notebook</Badge>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">Navicat</Badge>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">Power BI</Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">Tableau</Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">Python</Badge>
                  <Badge variant="outline" className="text-red-600 border-red-600">SQL</Badge>
                  <Badge variant="outline" className="text-teal-600 border-teal-600">Excel</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主修课程 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-6 w-6 text-cyan-600" />
                <CardTitle>主修课程（数据分析强相关）</CardTitle>
              </div>
              <CardDescription>
                系统学习数据分析核心理论与实践技能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Python数据分析基础</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">核心技能</div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="font-semibold text-green-700 dark:text-green-300 mb-1">数据库原理及系统</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">数据管理</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">数据分析方法与工具</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">方法论</div>
                </div>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                  <div className="font-semibold text-orange-700 dark:text-orange-300 mb-1">概率论与数理统计</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">数学基础</div>
                </div>
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-700">
                  <div className="font-semibold text-pink-700 dark:text-pink-300 mb-1">线性代数</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">数学工具</div>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
                  <div className="font-semibold text-teal-700 dark:text-teal-300 mb-1">管理统计学</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">统计分析</div>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <div className="font-semibold text-indigo-700 dark:text-indigo-300 mb-1">信息检索</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">信息管理</div>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                  <div className="font-semibold text-red-700 dark:text-red-300 mb-1">运筹学</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">优化方法</div>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <div className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">Python程序设计</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">编程基础</div>
                </div>
              </div>
              
              {/* 自学内容 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-lg border-2 border-cyan-300 dark:border-cyan-700">
                <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  自学拓展
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-cyan-600">Python全栈开发</Badge>
                  <Badge className="bg-teal-600">机器学习</Badge>
                  <Badge className="bg-blue-600">Excel高级应用</Badge>
                  <Badge className="bg-emerald-600">Power BI</Badge>
                  <Badge className="bg-sky-600">Tableau</Badge>
                  <Badge className="bg-cyan-700">业务知识</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 成长历程 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              成长历程
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              我的数据分析学习轨迹和重要里程碑
            </p>
          </div>

          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-cyan-500" />
                          <Badge variant="outline" className="text-cyan-600 border-cyan-600">
                            {item.year}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* 时间节点 */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 兴趣爱好 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              兴趣领域
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              我热衷于探索的技术领域和个人兴趣
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, index) => {
              const IconComponent = interest.icon
              const colors = [
                "border-cyan-500 text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/50",
                "border-teal-500 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50",
                "border-blue-500 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50",
                "border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50",
                "border-sky-500 text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/30 hover:bg-sky-100 dark:hover:bg-sky-900/50",
                "border-indigo-500 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
                "border-violet-500 text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/30 hover:bg-violet-100 dark:hover:bg-violet-900/50",
                "border-purple-500 text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50"
              ]
              return (
                <Badge
                  key={index}
                  variant="outline"
                  className={`text-lg px-5 py-3 border-2 transition-all cursor-pointer flex items-center gap-2 font-semibold ${colors[index % colors.length]}`}
                >
                  <IconComponent className="h-5 w-5" />
                  {interest.name}
                </Badge>
              )
            })}
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="py-16 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              让我们一起合作
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              如果您对数据分析项目合作、技术交流或任何相关话题感兴趣，欢迎随时联系我！
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`mailto:${personalInfo.email}`}>
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  发送邮件
                </Button>
              </a>
              
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
              
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                  <BookOpen className="h-4 w-4 mr-2" />
                  查看作品
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 text-red-300" />
            用数据创造价值，用技术改变世界
            <Coffee className="h-4 w-4 text-yellow-300" />
          </p>
        </div>
      </footer>
    </div>
  )
}
