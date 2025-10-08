"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function ClusteringPage() {
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
              <Link href="/machine-learning/unsupervised" className="text-blue-600 hover:text-blue-700 font-medium">
                无监督学习
              </Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>
                聚类
              </span>
            </div>
            <Link href="/machine-learning/unsupervised" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
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
              聚类算法
            </h1>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-4`}>
              聚类是无监督学习的重要分支，目标是将相似的数据点分组到同一个簇中，不同簇之间的数据点差异较大。聚类不需要预先知道数据的标签，完全依据数据的内在结构进行分组。
            </p>
            
            {/* 核心概念 */}
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'} my-6`}>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                🎯 核心思想
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                "物以类聚，人以群分" - 将相似的数据点归为一类，发现数据中隐藏的群体结构。
              </p>
            </div>
          </div>

          {/* 主要聚类算法 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              主要聚类算法
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* K-Means */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  K-Means 聚类
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  最经典的聚类算法，将数据分为K个球形簇
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 需要预先指定簇数K</li>
                    <li>• 适合球形、大小相近的簇</li>
                    <li>• 计算效率高</li>
                    <li>• 对初始中心敏感</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.cluster import KMeans
import numpy as np

# 创建示例数据
X = np.random.rand(100, 2)

# K-Means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)

print(f"簇中心: {kmeans.cluster_centers_}")
print(f"标签: {labels[:10]}")`}</code>
                  </pre>
                </div>
              </div>

              {/* DBSCAN */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                  DBSCAN 聚类
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  基于密度的聚类算法，能发现任意形状的簇
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 无需预先指定簇数</li>
                    <li>• 能发现任意形状的簇</li>
                    <li>• 能识别噪声点</li>
                    <li>• 对参数敏感</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.cluster import DBSCAN
import numpy as np

# 创建示例数据
X = np.random.rand(100, 2)

# DBSCAN聚类
dbscan = DBSCAN(eps=0.1, min_samples=5)
labels = dbscan.fit_predict(X)

print(f"簇数: {len(set(labels)) - (1 if -1 in labels else 0)}")
print(f"噪声点数: {list(labels).count(-1)}")`}</code>
                  </pre>
                </div>
              </div>

              {/* 层次聚类 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                  层次聚类 (AgglomerativeClustering)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  构建层次化的簇结构，生成树状图
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 生成层次化结构</li>
                    <li>• 无需预先指定簇数</li>
                    <li>• 结果确定性</li>
                    <li>• 计算复杂度较高</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.cluster import AgglomerativeClustering
import numpy as np

# 创建示例数据
X = np.random.rand(50, 2)

# 层次聚类
agg = AgglomerativeClustering(n_clusters=3)
labels = agg.fit_predict(X)

print(f"聚类标签: {labels}")`}</code>
                  </pre>
                </div>
              </div>

              {/* 高斯混合模型 */}
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  高斯混合模型 (GMM)
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  基于概率的聚类方法，假设数据来自多个高斯分布
                </p>
                <div className="mb-4">
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>特点：</h4>
                  <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• 提供概率估计</li>
                    <li>• 能处理椭圆形簇</li>
                    <li>• 支持软聚类</li>
                    <li>• 需要指定组件数</li>
                  </ul>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                  <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    <code>{`from sklearn.mixture import GaussianMixture
import numpy as np

# 创建示例数据
X = np.random.rand(100, 2)

# 高斯混合模型
gmm = GaussianMixture(n_components=3)
labels = gmm.fit_predict(X)

# 获取概率
proba = gmm.predict_proba(X)
print(f"前5个样本的概率: {proba[:5]}")`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* 聚类评估 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              聚类效果评估
            </h2>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    📊 内在评估指标：
                  </h4>
                  <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• <strong>轮廓系数 (Silhouette Score)</strong>: 衡量簇内紧密度和簇间分离度</li>
                    <li>• <strong>Calinski-Harabasz指数</strong>: 基于簇内外方差比</li>
                    <li>• <strong>Davies-Bouldin指数</strong>: 簇内距离与簇间距离的比值</li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    🎯 外在评估指标：
                  </h4>
                  <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• <strong>调整兰德指数 (ARI)</strong>: 与真实标签的一致性</li>
                    <li>• <strong>归一化互信息 (NMI)</strong>: 信息论角度的相似性</li>
                    <li>• <strong>V-measure</strong>: 完整性和同质性的调和平均</li>
                  </ul>
                </div>
              </div>
              
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} overflow-x-auto`}>
                <pre className={`text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  <code>{`from sklearn.metrics import silhouette_score, adjusted_rand_score
from sklearn.cluster import KMeans
import numpy as np

# 示例数据和聚类
X = np.random.rand(100, 2)
kmeans = KMeans(n_clusters=3)
labels = kmeans.fit_predict(X)

# 计算轮廓系数
silhouette = silhouette_score(X, labels)
print(f"轮廓系数: {silhouette:.3f}")

# 如果有真实标签
# true_labels = [...]  # 真实标签
# ari = adjusted_rand_score(true_labels, labels)
# print(f"调整兰德指数: {ari:.3f}")`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* 实用建议 */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
              算法选择指南
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                  🎯 选择建议：
                </h4>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• <strong>K-Means</strong>: 簇数已知，球形簇</li>
                  <li>• <strong>DBSCAN</strong>: 簇数未知，任意形状</li>
                  <li>• <strong>层次聚类</strong>: 需要层次结构</li>
                  <li>• <strong>GMM</strong>: 需要概率，椭圆形簇</li>
                </ul>
              </div>
              
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                  ⚙️ 调参技巧：
                </h4>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>• 使用肘部法则确定K值</li>
                  <li>• 标准化数据特征</li>
                  <li>• 尝试不同的距离度量</li>
                  <li>• 使用多种评估指标</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 底部导航 */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2" size={16} />
              上一节：流形学习
            </Button>
            <Button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white">
              下一节：双聚类
              <ChevronRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
