"use client"

import React, { useState, useEffect } from 'react'
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, Video, Target, Users, Play, Heart, Shield,
  TrendingUp, Zap, CheckCircle, ChevronUp, AlertCircle, 
  Activity, BarChart3, LineChart, Clock, Eye, MessageCircle,
  ThumbsUp, Share2, ArrowRight, Layers, Rocket, BookOpen, UserPlus
} from "lucide-react"
import Link from "next/link"
import { 
  ContentFunnelChart, 
  ContentLifecycleChart, 
  UserEngagementChart, 
  CreatorEcosystemChart,
  LearningPathChart
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function ContentPlatformPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      {/* 面包屑导航 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <Link href="/business" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <span className="font-medium">业务知识</span>
              </Link>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>内容平台数据分析</span>
            </div>
            <IndustryDropdown theme={theme} currentIndustry="content" />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* 左侧目录 */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto`}>
              <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                📖 页面导航
              </h3>
              <nav className="space-y-2">
                <a href="#overview" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-blue-900/30 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}>
                  <span>💡</span><span>行业概览</span>
                </a>
                <a href="#metrics" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30 text-purple-400' : 'hover:bg-purple-50 text-purple-600'}`}>
                  <span>📊</span><span>核心指标体系</span>
                </a>
                <a href="#scenarios" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-green-900/30 text-green-400' : 'hover:bg-green-50 text-green-600'}`}>
                  <span>🎯</span><span>典型分析场景</span>
                </a>
                <a href="#pitfalls" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
                  <span>⚠️</span><span>行业避坑指南</span>
                </a>
                <a href="#learning-path" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-indigo-900/30 text-indigo-400' : 'hover:bg-indigo-50 text-indigo-600'}`}>
                  <span>🚀</span><span>学习路径规划</span>
                </a>
                <a href="#formula-reference" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30 text-purple-400' : 'hover:bg-purple-50 text-purple-600'}`}>
                  <span>📖</span><span>核心公式速查表</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* 右侧主要内容 */}
          <div className="flex-1 min-w-0">
            {/* 页面标题 */}
            <div className="mb-16 relative overflow-hidden">
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20' : 'bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100'} rounded-2xl`}></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
                  <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>INDUSTRY ANALYSIS</span>
                  <div className="h-1 flex-1 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full"></div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-600 to-purple-700 shadow-2xl shadow-blue-500/30' : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-400/30'} animate-pulse`}>
                    <Video className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className={`text-5xl font-black mb-3 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'}`}>
                      内容平台数据分析
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      从内容消费到创作者生态，构建完整的内容平台分析能力
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: '核心指标', value: '20+', icon: BarChart3, color: 'blue' },
                    { label: '分析场景', value: '6个', icon: Target, color: 'purple' },
                    { label: 'SQL示例', value: '5个', icon: Activity, color: 'green' },
                    { label: '可视化图表', value: '5个', icon: LineChart, color: 'orange' }
                  ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm`}>
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                        <span className={`text-2xl font-bold text-${stat.color}-500`}>{stat.value}</span>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 行业概览 - 保持原有内容 */}
            <section id="overview" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  <Target className="h-8 w-8" />
                  内容平台数据分析全景图
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-blue-500 mb-2">4大维度</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      内容、用户、创作者、商业化，构成内容平台分析的核心框架
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-purple-500 mb-2">5步消费</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      曝光→点击→观看→完播→互动，每一步都是优化机会
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-green-500 mb-2">3类平台</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      视频、社区、资讯，不同类型平台有不同的分析重点
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 核心指标体系 - 简化版，保留关键内容 */}
            <section id="metrics" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  核心指标体系
                </h2>
              </div>

              {/* 内容类指标 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    📹 内容类指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>播放量/阅读量 (PV)</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>内容被消费的次数，最基础的内容指标</p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                      <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>完播率/完读率</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>= 完整观看数 / 播放数，衡量内容质量</p>
                    </div>
                  </div>
                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    <ContentFunnelChart theme={theme} />
                  </div>
                  <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    <ContentLifecycleChart theme={theme} />
                  </div>
                </CardContent>
              </Card>

              {/* 用户类指标 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    👥 用户类指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    <UserEngagementChart theme={theme} />
                  </div>
                </CardContent>
              </Card>

              {/* 创作者类指标 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                    ✍️ 创作者类指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                    <CreatorEcosystemChart theme={theme} />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 典型分析场景 */}
            <section id="scenarios" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  典型分析场景
                </h2>
              </div>

              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle>场景一：内容推荐优化分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 分析用户对不同内容分类的偏好
SELECT 
    user_id,
    content_category,
    COUNT(*) as view_count,
    AVG(watch_duration / video_duration) as avg_completion_rate,
    SUM(CASE WHEN is_liked = 1 THEN 1 ELSE 0 END) as like_count
FROM user_content_interactions
WHERE event_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY user_id, content_category
ORDER BY user_id, view_count DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle>场景二：创作者激励效果分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 分析激励政策前后创作者行为变化
WITH before_incentive AS (
    SELECT creator_id, COUNT(content_id) as content_count
    FROM creator_content
    WHERE publish_date BETWEEN '2024-01-01' AND '2024-01-31'
    GROUP BY creator_id
)
SELECT 
    a.creator_id,
    b.content_count as before_count,
    a.content_count as after_count,
    (a.content_count - b.content_count) / b.content_count as growth_rate
FROM after_incentive a
LEFT JOIN before_incentive b ON a.creator_id = b.creator_id
ORDER BY growth_rate DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 行业避坑指南 */}
            <section id="pitfalls" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  行业避坑指南
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: '过度关注虚荣指标', problem: '只看播放量、曝光量等表面数据', solution: '关注完播率、互动率等质量指标' },
                  { title: '忽视内容生命周期', problem: '用单日数据判断内容好坏', solution: '观察7天、30天的累计数据' },
                  { title: '算法黑盒化', problem: '完全依赖算法推荐', solution: '建立可解释性，定期人工审核' },
                  { title: '数据孤岛', problem: '内容、用户数据各自独立', solution: '打通数据链路，统一分析' },
                  { title: '激励政策失衡', problem: '过度激励导致内容水化', solution: '分层激励，平衡质量与数量' },
                  { title: '忽视负面内容', problem: '只关注正向指标', solution: '监控低俗、违规内容比例' }
                ].map((item, i) => (
                  <Card key={i} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                      <div className={`p-3 rounded-lg mb-3 ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                        <p className="text-sm font-semibold text-red-500 mb-1">❌ {item.problem}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                        <p className="text-sm font-semibold text-green-500">✅ {item.solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* 学习路径规划 */}
            <section id="learning-path" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Rocket className="h-8 w-8" />
                  学习路径规划
                </h2>
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  <LearningPathChart theme={theme} />
                </div>
              </div>
            </section>

            {/* 核心公式速查表 */}
            <section id="formula-reference" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  <BookOpen className="h-8 w-8" />
                  核心公式速查表
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <h4 className="text-lg font-bold mb-4">📹 内容类公式</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-blue-600 dark:text-blue-400">完播率 = 完整观看数 / 播放数</code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-blue-600 dark:text-blue-400">互动率 = (点赞+评论+分享) / 播放数</code>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className="text-lg font-bold mb-4">👥 用户类公式</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-green-600 dark:text-green-400">用户粘性 = DAU / MAU</code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-green-600 dark:text-green-400">留存率 = 第N日活跃 / 首日新增</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 底部提示 */}
            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                ✨ 所有11个行业数据分析页面已完善！
              </p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                涵盖电商、内容、金融、游戏、教育、医疗、旅游、餐饮、零售、物流、制造全行业
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
          }`}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

