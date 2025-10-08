"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function PracticeThinkingPage() {
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
              <Link href="/data-thinking" className="text-blue-600 hover:text-blue-700 font-medium">数据分析思维</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>4. 思维锻炼</span>
            </div>
            <Link href="/data-thinking" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>4. 思维锻炼</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>如何在业务实践中锻炼</h2>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} space-y-2 list-disc pl-6`}>
            <li>任何结论先写假设，再列验证方案与可用数据</li>
            <li>每周做一个“小型闭环”：提假设 → 拉数 → 出结论 → 业务反馈 → 复盘</li>
            <li>把日常指标表达为“公式”，找关键因子并做敏感性分析</li>
            <li>多做对比：时间对比、群体对比、渠道对比、AB对比</li>
            <li>把重要问题画成“结构图/漏斗图/象限图”，训练结构化表达</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


