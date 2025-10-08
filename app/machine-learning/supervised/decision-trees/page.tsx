"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

export default function DecisionTreesPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* 顶部导航栏 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <Link href="/machine-learning" className="text-blue-600 hover:text-blue-700 font-medium">
                机器学习
              </Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <Link href="/machine-learning/supervised" className="text-blue-600 hover:text-blue-700 font-medium">
                监督学习
              </Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>
                决策树
              </span>
            </div>
            <Link href="/machine-learning/supervised" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <ArrowLeft size={16} />
              <span>返回上一页</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          {/* 页面标题和概述 */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              决策树
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
              决策树是一种简单易懂的机器学习算法，通过一系列if-then规则来进行分类或回归。它的结构类似于流程图，每个内部节点表示一个特征上的测试，每个分支代表一个测试结果，而每个叶节点代表一个类别。
            </p>
            
            {/* 核心概念 */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} my-6`}>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                🌳 核心思想
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                像医生诊断疾病一样，通过一系列问题（特征判断）来逐步缩小范围，最终得出结论（分类结果）。
              </p>
            </div>
          </div>

          {/* 决策树类型 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              决策树类型
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  分类树 (DecisionTreeClassifier)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  用于分类任务，预测离散的类别标签
                </p>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris

# 加载数据
iris = load_iris()
X, y = iris.data, iris.target

# 创建分类树
clf = DecisionTreeClassifier(random_state=42)
clf.fit(X, y)

# 预测
predictions = clf.predict([[5.1, 3.5, 1.4, 0.2]])
print(f"预测类别: {predictions[0]}")`}</code>
                  </pre>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                  回归树 (DecisionTreeRegressor)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  用于回归任务，预测连续的数值
                </p>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.tree import DecisionTreeRegressor
from sklearn.datasets import load_boston

# 加载数据
boston = load_boston()
X, y = boston.data, boston.target

# 创建回归树
regr = DecisionTreeRegressor(random_state=42)
regr.fit(X, y)

# 预测
prediction = regr.predict([[0.1, 20, 5, 0, 0.5, 6, 80, 2, 1, 300, 15, 400, 10]])
print(f"预测房价: {prediction[0]:.2f}")`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* 重要参数 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              重要参数
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  防止过拟合参数：
                </h4>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• <code>max_depth</code>: 树的最大深度</li>
                  <li>• <code>min_samples_split</code>: 分割节点的最少样本数</li>
                  <li>• <code>min_samples_leaf</code>: 叶节点的最少样本数</li>
                  <li>• <code>max_features</code>: 每次分割考虑的最大特征数</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  分割标准：
                </h4>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• <code>criterion='gini'</code>: 基尼不纯度（分类默认）</li>
                  <li>• <code>criterion='entropy'</code>: 信息熵（分类）</li>
                  <li>• <code>criterion='mse'</code>: 均方误差（回归默认）</li>
                  <li>• <code>criterion='mae'</code>: 平均绝对误差（回归）</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 优缺点 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              优缺点分析
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  ✅ 优点
                </h4>
                <ul className="space-y-2">
                  {[
                    "易于理解和解释，可视化直观",
                    "不需要数据预处理（缩放、中心化）", 
                    "能处理数值型和类别型特征",
                    "能处理缺失值",
                    "训练速度快"
                  ].map((point, index) => (
                    <li key={index} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  ⚠️ 缺点
                </h4>
                <ul className="space-y-2">
                  {[
                    "容易过拟合，泛化能力差",
                    "对训练数据小的变化敏感",
                    "难以处理线性关系",
                    "偏向于选择有更多水平的特征",
                    "单个决策树准确性有限"
                  ].map((point, index) => (
                    <li key={index} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 实用建议 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              实用建议
            </h2>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                    🎯 适用场景：
                  </h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 需要模型可解释性的场景</li>
                    <li>• 数据包含类别型特征</li>
                    <li>• 特征选择和重要性分析</li>
                    <li>• 作为集成学习的基学习器</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                    ⚙️ 调参建议：
                  </h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 先设置max_depth=3-10</li>
                    <li>• min_samples_split=10-100</li>
                    <li>• 使用交叉验证选择参数</li>
                    <li>• 考虑使用随机森林替代单个树</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 底部导航 */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2" size={16} />
              上一节：朴素贝叶斯
            </Button>
            <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
              下一节：集成方法
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
