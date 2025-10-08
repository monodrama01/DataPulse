"use client"

import React, { useState, useEffect } from 'react'
import { getLucideIcon } from "@/components/LucideIcon";
import * as echarts from 'echarts'
import { Navigation } from "@/components/navigation"
import { Home, ChevronUp, PieChart, Star, BarChart3, Target, Eye, TrendingUp, CheckCircle, Zap, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ChartCard from "@/components/ChartCard"

const navItems = [
  { id: "importance", title: "1. 数据可视化重要性" },
  { id: "principles", title: "2. 可视化核心原则" },
  { id: "color-design", title: "3. 配色方案速查库" },
  { id: "common-mistakes", title: "4. 避坑指南与误区" },
  { id: "data-preparation", title: "5. 数据清洗实战" },
  { id: "storytelling", title: "6. 数据叙事技巧" },
  { id: "interactive-design", title: "7. 交互设计指南" },
  { id: "chart-types", title: "8. 图表类型与应用场景" },
  { id: "chart-decision", title: "9. 智能图表选择决策" },
  { id: "industry-cases", title: "10. 六大行业实战地图" },
  { id: "workflow", title: "11. 可视化7步工作法" },
  { id: "checklist", title: "12. 发布前质量检查" },
  { id: "tools", title: "13. 主流工具与实操" },
  { id: "cases", title: "14. 可视化实战案例" },
  { id: "dashboard", title: "15. Dashboard大屏实战" }
]

// StarRating 组件
const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
    ))}
  </div>
)

