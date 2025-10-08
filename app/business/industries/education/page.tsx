"use client"

import React, { useState, useEffect } from 'react'
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, GraduationCap, Target, Users, TrendingUp, CheckCircle, 
  ChevronUp, AlertCircle, BarChart3, BookOpen, Clock, Award, Repeat
} from "lucide-react"
import Link from "next/link"
import { 
  LearningFunnelChart, 
  RenewalRateChart, 
  NPSDistributionChart 
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function EducationPage() {
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
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>教育行业数据分析</span>
            </div>
            <IndustryDropdown theme={theme} currentIndustry="education" />
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
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 via-green-900/20 to-teal-900/20' : 'bg-gradient-to-r from-blue-100 via-green-100 to-teal-100'} rounded-2xl`}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-600 to-teal-700 shadow-2xl shadow-green-500/30' : 'bg-gradient-to-br from-green-500 to-teal-600 shadow-2xl shadow-green-400/30'} animate-pulse`}>
                    <GraduationCap className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className={`text-5xl font-black mb-3 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-blue-600'}`}>
                      教育行业数据分析
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      从学习效果到用户留存，构建完整的教育数据分析能力
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section id="overview" className="mb-20">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  <Target className="h-8 w-8" />
                  教育数据分析全景图
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-green-500 mb-2">3大核心</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      学习效果、用户留存、商业变现，教育的三大平衡
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-teal-500 mb-2">4大漏斗</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      获客、激活、学习、续费，完整转化路径
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-blue-500 mb-2">5项指标</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      完课率、续费率、学习时长、作业率、满意度
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="metrics" className="mb-20">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>核心指标体系</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>📚 学习效果指标</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '完课率', formula: '= 完成课程人数 / 报名人数', desc: '学习投入度核心指标' },
                      { name: '作业完成率', formula: '= 完成作业数 / 布置作业数', desc: '学习质量体现' },
                      { name: '平均学习时长', formula: '= 总学习时长 / 学员数', desc: '内容粘性指标' },
                      { name: '知识点掌握率', formula: '= 通过测试人数 / 参与测试人数', desc: '教学效果评估' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">{item.name}</h4>
                        <code className="text-xs text-blue-600 dark:text-blue-400 block mb-2">{item.formula}</code>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>💰 商业化指标</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '续费率', formula: '= 续费用户数 / 到期用户数', desc: '核心商业指标' },
                      { name: 'LTV', formula: '= 客单价 × 续费次数', desc: '用户生命周期价值' },
                      { name: 'CAC', formula: '= 营销成本 / 新增付费用户', desc: '获客成本' },
                      { name: 'NPS', formula: '= 推荐者% - 贬损者%', desc: '用户满意度' }
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
                <CardHeader><CardTitle>场景一：学习效果分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 分析不同课程的完课率和学习效果
SELECT 
    course_id,
    course_name,
    COUNT(DISTINCT user_id) as enrolled_users,
    COUNT(DISTINCT CASE WHEN completion_rate >= 0.9 THEN user_id END) as completed_users,
    COUNT(DISTINCT CASE WHEN completion_rate >= 0.9 THEN user_id END) / COUNT(DISTINCT user_id) as completion_rate,
    AVG(study_duration_minutes) as avg_study_time,
    AVG(homework_score) as avg_homework_score,
    AVG(satisfaction_score) as avg_satisfaction
FROM course_learning_records
WHERE enroll_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY course_id, course_name
ORDER BY completion_rate DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>场景二：续费预测分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 识别高续费意向用户特征
SELECT 
    CASE WHEN completion_rate >= 0.8 THEN '高完课' ELSE '低完课' END as completion_level,
    CASE WHEN study_days >= 20 THEN '高频学习' ELSE '低频学习' END as study_frequency,
    COUNT(*) as user_count,
    SUM(CASE WHEN is_renewed = 1 THEN 1 ELSE 0 END) as renewed_count,
    SUM(CASE WHEN is_renewed = 1 THEN 1 ELSE 0 END) / COUNT(*) as renewal_rate
FROM user_learning_summary
WHERE expire_date BETWEEN DATE_SUB(CURRENT_DATE, INTERVAL 60 DAY) AND DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY completion_level, study_frequency
ORDER BY renewal_rate DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 数据可视化分析 */}
            <section id="visualizations" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>数据可视化分析</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>学习完课漏斗</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <LearningFunnelChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>数据洞察：</strong>报名到首次上课转化85%，完课率仅42%，需优化学习体验。
                      建议增加学习激励、进度提醒、社群互动，提升完课率。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>续费率趋势</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <RenewalRateChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>优化建议：</strong>续费率从65%提升至82%，客单价稳步增长。
                      可通过课程升级、套餐优惠、学习效果展示进一步提升续费率。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>用户NPS分布</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <NPSDistributionChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>关键发现：</strong>NPS值为25，推荐者占45%，贬损者占20%。
                      需重点分析贬损者原因（课程质量、服务、价格），针对性改进。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Python代码示例 */}
            <section id="python-examples" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Python数据分析示例</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>示例一：续费预测模型</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + ML</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier

