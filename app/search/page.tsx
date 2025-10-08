"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Filter, 
  Clock, 
  TrendingUp, 
  ExternalLink,
  FileText,
  Target,
  Folder,
  BookOpen,
  Zap
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { 
  searchContent, 
  getSearchSuggestions,
  popularSearches,
  searchCategories,
  SearchResult,
  SearchCategory
} from "@/lib/search"

export default function SearchPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // 从URL参数获取初始搜索词
  useEffect(() => {
    const q = searchParams.get('q')
    const category = searchParams.get('category')
    
    if (q) {
      setQuery(q)
      performSearch(q, category || 'all')
    }
    if (category) {
      setActiveCategory(category)
    }
  }, [searchParams])

  // 执行搜索
  const performSearch = async (searchQuery: string, category: string = 'all') => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // 模拟搜索延迟
    setTimeout(() => {
      const searchResults = searchContent(searchQuery, category)
      setResults(searchResults)
      setIsLoading(false)
      setShowSuggestions(false)

      // 更新URL
      const params = new URLSearchParams()
      params.set('q', searchQuery)
      if (category !== 'all') params.set('category', category)
      router.replace(`/search?${params.toString()}`, { scroll: false })
    }, 300)
  }

  // 处理搜索输入变化
  const handleSearchChange = (value: string) => {
    setQuery(value)
    
    if (value.trim()) {
      const newSuggestions = getSearchSuggestions(value)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // 处理搜索提交
  const handleSearchSubmit = () => {
    performSearch(query, activeCategory)
  }

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K 聚焦搜索框
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }
      
      // Enter键搜索
      if (e.key === 'Enter' && document.activeElement?.tagName === 'INPUT') {
        e.preventDefault()
        handleSearchSubmit()
      }
      
      // Escape键清除建议
      if (e.key === 'Escape') {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [query, activeCategory])

  // 处理分类切换
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (query.trim()) {
      performSearch(query, category)
    }
  }

  // 处理建议点击
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    performSearch(suggestion, activeCategory)
  }

  // 处理热门搜索点击
  const handlePopularSearchClick = (popularQuery: string) => {
    setQuery(popularQuery)
    performSearch(popularQuery, activeCategory)
  }

  // 获取结果图标
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'skill': return <Target className="h-4 w-4 text-blue-500" />
      case 'project': return <Folder className="h-4 w-4 text-green-500" />
      case 'note': return <BookOpen className="h-4 w-4 text-purple-500" />
      case 'page': return <FileText className="h-4 w-4 text-orange-500" />
      default: return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  // 统计结果数量
  const resultStats = useMemo(() => {
    const stats: Record<string, number> = { all: results.length }
    
    searchCategories.forEach(category => {
      if (category.id !== 'all') {
        stats[category.id] = results.filter(r => r.type === category.id).length
      }
    })
    
    return stats
  }, [results])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      
      {/* 搜索头部区域 */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              全站搜索
            </h1>
            <p className="text-xl text-blue-100">
              搜索技能、项目、笔记和页面内容
            </p>
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <SearchBar
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="搜索技能、项目、笔记..."
                  className="w-full"
                />
                
                {/* 搜索建议 */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">搜索建议</div>
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm transition-colors"
                        >
                          <Search className="h-3 w-3 inline mr-2 text-gray-400" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleSearchSubmit} 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索结果区域 */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 无搜索时显示热门搜索 */}
          {!query && (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  开始您的搜索之旅
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  搜索我的技能、项目、学习笔记或任何感兴趣的内容
                </p>
                
                {/* 热门搜索 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    热门搜索
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.map((popularQuery, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePopularSearchClick(popularQuery)}
                        className="hover:shadow-md transition-shadow"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {popularQuery}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 搜索分类介绍 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchCategories.filter(cat => cat.id !== 'all').map(category => (
                    <div key={category.id} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{category.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 有搜索词时显示结果 */}
          {query && (
            <>
              {/* 搜索结果统计 */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-gray-600 dark:text-gray-400">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      搜索中...
                    </span>
                  ) : (
                    <span>
                      找到 <strong className="text-gray-900 dark:text-gray-100">{results.length}</strong> 个结果
                      {query && (
                        <> 关于 "<strong className="text-blue-600">{query}</strong>"</>
                      )}
                    </span>
                  )}
                </div>
                
                {results.length > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 inline mr-1" />
                    搜索用时 0.3 秒
                  </div>
                )}
              </div>

              {/* 分类标签 */}
              <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-6">
                <TabsList className="grid grid-cols-5 w-full max-w-2xl">
                  {searchCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="flex items-center gap-1 text-xs"
                    >
                      <span>{category.icon}</span>
                      <span className="hidden sm:inline">{category.name}</span>
                      {resultStats[category.id] > 0 && (
                        <Badge variant="secondary" className="ml-1 text-xs px-1">
                          {resultStats[category.id]}
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {searchCategories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    {/* 搜索结果列表 */}
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Card key={i} className="animate-pulse">
                            <CardHeader>
                              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
                              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : results.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          没有找到相关结果
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          尝试使用不同的关键词或查看热门搜索
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {popularSearches.slice(0, 5).map((popularQuery, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handlePopularSearchClick(popularQuery)}
                            >
                              {popularQuery}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {results.map((result) => (
                          <Card key={result.id} className="hover:shadow-lg transition-shadow group">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {getResultIcon(result.type)}
                                    <Badge variant="outline" className="text-xs">
                                      {result.category}
                                    </Badge>
                                    {result.relevanceScore && result.relevanceScore > 70 && (
                                      <Badge className="bg-green-100 text-green-800 text-xs">
                                        高相关
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <Link href={result.url}>
                                    <CardTitle className="text-lg hover:text-blue-600 transition-colors cursor-pointer group-hover:text-blue-600">
                                      {result.title}
                                    </CardTitle>
                                  </Link>
                                  
                                  <CardDescription className="mt-2 text-sm">
                                    {result.description}
                                  </CardDescription>
                                  
                                  {/* 标签 */}
                                  {result.tags && result.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                      {result.tags.slice(0, 4).map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                      {result.tags.length > 4 && (
                                        <Badge variant="secondary" className="text-xs">
                                          +{result.tags.length - 4}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                                
                                <Link href={result.url}>
                                  <Button variant="ghost" size="sm" className="ml-4">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            搜索功能由智能算法驱动 - 快速找到您需要的内容
          </p>
        </div>
      </footer>
    </div>
  )
}
