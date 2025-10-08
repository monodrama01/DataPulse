"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function StatisticsCorrelationRegressionPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>4. 相关性与回归分析</span>
            </div>
            <Link href="/statistics" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>4. 相关性与回归分析</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>相关性分析</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>皮尔逊、 斯皮尔曼、 肯德尔相关系数</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>回归分析</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>一元/多元线性回归，非线性回归</li>
              <li>模型评估：R²、 残差分析</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>可视化示例</h2>
            <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`}>
              <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>散点图 + 最小二乘回归线</h3>
              <div className="text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}">示例：广告投入与销售额关系</div>
              <div className="w-full h-72 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">ECharts Scatter + Line 占位</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}



