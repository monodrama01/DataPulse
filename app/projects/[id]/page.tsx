// 服务端文件：用于静态导出时预生成路径，并渲染客户端页面
import ClientProjectPage from "./ClientPage"
import { mockProjects } from "@/lib/projects"

export async function generateStaticParams() {
  // 预生成所有项目的 id 路径，满足 output: 'export' 的要求
  return mockProjects.map(p => ({ id: p.id }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <ClientProjectPage initialProjectId={params.id} />
}

// 不同类型项目的详情渲染组件
function NotebookViewer({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Notebook 预览</h3>
        <div className="bg-white dark:bg-gray-900 rounded border p-4 min-h-96">
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <FileText className="h-12 w-12 mx-auto mb-4" />
            <p>Notebook 完整渲染视图</p>
            <p className="text-sm mt-2">这里将显示完整的 Jupyter Notebook HTML 渲染</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExcelViewer({ project }: { project: Project }) {
  const { theme } = useTheme()

  const handleDownload = () => {
    // Excel模板文件准备中
    alert('📥 Excel模板文件准备中\n\n您可以查看其他项目类型：\n• Notebook项目 - 完整的数据分析过程\n• Dashboard项目 - 数据可视化看板\n• SQL项目 - 真实数据集查询\n\n敬请期待Excel模板上线！')
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <CardContent className="p-6 space-y-6">
        {/* 模板简介 */}
        <div>
          <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 下载按钮 */}
        <div className="flex gap-3">
          <Button className="flex-1" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            立即下载模板
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Eye className="h-4 w-4 mr-2" />
            查看使用说明
          </Button>
        </div>

        {/* 模板截图（占位） */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-8 border-2 border-dashed border-green-200 dark:border-green-700">
          <div className="text-center space-y-3">
            <FileSpreadsheet className="h-16 w-16 mx-auto text-green-600 dark:text-green-400" />
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                Excel 模板预览
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                下载后可直接在 Excel 中打开使用
              </div>
            </div>
          </div>
        </div>

        {/* 模板特点 */}
        <div>
          <h4 className="font-semibold mb-3">✨ 模板特点</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium">开箱即用</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  无需配置，下载即可使用
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium">公式自动化</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  内置公式，自动计算结果
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium">可视化图表</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  内置图表，数据自动更新
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium">兼容性好</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  支持 Excel 2016+ / WPS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>文件格式：.xlsx</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{project.author}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardViewer({ project }: { project: Project }) {
  const { theme } = useTheme()
  
  // 根据项目ID生成对应的Dashboard预览内容
  const getDashboardPreview = (projectId: string) => {
    const dashboards: Record<string, { title: string; sections: { title: string; metrics: { label: string; value: string; trend?: string; color: string }[] }[] }> = {
      '6': {
        title: '电商运营全景数据看板',
        sections: [
          {
            title: '核心业务指标',
            metrics: [
              { label: 'GMV (本月)', value: '¥12.8M', trend: '+15.3%', color: 'from-blue-500 to-cyan-500' },
              { label: '订单量', value: '45,678', trend: '+8.7%', color: 'from-green-500 to-teal-500' },
              { label: '转化率', value: '3.24%', trend: '+0.5%', color: 'from-purple-500 to-pink-500' },
              { label: '客单价', value: '¥280', trend: '+6.2%', color: 'from-orange-500 to-red-500' }
            ]
          },
          {
            title: '流量分析',
            metrics: [
              { label: 'UV (日均)', value: '125K', trend: '+12%', color: 'from-cyan-500 to-blue-500' },
              { label: 'PV (日均)', value: '489K', trend: '+9%', color: 'from-teal-500 to-green-500' },
              { label: '人均访问', value: '3.9页', trend: '-2%', color: 'from-pink-500 to-purple-500' },
              { label: '停留时长', value: '4m 32s', trend: '+15%', color: 'from-red-500 to-orange-500' }
            ]
          }
        ]
      },
      '16': {
        title: '用户行为分析看板',
        sections: [
          {
            title: '用户活跃度',
            metrics: [
              { label: 'DAU', value: '28.5K', trend: '+18%', color: 'from-blue-500 to-cyan-500' },
              { label: 'MAU', value: '156K', trend: '+12%', color: 'from-green-500 to-teal-500' },
              { label: 'DAU/MAU', value: '18.3%', trend: '+3%', color: 'from-purple-500 to-pink-500' },
              { label: '次日留存', value: '45.2%', trend: '+5%', color: 'from-orange-500 to-red-500' }
            ]
          },
          {
            title: '用户价值',
            metrics: [
              { label: 'LTV', value: '¥1,280', trend: '+22%', color: 'from-cyan-500 to-blue-500' },
              { label: '付费转化', value: '12.8%', trend: '+4%', color: 'from-teal-500 to-green-500' },
              { label: 'ARPU', value: '¥45', trend: '+8%', color: 'from-pink-500 to-purple-500' },
              { label: '回购率', value: '28.5%', trend: '+6%', color: 'from-red-500 to-orange-500' }
            ]
          }
        ]
      },
      '17': {
        title: '营销活动效果分析看板',
        sections: [
          {
            title: '营销ROI',
            metrics: [
              { label: '总投入', value: '¥2.5M', trend: '+20%', color: 'from-blue-500 to-cyan-500' },
              { label: '总产出', value: '¥8.9M', trend: '+35%', color: 'from-green-500 to-teal-500' },
              { label: 'ROI', value: '3.56', trend: '+12%', color: 'from-purple-500 to-pink-500' },
              { label: 'CAC', value: '¥82', trend: '-15%', color: 'from-orange-500 to-red-500' }
            ]
          },
          {
            title: '渠道效果',
            metrics: [
              { label: '搜索引擎', value: '32%', trend: '+5%', color: 'from-cyan-500 to-blue-500' },
              { label: '社交媒体', value: '28%', trend: '+8%', color: 'from-teal-500 to-green-500' },
              { label: '信息流', value: '25%', trend: '+3%', color: 'from-pink-500 to-purple-500' },
              { label: '其他', value: '15%', trend: '-2%', color: 'from-red-500 to-orange-500' }
            ]
          }
        ]
      },
      '18': {
        title: '供应链库存管理看板',
        sections: [
          {
            title: '库存概览',
            metrics: [
              { label: '总库存', value: '¥18.5M', trend: '+8%', color: 'from-blue-500 to-cyan-500' },
              { label: '周转率', value: '4.2次/月', trend: '+12%', color: 'from-green-500 to-teal-500' },
              { label: '缺货率', value: '2.3%', trend: '-15%', color: 'from-purple-500 to-pink-500' },
              { label: '库存准确率', value: '98.5%', trend: '+2%', color: 'from-orange-500 to-red-500' }
            ]
          },
          {
            title: '采购与供应商',
            metrics: [
              { label: '待采购', value: '156项', trend: '-8%', color: 'from-cyan-500 to-blue-500' },
              { label: '在途商品', value: '¥3.2M', trend: '+5%', color: 'from-teal-500 to-green-500' },
              { label: '供应商数', value: '45家', trend: '+3', color: 'from-pink-500 to-purple-500' },
              { label: '履约率', value: '96.8%', trend: '+4%', color: 'from-red-500 to-orange-500' }
            ]
          }
        ]
      },
      '19': {
        title: '财务报表驾驶舱',
        sections: [
          {
            title: '利润表',
            metrics: [
              { label: '营业收入', value: '¥45.2M', trend: '+18%', color: 'from-blue-500 to-cyan-500' },
              { label: '营业成本', value: '¥28.6M', trend: '+12%', color: 'from-green-500 to-teal-500' },
              { label: '毛利润', value: '¥16.6M', trend: '+28%', color: 'from-purple-500 to-pink-500' },
              { label: '净利润', value: '¥6.8M', trend: '+35%', color: 'from-orange-500 to-red-500' }
            ]
          },
          {
            title: '财务比率',
            metrics: [
              { label: '毛利率', value: '36.7%', trend: '+3%', color: 'from-cyan-500 to-blue-500' },
              { label: 'ROE', value: '18.5%', trend: '+5%', color: 'from-teal-500 to-green-500' },
              { label: 'ROA', value: '12.3%', trend: '+4%', color: 'from-pink-500 to-purple-500' },
              { label: '资产负债率', value: '45.2%', trend: '-2%', color: 'from-red-500 to-orange-500' }
            ]
          }
        ]
      }
    }
    return dashboards[projectId] || dashboards['6']
  }

  const dashboardData = getDashboardPreview(project.id)

  // 生成趋势图SVG（增强版 - 带网格线、坐标轴、图例）
  const renderTrendChart = (data: { date: string; current: number; last: number }[], isDark: boolean) => {
    const width = 800
    const height = 300
    const padding = { top: 40, right: 40, bottom: 60, left: 60 }
    
    const allValues = [...data.map(d => d.current), ...data.map(d => d.last)]
    const max = Math.max(...allValues)
    const min = Math.min(...allValues)
    const range = max - min || 1
    
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom
    
    // 生成当前年数据点
    const currentPoints = data.map((item, index) => {
      const x = padding.left + (index / (data.length - 1)) * chartWidth
      const y = padding.top + chartHeight - ((item.current - min) / range) * chartHeight
      return { x, y, value: item.current }
    })
    
    // 生成去年数据点
    const lastPoints = data.map((item, index) => {
      const x = padding.left + (index / (data.length - 1)) * chartWidth
      const y = padding.top + chartHeight - ((item.last - min) / range) * chartHeight
      return { x, y, value: item.last }
    })
    
    const currentLine = currentPoints.map(p => `${p.x},${p.y}`).join(' ')
    const lastLine = lastPoints.map(p => `${p.x},${p.y}`).join(' ')
    
    const currentArea = `${padding.left},${padding.top + chartHeight} ` + currentLine + ` ${padding.left + chartWidth},${padding.top + chartHeight}`
    
    // 网格线
    const gridLines = []
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      gridLines.push(
        <line
          key={`grid-${i}`}
          x1={padding.left}
          y1={y}
          x2={padding.left + chartWidth}
          y2={y}
          stroke={isDark ? '#374151' : '#e5e7eb'}
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      )
    }
    
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="gradient-current" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* 网格线 */}
        {gridLines}
        
        {/* Y轴标签 */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const value = min + (range / 5) * (5 - i)
          const y = padding.top + (chartHeight / 5) * i
          return (
            <text
              key={`y-label-${i}`}
              x={padding.left - 10}
              y={y + 5}
              textAnchor="end"
              className="text-xs"
              fill={isDark ? '#9ca3af' : '#6b7280'}
            >
              {value.toFixed(0)}
            </text>
          )
        })}
        
        {/* X轴标签 */}
        {data.map((item, index) => {
          const x = padding.left + (index / (data.length - 1)) * chartWidth
          return (
            <text
              key={`x-label-${index}`}
              x={x}
              y={padding.top + chartHeight + 25}
              textAnchor="middle"
              className="text-xs"
              fill={isDark ? '#9ca3af' : '#6b7280'}
            >
              {item.date}
            </text>
          )
        })}
        
        {/* 当前年数据区域 */}
        <polygon points={currentArea} fill="url(#gradient-current)" />
        
        {/* 去年数据线 */}
        <polyline
          points={lastLine}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="5,5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 当前年数据线 */}
        <polyline
          points={currentLine}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 数据点 */}
        {currentPoints.map((point, index) => (
          <g key={`current-point-${index}`}>
            <circle cx={point.x} cy={point.y} r="5" fill="#3b82f6" />
            <circle cx={point.x} cy={point.y} r="3" fill="white" />
          </g>
        ))}
        
        {lastPoints.map((point, index) => (
          <circle key={`last-point-${index}`} cx={point.x} cy={point.y} r="4" fill="#10b981" />
        ))}
        
        {/* 图例 */}
        <g transform={`translate(${width - padding.right - 150}, 15)`}>
          <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
          <text x="18" y="10" className="text-xs" fill={isDark ? '#e5e7eb' : '#374151'}>
            今年 {currentPoints[currentPoints.length - 1].value.toFixed(0)}
          </text>
          
          <rect x="80" y="0" width="12" height="12" fill="#10b981" rx="2" />
          <text x="98" y="10" className="text-xs" fill={isDark ? '#e5e7eb' : '#374151'}>
            去年 {lastPoints[lastPoints.length - 1].value.toFixed(0)}
          </text>
        </g>
      </svg>
    )
  }

  // 生成柱状图SVG（增强版 - 带坐标轴和数值标签）
  const renderBarChart = (data: { label: string; value: number; color: string }[], isDark: boolean) => {
    const width = 700
    const height = 300
    const padding = { top: 30, right: 30, bottom: 50, left: 80 }
    
    const max = Math.max(...data.map(d => d.value))
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom
    const barWidth = Math.min(chartWidth / data.length * 0.6, 80)
    const gap = (chartWidth - barWidth * data.length) / (data.length + 1)
    
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Y轴网格线 */}
        {[0, 25, 50, 75, 100].map((percent) => {
          const y = padding.top + chartHeight - (percent / 100) * chartHeight
          return (
            <g key={percent}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke={isDark ? '#374151' : '#e5e7eb'}
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs"
                fill={isDark ? '#9ca3af' : '#6b7280'}
              >
                {percent}%
              </text>
            </g>
          )
        })}
        
        {/* 柱状条 */}
        {data.map((item, index) => {
          const x = padding.left + gap + index * (barWidth + gap)
          const normalizedValue = (item.value / max) * 100
          const barHeight = (normalizedValue / 100) * chartHeight
          const y = padding.top + chartHeight - barHeight
          
          return (
            <g key={index}>
              {/* 柱状条 */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color}
                rx="6"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              
              {/* X轴标签 */}
              <text
                x={x + barWidth / 2}
                y={padding.top + chartHeight + 20}
                textAnchor="middle"
                className="text-xs"
                fill={isDark ? '#9ca3af' : '#6b7280'}
              >
                {item.label}
              </text>
              
              {/* 数值标签 */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="text-xs font-bold"
                fill={item.color}
              >
                {item.value.toLocaleString()}
              </text>
            </g>
          )
        })}
        
        {/* X轴 */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke={isDark ? '#4b5563' : '#d1d5db'}
          strokeWidth="2"
        />
        
        {/* Y轴 */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke={isDark ? '#4b5563' : '#d1d5db'}
          strokeWidth="2"
        />
      </svg>
    )
  }

  // 生成饼图SVG
  const renderPieChart = (data: { label: string; value: number; color: string }[]) => {
    const size = 280
    const center = size / 2
    const radius = size / 2 - 30
    const total = data.reduce((sum, d) => sum + d.value, 0)
    
    let currentAngle = -90
    
    return (
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {data.map((item, index) => {
          const percentage = item.value / total
          const angle = percentage * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          
          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180
          
          const x1 = center + radius * Math.cos(startRad)
          const y1 = center + radius * Math.sin(startRad)
          const x2 = center + radius * Math.cos(endRad)
          const y2 = center + radius * Math.sin(endRad)
          
          const largeArc = angle > 180 ? 1 : 0
          const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
          
          // 计算标签位置（在扇形中心）
          const midAngle = (startAngle + endAngle) / 2
          const midRad = (midAngle * Math.PI) / 180
          const labelRadius = radius * 0.7
          const labelX = center + labelRadius * Math.cos(midRad)
          const labelY = center + labelRadius * Math.sin(midRad)
          
          currentAngle += angle
          
          return (
            <g key={index}>
              <path
                d={path}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
              {percentage > 0.08 && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-xs font-semibold pointer-events-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {(percentage * 100).toFixed(0)}%
                </text>
              )}
            </g>
          )
        })}
        {/* 中心空白圆 */}
        <circle cx={center} cy={center} r={radius * 0.45} fill="white" className="dark:fill-gray-900" />
        
        {/* 图例 */}
        <g transform={`translate(${size - 100}, 20)`}>
          {data.map((item, index) => (
            <g key={index} transform={`translate(0, ${index * 24})`}>
              <rect x="0" y="0" width="12" height="12" fill={item.color} rx="2" />
              <text x="18" y="10" className="fill-gray-700 dark:fill-gray-300 text-xs">
                {item.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    )
  }

  // 根据项目ID获取图表数据
  const getChartData = (projectId: string) => {
    const charts: Record<string, any> = {
      '6': {
        trend: [
          { date: '1日', current: 11200, last: 10800 },
          { date: '4日', current: 12500, last: 11500 },
          { date: '7日', current: 13200, last: 11800 },
          { date: '10日', current: 12800, last: 12200 },
          { date: '14日', current: 14100, last: 12500 },
          { date: '18日', current: 13500, last: 13200 },
          { date: '22日', current: 14800, last: 13800 },
          { date: '25日', current: 15200, last: 14200 },
          { date: '28日', current: 15800, last: 14600 }
        ],
        bar: [
          { label: '电子产品', value: 680, color: '#3b82f6' },
          { label: '服装箱包', value: 540, color: '#10b981' },
          { label: '食品饮料', value: 420, color: '#8b5cf6' },
          { label: '家居用品', value: 360, color: '#f59e0b' },
          { label: '美妆护理', value: 280, color: '#ef4444' },
          { label: '运动户外', value: 220, color: '#06b6d4' }
        ],
        pie: [
          { label: '移动端', value: 12850, color: '#3b82f6' },
          { label: 'PC端', value: 5680, color: '#10b981' },
          { label: '平板', value: 2150, color: '#8b5cf6' },
          { label: '其他', value: 1320, color: '#f59e0b' }
        ]
      },
      '16': {
        trend: [
          { date: '1日', current: 45800, last: 38200 },
          { date: '4日', current: 47500, last: 39100 },
          { date: '7日', current: 48200, last: 40800 },
          { date: '10日', current: 50500, last: 42600 },
          { date: '14日', current: 52800, last: 44200 },
          { date: '18日', current: 54200, last: 45800 },
          { date: '22日', current: 56500, last: 47500 },
          { date: '25日', current: 58200, last: 49100 },
          { date: '28日', current: 60000, last: 50800 }
        ],
        bar: [
          { label: '高价值用户', value: 18500, color: '#3b82f6' },
          { label: '成长用户', value: 25800, color: '#10b981' },
          { label: '潜力用户', value: 12200, color: '#8b5cf6' },
          { label: '沉睡用户', value: 8900, color: '#f59e0b' },
          { label: '流失用户', value: 4200, color: '#ef4444' }
        ],
        pie: [
          { label: '18-25岁', value: 18500, color: '#3b82f6' },
          { label: '26-35岁', value: 28200, color: '#10b981' },
          { label: '36-45岁', value: 15800, color: '#8b5cf6' },
          { label: '46岁以上', value: 7500, color: '#f59e0b' }
        ]
      },
      '17': {
        trend: [
          { date: '1日', current: 2.2, last: 1.8 },
          { date: '4日', current: 2.5, last: 2.0 },
          { date: '7日', current: 2.8, last: 2.2 },
          { date: '10日', current: 3.1, last: 2.5 },
          { date: '14日', current: 3.4, last: 2.8 },
          { date: '18日', current: 3.7, last: 3.0 },
          { date: '22日', current: 4.0, last: 3.3 },
          { date: '25日', current: 4.3, last: 3.6 },
          { date: '28日', current: 4.6, last: 3.9 }
        ],
        bar: [
          { label: '抖音', value: 485, color: '#3b82f6' },
          { label: '微信朋友圈', value: 352, color: '#10b981' },
          { label: '百度推广', value: 298, color: '#8b5cf6' },
          { label: '小红书', value: 186, color: '#f59e0b' },
          { label: '知乎', value: 125, color: '#ef4444' },
          { label: '其他渠道', value: 89, color: '#06b6d4' }
        ],
        pie: [
          { label: '社交媒体', value: 42, color: '#3b82f6' },
          { label: '搜索引擎', value: 28, color: '#10b981' },
          { label: '信息流', value: 18, color: '#8b5cf6' },
          { label: '其他来源', value: 12, color: '#f59e0b' }
        ]
      },
      '18': {
        trend: [
          { date: '1日', current: 5.2, last: 4.8 },
          { date: '4日', current: 5.4, last: 5.0 },
          { date: '7日', current: 5.6, last: 5.2 },
          { date: '10日', current: 5.8, last: 5.3 },
          { date: '14日', current: 6.0, last: 5.5 },
          { date: '18日', current: 6.2, last: 5.7 },
          { date: '22日', current: 6.5, last: 5.9 },
          { date: '25日', current: 6.8, last: 6.2 },
          { date: '28日', current: 7.1, last: 6.5 }
        ],
        bar: [
          { label: 'A类商品', value: 1580, color: '#3b82f6' },
          { label: 'B类商品', value: 2850, color: '#10b981' },
          { label: 'C类商品', value: 4820, color: '#f59e0b' }
        ],
        pie: [
          { label: '库存充足', value: 62, color: '#10b981' },
          { label: '库存正常', value: 28, color: '#3b82f6' },
          { label: '库存预警', value: 10, color: '#ef4444' }
        ]
      },
      '19': {
        trend: [
          { date: 'Q1', current: 8520, last: 7850 },
          { date: '', current: 8800, last: 8120 },
          { date: 'Q2', current: 9180, last: 8650 },
          { date: '', current: 9520, last: 8980 },
          { date: 'Q3', current: 10250, last: 9420 },
          { date: '', current: 10680, last: 9850 },
          { date: 'Q4', current: 11200, last: 10380 },
          { date: '', current: 11580, last: 10720 },
          { date: '年底', current: 12000, last: 11100 }
        ],
        bar: [
          { label: 'Q1', value: 8520, color: '#3b82f6' },
          { label: 'Q2', value: 9350, color: '#10b981' },
          { label: 'Q3', value: 10465, color: '#8b5cf6' },
          { label: 'Q4', value: 11390, color: '#06b6d4' }
        ],
        pie: [
          { label: '核心业务', value: 58, color: '#3b82f6' },
          { label: '新兴业务', value: 28, color: '#10b981' },
          { label: '其他业务', value: 14, color: '#8b5cf6' }
        ]
      }
    }
    return charts[projectId] || charts['6']
  }

  const chartData = getChartData(project.id)

  // 根据项目ID获取图表标题
  const getChartTitles = (projectId: string) => {
    const titles: Record<string, { trend: string; bar: string; pie: string }> = {
      '6': {
        trend: '30天GMV趋势对比（今年 vs 去年）',
        bar: '品类销售额排行（万元）',
        pie: '访问端占比分布'
      },
      '16': {
        trend: '30天DAU增长趋势对比',
        bar: '用户分层统计（人数）',
        pie: '用户年龄分布'
      },
      '17': {
        trend: '30天ROI趋势对比',
        bar: '渠道投放效果（万元）',
        pie: '转化来源占比'
      },
      '18': {
        trend: '30天库存周转率趋势',
        bar: 'ABC类商品库存（万元）',
        pie: '库存状态分布'
      },
      '19': {
        trend: '季度利润趋势对比（万元）',
        bar: '季度收入对比（万元）',
        pie: '收入结构占比'
      }
    }
    return titles[projectId] || titles['6']
  }

  const chartTitles = getChartTitles(project.id)

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            {dashboardData.title}
          </h3>
          <Badge variant="outline" className="text-xs">
            {project.tags[0]} 看板预览
          </Badge>
        </div>

        {/* Dashboard 预览内容 */}
        <div className="space-y-6">
          {dashboardData.sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.metrics.map((metric, metricIdx) => (
                  <div
                    key={metricIdx}
                    className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${metric.color} p-[1px]`}
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 h-full">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {metric.label}
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-br ${metric.color} bg-clip-text text-transparent">
                          {metric.value}
                        </div>
                        {metric.trend && (
                          <div className={`text-sm font-semibold ${
                            metric.trend.startsWith('+') 
                              ? 'text-green-600 dark:text-green-400' 
                              : metric.trend.startsWith('-')
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {metric.trend}
            </div>
          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 图表区域 */}
        <div className="mt-8 space-y-4">
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">
            数据可视化
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 趋势图 */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                {chartTitles.trend}
              </h5>
              <div className="h-72">
                {renderTrendChart(chartData.trend, theme === 'dark')}
              </div>
            </div>

            {/* 饼图 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                {chartTitles.pie}
              </h5>
              <div className="h-72 flex items-center justify-center">
                {renderPieChart(chartData.pie)}
              </div>
            </div>
          </div>

          {/* 柱状图 - 单独一行 */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              {chartTitles.bar}
            </h5>
            <div className="h-72">
              {renderBarChart(chartData.bar, theme === 'dark')}
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <ExternalLink className="h-4 w-4" />
              <span>这是 Dashboard 静态预览，实际看板支持交互式钻取和筛选</span>
            </div>
            {project.linkUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(project.linkUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                访问完整看板
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SQLViewer({ project }: { project: Project }) {
  const [showDataset, setShowDataset] = useState(false)
  const [datasetData, setDatasetData] = useState<any[]>([])
  const [datasetColumns, setDatasetColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // 根据项目ID获取对应的SQL查询和结果
  const getSQLContent = (projectId: string) => {
    const sqlMap: Record<string, { sql: string; resultColumns: string[]; resultData: any[] }> = {
      '8': {
        sql: `-- 用户订单窗口函数分析
-- 使用 ROW_NUMBER、LAG 等窗口函数分析用户订单行为

  SELECT 
    user_id,
    order_id,
    order_date,
    amount,
    -- 为每个用户的订单按日期排序并编号
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) as order_seq,
    -- 计算与上一次订单的时间间隔（天数）
    DATEDIFF(day, LAG(order_date) OVER (PARTITION BY user_id ORDER BY order_date), order_date) as days_since_last_order,
    -- 计算累计消费金额
    SUM(amount) OVER (PARTITION BY user_id ORDER BY order_date 
                      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as cumulative_amount,
    -- 计算最近3次订单的平均金额
    AVG(amount) OVER (PARTITION BY user_id ORDER BY order_date 
                      ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as avg_last_3_orders
  FROM orders 
WHERE order_date >= '2024-01-01'
ORDER BY user_id, order_date;`,
        resultColumns: ['user_id', 'order_id', 'order_date', 'amount', 'order_seq', 'days_since_last_order', 'cumulative_amount', 'avg_last_3_orders'],
        resultData: [
          { user_id: 'U001', order_id: 'ORD001', order_date: '2024-01-15', amount: 299.00, order_seq: 1, days_since_last_order: null, cumulative_amount: 299.00, avg_last_3_orders: 299.00 },
          { user_id: 'U001', order_id: 'ORD045', order_date: '2024-02-20', amount: 458.50, order_seq: 2, days_since_last_order: 36, cumulative_amount: 757.50, avg_last_3_orders: 378.75 },
          { user_id: 'U001', order_id: 'ORD089', order_date: '2024-03-10', amount: 189.00, order_seq: 3, days_since_last_order: 19, cumulative_amount: 946.50, avg_last_3_orders: 315.50 },
          { user_id: 'U002', order_id: 'ORD012', order_date: '2024-01-22', amount: 567.80, order_seq: 1, days_since_last_order: null, cumulative_amount: 567.80, avg_last_3_orders: 567.80 },
          { user_id: 'U002', order_id: 'ORD056', order_date: '2024-02-05', amount: 234.50, order_seq: 2, days_since_last_order: 14, cumulative_amount: 802.30, avg_last_3_orders: 401.15 },
        ]
      },
      '9': {
        sql: `-- 时间序列销售趋势分析
-- 计算7日移动平均、同比环比、趋势预测

SELECT 
    sale_date,
    revenue,
    -- 7日移动平均
    AVG(revenue) OVER (ORDER BY sale_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as ma_7d,
    -- 环比增长率（与前一天对比）
    ROUND((revenue - LAG(revenue) OVER (ORDER BY sale_date)) * 100.0 / 
          LAG(revenue) OVER (ORDER BY sale_date), 2) as mom_growth_pct,
    -- 同比增长率（与7天前对比）
    ROUND((revenue - LAG(revenue, 7) OVER (ORDER BY sale_date)) * 100.0 / 
          LAG(revenue, 7) OVER (ORDER BY sale_date), 2) as wow_growth_pct,
    -- 累计销售额
    SUM(revenue) OVER (ORDER BY sale_date) as cumulative_revenue,
    -- 排名（按销售额降序）
    DENSE_RANK() OVER (ORDER BY revenue DESC) as revenue_rank
FROM daily_sales
WHERE sale_date >= '2024-01-01'
ORDER BY sale_date;`,
        resultColumns: ['sale_date', 'revenue', 'ma_7d', 'mom_growth_pct', 'wow_growth_pct', 'cumulative_revenue', 'revenue_rank'],
        resultData: [
          { sale_date: '2024-01-01', revenue: 45280.50, ma_7d: 45280.50, mom_growth_pct: null, wow_growth_pct: null, cumulative_revenue: 45280.50, revenue_rank: 12 },
          { sale_date: '2024-01-02', revenue: 52340.80, ma_7d: 48810.65, mom_growth_pct: 15.59, wow_growth_pct: null, cumulative_revenue: 97621.30, revenue_rank: 8 },
          { sale_date: '2024-01-03', revenue: 38920.30, ma_7d: 45513.87, mom_growth_pct: -25.64, wow_growth_pct: null, cumulative_revenue: 136541.60, revenue_rank: 28 },
          { sale_date: '2024-01-04', revenue: 61450.00, ma_7d: 49497.90, mom_growth_pct: 57.88, wow_growth_pct: null, cumulative_revenue: 197991.60, revenue_rank: 3 },
          { sale_date: '2024-01-05', revenue: 47890.20, ma_7d: 49176.36, mom_growth_pct: -22.07, wow_growth_pct: null, cumulative_revenue: 245881.80, revenue_rank: 15 },
        ]
      },
      '10': {
        sql: `-- 用户登录连续性分析（经典面试题）
-- 使用日期差分组法找出连续登录天数

WITH login_with_diff AS (
    SELECT 
        user_id,
        login_date,
        -- 计算登录日期与行号的差值（用于分组连续日期）
        DATE_SUB(login_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) DAY) as date_group
    FROM user_logins
),
continuous_periods AS (
    SELECT 
        user_id,
        date_group,
        MIN(login_date) as period_start,
        MAX(login_date) as period_end,
        COUNT(*) as continuous_days
    FROM login_with_diff
    GROUP BY user_id, date_group
)
SELECT 
    user_id,
    period_start,
    period_end,
    continuous_days,
    CASE 
        WHEN continuous_days >= 7 THEN '高活跃用户'
        WHEN continuous_days >= 3 THEN '中活跃用户'
        ELSE '低活跃用户'
    END as activity_level
FROM continuous_periods
WHERE continuous_days >= 3  -- 只显示连续登录3天及以上
ORDER BY user_id, period_start;`,
        resultColumns: ['user_id', 'period_start', 'period_end', 'continuous_days', 'activity_level'],
        resultData: [
          { user_id: 'U001', period_start: '2024-01-15', period_end: '2024-01-22', continuous_days: 8, activity_level: '高活跃用户' },
          { user_id: 'U001', period_start: '2024-02-10', period_end: '2024-02-14', continuous_days: 5, activity_level: '中活跃用户' },
          { user_id: 'U003', period_start: '2024-01-20', period_end: '2024-01-31', continuous_days: 12, activity_level: '高活跃用户' },
          { user_id: 'U005', period_start: '2024-02-01', period_end: '2024-02-05', continuous_days: 5, activity_level: '中活跃用户' },
          { user_id: 'U007', period_start: '2024-01-10', period_end: '2024-01-16', continuous_days: 7, activity_level: '高活跃用户' },
        ]
      },
      '11': {
        sql: `-- 员工薪资分析与排名
-- 部门统计、排名、高于均值员工查询

SELECT 
    e.employee_id,
    e.name,
    e.department,
    e.salary,
    -- 部门排名
    RANK() OVER (PARTITION BY e.department ORDER BY e.salary DESC) as dept_rank,
    -- 全公司排名
    DENSE_RANK() OVER (ORDER BY e.salary DESC) as company_rank,
    -- 部门平均薪资
    AVG(e.salary) OVER (PARTITION BY e.department) as dept_avg_salary,
    -- 薪资与部门平均的差值
    e.salary - AVG(e.salary) OVER (PARTITION BY e.department) as diff_from_avg,
    -- 判断是否高于部门平均
    CASE 
        WHEN e.salary > AVG(e.salary) OVER (PARTITION BY e.department) THEN '高于平均'
        ELSE '低于平均'
    END as salary_level
FROM employees e
ORDER BY e.department, dept_rank;`,
        resultColumns: ['employee_id', 'name', 'department', 'salary', 'dept_rank', 'company_rank', 'dept_avg_salary', 'diff_from_avg', 'salary_level'],
        resultData: [
          { employee_id: 'E001', name: '张三', department: '技术部', salary: 28000, dept_rank: 1, company_rank: 2, dept_avg_salary: 22500, diff_from_avg: 5500, salary_level: '高于平均' },
          { employee_id: 'E005', name: '李四', department: '技术部', salary: 25000, dept_rank: 2, company_rank: 4, dept_avg_salary: 22500, diff_from_avg: 2500, salary_level: '高于平均' },
          { employee_id: 'E012', name: '王五', department: '技术部', salary: 18000, dept_rank: 3, company_rank: 12, dept_avg_salary: 22500, diff_from_avg: -4500, salary_level: '低于平均' },
          { employee_id: 'E003', name: '赵六', department: '销售部', salary: 32000, dept_rank: 1, company_rank: 1, dept_avg_salary: 24000, diff_from_avg: 8000, salary_level: '高于平均' },
          { employee_id: 'E008', name: '孙七', department: '销售部', salary: 22000, dept_rank: 2, company_rank: 8, dept_avg_salary: 24000, diff_from_avg: -2000, salary_level: '低于平均' },
        ]
      },
      '12': {
        sql: `-- 学生成绩多维度分析
-- 计算总分、平均分、排名、及格率

WITH student_summary AS (
    SELECT 
        student_id,
        student_name,
        SUM(score) as total_score,
        AVG(score) as avg_score,
        COUNT(CASE WHEN score >= 60 THEN 1 END) as passed_subjects,
        COUNT(*) as total_subjects,
        MAX(CASE WHEN subject = '数学' THEN score END) as math_score,
        MAX(CASE WHEN subject = '英语' THEN score END) as english_score,
        MAX(CASE WHEN subject = '语文' THEN score END) as chinese_score
    FROM student_scores
    GROUP BY student_id, student_name
)
SELECT 
    student_id,
    student_name,
    total_score,
    ROUND(avg_score, 2) as avg_score,
    passed_subjects,
    total_subjects,
    ROUND(passed_subjects * 100.0 / total_subjects, 2) as pass_rate,
    RANK() OVER (ORDER BY total_score DESC) as total_rank,
    math_score,
    english_score,
    chinese_score,
    CASE 
        WHEN avg_score >= 90 THEN '优秀'
        WHEN avg_score >= 80 THEN '良好'
        WHEN avg_score >= 60 THEN '及格'
        ELSE '不及格'
    END as grade_level
FROM student_summary
ORDER BY total_score DESC;`,
        resultColumns: ['student_id', 'student_name', 'total_score', 'avg_score', 'passed_subjects', 'total_subjects', 'pass_rate', 'total_rank', 'math_score', 'english_score', 'chinese_score', 'grade_level'],
        resultData: [
          { student_id: 'S001', student_name: '张小明', total_score: 467, avg_score: 93.40, passed_subjects: 5, total_subjects: 5, pass_rate: 100, total_rank: 1, math_score: 98, english_score: 95, chinese_score: 92, grade_level: '优秀' },
          { student_id: 'S023', student_name: '李红', total_score: 458, avg_score: 91.60, passed_subjects: 5, total_subjects: 5, pass_rate: 100, total_rank: 2, math_score: 96, english_score: 94, chinese_score: 89, grade_level: '优秀' },
          { student_id: 'S045', student_name: '王刚', total_score: 412, avg_score: 82.40, passed_subjects: 5, total_subjects: 5, pass_rate: 100, total_rank: 3, math_score: 88, english_score: 85, chinese_score: 80, grade_level: '良好' },
          { student_id: 'S067', student_name: '刘丽', total_score: 389, avg_score: 77.80, passed_subjects: 5, total_subjects: 5, pass_rate: 100, total_rank: 4, math_score: 82, english_score: 79, chinese_score: 75, grade_level: '良好' },
          { student_id: 'S089', student_name: '陈涛', total_score: 312, avg_score: 62.40, passed_subjects: 4, total_subjects: 5, pass_rate: 80, total_rank: 5, math_score: 68, english_score: 65, chinese_score: 58, grade_level: '及格' },
        ]
      },
      '13': {
        sql: `-- 页面访问漏斗转化分析
-- 从首页到支付的完整转化漏斗

WITH funnel_data AS (
    SELECT 
        session_id,
        MAX(CASE WHEN page_name = '首页' THEN 1 ELSE 0 END) as reached_home,
        MAX(CASE WHEN page_name = '列表页' THEN 1 ELSE 0 END) as reached_list,
        MAX(CASE WHEN page_name = '详情页' THEN 1 ELSE 0 END) as reached_detail,
        MAX(CASE WHEN page_name = '购物车' THEN 1 ELSE 0 END) as reached_cart,
        MAX(CASE WHEN page_name = '支付页' THEN 1 ELSE 0 END) as reached_payment
    FROM page_views
    GROUP BY session_id
)
SELECT 
    '首页' as funnel_stage,
    SUM(reached_home) as user_count,
    100.0 as conversion_rate,
    NULL as lost_users
FROM funnel_data
UNION ALL
SELECT 
    '列表页' as funnel_stage,
    SUM(reached_list) as user_count,
    ROUND(SUM(reached_list) * 100.0 / NULLIF(SUM(reached_home), 0), 2) as conversion_rate,
    SUM(reached_home) - SUM(reached_list) as lost_users
FROM funnel_data
UNION ALL
SELECT 
    '详情页' as funnel_stage,
    SUM(reached_detail) as user_count,
    ROUND(SUM(reached_detail) * 100.0 / NULLIF(SUM(reached_list), 0), 2) as conversion_rate,
    SUM(reached_list) - SUM(reached_detail) as lost_users
FROM funnel_data
UNION ALL
SELECT 
    '购物车' as funnel_stage,
    SUM(reached_cart) as user_count,
    ROUND(SUM(reached_cart) * 100.0 / NULLIF(SUM(reached_detail), 0), 2) as conversion_rate,
    SUM(reached_detail) - SUM(reached_cart) as lost_users
FROM funnel_data
UNION ALL
SELECT 
    '支付页' as funnel_stage,
    SUM(reached_payment) as user_count,
    ROUND(SUM(reached_payment) * 100.0 / NULLIF(SUM(reached_cart), 0), 2) as conversion_rate,
    SUM(reached_cart) - SUM(reached_payment) as lost_users
FROM funnel_data;`,
        resultColumns: ['funnel_stage', 'user_count', 'conversion_rate', 'lost_users'],
        resultData: [
          { funnel_stage: '首页', user_count: 200, conversion_rate: 100.00, lost_users: null },
          { funnel_stage: '列表页', user_count: 156, conversion_rate: 78.00, lost_users: 44 },
          { funnel_stage: '详情页', user_count: 98, conversion_rate: 62.82, lost_users: 58 },
          { funnel_stage: '购物车', user_count: 52, conversion_rate: 53.06, lost_users: 46 },
          { funnel_stage: '支付页', user_count: 23, conversion_rate: 44.23, lost_users: 29 },
        ]
      },
      '14': {
        sql: `-- 库存进销存管理分析
-- 计算库存周转率、预警分析

WITH inventory_summary AS (
    SELECT 
        product_id,
        product_name,
        SUM(CASE WHEN change_type = 'IN' THEN quantity ELSE 0 END) as total_in,
        SUM(CASE WHEN change_type = 'OUT' THEN quantity ELSE 0 END) as total_out,
        SUM(CASE WHEN change_type = 'IN' THEN quantity ELSE -quantity END) as current_stock,
        AVG(CASE WHEN change_type = 'OUT' THEN quantity END) as avg_daily_out
    FROM inventory_changes
    GROUP BY product_id, product_name
)
SELECT 
    product_id,
    product_name,
    total_in as total_purchase,
    total_out as total_sales,
    current_stock,
    avg_daily_out as avg_daily_sales,
    ROUND(current_stock / NULLIF(avg_daily_out, 0), 1) as days_of_stock,
    ROUND(total_out * 100.0 / NULLIF(total_in, 0), 2) as turnover_rate,
    CASE 
        WHEN current_stock / NULLIF(avg_daily_out, 0) < 3 THEN '库存预警'
        WHEN current_stock / NULLIF(avg_daily_out, 0) < 7 THEN '库存偏低'
        WHEN current_stock / NULLIF(avg_daily_out, 0) > 30 THEN '库存积压'
        ELSE '库存正常'
    END as stock_status
FROM inventory_summary
ORDER BY days_of_stock;`,
        resultColumns: ['product_id', 'product_name', 'total_purchase', 'total_sales', 'current_stock', 'avg_daily_sales', 'days_of_stock', 'turnover_rate', 'stock_status'],
        resultData: [
          { product_id: 'P001', product_name: '笔记本电脑', total_purchase: 500, total_sales: 478, current_stock: 22, avg_daily_sales: 15.9, days_of_stock: 1.4, turnover_rate: 95.60, stock_status: '库存预警' },
          { product_id: 'P005', product_name: '无线鼠标', total_purchase: 800, total_sales: 745, current_stock: 55, avg_daily_sales: 24.8, days_of_stock: 2.2, turnover_rate: 93.13, stock_status: '库存预警' },
          { product_id: 'P012', product_name: '机械键盘', total_purchase: 350, total_sales: 298, current_stock: 52, avg_daily_sales: 9.9, days_of_stock: 5.3, turnover_rate: 85.14, stock_status: '库存偏低' },
          { product_id: 'P008', product_name: 'USB充电器', total_purchase: 1200, total_sales: 980, current_stock: 220, avg_daily_sales: 32.7, days_of_stock: 6.7, turnover_rate: 81.67, stock_status: '库存偏低' },
          { product_id: 'P018', product_name: '手机壳', total_purchase: 2000, total_sales: 1450, current_stock: 550, avg_daily_sales: 48.3, days_of_stock: 11.4, turnover_rate: 72.50, stock_status: '库存正常' },
        ]
      },
      '15': {
        sql: `-- 交易流水累计分析
-- 使用 SUM 窗口函数计算累计消费、月度汇总

SELECT 
    user_id,
    transaction_id,
    transaction_date,
    amount,
    category,
    -- 用户累计消费
    SUM(amount) OVER (PARTITION BY user_id ORDER BY transaction_date 
                      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as cumulative_amount,
    -- 用户当月累计
    SUM(amount) OVER (PARTITION BY user_id, DATE_FORMAT(transaction_date, '%Y-%m') 
                      ORDER BY transaction_date) as monthly_cumulative,
    -- 用户交易排名
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY transaction_date) as transaction_seq,
    -- 该笔交易占用户总消费的比例
    ROUND(amount * 100.0 / SUM(amount) OVER (PARTITION BY user_id), 2) as pct_of_total,
    -- 交易类别在该用户中的累计
    SUM(amount) OVER (PARTITION BY user_id, category ORDER BY transaction_date) as category_cumulative
FROM transactions
WHERE transaction_date >= '2024-01-01'
ORDER BY user_id, transaction_date;`,
        resultColumns: ['user_id', 'transaction_id', 'transaction_date', 'amount', 'category', 'cumulative_amount', 'monthly_cumulative', 'transaction_seq', 'pct_of_total', 'category_cumulative'],
        resultData: [
          { user_id: 'U001', transaction_id: 'T001', transaction_date: '2024-01-05', amount: 289.50, category: '餐饮', cumulative_amount: 289.50, monthly_cumulative: 289.50, transaction_seq: 1, pct_of_total: 5.23, category_cumulative: 289.50 },
          { user_id: 'U001', transaction_id: 'T025', transaction_date: '2024-01-12', amount: 1250.00, category: '购物', cumulative_amount: 1539.50, monthly_cumulative: 1539.50, transaction_seq: 2, pct_of_total: 22.58, category_cumulative: 1250.00 },
          { user_id: 'U001', transaction_id: 'T048', transaction_date: '2024-01-20', amount: 450.80, category: '娱乐', cumulative_amount: 1990.30, monthly_cumulative: 1990.30, transaction_seq: 3, pct_of_total: 8.14, category_cumulative: 450.80 },
          { user_id: 'U001', transaction_id: 'T089', transaction_date: '2024-02-03', amount: 680.00, category: '购物', cumulative_amount: 2670.30, monthly_cumulative: 680.00, transaction_seq: 4, pct_of_total: 12.28, category_cumulative: 1930.00 },
          { user_id: 'U001', transaction_id: 'T112', transaction_date: '2024-02-15', amount: 195.50, category: '餐饮', cumulative_amount: 2865.80, monthly_cumulative: 875.50, transaction_seq: 5, pct_of_total: 3.53, category_cumulative: 485.00 },
        ]
      }
    }
    return sqlMap[projectId] || sqlMap['8'] // 默认返回第一个
  }

  const loadDataset = async () => {
    if (!project.filePath) return
    
    setLoading(true)
    try {
      const response = await fetch(project.filePath)
      const text = await response.text()
      const lines = text.trim().split('\n')
      
      if (lines.length > 0) {
        const columns = lines[0].split(',')
        setDatasetColumns(columns)
        
        const data = lines.slice(1, 11).map(line => {
          const values = line.split(',')
          return columns.reduce((obj, col, idx) => {
            obj[col] = values[idx]
            return obj
          }, {} as any)
        })
        setDatasetData(data)
      }
    } catch (error) {
      console.error('Failed to load dataset:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showDataset) {
      loadDataset()
    }
  }, [showDataset])

  const sqlContent = getSQLContent(project.id)

  return (
    <div className="space-y-6">
      {/* 数据集预览 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            数据集
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDataset(!showDataset)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showDataset ? '隐藏数据' : '查看数据'}
            </Button>
            {project.filePath && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = project.filePath!
                  link.download = project.filePath!.split('/').pop() || 'dataset.csv'
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                下载CSV
              </Button>
            )}
          </div>
        </div>
        
        {showDataset && (
          <div className="bg-white dark:bg-gray-900 rounded border overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                加载中...
              </div>
            ) : datasetData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                    <tr>
                      {datasetColumns.map((col, idx) => (
                        <th key={idx} className="px-4 py-2 text-left text-sm font-semibold border-b">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datasetData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        {datasetColumns.map((col, colIdx) => (
                          <td key={colIdx} className="px-4 py-2 text-sm">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 text-center">
                  显示前10行，完整数据请下载CSV查看
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                暂无数据预览
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* SQL 代码 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">SQL 执行结果预览</h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-green-400">
            <code>{sqlContent.sql}</code>
          </pre>
        </div>
      </div>
      
      {/* 执行结果 */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">执行结果</h3>
        <div className="bg-white dark:bg-gray-900 rounded border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {sqlContent.resultColumns.map((col, idx) => (
                    <th key={idx} className="px-3 py-2 text-left font-semibold border-b whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sqlContent.resultData.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    {sqlContent.resultColumns.map((col, colIdx) => (
                      <td key={colIdx} className="px-3 py-2 whitespace-nowrap">
                        {row[col] !== null && row[col] !== undefined ? String(row[col]) : '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 text-center">
            显示前5行结果
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { theme } = useTheme()
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // 模拟从API获取项目详情
    const projectId = params.id as string
    const foundProject = mockProjects.find(p => p.id === projectId)
    
    setTimeout(() => {
      setProject(foundProject || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleDownload = () => {
    if (project?.filePath) {
      // 创建下载链接
      const link = document.createElement('a')
      link.href = project.filePath
      link.download = project.title
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: project?.description,
        url: window.location.href
      })
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            项目未找到
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            抱歉，您访问的项目不存在或已被删除。
          </p>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回项目列表
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = getProjectCategory(project.category)

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push(`/projects?category=${project.category}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
          </Button>
        </div>

        {/* 项目头部信息 */}
        <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardHeader>
            <div className="flex flex-col gap-6">
              {/* 项目信息 */}
              <div className="space-y-4">
                <div>
                  <Badge className={`${categoryInfo.color} mb-2`}>
                    {categoryInfo.icon} {categoryInfo.name}
                  </Badge>
                  <CardTitle className="text-2xl lg:text-3xl mb-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </div>

                {/* 项目标签 */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 项目元信息 */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {project.author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{project.author}</span>
                    </div>
                  )}
                  {project.fileSize && (
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{formatFileSize(project.fileSize)}</span>
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-wrap gap-3">
                  {project.category === 'dashboard' && project.linkUrl ? (
                    <Button onClick={() => window.open(project.linkUrl, '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      打开看板
                    </Button>
                  ) : project.filePath ? (
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      下载文件
                    </Button>
                  ) : null}
                  
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setLiked(!liked)}
                    className={liked ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                    {liked ? '已收藏' : '收藏'}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 项目内容详情 */}
        <div className="mb-8">
          {project.category === 'notebook' && <NotebookViewer project={project} />}
          {project.category === 'excel' && <ExcelViewer project={project} />}
          {project.category === 'dashboard' && <DashboardViewer project={project} />}
          {project.category === 'sql' && <SQLViewer project={project} />}
        </div>
        </div>
    </div>
  )
} 