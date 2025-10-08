"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function AnomalyDetectionCleaningPage() {
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
              <Link href="/automation" className="text-blue-600 hover:text-blue-700 font-medium">自动化脚本</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>1.1 异常值自动检测与处理</span>
            </div>
            <Link href="/automation" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>异常值自动检测与处理</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-4`}>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>内容要点</h2>
          <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
            <li>什么是异常值：如年龄为-5岁、工资为负数等</li>
            <li>检测方法：IQR、Z-score、孤立森林</li>
            <li>处理策略：删除、替换、标记</li>
            <li>Python实现：pandas、numpy、sklearn 模板</li>
            <li>案例：销售数据异常订单检测</li>
          </ul>
          <pre className={`${theme === 'dark' ? 'bg-gray-900/60 text-gray-100' : 'bg-gray-50 text-gray-800'} p-4 rounded overflow-x-auto`}>
<code>{`# IQR 法
import pandas as pd
Q1, Q3 = df[col].quantile(0.25), df[col].quantile(0.75)
IQR = Q3 - Q1
mask = (df[col] < Q1 - 1.5*IQR) | (df[col] > Q3 + 1.5*IQR)
df.loc[mask, col] = df[col].median()

# Z-score 法
import numpy as np
z = (df[col] - df[col].mean()) / df[col].std()
df.loc[np.abs(z) > 3, col] = df[col].median()

# 孤立森林
from sklearn.ensemble import IsolationForest
iso = IsolationForest(random_state=42)
df['is_outlier'] = iso.fit_predict(df[[col]]) == -1`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}


