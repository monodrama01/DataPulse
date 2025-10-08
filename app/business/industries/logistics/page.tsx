"use client"

import React, { useState, useEffect } from 'react'
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, Truck, Target, TrendingUp, CheckCircle, 
  ChevronUp, AlertCircle, BarChart3, BookOpen, MapPin, 
  Clock, Package, Navigation as Nav, AlertTriangle
} from "lucide-react"
import Link from "next/link"
import {
  DeliveryTimelinessChart,
  CostStructureChart,
  DeliveryTrendChart
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function LogisticsPage() {
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
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>物流行业数据分析</span>
            </div>
            <IndustryDropdown theme={theme} currentIndustry="logistics" />
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
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-teal-900/20' : 'bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100'} rounded-2xl`}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-blue-600 to-cyan-700 shadow-2xl shadow-blue-500/30' : 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-2xl shadow-blue-400/30'} animate-pulse`}>
                    <Truck className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className={`text-5xl font-black mb-3 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600'}`}>
                      物流行业数据分析
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      从时效到成本，构建完整的物流数据分析能力
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section id="overview" className="mb-20">
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  <Target className="h-8 w-8" />
                  物流数据分析全景图
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-blue-500 mb-2">3大核心</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      时效、成本、服务质量，物流的三大平衡
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-cyan-500 mb-2">4大环节</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      揽收、运输、中转、派送，全链路监控
                    </p>
                  </div>
                  <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} rounded-lg p-6`}>
                    <div className="text-3xl font-bold text-teal-500 mb-2">5项指标</div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      准时率、破损率、投诉率、单票成本、配送效率
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="metrics" className="mb-20">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>核心指标体系</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>⏱️ 时效类指标</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '准时率', formula: '= 准时送达订单 / 总订单数', desc: '服务质量核心指标' },
                      { name: '平均配送时长', formula: '从发货到签收的平均时间', desc: '配送效率体现' },
                      { name: '揽收时效', formula: '下单到揽收的时间', desc: '首公里效率' },
                      { name: '派送时效', formula: '到达网点到签收的时间', desc: '最后一公里效率' }
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
                <CardHeader><CardTitle>💰 成本类指标</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '单票成本', formula: '= 总成本 / 订单量', desc: '运营效率核心' },
                      { name: '运输成本率', formula: '= 运输成本 / 营收', desc: '成本结构分析' },
                      { name: '仓储费用率', formula: '= 仓储费用 / 营收', desc: '仓储效率' },
                      { name: '人工成本率', formula: '= 人工成本 / 营收', desc: '人效指标' }
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

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>🎯 质量类指标</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: '破损率', formula: '= 破损订单数 / 总订单数', desc: '货物保护能力' },
                      { name: '投诉率', formula: '= 投诉订单数 / 总订单数', desc: '客户满意度' },
                      { name: '签收率', formula: '= 签收订单数 / 派送订单数', desc: '派送成功率' },
                      { name: '退件率', formula: '= 退回订单数 / 总订单数', desc: '地址准确性' }
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="font-bold mb-2">{item.name}</h4>
                        <code className="text-xs text-red-600 dark:text-red-400 block mb-2">{item.formula}</code>
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
                <CardHeader><CardTitle>场景一：配送时效分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 分析不同区域的配送时效表现
SELECT 
    province,
    city,
    COUNT(*) as total_orders,
    AVG(TIMESTAMPDIFF(HOUR, order_time, delivery_time)) as avg_delivery_hours,
    SUM(CASE WHEN delivery_time <= promised_time THEN 1 ELSE 0 END) / COUNT(*) as on_time_rate,
    SUM(CASE WHEN delivery_time > promised_time + INTERVAL 24 HOUR THEN 1 ELSE 0 END) as severely_delayed,
    AVG(customer_rating) as avg_rating
FROM logistics_orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    AND order_status = 'delivered'
GROUP BY province, city
HAVING total_orders >= 100
ORDER BY on_time_rate ASC, avg_delivery_hours DESC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>场景二：成本优化分析</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge className="mb-3">SQL示例</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-green-400' : 'text-green-700'}>{`-- 分析不同配送方式的成本效益
SELECT 
    delivery_method,
    COUNT(*) as order_count,
    AVG(delivery_cost) as avg_cost_per_order,
    AVG(delivery_time_hours) as avg_delivery_time,
    SUM(delivery_cost) / COUNT(*) as cost_per_order,
    SUM(CASE WHEN is_on_time = 1 THEN 1 ELSE 0 END) / COUNT(*) as on_time_rate,
    -- 成本时效综合评分（越低越好）
    (AVG(delivery_cost) / MIN_COST + AVG(delivery_time_hours) / MIN_TIME) / 2 as efficiency_score
FROM logistics_performance
CROSS JOIN (
    SELECT MIN(AVG(delivery_cost)) as MIN_COST,
           MIN(AVG(delivery_time_hours)) as MIN_TIME
    FROM logistics_performance
    GROUP BY delivery_method
) baseline
WHERE month >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)
GROUP BY delivery_method
ORDER BY efficiency_score ASC;`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 数据可视化分析 */}
            <section id="visualizations" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>数据可视化分析</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>各区域配送准时率</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <DeliveryTimelinessChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>数据洞察：</strong>华东区准时率达92%，表现优异；西北区仅72%，丢失率高达8%。
                      建议加强西北区基础设施建设，优化路由规划，提升末端配送能力。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>物流成本结构</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <CostStructureChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>优化建议：</strong>运输费用占比45%，是最大成本项。
                      建议通过路径优化、车辆满载率提升、共享配送等方式降低运输成本。人工成本25%，可通过自动化分拣提升效率。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>配送时效改进趋势</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <DeliveryTrendChart theme={theme} />
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>关键发现：</strong>通过持续优化，配送时效从年初52小时降至年末38小时，改进27%，达成目标。
                      主要改进措施包括路径优化、仓网布局调整、智能调度系统上线。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Python代码示例 */}
            <section id="python-examples" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Python数据分析示例</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader><CardTitle>示例一：配送路径优化（TSP问题）</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + Optimization</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
from python_tsp.exact import solve_tsp_dynamic_programming

# 读取配送点信息
df = pd.read_sql("""
    SELECT 
        order_id,
        delivery_address,
        latitude,
        longitude,
        time_window_start,
        time_window_end
    FROM pending_deliveries
    WHERE delivery_date = CURRENT_DATE
    AND assigned_courier_id = 12345
""", conn)

# 添加仓库作为起点和终点
warehouse = {'order_id': 0, 'latitude': 31.2304, 'longitude': 121.4737}
df = pd.concat([pd.DataFrame([warehouse]), df]).reset_index(drop=True)

# 计算距离矩阵（欧氏距离）
coords = df[['latitude', 'longitude']].values
distance_matrix = cdist(coords, coords, metric='euclidean')

# 求解TSP问题
permutation, distance = solve_tsp_dynamic_programming(distance_matrix)

# 生成优化后的路径
optimized_route = df.iloc[permutation]
print("优化配送路径：")
print(optimized_route[['order_id', 'delivery_address']])
print(f"\\n总配送距离：{distance:.2f}km")

# 预估配送时间
avg_speed = 30  # 平均时速30km/h
estimated_time = (distance / avg_speed) * 60  # 转换为分钟
print(f"预估配送时间：{estimated_time:.0f}分钟")`}</code>
                    </pre>
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>应用场景：</strong>通过旅行商问题（TSP）算法优化配送路径，最小化总行驶距离。
                      可减少20-30%的行驶里程，降低油耗和配送时间。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader><CardTitle>示例二：异常件预警模型</CardTitle></CardHeader>
                <CardContent>
                  <div className={`p-5 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <Badge variant="secondary" className="mb-3">Python + Classification</Badge>
                    <pre className={`text-xs overflow-x-auto p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'}`}>
                      <code className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>{`import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 读取历史包裹数据
df = pd.read_sql("""
    SELECT 
        weight,
        volume,
        distance,
        weather_condition,
        delivery_area_level,
        courier_experience,
        is_fragile,
        is_delayed_or_damaged as label
    FROM delivery_history
    WHERE delivery_date >= DATE_SUB(CURRENT_DATE, INTERVAL 180 DAY)
""", conn)

# 特征工程
df['weight_volume_ratio'] = df['weight'] / df['volume']
df = pd.get_dummies(df, columns=['weather_condition', 'delivery_area_level'])

# 准备训练数据
features = [c for c in df.columns if c != 'label']
X = df[features]
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# 训练随机森林
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 预测当前待配送包裹
pending = pd.read_sql("""
    SELECT * FROM pending_deliveries WHERE delivery_date = CURRENT_DATE
""", conn)

pending['weight_volume_ratio'] = pending['weight'] / pending['volume']
pending = pd.get_dummies(pending, columns=['weather_condition', 'delivery_area_level'])

risk_scores = model.predict_proba(pending[features])[:, 1]
pending['risk_score'] = risk_scores

# 输出高风险包裹
high_risk = pending[pending['risk_score'] > 0.7]
print(f"识别到 {len(high_risk)} 个高风险包裹，建议加强关注")`}</code>
                    </pre>
                  </div>
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>应用场景：</strong>通过机器学习预测包裹延迟或损坏风险，提前采取防范措施。
                      可降低50%以上的客诉率，提升服务质量。
                    </p>
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
                    <span>案例一：某快递公司智能路由优化</span>
                    <Badge variant="outline" className="text-green-600">成功案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某全国性快递公司面临配送时效差、成本高的问题。日均配送500万单，但准时率仅75%，
                        油耗成本占总成本的30%，远高于行业平均20%。
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 建立智能路由系统，实时优化配送路径</li>
                        <li>• 根据历史数据预测各时段交通状况</li>
                        <li>• 动态调整配送顺序，减少空驶和绕路</li>
                      </ul>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">75% → 89%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>准时率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">-22%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>行驶里程</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">-8%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>油耗成本</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>案例二：某物流平台仓网布局优化</span>
                    <Badge variant="outline" className="text-blue-600">增长案例</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <h4 className="font-bold mb-2">📌 背景</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        某电商物流平台在全国有50个仓库，但配送时效仍不理想。
                        分析发现，仓库布局不合理，导致平均配送距离过长，48小时达成率仅60%。
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20' : 'bg-orange-50'}`}>
                      <h4 className="font-bold mb-2">💡 优化方案</h4>
                      <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>• 基于订单热力图分析各区域需求分布</li>
                        <li>• 使用设施选址模型优化仓库布局</li>
                        <li>• 新增15个前置仓，覆盖高需求区域</li>
                      </ul>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                      <h4 className="font-bold mb-2">📈 优化效果</h4>
                      <div className="grid md:grid-cols-3 gap-4 mt-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">60% → 88%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>48h达成率</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">-35%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>平均配送距离</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-500">+45%</div>
                          <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>用户满意度</div>
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
                  { title: '一味追求速度', problem: '为时效牺牲成本和服务质量', solution: '平衡时效、成本、质量三者' },
                  { title: '忽视异常预警', problem: '问题爆发后才处理', solution: '建立实时监控和预警机制' },
                  { title: '数据滞后', problem: '依赖日报周报', solution: '建立实时数据看板' },
                  { title: '全局统一标准', problem: '不同区域用同一时效标准', solution: '差异化区域时效承诺' },
                  { title: '成本核算粗放', problem: '只看总成本，不拆分', solution: '细化到每个环节成本' },
                  { title: '忽视客户体验', problem: '只看内部指标', solution: '关注客户满意度和NPS' }
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
              <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2 rounded-xl p-8 shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  <BookOpen className="h-8 w-8" />
                  核心公式速查表
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: '⏱️ 时效指标', formulas: ['准时率 = 准时订单 / 总订单', '平均配送时长 = Σ配送时长 / 订单数'] },
                    { title: '💰 成本指标', formulas: ['单票成本 = 总成本 / 订单量', '成本率 = 成本 / 营收'] },
                    { title: '🎯 质量指标', formulas: ['破损率 = 破损订单 / 总订单', '投诉率 = 投诉订单 / 总订单'] },
                    { title: '📈 效率指标', formulas: ['人效 = 订单量 / 员工数', '车辆利用率 = 实际运载 / 额定容量'] }
                  ].map((section, i) => (
                    <div key={i} className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                      <h4 className="text-lg font-bold mb-4">{section.title}</h4>
                      <div className="space-y-3">
                        {section.formulas.map((formula, j) => (
                          <div key={j} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                            <code className="text-sm text-blue-600 dark:text-blue-400">{formula}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30' : 'bg-gradient-to-r from-blue-50 to-cyan-50'}`}>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                ✨ 物流行业数据分析页面已完善！
              </p>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border'}`}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

