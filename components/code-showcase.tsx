"use client"

import { useState } from "react"
import { CodeBlock } from "@/lib/module-showcases"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Play, 
  Copy, 
  Check, 
  Terminal, 
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface CodeShowcaseProps {
  codeBlocks: CodeBlock[]
  className?: string
}

export function CodeShowcase({ codeBlocks, className = "" }: CodeShowcaseProps) {
  const { theme } = useTheme()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set())

  // 复制代码到剪贴板
  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // 切换代码块展开状态
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedBlocks(newExpanded)
  }

  // 获取语言标签样式
  const getLanguageStyle = (language: string) => {
    switch (language) {
      case 'python':
        return { label: 'Python', color: 'bg-blue-100 text-blue-800' }
      case 'sql':
        return { label: 'SQL', color: 'bg-green-100 text-green-800' }
      case 'javascript':
        return { label: 'JavaScript', color: 'bg-yellow-100 text-yellow-800' }
      case 'r':
        return { label: 'R', color: 'bg-purple-100 text-purple-800' }
      case 'bash':
        return { label: 'Bash', color: 'bg-gray-100 text-gray-800' }
      default:
        return { label: language.toUpperCase(), color: 'bg-gray-100 text-gray-800' }
    }
  }

  // 语法高亮（简化版）
  const highlightCode = (code: string, language: string) => {
    // 这里可以集成更完善的语法高亮库，如 Prism.js
    const lines = code.split('\n')
    return lines.map((line, index) => (
      <div key={index} className="flex">
        <span className="select-none text-gray-400 text-sm mr-4 w-8 text-right">
          {index + 1}
        </span>
        <span className="text-sm">{line || ' '}</span>
      </div>
    ))
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Code className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          代码实现
        </h3>
        <Badge variant="outline" className="ml-2">
          {codeBlocks.length} 个代码块
        </Badge>
      </div>

      <div className="space-y-4">
        {codeBlocks.map((block, index) => {
          const languageStyle = getLanguageStyle(block.language)
          const isExpanded = expandedBlocks.has(block.id)
          const shouldTruncate = block.code.split('\n').length > 15

          return (
            <Card key={block.id} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={languageStyle.color}>
                        {languageStyle.label}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        步骤 {index + 1}
                      </span>
                    </div>
                    <CardTitle className="text-lg mb-2">{block.title}</CardTitle>
                    <CardDescription>{block.description}</CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyCode(block.code, block.id)}
                      className="flex items-center gap-2"
                    >
                      {copiedId === block.id ? (
                        <>
                          <Check className="h-3 w-3" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          复制
                        </>
                      )}
                    </Button>
                    
                    {shouldTruncate && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(block.id)}
                        className="flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            收起
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            展开
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <Code className="h-3 w-3" />
                      代码
                    </TabsTrigger>
                    {block.output && (
                      <TabsTrigger value="output" className="flex items-center gap-2">
                        <Terminal className="h-3 w-3" />
                        输出
                      </TabsTrigger>
                    )}
                    {block.explanation && (
                      <TabsTrigger value="explanation" className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        说明
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="code" className="mt-4">
                    <div className={`rounded-lg border overflow-hidden ${
                      theme === 'dark' 
                        ? 'border-gray-600 bg-gray-900' 
                        : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="p-4 font-mono text-sm overflow-x-auto">
                        <div className={`${
                          shouldTruncate && !isExpanded 
                            ? 'max-h-96 overflow-hidden' 
                            : ''
                        }`}>
                          {highlightCode(block.code, block.language)}
                        </div>
                        
                        {shouldTruncate && !isExpanded && (
                          <div className="mt-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpanded(block.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <ChevronDown className="h-4 w-4 mr-1" />
                              显示完整代码 ({block.code.split('\n').length} 行)
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  {block.output && (
                    <TabsContent value="output" className="mt-4">
                      <div className={`rounded-lg border p-4 ${
                        theme === 'dark' 
                          ? 'border-gray-600 bg-gray-900' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <pre className="font-mono text-sm whitespace-pre-wrap">
                          {block.output}
                        </pre>
                      </div>
                    </TabsContent>
                  )}

                  {block.explanation && (
                    <TabsContent value="explanation" className="mt-4">
                      <div className={`rounded-lg border p-4 ${
                        theme === 'dark' 
                          ? 'border-gray-600 bg-gray-800' 
                          : 'border-gray-200 bg-blue-50'
                      }`}>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {block.explanation}
                        </p>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 代码执行提示 */}
      <div className={`rounded-lg border p-4 ${
        theme === 'dark' 
          ? 'border-yellow-600 bg-yellow-900/20' 
          : 'border-yellow-200 bg-yellow-50'
      }`}>
        <div className="flex items-start gap-3">
          <Play className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              运行环境要求
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              请确保已安装相关依赖包。Python环境建议使用 pandas, numpy, matplotlib, seaborn, scikit-learn 等常用库。
              完整的环境配置可以参考项目的 requirements.txt 文件。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 单个代码块组件
interface SingleCodeBlockProps {
  codeBlock: CodeBlock
  className?: string
}

export function SingleCodeBlock({ codeBlock, className = "" }: SingleCodeBlockProps) {
  return <CodeShowcase codeBlocks={[codeBlock]} className={className} />
}
