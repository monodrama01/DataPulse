"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

// 无监督学习的子目录
const unsupervisedNavigation = [
  {
    id: "gaussian-mixture",
    title: "2.1. 高斯混合模型",
    isActive: true,
    href: "/machine-learning/unsupervised/gaussian-mixture"
  },
  {
    id: "manifold",
    title: "2.2. 流形学习",
    href: "/machine-learning/unsupervised/manifold"
  },
  {
    id: "clustering",
    title: "2.3. 聚类",
    href: "/machine-learning/unsupervised/clustering"
  },
  {
    id: "biclustering",
    title: "2.4. 双聚类",
    href: "/machine-learning/unsupervised/biclustering"
  },
  {
    id: "decomposition",
    title: "2.5. 信号分解成各个分量（矩阵分解问题）",
    href: "/machine-learning/unsupervised/decomposition"
  },
  {
    id: "covariance",
    title: "2.6. 协方差估计",
    href: "/machine-learning/unsupervised/covariance"
  },
  {
    id: "novelty-detection",
    title: "2.7. 新颖性和异常值检测",
    href: "/machine-learning/unsupervised/novelty-detection"
  },
  {
    id: "density",
    title: "2.8. 密度估计",
    href: "/machine-learning/unsupervised/density"
  },
  {
    id: "neural-networks",
    title: "2.9. 神经网络模型（无监督）",
    href: "/machine-learning/unsupervised/neural-networks"
  }
]

// 右侧内容 - 高斯混合模型的详细章节
const gaussianMixtureContent = {
  title: "2.1. 高斯混合模型",
  sections: [
    { id: "gaussian-mixture-intro", title: "2.1.1. 高斯混合", href: "/machine-learning/unsupervised/gaussian-mixture#intro" },
    { id: "variational-bayesian", title: "2.1.2. 变分贝叶斯高斯混合", href: "/machine-learning/unsupervised/gaussian-mixture#variational-bayesian" }
  ]
}

export default function UnsupervisedPage() {
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
                无监督学习
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
          无监督学习
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 左侧导航栏 */}
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  无监督学习
                </h2>
                <Link href="/machine-learning" className="text-blue-600 hover:text-blue-700">
                  <ChevronUp size={20} />
                </Link>
              </div>
              
              <nav className="space-y-1">
                {unsupervisedNavigation.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      block p-3 rounded-lg transition-colors
                      ${item.isActive 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                        : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
                      }
                    `}
                  >
                    <span className="font-medium text-sm">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="lg:col-span-3">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8`}>
              <h2 className={`text-3xl font-bold mb-8 text-blue-600`}>
                {gaussianMixtureContent.title}
              </h2>
              
              {/* 章节链接列表 */}
              <div className="space-y-3">
                {gaussianMixtureContent.sections.map((section) => (
                  <Link
                    key={section.id}
                    href={section.href}
                    className={`
                      block p-4 rounded-lg border transition-colors
                      ${theme === 'dark' 
                        ? 'border-gray-600 hover:bg-gray-700 text-blue-400 hover:text-blue-300' 
                        : 'border-gray-200 hover:bg-blue-50 text-blue-600 hover:text-blue-700'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{section.title}</span>
                      <ChevronRight size={20} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
