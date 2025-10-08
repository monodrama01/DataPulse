"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Download, Database, FileSpreadsheet } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

interface DatasetViewerProps {
  datasetPath: string
  datasetName: string
  description?: string
  onClose: () => void
}

export function DatasetViewer({ datasetPath, datasetName, description, onClose }: DatasetViewerProps) {
  const { theme } = useTheme()
  const [data, setData] = useState<string[][]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    rows: 0,
    columns: 0,
    size: '0 KB'
  })

  useEffect(() => {
    const loadDataset = async () => {
      try {
        const response = await fetch(datasetPath)
        const text = await response.text()
        const lines = text.trim().split('\n')
        
        if (lines.length > 0) {
          const headerLine = lines[0].split(',')
          setHeaders(headerLine)
          
          const dataLines = lines.slice(1).map(line => line.split(','))
          setData(dataLines)
          
          setStats({
            rows: dataLines.length,
            columns: headerLine.length,
            size: `${(text.length / 1024).toFixed(2)} KB`
          })
        }
        
        setLoading(false)
      } catch (error) {
        console.error('加载数据集失败:', error)
        setLoading(false)
      }
    }
    
    loadDataset()
  }, [datasetPath])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = datasetPath
    link.download = datasetName
    link.click()
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
        <div className="text-white text-lg">加载数据集中...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-start justify-center">
        <Card className={`w-full max-w-7xl my-8 ${
          theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white'
        }`}>
          {/* Header */}
          <CardHeader className="sticky top-0 z-10 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{datasetName}</CardTitle>
                  {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
                  )}
                  <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>📊 {stats.rows} 行</span>
                    <span>📋 {stats.columns} 列</span>
                    <span>💾 {stats.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-2"
                >
                  <Download className="w-4 h-4" />
                  下载 CSV
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Data Table */}
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`sticky top-[73px] ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                } border-b`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r">
                      #
                    </th>
                    {headers.map((header, i) => (
                      <th 
                        key={i} 
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r last:border-r-0"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {data.slice(0, 100).map((row, i) => (
                    <tr 
                      key={i}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'
                      }`}
                    >
                      <td className="px-4 py-2 text-sm font-mono text-gray-500 border-r">
                        {i}
                      </td>
                      {row.map((cell, j) => (
                        <td 
                          key={j} 
                          className="px-4 py-2 text-sm whitespace-nowrap border-r last:border-r-0"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {data.length > 100 && (
              <div className="p-4 text-center text-sm text-gray-500 border-t">
                <Badge variant="outline">
                  显示前 100 行 / 共 {data.length} 行
                </Badge>
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <div className={`p-4 border-t text-sm ${
            theme === 'dark' ? 'text-gray-400 bg-gray-800/50' : 'text-gray-600 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>数据集格式: CSV (逗号分隔值)</span>
              </div>
              <span>路径: {datasetPath}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

