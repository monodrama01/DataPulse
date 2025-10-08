"use client"

import React, { useState, useEffect } from 'react'
import { getLucideIcon } from "@/components/LucideIcon"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, ChevronUp, BarChart3, Star, CheckCircle, Zap, 
  TrendingUp, AlertTriangle, Target, BookOpen, Activity
} from "lucide-react"
import Link from "next/link"
import { 
  NormalDistributionChart, 
  BoxPlotChart, 
  ScatterRegressionChart,
  TimeSeriesDecomposition,
  HypothesisTestChart,
  ABTestPowerChart,
  HistogramShapes
} from './visualizations'

// StarRating 组件
const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
    ))}
  </div>
)

export default function StatisticsPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('module-1')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)

      const childSections = [
        'central-tendency', 'dispersion', 'distribution-shape', 'visualization',
        'probability-basics', 'bayes', 'distributions',
        'sampling-distribution', 'confidence-interval', 'sample-size',
        'hypothesis-basics', 't-test', 'chi-square', 'anova',
        'correlation', 'linear-regression', 'multiple-regression',
        'ab-process', 'ab-sample-size', 'ab-pitfalls',
        'ts-components', 'ts-smoothing', 'arima',
        'case-gmv', 'case-retention', 'case-rfm'
      ]

      const parentSections = [
        'module-1', 'module-2', 'inference', 'hypothesis', 'regression', 'ab-testing', 'timeseries', 'cases'
      ]

      let found: string | null = null
      const mid = window.innerHeight / 2

      // 选取“距离视口中线最近的子标题”作为激活项（更稳）
      let bestId: string | null = null
      let bestDist = Number.POSITIVE_INFINITY
      for (const id of childSections) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const center = Math.min(Math.max(r.top, 0), window.innerHeight) // clamp
        const dist = Math.abs(center - mid)
        if (dist < bestDist) {
          bestDist = dist
          bestId = id
        }
      }
      if (bestId) found = bestId

      if (!found) {
        for (const id of parentSections) {
          const el = document.getElementById(id)
          if (!el) continue
          const r = el.getBoundingClientRect()
          if (r.top <= mid && r.bottom >= mid) { found = id; break }
        }
      }

      if (found) setActiveSection(found)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`} style={{ scrollBehavior: 'smooth' }}>
      <Navigation />

      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-2">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>统计分析</span>
            </div>
          </div>
        </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-base font-bold mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                <span className="inline-flex items-center gap-2">
                  {getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}
                  <span>页面导航</span>
                </span>
              </h3>
              <nav className="space-y-1.5 text-sm">
                <a href="#module-1" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['module-1','central-tendency','dispersion','distribution-shape','visualization'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')} <span>描述统计学</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#central-tendency" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'central-tendency' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>集中趋势</a>
                  <a href="#dispersion" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'dispersion' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>离散程度</a>
                  <a href="#distribution-shape" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'distribution-shape' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>分布形态</a>
                  <a href="#visualization" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'visualization' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>可视化工具</a>
      </div>
                <a href="#module-2" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['module-2','probability-basics','bayes','distributions'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('🎲', 'w-5 h-5 text-[#19bcc8]')} <span>概率论基础</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#probability-basics" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'probability-basics' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>概率三板斧</a>
                  <a href="#bayes" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'bayes' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>贝叶斯定理</a>
                  <a href="#distributions" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'distributions' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>常见分布</a>
                </div>
                
                <a href="#inference" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['inference','sampling-distribution','confidence-interval','sample-size'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('📈', 'w-5 h-5 text-[#19bcc8]')} <span>推断统计学</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#sampling-distribution" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'sampling-distribution' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>抽样分布</a>
                  <a href="#confidence-interval" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'confidence-interval' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>置信区间</a>
                  <a href="#sample-size" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'sample-size' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>样本量计算</a>
                </div>
                
                <a href="#hypothesis" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['hypothesis','hypothesis-basics','t-test','chi-square','anova'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('🔬', 'w-5 h-5 text-[#19bcc8]')} <span>假设检验</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#hypothesis-basics" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'hypothesis-basics' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>检验原理</a>
                  <a href="#t-test" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 't-test' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>t检验</a>
                  <a href="#chi-square" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'chi-square' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>卡方检验</a>
                  <a href="#anova" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'anova' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>方差分析</a>
                </div>
                
                <a href="#regression" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['regression','correlation','linear-regression','multiple-regression'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('📉', 'w-5 h-5 text-[#19bcc8]')} <span>相关与回归</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#correlation" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'correlation' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>相关分析</a>
                  <a href="#linear-regression" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'linear-regression' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>简单回归</a>
                  <a href="#multiple-regression" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'multiple-regression' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>多元回归</a>
                </div>
                
                <a href="#ab-testing" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['ab-testing','ab-process','ab-sample-size','ab-pitfalls'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('🧪', 'w-5 h-5 text-[#19bcc8]')} <span>A/B测试实战</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#ab-process" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'ab-process' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>完整流程</a>
                  <a href="#ab-sample-size" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'ab-sample-size' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>样本量计算</a>
                  <a href="#ab-pitfalls" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'ab-pitfalls' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>常见陷阱</a>
                </div>
                
                <a href="#timeseries" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['timeseries','ts-components','ts-smoothing','arima'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('📅', 'w-5 h-5 text-[#19bcc8]')} <span>时间序列分析</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#ts-components" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'ts-components' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>四要素分解</a>
                  <a href="#ts-smoothing" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'ts-smoothing' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>平滑预测</a>
                  <a href="#arima" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'arima' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>ARIMA模型</a>
                </div>
                
                <a href="#cases" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-colors ${['cases','case-gmv','case-retention','case-rfm'].includes(activeSection) ? 'text-[#19bcc8] bg-[#19bcc8]/10' : (theme === 'dark' ? 'text-gray-200 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-[#19bcc8]/5')}`}>
                  {getLucideIcon('💼', 'w-5 h-5 text-[#19bcc8]')} <span>实战案例库</span>
                </a>
                <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <a href="#case-gmv" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'case-gmv' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>GMV异常诊断</a>
                  <a href="#case-retention" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'case-retention' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>留存率提升</a>
                  <a href="#case-rfm" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'case-rfm' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30' : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100')}`}>RFM用户分层</a>
                </div>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-[#19bcc8] shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h1 className={`text-5xl font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  统计分析
        </h1>
              </div>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                数据分析师必备统计学完整知识体系
              </p>
            </div>

            <Card className={`mb-12 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border-2`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  重要性等级说明
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <StarRating count={5} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">必须掌握</p>
                      <p className="text-xs text-gray-600">日常工作90%+会用到，面试必考，岗位核心技能</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <StarRating count={4} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">强烈推荐</p>
                      <p className="text-xs text-gray-600">进阶必备，提升竞争力，使用频率60%+</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <StarRating count={3} />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">补充技能</p>
                      <p className="text-xs text-gray-600">特定场景有用，了解即可，使用频率30%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section id="module-1" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-[#19bcc8]"></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 01</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-green-600 border-green-600 font-semibold">基础必备·日常90%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('📊', 'w-8 h-8 text-[#19bcc8]')}
                    <span>描述统计学 Descriptive Statistics</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    用数字和图表全面描述数据特征·数据分析第一步·必须精通
                  </p>
                </div>
                {/* 装饰移除，保持简洁背景 */}
              </div>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
              <CardHeader className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <CardTitle id="central-tendency" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      1.1 集中趋势（Central Tendency） - 数据的"中心"在哪？
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">指标</th>
                          <th className="px-4 py-3 text-left">定义</th>
                          <th className="px-4 py-3 text-left">Excel函数</th>
                          <th className="px-4 py-3 text-left">Python代码</th>
                          <th className="px-4 py-3 text-left">适用场景</th>
                          <th className="px-4 py-3 text-left">⚠️ 注意事项</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">均值 Mean</td>
                          <td className="px-4 py-3">所有数值的算术平均</td>
                          <td className="px-4 py-3 font-mono text-xs">=AVERAGE()</td>
                          <td className="px-4 py-3 font-mono text-xs">df['col'].mean()</td>
                          <td className="px-4 py-3">数据对称分布</td>
                          <td className="px-4 py-3 text-xs text-orange-600">易受极端值影响，收入数据慎用</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">中位数 Median</td>
                          <td className="px-4 py-3">排序后中间位置的值</td>
                          <td className="px-4 py-3 font-mono text-xs">=MEDIAN()</td>
                          <td className="px-4 py-3 font-mono text-xs">df['col'].median()</td>
                          <td className="px-4 py-3">数据偏态/有异常值</td>
                          <td className="px-4 py-3 text-xs text-orange-600">样本&lt;10时不稳定</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">众数 Mode</td>
                          <td className="px-4 py-3">出现频率最高的值</td>
                          <td className="px-4 py-3 font-mono text-xs">=MODE.SNGL()</td>
                          <td className="px-4 py-3 font-mono text-xs">df['col'].mode()</td>
                          <td className="px-4 py-3">分类数据/离散数据</td>
                          <td className="px-4 py-3 text-xs text-orange-600">多峰分布会丢失信息</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      💡 实战案例：用户消费分析
                    </p>
                    <div className="text-sm space-y-2">
                      <p><strong>问题：</strong>某电商平台月消费数据：[50, 80, 100, 120, 150, 200, 5000]</p>
                      <p><strong>分析：</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>均值 = 957元（被大R拉高，不反映普通用户）</li>
                        <li>中位数 = 120元（更能代表普通用户消费水平）✅</li>
                        <li>众数 = 无明显众数</li>
                      </ul>
                      <p className="text-green-600"><strong>结论：</strong>报告中应使用中位数120元，并标注"50%用户月消费≤120元"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-transparent' : 'bg-gradient-to-r from-purple-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                  <CardTitle id="dispersion" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Activity className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      1.2 离散程度（Dispersion） - 数据波动有多大？
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">指标</th>
                          <th className="px-4 py-3 text-left">公式</th>
                          <th className="px-4 py-3 text-left">Excel</th>
                          <th className="px-4 py-3 text-left">Python</th>
                          <th className="px-4 py-3 text-left">业务含义</th>
                          <th className="px-4 py-3 text-left">应用场景</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">极差 Range</td>
                          <td className="px-4 py-3 font-mono text-xs">Max - Min</td>
                          <td className="px-4 py-3 font-mono text-xs">=MAX()-MIN()</td>
                          <td className="px-4 py-3 font-mono text-xs">.max()-.min()</td>
                          <td className="px-4 py-3">数据波动范围</td>
                          <td className="px-4 py-3 text-xs">快速了解数据跨度</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">四分位距 IQR</td>
                          <td className="px-4 py-3 font-mono text-xs">Q3 - Q1</td>
                          <td className="px-4 py-3 font-mono text-xs">=QUARTILE.INC(,3)-QUARTILE.INC(,1)</td>
                          <td className="px-4 py-3 font-mono text-xs">.quantile(.75)-.quantile(.25)</td>
                          <td className="px-4 py-3">中间50%数据跨度</td>
                          <td className="px-4 py-3 text-xs">薪资带宽、异常值检测</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">方差 Variance</td>
                          <td className="px-4 py-3 font-mono text-xs">Σ(x-μ)²/n</td>
                          <td className="px-4 py-3 font-mono text-xs">=VAR.P()</td>
                          <td className="px-4 py-3 font-mono text-xs">.var()</td>
                          <td className="px-4 py-3">波动程度（平方单位）</td>
                          <td className="px-4 py-3 text-xs">GMV稳定性评估</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">标准差 SD</td>
                          <td className="px-4 py-3 font-mono text-xs">√Variance</td>
                          <td className="px-4 py-3 font-mono text-xs">=STDEV.P()</td>
                          <td className="px-4 py-3 font-mono text-xs">.std()</td>
                          <td className="px-4 py-3">波动程度（原始单位）⭐</td>
                          <td className="px-4 py-3 text-xs">控制图、异常检测</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">变异系数 CV</td>
                          <td className="px-4 py-3 font-mono text-xs">SD / Mean</td>
                          <td className="px-4 py-3 font-mono text-xs">=STDEV.P()/AVERAGE()</td>
                          <td className="px-4 py-3 font-mono text-xs">.std()/.mean()</td>
                          <td className="px-4 py-3">相对波动（无量纲）</td>
                          <td className="px-4 py-3 text-xs">不同量级指标比较</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 切比雪夫定理详解 */}
                  <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-6`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>📌 切比雪夫定理 (Chebyshev's Theorem)</span>
                        <Badge className="bg-purple-500">⭐⭐⭐⭐</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                        <p className="font-semibold mb-3 text-purple-600">🎯 定理内容</p>
                        <div className="text-sm space-y-2">
                          <p className="font-semibold">对于<strong>任意分布</strong>的数据（无需正态分布假设），至少有：</p>
                          <div className="ml-4 space-y-1">
                            <p>• 至少 <strong className="text-purple-600">75%</strong> 的数据在 <strong>μ ± 2σ</strong> 范围内</p>
                            <p>• 至少 <strong className="text-purple-600">89%</strong> 的数据在 <strong>μ ± 3σ</strong> 范围内</p>
                            <p>• 至少 <strong className="text-purple-600">93.75%</strong> 的数据在 <strong>μ ± 4σ</strong> 范围内</p>
                          </div>
                          <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded">
                            <p className="font-semibold mb-1">📐 通用公式</p>
                            <p className="font-mono text-center text-lg">P(|X - μ| ≥ kσ) ≤ 1/k²</p>
                            <p className="text-xs text-center mt-1">至少 (1 - 1/k²) 的数据在 μ±kσ 范围内</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="font-semibold mb-3">📊 切比雪夫 vs 正态分布对比</p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}>
                                <tr>
                                  <th className="px-3 py-2 text-left">范围</th>
                                  <th className="px-3 py-2 text-left">切比雪夫（保守）</th>
                                  <th className="px-3 py-2 text-left">正态分布（理想）</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="px-3 py-2 font-mono">μ ± 1σ</td>
                                  <td className="px-3 py-2">≥ 0%</td>
                                  <td className="px-3 py-2 text-green-600">68.3%</td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2 font-mono">μ ± 2σ</td>
                                  <td className="px-3 py-2 text-purple-600 font-bold">≥ 75%</td>
                                  <td className="px-3 py-2 text-green-600">95.4%</td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2 font-mono">μ ± 3σ</td>
                                  <td className="px-3 py-2 text-purple-600 font-bold">≥ 89%</td>
                                  <td className="px-3 py-2 text-green-600">99.7%</td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2 font-mono">μ ± 4σ</td>
                                  <td className="px-3 py-2 text-purple-600 font-bold">≥ 93.75%</td>
                                  <td className="px-3 py-2 text-green-600">99.99%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p className="text-xs mt-2 text-orange-600">⚠️ 切比雪夫给出的是下界（最保守估计），适用于任意分布</p>
                        </div>

                        <div>
                          <p className="font-semibold mb-3">💡 应用场景</p>
                          <div className="space-y-2 text-sm">
                            <div className="p-2 rounded bg-white dark:bg-gray-700">
                              <p className="font-semibold text-purple-600">1️⃣ 异常值检测</p>
                              <p className="text-xs">数据超出μ±3σ，99%概率为异常</p>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-gray-700">
                              <p className="font-semibold text-purple-600">2️⃣ 非正态分布数据</p>
                              <p className="text-xs">分布未知时的稳健统计推断</p>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-gray-700">
                              <p className="font-semibold text-purple-600">3️⃣ 风险控制</p>
                              <p className="text-xs">保守估计数据波动范围</p>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-gray-700">
                              <p className="font-semibold text-purple-600">4️⃣ 样本量评估</p>
                              <p className="text-xs">确定数据质量和覆盖范围</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                        <p className="font-semibold mb-3">📈 实战案例：电商订单金额异常检测</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold mb-2">数据背景</p>
                            <div className="space-y-1 text-xs">
                              <p>• 某平台日订单量：均值 = 10,000单</p>
                              <p>• 标准差：σ = 1,200单</p>
                              <p>• 今日订单量：6,000单</p>
                            </div>
                            <p className="font-semibold mt-3 mb-2">计算过程</p>
                            <div className="font-mono text-xs p-2 bg-white dark:bg-gray-700 rounded">
                              偏离 = |6000 - 10000| = 4000单<br/>
                              k值 = 4000 / 1200 ≈ 3.33σ<br/>
                              <br/>
                              根据切比雪夫定理：<br/>
                              至少89%数据在μ±3σ内<br/>
                              超出3.33σ的概率 &lt; 9%
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">决策建议</p>
                            <div className="space-y-2">
                              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs">
                                <p className="font-semibold text-red-600">🚨 高度异常</p>
                                <p>偏离超过3σ，91%+概率为异常情况</p>
                              </div>
                              <div className="p-2 bg-white dark:bg-gray-700 rounded text-xs">
                                <p className="font-semibold">📋 排查方向：</p>
                                <ul className="ml-3 mt-1 space-y-0.5">
                                  <li>• 系统故障？（支付、下单）</li>
                                  <li>• 竞品活动？（用户流失）</li>
                                  <li>• 节假日效应？（工作日低峰）</li>
                                  <li>• 营销活动结束？（流量骤降）</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Z-score标准化详解 */}
                  <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-6`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>⚡ Z-score标准化 (Z-score Normalization)</span>
                        <Badge className="bg-orange-500">⭐⭐⭐⭐⭐</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} border`}>
                        <p className="font-semibold mb-3 text-orange-600">🎯 核心公式</p>
                        <div className="text-center mb-4">
                          <p className="font-mono text-2xl mb-2">z = (x - μ) / σ</p>
                          <div className="grid grid-cols-4 gap-2 text-xs max-w-xl mx-auto mt-3">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold">z</p>
                              <p>标准分数</p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold">x</p>
                              <p>原始数值</p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold">μ</p>
                              <p>均值</p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold">σ</p>
                              <p>标准差</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="p-3 bg-white dark:bg-gray-700 rounded">
                            <p className="font-semibold mb-1">✅ 标准化后特性</p>
                            <ul className="text-xs space-y-0.5">
                              <li>• 均值 = 0</li>
                              <li>• 标准差 = 1</li>
                              <li>• 无量纲（去除单位）</li>
                              <li>• 服从标准正态分布（原数据正态时）</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-700 rounded">
                            <p className="font-semibold mb-1">📏 Z值解读</p>
                            <ul className="text-xs space-y-0.5">
                              <li>• z = 0：等于平均水平</li>
                              <li>• z &gt; 0：高于平均水平</li>
                              <li>• z &lt; 0：低于平均水平</li>
                              <li>• |z| &gt; 2：异常值（95%置信）</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="font-semibold mb-3">🔥 应用场景</p>
                          <div className="space-y-2 text-sm">
                            <div className="p-3 rounded border-l-4 border-orange-500 bg-white dark:bg-gray-700">
                              <p className="font-semibold">1️⃣ 多指标综合评分</p>
                              <p className="text-xs mt-1">合并不同量纲指标（销售额+转化率+活跃度）</p>
                            </div>
                            <div className="p-3 rounded border-l-4 border-orange-500 bg-white dark:bg-gray-700">
                              <p className="font-semibold">2️⃣ 异常值识别</p>
                              <p className="text-xs mt-1">|Z| &gt; 2或3判断数据异常</p>
                            </div>
                            <div className="p-3 rounded border-l-4 border-orange-500 bg-white dark:bg-gray-700">
                              <p className="font-semibold">3️⃣ 机器学习预处理</p>
                              <p className="text-xs mt-1">标准化特征，加速模型收敛</p>
                            </div>
                            <div className="p-3 rounded border-l-4 border-orange-500 bg-white dark:bg-gray-700">
                              <p className="font-semibold">4️⃣ 数据对比分析</p>
                              <p className="text-xs mt-1">跨时间、跨地区数据可比性</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold mb-3">💻 代码实现</p>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold mb-1">Excel公式</p>
                              <div className="font-mono text-xs p-2 bg-white dark:bg-gray-700 rounded">
                                =STANDARDIZE(A2, AVERAGE(A:A), STDEV(A:A))
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold mb-1">Python - NumPy</p>
                              <div className="font-mono text-xs p-2 bg-gray-900 text-green-400 rounded">
                                from scipy import stats<br/>
                                z_scores = stats.zscore(data)<br/>
                                <br/>
                                # 或手动计算<br/>
                                z = (data - data.mean()) / data.std()
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold mb-1">Python - Scikit-learn</p>
                              <div className="font-mono text-xs p-2 bg-gray-900 text-blue-400 rounded">
                                from sklearn.preprocessing import StandardScaler<br/>
                                scaler = StandardScaler()<br/>
                                z_scores = scaler.fit_transform(data)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                        <p className="font-semibold mb-3">📊 实战案例：用户综合评分系统</p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold mb-2">原始数据（3个用户）</p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead className="bg-white dark:bg-gray-700">
                                  <tr>
                                    <th className="border px-2 py-1">用户</th>
                                    <th className="border px-2 py-1">消费金额(元)</th>
                                    <th className="border px-2 py-1">活跃天数(天)</th>
                                    <th className="border px-2 py-1">转化率(%)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border px-2 py-1">A</td>
                                    <td className="border px-2 py-1">5000</td>
                                    <td className="border px-2 py-1">15</td>
                                    <td className="border px-2 py-1">8</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-2 py-1">B</td>
                                    <td className="border px-2 py-1">3000</td>
                                    <td className="border px-2 py-1">25</td>
                                    <td className="border px-2 py-1">12</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-2 py-1">C</td>
                                    <td className="border px-2 py-1">8000</td>
                                    <td className="border px-2 py-1">10</td>
                                    <td className="border px-2 py-1">5</td>
                                  </tr>
                                  <tr className="bg-gray-100 dark:bg-gray-600">
                                    <td className="border px-2 py-1 font-bold">均值</td>
                                    <td className="border px-2 py-1">5333</td>
                                    <td className="border px-2 py-1">16.7</td>
                                    <td className="border px-2 py-1">8.3</td>
                                  </tr>
                                  <tr className="bg-gray-100 dark:bg-gray-600">
                                    <td className="border px-2 py-1 font-bold">标准差</td>
                                    <td className="border px-2 py-1">2082</td>
                                    <td className="border px-2 py-1">6.2</td>
                                    <td className="border px-2 py-1">2.9</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Z-score标准化后</p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead className="bg-white dark:bg-gray-700">
                                  <tr>
                                    <th className="border px-2 py-1">用户</th>
                                    <th className="border px-2 py-1">Z(消费)</th>
                                    <th className="border px-2 py-1">Z(活跃)</th>
                                    <th className="border px-2 py-1">Z(转化)</th>
                                    <th className="border px-2 py-1">综合分</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border px-2 py-1">A</td>
                                    <td className="border px-2 py-1">-0.16</td>
                                    <td className="border px-2 py-1">-0.27</td>
                                    <td className="border px-2 py-1">-0.10</td>
                                    <td className="border px-2 py-1 text-orange-600">-0.18</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-2 py-1">B</td>
                                    <td className="border px-2 py-1">-1.12</td>
                                    <td className="border px-2 py-1">1.34</td>
                                    <td className="border px-2 py-1">1.28</td>
                                    <td className="border px-2 py-1 text-green-600 font-bold">0.50</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-2 py-1">C</td>
                                    <td className="border px-2 py-1">1.28</td>
                                    <td className="border px-2 py-1">-1.08</td>
                                    <td className="border px-2 py-1">-1.14</td>
                                    <td className="border px-2 py-1 text-red-600">-0.31</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-3 p-2 bg-white dark:bg-gray-700 rounded text-xs">
                              <p className="font-semibold text-green-600">✅ 结论：用户B综合评分最高</p>
                              <p className="mt-1">虽然消费金额低，但活跃度和转化率远超平均，综合价值最高</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                        <p className="font-semibold mb-2 text-yellow-600">⚠️ 注意事项</p>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="font-semibold mb-1">适用条件</p>
                            <ul className="space-y-0.5">
                              <li>✅ 数据近似正态分布（效果最佳）</li>
                              <li>✅ 有明确的均值和标准差</li>
                              <li>✅ 没有极端异常值</li>
                              <li>❌ 数据量过小（n&lt;30）慎用</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">常见问题</p>
                            <ul className="space-y-0.5">
                              <li>• <strong>异常值影响：</strong>极端值会扭曲均值和标准差</li>
                              <li>• <strong>解决：</strong>先用IQR法剔除异常值</li>
                              <li>• <strong>偏态分布：</strong>右偏数据建议先取对数</li>
                              <li>• <strong>对比：</strong>Min-Max标准化更适合有界数据</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-2">💡 实战案例：GMV波动分析</p>
                    <div className="text-sm space-y-2">
                      <p><strong>场景：</strong>某平台日GMV：均值750万，标准差50万，今日780万是否异常？</p>
                      <p><strong>分析：</strong></p>
                      <p className="font-mono ml-4">Z-score = (780 - 750) / 50 = 0.6</p>
                      <p className="ml-4">|Z| &lt; 2 → 在正常波动范围内（95%置信区间）</p>
                      <p className="text-green-600 ml-4"><strong>✅ 结论：</strong>属于正常业务波动，无需特殊关注</p>
                      <p className="text-orange-600 ml-4"><strong>⚠️ 若Z &gt; 3：</strong>需排查是否有促销活动或数据异常</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-transparent' : 'bg-gradient-to-r from-purple-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                  <CardTitle id="distribution-shape" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      1.3 分布形态（Distribution Shape） - 数据长什么样？
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-600">📈 偏度 Skewness</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                          <span>Skew = 0：</span>
                          <span className="text-green-600 font-semibold">对称分布（理想状态）</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                          <span>Skew &gt; 0：</span>
                          <span className="text-orange-600 font-semibold">右偏（收入、消费）</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                          <span>Skew &lt; 0：</span>
                          <span className="text-blue-600 font-semibold">左偏（考试分数）</span>
                        </div>
                        <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                          <p className="font-mono text-xs mb-1">Excel: =SKEW(range)</p>
                          <p className="font-mono text-xs">Python: df['col'].skew()</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-600">⛰️ 峰度 Kurtosis</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                          <span>Kurt = 0：</span>
                          <span>正态峰度</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                          <span>Kurt &gt; 0：</span>
                          <span>尖峰（异常值多）</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-700">
                          <span>Kurt &lt; 0：</span>
                          <span>平峰（分布均匀）</span>
                        </div>
                        <div className={`mt-3 p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                          <p className="font-mono text-xs mb-1">Excel: =KURT(range)</p>
                          <p className="font-mono text-xs">Python: df['col'].kurtosis()</p>
            </div>
          </div>
        </div>
      </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-2">💡 为什么要关注偏度和峰度？</p>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li><strong>正态性检验：</strong>很多统计方法假设数据正态分布（|Skew|&lt;0.5, |Kurt|&lt;3）</li>
                      <li><strong>选择合适指标：</strong>右偏分布用中位数，对称分布用均值</li>
                      <li><strong>识别异常模式：</strong>峰度过高提示可能存在数据质量问题</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-transparent' : 'bg-gradient-to-r from-purple-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                  <CardTitle id="visualization" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      1.4 可视化工具 - 一图胜千言
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-semibold mb-3 text-purple-600">📦 箱线图 Box Plot ⭐⭐⭐⭐⭐</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm mb-2"><strong>作用：</strong>快速识别中位数、四分位数、异常值</p>
                          <div className="text-xs space-y-1 font-mono bg-white dark:bg-gray-800 p-3 rounded">
                            <p>箱体结构：</p>
                            <p className="pl-4">├─ 下边缘 = Q1 - 1.5×IQR</p>
                            <p className="pl-4">├─ 下铰链 = Q1 (25%)</p>
                            <p className="pl-4">├─ 中位线 = Median (50%)</p>
                            <p className="pl-4">├─ 上铰链 = Q3 (75%)</p>
                            <p className="pl-4">└─ 上边缘 = Q3 + 1.5×IQR</p>
                            <p className="text-red-500 mt-2">● = 异常值（超出边缘）</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm mb-2"><strong>Excel操作：</strong></p>
                          <div className="text-xs space-y-1 p-3 bg-white dark:bg-gray-800 rounded">
                            <p>1. 选中数据</p>
                            <p>2. 插入 → 统计图表 → 箱形图</p>
                            <p>3. 对比多组：第一列=分类，后续列=数值</p>
                          </div>
                          <p className="text-sm mt-3 mb-2"><strong>典型应用：</strong></p>
                          <ul className="text-xs space-y-1 list-disc list-inside">
                            <li>薪资带宽对比（北上广vs二线城市）</li>
                            <li>用户消费分布（识别大R用户）</li>
                            <li>渠道质量评估</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* 箱线图可视化 */}
                      <div className={`mt-6 p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-blue-700' : 'bg-white border-blue-200'}`}>
                        <div className="max-w-lg mx-auto">
                          <BoxPlotChart theme={theme} />
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-semibold mb-3 text-purple-600">📊 直方图 Histogram ⭐⭐⭐⭐⭐</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm mb-2"><strong>作用：</strong>展示数据分布形态</p>
                          <div className="space-y-2 text-sm">
                            <div className="p-2 rounded bg-white dark:bg-gray-800">
                              <p className="font-semibold">🔔 标准型（钟形）</p>
                              <p className="text-xs">左右对称 → 自然现象、身高、体重</p>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-gray-800">
                              <p className="font-semibold">📊 偏锋型（拖尾）</p>
                              <p className="text-xs">右偏常见 → 收入、消费、停留时长</p>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-gray-800">
                              <p className="font-semibold">⛰️ 双峰型</p>
                              <p className="text-xs">两个高峰 → 两类用户混合</p>
                            </div>
                            <div className="p-2 rounded bg-white dark:bg-gray-800">
                              <p className="font-semibold">🦷 锯齿型</p>
                              <p className="text-xs">样本量小或数据质量问题</p>
                        </div>
                  </div>
                </div>
                        <div>
                          <p className="text-sm mb-2"><strong>Excel操作：</strong></p>
                          <div className="text-xs space-y-1 p-3 bg-white dark:bg-gray-800 rounded mb-3">
                            <p>1. 数据 → 数据分析 → 直方图</p>
                            <p>2. 设置箱数（bins）：√n 或 手动调整</p>
                            <p>3. 勾选"图表输出"</p>
                            <p className="text-orange-600 mt-2">⚠️ 箱数太少→细节丢失，太多→噪音</p>
                          </div>
                          <p className="text-sm mb-2"><strong>Python：</strong></p>
                          <div className="text-xs font-mono p-3 bg-white dark:bg-gray-800 rounded">
                            plt.hist(data, bins=30)<br/>
                            sns.histplot(df['col'])
                          </div>
                        </div>
                      </div>

                      {/* 直方图分布形态可视化 */}
                      <div className={`mt-6 p-6 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-purple-700' : 'bg-white border-purple-200'}`}>
                        <h4 className="text-center font-semibold mb-4 text-purple-600 text-lg">4种直方图分布形态详解</h4>
                        <HistogramShapes theme={theme} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* 模块02：概率论基础 */}
            <section id="module-2" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-[#19bcc8]"></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-green-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 02</Badge>
                    <StarRating count={4} />
                    <Badge variant="outline" className="text-orange-600 border-orange-600 font-semibold">理论基础·频率60%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('🎲', 'w-8 h-8 text-[#19bcc8]')}
                    <span>概率论基础 Probability Theory</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    数据分析的数学根基·A/B测试必备·推断统计前置知识
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-green-500' : 'bg-green-300'} blur-2xl`}></div>
              </div>

              {/* 2.1 概率三板斧 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-green-500' : 'border-l-green-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-transparent' : 'bg-gradient-to-r from-green-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-green-800' : 'border-green-200'}`}>
                  <CardTitle id="probability-basics" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      2.1 概率三板斧 - 业务场景必会
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* 条件概率 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <h4 className="font-semibold mb-3 text-green-600">🎯 条件概率 P(A|B)</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-mono mb-2">P(A|B) = P(A∩B) / P(B)</p>
                          <p className="mb-2"><strong>含义：</strong>在B发生的前提下，A发生的概率</p>
                          <p className="text-gray-600"><strong>记忆：</strong>"|"读作"given"，表示"在...条件下"</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                          <p className="font-semibold mb-2">📌 业务案例：转化率分析</p>
                          <p className="text-xs">P(下单|点击) = 点击后下单人数 / 点击人数</p>
                          <p className="text-xs mt-1">例：1000人点击，50人下单 → 转化率 = 5%</p>
                        </div>
                      </div>
                    </div>

                    {/* 全概率公式 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <h4 className="font-semibold mb-3 text-blue-600">🔄 全概率公式 - 拆解法</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-mono mb-2">P(A) = Σ P(A|Bᵢ) × P(Bᵢ)</p>
                          <p className="mb-2"><strong>含义：</strong>总概率 = 各渠道概率的加权平均</p>
                          <p className="text-gray-600"><strong>用途：</strong>多渠道、多场景的综合分析</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                          <p className="font-semibold mb-2">📌 业务案例：整体转化率</p>
                          <p className="text-xs">渠道A：30%流量，转化率5%</p>
                          <p className="text-xs">渠道B：70%流量，转化率3%</p>
                          <p className="text-xs text-green-600 mt-1">整体转化率 = 0.3×5% + 0.7×3% = 3.6%</p>
                        </div>
                      </div>
                    </div>

                    {/* 乘法公式 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} border`}>
                      <h4 className="font-semibold mb-3 text-orange-600">✖️ 乘法公式 - 连续事件</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-mono mb-2">P(A∩B) = P(A) × P(B|A)</p>
                          <p className="mb-2"><strong>含义：</strong>两件事同时发生的概率</p>
                          <p className="text-gray-600"><strong>特例：</strong>若独立，则 P(A∩B) = P(A) × P(B)</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                          <p className="font-semibold mb-2">📌 业务案例：漏斗转化</p>
                          <p className="text-xs">点击率10%，下单率5%</p>
                          <p className="text-xs mt-1">P(曝光→下单) = 10% × 5% = 0.5%</p>
                          <p className="text-xs text-green-600 mt-1">1万曝光 → 预计50个订单</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-2">💡 综合案例：电商转化漏斗分析</p>
                    <div className="text-sm space-y-2">
                      <p><strong>场景：</strong>某电商APP，10万DAU，分析从首页到支付的转化</p>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="font-semibold mb-2">数据：</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>首页→商品详情：20%</li>
                            <li>商品详情→加车：30%</li>
                            <li>加车→下单：50%</li>
                            <li>下单→支付：80%</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-2">计算（乘法公式）：</p>
                          <p className="font-mono text-xs">整体转化率 = 20% × 30% × 50% × 80% = 2.4%</p>
                          <p className="font-mono text-xs mt-1">预计订单 = 100,000 × 2.4% = 2,400单</p>
                          <p className="text-green-600 text-xs mt-2"><strong>✅ 结论：</strong>重点优化"加车→下单"环节（50%最低）</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2.2 贝叶斯定理 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-green-500' : 'border-l-green-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-transparent' : 'bg-gradient-to-r from-green-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-green-800' : 'border-green-200'}`}>
                  <CardTitle id="bayes" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Zap className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      2.2 贝叶斯定理 - 反向推理神器
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border mb-6`}>
                    <h4 className="font-semibold mb-3 text-purple-600">📐 核心公式</h4>
                    <div className="font-mono text-center text-lg mb-3">
                      P(A|B) = [P(B|A) × P(A)] / P(B)
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <p className="font-semibold">P(A|B) - 后验概率</p>
                        <p className="text-xs text-gray-600">看到B后，对A的更新认知</p>
                      </div>
                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <p className="font-semibold">P(A) - 先验概率</p>
                        <p className="text-xs text-gray-600">看到B之前，对A的初始判断</p>
                      </div>
                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <p className="font-semibold">P(B|A) - 似然</p>
                        <p className="text-xs text-gray-600">A为真时，观察到B的概率</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-2">💡 经典案例：反作弊系统</p>
                    <div className="text-sm space-y-2">
                      <p><strong>场景：</strong>某APP检测刷单用户，反作弊系统准确率90%</p>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="font-semibold mb-2">已知信息：</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>真实刷单用户占比：1%（先验）</li>
                            <li>系统检测刷单的准确率：90%（似然）</li>
                            <li>正常用户被误判：5%</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold mb-2">问题：</p>
                          <p className="text-xs">被系统标记为刷单的用户，真的是刷单的概率？</p>
                          <p className="font-mono text-xs mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded">
                            P(真刷单|被标记) = <br/>
                            [0.9 × 0.01] / [0.9×0.01 + 0.05×0.99]<br/>
                            = 0.009 / 0.0585 = 15.4%
                          </p>
                          <p className="text-orange-600 text-xs mt-2"><strong>⚠️ 注意：</strong>尽管系统准确率90%，但因刷单用户基数低，误判率仍高达84.6%！</p>
                        </div>
                      </div>
                      <p className="text-green-600 mt-3"><strong>✅ 启示：</strong>低频事件检测需要极高的准确率，或结合多维度特征</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2.3 常见分布 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-green-500' : 'border-l-green-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-transparent' : 'bg-gradient-to-r from-green-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-green-800' : 'border-green-200'}`}>
                  <CardTitle id="distributions" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      2.3 常见概率分布 - 业务场景速查
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">分布类型</th>
                          <th className="px-4 py-3 text-left">特征/公式</th>
                          <th className="px-4 py-3 text-left">Excel函数</th>
                          <th className="px-4 py-3 text-left">业务场景</th>
                          <th className="px-4 py-3 text-left">典型应用</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">正态分布 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3">
                            <p className="text-xs">钟形对称</p>
                            <p className="text-xs font-mono">μ±σ 68%, μ±2σ 95%</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">=NORM.DIST(x,μ,σ,1)</td>
                          <td className="px-4 py-3 text-xs">身高、考试分数、误差</td>
                          <td className="px-4 py-3 text-xs">异常检测、质量控制</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">二项分布 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3">
                            <p className="text-xs">n次试验，k次成功</p>
                            <p className="text-xs font-mono">P(k) = C(n,k)·p^k·(1-p)^(n-k)</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">=BINOM.DIST(k,n,p,0)</td>
                          <td className="px-4 py-3 text-xs">点击/不点击、转化/不转化</td>
                          <td className="px-4 py-3 text-xs">A/B测试、转化率区间估计</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">泊松分布 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3">
                            <p className="text-xs">单位时间/空间的事件数</p>
                            <p className="text-xs font-mono">P(k) = (λ^k·e^(-λ)) / k!</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">=POISSON.DIST(k,λ,0)</td>
                          <td className="px-4 py-3 text-xs">每小时订单数、每天bug数</td>
                          <td className="px-4 py-3 text-xs">容量规划、流量预测</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">指数分布 ⭐⭐⭐</td>
                          <td className="px-4 py-3">
                            <p className="text-xs">事件间隔时间</p>
                            <p className="text-xs font-mono">f(x) = λ·e^(-λx)</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">=EXPON.DIST(x,λ,1)</td>
                          <td className="px-4 py-3 text-xs">用户访问间隔、设备寿命</td>
                          <td className="px-4 py-3 text-xs">留存分析、推送时机</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">均匀分布 ⭐⭐</td>
                          <td className="px-4 py-3">
                            <p className="text-xs">各结果等概率</p>
                            <p className="text-xs font-mono">P(a≤x≤b) = (b-a)/(max-min)</p>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs">=RAND()*(b-a)+a</td>
                          <td className="px-4 py-3 text-xs">抽样、随机分组</td>
                          <td className="px-4 py-3 text-xs">A/B测试分流</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 正态分布可视化 */}
                  <div className={`mt-6 p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-green-700' : 'bg-white border-green-200'}`}>
                    <h4 className="text-center font-semibold mb-3 text-green-600">正态分布 68-95-99.7 法则</h4>
                    <div className="max-w-md mx-auto">
                      <NormalDistributionChart theme={theme} />
                    </div>
                    <p className={`text-center text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      μ±1σ 包含68.3%数据 | μ±2σ 包含95.4%数据 | μ±3σ 包含99.7%数据
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <p className="font-semibold mb-2">📌 正态分布应用：GMV预测区间</p>
                      <div className="text-sm space-y-1">
                        <p className="text-xs">历史日GMV：均值750万，标准差50万</p>
                        <p className="text-xs mt-2 text-green-600">• 68%的日子GMV在 700-800万</p>
                        <p className="text-xs text-green-600">• 95%的日子GMV在 650-850万</p>
                        <p className="text-xs text-green-600">• 99.7%的日子GMV在 600-900万</p>
                        <p className="text-xs mt-2 text-orange-600">⚠️ 若某日GMV &lt; 600万，99.7%置信度判断为异常</p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                      <p className="font-semibold mb-2">📌 泊松分布应用：容量规划</p>
                      <div className="text-sm space-y-1">
                        <p className="text-xs">某外卖平台每分钟订单量服从泊松分布，λ=200</p>
                        <p className="text-xs mt-2 font-mono">P(订单≤250) = POISSON.DIST(250, 200, 1) = 99.9%</p>
                        <p className="text-xs mt-2 text-green-600">✅ 结论：系统容量设计为250单/分钟，可满足99.9%时段需求</p>
                        <p className="text-xs mt-1 text-orange-600">⚠️ 峰值时段需单独评估（如午餐、晚餐）</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* MODULE 03: 推断统计学 */}
            <section id="inference" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-[#19bcc8]"></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-red-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 03</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">核心必备·频率90%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('📈', 'w-8 h-8 text-[#19bcc8]')}
                    <span>推断统计学 Inferential Statistics</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    通过样本数据推断总体特征·统计分析的核心思想·必须精通
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-red-500' : 'bg-red-300'} blur-2xl`}></div>
              </div>

              {/* 3.1 抽样分布 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-red-500' : 'border-l-red-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-red-900/20 to-transparent' : 'bg-gradient-to-r from-red-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-red-800' : 'border-red-200'}`}>
                  <CardTitle id="sampling-distribution" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      3.1 抽样分布 - 样本统计量的分布规律
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-3">🎯 核心概念</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-blue-600 mb-2">总体 vs 样本</p>
                        <ul className="space-y-1 text-xs">
                          <li>• <strong>总体</strong>：研究对象的全部（如全国所有用户）</li>
                          <li>• <strong>样本</strong>：从总体中抽取的部分（如1万抽样用户）</li>
                          <li>• <strong>参数</strong>：总体特征（μ, σ）- 通常未知</li>
                          <li>• <strong>统计量</strong>：样本特征（x̄, s）- 可计算</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-600 mb-2">抽样分布</p>
                        <ul className="space-y-1 text-xs">
                          <li>• 多次抽样得到的统计量（如x̄）的分布</li>
                          <li>• 样本均值的分布</li>
                          <li>• 样本方差的分布</li>
                          <li>• 样本比例的分布</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">定理名称</th>
                          <th className="px-4 py-3 text-left">公式/性质</th>
                          <th className="px-4 py-3 text-left">条件</th>
                          <th className="px-4 py-3 text-left">业务应用</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">中心极限定理 (CLT) ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3">
                            <p className="text-xs font-mono mb-1">x̄ ~ N(μ, σ²/n)</p>
                            <p className="text-xs">样本均值近似正态分布</p>
                          </td>
                          <td className="px-4 py-3 text-xs">样本量n≥30<br/>（或总体本身正态）</td>
                          <td className="px-4 py-3 text-xs">用户行为指标<br/>区间估计</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">标准误 (SE)</td>
                          <td className="px-4 py-3 font-mono text-xs">SE = σ / √n</td>
                          <td className="px-4 py-3 text-xs">样本独立同分布</td>
                          <td className="px-4 py-3 text-xs">估计精度评估</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">样本比例分布</td>
                          <td className="px-4 py-3 font-mono text-xs">p̂ ~ N(p, p(1-p)/n)</td>
                          <td className="px-4 py-3 text-xs">np≥10, n(1-p)≥10</td>
                          <td className="px-4 py-3 text-xs">转化率、点击率估计</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 实战案例：App日活跃用户数波动分析</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">场景描述</p>
                        <ul className="space-y-1">
                          <li>• 历史数据：日均DAU = 500万，标准差σ = 50万</li>
                          <li>• 问题：近7日DAU均值480万，是否异常？</li>
                        </ul>
                        <p className="font-semibold mt-3 mb-2">分析步骤</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px]">
                          n = 7<br/>
                          SE = 50万 / √7 = 18.9万<br/>
                          Z = (480-500) / 18.9 = -1.06
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">结论判断</p>
                        <ul className="space-y-1">
                          <li className="text-green-600">• |Z| = 1.06 &lt; 1.96（95%置信）</li>
                          <li className="text-green-600">✅ <strong>结论：</strong>波动在正常范围，无需恐慌</li>
                          <li className="text-orange-600 mt-2">⚠️ 若Z &lt; -1.96，则99%置信度认为DAU下降</li>
                        </ul>
                        <p className="font-semibold mt-3 mb-1">Python实现</p>
                        <div className="font-mono bg-gray-900 text-blue-400 p-2 rounded text-[10px]">
                          from scipy import stats<br/>
                          z = (480 - 500) / (50/np.sqrt(7))<br/>
                          p_value = stats.norm.sf(abs(z))*2
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3.2 置信区间 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-red-500' : 'border-l-red-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-red-900/20 to-transparent' : 'bg-gradient-to-r from-red-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-red-800' : 'border-red-200'}`}>
                  <CardTitle id="confidence-interval" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      3.2 置信区间 - 用区间估计不确定性
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">估计类型</th>
                          <th className="px-4 py-3 text-left">公式</th>
                          <th className="px-4 py-3 text-left">Excel函数</th>
                          <th className="px-4 py-3 text-left">使用场景</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">均值置信区间 (σ已知)</td>
                          <td className="px-4 py-3 font-mono text-xs">x̄ ± Z<sub>α/2</sub> × σ/√n</td>
                          <td className="px-4 py-3 font-mono text-xs">=CONFIDENCE.NORM(α,σ,n)</td>
                          <td className="px-4 py-3 text-xs">大样本（n≥30）均值估计</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">均值置信区间 (σ未知) ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 font-mono text-xs">x̄ ± t<sub>α/2</sub> × s/√n</td>
                          <td className="px-4 py-3 font-mono text-xs">=CONFIDENCE.T(α,s,n)</td>
                          <td className="px-4 py-3 text-xs">小样本（n&lt;30）均值估计</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">比例置信区间 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 font-mono text-xs">p̂ ± Z<sub>α/2</sub> × √(p̂(1-p̂)/n)</td>
                          <td className="px-4 py-3 text-xs">需手动计算</td>
                          <td className="px-4 py-3 text-xs">转化率、点击率区间</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-2">🎯 常用置信水平对应的Z值</p>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold">90% 置信</p>
                        <p className="text-2xl font-mono text-blue-600 my-1">1.645</p>
                        <p className="text-[10px] text-gray-500">常用于初步探索</p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold">95% 置信 ⭐</p>
                        <p className="text-2xl font-mono text-green-600 my-1">1.96</p>
                        <p className="text-[10px] text-gray-500">业界标准</p>
                      </div>
                      <div className="text-center p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold">99% 置信</p>
                        <p className="text-2xl font-mono text-red-600 my-1">2.576</p>
                        <p className="text-[10px] text-gray-500">高风险决策</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-2">📌 案例1：新功能转化率区间估计</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>数据：</strong>1000名用户测试，120人转化，转化率12%</p>
                        <p className="font-semibold mt-2">计算95%置信区间：</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px] my-2">
                          p̂ = 0.12<br/>
                          SE = √(0.12×0.88/1000) = 0.0103<br/>
                          CI = 0.12 ± 1.96×0.0103<br/>
                          = [0.100, 0.140] = [10.0%, 14.0%]
                        </div>
                        <p className="text-green-600 mt-2">✅ <strong>结论：</strong>95%置信度下，真实转化率在10%-14%之间</p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                      <p className="font-semibold mb-2">📌 案例2：用户平均订单金额估计</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>数据：</strong>抽样50笔订单，均值85元，标准差15元</p>
                        <p className="font-semibold mt-2">Excel计算：</p>
                        <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-[10px] my-2">
                          =CONFIDENCE.T(0.05, 15, 50)<br/>
                          结果：± 4.27元
                        </div>
                        <p className="font-semibold">置信区间：</p>
                        <p className="font-mono text-[10px]">85 ± 4.27 = [80.73, 89.27]</p>
                        <p className="text-purple-600 mt-2">✅ <strong>解读：</strong>95%把握认为总体平均订单额在80.7-89.3元</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 3.3 样本量计算 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-red-500' : 'border-l-red-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-red-900/20 to-transparent' : 'bg-gradient-to-r from-red-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-red-800' : 'border-red-200'}`}>
                  <CardTitle id="sample-size" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Activity className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      3.3 样本量计算 - 需要多少数据才够？
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                    <p className="font-semibold mb-2">🎯 为什么要提前计算样本量？</p>
                    <ul className="text-xs space-y-1">
                      <li>• 样本太小：估计不准确，结论不可靠</li>
                      <li>• 样本太大：浪费资源（时间、成本、用户体验）</li>
                      <li>• A/B测试必备：确定实验需要运行多久</li>
                    </ul>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">估计目标</th>
                          <th className="px-4 py-3 text-left">样本量公式</th>
                          <th className="px-4 py-3 text-left">参数说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-yellow-600">均值估计 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 font-mono text-xs">n = (Z<sub>α/2</sub> × σ / E)²</td>
                          <td className="px-4 py-3 text-xs">
                            E：允许误差<br/>
                            σ：总体标准差（可用历史数据估计）
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-yellow-600">比例估计 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 font-mono text-xs">n = Z²×p(1-p) / E²</td>
                          <td className="px-4 py-3 text-xs">
                            p：预估比例（不确定时用0.5最保守）<br/>
                            E：允许误差
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <p className="font-semibold mb-2">📌 案例：转化率调研需要多少样本？</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>目标：</strong>估计转化率，误差控制在±2%，95%置信</p>
                        <p className="font-semibold mt-2">计算步骤：</p>
                        <div className="font-mono bg-gray-900 text-blue-400 p-2 rounded text-[10px] my-2">
                          # 预估转化率10%<br/>
                          p = 0.10<br/>
                          Z = 1.96<br/>
                          E = 0.02<br/>
                          n = (1.96² × 0.1 × 0.9) / 0.02²<br/>
                          = 864.36 ≈ 865人
                        </div>
                        <p className="text-blue-600 mt-2">✅ 至少需要 <strong>865个样本</strong></p>
                        <p className="text-orange-600 text-[10px] mt-1">⚠️ 若完全不确定p，用p=0.5计算需2401个样本（最保守）</p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-2">📌 快速参考表（95%置信，比例估计）</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead className="bg-white dark:bg-gray-700">
                            <tr>
                              <th className="px-2 py-1 border">允许误差</th>
                              <th className="px-2 py-1 border">p=0.5（最保守）</th>
                              <th className="px-2 py-1 border">p=0.1</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="px-2 py-1 border font-mono">±1%</td>
                              <td className="px-2 py-1 border text-center">9604</td>
                              <td className="px-2 py-1 border text-center">3458</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="px-2 py-1 border font-mono">±2%</td>
                              <td className="px-2 py-1 border text-center">2401</td>
                              <td className="px-2 py-1 border text-center">865</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="px-2 py-1 border font-mono">±3%</td>
                              <td className="px-2 py-1 border text-center">1068</td>
                              <td className="px-2 py-1 border text-center">384</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="px-2 py-1 border font-mono">±5%</td>
                              <td className="px-2 py-1 border text-center">385</td>
                              <td className="px-2 py-1 border text-center">138</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-green-600 mt-2 text-[10px]">✅ 快速判断：通常500-2000样本可满足大部分业务需求</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* MODULE 04: 假设检验 */}
            <section id="hypothesis" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 via-gray-800 to-cyan-900/40 border-blue-700' : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-700' : 'bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-blue-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 04</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">核心必备·频率95%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('🔬', 'w-8 h-8 text-[#19bcc8]')}
                    <span>假设检验 Hypothesis Testing</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    判断差异是否显著·A/B测试核心方法·数据分析师必会
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'} blur-2xl`}></div>
              </div>

              {/* 4.1 假设检验基本原理 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-blue-500' : 'border-l-blue-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-transparent' : 'bg-gradient-to-r from-blue-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-blue-800' : 'border-blue-200'}`}>
                  <CardTitle id="hypothesis-basics" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      4.1 假设检验基本原理 - 6步标准流程
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <p className="font-semibold mb-3">🎯 核心概念</p>
                      <div className="text-xs space-y-2">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-blue-600">H₀ (原假设/零假设)</p>
                          <p className="text-[10px]">现状/无差异假设，如"新旧版本转化率相同"</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-purple-600">H₁ (备择假设)</p>
                          <p className="text-[10px]">我们想证明的假设，如"新版转化率更高"</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-green-600">p-value (显著性概率)</p>
                          <p className="text-[10px]">在H₀为真的前提下，观察到当前或更极端结果的概率</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-red-600">α (显著性水平)</p>
                          <p className="text-[10px]">通常取0.05，即5%容错率</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                      <p className="font-semibold mb-3">📋 标准6步流程</p>
                      <div className="text-xs space-y-1.5">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">1️⃣</span>
                          <span><strong>提出假设：</strong>H₀ 和 H₁</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">2️⃣</span>
                          <span><strong>选择显著性水平：</strong>通常α=0.05</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">3️⃣</span>
                          <span><strong>选择检验方法：</strong>t检验/卡方/方差分析等</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">4️⃣</span>
                          <span><strong>计算检验统计量：</strong>t值、χ²值、F值等</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">5️⃣</span>
                          <span><strong>计算p值：</strong>用Excel/Python获取</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">6️⃣</span>
                          <span><strong>做出决策：</strong>p&lt;α拒绝H₀，接受H₁</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-red-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">错误类型</th>
                          <th className="px-4 py-3 text-left">定义</th>
                          <th className="px-4 py-3 text-left">业务影响</th>
                          <th className="px-4 py-3 text-left">控制方法</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-red-600">I类错误 (α错误)</td>
                          <td className="px-4 py-3 text-xs">弃真错误：H₀为真但拒绝了它</td>
                          <td className="px-4 py-3 text-xs">误判有效果（虚惊一场）<br/>例：无效策略被上线</td>
                          <td className="px-4 py-3 text-xs">降低α（如0.01）<br/>增加样本量</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-orange-600">II类错误 (β错误)</td>
                          <td className="px-4 py-3 text-xs">取伪错误：H₀为假但未拒绝</td>
                          <td className="px-4 py-3 text-xs">错过真效果（漏掉机会）<br/>例：有效策略被放弃</td>
                          <td className="px-4 py-3 text-xs">增加统计功效(1-β)<br/>增加样本量</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                    <p className="font-semibold mb-2">⚠️ p值的常见误解</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-red-600 mb-1"><strong>❌ 错误理解：</strong></p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• p=0.03表示H₀有3%可能为真</li>
                          <li>• p值越小，差异越大</li>
                          <li>• p&lt;0.05就是"重要"的发现</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-green-600 mb-1"><strong>✅ 正确理解：</strong></p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• p值是数据出现的概率，不是假设的概率</li>
                          <li>• p值只衡量"统计显著性"，不等于"实际重要性"</li>
                          <li>• 必须结合业务意义和效应量综合判断</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 假设检验图解 */}
                  <div className={`mt-6 p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-red-700' : 'bg-white border-red-200'}`}>
                    <h4 className="text-center font-semibold mb-3 text-red-600">假设检验图解：拒绝域与接受域</h4>
                    <div className="max-w-lg mx-auto">
                      <HypothesisTestChart theme={theme} />
                    </div>
                    <p className={`text-center text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      当统计量落在红色拒绝域时，拒绝H₀；落在绿色接受域时，无法拒绝H₀
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 4.2 t检验 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-blue-500' : 'border-l-blue-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-transparent' : 'bg-gradient-to-r from-blue-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-blue-800' : 'border-blue-200'}`}>
                  <CardTitle id="t-test" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      4.2 t检验 - 比较均值差异
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">检验类型</th>
                          <th className="px-4 py-3 text-left">使用场景</th>
                          <th className="px-4 py-3 text-left">Excel函数</th>
                          <th className="px-4 py-3 text-left">Python</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">单样本t检验 ⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">样本均值 vs 已知总体值<br/>例：实际DAU vs 目标500万</td>
                          <td className="px-4 py-3 font-mono text-xs">=T.TEST(range, μ₀, 2, 1)</td>
                          <td className="px-4 py-3 font-mono text-xs">stats.ttest_1samp()</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">独立双样本t检验 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">两组独立样本均值对比<br/>例：A/B测试两组转化时长</td>
                          <td className="px-4 py-3 font-mono text-xs">=T.TEST(A, B, 2, 2)</td>
                          <td className="px-4 py-3 font-mono text-xs">stats.ttest_ind()</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">配对t检验 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">同一组前后对比<br/>例：策略上线前后用户留存</td>
                          <td className="px-4 py-3 font-mono text-xs">=T.TEST(before, after, 2, 1)</td>
                          <td className="px-4 py-3 font-mono text-xs">stats.ttest_rel()</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-2">📌 案例：新推荐算法是否提升时长？</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>场景：</strong>对照组(n=100)平均观看25分钟，实验组(n=100)平均28分钟</p>
                        <p className="font-semibold mt-2">Excel操作：</p>
                        <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-[10px] my-2">
                          =T.TEST(A1:A100, B1:B100, 2, 2)<br/>
                          结果 p = 0.032
                        </div>
                        <p className="font-semibold">Python验证：</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px] my-2">
                          from scipy import stats<br/>
                          t_stat, p = stats.ttest_ind(A, B)<br/>
                          # p = 0.032
                        </div>
                        <p className="text-green-600 mt-2">✅ <strong>结论：</strong>p=0.032 &lt; 0.05，拒绝H₀，新算法有效提升时长！</p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                      <p className="font-semibold mb-2">📌 案例：营销活动前后对比</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>场景：</strong>200名用户活动前后日均消费对比（配对数据）</p>
                        <p className="font-semibold mt-2">完整流程：</p>
                        <div className="text-[10px] space-y-1">
                          <p>1️⃣ <strong>假设：</strong>H₀: μ前 = μ后，H₁: μ前 &lt; μ后</p>
                          <p>2️⃣ <strong>计算差值：</strong>d = 消费后 - 消费前</p>
                          <p>3️⃣ <strong>Excel：</strong>=T.TEST(before, after, 1, 1)</p>
                          <p className="ml-4">结果：p = 0.008</p>
                          <p>4️⃣ <strong>判断：</strong>p &lt; 0.05，活动显著提升消费</p>
                        </div>
                        <p className="text-purple-600 mt-2">✅ <strong>要点：</strong>配对设计控制个体差异，检验功效更高</p>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} border`}>
                    <p className="font-semibold mb-2">🔍 t检验前提条件检查</p>
                    <div className="grid md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">1. 正态性</p>
                        <p className="text-[10px]">• n≥30：CLT保证正态<br/>• n&lt;30：需检验（Shapiro-Wilk）<br/>• 严重偏态：用非参数检验</p>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">2. 方差齐性</p>
                        <p className="text-[10px]">• 独立样本t检验需检查<br/>• Levene检验判断<br/>• 不齐用Welch's t检验</p>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">3. 独立性</p>
                        <p className="text-[10px]">• 样本间互不影响<br/>• 随机抽样保证<br/>• 配对数据用配对检验</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 4.3 卡方检验 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-blue-500' : 'border-l-blue-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-transparent' : 'bg-gradient-to-r from-blue-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-blue-800' : 'border-blue-200'}`}>
                  <CardTitle id="chi-square" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Activity className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      4.3 卡方检验 (χ²) - 分析分类数据
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">检验类型</th>
                          <th className="px-4 py-3 text-left">使用场景</th>
                          <th className="px-4 py-3 text-left">公式</th>
                          <th className="px-4 py-3 text-left">Excel函数</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">独立性检验 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">两个分类变量是否相关<br/>例：性别 vs 购买偏好</td>
                          <td className="px-4 py-3 font-mono text-xs">χ² = Σ(O-E)²/E</td>
                          <td className="px-4 py-3 font-mono text-xs">=CHISQ.TEST(O, E)</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">拟合优度检验 ⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">实际分布 vs 理论分布<br/>例：用户来源分布是否均匀</td>
                          <td className="px-4 py-3 font-mono text-xs">χ² = Σ(O-E)²/E</td>
                          <td className="px-4 py-3 text-xs">手动计算</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-3">📊 实战案例：A/B测试转化率对比（经典应用）</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">数据表（2×2列联表）</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px] border-collapse">
                            <thead className="bg-white dark:bg-gray-700">
                              <tr>
                                <th className="border px-2 py-1">组别</th>
                                <th className="border px-2 py-1">转化</th>
                                <th className="border px-2 py-1">未转化</th>
                                <th className="border px-2 py-1">合计</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border px-2 py-1">A组（对照）</td>
                                <td className="border px-2 py-1 text-center">120</td>
                                <td className="border px-2 py-1 text-center">880</td>
                                <td className="border px-2 py-1 text-center font-semibold">1000</td>
                              </tr>
                              <tr>
                                <td className="border px-2 py-1">B组（实验）</td>
                                <td className="border px-2 py-1 text-center">150</td>
                                <td className="border px-2 py-1 text-center">850</td>
                                <td className="border px-2 py-1 text-center font-semibold">1000</td>
                              </tr>
                              <tr className="font-semibold">
                                <td className="border px-2 py-1">合计</td>
                                <td className="border px-2 py-1 text-center">270</td>
                                <td className="border px-2 py-1 text-center">1730</td>
                                <td className="border px-2 py-1 text-center">2000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-[10px]">• A组转化率：12%<br/>• B组转化率：15%<br/>• 差异3%，是否显著？</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">检验步骤</p>
                        <div className="text-[10px] space-y-1">
                          <p><strong>1️⃣ 假设：</strong>H₀: 两组转化率相同</p>
                          <p><strong>2️⃣ Excel操作：</strong></p>
                          <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded my-1">
                            实际观测值：A1:B2<br/>
                            期望频数：计算行总×列总/总计<br/>
                            =CHISQ.TEST(A1:B2, E1:E2)<br/>
                            结果：p = 0.029
                          </div>
                          <p><strong>3️⃣ Python验证：</strong></p>
                          <div className="font-mono bg-gray-900 text-blue-400 p-2 rounded my-1">
                            from scipy.stats import chi2_contingency<br/>
                            chi2, p, dof, exp = chi2_contingency([[120,880],[150,850]])<br/>
                            # p = 0.029
                          </div>
                          <p className="text-green-600 mt-2"><strong>✅ 结论：</strong>p=0.029 &lt; 0.05，B组转化率显著更高！</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                    <p className="font-semibold mb-2">⚠️ 卡方检验使用条件</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-yellow-600 mb-1">适用条件</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>✅ 每个单元格期望频数 ≥ 5</li>
                          <li>✅ 样本量足够大（总样本 &gt; 40）</li>
                          <li>✅ 数据为计数数据（频数）</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">违反条件时</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• 期望频数 &lt; 5：用Fisher精确检验</li>
                          <li>• 样本量过小：合并类别或增加样本</li>
                          <li>• 2×2表格：可用Z检验双比例</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 4.4 方差分析 (ANOVA) */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-blue-500' : 'border-l-blue-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-transparent' : 'bg-gradient-to-r from-blue-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-blue-800' : 'border-blue-200'}`}>
                  <CardTitle id="anova" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      4.4 方差分析 (ANOVA) - 比较3组及以上均值
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-2">🎯 为什么不用多次t检验？</p>
                    <div className="text-xs">
                      <p className="mb-2">比较3组时，两两t检验需要做3次（A vs B, A vs C, B vs C），每次α=0.05：</p>
                      <p className="font-mono text-[10px] p-2 bg-white dark:bg-gray-700 rounded">
                        总体I类错误率 = 1 - (1-0.05)³ = 14.3% &gt;&gt; 5%
                      </p>
                      <p className="mt-2 text-green-600"><strong>✅ ANOVA一次性检验多组，控制总体错误率！</strong></p>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">ANOVA类型</th>
                          <th className="px-4 py-3 text-left">使用场景</th>
                          <th className="px-4 py-3 text-left">Excel操作</th>
                          <th className="px-4 py-3 text-left">Python</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">单因素ANOVA ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">1个分类变量，3+组均值对比<br/>例：3种推荐策略的点击率</td>
                          <td className="px-4 py-3 text-xs">数据 → 数据分析<br/>→ 方差分析：单因素</td>
                          <td className="px-4 py-3 font-mono text-xs">stats.f_oneway()</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">双因素ANOVA ⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">2个分类变量的交互效应<br/>例：性别×年龄对消费的影响</td>
                          <td className="px-4 py-3 text-xs">数据 → 数据分析<br/>→ 方差分析：双因素</td>
                          <td className="px-4 py-3 font-mono text-xs">statsmodels.anova</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 实战案例：4种首页布局的用户停留时长对比</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">数据概览</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead className="bg-white dark:bg-gray-700">
                              <tr>
                                <th className="border px-2 py-1">布局</th>
                                <th className="border px-2 py-1">样本量</th>
                                <th className="border px-2 py-1">均值(秒)</th>
                                <th className="border px-2 py-1">标准差</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td className="border px-2 py-1">A-经典</td><td className="border px-2 py-1 text-center">50</td><td className="border px-2 py-1 text-center">120</td><td className="border px-2 py-1 text-center">15</td></tr>
                              <tr><td className="border px-2 py-1">B-极简</td><td className="border px-2 py-1 text-center">50</td><td className="border px-2 py-1 text-center">135</td><td className="border px-2 py-1 text-center">18</td></tr>
                              <tr><td className="border px-2 py-1">C-卡片</td><td className="border px-2 py-1 text-center">50</td><td className="border px-2 py-1 text-center">142</td><td className="border px-2 py-1 text-center">20</td></tr>
                              <tr><td className="border px-2 py-1">D-信息流</td><td className="border px-2 py-1 text-center">50</td><td className="border px-2 py-1 text-center">128</td><td className="border px-2 py-1 text-center">16</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-[10px]"><strong>问题：</strong>4种布局的停留时长是否存在显著差异？</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">ANOVA检验</p>
                        <div className="text-[10px] space-y-1">
                          <p><strong>Python实现：</strong></p>
                          <div className="font-mono bg-gray-900 text-green-400 p-2 rounded my-1">
                            from scipy import stats<br/>
                            F, p = stats.f_oneway(A, B, C, D)<br/>
                            # F = 12.34, p = 0.0001
                          </div>
                          <p><strong>Excel操作：</strong></p>
                          <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded my-1">
                            数据→数据分析→方差分析：单因素<br/>
                            输入区域：A1:D50<br/>
                            查看F值和P值
                          </div>
                          <p className="text-green-600 mt-2"><strong>✅ 结论：</strong>p=0.0001 &lt; 0.05，至少有一组显著不同</p>
                          <p className="text-orange-600 mt-1"><strong>⚠️ 事后检验：</strong>需Tukey HSD找出具体哪两组不同</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-2">📋 ANOVA结果解读</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-blue-600 mb-1">F统计量</p>
                        <p className="text-[10px]">F = 组间方差 / 组内方差<br/>• F越大，组间差异越大<br/>• F&gt;临界值或p&lt;0.05，拒绝H₀</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-600 mb-1">事后多重比较</p>
                        <p className="text-[10px]">ANOVA显著后，用以下方法找具体差异：<br/>• Tukey HSD（最常用）<br/>• Bonferroni<br/>• Scheffe</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* MODULE 05: 相关与回归 */}
            <section id="regression" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 via-gray-800 to-indigo-900/40 border-purple-700' : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-700' : 'bg-gradient-to-b from-purple-400 via-indigo-400 to-purple-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-purple-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 05</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">核心必备·频率85%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('📉', 'w-8 h-8 text-[#19bcc8]')}
                    <span>相关与回归 Correlation & Regression</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    发现变量间的关系·预测建模的基础·从简单相关到多元回归
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'} blur-2xl`}></div>
              </div>

              {/* 5.1 相关分析 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-transparent' : 'bg-gradient-to-r from-purple-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                  <CardTitle id="correlation" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      5.1 相关分析 - 衡量两变量线性关系强度
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">相关系数</th>
                          <th className="px-4 py-3 text-left">适用场景</th>
                          <th className="px-4 py-3 text-left">取值范围</th>
                          <th className="px-4 py-3 text-left">Excel函数</th>
                          <th className="px-4 py-3 text-left">Python</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">Pearson相关系数 (r) ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">两变量均为连续型<br/>线性关系</td>
                          <td className="px-4 py-3 font-mono text-xs">[-1, 1]</td>
                          <td className="px-4 py-3 font-mono text-xs">=CORREL(X,Y)</td>
                          <td className="px-4 py-3 font-mono text-xs">df.corr()</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">Spearman相关系数 (ρ) ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">有序分类/有异常值<br/>单调关系</td>
                          <td className="px-4 py-3 font-mono text-xs">[-1, 1]</td>
                          <td className="px-4 py-3 text-xs">需安装插件</td>
                          <td className="px-4 py-3 font-mono text-xs">spearmanr()</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">Kendall's Tau (τ) ⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">小样本+有序数据</td>
                          <td className="px-4 py-3 font-mono text-xs">[-1, 1]</td>
                          <td className="px-4 py-3 text-xs">需安装插件</td>
                          <td className="px-4 py-3 font-mono text-xs">kendalltau()</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-3">🎯 相关系数解读标准（绝对值）</p>
                    <div className="grid grid-cols-5 gap-2 text-xs text-center">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-mono text-lg text-gray-400">0.0-0.2</p>
                        <p className="text-[10px] mt-1">极弱/无相关</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-mono text-lg text-blue-500">0.2-0.4</p>
                        <p className="text-[10px] mt-1">弱相关</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-mono text-lg text-green-500">0.4-0.6</p>
                        <p className="text-[10px] mt-1">中等相关</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-mono text-lg text-orange-500">0.6-0.8</p>
                        <p className="text-[10px] mt-1">强相关</p>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-700 rounded">
                        <p className="font-mono text-lg text-red-500">0.8-1.0</p>
                        <p className="text-[10px] mt-1">极强相关</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-2">📌 案例：广告投放 vs 销售额相关性</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>数据：</strong>30天广告费用(X)与销售额(Y)</p>
                        <p className="font-semibold mt-2">Excel操作：</p>
                        <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-[10px] my-2">
                          =CORREL(A2:A31, B2:B31)<br/>
                          结果：r = 0.78
                        </div>
                        <p className="font-semibold">Python实现：</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px] my-2">
                          import pandas as pd<br/>
                          r = df[['ad_cost','sales']].corr()<br/>
                          # r = 0.78
                        </div>
                        <p className="text-green-600 mt-2">✅ <strong>结论：</strong>r=0.78，强正相关，广告费用显著影响销售</p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                      <p className="font-semibold mb-2">⚠️ 相关不等于因果！</p>
                      <div className="text-xs space-y-2">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-red-600 mb-1">经典错误案例</p>
                          <p className="text-[10px]">冰淇淋销量 ↔ 溺水事故数 (r=0.9)<br/>
                          <span className="text-orange-600">⚠️ 真实原因：夏季高温（混杂变量）</span></p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-blue-600 mb-1">判断因果需要</p>
                          <ul className="text-[10px] space-y-0.5">
                            <li>• 时间先后顺序</li>
                            <li>• 排除混杂因素</li>
                            <li>• 机制可解释性</li>
                            <li>• 实验验证（A/B测试）</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-2">🔍 相关系数显著性检验</p>
                    <div className="text-xs">
                      <p className="mb-2"><strong>问题：</strong>r=0.3是真实相关还是随机波动？</p>
                      <p className="font-semibold mb-1">检验公式：</p>
                      <p className="font-mono text-[10px] p-2 bg-white dark:bg-gray-700 rounded mb-2">
                        t = r × √(n-2) / √(1-r²)，自由度 df = n-2
                      </p>
                      <p><strong>快速判断：</strong>n=30时，|r|&gt;0.36即显著(α=0.05)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 5.2 线性回归 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-transparent' : 'bg-gradient-to-r from-purple-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                  <CardTitle id="linear-regression" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      5.2 简单线性回归 - 建立预测方程
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-2">🎯 回归方程</p>
                    <div className="text-center my-4">
                      <p className="font-mono text-xl">Y = β₀ + β₁X + ε</p>
                      <div className="grid md:grid-cols-4 gap-2 mt-3 text-xs">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold">β₀ (截距)</p>
                          <p className="text-[10px]">X=0时Y的值</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold">β₁ (斜率)</p>
                          <p className="text-[10px]">X每增加1，Y的变化</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold">ε (残差)</p>
                          <p className="text-[10px]">预测值与实际值的差</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold">最小二乘法</p>
                          <p className="text-[10px]">使Σε²最小</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">关键指标</th>
                          <th className="px-4 py-3 text-left">含义</th>
                          <th className="px-4 py-3 text-left">计算/判断标准</th>
                          <th className="px-4 py-3 text-left">Excel/Python</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">R² (决定系数) ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">模型解释Y变异的比例</td>
                          <td className="px-4 py-3 text-xs">[0,1]，越接近1越好<br/>&gt;0.7为较好拟合</td>
                          <td className="px-4 py-3 font-mono text-xs">=RSQ(Y,X)<br/>model.score()</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">调整R² ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">考虑变量数量的R²</td>
                          <td className="px-4 py-3 text-xs">多元回归必看<br/>防止过拟合</td>
                          <td className="px-4 py-3 text-xs">回归分析输出<br/>statsmodels</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">F检验 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">整体模型是否显著</td>
                          <td className="px-4 py-3 text-xs">p&lt;0.05模型有意义</td>
                          <td className="px-4 py-3 text-xs">回归分析输出</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">t检验 (系数) ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">单个变量是否显著</td>
                          <td className="px-4 py-3 text-xs">p&lt;0.05该变量有效</td>
                          <td className="px-4 py-3 text-xs">回归分析输出</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 完整案例：预测用户月消费金额</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">问题背景</p>
                        <ul className="space-y-1 text-[10px]">
                          <li>• <strong>目标：</strong>用月活跃天数(X)预测月消费(Y)</li>
                          <li>• <strong>数据：</strong>200个用户样本</li>
                        </ul>
                        <p className="font-semibold mt-3 mb-1">Excel操作：</p>
                        <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-[10px]">
                          数据→数据分析→回归<br/>
                          Y范围：B2:B201（消费金额）<br/>
                          X范围：A2:A201（活跃天数）
                        </div>
                        <p className="font-semibold mt-2 mb-1">Python实现：</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px]">
                          from sklearn.linear_model import LinearRegression<br/>
                          model = LinearRegression()<br/>
                          model.fit(X, Y)<br/>
                          # β₀=50, β₁=8.5, R²=0.65
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">结果解读</p>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded mb-2">
                          <p className="font-mono text-[10px] mb-1"><strong>回归方程：</strong>Y = 50 + 8.5X</p>
                          <ul className="space-y-0.5 text-[10px]">
                            <li>• 截距50：不活跃用户基础消费50元</li>
                            <li>• 斜率8.5：每多活跃1天，消费增8.5元</li>
                          </ul>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded mb-2">
                          <p className="font-semibold text-[10px] mb-1"><strong>模型评估：</strong></p>
                          <ul className="space-y-0.5 text-[10px]">
                            <li>• R² = 0.65：模型解释65%的消费变异</li>
                            <li>• F检验 p&lt;0.001：模型整体显著</li>
                            <li>• β₁ p&lt;0.001：活跃天数显著影响消费</li>
                          </ul>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                          <p className="font-semibold text-[10px] mb-1"><strong>业务应用：</strong></p>
                          <p className="text-[10px]">某用户月活跃15天，预测消费：<br/>
                          Y = 50 + 8.5×15 = 177.5元</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 散点图+回归线可视化 */}
                  <div className={`mt-6 p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-indigo-700' : 'bg-white border-indigo-200'}`}>
                    <h4 className="text-center font-semibold mb-3 text-indigo-600">散点图与回归线</h4>
                    <div className="max-w-md mx-auto">
                      <ScatterRegressionChart theme={theme} />
                    </div>
                    <p className={`text-center text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      蓝色点=实际观测值 | 虚线=回归拟合线 | r=0.95表示强正相关
                    </p>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} border`}>
                    <p className="font-semibold mb-2">🔍 残差分析 - 检验模型假设</p>
                    <div className="grid md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">1. 正态性</p>
                        <p className="text-[10px]">残差应服从正态分布<br/>• Q-Q图检查<br/>• Shapiro-Wilk检验</p>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">2. 同方差性</p>
                        <p className="text-[10px]">残差方差恒定<br/>• 残差vs拟合值散点图<br/>• 无喇叭状/漏斗状</p>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-600 mb-1">3. 独立性</p>
                        <p className="text-[10px]">残差间无自相关<br/>• Durbin-Watson检验<br/>• 值接近2为理想</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 5.3 多元回归 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-purple-500' : 'border-l-purple-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-transparent' : 'bg-gradient-to-r from-purple-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                  <CardTitle id="multiple-regression" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      5.3 多元线性回归 - 多因素预测模型
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-2">🎯 多元回归方程</p>
                    <div className="text-center my-3">
                      <p className="font-mono text-lg">Y = β₀ + β₁X₁ + β₂X₂ + ... + βₚXₚ + ε</p>
                      <p className="text-xs mt-2">同时考虑多个自变量对因变量的影响</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">关键问题</th>
                          <th className="px-4 py-3 text-left">诊断方法</th>
                          <th className="px-4 py-3 text-left">判断标准</th>
                          <th className="px-4 py-3 text-left">解决方案</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">多重共线性 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">VIF (方差膨胀因子)</td>
                          <td className="px-4 py-3 text-xs">VIF&gt;10严重<br/>VIF&gt;5需注意</td>
                          <td className="px-4 py-3 text-xs">删除相关变量<br/>主成分分析<br/>岭回归</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">过拟合 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">训练集vs测试集R²</td>
                          <td className="px-4 py-3 text-xs">测试集R²大幅下降</td>
                          <td className="px-4 py-3 text-xs">减少变量数<br/>正则化(L1/L2)<br/>交叉验证</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-purple-600">变量选择 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">逐步回归/AIC/BIC</td>
                          <td className="px-4 py-3 text-xs">AIC/BIC越小越好</td>
                          <td className="px-4 py-3 text-xs">前向/后向选择<br/>LASSO</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 实战案例：预测房价的多元回归模型</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">模型构建</p>
                        <p className="text-[10px] mb-2"><strong>因变量Y：</strong>房价（万元）<br/>
                        <strong>自变量：</strong>面积(X₁)、楼层(X₂)、房龄(X₃)、地铁距离(X₄)</p>
                        <p className="font-semibold mb-1">Python代码：</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px]">
                          import statsmodels.api as sm<br/>
                          X = df[['area','floor','age','metro']]<br/>
                          X = sm.add_constant(X)<br/>
                          model = sm.OLS(Y, X).fit()<br/>
                          print(model.summary())
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">结果解读</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead className="bg-white dark:bg-gray-700">
                              <tr>
                                <th className="border px-2 py-1">变量</th>
                                <th className="border px-2 py-1">系数</th>
                                <th className="border px-2 py-1">p值</th>
                                <th className="border px-2 py-1">VIF</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td className="border px-2 py-1">截距</td><td className="border px-2 py-1 text-center">50</td><td className="border px-2 py-1 text-center">&lt;0.001</td><td className="border px-2 py-1 text-center">-</td></tr>
                              <tr><td className="border px-2 py-1">面积</td><td className="border px-2 py-1 text-center">0.8</td><td className="border px-2 py-1 text-center">&lt;0.001</td><td className="border px-2 py-1 text-center">1.2</td></tr>
                              <tr><td className="border px-2 py-1">楼层</td><td className="border px-2 py-1 text-center">2.5</td><td className="border px-2 py-1 text-center">0.002</td><td className="border px-2 py-1 text-center">1.1</td></tr>
                              <tr><td className="border px-2 py-1">房龄</td><td className="border px-2 py-1 text-center">-1.2</td><td className="border px-2 py-1 text-center">0.015</td><td className="border px-2 py-1 text-center">1.5</td></tr>
                              <tr><td className="border px-2 py-1">地铁距离</td><td className="border px-2 py-1 text-center">-0.3</td><td className="border px-2 py-1 text-center">0.08</td><td className="border px-2 py-1 text-center">1.3</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-[10px]"><strong>R² = 0.82, 调整R² = 0.80</strong></p>
                        <p className="text-green-600 text-[10px] mt-1">✅ 面积每增1㎡，房价涨0.8万<br/>✅ 楼层每高1层，房价涨2.5万<br/>⚠️ 地铁距离不显著(p=0.08)</p>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-2">💡 多元回归实战技巧</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-blue-600 mb-1">变量预处理</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• 标准化：消除量纲影响</li>
                          <li>• 类别变量：哑变量编码</li>
                          <li>• 交互项：X₁×X₂捕捉协同效应</li>
                          <li>• 非线性：log、√、平方项转换</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-600 mb-1">模型验证</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• 训练集/测试集分割(8:2)</li>
                          <li>• K折交叉验证(k=5或10)</li>
                          <li>• MAE/RMSE评估预测误差</li>
                          <li>• 业务可解释性检查</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* MODULE 06: A/B测试实战 */}
            <section id="ab-testing" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/40 via-gray-800 to-yellow-900/40 border-orange-700' : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50 border-orange-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-orange-500 via-yellow-500 to-orange-700' : 'bg-gradient-to-b from-orange-400 via-yellow-400 to-orange-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-orange-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 06</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">核心必备·频率80%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('🧪', 'w-8 h-8 text-[#19bcc8]')}
                    <span>A/B测试实战 A/B Testing Practice</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    数据驱动决策的金标准·互联网公司核心方法·完整流程+常见陷阱
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-orange-500' : 'bg-orange-300'} blur-2xl`}></div>
              </div>

              {/* 6.1 A/B测试完整流程 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-orange-500' : 'border-l-orange-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/20 to-transparent' : 'bg-gradient-to-r from-orange-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-orange-800' : 'border-orange-200'}`}>
                  <CardTitle id="ab-process" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Target className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      6.1 A/B测试完整流程 - 7步标准方法
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-7 gap-2 mb-6 text-xs">
                    {[
                      { num: '1️⃣', title: '提出假设', content: 'H₀/H₁明确' },
                      { num: '2️⃣', title: '选择指标', content: '主指标+护栏' },
                      { num: '3️⃣', title: '样本量', content: '统计功效' },
                      { num: '4️⃣', title: '分流设计', content: '随机化/AA' },
                      { num: '5️⃣', title: '运行实验', content: '监控异常' },
                      { num: '6️⃣', title: '结果分析', content: 'p值+置信区间' },
                      { num: '7️⃣', title: '决策上线', content: '业务综合判断' }
                    ].map((step, idx) => (
                      <div key={idx} className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                        <p className="text-2xl mb-1">{step.num}</p>
                        <p className="font-semibold text-blue-600">{step.title}</p>
                        <p className="text-[10px] mt-1">{step.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 完整案例：首页推荐算法优化A/B测试</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">1️⃣-4️⃣ 实验设计</p>
                        <div className="space-y-1 text-[10px]">
                          <p><strong>假设：</strong>新算法提升点击率至少2%</p>
                          <p><strong>主指标：</strong>点击率(CTR) - 北极星指标</p>
                          <p><strong>护栏指标：</strong>页面加载时长、跳出率</p>
                          <p><strong>样本量：</strong>基线CTR=10%，MDE=2%(相对提升20%)，α=0.05，β=0.2<br/>
                          → 每组需要 <strong>3,850人</strong></p>
                          <p><strong>分流：</strong>50%对照组 vs 50%实验组</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">5️⃣-7️⃣ 运行与分析</p>
                        <div className="space-y-1 text-[10px]">
                          <p><strong>运行7天：</strong>累计8000人/组</p>
                          <p><strong>结果数据：</strong></p>
                          <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded my-1">
                            对照组：CTR = 10.2% (816/8000)<br/>
                            实验组：CTR = 12.5% (1000/8000)
                          </div>
                          <p><strong>卡方检验：</strong>p = 0.001 &lt; 0.05 ✅</p>
                          <p><strong>提升度：</strong>(12.5-10.2)/10.2 = 22.5%</p>
                          <p><strong>置信区间：</strong>[1.5%, 3.0%] 绝对提升</p>
                          <p className="text-green-600 mt-2"><strong>✅ 决策：</strong>效果显著且无护栏指标恶化，建议全量上线</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-2">🎯 指标选择三原则</p>
                    <div className="grid md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-purple-600 mb-1">1. 主指标（OEC）</p>
                        <p className="text-[10px]">• 与业务目标直接相关<br/>• 只选1-2个<br/>• 例：GMV、留存率、转化率</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-600 mb-1">2. 护栏指标</p>
                        <p className="text-[10px]">• 防止短期优化损害长期<br/>• 加载速度、用户体验<br/>• 例：页面加载&gt;3s、跳出率&gt;70%</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-600 mb-1">3. 诊断指标</p>
                        <p className="text-[10px]">• 帮助理解实验机制<br/>• 曝光、点击、互动<br/>• 例：首屏曝光率、平均停留</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 6.2 样本量与统计功效 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-orange-500' : 'border-l-orange-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/20 to-transparent' : 'bg-gradient-to-r from-orange-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-orange-800' : 'border-orange-200'}`}>
                  <CardTitle id="ab-sample-size" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#19bcc8]/10 text-[#19bcc8]">
                      <Activity className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      6.2 样本量计算 - 确定实验规模
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">参数</th>
                          <th className="px-4 py-3 text-left">含义</th>
                          <th className="px-4 py-3 text-left">典型取值</th>
                          <th className="px-4 py-3 text-left">影响</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">α (显著性水平)</td>
                          <td className="px-4 py-3 text-xs">I类错误概率（误判有效）</td>
                          <td className="px-4 py-3 text-xs">0.05 (95%置信)</td>
                          <td className="px-4 py-3 text-xs">α越小，样本量越大</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">β / 统计功效(1-β)</td>
                          <td className="px-4 py-3 text-xs">II类错误/检测到真差异的能力</td>
                          <td className="px-4 py-3 text-xs">0.2 / 0.8 (80%功效)</td>
                          <td className="px-4 py-3 text-xs">功效越高，样本量越大</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">MDE (最小可检测效应)</td>
                          <td className="px-4 py-3 text-xs">希望检测到的最小差异</td>
                          <td className="px-4 py-3 text-xs">相对提升5%-20%</td>
                          <td className="px-4 py-3 text-xs">MDE越小，样本量越大</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-2">📌 比例指标样本量计算</p>
                      <div className="text-xs space-y-1">
                        <p className="mb-2"><strong>场景：</strong>转化率从3%提升到3.5%（相对提升16.7%）</p>
                        <p className="font-semibold mt-2">公式：</p>
                        <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-[10px] my-2">
                          n = 2 × (Z<sub>α/2</sub> + Z<sub>β</sub>)² × p̄(1-p̄) / (p₁-p₀)²<br/>
                          p̄ = (p₀+p₁)/2<br/>
                          <br/>
                          n = 2×(1.96+0.84)²×0.0325×0.9675 / 0.005²<br/>
                          = 20,214 / 组
                        </div>
                        <p className="text-orange-600 text-[10px]">⚠️ 小提升需要大样本！3%→3.5%需4万+用户</p>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <p className="font-semibold mb-2">💡 实战工具推荐</p>
                      <div className="text-xs space-y-2">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-blue-600 mb-1">在线计算器</p>
                          <p className="text-[10px]">• Evan's Awesome A/B Tools<br/>• Optimizely Sample Size<br/>• ABTestGuide计算器</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-purple-600 mb-1">Python实现</p>
                          <div className="font-mono bg-gray-900 text-blue-400 p-1 rounded text-[10px] mt-1">
                            from statsmodels.stats.power import zt_ind_solve_power<br/>
                            n = zt_ind_solve_power(effect_size=0.2, alpha=0.05, power=0.8)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                    <p className="font-semibold mb-2">⚠️ 样本量不足的后果</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-red-600 mb-1">❌ 问题表现</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• 真实有效果但检测不到（II类错误）</li>
                          <li>• 结果不稳定，重复实验结论不一致</li>
                          <li>• 置信区间过宽，无法做出决策</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-green-600 mb-1">✅ 解决方案</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>• 延长实验时间（至少1-2周）</li>
                          <li>• 增加流量分配比例</li>
                          <li>• 降低MDE（只检测更大提升）</li>
                          <li>• 使用更敏感的连续型指标</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* A/B测试统计功效可视化 */}
                  <div className={`mt-6 p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-pink-700' : 'bg-white border-pink-200'}`}>
                    <h4 className="text-center font-semibold mb-3 text-pink-600">A/B测试：α、β、统计功效图解</h4>
                    <div className="max-w-md mx-auto">
                      <ABTestPowerChart theme={theme} />
                    </div>
                    <p className={`text-center text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      红色α区=I类错误 | 黄色β区=II类错误 | 绿色区=统计功效(1-β)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 6.3 常见陷阱与解决方案 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-orange-500' : 'border-l-orange-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/20 to-transparent' : 'bg-gradient-to-r from-orange-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-orange-800' : 'border-orange-200'}`}>
                  <CardTitle id="ab-pitfalls" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                      <AlertTriangle className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      6.3 A/B测试常见陷阱 - 避免错误结论
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: '⚠️ 陷阱1：提前停止（Peeking）',
                        problem: '每天查看结果，一旦p<0.05就停止实验',
                        why: '多次检验使I类错误率从5%飙升至30%+',
                        solution: '• 预先计算样本量并严格执行\n• 使用序贯检验方法(Sequential Testing)\n• 设置固定的检查点（如每周一次）',
                        color: 'red'
                      },
                      {
                        title: '⚠️ 陷阱2：SRM（Sample Ratio Mismatch）',
                        problem: '设计50:50分流，实际53:47',
                        why: '分流不均说明实验有偏，结果不可信',
                        solution: '• 实验前做AA测试验证分流\n• 运行期间监控分流比例(卡方检验p>0.05)\n• 检查分流代码和日志系统',
                        color: 'orange'
                      },
                      {
                        title: '⚠️ 陷阱3：新奇效应（Novelty Effect）',
                        problem: '新功能上线初期效果特别好，一周后下降',
                        why: '用户对新事物的好奇心，非真实长期效果',
                        solution: '• 实验运行至少2周（覆盖完整业务周期）\n• 分析新用户vs老用户差异\n• 关注趋势而非绝对值',
                        color: 'yellow'
                      },
                      {
                        title: '⚠️ 陷阱4：多重检验（Multiple Testing）',
                        problem: '同时测试20个指标，总有几个p<0.05',
                        why: '多次检验增加偶然显著的概率',
                        solution: '• 预先指定1-2个主指标\n• 用Bonferroni校正：α_new = 0.05/n\n• FDR(False Discovery Rate)控制',
                        color: 'purple'
                      },
                      {
                        title: '⚠️ 陷阱5：辛普森悖论',
                        problem: '整体提升，但细分人群都下降',
                        why: '用户构成变化导致的统计假象',
                        solution: '• 分层分析（按新老、地域、设备）\n• 检查流量构成是否改变\n• 使用分层回归调整',
                        color: 'blue'
                      }
                    ].map((trap, idx) => (
                      <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? `bg-${trap.color}-900/20 border-${trap.color}-700` : `bg-${trap.color}-50 border-${trap.color}-200`} border`}>
                        <p className="font-semibold mb-2 text-sm">{trap.title}</p>
                        <div className="grid md:grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="font-semibold text-red-600 mb-1">问题</p>
                            <p className="text-[10px]">{trap.problem}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-orange-600 mb-1">危害</p>
                            <p className="text-[10px]">{trap.why}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-green-600 mb-1">解决方案</p>
                            <p className="text-[10px] whitespace-pre-line">{trap.solution}</p>
                          </div>
                        </div>
                  </div>
                ))}
            </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-2">✅ A/B测试检查清单</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-green-600 mb-1">实验前</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>☐ 假设清晰可检验</li>
                          <li>☐ 样本量计算并确保可达</li>
                          <li>☐ AA测试验证分流</li>
                          <li>☐ 主指标+护栏指标明确</li>
                        </ul>
          </div>
                      <div>
                        <p className="font-semibold text-green-600 mb-1">实验中/后</p>
                        <ul className="space-y-0.5 text-[10px]">
                          <li>☐ SRM检查（卡方p&gt;0.05）</li>
                          <li>☐ 达到预设样本量</li>
                          <li>☐ 护栏指标无恶化</li>
                          <li>☐ 分层分析一致性</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* MODULE 07: 时间序列分析 */}
            <section id="timeseries" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900/40 via-gray-800 to-cyan-900/40 border-teal-700' : 'bg-gradient-to-br from-teal-50 via-white to-cyan-50 border-teal-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-teal-500 via-cyan-500 to-teal-700' : 'bg-gradient-to-b from-teal-400 via-cyan-400 to-teal-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-teal-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 07</Badge>
                    <StarRating count={4} />
                    <Badge variant="outline" className="text-orange-600 border-orange-600 font-semibold">重要技能·频率60%</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('📅', 'w-8 h-8 text-[#19bcc8]')}
                    <span>时间序列分析 Time Series Analysis</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    预测未来趋势·GMV预测·用户增长预测·销量预测核心方法
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-teal-500' : 'bg-teal-300'} blur-2xl`}></div>
              </div>

              {/* 7.1 时间序列四要素 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-teal-500' : 'border-l-teal-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-teal-900/20 to-transparent' : 'bg-gradient-to-r from-teal-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-teal-800' : 'border-teal-200'}`}>
                  <CardTitle id="ts-components" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'}`}>
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      7.1 时间序列四要素 - T/S/C/I分解
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-3">🎯 四大组成要素</p>
                    <div className="grid md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-blue-600 text-lg mb-1">T - 趋势</p>
                        <p className="text-[10px]">Trend<br/>长期增长/下降方向<br/>例：DAU逐年增长</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-green-600 text-lg mb-1">S - 季节性</p>
                        <p className="text-[10px]">Seasonal<br/>固定周期规律波动<br/>例：周末订单高峰</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-purple-600 text-lg mb-1">C - 周期</p>
                        <p className="text-[10px]">Cyclic<br/>不固定长周期波动<br/>例：经济周期</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-orange-600 text-lg mb-1">I - 随机</p>
                        <p className="text-[10px]">Irregular<br/>不可预测的噪音<br/>例：系统故障</p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">分解模型</th>
                          <th className="px-4 py-3 text-left">公式</th>
                          <th className="px-4 py-3 text-left">适用场景</th>
                          <th className="px-4 py-3 text-left">Python实现</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">加法模型 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 font-mono text-xs">Y = T + S + I</td>
                          <td className="px-4 py-3 text-xs">季节波动幅度恒定<br/>用户量、订单数</td>
                          <td className="px-4 py-3 font-mono text-xs">seasonal_decompose<br/>(model='additive')</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-blue-600">乘法模型 ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 font-mono text-xs">Y = T × S × I</td>
                          <td className="px-4 py-3 text-xs">季节波动随趋势增大<br/>GMV、销售额（常用）</td>
                          <td className="px-4 py-3 font-mono text-xs">seasonal_decompose<br/>(model='multiplicative')</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 实战：电商日GMV时间序列分解</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">Python完整代码</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px]">
                          import pandas as pd<br/>
                          from statsmodels.tsa.seasonal import seasonal_decompose<br/>
                          import matplotlib.pyplot as plt<br/>
                          <br/>
                          # 读取数据<br/>
                          df = pd.read_csv('gmv.csv', parse_dates=['date'])<br/>
                          df.set_index('date', inplace=True)<br/>
                          <br/>
                          # 时间序列分解（乘法模型）<br/>
                          result = seasonal_decompose(<br/>
                          {'  '}df['gmv'], <br/>
                          {'  '}model='multiplicative',<br/>
                          {'  '}period=7  # 周周期<br/>
                          )<br/>
                          <br/>
                          # 可视化四要素<br/>
                          result.plot()<br/>
                          plt.show()
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">结果解读与应用</p>
                  <div className="space-y-2">
                          <div className="p-2 bg-white dark:bg-gray-700 rounded text-[10px]">
                            <p className="font-semibold text-blue-600 mb-1">📈 趋势项 (Trend)</p>
                            <p>整体GMV月均增长8%<br/>年增长率约100%，健康增长</p>
                        </div>
                          <div className="p-2 bg-white dark:bg-gray-700 rounded text-[10px]">
                            <p className="font-semibold text-green-600 mb-1">🔄 季节项 (Seasonal)</p>
                            <p>周末GMV是工作日1.3倍<br/>双11系数2.5，618系数1.8</p>
                  </div>
                          <div className="p-2 bg-white dark:bg-gray-700 rounded text-[10px]">
                            <p className="font-semibold text-orange-600 mb-1">📉 残差项 (Residual)</p>
                            <p>发现3月15日异常值-40%<br/>排查：系统故障4小时</p>
                </div>
            </div>
                        <p className="text-green-600 mt-2 text-[10px]">✅ <strong>应用：</strong>去季节性后看真实增长，异常检测</p>
          </div>
        </div>
      </div>

                  {/* 时间序列分解可视化 */}
                  <div className={`mt-6 p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800 border-cyan-700' : 'bg-white border-cyan-200'}`}>
                    <h4 className="text-center font-semibold mb-3 text-cyan-600">时间序列分解示意图</h4>
                    <div className="max-w-sm mx-auto">
                      <TimeSeriesDecomposition theme={theme} />
    </div>
                    <p className={`text-center text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      原始序列 = 趋势(T) + 季节性(S) + 随机项(I)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 7.2 平滑预测方法 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-teal-500' : 'border-l-teal-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-teal-900/20 to-transparent' : 'bg-gradient-to-r from-teal-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-teal-800' : 'border-teal-200'}`}>
                  <CardTitle id="ts-smoothing" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'}`}>
                      <Activity className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      7.2 平滑预测方法 - 简单实用的预测工具
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}>
                        <tr>
                          <th className="px-4 py-3 text-left">方法</th>
                          <th className="px-4 py-3 text-left">核心思想</th>
                          <th className="px-4 py-3 text-left">优缺点</th>
                          <th className="px-4 py-3 text-left">适用场景</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">移动平均MA ⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">近k期简单平均<br/>MA = Σy<sub>t</sub>/k</td>
                          <td className="px-4 py-3 text-xs">✅ 简单直观<br/>❌ 滞后性强<br/>❌ 权重相同</td>
                          <td className="px-4 py-3 text-xs">平滑噪音<br/>识别趋势</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">指数平滑ES ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">近期权重大<br/>F<sub>t+1</sub>=αy<sub>t</sub>+(1-α)F<sub>t</sub></td>
                          <td className="px-4 py-3 text-xs">✅ 响应快<br/>✅ 内存占用小<br/>❌ 无趋势季节</td>
                          <td className="px-4 py-3 text-xs">平稳序列<br/>短期预测</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">Holt线性趋势 ⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">ES + 趋势项<br/>双指数平滑</td>
                          <td className="px-4 py-3 text-xs">✅ 捕捉趋势<br/>❌ 无季节性</td>
                          <td className="px-4 py-3 text-xs">有趋势无季节<br/>用户增长</td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold text-green-600">Holt-Winters ⭐⭐⭐⭐⭐</td>
                          <td className="px-4 py-3 text-xs">ES+趋势+季节<br/>三重指数平滑</td>
                          <td className="px-4 py-3 text-xs">✅ 功能全面<br/>✅ 实用性强<br/>✅ 计算高效</td>
                          <td className="px-4 py-3 text-xs">趋势+季节<br/>GMV预测首选</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="font-semibold mb-3">📌 Holt-Winters预测实战</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">场景：预测未来7天订单量</p>
                        <div className="font-mono bg-gray-900 text-blue-400 p-2 rounded text-[10px]">
                          from statsmodels.tsa.holtwinters import ExponentialSmoothing<br/>
                          <br/>
                          # 构建模型<br/>
                          model = ExponentialSmoothing(<br/>
                          {'  '}data,<br/>
                          {'  '}trend='add',      # 加法趋势<br/>
                          {'  '}seasonal='mul',   # 乘法季节<br/>
                          {'  '}seasonal_periods=7  # 周周期<br/>
                          )<br/>
                          <br/>
                          # 拟合模型<br/>
                          fit = model.fit()<br/>
                          <br/>
                          # 预测未来7天<br/>
                          forecast = fit.forecast(steps=7)<br/>
                          print(forecast)
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">预测结果示例</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead className="bg-white dark:bg-gray-700">
                              <tr>
                                <th className="border px-2 py-1">日期</th>
                                <th className="border px-2 py-1">预测值</th>
                                <th className="border px-2 py-1">实际值</th>
                                <th className="border px-2 py-1">误差%</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td className="border px-2 py-1">周一</td><td className="border px-2 py-1">18500</td><td className="border px-2 py-1">18200</td><td className="border px-2 py-1 text-green-600">-1.6%</td></tr>
                              <tr><td className="border px-2 py-1">周二</td><td className="border px-2 py-1">19200</td><td className="border px-2 py-1">19800</td><td className="border px-2 py-1 text-orange-600">+3.1%</td></tr>
                              <tr><td className="border px-2 py-1">周三</td><td className="border px-2 py-1">20100</td><td className="border px-2 py-1">19900</td><td className="border px-2 py-1 text-green-600">-1.0%</td></tr>
                              <tr><td className="border px-2 py-1">周六</td><td className="border px-2 py-1">26800</td><td className="border px-2 py-1">27200</td><td className="border px-2 py-1 text-green-600">+1.5%</td></tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-blue-600 text-[10px] mt-2">✅ MAPE = 2.1%，预测准确率97.9%</p>
                        <p className="text-[10px] mt-1">自动捕捉周末高峰规律</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 7.3 ARIMA模型 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-teal-500' : 'border-l-teal-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-teal-900/20 to-transparent' : 'bg-gradient-to-r from-teal-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-teal-800' : 'border-teal-200'}`}>
                  <CardTitle id="arima" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'}`}>
                      <BarChart3 className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      7.3 ARIMA模型 - 工业级预测标准
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                    <p className="font-semibold mb-3">🎯 ARIMA(p,d,q)三参数详解</p>
                    <div className="grid md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-yellow-600 mb-1">p - AR自回归阶数</p>
                        <p className="text-[10px]">y<sub>t</sub>依赖于过去p期<br/>如：今日销量看昨日、前日<br/>通过PACF图确定</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-orange-600 mb-1">d - 差分阶数</p>
                        <p className="text-[10px]">去除趋势的差分次数<br/>d=1一阶差分（最常用）<br/>d=2二阶差分（加速度）</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded">
                        <p className="font-semibold text-red-600 mb-1">q - MA移动平均阶数</p>
                        <p className="text-[10px]">y<sub>t</sub>依赖过去q期误差<br/>残差的滞后影响<br/>通过ACF图确定</p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📊 ARIMA建模完整流程</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold mb-2">5步标准流程</p>
                        <div className="space-y-2 text-[10px]">
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-green-600">1️⃣</span>
                            <div>
                              <p className="font-semibold">平稳性检验</p>
                              <p>ADF检验（p&lt;0.05为平稳）<br/>观察ACF图是否快速衰减</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-green-600">2️⃣</span>
                            <div>
                              <p className="font-semibold">差分处理</p>
                              <p>若不平稳→一阶差分<br/>再检验，仍不平稳→二阶差分</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-green-600">3️⃣</span>
                            <div>
                              <p className="font-semibold">定阶(p,q)</p>
                              <p>ACF/PACF图人工判断<br/>或auto_arima自动寻优</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-green-600">4️⃣</span>
                            <div>
                              <p className="font-semibold">模型拟合</p>
                              <p>ARIMA(p,d,q)或SARIMA<br/>检查残差白噪声</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-green-600">5️⃣</span>
                            <div>
                              <p className="font-semibold">预测与评估</p>
                              <p>forecast未来n期<br/>MAE/RMSE/MAPE评估</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Python自动化实现</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px]">
                          from pmdarima import auto_arima<br/>
                          from statsmodels.tsa.statespace.sarimax import SARIMAX<br/>
                          <br/>
                          # 方法1：自动寻优（推荐）<br/>
                          model = auto_arima(<br/>
                          {'  '}data,<br/>
                          {'  '}seasonal=True,<br/>
                          {'  '}m=7,  # 周季节<br/>
                          {'  '}stepwise=True,<br/>
                          {'  '}suppress_warnings=True,<br/>
                          {'  '}error_action='ignore'<br/>
                          )<br/>
                          print(f"最优模型: {'{'}model.order{'}'}x{'{'}model.seasonal_order{'}'}")<br/>
                          <br/>
                          # 预测未来14天<br/>
                          forecast = model.predict(n_periods=14)<br/>
                          <br/>
                          # 方法2：手动指定SARIMA<br/>
                          model2 = SARIMAX(data, order=(1,1,1), <br/>
                          {'                         '}seasonal_order=(1,1,1,7))<br/>
                          fit = model2.fit()<br/>
                          forecast2 = fit.forecast(steps=14)
                        </div>
                        <p className="text-green-600 mt-2 text-[10px]">✅ auto_arima自动选择最优(p,d,q)，省去手动调参</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 模块分割线 */}
            <div className={`my-16 flex items-center gap-4 ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`}>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
              <div className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                ◆ ◆ ◆
              </div>
              <div className={`flex-1 h-1 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-gray-500 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-400 to-transparent'}`}></div>
            </div>

            {/* MODULE 08: 实战案例库 */}
            <section id="cases" className="mb-20 scroll-mt-24">
              {/* 一级标题美化 */}
              <div className={`relative mb-8 p-8 rounded-2xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-rose-900/40 via-gray-800 to-pink-900/40 border-rose-700' : 'bg-gradient-to-br from-rose-50 via-white to-pink-50 border-rose-300'}`}>
                <div className={`absolute left-0 top-0 w-3 h-full rounded-l-2xl ${theme === 'dark' ? 'bg-gradient-to-b from-rose-500 via-pink-500 to-rose-700' : 'bg-gradient-to-b from-rose-400 via-pink-400 to-rose-600'}`}></div>
                <div className="pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="bg-rose-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">MODULE 08</Badge>
                    <StarRating count={5} />
                    <Badge variant="outline" className="text-red-600 border-red-600 font-semibold">实战核心·综合应用</Badge>
                  </div>
                  <h2 className={`text-5xl font-black mb-2 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getLucideIcon('💼', 'w-8 h-8 text-[#19bcc8]')}
                    <span>实战案例库 Practical Cases</span>
                  </h2>
                  <p className={`text-base font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    完整分析链路·问题定义→数据分析→统计检验→结论建议·3大经典场景
                  </p>
                </div>
                {/* 右上角装饰 */}
                <div className={`absolute top-4 right-4 w-24 h-24 rounded-full opacity-20 ${theme === 'dark' ? 'bg-rose-500' : 'bg-rose-300'} blur-2xl`}></div>
              </div>

              {/* 8.1 GMV异常诊断 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-rose-500' : 'border-l-rose-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-rose-900/20 to-transparent' : 'bg-gradient-to-r from-rose-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-rose-800' : 'border-rose-200'}`}>
                  <CardTitle id="case-gmv" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
                      <AlertTriangle className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      8.1 GMV突降10%，24小时定位根因
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border`}>
                    <p className="font-semibold mb-2 text-red-600">🚨 问题背景</p>
                    <p className="text-xs">某电商平台周三GMV从日均750万降至675万（-10%），CEO要求24小时内找出原因并给出解决方案</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <p className="font-semibold mb-3">📊 Step 1：判断统计显著性</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-[10px] mb-2">方法：3σ原则 + Z-score</p>
                          <div className="font-mono bg-white dark:bg-gray-700 p-2 rounded text-[10px]">
                            # 历史30天数据<br/>
                            μ = 750万（均值）<br/>
                            σ = 50万（标准差）<br/>
                            <br/>
                            # 计算Z值<br/>
                            Z = (675 - 750) / 50 = -1.5<br/>
                            <br/>
                            # 判断<br/>
                            |Z| = 1.5 &lt; 1.96 (95%置信)
                          </div>
                          <p className="text-green-600 text-[10px] mt-2">✅ 初步结论：在2σ范围内，可能是正常波动</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[10px] mb-2">但需深入验证</p>
                          <ul className="space-y-1 text-[10px]">
                            <li className="flex items-start gap-1">
                              <span>•</span>
                              <span>检查历史同期（周三通常较低？）</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span>•</span>
                              <span>环比对比：vs上周三(-12%)、vs昨日(-8%)</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span>•</span>
                              <span>同比对比：vs去年同期(-15%)</span>
                            </li>
                            <li className="flex items-start gap-1">
                              <span>•</span>
                              <span>排除节假日/促销/外部事件影响</span>
                            </li>
                          </ul>
                          <p className="text-orange-600 text-[10px] mt-2">⚠️ 多维度验证后确认：异常下跌</p>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-3">🔍 Step 2：多维拆解找root cause</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead className="bg-white dark:bg-gray-700">
                            <tr>
                              <th className="border px-2 py-1">拆解维度</th>
                              <th className="border px-2 py-1">指标公式</th>
                              <th className="border px-2 py-1">统计方法</th>
                              <th className="border px-2 py-1">变化</th>
                              <th className="border px-2 py-1">判断</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="border px-2 py-1 font-semibold">公式拆解</td>
                              <td className="border px-2 py-1">GMV = 访客 × 转化率 × 客单价</td>
                              <td className="border px-2 py-1">同环比对比</td>
                              <td className="border px-2 py-1 text-red-600">访客-15%<br/>转化-2%<br/>客单价+5%</td>
                              <td className="border px-2 py-1 text-red-600">⚠️ 流量问题</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="border px-2 py-1 font-semibold">流量渠道</td>
                              <td className="border px-2 py-1">自然/付费/站外引流</td>
                              <td className="border px-2 py-1">卡方检验<br/>p=0.001</td>
                              <td className="border px-2 py-1 text-red-600">付费广告-80%<br/>自然流量正常</td>
                              <td className="border px-2 py-1 text-red-600">⚠️ 核心问题</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="border px-2 py-1 font-semibold">用户分层</td>
                              <td className="border px-2 py-1">新用户/老用户</td>
                              <td className="border px-2 py-1">独立t检验<br/>p=0.02</td>
                              <td className="border px-2 py-1">新用户-18%<br/>老用户-5%</td>
                              <td className="border px-2 py-1 text-orange-600">新客获取受阻</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="border px-2 py-1 font-semibold">品类分析</td>
                              <td className="border px-2 py-1">各品类GMV占比</td>
                              <td className="border px-2 py-1">ANOVA<br/>F=5.2, p=0.008</td>
                              <td className="border px-2 py-1 text-red-600">服装-20%<br/>3C+8%<br/>食品-3%</td>
                              <td className="border px-2 py-1 text-orange-600">服装异常</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                              <td className="border px-2 py-1 font-semibold">地域分布</td>
                              <td className="border px-2 py-1">各省市GMV</td>
                              <td className="border px-2 py-1">同比对比</td>
                              <td className="border px-2 py-1">华东-12%<br/>华北-15%<br/>其他正常</td>
                              <td className="border px-2 py-1 text-green-600">✓ 全国性问题</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-green-600 mt-3 text-[10px]">✅ <strong>定位结论：</strong>付费广告预算耗尽导致新客流量骤降，次要因素是服装品类库存紧张</p>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                      <p className="font-semibold mb-3">📋 Step 3：量化影响 + 给出建议</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-purple-600 text-[10px] mb-2">影响量化分析</p>
                          <div className="space-y-1 text-[10px]">
                            <p><strong>主因（付费广告）：</strong></p>
                            <div className="ml-3 space-y-0.5">
                              <li>• 付费流量从10万→2万（-80%）</li>
                              <li>• 贡献GMV从200万→40万（-160万）</li>
                              <li>• 解释总下跌的 <strong className="text-red-600">70%</strong></li>
                            </div>
                            <p className="mt-2"><strong>次因（服装断货）：</strong></p>
                            <div className="ml-3 space-y-0.5">
                              <li>• 服装GMV占比30%</li>
                              <li>• 下跌20% → 影响-45万</li>
                              <li>• 解释总下跌的 <strong className="text-orange-600">25%</strong></li>
                            </div>
                            <p className="mt-2 text-green-600">✅ 两因素合计解释95%的下跌</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-green-600 text-[10px] mb-2">分级行动建议</p>
                          <div className="space-y-2">
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold text-red-600 text-[10px]">🚨 紧急措施（当日）</p>
                              <ul className="text-[10px] space-y-0.5 mt-1">
                                <li>• 追加50万广告预算</li>
                                <li>• 预计恢复流量6万，GMV+120万</li>
                                <li>• ROI = 120/50 = 2.4 ✅</li>
                              </ul>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold text-orange-600 text-[10px]">⚡ 短期优化（本周）</p>
                              <ul className="text-[10px] space-y-0.5 mt-1">
                                <li>• 紧急调货补充服装库存</li>
                                <li>• 上线替代品推荐算法</li>
                                <li>• 预计恢复GMV+30万</li>
                              </ul>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-700 rounded">
                              <p className="font-semibold text-blue-600 text-[10px]">🔧 长期机制（本月）</p>
                              <ul className="text-[10px] space-y-0.5 mt-1">
                                <li>• 建立GMV实时监控看板</li>
                                <li>• 设置Z&gt;2触发预警</li>
                                <li>• 优化预算动态分配策略</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 8.2 用户留存A/B测试 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-rose-500' : 'border-l-rose-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-rose-900/20 to-transparent' : 'bg-gradient-to-r from-rose-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-rose-800' : 'border-rose-200'}`}>
                  <CardTitle id="case-retention" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      8.2 新手引导优化：7日留存率提升验证
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 text-xs">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                      <p className="font-semibold mb-3">📊 实验设计与数据</p>
                      <div className="space-y-2 text-[10px]">
                        <p><strong>假设：</strong>新手引导增加互动游戏化元素可提升留存</p>
                        <p><strong>实验周期：</strong>14天</p>
                        <p><strong>分流：</strong>50% vs 50%</p>
                      </div>
                      <div className="overflow-x-auto mt-3">
                        <table className="w-full text-[10px]">
                          <thead className="bg-white dark:bg-gray-700">
                            <tr>
                              <th className="border px-2 py-1">分组</th>
                              <th className="border px-2 py-1">新用户数</th>
                              <th className="border px-2 py-1">7日留存</th>
                              <th className="border px-2 py-1">留存率</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="border px-2 py-1">对照组A</td><td className="border px-2 py-1">5000</td><td className="border px-2 py-1">1200</td><td className="border px-2 py-1 font-semibold">24.0%</td></tr>
                            <tr><td className="border px-2 py-1">实验组B</td><td className="border px-2 py-1">5000</td><td className="border px-2 py-1">1400</td><td className="border px-2 py-1 font-semibold text-green-600">28.0%</td></tr>
                            <tr className="bg-green-50 dark:bg-green-900/20">
                              <td className="border px-2 py-1 font-semibold" colSpan={3}>绝对提升</td>
                              <td className="border px-2 py-1 font-semibold text-green-600">+4.0%</td>
                            </tr>
                            <tr className="bg-green-50 dark:bg-green-900/20">
                              <td className="border px-2 py-1 font-semibold" colSpan={3}>相对提升</td>
                              <td className="border px-2 py-1 font-semibold text-green-600">+16.7%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                      <p className="font-semibold mb-3">🔍 统计显著性检验</p>
                      <div className="space-y-2 text-[10px]">
                        <p className="font-semibold mb-1">Python完整代码：</p>
                        <div className="font-mono bg-gray-900 text-green-400 p-2 rounded text-[10px]">
                          from statsmodels.stats.proportion import proportions_ztest<br/>
                          import numpy as np<br/>
                          <br/>
                          # 数据准备<br/>
                          counts = np.array([1400, 1200])  # 留存人数<br/>
                          nobs = np.array([5000, 5000])    # 总用户数<br/>
                          <br/>
                          # 双比例Z检验<br/>
                          z_stat, p_value = proportions_ztest(<br/>
                          {'  '}counts, nobs, alternative='larger'<br/>
                          )<br/>
                          <br/>
                          print(f"Z统计量: {'{'}z_stat:.3f{'}'}")<br/>
                          print(f"p值: {'{'}p_value:.4f{'}'}")<br/>
                          <br/>
                          # 结果：<br/>
                          # Z = 3.26<br/>
                          # p = 0.0006
                        </div>
                        <div className="mt-3 p-2 bg-white dark:bg-gray-700 rounded">
                          <p className="font-semibold text-green-600 mb-1">✅ 检验结论</p>
                          <ul className="space-y-0.5">
                            <li>• <strong>p=0.0006 &lt;&lt; 0.05</strong> → 高度显著！</li>
                            <li>• Z=3.26，超过3σ阈值</li>
                            <li>• <strong>95%置信区间：</strong>[1.5%, 6.5%] 绝对提升</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                    <p className="font-semibold mb-3">⚠️ 深度分析：防止误判</p>
                    <div className="grid md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-yellow-600 text-[10px] mb-2">1. Cohort曲线分析</p>
                        <p className="text-[10px]">不能只看Day7单点，需观察：</p>
                        <ul className="text-[10px] space-y-0.5 mt-1">
                          <li>• Day1→7完整留存曲线</li>
                          <li>• 是否存在新奇效应？</li>
                          <li>• Day30长期留存如何？</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-orange-600 text-[10px] mb-2">2. 分层一致性检验</p>
                        <p className="text-[10px]">按维度分层验证：</p>
                        <ul className="text-[10px] space-y-0.5 mt-1">
                          <li>• iOS vs Android</li>
                          <li>• 不同渠道来源</li>
                          <li>• 一二三线城市</li>
                          <li>⚠️ 防止辛普森悖论</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600 text-[10px] mb-2">3. 护栏指标检查</p>
                        <p className="text-[10px]">确保无负面影响：</p>
                        <ul className="text-[10px] space-y-0.5 mt-1">
                          <li>✅ 新手任务完成率 +12%</li>
                          <li>✅ 首日使用时长 +8min</li>
                          <li>✅ 页面加载速度 无变化</li>
                          <li>✅ 用户反馈 正面居多</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 8.3 RFM用户分层 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8 border-l-4 ${theme === 'dark' ? 'border-l-rose-500' : 'border-l-rose-600'} shadow-lg`}>
                <CardHeader className={`${theme === 'dark' ? 'bg-gradient-to-r from-rose-900/20 to-transparent' : 'bg-gradient-to-r from-rose-50 to-transparent'} border-b-2 ${theme === 'dark' ? 'border-rose-800' : 'border-rose-200'}`}>
                  <CardTitle id="case-rfm" className="text-2xl font-bold flex items-center gap-3 scroll-mt-24">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
                      <Target className="w-5 h-5" />
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                      8.3 RFM模型：精准用户分层与营销ROI提升
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'} border`}>
                    <p className="font-semibold mb-3">🎯 RFM三维评分体系</p>
                    <div className="grid md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-gray-700 rounded text-center">
                        <p className="text-3xl mb-1">📅</p>
                        <p className="font-semibold text-purple-600">R - Recency</p>
                        <p className="text-[10px] mt-1">最近一次消费距今天数<br/><strong>天数越小越好</strong><br/>R=1天 → 5分<br/>R=90天 → 1分</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded text-center">
                        <p className="text-3xl mb-1">🔄</p>
                        <p className="font-semibold text-blue-600">F - Frequency</p>
                        <p className="text-[10px] mt-1">统计周期内消费频次<br/><strong>次数越多越好</strong><br/>F=1次 → 1分<br/>F≥10次 → 5分</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-700 rounded text-center">
                        <p className="text-3xl mb-1">💰</p>
                        <p className="font-semibold text-green-600">M - Monetary</p>
                        <p className="text-[10px] mt-1">统计周期内消费金额<br/><strong>金额越高越好</strong><br/>M=100元 → 1分<br/>M≥5000元 → 5分</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-xs">
                    <div>
                      <p className="font-semibold mb-2">📊 Python完整实现</p>
                      <div className="font-mono bg-gray-900 text-purple-400 p-2 rounded text-[10px]">
                        import pandas as pd<br/>
                        from datetime import datetime<br/>
                        <br/>
                        # 计算RFM值<br/>
                        today = pd.to_datetime('2024-01-01')<br/>
                        rfm = df.groupby('user_id').agg({'{'}<br/>
                        {'  '}'order_date': lambda x: (today - x.max()).days,  # R<br/>
                        {'  '}'order_id': 'count',  # F<br/>
                        {'  '}'amount': 'sum'  # M<br/>
                        {'}'})<br/>
                        rfm.columns = ['Recency', 'Frequency', 'Monetary']<br/>
                        <br/>
                        # 五分位打分（1-5分）<br/>
                        rfm['R_score'] = pd.qcut(rfm['Recency'], <br/>
                        {'                                 '}5, labels=[5,4,3,2,1])<br/>
                        rfm['F_score'] = pd.qcut(rfm['Frequency'], <br/>
                        {'                                 '}5, labels=[1,2,3,4,5])<br/>
                        rfm['M_score'] = pd.qcut(rfm['Monetary'], <br/>
                        {'                                 '}5, labels=[1,2,3,4,5])<br/>
                        <br/>
                        # 用户分群规则<br/>
                        def segment_user(row):<br/>
                        {'  '}if row['R_score']&gt;=4 and row['F_score']&gt;=4 and row['M_score']&gt;=4:<br/>
                        {'    '}return '重要价值客户'<br/>
                        {'  '}elif row['F_score']&gt;=4 and row['M_score']&gt;=4:<br/>
                        {'    '}return '重要保持客户'<br/>
                        {'  '}# ... 其他规则<br/>
                        <br/>
                        rfm['segment'] = rfm.apply(segment_user, axis=1)
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">👥 8大用户群体策略表</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead className="bg-white dark:bg-gray-700">
                            <tr>
                              <th className="border px-2 py-1">群体</th>
                              <th className="border px-2 py-1">RFM特征</th>
                              <th className="border px-2 py-1">营销策略</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-green-50 dark:bg-green-900/20">
                              <td className="border px-2 py-1 font-semibold">重要价值</td>
                              <td className="border px-2 py-1">555/554</td>
                              <td className="border px-2 py-1">VIP专属服务</td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1 font-semibold">重要保持</td>
                              <td className="border px-2 py-1">R低FM高</td>
                              <td className="border px-2 py-1">召回优惠券</td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1 font-semibold">重要发展</td>
                              <td className="border px-2 py-1">M高RF低</td>
                              <td className="border px-2 py-1">提频活动</td>
                            </tr>
                            <tr className="bg-red-50 dark:bg-red-900/20">
                              <td className="border px-2 py-1 font-semibold">重要挽留</td>
                              <td className="border px-2 py-1">FM高R很低</td>
                              <td className="border px-2 py-1">紧急召回</td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">一般价值</td>
                              <td className="border px-2 py-1">RF中M低</td>
                              <td className="border px-2 py-1">客单价提升</td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">一般发展</td>
                              <td className="border px-2 py-1">R高FM低</td>
                              <td className="border px-2 py-1">忠诚度培养</td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">一般保持</td>
                              <td className="border px-2 py-1">F中R低</td>
                              <td className="border px-2 py-1">激活唤醒</td>
                            </tr>
                            <tr>
                              <td className="border px-2 py-1">流失用户</td>
                              <td className="border px-2 py-1">111/112</td>
                              <td className="border px-2 py-1">停止投放</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <p className="font-semibold mb-3">📈 A/B测试验证营销效果</p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-[10px] mb-2">实验设计</p>
                        <ul className="space-y-1 text-[10px]">
                          <li>• <strong>目标群体：</strong>"重要保持"用户1000人</li>
                          <li>• <strong>实验组：</strong>发放100元优惠券</li>
                          <li>• <strong>对照组：</strong>不发券</li>
                          <li>• <strong>观察期：</strong>30天回购率</li>
                        </ul>
                        <p className="font-semibold text-[10px] mt-3 mb-1">结果数据</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead className="bg-white dark:bg-gray-700">
                              <tr>
                                <th className="border px-2 py-1">组别</th>
                                <th className="border px-2 py-1">人数</th>
                                <th className="border px-2 py-1">回购人数</th>
                                <th className="border px-2 py-1">回购率</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr><td className="border px-2 py-1">对照组</td><td className="border px-2 py-1">1000</td><td className="border px-2 py-1">80</td><td className="border px-2 py-1">8%</td></tr>
                              <tr className="bg-green-50 dark:bg-green-900/20">
                                <td className="border px-2 py-1 font-semibold">实验组</td>
                                <td className="border px-2 py-1">1000</td>
                                <td className="border px-2 py-1">180</td>
                                <td className="border px-2 py-1 font-semibold text-green-600">18%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-green-600 text-[10px] mt-2">✅ 卡方检验：p &lt; 0.001，提升高度显著！</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[10px] mb-2">ROI精算</p>
                        <div className="space-y-1 text-[10px]">
                          <p><strong>💰 成本核算：</strong></p>
                          <div className="ml-3 space-y-0.5">
                            <li>• 优惠券成本：100元 × 1000人 = 10万</li>
                            <li>• 实际使用率：60% → 实际成本6万</li>
                          </div>
                          <p className="mt-2"><strong>📈 收益核算：</strong></p>
                          <div className="ml-3 space-y-0.5">
                            <li>• 回购增量：(18%-8%) × 1000 = 100人</li>
                            <li>• 平均客单价：500元</li>
                            <li>• 利润率：20%</li>
                            <li>• 增量利润：100 × 500 × 20% = 1万</li>
                          </div>
                          <div className="mt-3 p-2 bg-white dark:bg-gray-700 rounded">
                            <p className="font-semibold text-red-600">⚠️ ROI = 1万 / 6万 = 0.17</p>
                            <p className="mt-1"><strong>结论：</strong>ROI&lt;1，亏损。需优化：</p>
                            <ul className="mt-1 space-y-0.5">
                              <li>1. 降低券额度至50元</li>
                              <li>2. 设置满减门槛（满300-50）</li>
                              <li>3. 提升客单价至800+</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 完成提示卡片 */}
            <div className={`mt-16 p-6 rounded-xl text-center border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-[#19bcc8] text-white">
                  <CheckCircle size={32} />
                </div>
                <div className="text-left">
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    统计分析知识体系完成！
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    8大模块 | 60+方法 | 100+代码 | 50+案例
                  </p>
                </div>
              </div>
            </div>

            {/* 下一步学习建议 */}
            <div className={`mt-8 p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-2`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#19bcc8]">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    📚 下一步学习建议
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    掌握统计理论后，建议从以下方向深化实战能力
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Python编程 */}
                <Link href="/python" className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-blue-700 hover:border-blue-500' : 'bg-blue-50 border-blue-200 hover:border-blue-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500 text-white">
                      <BookOpen size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-blue-600 mb-1 group-hover:underline">
                        Python编程 →
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        用Python实现统计分析
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">Pandas</Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">NumPy</Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">Scipy</Badge>
                      </div>
                      <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ 统计方法的Python实现、数据处理、案例实战
                      </p>
                    </div>
                        </div>
                      </Link>

                {/* Excel应用 */}
                <Link href="/excel" className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-green-700 hover:border-green-500' : 'bg-green-50 border-green-200 hover:border-green-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-500 text-white">
                      <Activity size={24} />
                  </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-green-600 mb-1 group-hover:underline">
                        Excel技能 →
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Excel统计分析实战
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-green-100 text-green-700 text-[10px]">统计函数</Badge>
                        <Badge className="bg-green-100 text-green-700 text-[10px]">数据透视</Badge>
                        <Badge className="bg-green-100 text-green-700 text-[10px]">回归分析</Badge>
                </div>
                      <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ Excel统计工具、函数应用、数据分析实战
                      </p>
            </div>
          </div>
                </Link>

                {/* 机器学习 */}
                <Link href="/machine-learning" className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-purple-700 hover:border-purple-500' : 'bg-purple-50 border-purple-200 hover:border-purple-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500 text-white">
                      <Zap size={24} />
        </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-purple-600 mb-1 group-hover:underline">
                        机器学习 →
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        统计学的高级应用
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-purple-100 text-purple-700 text-[10px]">监督学习</Badge>
                        <Badge className="bg-purple-100 text-purple-700 text-[10px]">模型评估</Badge>
                        <Badge className="bg-purple-100 text-purple-700 text-[10px]">特征工程</Badge>
      </div>
                      <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ 从统计分析进阶到机器学习算法
                      </p>
    </div>
                  </div>
                </Link>

                {/* SQL数据库 */}
                <Link href="/sql" className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-orange-700 hover:border-orange-500' : 'bg-orange-50 border-orange-200 hover:border-orange-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-orange-500 text-white">
                      <Target size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-orange-600 mb-1 group-hover:underline">
                        SQL数据库 →
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        在SQL中做统计分析
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-orange-100 text-orange-700 text-[10px]">聚合函数</Badge>
                        <Badge className="bg-orange-100 text-orange-700 text-[10px]">窗口函数</Badge>
                        <Badge className="bg-orange-100 text-orange-700 text-[10px]">分组统计</Badge>
                      </div>
                      <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ SQL统计函数、数据聚合、复杂查询
                      </p>
                    </div>
                  </div>
                </Link>

                {/* 数据可视化 */}
                <Link href="/visualization" className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-pink-700 hover:border-pink-500' : 'bg-pink-50 border-pink-200 hover:border-pink-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-pink-500 text-white">
                      <BarChart3 size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-pink-600 mb-1 group-hover:underline">
                        数据可视化 →
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        让统计结果可视化
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-pink-100 text-pink-700 text-[10px]">图表选择</Badge>
                        <Badge className="bg-pink-100 text-pink-700 text-[10px]">可视化原则</Badge>
                        <Badge className="bg-pink-100 text-pink-700 text-[10px]">实战案例</Badge>
                      </div>
                      <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ 统计图表设计、可视化工具、展示技巧
                      </p>
                    </div>
                  </div>
                </Link>

                {/* 业务知识 */}
                <Link href="/business" className={`group p-5 rounded-xl border-2 transition-all hover:shadow-lg ${theme === 'dark' ? 'bg-gray-900 border-cyan-700 hover:border-cyan-500' : 'bg-cyan-50 border-cyan-200 hover:border-cyan-400'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500 text-white">
                      <TrendingUp size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-cyan-600 mb-1 group-hover:underline">
                        业务知识 →
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        将统计应用到业务场景
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge className="bg-cyan-100 text-cyan-700 text-[10px]">指标体系</Badge>
                        <Badge className="bg-cyan-100 text-cyan-700 text-[10px]">分析模型</Badge>
                        <Badge className="bg-cyan-100 text-cyan-700 text-[10px]">行业案例</Badge>
                      </div>
                      <p className={`text-[10px] mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ 业务指标、分析框架、10+行业实战
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 学习路径建议 */}
              <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <p className="font-semibold text-[#19bcc8] mb-2">💡 推荐学习路径</p>
                <div className="grid md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold mb-1">🔹 入门路径（适合初学者）：</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      统计分析 → Excel技能 → 数据可视化 → 业务知识
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">🔹 进阶路径（适合转型者）：</p>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      统计分析 → Python编程 → SQL数据库 → 机器学习
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#19bcc8] hover:bg-[#17a8b4] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

