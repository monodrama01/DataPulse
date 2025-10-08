"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

// 左侧导航数据 - 监督学习的完整子目录
const supervisedNavigation = [
  {
    id: "linear-models", 
    title: "1.1. 线性模型",
    isActive: true,
    href: "/machine-learning/supervised/linear-models"
  },
  {
    id: "linear-discriminant",
    title: "1.2. 线性和二次判别分析",
    href: "/machine-learning/supervised/linear-discriminant"
  },
  {
    id: "kernel-ridge",
    title: "1.3. 核岭回归", 
    href: "/machine-learning/supervised/kernel-ridge"
  },
  {
    id: "svm",
    title: "1.4. 支持向量机",
    href: "/machine-learning/supervised/svm"
  },
  {
    id: "sgd",
    title: "1.5. 随机梯度下降",
    href: "/machine-learning/supervised/sgd"
  },
  {
    id: "neighbors",
    title: "1.6. 最近邻",
    href: "/machine-learning/supervised/neighbors"
  },
  {
    id: "gaussian-process",
    title: "1.7. 高斯过程",
    href: "/machine-learning/supervised/gaussian-process"
  },
  {
    id: "cross-decomposition",
    title: "1.8. 交叉分解",
    href: "/machine-learning/supervised/cross-decomposition"
  },
  {
    id: "naive-bayes",
    title: "1.9. 朴素贝叶斯",
    href: "/machine-learning/supervised/naive-bayes"
  },
  {
    id: "decision-trees",
    title: "1.10. 决策树",
    href: "/machine-learning/supervised/decision-trees"
  },
  {
    id: "ensemble",
    title: "1.11. 集成: 梯度提升、随机森林、bagging、投票、堆叠",
    href: "/machine-learning/supervised/ensemble"
  },
  {
    id: "multiclass",
    title: "1.12. 多类和多输出算法",
    href: "/machine-learning/supervised/multiclass"
  },
  {
    id: "feature-selection",
    title: "1.13. 特征选择",
    href: "/machine-learning/supervised/feature-selection"
  },
  {
    id: "semi-supervised",
    title: "1.14. 半监督学习",
    href: "/machine-learning/supervised/semi-supervised"
  },
  {
    id: "isotonic",
    title: "1.15. 等渗回归",
    href: "/machine-learning/supervised/isotonic"
  },
  {
    id: "probability",
    title: "1.16. 概率校准",
    href: "/machine-learning/supervised/probability"
  },
  {
    id: "neural-networks",
    title: "1.17. 神经网络模型 (监督)",
    href: "/machine-learning/supervised/neural-networks"
  }
]

