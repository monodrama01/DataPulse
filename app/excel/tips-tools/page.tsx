"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function ExcelTipsToolsPage() {
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
              <Link href="/excel" className="text-blue-600 hover:text-blue-700 font-medium">EXCEL 模块</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>7. 常见技巧与工具</span>
            </div>
            <Link href="/excel" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>7. 常见技巧与工具</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>常见技巧</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>数据透视表：多维汇总，支持动态更新。</li>
              <li>条件格式：用色阶、数据条突出数据。</li>
              <li>数据验证：限制输入，避免无效数据。</li>
              <li>分列：拆分合并文本为多列。</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>常用工具</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>筛选与排序，冻结窗格，快捷键（Ctrl+F/H/Shift+L）。</li>
              <li>合并计算、图表向导、错误检查。</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}



