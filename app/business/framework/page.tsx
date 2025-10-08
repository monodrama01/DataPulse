"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function BusinessFrameworkPage() {
  const { theme } = useTheme()
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"><Home size={20} /><span className="font-medium">主页</span></Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <Link href="/business" className="text-blue-600 hover:text-blue-700 font-medium">业务模块</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>3. 指标与框架</span>
            </div>
            <Link href="/business" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>3. 指标与框架</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>怎么生成指标</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              先明确业务目标（如“提升新用户付费”），再拆解影响目标的核心因素（如“首单优惠感知度、支付便捷性”），最后将因素转化为可量化的指标（如“首单优惠使用率、支付完成率”）。
            </p>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>如何建立业务分析框架</h2>
            <ol className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-decimal pl-6 space-y-2`}>
              <li>确定业务场景（如拉新、促活、留存）。</li>
              <li>筛选核心指标（如留存：7日留存率、留存用户活跃频次）。</li>
              <li>明确指标维度（时间维度、用户维度等）。</li>
              <li>设定指标基准（行业平均、历史同期等）。</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}



