"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

// 数据预处理导航数据
const preprocessingNavigation = [
  { id: "standardization", title: "6.1. 标准化", isActive: true },
  { id: "normalization", title: "6.2. 归一化", isActive: false },
  { id: "encoding", title: "6.3. 类别编码", isActive: false },
  { id: "discretization", title: "6.4. 离散化", isActive: false },
  { id: "imputation", title: "6.5. 缺失值处理", isActive: false },
  { id: "feature-generation", title: "6.6. 特征生成", isActive: false }
]

export default function DataPreprocessingPage() {
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>
                数据预处理
              </span>
            </div>
            <Link href="/machine-learning" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <ArrowLeft size={16} />
              <span>返回</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 主标题 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          数据预处理
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 左侧导航栏 */}
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  数据预处理
                </h2>
                <Link href="/machine-learning" className="text-blue-600 hover:text-blue-700">
                  <ChevronUp size={20} />
                </Link>
              </div>
              
              <nav className="space-y-1">
                {preprocessingNavigation.map((section) => (
                  <div
                    key={section.id}
                    className={`
                      p-3 rounded-lg transition-colors
                      ${section.isActive 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                        : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
                      }
                    `}
                  >
                    <span className="font-medium text-sm">{section.title}</span>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="lg:col-span-3">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
              
              {/* 概述 */}
              <div className="mb-8">
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
                  数据预处理是机器学习流程中的关键步骤，好的数据预处理往往比复杂的算法更重要。scikit-learn提供了丰富的数据预处理工具，帮助我们将原始数据转换为适合机器学习算法的格式。
                </p>
                
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} my-6`}>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    🎯 为什么需要数据预处理？
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    原始数据往往存在量纲不同、缺失值、异常值等问题，直接使用可能导致模型性能差。预处理让数据"整齐划一"，算法才能发挥最佳效果。
                  </p>
                </div>
              </div>

              {/* 主要预处理方法 */}
              <div className="space-y-12">
                
                {/* 标准化 */}
                <section id="standardization">
                  <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
                    6.1. 标准化 (Standardization)
                  </h2>
                  
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    将数据转换为均值为0，标准差为1的分布，消除不同特征之间量纲的影响。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                        StandardScaler
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        标准的Z-score标准化：(x - μ) / σ
                      </p>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                        <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <code>{`from sklearn.preprocessing import StandardScaler
import numpy as np

X = [[0, 0], [0, 0], [1, 1], [1, 1]]
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
print(X_scaled)`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                        RobustScaler
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        使用中位数和四分位距，对异常值更鲁棒
                      </p>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                        <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <code>{`from sklearn.preprocessing import RobustScaler

X = [[1, -1, 2], [2, 0, 0], [0, 1, -1]]
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X)
print(X_scaled)`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 归一化 */}
                <section id="normalization">
                  <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
                    6.2. 归一化 (Normalization)
                  </h2>
                  
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    将数据缩放到指定范围，通常是[0,1]或[-1,1]。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                        MinMaxScaler
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        线性缩放到[0,1]范围：(x - min) / (max - min)
                      </p>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                        <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <code>{`from sklearn.preprocessing import MinMaxScaler

X = [[-1, 2], [-0.5, 6], [0, 10], [1, 18]]
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)
print(X_scaled)  # 所有值在[0,1]之间`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                        MaxAbsScaler
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        按最大绝对值缩放，保持稀疏性
                      </p>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                        <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <code>{`from sklearn.preprocessing import MaxAbsScaler

X = [[1, -1, 2], [2, 0, 0], [0, 1, -1]]
scaler = MaxAbsScaler()
X_scaled = scaler.fit_transform(X)
print(X_scaled)  # 值在[-1,1]之间`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 类别编码 */}
                <section id="encoding">
                  <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
                    6.3. 类别编码
                  </h2>
                  
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    将类别型数据转换为数值型数据，让算法能够处理。
                  </p>

                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                      <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                        独热编码 (OneHotEncoder)
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        将类别变量转换为二进制向量，适用于无序类别
                      </p>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                        <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <code>{`from sklearn.preprocessing import OneHotEncoder
import numpy as np

# 类别数据：颜色
X = [['红色'], ['蓝色'], ['绿色'], ['红色']]
encoder = OneHotEncoder()
X_encoded = encoder.fit_transform(X).toarray()

print("原始数据:", X)
print("编码后:")
print(X_encoded)
# [[0 0 1]  # 红色
#  [1 0 0]  # 蓝色  
#  [0 1 0]  # 绿色
#  [0 0 1]] # 红色`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'}`}>
                      <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                        标签编码 (LabelEncoder)
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                        将类别转换为整数，适用于有序类别或目标变量
                      </p>
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                        <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          <code>{`from sklearn.preprocessing import LabelEncoder

# 尺寸数据（有序）
sizes = ['小', '中', '大', '小', '大']
encoder = LabelEncoder()
encoded_sizes = encoder.fit_transform(sizes)

print("原始:", sizes)
print("编码:", encoded_sizes)  # [2 1 0 2 0]
print("类别:", encoder.classes_)  # ['大' '中' '小']`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 缺失值处理 */}
                <section id="imputation">
                  <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
                    6.5. 缺失值处理
                  </h2>
                  
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    处理数据中的缺失值，避免因为缺失数据导致的问题。
                  </p>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50'}`}>
                    <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
                      SimpleImputer - 简单填充
                    </h4>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                      <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        <code>{`from sklearn.impute import SimpleImputer
import numpy as np

# 含有缺失值的数据
X = [[1, 2], [np.nan, 3], [7, 6]]

# 用均值填充
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)
print("均值填充:", X_imputed)

# 用中位数填充
imputer_median = SimpleImputer(strategy='median')
X_median = imputer_median.fit_transform(X)
print("中位数填充:", X_median)

# 用最频繁值填充
imputer_mode = SimpleImputer(strategy='most_frequent')
X_mode = imputer_mode.fit_transform([['a', 'x'], [np.nan, 'y'], ['a', 'y']])
print("众数填充:", X_mode)`}</code>
                      </pre>
                    </div>
                  </div>
                </section>
              </div>

              {/* 实用建议 */}
              <section className="mt-12">
                <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
                  预处理流程建议
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                      📋 预处理步骤：
                    </h4>
                    <ol className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>1. 处理缺失值</li>
                      <li>2. 处理异常值</li>
                      <li>3. 编码类别变量</li>
                      <li>4. 特征缩放</li>
                      <li>5. 特征选择/生成</li>
                    </ol>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                      ⚡ 使用Pipeline：
                    </h4>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                      <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        <code>{`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression

# 创建预处理管道
pipeline = Pipeline([
    ('imputer', SimpleImputer()),
    ('scaler', StandardScaler()),
    ('classifier', LogisticRegression())
])

# 一步完成训练
pipeline.fit(X_train, y_train)`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* 底部导航 */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                <Button variant="outline" className="flex items-center">
                  <ArrowLeft className="mr-2" size={16} />
                  上一节：可视化
                </Button>
                <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
                  下一节：数据集加载
                  <ChevronRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
