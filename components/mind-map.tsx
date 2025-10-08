"use client"

import { useEffect, useRef, useState } from "react"
import { MindMapNode } from "@/lib/showcases"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react"

interface MindMapProps {
  data: MindMapNode
  width?: number
  height?: number
  className?: string
}

export function MindMap({ data, width = 800, height = 600, className = "" }: MindMapProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // 节点位置计算
  const calculateNodePositions = (node: MindMapNode, level = 0, angle = 0, parentX = width / 2, parentY = height / 2): any => {
    const positions: any = {}
    
    if (node.isRoot) {
      positions[node.id] = { x: width / 2, y: height / 2, level, node }
      
      if (node.children) {
        const angleStep = (2 * Math.PI) / node.children.length
        node.children.forEach((child, index) => {
          const childAngle = index * angleStep
          const radius = 120 + level * 80
          const childX = width / 2 + Math.cos(childAngle) * radius
          const childY = height / 2 + Math.sin(childAngle) * radius
          
          const childPositions = calculateNodePositions(child, level + 1, childAngle, childX, childY)
          Object.assign(positions, childPositions)
        })
      }
    } else {
      positions[node.id] = { x: parentX, y: parentY, level, node }
      
      if (node.children) {
        const childAngleSpread = Math.PI / 3 // 60度扇形
        const childAngleStep = childAngleSpread / Math.max(1, node.children.length - 1)
        const startAngle = angle - childAngleSpread / 2
        
        node.children.forEach((child, index) => {
          const childAngle = startAngle + index * childAngleStep
          const radius = 100
          const childX = parentX + Math.cos(childAngle) * radius
          const childY = parentY + Math.sin(childAngle) * radius
          
          const childPositions = calculateNodePositions(child, level + 1, childAngle, childX, childY)
          Object.assign(positions, childPositions)
        })
      }
    }
    
    return positions
  }

  // 绘制思维导图
  const drawMindMap = () => {
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

    const positions = calculateNodePositions(data)
    const isDark = theme === 'dark'

    // 绘制连接线
    const drawConnections = (node: MindMapNode, parentPos?: any) => {
      const currentPos = positions[node.id]
      
      if (parentPos && currentPos) {
        ctx.strokeStyle = isDark ? '#6B7280' : '#9CA3AF'
        ctx.lineWidth = 2
        ctx.setLineDash([])
        
        ctx.beginPath()
        ctx.moveTo(parentPos.x, parentPos.y)
        ctx.lineTo(currentPos.x, currentPos.y)
        ctx.stroke()
      }
      
      if (node.children) {
        node.children.forEach(child => {
          drawConnections(child, currentPos)
        })
      }
    }

    // 绘制节点
    const drawNodes = (node: MindMapNode) => {
      const pos = positions[node.id]
      if (!pos) return

      const { x, y, level } = pos
      
      // 节点样式
      const nodeColor = node.color || (node.isRoot ? '#4F46E5' : '#6B7280')
      const nodeSize = node.isRoot ? 60 : Math.max(40 - level * 5, 25)
      const fontSize = node.isRoot ? 14 : Math.max(12 - level, 10)
      
      // 绘制节点背景
      ctx.fillStyle = nodeColor
      ctx.beginPath()
      ctx.arc(x, y, nodeSize / 2, 0, 2 * Math.PI)
      ctx.fill()
      
      // 绘制节点边框
      ctx.strokeStyle = isDark ? '#374151' : '#E5E7EB'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // 绘制文字
      ctx.fillStyle = '#FFFFFF'
      ctx.font = `bold ${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // 文字换行处理
      let lines: string[] = []
      
      if (node.text.length > 6 && !node.isRoot) {
        // 长文本分行显示
        const chars = node.text.split('')
        for (let i = 0; i < chars.length; i += 4) {
          lines.push(chars.slice(i, i + 4).join(''))
        }
      } else {
        lines = [node.text]
      }
      
      lines.forEach((line, index) => {
        const lineY = y + (index - (lines.length - 1) / 2) * (fontSize + 2)
        ctx.fillText(line, x, lineY)
      })
      
      // 递归绘制子节点
      if (node.children) {
        node.children.forEach(child => {
          drawNodes(child)
        })
      }
    }

    // 先绘制连接线，再绘制节点
    drawConnections(data)
    drawNodes(data)

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
    setScale(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.3))
  }

  const handleReset = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  // 重绘导图
  useEffect(() => {
    drawMindMap()
  }, [data, theme, scale, offset, width, height])

  return (
    <div className={`relative ${className}`}>
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
        <p>💡 拖拽移动视图，使用右上角按钮缩放和重置</p>
      </div>
    </div>
  )
}

// 简化版思维导图组件（用于预览）
interface MindMapPreviewProps {
  data: MindMapNode
  className?: string
}

export function MindMapPreview({ data, className = "" }: MindMapPreviewProps) {
  const { theme } = useTheme()
  
  const renderNode = (node: MindMapNode, level = 0): React.ReactNode => {
    return (
      <div key={node.id} className={`flex flex-col items-center ${level > 0 ? 'ml-8' : ''}`}>
        <div 
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white mb-2 ${
            node.isRoot ? 'text-base font-bold' : ''
          }`}
          style={{ backgroundColor: node.color || '#6B7280' }}
        >
          {node.text}
        </div>
        
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col space-y-2">
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`p-4 border rounded-lg ${
      theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    } ${className}`}>
      <div className="flex justify-center">
        {renderNode(data)}
      </div>
    </div>
  )
}
