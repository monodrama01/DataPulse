"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function AlgorithmsPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>6. 数据建模与算法</span>
            </div>
            <Link href="/python" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>6. 数据建模与算法</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Link href="/python/algorithms/lr" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>逻辑回归</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>二分类与正则化</p>
          </Link>
          <Link href="/python/algorithms/tree" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>决策树</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>熵/基尼系数与剪枝</p>
          </Link>
          <Link href="/python/algorithms/rf" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>随机森林</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>装袋与特征子采样</p>
          </Link>
          <Link href="/python/algorithms/svm" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>支持向量机</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>最大间隔与核技巧</p>
          </Link>
          <Link href="/python/algorithms/nn" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>神经网络入门</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Keras Sequential 示例</p>
          </Link>
          <Link href="/python/algorithms/kmeans" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>K-Means 聚类</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>聚类算法与轮廓系数</p>
          </Link>
          <Link href="/python/algorithms/dbscan" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>DBSCAN 密度聚类</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>基于密度的聚类方法</p>
          </Link>
          <Link href="/python/algorithms/apriori" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Apriori 关联规则</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>频繁项集与置信度</p>
          </Link>
          <Link href="/python/algorithms/arima" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>ARIMA 时间序列</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>差分/自相关/偏自相关</p>
          </Link>
          <Link href="/python/algorithms/metrics" className={`${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-blue-50'} rounded-lg shadow-sm p-6 transition-colors`}>
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>模型评估指标</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>混淆矩阵 / ROC / F1</p>
          </Link>
        </div>
      </div>
    </div>
  )
}


