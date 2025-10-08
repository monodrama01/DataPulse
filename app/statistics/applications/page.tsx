"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function StatisticsApplicationsPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>5. 统计学在数据分析中的应用</span>
            </div>
            <Link href="/statistics" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>5. 统计学在数据分析中的应用</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>应用1：用户消费行为分析</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>集中趋势+离散程度+相关性+回归综合分析。</p>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>应用2：A/B 测试分析</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>双样本 t 检验与置信区间评估转化率差异是否显著。</p>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>应用3：市场调研分析</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>分层抽样、比例置信区间与卡方检验分析关联性。</p>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>代码示例</h2>
            <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 space-y-4`}>
              <div>
                <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>SQL 示例：月度销量与Top商品</h3>
                <pre className={`text-xs overflow-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{`SELECT DATE_FORMAT(order_date,'%Y-%m') AS month,
       product_id,
       SUM(quantity) AS monthly_qty
FROM order_items
GROUP BY month, product_id
ORDER BY month, monthly_qty DESC;`}</pre>
              </div>
              <div>
                <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Excel 示例：区间计数</h3>
                <pre className={`text-xs overflow-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{`=COUNTIFS($B:$B,">=100",$B:$B,"<200")  
=AVERAGEIF($C:$C,"VIP",$D:$D)`}</pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}



