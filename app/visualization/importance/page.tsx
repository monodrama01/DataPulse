"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function VizImportancePage() {
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
              <Link href="/visualization" className="text-blue-600 hover:text-blue-700 font-medium">数据可视化</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>1. 数据可视化重要性</span>
            </div>
            <Link href="/visualization" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>1. 数据可视化重要性</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-6 lg:col-span-2`}>
            <h2 className="text-xl font-semibold mb-4">为什么必须做可视化？</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>提升理解速度：图形化后可在数秒定位趋势/异常/对比关系。</li>
              <li>降低沟通成本：跨职能团队用统一视觉语言达成共识。</li>
              <li>支撑决策闭环：指标 → 诊断 → 行动 → 复盘的可量化呈现。</li>
              <li>发现隐藏模式：相关性、周期性、分布差异更易被识别。</li>
            </ul>
            <div className={`mt-6 rounded-lg p-4 ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
              <p className="text-sm">
                实践建议：明确“受众-场景-结论先行”，再选择图表与布局；统一色板、字号与间距，保证读者无需解释即可读懂。
              </p>
            </div>
          </div>

          <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <h3 className="font-semibold mb-3">典型价值</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>报告制作效率</span><span className="text-green-600">↑ 3x</span></div>
              <div className="flex justify-between"><span>问题定位时间</span><span className="text-green-600">↓ 60%</span></div>
              <div className="flex justify-between"><span>决策一致性</span><span className="text-green-600">↑</span></div>
              <div className="flex justify-between"><span>跨部门沟通成本</span><span className="text-green-600">↓</span></div>
            </div>
          </div>
        </div>

        {/* 快速入门链接 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/visualization/chart-types" className={`block rounded-lg p-4 border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
            <div className="font-semibold mb-1">图表类型与场景</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>选对图表，信息更清晰</div>
          </Link>
          <Link href="/visualization/tools" className={`block rounded-lg p-4 border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
            <div className="font-semibold mb-1">主流工具与实操</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Excel/BI/Python/ECharts</div>
          </Link>
          <Link href="/showcases/visualization" className={`block rounded-lg p-4 border ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
            <div className="font-semibold mb-1">案例演示</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>看板与交互联动</div>
          </Link>
        </div>
      </div>
    </div>
  )
}


