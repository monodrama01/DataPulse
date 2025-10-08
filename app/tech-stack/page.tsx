"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Database, Zap, TrendingUp, BarChart3, Code, Search,
  Cloud, Activity, GitBranch, Globe
} from "lucide-react"

export default function TechStackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            完整技术栈介绍
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            数据分析师必备技能与拓展工具全景图
          </p>
        </div>

        {/* 敬请期待 */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            详细技术栈页面正在建设中
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            即将为您呈现每个技术的详细介绍、学习路径和实战案例
          </p>
          <div className="flex gap-4">
            <Badge className="bg-blue-500 text-white px-4 py-2">
              📚 技术详解
            </Badge>
            <Badge className="bg-green-500 text-white px-4 py-2">
              🎯 学习路径
            </Badge>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              💼 实战案例
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}


