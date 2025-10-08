"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function StatisticsInferencePage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>3. 推断统计学</span>
            </div>
            <Link href="/statistics" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>3. 推断统计学</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>抽样方法</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>简单随机、 分层抽样、 整群抽样</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>参数估计</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>点估计与区间估计（置信区间）</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>假设检验</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>Z / t / 卡方 检验，p 值与显著性水平</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>公式示例</h2>
            <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'} rounded border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
{`均值置信区间（已知总体方差或 n 大）：
  \[ \bar{x} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}} \]

均值置信区间（未知总体方差，使用 t 分布）：
  \[ \bar{x} \pm t_{\alpha/2,\,n-1} \cdot \frac{s}{\sqrt{n}} \]

双样本 t 检验（独立样本、方差齐性）：
  \[ t = \frac{\bar{x}_1-\bar{x}_2}{s_p \sqrt{\frac{1}{n_1}+\frac{1}{n_2}}},\ \ s_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2} \]`}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}



