"use client"

import React, { useState, useEffect } from 'react'
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, DollarSign, Target, Users, TrendingUp, Zap, CheckCircle, 
  ChevronUp, AlertCircle, Activity, BarChart3, LineChart, Shield, 
  Lock, UserCheck, Repeat, CreditCard, ArrowRight, Rocket, BookOpen
} from "lucide-react"
import Link from "next/link"
import { 
  ConversionFunnelChart, 
  RiskDistributionChart, 
  LTVTrendChart 
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function FintechPage() {
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
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>金融科技数据分析</span>
            </div>
            <IndustryDropdown theme={theme} currentIndustry="fintech" />
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

          {/* 右侧主要内容 */}
          <div className="flex-1 min-w-0">
            {/* 页面标题 */}
            <div className="mb-16 relative overflow-hidden">
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-green-100 via-blue-100 to-purple-100'} rounded-2xl`}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-green-600 to-blue-700 shadow-2xl shadow-green-500/30' : 'bg-gradient-to-br from-green-500 to-blue-600 shadow-2xl shadow-green-400/30'} animate-pulse`}>
                    <DollarSign className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className={`text-5xl font-black mb-3 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600'}`}>
                      金融科技数据分析
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      从用户转化到风控模型，构建完整的金融科技分析能力
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 行业概览 */}
            <section id="overview" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  <Target className="h-8 w-8" />
                  金融科技数据分析全景图
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-green-500 mb-2">4大核心</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      转化、风控、生命周期、合规，金融分析的四大支柱
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-blue-500 mb-2">5步转化</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      注册→实名→绑卡→首投→复投，每一步都影响留存
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-purple-500 mb-2">3大风险</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      信用风险、欺诈风险、合规风险，数据驱动风控决策
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 核心指标体系 */}
            <section id="metrics" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  核心指标体系
                </h2>
              </div>

              {/* 转化类指标 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    💳 转化类指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '注册转化率', formula: '= 注册用户数 / 访问用户数', desc: '衡量获客效率' },
                      { name: '实名认证率', formula: '= 实名用户数 / 注册用户数', desc: '合规要求，影响后续转化' },
                      { name: '首投率', formula: '= 首次投资用户 / 实名用户', desc: '核心转化指标' },
                      { name: '复投率', formula: '= 复投用户数 / 首投用户数', desc: '用户粘性的体现' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h4>
                        <code className="text-xs text-blue-600 dark:text-blue-400 block mb-2">{item.formula}</code>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 风控类指标 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    🛡️ 风控类指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '坏账率', formula: '= 坏账金额 / 放款总额', desc: '信用风险的核心指标' },
                      { name: '逾期率', formula: '= 逾期笔数 / 应还款笔数', desc: '资产质量指标' },
                      { name: '欺诈率', formula: '= 欺诈交易笔数 / 总交易笔数', desc: '反欺诈效果' },
                      { name: '风险覆盖率', formula: '= 风控拦截量 / 总申请量', desc: '风控模型效率' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h4>
                        <code className="text-xs text-red-600 dark:text-red-400 block mb-2">{item.formula}</code>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 用户价值指标 */}
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    💰 用户价值指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'LTV (生命周期价值)', formula: '= 人均投资额 × 投资次数 × 平台收益率', desc: '单个用户总价值' },
                      { name: 'CAC (获客成本)', formula: '= 营销总成本 / 新增用户数', desc: '获客效率指标' },
                      { name: 'ARPU', formula: '= 总收入 / 活跃用户数', desc: '单用户平均收入' },
                      { name: '资产流失率', formula: '= 流失资产 / 总资产', desc: '用户留存的财务体现' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{item.name}</h4>
                        <code className="text-xs text-green-600 dark:text-green-400 block mb-2">{item.formula}</code>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{item.desc}</p>
                      </div>
                    ))}
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
                  <CardTitle>场景一：用户转化漏斗分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 计算注册到首投的转化漏斗
SELECT 
    DATE(register_time) as date,
    COUNT(DISTINCT user_id) as registered_users,
    COUNT(DISTINCT CASE WHEN kyc_status = 'verified' THEN user_id END) as verified_users,
    COUNT(DISTINCT CASE WHEN bind_card_status = 'success' THEN user_id END) as card_users,
    COUNT(DISTINCT CASE WHEN first_invest_time IS NOT NULL THEN user_id END) as first_invest_users,
    COUNT(DISTINCT CASE WHEN kyc_status = 'verified' THEN user_id END) / COUNT(DISTINCT user_id) as verify_rate,
    COUNT(DISTINCT CASE WHEN first_invest_time IS NOT NULL THEN user_id END) / COUNT(DISTINCT user_id) as invest_rate