export default function VisualizationHome() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)

      const childSections = navItems.map(n => n.id)
      const parentSections = [
        'overview'
      ]

      let found: string | null = null
      const viewportMid = window.innerHeight / 2
      let nearest: string | null = null
      for (const id of childSections) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= viewportMid) {
          nearest = id
        } else {
          break
        }
      }
      found = nearest

      if (!found) {
        for (const id of parentSections) {
          const el = document.getElementById(id)
          if (!el) continue
          const r = el.getBoundingClientRect()
          if (r.top <= viewportMid && r.bottom >= viewportMid) { found = id; break }
        }
      }

      if (found) setActiveSection(found)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const textColor = theme === 'dark' ? '#e5e7eb' : '#111827'
  const subTextColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const axisLineColor = theme === 'dark' ? '#374151' : '#e5e7eb'
  const baseGrid = { left: 40, right: 20, top: 30, bottom: 40 }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-2">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Home size={20} />
              <span className="font-medium">主页</span>
            </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>数据可视化</span>
            </div>
          </div>
        </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-4 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-base font-bold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}
                <span>页面导航</span>
              </h3>
              <nav className="space-y-1 text-sm">
                {navItems.map((item, idx) => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`} 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${
                      activeSection === item.id
                        ? 'text-[#19bcc8] bg-[#19bcc8]/10'
                        : (theme === 'dark' ? 'text-gray-300 hover:bg-[#19bcc8]/10 hover:text-[#19bcc8]' : 'text-gray-700 hover:bg-[#19bcc8]/10 hover:text-[#19bcc8]')
                    }`}
                  >
                    {getLucideIcon(['📊', '📐', '🎨', '⚠️', '🔧', '📖', '🖱️', '📈', '🧭', '🗺️', '⚙️', '✅', '🛠️', '💼', '📺'][idx], 'w-5 h-5 text-[#19bcc8]')}
                    <span>{item.title}</span>
                  </a>
                ))}
              </nav>
      </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <h1 className={`text-5xl font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  数据可视化
                </h1>
              </div>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                将复杂数据转化为直观图表·数据分析必备技能
              </p>
            </div>

            {/* 1. 重要性 */}
            <section id="importance" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 via-gray-800 to-pink-900/40 border-purple-700' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-purple-500 via-pink-500 to-purple-700' : 'bg-gradient-to-b from-purple-400 via-pink-400 to-purple-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 01</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-green-600 border-green-600 font-semibold">必备技能</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据可视化重要性
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    用图表讲故事·让数据会说话·提升决策效率
                  </p>
            </div>
          </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <CheckCircle className="h-5 w-5" />
                      提升理解与沟通效率
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <p className="mb-2">将枯燥的数字和表格转化为直观的图形，大脑处理速度是文本的6万倍。</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>快速发现数据中的模式、趋势和异常</li>
                      <li>简化复杂概念，促进团队内部高效沟通</li>
                      <li>增强报告和演示文稿的说服力</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Zap className="h-5 w-5" />
                      驱动决策与业务增长
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <p className="mb-2">可视化是"指标-诊断-行动-复盘"决策闭环的关键环节。</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>辅助管理层快速洞察业务表现，制定战略</li>
                      <li>识别潜在问题和增长机会，优化资源配置</li>
                      <li>支持A/B测试结果分析，验证假设</li>
                    </ul>
                  </CardContent>
                </Card>
                        </div>
            </section>

            {/* 2. 原则 */}
            <section id="principles" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 via-gray-800 to-cyan-900/40 border-blue-700' : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-700' : 'bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 02</Badge>
                    <StarRating count={4} />
                    <Badge variant="outline" className="text-blue-600 border-blue-600 font-semibold">核心理念</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 可视化核心原则
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    有效传达信息·避免误导·提升图表质量
                  </p>
                </div>
            </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                      <Eye className="h-5 w-5" />
                      选对图表：任务匹配
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <p className="mb-2">根据数据关系和分析目的选择最合适的图表类型。</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>对比：</strong>柱状图、条形图</li>
                      <li><strong>趋势：</strong>折线图、面积图</li>
                      <li><strong>占比：</strong>饼图、环形图、矩形树图</li>
                      <li><strong>相关：</strong>散点图、气泡图</li>
                      <li><strong>分布：</strong>直方图、箱线图、密度图</li>
                      <li><strong>结构：</strong>树图、桑基图</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                      <TrendingUp className="h-5 w-5" />
                      突出重点：信息聚焦
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <p className="mb-2">通过视觉元素引导读者关注最重要的数据点和结论。</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>色彩：</strong>强调色、警示色、中性色合理搭配</li>
                      <li><strong>粗细：</strong>关键线条、文字加粗</li>
                      <li><strong>标注：</strong>直接在图上添加数据标签、注释</li>
                      <li><strong>排序：</strong>按大小、时间或逻辑顺序排列数据</li>
                      <li><strong>简化：</strong>移除不必要的网格线、边框、背景</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <AlertTriangle className="h-5 w-5" />
                      保持一致：规范统一
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <p className="mb-2">在整个报告或仪表板中保持视觉元素和交互行为的统一性。</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>色板：</strong>统一的品牌色、分类色、警示色</li>
                      <li><strong>字号：</strong>标题、轴标签、数据标签字号一致</li>
                      <li><strong>间距：</strong>图表间、元素间保持合理间距</li>
                      <li><strong>轴刻度：</strong>相同指标的轴刻度、单位保持一致</li>
                      <li><strong>交互：</strong>筛选器、下钻、联动行为统一</li>
                    </ul>
                  </CardContent>
                </Card>
          </div>
            </section>

            {/* 3. 色彩设计专题 */}
            <section id="color-design" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/40 via-gray-800 to-rose-900/40 border-pink-700' : 'bg-gradient-to-br from-pink-50 via-white to-rose-50 border-pink-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-pink-500 via-rose-500 to-pink-700' : 'bg-gradient-to-b from-pink-400 via-rose-400 to-pink-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-pink-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 03</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-pink-600 border-pink-600 font-semibold">设计美学</Badge>
        </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700'}`}>
                    🎨 配色方案速查库
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">告别配色纠结症</strong> - 分类/顺序/发散配色方案 + 色盲友好 + 深色模式适配
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-pink-900/30' : 'bg-pink-100'}`}>
                    <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：科学配色，提升作品专业度50%</span>
                  </div>
      </div>
    </div>

              <div className="space-y-6">
                {/* 色彩心理学 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-pink-600 dark:text-pink-400 text-xl">
                      🧠 色彩心理学与语义
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p>不同颜色会触发特定的情感反应和联想，选对颜色能增强信息传达效果。</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-red-900/20 border-red-700':'bg-red-50 border-red-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded bg-red-600"></div>
                          <h4 className="font-bold text-red-600">红色 - 警告/紧急</h4>
                        </div>
                        <ul className="text-xs space-y-1">
                          <li>• 负面指标（亏损、下降、异常）</li>
                          <li>• 危险警告（超阈值、故障）</li>
                          <li>• 重要强调（KPI未达标）</li>
                          <li className="text-red-600">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避免：大面积使用引起焦虑</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-green-900/20 border-green-700':'bg-green-50 border-green-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded bg-green-600"></div>
                          <h4 className="font-bold text-green-600">绿色 - 正常/成功</h4>
                        </div>
                        <ul className="text-xs space-y-1">
                          <li>• 正面指标（增长、达标）</li>
                          <li>• 健康状态（系统正常）</li>
                          <li>• 成功完成（交易成功）</li>
                          <li className="text-yellow-600">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：8%男性红绿色盲</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-blue-900/20 border-blue-700':'bg-blue-50 border-blue-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded bg-blue-600"></div>
                          <h4 className="font-bold text-blue-600">蓝色 - 中性/信任</h4>
                        </div>
                        <ul className="text-xs space-y-1">
                          <li>• 主色调（品牌色、标题）</li>
                          <li>• 中性数据（无情感倾向）</li>
                          <li>• 商业场景（专业、可靠）</li>
                          <li className="text-green-600">✓ 优点：最安全的颜色选择</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-yellow-900/20 border-yellow-700':'bg-yellow-50 border-yellow-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded bg-yellow-500"></div>
                          <h4 className="font-bold text-yellow-700 dark:text-yellow-500">黄色 - 提醒/关注</h4>
                        </div>
                        <ul className="text-xs space-y-1">
                          <li>• 中性预警（接近阈值）</li>
                          <li>• 需要关注的数据点</li>
                          <li>• 临时状态（待审核）</li>
                          <li className="text-yellow-600">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避免：白底上黄色难读</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-purple-900/20 border-purple-700':'bg-purple-50 border-purple-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded bg-purple-600"></div>
                          <h4 className="font-bold text-purple-600">紫色 - 创新/高级</h4>
                        </div>
                        <ul className="text-xs space-y-1">
                          <li>• 创新产品、科技感</li>
                          <li>• 高端定位、奢侈品</li>
                          <li>• 特殊类别标记</li>
                          <li className="text-green-600">✓ 区分度高、记忆深刻</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-gray-700/50 border-gray-600':'bg-gray-100 border-gray-300'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded bg-gray-600"></div>
                          <h4 className="font-bold text-gray-600 dark:text-gray-400">灰色 - 次要/禁用</h4>
                        </div>
                        <ul className="text-xs space-y-1">
                          <li>• 次要信息（辅助文字）</li>
                          <li>• 禁用状态（不可用）</li>
                          <li>• 背景网格、分隔线</li>
                          <li className="text-green-600">✓ 不抢夺主要注意力</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 配色方案 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-pink-600 dark:text-pink-400 text-xl">
                      🎨 三种配色方案选择
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">1️⃣ 分类色（Categorical）</h4>
                        <p className="text-xs mb-2">用于区分<strong>不同类别</strong>，颜色无大小之分</p>
                        <div className="flex gap-2 mb-2">
                          <div className="flex-1 h-8 bg-blue-500 rounded"></div>
                          <div className="flex-1 h-8 bg-green-500 rounded"></div>
                          <div className="flex-1 h-8 bg-orange-500 rounded"></div>
                          <div className="flex-1 h-8 bg-purple-500 rounded"></div>
                        </div>
                        <p className="text-xs"><strong>适用：</strong>产品类别、地区、部门</p>
                        <p className="text-xs mt-1"><strong>推荐：</strong>Tableau 10色板</p>
                        <p className="text-xs text-yellow-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 不超过7种颜色</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-600 mb-3">2️⃣ 连续色（Sequential）</h4>
                        <p className="text-xs mb-2">用于表示<strong>数值大小</strong>，颜色从浅到深</p>
                        <div className="h-8 bg-gradient-to-r from-blue-100 via-blue-400 to-blue-800 rounded mb-2"></div>
                        <p className="text-xs"><strong>适用：</strong>销售额、人口密度、温度</p>
                        <p className="text-xs mt-1"><strong>推荐：</strong>单色渐变（蓝色系）</p>
                        <p className="text-xs text-yellow-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避免纯红或纯绿单色</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-600 mb-3">3️⃣ 发散色（Diverging）</h4>
                        <p className="text-xs mb-2">用于表示<strong>正负偏离</strong>，中间为中性色</p>
                        <div className="h-8 bg-gradient-to-r from-red-600 via-gray-200 to-blue-600 rounded mb-2"></div>
                        <p className="text-xs"><strong>适用：</strong>盈亏、增减、好坏对比</p>
                        <p className="text-xs mt-1"><strong>推荐：</strong>红-白-蓝、橙-白-青</p>
                        <p className="text-xs text-yellow-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 中点要对齐零值</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 色盲友好设计 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-pink-600 dark:text-pink-400 text-xl flex items-center gap-2">
                      ♿ 色盲友好设计（无障碍设计）
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>重要性：</strong>全球约8%男性、0.5%女性患有红绿色盲，设计时需考虑可访问性。</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-900/20':'bg-red-50'}`}>
                        <h4 className="font-bold text-red-600 mb-2">❌ 避免的配色</h4>
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="mb-1">红绿对比（最常见错误）</p>
                            <div className="flex gap-2">
                              <div className="flex-1 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs">亏损</div>
                              <div className="flex-1 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs">盈利</div>
                            </div>
                            <p className="text-red-600 mt-1">→ 红绿色盲无法区分</p>
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                        <h4 className="font-bold text-green-600 mb-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 推荐的方案</h4>
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="mb-1">蓝橙对比（色盲友好）</p>
                            <div className="flex gap-2">
                              <div className="flex-1 h-6 bg-orange-600 rounded flex items-center justify-center text-white text-xs">亏损</div>
                              <div className="flex-1 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">盈利</div>
                            </div>
                            <p className="text-green-600 mt-1">→ 色盲也能清晰区分</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                      <p className="text-xs font-semibold mb-1">🔧 测试工具推荐：</p>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Coblis:</strong> 在线色盲模拟器</li>
                        <li>• <strong>ColorBrewer:</strong> 色盲友好配色方案</li>
                        <li>• <strong>Tableau:</strong> 内置色盲友好调色板</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 暗色模式适配 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-pink-600 dark:text-pink-400 text-xl">
                      🌙 暗色模式色彩适配
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p>暗色模式下，纯白色刺眼、饱和度过高易疲劳，需要调整配色策略。</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-gray-900 border border-gray-700':'bg-gray-100 border border-gray-300'}`}>
                        <h4 className="font-bold mb-2">暗色模式最佳实践</h4>
                        <ul className="text-xs space-y-2">
                          <li>• <strong>背景：</strong>深灰（#1a1a1a）而非纯黑</li>
                          <li>• <strong>文字：</strong>浅灰（#e5e7eb）而非纯白</li>
                          <li>• <strong>图表：</strong>降低饱和度（60-80%）</li>
                          <li>• <strong>边框：</strong>深灰色（#374151）</li>
                          <li>• <strong>阴影：</strong>用边框代替</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-gray-700':'bg-white border border-gray-300'}`}>
                        <h4 className="font-bold mb-2">颜色饱和度对比</h4>
                        <div className="space-y-2 text-xs">
                          <div>
                            <p className="mb-1">❌ 亮色模式饱和度</p>
                            <div className="flex gap-1">
                              <div className="flex-1 h-6 bg-blue-600 rounded"></div>
                              <div className="flex-1 h-6 bg-green-600 rounded"></div>
                              <div className="flex-1 h-6 bg-red-600 rounded"></div>
                            </div>
                          </div>
                          <div>
                            <p className="mb-1"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 暗色模式降低饱和度</p>
                            <div className="flex gap-1">
                              <div className="flex-1 h-6 bg-blue-400 rounded"></div>
                              <div className="flex-1 h-6 bg-green-400 rounded"></div>
                              <div className="flex-1 h-6 bg-red-400 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. 常见错误案例 */}
            <section id="common-mistakes" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-900/40 via-gray-800 to-orange-900/40 border-red-700' : 'bg-gradient-to-br from-red-50 via-white to-orange-50 border-red-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-red-500 via-orange-500 to-red-700' : 'bg-gradient-to-b from-red-400 via-orange-400 to-red-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-red-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 04</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">避坑指南</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-red-700'}`}>
                    ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避坑指南与误区
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">别踩前人的坑</strong> - 截断Y轴/3D饼图/双Y轴/图表垃圾 反面教材对比学习
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：识别并避免90%的低级错误</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* 错误1: 截断Y轴 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400 text-xl flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      错误1：截断Y轴制造假象
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>问题：</strong>Y轴不从0开始，夸大微小差异，误导读者。</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-900/20 border-red-700':'bg-red-50 border-red-300'} border-2`}>
                        <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">❌ 错误示例</h4>
                        <ChartCard 
                          title="月度销售额（误导性）" 
                          option={{ 
                            color:['#ef4444'], 
                            tooltip:{trigger:'axis'}, 
                            grid:{left:50, right:20, top:30, bottom:40}, 
                            xAxis:{type:'category', data:['1月','2月','3月','4月'], axisLabel:{color:subTextColor}}, 
                            yAxis:{type:'value', min:95, max:105, axisLabel:{color:subTextColor}, splitLine:{lineStyle:{color:axisLineColor}}}, 
                            series:[{type:'bar', data:[98, 100, 101, 102], barMaxWidth:40}] 
                          }} 
                        />
                        <p className="text-xs text-red-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Y轴从95开始，让2%增长看起来像翻倍！</p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20 border-green-700':'bg-green-50 border-green-300'} border-2`}>
                        <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 正确做法</h4>
                        <ChartCard 
                          title="月度销售额（真实对比）" 
                          option={{ 
                            color:['#10b981'], 
                            tooltip:{trigger:'axis'}, 
                            grid:{left:50, right:20, top:30, bottom:40}, 
                            xAxis:{type:'category', data:['1月','2月','3月','4月'], axisLabel:{color:subTextColor}}, 
                            yAxis:{type:'value', min:0, axisLabel:{color:subTextColor}, splitLine:{lineStyle:{color:axisLineColor}}}, 
                            series:[{type:'bar', data:[98, 100, 101, 102], barMaxWidth:40}] 
                          }} 
                        />
                        <p className="text-xs text-green-600 mt-2">✓ Y轴从0开始，真实反映实际增幅</p>
                      </div>
                    </div>
                    <div className={`p-3 rounded ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                      <p className="text-xs"><strong>例外情况：</strong>温度、股价等非零基准指标可以不从0开始，但需明确标注。</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 错误2: 3D效果 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400 text-xl flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      错误2：3D效果扭曲占比
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>问题：</strong>3D透视让前面的扇区显得更大，扭曲真实占比。避免使用3D饼图、3D柱状图等。</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-900/20 border-red-700':'bg-red-50 border-red-300'} border-2`}>
                        <h4 className="font-bold text-red-600 mb-3">❌ 3D饼图（不推荐）</h4>
                        <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-800/30':'bg-red-100'} my-3`}>
                          <p className="text-xs font-bold text-red-600 mb-2">⚠️ 3D透视扭曲问题：</p>
                          <ul className="text-xs space-y-1">
                            <li>• 前景扇区因透视效果被放大25-30%</li>
                            <li>• 后景扇区被压缩，占比看起来更小</li>
                            <li>• 用户难以准确判断真实占比</li>
                            <li>• 倾斜角度会进一步扭曲数据</li>
                          </ul>
                        </div>
                        <div className={`p-3 rounded ${theme==='dark'?'bg-gray-700':'bg-gray-100'} text-center`}>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            💡 3D图表看似炫酷，实则误导<br/>
                            数据可视化的目标是准确传达，而非视觉特效
                          </p>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20 border-green-700':'bg-green-50 border-green-300'} border-2`}>
                        <h4 className="font-bold text-green-600 mb-3"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 扁平饼图/条形图</h4>
                        <ChartCard 
                          title="市场份额对比" 
                          option={{ 
                            color:['#3b82f6','#10b981','#f59e0b'], 
                            tooltip:{trigger:'item'}, 
                            legend:{bottom:0, textStyle:{color:subTextColor}}, 
                            series:[{type:'pie', radius:'60%', data:[{value:40, name:'产品A'}, {value:35, name:'产品B'}, {value:25, name:'产品C'}]}] 
                          }} 
                        />
                        <p className="text-xs text-green-600 mt-2">✓ 扁平设计准确展示占比关系</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 错误3: 双Y轴误导 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400 text-xl flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      错误3：双Y轴操纵相关性
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>问题：</strong>任意调整两个Y轴刻度，可以制造出任何想要的"相关性"。</p>
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-yellow-900/20':'bg-yellow-50'}`}>
                      <p className="text-xs font-semibold mb-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 警惕双Y轴陷阱：</p>
                      <ul className="text-xs space-y-1">
                        <li>• 左右Y轴刻度可以随意调整，让两条线"完美吻合"</li>
                        <li>• 即使完全无关的数据也能看起来高度相关</li>
                        <li>• 著名案例：尼古拉斯·凯奇电影数量与溺水人数"相关"</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20 border-green-700':'bg-green-50 border-green-300'} border-2`}>
                      <h4 className="font-bold text-green-600 mb-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 推荐替代方案：</h4>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>归一化处理：</strong>将两个指标转换为同一量纲（如百分比）</li>
                        <li>• <strong>散点图：</strong>用散点图+趋势线展示真实相关性</li>
                        <li>• <strong>分面图：</strong>两个独立子图上下排列，共享X轴</li>
                        <li>• <strong>标注相关系数：</strong>如必须用双Y轴，标注R²值</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 错误4: 过度装饰 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-red-600 dark:text-red-400 text-xl flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      错误4：Chart Junk（图表垃圾）
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>问题：</strong>过度装饰（背景图、阴影、动画）干扰数据阅读。</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-900/20 border-red-700':'bg-red-50 border-red-300'} border-2`}>
                        <h4 className="font-bold text-red-600 mb-3">❌ 过度装饰</h4>
                        <ul className="text-xs space-y-2">
                          <li>• 🎨 花哨的背景纹理/图片</li>
                          <li>• ✨ 旋转、闪烁的3D动画</li>
                          <li>• 🌈 每个柱子不同的渐变色</li>
                          <li>• � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 密集的网格线和边框</li>
                          <li>• 🎭 卡通图标、装饰元素</li>
                        </ul>
                        <p className="text-xs text-red-600 mt-3">结果：信噪比低，数据被装饰淹没</p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20 border-green-700':'bg-green-50 border-green-300'} border-2`}>
                        <h4 className="font-bold text-green-600 mb-3"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 极简主义</h4>
                        <ul className="text-xs space-y-2">
                          <li>• � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 纯色背景（白/灰）</li>
                          <li>• 🎨 单一配色方案</li>
                          <li>• 📏 必要的网格线（浅灰色）</li>
                          <li>• 🔠 清晰的标签和标题</li>
                          <li>• ✨ 突出数据本身</li>
                        </ul>
                        <p className="text-xs text-green-600 mt-3">原则：数据墨水比 = 数据信息/总墨水量</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 总结卡片 */}
                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-indigo-600 dark:text-indigo-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 避坑黄金法则
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-indigo-600 mb-2">自查清单：</h4>
                        <ul className="text-xs space-y-1">
                          <li>✓ Y轴从0开始了吗？（或有合理理由不从0开始）</li>
                          <li>✓ 图表类型适合数据关系吗？</li>
                          <li>✓ 颜色传达了正确的信息吗？</li>
                          <li>✓ 5秒内能抓住核心结论吗？</li>
                          <li>✓ 删掉这个元素后信息会缺失吗？（如不缺失就删）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-600 mb-2">给同事审查：</h4>
                        <ul className="text-xs space-y-1">
                          <li>• 让不熟悉数据的人看图，问他们理解到什么</li>
                          <li>• 如果他们的理解与你的意图不符→图表有问题</li>
                          <li>• 询问："这个图表让你得出什么结论？"</li>
                          <li>• 如果他们说"看不懂"→简化！</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 5. 数据准备与清洗 */}
            <section id="data-preparation" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/40 via-gray-800 to-blue-900/40 border-cyan-700' : 'bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-cyan-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-700' : 'bg-gradient-to-b from-cyan-400 via-blue-400 to-cyan-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-cyan-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 05</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-cyan-600 border-cyan-600 font-semibold">数据基础</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700'}`}>
                    🔧 数据清洗实战
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">好数据才有好图表</strong> - 缺失值/异常值/重复值/聚合/转换 完整处理方案
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-100'}`}>
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：数据质量决定可视化质量，80%时间花在这里</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* 数据清洗核心任务 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-cyan-600 dark:text-cyan-400 text-xl">
                      🧹 数据清洗核心任务
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>重要性：</strong>可视化的质量取决于数据质量。脏数据会导致误导性的图表和错误的决策。</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-red-900/20 border-red-700':'bg-red-50 border-red-300'}`}>
                        <h4 className="font-bold text-red-600 mb-2">1️⃣ 处理缺失值</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>删除：</strong>缺失比例{'<'}5%直接删除行</li>
                          <li>• <strong>填充：</strong>用均值/中位数/众数填充</li>
                          <li>• <strong>预测：</strong>用回归模型预测缺失值</li>
                          <li>• <strong>标记：</strong>创建"是否缺失"的二元变量</li>
                        </ul>
                        <p className="text-xs text-yellow-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Excel中空值会中断趋势线</p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-orange-900/20 border-orange-700':'bg-orange-50 border-orange-300'}`}>
                        <h4 className="font-bold text-orange-600 mb-2">2️⃣ 识别异常值</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>3σ法则：</strong>超过均值±3倍标准差</li>
                          <li>• <strong>IQR法则：</strong>{'<'}Q1-1.5×IQR 或 {'>'}Q3+1.5×IQR</li>
                          <li>• <strong>箱线图：</strong>可视化检测异常值</li>
                          <li>• <strong>业务判断：</strong>并非所有统计异常都是错误</li>
                        </ul>
                        <p className="text-xs text-green-600 mt-2">✓ 真实的极端值要保留</p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-blue-900/20 border-blue-700':'bg-blue-50 border-blue-300'}`}>
                        <h4 className="font-bold text-blue-600 mb-2">3️⃣ 去除重复值</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>完全重复：</strong>所有字段都相同</li>
                          <li>• <strong>部分重复：</strong>关键字段相同（如ID）</li>
                          <li>• <strong>Excel：</strong>数据→删除重复项</li>
                          <li>• <strong>Python：</strong>df.drop_duplicates()</li>
                        </ul>
                        <p className="text-xs text-yellow-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 确认是真重复，非多次购买</p>
                      </div>
                    </div>
                    
                    {/* 异常值检测示例 */}
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-cyan-900/20 border-cyan-700':'bg-cyan-50 border-cyan-300'} border-2 mt-4`}>
                      <h4 className="font-bold text-cyan-600 mb-3">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 异常值检测可视化示例</h4>
                      <ChartCard 
                        title="销售额箱线图（检测异常值）" 
                        option={{ 
                          tooltip:{trigger:'item'}, 
                          grid:{left:60, right:20, top:30, bottom:40}, 
                          xAxis:{type:'category', data:['销售额分布'], axisLabel:{color:subTextColor}}, 
                          yAxis:{type:'value', axisLabel:{color:subTextColor}, splitLine:{lineStyle:{color:axisLineColor}}}, 
                          series:[{
                            type:'boxplot', 
                            data:[[50, 80, 100, 120, 150, [15, 180]]], 
                            itemStyle:{color:'#06b6d4'}
                          }] 
                        }} 
                      />
                      <p className="text-xs text-cyan-600 mt-2">✓ 箱线图可快速识别异常值（15和180为离群点）</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 数据聚合与变换 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-cyan-600 dark:text-cyan-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据聚合与变换
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">常见聚合操作</h4>
                        <div className={`p-3 rounded ${theme==='dark'?'bg-gray-700':'bg-gray-50'}`}>
                          <ul className="text-xs space-y-2">
                            <li>• <strong>求和（SUM）：</strong>总销售额、总订单量</li>
                            <li>• <strong>平均（AVG）：</strong>客单价、平均评分</li>
                            <li>• <strong>计数（COUNT）：</strong>用户数、商品数</li>
                            <li>• <strong>最大/最小：</strong>峰值流量、最低价格</li>
                            <li>• <strong>分组聚合：</strong>按地区/时间/类别统计</li>
                          </ul>
                        </div>
                        <p className="text-xs mt-2"><strong>Excel工具：</strong>数据透视表（PivotTable）</p>
                        <p className="text-xs"><strong>SQL:</strong> GROUP BY + 聚合函数</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-600 mb-3">数据变换技巧</h4>
                        <div className={`p-3 rounded ${theme==='dark'?'bg-gray-700':'bg-gray-50'}`}>
                          <ul className="text-xs space-y-2">
                            <li>• <strong>归一化：</strong>缩放到[0,1]，适合不同量纲对比</li>
                            <li>• <strong>标准化：</strong>转为Z分数，均值0标准差1</li>
                            <li>• <strong>对数变换：</strong>压缩长尾分布（如收入）</li>
                            <li>• <strong>分箱：</strong>连续变量转为分类（年龄段）</li>
                            <li>• <strong>日期拆分：</strong>提取年/月/周/小时</li>
                          </ul>
                        </div>
                        <p className="text-xs text-yellow-600 mt-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 变换后要注明单位</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 数据源整合 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-cyan-600 dark:text-cyan-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 常见数据源与整合
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                        <h4 className="font-bold text-green-600 mb-2 text-xs">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Excel/CSV</h4>
                        <ul className="text-xs space-y-1">
                          <li>• 最常见的数据格式</li>
                          <li>• 适合小型数据（{'<'}100万行）</li>
                          <li>• 导入Power BI/Tableau</li>
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                        <h4 className="font-bold text-blue-600 mb-2 text-xs">🗄 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 数据库</h4>
                        <ul className="text-xs space-y-1">
                          <li>• MySQL、PostgreSQL</li>
                          <li>• 用SQL查询聚合</li>
                          <li>• 直连BI工具</li>
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                        <h4 className="font-bold text-purple-600 mb-2 text-xs">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} API接口</h4>
                        <ul className="text-xs space-y-1">
                          <li>• Google Analytics API</li>
                          <li>• 电商平台API</li>
                          <li>• Python requests库</li>
                        </ul>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-orange-900/20':'bg-orange-50'}`}>
                        <h4 className="font-bold text-orange-600 mb-2 text-xs">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 网页抓取</h4>
                        <ul className="text-xs space-y-1">
                          <li>• BeautifulSoup（Python）</li>
                          <li>• 注意反爬虫策略</li>
                          <li>• 遵守robots.txt</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-indigo-900/20 border-indigo-700':'bg-indigo-50 border-indigo-300'} border-2`}>
                      <h4 className="font-bold text-indigo-600 mb-2">数据整合常见问题：</h4>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>JOIN错误：</strong>确保关联键唯一性和一致性（如用户ID格式）</li>
                        <li>• <strong>时区问题：</strong>统一时区，避免错位（UTC vs 本地时间）</li>
                        <li>• <strong>编码问题：</strong>中文乱码→检查UTF-8 vs GBK编码</li>
                        <li>• <strong>数据粒度：</strong>确保聚合级别一致（日级vs月级）</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* 数据质量检查清单 */}
                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-300'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-cyan-600 dark:text-cyan-400 text-xl"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 数据质量检查清单
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-cyan-600 mb-2">可视化前必查：</h4>
                        <ul className="text-xs space-y-1">
                          <li>✓ 数据总行数与预期一致吗？</li>
                          <li>✓ 关键字段的缺失率{'<'}5%吗？</li>
                          <li>✓ 数值字段的范围合理吗？（无负数销售额）</li>
                          <li>✓ 日期字段格式统一吗？（YYYY-MM-DD）</li>
                          <li>✓ 分类字段的拼写一致吗？（北京 vs 北京市）</li>
                          <li>✓ 有重复记录吗？（按主键检查）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-600 mb-2">快速验证技巧：</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>总数核对：</strong>与业务系统数据对比总量</li>
                          <li>• <strong>趋势检查：</strong>画折线图看是否有断崖式变化</li>
                          <li>• <strong>分组求和：</strong>子项之和 = 总计？</li>
                          <li>• <strong>抽样检查：</strong>随机抽10条人工核对</li>
                          <li>• <strong>交叉验证：</strong>用不同维度验证同一指标</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 6. 讲故事与数据叙事 */}
            <section id="storytelling" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-amber-900/40 via-gray-800 to-yellow-900/40 border-amber-700' : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50 border-amber-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-700' : 'bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-amber-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 06</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-amber-600 border-amber-600 font-semibold">高级技能</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700'}`}>
                    📖 数据叙事技巧
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">让数据会说话</strong> - 金字塔原理/英雄之旅/视觉引导 说服决策者驱动行动
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：提升说服力3倍，从展示数据到驱动决策</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* 数据叙事框架 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-amber-600 dark:text-amber-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据叙事经典框架
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p><strong>核心理念：</strong>数据可视化不只是展示数字，而是讲述一个引人入胜的故事，驱动决策者采取行动。</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-blue-900/20 border-blue-700':'bg-blue-50 border-blue-300'}`}>
                        <h4 className="font-bold text-blue-600 mb-2">1️⃣ 金字塔原理</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>结论先行：</strong>开头直接亮出核心发现</li>
                          <li>• <strong>自上而下：</strong>总览→细节→证据</li>
                          <li>• <strong>分组归类：</strong>3-5个论点支撑结论</li>
                          <li>• <strong>逻辑递进：</strong>每层论点相互独立、完全穷尽</li>
                        </ul>
                        <p className="text-xs text-blue-600 mt-2">✓ 适合：高管汇报、快速决策</p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-green-900/20 border-green-700':'bg-green-50 border-green-300'}`}>
                        <h4 className="font-bold text-green-600 mb-2">2️⃣ 对比-原因-方案</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>What：</strong>发生了什么？（数据对比）</li>
                          <li>• <strong>Why：</strong>为什么发生？（根因分析）</li>
                          <li>• <strong>How：</strong>怎么解决？（行动建议）</li>
                        </ul>
                        <p className="text-xs mt-2"><strong>示例：</strong></p>
                        <p className="text-xs">销售额下降15%（对比）→竞品促销（原因）→加大营销投入（方案）</p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-purple-900/20 border-purple-700':'bg-purple-50 border-purple-300'}`}>
                        <h4 className="font-bold text-purple-600 mb-2">3️⃣ 英雄之旅</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>起点：</strong>现状/问题（平凡世界）</li>
                          <li>• <strong>冲突：</strong>挑战/机遇（冒险召唤）</li>
                          <li>• <strong>行动：</strong>采取措施（跨越门槛）</li>
                          <li>• <strong>结果：</strong>成功/教训（带回宝物）</li>
                        </ul>
                        <p className="text-xs text-purple-600 mt-2">✓ 适合：年度总结、项目复盘</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 视觉引导技巧 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-amber-600 dark:text-amber-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 视觉引导技巧
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <p>引导读者的注意力，按照你设计的路径理解数据。</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">视觉层次设计</h4>
                        <div className={`p-3 rounded ${theme==='dark'?'bg-gray-700':'bg-gray-50'}`}>
                          <ul className="text-xs space-y-2">
                            <li>• <strong>大标题：</strong>核心结论，最大最醒目</li>
                            <li>• <strong>副标题：</strong>补充说明，中等字号</li>
                            <li>• <strong>标注：</strong>关键数据点用箭头/文字突出</li>
                            <li>• <strong>颜色：</strong>重点数据用对比色高亮</li>
                            <li>• <strong>留白：</strong>减少干扰，聚焦核心信息</li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-green-600 mb-3">阅读动线控制</h4>
                        <div className={`p-3 rounded ${theme==='dark'?'bg-gray-700':'bg-gray-50'}`}>
                          <ul className="text-xs space-y-2">
                            <li>• <strong>F型阅读：</strong>重要信息放左上角</li>
                            <li>• <strong>Z型阅读：</strong>从左到右，从上到下</li>
                            <li>• <strong>编号引导：</strong>①②③标注阅读顺序</li>
                            <li>• <strong>箭头连接：</strong>显式指示因果关系</li>
                            <li>• <strong>渐进展开：</strong>PPT分步骤揭示信息</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 说服技巧 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-amber-600 dark:text-amber-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据说服三要素
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-900/20':'bg-red-50'}`}>
                        <h4 className="font-bold text-red-600 mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Logos（逻辑）</h4>
                        <ul className="text-xs space-y-1">
                          <li>• 用数据证明论点</li>
                          <li>• 对比环比/同比</li>
                          <li>• 展示因果关系</li>
                          <li>• 提供统计显著性</li>
                        </ul>
                        <p className="text-xs mt-2"><strong>示例：</strong>"转化率提升3%，年化收入增加500万"</p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                        <h4 className="font-bold text-green-600 mb-2">❤ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Pathos（情感）</h4>
                        <ul className="text-xs space-y-1">
                          <li>• 讲述用户故事</li>
                          <li>• 展示痛点场景</li>
                          <li>• 使用隐喻类比</li>
                          <li>• 制造紧迫感</li>
                        </ul>
                        <p className="text-xs mt-2"><strong>示例：</strong>"1000个用户因加载慢放弃购买"</p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                        <h4 className="font-bold text-blue-600 mb-2">🎖 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} Ethos（信誉）</h4>
                        <ul className="text-xs space-y-1">
                          <li>• 标注数据来源</li>
                          <li>• 引用权威报告</li>
                          <li>• 展示历史准确性</li>
                          <li>• 承认数据局限</li>
                        </ul>
                        <p className="text-xs mt-2"><strong>示例：</strong>"数据来源：公司CRM系统（2023-2024）"</p>
                      </div>
                    </div>
                    
                    {/* 综合示例 */}
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-amber-900/20 border-amber-700':'bg-amber-50 border-amber-300'} border-2 mt-4`}>
                      <h4 className="font-bold text-amber-600 mb-3">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 三要素综合应用示例</h4>
                      <ChartCard 
                        title="转化率优化效果（结合Logos+Pathos+Ethos）" 
                        option={{ 
                          color:['#ef4444', '#10b981'], 
                          tooltip:{trigger:'axis'}, 
                          legend:{bottom:0, textStyle:{color:subTextColor}}, 
                          grid:{left:50, right:20, top:30, bottom:50}, 
                          xAxis:{type:'category', data:['1月','2月','3月','4月','5月','6月'], axisLabel:{color:subTextColor}}, 
                          yAxis:{type:'value', name:'转化率%', axisLabel:{color:subTextColor}, splitLine:{lineStyle:{color:axisLineColor}}}, 
                          series:[
                            {name:'优化前', type:'line', data:[2.1, 2.2, 2.0, 2.1, 2.3, 2.2]},
                            {name:'优化后', type:'line', data:[2.2, 2.3, 2.8, 3.2, 3.5, 3.6]}
                          ] 
                        }} 
                      />
                      <p className="text-xs text-amber-600 mt-2">
                        ✓ <strong>Logos:</strong> 数据证明3月起转化率提升63%  
                        • <strong>Pathos:</strong> 意味着每月多留住500个客户  
                        • <strong>Ethos:</strong> 数据来源：Google Analytics（2024.1-6）
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 汇报实战技巧 */}
                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-amber-700' : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-amber-600 dark:text-amber-400 text-xl">
                      🎤 汇报演讲实战技巧
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-amber-600 mb-2">开场3秒抓住注意力：</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>惊人数据：</strong>"销售额暴跌40%"</li>
                          <li>• <strong>反常现象：</strong>"最贵的产品反而卖得最好"</li>
                          <li>• <strong>提问引入：</strong>"为什么用户流失率翻倍？"</li>
                          <li>• <strong>故事开场：</strong>"上个月客户王总打来投诉电话..."</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-yellow-700 dark:text-yellow-500 mb-2">结尾明确行动项：</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>具体措施：</strong>"建议下周上线新功能"</li>
                          <li>• <strong>责任人：</strong>"由张三负责，李四协助"</li>
                          <li>• <strong>时间节点：</strong>"10月15日前完成"</li>
                          <li>• <strong>预期效果：</strong>"预计提升转化率5%"</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-yellow-900/20 border-yellow-700':'bg-yellow-50 border-yellow-300'} border-2 mt-4`}>
                      <h4 className="font-bold text-yellow-700 dark:text-yellow-500 mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} />
                        常见误区
                      </h4>
                      <ul className="text-xs space-y-1">
                        <li>• ❌ <strong>只展示图表不讲故事：</strong>听众看完一堆图，不知道要干什么</li>
                        <li>• ❌ <strong>数据过载：</strong>20页PPT塞满数字，核心信息淹没</li>
                        <li>• ❌ <strong>结论模糊：</strong>"销售有所增长"→到底增长了多少？达标了吗？</li>
                        <li>• ❌ <strong>缺乏对比：</strong>只说"销售100万"，不说去年多少、目标多少</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 7. 交互设计指南 */}
            <section id="interactive-design" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-violet-900/40 via-gray-800 to-purple-900/40 border-violet-700' : 'bg-gradient-to-br from-violet-50 via-white to-purple-50 border-violet-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-violet-500 via-purple-500 to-violet-700' : 'bg-gradient-to-b from-violet-400 via-purple-400 to-violet-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-violet-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 07</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-violet-600 border-violet-600 font-semibold">进阶技能</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-violet-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700'}`}>
                    🖱 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 交互设计指南
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    静态图vs交互图·提升用户探索体验
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* 静态vs交互对比 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-violet-600 dark:text-violet-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 静态图表 vs 交互图表
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-blue-900/20 border-blue-700':'bg-blue-50 border-blue-300'}`}>
                        <h4 className="font-bold text-blue-600 mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 静态图表</h4>
                        <p className="text-xs mb-2"><strong>特点：</strong>一次性展示固定视图，不可操作</p>
                        <ul className="text-xs space-y-1 mb-3">
                          <li>✓ <strong>优点：</strong>简单直接、加载快、易分享</li>
                          <li>✓ <strong>适用：</strong>PDF报告、PPT演讲、打印材料</li>
                          <li>✓ <strong>工具：</strong>Excel、Python Matplotlib、R ggplot2</li>
                        </ul>
                        <p className="text-xs text-blue-600"><strong>最佳场景：</strong>单一结论、线性叙事、正式汇报</p>
                      </div>
                      <div className={`p-4 rounded-lg border-2 ${theme==='dark'?'bg-purple-900/20 border-purple-700':'bg-purple-50 border-purple-300'}`}>
                        <h4 className="font-bold text-purple-600 mb-2">🖱 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 交互图表</h4>
                        <p className="text-xs mb-2"><strong>特点：</strong>用户可筛选、下钻、切换视图</p>
                        <ul className="text-xs space-y-1 mb-3">
                          <li>✓ <strong>优点：</strong>探索性强、信息密度高、个性化</li>
                          <li>✓ <strong>适用：</strong>Dashboard、数据探索、Web应用</li>
                          <li>✓ <strong>工具：</strong>Tableau、Power BI、ECharts、Plotly</li>
                        </ul>
                        <p className="text-xs text-purple-600"><strong>最佳场景：</strong>多维数据、自助分析、实时监控</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 常见交互类型 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-violet-600 dark:text-violet-400 text-xl">
                      🎮 6种常见交互类型
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                        <h4 className="font-bold text-blue-600 mb-1 text-xs">1️⃣ Tooltip（悬停提示）</h4>
                        <p className="text-xs mb-1">鼠标悬停显示详细数据</p>
                        <p className="text-xs text-blue-600">✓ 最基础、最常用的交互</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                        <h4 className="font-bold text-green-600 mb-1 text-xs">2️⃣ Filter（筛选器）</h4>
                        <p className="text-xs mb-1">按条件过滤数据（日期、地区）</p>
                        <p className="text-xs text-green-600">✓ 适合多维度数据集</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                        <h4 className="font-bold text-purple-600 mb-1 text-xs">3️⃣ Drill-down（下钻）</h4>
                        <p className="text-xs mb-1">点击聚合数据查看明细</p>
                        <p className="text-xs text-purple-600">✓ 从总览到细节的探索</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-orange-900/20':'bg-orange-50'}`}>
                        <h4 className="font-bold text-orange-600 mb-1 text-xs">4️⃣ Zoom（缩放）</h4>
                        <p className="text-xs mb-1">放大/缩小查看局部细节</p>
                        <p className="text-xs text-orange-600">✓ 适合时间序列、地图</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-red-900/20':'bg-red-50'}`}>
                        <h4 className="font-bold text-red-600 mb-1 text-xs">5️⃣ Highlight（高亮）</h4>
                        <p className="text-xs mb-1">点击/悬停高亮相关数据</p>
                        <p className="text-xs text-red-600">✓ 便于对比和关联分析</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme==='dark'?'bg-indigo-900/20':'bg-indigo-50'}`}>
                        <h4 className="font-bold text-indigo-600 mb-1 text-xs">6️⃣ Cross-filter（联动）</h4>
                        <p className="text-xs mb-1">操作一个图表影响其他图表</p>
                        <p className="text-xs text-indigo-600">✓ Dashboard核心功能</p>
                      </div>
                    </div>
                    
                    {/* 交互示例 */}
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-violet-900/20 border-violet-700':'bg-violet-50 border-violet-300'} border-2 mt-4`}>
                      <h4 className="font-bold text-violet-600 mb-3">🖱 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 交互图表示例（Tooltip+Highlight）</h4>
                      <ChartCard 
                        title="各地区销售额对比（悬停查看详情）" 
                        option={{ 
                          color:['#8b5cf6'], 
                          tooltip:{
                            trigger:'axis',
                            axisPointer:{type:'shadow'},
                            formatter:'{b}: {c}万元'
                          }, 
                          grid:{left:80, right:20, top:30, bottom:40}, 
                          xAxis:{type:'value', axisLabel:{color:subTextColor}, splitLine:{lineStyle:{color:axisLineColor}}}, 
                          yAxis:{type:'category', data:['西部','中部','南部','北部','东部'], axisLabel:{color:subTextColor}}, 
                          series:[{
                            type:'bar', 
                            data:[280, 350, 420, 480, 520],
                            barMaxWidth:30,
                            emphasis:{itemStyle:{color:'#a78bfa'}}
                          }] 
                        }} 
                      />
                      <p className="text-xs text-violet-600 mt-2">
                        ✓ 鼠标悬停显示精确数值（Tooltip）  
                        • 悬停时柱子高亮变色（Highlight）
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* 何时使用交互 */}
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="text-violet-600 dark:text-violet-400 text-xl">
                      🤔 何时需要交互式可视化？
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-green-600 mb-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 推荐使用交互的场景：</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>数据量大：</strong>无法在一张静态图展示全部信息</li>
                          <li>• <strong>多维度：</strong>用户需要从不同角度查看数据</li>
                          <li>• <strong>个性化：</strong>不同用户关注不同指标</li>
                          <li>• <strong>探索性分析：</strong>用户自己寻找洞察</li>
                          <li>• <strong>实时数据：</strong>Dashboard、监控大屏</li>
                          <li>• <strong>地理数据：</strong>地图缩放、区域选择</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-600 mb-2">❌ 不推荐使用交互的场景：</h4>
                        <ul className="text-xs space-y-1">
                          <li>• <strong>单一结论：</strong>只需传达一个明确信息</li>
                          <li>• <strong>线性叙事：</strong>PPT演讲、报告文档</li>
                          <li>• <strong>打印材料：</strong>纸质版无法交互</li>
                          <li>• <strong>移动端优先：</strong>手机屏幕小，交互不便</li>
                          <li>• <strong>技术受限：</strong>客户端不支持JS（邮件）</li>
                          <li>• <strong>简单数据：</strong>5个数据点，静态图足够</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* 交互设计原则 */}
                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-violet-900/40 to-purple-900/40 border-violet-700' : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-300'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-violet-600 dark:text-violet-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 交互设计黄金法则
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-violet-600 mb-2">设计原则：</h4>
                        <ul className="text-xs space-y-1">
                          <li>✓ <strong>即时反馈：</strong>交互后{'<'}0.1秒响应，避免加载等待</li>
                          <li>✓ <strong>明确提示：</strong>可交互元素用悬停变化/图标提示</li>
                          <li>✓ <strong>可撤销：</strong>提供"重置"按钮恢复初始状态</li>
                          <li>✓ <strong>渐进式：</strong>默认显示核心信息，交互获取细节</li>
                          <li>✓ <strong>一致性：</strong>同类交互行为统一（如都用点击下钻）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-600 mb-2">常见误区：</h4>
                        <ul className="text-xs space-y-1">
                          <li>❌ <strong>过度交互：</strong>每个元素都能点，用户不知道从哪开始</li>
                          <li>❌ <strong>响应慢：</strong>点击后3秒才更新→用户放弃</li>
                          <li>❌ <strong>隐藏功能：</strong>重要交互藏得太深，用户发现不了</li>
                          <li>❌ <strong>移动端不友好：</strong>悬停提示在手机上无法触发</li>
                          <li>❌ <strong>缺乏引导：</strong>用户不知道图表可以交互</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-blue-900/20 border-blue-700':'bg-blue-50 border-blue-300'} border-2 mt-4`}>
                      <h4 className="font-bold text-blue-600 mb-2">推荐工具对比：</h4>
                      <div className="grid md:grid-cols-4 gap-2">
                        <div className="text-xs">
                          <p className="font-semibold">Tableau</p>
                          <p>拖拽式、交互丰富</p>
                        </div>
                        <div className="text-xs">
                          <p className="font-semibold">Power BI</p>
                          <p>微软生态、易上手</p>
                        </div>
                        <div className="text-xs">
                          <p className="font-semibold">ECharts</p>
                          <p>Web端、开源免费</p>
                        </div>
                        <div className="text-xs">
                          <p className="font-semibold">Plotly</p>
                          <p>Python集成、科研</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 8. 图表类型 */}
            <section id="chart-types" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/40 via-gray-800 to-emerald-900/40 border-green-700' : 'bg-gradient-to-br from-green-50 via-white to-emerald-50 border-green-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-green-500 via-emerald-500 to-green-700' : 'bg-gradient-to-b from-green-400 via-emerald-400 to-green-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 08</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-green-600 border-green-600 font-semibold">核心图表</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 图表类型与应用场景
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    精选常用图表·掌握数据表达的艺术
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                {/* 基础图表 */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                    基础图表类型
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 柱状图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="柱状图（对比）" 
                          option={{ 
                            color:['#60a5fa'], 
                            tooltip:{trigger:'axis', axisPointer:{type:'shadow'}}, 
                            grid:baseGrid, 
                            xAxis:{
                              type:'category', 
                              data:['华北','华东','华南','西南','东北'], 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              type:'value', 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'bar', 
                              data:[820,932,901,934,1290], 
                              barMaxWidth:28, 
                              itemStyle:{borderRadius:[4,4,0,0]}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-blue-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 柱状图 - 数据对比利器</h4>
                          <p className="text-sm"><strong>适用场景：</strong>类别对比、排名、时间段对比</p>
                          <p className="text-sm"><strong>优势：</strong>直观清晰，适合并列对比多个维度的数据</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→图表→柱形图，右键设置数据系列格式调整间距</li>
                              <li>• <strong>Power BI:</strong> 拖拽字段至坐标轴和值，格式设置调整颜色</li>
                              <li>• <strong>Python:</strong> plt.bar(x, y) 或 sns.barplot(data)</li>
                              <li>• <strong>ECharts:</strong> type: &apos;bar&apos;，itemStyle控制样式</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：柱子不宜超过12个，避免拥挤；排序优化可读性</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 折线图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="折线图（趋势）" 
                          option={{ 
                            color:['#34d399'], 
                            tooltip:{trigger:'axis'}, 
                            grid:baseGrid, 
                            xAxis:{
                              type:'category', 
                              data:Array.from({length:12},(_,i)=>`${i+1}月`), 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              type:'value', 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'line', 
                              smooth:true, 
                              data:[120,132,101,134,90,230,210,260,200,220,240,280], 
                              areaStyle:{opacity:0.08}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-green-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 折线图 - 趋势分析首选</h4>
                          <p className="text-sm"><strong>适用场景：</strong>时间序列、趋势变化、连续数据</p>
                          <p className="text-sm"><strong>优势：</strong>清晰展示数据走势，便于发现周期性和拐点</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→折线图，设计选项卡添加平滑线</li>
                              <li>• <strong>Tableau:</strong> 拖拽日期至列、度量至行，自动生成趋势线</li>
                              <li>• <strong>Matplotlib:</strong> plt.plot(x, y), plt.fill_between()填充面积</li>
                              <li>• <strong>Seaborn:</strong> sns.lineplot(data=df, x=&apos;date&apos;, y=&apos;value&apos;)</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：多条折线不超过5条；标注关键拐点提升可读性</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 饼图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="饼图（占比）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            legend:{bottom:0, textStyle:{color:subTextColor}}, 
                            series:[{
                              type:'pie', 
                              radius:['40%','65%'], 
                              center:['50%','45%'], 
                              itemStyle:{
                                borderRadius:6, 
                                borderColor:theme==='dark'?'#111827':'#fff', 
                                borderWidth:2
                              }, 
                              data:[
                                {value:35,name:'A类'},
                                {value:25,name:'B类'},
                                {value:18,name:'C类'},
                                {value:12,name:'D类'},
                                {value:10,name:'E类'}
                              ]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-purple-600 text-lg">🥧 饼图 - 占比可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>结构占比、份额分析、分类汇总</p>
                          <p className="text-sm"><strong>优势：</strong>直观展示整体与部分的关系</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→饼图/环形图，数据标签显示百分比</li>
                              <li>• <strong>Power BI:</strong> 饼图/环形图视觉对象，细节设置显示图例</li>
                              <li>• <strong>Matplotlib:</strong> plt.pie(sizes, labels=labels, autopct=&apos;%1.1f%%&apos;)</li>
                              <li>• <strong>ECharts:</strong> type:&apos;pie&apos;, radius设置环形图半径</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：分类不超过7个；小于5%的合并为"其他"；按大小排序</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 散点图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="散点图（相关性）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            grid:baseGrid, 
                            xAxis:{
                              name:'广告投入', 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              name:'销售额', 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'scatter', 
                              symbolSize:10, 
                              data:[[10,20],[20,40],[30,60],[40,58],[50,90],[60,110]]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-red-600 text-lg">🔴 散点图 - 相关性分析</h4>
                          <p className="text-sm"><strong>适用场景：</strong>两变量关系、相关性分析、离群点检测</p>
                          <p className="text-sm"><strong>优势：</strong>直观展示变量间的正/负相关或无关系</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-red-900/20':'bg-red-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→散点图，添加趋势线查看相关性</li>
                              <li>• <strong>Tableau:</strong> 双轴拖拽，分析→趋势线添加回归线</li>
                              <li>• <strong>Seaborn:</strong> sns.scatterplot() 或 sns.regplot()带回归线</li>
                              <li>• <strong>ECharts:</strong> type:&apos;scatter&apos;，visualMap映射颜色深浅</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：数据量大时用透明度避免重叠；添加趋势线增强洞察</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 面积图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="面积图（累计趋势）" 
                          option={{ 
                            color:['#10b981'], 
                            tooltip:{trigger:'axis'}, 
                            grid:baseGrid, 
                            xAxis:{
                              type:'category', 
                              data:Array.from({length:12},(_,i)=>`${i+1}月`), 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              type:'value', 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'line', 
                              smooth:true, 
                              data:[80,92,101,84,120,150,170,190,210,220,240,260], 
                              areaStyle:{opacity:0.4}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-teal-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 面积图 - 累计趋势展示</h4>
                          <p className="text-sm"><strong>适用场景：</strong>累计趋势、总量变化、多系列对比</p>
                          <p className="text-sm"><strong>优势：</strong>通过填充区域直观展示数量的累积和变化</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-teal-900/20':'bg-teal-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→面积图，可选堆积或百分比堆积</li>
                              <li>• <strong>Tableau:</strong> 标记类型选择"区域"，自动填充折线下方</li>
                              <li>• <strong>Matplotlib:</strong> plt.fill_between(x, y) 填充面积</li>
                              <li>• <strong>ECharts:</strong> type:&apos;line&apos; + areaStyle属性</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：多系列面积图注意颜色区分和堆叠方式；避免过多重叠</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* 条形图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="条形图（横向对比）" 
                          option={{ 
                            color:['#f59e0b'], 
                            tooltip:{trigger:'axis', axisPointer:{type:'shadow'}}, 
                            grid:baseGrid, 
                            xAxis:{
                              type:'value',
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              type:'category', 
                              data:['产品E','产品D','产品C','产品B','产品A'], 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'bar', 
                              data:[320,450,580,720,890], 
                              barMaxWidth:20, 
                              itemStyle:{borderRadius:[0,4,4,0]}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-amber-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 条形图 - 横向排名对比</h4>
                          <p className="text-sm"><strong>适用场景：</strong>排名展示、长标签显示、TOP N分析</p>
                          <p className="text-sm"><strong>优势：</strong>标签可读性强，适合类别名称较长的情况</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-amber-900/20':'bg-amber-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→条形图，数据按降序排列</li>
                              <li>• <strong>Power BI:</strong> 簇状条形图视觉对象，支持条件格式</li>
                              <li>• <strong>Matplotlib:</strong> plt.barh(y, x) 绘制横向条形图</li>
                              <li>• <strong>ECharts:</strong> type:&apos;bar&apos;，x轴y轴互换即可</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：按数值大小排序，通常降序排列；适合TOP10/TOP20展示</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 玫瑰图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="玫瑰图（极坐标占比）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            legend:{bottom:0, textStyle:{color:subTextColor}}, 
                            series:[{
                              type:'pie',
                              radius:[30, 120],
                              center:['50%','45%'],
                              roseType:'area',
                              itemStyle:{borderRadius:4},
                              data:[
                                {value:40, name:'周一'},
                                {value:38, name:'周二'},
                                {value:32, name:'周三'},
                                {value:30, name:'周四'},
                                {value:28, name:'周五'},
                                {value:26, name:'周六'},
                                {value:22, name:'周日'}
                              ]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-pink-600 text-lg">🌹 玫瑰图 - 极坐标占比可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>周期数据、多类别占比对比、强调差异</p>
                          <p className="text-sm"><strong>优势：</strong>比饼图更强调数值差异，视觉冲击力强</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-pink-900/20':'bg-pink-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 需借助极坐标图或第三方插件实现</li>
                              <li>• <strong>Tableau:</strong> 使用极坐标+条形图组合实现</li>
                              <li>• <strong>Matplotlib:</strong> plt.subplot(projection=&apos;polar&apos;) 极坐标系</li>
                              <li>• <strong>ECharts:</strong> type:&apos;pie&apos; + roseType:&apos;area&apos;</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：适合6-12个类别；南丁格尔图变体更强调数值大小</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 雷达图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="雷达图（多维对比）" 
                          option={{ 
                            tooltip:{}, 
                            radar:{
                              indicator:[
                                {name:'价格', max:100},
                                {name:'功能', max:100},
                                {name:'口碑', max:100},
                                {name:'售后', max:100},
                                {name:'性能', max:100}
                              ], 
                              name:{textStyle:{color:subTextColor}}
                            }, 
                            series:[{
                              type:'radar', 
                              areaStyle:{opacity:0.2}, 
                              data:[
                                {value:[70,85,80,75,90], name:'产品A'},
                                {value:[60,78,88,70,65], name:'产品B'}
                              ]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-indigo-600 text-lg">⭐ 雷达图 - 多维度综合评估</h4>
                          <p className="text-sm"><strong>适用场景：</strong>综合评估、竞品对比、能力画像</p>
                          <p className="text-sm"><strong>优势：</strong>一图展示多维度，快速识别优劣势</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-indigo-900/20':'bg-indigo-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→雷达图，适合3-8个维度</li>
                              <li>• <strong>Power BI:</strong> 使用雷达图自定义视觉对象</li>
                              <li>• <strong>Matplotlib:</strong> plt.subplot(projection=&apos;polar&apos;) 极坐标图</li>
                              <li>• <strong>ECharts:</strong> type:&apos;radar&apos;，indicator定义各维度</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：维度不超过8个；各维度量纲统一（归一化处理）</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 直方图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="直方图（分布分析）" 
                          option={{ 
                            color:['#8b5cf6'], 
                            tooltip:{trigger:'axis', axisPointer:{type:'shadow'}}, 
                            grid:baseGrid, 
                            xAxis:{
                              type:'category', 
                              data:['0-10','10-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100'], 
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              type:'value',
                              name:'频数',
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'bar', 
                              data:[5,12,28,45,68,52,35,18,8,3], 
                              barMaxWidth:40,
                              barGap:0,
                              itemStyle:{borderRadius:0}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-purple-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 直方图 - 数据分布可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>频率分布、数据分布形态、质量控制</p>
                          <p className="text-sm"><strong>优势：</strong>清晰展示数据的集中趋势和离散程度</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 数据分析工具包→直方图，自动分组</li>
                              <li>• <strong>Tableau:</strong> 显示为→分布，自动生成分箱</li>
                              <li>• <strong>Matplotlib:</strong> plt.hist(data, bins=10) 指定分组数</li>
                              <li>• <strong>Seaborn:</strong> sns.histplot(data, bins=10, kde=True) 可选密度曲线</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：区间连续无间隙；合理设置分箱数（5-20组）；标注均值和标准差</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 箱线图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="箱线图（分布与异常值）" 
                          option={{ 
                            tooltip:{trigger:'item'},
                            grid:baseGrid,
                            xAxis:{
                              type:'category',
                              data:['A区','B区','C区'],
                              axisLabel:{color:subTextColor},
                              axisLine:{lineStyle:{color:axisLineColor}}
                            },
                            yAxis:{
                              type:'value',
                              name:'销售额',
                              axisLabel:{color:subTextColor},
                              splitLine:{lineStyle:{color:axisLineColor}},
                              axisLine:{lineStyle:{color:axisLineColor}}
                            },
                            series:[{
                              name:'箱线',
                              type:'boxplot',
                              data:[
                                [850,900,950,1000,1070],
                                [880,920,960,1010,1120],
                                [820,870,920,980,1050]
                              ],
                              itemStyle:{
                                color:'#10b981',
                                borderColor:'#059669'
                              }
                            },{
                              name:'离群点',
                              type:'scatter',
                              data:[[0,750],[1,1200],[2,800]],
                              itemStyle:{color:'#ef4444'},
                              symbolSize:8
                            }]
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-cyan-600 text-lg">📦 箱线图 - 五数概括可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>数据分布、离群点检测、多组对比</p>
                          <p className="text-sm"><strong>优势：</strong>展示中位数、四分位数、异常值全貌</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-cyan-900/20':'bg-cyan-50'}`}>
                            <p className="font-semibold mb-2">图表解读：</p>
                            <ul className="space-y-1">
                              <li>• <strong>箱体：</strong>Q1（下四分位）到Q3（上四分位）包含50%数据</li>
                              <li>• <strong>中线：</strong>中位数（Q2），不受极值影响</li>
                              <li>• <strong>须：</strong>1.5倍IQR范围内的最大/最小值</li>
                              <li>• <strong>散点：</strong>超出须的离群点</li>
                            </ul>
                            <p className="mt-2"><strong>典型应用：</strong>销售波动分析、质量控制、A/B测试对比</p>
                            <p className="mt-1 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：适合样本量较大（≥30）的数据；对比时注意量纲统一</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 气泡图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="气泡图（三维关系）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            grid:baseGrid, 
                            xAxis:{
                              name:'营销投入',
                              type:'value',
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              name:'销售额',
                              type:'value',
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'scatter',
                              symbolSize: function(data: number[]) {
                                return Math.sqrt(data[2]) * 3
                              },
                              data:[
                                [10, 20, 30],
                                [20, 40, 50],
                                [30, 60, 80],
                                [40, 58, 60],
                                [50, 90, 100],
                                [60, 110, 120],
                                [25, 35, 45],
                                [35, 55, 70],
                                [45, 75, 90]
                              ],
                              itemStyle:{
                                color:'#f59e0b',
                                opacity:0.6
                              },
                              emphasis:{
                                itemStyle:{
                                  color:'#d97706',
                                  opacity:1
                                }
                              }
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-amber-600 text-lg">🫧 气泡图 - 三维数据可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>三变量关系、多维度对比、市场分析</p>
                          <p className="text-sm"><strong>优势：</strong>在散点图基础上增加第三维度（气泡大小），展示更复杂的关系</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-amber-900/20':'bg-amber-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 插入→散点图→气泡图，三列数据（X、Y、大小）</li>
                              <li>• <strong>Tableau:</strong> 标记类型选择"圆圈"，大小编码第三维度</li>
                              <li>• <strong>Matplotlib:</strong> plt.scatter(x, y, s=sizes, alpha=0.6)</li>
                              <li>• <strong>ECharts:</strong> type:&apos;scatter&apos; + symbolSize函数映射气泡大小</li>
                            </ul>
                            <p className="mt-2"><strong>典型应用：</strong>市场细分（市场规模×增长率×利润率）、产品组合分析</p>
                            <p className="mt-1 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：气泡不宜过多（&lt;30个）；添加图例说明气泡大小含义</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* 密度图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="密度图（分布平滑）" 
                          option={{ 
                            color:['#10b981'], 
                            tooltip:{trigger:'axis'}, 
                            grid:baseGrid, 
                            xAxis:{
                              type:'value',
                              name:'数值',
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            yAxis:{
                              type:'value',
                              name:'密度',
                              axisLine:{lineStyle:{color:axisLineColor}}, 
                              splitLine:{lineStyle:{color:axisLineColor}}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'line', 
                              smooth:true,
                              symbol:'none',
                              data:[
                                [0, 0.01],
                                [10, 0.05],
                                [20, 0.15],
                                [30, 0.35],
                                [40, 0.65],
                                [50, 0.85],
                                [60, 0.65],
                                [70, 0.35],
                                [80, 0.15],
                                [90, 0.05],
                                [100, 0.01]
                              ],
                              areaStyle:{
                                opacity:0.3,
                                color:{
                                  type:'linear',
                                  x:0, y:0, x2:0, y2:1,
                                  colorStops:[
                                    {offset:0, color:'#10b981'},
                                    {offset:1, color:'rgba(16,185,129,0.1)'}
                                  ]
                                }
                              },
                              lineStyle:{
                                width:2
                              }
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-emerald-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 密度图 - 分布平滑展示</h4>
                          <p className="text-sm"><strong>适用场景：</strong>连续分布、概率密度、数据平滑</p>
                          <p className="text-sm"><strong>优势：</strong>比直方图更平滑，清晰展示数据的分布形态和峰值</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-emerald-900/20':'bg-emerald-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 需借助数据分析工具包或统计插件</li>
                              <li>• <strong>Tableau:</strong> 显示为→密度标记，自动核密度估计</li>
                              <li>• <strong>Seaborn:</strong> sns.kdeplot(data) 核密度估计图</li>
                              <li>• <strong>Matplotlib:</strong> scipy.stats.gaussian_kde() + plt.plot()</li>
                            </ul>
                            <p className="mt-2"><strong>图表解读：</strong>峰值位置=数据集中区域；曲线宽度=数据离散程度</p>
                            <p className="mt-1 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：样本量需足够（≥100）；可与直方图叠加对比</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* 高级图表 */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Target className="h-6 w-6 text-purple-600" />
                    高级分析图表
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 漏斗图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="漏斗图（转化）" 
                          option={{ 
                            tooltip:{trigger:'item', formatter:'{b}: {c}%'}, 
                            series:[{
                              type:'funnel', 
                              left:'10%', 
                              width:'80%', 
                              label:{color:subTextColor}, 
                              data:[
                                {value:100,name:'浏览'},
                                {value:70,name:'加购'},
                                {value:45,name:'下单'},
                                {value:30,name:'支付'},
                                {value:28,name:'签收'}
                              ]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-purple-600 text-lg">🔻 漏斗图 - 流程转化分析</h4>
                          <p className="text-sm"><strong>适用场景：</strong>转化率分析、流程优化、销售漏斗</p>
                          <p className="text-sm"><strong>优势：</strong>清晰展示各环节流失情况，快速定位瓶颈</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                            <p className="font-semibold mb-2">典型应用：</p>
                            <ul className="space-y-1">
                              <li>• <strong>电商转化：</strong>浏览→加购→下单→支付→签收</li>
                              <li>• <strong>销售漏斗：</strong>线索→商机→报价→成交</li>
                              <li>• <strong>用户注册：</strong>访问→注册→验证→完善资料→激活</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：各阶段按转化顺序排列；标注转化率百分比</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 热力图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="热力图（密度）" 
                          option={{ 
                            tooltip:{}, 
                            grid:{left:50, right:20, top:20, bottom:60}, 
                            xAxis:{
                              type:'category', 
                              data:['0','4','8','12','16','20'], 
                              splitArea:{show:true}, 
                              axisLabel:{color:subTextColor, fontSize:10}
                            }, 
                            yAxis:{
                              type:'category', 
                              data:['周日','周六','周五','周四','周三','周二','周一'], 
                              splitArea:{show:true}, 
                              axisLabel:{color:subTextColor}
                            }, 
                            visualMap:{
                              min:0, 
                              max:120, 
                              calculable:true, 
                              orient:'horizontal', 
                              left:'center', 
                              bottom:0, 
                              textStyle:{color:subTextColor, fontSize:10}
                            }, 
                            series:[{
                              name:'访问量', 
                              type:'heatmap', 
                              data:Array.from({length:42},(_,k)=>[k%6, Math.floor(k/6), Math.floor(Math.random()*120)]), 
                              emphasis:{itemStyle:{shadowBlur:10, shadowColor:'rgba(0,0,0,0.5)'}}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-orange-600 text-lg">🔥 热力图 - 密度可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>时间分布、地理热力、行为密度</p>
                          <p className="text-sm"><strong>优势：</strong>颜色深浅直观展示数据集中度</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-orange-900/20':'bg-orange-50'}`}>
                            <p className="font-semibold mb-2">典型应用：</p>
                            <ul className="space-y-1">
                              <li>• <strong>时间热力：</strong>周×小时访问量分布，优化推送时间</li>
                              <li>• <strong>地理热力：</strong>门店销售地图，选址决策支持</li>
                              <li>• <strong>网站热力：</strong>页面点击分布，优化UI布局</li>
                              <li>• <strong>相关性矩阵：</strong>变量间相关系数可视化</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：颜色梯度要清晰；添加图例说明数值范围</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 甘特图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="甘特图（项目进度）" 
                          option={{ 
                            tooltip:{
                              formatter: function(params: any) {
                                return params.marker + params.name + ': ' + params.value[3] + '天'
                              }
                            },
                            grid:{left:100, right:20, top:20, bottom:40}, 
                            xAxis:{
                              type:'time',
                              axisLabel:{color:subTextColor, fontSize:10},
                              splitLine:{lineStyle:{color:axisLineColor}}
                            }, 
                            yAxis:{
                              type:'category', 
                              data:['需求分析','UI设计','前端开发','后端开发','测试','上线'], 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[{
                              type:'custom',
                              renderItem: function(params: any, api: any) {
                                const categoryIndex = api.value(0)
                                const start = api.coord([api.value(1), categoryIndex])
                                const end = api.coord([api.value(2), categoryIndex])
                                const height = api.size([0, 1])[1] * 0.6
                                const colors = ['#60a5fa','#34d399','#f59e0b','#ec4899','#8b5cf6','#10b981']
                                
                                return {
                                  type: 'rect',
                                  shape: {
                                    x: start[0],
                                    y: start[1] - height / 2,
                                    width: end[0] - start[0],
                                    height: height
                                  },
                                  style: {
                                    fill: colors[categoryIndex],
                                    opacity: 0.8
                                  }
                                }
                              },
                              encode: {
                                x: [1, 2],
                                y: 0
                              },
                              data: [
                                [0, new Date('2024-01-01').getTime(), new Date('2024-01-10').getTime(), 10, '需求分析'],
                                [1, new Date('2024-01-08').getTime(), new Date('2024-01-20').getTime(), 12, 'UI设计'],
                                [2, new Date('2024-01-18').getTime(), new Date('2024-02-15').getTime(), 28, '前端开发'],
                                [3, new Date('2024-01-22').getTime(), new Date('2024-02-20').getTime(), 30, '后端开发'],
                                [4, new Date('2024-02-16').getTime(), new Date('2024-02-28').getTime(), 12, '测试'],
                                [5, new Date('2024-02-28').getTime(), new Date('2024-03-01').getTime(), 2, '上线']
                              ].map((item: any) => ({
                                value: item,
                                name: item[4],
                                itemStyle: {borderRadius: 4}
                              }))
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-indigo-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 甘特图 - 项目时间管理</h4>
                          <p className="text-sm"><strong>适用场景：</strong>项目进度管理、任务排期、资源分配</p>
                          <p className="text-sm"><strong>优势：</strong>可视化任务时间线、依赖关系和并行作业</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-indigo-900/20':'bg-indigo-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 使用堆积条形图模拟，设置任务开始时间和持续时间</li>
                              <li>• <strong>Power BI:</strong> 使用自定义视觉对象 Gantt Chart</li>
                              <li>• <strong>Tableau:</strong> 甘特图视图，日期维度+持续时间度量</li>
                              <li>• <strong>ECharts:</strong> 使用 custom 系列自定义渲染</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：标注关键路径和里程碑；颜色区分任务类型或责任人</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 标靶图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="标靶图（KPI对比）" 
                          option={{ 
                            tooltip:{
                              trigger:'item',
                              formatter: function(params: any) {
                                if(params.seriesName === '目标') return '目标: ' + params.value
                                if(params.seriesName === '实际') return '实际: ' + params.value
                                return params.name + ': ' + params.value
                              }
                            },
                            grid:{left:120, right:40, top:20, bottom:40}, 
                            xAxis:{
                              type:'value',
                              max:120,
                              axisLabel:{color:subTextColor},
                              splitLine:{lineStyle:{color:axisLineColor}}
                            }, 
                            yAxis:{
                              type:'category', 
                              data:['Q4销售额','客户满意度','新用户增长','产品质量'], 
                              axisLabel:{color:subTextColor}
                            }, 
                            series:[
                              {
                                name:'优秀',
                                type:'bar',
                                stack:'total',
                                itemStyle:{color:'#dcfce7'},
                                data:[40,40,40,40],
                                barWidth:20
                              },
                              {
                                name:'良好',
                                type:'bar',
                                stack:'total',
                                itemStyle:{color:'#fed7aa'},
                                data:[30,30,30,30]
                              },
                              {
                                name:'及格',
                                type:'bar',
                                stack:'total',
                                itemStyle:{color:'#fecaca'},
                                data:[30,30,30,30]
                              },
                              {
                                name:'实际',
                                type:'bar',
                                itemStyle:{color:'#3b82f6'},
                                data:[85,72,68,95],
                                barWidth:8,
                                z:10
                              },
                              {
                                name:'目标',
                                type:'scatter',
                                itemStyle:{color:'#ef4444', borderColor:'#991b1b', borderWidth:2},
                                symbolSize:12,
                                symbol:'rect',
                                data:[80,75,70,90],
                                z:20
                              }
                            ]
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-cyan-600 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 标靶图 - KPI达成可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>KPI对比、目标达成度、绩效仪表板</p>
                          <p className="text-sm"><strong>优势：</strong>紧凑展示实际值vs目标值，直观呈现绩效等级</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-cyan-900/20':'bg-cyan-50'}`}>
                            <p className="font-semibold mb-2">图表解读：</p>
                            <ul className="space-y-1">
                              <li>• <strong>背景色带：</strong>绿(优秀)、橙(良好)、红(及格)三档标准</li>
                              <li>• <strong>蓝色粗条：</strong>实际完成值</li>
                              <li>• <strong>红色标记：</strong>目标值（Target）</li>
                            </ul>
                            <p className="mt-2"><strong>典型应用：</strong>月度销售目标、部门KPI看板、个人绩效评估</p>
                            <p className="mt-1 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：合理设置绩效区间；保持指标量纲一致性</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    {/* 树形图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="矩形树图（层级占比）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            series:[{
                              type:'treemap', 
                              roam:false, 
                              nodeClick:false, 
                              breadcrumb:{show:false}, 
                              label:{show:true, color:'#fff', fontSize:12}, 
                              upperLabel:{show:true, height:22, color:'#fff'}, 
                              levels:[
                                {itemStyle:{borderWidth:0, gapWidth:2}},
                                {itemStyle:{gapWidth:1}, upperLabel:{show:false}},
                                {colorSaturation:[0.3, 0.6], itemStyle:{gapWidth:1, borderColorSaturation:0.6}}
                              ], 
                              data:[
                                {name:'华东', value:35, children:[{name:'上海', value:12},{name:'江苏', value:10},{name:'浙江', value:13}]},
                                {name:'华南', value:25, children:[{name:'广东', value:18},{name:'福建', value:7}]},
                                {name:'华北', value:20, children:[{name:'北京', value:12},{name:'天津', value:8}]},
                                {name:'西部', value:20}
                              ]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-lime-600 text-lg">🗂 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 树形图 - 层级结构可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>层级占比、磁盘空间分析、组织架构</p>
                          <p className="text-sm"><strong>优势：</strong>面积代表大小，颜色区分类别，支持多层钻取</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-lime-900/20':'bg-lime-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 需借助第三方插件或Power BI实现</li>
                              <li>• <strong>Power BI:</strong> 树状图视觉对象，支持下钻功能</li>
                              <li>• <strong>Tableau:</strong> 树状图视图，大小和颜色双编码</li>
                              <li>• <strong>ECharts:</strong> type:&apos;treemap&apos;，levels控制层级样式</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：层级不超过3层；最小格子不低于2%避免拥挤</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 桑基图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="桑基图（流向分析）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            series:[{
                              type:'sankey', 
                              layout:'none',
                              emphasis:{focus:'adjacency'},
                              label:{color:subTextColor},
                              lineStyle:{color:'source', curveness:0.5},
                              data:[
                                {name:'搜索'},
                                {name:'推荐'},
                                {name:'直接访问'},
                                {name:'首页'},
                                {name:'列表页'},
                                {name:'详情页'},
                                {name:'下单'}
                              ],
                              links:[
                                {source:'搜索', target:'首页', value:30},
                                {source:'推荐', target:'首页', value:25},
                                {source:'直接访问', target:'列表页', value:20},
                                {source:'首页', target:'列表页', value:35},
                                {source:'首页', target:'详情页', value:20},
                                {source:'列表页', target:'详情页', value:40},
                                {source:'详情页', target:'下单', value:25}
                              ]
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-sky-600 text-lg">🌊 桑基图 - 流向与转化路径</h4>
                          <p className="text-sm"><strong>适用场景：</strong>流量流向、能量转换、资金流向</p>
                          <p className="text-sm"><strong>优势：</strong>直观展示流量在各节点间的分配和流失</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-sky-900/20':'bg-sky-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 不支持原生桑基图，需借助第三方工具</li>
                              <li>• <strong>Power BI:</strong> 使用Sankey自定义视觉对象</li>
                              <li>• <strong>Tableau:</strong> 通过标记和路径手动构建</li>
                              <li>• <strong>ECharts:</strong> type:&apos;sankey&apos;，links定义流向关系</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：节点数不宜过多（&lt;15个）；流向要符合逻辑顺序</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 关系图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="关系图（网络结构）" 
                          option={{ 
                            tooltip:{}, 
                            series:[{
                              type:'graph',
                              layout:'force',
                              roam:true,
                              label:{show:true, color:subTextColor},
                              force:{repulsion:100, edgeLength:80},
                              data:[
                                {name:'用户A', symbolSize:50},
                                {name:'用户B', symbolSize:40},
                                {name:'用户C', symbolSize:40},
                                {name:'用户D', symbolSize:30},
                                {name:'用户E', symbolSize:30},
                                {name:'用户F', symbolSize:25}
                              ],
                              links:[
                                {source:'用户A', target:'用户B'},
                                {source:'用户A', target:'用户C'},
                                {source:'用户B', target:'用户D'},
                                {source:'用户C', target:'用户D'},
                                {source:'用户C', target:'用户E'},
                                {source:'用户D', target:'用户F'},
                                {source:'用户E', target:'用户F'}
                              ],
                              lineStyle:{curveness:0.2}
                            }] 
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-violet-600 text-lg">🕸 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 关系图 - 网络与社交分析</h4>
                          <p className="text-sm"><strong>适用场景：</strong>社交网络、知识图谱、组织关系</p>
                          <p className="text-sm"><strong>优势：</strong>展示节点间的复杂关系和影响力</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-violet-900/20':'bg-violet-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 不直接支持，需专业网络分析工具</li>
                              <li>• <strong>Power BI:</strong> 使用Force-Directed Graph自定义视觉对象</li>
                              <li>• <strong>Python:</strong> NetworkX + Matplotlib绘制网络图</li>
                              <li>• <strong>ECharts:</strong> type:&apos;graph&apos;，layout:&apos;force&apos;力导向布局</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：节点过多（&gt;50）建议聚类或筛选；标注核心节点</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 象限图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="象限图（四象限分析）" 
                          option={{ 
                            tooltip:{trigger:'item'}, 
                            grid:baseGrid,
                            xAxis:{
                              type:'value',
                              name:'重要性',
                              axisLine:{lineStyle:{color:axisLineColor}, onZero:false},
                              splitLine:{lineStyle:{color:axisLineColor, type:'dashed'}},
                              axisLabel:{color:subTextColor}
                            },
                            yAxis:{
                              type:'value',
                              name:'紧急度',
                              axisLine:{lineStyle:{color:axisLineColor}, onZero:false},
                              splitLine:{lineStyle:{color:axisLineColor, type:'dashed'}},
                              axisLabel:{color:subTextColor}
                            },
                            series:[
                              {
                                type:'scatter',
                                symbolSize:20,
                                data:[
                                  [8, 8, '战略项目'],
                                  [7, 9, '紧急bug'],
                                  [9, 7, '核心功能'],
                                  [3, 8, '临时需求'],
                                  [2, 3, '低优先级'],
                                  [8, 2, '长期规划'],
                                  [3, 2, '可延期']
                                ],
                                label:{
                                  show:true,
                                  formatter:'{@[2]}',
                                  position:'top',
                                  color:subTextColor,
                                  fontSize:10
                                }
                              }
                            ],
                            visualMap:{
                              show:false,
                              dimension:2,
                              min:0,
                              max:10
                            }
                          }} 
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-rose-600 text-lg">📍 象限图 - 优先级矩阵分析</h4>
                          <p className="text-sm"><strong>适用场景：</strong>优先级排序、风险评估、产品定位</p>
                          <p className="text-sm"><strong>优势：</strong>二维分类，快速识别高价值区域</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-rose-900/20':'bg-rose-50'}`}>
                            <p className="font-semibold mb-2">典型应用：</p>
                            <ul className="space-y-1">
                              <li>• <strong>时间管理：</strong>重要紧急四象限（艾森豪威尔矩阵）</li>
                              <li>• <strong>产品分析：</strong>市场增长率×市场份额（BCG矩阵）</li>
                              <li>• <strong>客户分类：</strong>价值×满意度象限</li>
                              <li>• <strong>风险评估：</strong>概率×影响程度矩阵</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：明确象限分界线（平均值或中位数）；标注各象限含义</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 词云图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="词云图（关键词热度）"
                          option={{
                            tooltip: {},
                            series: [{
                              type: 'wordCloud',
                              shape: 'circle',
                              gridSize: 2,
                              sizeRange: [12, 48],
                              rotationRange: [-45, 90],
                              textStyle: {
                                color: function() {
                                  const colors = ['#60a5fa','#34d399','#a78bfa','#f87171','#f59e0b','#10b981','#f472b6','#06b6d4']
                                  return colors[Math.floor(Math.random()*colors.length)]
                                }
                              },
                              data: [
                                {name:'数据分析', value: 1200}, {name:'Python', value: 1100}, {name:'机器学习', value: 1000},
                                {name:'可视化', value: 900}, {name:'SQL', value: 850}, {name:'Excel', value: 800},
                                {name:'统计学', value: 700}, {name:'Power BI', value: 680}, {name:'Tableau', value: 650},
                                {name:'数据挖掘', value: 600}, {name:'深度学习', value: 580}, {name:'R语言', value: 520},
                                {name:'数据仓库', value: 500}, {name:'ECharts', value: 480}, {name:'Pandas', value: 460},
                                {name:'NumPy', value: 440}, {name:'Matplotlib', value: 420}, {name:'Seaborn', value: 400}
                              ]
                            }]
                          }}
                          height={320}
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-fuchsia-600 text-lg">☁ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 词云图 - 文本热词可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>评论分析、标签云、关键词提取</p>
                          <p className="text-sm"><strong>优势：</strong>文字大小直观反映词频，快速抓住核心主题</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-fuchsia-900/20':'bg-fuchsia-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 不支持原生词云，需在线工具（如WordArt）</li>
                              <li>• <strong>Power BI:</strong> 使用Word Cloud自定义视觉对象</li>
                              <li>• <strong>Python:</strong> WordCloud库，支持自定义形状和颜色</li>
                              <li>• <strong>ECharts:</strong> 需引入echarts-wordcloud插件</li>
                            </ul>
                            <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：过滤停用词；词数控制在50-100个；颜色不宜过于花哨</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 地理图 */}
                    <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                      <CardContent className="pt-6 space-y-4">
                        <ChartCard 
                          title="🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 中国区域销售热力图" 
                          option={{
                            // 初始不渲染 map，等注册后由 transformData 返回完整配置
                            tooltip:{},
                            series: []
                          }}
                          fetchUrl="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/CHINA.json"
                          fallbackUrls={[
                            'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full.json',
                            '/china-geo.json'
                          ]}
                          transformData={(geo:any, ec:any)=>{
                            try { ec?.registerMap?.('china', geo) } catch {}
                            return {
                              tooltip:{
                                trigger:'item',
                                formatter:(p:any)=> `${p.name}：${(p.value||0).toLocaleString()}`
                              },
                              visualMap:{
                                min:0,max:1200,left:'left',bottom:0,
                                textStyle:{color:subTextColor},
                                inRange:{ color:['#e0f2fe','#93c5fd','#3b82f6','#1d4ed8','#0f172a'] }
                              },
                              series:[{name:'销售额', type:'map', map:'china', roam:true,
                                layoutCenter:['50%','55%'], layoutSize:'90%',
                                itemStyle:{ borderColor: theme==='dark'? '#374151':'#e5e7eb', borderWidth: 0.6 },
                                emphasis:{label:{show:true, color: theme==='dark' ? '#e5e7eb' : '#111827'}},
                                data:[
                                  {name:'广东', value:1000},{name:'上海', value:950},{name:'北京', value:890},{name:'浙江', value:820},
                                  {name:'江苏', value:780},{name:'四川', value:650},{name:'湖北', value:580},{name:'河南', value:520}
                                ]
                              }]
                            }
                          }}
                          height={360}
                        />
                        <div className="space-y-3">
                          <h4 className="font-bold text-emerald-600 text-lg">🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 地理图 - 区域数据可视化</h4>
                          <p className="text-sm"><strong>适用场景：</strong>区域销售、门店分布、疫情地图</p>
                          <p className="text-sm"><strong>优势：</strong>地理位置+数值双重信息，直观定位区域差异</p>
                          <div className={`text-xs p-3 rounded ${theme==='dark'?'bg-emerald-900/20':'bg-emerald-50'}`}>
                            <p className="font-semibold mb-2">各工具实现：</p>
                            <ul className="space-y-1">
                              <li>• <strong>Excel:</strong> 使用3D地图（原Power Map）功能</li>
                              <li>• <strong>Power BI:</strong> 地图视觉对象，支持气泡、填充、热力</li>
                              <li>• <strong>ECharts:</strong> type:'map'，需注册地图JSON数据</li>
                            </ul>
                            <p className="mt-2 text黄色-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：注意地图版权和政治敏感性；颜色梯度要清晰合理</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
            {/* 9. 图表选择决策树 */}
            <section id="chart-decision" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 via-gray-800 to-pink-900/40 border-purple-700' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-purple-500 via-pink-500 to-purple-700' : 'bg-gradient-to-b from-purple-400 via-pink-400 to-purple-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 09</Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-600 font-semibold">决策工具</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700'}`}>
                    🧭 智能图表选择决策
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">不再纠结选什么图表</strong> - 5步决策流程 + 快速查找表，秒选最佳图表类型
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：节省80%选图时间，避免90%选错图表</span>
                  </div>
                </div>
              </div>

              {/* 决策树流程图 */}
              <Card className={`mb-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader className="pb-4 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    <div>
                      <h3 className="text-2xl font-bold">5步智能决策流程</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-1">回答5个问题，自动锁定最佳图表</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {[
                      {
                        step: "步骤1",
                        question: "你的数据关系是什么？",
                        options: [
                          { label: "比较", desc: "不同类别间的大小对比", charts: "柱状图、条形图、雷达图" },
                          { label: "趋势", desc: "随时间的变化规律", charts: "折线图、面积图" },
                          { label: "分布", desc: "数据的分散情况", charts: "直方图、箱线图、散点图" },
                          { label: "占比", desc: "部分与整体的关系", charts: "饼图、环形图、树图" },
                          { label: "关联", desc: "变量间的相关性", charts: "散点图、气泡图、热力图" },
                          { label: "流向", desc: "数据的流动路径", charts: "桑基图、和弦图" }
                        ]
                      },
                      {
                        step: "步骤2",
                        question: "数据量级是多少？",
                        options: [
                          { label: "少量(<10项)", desc: "适合详细展示", charts: "饼图、柱状图、条形图" },
                          { label: "中量(10-30项)", desc: "需要分组/排序", charts: "分组柱状图、堆叠图" },
                          { label: "大量(>30项)", desc: "需要聚合/筛选", charts: "热力图、树图、聚合柱状图" }
                        ]
                      },
                      {
                        step: "步骤3",
                        question: "是否需要精确数值？",
                        options: [
                          { label: "是", desc: "优先表格+图表", charts: "表格、柱状图(带数据标签)" },
                          { label: "否", desc: "重视趋势和对比", charts: "折线图、面积图、饼图" }
                        ]
                      },
                      {
                        step: "步骤4",
                        question: "展示场景是什么？",
                        options: [
                          { label: "报告/PPT", desc: "静态、清晰、易读", charts: "柱状图、饼图、折线图" },
                          { label: "大屏监控", desc: "实时、醒目", charts: "KPI卡片、仪表盘、地图" },
                          { label: "数据分析", desc: "交互、多维", charts: "散点图矩阵、交互式仪表板" }
                        ]
                      },
                      {
                        step: "步骤5",
                        question: "受众的数据素养？",
                        options: [
                          { label: "低", desc: "选择常见图表", charts: "柱状图、饼图、折线图" },
                          { label: "中", desc: "可使用多维图表", charts: "堆叠图、雷达图、箱线图" },
                          { label: "高", desc: "使用专业图表", charts: "桑基图、瀑布图、小提琴图" }
                        ]
                      }
                    ].map((decision, idx) => (
                      <div key={idx} className={`p-5 rounded-xl border-2 ${theme === 'dark' ? 'bg-purple-900/10 border-purple-800' : 'bg-purple-50 border-purple-200'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-purple-600 to-pink-600'}`}>
                            {idx + 1}
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{decision.step}</p>
                            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{decision.question}</h3>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-3">
                          {decision.options.map((opt, oidx) => (
                            <div key={oidx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                              <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>{opt.label}</p>
                              <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{opt.desc}</p>
                              <p className={`text-xs ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                                <strong>推荐:</strong> {opt.charts}
                              </p>
                  </div>
                ))}
            </div>
          </div>
              ))}
            </div>
                </CardContent>
              </Card>

              {/* 快速查找表 */}
              <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardHeader className="pb-4 border-b">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</span>
                    <div>
                      <h3 className="text-2xl font-bold">图表类型速查手册</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-normal mt-1">按分析目的快速定位，3秒找到答案</p>
                        </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className={`overflow-x-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className={theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}>
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">分析目的</th>
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">典型问题</th>
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">首选图表</th>
                          <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">备选图表</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 font-bold">比较大小</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">哪个销售额最高？</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 text-green-600 dark:text-green-400">柱状图</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">条形图、点图</td>
                        </tr>
                        <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 font-bold">展示趋势</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">销量增长趋势如何？</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 text-green-600 dark:text-green-400">折线图</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">面积图、柱状图</td>
                        </tr>
                        <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 font-bold">显示占比</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">各地区收入占比？</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 text-green-600 dark:text-green-400">饼图</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">环形图、堆叠柱状图</td>
                        </tr>
                        <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 font-bold">分析分布</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">用户年龄分布情况？</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 text-green-600 dark:text-green-400">直方图</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">箱线图、小提琴图</td>
                        </tr>
                        <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 font-bold">发现关联</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">广告费与销量关系？</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 text-green-600 dark:text-green-400">散点图</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">气泡图、热力图</td>
                        </tr>
                        <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 font-bold">展示层级</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">组织结构/产品分类？</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3 text-green-600 dark:text-green-400">树图</td>
                          <td className="border border-gray-300 dark:border-gray-600 p-3">旭日图、矩形树图</td>
                        </tr>
                      </tbody>
                    </table>
          </div>
                </CardContent>
              </Card>
            </section>

            {/* 10. 行业应用场景 */}
            <section id="industry-cases" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/40 via-gray-800 to-blue-900/40 border-cyan-700' : 'bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-cyan-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-700' : 'bg-gradient-to-b from-cyan-400 via-blue-400 to-cyan-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-cyan-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 10</Badge>
                    <Badge variant="outline" className="text-cyan-600 border-cyan-600 font-semibold">行业案例</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-700'}`}>
                    🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 六大行业实战地图
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">直接套用行业模板</strong> - 电商/金融/医疗/制造/零售/教育 18个真实场景
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-cyan-900/30' : 'bg-cyan-100'}`}>
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：看懂同行怎么做，少走3年弯路</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    industry: "电商行业",
                    icon: "🛒",
                    scenarios: [
                      { title: "用户行为漏斗", charts: "桑基图、漏斗图", use: "从访问到下单的转化路径" },
                      { title: "GMV增长趋势", charts: "折线图+面积图", use: "日/周/月销售额趋势" },
                      { title: "商品热力地图", charts: "地理热力图", use: "各地区销售分布可视化" }
                    ]
                  },
                  {
                    industry: "金融行业",
                    icon: "💰",
                    scenarios: [
                      { title: "风险监控大屏", charts: "KPI卡片+仪表盘", use: "实时监控逾期率、坏账率" },
                      { title: "资产配置分布", charts: "饼图、旭日图", use: "投资组合结构展示" },
                      { title: "股价K线图", charts: "K线+成交量", use: "技术分析、趋势判断" }
                    ]
                  },
                  {
                    industry: "医疗健康",
                    icon: "🏥",
                    scenarios: [
                      { title: "疫情传播地图", charts: "地图+气泡图", use: "确诊病例地理分布" },
                      { title: "患者生命体征", charts: "折线图+预警线", use: "血压、心率实时监测" },
                      { title: "门诊量统计", charts: "柱状图+堆叠图", use: "各科室接诊量对比" }
                    ]
                  },
                  {
                    industry: "制造业",
                    icon: "🏭",
                    scenarios: [
                      { title: "生产良品率", charts: "折线图+控制图", use: "质量波动监控" },
                      { title: "设备OEE分析", charts: "瀑布图", use: "可用率、表现性、质量率" },
                      { title: "供应链可视化", charts: "桑基图、网络图", use: "物料流向、供应商网络" }
                    ]
                  },
                  {
                    industry: "零售行业",
                    icon: "🏬",
                    scenarios: [
                      { title: "会员RFM分析", charts: "散点图、象限图", use: "客户价值分层管理" },
                      { title: "库存ABC分类", charts: "帕累托图", use: "重点商品识别" },
                      { title: "门店销售排名", charts: "条形图+地图", use: "门店业绩对比" }
                    ]
                  },
                  {
                    industry: "在线教育",
                    icon: "🎓",
                    scenarios: [
                      { title: "学习进度跟踪", charts: "甘特图、进度条", use: "课程完成情况" },
                      { title: "成绩分布分析", charts: "直方图、箱线图", use: "班级成绩对比" },
                      { title: "用户留存曲线", charts: "折线图", use: "日/周/月留存率" }
                    ]
                  }
                ].map((item, idx) => (
                  <Card key={idx} className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className={`pb-4 border-b ${theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50'}`}>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-3xl">{item.icon}</span>
                        <span>{item.industry}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {item.scenarios.map((scenario, sidx) => (
                          <div key={sidx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-cyan-900/10 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
                            <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'}`}>{scenario.title}</h4>
                            <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              <strong>图表：</strong>{scenario.charts}
                            </p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              <strong>应用：</strong>{scenario.use}
                            </p>
                          </div>
                    ))}
                  </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 11. 可视化工作流程 */}
            <section id="workflow" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900/40 via-gray-800 to-emerald-900/40 border-teal-700' : 'bg-gradient-to-br from-teal-50 via-white to-emerald-50 border-teal-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-teal-500 via-emerald-500 to-teal-700' : 'bg-gradient-to-b from-teal-400 via-emerald-400 to-teal-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-teal-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 11</Badge>
                    <Badge variant="outline" className="text-teal-600 border-teal-600 font-semibold">标准流程</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700'}`}>
                    ⚙ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 可视化7步工作法
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">从数据到图表的完整路径</strong> - 明确目标→数据准备→探索分析→选图→设计→制作→优化
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-teal-900/30' : 'bg-teal-100'}`}>
                    <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：标准化流程，效率提升50%，质量稳定可控</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "明确目标",
                    desc: "确定可视化要解决什么问题",
                    actions: ["确定受众（老板/同事/客户）", "明确分析目的（对比/趋势/分布）", "定义成功标准（说服/洞察/监控）"],
                    output: "分析需求文档"
                  },
                  {
                    step: 2,
                    title: "数据准备",
                    desc: "获取、清洗、整理数据",
                    actions: ["采集原始数据（数据库/Excel/API）", "数据清洗（去重/补缺/格式化）", "数据转换（聚合/计算/透视）"],
                    output: "整洁的分析数据集"
                  },
                  {
                    step: 3,
                    title: "探索分析",
                    desc: "初步分析发现规律",
                    actions: ["计算基础统计量（均值/中位数）", "识别异常值和趋势", "寻找变量间关系"],
                    output: "数据洞察清单"
                  },
                  {
                    step: 4,
                    title: "选择图表",
                    desc: "根据决策树选择合适图表",
                    actions: ["判断数据关系类型", "考虑数据量和维度", "匹配展示场景"],
                    output: "图表类型清单"
                  },
                  {
                    step: 5,
                    title: "设计草图",
                    desc: "快速绘制原型图",
                    actions: ["手绘或工具绘制草图", "确定布局和配色", "标注关键信息点"],
                    output: "可视化原型"
                  },
                  {
                    step: 6,
                    title: "制作图表",
                    desc: "使用工具实现可视化",
                    actions: ["选择合适工具（Excel/BI）", "应用设计原则和配色", "添加标题/标签/图例"],
                    output: "完整图表"
                  },
                  {
                    step: 7,
                    title: "迭代优化",
                    desc: "根据反馈持续改进",
                    actions: ["收集用户反馈", "检查设计清单", "调整优化细节"],
                    output: "最终交付版本"
                  }
                ].map((item) => (
                  <Card key={item.step} className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className={`pb-4 border-b ${theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'}`}>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-500 to-emerald-500' : 'bg-gradient-to-br from-teal-600 to-emerald-600'}`}>
                          {item.step}
                        </div>
                        <div>
                          <p className="text-sm text-teal-600 dark:text-teal-400 font-bold">步骤{item.step}</p>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                      <div className="grid md:grid-cols-3 gap-3 mb-4">
                        {item.actions.map((action, aidx) => (
                          <div key={aidx} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-900/10' : 'bg-teal-50'}`}>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>✓ {action}</p>
                </div>
              ))}
            </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                        <p className="text-sm"><strong className="text-emerald-600 dark:text-emerald-400">交付物：</strong> {item.output}</p>
          </div>
                    </CardContent>
                  </Card>
                ))}
        </div>
            </section>

            {/* 12. 设计检查清单 */}
            <section id="checklist" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-rose-900/40 via-gray-800 to-pink-900/40 border-rose-700' : 'bg-gradient-to-br from-rose-50 via-white to-pink-50 border-rose-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-rose-500 via-pink-500 to-rose-700' : 'bg-gradient-to-b from-rose-400 via-pink-400 to-rose-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-rose-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 12</Badge>
                    <Badge variant="outline" className="text-rose-600 border-rose-600 font-semibold">质量保障</Badge>
      </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 发布前质量检查
                  </h2>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className="text-xl">20项必查清单，零失误发布</strong> - 数据准确性、视觉设计、信息沟通、交互体验全覆盖
                  </p>
                  <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-rose-900/30' : 'bg-rose-100'}`}>
                    <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心价值：像专家一样自查，杜绝95%的常见错误</span>
    </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    category: "数据准确性",
                    icon: "📊",
                    items: [
                      "数据来源可靠且最新",
                      "计算公式正确无误",
                      "单位换算准确（万/亿/百分比）",
                      "数据标签无遗漏",
                      "总计/小计数值核对"
                    ]
                  },
                  {
                    category: "视觉设计",
                    icon: "🎨",
                    items: [
                      "配色符合品牌规范",
                      "颜色对比度足够（色盲友好）",
                      "字体大小清晰易读（≥12px）",
                      "图表类型选择合理",
                      "布局整洁不拥挤"
                    ]
                  },
                  {
                    category: "信息传达",
                    icon: "💬",
                    items: [
                      "标题简洁明了",
                      "坐标轴标签完整",
                      "图例位置合理",
                      "关键信息突出显示",
                      "避免误导性设计（截断Y轴等）"
                    ]
                  },
                  {
                    category: "交互体验",
                    icon: "🖱️",
                    items: [
                      "Tooltip信息完整",
                      "筛选器功能正常",
                      "响应速度流畅（<2秒）",
                      "移动端适配良好",
                      "交互逻辑符合预期"
                    ]
                  }
                ].map((section, idx) => (
                  <Card key={idx} className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader className={`pb-4 border-b ${theme === 'dark' ? 'bg-rose-900/20' : 'bg-rose-50'}`}>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{section.icon}</span>
                        <span>{section.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        {section.items.map((item, iidx) => (
                          <label key={iidx} className="flex items-start gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              className="mt-1 w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                            />
                            <span className={`text-sm group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className={`mt-6 ${theme === 'dark' ? 'bg-gradient-to-r from-rose-900/20 to-pink-900/20 border-rose-700' : 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200'} border-2`}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 黄金法则
                    </h3>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      "如果一张图表需要长时间解释才能理解，那它就是失败的设计"
                    </p>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      —— 好的可视化应该在3秒内传达核心信息
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 13. 主流工具 */}
            <section id="tools" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/40 via-gray-800 to-amber-900/40 border-orange-700' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50 border-orange-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-orange-500 via-amber-500 to-orange-700' : 'bg-gradient-to-b from-orange-400 via-amber-400 to-orange-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-orange-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 13</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-orange-600 border-orange-600 font-semibold">实战工具</Badge>
        </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700'}`}>
                    🛠 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 主流工具与实操
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    掌握专业工具·提升可视化效率
                  </p>
      </div>
    </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Excel - 轻量快捷之选
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>优势：</strong>零门槛、快速制图、与数据表无缝集成</p>
                    <p><strong>适用场景：</strong>简单报表、临时分析、数据探索阶段</p>
                    <div className={`p-3 rounded ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                      <p className="font-semibold mb-2">实操要点：</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>数据透视表：</strong>快速汇总统计、动态切片分析</li>
                        <li>• <strong>条件格式：</strong>色阶、数据条、图标集突出关键数据</li>
                        <li>• <strong>组合图：</strong>柱线组合展示量级不同的指标</li>
                        <li>• <strong>迷你图：</strong>单元格内嵌趋势图，紧凑型仪表板</li>
                      </ul>
                      <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意：大数据量（&gt;10万行）性能下降；复杂交互支持有限</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Power BI / Tableau - 商业智能利器
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>优势：</strong>专业级交互、多数据源整合、发布共享</p>
                    <p><strong>适用场景：</strong>企业仪表板、定期报告、数据驱动决策</p>
                    <div className={`p-3 rounded ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                      <p className="font-semibold mb-2">核心功能：</p>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>数据建模：</strong>DAX公式、度量值计算、关系管理</li>
                        <li>• <strong>交互联动：</strong>切片器、下钻、工具提示页</li>
                        <li>• <strong>实时刷新：</strong>连接数据库、API、云服务自动更新</li>
                        <li>• <strong>权限管理：</strong>行级安全、报表分发、嵌入应用</li>
                      </ul>
                      <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 学习曲线较陡；Tableau更注重探索，Power BI更偏报告</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Python (Matplotlib/Seaborn) - 灵活编程方案
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>优势：</strong>完全可定制、与数据分析无缝衔接、批量自动化</p>
                    <p><strong>适用场景：</strong>科研论文、定制报表、算法结果展示</p>
                    <div className={`p-3 rounded ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'} overflow-x-auto`}>
                      <p className="font-semibold mb-2">代码示例：</p>
                      <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded">
{`import seaborn as sns
import matplotlib.pyplot as plt

# Seaborn 快速绘制分布图
sns.histplot(data=df, x='sales', hue='region')
plt.title('各区域销售分布')
plt.show()

# Matplotlib 精细控制
fig, ax = plt.subplots()
ax.bar(categories, values)
ax.set_xlabel('类别')
ax.set_ylabel('销售额')
plt.savefig('sales.png', dpi=300)`}
                      </pre>
                      <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 需要编程基础；静态图为主，交互需配合 Plotly/Bokeh</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2 hover:shadow-xl transition-shadow`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} ECharts - Web交互首选
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>优势：</strong>丰富图表库、流畅交互、移动端友好</p>
                    <p><strong>适用场景：</strong>网站数据大屏、产品内嵌图表、实时监控</p>
                    <div className={`p-3 rounded ${theme==='dark'?'bg-red-900/20':'bg-red-50'} overflow-x-auto`}>
                      <p className="font-semibold mb-2">配置示例：</p>
                      <pre className="text-xs bg-gray-800 text-blue-400 p-2 rounded">
{`option = {
  title: { text: '月度销售趋势' },
  tooltip: { trigger: 'axis' },
  xAxis: { 
    type: 'category', 
    data: ['1月','2月','3月'] 
  },
  yAxis: { type: 'value' },
  series: [{
    name: '销售额',
    type: 'line',
    smooth: true,
    data: [120, 200, 150]
  }]
}
myChart.setOption(option)`}
                      </pre>
                      <p className="mt-2 text-yellow-600 font-semibold">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 需基础前端知识；大数据量需优化（虚拟滚动、采样）</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 14. 实战案例 */}
            <section id="cases" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900/40 via-gray-800 to-cyan-900/40 border-teal-700' : 'bg-gradient-to-br from-teal-50 via-white to-cyan-50 border-teal-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-700' : 'bg-gradient-to-b from-teal-400 via-cyan-400 to-teal-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-teal-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 14</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-teal-600 border-teal-600 font-semibold">落地实践</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700'}`}>
                    💼 可视化实战案例
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    真实场景·完整方案·最佳实践
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-purple-600 dark:text-purple-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 案例1：电商运营仪表板
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>业务需求：</strong>实时监控GMV、转化率、流量来源，快速定位问题</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-3 rounded ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                        <p className="font-semibold mb-2">图表选型：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>核心指标卡：</strong>今日GMV、订单量、客单价（大数字+环比）</li>
                          <li>• <strong>折线图：</strong>近30天GMV趋势（多条线对比去年同期）</li>
                          <li>• <strong>漏斗图：</strong>用户转化路径（曝光→点击→下单→支付）</li>
                          <li>• <strong>饼图：</strong>流量来源占比（搜索/推荐/广告）</li>
                          <li>• <strong>热力图：</strong>不同时段成交密度，优化促销时间</li>
                        </ul>
                      </div>
                      <div className={`p-3 rounded ${theme==='dark'?'bg-purple-900/20':'bg-purple-50'}`}>
                        <p className="font-semibold mb-2">实施方案：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>工具：</strong>Power BI 连接数据仓库，1小时自动刷新</li>
                          <li>• <strong>交互：</strong>时间切片器（日/周/月），品类筛选器联动所有图表</li>
                          <li>• <strong>预警：</strong>转化率低于阈值时，指标卡变红并发送邮件</li>
                          <li>• <strong>优化：</strong>移动端适配，管理层手机随时查看</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-green-600 font-semibold"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 效果：决策周期从周级缩短到日级，及时调整营销策略使GMV提升15%</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 案例2：A/B测试结果可视化
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>业务需求：</strong>对比新旧版本按钮颜色对点击率的影响</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-3 rounded ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                        <p className="font-semibold mb-2">图表选型：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>箱线图：</strong>对比A/B两组点击率分布，检查离群值</li>
                          <li>• <strong>柱状图+误差线：</strong>均值对比，显示95%置信区间</li>
                          <li>• <strong>折线图：</strong>分天趋势，观察新奇效应是否消退</li>
                          <li>• <strong>散点图：</strong>用户画像（年龄×点击率），细分人群分析</li>
                        </ul>
                      </div>
                      <div className={`p-3 rounded ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                        <p className="font-semibold mb-2">统计验证：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>假设检验：</strong>t检验p值标注（p=0.002，拒绝H0）</li>
                          <li>• <strong>效应量：</strong>Cohen&apos;s d = 0.35（中等效应）</li>
                          <li>• <strong>功效分析：</strong>当前样本量达到80%检验功效</li>
                          <li>• <strong>置信区间：</strong>新版提升2.1%~4.3%（95% CI）</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-green-600 font-semibold"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 效果：数据支持全量上线新版本，避免主观决策失误</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-orange-600 dark:text-orange-400 text-xl">
                      🗺 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 案例3：区域销售地图与归因分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>业务需求：</strong>定位高潜力市场，优化销售资源配置</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-3 rounded ${theme==='dark'?'bg-orange-900/20':'bg-orange-50'}`}>
                        <p className="font-semibold mb-2">图表选型：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>地图热力：</strong>各省销售额用颜色深浅表示</li>
                          <li>• <strong>气泡图：</strong>城市销售额（气泡大小）×增长率（Y轴）×利润率（颜色）</li>
                          <li>• <strong>桑基图：</strong>渠道→区域→产品类别的销售流向</li>
                          <li>• <strong>矩形树图：</strong>各省份占比，支持下钻到城市级</li>
                        </ul>
                      </div>
                      <div className={`p-3 rounded ${theme==='dark'?'bg-orange-900/20':'bg-orange-50'}`}>
                        <p className="font-semibold mb-2">洞察与行动：</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>发现：</strong>西南地区销售额低但增速快（+45% YoY）</li>
                          <li>• <strong>发现：</strong>华东利润率高但份额下降，竞品挤压</li>
                          <li>• <strong>行动：</strong>增加西南地区销售人员，华东启动促销</li>
                          <li>• <strong>追踪：</strong>每月更新地图，监控策略效果</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-green-600 font-semibold"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 效果：资源重新配置后，西南销售额季度增长30%，整体利润提升8%</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 15. Dashboard大屏 */}
            <section id="dashboard" className="mb-20 scroll-mt-24">
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/40 via-gray-800 to-purple-900/40 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-indigo-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-700' : 'bg-gradient-to-b from-indigo-400 via-purple-400 to-indigo-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-indigo-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">PART 15</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-indigo-600 border-indigo-600 font-semibold">大屏实战</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700'}`}>
                    📺 Dashboard大屏实战
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    数据驱动决策·实时监控·全局洞察
                  </p>
                </div>
              </div>

              {/* Dashboard理论介绍 */}
              <div className="mb-8 space-y-6">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-indigo-600 dark:text-indigo-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 什么是Dashboard（仪表板/数据大屏）？
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-3`}>
                    <p><strong>定义：</strong>Dashboard是将关键业务指标和数据可视化集中展示在单一页面的交互式界面，帮助决策者快速了解业务状态并采取行动。</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-blue-900/20':'bg-blue-50'}`}>
                        <h4 className="font-bold text-blue-600 mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 工作中的应用</h4>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>运营监控：</strong>实时跟踪GMV、订单量、转化率等核心指标</li>
                          <li>• <strong>管理决策：</strong>高管每日晨会查看业务健康度</li>
                          <li>• <strong>问题诊断：</strong>指标异常时快速定位原因</li>
                          <li>• <strong>绩效考核：</strong>可视化团队/个人KPI达成情况</li>
                          <li>• <strong>数据汇报：</strong>周报月报自动化生成，节省80%时间</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-green-900/20':'bg-green-50'}`}>
                        <h4 className="font-bold text-green-600 mb-2"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 设计原则</h4>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>聚焦核心：</strong>最重要的3-5个指标置顶，一屏看清</li>
                          <li>• <strong>层次清晰：</strong>总分结构（总览→明细→下钻）</li>
                          <li>• <strong>实时更新：</strong>关键指标自动刷新（1分钟-1小时）</li>
                          <li>• <strong>预警机制：</strong>红黄绿灯、阈值报警、趋势箭头</li>
                          <li>• <strong>交互联动：</strong>点击切换、筛选器、时间范围选择</li>
                          <li>• <strong>移动适配：</strong>高管手机随时查看</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${theme==='dark'?'bg-red-900/20':'bg-red-50'}`}>
                        <h4 className="font-bold text-red-600 mb-2">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 常见误区</h4>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>指标过多：</strong>单屏超过20个图表→认知过载</li>
                          <li>• <strong>缺乏对比：</strong>只看绝对值，不看环比同比趋势</li>
                          <li>• <strong>图表选错：</strong>3D饼图、复杂雷达图难理解</li>
                          <li>• <strong>数据不准：</strong>口径不统一、更新不及时失去信任</li>
                          <li>• <strong>只看不用：</strong>Dashboard没有驱动具体行动</li>
                          <li>• <strong>颜色滥用：</strong>超过5种颜色，视觉混乱</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 电商Dashboard大屏示例 */}
              <div className={`p-8 rounded-2xl border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 border-gray-300'} shadow-2xl`}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      电商运营实时监控大屏
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      数据更新时间: 2024-10-02 14:30 | 刷新间隔: 5分钟
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-green-500 text-white">● 实时</Badge>
                    <Badge variant="outline">今日</Badge>
                  </div>
                </div>

                {/* KPI卡片区 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'} border-2 hover:shadow-xl transition-all`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>今日GMV</p>
                          <p className="text-3xl font-black text-blue-600 mt-1">¥2.8M</p>
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                            <TrendingUp size={12} /> +15.3% 环比昨日
                          </p>
                        </div>
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <TrendingUp className="text-blue-600" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'} border-2 hover:shadow-xl transition-all`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>订单量</p>
                          <p className="text-3xl font-black text-green-600 mt-1">3,542</p>
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                            <TrendingUp size={12} /> +8.7% 环比昨日
                          </p>
                        </div>
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <CheckCircle className="text-green-600" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300'} border-2 hover:shadow-xl transition-all`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>转化率</p>
                          <p className="text-3xl font-black text-purple-600 mt-1">3.2%</p>
                          <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                            <AlertTriangle size={12} /> -0.5% 环比昨日
                          </p>
                        </div>
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Target className="text-purple-600" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/40 to-orange-800/40 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300'} border-2 hover:shadow-xl transition-all`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>客单价</p>
                          <p className="text-3xl font-black text-orange-600 mt-1">¥790</p>
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                            <TrendingUp size={12} /> +6.1% 环比昨日
                          </p>
                        </div>
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <BarChart3 className="text-orange-600" size={24} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 图表区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* GMV趋势 */}
                  <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-base">近30天GMV趋势</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartCard 
                        title="" 
                        option={{ 
                          color:['#3b82f6','#10b981'], 
                          tooltip:{trigger:'axis'}, 
                          legend:{textStyle:{color:subTextColor}, bottom:0},
                          grid:{left:50, right:20, top:10, bottom:40}, 
                          xAxis:{
                            type:'category', 
                            data:Array.from({length:30},(_,i)=>`${i+1}日`), 
                            axisLabel:{color:subTextColor, fontSize:10}
                          }, 
                          yAxis:{
                            type:'value', 
                            axisLabel:{color:subTextColor}
                          }, 
                          series:[
                            {name:'今年', type:'line', smooth:true, data:Array.from({length:30},()=>Math.floor(Math.random()*1000+2000))},
                            {name:'去年', type:'line', smooth:true, lineStyle:{type:'dashed'}, data:Array.from({length:30},()=>Math.floor(Math.random()*800+1800))}
                          ] 
                        }} 
                      />
                    </CardContent>
                  </Card>

                  {/* 流量来源 */}
                  <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-base">流量来源占比</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartCard 
                        title="" 
                        option={{ 
                          tooltip:{trigger:'item'}, 
                          legend:{bottom:0, textStyle:{color:subTextColor}}, 
                          series:[{
                            type:'pie', 
                            radius:['40%','70%'], 
                            center:['50%','45%'],
                            data:[
                              {value:45, name:'搜索'},
                              {value:30, name:'推荐'},
                              {value:15, name:'广告'},
                              {value:10, name:'直接访问'}
                            ]
                          }] 
                        }} 
                      />
                    </CardContent>
                  </Card>
                  {/* 转化漏斗 */}
                  <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-base">用户转化漏斗</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartCard 
                        title="" 
                        option={{ 
                          tooltip:{trigger:'item'}, 
                          series:[{
                            type:'funnel', 
                            left:'10%', 
                            width:'80%', 
                            label:{color:subTextColor}, 
                            data:[
                              {value:100000, name:'浏览'},
                              {value:35000, name:'加购'},
                              {value:15000, name:'下单'},
                              {value:8500, name:'支付'},
                              {value:8200, name:'完成'}
                            ]
                          }] 
                        }} 
                      />
                    </CardContent>
                  </Card>

                  {/* TOP品类 */}
                  <Card className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <CardHeader>
                      <CardTitle className="text-base">TOP10品类销售排行</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartCard 
                        title="" 
                        option={{ 
                          color:['#8b5cf6'], 
                          tooltip:{trigger:'axis'}, 
                          grid:{left:80, right:20, top:10, bottom:30}, 
                          xAxis:{type:'value', axisLabel:{color:subTextColor}}, 
                          yAxis:{
                            type:'category', 
                            data:['其他','玩具','图书','日用品','家电','美妆','服饰','食品','数码','手机'], 
                            axisLabel:{color:subTextColor}
                          }, 
                          series:[{
                            type:'bar', 
                            data:[120,180,220,280,350,420,480,520,580,650],
                            barMaxWidth:20
                          }] 
                        }} 
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Dashboard最佳实践 */}
              <div className="mt-8">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-indigo-600 dark:text-indigo-400 text-xl">
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Dashboard设计最佳实践
                    </CardTitle>
                  </CardHeader>
                  <CardContent className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-4`}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3"> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 推荐做法</h4>
                        <ul className="space-y-2 text-xs">
                          <li className="flex gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>F型布局：</strong>重要指标左上角，用户视线自然流动</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>5秒法则：</strong>用户5秒内能抓住核心信息</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>颜色语义：</strong>红色警告、绿色正常、黄色关注</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>对比维度：</strong>环比、同比、目标达成率三选一</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>数据粒度：</strong>总览用日/周，分析用时/分</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span><strong>响应式设计：</strong>PC、平板、手机自适应</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-600 mb-3">❌ 避免做法</h4>
                        <ul className="space-y-2 text-xs">
                          <li className="flex gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span><strong>数据堆砌：</strong>20+图表，用户无从下手</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span><strong>过度动画：</strong>旋转3D图表、闪烁特效干扰阅读</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span><strong>忽略异常：</strong>数据跳崖式下降却无任何标注</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span><strong>刻度误导：</strong>Y轴不从0开始，夸大波动</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span><strong>缺乏交互：</strong>静态截图，无法筛选下钻</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span><strong>更新滞后：</strong>昨天数据今天下午才看到</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme==='dark'?'bg-yellow-900/20 border-yellow-700':'bg-yellow-50 border-yellow-300'} border-2 mt-4`}>
                      <h4 className="font-bold text-yellow-700 dark:text-yellow-500 mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} />
                        特别注意事项
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li>• <strong>数据安全：</strong>敏感财务数据设置权限控制，避免全员可见</li>
                        <li>• <strong>口径一致：</strong>GMV定义（含退款？预售？）全公司统一，避免扯皮</li>
                        <li>• <strong>性能优化：</strong>大数据量用预聚合，避免实时计算导致加载慢</li>
                        <li>• <strong>移动优先：</strong>高管80%时间用手机看，PC端为辅</li>
                        <li>• <strong>迭代优化：</strong>每月收集用户反馈，砍掉没人看的图表</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 完成总结 */}
            <div className={`text-center py-16 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
              <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full mb-6 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white shadow-2xl`}>
                <span className="text-2xl">🎉</span>
                <span className="font-bold text-xl">数据可视化完整知识体系</span>
                <span className="text-2xl">🎉</span>
              </div>
              
              <div className="max-w-4xl mx-auto mb-8">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 全部15大模块已完成
                </h3>
                <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  从理论基础到实战应用，从设计原则到工具实操，涵盖数据可视化全流程的完整知识体系
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-3">{getLucideIcon('📚', 'w-8 h-8 text-[#19bcc8]')}</div>
                      <h4 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>理论基础</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        可视化原则、色彩设计、数据准备、常见错误、讲故事技巧
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-3">{getLucideIcon('🛠️', 'w-8 h-8 text-[#19bcc8]')}</div>
                      <h4 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>实用工具</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        图表决策树、工作流程、检查清单、主流工具、交互设计
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-3">{getLucideIcon('💼', 'w-8 h-8 text-[#19bcc8]')}</div>
                      <h4 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>实战应用</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        行业案例、图表类型、实战案例、Dashboard大屏设计
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className={`mt-10 p-6 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-700' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300'}`}>
                  <h4 className={`font-bold text-xl mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 学习路径建议
                  </h4>
                  <div className={`grid md:grid-cols-2 gap-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-left`}>
                    <div>
                      <p className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 新手入门（第1-4周）</p>
                      <ul className="space-y-1 text-xs ml-4">
                        <li>• 掌握可视化核心原则和色彩设计</li>
                        <li>• 学习基础图表类型（柱状/折线/饼图）</li>
                        <li>• 避免常见错误，建立正确思维</li>
                        <li>• 使用Excel/Power BI完成简单图表</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 进阶提升（第5-8周）</p>
                      <ul className="space-y-1 text-xs ml-4">
                        <li>• 掌握决策树，快速选择合适图表</li>
                        <li>• 学习数据叙事和交互设计技巧</li>
                        <li>• 参考行业案例，理解业务应用</li>
                        <li>• 独立完成完整的可视化项目</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-300'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    <strong>🎓 持续学习：</strong>数据可视化是实践的艺术，多做多练，不断迭代优化，3个月后你将成为可视化专家！
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showScrollTop && (
        <div className="fixed bottom-8 right-8 z-50">
          <a 
            href="#" 
            className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-xl transition-all hover:scale-110 ${
              theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
            }`}
          >
            <ChevronUp size={20} />
            <span className="text-sm font-semibold">返回顶部</span>
          </a>
        </div>
      )}
    </div>
  )
}