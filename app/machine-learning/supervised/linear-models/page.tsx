"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

// 左侧导航数据 - 线性模型的子章节（根据官方文档简化）
const linearModelsNavigation = [
  { 
    id: "ordinary-least-squares", 
    title: "1.1.1. 普通最小二乘法",
    isActive: true,
    subsections: [
      "1.1.1.1. 非负最小二乘法",
      "1.1.1.2. 普通最小二乘复杂度"
    ]
  },
  { id: "ridge-regression", title: "1.1.2. 岭回归和分类" },
  { id: "lasso", title: "1.1.3. 套索" },
  { id: "multi-task-lasso", title: "1.1.4. 多任务套索" },
  { id: "elastic-net", title: "1.1.5. 弹性网络" },
  { id: "multi-task-elastic", title: "1.1.6. 多任务弹性网络" },
  { id: "least-angle", title: "1.1.7. 最小角回归" },
  { id: "lars-lasso", title: "1.1.8. LARS 套索" },
  { id: "omp", title: "1.1.9. 正交匹配追踪（OMP）" },
  { id: "bayesian", title: "1.1.10. 贝叶斯回归" },
  { id: "logistic", title: "1.1.11. 逻辑回归" },
  { id: "generalized", title: "1.1.12. 广义线性模型" },
  { id: "sgd-regression", title: "1.1.13. 随机梯度下降 - SGD" },
  { id: "perceptron", title: "1.1.14. 感知器" },
  { id: "passive-aggressive", title: "1.1.15. 被动攻击算法" }
]

// 右侧目录内容
const tableOfContents = [
  { id: "overview", title: "1.1.1. 普通最小二乘法" },
  { id: "non-negative", title: "1.1.1.1. 非负最小二乘法" },
  { id: "complexity", title: "1.1.1.2. 普通最小二乘复杂度" },
  { id: "ridge", title: "1.1.2. 岭回归和分类" },
  { id: "lasso-section", title: "1.1.3. 套索" },
  { id: "multi-task", title: "1.1.4. 多任务套索" },
  { id: "elastic", title: "1.1.5. 弹性网络" },
  { id: "multi-elastic", title: "1.1.6. 多任务弹性网络" },
  { id: "lars", title: "1.1.7. 最小角回归" },
  { id: "lars-lasso-section", title: "1.1.8. LARS 套索" },
  { id: "omp-section", title: "1.1.9. 正交匹配追踪（OMP）" },
  { id: "bayesian-section", title: "1.1.10. 贝叶斯回归" },
  { id: "logistic-section", title: "1.1.11. 逻辑回归" },
  { id: "generalized-section", title: "1.1.12. 广义线性模型" },
  { id: "sgd-section", title: "1.1.13. 随机梯度下降 - SGD" },
  { id: "perceptron-section", title: "1.1.14. 感知器" },
  { id: "passive-section", title: "1.1.15. 被动攻击算法" }
]

