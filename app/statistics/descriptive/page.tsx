"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function StatisticsDescriptivePage() {
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
              <Link href="/statistics" className="text-blue-600 hover:text-blue-700 font-medium">统计学</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>2. 描述统计学</span>
            </div>
            <Link href="/statistics" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>2. 描述统计学</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>集中趋势</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>均值、 中位数、 众数</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>离散程度</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>极差、 方差/标准差、 四分位数与 IQR</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>分布形态与图表</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>偏态、 峰态</li>
              <li>箱线图、 直方图</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>可视化示例</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>直方图（年龄分布）</h3>
                <div className="text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}">示例：展示用户年龄的频数分布</div>
                <div className="w-full h-64 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">ECharts Histogram 占位</div>
              </div>
              <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
                <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>箱线图（地区对比）</h3>
                <div className="text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}">示例：不同地区消费箱线图对比</div>
                <div className="w-full h-64 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">ECharts BoxPlot 占位</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}



