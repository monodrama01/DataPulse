"use client"

import React, { useState, useEffect } from 'react'
import { getLucideIcon } from "@/components/LucideIcon";
import { Navigation } from "@/components/navigation"
import { Home, Brain, Lightbulb, Target, TrendingUp, AlertCircle, Zap, CheckCircle, ArrowRight, Activity, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QuadrantChart, ComparisonChart, FunnelChart, PyramidChart, MECETreeChart, CubeChart, ParetoChart, HypothesisChart, IndexChart, UserBehaviorSequenceChart, PathMiningChart } from "./visualizations"

export default function DataThinkingPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('importance')

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      
      // 分组：子元素优先检测
      const childSections = [
        'structured', 'formula', 'business',
        'quadrant', 'comparison', 'funnel', 'multi-dim', 'pareto', 'hypothesis', 'index',
        'user-sequence', 'path-mining'
      ]
      
      const parentSections = [
        'importance',
        'core-thinking',
        'skills',
        'practice',
        'mistakes',
        'advanced-methods'
      ]
      
      let foundSection = null
      
      // 先检测子元素（Card级别）
      for (const sectionId of childSections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 100) {
            foundSection = sectionId
            break
          }
        }
      }
      
      // 如果没找到子元素，再检测父元素（Section级别）
      if (!foundSection) {
        for (const sectionId of parentSections) {
          const element = document.getElementById(sectionId)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 200 && rect.bottom >= 100) {
              foundSection = sectionId
              break
            }
          }
        }
      }
      
      if (foundSection) {
        setActiveSection(foundSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 返回顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* 面包屑导航 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-[#19bcc8] hover:text-[#17a8b4] transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>数据思维</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 整体布局：左侧目录 + 右侧内容 */}
        <div className="flex gap-8">
          {/* 左侧目录导航 */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className={theme === 'dark' ? 'sticky top-24 bg-gray-800/95 border-gray-700 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto' : 'sticky top-24 bg-white/95 border-gray-200 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto'}>
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                {getLucideIcon('📖', 'w-6 h-6 text-[#19bcc8]')}
                <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>目录导航</span>
              </h3>
              <nav className="space-y-1.5">
                {/* 为什么重要 */}
                <a href="#importance" className={
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                  (activeSection === 'importance'
                    ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                    : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  )
                }>
                  {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={'text-sm font-medium ' + (activeSection === 'importance' ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'))}>
                    为什么重要
                  </span>
                </a>

                {/* 三大核心思维 - 带二级导航 */}
                <div className="space-y-1">
                  <a href="#core-thinking" className={
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                    (activeSection === 'core-thinking' || activeSection === 'structured' || activeSection === 'formula' || activeSection === 'business'
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                    )
                  }>
                    {getLucideIcon('🧠', 'w-5 h-5 text-[#19bcc8]')}
                    <span className={'text-sm font-medium ' + ((activeSection === 'core-thinking' || activeSection === 'structured' || activeSection === 'formula' || activeSection === 'business') ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'))}>
                      三大核心思维
                    </span>
                  </a>
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#structured" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'structured' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      结构化思维
                    </a>
                    <a href="#formula" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'formula' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      公式化思维
                    </a>
                    <a href="#business" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'business' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      业务化思维
                    </a>
                  </div>
                </div>

                {/* 七大分析技巧 - 带二级导航 */}
                <div className="space-y-1">
                  <a href="#skills" className={
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                    (['skills', 'quadrant', 'comparison', 'funnel', 'multi-dim', 'pareto', 'hypothesis', 'index'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                    )
                  }>
                    {getLucideIcon('🎯', 'w-5 h-5 text-[#19bcc8]')}
                    <span className={'text-sm font-medium ' + (['skills', 'quadrant', 'comparison', 'funnel', 'multi-dim', 'pareto', 'hypothesis', 'index'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'))}>
                      七大分析技巧
                    </span>
                  </a>
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#quadrant" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'quadrant' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      象限法
                    </a>
                    <a href="#comparison" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'comparison' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      对比法
                    </a>
                    <a href="#funnel" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'funnel' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      漏斗法
                    </a>
                    <a href="#multi-dim" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'multi-dim' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      多维法
                    </a>
                    <a href="#pareto" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'pareto' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      二八法
                    </a>
                    <a href="#hypothesis" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'hypothesis' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      假设驱动法
                    </a>
                    <a href="#index" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'index' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      指数法
                    </a>
                  </div>
                </div>

                {/* 业务场景练习 */}
                <a href="#practice" className={
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                  (activeSection === 'practice'
                    ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                    : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  )
                }>
                  {getLucideIcon('🏃', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={'text-sm font-medium ' + (activeSection === 'practice' ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'))}>
                    业务场景练习
                  </span>
                </a>

                {/* 常见错误 */}
                <a href="#mistakes" className={
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                  (activeSection === 'mistakes'
                    ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                    : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  )
                }>
                  {getLucideIcon('⚠️', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={'text-sm font-medium ' + (activeSection === 'mistakes' ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'))}>
                    常见错误
                  </span>
                </a>

                {/* 高级方法 */}
                <div className="space-y-1">
                  <a href="#advanced-methods" className={
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                    (['advanced-methods', 'user-sequence', 'path-mining'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                    )
                  }>
                    {getLucideIcon('🚀', 'w-5 h-5 text-[#19bcc8]')}
                    <span className={'text-sm font-medium ' + (['advanced-methods', 'user-sequence', 'path-mining'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700'))}>
                      高级方法
                    </span>
                  </a>
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#user-sequence" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'user-sequence' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      用户行为序列
                    </a>
                    <a href="#path-mining" className={'block px-2 py-1.5 rounded text-xs transition-all ' + (activeSection === 'path-mining' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10'))}>
                      路径挖掘
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </aside>

          {/* 右侧主要内容 */}
          <div className="flex-1 min-w-0">
            {/* 页面标题 */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  {getLucideIcon('🧠', 'h-8 w-8 text-white')}
                </div>
              </div>
              <h1 className={'text-4xl font-bold mb-6 ' + (theme === 'dark' ? 'text-gray-100' : 'text-gray-900')}>
                数据分析思维完整知识体系
              </h1>
              <p className={'text-lg max-w-3xl mx-auto ' + (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
                从思维框架到实战方法，从基础技巧到高级分析，掌握数据驱动决策的核心能力
              </p>
            </div>

        {/* 为什么数据思维重要 */}
        <section id="importance" className="mb-20 scroll-mt-24">
          <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-[#19bcc8]/30'} border-2 rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
              {getLucideIcon('🎯', 'w-7 h-7 text-[#19bcc8]')}
              为什么数据思维是核心能力？
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                <div className="text-3xl font-bold text-[#19bcc8] mb-2">80%</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  的数据分析工作是"思考问题"，只有20%是执行技术操作
                </p>
              </div>
              <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                <div className="text-3xl font-bold text-[#19bcc8] mb-2">3倍</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  具备数据思维的分析师，产出结论的业务价值平均高出3倍
                </p>
              </div>
              <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                <div className="text-3xl font-bold text-[#19bcc8] mb-2">通用</div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  数据思维不依赖工具，是可迁移到任何行业的底层能力
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 分隔线 */}
        <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

        {/* 三大核心思维 */}
        <section id="core-thinking" className="mb-20 scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/50'}`}>
                {getLucideIcon('🧠', 'h-12 w-12 text-white')}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                  1
                </div>
              </div>
              <div>
                <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                  SECTION 01 · 核心基础
                </div>
                <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400'}`}>
                  三大核心思维
                </h2>
              </div>
            </div>
            <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-transparent' : 'bg-gradient-to-r from-blue-500 via-blue-300 to-transparent'}`}></div>
            <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              数据思维的三大基石，缺一不可
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 结构化思维 */}
            <Card id="structured" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/30'}`}>
                    {getLucideIcon('🧠', 'h-7 w-7 text-white')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        结构化思维
                      </CardTitle>
                      <Badge className="bg-[#19bcc8]/100 text-white">最核心</Badge>
                    </div>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      问题拆解的基石，用金字塔结构层层分析
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>核心定义</p>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    用金字塔结构层层拆解复杂问题，保证逻辑完整、无遗漏、易沟通
                  </p>
                </div>

                <div>
                  <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>关键方法论</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* MECE原则可视化 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-[#19bcc8] mb-3 text-center">MECE原则</div>
                      <MECETreeChart theme={theme} />
                      <p className={`text-xs mt-2 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        相互独立、完全穷尽 · 避免重叠和遗漏
                      </p>
                    </div>
                    {/* 金字塔原理可视化 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-[#19bcc8] mb-3 text-center">金字塔原理</div>
                      <PyramidChart theme={theme} />
                      <p className={`text-xs mt-2 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        结论先行、以上统下 · 自上而下思考
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <CheckCircle className="h-4 w-4" />
                    实战案例：销量下降分析
                  </p>
                  <div className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p>→ <strong>第一层（时间维度）</strong>：是哪个季度/月份开始下降？</p>
                    <p>→ <strong>第二层（空间维度）</strong>：是哪个地区/渠道下降明显？</p>
                    <p>→ <strong>第三层（用户维度）</strong>：是新客还是老客流失？</p>
                    <p>→ <strong>第四层（竞品维度）</strong>：竞品是否有促销/新品？</p>
                    <p>→ <strong>第五层（政策维度）</strong>：是否有政策/舆论影响？</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <AlertCircle className="h-4 w-4" />
                    典型误区
                  </p>
                  <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>只拆解不验证：拆完就完了，不对照数据检验</li>
                    <li>为拆而拆：拆到无法获取数据的粒度，导致分析停滞</li>
                    <li>忽视逻辑：拆解维度之间有重叠，违反MECE原则</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 公式化思维 */}
            <Card id="formula" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                    {getLucideIcon('💡', 'h-7 w-7 text-white')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        公式化思维
                      </CardTitle>
                      <Badge className="bg-[#19bcc8]/100 text-white">可落地</Badge>
                    </div>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      量化业务的核心，让模糊概念变得可衡量
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>核心定义</p>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    一切商业问题皆可量化，用加减乘除建立业务指标模型，让模糊概念变成可计算、可验证的数据
                  </p>
                </div>

                <div>
                  <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>经典业务公式</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-mono text-[#19bcc8] font-semibold mb-2">销售额 = 流量 × 转化率 × 客单价</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>电商/零售核心公式</p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-mono text-[#19bcc8] font-semibold mb-2">利润 = 销售额 - 固定成本 - 变动成本</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>财务分析基础公式</p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-mono text-[#19bcc8] font-semibold mb-2">用户价值 = LTV - CAC</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>LTV=生命周期价值，CAC=获客成本</p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-mono text-[#19bcc8] font-semibold mb-2">留存率 = 下期活跃用户 / 上期新增用户</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>产品健康度核心指标</p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <CheckCircle className="h-4 w-4" />
                    实战案例：量化"用户忠诚度"
                  </p>
                  <div className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p><strong>模糊问题：</strong>如何评估用户忠诚度？</p>
                    <p><strong>公式化拆解：</strong></p>
                    <p className="font-mono bg-[#19bcc8]/20 dark:bg-[#19bcc8]/20 p-2 rounded">
                      忠诚度指数 = 0.5 × 复购率 + 0.3 × (1/距上次购买天数) + 0.2 × 评价率
                    </p>
                    <p><strong>优势：</strong>从不可衡量的"感觉"，变成可追踪、可优化的数值</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <AlertCircle className="h-4 w-4" />
                    典型误区
                  </p>
                  <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>拆到不可获得的指标：公式很完美，但数据根本拿不到</li>
                    <li>过度复杂化：10个指标相乘，导致单点无法优化</li>
                    <li>权重拍脑袋：没有业务依据随意设定权重</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 业务化思维 */}
            <Card id="business" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 via-green-800/20 to-transparent' : 'bg-gradient-to-r from-green-50 via-green-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/30'}`}>
                    {getLucideIcon('🎯', 'h-7 w-7 text-white')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        业务化思维
                      </CardTitle>
                      <Badge className="bg-[#19bcc8]/100 text-white">最实用</Badge>
                    </div>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      分析落地的关键，让数据洞察产生业务价值
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 px-6 pb-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>核心定义</p>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    让分析结论能落地执行，必须深入理解业务流程、资源限制、执行成本，用业务语言表达数据洞察
                  </p>
                </div>

                <div>
                  <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>四大关键动作</p>
                  <div className="space-y-3">
                    <div className={`p-4 border-l-4 border-[#19bcc8] ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-[#19bcc8] mb-1">1. 业务流程梳理</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        不仅知道数据是什么，更要知道业务流程中哪个环节产生数据、能干预什么
                      </p>
                    </div>
                    <div className={`p-4 border-l-4 border-emerald-500 ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-emerald-600 mb-1">2. 换位思考</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        站在运营/产品/销售角度思考：他们能调动什么资源？执行成本多高？
                      </p>
                    </div>
                    <div className={`p-4 border-l-4 border-teal-500 ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-teal-600 mb-1">3. 现场走访</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        定期去一线（门店/仓库/客服）观察真实业务场景，避免闭门造车
                      </p>
                    </div>
                    <div className={`p-4 border-l-4 border-cyan-500 ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <div className="font-semibold text-cyan-600 mb-1">4. 持续跟进</div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        分析不是终点，要跟进落地效果，形成"分析→执行→复盘→优化"闭环
                      </p>
                    </div>
                  </div>
                  </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <CheckCircle className="h-4 w-4" />
                    实战案例：共享单车投放量预估
                  </p>
                  <div className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p><strong>纯数据思维：</strong>投放量 = 通勤人口 × 转化率 ÷ 日均周转率</p>
                    <p><strong>业务化优化：</strong></p>
                    <p className="font-mono bg-[#19bcc8]/20 dark:bg-[#19bcc8]/20 p-2 rounded">
                      投放量 = (通勤人口 × 转化率 ÷ 周转率) ÷ (1 - 损耗率) × 维修周期系数
                    </p>
                    <p><strong>关键差异：</strong>考虑了单车损耗、维修时长等实际业务限制，否则投放数永远不够</p>
            </div>
          </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    <AlertCircle className="h-4 w-4" />
                    典型误区
                  </p>
                  <ul className={`text-sm space-y-1 list-disc list-inside ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>只分析不跟进：报告交完就完事，不关心是否落地</li>
                    <li>忽略执行成本：建议很完美，但需要100人月才能执行</li>
                    <li>数据黑话满天飞：业务方听不懂P值、置信区间，沟通失败</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 分隔线 */}
        <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

        {/* 七大高频技巧 */}
        <section id="skills" className="mb-20 scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/50'}`}>
                <Target className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                  2
                </div>
              </div>
              <div>
                <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                  SECTION 02 · 实战技巧
                </div>
                <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400'}`}>
                  七大高频分析技巧
                </h2>
              </div>
            </div>
            <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-green-500 via-green-400 to-transparent' : 'bg-gradient-to-r from-green-500 via-green-300 to-transparent'}`}></div>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              掌握这七大技巧，覆盖90%的日常数据分析场景
            </p>
          </div>

          <div className="space-y-8">
            {/* 象限法 - 带可视化 */}
            <Card id="quadrant" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-900/20 via-cyan-800/10 to-transparent' : 'bg-gradient-to-r from-cyan-50/80 via-cyan-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-cyan-500/20' : 'border-cyan-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-cyan-600/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'} font-bold text-lg`}>
                    1
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      象限法
                    </CardTitle>
                    <Badge className="bg-cyan-500 text-white">二维分类神器</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <QuadrantChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        用两个关键维度将对象切分为四类，快速识别优先级
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 应用场景</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>用户分群：</strong>用户价值 × 流失风险 → 高价值高流失重点召回</li>
                        <li>• <strong>产品定位：</strong>市场需求 × 竞争强度 → 找蓝海机会</li>
                        <li>• <strong>任务优先级：</strong>重要性 × 紧急度 → 先做重要且紧急的</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避坑：</strong>维度必须可解释且可干预，否则分析无法落地
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 对比法 - 带可视化 + 深化应用 */}
            <Card id="comparison" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-emerald-900/20 via-emerald-800/10 to-transparent' : 'bg-gradient-to-r from-emerald-50/80 via-emerald-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'} font-bold text-lg`}>
                    2
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      对比法
                    </CardTitle>
                    <Badge className="bg-emerald-500 text-white">无对比不分析</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <ComparisonChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        孤立的数字没有意义，必须通过对比才能发现问题和机会
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 四种对比维度</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>同比：</strong>与去年同期对比（季节性因素）</li>
                        <li>• <strong>环比：</strong>与上一期对比（趋势变化）</li>
                        <li>• <strong>竞品对比：</strong>与行业标杆对比（市场位置）</li>
                        <li>• <strong>目标对比：</strong>实际 vs 预期（达成情况）</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 新增：对比方法深化 */}
                <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-green-700 bg-green-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <Target className="h-5 w-5" />
                    比什么？怎么比？（实战决策树）
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* 比什么 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 比什么？</p>
                      <div className="space-y-3">
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                          <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            绝对值（Absolute）
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            ✓ 本身具备价值：销售金额、10万+阅读<br/>
                            ✗ 不易知内在：100万销售额是好是坏？
                          </p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                          <p className={`font-semibold text-sm mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            比例值（Ratio）
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            ✓ 在环境中看比例：活跃占比、转化率<br/>
                            ✗ 易受极端值影响：2%→4%（翻倍！但基数小）
                          </p>
                        </div>
                      </div>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-[#19bcc8]' : 'bg-[#19bcc8]/10 text-[#17a8b4]'}`}>
                        💡 <strong>最佳实践：</strong>绝对值+比例值同时看
                      </div>
                    </div>

                    {/* 怎么比 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 怎么比？</p>
                      <div className="space-y-2">
                        <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <strong className="text-[#19bcc8]">环比：</strong>7号vs6号，7月vs6月<br/>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>适用：短期连续性数据</span>
                        </div>
                        <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <strong className="text-[#19bcc8]">同比：</strong>今年国庆vs去年国庆<br/>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>适用：消除季节性干扰</span>
                        </div>
                        <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <strong className="text-[#19bcc8]">目标对比：</strong>实际完成度<br/>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>适用：KPI考核、达成评估</span>
                        </div>
                        <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <strong className="text-[#19bcc8]">分组对比：</strong>A/B Test、用户分群<br/>
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>适用：因果推断、策略验证</span>
                        </div>
            </div>
          </div>
        </div>
      </div>

                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                  <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 核心避坑：</strong>必须控制单一变量（除了要对比的维度，其他条件保持一致），否则无法判断因果关系
                </div>
              </CardContent>
            </Card>

            {/* 漏斗法 - 带可视化 + 高级技巧 */}
            <Card id="funnel" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 via-purple-800/10 to-transparent' : 'bg-gradient-to-r from-purple-50/80 via-purple-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-[#19bcc8]/20' : 'border-[#19bcc8]/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-purple-600/20 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#19bcc8]'} font-bold text-lg`}>
                    3
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      漏斗法
                    </CardTitle>
                    <Badge className="bg-[#19bcc8]/100 text-white">转化路径分析</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <FunnelChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        将用户路径拆解为多个环节，定位转化瓶颈在哪一步
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 典型应用场景</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>电商：</strong>浏览→加购→下单→支付→复购</li>
                        <li>• <strong>SaaS：</strong>注册→激活→付费→续费</li>
                        <li>• <strong>内容：</strong>曝光→点击→完读→分享</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 新增：漏斗分析高级技巧 */}
                <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-purple-700 bg-purple-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <Zap className="h-5 w-5" />
                    漏斗分析3大高级技巧（实战必备）
                  </h4>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* 周期选择 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>1️⃣ 周期选择</p>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>按天：</strong>短期活动、影响快（如618大促）</li>
                        <li>• <strong>按周：</strong>决策成本高（如理财产品）</li>
                        <li>• <strong>按月：</strong>决策周期长（如装修、买房）</li>
                      </ul>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'}`}>
                        ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 周期太长→包含无关信息<br/>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 周期太短→丢失有效转化
                      </div>
                    </div>

                    {/* 计数单位 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>2️⃣ 计数单位</p>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>用户维度：</strong>关心整体业务推进<br/>
                          <code className="text-xs">800人→600人→400人</code>
                        </li>
                        <li>• <strong>事件维度：</strong>关心单步转化率<br/>
                          <code className="text-xs">1000次→900次→400次</code>
                        </li>
                      </ul>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-[#19bcc8]' : 'bg-[#19bcc8]/10 text-[#17a8b4]'}`}>
                        ✓ 用户去重看大盘健康<br/>✓ 事件计次看环节优化
                      </div>
                    </div>

                    {/* 路径顺序 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>3️⃣ 路径顺序</p>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>严格顺序：</strong>首页→搜索→详情→支付</li>
                        <li>• <strong>允许跳步：</strong>分类/推荐都可到详情</li>
                        <li>• <strong>必须有序：</strong>不能详情→首页→支付</li>
                      </ul>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-[#19bcc8]' : 'bg-[#19bcc8]/10 text-[#17a8b4]'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 多入口记得合并统计<br/>例：搜索+推荐→详情页
                      </div>
                  </div>
            </div>
          </div>

                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                  <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 实战避坑：</strong>必须结合细分维度对比（渠道/设备/新老客），单一漏斗无法定位根因
                </div>
              </CardContent>
            </Card>

            {/* 多维法 - 带可视化 */}
            <Card id="multi-dim" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/20 via-orange-800/10 to-transparent' : 'bg-gradient-to-r from-orange-50/80 via-orange-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-[#19bcc8]/20' : 'border-orange-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-orange-600/20 text-[#19bcc8]' : 'bg-orange-100 text-[#19bcc8]'} font-bold text-lg`}>
                    4
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      多维法
                    </CardTitle>
                    <Badge className="bg-[#19bcc8]/100 text-white">立方体交叉分析</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <CubeChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        构建数据立方体，支持任意维度组合下钻，发现隐藏规律
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 典型应用场景</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>电商：</strong>品类×时间×地区 → 发现华东区纸质书Q1下滑</li>
                        <li>• <strong>广告：</strong>渠道×人群×素材 → 找最优组合</li>
                        <li>• <strong>门店：</strong>门店×SKU×时段 → 优化库存和排班</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避坑：</strong>警惕辛普森悖论，总体趋势与细分可能相反
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 二八法 - 带可视化 */}
            <Card id="pareto" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-red-900/20 via-red-800/10 to-transparent' : 'bg-gradient-to-r from-red-50/80 via-red-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-red-500/20' : 'border-red-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'} font-bold text-lg`}>
                    5
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      二八法
                    </CardTitle>
                    <Badge className="bg-red-500 text-white">抓住关键少数</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <ParetoChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        20%的变量产生80%的效果，聚焦高价值要素
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 应用场景</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>KPI设定：</strong>找影响最大的3-5个指标，聚焦资源</li>
                        <li>• <strong>资源投放：</strong>Top20% SKU贡献80%销售额</li>
                        <li>• <strong>问题定位：</strong>80%客诉集中在20%功能</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避坑：</strong>剩余20%可能是长尾增量，不要完全忽略
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 假设法 - 带可视化 */}
            <Card id="hypothesis" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/20 via-indigo-800/10 to-transparent' : 'bg-gradient-to-r from-indigo-50/80 via-indigo-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-[#19bcc8]/20' : 'border-indigo-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-indigo-600/20 text-[#19bcc8]' : 'bg-indigo-100 text-[#19bcc8]'} font-bold text-lg`}>
                    6
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      假设法
                    </CardTitle>
                    <Badge className="bg-[#19bcc8]/100 text-white">无数据时的推算</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <HypothesisChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        没有直接数据时，通过合理假设+间接数据反推
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 应用场景</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>市场容量：</strong>假设渗透率5% → 反推市场规模</li>
                        <li>• <strong>活动效果：</strong>假设评论率5% → 反推订单量</li>
                        <li>• <strong>竞品分析：</strong>假设坪效1万/㎡ → 估算营收</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避坑：</strong>假设要基于行业基准，不能拍脑袋
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 指数法 - 带可视化 */}
            <Card id="index" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-3 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-900/20 via-pink-800/10 to-transparent' : 'bg-gradient-to-r from-pink-50/80 via-pink-100/40 to-transparent'} border-b ${theme === 'dark' ? 'border-[#19bcc8]/20' : 'border-pink-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-pink-600/20 text-[#19bcc8]' : 'bg-pink-100 text-[#19bcc8]'} font-bold text-lg`}>
                    7
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <CardTitle className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      指数法
                    </CardTitle>
                    <Badge className="bg-[#19bcc8]/100 text-white">复杂指标合成</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                      <IndexChart theme={theme} />
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                        将多个指标按权重合成一个综合指数，便于排序与追踪
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <p className={`font-semibold mb-3 text-base ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 应用场景</p>
                      <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• <strong>用户热度：</strong>0.5×ln(UV) + 0.3×ln(评论) + 0.2×时间衰减</li>
                        <li>• <strong>员工绩效：</strong>0.4×业绩 + 0.3×满意度 + 0.3×协作</li>
                        <li>• <strong>内容质量：</strong>0.4×完读率 + 0.3×互动率 + 0.3×分享率</li>
                      </ul>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400 border border-yellow-700/30' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                      <strong>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 避坑：</strong>权重设定要透明可复盘，避免黑箱
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 分隔线 */}
        <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

        {/* 业务场景刻意练习 */}
        <section id="practice" className="mb-20 scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/50'}`}>
                <Zap className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                  3
                </div>
              </div>
              <div>
                <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                  SECTION 03 · 实战练习
                </div>
                <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400'}`}>
                  业务场景刻意练习
                </h2>
              </div>
            </div>
            <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 via-purple-400 to-transparent' : 'bg-gradient-to-r from-purple-500 via-purple-300 to-transparent'}`}></div>
            <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              数据思维不是靠背概念，而是在真实场景中刻意练习。以下5个日常场景帮你随时锻炼：
            </p>
          </div>

          <div className="space-y-6">
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  <Zap className="h-6 w-6 text-yellow-500" />
                  练习1：超市排队
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-4 gap-6 items-start">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 锻炼目标
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      公式化 + 业务化思维
                    </p>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <p className={`text-base font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 任务：估算超市日营业额</p>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-mono text-sm mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                          日营业额 = 客单价 × 收银台数 × 单台时效 × 营业时长 × 高峰系数
                        </p>
                        <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• 观察3-5个购物车，估平均客单价</li>
                          <li>• 数收银台数，观察单台结账耗时</li>
                          <li>• 考虑早晚高峰与平峰差异</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 text-[#19bcc8] border border-green-700/30' : 'bg-[#19bcc8]/10 text-[#17a8b4] border border-[#19bcc8]/30'}`}>
                      <strong>✓ 验收：</strong>误差 &lt; 30%（可通过招聘信息验证）
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  <Zap className="h-6 w-6 text-[#19bcc8]" />
                  练习2：共享单车
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-4 gap-6 items-start">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 锻炼目标
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      结构化 + 公式化 + 业务化（全流程）
                    </p>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <p className={`text-base font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 任务：估算地铁站投放量</p>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`font-mono text-sm mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                          投放量 = (通勤人口 × 转化率 ÷ 周转率) ÷ (1 - 损耗率) × 维修周期系数
                        </p>
                        <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• 观察早高峰客流量</li>
                          <li>• 估计骑行转化率（5-15%）</li>
                          <li>• <strong>关键：</strong>考虑损耗率、维修时长</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 text-[#19bcc8] border border-green-700/30' : 'bg-[#19bcc8]/10 text-[#17a8b4] border border-[#19bcc8]/30'}`}>
                      <strong>✓ 验收：</strong>与公开数据误差 &lt; 50%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  <Zap className="h-6 w-6 text-[#19bcc8]" />
                  练习3：电梯广告
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-4 gap-6 items-start">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700/30' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 锻炼目标
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      假设法 + 业务化思维
                    </p>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <p className={`text-base font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 任务：广告换品牌ROI分析</p>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• 假设每天曝光人数（观察电梯使用频次）</li>
                          <li>• 假设品牌记忆率（行业基准1-3%）</li>
                          <li>• 反推需要的转化提升才能覆盖成本</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 text-[#19bcc8] border border-green-700/30' : 'bg-[#19bcc8]/10 text-[#17a8b4] border border-[#19bcc8]/30'}`}>
                      <strong>✓ 验收：</strong>能说出3条以上影响变量
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  <Zap className="h-6 w-6 text-[#19bcc8]" />
                  练习4：夜市摊位
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-4 gap-6 items-start">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700/30' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 锻炼目标
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      象限法
                    </p>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <p className={`text-base font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 任务：用象限法给摊位打分</p>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• <strong>X轴：</strong>美味度（观察复购队伍长度）</li>
                          <li>• <strong>Y轴：</strong>等待时间（观察出餐速度）</li>
                          <li>• 高美味+低等待=最优；高美味+高等待=适合做外卖</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 text-[#19bcc8] border border-green-700/30' : 'bg-[#19bcc8]/10 text-[#17a8b4] border border-[#19bcc8]/30'}`}>
                      <strong>✓ 验收：</strong>能指出哪家最该做外卖/扩店
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-xl flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  <Zap className="h-6 w-6 text-red-500" />
                  练习5：重写旧报告（高阶）
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid md:grid-cols-4 gap-6 items-start">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700/30' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 锻炼目标
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      三大核心思维全流程应用
                    </p>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <p className={`text-base font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 任务：找一份3个月前的分析报告，用三大思维重写</p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>结构化检查</p>
                          <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>• 拆解逻辑是否MECE？</li>
                            <li>• 是否遗漏关键维度？</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>公式化检查</p>
                          <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>• 模糊指标是否量化？</li>
                            <li>• 公式是否可验证？</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>业务化检查</p>
                          <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>• 结论能否落地执行？</li>
                            <li>• 是否跟进了效果？</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 text-[#19bcc8] border border-green-700/30' : 'bg-[#19bcc8]/10 text-[#17a8b4] border border-[#19bcc8]/30'}`}>
                      <strong>✓ 验收：</strong>业务方愿意采纳 ≥ 1条新建议
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 分隔线 */}
        <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

        {/* 常见错误与避坑指南 */}
        <section id="mistakes" className="mb-20 scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50' : 'bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/50'}`}>
                <AlertCircle className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                  4
                </div>
              </div>
              <div>
                <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  SECTION 04 · 避坑指南
                </div>
                <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400'}`}>
                  常见错误与避坑指南
                </h2>
              </div>
            </div>
            <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-red-500 via-red-400 to-transparent' : 'bg-gradient-to-r from-red-500 via-red-300 to-transparent'}`}></div>
            <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              学会识别和避免这些典型错误，让你的分析更专业
            </p>
                        </div>

          <div className="space-y-6">
            {[
              {
                error: "只给数字不给结论",
                root: "缺乏结构化思维，不知道如何从数据提炼洞察",
                fix: "用「所以→因为→证据」三句话模板",
                before: "本月销售额100万",
                after: "所以本月达成目标，因为新客增长30%，证据是渠道A带来5000新客"
              },
              {
                error: "报告100页无人看",
                root: "缺乏业务化思维，堆砌数据但不解决问题",
                fix: "每页底部必须加「业务方可执行动作」",
                before: "华东区销量下降15%（然后没了）",
                after: "华东区销量下降15% → 建议：立即启动华东区促销，预算50万，预期挽回8%"
              },
              {
                error: "维度拆太细拿不到数据",
                root: "公式化过度，忽视数据可获得性",
                fix: "拆解前先用「数据可获得性」过滤",
                before: "拆到「25-28岁、本科、月收入8-10k、iOS用户」（数据根本没有）",
                after: "拆到「25-35岁、一二线城市、iOS用户」（有数据且有业务价值）"
              },
              {
                error: "辛普森悖论导致反向结论",
                root: "只看总体不看细分，忽视多维法",
                fix: "任何总体结论必须下钻2层验证",
                before: "总体转化率提升了",
                after: "总体转化率提升，但拆分后发现高价值用户转化率下降（更危险！）"
              },
              {
                error: "活动效果说不清",
                root: "缺对比法和假设法",
                fix: "用「活动前中后」对比 + 「假设自然增长率」反推增量",
                before: "活动期销售额200万（无法判断好坏）",
                after: "活动期200万 vs 上期150万，假设自然增长10%，则真实增量 = 200 - 150×1.1 = 35万"
              }
            ].map((item, idx) => (
              <Card key={idx} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                        {idx + 1}
                  </div>
                </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className={`text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          {item.error}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          <strong>根源：</strong>{item.root}
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                        <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          纠正方法
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.fix}
                        </p>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>❌ 错误示例</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.before}</p>
                          </div>
                          <div>
                            <p className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 正确示例</p>
                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.after}</p>
            </div>
          </div>
        </div>
      </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 分隔线 */}
        <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

        {/* 新增：高级分析方法 */}
        <section id="advanced-methods" className="mb-20 scroll-mt-24">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/50' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/50'}`}>
                <TrendingUp className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                  5
                </div>
              </div>
              <div>
                <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                  SECTION 05 · 进阶必学
                </div>
                <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400'}`}>
                  高级分析方法
                </h2>
              </div>
            </div>
            <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-orange-500 via-orange-400 to-transparent' : 'bg-gradient-to-r from-orange-500 via-orange-300 to-transparent'}`}></div>
            <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              从数据中挖掘深层洞察，这两个方法是资深分析师的必备技能
            </p>
          </div>

          <div className="space-y-8">
            {/* 用户行为序列分析 */}
            <Card id="user-sequence" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/30 via-indigo-800/20 to-transparent' : 'bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-indigo-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-400/30'}`}>
                    {getLucideIcon('📊', 'h-7 w-7 text-white')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        用户行为序列分析
                      </CardTitle>
                      <Badge className="bg-[#19bcc8]/100 text-white">还原真实场景</Badge>
                    </div>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      User Behavior Sequence - 时间序列还原用户真实操作路径
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700/30' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                  <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-indigo-700'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                    将单一用户的所有行为按时间线排列，观察掩盖在统计信息下更细致的使用场景
                  </p>
                </div>

                {/* 可视化图表 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <UserBehaviorSequenceChart theme={theme} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 方法1 */}
                  <div className={`p-5 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          结合用户画像，推想使用环境局限
                        </p>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>案例：</strong>音乐播放电台产品
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            • 观察到用户在23:00-7:00频繁切换"单曲循环"<br/>
                            • 推测：<strong>睡眠场景</strong>，需要助眠功能<br/>
                            • 行动：设计"睡眠模式"，定时关闭<br/>
                            • ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 但要注意缓存过多的版权风险
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 方法2 */}
                  <div className={`p-5 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          观察序列，将新设计套入验证
                        </p>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <strong>案例：</strong>旅游保险产品入口设计
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            • 观察用户下单流程：搜索→选择→填写信息→支付<br/>
                            • 发现：<strong>"填写信息"页面停留时间最长</strong><br/>
                            • 策略：在该页面植入保险推荐卡片<br/>
                            • 工具：APPSEE、Inspectlet屏幕录像
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <CheckCircle className="h-4 w-4" />
                    实战价值
                  </p>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• 发现用户真实使用场景（不是设计者想象的场景）</li>
                    <li>• 识别用户痛点（哪里卡住、哪里反复操作）</li>
                    <li>• 验证新功能价值（套入真实路径看是否顺畅）</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 路径挖掘分析 */}
            <Card id="path-mining" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} scroll-mt-24 shadow-lg`}>
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-teal-900/30 via-teal-800/20 to-transparent' : 'bg-gradient-to-r from-teal-50 via-teal-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-teal-500/30' : 'border-teal-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30' : 'bg-gradient-to-br from-teal-400 to-teal-500 shadow-lg shadow-teal-400/30'}`}>
                    {getLucideIcon('📈', 'h-7 w-7 text-white')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>
                        路径挖掘分析
                      </CardTitle>
                      <Badge className="bg-teal-500 text-white">逐级展开流向</Badge>
                    </div>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Path Mining - 从起点/终点出发挖掘用户流向
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-6">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-900/20 border border-teal-700/30' : 'bg-teal-50 border border-teal-200'}`}>
                  <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong className={theme === 'dark' ? 'text-teal-400' : 'text-teal-700'}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：</strong>
                    逐级展开某一事件的前一级（后一级）事件，观察其流向分布
                  </p>
                </div>

                {/* 可视化图表 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                  <PathMiningChart theme={theme} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* 正向路径 */}
                  <div className={`p-5 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="mb-3">
                      <Badge className="bg-[#19bcc8]/100 text-white mb-2">正向挖掘</Badge>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        有明确起始场景
                      </p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>案例：</strong>H5活动页效果追踪
                      </p>
                      <div className={`p-2 rounded mb-2 ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                        <p className={`text-xs font-mono ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          H5活动页 → 73% 注册<br/>
                          　　　　　→ 15% 浏览商品<br/>
                          　　　　　→ 12% 直接退出
                        </p>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>洞察：</strong>渠道A带来的用户73%注册，效果最好
                      </p>
                    </div>
                  </div>

                  {/* 反向路径 */}
                  <div className={`p-5 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="mb-3">
                      <Badge className="bg-[#19bcc8]/100 text-white mb-2">反向挖掘</Badge>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        有明确结果目标
                      </p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>案例：</strong>在线职业培训注册来源
                      </p>
                      <div className={`p-2 rounded mb-2 ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                        <p className={`text-xs font-mono ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          注册完成 ← 65% 开始注册<br/>
                          　　　　　← 50% 登录页<br/>
                          　　　　　← 35% 免费公开课
                        </p>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>洞察：</strong>大部分用户被免费公开课吸引注册
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <p className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <CheckCircle className="h-4 w-4" />
                    何时使用路径挖掘？
                  </p>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>• <strong>正向：</strong>评估某个活动/功能的后续影响力（H5活动后用户去哪了？）</li>
                    <li>• <strong>反向：</strong>找高价值行为的来源渠道（付费用户从哪来？）</li>
                    <li>• <strong>组合：</strong>识别关键节点（哪些页面是流量枢纽？）</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 分隔线 */}
        <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

        {/* 总结卡片 */}
        <section className="mb-12">
          <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-[#19bcc8]/30'} border-2 shadow-xl`}>
            <CardContent className="pt-10 pb-10 px-8">
              <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                数据思维的本质
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {getLucideIcon('🧠', 'w-12 h-12 text-[#19bcc8]')}
                  </div>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>结构化思考</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    让复杂问题变得清晰可解
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {getLucideIcon('📐', 'w-12 h-12 text-[#19bcc8]')}
                  </div>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>量化驱动</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    让模糊概念变得可衡量可优化
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {getLucideIcon('🎯', 'w-12 h-12 text-[#19bcc8]')}
                  </div>
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>业务落地</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    让数据洞察变成业务价值
                  </p>
                </div>
              </div>
              <div className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} text-center`}>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>记住：</strong>数据思维不是天赋，而是通过<span className="text-[#19bcc8] font-semibold">刻意练习</span>养成的习惯。
                  <br/>从今天的超市排队开始，每天练习一个场景，3个月后你会发现质的飞跃！
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

          </div>
          {/* 右侧内容结束 */}
        </div>
        {/* Flex布局结束 */}
      </div>

      {/* 返回顶部按钮 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 bg-[#19bcc8] hover:bg-[#17a8b4] text-white"
          aria-label="返回顶部"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

