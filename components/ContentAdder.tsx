"use client"

import React, { useState } from 'react'
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Code, BarChart3, List, Type, X } from 'lucide-react'

interface ContentAdderProps {
  onAdd: (contentType: string, positionKey: string) => void
  pagePath: string
}

export function ContentAdder({ onAdd, pagePath }: ContentAdderProps) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [showTypeSelector, setShowTypeSelector] = useState(false)

  const contentTypes = [
    {
      type: 'text',
      label: '文本内容',
      icon: <FileText size={16} />,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: '添加段落、介绍文字等'
    },
    {
      type: 'heading',
      label: '标题',
      icon: <Type size={16} />,
      color: 'bg-red-500 hover:bg-red-600',
      description: '添加各级标题'
    },
    {
      type: 'list',
      label: '列表',
      icon: <List size={16} />,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: '添加有序或无序列表'
    },
    {
      type: 'code',
      label: '代码片段',
      icon: <Code size={16} />,
      color: 'bg-green-500 hover:bg-green-600',
      description: '添加代码示例'
    },
    {
      type: 'chart',
      label: '图表',
      icon: <BarChart3 size={16} />,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: '添加数据可视化图表'
    }
  ]

  const generateUniqueKey = (type: string) => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 5)
    return `${type}_${timestamp}_${random}`
  }

  const handleAddContent = (contentType: string) => {
    const positionKey = generateUniqueKey(contentType)
    onAdd(contentType, positionKey)
    setIsOpen(false)
    setShowTypeSelector(false)
  }

  // 检查是否为管理员模式
  const isAdminMode = () => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('admin_token') && window.location.search.includes('admin=true')
  }

  if (!isAdminMode()) return null

  return (
    <div className="fixed bottom-20 left-4 z-50">
      {/* 主按钮 */}
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-200 ${
            isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isOpen ? <X size={20} /> : <Plus size={20} />}
        </Button>

        {/* 内容类型选择器 */}
        {isOpen && (
          <div className={`absolute bottom-16 left-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border p-4 min-w-[280px]`}>
            <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              选择要添加的内容类型
            </h3>
            
            <div className="space-y-2">
              {contentTypes.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddContent(item.type)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-700 text-gray-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white mr-3`}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className={`mt-4 pt-3 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                页面路径: {pagePath}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 使用提示 */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 ${theme === 'dark' ? 'bg-blue-900/90' : 'bg-blue-500/90'} text-white text-xs p-2 rounded max-w-[200px]`}>
          💡 点击上方选项添加新内容块到页面
        </div>
      )}
    </div>
  )
}
