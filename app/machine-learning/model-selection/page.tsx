"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowLeft, Home, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

// 模型选择与评估的子目录
const modelSelectionNavigation = [
  {
    id: "cross-validation",
    title: "3.1. 交叉验证：评估估计器性能",
    isActive: true,
    href: "/machine-learning/model-selection/cross-validation"
  },
  {
    id: "tuning",
    title: "3.2. 调整估计器的超参数",
    href: "/machine-learning/model-selection/tuning"
  },
  {
    id: "model-evaluation",
    title: "3.3. 调整分类预测的决策阈值",
    href: "/machine-learning/model-selection/model-evaluation"
  },
  {
    id: "metrics",
    title: "3.4. 指标和评分：量化预测质量",
    href: "/machine-learning/model-selection/metrics"
  },
  {
    id: "validation-curves",
    title: "3.5. 验证曲线：绘制分数来评估模型",
    href: "/machine-learning/model-selection/validation-curves"
  }
]

// 右侧内容 - 交叉验证的详细章节
const crossValidationContent = {
  title: "3.1. 交叉验证：评估估计器性能",
  sections: [
    { id: "cv-intro", title: "3.1.1. 计算交叉验证指标", href: "/machine-learning/model-selection/cross-validation#intro" },
    { id: "cv-iterators", title: "3.1.2. 交叉验证迭代器", href: "/machine-learning/model-selection/cross-validation#iterators" },
    { id: "cv-data-leakage", title: "3.1.3. 关于改组", href: "/machine-learning/model-selection/cross-validation#data-leakage" },
    { id: "cv-model-selection", title: "3.1.4. 交叉验证和模型选择", href: "/machine-learning/model-selection/cross-validation#model-selection" },
    { id: "cv-permutation", title: "3.1.5. 排列检验分数", href: "/machine-learning/model-selection/cross-validation#permutation" }
  ]
}

export default function ModelSelectionPage() {
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
                模型选择与评估
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
          模型选择与评估
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 左侧导航栏 */}
          <div className="lg:col-span-1">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  模型选择与评估
                </h2>
                <Link href="/machine-learning" className="text-blue-600 hover:text-blue-700">
                  <ChevronUp size={20} />
                </Link>
              </div>
              
              <nav className="space-y-1">
                {modelSelectionNavigation.map((item) => (
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
                {crossValidationContent.title}
              </h2>
              
              {/* 章节链接列表 */}
              <div className="space-y-3">
                {crossValidationContent.sections.map((section) => (
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
