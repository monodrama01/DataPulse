"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function BusinessImportancePage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>1. 业务重要性</span>
            </div>
            <Link href="/business" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>1. 业务重要性</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-4`}>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>为什么业务重要</h2>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
            <li>业务是数据分析的“根”，脱离业务场景的数据分析只是数字堆砌。</li>
            <li>贴合业务逻辑，才能让分析结论转化为实际决策，解决业务痛点、推动增长。</li>
          </ul>
          <h2 className={`text-xl font-semibold pt-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>业务与数据的关系</h2>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
            <li>数据是业务的“镜子”，客观反映业务现状（如用户流失、销售额波动）。</li>
            <li>业务是数据的“方向标”，决定分析选题、指标设计与结论落地路径。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}