df = pd.read_sql("""
    SELECT user_id, completion_rate, study_days,
           homework_submit_rate, course_duration_days,
           avg_score, interaction_count, renewed
    FROM student_behavior WHERE course_end_date = CURRENT_DATE - 30
""", conn)

features = ['completion_rate', 'study_days', 'homework_submit_rate',
            'course_duration_days', 'avg_score', 'interaction_count']
X, y = df[features], df['renewed']

model = GradientBoostingClassifier()
model.fit(X, y)

# 预测续费概率
df['renewal_probability'] = model.predict_proba(X)[:, 1]
high_potential = df[df['renewal_probability'] > 0.7]
print(f"高续费意向用户：{len(high_potential)}人，建议优先营销")`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>示例二：学习效果分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + Analysis</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`df = pd.read_sql("""
    SELECT course_id, course_name,
           AVG(completion_rate) as avg_completion,
           AVG(avg_score) as avg_score,
           COUNT(*) as student_count,
           SUM(CASE WHEN renewed = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as renewal_rate
    FROM student_performance
    GROUP BY course_id, course_name
    ORDER BY renewal_rate DESC
""", conn)

# 找出高续费课程特征
high_renewal = df[df['renewal_rate'] > 70]
print("高续费课程特征：")
print(f"平均完课率: {high_renewal['avg_completion'].mean():.1f}%")
print(f"平均成绩: {high_renewal['avg_score'].mean():.1f}分")

# 课程质量评分
df['quality_score'] = (
    df['avg_completion'] * 0.3 + 
    df['avg_score'] * 0.3 + 
    df['renewal_rate'] * 0.4
)
print("\\n课程质量排名：")
print(df.sort_values('quality_score', ascending=False).head(10))`}</code>
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
                    <span>案例一：某在线教育平台完课率优化</span>
                    <Badge variant="outline" className="text-green-600">成功案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某K12在线教育平台完课率仅35%，远低于行业50%水平，续费率受影响。
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 增加学习激励机制（勋章、积分、排行榜）</li>
                        <li>• 建立学习社群，增强互动性</li>
                        <li>• 智能学习提醒，防止学员遗忘</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">35% → 58%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>完课率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">+42%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>续费率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">NPS +18</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>用户满意度</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>案例二：某职业培训平台续费优化</span>
                    <Badge variant="outline" className="text-blue-600">增长案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某IT职业培训平台续费率仅45%，客户生命周期价值较低。
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 建立学习路径规划，引导进阶学习</li>
                        <li>• 推出续费优惠套餐，降低续费门槛</li>
                        <li>• 展示学习成果（证书、作品、就业），增强信心</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">45% → 68%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>续费率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">+52%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>LTV</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-500">¥8200</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>平均客单价</div>
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
                  { title: '过度关注续费', problem: '为续费牺牲教学质量', solution: '平衡教学效果和商业变现' },
                  { title: '虚假数据', problem: '刷完课率、刷好评', solution: '建立真实有效的数据监控' },
                  { title: '忽视用户体验', problem: '过度营销导致用户反感', solution: '优化学习体验，口碑传播' },
                  { title: '单一评价体系', problem: '只看考试分数', solution: '多维度评估学习效果' }
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
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  <BookOpen className="h-8 w-8" />
                  核心公式速查表
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: '📚 学习指标', formulas: ['完课率 = 完成人数 / 报名人数', '作业率 = 完成作业数 / 布置作业数'] },
                    { title: '💰 商业指标', formulas: ['续费率 = 续费用户 / 到期用户', 'LTV = 客单价 × 续费次数'] }
                  ].map((section, i) => (
                    <div key={i} className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                      <h4 className="text-lg font-bold mb-4">{section.title}</h4>
                      <div className="space-y-3">
                        {section.formulas.map((formula, j) => (
                          <div key={j} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                            <code className="text-sm text-green-600 dark:text-green-400">{formula}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 to-teal-900/30' : 'bg-gradient-to-r from-green-50 to-teal-50'}`}>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                🎉 所有行业数据分析页面已完善！
              </p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                电商、内容、金融、游戏、教育五大行业全覆盖
              </p>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border'}`}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