// 右侧内容 - 监督学习的所有章节（根据官方文档）
const supervisedContent = [
  {
    id: "linear-models",
    title: "1.1. 线性模型",
    sections: [
      { id: "ordinary-least-squares", title: "1.1.1. 普通最小二乘法", href: "/machine-learning/supervised/linear-models#ordinary-least-squares" },
      { id: "ridge-regression", title: "1.1.2. 岭回归和分类", href: "/machine-learning/supervised/linear-models#ridge-regression" },
      { id: "lasso", title: "1.1.3. 套索", href: "/machine-learning/supervised/linear-models#lasso" },
      { id: "multi-task-lasso", title: "1.1.4. 多任务套索", href: "/machine-learning/supervised/linear-models#multi-task-lasso" },
      { id: "elastic-net", title: "1.1.5. 弹性网络", href: "/machine-learning/supervised/linear-models#elastic-net" },
      { id: "multi-task-elastic", title: "1.1.6. 多任务弹性网络", href: "/machine-learning/supervised/linear-models#multi-task-elastic" },
      { id: "least-angle", title: "1.1.7. 最小角回归", href: "/machine-learning/supervised/linear-models#least-angle" },
      { id: "lars-lasso", title: "1.1.8. LARS 套索", href: "/machine-learning/supervised/linear-models#lars-lasso" },
      { id: "omp", title: "1.1.9. 正交匹配追踪（OMP）", href: "/machine-learning/supervised/linear-models#omp" },
      { id: "bayesian", title: "1.1.10. 贝叶斯回归", href: "/machine-learning/supervised/linear-models#bayesian" },
      { id: "logistic", title: "1.1.11. 逻辑回归", href: "/machine-learning/supervised/linear-models#logistic" },
      { id: "generalized", title: "1.1.12. 广义线性模型", href: "/machine-learning/supervised/linear-models#generalized" },
      { id: "sgd-regression", title: "1.1.13. 随机梯度下降 - SGD", href: "/machine-learning/supervised/linear-models#sgd" },
      { id: "perceptron", title: "1.1.14. 感知器", href: "/machine-learning/supervised/linear-models#perceptron" },
      { id: "passive-aggressive", title: "1.1.15. 被动攻击算法", href: "/machine-learning/supervised/linear-models#passive-aggressive" }
    ]
  },
  {
    id: "linear-discriminant",
    title: "1.2. 线性和二次判别分析",
    sections: [
      { id: "lda", title: "1.2.1. 线性判别分析", href: "/machine-learning/supervised/linear-discriminant#lda" },
      { id: "qda", title: "1.2.2. 二次判别分析", href: "/machine-learning/supervised/linear-discriminant#qda" }
    ]
  },
  {
    id: "kernel-ridge",
    title: "1.3. 核岭回归",
    sections: [
      { id: "kernel-ridge-intro", title: "1.3.1. 核岭回归基础", href: "/machine-learning/supervised/kernel-ridge#intro" }
    ]
  },
  {
    id: "svm",
    title: "1.4. 支持向量机",
    sections: [
      { id: "svm-classification", title: "1.4.1. 分类", href: "/machine-learning/supervised/svm#classification" },
      { id: "svm-regression", title: "1.4.2. 回归", href: "/machine-learning/supervised/svm#regression" },
      { id: "svm-density", title: "1.4.3. 密度估计，异常值检测", href: "/machine-learning/supervised/svm#density" }
    ]
  },
  {
    id: "sgd",
    title: "1.5. 随机梯度下降",
    sections: [
      { id: "sgd-classification", title: "1.5.1. 分类", href: "/machine-learning/supervised/sgd#classification" },
      { id: "sgd-regression", title: "1.5.2. 回归", href: "/machine-learning/supervised/sgd#regression" }
    ]
  },
  {
    id: "neighbors",
    title: "1.6. 最近邻",
    sections: [
      { id: "neighbors-unsupervised", title: "1.6.1. 无监督最近邻", href: "/machine-learning/supervised/neighbors#unsupervised" },
      { id: "neighbors-classification", title: "1.6.2. 最近邻分类", href: "/machine-learning/supervised/neighbors#classification" },
      { id: "neighbors-regression", title: "1.6.3. 最近邻回归", href: "/machine-learning/supervised/neighbors#regression" }
    ]
  }
]

export default function SupervisedPage() {
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
                监督学习
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
          监督学习
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 左侧导航栏 */}
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  监督学习
                </h2>
                <Link href="/machine-learning" className="text-blue-600 hover:text-blue-700">
                  <ChevronUp size={20} />
                </Link>
              </div>
              
              <nav className="space-y-1">
                {supervisedNavigation.map((item) => (
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

          {/* 右侧内容区 - 显示所有监督学习章节 */}
          <div className="lg:col-span-3">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-8 max-h-[calc(100vh-8rem)] overflow-y-auto`}>
              {supervisedContent.map((sectionGroup, index) => (
                <div key={sectionGroup.id} className={index > 0 ? 'mt-12' : ''}>
                  <h2 className={`text-2xl font-bold mb-6 text-blue-600`}>
                    {sectionGroup.title}
                  </h2>
                  
                  {/* 章节链接列表 */}
                  <div className="space-y-2">
                    {sectionGroup.sections.map((section) => (
                      <Link
                        key={section.id}
                        href={section.href}
                        className={`
                          block p-3 rounded-lg border transition-colors
                          ${theme === 'dark' 
                            ? 'border-gray-600 hover:bg-gray-700 text-blue-400 hover:text-blue-300' 
                            : 'border-gray-200 hover:bg-blue-50 text-blue-600 hover:text-blue-700'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{section.title}</span>
                          <ChevronRight size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}