"use client"

import React, { useState, useEffect } from 'react'
import { getLucideIcon } from "@/components/LucideIcon";
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, Coffee, Target, TrendingUp, CheckCircle, 
  ChevronUp, AlertCircle, BarChart3, BookOpen, Bike, 
  Clock, Store, Users, UtensilsCrossed, ShoppingBag
} from "lucide-react"
import Link from "next/link"
import {
  DeliveryTimeChart,
  CourierEfficiencyChart,
  OrderHeatmapChart
} from "./visualizations"
import { IndustryDropdown } from "../IndustryDropdown"

export default function FoodPage() {
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
              <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>餐饮O2O数据分析</span>
            </div>
            <IndustryDropdown theme={theme} currentIndustry="food" />
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
                <a href="#overview" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-amber-900/30 text-amber-400' : 'hover:bg-amber-50 text-amber-600'}`}>
                  <span>💡</span><span>行业概览</span>
                </a>
                <a href="#metrics" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-orange-900/30 text-orange-400' : 'hover:bg-orange-50 text-orange-600'}`}>
                  <span>📊</span><span>核心指标体系</span>
                </a>
                <a href="#scenarios" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'}`}>
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
                <a href="#pitfalls" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-pink-900/30 text-pink-400' : 'hover:bg-pink-50 text-pink-600'}`}>
                  <span>⚠️</span><span>行业避坑指南</span>
                </a>
                <a href="#formula-reference" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${theme === 'dark' ? 'hover:bg-purple-900/30 text-purple-400' : 'hover:bg-purple-50 text-purple-600'}`}>
                  <span>📖</span><span>核心公式速查表</span>
                </a>
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-16 relative overflow-hidden">
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-red-900/20' : 'bg-gradient-to-r from-amber-100 via-orange-100 to-red-100'} rounded-2xl`}></div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`p-5 rounded-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-amber-600 to-orange-700 shadow-2xl shadow-amber-500/30' : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl shadow-amber-400/30'} animate-pulse`}>
                    <Coffee className="h-14 w-14 text-white" />
                  </div>
                  <div className="flex-1">
                    <h1 className={`text-5xl font-black mb-3 ${theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600'}`}>
                      餐饮O2O数据分析
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      从下单到送达，构建完整的餐饮O2O数据分析能力
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section id="overview" className="mb-20 scroll-mt-24">
              <div className="mb-10">
                <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                  <Target className="h-8 w-8" />
                  餐饮O2O数据分析全景图
                </h2>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>餐饮O2O行业是典型的三方平台模式，涉及<strong>用户</strong>、<strong>商家</strong>、<strong>骑手</strong>三个角色，核心关注订单量、配送时效、商家活跃度等指标。</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'}`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                      <Users className="h-5 w-5" />
                      用户视角
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• 订单量、订单频次</li>
                      <li>• 复购率、用户留存</li>
                      <li>• 客单价、用户LTV</li>
                      <li>• 配送满意度</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'}`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                      <Store className="h-5 w-5" />
                      商家视角
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• 商家活跃度、开关店率</li>
                      <li>• 出餐时长、接单率</li>
                      <li>• 商家评分、投诉率</li>
                      <li>• 商品丰富度</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-700' : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'}`}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                      <Bike className="h-5 w-5" />
                      骑手视角
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• 骑手在线率、活跃度</li>
                      <li>• 配送时长、准时率</li>
                      <li>• 日均订单量、效率</li>
                      <li>• 配送距离、路径优化</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="metrics" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>核心指标体系</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    订单与交易指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Badge variant="outline" className="mb-2">核心指标</Badge>
                      <ul className="space-y-2 text-sm">
                        <li><strong>订单量</strong>：日订单量、周订单量、月订单量</li>
                        <li><strong>GMV</strong>：订单总金额（含配送费）</li>
                        <li><strong>客单价</strong>：订单金额 ÷ 订单量</li>
                        <li><strong>下单用户数</strong>：有效下单的用户数量</li>
                      </ul>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">衍生指标</Badge>
                      <ul className="space-y-2 text-sm">
                        <li><strong>用户下单频次</strong>：订单量 ÷ 下单用户数</li>
                        <li><strong>复购率</strong>：二次及以上购买用户 ÷ 总用户</li>
                        <li><strong>新客占比</strong>：首次下单用户 ÷ 总用户</li>
                        <li><strong>退单率</strong>：退单数 ÷ 总订单数</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    配送时效指标
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Badge variant="outline" className="mb-2">时效指标</Badge>
                      <ul className="space-y-2 text-sm">
                        <li><strong>配送时长</strong>：从接单到送达的时长</li>
                        <li><strong>准时率</strong>：预计送达时间内完成的订单比例</li>
                        <li><strong>超时率</strong>：超过预计送达时间的订单比例</li>
                        <li><strong>配送距离</strong>：商家到用户的配送距离</li>
                      </ul>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">骑手效率</Badge>
                      <ul className="space-y-2 text-sm">
                        <li><strong>骑手日均订单量</strong>：单个骑手日均完成订单数</li>
                        <li><strong>骑手在线时长</strong>：骑手可接单的时长</li>
                        <li><strong>接单率</strong>：骑手接单数 ÷ 派单数</li>
                        <li><strong>骑手流失率</strong>：流失骑手 ÷ 总骑手</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="scenarios" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>典型分析场景</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle className="text-2xl">场景一：配送时效分析</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">分析步骤</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>时段分析</strong>：按时段统计配送时长、准时率（午高峰11-13点、晚高峰17-20点）</li>
                      <li><strong>距离分析</strong>：按配送距离分段（&lt;1km、1-3km、3-5km、&gt;5km）统计时效表现</li>
                      <li><strong>商圈分析</strong>：按商圈/区域统计配送时长，识别瓶颈区域</li>
                      <li><strong>天气影响</strong>：对比晴天vs雨天的配送时效差异</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">关键指标</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>平均配送时长、准时率、超时率</li>
                      <li>不同距离段的时效分布</li>
                      <li>高峰期vs非高峰期时效对比</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className="text-lg font-semibold mb-3">SQL示例：时段配送时效分析</h3>
                    <pre className="text-xs overflow-x-auto">
{`-- 按时段统计配送时效
SELECT 
  CASE 
    WHEN HOUR(order_time) BETWEEN 11 AND 13 THEN '午高峰(11-13)'
    WHEN HOUR(order_time) BETWEEN 17 AND 20 THEN '晚高峰(17-20)'
    ELSE '非高峰'
  END AS time_period,
  COUNT(*) AS order_count,
  AVG(delivery_duration) AS avg_delivery_time,
  SUM(CASE WHEN delivery_duration <= estimated_time THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS on_time_rate,
  SUM(CASE WHEN delivery_duration > estimated_time THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS late_rate
FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  AND order_status = 'completed'
GROUP BY time_period
ORDER BY order_count DESC;`}
                    </pre>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                    <p className="text-sm"><strong>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 实战案例</strong>：某外卖平台发现午高峰时段准时率仅70%（非高峰85%），通过增加骑手排班、优化派单算法，准时率提升至82%。</p>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle className="text-2xl">场景二：骑手调度优化分析</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">分析步骤</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>骑手产能分析</strong>：统计骑手日均订单量、在线时长、单均配送时长</li>
                      <li><strong>订单密度分析</strong>：按区域统计订单密度，识别运力不足区域</li>
                      <li><strong>派单效率分析</strong>：统计接单率、拒单率、订单等待时长</li>
                      <li><strong>骑手流失分析</strong>：统计骑手留存率、流失原因（收入低、工作强度大）</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">优化方向</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>动态调度</strong>：根据订单热力图实时调整骑手分布</li>
                      <li><strong>智能派单</strong>：考虑距离、骑手能力、订单优先级</li>
                      <li><strong>激励机制</strong>：高峰期补贴、连单奖励</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className="text-lg font-semibold mb-3">SQL示例：骑手效率分析</h3>
                    <pre className="text-xs overflow-x-auto">
{`-- 骑手效率综合分析
SELECT 
  courier_id,
  COUNT(*) AS total_orders,
  AVG(delivery_duration) AS avg_delivery_time,
  SUM(delivery_distance) / COUNT(*) AS avg_distance,
  SUM(CASE WHEN delivery_duration <= estimated_time THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS on_time_rate,
  SUM(order_amount) AS total_gmv,
  SUM(tip_amount) AS total_tips
FROM orders
WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  AND order_status = 'completed'
GROUP BY courier_id
HAVING total_orders >= 100
ORDER BY on_time_rate DESC, total_orders DESC
LIMIT 20;`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="visualizations" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>数据可视化分析</h2>
              
              <div className="grid md:grid-cols-1 gap-8">
                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle>配送时长分布图</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DeliveryTimeChart theme={theme} />
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle>骑手效率分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CourierEfficiencyChart theme={theme} />
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <CardHeader>
                    <CardTitle>订单热力图（按时段与区域）</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrderHeatmapChart theme={theme} />
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="python-examples" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>Python数据分析示例</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle>示例1：骑手调度优化算法（匈牙利算法）</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs overflow-x-auto bg-gray-900 text-gray-100 p-4 rounded-lg">
{`import numpy as np
from scipy.optimize import linear_sum_assignment

# 骑手调度优化：将订单分配给骑手，最小化总配送时间
def optimize_courier_dispatch(orders, couriers):
    """
    使用匈牙利算法优化骑手派单
    
    参数:
    - orders: 订单列表 [(order_id, lat, lng), ...]
    - couriers: 骑手列表 [(courier_id, lat, lng), ...]
    
    返回:
    - 最优分配方案 [(order_id, courier_id), ...]
    """
    
    # 计算距离矩阵（使用曼哈顿距离简化）
    cost_matrix = np.zeros((len(orders), len(couriers)))
    
    for i, (order_id, o_lat, o_lng) in enumerate(orders):
        for j, (courier_id, c_lat, c_lng) in enumerate(couriers):
            # 计算距离（可替换为实际路径距离）
            distance = abs(o_lat - c_lat) + abs(o_lng - c_lng)
            cost_matrix[i][j] = distance
    
    # 使用匈牙利算法求解最优分配
    row_ind, col_ind = linear_sum_assignment(cost_matrix)
    
    # 生成分配结果
    assignments = []
    for i, j in zip(row_ind, col_ind):
        order_id = orders[i][0]
        courier_id = couriers[j][0]
        distance = cost_matrix[i][j]
        assignments.append({
            'order_id': order_id,
            'courier_id': courier_id,
            'distance': distance
        })
    
    return assignments

# 示例数据
orders = [
    ('O001', 31.23, 121.47),
    ('O002', 31.25, 121.49),
    ('O003', 31.22, 121.45)
]

couriers = [
    ('C001', 31.24, 121.48),
    ('C002', 31.21, 121.46),
    ('C003', 31.26, 121.50)
]

# 执行优化
result = optimize_courier_dispatch(orders, couriers)
print("最优派单方案：")
for assignment in result:
    print(f"订单 {assignment['order_id']} -> 骑手 {assignment['courier_id']} (距离: {assignment['distance']:.2f}km)")`}
                  </pre>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>示例2：订单量预测与骑手排班</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs overflow-x-auto bg-gray-900 text-gray-100 p-4 rounded-lg">
{`import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime, timedelta

# 订单量预测模型
def predict_order_volume(historical_data):
    """
    预测未来订单量，用于骑手排班
    
    特征：
    - 星期几、时段、天气、节假日
    - 历史同期订单量
    """
    
    df = pd.DataFrame(historical_data)
    
    # 特征工程
    df['hour'] = pd.to_datetime(df['order_time']).dt.hour
    df['day_of_week'] = pd.to_datetime(df['order_time']).dt.dayofweek
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
    df['is_lunch_time'] = df['hour'].isin([11, 12, 13]).astype(int)
    df['is_dinner_time'] = df['hour'].isin([17, 18, 19, 20]).astype(int)
    df['is_rainy'] = df['weather'].isin(['rainy', 'heavy_rain']).astype(int)
    
    # 准备训练数据
    features = ['hour', 'day_of_week', 'is_weekend', 'is_lunch_time', 
                'is_dinner_time', 'is_rainy']
    X = df[features]
    y = df['order_count']
    
    # 训练模型
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # 预测未来7天每小时订单量
    predictions = []
    for day in range(7):
        for hour in range(24):
            future_time = datetime.now() + timedelta(days=day, hours=hour)
            feature_values = {
                'hour': hour,
                'day_of_week': future_time.weekday(),
                'is_weekend': 1 if future_time.weekday() in [5, 6] else 0,
                'is_lunch_time': 1 if hour in [11, 12, 13] else 0,
                'is_dinner_time': 1 if hour in [17, 18, 19, 20] else 0,
                'is_rainy': 0  # 假设晴天
            }
            X_pred = pd.DataFrame([feature_values])
            pred_volume = model.predict(X_pred)[0]
            
            # 计算所需骑手数（假设每个骑手每小时可完成3单）
            required_couriers = int(np.ceil(pred_volume / 3))
            
            predictions.append({
                'datetime': future_time,
                'predicted_orders': pred_volume,
                'required_couriers': required_couriers
            })
    
    return pd.DataFrame(predictions)

# 示例：使用预测结果进行排班
predictions = predict_order_volume(historical_data)
print("\\n未来高峰时段骑手需求：")
peak_hours = predictions[predictions['predicted_orders'] > 100]
print(peak_hours[['datetime', 'predicted_orders', 'required_couriers']])`}
                  </pre>
                </CardContent>
              </Card>
            </section>

            <section id="case-studies" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>真实案例研究</h2>
              
              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-8`}>
                <CardHeader>
                  <CardTitle className="text-2xl">案例1：外卖平台配送时效优化</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge className="mb-2">背景</Badge>
                    <p className="text-sm">某外卖平台在高峰期准时率仅70%，用户投诉率高达15%，严重影响用户体验和复购率。</p>
                  </div>
                  <div>
                    <Badge className="mb-2">分析过程</Badge>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>按时段分析：午高峰（11-13点）超时率达35%，晚高峰（17-20点）超时率28%</li>
                      <li>按区域分析：CBD区域订单密集但骑手不足，郊区骑手闲置率高</li>
                      <li>按距离分析：3-5km订单超时率最高（42%），派单算法未考虑距离因素</li>
                      <li>骑手访谈：高峰期订单过载，单次派单3-4单导致配送延迟</li>
                    </ol>
                  </div>
                  <div>
                    <Badge className="mb-2">优化措施</Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>动态调度</strong>：高峰前1小时引导骑手前往热点区域（补贴激励）</li>
                      <li><strong>智能派单</strong>：优化算法，限制单次派单数量（高峰期≤2单）</li>
                      <li><strong>预估时间优化</strong>：根据实际数据调整预估送达时间（+5分钟缓冲）</li>
                      <li><strong>骑手激励</strong>：准时奖励（准时率&gt;90%额外补贴20元/天）</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <Badge className="mb-2">成果</Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>准时率从70%提升至85%（提升15个百分点）</li>
                      <li>用户投诉率从15%降至6%（下降60%）</li>
                      <li>用户复购率从35%提升至48%（提升13个百分点）</li>
                      <li>骑手日均订单量从18单提升至22单（提升22%）</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">案例2：餐饮平台骑手效率提升项目</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge className="mb-2">背景</Badge>
                    <p className="text-sm">某餐饮平台骑手流失率高达30%/月，招聘成本高，且骑手日均订单量仅15单（行业平均20单）。</p>
                  </div>
                  <div>
                    <Badge className="mb-2">分析过程</Badge>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>骑手访谈：收入低（月均4000元）、工作强度大、等单时间长</li>
                      <li>数据分析：骑手等单时间占比35%，配送路径未优化导致绕路</li>
                      <li>区域分析：订单分布不均，30%骑手闲置率&gt;40%</li>
                      <li>竞品对比：行业领先平台骑手月收入6000+，日均22单</li>
                    </ol>
                  </div>
                  <div>
                    <Badge className="mb-2">优化措施</Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>智能派单优化</strong>：顺路订单优先派给同一骑手（连单率从20%提升至40%）</li>
                      <li><strong>路径优化算法</strong>：集成地图API，自动规划最优路径（节省15%配送时间）</li>
                      <li><strong>区域调度</strong>：实时订单热力图，动态引导骑手前往高需求区域</li>
                      <li><strong>激励体系升级</strong>：基础单价+连单奖励+高峰补贴+准时奖励</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
                    <Badge className="mb-2">成果</Badge>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>骑手日均订单量从15单提升至21单（提升40%）</li>
                      <li>骑手月均收入从4000元提升至5500元（提升37.5%）</li>
                      <li>骑手流失率从30%/月降至12%/月（下降60%）</li>
                      <li>配送时长从35分钟降至29分钟（下降17%）</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="pitfalls" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>行业避坑指南</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      坑1：过度追求配送时效
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>问题：</strong>为了提升准时率，过度压缩预估时间，导致骑手闯红灯、逆行等危险行为。</p>
                    <p className="text-green-600 dark:text-green-400"><strong>建议：</strong>平衡时效与安全，设置合理的预估送达时间，不应低于实际平均时长的90%。</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      坑2：忽略骑手运力调度
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>问题：</strong>订单高峰期骑手不足，大量订单超时；非高峰期骑手闲置，成本浪费。</p>
                    <p className="text-green-600 dark:text-green-400"><strong>建议：</strong>建立订单预测模型，提前1-2小时预判订单量，动态调度骑手分布。</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      坑3：补贴依赖症
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>问题：</strong>长期大额补贴培养用户低价心理，补贴一停订单暴跌，难以自我造血。</p>
                    <p className="text-green-600 dark:text-green-400"><strong>建议：</strong>补贴应精准投放（新用户、低频用户），逐步培养用户习惯，关注真实复购率而非补贴驱动的订单。</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      坑4：商家质量管控不足
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>问题：</strong>只关注GMV，忽视商家质量，导致用户体验差（出餐慢、食品质量差）。</p>
                    <p className="text-green-600 dark:text-green-400"><strong>建议：</strong>建立商家评分体系（出餐时长、用户评分、投诉率），低分商家限流或下架。</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      坑5：数据孤岛问题
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>问题：</strong>订单、骑手、商家数据分散在不同系统，无法关联分析，导致决策盲目。</p>
                    <p className="text-green-600 dark:text-green-400"><strong>建议：</strong>建立统一数据仓库，打通用户、订单、骑手、商家全链路数据，支持多维分析。</p>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border-2`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      坑6：忽略天气因素影响
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2"><strong>问题：</strong>雨天订单暴增但骑手不足，配送时长延长，用户满意度下降。</p>
                    <p className="text-green-600 dark:text-green-400"><strong>建议：</strong>接入天气API，雨天提前预警并动员骑手（雨天补贴），调整预估送达时间。</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="formula-reference" className="mb-20 scroll-mt-24">
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>核心公式速查表</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'} border-2`}>
                  <CardHeader>
                    <CardTitle>订单与交易公式</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">客单价</p>
                      <p className="font-mono text-xs">= 订单总金额 ÷ 订单量</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">用户下单频次</p>
                      <p className="font-mono text-xs">= 订单量 ÷ 下单用户数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">复购率</p>
                      <p className="font-mono text-xs">= 二次及以上购买用户 ÷ 总用户数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">退单率</p>
                      <p className="font-mono text-xs">= 退单数 ÷ 总订单数</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'} border-2`}>
                  <CardHeader>
                    <CardTitle>配送时效公式</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">准时率</p>
                      <p className="font-mono text-xs">= 预计时间内送达订单数 ÷ 总订单数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">超时率</p>
                      <p className="font-mono text-xs">= 超过预计时间订单数 ÷ 总订单数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">平均配送时长</p>
                      <p className="font-mono text-xs">= 总配送时长 ÷ 订单数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">配送距离</p>
                      <p className="font-mono text-xs">= 商家位置到用户位置的实际路径距离</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-700' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'} border-2`}>
                  <CardHeader>
                    <CardTitle>骑手效率公式</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">骑手日均订单量</p>
                      <p className="font-mono text-xs">= 总订单量 ÷ (骑手数 × 天数)</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">接单率</p>
                      <p className="font-mono text-xs">= 接单数 ÷ 派单数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">骑手在线率</p>
                      <p className="font-mono text-xs">= 在线时长 ÷ 工作时长</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">骑手流失率</p>
                      <p className="font-mono text-xs">= 流失骑手数 ÷ 期初骑手总数</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-700' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'} border-2`}>
                  <CardHeader>
                    <CardTitle>商家质量公式</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">商家活跃度</p>
                      <p className="font-mono text-xs">= 活跃商家数 ÷ 总商家数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">出餐准时率</p>
                      <p className="font-mono text-xs">= 预计时间内出餐订单数 ÷ 总订单数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">商家投诉率</p>
                      <p className="font-mono text-xs">= 商家被投诉订单数 ÷ 商家总订单数</p>
                    </div>
                    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="font-semibold mb-1">接单率</p>
                      <p className="font-mono text-xs">= 商家接单数 ÷ 派单数</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className={`mt-16 text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30' : 'bg-gradient-to-r from-amber-50 to-orange-50'}`}>
              <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                ✨ 所有11个行业数据分析页面已完善！
              </p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                涵盖电商、内容、金融、游戏、教育、医疗、旅游、餐饮、零售、物流、制造全行业
              </p>
            </div>
          </main>
        </div>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg ${theme === 'dark' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-white hover:bg-gray-100 text-gray-900 border'}`}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  )
}

