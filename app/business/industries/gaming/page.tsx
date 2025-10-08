"use client"

import React, { useState, useEffect } from 'react'
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, Gamepad2, Target, Users, TrendingUp, Zap, CheckCircle, 
  ChevronUp, AlertCircle, Activity, BarChart3, LineChart, 
  DollarSign, Clock, Repeat, Trophy, BookOpen
} from "lucide-react"
import Link from "next/link"
import { 
  RetentionCurveChart, 
  PayingUserChart, 
  ARPUTrendChart 
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function GamingPage() {
  const { theme } = useTheme()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

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
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>游戏行业数据分析</span>
            </div>
            <IndustryDropdown theme={theme} currentIndustry="gaming" />
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className={`sticky top-24 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 shadow-lg`}>
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
                <a href="#visualizations" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-indigo-900/30 text-indigo-400' : 'hover:bg-indigo-50 text-indigo-600'}`}>
                  <span>📊</span><span>数据可视化分析</span>
                </a>
                <a href="#python-examples" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-yellow-900/30 text-yellow-400' : 'hover:bg-yellow-50 text-yellow-600'}`}>
                  <span>🐍</span><span>Python示例</span>
                </a>
                <a href="#case-studies" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-cyan-900/30 text-cyan-400' : 'hover:bg-cyan-50 text-cyan-600'}`}>
                  <span>📖</span><span>真实案例研究</span>
                </a>
                <a href="#pitfalls" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
                  <span>⚠️</span><span>行业避坑指南</span>
                </a>
                <a href="#formula-reference" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30 text-purple-400' : 'hover:bg-purple-50 text-purple-600'}`}>
                  <span>📖</span><span>核心公式速查表</span>
                </a>
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-16 relative overflow-hidden">
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-red-900/20' : 'bg-gradient-to-r from-purple-100 via-pink-100 to-red-100'} rounded-2xl`}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-purple-600 to-pink-700 shadow-2xl shadow-purple-500/30' : 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-2xl shadow-purple-400/30'} animate-pulse`}>
                    <Gamepad2 className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className={`text-5xl font-black mb-3 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600'}`}>
                      游戏行业数据分析
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      从留存到付费，构建完整的游戏数据分析能力
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section id="overview" className="mb-20">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  <Target className="h-8 w-8" />
                  游戏数据分析全景图
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-purple-500 mb-2">3大核心</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      留存、付费、平衡性，游戏分析的三大支柱
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-pink-500 mb-2">4类用户</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      鲸鱼/海豚/小R/白嫖，差异化运营策略
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-red-500 mb-2">5项指标</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      DAU、留存、付费率、ARPU、LTV
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="metrics" className="mb-20">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>核心指标体系</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>📊 用户规模与活跃</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'DAU/MAU', formula: '日活跃/月活跃用户数', desc: '衡量游戏热度' },
                      { name: 'DAU/MAU比率', formula: '理想值: >20%', desc: '用户粘性指标' },
                      { name: '次日/7日留存', formula: '= 次日/7日活跃 / 新增用户', desc: '核心健康指标' },
                      { name: '人均游戏时长', formula: '= 总时长 / DAU', desc: '内容粘性体现' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">{item.name}</h4>
                        <code className="text-xs text-purple-600 dark:text-purple-400 block mb-2">{item.formula}</code>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>💰 付费相关指标</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '付费率', formula: '= 付费用户 / 总用户', desc: '通常1%-5%' },
                      { name: 'ARPU', formula: '= 总收入 / 活跃用户', desc: '单用户平均收入' },
                      { name: 'ARPPU', formula: '= 总收入 / 付费用户', desc: '付费用户平均收入' },
                      { name: 'LTV', formula: '= ARPU × 生命周期(天)', desc: '用户生命周期价值' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">{item.name}</h4>
                        <code className="text-xs text-green-600 dark:text-green-400 block mb-2">{item.formula}</code>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="scenarios" className="mb-20">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>典型分析场景</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>场景一：Cohort留存分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- Cohort留存分析
WITH first_login AS (
    SELECT user_id, DATE(MIN(login_time)) as cohort_date
    FROM user_login_log
    GROUP BY user_id
)
SELECT 
    cohort_date,
    COUNT(DISTINCT user_id) as new_users,
    COUNT(DISTINCT CASE WHEN DATEDIFF(login_date, cohort_date) = 1 THEN user_id END) / COUNT(DISTINCT user_id) as day_1_retention,
    COUNT(DISTINCT CASE WHEN DATEDIFF(login_date, cohort_date) = 7 THEN user_id END) / COUNT(DISTINCT user_id) as day_7_retention
FROM first_login f
JOIN user_login_log l ON f.user_id = l.user_id
GROUP BY cohort_date;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>场景二：付费用户分层分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 付费用户分层（鲸鱼/海豚/小R）
SELECT 
    CASE 
        WHEN total_payment >= 10000 THEN '鲸鱼用户'
        WHEN total_payment >= 1000 THEN '海豚用户'
        WHEN total_payment >= 100 THEN '小R用户'
        ELSE '微氪用户'
    END as user_tier,
    COUNT(*) as user_count,
    SUM(total_payment) as total_revenue,
    AVG(total_payment) as avg_payment,
    SUM(total_payment) / (SELECT SUM(total_payment) FROM user_payments) as revenue_contribution
FROM user_payments
GROUP BY user_tier
ORDER BY total_revenue DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 数据可视化分析 */}
            <section id="visualizations" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>数据可视化分析</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>留存率曲线</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <RetentionCurveChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>数据洞察：</strong>次日留存45%，D7留存仅18%，说明长期留存需优化。
                      建议通过签到奖励、新手任务、社交功能提升留存率。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>付费用户分布</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <PayingUserChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>关键发现：</strong>500名鲸鱼用户贡献50%收入，符合游戏行业特点。
                      建议建立VIP体系，为大R用户提供专属服务，维护关键付费用户。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>ARPU趋势</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <ARPUTrendChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>优化建议：</strong>ARPU从¥8.5增长至¥14.2，ARPPU稳定在¥100+。
                      可通过活动、限时礼包、新付费点进一步提升ARPU。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Python代码示例 */}
            <section id="python-examples" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Python数据分析示例</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>示例一：流失预警与召回</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + ML</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`import pandas as pd
from sklearn.ensemble import RandomForestClassifier

df = pd.read_sql("""
    SELECT user_id, days_since_last_login, login_days_last_7d,
           play_time_last_7d, total_payment, level
    FROM user_activity WHERE update_date = CURRENT_DATE
""", conn)

# 定义流失：7天未登录
df['is_churned'] = (df['days_since_last_login'] > 7).astype(int)

features = ['days_since_last_login', 'login_days_last_7d', 
            'play_time_last_7d', 'total_payment', 'level']
X, y = df[features], df['is_churned']

model = RandomForestClassifier()
model.fit(X, y)

df['churn_risk'] = model.predict_proba(X)[:, 1]
high_risk = df[df['churn_risk'] > 0.7]
print(f"高风险流失用户：{len(high_risk)}人，建议推送召回活动")`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>示例二：付费用户分层</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + Segmentation</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`df = pd.read_sql("""
    SELECT user_id, total_payment, payment_count,
           avg_payment, last_payment_days_ago
    FROM user_payment
""", conn)

# 分层规则
conditions = [
    (df['total_payment'] >= 10000),
    (df['total_payment'] >= 1000) & (df['total_payment'] < 10000),
    (df['total_payment'] >= 100) & (df['total_payment'] < 1000),
    (df['total_payment'] > 0) & (df['total_payment'] < 100)
]
choices = ['鲸鱼用户', '大R用户', '中R用户', '小R用户']
df['user_tier'] = np.select(conditions, choices, default='非付费')

# 分层统计
tier_stats = df.groupby('user_tier').agg({
    'user_id': 'count',
    'total_payment': 'sum',
    'avg_payment': 'mean'
}).reset_index()

print(tier_stats)`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 真实案例研究 */}
            <section id="case-studies" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>真实案例研究</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>案例一：某SLG游戏留存优化</span>
                    <Badge variant="outline" className="text-green-600">成功案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某策略类游戏次日留存55%，但D7留存仅15%，远低于行业20%水平。
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 优化新手引导，缩短至15分钟</li>
                        <li>• 增加7日签到奖励，刺激长期登录</li>
                        <li>• 建立联盟系统，增强社交粘性</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">15% → 28%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>D7留存</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">+85%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>D30留存</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">+62%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>LTV提升</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>案例二：某RPG游戏付费优化</span>
                    <Badge variant="outline" className="text-blue-600">增长案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某角色扮演游戏付费率仅3%，ARPU仅¥5，远低于同类游戏。
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 推出首充礼包（1元即可），降低付费门槛</li>
                        <li>• 增加月卡/季卡，提升持续付费</li>
                        <li>• 优化商城UI，增加限时促销</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">3% → 8.5%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>付费率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">¥5 → ¥14</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>ARPU</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-500">+180%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>月收入</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="pitfalls" className="mb-20">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>行业避坑指南</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: '过度货币化', problem: '为短期收入牺牲游戏平衡性', solution: '平衡付费与体验，关注长期LTV' },
                  { title: '忽视留存', problem: '只关注付费，忽视用户留存', solution: '留存是付费的基础，优先优化留存' },
                  { title: '数据孤岛', problem: '游戏内数据与运营数据割裂', solution: '打通全链路数据，统一分析' },
                  { title: '滞后指标', problem: '只看历史数据，缺乏预警机制', solution: '建立实时监控和预警体系' }
                ].map((item, i) => (
                  <Card key={i} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                      <div className={`p-3 rounded-lg mb-3 ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
                        <p className="text-sm font-semibold text-red-500">❌ {item.problem}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                        <p className="text-sm font-semibold text-green-500">✅ {item.solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="formula-reference" className="mb-20">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  <BookOpen className="h-8 w-8" />
                  核心公式速查表
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: '📊 活跃指标', formulas: ['DAU/MAU = 日活 / 月活', '留存率 = 次日活跃 / 新增'] },
                    { title: '💰 付费指标', formulas: ['ARPU = 总收入 / 活跃用户', 'LTV = ARPU × 生命周期'] }
                  ].map((section, i) => (
                    <div key={i} className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                      <h4 className="text-lg font-bold mb-4">{section.title}</h4>
                      <div className="space-y-3">
                        {section.formulas.map((formula, j) => (
                          <div key={j} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                            <code className="text-sm text-purple-600 dark:text-purple-400">{formula}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'}`}>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                ✨ 游戏行业数据分析页面已完善！
              </p>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border'}`}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

