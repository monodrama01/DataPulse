"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function DatasetLoadingPage() {
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
                数据集加载工具
              </span>
            </div>
            <Link href="/machine-learning" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <ArrowLeft size={16} />
              <span>返回</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          数据集加载工具
        </h1>
        
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
          
          {/* 概述 */}
          <div className="mb-8">
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
              scikit-learn提供了丰富的数据集加载工具，包括经典的机器学习数据集、用于测试的玩具数据集，以及生成各种类型数据的工具。这些数据集是学习和测试机器学习算法的绝佳资源。
            </p>
            
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} my-6`}>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                🎯 为什么使用内置数据集？
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                内置数据集让你可以快速开始机器学习实验，无需寻找和清理数据，专注于算法学习和模型调优。
              </p>
            </div>
          </div>

          {/* 玩具数据集 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              7.2. 玩具数据集
            </h2>
            
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              小型、简单的数据集，非常适合学习和快速测试算法。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* 鸢尾花数据集 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  鸢尾花数据集 (Iris)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  经典的分类数据集，包含3种鸢尾花的4个特征
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 150个样本，3个类别</li>
                    <li>• 4个数值特征</li>
                    <li>• 类别平衡，无缺失值</li>
                    <li>• 适合分类算法学习</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.datasets import load_iris

# 加载鸢尾花数据集
iris = load_iris()
X, y = iris.data, iris.target

print(f"数据形状: {X.shape}")
print(f"类别: {iris.target_names}")
print(f"特征: {iris.feature_names}")`}</code>
                  </pre>
                </div>
              </div>

              {/* 波士顿房价数据集 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                  波士顿房价 (Boston)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  经典的回归数据集，预测波士顿地区房价
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 506个样本</li>
                    <li>• 13个特征（犯罪率、房龄等）</li>
                    <li>• 连续目标值（房价）</li>
                    <li>• 适合回归算法学习</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.datasets import load_boston

# 加载波士顿房价数据集
boston = load_boston()
X, y = boston.data, boston.target

print(f"数据形状: {X.shape}")
print(f"房价范围: {y.min():.1f} - {y.max():.1f}")
print(f"平均房价: {y.mean():.1f}")`}</code>
                  </pre>
                </div>
              </div>

              {/* 手写数字数据集 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                  手写数字 (Digits)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  8x8像素的手写数字图像，用于图像分类
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 1797个样本，10个类别（0-9）</li>
                    <li>• 64个特征（8x8像素）</li>
                    <li>• 图像数据</li>
                    <li>• 适合图像分类学习</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.datasets import load_digits
import matplotlib.pyplot as plt

# 加载手写数字数据集
digits = load_digits()
X, y = digits.data, digits.target

print(f"数据形状: {X.shape}")
print(f"图像形状: {digits.images[0].shape}")

# 显示第一个数字
plt.imshow(digits.images[0], cmap='gray')
plt.title(f"数字: {y[0]}")`}</code>
                  </pre>
                </div>
              </div>

              {/* 乳腺癌数据集 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  乳腺癌 (Breast Cancer)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  二分类医学数据集，预测肿瘤良恶性
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 569个样本，2个类别</li>
                    <li>• 30个特征（细胞核特征）</li>
                    <li>• 真实医学数据</li>
                    <li>• 适合二分类学习</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.datasets import load_breast_cancer

# 加载乳腺癌数据集
cancer = load_breast_cancer()
X, y = cancer.data, cancer.target

print(f"数据形状: {X.shape}")
print(f"类别: {cancer.target_names}")
print(f"良性: {sum(y)}, 恶性: {len(y) - sum(y)}")`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* 生成数据集 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              7.4. 生成的数据集
            </h2>
            
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              根据需要生成各种特性的合成数据集，用于测试和验证算法。
            </p>

            <div className="space-y-6">
              {/* 分类数据生成 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-teal-900/20' : 'bg-teal-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
                  分类数据生成
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      make_classification
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      生成多类分类数据集
                    </p>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                      <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        <code>{`from sklearn.datasets import make_classification

# 生成分类数据
X, y = make_classification(
    n_samples=1000,     # 样本数
    n_features=20,      # 特征数  
    n_classes=3,        # 类别数
    n_redundant=0,      # 冗余特征数
    random_state=42
)

print(f"数据形状: {X.shape}")
print(f"类别分布: {np.bincount(y)}")`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      make_blobs
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      生成高斯混合的聚类数据
                    </p>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                      <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        <code>{`from sklearn.datasets import make_blobs

# 生成聚类数据
X, y = make_blobs(
    n_samples=300,      # 样本数
    centers=4,          # 聚类中心数
    n_features=2,       # 特征数
    cluster_std=0.60,   # 标准差
    random_state=0
)

print(f"数据形状: {X.shape}")
print(f"聚类中心数: {len(set(y))}")`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* 回归数据生成 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  回归数据生成
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      make_regression
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      生成回归数据集
                    </p>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                      <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        <code>{`from sklearn.datasets import make_regression

# 生成回归数据
X, y = make_regression(
    n_samples=100,      # 样本数
    n_features=1,       # 特征数
    noise=10,           # 噪声水平
    random_state=42
)

print(f"数据形状: {X.shape}")
print(f"目标值范围: {y.min():.1f} - {y.max():.1f}")`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      make_friedman1
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                      Friedman #1 回归问题
                    </p>
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                      <pre className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        <code>{`from sklearn.datasets import make_friedman1

# 生成Friedman回归数据
X, y = make_friedman1(
    n_samples=100,      # 样本数
    n_features=10,      # 特征数（只有前5个有用）
    noise=0.1,          # 噪声水平
    random_state=42
)

print(f"数据形状: {X.shape}")
print(f"有效特征: 前5个特征")`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 使用建议 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              数据集选择指南
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  🎯 学习阶段选择：
                </h4>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• <strong>初学者</strong>: iris, digits（简单清晰）</li>
                  <li>• <strong>分类学习</strong>: breast_cancer, wine</li>
                  <li>• <strong>回归学习</strong>: boston, california_housing</li>
                  <li>• <strong>聚类学习</strong>: make_blobs生成数据</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  ⚙️ 测试场景选择：
                </h4>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• <strong>算法验证</strong>: 生成已知特性的数据</li>
                  <li>• <strong>性能测试</strong>: 控制数据大小和复杂度</li>
                  <li>• <strong>边界情况</strong>: 生成极端情况数据</li>
                  <li>• <strong>可视化演示</strong>: 2D数据（make_blobs）</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 底部导航 */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2" size={16} />
              上一节：数据集转换
            </Button>
            <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
              下一节：计算性能
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
