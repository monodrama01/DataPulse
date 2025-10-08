"use client"

import Link from "next/link"
import { getLucideIcon } from "@/components/LucideIcon";
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { Search, Github, ChevronDown, BookOpen, Wrench, Database, Lightbulb, FileText, Link2, Zap } from "lucide-react"

const navigation = [
  { name: "首页", href: "/" },
  { name: "职业规划", href: "/career" },
  { name: "快速分析", href: "/quick-analysis" },
  { name: "精选项目", href: "/projects" },
  { name: "关于我", href: "/about" },
  { name: "更多", href: "/more" },
]

// 实战资源库分类列表
const resourceCategories = [
  { name: "学习资料推荐", href: "/more?module=learning-materials", icon: "BookOpen" },
  { name: "工具使用技巧", href: "/more?module=tool-tips", icon: "Wrench" },
  { name: "数据集资源", href: "/more?module=datasets", icon: "Database" },
  { name: "面试题库", href: "/more?module=interview-questions", icon: "Lightbulb" },
  { name: "行业报告与文章", href: "/more?module=articles-reports", icon: "FileText" },
  { name: "在线工具与平台", href: "/more?module=online-tools", icon: "Link2" },
]

// 固定导航名称：不再根据页面路径动态改变
function getNavigationItemName(item: typeof navigation[0], pathname: string): string {
  return item.name
}

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleSearchClick = () => {
    router.push('/search')
  }

  const handleGithubClick = () => {
    window.open('https://github.com/dashboard', '_blank')
  }

  const handleGiteeClick = () => {
    window.open('https://gitee.com/kafka-lee/projects', '_blank')
  }

  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownOpen && !(event.target as Element).closest('.more-dropdown')) {
        setMoreDropdownOpen(false)
      }
    }
    
    if (moreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [moreDropdownOpen])

  return (
    <>
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-cyan-400 to-teal-400 text-white text-sm py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
              <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
              <span>个人博客展示</span>
            </div>
          </div>

      {/* Main Navigation */}
      <nav className={`shadow-sm border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 relative">
                  <img 
                    src="/images/ico.webp" 
                    alt="icon"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{
                      filter: 'none',
                      opacity: 1,
                      mixBlendMode: 'normal'
                    }}
                  />
                </div>
                <Link href="/" className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  数据分析
                </Link>
              </div>
              <div className="hidden sm:flex sm:space-x-6">
                {navigation.map((item) => {
                  // 更多按钮特殊处理为下拉菜单
                  if (item.name === "更多") {
                    return (
                      <div key={item.name} className="relative more-dropdown">
                        <button
                          onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                          onMouseEnter={() => setMoreDropdownOpen(true)}
                          className={cn(
                            pathname === item.href
                              ? "text-blue-600 font-semibold"
                              : theme === 'dark' 
                                ? "text-gray-300 hover:text-gray-100" 
                                : "text-gray-600 hover:text-gray-900",
                            "text-sm font-medium transition-colors flex items-center gap-1"
                          )}
                        >
                          {item.name}
                          <ChevronDown 
                            className={`h-3 w-3 transition-transform duration-200 ${
                              moreDropdownOpen ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        {/* 下拉菜单 */}
                        {moreDropdownOpen && (
                          <div 
                            className={`absolute top-full left-0 mt-1 w-64 rounded-lg shadow-lg border z-50 ${
                              theme === 'dark' 
                                ? 'bg-gray-800 border-gray-700' 
                                : 'bg-white border-gray-200'
                            }`}
                            onMouseLeave={() => setMoreDropdownOpen(false)}
                          >
                            <div className="py-2">
                              {/* 实战资源库链接 */}
                              <Link
                                href="/more"
                                className={`block px-4 py-2 text-sm font-medium border-b ${
                                  theme === 'dark'
                                    ? 'text-gray-200 hover:bg-gray-700 border-gray-600'
                                    : 'text-gray-900 hover:bg-gray-50 border-gray-200'
                                }`}
                                onClick={() => setMoreDropdownOpen(false)}
                              >
                                <div className="flex items-center gap-2">
                                  <Zap className="h-4 w-4" />
                                  <span>实战资源库</span>
                                </div>
                              </Link>
                              
                              {/* 学习模块列表 */}
                              <div className="max-h-80 overflow-y-auto">
                                {resourceCategories.map((module) => {
                                  const iconMap: { [key: string]: any } = {
                                    BookOpen,
                                    Wrench,
                                    Database,
                                    Lightbulb,
                                    FileText,
                                    Link2
                                  }
                                  const IconComponent = iconMap[module.icon] || BookOpen
                                  
                                  return (
                                    <Link
                                      key={module.name}
                                      href={module.href}
                                      className={`block px-4 py-2 text-sm transition-colors ${
                                        theme === 'dark'
                                          ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      }`}
                                      onClick={() => setMoreDropdownOpen(false)}
                                    >
                                      <div className="flex items-center gap-3">
                                        <IconComponent className="h-4 w-4" />
                                        <span>{module.name}</span>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  }
                  
                  // 其他普通导航项
                  return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "text-blue-600 font-semibold"
                        : theme === 'dark' 
                          ? "text-gray-300 hover:text-gray-100" 
                          : "text-gray-600 hover:text-gray-900",
                      "text-sm font-medium transition-colors"
                    )}
                  >
                    {getNavigationItemName(item, pathname)}
                  </Link>
                  )
                })}
              </div>
            </div>

                <div className="flex items-center gap-4">
                  {/* 搜索按钮 */}
                  <button
                    onClick={handleSearchClick}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="搜索"
                  >
                    <Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                  
                  {/* 主题切换按钮 */}
                  <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="切换主题"
                  >
                    <img src="/images/light_dark_change.webp" alt="theme toggle" className="h-5 w-5" />
                  </button>
                  
                  {/* GitHub链接 */}
                  <button
                    onClick={handleGithubClick}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="GitHub"
                  >
                    <Github className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>

                  {/* Gitee链接 */}
                  <button
                    onClick={handleGiteeClick}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Gitee"
                  >
                    <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/>
                    </svg>
                  </button>
                </div>

            <button
              aria-label="打开菜单"
              className={`sm:hidden inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {open && (
            <div className="sm:hidden pb-4">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? theme === 'dark' 
                          ? "bg-gray-700 text-blue-400" 
                          : "bg-gray-100 text-blue-600"
                        : theme === 'dark'
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-50",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {getNavigationItemName(item, pathname)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
