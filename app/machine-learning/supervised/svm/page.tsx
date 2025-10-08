"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"
// 移除可编辑组件，保持静态内容

// 左侧导航数据 - SVM的子章节
const svmNavigation = [
  { 
    id: "classification", 
    title: "1.4.1. 分类",
    isActive: true,
    subsections: []
  },
  { id: "regression", title: "1.4.2. 回归", subsections: [] },
  { id: "density-estimation", title: "1.4.3. 密度估计，异常值检测", subsections: [] },
  { id: "complexity", title: "1.4.4. 复杂度", subsections: [] },
  { id: "tips", title: "1.4.5. 实用建议", subsections: [] }
]

// 右侧目录内容
const tableOfContents = [
  { id: "overview", title: "支持向量机概述" },
  { id: "classification", title: "1.4.1. 分类" },
  { id: "regression", title: "1.4.2. 回归" },
  { id: "density", title: "1.4.3. 密度估计，异常值检测" },
  { id: "complexity", title: "1.4.4. 复杂度" },
  { id: "tips", title: "1.4.5. 实用建议" }
]

export default function SVMPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("classification")
  const [expandedNavItems, setExpandedNavItems] = useState<string[]>(["classification"])
  
  const toggleNavExpansion = (id: string) => {
    setExpandedNavItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

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
                支持向量机
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* 左侧导航栏 */}
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  支持向量机
                </h2>
                <Link href="/machine-learning/supervised" className="text-blue-600 hover:text-blue-700">
                  <ChevronUp size={20} />
                </Link>
              </div>
              
              <nav className="space-y-1">
                {svmNavigation.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => {
                        setActiveSection(section.id)
                        if (section.subsections && section.subsections.length > 0) {
                          toggleNavExpansion(section.id)
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between p-2 rounded-lg transition-colors text-left
                        ${activeSection === section.id 
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                          : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
                        }
                      `}
                    >
                      <span className="text-sm font-medium">{section.title}</span>
                      {section.subsections && section.subsections.length > 0 && (
                        expandedNavItems.includes(section.id) ? 
                        <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* 主要内容区 */}
          <div className="lg:col-span-3">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
              {/* 页面标题和概述 */}
              <div className="mb-8">
                <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  支持向量机 (SVM)
                </h1>
                
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                  支持向量机是一种强大的监督学习算法，可用于分类和回归任务。核心思想是找到一个最优的决策边界（超平面），使不同类别的数据点以最大间隔被分开。
                </p>
                
                {/* 核心概念 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} my-6`}>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    🎯 核心思想
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    在数据点之间找到一条"最佳分界线"，这条线离两类数据都尽可能远，从而获得最好的分类效果。
                  </p>
                </div>
              </div>

              {/* 1.4.1 分类 */}
              <section id="classification" className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 text-blue-600 flex items-center`}>
                  1.4.1. 分类
                  <span className="ml-2 text-blue-400">#</span>
                </h2>
                
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                  SVM分类器通过构建一个或多个超平面来分离不同的类别。在scikit-learn中，主要有三个SVM分类器：
                </p>

                {/* SVM分类器介绍 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                      SVC
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      标准的SVM分类器，适合中小型数据集
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                      NuSVC
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      使用nu参数控制支持向量数量的SVM
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                      LinearSVC
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      专门用于线性核的SVM，速度更快
                    </p>
                  </div>
                </div>

                {/* 代码示例 - 动态内容 */}
                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    💻 代码示例
                  </h3>
                  
                  <pre className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} p-4 rounded-lg overflow-x-auto text-sm`}>
<code>{`from sklearn import svm
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
import numpy as np

# 创建示例数据
X, y = make_classification(n_samples=1000, n_features=4,
                         n_redundant=0, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42)

# 创建SVM分类器（RBF核）
clf = svm.SVC(kernel='rbf')
clf.fit(X_train, y_train)

# 预测与评估
pred = clf.predict(X_test)
acc = clf.score(X_test, y_test)
print(f"准确率: {acc:.3f}")
`}</code>
                  </pre>
                </div>

                {/* 核函数介绍 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'} mb-8`}>
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    🔧 核函数选择
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        常用核函数：
                      </h5>
                      <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>• <code>linear</code>: 线性核，适合线性可分数据</li>
                        <li>• <code>rbf</code>: 径向基函数核（默认），适合大多数情况</li>
                        <li>• <code>poly</code>: 多项式核，适合特定的非线性关系</li>
                        <li>• <code>sigmoid</code>: Sigmoid核，类似神经网络</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        选择建议：
                      </h5>
                      <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>• 数据线性可分 → linear</li>
                        <li>• 特征数量很多 → linear</li>
                        <li>• 数据复杂、非线性 → rbf</li>
                        <li>• 不确定时先试rbf</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SVM性能对比图表 - 可编辑 */}
                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    📊 不同核函数性能对比
                  </h3>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    本节为静态展示：不同核函数（linear/poly/rbf/sigmoid）的交叉验证得分比较。需要生成动态图表请在 Notes 中编辑。
                  </div>
                </div>

                {/* 优缺点分析 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                      ✅ 优点
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "在高维空间中表现出色",
                        "内存使用效率高（只存储支持向量）", 
                        "核函数灵活，适应各种数据类型",
                        "对异常值相对不敏感"
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
                        "训练时间长，不适合大数据集",
                        "对特征缩放敏感",
                        "不直接提供概率估计",
                        "参数调优相对复杂"
                      ].map((point, index) => (
                        <li key={index} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 底部导航 */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft className="mr-2" size={16} />
                    上一节：核岭回归
                  </Button>
                  <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                    下一节：随机梯度下降
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </div>
              </section>
            </div>
          </div>

          {/* 右侧目录锚点 */}
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24`}>
              <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                本页内容
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    className={`block text-sm ${theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} hover:underline`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              
              {/* 学习提示 */}
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  💡 学习建议
                </h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  SVM是强大但复杂的算法。建议先理解线性SVM，再学习核函数的概念。实践中多试试不同的核函数和参数。
                </p>
              </div>
              
              {/* 下载按钮 */}
              <div className="mt-4">
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  下载示例代码
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 已移除：管理员工具栏与可拖动管理面板 */}
    </div>
  )
}
