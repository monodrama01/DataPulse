"use client"

import { useState } from "react"
import { Project, ProjectCategory, getProjectCategory, formatFileSize } from "@/lib/projects"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Eye, User, FileText, BookOpen, FileSpreadsheet, LayoutDashboard, Database, Code } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { NotebookViewer } from "@/components/notebook-viewer"

interface ProjectCardProps {
  project: Project
  showUploadButton?: boolean
}

export function ProjectCard({ project, showUploadButton = false }: ProjectCardProps) {
  const { theme } = useTheme()
  const categoryInfo = getProjectCategory(project.category)
  const [showNotebook, setShowNotebook] = useState(false)
  
  // 获取对应的图标组件
  const iconMap: { [key: string]: any } = {
    BookOpen,
    FileSpreadsheet,
    LayoutDashboard,
    Database
  }
  const CategoryIcon = iconMap[categoryInfo.icon] || FileText

  const handleDownload = () => {
    if (project.filePath) {
      // 创建下载链接
      const link = document.createElement('a')
      link.href = project.filePath
      link.download = project.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleExternalLink = () => {
    if (project.linkUrl) {
      window.open(project.linkUrl, '_blank')
    }
  }

  // 根据项目类型生成SVG预览
  const renderPreviewSVG = () => {
    const isDark = theme === 'dark'
    
    if (project.category === 'notebook') {
      // Jupyter Notebook 预览
      return (
        <svg viewBox="0 0 400 192" className="w-full h-full">
          <rect width="400" height="192" fill={isDark ? '#1f2937' : '#f3f4f6'} />
          {/* 代码单元格 */}
          <rect x="20" y="20" width="360" height="40" rx="4" fill={isDark ? '#374151' : '#ffffff'} />
          <text x="30" y="35" className="text-xs" fill="#10b981" fontFamily="monospace">In [1]:</text>
          <text x="80" y="35" className="text-xs" fill={isDark ? '#e5e7eb' : '#374151'} fontFamily="monospace">import pandas as pd</text>
          <text x="80" y="50" className="text-xs" fill={isDark ? '#e5e7eb' : '#374151'} fontFamily="monospace">df.groupby('category')</text>
          
          {/* 输出单元格 */}
          <rect x="20" y="70" width="360" height="50" rx="4" fill={isDark ? '#1e293b' : '#fef3c7'} />
          <text x="30" y="85" className="text-xs" fill="#f59e0b" fontFamily="monospace">Out[1]:</text>
          <line x1="80" y1="90" x2="360" y2="90" stroke={isDark ? '#4b5563' : '#d1d5db'} strokeWidth="1"/>
          <text x="90" y="105" className="text-xs" fill={isDark ? '#9ca3af' : '#6b7280'} fontFamily="monospace">category | count | avg</text>
          
          {/* 图表预览 */}
          <rect x="20" y="130" width="360" height="50" rx="4" fill={isDark ? '#312e81' : '#dbeafe'} />
          <polyline points="40,165 80,155 120,160 160,145 200,150 240,140 280,145 320,135 360,140" 
                    stroke="#3b82f6" strokeWidth="2" fill="none"/>
        </svg>
      )
    } else if (project.category === 'dashboard') {
      // Dashboard 预览
      return (
        <svg viewBox="0 0 400 192" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect width="400" height="192" fill={isDark ? '#111827' : '#f9fafb'} />
          
          {/* 顶部指标卡片 */}
          <rect x="10" y="15" width="85" height="45" rx="6" fill={`url(#grad-${project.id})`} opacity="0.9"/>
          <rect x="105" y="15" width="85" height="45" rx="6" fill="#10b981" opacity="0.9"/>
          <rect x="200" y="15" width="85" height="45" rx="6" fill="#f59e0b" opacity="0.9"/>
          <rect x="295" y="15" width="85" height="45" rx="6" fill="#ef4444" opacity="0.9"/>
          
          {/* 图表区域 */}
          <rect x="10" y="70" width="185" height="110" rx="6" fill={isDark ? '#1f2937' : '#ffffff'} stroke={isDark ? '#374151' : '#e5e7eb'}/>
          {/* 折线图 */}
          <polyline points="25,150 45,140 65,145 85,130 105,135 125,125 145,130 165,120 180,125" 
                    stroke="#3b82f6" strokeWidth="2" fill="none"/>
          
          <rect x="205" y="70" width="185" height="110" rx="6" fill={isDark ? '#1f2937' : '#ffffff'} stroke={isDark ? '#374151' : '#e5e7eb'}/>
          {/* 柱状图 */}
          <rect x="220" y="130" width="18" height="40" fill="#3b82f6" rx="2"/>
          <rect x="245" y="115" width="18" height="55" fill="#10b981" rx="2"/>
          <rect x="270" y="125" width="18" height="45" fill="#8b5cf6" rx="2"/>
          <rect x="295" y="110" width="18" height="60" fill="#f59e0b" rx="2"/>
          <rect x="320" y="120" width="18" height="50" fill="#ef4444" rx="2"/>
          <rect x="345" y="135" width="18" height="35" fill="#06b6d4" rx="2"/>
        </svg>
      )
    } else if (project.category === 'sql') {
      // SQL 预览
      return (
        <svg viewBox="0 0 400 192" className="w-full h-full">
          <rect width="400" height="192" fill={isDark ? '#0f172a' : '#f8fafc'} />
          
          {/* SQL 编辑器 */}
          <rect x="15" y="15" width="370" height="80" rx="6" fill={isDark ? '#1e293b' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'}/>
          <text x="25" y="30" className="text-xs" fill="#64748b" fontFamily="monospace">1</text>
          <text x="25" y="45" className="text-xs" fill="#64748b" fontFamily="monospace">2</text>
          <text x="25" y="60" className="text-xs" fill="#64748b" fontFamily="monospace">3</text>
          <text x="25" y="75" className="text-xs" fill="#64748b" fontFamily="monospace">4</text>
          
          <text x="50" y="30" className="text-xs" fill="#8b5cf6" fontFamily="monospace">SELECT</text>
          <text x="110" y="30" className="text-xs" fill={isDark ? '#e5e7eb' : '#1e293b'} fontFamily="monospace">user_id, SUM(amount)</text>
          <text x="50" y="45" className="text-xs" fill="#8b5cf6" fontFamily="monospace">FROM</text>
          <text x="95" y="45" className="text-xs" fill={isDark ? '#e5e7eb' : '#1e293b'} fontFamily="monospace">orders</text>
          <text x="50" y="60" className="text-xs" fill="#8b5cf6" fontFamily="monospace">WHERE</text>
          <text x="100" y="60" className="text-xs" fill={isDark ? '#e5e7eb' : '#1e293b'} fontFamily="monospace">order_date &gt;= '2024-01-01'</text>
          <text x="50" y="75" className="text-xs" fill="#8b5cf6" fontFamily="monospace">GROUP BY</text>
          <text x="125" y="75" className="text-xs" fill={isDark ? '#e5e7eb' : '#1e293b'} fontFamily="monospace">user_id;</text>
          
          {/* 结果表格 */}
          <rect x="15" y="105" width="370" height="72" rx="6" fill={isDark ? '#1e293b' : '#ffffff'} stroke={isDark ? '#334155' : '#e2e8f0'}/>
          <rect x="15" y="105" width="370" height="20" fill={isDark ? '#334155' : '#f1f5f9'} rx="6"/>
          <text x="25" y="118" className="text-xs font-semibold" fill={isDark ? '#e5e7eb' : '#1e293b'}>user_id</text>
          <text x="200" y="118" className="text-xs font-semibold" fill={isDark ? '#e5e7eb' : '#1e293b'}>total_amount</text>
          
          <text x="25" y="140" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">U001</text>
          <text x="200" y="140" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">¥1,280</text>
          <text x="25" y="158" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">U002</text>
          <text x="200" y="158" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">¥2,450</text>
        </svg>
      )
    } else {
      // Excel 预览
      return (
        <svg viewBox="0 0 400 192" className="w-full h-full">
          <rect width="400" height="192" fill={isDark ? '#14532d' : '#f0fdf4'} />
          
          {/* Excel 工作表 */}
          <rect x="20" y="20" width="360" height="152" rx="6" fill={isDark ? '#1e293b' : '#ffffff'} stroke={isDark ? '#334155' : '#d1d5db'}/>
          
          {/* 表头 */}
          <rect x="20" y="20" width="360" height="25" fill={isDark ? '#166534' : '#22c55e'} rx="6"/>
          {['A', 'B', 'C', 'D', 'E', 'F'].map((col, i) => (
            <text key={col} x={40 + i * 60} y="37" className="text-xs font-bold" fill="white">{col}</text>
          ))}
          
          {/* 网格线和数据 */}
          {[1, 2, 3, 4, 5].map((row) => (
            <g key={row}>
              <line x1="20" y1={45 + row * 25} x2="380" y2={45 + row * 25} stroke={isDark ? '#334155' : '#e5e7eb'} strokeWidth="1"/>
              {[0, 1, 2, 3, 4, 5].map((col) => (
                <line key={col} x1={20 + col * 60} y1="45" x2={20 + col * 60} y2="172" stroke={isDark ? '#334155' : '#e5e7eb'} strokeWidth="1"/>
              ))}
            </g>
          ))}
          
          {/* 示例数据 */}
          <text x="30" y="62" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'}>产品</text>
          <text x="90" y="62" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'}>销量</text>
          <text x="150" y="62" className="text-xs" fill={isDark ? '#94a3b8' : '#64748b'}>金额</text>
          
          <rect x="260" y="55" width="110" height="100" fill={isDark ? '#166534' : '#86efac'} opacity="0.3" rx="4"/>
          <text x="280" y="105" className="text-lg font-bold" fill={isDark ? '#22c55e' : '#16a34a'}>📊</text>
        </svg>
      )
    }
  }

  return (
    <>
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <CardHeader className="pb-3">
        {/* 项目预览卡片 */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {renderPreviewSVG()}
          
          {/* 分类标签 */}
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryInfo.badgeColor} font-medium flex items-center gap-1 shadow-lg`}>
              <CategoryIcon className="h-3 w-3" />
              {categoryInfo.name}
            </Badge>
          </div>
        </div>

        {/* 项目标题和描述 */}
        <div className="space-y-2">
          <CardTitle className={`text-lg line-clamp-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            {project.title}
          </CardTitle>
          <CardDescription className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {project.description}
          </CardDescription>
        </div>

        {/* 项目标签 */}
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* 项目元信息 */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          {project.author && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{project.author}</span>
            </div>
          )}
          {project.fileSize && (
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>{formatFileSize(project.fileSize)}</span>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          {/* Notebook项目：查看Notebook按钮 */}
          {project.category === 'notebook' ? (
            <Button 
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600" 
              size="sm"
              onClick={() => setShowNotebook(true)}
            >
              <Code className="h-4 w-4 mr-2" />
              查看 Notebook
            </Button>
          ) : (
            <Link href={`/projects/${project.id}`} className="flex-1">
              <Button className="w-full" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                查看详情
              </Button>
            </Link>
          )}

          {/* 下载/外链按钮 */}
          {project.category === 'dashboard' && project.linkUrl ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExternalLink}
              className="px-3"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          ) : project.filePath ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="px-3"
            >
              <Download className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
    
    {/* Notebook查看器 */}
    {showNotebook && (
      <NotebookViewer
        projectId={project.id}
        projectTitle={project.title}
        onClose={() => setShowNotebook(false)}
      />
    )}
    </>
  )
}

// 项目列表组件
interface ProjectListProps {
  projects: Project[]
  category: ProjectCategory
  isLoading?: boolean
}

export function ProjectList({ projects, category, isLoading = false }: ProjectListProps) {
  const { theme } = useTheme()
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className={`animate-pulse ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <CardHeader>
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    const categoryInfo = getProjectCategory(category)
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{categoryInfo.icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          暂无{categoryInfo.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {categoryInfo.description}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
