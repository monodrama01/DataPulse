"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function PandasPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>3. Pandas</span>
            </div>
            <Link href="/python" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>3. Pandas</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link href="/python/pandas/series" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Series 基础</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>一维标签数组与对齐机制</p>
          </Link>
          <Link href="/python/pandas/dataframe" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>DataFrame 基础</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>二维表结构、列选择与增删</p>
          </Link>
          <Link href="/python/pandas/read-write" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>读写数据</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>read_csv / read_excel / read_sql</p>
          </Link>
          <Link href="/python/pandas/clean-missing" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>缺失值处理</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>isnull / dropna / fillna / interpolate</p>
          </Link>
          <Link href="/python/pandas/clean-duplicate" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>重复值处理</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>duplicated / drop_duplicates</p>
          </Link>
          <Link href="/python/pandas/select-filter" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>选择与过滤</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>loc / iloc / 条件掩码</p>
          </Link>
          <Link href="/python/pandas/groupby-agg" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>分组与聚合</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>groupby + agg/apply/transform</p>
          </Link>
          <Link href="/python/pandas/merge-join" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>合并与连接</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>merge 三兄弟（inner/outer/left）</p>
          </Link>
          <Link href="/python/pandas/pivot-cross" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>透视与交叉表</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>pivot_table / crosstab</p>
          </Link>
          <Link href="/python/pandas/time-series" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>时间序列</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>to_datetime / resample / rolling / shift</p>
          </Link>
          <Link href="/python/pandas/performance" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>性能优化</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>eval/query 与 Copy-on-Write</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


