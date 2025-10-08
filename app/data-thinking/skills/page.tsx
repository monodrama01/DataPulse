"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

const skills = [
  { t: '象限法', d: '通过二维象限对数据进行分类分析，明确优先级' },
  { t: '多维法', d: '从多个维度拆解数据，全面洞察问题' },
  { t: '假设法', d: '先提出假设，再通过数据验证假设的合理性' },
  { t: '指数法', d: '构建自定义指数，综合多指标反映业务特征' },
  { t: '二八法', d: '聚焦关键的20%因素，抓住核心问题' },
  { t: '对比法', d: '横向、纵向对比，发现差异与规律' },
  { t: '漏斗法', d: '分析流程各环节转化，定位流失点' },
  { t: '细分法', d: '精细化拆分数据，挖掘整体下的局部特征' },
  { t: '相关思维', d: '探究变量相关性，发现潜在影响关系' }
]

export default function SkillsThinkingPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>3. 思维技巧</span>
            </div>
            <Link href="/data-thinking" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>3. 思维技巧</h1>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {skills.map((it) => (
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


