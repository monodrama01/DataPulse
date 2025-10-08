"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function MatplotlibPage() {
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
              <Link href="/python" className="text-blue-600 hover:text-blue-700 font-medium">Python</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>4. Matplotlib</span>
            </div>
            <Link href="/python" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>4. Matplotlib</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link href="/python/matplotlib/figure-axis" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Figure 与 Axes</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Figure/Axes/Spines/Ticks</p>
          </Link>
          <Link href="/python/matplotlib/plot-line" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>折线图</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>color / linestyle / marker</p>
          </Link>
          <Link href="/python/matplotlib/scatter" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>散点图</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>s / c / cmap 映射</p>
          </Link>
          <Link href="/python/matplotlib/bar" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>柱状图</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>堆叠/横向/误差线</p>
          </Link>
          <Link href="/python/matplotlib/hist" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>直方图</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>bins 选择与密度</p>
          </Link>
          <Link href="/python/matplotlib/pie" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>饼图</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>autopct / startangle</p>
          </Link>
          <Link href="/python/matplotlib/subplot" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>子图与布局</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>subplot / GridSpec</p>
          </Link>
          <Link href="/python/matplotlib/style-beautify" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>风格与美化</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>rcParams / Seaborn</p>
          </Link>
          <Link href="/python/matplotlib/chinese-display" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>中文显示</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>font_manager 指定字体</p>
          </Link>
          <Link href="/python/matplotlib/save-export" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>导出图像</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>savefig / dpi / bbox_inches</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


