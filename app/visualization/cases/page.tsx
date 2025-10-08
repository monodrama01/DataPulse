"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import ReactECharts from "echarts-for-react"
import ChartCard from "@/components/ChartCard"

export default function VizCasesPage() {
  const { theme } = useTheme()
  const kpi = `${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-4 text-center`
  const card = `${theme === 'dark' ? 'bg-white/5' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`
  const placeholder = "w-full h-56 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400"

  const lineOption = {
    color: ['#60a5fa'],
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: Array.from({length: 14}, (_,i)=>`D${i+1}`) },
    yAxis: { type: 'value' },
    series: [{ type: 'line', smooth: true, data: [12,13,15,20,18,30,26,28,24,27,29,35,38,40] }]
  }
  const pieOption = { series: [{ type: 'pie', radius: ['40%','65%'], center: ['50%','45%'], data: [{value:35,name:'VIP'},{value:45,name:'普通'},{value:20,name:'新客'}]}] }
  const barOption = { tooltip:{}, xAxis:{ type:'category', data:['渠道A','渠道B','渠道C','渠道D'] }, yAxis:{ type:'value' }, series:[{ type:'bar', data:[320,240,180,210], barMaxWidth: 28 }] }
  const heatData = Array.from({length: 7*24}, (_,k)=>[k%24, Math.floor(k/24), Math.floor(Math.random()*100)])
  const heatOption = { grid:{ left:50, right:20, top:20, bottom:30 }, xAxis:{ type:'category', data:Array.from({length:24}, (_,i)=>`${i}:00`) }, yAxis:{ type:'category', data:['周日','周六','周五','周四','周三','周二','周一'] }, visualMap:{ min:0, max:100, left:'center', bottom:0, orient:'horizontal' }, series:[{ type:'heatmap', data:heatData }] }
  const funnelOption = { series:[{ type:'funnel', left:'10%', width:'80%', data:[{value:100,name:'浏览'},{value:70,name:'加购'},{value:45,name:'下单'},{value:30,name:'支付'},{value:28,name:'签收'}]}] }
  const boxOption = { dataset:[{ source:[[120,130,115,160,140,135,150,155,165,170],[90,95,100,110,105,98,112,120,125,130]] },{ transform:{ type:'boxplot' } }], xAxis:{ type:'category', data:['金额','客单价'] }, yAxis:{ type:'value' }, series:[{ type:'boxplot', datasetIndex:1 }] }
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"><Home size={20} /><span className="font-medium">主页</span></Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <Link href="/visualization" className="text-blue-600 hover:text-blue-700 font-medium">数据可视化</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>5. 可视化实战案例</span>
            </div>
            <Link href="/visualization" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>5. 可视化实战案例</h1>
        <div className="space-y-8">
          <section>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>案例1：用户运营看板</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className={kpi}>DAU</div>
              <div className={kpi}>MAU</div>
              <div className={kpi}>新增用户</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="新增用户趋势折线图" option={lineOption} />
              <ChartCard title="用户等级分布饼图" option={pieOption} />
              <ChartCard title="各渠道新增用户柱状图" option={barOption} />
              <ChartCard title="用户活跃时段热力图" option={heatOption} />
            </div>
          </section>

          <section>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>案例2：电商大促复盘</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="销售额趋势折线图（含目标线）" option={{...lineOption, series:[{...lineOption.series[0], markLine:{ data:[{ yAxis: 30, name: '目标线' }] }}]}} />
              <ChartCard title="下单-支付-签收漏斗图" option={funnelOption} />
              <ChartCard title="TOP10 商品销量柱状图" option={{...barOption, xAxis:{ type:'category', data:['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10']}, series:[{ type:'bar', data:[320,300,280,260,240,220,200,180,160,140], barMaxWidth: 28 }]}} />
              <ChartCard title="用户消费金额分布箱线图" option={boxOption} />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}


