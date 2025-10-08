"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { SearchBar } from "@/components/search-bar"
import { MindMap, MindMapPreview } from "@/components/mind-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
  Layers,
  Search,
  Filter,
  BookOpen,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Eye
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { 
  businessScenarios, 
  getScenarioCategories,
  getScenariosByDifficulty,
  searchScenarios,
  BusinessScenario
} from "@/lib/showcases"

export default function Showcases() {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedScenario, setSelectedScenario] = useState<BusinessScenario | null>(null)
  const [showMindMap, setShowMindMap] = useState(false)

  // 过滤场景
  const filteredScenarios = () => {
    let scenarios = businessScenarios

    // 搜索过滤
    if (searchQuery) {
      scenarios = searchScenarios(searchQuery)
    }

    // 分类过滤
    if (selectedCategory !== "all") {
      scenarios = scenarios.filter(s => s.category === selectedCategory)
    }

    // 难度过滤
    if (selectedDifficulty !== "all") {
      scenarios = scenarios.filter(s => s.difficulty === selectedDifficulty)
    }

    return scenarios
  }

  const scenarios = filteredScenarios()
  const categories = getScenarioCategories()

  // ESC键关闭模态框
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedScenario) {
        setSelectedScenario(null)
      }
    }

    if (selectedScenario) {
      document.addEventListener('keydown', handleEscKey)
      // 防止背景滚动
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [selectedScenario])

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

  // 获取行业图标
  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case '互联网产品': return <Users className="h-4 w-4" />
      case '电商零售': return <ShoppingCart className="h-4 w-4" />
      case '在线教育': return <BookOpen className="h-4 w-4" />
      case '传统零售': return <BarChart3 className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-12 w-12 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                数据思维应用场景
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              探索数据分析在不同业务场景中的应用思路，掌握从问题识别到解决方案的完整分析框架
            </p>
            
            {/* 快速统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{businessScenarios.length}</div>
                <div className="text-sm text-blue-100">应用场景</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{categories.length}</div>
                <div className="text-sm text-blue-100">分析类别</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-blue-100">实战导向</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-sm text-blue-100">思维导图</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选区域 */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="搜索业务场景、行业、分析方法..."
                className="max-w-md"
              />
            </div>
            
            {/* 筛选器 */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* 分类筛选 */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">全部分类</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name} ({cat.count})
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 难度筛选 */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">全部难度</option>
                <option value="beginner">入门级</option>
                <option value="intermediate">进阶级</option>
                <option value="advanced">高级</option>
              </select>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                找到 {scenarios.length} 个场景
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 场景详情模态框 */}
      {selectedScenario && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedScenario(null)}
        >
          <div 
            className={`max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getIndustryIcon(selectedScenario.industry)}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedScenario.title}</h2>
                    <p className="text-blue-100">{selectedScenario.industry} · {selectedScenario.category}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedScenario(null)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">场景概述</TabsTrigger>
                  <TabsTrigger value="process">分析过程</TabsTrigger>
                  <TabsTrigger value="mindmap">思维导图</TabsTrigger>
                  <TabsTrigger value="tools">工具方法</TabsTrigger>
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
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedScenario.problem}</p>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">业务背景</h4>
                          <p className="text-red-700 dark:text-red-300 text-sm">{selectedScenario.businessContext}</p>
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
                        <p className="text-gray-700 dark:text-gray-300">{selectedScenario.solution}</p>
                      </CardContent>
                    </Card>

                    {/* 关键指标 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-500" />
                          关键指标
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedScenario.keyMetrics.map(metric => (
                            <Badge key={metric} className="bg-blue-100 text-blue-800">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="process" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-purple-500" />
                        分析思路与步骤
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedScenario.thinkingProcess.map((step, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 dark:text-gray-300">{step}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="mindmap" className="mt-6">
                  {selectedScenario.mindMapData ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">分析思维导图</h3>
                        <Button
                          onClick={() => setShowMindMap(!showMindMap)}
                          variant="outline"
                        >
                          {showMindMap ? '收起导图' : '展开导图'}
                        </Button>
                      </div>
                      
                      {showMindMap ? (
                        <MindMap 
                          data={selectedScenario.mindMapData} 
                          width={800} 
                          height={600}
                        />
                      ) : (
                        <MindMapPreview data={selectedScenario.mindMapData} />
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>该场景的思维导图正在制作中...</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="tools" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 分析工具 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          分析工具
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedScenario.tools.map(tool => (
                            <Badge key={tool} variant="outline" className="text-yellow-700 border-yellow-300">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* 难度等级 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-orange-500" />
                          难度等级
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <Badge className={getDifficultyStyle(selectedScenario.difficulty).color}>
                            {getDifficultyStyle(selectedScenario.difficulty).label}
                          </Badge>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            适合有一定{selectedScenario.difficulty === 'beginner' ? '基础' : selectedScenario.difficulty === 'intermediate' ? '经验' : '高级经验'}的分析师
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}

      {/* 场景列表 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {scenarios.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                没有找到匹配的场景
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                尝试调整搜索条件或筛选器
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario) => {
                const difficultyStyle = getDifficultyStyle(scenario.difficulty)
                
                return (
                  <Card key={scenario.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getIndustryIcon(scenario.industry)}
                          <Badge variant="outline" className="text-xs">
                            {scenario.industry}
                          </Badge>
                        </div>
                        <Badge className={`text-xs ${difficultyStyle.color}`}>
                          {difficultyStyle.label}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {scenario.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm">
                        {scenario.category} · {scenario.problem.substring(0, 80)}...
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {scenario.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {scenario.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{scenario.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* 关键指标预览 */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">关键指标</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {scenario.keyMetrics.slice(0, 3).join(' • ')}
                          {scenario.keyMetrics.length > 3 && '...'}
                        </div>
                      </div>

                      {/* 查看详情按钮 */}
                      <Button 
                        onClick={() => setSelectedScenario(scenario)}
                        className="w-full"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        查看分析思路
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            数据思维应用场景 - 从理论到实践的完整分析框架
          </p>
        </div>
      </footer>
    </div>
  )
}
