"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SearchBar } from "@/components/search-bar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectList } from "@/components/project-card-new"
import { ProjectUpload } from "@/components/project-upload"
import { 
  ProjectCategory, 
  projectCategories, 
  mockProjects, 
  searchProjects 
} from "@/lib/projects"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { BarChart3, Settings, BookOpen, FileSpreadsheet, LayoutDashboard, Database } from "lucide-react"

export default function Projects() {
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<ProjectCategory>("notebook")
  const [isAdmin, setIsAdmin] = useState(true) // 临时设置为管理员，后续从认证系统获取

  // 从URL参数恢复标签状态
  useEffect(() => {
    const category = searchParams.get('category') as ProjectCategory
    if (category && ['notebook', 'excel', 'dashboard', 'sql'].includes(category)) {
      setActiveTab(category)
    }
  }, [searchParams])

  // 获取当前标签页的项目并应用搜索过滤
  const filteredProjects = useMemo(() => {
    return searchProjects(searchQuery, activeTab)
  }, [searchQuery, activeTab])

  // 统计各类别项目数量
  const projectStats = useMemo(() => {
    const stats: Record<ProjectCategory, number> = {
      notebook: 0,
      excel: 0,
      dashboard: 0,
      sql: 0
    }
    
    mockProjects.forEach(project => {
      stats[project.category]++
    })
    
    return stats
  }, [])

  const handleProjectUpload = (projectData: any) => {
    console.log('上传项目:', projectData)
    // 这里应该调用API保存项目
    alert('项目上传成功！')
  }

  // 处理标签切换，同时更新URL
  const handleTabChange = (value: string) => {
    const category = value as ProjectCategory
    setActiveTab(category)
    router.push(`/projects?category=${category}`, { scroll: false })
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="h-12 w-12 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                项目管理与展示
              </h1>
            </div>
            <p className="text-xl text-cyan-100 mb-8">
              数据分析项目的集中管理、展示和分享平台
            </p>
            
            {/* 项目统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {Object.entries(projectCategories).map(([key, category]) => {
                const IconComponent = {
                  notebook: BookOpen,
                  excel: FileSpreadsheet,
                  dashboard: LayoutDashboard,
                  sql: Database
                }[key as ProjectCategory]
                
                return (
                  <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <IconComponent className="h-8 w-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {projectStats[key as ProjectCategory]}
                    </div>
                    <div className="text-sm text-cyan-100">{category.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 搜索区域 */}
      <section className="py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="搜索项目标题、描述或标签..."
                className="w-full sm:max-w-md"
              />
            </div>
            
            {/* 管理员工具 */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  管理设置
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  统计分析
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 项目分类标签页 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            {/* 标签页导航 */}
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {Object.entries(projectCategories).map(([key, category]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="bg-gray-200 dark:bg-gray-600 text-xs px-2 py-0.5 rounded-full ml-1">
                    {projectStats[key as ProjectCategory]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* 各类别项目内容 */}
            {Object.keys(projectCategories).map((categoryKey) => {
              const category = categoryKey as ProjectCategory
              return (
                <TabsContent key={category} value={category} className="space-y-6">
                  {/* 上传组件 */}
                  <ProjectUpload
                    category={category}
                    onUpload={handleProjectUpload}
                    isAdmin={isAdmin}
                  />
                  
                  {/* 搜索结果提示 */}
                  {searchQuery && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      在"{projectCategories[category].name}"中搜索"{searchQuery}"，
                      找到 {filteredProjects.length} 个结果
                    </div>
                  )}
                  
                  {/* 项目列表 */}
                  <ProjectList
                    projects={filteredProjects}
                    category={category}
                    isLoading={false}
                  />
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            项目管理系统 - 让数据分析项目的展示和分享更加便捷
          </p>
        </div>
      </footer>
    </div>
  )
}