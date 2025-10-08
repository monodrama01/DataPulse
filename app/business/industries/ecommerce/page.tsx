"use client"

import React, { useState, useEffect } from 'react'
import { getLucideIcon } from "@/components/LucideIcon";
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, ShoppingCart, Target, Users, Package, DollarSign, 
  TrendingUp, Zap, CheckCircle, ChevronUp, AlertCircle, 
  Activity, BarChart3, LineChart, PieChart, ShoppingBag, 
  RefreshCcw, Gift, ArrowRight, Layers, Rocket, BookOpen
} from "lucide-react"
import Link from "next/link"
import { 
  ConversionFunnelChart, 
  RFMSegmentChart, 
  GMVGrowthChart, 
  UserLifecycleChart,
  ProductABCChart,
  LearningPathChart
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function EcommercePage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <Link href="/business" className="text-blue-600 hover:text-blue-700 transition-colors">
                <span className="font-medium">业务知识</span>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>电商数据分析</span>
            </div>
            
            {/* 行业切换入口 */}
            <IndustryDropdown theme={theme} currentIndustry="ecommerce" />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 整体布局：左侧目录 + 右侧内容 */}
        <div className="flex gap-8">
          {/* 左侧目录 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                📖 页面导航
              </h3>
              <nav className="space-y-2">
                <a href="#overview" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-blue-900/30 text-blue-400 hover:text-blue-300' : 'hover:bg-blue-50 text-blue-600 hover:text-blue-700'}`}>
                  <span>💡</span>
                  <span>行业概览</span>
                </a>
                <div className="space-y-1">
                  <a href="#metrics" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30 text-purple-400 hover:text-purple-300' : 'hover:bg-purple-50 text-purple-600 hover:text-purple-700'}`}>
                    <span>📊</span>
                    <span>核心指标体系</span>
                  </a>
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#transaction-metrics" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/20' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}>
                      交易类指标
                    </a>
                    <a href="#user-metrics" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/20' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}>
                      用户类指标
                    </a>
                    <a href="#product-metrics" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/20' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}>
                      商品类指标
                    </a>
                    <a href="#operation-metrics" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-purple-300 hover:bg-purple-900/20' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}>
                      运营类指标
                    </a>
                  </div>
                </div>

                <a href="#flow" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-green-900/30 text-green-400 hover:text-green-300' : 'hover:bg-green-50 text-green-600 hover:text-green-700'}`}>
                  <span>🔄</span>
                  <span>业务流程与埋点</span>
                </a>

                <div className="space-y-1">
                  <a href="#scenarios" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-orange-900/30 text-orange-400 hover:text-orange-300' : 'hover:bg-orange-50 text-orange-600 hover:text-orange-700'}`}>
                    <span>🎯</span>
                    <span>典型分析场景</span>
                  </a>
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#scenario-funnel" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-orange-300 hover:bg-orange-900/20' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
                      转化漏斗分析
                    </a>
                    <a href="#scenario-user" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-orange-300 hover:bg-orange-900/20' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
                      用户价值分析
                    </a>
                    <a href="#scenario-product" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-orange-300 hover:bg-orange-900/20' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
                      商品运营分析
                    </a>
                    <a href="#scenario-marketing" className={`block px-2 py-1.5 rounded text-xs transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-orange-300 hover:bg-orange-900/20' : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}>
                      营销活动分析
                    </a>
                  </div>
                </div>

                <a href="#pitfalls" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300' : 'hover:bg-red-50 text-red-600 hover:text-red-700'}`}>
                  <span>⚠️</span>
                  <span>行业避坑指南</span>
                </a>

                {/* 学习路径规划 */}
                <a href="#learning-path" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-indigo-900/30 text-indigo-400 hover:text-indigo-300' : 'hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700'}`}>
                  <span>🚀</span>
                  <span>学习路径规划</span>
                </a>

                {/* 核心公式速查表 */}
                <a href="#formula-reference" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30 text-purple-400 hover:text-purple-300' : 'hover:bg-purple-50 text-purple-600 hover:text-purple-700'}`}>
                  <span>📖</span>
                  <span>核心公式速查表</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* 右侧主要内容 */}
          <div className="flex-1 min-w-0">
            {/* 页面标题 - 优化版 */}
            <div className="mb-16 relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute inset-0 opacity-10">
                <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
                <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'}`}></div>
              </div>

              {/* 主标题区域 */}
              <div className="relative">
                {/* 顶部装饰线 */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-1 w-20 rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}></div>
                  <span className={`text-sm font-bold tracking-wider ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    INDUSTRY ANALYSIS
                  </span>
                  <div className={`h-1 flex-1 rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-transparent' : 'bg-gradient-to-r from-purple-400 to-transparent'}`}></div>
                </div>

                {/* 主标题 */}
                <div className="flex items-center gap-6 mb-6">
                  {/* 图标 */}
                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400'}`}></div>
                    <div className={`relative p-6 rounded-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400'} shadow-2xl transform group-hover:scale-110 transition-all duration-500`}>
                      <ShoppingCart className="h-14 w-14 text-white animate-pulse" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>

                  {/* 标题文字 */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-3">
                      <h1 className={`text-6xl font-black tracking-tight ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'} drop-shadow-lg`}>
                        电商数据分析
                      </h1>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                          HOT
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                          实战
                        </span>
                      </div>
                    </div>

                    {/* 英文副标题 */}
                    <div className={`text-lg font-semibold tracking-wider mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      E-COMMERCE DATA ANALYTICS
                    </div>

                    {/* 描述文字 */}
                    <p className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                      从<span className="text-green-500 font-bold">GMV</span>到<span className="text-blue-500 font-bold">用户价值</span>，
                      从<span className="text-purple-500 font-bold">转化漏斗</span>到<span className="text-orange-500 font-bold">营销ROI</span>
                      <br/>
                      <span className="text-base">构建完整的电商数据分析能力体系</span>
                    </p>
                  </div>
                </div>

                {/* 数据统计卡片 */}
                <div className="grid grid-cols-4 gap-4 mt-8">
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30' : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl font-black ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>5</span>
                      <BarChart3 className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      可视化图表
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700/30' : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl font-black ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>6</span>
                      <Activity className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      SQL示例
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700/30' : 'bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl font-black ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>3</span>
                      <Target className={`h-6 w-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      真实案例
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-700/30' : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-3xl font-black ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>6</span>
                      <PieChart className={`h-6 w-6 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      行业对比
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 行业概览 */}
            <section id="overview" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  <Target className="h-8 w-8" />
                  电商行业数据分析全景图
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-blue-500 mb-2">4大维度</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      交易、用户、商品、运营，构成电商分析的核心框架
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-purple-500 mb-2">5步转化</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      访问→浏览→加购→下单→支付，每一步都是优化机会
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-green-500 mb-2">3类场景</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      日常监控、专题分析、活动复盘，覆盖电商全周期
                    </p>
                  </div>
                </div>
                <p className={`text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>核心思想：</strong>电商数据分析围绕"人-货-场"的匹配效率展开，通过数据洞察提升交易转化和用户价值。
                </p>
              </div>
            </section>

            {/* 核心指标体系 */}
            <section id="metrics" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/50'}`}>
                    <BarChart3 className="h-12 w-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                      1
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                      SECTION 01 · 核心指标
                    </div>
                    <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400'}`}>
                      核心指标体系
                    </h2>
                  </div>
                </div>
                <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 via-purple-400 to-transparent' : 'bg-gradient-to-r from-purple-500 via-purple-300 to-transparent'}`}></div>
                <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  电商数据分析的基石，理解这些指标才能有效驱动业务增长
                </p>
              </div>

              {/* 交易类指标 */}
              <Card id="transaction-metrics" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/30'}`}>
                      <DollarSign className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                        交易类指标
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        衡量平台营收能力和交易效率
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart className="h-5 w-5 text-blue-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>GMV (Gross Merchandise Volume)</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        一定时间内成交总额，核心营收指标
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart className="h-5 w-5 text-green-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>订单量</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        一定时间内支付成功的订单总数
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>客单价 (Average Order Value, AOV)</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = GMV / 订单量，反映用户购买能力
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCcw className="h-5 w-5 text-orange-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>退款率</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 退款订单量 / 总订单量，衡量商品/服务质量
                      </p>
                    </div>
                  </div>
                  <div className={`mt-6 p-5 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-50'} border-l-4 border-blue-500`}>
                    <h4 className={`text-base font-bold mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} GMV增长公式
                    </h4>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      GMV = 访问用户数 × 转化率 × 客单价
                      <br/>
                      任何GMV的波动，都可以从这三个核心因子进行拆解分析。
                    </p>
                    <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                      <GMVGrowthChart theme={theme} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 用户类指标 */}
              <Card id="user-metrics" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 via-green-800/20 to-transparent' : 'bg-gradient-to-r from-green-50 via-green-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/30'}`}>
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                        用户类指标
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        衡量用户规模、质量和忠诚度
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart className="h-5 w-5 text-blue-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>LTV (Life Time Value)</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        用户生命周期总价值，衡量长期收益
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCcw className="h-5 w-5 text-green-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>复购率</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 复购用户数 / 总购买用户数，衡量用户忠诚度
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>购买用户数</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        一定时间内产生购买行为的用户数
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-orange-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>人均购买次数</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 总订单量 / 购买用户数，反映用户活跃度
                      </p>
                    </div>
                  </div>
                  <div className={`mt-6 p-5 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-50'} border-l-4 border-green-500`}>
                    <h4 className={`text-base font-bold mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} RFM模型与用户生命周期
                    </h4>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      通过R(Recency-最近购买时间)、F(Frequency-购买频率)、M(Monetary-购买金额)对用户进行分层，实现精细化运营。
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <RFMSegmentChart theme={theme} />
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <UserLifecycleChart theme={theme} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 商品类指标 */}
              <Card id="product-metrics" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-transparent' : 'bg-gradient-to-r from-orange-50 via-orange-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/30'}`}>
                      <Package className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                        商品类指标
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        衡量商品健康度、销售表现和库存效率
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart className="h-5 w-5 text-blue-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>销量</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        商品销售数量，最直接的销售表现
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-green-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>动销率</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 有销量商品数 / 总商品数，衡量商品活跃度
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCcw className="h-5 w-5 text-purple-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>库存周转率</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 销售成本 / 平均库存，越高说明库存效率越好
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>滞销商品</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        30天/60天无销量的SKU，需清仓或下架
                      </p>
                    </div>
                  </div>
                  
                  {/* ABC分类可视化 */}
                  <div className={`mt-6 p-5 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-50'} border-l-4 border-orange-500`}>
                    <h4 className={`text-base font-bold mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 商品ABC分类管理
                    </h4>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      基于帕累托法则(80/20原则)，将商品分为A、B、C三类，差异化管理提升效率
                    </p>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                      <ProductABCChart theme={theme} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 运营类指标 */}
              <Card id="operation-metrics" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                      <Zap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                        运营类指标
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        流量、转化、活动效果 - 运营效率的体现
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>UV/PV</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        访问用户数/页面浏览量，流量规模的基础指标
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>转化率</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 下单人数 / 访问人数，核心效率指标
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="h-5 w-5 text-purple-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>加购率</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = 加购人数 / 访问人数，购买意向的体现
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-orange-500" />
                        <h4 className={`font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>活动ROI</h4>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        = (活动GMV - 成本) / 成本，评估活动效果
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 分隔线 */}
            <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* 业务流程与埋点 */}
            <section id="flow" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/50'}`}>
                    <Activity className="h-12 w-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                      2
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      SECTION 02 · 业务流程
                    </div>
                    <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400'}`}>
                      业务流程与数据埋点
                    </h2>
                  </div>
                </div>
                <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-green-500 via-green-400 to-transparent' : 'bg-gradient-to-r from-green-500 via-green-300 to-transparent'}`}></div>
                <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  理解电商核心流程，构建完善的数据采集体系
                </p>
              </div>

              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'} border-2 rounded-xl p-8 shadow-lg mb-8`}>
                <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                  电商5步转化漏斗
                </h3>
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { step: 1, name: '访问', icon: <Users className="h-6 w-6" />, desc: 'UV/PV', color: 'blue' },
                    { step: 2, name: '浏览', icon: <Package className="h-6 w-6" />, desc: '商品详情页PV', color: 'purple' },
                    { step: 3, name: '加购', icon: <ShoppingBag className="h-6 w-6" />, desc: '加购用户数', color: 'orange' },
                    { step: 4, name: '下单', icon: <ShoppingCart className="h-6 w-6" />, desc: '下单用户数', color: 'pink' },
                    { step: 5, name: '支付', icon: <DollarSign className="h-6 w-6" />, desc: '支付成功订单', color: 'green' }
                  ].map((item) => (
                    <div key={item.step} className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} rounded-lg p-4 text-center`}>
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-${item.color}-500`}>
                        {item.icon}
                      </div>
                      <div className="font-bold text-lg mb-1">{item.step}. {item.name}</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                  <h4 className="font-bold mb-2">📌 埋点关键原则</h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>✅ <strong>全面性</strong>：覆盖所有关键业务节点</li>
                    <li>✅ <strong>准确性</strong>：去除重复点击、异常数据</li>
                    <li>✅ <strong>可追溯</strong>：保留用户行为路径完整信息</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 分隔线 */}
            <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* 典型分析场景 */}
            <section id="scenarios" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/50' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/50'}`}>
                    <Target className="h-12 w-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                      3
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                      SECTION 03 · 实战场景
                    </div>
                    <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400'}`}>
                      典型分析场景
                    </h2>
                  </div>
                </div>
                <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-orange-500 via-orange-400 to-transparent' : 'bg-gradient-to-r from-orange-500 via-orange-300 to-transparent'}`}></div>
                <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  从日常分析到专题研究，掌握电商数据分析的核心方法论
                </p>
              </div>

              {/* 场景1: 转化漏斗分析 */}
              <Card id="scenario-funnel" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200'}`}>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    场景一：转化漏斗分析
                  </CardTitle>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    诊断流量流失，优化转化路径
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* 转化漏斗可视化 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                      <ConversionFunnelChart theme={theme} />
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">分析步骤</h4>
                      <ol className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>1️⃣ 计算各环节转化率（访问→浏览、浏览→加购、加购→下单、下单→支付）</li>
                        <li>2️⃣ 对比行业基准，定位流失严重环节</li>
                        <li>3️⃣ 按渠道、设备、商品类别细分，找出差异</li>
                        <li>4️⃣ 结合用户反馈、页面热力图，定位具体问题</li>
                      </ol>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-50 border border-blue-200'}`}>
                      <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战案例</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某母婴电商发现"加购→下单"转化率仅8%（行业平均15%）。通过细分分析发现，移动端转化率仅5%，而PC端达20%。进一步排查发现移动端结算页面需要填写7项信息，优化为3项后，转化率提升至13%，带来GMV增长45%。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 场景2: 用户价值分析 */}
              <Card id="scenario-user" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'}`}>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    场景二：用户价值分析（RFM模型）
                  </CardTitle>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    精细化用户分层，实现精准运营
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">RFM 8象限分层</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { name: '重要价值', rfm: 'R高F高M高', action: 'VIP专属权益', color: 'green' },
                          { name: '重要保持', rfm: 'R高F低M高', action: '唤醒+优惠', color: 'blue' },
                          { name: '重要发展', rfm: 'R高F高M低', action: '提升客单价', color: 'purple' },
                          { name: '重要挽留', rfm: 'R低F高M高', action: '流失预警', color: 'orange' },
                          { name: '一般价值', rfm: 'R高F低M低', action: '转化培养', color: 'cyan' },
                          { name: '一般保持', rfm: 'R低F高M低', action: '促活留存', color: 'teal' },
                          { name: '一般发展', rfm: 'R低F低M高', action: '唤醒召回', color: 'indigo' },
                          { name: '一般挽留', rfm: 'R低F低M低', action: '放弃或最后一搏', color: 'gray' }
                        ].map((segment) => (
                          <div key={segment.name} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                            <div className={`text-${segment.color}-500 font-bold text-sm mb-1`}>{segment.name}</div>
                            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{segment.rfm}</div>
                            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>→ {segment.action}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">📝 SQL示例：计算RFM</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
{`SELECT 
  user_id,
  DATEDIFF(CURRENT_DATE, MAX(order_date)) AS R_days,
  COUNT(DISTINCT order_id) AS F_frequency,
  SUM(order_amount) AS M_monetary,
  CASE 
    WHEN R_days <= 30 
      AND F_frequency >= 3 
      AND M_monetary >= 1000 
    THEN '重要价值'
    WHEN R_days <= 30 
      AND F_frequency < 3 
      AND M_monetary >= 1000 
    THEN '重要保持'
    -- ...其他分层逻辑
  END AS user_segment
FROM orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
  AND order_status = '已完成'
GROUP BY user_id;`}
                        </pre>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Python示例：RFM分层+可视化</h4>
                        <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
{`import pandas as pd
import numpy as np

# 计算RFM
df_rfm = df.groupby('user_id').agg({
    'order_date': lambda x: (pd.Timestamp.now() - x.max()).days,
    'order_id': 'count',
    'order_amount': 'sum'
}).rename(columns={
    'order_date': 'R',
    'order_id': 'F',
    'order_amount': 'M'
})

# 分位数分层(四分位)
df_rfm['R_score'] = pd.qcut(df_rfm['R'], q=4, labels=[4,3,2,1])
df_rfm['F_score'] = pd.qcut(df_rfm['F'], q=4, labels=[1,2,3,4])
df_rfm['M_score'] = pd.qcut(df_rfm['M'], q=4, labels=[1,2,3,4])

# 计算RFM总分
df_rfm['RFM_score'] = (
    df_rfm['R_score'].astype(str) + 
    df_rfm['F_score'].astype(str) + 
    df_rfm['M_score'].astype(str)
)

# 用户分层
def rfm_segment(row):
    if row['R_score'] >= 3 and row['F_score'] >= 3 and row['M_score'] >= 3:
        return '重要价值'
    elif row['R_score'] >= 3 and row['M_score'] >= 3:
        return '重要保持'
    # ...其他逻辑
    else:
        return '一般挽留'

df_rfm['segment'] = df_rfm.apply(rfm_segment, axis=1)

# 各分层统计
print(df_rfm.groupby('segment').agg({
    'R': 'mean',
    'F': 'mean',
    'M': ['mean', 'sum', 'count']
}))`}
                        </pre>
                      </div>
                    </div>
                    
                    {/* 行业benchmark表格 */}
                    <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700/30' : 'bg-purple-50 border border-purple-200'}`}>
                      <h4 className="font-bold mb-3">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 电商行业RFM基准值参考</h4>
                      <div className="overflow-x-auto">
                        <table className={`w-full text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <thead className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <tr>
                              <th className="p-2 text-left">行业类型</th>
                              <th className="p-2 text-center">R(天)</th>
                              <th className="p-2 text-center">F(次/年)</th>
                              <th className="p-2 text-center">M(元/年)</th>
                              <th className="p-2 text-center">复购率</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                              <td className="p-2 font-semibold">快消品</td>
                              <td className="p-2 text-center">≤30</td>
                              <td className="p-2 text-center">12-24</td>
                              <td className="p-2 text-center">2000-5000</td>
                              <td className="p-2 text-center text-green-500 font-bold">60%+</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-semibold">母婴用品</td>
                              <td className="p-2 text-center">≤45</td>
                              <td className="p-2 text-center">8-15</td>
                              <td className="p-2 text-center">3000-8000</td>
                              <td className="p-2 text-center text-green-500 font-bold">50-55%</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-semibold">服装鞋包</td>
                              <td className="p-2 text-center">≤60</td>
                              <td className="p-2 text-center">4-8</td>
                              <td className="p-2 text-center">1500-4000</td>
                              <td className="p-2 text-center text-blue-500 font-bold">30-40%</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-semibold">3C数码</td>
                              <td className="p-2 text-center">≤180</td>
                              <td className="p-2 text-center">2-4</td>
                              <td className="p-2 text-center">5000-15000</td>
                              <td className="p-2 text-center text-orange-500 font-bold">15-25%</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-semibold">家居家电</td>
                              <td className="p-2 text-center">≤365</td>
                              <td className="p-2 text-center">1-3</td>
                              <td className="p-2 text-center">8000-30000</td>
                              <td className="p-2 text-center text-red-500 font-bold">10-20%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 注：不同行业差异巨大，需根据自身业务调整阈值。快消品高频低价，耐用品低频高价。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 场景3: 商品运营分析 */}
              <Card id="scenario-product" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-transparent' : 'bg-gradient-to-r from-orange-50 via-orange-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                    场景三：商品运营分析
                  </CardTitle>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    优化商品结构，提升库存效率
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📉 滞销商品分析</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        • 定义：30/60天无销量<br/>
                        • 策略：降价促销、捆绑销售、清仓下架<br/>
                        • 目标：降低库存成本
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} TOP销量分析</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        • 找出贡献80%销售额的20%商品<br/>
                        • 策略：加大采购、优化库存、首页推荐<br/>
                        • 目标：放大优势商品价值
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 库存周转分析</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        • 计算：销售成本/平均库存<br/>
                        • 行业基准：快消&gt;6，服装&gt;4<br/>
                        • 策略：优化补货周期
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2"> {getLucideIcon('', 'inline w-6 h-6 text-[#19bcc8]')} 关联推荐</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        • 分析购物篮组合<br/>
                        • 策略："买A的人也买B"<br/>
                        • 目标：提升客单价
                      </p>
                    </div>
                  </div>
                  
                  {/* SQL代码示例 */}
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📝 SQL示例：滞销商品分析</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
{`-- 识别滞销商品
SELECT 
  product_id,
  product_name,
  category,
  last_sale_date,
  DATEDIFF(CURRENT_DATE, last_sale_date) AS days_no_sale,
  stock_quantity,
  stock_quantity * cost_price AS stock_value
FROM (
  SELECT 
    p.product_id,
    p.product_name,
    p.category,
    MAX(o.order_date) AS last_sale_date,
    p.stock_quantity,
    p.cost_price
  FROM products p
  LEFT JOIN order_items oi ON p.product_id = oi.product_id
  LEFT JOIN orders o ON oi.order_id = o.order_id
    AND o.order_status = '已完成'
    AND o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 60 DAY)
  GROUP BY p.product_id
) t
WHERE DATEDIFF(CURRENT_DATE, last_sale_date) > 30
  OR last_sale_date IS NULL
ORDER BY stock_value DESC
LIMIT 100;`}
                      </pre>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📝 SQL示例：关联商品分析</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
{`-- 购物篮分析(Market Basket Analysis)
WITH product_pairs AS (
  SELECT 
    a.product_id AS product_a,
    b.product_id AS product_b,
    COUNT(DISTINCT a.order_id) AS co_occurrence
  FROM order_items a
  JOIN order_items b 
    ON a.order_id = b.order_id 
    AND a.product_id < b.product_id
  WHERE a.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
  GROUP BY a.product_id, b.product_id
  HAVING COUNT(DISTINCT a.order_id) >= 10
)
SELECT 
  pa.product_name AS product_a_name,
  pb.product_name AS product_b_name,
  pp.co_occurrence,
  ROUND(pp.co_occurrence * 100.0 / 
    (SELECT COUNT(DISTINCT order_id) FROM orders
     WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)), 2
  ) AS support_percent
FROM product_pairs pp
JOIN products pa ON pp.product_a = pa.product_id
JOIN products pb ON pp.product_b = pb.product_id
ORDER BY pp.co_occurrence DESC
LIMIT 20;`}
                      </pre>
                    </div>
                  </div>
                  
                  {/* 商品健康度评分卡 */}
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700/30' : 'bg-orange-50 border border-orange-200'}`}>
                    <h4 className="font-bold mb-3">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 商品健康度评分体系</h4>
                    <div className="overflow-x-auto">
                      <table className={`w-full text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          <tr>
                            <th className="p-2 text-left">维度</th>
                            <th className="p-2 text-center">权重</th>
                            <th className="p-2 text-center">优秀(90+)</th>
                            <th className="p-2 text-center">良好(70-89)</th>
                            <th className="p-2 text-center">警戒(&lt;70)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="p-2 font-semibold">销量趋势</td>
                            <td className="p-2 text-center">30%</td>
                            <td className="p-2 text-center text-green-500">环比增长&gt;20%</td>
                            <td className="p-2 text-center text-blue-500">-10%~+20%</td>
                            <td className="p-2 text-center text-red-500">下降&gt;10%</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-semibold">库存周转</td>
                            <td className="p-2 text-center">25%</td>
                            <td className="p-2 text-center text-green-500">&gt;6次/年</td>
                            <td className="p-2 text-center text-blue-500">4-6次/年</td>
                            <td className="p-2 text-center text-red-500">&lt;4次/年</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-semibold">好评率</td>
                            <td className="p-2 text-center">20%</td>
                            <td className="p-2 text-center text-green-500">&gt;95%</td>
                            <td className="p-2 text-center text-blue-500">85-95%</td>
                            <td className="p-2 text-center text-red-500">&lt;85%</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-semibold">退货率</td>
                            <td className="p-2 text-center">15%</td>
                            <td className="p-2 text-center text-green-500">&lt;3%</td>
                            <td className="p-2 text-center text-blue-500">3-8%</td>
                            <td className="p-2 text-center text-red-500">&gt;8%</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-semibold">毛利率</td>
                            <td className="p-2 text-center">10%</td>
                            <td className="p-2 text-center text-green-500">&gt;40%</td>
                            <td className="p-2 text-center text-blue-500">25-40%</td>
                            <td className="p-2 text-center text-red-500">&lt;25%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 综合得分 = Σ(维度得分 × 权重)，定期review低分商品，优化或下架
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 场景4: 营销活动分析 */}
              <Card id="scenario-marketing" className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg scroll-mt-24`}>
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-900/30 via-pink-800/20 to-transparent' : 'bg-gradient-to-r from-pink-50 via-pink-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-pink-500/30' : 'border-pink-200'}`}>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>
                    场景四：营销活动分析
                  </CardTitle>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    评估活动效果，优化营销投入
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心指标</h4>
                        <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• <strong>ROI</strong> = (活动GMV - 成本) / 成本</li>
                          <li>• <strong>新用户占比</strong>：评估拉新效果</li>
                          <li>• <strong>优惠券使用率</strong>：券设计合理性</li>
                          <li>• <strong>GMV增量</strong>：剔除自然增长</li>
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 分析维度</h4>
                        <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• <strong>时间维度</strong>：活动前中后对比</li>
                          <li>• <strong>渠道维度</strong>：哪个渠道ROI最高</li>
                          <li>• <strong>用户维度</strong>：新老用户响应差异</li>
                          <li>• <strong>商品维度</strong>：哪类商品最受欢迎</li>
                        </ul>
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-pink-900/20 border border-pink-700/30' : 'bg-pink-50 border border-pink-200'}`}>
                      <h4 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 避坑提醒</h4>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 不要只看GMV，忽略利润：高优惠可能亏本</li>
                        <li>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意透支效应：活动后销量断崖需警惕</li>
                        <li>⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 区分增量vs存量：多少是活动真正带来的</li>
                      </ul>
                    </div>
                    
                    {/* SQL示例：活动效果分析 */}
                    <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📝 SQL示例：营销活动完整分析</h4>
                      <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
{`-- 活动效果全面分析(对比活动前7天 vs 活动期间 vs 活动后7天)
WITH activity_period AS (
  SELECT '2024-11-11' AS activity_start, '2024-11-13' AS activity_end
),
metrics AS (
  SELECT 
    CASE 
      WHEN o.order_date < (SELECT activity_start FROM activity_period) 
        AND o.order_date >= DATE_SUB((SELECT activity_start FROM activity_period), INTERVAL 7 DAY)
      THEN '活动前7天'
      WHEN o.order_date BETWEEN (SELECT activity_start FROM activity_period) 
        AND (SELECT activity_end FROM activity_period)
      THEN '活动期间'
      WHEN o.order_date > (SELECT activity_end FROM activity_period)
        AND o.order_date <= DATE_ADD((SELECT activity_end FROM activity_period), INTERVAL 7 DAY)
      THEN '活动后7天'
    END AS period,
    COUNT(DISTINCT o.order_id) AS order_count,
    COUNT(DISTINCT o.user_id) AS buyer_count,
    SUM(o.order_amount) AS total_gmv,
    SUM(o.order_amount - o.coupon_amount) AS net_gmv,
    AVG(o.order_amount) AS avg_order_value,
    SUM(CASE WHEN u.register_date >= (SELECT activity_start FROM activity_period) 
      THEN 1 ELSE 0 END) AS new_user_orders,
    SUM(o.coupon_amount) AS total_coupon_cost,
    SUM(CASE WHEN o.coupon_id IS NOT NULL THEN 1 ELSE 0 END) AS coupon_used_orders
  FROM orders o
  LEFT JOIN users u ON o.user_id = u.user_id
  WHERE o.order_status = '已完成'
    AND o.order_date BETWEEN 
      DATE_SUB((SELECT activity_start FROM activity_period), INTERVAL 7 DAY)
      AND DATE_ADD((SELECT activity_end FROM activity_period), INTERVAL 7 DAY)
  GROUP BY period
)
SELECT 
  period,
  order_count,
  buyer_count,
  total_gmv,
  net_gmv,
  ROUND(avg_order_value, 2) AS avg_order_value,
  ROUND(new_user_orders * 100.0 / order_count, 2) AS new_user_ratio,
  ROUND(coupon_used_orders * 100.0 / order_count, 2) AS coupon_usage_rate,
  ROUND((total_gmv - total_coupon_cost) / total_coupon_cost, 2) AS roi
FROM metrics
ORDER BY 
  CASE period 
    WHEN '活动前7天' THEN 1
    WHEN '活动期间' THEN 2
    WHEN '活动后7天' THEN 3
  END;`}
                      </pre>
                    </div>
                    
                    {/* 真实案例分析 */}
                    <div className={`mt-4 p-5 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-700' : 'bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200'}`}>
                      <h4 className="font-bold mb-3 text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 真实案例：某美妆电商618大促复盘</h4>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                          <div className="text-2xl font-bold text-green-500 mb-1">3.2倍</div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>GMV增长</div>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                          <div className="text-2xl font-bold text-blue-500 mb-1">2.8</div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>ROI</div>
                        </div>
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                          <div className="text-2xl font-bold text-purple-500 mb-1">45%</div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>新用户占比</div>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg mb-3 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <h5 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 活动设计</h5>
                        <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>• <strong>预热期(3天)</strong>：定金膨胀2倍，预售商品8折</li>
                          <li>• <strong>爆发期(2天)</strong>：全场满299减50，叠加品牌券</li>
                          <li>• <strong>尾款期(1天)</strong>：尾款满200减30，支付即抽奖</li>
                        </ul>
                      </div>
                      
                      <div className={`p-4 rounded-lg mb-3 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <h5 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据表现</h5>
                        <div className="overflow-x-auto">
                          <table className={`w-full text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            <thead className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                              <tr>
                                <th className="p-2 text-left">时期</th>
                                <th className="p-2 text-right">GMV</th>
                                <th className="p-2 text-right">订单数</th>
                                <th className="p-2 text-right">客单价</th>
                                <th className="p-2 text-right">新用户</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-700">
                                <td className="p-2">活动前</td>
                                <td className="p-2 text-right">150万</td>
                                <td className="p-2 text-right">5000</td>
                                <td className="p-2 text-right">¥300</td>
                                <td className="p-2 text-right">20%</td>
                              </tr>
                              <tr className="border-b border-gray-700 bg-green-500/10">
                                <td className="p-2 font-bold">活动期间</td>
                                <td className="p-2 text-right font-bold text-green-500">480万</td>
                                <td className="p-2 text-right font-bold">12000</td>
                                <td className="p-2 text-right font-bold">¥400</td>
                                <td className="p-2 text-right font-bold text-blue-500">45%</td>
                              </tr>
                              <tr>
                                <td className="p-2">活动后</td>
                                <td className="p-2 text-right text-orange-500">80万</td>
                                <td className="p-2 text-right">3200</td>
                                <td className="p-2 text-right">¥250</td>
                                <td className="p-2 text-right">15%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <h5 className="font-bold mb-2">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 关键洞察</h5>
                        <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <li>✅ <strong>成功点</strong>：预售机制锁定用户，减少流失；新用户占比高，拉新效果显著</li>
                          <li>⚠️ <strong>问题点</strong>：活动后出现明显透支效应，GMV下降47%；客单价降低，说明活动吸引了价格敏感用户</li>
                          <li>🎯 <strong>改进建议</strong>：延长活动周期，降低单日优惠力度；设计会员日等常态化促销，平滑销量波动；针对新用户设计7天留存方案</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 分隔线 */}
            <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* 电商行业核心指标Benchmark */}
            <section className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <BarChart3 className="h-8 w-8" />
                  电商行业核心转化率Benchmark
                </h2>
                
                <div className="overflow-x-auto">
                  <table className={`w-full text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <thead className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <tr>
                        <th className="p-3 text-left">电商类型</th>
                        <th className="p-3 text-center">访问→加购</th>
                        <th className="p-3 text-center">加购→下单</th>
                        <th className="p-3 text-center">下单→支付</th>
                        <th className="p-3 text-center">整体转化率</th>
                        <th className="p-3 text-center">客单价区间</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        <td className="p-3 font-semibold">快消品/日用百货</td>
                        <td className="p-3 text-center"><span className="text-green-500 font-bold">15-25%</span></td>
                        <td className="p-3 text-center"><span className="text-green-500 font-bold">40-60%</span></td>
                        <td className="p-3 text-center"><span className="text-green-500 font-bold">85-95%</span></td>
                        <td className="p-3 text-center"><span className="text-green-500 font-bold text-lg">5-15%</span></td>
                        <td className="p-3 text-center">¥50-200</td>
                      </tr>
                      <tr className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        <td className="p-3 font-semibold">服装鞋包</td>
                        <td className="p-3 text-center"><span className="text-blue-500 font-bold">10-18%</span></td>
                        <td className="p-3 text-center"><span className="text-blue-500 font-bold">35-50%</span></td>
                        <td className="p-3 text-center"><span className="text-blue-500 font-bold">80-90%</span></td>
                        <td className="p-3 text-center"><span className="text-blue-500 font-bold text-lg">3-8%</span></td>
                        <td className="p-3 text-center">¥150-500</td>
                      </tr>
                      <tr className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        <td className="p-3 font-semibold">美妆个护</td>
                        <td className="p-3 text-center"><span className="text-purple-500 font-bold">12-20%</span></td>
                        <td className="p-3 text-center"><span className="text-purple-500 font-bold">38-55%</span></td>
                        <td className="p-3 text-center"><span className="text-purple-500 font-bold">82-92%</span></td>
                        <td className="p-3 text-center"><span className="text-purple-500 font-bold text-lg">4-10%</span></td>
                        <td className="p-3 text-center">¥100-400</td>
                      </tr>
                      <tr className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        <td className="p-3 font-semibold">3C数码</td>
                        <td className="p-3 text-center"><span className="text-orange-500 font-bold">5-12%</span></td>
                        <td className="p-3 text-center"><span className="text-orange-500 font-bold">25-40%</span></td>
                        <td className="p-3 text-center"><span className="text-orange-500 font-bold">75-85%</span></td>
                        <td className="p-3 text-center"><span className="text-orange-500 font-bold text-lg">1-5%</span></td>
                        <td className="p-3 text-center">¥500-3000</td>
                      </tr>
                      <tr className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        <td className="p-3 font-semibold">家居家电</td>
                        <td className="p-3 text-center"><span className="text-red-500 font-bold">4-10%</span></td>
                        <td className="p-3 text-center"><span className="text-red-500 font-bold">20-35%</span></td>
                        <td className="p-3 text-center"><span className="text-red-500 font-bold">70-82%</span></td>
                        <td className="p-3 text-center"><span className="text-red-500 font-bold text-lg">0.6-3%</span></td>
                        <td className="p-3 text-center">¥800-5000</td>
                      </tr>
                      <tr className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                        <td className="p-3 font-semibold">生鲜食品</td>
                        <td className="p-3 text-center"><span className="text-teal-500 font-bold">18-28%</span></td>
                        <td className="p-3 text-center"><span className="text-teal-500 font-bold">45-65%</span></td>
                        <td className="p-3 text-center"><span className="text-teal-500 font-bold">88-95%</span></td>
                        <td className="p-3 text-center"><span className="text-teal-500 font-bold text-lg">7-18%</span></td>
                        <td className="p-3 text-center">¥30-150</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <div className="text-sm font-bold mb-2 text-green-500">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 高转化诀窍</div>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• 快消品：强调便捷性，快速配送</li>
                      <li>• 生鲜：突出新鲜度，限时优惠</li>
                      <li>• 服装：多图展示，支持退换</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <div className="text-sm font-bold mb-2 text-blue-500">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 优化重点</div>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• 3C数码：详细参数、用户评价</li>
                      <li>• 家电：安装服务、质保说明</li>
                      <li>• 美妆：成分说明、使用教程</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'}`}>
                    <div className="text-sm font-bold mb-2 text-orange-500">⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 注意事项</div>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• 客单价越高，决策周期越长</li>
                      <li>• 移动端转化率通常低于PC端</li>
                      <li>• 活动期间转化率会提升30-50%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 分隔线 */}
            <div className={`my-12 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* 行业避坑指南 */}
            <section id="pitfalls" className="mb-20 scroll-mt-24">
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
                      行业避坑指南
                    </h2>
                  </div>
                </div>
                <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-red-500 via-red-400 to-transparent' : 'bg-gradient-to-r from-red-500 via-red-300 to-transparent'}`}></div>
                <p className={`text-lg mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  电商数据分析常见陷阱，提前规避少走弯路
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'GMV定义混乱',
                    problem: '有的公司GMV包含未支付订单，有的只算支付成功',
                    solution: '明确口径：GMV = 已支付订单金额，未支付单独统计为"待支付订单"',
                    icon: <DollarSign className="h-6 w-6" />
                  },
                  {
                    title: '忽略退款影响',
                    problem: '只看GMV不看退款，虚高营收掩盖质量问题',
                    solution: '同时关注"退款率"和"净GMV"（GMV - 退款金额）',
                    icon: <RefreshCcw className="h-6 w-6" />
                  },
                  {
                    title: '平均数陷阱',
                    problem: '平均客单价200元，但80%用户只花50元',
                    solution: '使用中位数、分位数，结合用户分层分析',
                    icon: <BarChart3 className="h-6 w-6" />
                  },
                  {
                    title: '机器流量污染',
                    problem: '爬虫、刷单导致UV/PV虚高，转化率失真',
                    solution: '数据清洗：去除异常IP、高频点击、明显作弊用户',
                    icon: <Users className="h-6 w-6" />
                  },
                  {
                    title: '时间颗粒度不当',
                    problem: '用日数据看长期趋势，噪音太大；用月数据看活动效果，太粗糙',
                    solution: '长期趋势用周/月，活动效果用天/小时',
                    icon: <Activity className="h-6 w-6" />
                  },
                  {
                    title: '孤立看指标',
                    problem: '转化率很高，但流量很少，GMV依然上不去',
                    solution: '建立指标体系，综合分析"流量×转化×客单价"',
                    icon: <Layers className="h-6 w-6" />
                  }
                ].map((pitfall, index) => (
                  <Card key={index} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-red-200'} border-2`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500 text-white">
                          {pitfall.icon}
                        </div>
                        <CardTitle className={`text-lg ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          {pitfall.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`p-3 rounded-lg mb-3 ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong>❌ 问题：</strong>{pitfall.problem}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <strong> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 解决：</strong>{pitfall.solution}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 分隔线 */}
            <div className={`my-16 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* 学习路径图 */}
            <section id="learning-path" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Rocket className="h-8 w-8" />
                  学习路径规划
                </h2>
                
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  <LearningPathChart theme={theme} />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      学习建议
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>✅ <strong>循序渐进</strong>：不要跳级，扎实掌握每个阶段</li>
                      <li>✅ <strong>实战为王</strong>：找真实数据集练手，建立作品集</li>
                      <li>✅ <strong>输出倒逼输入</strong>：写博客、做分享，深化理解</li>
                      <li>✅ <strong>关注业务</strong>：理解指标背后的商业逻辑</li>
                    </ul>
                  </div>

                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-500" />
                      推荐资源
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>📚 <strong>书籍</strong>：《增长黑客》《精益数据分析》</li>
                      <li>🎯 <strong>平台</strong>：Kaggle、天池、DataCastle</li>
                      <li>🛠️ <strong>工具</strong>：SQL、Python、Tableau</li>
                      <li>💡 <strong>社区</strong>：数据分析技术交流群、知乎专栏</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 分隔线 */}
            <div className={`my-16 border-t-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}></div>

            {/* 核心公式速查表 */}
            <section id="formula-reference" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  <BookOpen className="h-8 w-8" />
                  核心公式速查表
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* GMV相关 */}
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                    <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} GMV 相关
                    </h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">成交总额</div>
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                          GMV = 访问UV × 转化率 × 客单价
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">客单价</div>
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                          AOV = GMV / 订单量
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">购物篮系数</div>
                        <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                          购物篮系数 = 商品数量 / 订单量
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* 用户价值 */}
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'}`}>
                    <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 用户价值
                    </h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">生命周期价值</div>
                        <code className="text-sm font-mono text-green-600 dark:text-green-400">
                          LTV = 平均客单价 × 复购次数
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">复购率</div>
                        <code className="text-sm font-mono text-green-600 dark:text-green-400">
                          复购率 = 复购用户数 / 总购买用户数
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">获客健康度</div>
                        <code className="text-sm font-mono text-green-600 dark:text-green-400">
                          LTV / CAC &gt; 3 (健康)
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* 转化指标 */}
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
                    <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 转化指标
                    </h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">整体转化率</div>
                        <code className="text-sm font-mono text-purple-600 dark:text-purple-400">
                          转化率 = 下单人数 / 访问人数
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">加购率</div>
                        <code className="text-sm font-mono text-purple-600 dark:text-purple-400">
                          加购率 = 加购人数 / 访问人数
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">支付转化</div>
                        <code className="text-sm font-mono text-purple-600 dark:text-purple-400">
                          支付率 = 支付订单 / 提交订单
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* 运营效率 */}
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/20 border border-orange-700' : 'bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200'}`}>
                    <h4 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 运营效率
                    </h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">活动ROI</div>
                        <code className="text-sm font-mono text-orange-600 dark:text-orange-400">
                          ROI = (活动GMV - 成本) / 成本
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">库存周转率</div>
                        <code className="text-sm font-mono text-orange-600 dark:text-orange-400">
                          周转率 = 销售成本 / 平均库存
                        </code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">动销率</div>
                        <code className="text-sm font-mono text-orange-600 dark:text-orange-400">
                          动销率 = 有销量SKU / 总SKU数
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 快速记忆口诀 */}
                <div className={`mt-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' : 'bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300'}`}>
                  <h4 className="font-bold mb-3 text-center text-lg">� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 快速记忆口诀</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500 mb-2">GMV三板斧</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        流量 × 转化 × 客单价
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500 mb-2">用户价值三要素</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        R(最近) · F(频率) · M(金额)
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500 mb-2">漏斗五步走</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        访 → 浏 → 加 → 下 → 付
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 底部提示 */}
            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                ✨ 所有11个行业数据分析页面已完善！
              </p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                涵盖电商、内容、金融、游戏、教育、医疗、旅游、餐饮、零售、物流、制造全行业
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          aria-label="返回顶部"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}

