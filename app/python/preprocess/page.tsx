"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function PreprocessPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>5. 数据预处理</span>
            </div>
            <Link href="/python" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>5. 数据预处理</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link href="/python/preprocess/quality-check" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>质量体检</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>缺失率 / 箱型图 / Z-score</p>
          </Link>
          <Link href="/python/preprocess/missing-handle" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>缺失值处理</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>dropna / fillna / interpolate / lagrange</p>
          </Link>
          <Link href="/python/preprocess/outlier-handle" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>异常值处理</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>删除 / 替换 / 视为缺失</p>
          </Link>
          <Link href="/python/preprocess/duplicate-handle" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>重复值处理</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>duplicated / drop_duplicates</p>
          </Link>
          <Link href="/python/preprocess/normalize" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>归一化与标准化</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>MinMax / Z-score / Decimal</p>
          </Link>
          <Link href="/python/preprocess/discretize" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>数值离散化</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>cut / qcut / KMeans</p>
          </Link>
          <Link href="/python/preprocess/feature-construct" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>特征构造</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>线性组合 / 比率 / 时间差</p>
          </Link>
          <Link href="/python/preprocess/feature-reduce" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>特征降维</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>PCA / 相关系数 / RFE</p>
          </Link>
          <Link href="/python/preprocess/sampling" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>抽样策略</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>随机 / 分层 / 聚类抽样</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