export default function LinearModelsPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("ordinary-least-squares")
  const [expandedNavItems, setExpandedNavItems] = useState<string[]>(["ordinary-least-squares"])
  
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
                1.1.线性模型
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
                  1.1. 线性模型
                </h2>
                <Link href="/machine-learning/supervised" className="text-blue-600 hover:text-blue-700">
                  <ChevronUp size={20} />
                </Link>
              </div>
              
              <nav className="space-y-1">
                {linearModelsNavigation.map((section) => (
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
                    
                    {/* 子章节 */}
                    {section.subsections && section.subsections.length > 0 && expandedNavItems.includes(section.id) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.subsections.map((subsection, index) => (
                          <button
                            key={index}
                            className={`
                              w-full text-left p-2 rounded text-sm
                              ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'}
                            `}
                          >
                            {subsection}
                          </button>
                        ))}
                      </div>
                    )}
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
                  1.1.线性模型
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                  线性模型是机器学习中最基础且重要的算法家族。它们假设目标值（我们想预测的结果）是输入特征的线性组合。简单来说，就是用一条直线（或高维空间中的超平面）来拟合数据。
                </p>
                
                {/* 数学公式 - 简化解释 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} my-6`}>
                  <div className="text-center">
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      预测公式（简化理解）：
                    </p>
                    <code className={`text-lg ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      预测值 = 截距 + 特征1×权重1 + 特征2×权重2 + ...
                    </code>
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      数学表达式：ŷ(w, x) = w₀ + w₁x₁ + ... + wₚxₚ
                    </p>
                  </div>
                </div>
                
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                  其中，<span className="text-purple-600 font-mono">w₀</span> 是截距（起始点），<span className="text-purple-600 font-mono">w₁, w₂...</span> 是权重（表示每个特征的重要性），<span className="text-purple-600 font-mono">x₁, x₂...</span> 是输入特征。
                </p>
              </div>

              {/* 1.1.1 普通最小二乘法 */}
              <section id="ordinary-least-squares" className="mb-12">
                <h2 className={`text-2xl font-bold mb-6 text-blue-600 flex items-center`}>
                  1.1.1.普通最小二乘法
                  <span className="ml-2 text-blue-400">#</span>
                </h2>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} mb-6`}>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    🎯 核心思想
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    找到一条最佳直线，使得所有数据点到这条直线的距离平方和最小。就像在散点图中画一条"最合适"的直线。
                  </p>
                </div>

                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                  <span className="text-blue-600 font-mono">LinearRegression</span> 是 scikit-learn 中最基础的线性回归模型。它通过最小化"预测值与真实值的差距"来找到最佳的权重参数。
                </p>

                {/* 简化的数学解释 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} my-6`}>
                  <h4 className={`text-md font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    🧮 优化目标（用人话说）：
                  </h4>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    找到权重 w，使得"所有预测误差的平方和"最小
                  </p>
                  <div className="text-center">
                    <code className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      最小化：∑(真实值 - 预测值)²
                    </code>
                  </div>
                </div>

                {/* 代码示例 - 简化注释 */}
                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    💻 代码示例（新手友好版）
                  </h3>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                    <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      <code>{`# 导入必要的库
from sklearn.linear_model import LinearRegression
import numpy as np

# 准备训练数据（房屋面积 vs 房价的例子）
# X: 房屋特征 [面积, 房间数]
X = np.array([[50, 1],   # 50平米，1室
              [80, 2],   # 80平米，2室  
              [120, 3],  # 120平米，3室
              [150, 4]]) # 150平米，4室

# y: 对应的房价（万元）
y = np.array([100, 150, 200, 250])

# 创建并训练模型
model = LinearRegression()
model.fit(X, y)  # 让模型学习数据规律

# 查看模型学到的参数
print(f"权重（每个特征的重要性）: {model.coef_}")
print(f"截距（基础价格）: {model.intercept_}")

# 预测新房子的价格
new_house = [[100, 2]]  # 100平米，2室
predicted_price = model.predict(new_house)
print(f"预测房价: {predicted_price[0]:.1f}万元")`}</code>
                    </pre>
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
                        "计算速度快，适合大数据",
                        "结果易于理解和解释", 
                        "不需要调参数",
                        "有数学理论保证"
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
                        "只能处理线性关系",
                        "对异常值很敏感",
                        "特征间不能高度相关",
                        "可能出现过拟合"
                      ].map((point, index) => (
                        <li key={index} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 应用场景 */}
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'} mb-8`}>
                  <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    🎯 适用场景
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        推荐使用：
                      </h5>
                      <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>• 房价预测（面积、位置等特征）</li>
                        <li>• 销量预测（广告投入、季节等）</li>
                        <li>• 成绩预测（学习时间、基础等）</li>
                        <li>• 作为其他模型的基准对比</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        不推荐使用：
                      </h5>
                      <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>• 图像识别（非线性关系）</li>
                        <li>• 股价预测（噪声太大）</li>
                        <li>• 数据有很多异常值时</li>
                        <li>• 特征间高度相关时</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 底部导航 */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft className="mr-2" size={16} />
                    上一节
                  </Button>
                  <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                    下一节：岭回归
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
                {tableOfContents.slice(0, 8).map((item) => (
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
                  线性模型是机器学习的基础。建议先掌握普通最小二乘法，再学习正则化方法（岭回归、Lasso）。
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
    </div>
  )
}