"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

const items = [
  { t: '结构化', d: '将复杂问题拆解为可管理的模块，明确各模块间的逻辑关系' },
  { t: '公式化', d: '把业务问题转化为可量化的公式，通过数据计算推导结论' },
  { t: '业务化', d: '以业务目标为导向，确保数据分析结论能落地指导业务决策' },
  { t: '迭代化', d: '根据业务反馈持续优化分析思路与方法，形成闭环' },
  { t: '证伪思维', d: '通过数据验证假设，勇于否定错误假设以接近真相' }
]

export default function CoreThinkingPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>2. 核心思维</span>
            </div>
            <Link href="/data-thinking" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>2. 核心思维</h1>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {items.map((it) => (
            <div key={it.t} className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{it.t}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


