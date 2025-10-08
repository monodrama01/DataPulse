"use client"

import React from 'react'
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Brain, TrendingUp, Users, Target, BarChart3, ShoppingCart, 
  Repeat, MessageSquare, FileText, Zap, CheckCircle, ArrowRight,
  BookOpen, Layers, Database, LineChart, PieChart, Activity
} from "lucide-react"
import Link from "next/link"

export default function BusinessPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* 顶部面包屑 */}
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>
              首页
            </Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>业务知识</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            数据分析业务知识体系
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            从业务认知到指标建模，从理论框架到实战落地，掌握数据分析师必备的业务知识
          </p>
        </div>

        {/* 知识体系五层架构 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            📚 知识体系架构
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  业务认知层
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  为什么、凭什么
                </p>
              </CardContent>
            </Card>
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6 text-center">
                <Database className="h-12 w-12 mx-auto mb-3 text-purple-500" />
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  指标字典层
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  用什么衡量
                </p>
              </CardContent>
            </Card>
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6 text-center">
                <Layers className="h-12 w-12 mx-auto mb-3 text-green-500" />
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  模型框架层
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  怎么搭模型
                </p>
              </CardContent>
            </Card>
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 mx-auto mb-3 text-orange-500" />
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  工具方法层
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  怎么落地
                </p>
              </CardContent>
            </Card>
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-6 text-center">
                <Repeat className="h-12 w-12 mx-auto mb-3 text-red-500" />
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                  管理迭代层
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  怎么持续
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 第一层：业务认知 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <Brain className="h-8 w-8 text-blue-500" />
            一、业务认知层：建立业务思维
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-blue-500" />
                  行业知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>金融</strong>：重合规、风控指标</li>
                  <li>• <strong>电商</strong>：重货品、转化漏斗</li>
                  <li>• <strong>O2O</strong>：重运力、履约效率</li>
                  <li>• <strong>内容</strong>：重双边、生产消费</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Repeat className="h-5 w-5 text-purple-500" />
                  场景知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>拉新</strong>：获客渠道、CAC</li>
                  <li>• <strong>激活</strong>：首次关键行为</li>
                  <li>• <strong>留存</strong>：次日/7日/30日</li>
                  <li>• <strong>变现</strong>：付费转化、ARPU</li>
                  <li>• <strong>传播</strong>：老带新、K因子</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-green-500" />
                  角色知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>• <strong>老板</strong>：看钱（ROI、LTV）</li>
                  <li>• <strong>运营</strong>：看量（UV、转化率）</li>
                  <li>• <strong>财务</strong>：看账（成本、利润）</li>
                  <li>• <strong>技术</strong>：看表（性能、异常）</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} border-2`}>
            <CardContent className="p-6">
              <h3 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                <CheckCircle className="h-5 w-5" />
                业务→数据翻译能力
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>业务痛点：</strong>重庆山城配送慢
                  </p>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>数据问题：</strong>"最后500米"路段耗时异常
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    <strong>可能指标：</strong>骑行→步行订单占比、平均爬升坡度
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>业务吐槽：</strong>新客增长乏力
                  </p>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <strong>数据问题：</strong>渠道ROI{'<'}1
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    <strong>可能指标：</strong>CAC、90天LTV、渠道新客占比
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 第二层：指标字典 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <Database className="h-8 w-8 text-purple-500" />
            二、指标字典层：建立度量体系
          </h2>

          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} mb-8`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-purple-500" />
                好指标的5大铁律
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { num: "1", title: "核心唯一", desc: "一个阶段只追1个北极星" },
                  { num: "2", title: "比率优先", desc: "绝对值→比例" },
                  { num: "3", title: "效果显著", desc: "提升5%带来>=5% uplift" },
                  { num: "4", title: "拒绝虚荣", desc: "注册数↑但CAC↑=虚荣" },
                  { num: "5", title: "简单稳定", desc: "口径<=2行SQL，90天不变" }
                ].map((rule, idx) => (
                  <div key={idx} className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-purple-50'}`}>
                    <div className="text-2xl font-bold text-purple-500 mb-2">{rule.num}</div>
                    <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                      {rule.title}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {rule.desc}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-blue-500" />
                核心指标速查表（30个必背）
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 流量类 */}
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    <Activity className="h-4 w-4" />
                    流量与活跃
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "PV", desc: "页面浏览量", formula: "count(pageview)" },
                      { name: "UV", desc: "独立访客", formula: "count(distinct user_id)" },
                      { name: "DAU", desc: "日活跃用户", formula: "当日活跃去重用户" },
                      { name: "MAU", desc: "月活跃用户", formula: "当月活跃去重用户" },
                      { name: "跳出率", desc: "单页退出率", formula: "单页退出/总会话" },
                      { name: "退出率", desc: "页面退出率", formula: "从该页退出/进入该页" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">原子</Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                          {metric.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 留存类 */}
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    <Repeat className="h-4 w-4" />
                    留存与复购
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "次日留存", desc: "第2天仍活跃", formula: "次日活跃/首日新增" },
                      { name: "7日留存", desc: "第7天仍活跃", formula: "7日后活跃/首日新增" },
                      { name: "复购率", desc: "时段内>=2次", formula: ">=2次购买/总购买用户" },
                      { name: "回购率", desc: "跨时段再购", formula: "下时段仍购/上时段购买" },
                      { name: "流失率", desc: "上月活本月不活", formula: "本月不活跃/上月活跃" },
                      { name: "召回率", desc: "流失用户召回", formula: "召回成功/流失用户" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">原子</Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                          {metric.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 收入类 */}
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    <TrendingUp className="h-4 w-4" />
                    收入与价值
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "ARPU", desc: "每用户平均收入", formula: "总收入/活跃用户" },
                      { name: "ARPPU", desc: "每付费用户收入", formula: "总收入/付费用户" },
                      { name: "LTV", desc: "生命周期价值", formula: "ARPU/(月流失率)" },
                      { name: "CAC", desc: "获客成本", formula: "市场费用/新增用户" },
                      { name: "付费率", desc: "付费用户占比", formula: "付费用户/活跃用户" },
                      { name: "客单价", desc: "订单平均金额", formula: "总GMV/总订单" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {metric.name === "LTV" ? "组合" : "原子"}
                          </Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                          {metric.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 营销类 */}
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                    <Target className="h-4 w-4" />
                    营销与转化
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "CTR", desc: "点击率", formula: "点击量/曝光量" },
                      { name: "CVR", desc: "转化率", formula: "转化数/点击数" },
                      { name: "ROI", desc: "投资回报率", formula: "收入/成本" },
                      { name: "CPC", desc: "单次点击成本", formula: "广告费/点击数" },
                      { name: "CPM", desc: "千次曝光成本", formula: "广告费/曝光数×1000" },
                      { name: "K因子", desc: "病毒系数", formula: "邀请成功数/老用户数" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">组合</Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                          {metric.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 电商类 */}
                <div>
                  <h4 className={`font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    <ShoppingCart className="h-4 w-4" />
                    电商专属
                  </h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    {[
                      { name: "购物篮系数", desc: "连带率", formula: "总件数/总订单" },
                      { name: "加购率", desc: "加入购物车比例", formula: "加购数/商详UV" },
                      { name: "支付成功率", desc: "支付完成率", formula: "支付成功/下单数" },
                      { name: "购物车放弃率", desc: "加购未下单率", formula: "(加购-下单)/加购" },
                      { name: "件单价", desc: "单品均价", formula: "总GMV/总件数" },
                      { name: "动销率", desc: "有销售商品占比", formula: "有销售SKU/总SKU" }
                    ].map((metric, idx) => (
                      <div key={idx} className={`p-3 rounded border ${theme === 'dark' ? 'border-gray-600 bg-gray-700/30' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                            {metric.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {metric.name === "购物篮系数" || metric.name === "件单价" ? "原子" : "组合"}
                          </Badge>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                          {metric.desc}
                        </p>
                        <code className={`text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                          {metric.formula}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 第三层：模型框架 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <Layers className="h-8 w-8 text-green-500" />
            三、模型框架层：六大经典模型
          </h2>

          <div className="space-y-8">
            {/* AARRR 模型 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Repeat className="h-6 w-6 text-blue-500" />
                  AARRR 海盗模型（互联网产品通用）
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  适用场景：互联网产品全生命周期管理，从获客到传播的完整闭环
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { 
                      stage: "Acquisition", 
                      cn: "获客", 
                      icon: "🎯", 
                      metrics: ["曝光量", "点击量", "下载量", "注册量"],
                      key: "曝光-注册转化率、CAC"
                    },
                    { 
                      stage: "Activation", 
                      cn: "激活", 
                      icon: "⚡", 
                      metrics: ["首次下单", "首次阅读", "首次投资"],
                      key: "激活率、首单时长"
                    },
                    { 
                      stage: "Retention", 
                      cn: "留存", 
                      icon: "🔄", 
                      metrics: ["次日留存", "7日留存", "30日留存"],
                      key: "N日留存率"
                    },
                    { 
                      stage: "Revenue", 
                      cn: "收入", 
                      icon: "💰", 
                      metrics: ["付费用户", "ARPU", "ARPPU"],
                      key: "付费率、LTV"
                    },
                    { 
                      stage: "Referral", 
                      cn: "传播", 
                      icon: "📢", 
                      metrics: ["邀请发送", "邀请成功", "老带新"],
                      key: "K因子"
                    }
                  ].map((stage, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                      <div className="text-3xl mb-2 text-center">{stage.icon}</div>
                      <h4 className={`font-semibold text-center mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {stage.cn}
                        <br />
                        <span className="text-xs text-blue-500">{stage.stage}</span>
                      </h4>
                      <ul className={`text-xs space-y-1 mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stage.metrics.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                      <div className={`text-xs font-semibold p-2 rounded ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                        核心：{stage.key}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 电商人货场模型 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-purple-500" />
                  电商人货场模型（零售、电商）
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  适用场景：零售电商业务分析，从流量到商品到转化的全链路
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* 人（流量） */}
                  <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-blue-700 bg-blue-900/20' : 'border-blue-200 bg-blue-50'}`}>
                    <div className="text-4xl mb-3 text-center">👥</div>
                    <h4 className="font-bold text-center mb-4 text-blue-500">
                      人（流量）
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">▸</span>
                        <span>UV - 独立访客</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">▸</span>
                        <span>新老客占比</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">▸</span>
                        <span>获客渠道ROI</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">▸</span>
                        <span>用户分层（RFM）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-blue-500">▸</span>
                        <span>地域分布</span>
                      </li>
                    </ul>
                  </div>

                  {/* 货（商品） */}
                  <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-purple-700 bg-purple-900/20' : 'border-purple-200 bg-purple-50'}`}>
                    <div className="text-4xl mb-3 text-center">📦</div>
                    <h4 className="font-bold text-center mb-4 text-purple-500">
                      货（商品）
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500">▸</span>
                        <span>客单价（订单平均金额）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500">▸</span>
                        <span>件单价（单品均价）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500">▸</span>
                        <span>购物篮系数（件/单）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500">▸</span>
                        <span>复购率 vs 回购率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500">▸</span>
                        <span>动销率、畅销Top</span>
                      </li>
                    </ul>
                  </div>

                  {/* 场（页面） */}
                  <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-green-700 bg-green-900/20' : 'border-green-200 bg-green-50'}`}>
                    <div className="text-4xl mb-3 text-center">🏪</div>
                    <h4 className="font-bold text-center mb-4 text-green-500">
                      场（页面）
                    </h4>
                    <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-500">▸</span>
                        <span>商详页转化率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-500">▸</span>
                        <span>加购转化率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-500">▸</span>
                        <span>支付成功率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-500">▸</span>
                        <span>购物车放弃率</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-500">▸</span>
                        <span>页面跳出率</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 其他4个模型概览 */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    市场营销模型
                  </CardTitle>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    品牌/广告营销全流程
                  </p>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">潜在客户</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">机会客户</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">新客</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">老客</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">忠诚客户</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">流失客户</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：线索转化率、渠道新客占比
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-cyan-500" />
                    流量-网站模型
                  </CardTitle>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    官网、活动页分析
                  </p>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">来源</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">落地页</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">浏览</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">注册</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">留存</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：跳出率 vs 退出率、停留时长
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-pink-500" />
                    用户行为模型
                  </CardTitle>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    内容/工具型App
                  </p>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">启动</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">功能使用</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">路径分析</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">转化</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">流失</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：功能使用率、关键路径耗时
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    内容平台双循环
                  </CardTitle>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    知乎/小红书类平台
                  </p>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg mb-3 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">生产者</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">内容</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">消费者</Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline" className="text-xs">双边互动</Badge>
                    </div>
                    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      核心指标：内容指数、双边活跃度、生产者渗透率
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 第四层：工具方法 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <Zap className="h-8 w-8 text-orange-500" />
            四、工具方法层：七大思维武器
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🌳",
                name: "结构化思维",
                desc: "树形拆解，先分后量",
                example: "收入 = 客单价 × 付费人数",
                tool: "Xmind 思维导图"
              },
              {
                icon: "🧮",
                name: "公式化思维",
                desc: "加减乘除+漏斗",
                example: "转化率 = 下游环节 / 上游环节",
                tool: "Excel/SQL"
              },
              {
                icon: "🏢",
                name: "业务化思维",
                desc: "现场走查→问题清单",
                example: "重庆步行配送分析",
                tool: "访谈、观察"
              },
              {
                icon: "📊",
                name: "对比法",
                desc: "自身/竞品/时间/空间",
                example: "本周 vs 上周、我司 vs 竞品",
                tool: "同比/环比"
              },
              {
                icon: "🎯",
                name: "多维法",
                desc: "象限、交叉、RFM",
                example: "用户价值×流失风险 4象限",
                tool: "RFM分群"
              },
              {
                icon: "🔄",
                name: "闭环法",
                desc: "PDCA指标生命周期",
                example: "需求→口径→落地→复盘→下线",
                tool: "迭代管理"
              },
              {
                icon: "🎨",
                name: "主成分法",
                desc: "PCA降维→综合指数",
                example: "内容指数 = 0.4×点赞 + 0.3×评论 + 0.3×收藏",
                tool: "Python sklearn"
              }
            ].map((method, idx) => (
              <Card key={idx} className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {method.name}
                      </h3>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {method.desc}
                      </p>
                      <div className={`p-3 rounded mb-2 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <p className={`text-xs font-mono ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                          示例：{method.example}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        工具：{method.tool}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 第五层：管理迭代 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <Repeat className="h-8 w-8 text-red-500" />
            五、管理迭代层：指标生命周期
          </h2>

          <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: "需求提出", icon: "💡", output: "需求单" },
                  { step: "定义口径", icon: "📝", output: "口径说明书" },
                  { step: "数据落地", icon: "⚙️", output: "SQL脚本" },
                  { step: "报表呈现", icon: "📊", output: "Dashboard" },
                  { step: "复盘优化", icon: "🔍", output: "复盘报告" },
                  { step: "指标下线", icon: "🗑️", output: "下线邮件" }
                ].map((phase, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <div className={`text-4xl mb-2 p-4 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {phase.icon}
                      </div>
                      <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                        {phase.step}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {phase.output}
                      </Badge>
                    </div>
                    {idx < 5 && (
                      <ArrowRight className={`h-6 w-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Card className={`${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'} border-2`}>
                <CardHeader>
                  <CardTitle className="text-lg">复盘四问表（PDCA闭环）</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-blue-500">
                        1. 指标达标？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        目标 vs 实际
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-red-500">
                        2. 未达标根因？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        拆解分析
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-green-500">
                        3. 策略调整？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        优化方案
                      </div>
                    </div>
                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="font-semibold mb-2 text-purple-500">
                        4. 下一步指标？
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        迭代目标
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        {/* 学习路径 */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            <BookOpen className="h-8 w-8 text-blue-500" />
            🎯 三周快速上手路线（新人版）
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 第1周 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-shadow`}>
              <CardHeader className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-lg px-4 py-1 bg-blue-500">
                    第1周
                  </Badge>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    3h × 5天
                  </span>
                </div>
                <CardTitle className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                  理论基础
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  背熟30个原子指标+会画文字漏斗
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  学习任务：
                </h4>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                    <span className="text-sm">每天背6个核心指标</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                    <span className="text-sm">手绘AARRR漏斗图</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                    <span className="text-sm">制作指标卡片</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                    <span className="text-sm">理解好指标5大铁律</span>
                  </li>
                </ul>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                  <div className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    交付物：
                  </div>
                  <div className="text-sm font-semibold text-blue-500">
                    30个指标卡片 + 手绘漏斗
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 第2周 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-shadow`}>
              <CardHeader className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-lg px-4 py-1 bg-purple-500">
                    第2周
                  </Badge>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    4h × 5天
                  </span>
                </div>
                <CardTitle className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                  实战分析
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  选1个常用App做指标体系分析
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  学习任务：
                </h4>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <span className="text-sm">选择分析对象（淘宝/抖音/美团等）</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <span className="text-sm">识别业务模型</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <span className="text-sm">拆解核心指标</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                    <span className="text-sm">制作10页PPT报告</span>
                  </li>
                </ul>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                  <div className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    交付物：
                  </div>
                  <div className="text-sm font-semibold text-purple-500">
                    《XX App指标体系》PPT 10页
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 第3周 */}
            <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-xl transition-shadow`}>
              <CardHeader className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="text-lg px-4 py-1 bg-green-500">
                    第3周
                  </Badge>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    4h × 5天
                  </span>
                </div>
                <CardTitle className={theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}>
                  技术落地
                </CardTitle>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  落地SQL+Python自动化
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  学习任务：
                </h4>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span className="text-sm">编写SQL拉数脚本</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span className="text-sm">用Pandas清洗数据</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span className="text-sm">用pyecharts画漏斗</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    <span className="text-sm">搭建自动化Dashboard</span>
                  </li>
                </ul>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'}`}>
                  <div className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    交付物：
                  </div>
                  <div className="text-sm font-semibold text-green-500">
                    自动拉数脚本 + 可视化Dashboard
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA 区域 */}
        <Card className={`${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} border-2`}>
          <CardContent className="p-12 text-center">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              准备好开始实践了吗？
            </h2>
            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              业务知识是数据分析的基石，从理解业务到建立指标体系，从经典模型到实战落地
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
                  <BookOpen className="mr-2 h-5 w-5" />
                  返回学习地图
                </Button>
              </Link>
              <Link href="/statistics">
                <Button variant="outline" className="text-lg px-8 py-6">
                  下一模块：统计分析
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
