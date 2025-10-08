"use client"

import { useState } from "react"
import { ChartData } from "@/lib/module-showcases"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  Monitor,
  TrendingUp,
  Eye,
  Download,
  Maximize2
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface ChartShowcaseProps {
  charts: ChartData[]
  className?: string
}

export function ChartShowcase({ charts, className = "" }: ChartShowcaseProps) {
  const { theme } = useTheme()
  const [selectedChart, setSelectedChart] = useState<ChartData | null>(null)

  // 获取图表类型图标
  const getChartIcon = (type: string) => {
    switch (type) {
      case 'line':
        return <LineChart className="h-4 w-4" />
      case 'bar':
        return <BarChart3 className="h-4 w-4" />
      case 'pie':
        return <PieChart className="h-4 w-4" />
      case 'scatter':
        return <Activity className="h-4 w-4" />
      case 'heatmap':
        return <Activity className="h-4 w-4" />
      case 'dashboard':
        return <Monitor className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  // 获取图表类型样式
  const getChartTypeStyle = (type: string) => {
    switch (type) {
      case 'line':
        return { label: '折线图', color: 'bg-blue-100 text-blue-800' }
      case 'bar':
        return { label: '柱状图', color: 'bg-green-100 text-green-800' }
      case 'pie':
        return { label: '饼图', color: 'bg-yellow-100 text-yellow-800' }
      case 'scatter':
        return { label: '散点图', color: 'bg-purple-100 text-purple-800' }
      case 'heatmap':
        return { label: '热力图', color: 'bg-red-100 text-red-800' }
      case 'dashboard':
        return { label: '仪表盘', color: 'bg-indigo-100 text-indigo-800' }
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800' }
    }
  }

  // 简单的图表渲染组件
  const renderChart = (chart: ChartData) => {
    const isDark = theme === 'dark'
    
    switch (chart.type) {
      case 'line':
        return (
          <div className="relative h-64">
            <svg width="100%" height="100%" className="border rounded">
              {/* 简化的折线图 */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              
              {/* 背景网格 */}
              <g stroke={isDark ? "#374151" : "#E5E7EB"} strokeWidth="1" opacity="0.5">
                {[1,2,3,4,5].map(i => (
                  <line key={i} x1="0" y1={`${i*20}%`} x2="100%" y2={`${i*20}%`} />
                ))}
                {[1,2,3,4,5].map(i => (
                  <line key={i} x1={`${i*20}%`} y1="0" x2={`${i*20}%`} y2="100%" />
                ))}
              </g>
              
              {/* 示例数据线 */}
              <polyline
                fill="url(#lineGradient)"
                stroke="#3B82F6"
                strokeWidth="2"
                points="50,200 100,150 150,180 200,120 250,100 300,140 350,90"
              />
              <polyline
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="5,5"
                points="50,180 100,160 150,140 200,130 250,110 300,120 350,100"
              />
            </svg>
            <div className="absolute bottom-2 left-2 text-xs text-gray-600 dark:text-gray-400">
              时间趋势分析
            </div>
          </div>
        )
        
      case 'bar':
        return (
          <div className="h-64 flex items-end justify-around p-4 border rounded">
            {[65, 45, 78, 52, 89, 34, 67].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                  style={{ height: `${value}%` }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
            ))}
          </div>
        )
        
      case 'pie':
        return (
          <div className="h-64 flex items-center justify-center border rounded">
            <svg width="200" height="200">
              <circle cx="100" cy="100" r="80" fill="#3B82F6" />
              <circle cx="100" cy="100" r="80" fill="#EF4444" 
                strokeDasharray="251.2 251.2" 
                strokeDashoffset="125.6" 
                stroke="#EF4444" 
                strokeWidth="160" 
                fillOpacity="0"
              />
              <circle cx="100" cy="100" r="80" fill="#10B981" 
                strokeDasharray="125.6 376.8" 
                strokeDashoffset="0" 
                stroke="#10B981" 
                strokeWidth="160" 
                fillOpacity="0"
              />
              <text x="100" y="105" textAnchor="middle" className="text-sm font-semibold fill-white">
                分布图
              </text>
            </svg>
          </div>
        )
        
      case 'dashboard':
        return (
          <div className="h-64 border rounded bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
                <div className="text-2xl font-bold text-blue-600">85.4%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">转化率</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
                <div className="text-2xl font-bold text-green-600">¥12.5M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">营收</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
                <div className="text-2xl font-bold text-purple-600">2.8K</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">新用户</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow">
                <div className="text-2xl font-bold text-red-600">↑15%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">增长率</div>
              </div>
            </div>
          </div>
        )
        
      default:
        return (
          <div className="h-64 border rounded flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>图表展示区域</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          数据可视化
        </h3>
        <Badge variant="outline" className="ml-2">
          {charts.length} 个图表
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => {
          const typeStyle = getChartTypeStyle(chart.type)
          
          return (
            <Card key={chart.id} className={`group hover:shadow-xl transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={typeStyle.color}>
                        {getChartIcon(chart.type)}
                        <span className="ml-1">{typeStyle.label}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{chart.title}</CardTitle>
                    <CardDescription>{chart.description}</CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedChart(chart)}
                      className="flex items-center gap-2"
                    >
                      <Maximize2 className="h-3 w-3" />
                      放大
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* 图表展示区域 */}
                <div className="mb-4">
                  {renderChart(chart)}
                </div>

                {/* 洞察分析 */}
                {chart.insights && chart.insights.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      关键洞察
                    </h4>
                    <ul className="space-y-1">
                      {chart.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 图表详情模态框 */}
      {selectedChart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getChartIcon(selectedChart.type)}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedChart.title}</h2>
                    <p className="text-blue-100">{selectedChart.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedChart(null)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              {/* 大图展示 */}
              <div className="mb-6">
                <div className="h-96">
                  {renderChart(selectedChart)}
                </div>
              </div>

              {/* 详细洞察 */}
              {selectedChart.insights && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    数据洞察
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedChart.insights.map((insight, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${
                        theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 图表使用提示 */}
      <div className={`rounded-lg border p-4 ${
        theme === 'dark' 
          ? 'border-blue-600 bg-blue-900/20' 
          : 'border-blue-200 bg-blue-50'
      }`}>
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              图表制作工具
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              这些图表使用 Python (Matplotlib, Seaborn, Plotly)、Excel、Power BI、Tableau 等工具制作。
              每个图表都经过精心设计，确保数据的准确性和可读性。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
