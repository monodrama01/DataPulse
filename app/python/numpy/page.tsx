"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function NumpyPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>2. NumPy</span>
            </div>
            <Link href="/python" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>2. NumPy</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link href="/python/numpy/ndarray-create" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>创建 ndarray</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>array / arange / zeros / ones / linspace</p>
          </Link>
          <Link href="/python/numpy/ndarray-slice" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>切片与索引</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>切片 / 布尔索引 / 花式索引</p>
          </Link>
          <Link href="/python/numpy/broadcast" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>广播机制</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>末尾维度对齐、1 可扩展</p>
          </Link>
          <Link href="/python/numpy/math-functions" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>常用数学函数</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>sum / mean / std / dot + axis</p>
          </Link>
          <Link href="/python/numpy/shape-reshape" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>形状与变形</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>reshape / newaxis</p>
          </Link>
          <Link href="/python/numpy/linalg" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>线性代数基础</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>dot / norm / svd / inv</p>
          </Link>
          <Link href="/python/numpy/random" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>随机与复现</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>生成器与 seed</p>
          </Link>
          <Link href="/python/numpy/performance" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>性能与内存</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>向量化 / 视图与拷贝</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


