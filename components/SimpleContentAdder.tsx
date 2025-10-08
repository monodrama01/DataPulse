"use client"

import React, { useState } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Code, BarChart3, List, Type, X, ChevronUp, ChevronDown, Trash2 } from 'lucide-react'
import { isAdminMode } from '@/lib/auth'

interface SimpleContentAdderProps {
  onAddContent?: (type: string) => void
  showControls?: boolean
  position?: 'top' | 'bottom'
  onMoveUp?: () => void
  onMoveDown?: () => void
  onDelete?: () => void
  canMoveUp?: boolean
  canMoveDown?: boolean
}

export function SimpleContentAdder({ 
  onAddContent, 
  showControls = false,
  position = 'bottom',
  onMoveUp,
  onMoveDown,
  onDelete,
  canMoveUp = false,
  canMoveDown = false
}: SimpleContentAdderProps) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAdminMode()) return null

  const contentTypes = [
    { type: 'text', label: '文本', icon: <FileText size={14} />, color: 'bg-blue-500' },
    { type: 'heading', label: '标题', icon: <Type size={14} />, color: 'bg-red-500' },
    { type: 'list', label: '列表', icon: <List size={14} />, color: 'bg-orange-500' },
    { type: 'code', label: '代码', icon: <Code size={14} />, color: 'bg-green-500' },
    { type: 'chart', label: '图表', icon: <BarChart3 size={14} />, color: 'bg-purple-500' }
  ]

  const handleAddContent = (type: string) => {
    onAddContent?.(type)
    setIsOpen(false)
  }

  return (
    <div className={`flex items-center gap-2 py-2 ${position === 'top' ? 'border-b' : 'border-t'} ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
      
      {/* 内容控制按钮 */}
      {showControls && (
        <div className="flex items-center gap-1">
          {canMoveUp && (
            <Button
              size="sm"
              variant="outline"
              onClick={onMoveUp}
              className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
            >
              <ChevronUp size={12} />
            </Button>
          )}
          {canMoveDown && (
            <Button
              size="sm"
              variant="outline"
              onClick={onMoveDown}
              className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
            >
              <ChevronDown size={12} />
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={12} />
          </Button>
        </div>
      )}

      {/* 添加内容按钮 */}
      <div className="relative">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1 text-xs ${isOpen ? 'bg-gray-100' : ''}`}
        >
          {isOpen ? <X size={12} /> : <Plus size={12} />}
          {isOpen ? '取消' : '添加内容'}
        </Button>

        {/* 内容类型下拉菜单 */}
        {isOpen && (
          <div className={`absolute ${position === 'top' ? 'top-8' : 'bottom-8'} left-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border p-2 z-50 min-w-[200px]`}>
            <div className="grid grid-cols-1 gap-1">
              {contentTypes.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddContent(item.type)}
                  className={`flex items-center gap-2 p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <div className={`w-5 h-5 rounded ${item.color} flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        {position === 'top' ? '↑ 在此上方添加' : '↓ 在此下方添加'}
      </div>
    </div>
  )
}
