"use client"

import { useEffect, useRef, useState } from "react"
import { FlowChart as FlowChartData, FlowNode, FlowConnection } from "@/lib/module-showcases"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface FlowChartProps {
  data: FlowChartData
  width?: number
  height?: number
  className?: string
}

export function FlowChart({ data, width = 600, height = 800, className = "" }: FlowChartProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // 绘制流程图
  const drawFlowChart = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布大小
    canvas.width = width
    canvas.height = height

    // 清除画布
    ctx.clearRect(0, 0, width, height)

    // 应用缩放和偏移
    ctx.save()
    ctx.scale(scale, scale)
    ctx.translate(offset.x, offset.y)

    const isDark = theme === 'dark'

    // 绘制连接线
    data.connections.forEach(connection => {
      const fromNode = data.nodes.find(n => n.id === connection.from)
      const toNode = data.nodes.find(n => n.id === connection.to)
      
      if (fromNode && toNode) {
        ctx.strokeStyle = isDark ? '#6B7280' : '#9CA3AF'
        ctx.lineWidth = 2
        ctx.setLineDash([])
        
        // 计算连接点
        const fromX = fromNode.x + (fromNode.width || 120) / 2
        const fromY = fromNode.y + (fromNode.height || 60)
        const toX = toNode.x + (toNode.width || 120) / 2
        const toY = toNode.y
        
        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.stroke()
        
        // 绘制箭头
        const arrowLength = 10
        const arrowAngle = Math.PI / 6
        const angle = Math.atan2(toY - fromY, toX - fromX)
        
        ctx.beginPath()
        ctx.moveTo(toX, toY)
        ctx.lineTo(
          toX - arrowLength * Math.cos(angle - arrowAngle),
          toY - arrowLength * Math.sin(angle - arrowAngle)
        )
        ctx.moveTo(toX, toY)
        ctx.lineTo(
          toX - arrowLength * Math.cos(angle + arrowAngle),
          toY - arrowLength * Math.sin(angle + arrowAngle)
        )
        ctx.stroke()
        
        // 绘制连接标签
        if (connection.label) {
          const midX = (fromX + toX) / 2
          const midY = (fromY + toY) / 2
          
          ctx.fillStyle = isDark ? '#F3F4F6' : '#374151'
          ctx.font = '12px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(connection.label, midX, midY)
        }
      }
    })

    // 绘制节点
    data.nodes.forEach(node => {
      const nodeWidth = node.width || 120
      const nodeHeight = node.height || 60
      const x = node.x
      const y = node.y
      
      // 设置节点样式
      ctx.fillStyle = node.color || '#3B82F6'
      ctx.strokeStyle = isDark ? '#374151' : '#E5E7EB'
      ctx.lineWidth = 2
      
      // 根据节点类型绘制不同形状
      ctx.beginPath()
      switch (node.type) {
        case 'start':
        case 'end':
          // 椭圆形
          ctx.ellipse(x + nodeWidth/2, y + nodeHeight/2, nodeWidth/2, nodeHeight/2, 0, 0, 2 * Math.PI)
          break
        case 'decision':
          // 菱形
          ctx.moveTo(x + nodeWidth/2, y)
          ctx.lineTo(x + nodeWidth, y + nodeHeight/2)
          ctx.lineTo(x + nodeWidth/2, y + nodeHeight)
          ctx.lineTo(x, y + nodeHeight/2)
          ctx.closePath()
          break
        case 'data':
          // 平行四边形
          const skew = 20
          ctx.moveTo(x + skew, y)
          ctx.lineTo(x + nodeWidth, y)
          ctx.lineTo(x + nodeWidth - skew, y + nodeHeight)
          ctx.lineTo(x, y + nodeHeight)
          ctx.closePath()
          break
        default:
          // 矩形
          ctx.rect(x, y, nodeWidth, nodeHeight)
      }
      
      ctx.fill()
      ctx.stroke()
      
      // 绘制文字
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 12px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // 处理多行文字
      const lines = node.text.split('\n')
      lines.forEach((line, index) => {
        const textY = y + nodeHeight/2 + (index - (lines.length - 1)/2) * 16
        ctx.fillText(line, x + nodeWidth/2, textY)
      })
    })

    ctx.restore()
  }

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return
    
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 缩放控制
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 2))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  // 重绘流程图
  useEffect(() => {
    drawFlowChart()
  }, [data, theme, scale, offset, width, height])

  return (
    <div className={`relative ${className}`}>
      {/* 标题和描述 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {data.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {data.description}
        </p>
      </div>

      {/* 控制按钮 */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          className="bg-white/90 dark:bg-gray-800/90"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          className="bg-white/90 dark:bg-gray-800/90"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="bg-white/90 dark:bg-gray-800/90"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* 画布 */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`border rounded-lg cursor-move ${
          theme === 'dark' 
            ? 'border-gray-700 bg-gray-800' 
            : 'border-gray-200 bg-white'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      {/* 操作提示 */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>💡 拖拽移动流程图，使用右上角按钮缩放和重置</p>
      </div>
    </div>
  )
}

// 简化版流程图组件（用于预览）
interface FlowChartPreviewProps {
  data: FlowChartData
  className?: string
}

export function FlowChartPreview({ data, className = "" }: FlowChartPreviewProps) {
  const { theme } = useTheme()
  
  return (
    <div className={`p-4 border rounded-lg ${
      theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    } ${className}`}>
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
        {data.title}
      </h4>
      <div className="space-y-3">
        {data.nodes.map((node, index) => (
          <div key={node.id} className="flex items-center gap-3">
            <div 
              className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: node.color || '#3B82F6' }}
            >
              {index + 1}
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {node.text.split('\n')[0]}
              </div>
              {node.text.includes('\n') && (
                <div className="text-gray-600 dark:text-gray-400">
                  {node.text.split('\n').slice(1).join(' ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
