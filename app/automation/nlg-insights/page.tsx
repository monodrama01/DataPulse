"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function NLGInsightsPage() {
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
              <Link href="/automation" className="text-blue-600 hover:text-blue-700 font-medium">自动化脚本</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>3.1 智能文本解读</span>
            </div>
            <Link href="/automation" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>智能文本解读</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-4`}>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
            <li>自动洞察：趋势/异常/同比环比/排行</li>
            <li>NLG：模板/规则/ML/大模型</li>
            <li>多语言与个性化：术语词典、受众/行业定制</li>
            <li>工具：SimpleNLG、spacy、基于GPT的生成</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


