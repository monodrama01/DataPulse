"use client"

import { useEffect, useRef } from "react"
import { RadarData, generateRadarData } from "@/lib/skills"
import { useTheme } from "@/components/theme-provider"

interface SkillsRadarProps {
  className?: string
}

export function SkillsRadar({ className = "" }: SkillsRadarProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布大小
    const size = 300
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 40

    const radarData = generateRadarData()
    const angleStep = (2 * Math.PI) / radarData.length

    // 清除画布
    ctx.clearRect(0, 0, size, size)

    // 设置样式
    const isDark = theme === 'dark'
    const gridColor = isDark ? '#374151' : '#e5e7eb'
    const textColor = isDark ? '#f3f4f6' : '#374151'
    const dataColor = '#3b82f6'
    const fillColor = 'rgba(59, 130, 246, 0.2)'

    // 绘制网格
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1

    // 绘制同心圆
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // 绘制轴线
    for (let i = 0; i < radarData.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // 绘制标签
    ctx.fillStyle = textColor
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let i = 0; i < radarData.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const labelRadius = radius + 25
      const x = centerX + Math.cos(angle) * labelRadius
      const y = centerY + Math.sin(angle) * labelRadius

      // 分行显示较长的标签
      const label = radarData[i].name
      const words = label.split(/[\s&]/)
      
      if (words.length > 1) {
        ctx.fillText(words[0], x, y - 8)
        ctx.fillText(words.slice(1).join(' '), x, y + 8)
      } else {
        ctx.fillText(label, x, y)
      }

      // 添加数值标签
      ctx.font = '10px sans-serif'
      ctx.fillStyle = isDark ? '#9ca3af' : '#6b7280'
      ctx.fillText(`${radarData[i].level}%`, x, y + (words.length > 1 ? 20 : 15))
      ctx.font = 'bold 11px sans-serif'
      ctx.fillStyle = textColor
    }

    // 绘制数据多边形
    ctx.beginPath()
    for (let i = 0; i < radarData.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = radarData[i].level / 100
      const x = centerX + Math.cos(angle) * radius * value
      const y = centerY + Math.sin(angle) * radius * value

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()

    // 填充数据区域
    ctx.fillStyle = fillColor
    ctx.fill()

    // 绘制数据边框
    ctx.strokeStyle = dataColor
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制数据点
    ctx.fillStyle = dataColor
    for (let i = 0; i < radarData.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = radarData[i].level / 100
      const x = centerX + Math.cos(angle) * radius * value
      const y = centerY + Math.sin(angle) * radius * value

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    }

    // 绘制刻度值
    ctx.fillStyle = textColor
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'left'
    
    for (let i = 1; i <= 5; i++) {
      const value = (i * 20).toString()
      ctx.fillText(value, centerX + 5, centerY - (radius * i) / 5)
    }

  }, [theme])

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{ maxWidth: '300px', maxHeight: '300px' }}
      />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          技能熟练度总览
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          基于各技能分类的平均熟练度绘制
        </p>
      </div>
    </div>
  )
}

// 技能进度条组件（备选方案）
interface SkillProgressBarProps {
  skills: Array<{ name: string; level: number; color?: string }>
  className?: string
}

export function SkillProgressBars({ skills, className = "" }: SkillProgressBarProps) {
  const { theme } = useTheme()

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        主要技能熟练度
      </h3>
      {skills.map((skill, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {skill.level}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                skill.color || 'bg-blue-500'
              }`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