FROM user_info
WHERE register_time >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY DATE(register_time)
ORDER BY date DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8 shadow-lg`}>
                <CardHeader>
                  <CardTitle>场景二：风控模型效果评估</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 分析不同风险等级用户的逾期表现
SELECT 
    risk_level,
    COUNT(*) as total_users,
    SUM(CASE WHEN is_overdue = 1 THEN 1 ELSE 0 END) as overdue_users,
    SUM(CASE WHEN is_overdue = 1 THEN 1 ELSE 0 END) / COUNT(*) as overdue_rate,
    AVG(credit_score) as avg_credit_score,
    SUM(loan_amount) as total_loan_amount
FROM user_loan_records
WHERE loan_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
GROUP BY risk_level
ORDER BY overdue_rate DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 数据可视化分析 */}
            <section id="visualizations" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>数据可视化分析</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>用户转化漏斗</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <ConversionFunnelChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>数据洞察：</strong>注册到实名认证转化率75%，到首投仅30%，是关键流失点。
                      建议优化新手引导，提供首投优惠，降低投资门槛。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>用户风险等级分布</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <RiskDistributionChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>优化建议：</strong>低风险用户占45%，高风险用户占20%。
                      建议对高风险用户加强风控，限制额度；对低风险用户提供更优惠的产品。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>用户生命周期价值LTV</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <LTVTrendChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>关键发现：</strong>用户36个月LTV达2.2万元，远超获客成本。
                      前6个月是关键期，建议通过优惠、客服、产品体验提升留存。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Python代码示例 */}
            <section id="python-examples" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Python数据分析示例</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>示例一：用户流失预警模型</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + ML</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier

df = pd.read_sql("""
    SELECT user_id, days_since_last_investment, 
           total_investment, avg_investment_amount,
           investment_count, is_churned
    FROM user_behavior WHERE update_date = CURRENT_DATE
""", conn)

features = ['days_since_last_investment', 'total_investment', 
            'avg_investment_amount', 'investment_count']
X, y = df[features], df['is_churned']

model = GradientBoostingClassifier()
model.fit(X, y)

df['churn_risk'] = model.predict_proba(X)[:, 1]
high_risk = df[df['churn_risk'] > 0.7]
print(f"高风险流失用户：{len(high_risk)}人")`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>示例二：信用评分模型</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + Risk Control</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`from sklearn.ensemble import RandomForestClassifier

df = pd.read_sql("""
    SELECT age, income, credit_history_months, 
           debt_ratio, has_overdue
    FROM user_credit_data
""", conn)

X = df.drop('has_overdue', axis=1)
y = df['has_overdue']

model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# 评分
df['credit_score'] = model.predict_proba(X)[:, 0] * 1000
df['risk_level'] = pd.cut(df['credit_score'], 
                          bins=[0, 600, 750, 1000],
                          labels=['高风险', '中风险', '低风险'])
print(df['risk_level'].value_counts())`}</code>
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
                    <span>案例一：某P2P平台转化率提升</span>
                    <Badge variant="outline" className="text-green-600">成功案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某互联网金融平台首投转化率仅18%，远低于行业25%水平，获客成本高达500元/人。
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 优化新手引导，简化投资流程</li>
                        <li>• 推出新手专享产品，降低投资门槛</li>
                        <li>• 建立用户分层体系，精准推荐产品</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">18% → 32%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>首投转化率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">+78%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>复投率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">¥2.2万</div>
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
                    <span>案例二：某消费金融风控优化</span>
                    <Badge variant="outline" className="text-blue-600">风控案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某消费金融平台坏账率高达5.8%，远超行业3%水平，月损失超千万。
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 建立机器学习风控模型，实时评估信用</li>
                        <li>• 引入第三方征信数据，完善用户画像</li>
                        <li>• 建立动态额度调整机制</li>
                      </ul>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">5.8% → 2.3%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>坏账率下降</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">92%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>风控准确率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-500">-60%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>月损失</div>
                        </div>
                      </div>
                    </div>
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
                  { title: '数据安全合规', problem: '忽视用户隐私保护和数据安全', solution: '严格遵守金融监管要求，数据脱敏和加密' },
                  { title: '过度营销获客', problem: '为追求用户数而放松风控', solution: '平衡获客与风控，关注用户质量而非数量' },
                  { title: '单一风控指标', problem: '仅依赖单一指标判断风险', solution: '建立多维度风控模型，综合评估' },
                  { title: '忽视用户体验', problem: '风控流程过于复杂导致用户流失', solution: '优化认证流程，提升通过率和体验' },
                  { title: '短期指标驱动', problem: '只看短期转化，忽视长期价值', solution: '关注LTV/CAC比率，平衡短期与长期' },
                  { title: '缺乏欺诈监控', problem: '未建立实时反欺诈体系', solution: '构建多层次反欺诈监控和预警机制' }
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

            {/* 核心公式速查表 */}
            <section id="formula-reference" className="mb-20 scroll-mt-24">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  <BookOpen className="h-8 w-8" />
                  核心公式速查表
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <h4 className="text-lg font-bold mb-4">💳 转化公式</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-blue-600 dark:text-blue-400">首投率 = 首投用户 / 实名用户</code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-blue-600 dark:text-blue-400">复投率 = 复投用户 / 首投用户</code>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'}`}>
                    <h4 className="text-lg font-bold mb-4">🛡️ 风控公式</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-red-600 dark:text-red-400">坏账率 = 坏账金额 / 放款总额</code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-red-600 dark:text-red-400">逾期率 = 逾期笔数 / 应还款笔数</code>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <h4 className="text-lg font-bold mb-4">💰 价值公式</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-green-600 dark:text-green-400">LTV = 人均投资额 × 投资次数 × 收益率</code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-green-600 dark:text-green-400">LTV/CAC &gt; 3 (健康)</code>
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                    <h4 className="text-lg font-bold mb-4">📊 运营公式</h4>
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-purple-600 dark:text-purple-400">ARPU = 总收入 / 活跃用户</code>
                      </div>
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                        <code className="text-sm text-purple-600 dark:text-purple-400">资产流失率 = 流失资产 / 总资产</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 底部提示 */}
            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30' : 'bg-gradient-to-r from-green-50 to-blue-50'}`}>
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
            theme === 'dark' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
          }`}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

