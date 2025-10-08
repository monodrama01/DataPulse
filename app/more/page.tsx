"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronRight, 
  ArrowRight,
  Zap,
  BookOpen,
  Wrench,
  Database as DatabaseIcon,
  Lightbulb,
  FileText,
  Link2
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { 
  practicalResources,
  ResourceCategory
} from "@/lib/practical-resources"

export default function MorePage() {
  const { theme } = useTheme()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedSection, setSelectedSection] = useState<ResourceCategory | null>(null)
  
  const allSections = practicalResources

  // 关闭模态框并清除URL参数
  const closeModal = useCallback(() => {
    setSelectedSection(null)
    if (searchParams.get('module')) {
      router.replace('/more')
    }
  }, [searchParams, router])

  // 处理URL参数，自动打开指定模块
  useEffect(() => {
    const moduleParam = searchParams.get('module')
    if (moduleParam && allSections.length > 0) {
      const targetSection = allSections.find(section => section.id === moduleParam)
      if (targetSection) {
        setSelectedSection(targetSection)
      }
    }
  }, [searchParams, allSections])

  // ESC键关闭模态框
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedSection) {
        closeModal()
      }
    }

    if (selectedSection) {
      document.addEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [selectedSection, closeModal])

  // 获取难度标签样式
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { label: '入门', color: 'bg-green-500 hover:bg-green-600 text-white border-green-500' }
      case 'intermediate':
        return { label: '进阶', color: 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500' }
      case 'advanced':
        return { label: '高级', color: 'bg-red-500 hover:bg-red-600 text-white border-red-500' }
      default:
        return { label: '未知', color: 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500' }
    }
  }

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial':
        return <BookOpen className="h-4 w-4" />
      case 'tool':
        return <Wrench className="h-4 w-4" />
      case 'dataset':
        return <DatabaseIcon className="h-4 w-4" />
      case 'interview':
        return <Lightbulb className="h-4 w-4" />
      case 'article':
        return <FileText className="h-4 w-4" />
      case 'course':
        return <BookOpen className="h-4 w-4" />
      default:
        return <Link2 className="h-4 w-4" />
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-12 w-12 text-white" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                实战资源库
              </h1>
            </div>
            <p className="text-xl text-cyan-100 mb-8 max-w-3xl mx-auto">
              精选学习资料、实用工具、数据集、面试题库和行业资讯，助力数据分析能力快速提升
            </p>
            
            {/* 快速统计 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">{allSections.length}</div>
                <div className="text-sm text-cyan-100">资源分类</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">
                  {allSections.reduce((sum, section) => sum + section.items.length, 0)}
                </div>
                <div className="text-sm text-cyan-100">实战资源</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-sm text-cyan-100">面试专题</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-sm text-cyan-100">数据集</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 资源分类展示 */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              资源分类
            </h2>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSections.map((section) => {
                const iconMap: Record<string, typeof BookOpen> = {
                  BookOpen,
                  Wrench,
                  Database: DatabaseIcon,
                  Lightbulb,
                  FileText,
                  Link2
                }
                const IconComponent = iconMap[section.icon] || BookOpen
                
                return (
                  <Card 
                    key={section.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    onClick={() => setSelectedSection(section)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className={`mb-3 p-3 rounded-lg bg-gradient-to-r ${section.color}`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                      </div>
                      
                      <CardTitle className="text-lg text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 transition-colors">
                        {section.title}
                      </CardTitle>
                      
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </CardDescription>
                    </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {section.items.slice(0, 3).map((item, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {item.tags[0]}
                        </Badge>
                      ))}
                      {section.items.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{section.items.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      {section.items.length} 个资源
                    </div>
                  </CardContent>
                </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 资源详情模态框 */}
      {selectedSection && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 bg-gradient-to-r ${selectedSection.color} text-white p-6 rounded-t-lg z-10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const iconMap: Record<string, typeof BookOpen> = {
                      BookOpen,
                      Wrench,
                      Database: DatabaseIcon,
                      Lightbulb,
                      FileText,
                      Link2
                    }
                    const IconComponent = iconMap[selectedSection.icon] || BookOpen
                    return <IconComponent className="h-8 w-8 text-white filter drop-shadow-sm" />
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedSection.title}</h2>
                    <p className="text-white/90">{selectedSection.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={closeModal}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {selectedSection.items.map((item) => {
                  const difficultyStyle = item.difficulty ? getDifficultyStyle(item.difficulty) : null
                  
                  return (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getTypeIcon(item.type)}
                              <CardTitle className="text-base">{item.title}</CardTitle>
                            </div>
                            {difficultyStyle && (
                              <Badge className={`text-xs ${difficultyStyle.color}`}>
                                {difficultyStyle.label}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {item.link && (
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                          >
                            <ArrowRight className="h-4 w-4" />
                            访问资源
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            实战资源库 - 助力数据分析能力提升
          </p>
        </div>
      </footer>
    </div>
  )
}
