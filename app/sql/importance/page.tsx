"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function SQLImportancePage() {
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
              <Link href="/sql" className="text-blue-600 hover:text-blue-700 font-medium">SQL</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>1. SQL重要性</span>
            </div>
            <Link href="/sql" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>1. SQL重要性</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-4`}>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>为什么要学习SQL</h2>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
            <li>数据提取与处理的核心语言，高效操作数据库，快速筛选与汇总海量数据。</li>
            <li>帮助从“小数据”迈向“大数据”，支撑真实业务场景的数据需求。</li>
          </ul>
          <h2 className={`text-xl font-semibold pt-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>在数据分析中的定位</h2>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
            <li>数据获取第一道关口，直接从库中提取原始数据，减少依赖导出。</li>
            <li>支持清洗、聚合计算，为 Excel / Python 深度分析提供高质量数据源。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}



