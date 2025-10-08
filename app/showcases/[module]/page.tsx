"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { MindMap, MindMapPreview } from "@/components/mind-map"
import { FlowChart, FlowChartPreview } from "@/components/flow-chart"
import { CodeShowcase } from "@/components/code-showcase"
import { ChartShowcase } from "@/components/chart-showcase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Brain, 
  Code, 
  BarChart3, 
  FileSpreadsheet,
  Database,
  Cpu,
  TrendingUp,
  Calculator,
  Zap,
  Eye,
  CheckCircle,
  AlertCircle,
  Target,
  Lightbulb,
  BookOpen
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import type { ModuleShowcase } from "@/lib/module-showcases"
import Link from "next/link"

export default function ModuleShowcasePage() {
  const { theme } = useTheme()
  const params = useParams()
  const moduleType = params.module as string
  
  const [selectedShowcase, setSelectedShowcase] = useState<ModuleShowcase | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [renderedTabs, setRenderedTabs] = useState<Set<string>>(new Set(["overview"]))
  
  // 切换showcase时重置tab
  useEffect(() => {
    if (selectedShowcase) {
      setActiveTab("overview")
      setRenderedTabs(new Set(["overview"])) // 重置已渲染的标签
    }
  }, [selectedShowcase])
  
  // 延迟渲染标签内容
  useEffect(() => {
    if (activeTab && !renderedTabs.has(activeTab)) {
      const timer = setTimeout(() => {
        setRenderedTabs(prev => new Set([...prev, activeTab]))
      }, 50) // 延迟50ms渲染
      
      return () => clearTimeout(timer)
    }
  }, [activeTab, renderedTabs])
  
  // 处理标签切换
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])
  const [isLoading, setIsLoading] = useState(true)
  const [showcases, setShowcases] = useState<ModuleShowcase[]>([])

  // 获取模块数据（动态导入避免阻塞）
  useEffect(() => {
    let mounted = true
    
    setIsLoading(true)
    setShowcases([]) // 清空之前的数据
    
    // 动态导入模块数据
    import('@/lib/module-showcases')
      .then((module) => {
        if (mounted) {
          try {
            const data = module.getModuleShowcases(moduleType)
            setShowcases(data || [])
          } catch (error) {
            console.error('Failed to load showcases:', error)
            setShowcases([])
          }
        }
      })
      .catch((error) => {
        console.error('Failed to import module:', error)
        if (mounted) {
          setShowcases([])
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false)
        }
      })
    
    return () => {
      mounted = false
    }
  }, [moduleType])

  // 组件卸载时确保恢复滚动
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // ESC键关闭模态框
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedShowcase(null)
      }
    }

    if (selectedShowcase) {
      document.addEventListener('keydown', handleEscKey)
      // 防止背景滚动
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.removeEventListener('keydown', handleEscKey)
        document.body.style.overflow = 'unset'
      }
    } else {
      // 确保在没有选中时恢复滚动
      document.body.style.overflow = 'unset'
    }
  }, [selectedShowcase])
  
  // 加载状态
  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent align-[-0.125em] text-cyan-600 motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              加载中...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (showcases.length === 0) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              模块内容正在开发中
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              该模块的Showcases内容正在制作中，敬请期待！
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // 获取模块图标和信息
  const getModuleInfo = (moduleType: string) => {
    switch (moduleType) {
      case 'business':
        return { 
          icon: <Brain className="h-8 w-8" />, 
          name: '业务知识', 
          color: 'from-blue-600 to-indigo-600',
          description: '业务分析思维框架和方法论'
        }
      case 'excel':
        return { 
          icon: <FileSpreadsheet className="h-8 w-8" />, 
          name: 'Excel分析', 
          color: 'from-green-600 to-emerald-600',
          description: 'Excel高级功能和数据分析技巧'
        }
      case 'python':
        return { 
          icon: <Code className="h-8 w-8" />, 
          name: 'Python编程', 
          color: 'from-blue-500 to-cyan-500',
          description: 'Python数据分析和可视化编程'
        }
      case 'sql':
        return { 
          icon: <Database className="h-8 w-8" />, 
          name: 'SQL查询', 
          color: 'from-purple-600 to-violet-600',
          description: '高级SQL查询和数据库分析'
        }
      case 'ml':
        return { 
          icon: <Cpu className="h-8 w-8" />, 
          name: '机器学习', 
          color: 'from-red-600 to-pink-600',
          description: '机器学习算法和模型应用'
        }
      case 'visualization':
        return { 
          icon: <BarChart3 className="h-8 w-8" />, 
          name: '数据可视化', 
          color: 'from-yellow-600 to-orange-600',
          description: '数据可视化工具和图表设计'
        }
      case 'statistics':
        return { 
          icon: <Calculator className="h-8 w-8" />, 
          name: '统计分析', 
          color: 'from-teal-600 to-cyan-600',
          description: '统计学方法和实验设计'
        }
      case 'automation':
        return { 
          icon: <Zap className="h-8 w-8" />, 
          name: '自动化脚本', 
          color: 'from-indigo-600 to-purple-600',
          description: '数据处理自动化和脚本开发'
        }
      default:
        return { 
          icon: <BookOpen className="h-8 w-8" />, 
          name: '技能模块', 
          color: 'from-gray-600 to-slate-600',
          description: '专业技能展示'
        }
    }
  }

  const moduleInfo = getModuleInfo(moduleType)

  // 获取难度标签样式
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { label: '入门', color: 'bg-green-100 text-green-800 border-green-200' }
      case 'intermediate':
        return { label: '进阶', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
      case 'advanced':
        return { label: '高级', color: 'bg-red-100 text-red-800 border-red-200' }
      default:
        return { label: '未知', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className={`py-12 bg-gradient-to-r ${moduleInfo.color}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="text-white">
                {moduleInfo.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {moduleInfo.name}应用案例
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {moduleInfo.description} - 通过实际业务案例展示技能应用
            </p>
            
            {/* 返回链接 */}
            <div className="flex justify-center mb-6">
              <Link href="/">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回首页
                </Button>
              </Link>
            </div>
            
            {/* 快速统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{showcases.length}</div>
                <div className="text-sm text-white/80">应用案例</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">
                  {[...new Set(showcases.map(s => s.industry))].length}
                </div>
                <div className="text-sm text-white/80">行业领域</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-white/80">实战案例</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 案例详情模态框 */}
      {selectedShowcase && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedShowcase(null)}
        >
          <div 
            className={`max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 bg-gradient-to-r ${moduleInfo.color} text-white p-6 rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {moduleInfo.icon}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedShowcase.title}</h2>
                    <p className="text-white/90">{selectedShowcase.industry} · {selectedShowcase.category}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedShowcase(null)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">案例概述</TabsTrigger>
                  <TabsTrigger value="content">内容展示</TabsTrigger>
                  {selectedShowcase.results && (
                    <TabsTrigger value="results">分析结果</TabsTrigger>
                  )}
                  <TabsTrigger value="keypoints">关键要点</TabsTrigger>
                  <TabsTrigger value="tags">技能标签</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    {/* 问题描述 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          业务问题
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedShowcase.problem}</p>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">业务背景</h4>
                          <p className="text-red-700 dark:text-red-300 text-sm">{selectedShowcase.businessContext}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 解决方案 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          解决方案
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">{selectedShowcase.solution}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <div className="space-y-6">
                    {/* 思维导图 */}
                    {activeTab === 'content' && selectedShowcase.mindMapData && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">思维导图</h3>
                        <MindMap data={selectedShowcase.mindMapData} width={800} height={600} />
                      </div>
                    )}

                    {/* 流程图 */}
                    {activeTab === 'content' && selectedShowcase.flowChart && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4">流程图</h3>
                        <FlowChart data={selectedShowcase.flowChart} width={800} height={600} />
                      </div>
                    )}

                    {/* 代码展示 */}
                    {activeTab === 'content' && selectedShowcase.codeBlocks && selectedShowcase.codeBlocks.length > 0 && (
                      <CodeShowcase codeBlocks={selectedShowcase.codeBlocks} />
                    )}

                    {/* 图表展示 */}
                    {activeTab === 'content' && selectedShowcase.charts && selectedShowcase.charts.length > 0 && (
                      <ChartShowcase charts={selectedShowcase.charts} />
                    )}

                    {/* 仪表盘链接 */}
                    {selectedShowcase.dashboardUrl && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-500" />
                            交互式仪表盘
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            点击下方链接查看完整的交互式数据仪表盘
                          </p>
                          <Button asChild>
                            <a href={selectedShowcase.dashboardUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-2" />
                              查看仪表盘
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {selectedShowcase.results && (
                  <TabsContent value="results" className="mt-6">
                    <div className="space-y-6">
                      {/* 关键指标 */}
                      {selectedShowcase.results.metrics && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-blue-500" />
                              关键指标
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {selectedShowcase.results.metrics.map((metric, index) => (
                                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {metric.value}
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {metric.name}
                                  </div>
                                  {metric.change && (
                                    <div className={`text-xs mt-1 ${
                                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                      {metric.change}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* 数据洞察 */}
                      {selectedShowcase.results.insights && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-yellow-500" />
                              数据洞察
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedShowcase.results.insights.map((insight, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span className="text-gray-700 dark:text-gray-300">{insight}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {/* 改进建议 */}
                      {selectedShowcase.results.recommendations && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <TrendingUp className="h-5 w-5 text-green-500" />
                              改进建议
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedShowcase.results.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-green-500 mt-1">→</span>
                                  <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                )}

                <TabsContent value="keypoints" className="mt-6">
                  {activeTab === 'keypoints' && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-purple-500" />
                          关键要点
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedShowcase.keyPoints.slice(0, 20).map((point, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{point}</span>
                            </div>
                          ))}
                        </div>
                        {selectedShowcase.keyPoints.length > 20 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                            共 {selectedShowcase.keyPoints.length} 个要点，显示前 20 个
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="tags" className="mt-6">
                  {activeTab === 'tags' && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-indigo-500" />
                          技能标签
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedShowcase.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-indigo-700 border-indigo-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getDifficultyStyle(selectedShowcase.difficulty).color}>
                            {getDifficultyStyle(selectedShowcase.difficulty).label}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">难度等级</span>
                        </div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          该案例适合有{selectedShowcase.difficulty === 'beginner' ? '基础' : selectedShowcase.difficulty === 'intermediate' ? '一定经验' : '丰富经验'}的学习者
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}

      {/* 案例列表 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcases.map((showcase) => {
              const difficultyStyle = getDifficultyStyle(showcase.difficulty)
              
              return (
                <Card key={showcase.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {showcase.industry}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${difficultyStyle.color}`}>
                        {difficultyStyle.label}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {showcase.title}
                    </CardTitle>
                    
                    <CardDescription className="text-sm">
                      {showcase.category} · {showcase.problem.substring(0, 80)}...
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {showcase.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {showcase.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{showcase.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* 关键要点预览 */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">关键要点</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {showcase.keyPoints.slice(0, 2).join(' • ')}
                        {showcase.keyPoints.length > 2 && '...'}
                      </div>
                    </div>

                    {/* 查看详情按钮 */}
                    <Button 
                      onClick={() => {
                        setSelectedShowcase(showcase)
                        setActiveTab("overview")
                      }}
                      className="w-full"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      查看案例详情
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-gradient-to-r ${moduleInfo.color} text-white py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            {moduleInfo.name}应用案例 - 理论结合实践的技能展示
          </p>
        </div>
      </footer>
    </div>
  )
}
