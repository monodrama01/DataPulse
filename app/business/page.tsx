"use client"

import React, { useState, useEffect } from 'react'
import { getLucideIcon } from "@/components/LucideIcon";
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Brain, TrendingUp, Users, Target, BarChart3, ShoppingCart, 
  Repeat, MessageSquare, FileText, Zap, CheckCircle, ArrowRight,
  BookOpen, Layers, Database, LineChart, PieChart, Activity, Home, ChevronUp, AlertCircle, Shield, Rocket, Palette,
  ChevronDown, Video, DollarSign, Gamepad2, GraduationCap, Store, Truck, Factory, Heart, Plane, Coffee, ArrowUp
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { 
  AARRRFunnel, 
  EcommerceFunnel, 
  MarketingFunnel, 
  TrafficSourceModel,
  ContentPlatformModel,
  PushFunnel,
  ProductLifecycleChart,
  MetricPerspectivesChart,
  RetentionComparisonChart,
  UserProfilingChart,
  AntiCheatingChart,
  UserBehaviorModel
} from "./model-visualizations"

export default function BusinessPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      
      // 分组：子元素优先检测（实际存在的ID）
      const childSections = [
        // 业务认知层的子项
        'business-model', 'business-translation', 'product-lifecycle', 'data-driven', 'data-architecture', 'analyst-work',
        // 指标字典层的子项
        'metrics-alignment', 'good-metrics', 'core-metrics', 'retention-comparison',
        // 如何选择指标的子项
        'metrics-methodology', 'four-modules', 'case-studies', 'core-principles',
        // 模型框架层的子项（与内容区对齐，按页面从上到下顺序）
        'aarrr-model', 'ecommerce-model', 'marketing-model', 'traffic-model', 'content-platform', 'push-funnel', 'user-behavior',
        // 工具方法层的子项
        'drawing-tools',
        // 管理迭代层的子项（精简后，仅锚定到大节本身）
        'management-iteration'
      ]
      
      const parentSections = [
        'overview',
        'business-cognition',
        'metrics-dictionary',
        'how-to-select-metrics',
        'model-framework',
        'tool-methods',
        'management-iteration'
      ]
      
      let foundSection = null
      
      // 先检测子元素（Card级别）：当元素覆盖视口中线时认为激活
      for (const sectionId of childSections) {
        const element = document.getElementById(sectionId)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        const viewportMiddle = window.innerHeight / 2
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          foundSection = sectionId
          break
        }
      }
      
      // 如果没找到子元素，再检测父元素（Section级别）
      if (!foundSection) {
        for (const sectionId of parentSections) {
          const element = document.getElementById(sectionId)
          if (!element) continue
          const rect = element.getBoundingClientRect()
          const viewportMiddle = window.innerHeight / 2
          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            foundSection = sectionId
            break
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
    <>
      <Navigation />
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* 面包屑导航 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 text-[#19bcc8] hover:text-[#17a8b4] transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>业务知识</span>
            </div>
            
            {/* 行业分析入口 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-[#19bcc8] hover:bg-[#17a8b4] text-white shadow-lg"
                >
                  <BarChart3 size={18} />
                  <span>行业数据分析</span>
                  <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`w-56 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <Link href="/business/industries/ecommerce">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <ShoppingCart size={16} className="mr-2" />
                    <span>电商数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/content">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Video size={16} className="mr-2" />
                    <span>内容平台数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/fintech">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <DollarSign size={16} className="mr-2" />
                    <span>金融科技数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/gaming">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Gamepad2 size={16} className="mr-2" />
                    <span>游戏行业数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/education">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <GraduationCap size={16} className="mr-2" />
                    <span>教育行业数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/retail">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Store size={16} className="mr-2" />
                    <span>零售行业数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/logistics">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Truck size={16} className="mr-2" />
                    <span>物流行业数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/manufacturing">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Factory size={16} className="mr-2" />
                    <span>制造业数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/healthcare">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Heart size={16} className="mr-2" />
                    <span>医疗健康数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/travel">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Plane size={16} className="mr-2" />
                    <span>旅游出行数据分析</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/business/industries/food">
                  <DropdownMenuItem className={`cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}`}>
                    <Coffee size={16} className="mr-2" />
                    <span>餐饮O2O数据分析</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 整体布局：左侧目录 + 右侧内容 */}
        <div className="flex gap-8">
          {/* 左侧目录 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                {getLucideIcon('📖', 'w-5 h-5 text-[#19bcc8]')}
                页面导航
              </h3>
              <nav className="space-y-2">
                {/* 概览 */}
                <a
                  href="#overview"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    activeSection === 'overview'
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('🏠', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${activeSection === 'overview' ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    概览
                  </span>
                </a>

                {/* 业务认知层 */}
                <a
                  href="#business-cognition"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    ['business-cognition', 'business-model', 'business-translation', 'product-lifecycle', 'data-driven', 'data-architecture', 'analyst-work'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('🧠', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${['business-cognition', 'business-model', 'business-translation', 'product-lifecycle', 'data-driven', 'data-architecture', 'analyst-work'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    业务认知层
                  </span>
                </a>
                <div className="space-y-1">
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#business-model" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'business-model' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      理解商业模式
                    </a>
                    <a href="#business-translation" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'business-translation' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      业务数据翻译能力
                    </a>
                    <a href="#product-lifecycle" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'product-lifecycle' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      产品生命周期
                    </a>
                    <a href="#data-driven" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'data-driven' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      数据驱动价值流程
                    </a>
                    <a href="#data-architecture" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'data-architecture' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      数据科学落地架构
                    </a>
                    <a href="#analyst-work" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'analyst-work' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      数据分析师日常工作
                    </a>
                  </div>
                </div>

                {/* 指标字典层 */}
                <a
                  href="#metrics-dictionary"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    ['metrics-dictionary', 'metrics-alignment', 'good-metrics', 'core-metrics', 'retention-comparison'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('📊', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${['metrics-dictionary', 'metrics-alignment', 'good-metrics', 'core-metrics', 'retention-comparison'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    指标字典层
                  </span>
                </a>
                <div className="space-y-1">
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#metrics-alignment" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'metrics-alignment' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      指标口径统一问题
                    </a>
                    <a href="#good-metrics" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'good-metrics' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      好指标的5大铁律
                    </a>
                    <a href="#core-metrics" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'core-metrics' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      核心指标速查表
                    </a>
                    <a href="#retention-comparison" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'retention-comparison' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      精准留存vs大盘留存
                    </a>
                  </div>
                </div>
                
                {/* 如何选择指标 */}
                <a
                  href="#how-to-select-metrics"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    ['how-to-select-metrics', 'metrics-methodology', 'four-modules', 'case-studies', 'core-principles'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('⭐', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${['how-to-select-metrics', 'metrics-methodology', 'four-modules', 'case-studies', 'core-principles'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    如何选择指标
                  </span>
                </a>
                <div className="space-y-1">
                  {/* 二级导航 */}
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a
                      href="#metrics-methodology"
                      className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'metrics-methodology' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}
                    >
                      通用方法论
                    </a>
                    <a
                      href="#four-modules"
                      className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'four-modules' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}
                    >
                      四大业务模块
                    </a>
                    <a
                      href="#case-studies"
                      className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'case-studies' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}
                    >
                      实战案例
                    </a>
                    <a
                      href="#core-principles"
                      className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'core-principles' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}
                    >
                      核心原则
                    </a>
                  </div>
                </div>
                
                {/* 模型框架层 */}
                <a
                  href="#model-framework"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    ['model-framework', 'aarrr-model', 'ecommerce-model', 'content-platform', 'push-funnel', 'marketing-model', 'traffic-model', 'user-behavior'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('📐', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${['model-framework', 'aarrr-model', 'ecommerce-model', 'content-platform', 'push-funnel', 'marketing-model', 'traffic-model', 'user-behavior'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    模型框架层
                  </span>
                </a>
                <div className="space-y-1">
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#aarrr-model" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'aarrr-model' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      AARRR 海盗模型
                    </a>
                    <a href="#ecommerce-model" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'ecommerce-model' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      电商人货场模型
                    </a>
                    <a href="#content-platform" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'content-platform' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      内容平台双循环
                    </a>
                    <a href="#push-funnel" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'push-funnel' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      推送激活漏斗
                    </a>
                    <a href="#marketing-model" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'marketing-model' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      市场营销模型
                    </a>
                    <a href="#traffic-model" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'traffic-model' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      流量-网站模型
                    </a>
                    <a href="#user-behavior" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'user-behavior' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      用户行为模型
                    </a>
                  </div>
                </div>
                
                {/* 工具方法层 */}
                <a
                  href="#tool-methods"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    ['tool-methods', 'drawing-tools'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${['tool-methods', 'drawing-tools'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    工具方法层
                  </span>
                </a>
                <div className="space-y-1">
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#tool-methods" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'tool-methods' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      7大思维武器
                    </a>
                    <a href="#drawing-tools" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'drawing-tools' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      3大画图工具
                    </a>
                  </div>
                </div>
                
                {/* 管理迭代层 */}
                <a
                  href="#management-iteration"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ${
                    ['management-iteration'].includes(activeSection)
                      ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                      : (theme === 'dark' ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                  }`}
                >
                  {getLucideIcon('🔄', 'w-5 h-5 text-[#19bcc8]')}
                  <span className={`text-sm font-medium ${['management-iteration'].includes(activeSection) ? 'text-[#19bcc8]' : (theme === 'dark' ? 'text-gray-200' : 'text-gray-700')}`}>
                    管理迭代层
                  </span>
                </a>
                <div className="space-y-1">
                  <div className="ml-6 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                    <a href="#management-iteration" className={`block px-2 py-1.5 rounded text-xs transition-all ${activeSection === 'management-iteration' ? 'text-[#19bcc8] bg-[#19bcc8]/10 font-semibold' : (theme === 'dark' ? 'text-gray-400 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10' : 'text-gray-600 hover:text-[#19bcc8] hover:bg-[#19bcc8]/10')}`}>
                      指标生命周期
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </aside>

          {/* 右侧主内容区 */}
          <div className="flex-1 min-w-0">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            数据分析业务知识体系
        </h1>
          <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从业务认知到指标建模，从理论框架到实战落地，掌握数据分析师必备的业务知识
          </p>
          </div>

        {/* 知识体系五层架构 */}
        <section id="overview" className="mb-16 scroll-mt-24">
          <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            {getLucideIcon('📊', 'inline w-6 h-6 text-[#19bcc8]')} 知识体系架构
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <a href="#business-cognition" className="block">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <Brain className="h-12 w-12 mx-auto mb-3 text-[#19bcc8]" />
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    业务认知层
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    为什么、做什么
                  </p>
                </CardContent>
              </Card>
            </a>
            <a href="#metrics-dictionary" className="block">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <Database className="h-12 w-12 mx-auto mb-3 text-[#19bcc8]" />
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    指标字典层
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    用什么衡量
                  </p>
                </CardContent>
              </Card>
            </a>
            <a href="#model-framework" className="block">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <Layers className="h-12 w-12 mx-auto mb-3 text-[#19bcc8]" />
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    模型框架层
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    怎么搭模型
                  </p>
                </CardContent>
              </Card>
            </a>
            <a href="#tool-methods" className="block">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 mx-auto mb-3 text-[#19bcc8]" />
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    工具方法层
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    怎么落地
                  </p>
                </CardContent>
              </Card>
            </a>
            <a href="#management-iteration" className="block">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-6 text-center">
                  <Repeat className="h-12 w-12 mx-auto mb-3 text-[#19bcc8]" />
                  <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    管理迭代层
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    怎么持续
                  </p>
                </CardContent>
              </Card>
            </a>
                        </div>
        </section>

        {/* 第一层：业务认知 */}
        <section id="business-cognition" className="mb-12 scroll-mt-24">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30' : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-[#19bcc8]/30'}`}>
            {/* 优化后的大标题 */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/50'}`}>
                  <Brain className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    1
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    LAYER 01 · 为什么、做什么
                  </div>
                  <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400'}`}>
                    业务认知层：建立业务思维
                  </h2>
                </div>
              </div>
              <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 via-blue-400 to-transparent' : 'bg-gradient-to-r from-blue-500 via-blue-300 to-transparent'}`}></div>
            </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-[#19bcc8]" />
                  行业知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>金融</strong>：重合规、风控指标</li>
                  <li>• <strong>电商</strong>：重货品、转化漏斗</li>
                  <li>• <strong>O2O</strong>：重运力、履约效率</li>
                  <li>• <strong>内容</strong>：重双边、生产消费</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Repeat className="h-5 w-5 text-[#19bcc8]" />
                  场景知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>拉新</strong>：获客渠道、CAC</li>
                  <li>• <strong>激活</strong>：首次关键行为</li>
                  <li>• <strong>留存</strong>：次日/7日/30日</li>
                  <li>• <strong>变现</strong>：付费转化、ARPU</li>
                  <li>• <strong>传播</strong>：老带新、K因子</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-[#19bcc8]" />
                  角色知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>老板</strong>：看钱（ROI、LTV）</li>
                  <li>• <strong>运营</strong>：看量（UV、转化率）</li>
                  <li>• <strong>财务</strong>：看账（成本、利润）</li>
                  <li>• <strong>技术</strong>：看表（性能、异常）</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 新增：理解商业模式 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-6 shadow-lg`} id="business-model">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/30 via-indigo-800/20 to-transparent' : 'bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-indigo-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-400/30'}`}>
                  <ShoppingCart className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>理解商业模式</span>
                    <span className={`ml-2 text-lg font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>（怎么挣钱）</span>
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    从商业模式出发，理解企业类型和业务逻辑
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* 商业模式分类 */}
              <div className="mb-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  商业模式（怎么挣钱）
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#19bcc8]/100 text-white">B2C</Badge>
                      <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        Business to Customer
                      </span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      企业直接面向消费者（如淘宝、京东、美团）
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#19bcc8]/100 text-white">B2B</Badge>
                      <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        Business to Business
                      </span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      企业之间的交易（如阿里巴巴、钉钉、企业微信）
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#19bcc8]/100 text-white">B2B2C</Badge>
                      <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        Business to Business to Customer
                      </span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      企业通过企业服务消费者（如天猫、苏宁、银行理财）
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#19bcc8]/100 text-white">B2VC</Badge>
                      <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        Business to Venture Capital
                      </span>
                    </div>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong className="text-[#19bcc8]">这种就是拿投资人的钱</strong>（初创企业、烧钱扩张）
                    </p>
                  </div>
                </div>
              </div>

              {/* 不同类型企业分类 */}
              <div className="mb-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  不同类型企业分类
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <h5 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      💻 互联网企业：虚拟产品、B2VC
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">①</span>
                        <strong>游戏：</strong>B2C（T、网易、完美、37）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">②</span>
                        <strong>电商平台：</strong>B2B（A、京东、拼多多）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">③</span>
                        <strong>广告：</strong>B2B（B、A、T、头条、360）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">④</span>
                        <strong>直播电商：</strong>B2C（网易严选、京东自营）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑤</span>
                        <strong>社交：</strong>B2B+B2C（T、字节）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑥</span>
                        <strong>互金：</strong>B2C（互联网金融、消费金融、P2P）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑦</span>
                        <strong>O2O平台：</strong>B2B+B2C（美团、滴滴、饿了么、淘宝）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑧</span>
                        <strong>新媒资讯：</strong>B2B+B2C
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <h5 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      🏭 实体企业：实际产品、毛利
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">①</span>
                        <strong>零售：</strong>B2C（国美、大悦城）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">②</span>
                        <strong>快销：</strong>B2C（宝洁、蒙牛）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">③</span>
                        <strong>母婴：</strong>B2C（合生元）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">④</span>
                        <strong>制药：</strong>B2B（辉瑞、各大药厂）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑤</span>
                        <strong>通讯：</strong>B2C
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑥</span>
                        <strong>货物商：</strong>B2B2C
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑦</span>
                        <strong>资讯服务：</strong>B2B（广告公司、咨询公司）
                      </div>
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="text-xs">⑧</span>
                        <strong>平台服务：</strong>B2B2C（美团、滴滴）
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 理解商业模式的关键问题 */}
              <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-indigo-700'}`}>
                  理解商业模式的关键问题
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      📦 业务模式（四大角色）
                    </h5>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• <strong>产品：</strong>卖的是什么服务</li>
                      <li>• <strong>渠道：</strong>以何种方式联系到客户</li>
                      <li>• <strong>用户：</strong>最终消费者、直接使用者</li>
                      <li>• <strong>运营：</strong>营销、服务、风控手段</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 部门/自己要服务的对象
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      明确自己的服务对象和KPI考核指标
                    </p>
                    <h5 className={`font-semibold mb-2 mt-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} KPI (Key Performance Indicator)
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      关键绩效指标，用于衡量业务目标达成情况
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 新增：业务→数据翻译能力 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-6 shadow-lg`} id="business-translation">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-teal-900/30 via-teal-800/20 to-transparent' : 'bg-gradient-to-r from-teal-50 via-teal-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-teal-500/30' : 'border-teal-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30' : 'bg-gradient-to-br from-teal-400 to-teal-500 shadow-lg shadow-teal-400/30'}`}>
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>业务→数据翻译能力</span>
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    听懂业务痛点，转化为数据问题，定位核心指标
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 核心能力说明 */}
              <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-900/20 border border-teal-700' : 'bg-teal-50 border border-teal-200'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>核心能力：</strong>业务方描述的痛点往往模糊且主观，数据分析师需要将其转化为可量化的数据问题，并找到合适的指标进行衡量和优化。
                </p>
              </div>

              {/* 翻译三步法 */}
              <div className="mb-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  翻译三步法
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="text-2xl font-bold text-[#19bcc8] mb-2">①</div>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      听懂业务痛点
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      业务方的主观描述、吐槽、感受
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="text-2xl font-bold text-[#19bcc8] mb-2">②</div>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      转化为数据问题
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      找到可量化的核心矛盾点
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                    <div className="text-2xl font-bold text-[#19bcc8] mb-2">③</div>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      定位核心指标
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      选择合适的指标进行度量
                    </p>
                  </div>
                </div>
              </div>

              {/* 实战案例 */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  实战案例
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 案例1 */}
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${theme === 'dark' ? 'bg-blue-900 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#17a8b4]'}`}>
                      案例1：配送效率
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          ❌ 业务痛点：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          重庆山城配送慢
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据问题：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          "最后500米"路段耗时异常
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 可能指标：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          骑行→步行订单占比、平均爬升坡度、楼梯配送比例
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 案例2 */}
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${theme === 'dark' ? 'bg-green-900 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#17a8b4]'}`}>
                      案例2：用户增长
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          ❌ 业务吐槽：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          新客增长乏力
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据问题：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          渠道ROI {'<'} 1，投入产出不合理
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 可能指标：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          CAC、90天LTV、渠道新客占比、首单转化率
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 案例3 */}
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${theme === 'dark' ? 'bg-purple-900 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#17a8b4]'}`}>
                      案例3：内容质量
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          ❌ 业务痛点：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          内容质量下滑，用户反馈差
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据问题：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          用户停留时长下降，互动率降低
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 可能指标：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          平均阅读时长、完成率、点赞/评论率、内容分享率
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 案例4 */}
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${theme === 'dark' ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
                      案例4：用户流失
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          ❌ 业务痛点：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          老用户流失严重
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                          � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据问题：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          7日留存率持续下跌
                        </p>
                      </div>
                      <div>
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 可能指标：
                        </span>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          次日/7日/30日留存、流失用户画像、最后活跃时间分布
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 关键技巧 */}
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 翻译技巧
                </h5>
                <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>多问为什么：</strong>业务方说"慢"，追问"慢在哪个环节？慢多少？"</li>
                  <li>• <strong>拆解业务流程：</strong>画出完整的业务链路，找到可能的卡点</li>
                  <li>• <strong>数据验证假设：</strong>不要凭感觉，用数据验证每一个假设</li>
                  <li>• <strong>指标要可操作：</strong>选择的指标必须能够通过业务动作改善</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 新增：产品生命周期与数据工具映射 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-6 shadow-lg`} id="product-lifecycle">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                  <Repeat className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>产品生命周期 × 数据工具矩阵</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-normal ${theme === 'dark' ? 'bg-red-500/20 text-red-300 border border-red-500/50' : 'bg-red-100 text-red-600 border border-red-300'}`}>必掌握</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className={`w-full border-collapse ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  <thead>
                    <tr className={theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}>
                      <th className={`p-3 text-left border ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>生命周期阶段</th>
                      <th className={`p-3 text-left border ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>业务特征</th>
                      <th className={`p-3 text-left border ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>待解决需求</th>
                      <th className={`p-3 text-left border ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>所需数据工具</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-[#19bcc8]/10'}>
                      <td className={`p-3 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <Badge className="bg-[#19bcc8]/100 text-white">探索期</Badge>
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        刚起步不完善，流程未定型，常变动
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        验证业务是否可行，需求是否存在
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#17a8b4]'}`}>
                        <strong>计数工具</strong>（GA/神策/友盟）
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-[#19bcc8]/10'}>
                      <td className={`p-3 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <Badge className="bg-[#19bcc8]/100 text-white">成长期</Badge>
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        追求增长，同时补前期服务
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        寻找规模化增长方法
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#17a8b4]'}`}>
                        <strong>4大导向工具</strong>：流量/内容/用户/业务
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-[#19bcc8]/10'}>
                      <td className={`p-3 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <Badge className="bg-[#19bcc8]/100 text-white">成熟期</Badge>
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        稳定，没有新的突破点
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        业务流程优化，用户群体精细化
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#17a8b4]'}`}>
                        <strong>用户导向 + 业务导向</strong>（精细化运营）
                      </td>
                    </tr>
                    <tr className={theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-red-50'}>
                      <td className={`p-3 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <Badge className="bg-red-500 text-white">衰退期</Badge>
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        用户对产品失去兴趣，开始流失
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                        延长生命周期，挖掘剩余价值
                      </td>
                      <td className={`p-3 border text-sm ${theme === 'dark' ? 'border-gray-700 text-red-400' : 'border-gray-200 text-red-700'}`}>
                        <strong>用户导向</strong>（召回/流失预警）
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战建议：</strong>不同阶段重点不同，探索期重验证，成长期重增长，成熟期重精细化，衰退期重召回
              </div>
              
              {/* 可视化图表 */}
              <div className="mt-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 产品生命周期曲线图
                </h4>
                <ProductLifecycleChart theme={theme} />
              </div>
            </CardContent>
          </Card>

          {/* 新增：数据驱动价值流程 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-6 shadow-lg`} id="data-driven">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/30'}`}>
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    数据如何驱动运营给企业带来价值
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    从原始数据到业务价值的完整链路
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 流程卡片 */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        原始收集数据
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 数据埋点（网页、APP、小程序）</li>
                      <li>• 业务数据（开发存的数据）</li>
                      <li>• 外部数据（买数据）</li>
                    </ul>
                  </div>

                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        数据加工处理
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 转换成可理解、可量化、可观察的业务指标</li>
                      <li>• 单纯的数据没有意义</li>
                      <li>• 只有和业务结合才能发挥价值</li>
                    </ul>
                  </div>

                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        数据可视化
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 有了数据指标，必须管理好指标</li>
                      <li>• 建立指标体系</li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                        数据决策和执行
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 从数据中得到相关信息</li>
                      <li>• 需要把这些信息转换成策略</li>
                      <li>• 包括策略制定、并持续优化和迭代策略</li>
                    </ul>
                  </div>

                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
                        5
                      </div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                        数据产品
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 将策略制作成数据应用和产品</li>
                      <li>• 开始自动化和系统化运营</li>
                    </ul>
                  </div>

                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center font-bold text-sm">
                        6
                      </div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-indigo-700'}`}>
                        数据战略
                      </h4>
                    </div>
                    <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 积累了大量数据、大量模型、大量数据应用</li>
                      <li>• 不只是数据分析，可以将数据变现</li>
                    </ul>
                  </div>
                </div>

                <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 理解：</strong>数据分析师处于这个价值链的核心环节，需要懂业务（第1-2步）、懂工具（第3步）、懂分析（第4步），才能为企业创造真正的价值。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 新增：数据科学落地架构 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-6 shadow-lg`} id="data-architecture">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                  <Layers className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>数据科学落地架构</span>
                    <span className={`ml-2 text-base font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>（理解数据体系与岗位定位）</span>
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    数据分析师在整个数据体系中的位置
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 四层架构 */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据架构四层体系
                  </h4>
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#19bcc8]/100 text-white">第1层</Badge>
                        <h5 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          运营/业务/分析执行层
                        </h5>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        CRM、CMS、运营平台、BI - 面向业务的应用层
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#19bcc8]/100 text-white">第2层</Badge>
                        <h5 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          业务/数据指标层
                        </h5>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        报表/建模、用户画像 - 指标定义和模型构建
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#19bcc8]/100 text-white">第3层</Badge>
                        <h5 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          数据处理层
                        </h5>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        ETL、SQL、DW - 数据清洗、转换、存储
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#19bcc8]/100 text-white">第4层</Badge>
                        <h5 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                          数据源层
                        </h5>
                      </div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        行为数据、埋点数据、业务数据、外部数据
                      </p>
                    </div>
                  </div>
                </div>

                {/* 三类岗位 */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据岗位三大分类
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        业务线：数据分析
                      </h5>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>侧重：</strong>业务理解 → 指标定义 → 数据洞察
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        研发线：数据仓库
                      </h5>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>侧重：</strong>数据架构 → ETL开发 → 数据质量
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        算法线：数据挖掘
                      </h5>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <strong>侧重：</strong>算法模型 → 机器学习 → 预测优化
                      </p>
                    </div>
                  </div>
                </div>

                {/* 岗位对业务知识的要求 - 精简版表格 */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 不同岗位对业务知识的要求
                  </h4>
                  <div className="overflow-x-auto">
                    <table className={`w-full border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                      <thead>
                        <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                          <th className={`p-3 border text-left text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>
                            岗位
                          </th>
                          <th className={`p-3 border text-center text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>
                            了解基本概念
                          </th>
                          <th className={`p-3 border text-center text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>
                            知道指标含义
                          </th>
                          <th className={`p-3 border text-center text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>
                            熟悉分析套路
                          </th>
                          <th className={`p-3 border text-center text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>
                            掌握分析思维
                          </th>
                          <th className={`p-3 border text-center text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-200' : 'border-gray-200 text-gray-900'}`}>
                            独立处理问题
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className={`p-3 border text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                            业务分析师
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                        </tr>
                        <tr>
                          <td className={`p-3 border text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                            数据运营
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                        </tr>
                        <tr>
                          <td className={`p-3 border text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                            数据分析师
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                        </tr>
                        <tr>
                          <td className={`p-3 border text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                            数据挖掘工程师
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                        </tr>
                        <tr>
                          <td className={`p-3 border text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                            算法工程师
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                        </tr>
                        <tr>
                          <td className={`p-3 border text-sm font-semibold ${theme === 'dark' ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                            数仓工程师
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700 text-[#19bcc8]' : 'border-gray-200 text-[#19bcc8]'}`}>
                            ✓
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                          <td className={`p-3 border text-center ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
                    <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 关键发现：</strong>业务分析师和数据运营对业务知识要求最高（全能型），而技术岗位（数据挖掘/算法/数仓）更侧重技术深度而非业务广度。
                  </div>
                </div>

                {/* 关键词说明 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                  <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    📖 关键词说明
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      • <strong>ETL</strong>：清洗、转换、加载
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      • <strong>DW</strong>：数据仓库
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      • <strong>CRM</strong>：客户关系管理、销售
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      • <strong>CMS</strong>：Content Management System（内容管理系统）
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 新增：数据分析师的日常工作内容 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-6 shadow-lg`} id="analyst-work">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 via-green-800/20 to-transparent' : 'bg-gradient-to-r from-green-50 via-green-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/30'}`}>
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    数据分析师的日常工作内容
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    从日报到专项分析，全方位了解数据分析师的工作
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* 左列：常规工作 */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 常规固定工作
                  </h4>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 日报/周报/月报
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• <strong>日报：</strong>核心指标监控（UV、转化率、GMV等）</li>
                        <li>• <strong>周报：</strong>周度趋势、环比对比、异常预警</li>
                        <li>• <strong>月报：</strong>月度总结、同环比分析、目标达成情况</li>
                        <li>• <strong>目的：</strong>及时发现业务问题，追踪目标进度</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据监控与预警
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 实时监控核心业务指标</li>
                        <li>• 异常波动及时预警（如流量突降、转化率异常）</li>
                        <li>• 定位异常原因（渠道/产品/时间维度下钻）</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} BI看板维护
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 更新和优化现有数据看板</li>
                        <li>• 新增业务需要的指标和维度</li>
                        <li>• 确保数据准确性和时效性</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 异常分析
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 数据异常识别（突增、突降、缺失、重复）</li>
                        <li>• 多维度下钻定位根因（时间/渠道/地域/设备）</li>
                        <li>• 区分真实波动 vs 数据问题（埋点失效/系统故障）</li>
                        <li>• 输出异常报告并推动问题解决</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 右列：临时/项目工作 */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 临时需求与项目
                  </h4>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} 临时数据需求
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 业务方临时取数（"帮我拉一下上周新用户数"）</li>
                        <li>• 领导临时提问（"为什么这周流量下降了？"）</li>
                        <li>• 快速响应，通常当天或次日完成</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 专项深度分析
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• <strong>用户分析：</strong>流失分析、用户画像、生命周期分析</li>
                        <li>• <strong>活动分析：</strong>活动效果评估、ROI计算</li>
                        <li>• <strong>产品分析：</strong>新功能上线效果、漏斗转化分析</li>
                        <li>• 通常需要1-2周完成，输出完整报告</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} AB测试与实验
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 设计AB测试方案（样本量、分流规则）</li>
                        <li>• 监控实验过程数据</li>
                        <li>• 分析实验结果，给出上线建议</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        💼 跨部门数据支持
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 支持运营、产品、市场等部门的数据需求</li>
                        <li>• 参与业务决策会议，提供数据支持</li>
                        <li>• 培训业务方使用BI工具自助取数</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 工作时间分配参考 */}
              <div className={`mt-6 p-5 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-[#19bcc8]/30'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  ⏱ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 典型时间分配参考
                </h4>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      30%
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      日常报表<br/>数据监控
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      20%
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      临时取数<br/>快速响应
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      40%
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      专项分析<br/>深度挖掘
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      10%
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      工具优化<br/>流程改进
                    </div>
                  </div>
                </div>
              </div>

              {/* 工作建议 */}
              <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 高效工作建议
                </h5>
                <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>• <strong>自动化：</strong>将重复性工作（日报/周报）自动化，节省时间</li>
                  <li>• <strong>模板化：</strong>建立常用分析模板，提高响应速度</li>
                  <li>• <strong>优先级：</strong>区分紧急/重要任务，合理安排时间</li>
                  <li>• <strong>沟通：</strong>及时与业务方确认需求，避免返工</li>
                  <li>• <strong>积累：</strong>将分析方法和经验沉淀为知识库</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          </div>
        </section>

        {/* 分隔符 */}
        <div className="flex justify-center items-center gap-2 my-16">
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
        </div>

        {/* 第二层：指标字典 */}
        <section id="metrics-dictionary" className="mb-12 scroll-mt-24">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30' : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border border-[#19bcc8]/30'}`}>
            {/* 优化后的大标题 */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/50' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/50'}`}>
                  <Database className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    2
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    LAYER 02 · 用什么衡量
                  </div>
                  <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400'}`}>
                    指标字典层：建立度量体系
                  </h2>
                </div>
              </div>
              <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-purple-500 via-purple-400 to-transparent' : 'bg-gradient-to-r from-purple-500 via-purple-300 to-transparent'}`}></div>
            </div>

          {/* 新增：核心指标定义的4种视角（实战踩坑） */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`} id="metrics-alignment">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-red-900/30 via-red-800/20 to-transparent' : 'bg-gradient-to-r from-red-50 via-red-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-red-500/30' : 'border-red-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30' : 'bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/30'}`}>
                  <AlertCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>指标口径统一问题</span>
                    <span className={`ml-2 text-base font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>（常见分歧）</span>
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    同一个指标，不同角色定义不同！必须在项目开始前统一口径
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                  ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 案例：什么算"新增用户"？
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  App推广活动结束，渠道商、运营、产品、研发四个部门对"新增用户"的统计数据差异高达30%！
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 渠道商视角 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-blue-700 bg-blue-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">渠道</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>渠道商</p>
                  </div>
                  <div className={`p-2 rounded mb-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>定义：</p>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      点了下载就算
                    </p>
                  </div>
                  <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>✓ 优势：统计简单，便于结算</p>
                    <p>✗ 劣势：离目标远，水分大</p>
                    <p className="text-[#19bcc8] dark:text-[#19bcc8]">适用：免费渠道测试</p>
                  </div>
                </div>

                {/* 运营视角 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-green-700 bg-green-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">运营</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>运营</p>
                  </div>
                  <div className={`p-2 rounded mb-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>定义：</p>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      下载成功才算
                    </p>
                  </div>
                  <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>✓ 优势：用户真实获得App</p>
                    <p>✗ 劣势：未考虑激活</p>
                    <p className="text-[#19bcc8] dark:text-[#19bcc8]">适用：渠道ROI对比</p>
                  </div>
                </div>

                {/* 产品视角 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-purple-700 bg-purple-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">产品</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>产品</p>
                  </div>
                  <div className={`p-2 rounded mb-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>定义：</p>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      打开启动才算
                    </p>
                  </div>
                  <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>✓ 优势：真实触达用户</p>
                    <p>✗ 劣势：不关注注册</p>
                    <p className="text-[#19bcc8] dark:text-[#19bcc8]">适用：DAU/MAU统计</p>
                  </div>
                </div>

                {/* 研发视角 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-orange-700 bg-orange-900/10' : 'border-orange-200 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">研发</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>研发</p>
                  </div>
                  <div className={`p-2 rounded mb-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>定义：</p>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                      注册了才算
                    </p>
                  </div>
                  <div className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <p>✓ 优势：数据可查询</p>
                    <p>✗ 劣势：转化漏斗窄</p>
                    <p className="text-[#19bcc8] dark:text-[#19bcc8]">适用：用户数据库</p>
                  </div>
                </div>
              </div>

              <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 最佳实践
                </p>
                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>项目启动会必做：</strong>明确指标定义，写入PRD文档</li>
                  <li>• <strong>建立指标字典：</strong>统一口径，避免重复沟通</li>
                  <li>• <strong>选择节点原则：</strong>量级小用渠道链接，量级大用下载/注册</li>
                </ul>
              </div>
              
              {/* 可视化图表 */}
              <div className="mt-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 四视角关系示意图
                </h4>
                <MetricPerspectivesChart theme={theme} />
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8`} id="good-metrics">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    好指标的5大铁律
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { num: "1", title: "核心唯一", desc: "一个阶段只追1个北极星" },
                  { num: "2", title: "比率优先", desc: "绝对值→比例" },
                  { num: "3", title: "效果显著", desc: "提升5%带来>=5% uplift" },
                  { num: "4", title: "拒绝虚荣", desc: "注册数↑但CAC↑=虚荣" },
                  { num: "5", title: "简单稳定", desc: "口径<=2行SQL，90天不变" }
                ].map((rule, idx) => (
                  <div key={idx} className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                    <div className="text-2xl font-bold text-[#19bcc8] mb-2">{rule.num}</div>
                    <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {rule.title}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {rule.desc}
                    </div>
                  </div>
                    ))}
                  </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`} id="core-metrics">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/30'}`}>
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>核心指标速查表</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-normal ${theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' : 'bg-yellow-100 text-yellow-700 border border-yellow-300'}`}>30个必背</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 流量类 */}
                <div>
                  <div className={`mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                    <h4 className={`text-lg font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/100/20' : 'bg-[#19bcc8]/20'}`}>
                        <Activity className="h-5 w-5" />
                      </div>
                      <span>流量与活跃</span>
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "PV", desc: "页面浏览量", formula: "count(pageview)" },
                      { name: "UV", desc: "独立访客", formula: "count(distinct user_id)" },
                      { name: "DAU", desc: "日活跃用户", formula: "当日活跃去重用户" },
                      { name: "MAU", desc: "月活跃用户", formula: "当月活跃去重用户" },
                      { name: "跳出率", desc: "单页退出率", formula: "单页退出/总会话" },
                      { name: "退出率", desc: "页面退出率", formula: "从该页退出/进入该页" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">原子</Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          {metric.formula}
                        </code>
                </div>
              ))}
            </div>
          </div>

                {/* 留存类 */}
                <div>
                  <div className={`mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                    <h4 className={`text-lg font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/100/20' : 'bg-[#19bcc8]/20'}`}>
                        <Repeat className="h-5 w-5" />
        </div>
                      <span>留存与复购</span>
                    </h4>
      </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "次日留存", desc: "第2天仍活跃", formula: "次日活跃/首日新增" },
                      { name: "7日留存", desc: "第7天仍活跃", formula: "7日后活跃/首日新增" },
                      { name: "复购率", desc: "时段内>=2次", formula: ">=2次购买/总购买用户" },
                      { name: "回购率", desc: "跨时段再购", formula: "下时段仍购/上时段购买" },
                      { name: "流失率", desc: "上月活本月不活", formula: "本月不活跃/上月活跃" },
                      { name: "召回率", desc: "流失用户召回", formula: "召回成功/流失用户" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">原子</Badge>
    </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          {metric.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 收入类 */}
                <div>
                  <div className={`mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
                    <h4 className={`text-lg font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <span>收入与价值</span>
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "ARPU", desc: "每用户平均收入", formula: "总收入/活跃用户" },
                      { name: "ARPPU", desc: "每付费用户收入", formula: "总收入/付费用户" },
                      { name: "LTV", desc: "生命周期价值", formula: "ARPU/(月流失率)" },
                      { name: "CAC", desc: "获客成本", formula: "市场费用/新增用户" },
                      { name: "付费率", desc: "付费用户占比", formula: "付费用户/活跃用户" },
                      { name: "客单价", desc: "订单平均金额", formula: "总GMV/总订单" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {metric.name === "LTV" ? "组合" : "原子"}
                          </Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          {metric.formula}
                        </code>
                </div>
              ))}
            </div>
          </div>

                {/* 营销类 */}
                <div>
                  <div className={`mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-red-500/30' : 'border-red-200'}`}>
                    <h4 className={`text-lg font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}`}>
                        <Target className="h-5 w-5" />
        </div>
                      <span>营销与转化</span>
                    </h4>
      </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "CTR", desc: "点击率", formula: "点击量/曝光量" },
                      { name: "CVR", desc: "转化率", formula: "转化数/点击数" },
                      { name: "ROI", desc: "投资回报率", formula: "收入/成本" },
                      { name: "CPC", desc: "单次点击成本", formula: "广告费/点击数" },
                      { name: "CPM", desc: "千次曝光成本", formula: "广告费/曝光数×1000" },
                      { name: "K因子", desc: "病毒系数", formula: "邀请成功数/老用户数" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">组合</Badge>
    </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          {metric.formula}
                        </code>
      </div>
                    ))}
    </div>
          </div>

                {/* 电商类 */}
                <div>
                  <div className={`mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                    <h4 className={`text-lg font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/100/20' : 'bg-[#19bcc8]/20'}`}>
                        <ShoppingCart className="h-5 w-5" />
                      </div>
                      <span>电商专属</span>
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "购物篮系数", desc: "连带率", formula: "总件数/总订单" },
                      { name: "加购率", desc: "加入购物车比例", formula: "加购数/商详UV" },
                      { name: "支付成功率", desc: "支付完成率", formula: "支付成功/下单数" },
                      { name: "购物车放弃率", desc: "加购未下单率", formula: "(加购-下单)/加购" },
                      { name: "件单价", desc: "单品均价", formula: "总GMV/总件数" },
                      { name: "动销率", desc: "有销售商品占比", formula: "有销售SKU/总SKU" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {metric.name === "购物篮系数" || metric.name === "件单价" ? "原子" : "组合"}
                          </Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          {metric.formula}
                        </code>
                </div>
              ))}
            </div>
          </div>
        </div>
            </CardContent>
          </Card>

          {/* 新增：精准留存vs大盘留存（高频踩坑点） */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="retention-comparison">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-transparent' : 'bg-gradient-to-r from-orange-50 via-orange-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-orange-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/30'}`}>
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={`${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>精准留存 vs 大盘留存</span>
                    <span className={`ml-2 text-base font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>（必须搞清楚的坑）</span>
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    同样叫"7日留存"，计算方式不同，结论天差地别！
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                  ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 真实案例
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  产品经理说"7日留存50%"，数据分析师说"只有30%"，老板一脸懵：到底听谁的？<br/>
                  原因：产品用<strong>精准留存</strong>，分析师用<strong>大盘留存</strong>，计算逻辑完全不同！
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 精准留存 */}
                <div className={`p-5 rounded-lg border-2 ${theme === 'dark' ? 'border-blue-700 bg-blue-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="mb-4">
                    <Badge className="bg-[#19bcc8]/100 text-white mb-2">精准留存</Badge>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      Unbounded Retention（定群追踪）
                    </p>
                  </div>

                  <div className={`p-3 rounded mb-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      计算公式
                    </p>
                    <code className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      次日留存 = D1活跃用户 / D0新增用户<br/>
                      7日留存 = D7活跃用户 / D0新增用户
                    </code>
                  </div>

                  <div className={`p-3 rounded mb-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      实战案例
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      1月1日新增1000人<br/>
                      1月2日这1000人中有800人回来<br/>
                      <strong className="text-[#19bcc8]">→ 次日留存 = 800/1000 = 80%</strong>
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                      <strong className="text-[#19bcc8] dark:text-[#19bcc8]">✓ 优势</strong>
                      <ul className={`mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 追踪同一批人，准确评估产品体验</li>
                        <li>• 适合渠道质量对比（渠道A vs 渠道B）</li>
                        <li>• 适合版本迭代效果验证</li>
                      </ul>
                    </div>
                    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                      <strong className="text-red-600 dark:text-red-400">✗ 劣势</strong>
                      <ul className={`mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 早期新增少时数据不稳定</li>
                        <li>• 无法反映整体用户健康度</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 大盘留存 */}
                <div className={`p-5 rounded-lg border-2 ${theme === 'dark' ? 'border-purple-700 bg-purple-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="mb-4">
                    <Badge className="bg-[#19bcc8]/100 text-white mb-2">大盘留存</Badge>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      Classic Retention（活跃占比）
                    </p>
                  </div>

                  <div className={`p-3 rounded mb-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      计算公式
                    </p>
                    <code className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      次日留存 = D1活跃用户 / D1总用户<br/>
                      7日留存 = D7活跃用户 / D7总用户
                    </code>
                  </div>

                  <div className={`p-3 rounded mb-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      实战案例
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      1月2日总用户5000人<br/>
                      1月2日活跃用户3000人<br/>
                      <strong className="text-[#19bcc8]">→ 次日留存 = 3000/5000 = 60%</strong>
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                      <strong className="text-[#19bcc8] dark:text-[#19bcc8]">✓ 优势</strong>
                      <ul className={`mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 反映整体用户活跃健康度</li>
                        <li>• 数据稳定，适合大盘监控</li>
                        <li>• CEO/投资人常用指标</li>
                      </ul>
                    </div>
                    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                      <strong className="text-red-600 dark:text-red-400">✗ 劣势</strong>
                      <ul className={`mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 混杂新老用户，无法评估单一渠道</li>
                        <li>• 受历史用户影响大</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 如何选择？
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      用精准留存的场景
                    </p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 评估渠道质量（哪个渠道用户更优质？）</li>
                      <li>• A/B测试效果对比（新版vs旧版留存）</li>
                      <li>• 新功能上线后的留存变化</li>
                    </ul>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      用大盘留存的场景
                    </p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 日常大盘监控（产品整体健康度）</li>
                      <li>• 向上汇报（CEO/投资人要的就是这个）</li>
                      <li>• 行业对标（竞品留存对比）</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* 可视化图表 */}
              <div className="mt-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 两种留存计算方式对比图
                </h4>
                <RetentionComparisonChart theme={theme} />
              </div>
            </CardContent>
          </Card>
          </div>
        </section>

        {/* 分隔符 */}
        <div className="flex justify-center items-center gap-2 my-16">
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
        </div>

        {/* 新增章节：如何选择指标（实战方法论） */}
        <section id="how-to-select-metrics" className="mb-12 scroll-mt-24">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/20 to-indigo-800/10 border border-indigo-700/30' : 'bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200'}`}>
            {/* 优化后的大标题 */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/50' : 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-400/50'}`}>
                  <Target className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    ⭐
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    SPECIAL · 从业务到指标
                  </div>
                  <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400'}`}>
                    如何选择指标（3步实战法）
                  </h2>
                </div>
              </div>
              <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-500 via-indigo-400 to-transparent' : 'bg-gradient-to-r from-indigo-500 via-indigo-300 to-transparent'}`}></div>
            </div>

            <div className="space-y-8">
              {/* 方法论总览 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="metrics-methodology">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/30 via-indigo-800/20 to-transparent' : 'bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-indigo-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-400/30'}`}>
                      <Zap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        通用方法论：业务终点→模块类型→数据指标
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-[#19bcc8]">1</span>
                        <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>梳理业务模块</h4>
                      </div>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• <strong>目的：</strong>我要卖货</li>
                        <li>• <strong>方法：</strong>通过文章卖货</li>
                        <li>• <strong>工具：</strong>社区创作工具</li>
                        <li>• <strong>途径：</strong>头条/社区带货</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-[#19bcc8]">2</span>
                        <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>判断模块类型</h4>
                      </div>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• <strong>工具模块</strong>（效率）</li>
                        <li>• <strong>内容模块</strong>（质和量）</li>
                        <li>• <strong>交易模块</strong>（转化率）</li>
                        <li>• <strong>社区模块</strong>（活跃度）</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-[#19bcc8]">3</span>
                        <h4 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>选择核心指标</h4>
                      </div>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 工具类→使用量/频次</li>
                        <li>• 内容类→浏览量/深度</li>
                        <li>• 交易类→转化率/客单价</li>
                        <li>• 社区类→发布量/互动量</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 四大业务模块详解 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="four-modules">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/30'}`}>
                      <Layers className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        四大业务模块 × 核心指标体系
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        产品价值来自产品自身，还是连接其他资源？
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 工具模块 */}
                    <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">🛠️</span>
                        <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>工具模块</h4>
                      </div>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        核心关注：<strong className="text-[#19bcc8]">效率</strong>
                      </p>
                      <table className={`w-full text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
                          <tr>
                            <th className="p-2 text-left">反映维度</th>
                            <th className="p-2 text-left">场景</th>
                            <th className="p-2 text-left">结果</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">使用量</td>
                            <td className="p-2">积累、笔记</td>
                            <td className="p-2">用户粘性强</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">目标达成率</td>
                            <td className="p-2">支付、搜索</td>
                            <td className="p-2">满意度高</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">频次</td>
                            <td className="p-2">闹钟</td>
                            <td className="p-2">养成固定习惯</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#17a8b4]'}`}>
                        <strong>案例：</strong>QQ音乐歌词海报功能 → 使用量/生成数/功能频次
                      </div>
                    </div>

                    {/* 交易模块 */}
                    <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">💰</span>
                        <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>交易模块</h4>
                      </div>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        核心关注：<strong className="text-[#19bcc8]">转化率</strong>
                      </p>
                      <table className={`w-full text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
                          <tr>
                            <th className="p-2 text-left">指标</th>
                            <th className="p-2 text-left">场景</th>
                            <th className="p-2 text-left">结果</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">详情页转化率</td>
                            <td className="p-2">电商</td>
                            <td className="p-2">更容易卖</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">金额</td>
                            <td className="p-2">电商、知识付费</td>
                            <td className="p-2">卖更多</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">客单价</td>
                            <td className="p-2">奢侈品海淘</td>
                            <td className="p-2">卖更高价</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">复购率</td>
                            <td className="p-2">订阅式购物</td>
                            <td className="p-2">卖更多次</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* 内容浏览模块 */}
                    <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">📰</span>
                        <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>内容浏览模块</h4>
                      </div>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        核心关注：<strong className="text-[#19bcc8]">质和量</strong>
                      </p>
                      <table className={`w-full text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
                          <tr>
                            <th className="p-2 text-left">指标</th>
                            <th className="p-2 text-left">场景</th>
                            <th className="p-2 text-left">结果</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">浏览数</td>
                            <td className="p-2">头条类</td>
                            <td className="p-2">有多少人阅读</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">浏览广度</td>
                            <td className="p-2">视频网站多个频道</td>
                            <td className="p-2">库存利用率高</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">浏览深度/时长</td>
                            <td className="p-2">快手、抖音</td>
                            <td className="p-2">减少流失时间</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">内容互动</td>
                            <td className="p-2">B站</td>
                            <td className="p-2">提高用户粘性</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#17a8b4]'}`}>
                        <strong>案例：</strong>微信看一看 → 浏览数/广度/深度/互动量
                      </div>
                    </div>

                    {/* 社区模块 */}
                    <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl">👥</span>
                        <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>社区/社交模块</h4>
                      </div>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        核心关注：<strong className="text-[#19bcc8]">活跃度</strong>
                      </p>
                      <table className={`w-full text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}>
                          <tr>
                            <th className="p-2 text-left">指标</th>
                            <th className="p-2 text-left">场景</th>
                            <th className="p-2 text-left">结果</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">发布量</td>
                            <td className="p-2">贴吧</td>
                            <td className="p-2">更多话题源头</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">互动量</td>
                            <td className="p-2">微博</td>
                            <td className="p-2">社区更有活力</td>
                          </tr>
                          <tr className={theme === 'dark' ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                            <td className="p-2">关系密度</td>
                            <td className="p-2">微信</td>
                            <td className="p-2">更可能长期留存</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className={`mt-3 p-2 rounded text-xs ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-orange-300' : 'bg-orange-100 text-orange-700'}`}>
                        <strong>案例：</strong>脉脉职言板块 → 发布量/互动量/关系密度
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 实战案例 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="case-studies">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 via-green-800/20 to-transparent' : 'bg-gradient-to-r from-green-50 via-green-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/30'}`}>
                      <Rocket className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        实战案例：3个真实产品拆解
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* 案例1：社区带货 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        案例1：社区带货 —— 社区创作软文卖货
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>交易模块</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 每篇文章转化率<br/>• 金额=客单价×订单量<br/>• 复购率</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>内容模块</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 浏览量<br/>• 浏览深度、广度</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>工具模块</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 更容易发软文的工具</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>社区模块</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 发布量<br/>• 因为要提供各种各样的内容</p>
                        </div>
                      </div>
                    </div>

                    {/* 案例2：咸鱼 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        案例2：咸鱼数据指标选取 —— C2C交易平台
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>内容浏览模块：分类</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 商品浏览量</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>社区模块：鱼塘</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 商品/内容日发布量<br/>• 商品/内容被查看量<br/>• 商品/内容被询问量</p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>工具模块：发布工具</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>• 成功发布率</p>
                        </div>
                      </div>
                    </div>

                    {/* 案例3：iMoney */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        案例3：iMoney产品（汇率工具）
                      </h4>
                      <div className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p><strong>Clover集团目标：</strong>我想获得用户（通过效率工具类产品矩阵积累用户群）</p>
                        <p><strong>iMoney目标：</strong>我想通过一个好用的汇率工具来获得用户</p>
                        <div className="flex gap-4 mt-3">
                          <div className={`flex-1 p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className="font-semibold text-[#19bcc8] mb-1">好用</p>
                            <p className="text-xs">• 使用量<br/>• 使用频次</p>
                          </div>
                          <div className={`flex-1 p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                            <p className="font-semibold text-[#19bcc8] mb-1">获得用户</p>
                            <p className="text-xs">• 用户能长期留存<br/>• 产品能向其他产品导量</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 案例4：土巴兔 */}
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                      <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                        案例4：土巴兔 —— 双路径获客
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>路径1：精美图文</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            装修案例/知识/图片 → 免费服务/免费量房 → 留下联系方式 → 卖给装修公司 → 装修公司竞价
                          </p>
                        </div>
                        <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>路径2：估价工具</p>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            填写个人信息 → 接收估价结果
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 核心原则总结 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="core-principles">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-red-900/30 via-red-800/20 to-transparent' : 'bg-gradient-to-r from-red-50 via-red-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-red-500/30' : 'border-red-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30' : 'bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/30'}`}>
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                        选择指标的核心原则
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                      <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 选择真正反映业务健康度的指标
                      </h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 从业务最终目的出发，而非拍脑袋</li>
                        <li>• 判断业务模块所属类型</li>
                        <li>• 根据模块类型选择核心指标</li>
                        <li>• 指标必须能驱动业务决策</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                      <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        🛠 {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 选择数据工具的核心逻辑
                      </h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• <strong>没有最好的工具</strong>，只有符合业务需求的工具</li>
                        <li>• 需求和套路必须对应</li>
                        <li>• 了解公司业务/发展阶段</li>
                        <li>• 从解决特定问题的视角快速上手</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`mt-4 p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-indigo-700'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心思想：业务问题（需求1-5）→ 对应套路（套路1-5）→ 选择数据工具
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 分隔符 */}
        <div className="flex justify-center items-center gap-2 my-16">
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
        </div>

        {/* 第三层：模型框架 */}
        <section id="model-framework" className="mb-12 scroll-mt-24">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/30' : 'bg-gradient-to-br from-green-50 to-green-100/50 border border-[#19bcc8]/30'}`}>
            {/* 优化后的大标题 */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50' : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg shadow-green-400/50'}`}>
                  <Layers className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    3
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    LAYER 03 · 怎么搭模型
                  </div>
                  <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400'}`}>
                    模型框架层：六大经典模型
                  </h2>
                </div>
              </div>
              <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-green-500 via-green-400 to-transparent' : 'bg-gradient-to-r from-green-500 via-green-300 to-transparent'}`}></div>
            </div>

          <div className="space-y-8">
            {/* AARRR 模型 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`} id="aarrr-model">
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/30'}`}>
                    <Repeat className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      AARRR 海盗模型（互联网产品通用）
                    </CardTitle>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      适用场景：互联网产品全生命周期管理，从获客到传播的完整闭环
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { 
                      stage: "Acquisition", 
                      cn: "获客", 
                      icon: "🎯", 
                      metrics: ["曝光量", "点击量", "下载量", "注册量"],
                      key: "曝光-注册转化率、CAC"
                    },
                    { 
                      stage: "Activation", 
                      cn: "激活", 
                      icon: "⚡", 
                      metrics: ["首次下单", "首次阅读", "首次投资"],
                      key: "激活率、首单时长"
                    },
                    { 
                      stage: "Retention", 
                      cn: "留存", 
                      icon: "🔄", 
                      metrics: ["次日留存", "7日留存", "30日留存"],
                      key: "N日留存率"
                    },
                    { 
                      stage: "Revenue", 
                      cn: "收入", 
                      icon: "💰", 
                      metrics: ["付费用户", "ARPU", "ARPPU"],
                      key: "付费率、LTV"
                    },
                    { 
                      stage: "Referral", 
                      cn: "传播", 
                      icon: "📢", 
                      metrics: ["邀请发送", "邀请成功", "老带新"],
                      key: "K因子"
                    }
                  ].map((stage, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                      <div className="text-3xl mb-2 text-center">{stage.icon}</div>
                      <h4 className={`font-semibold text-center mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {stage.cn}
                        <br />
                        <span className="text-xs text-[#19bcc8]">{stage.stage}</span>
                      </h4>
                      <ul className={`text-xs space-y-1 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stage.metrics.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                      <div className={`text-xs font-semibold p-2 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20 text-[#19bcc8]' : 'bg-[#19bcc8]/20 text-[#17a8b4]'}`}>
                        核心：{stage.key}
                  </div>
                </div>
              ))}
                </div>
                
                {/* AARRR可视化 */}
                <div className="mt-8">
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} AARRR 漏斗可视化
                  </h4>
                  <AARRRFunnel theme={theme} />
                </div>
              </CardContent>
            </Card>

            {/* 电商人货场模型 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`} id="ecommerce-model">
              <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                    <ShoppingCart className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                      电商人货场模型（零售、电商）
                    </CardTitle>
                    <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      适用场景：零售电商业务分析，从流量到商品到转化的全链路
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* 人（流量） */}
                  <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-blue-700 bg-[#19bcc8]/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                    <div className="text-4xl mb-3 text-center">👥</div>
                    <h4 className="font-bold text-center mb-4 text-[#19bcc8]">
                      人（流量）
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>UV - 独立访客</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>新老客占比</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>获客渠道ROI</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>用户分层（RFM）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>地域分布</span>
                      </li>
                    </ul>
                  </div>

                  {/* 货（商品） */}
                  <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-purple-700 bg-purple-900/20' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                    <div className="text-4xl mb-3 text-center">📦</div>
                    <h4 className="font-bold text-center mb-4 text-[#19bcc8]">
                      货（商品）
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>客单价（订单平均金额）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>件单价（单品均价）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>购物篮系数（件/单）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>复购率 vs 回购率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>动销率、畅销Top</span>
                      </li>
                    </ul>
                  </div>

                  {/* 场（页面） */}
                  <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-green-700 bg-green-900/20' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                    <div className="text-4xl mb-3 text-center">🏪</div>
                    <h4 className="font-bold text-center mb-4 text-[#19bcc8]">
                      场（页面）
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>商详页转化率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>加购转化率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>支付成功率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>购物车放弃率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-[#19bcc8]">▸</span>
                        <span>页面跳出率</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* 电商可视化 */}
                <div className="mt-8">
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 人货场三维模型可视化
                  </h4>
                  <EcommerceFunnel theme={theme} />
                </div>
              </CardContent>
            </Card>

            {/* 其他4个模型详细展示 */}
            <div className="space-y-8">
              {/* 市场营销模型 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="marketing-model">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-transparent' : 'bg-gradient-to-r from-orange-50 via-orange-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-orange-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/30'}`}>
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        市场营销模型（品牌/广告营销全流程）
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        适用场景：品牌营销、广告投放、客户生命周期管理
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">潜在客户</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">机会客户</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">新客</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">老客</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">忠诚客户</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">流失客户</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：线索转化率、渠道新客占比、客户获取成本CAC、会员渗透率
                    </div>
                  </div>
                  
                  {/* 可视化图表 */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 客户生命周期漏斗
                    </h4>
                    <MarketingFunnel theme={theme} />
                  </div>
                </CardContent>
              </Card>
              
              {/* 流量-网站模型 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="traffic-model">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-900/30 via-cyan-800/20 to-transparent' : 'bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30' : 'bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-lg shadow-cyan-400/30'}`}>
                      <LineChart className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        流量-网站模型（官网、活动页分析）
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        适用场景：官网流量分析、活动页优化、SEO/SEM效果评估
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-cyan-50'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">来源(SEO/SEM)</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">落地页</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">浏览</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">注册</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">留存</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：跳出率 vs 退出率、停留时长、关键词TOP20、SEM ROI
                    </div>
                  </div>
                  
                  {/* 可视化图表 */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 流量来源与转化路径
                    </h4>
                    <TrafficSourceModel theme={theme} />
                  </div>
                </CardContent>
              </Card>
              
              {/* 内容平台双循环 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="content-platform">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/30 via-indigo-800/20 to-transparent' : 'bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-indigo-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-400/30'}`}>
                      <MessageSquare className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        内容平台双循环（知乎/小红书类平台）
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        适用场景：UGC/PGC内容平台、社区型产品、双边市场
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">生产者</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">内容</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">消费者</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">互动反馈</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">激励循环</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：内容指数、双边活跃度、生产者渗透率、KOL挖掘率
                    </div>
                  </div>
                  
                  {/* 可视化图表 */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 生产者-内容-消费者双循环
                    </h4>
                    <ContentPlatformModel theme={theme} />
                  </div>
                </CardContent>
              </Card>
              
              {/* 推送激活漏斗（新增） */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`} id="push-funnel">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-yellow-900/30 via-yellow-800/20 to-transparent' : 'bg-gradient-to-r from-yellow-50 via-yellow-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30' : 'bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-400/30'}`}>
                      <Zap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        推送激活转化率漏斗（App运营核心）
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        适用场景：App推送优化、消息触达分析、用户召回
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-yellow-50'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">推送列表</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">成功推送</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">有效推送</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">用户接收</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">打开</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：推送到达率、有效推送率、打开率、不同推送的转化率对比
                    </div>
                  </div>
                  
                  {/* 可视化图表 */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 推送7层漏斗详解
                    </h4>
                    <PushFunnel theme={theme} />
                  </div>
                </CardContent>
              </Card>
              
              {/* 用户行为模型（简化版说明） */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`} id="user-behavior">
                <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-900/30 via-pink-800/20 to-transparent' : 'bg-gradient-to-r from-pink-50 via-pink-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-pink-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30' : 'bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg shadow-pink-400/30'}`}>
                      <Activity className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        用户行为模型（内容/工具型App）
                      </CardTitle>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        适用场景：产品功能优化、用户路径分析、核心功能识别
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">启动</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">功能使用</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">路径分析</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">转化</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">流失</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：功能使用率、关键路径耗时、用户行为序列分析
                    </div>
                  </div>
                  
                  {/* 可视化图表 */}
                  <div className="mt-6">
                    <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 用户行为分析全流程
                    </h4>
                    <UserBehaviorModel theme={theme} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 新增：用户画像标签体系 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mt-8`} id="user-profiling">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-900/30 via-cyan-800/20 to-transparent' : 'bg-gradient-to-r from-cyan-50 via-cyan-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-cyan-500/30' : 'border-cyan-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30' : 'bg-gradient-to-br from-cyan-400 to-cyan-500 shadow-lg shadow-cyan-400/30'}`}>
                  <Users className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    用户画像标签体系（User Profiling）
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    构建多维度用户画像，支撑精准运营和个性化推荐
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {/* 基础属性 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-blue-700 bg-blue-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">基</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>基础属性</p>
                  </div>
                  <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 性别/年龄段</li>
                    <li>• 地域（省/市/区）</li>
                    <li>• 设备（机型/系统版本）</li>
                    <li>• 注册渠道</li>
                    <li>• 注册时间</li>
                  </ul>
                  <div className={`mt-2 p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className="text-[#19bcc8]">数据来源：</strong>注册信息/设备信息
                  </div>
                </div>

                {/* 社交关系 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-green-700 bg-green-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">社</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>社交关系</p>
                  </div>
                  <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 好友数量</li>
                    <li>• 互动频次</li>
                    <li>• 分享行为</li>
                    <li>• 评论数</li>
                    <li>• 点赞数</li>
                  </ul>
                  <div className={`mt-2 p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className="text-[#19bcc8]">数据来源：</strong>社交行为埋点
                  </div>
                </div>

                {/* 行为特征 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-purple-700 bg-purple-900/10' : 'border-[#19bcc8]/30 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">行</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>行为特征</p>
                  </div>
                  <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 活跃天数/时长</li>
                    <li>• 使用频次</li>
                    <li>• 核心功能使用</li>
                    <li>• 访问路径</li>
                    <li>• 活跃时段</li>
                  </ul>
                  <div className={`mt-2 p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className="text-[#19bcc8]">数据来源：</strong>行为日志
                  </div>
                </div>

                {/* 兴趣偏好 */}
                <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-orange-700 bg-orange-900/10' : 'border-orange-200 bg-[#19bcc8]/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#19bcc8]/100 text-white flex items-center justify-center text-xs font-bold">偏</div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>兴趣偏好</p>
                  </div>
                  <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 内容偏好标签</li>
                    <li>• 品类偏好</li>
                    <li>• 价格敏感度</li>
                    <li>• 浏览主题</li>
                    <li>• 搜索关键词</li>
                  </ul>
                  <div className={`mt-2 p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className="text-[#19bcc8]">数据来源：</strong>算法推断
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 标签体系建设原则
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>1. 分层管理</strong><br/>
                    基础层→统计层→算法层→业务层
                  </div>
                  <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>2. 可更新</strong><br/>
                    定期刷新标签（日/周/月）
                  </div>
                  <div className={`p-2 rounded text-xs ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>3. 可解释</strong><br/>
                    业务方能理解标签含义
                  </div>
                </div>
              </div>
              
              {/* 可视化图表 */}
              <div className="mt-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 用户画像四维度模型图
                </h4>
                <UserProfilingChart theme={theme} />
              </div>
            </CardContent>
          </Card>

          {/* 新增：反作弊机制 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mt-8`} id="anti-cheating">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-red-900/30 via-red-800/20 to-transparent' : 'bg-gradient-to-r from-red-50 via-red-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-red-500/30' : 'border-red-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30' : 'bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/30'}`}>
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    反作弊机制（Anti-Cheating）
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    识别虚假流量，保护产品数据真实性和商业价值
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg mb-6 ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                  ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 真实案例
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  某电商活动"7日销量破10万"，实际人工核查发现<strong>68%是刷单</strong>！<br/>
                  某直播平台观看量1000万，去除机刷后<strong>真实观看仅120万</strong>！
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* 机器刷 */}
                <div className={`p-5 rounded-lg border-2 ${theme === 'dark' ? 'border-red-700 bg-red-900/10' : 'border-red-200 bg-red-50'}`}>
                  <div className="mb-4">
                    <Badge className="bg-red-500 text-white mb-2">机器刷</Badge>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      机器人/脚本批量操作
                    </p>
                  </div>

                  <div className={`p-3 rounded mb-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      识别特征
                    </p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 单设备短时大量操作</li>
                      <li>• IP集中（同一IP段）</li>
                      <li>• 设备信息雷同</li>
                      <li>• 行为路径完全一致</li>
                      <li>• 无真实交互（如秒退）</li>
                    </ul>
                  </div>

                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      防御策略
                    </p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 验证码（图形/滑块）</li>
                      <li>• 设备指纹识别</li>
                      <li>• IP黑名单</li>
                      <li>• 频次限流</li>
                      <li>• 风控规则引擎</li>
                    </ul>
                  </div>
                </div>

                {/* 人工刷 */}
                <div className={`p-5 rounded-lg border-2 ${theme === 'dark' ? 'border-orange-700 bg-orange-900/10' : 'border-orange-200 bg-[#19bcc8]/10'}`}>
                  <div className="mb-4">
                    <Badge className="bg-[#19bcc8]/100 text-white mb-2">人工刷</Badge>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      真人组织化作弊（更难识别）
                    </p>
                  </div>

                  <div className={`p-3 rounded mb-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                      识别特征
                    </p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 小号（新注册/无社交关系）</li>
                      <li>• 批量操作时间高度集中</li>
                      <li>• 行为异常简单（只点赞不评论）</li>
                      <li>• 账号间关注关系成网状</li>
                      <li>• 活跃后立即沉默</li>
                    </ul>
                  </div>

                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-xs mb-2 font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                      防御策略
                    </p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>• 账号信誉体系（新号权重低）</li>
                      <li>• 行为路径分析（异常模式）</li>
                      <li>• 社交关系图谱检测</li>
                      <li>• 人工复核机制</li>
                      <li>• 动态调整权重算法</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                <p className={`font-semibold mb-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 数据分析师在反作弊中的角色
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      1. 异常监控
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      建立监控看板，及时发现数据突增/行为异常
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      2. 规则建模
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      基于历史案例，建立风控规则和识别特征库
                    </p>
                  </div>
                  <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <p className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      3. 效果评估
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      计算作弊占比，评估反作弊策略有效性
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 可视化图表 */}
              <div className="mt-6">
                <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 反作弊机制对比图
                </h4>
                <AntiCheatingChart theme={theme} />
              </div>
            </CardContent>
          </Card>

          {/* 新增：高质量数据的三大应用 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mt-8`} id="data-applications">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent' : 'bg-gradient-to-r from-purple-50 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-[#19bcc8]/30'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg shadow-purple-400/30'}`}>
                  <Rocket className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    高质量数据的三大应用场景
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    用户画像数据如何赋能业务增长
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 高质量新增
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>目标：</strong>找到价值用户聚集渠道
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>方法：</strong>对比不同渠道用户的留存率、付费率、LTV
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>案例：</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• 渠道A：7日留存45%，付费率18%</li>
                        <li>• 渠道B：7日留存25%，付费率8%</li>
                        <li>• <strong className="text-[#19bcc8]">→ 集中投放渠道A</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    📲 精准运营
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>目标：</strong>千人千面个性化推送
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>方法：</strong>基于用户标签进行分群运营
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>案例：</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• <strong>高价值沉睡用户：</strong>专属优惠召回</li>
                        <li>• <strong>新用户：</strong>新手任务引导</li>
                        <li>• <strong>活跃付费用户：</strong>会员权益推荐</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    🎨 产品设计
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>目标：</strong>基于用户画像优化产品功能
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>方法：</strong>分析核心用户特征，反哺产品迭代
                    </div>
                    <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      <strong>案例：</strong>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• 发现80%付费用户是25-35岁女性</li>
                        <li>• 优化UI风格为时尚简约风</li>
                        <li>• 增加社交分享功能</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                <strong className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 核心原则：
                </strong>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  数据不是目的，而是手段。所有数据分析都应该落地到具体的业务行动，产生可衡量的价值。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 新增：精准推送策略（何找我说/由我触发/我找有关）*/}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mt-8`} id="push-strategy">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-transparent' : 'bg-gradient-to-r from-orange-50 via-orange-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-orange-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/30'}`}>
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    精准推送策略框架
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    基于用户行为的三大触达策略
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 三大策略 */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-2xl">📢</div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        何找我说（主动触达）
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>场景：</strong>运营主动推送消息
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>触发：</strong>定时任务、批量推送
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>案例：</strong>
                        <ul className="ml-4 mt-1">
                          <li>• 每周五晚8点推送优惠券</li>
                          <li>• 新品上线全用户通知</li>
                          <li>• 周度数据报告推送</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-2xl">{getLucideIcon('⚡', 'w-5 h-5 text-[#19bcc8]')}</div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        由我触发（行为触达）
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>场景：</strong>用户行为自动触发推送
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>触发：</strong>事件驱动、实时响应
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>案例：</strong>
                        <ul className="ml-4 mt-1">
                          <li>• 加购未支付→1小时后提醒</li>
                          <li>• 连续7天未登录→召回短信</li>
                          <li>• 浏览10+商品→推荐相似商品</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-2xl">🎯</div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        我找有关（个性推荐）
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>场景：</strong>用户主动查看推荐内容
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>触发：</strong>Feed流、个性化推荐
                      </div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong>案例：</strong>
                        <ul className="ml-4 mt-1">
                          <li>• 首页推荐"猜你喜欢"</li>
                          <li>• 购物车"相关推荐"</li>
                          <li>• 看了又看/买了又买</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 运营资源盘点 */}
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-[#19bcc8]/10 border border-orange-200'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 运营资源盘点：千人千面，7~8个标签足矣
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 常见误区
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 建立100+个用户标签，但实际使用不到10个</li>
                        <li>• 标签维度过细，难以形成有效人群</li>
                        <li>• 标签更新不及时，数据陈旧</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 正确做法
                      </h5>
                      <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• <strong>精选7-8个核心标签：</strong>新老用户、活跃度、付费层级、流失风险等</li>
                        <li>• <strong>标签可组合：</strong>7-8个标签可以组合出数十种运营策略</li>
                        <li>• <strong>持续迭代：</strong>根据运营效果不断优化标签体系</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`mt-4 p-3 rounded ${theme === 'dark' ? 'bg-orange-800/30' : 'bg-orange-100'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-orange-700'}`}>
                      <strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战建议：</strong>优先建立少而精的标签体系，确保每个标签都有明确的运营动作对应。
                    </p>
                  </div>
                </div>

                {/* 推送效果评估 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 推送效果评估指标
                  </h5>
                  <div className="grid grid-cols-4 gap-4 text-center text-sm">
                    <div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>送达率</div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>实际送达/发送总数</div>
                    </div>
                    <div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>点击率</div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>点击数/送达数</div>
                    </div>
                    <div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>转化率</div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>转化数/点击数</div>
                    </div>
                    <div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>ROI</div>
                      <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>收益/成本</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 新增：不同类型产品实例 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mt-8`} id="product-types">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/30 via-indigo-800/20 to-transparent' : 'bg-gradient-to-r from-indigo-50 via-indigo-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-indigo-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg shadow-indigo-400/30'}`}>
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    不同类型产品的业务特点
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    理解产品类型，才能制定合适的数据指标
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border border-blue-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    🛒 电商APP
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>核心目标：</strong>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}> GMV增长、用户LTV最大化</span>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>核心指标：</strong>
                      <ul className={`ml-4 mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• GMV = UV × 转化率 × 客单价</li>
                        <li>• 复购率、购物篮系数</li>
                        <li>• 各环节转化率（浏览→加购→支付）</li>
                      </ul>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>关键分析：</strong>
                      <ul className={`ml-4 mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 商品维度：销量、坑位产出、动销率</li>
                        <li>• 用户维度：RFM分群、用户生命周期</li>
                        <li>• 渠道维度：各渠道ROI、引流效率</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 互联网金融toC
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>核心目标：</strong>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}> 交易量增长、风险可控</span>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>核心指标：</strong>
                      <ul className={`ml-4 mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 注册→实名→绑卡→首投 各环节转化率</li>
                        <li>• 复投率、人均投资金额</li>
                        <li>• 不良率、逾期率（风控指标）</li>
                      </ul>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>关键分析：</strong>
                      <ul className={`ml-4 mt-1 space-y-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <li>• 用户维度：风险等级、投资偏好、资产规模</li>
                        <li>• 产品维度：各产品收益率、申购赎回趋势</li>
                        <li>• 风控维度：异常交易监控、反欺诈识别</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-[#19bcc8]/10 border border-[#19bcc8]/30'}`}>
                <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 关键启示：
                </strong>
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  不同类型的产品，核心指标和分析方法差异巨大。数据分析师需要快速理解业务本质，才能建立正确的指标体系。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 新增：数据分析整体流程（9步法）*/}
          <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border-indigo-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'} shadow-2xl mt-8 border-2`} id="analysis-process">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/50 via-purple-900/30 to-transparent' : 'bg-gradient-to-r from-indigo-100 via-purple-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/40' : 'border-indigo-300'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40' : 'bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg shadow-indigo-400/40'}`}>
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
                    数据分析完整流程（9步法）
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    从需求到落地的标准化作业流程
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 9步流程 */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { step: "1", title: "明确问题", desc: "理解业务需求，定义分析目标", icon: "🎯", color: "blue" },
                    { step: "2", title: "梳理思路", desc: "建立分析框架，拆解问题维度", icon: "🌳", color: "blue" },
                    { step: "3", title: "指标拆解", desc: "确定核心指标及影响因素", icon: "📊", color: "blue" },
                    { step: "4", title: "数据采集", desc: "明确数据来源，确保数据质量", icon: "💾", color: "green" },
                    { step: "5", title: "数据处理", desc: "清洗、转换、整合数据", icon: "🔧", color: "green" },
                    { step: "6", title: "数据分析", desc: "运用分析方法挖掘insights", icon: "🔍", color: "green" },
                    { step: "7", title: "可视化呈现", desc: "制作图表，讲好数据故事", icon: "📈", color: "purple" },
                    { step: "8", title: "得出结论", desc: "提炼核心发现，给出建议", icon: "💡", color: "purple" },
                    { step: "9", title: "落地追踪", desc: "跟进执行效果，持续迭代", icon: "🔄", color: "purple" }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg ${
                      theme === 'dark' 
                        ? `bg-${item.color}-900/20 border border-${item.color}-700` 
                        : `bg-${item.color}-50 border border-${item.color}-200`
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full ${
                          item.color === 'blue' ? 'bg-[#19bcc8]/100' :
                          item.color === 'green' ? 'bg-[#19bcc8]/100' :
                          'bg-[#19bcc8]/100'
                        } text-white flex items-center justify-center font-bold text-sm`}>
                          {item.step}
                        </div>
                        <div className="text-2xl">{item.icon}</div>
                      </div>
                      <h5 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {item.title}
                      </h5>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 三大阶段 */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 准备阶段（步骤1-3）
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>关键：</strong>理解业务需求，建立分析框架。<br/>
                      <strong>产出：</strong>分析方案文档、指标体系
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      🔬 执行阶段（步骤4-6）
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>关键：</strong>数据质量、分析方法选择。<br/>
                      <strong>产出：</strong>清洗后的数据、分析结果
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border-l-4 border-[#19bcc8]' : 'bg-[#19bcc8]/10 border-l-4 border-[#19bcc8]'}`}>
                    <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                      � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 交付阶段（步骤7-9）
                    </h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <strong>关键：</strong>清晰表达、可落地建议。<br/>
                      <strong>产出：</strong>分析报告、行动方案
                    </p>
                  </div>
                </div>

                {/* 常见问题 */}
                <div className={`mt-6 p-5 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                  <h5 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                    ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 常见问题与避坑指南
                  </h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>问题1：需求不清晰</strong>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong className="text-red-500">×</strong> 接到需求立刻动手做<br/>
                        <strong className="text-[#19bcc8]">✓</strong> 先与需求方深入沟通，明确分析目的
                      </p>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>问题2：数据质量差</strong>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong className="text-red-500">×</strong> 直接使用原始数据<br/>
                        <strong className="text-[#19bcc8]">✓</strong> 先做数据质量检查和清洗
                      </p>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>问题3：分析太浅</strong>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong className="text-red-500">×</strong> 只做简单的汇总统计<br/>
                        <strong className="text-[#19bcc8]">✓</strong> 多维拆解，找到深层原因
                      </p>
                    </div>
                    <div>
                      <strong className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>问题4：结论不落地</strong>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        <strong className="text-red-500">×</strong> 只给结论不给建议<br/>
                        <strong className="text-[#19bcc8]">✓</strong> 提供可执行的行动方案
                      </p>
                    </div>
                  </div>
                </div>

                {/* 进阶提示 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-[#19bcc8]/10 border border-indigo-200'}`}>
                  <strong className={theme === 'dark' ? 'text-[#19bcc8]' : 'text-indigo-700'}>
                    💎 进阶建议：
                  </strong>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    1. 建立自己的分析模板库，提高效率<br/>
                    2. 每次分析都写复盘，沉淀方法论<br/>
                    3. 主动追踪建议的执行效果，形成闭环<br/>
                    4. 与业务方保持紧密沟通，理解业务变化
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </section>

        {/* 分隔符 */}
        <div className="flex justify-center items-center gap-2 my-16">
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
        </div>

        {/* 第四层：工具方法 */}
        <section id="tool-methods" className="mb-12 scroll-mt-24">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-700/30' : 'bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200'}`}>
            {/* 优化后的大标题 */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/50' : 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-400/50'}`}>
                  <Zap className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    4
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    LAYER 04 · 怎么落地
                  </div>
                  <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400'}`}>
                    工具方法层：七大思维武器
                  </h2>
                </div>
              </div>
              <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-orange-500 via-orange-400 to-transparent' : 'bg-gradient-to-r from-orange-500 via-orange-300 to-transparent'}`}></div>
            </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🌳",
                name: "结构化思维",
                desc: "树形拆解，先分后量",
                example: "收入 = 客单价 × 付费人数",
                tool: "Xmind 思维导图"
              },
              {
                icon: "🧮",
                name: "公式化思维",
                desc: "加减乘除+漏斗",
                example: "转化率 = 下游环节 / 上游环节",
                tool: "Excel/SQL"
              },
              {
                icon: "🏢",
                name: "业务化思维",
                desc: "现场走查→问题清单",
                example: "重庆步行配送分析",
                tool: "访谈、观察"
              },
              {
                icon: "📊",
                name: "对比法",
                desc: "自身/竞品/时间/空间",
                example: "本周 vs 上周、我司 vs 竞品",
                tool: "同比/环比"
              },
              {
                icon: "🎯",
                name: "多维法",
                desc: "象限、交叉、RFM",
                example: "用户价值×流失风险 4象限",
                tool: "RFM分群"
              },
              {
                icon: "🔄",
                name: "闭环法",
                desc: "PDCA指标生命周期",
                example: "需求→口径→落地→复盘→下线",
                tool: "迭代管理"
              },
              {
                icon: "🎨",
                name: "主成分法",
                desc: "PCA降维→综合指数",
                example: "内容指数 = 0.4×点赞 + 0.3×评论 + 0.3×收藏",
                tool: "Python sklearn"
              }
            ].map((method, idx) => (
              <Card key={idx} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {method.name}
                      </h3>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {method.desc}
                      </p>
                      <div className={`p-3 rounded mb-2 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`text-xs font-mono ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                          示例：{method.example}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        工具：{method.tool}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 3大画图工具 */}
          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mt-8 shadow-lg`} id="drawing-tools">
            <CardHeader className={`pb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-900/30 via-pink-800/20 to-transparent' : 'bg-gradient-to-r from-pink-50 via-pink-100/50 to-transparent'} rounded-t-lg border-b-2 ${theme === 'dark' ? 'border-[#19bcc8]/30' : 'border-pink-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30' : 'bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg shadow-pink-400/30'}`}>
                  <Palette className="h-7 w-7 text-white" />
                </div>
                <div>
                  <CardTitle className={`text-2xl font-bold ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                    三大画图工具
                  </CardTitle>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    让分析思路可视化，沟通更高效
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 工具1：思维导图 */}
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-[#19bcc8]/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">🌳</div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        1. 思维导图工具（Xmind / ProcessOn / MindMaster）
                      </h4>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>核心用途：</strong>业务拆解、指标体系搭建、问题诊断树
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-white'}`}>
                          <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            📌 典型应用场景
                          </h5>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• <strong>指标拆解：</strong>GMV = UV × 转化率 × 客单价</li>
                            <li>• <strong>问题诊断：</strong>用户流失 → 多维度原因树</li>
                            <li>• <strong>业务梳理：</strong>电商业务全链路流程图</li>
                            <li>• <strong>知识体系：</strong>数据分析技能树/学习路径</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-white'}`}>
                          <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战技巧
                          </h5>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• 用 MECE 原则保证不重不漏</li>
                            <li>• 主干用业务语言，分支加数据指标</li>
                            <li>• 颜色编码：红色=问题，绿色=机会，蓝色=现状</li>
                            <li>• 控制层级：建议不超过5层，便于理解</li>
                          </ul>
                        </div>
                      </div>

                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                          <strong>推荐组合：</strong>Xmind（桌面版专业）+ ProcessOn（在线协作）+ MindMaster（快速草图）
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 工具2：流程图/架构图 */}
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700' : 'bg-gradient-to-br from-green-50 to-green-100/50 border border-[#19bcc8]/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">📐</div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        2. 流程图/架构图工具（Draw.io / PPT / Visio）
                      </h4>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>核心用途：</strong>业务流程图、数据架构图、用户路径图
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-white'}`}>
                          <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            📌 典型应用场景
                          </h5>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• <strong>业务流程：</strong>订单全流程（下单→支付→配送→收货）</li>
                            <li>• <strong>用户路径：</strong>注册激活→首购→复购转化路径</li>
                            <li>• <strong>数据架构：</strong>数据采集→清洗→建模→应用全链路</li>
                            <li>• <strong>决策树：</strong>if-else逻辑图（推荐算法/风控规则）</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-white'}`}>
                          <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战技巧
                          </h5>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• 用泳道图区分不同部门/系统的职责</li>
                            <li>• 关键节点标注数据埋点位置</li>
                            <li>• 用不同形状区分：矩形=动作，菱形=判断</li>
                            <li>• 流程瓶颈用红色高亮，提升点用绿色</li>
                          </ul>
                        </div>
                      </div>

                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                          <strong>推荐组合：</strong>Draw.io（免费开源）+ PPT（汇报美化）+ Visio（企业标准）
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 工具3：数据可视化编程 */}
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700' : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border border-[#19bcc8]/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">📊</div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#19bcc8]'}`}>
                        3. 数据可视化编程（Python: pandas + pyecharts / matplotlib）
                      </h4>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>核心用途：</strong>批量图表生成、交互式可视化、自动化报告
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-white'}`}>
                          <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            📌 典型应用场景
                          </h5>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• <strong>批量绘图：</strong>一键生成100个SKU的销售趋势图</li>
                            <li>• <strong>交互大屏：</strong>运营数据实时监控看板</li>
                            <li>• <strong>自动报告：</strong>每日/每周数据报告自动生成+发送</li>
                            <li>• <strong>复杂图表：</strong>桑基图、漏斗图、热力图等高级图表</li>
                          </ul>
                        </div>
                        <div className={`p-4 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-white'}`}>
                          <h5 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                            � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战技巧
                          </h5>
                          <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li>• pyecharts：交互式图表，适合大屏展示</li>
                            <li>• matplotlib/seaborn：学术风格，适合报告</li>
                            <li>• plotly：在线分享，适合跨团队协作</li>
                            <li>• 封装成函数，一行代码生成标准图表</li>
                          </ul>
                        </div>
                      </div>

                      <div className={`p-3 rounded ${theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                          <strong>推荐组合：</strong>pandas（数据处理）+ pyecharts（交互图表）+ matplotlib（静态图表）
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 工具对比总结 */}
                <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                    � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 工具选择建议
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                      <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        💭 思考阶段
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        用思维导图梳理思路、拆解问题
                      </p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                      <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 沟通阶段
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        用流程图/架构图对齐业务逻辑
                      </p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-[#19bcc8]/20' : 'bg-[#19bcc8]/10'}`}>
                      <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-[#19bcc8]' : 'text-[#17a8b4]'}`}>
                        � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 执行阶段
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        用Python批量生成图表、自动化报告
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          </div>
        </section>

        {/* 分隔符 */}
        <div className="flex justify-center items-center gap-2 my-16">
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
          <div className="w-2 h-2 rounded-full bg-[#19bcc8]"></div>
        </div>

        {/* 第五层：管理迭代 */}
        <section id="management-iteration" className="mb-12 scroll-mt-24">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-700/30' : 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200'}`}>
            {/* 优化后的大标题 */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative p-4 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50' : 'bg-gradient-to-br from-red-400 to-red-500 shadow-lg shadow-red-400/50'}`}>
                  <Repeat className="h-12 w-12 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    5
                  </div>
                </div>
                <div>
                  <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    LAYER 05 · 怎么持续
                  </div>
                  <h2 className={`text-5xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400'}`}>
                    管理迭代层：指标生命周期
                  </h2>
                </div>
              </div>
              <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-gradient-to-r from-red-500 via-red-400 to-transparent' : 'bg-gradient-to-r from-red-500 via-red-300 to-transparent'}`}></div>
            </div>

          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: "需求提出", icon: "💡", output: "需求单" },
                  { step: "定义口径", icon: "📝", output: "口径说明书" },
                  { step: "数据落地", icon: "⚙️", output: "SQL脚本" },
                  { step: "报表呈现", icon: "📊", output: "Dashboard" },
                  { step: "复盘优化", icon: "🔍", output: "复盘报告" },
                  { step: "指标下线", icon: "🗑️", output: "下线邮件" }
                ].map((phase, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <div className={`text-4xl mb-2 p-4 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {phase.icon}
                      </div>
                      <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {phase.step}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {phase.output}
                      </Badge>
                    </div>
                    {idx < 5 && (
                      <ArrowRight className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Card className={`${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-[#19bcc8]/10 border-[#19bcc8]/30'} border-2`}>
                <CardHeader>
                  <CardTitle className="text-lg">复盘四问表（PDCA闭环）</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-[#19bcc8]">
                        1. 指标达标？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        目标 vs 实际
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-red-500">
                        2. 未达标根因？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        拆解分析
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-[#19bcc8]">
                        3. 策略调整？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        优化方案
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-[#19bcc8]">
                        4. 下一步指标？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        迭代目标
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
          </div>
        </section>

        {/* 学习路径 */}
        <section className="mb-16">
          <div className={`mb-8 p-6 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-transparent border-2 border-[#19bcc8]/30' : 'bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent border-2 border-[#19bcc8]/30'}`}>
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40' : 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-400/40'}`}>
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600'}`}>
                  � {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 三周快速上手路线<span className={`ml-3 text-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>（新人版）</span>
                </h2>
                <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  从零基础到上手业务分析的实战路径
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 第1周 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-shadow`}>
              <CardHeader className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-lg px-4 py-1 bg-[#19bcc8]/100">
                    第1周
                  </Badge>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    3h × 5天
                  </span>
                </div>
                <CardTitle className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                  理论基础
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  背熟30个原子指标+会画文字漏斗
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  学习任务：
                </h4>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">每天背6个核心指标</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">手绘AARRR漏斗图</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">制作指标卡片</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">理解好指标5大铁律</span>
                  </li>
                </ul>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                  <div className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    交付物：
                  </div>
                  <div className="text-sm font-semibold text-[#19bcc8]">
                    30个指标卡片 + 手绘漏斗
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 第2周 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-shadow`}>
              <CardHeader className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-lg px-4 py-1 bg-[#19bcc8]/100">
                    第2周
                  </Badge>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    4h × 5天
                  </span>
                </div>
                <CardTitle className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                  实战分析
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  选1个常用App做指标体系分析
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  学习任务：
                </h4>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">选择分析对象（淘宝/抖音/美团等）</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">识别业务模型</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">拆解核心指标</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">制作10页PPT报告</span>
                  </li>
                </ul>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                  <div className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    交付物：
                  </div>
                  <div className="text-sm font-semibold text-[#19bcc8]">
                    《XX App指标体系》PPT 10页
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 第3周 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-shadow`}>
              <CardHeader className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-lg px-4 py-1 bg-[#19bcc8]/100">
                    第3周
                  </Badge>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    4h × 5天
                  </span>
                </div>
                <CardTitle className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                  技术落地
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  落地SQL+Python自动化
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  学习任务：
                </h4>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">编写SQL拉数脚本</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">用Pandas清洗数据</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">用pyecharts画漏斗</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#19bcc8]" />
                    <span className="text-sm">搭建自动化Dashboard</span>
                  </li>
                </ul>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-[#19bcc8]/10'}`}>
                  <div className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    交付物：
                  </div>
                  <div className="text-sm font-semibold text-[#19bcc8]">
                    自动拉数脚本 + 可视化Dashboard
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA 区域 */}
        <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-[#19bcc8]/30'} border-2`}>
          <CardContent className="p-12 text-center">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              准备好开始实践了吗？
            </h2>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              业务知识是数据分析的基石，从理解业务到建立指标体系，从经典模型到实战落地
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                  <BookOpen className="mr-2 h-5 w-5" />
                  返回学习地图
                </Button>
              </Link>
              <Link href="/business/practice">
                <Button variant="outline" className="text-lg px-8 py-6">
                  进入业务题库
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
          </div>
          {/* 右侧主内容区结束 */}
        </div>
        {/* 整体布局结束 */}
      </div>
    </div>

    {/* 返回顶部按钮 */}
    {showScrollTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-[#19bcc8] hover:bg-[#17a8b4] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="返回顶部"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    )}
    </>
  )
}
