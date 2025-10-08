"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import ReactECharts from "echarts-for-react"
import ChartCard from "@/components/ChartCard"

export default function VizChartTypesPage() {
  const { theme } = useTheme()
  const card = `${theme === 'dark' ? 'bg-white/5' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg p-4`
  const placeholder = "w-full h-56 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400"

  const textColor = theme === 'dark' ? '#e5e7eb' : '#111827'
  const subTextColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
  const axisLineColor = theme === 'dark' ? '#374151' : '#e5e7eb'

  const baseGrid = { left: 40, right: 20, top: 30, bottom: 40 }

  const barOption = {
    color: ['#60a5fa'],
    tooltip: { trigger: 'axis' },
    grid: baseGrid,
    xAxis: { type: 'category', data: ['华北', '华东', '华南', '西南', '东北'], axisLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    series: [{ type: 'bar', data: [820, 932, 901, 934, 1290], barMaxWidth: 28 }]
  }

  // 堆叠柱状图
  const stackedBarOption = {
    color: ['#60a5fa', '#34d399', '#f59e0b'],
    tooltip: { trigger: 'axis' },
    legend: { textStyle: { color: subTextColor } },
    grid: baseGrid,
    xAxis: { type: 'category', data: ['一月','二月','三月','四月','五月'], axisLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    series: [
      { name: '线上', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90], barMaxWidth: 28 },
      { name: '线下', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290], barMaxWidth: 28 },
      { name: '第三方', type: 'bar', stack: 'total', data: [150, 232, 201, 154, 190], barMaxWidth: 28 }
    ]
  }

  const lineOption = {
    color: ['#34d399'],
    tooltip: { trigger: 'axis' },
    grid: baseGrid,
    xAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `${i + 1}月`), axisLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    series: [{ type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210, 260, 200, 220, 240, 280], areaStyle: { opacity: 0.08 } }]
  }

  // 面积图
  const areaOption = {
    color: ['#10b981'],
    tooltip: { trigger: 'axis' },
    grid: baseGrid,
    xAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `${i + 1}月`), axisLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    series: [{ type: 'line', smooth: true, data: [80, 92, 101, 84, 120, 150, 170, 190, 210, 220, 240, 260], areaStyle: { opacity: 0.2 } }]
  }

  const pieOption = {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: subTextColor } },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: ['40%', '65%'],
        center: ['50%', '45%'],
        itemStyle: { borderRadius: 6, borderColor: theme === 'dark' ? '#111827' : '#fff', borderWidth: 2 },
        data: [
          { value: 1048, name: 'A类' },
          { value: 735, name: 'B类' },
          { value: 580, name: 'C类' },
          { value: 484, name: 'D类' },
          { value: 300, name: 'E类' }
        ]
      }
    ]
  }

  const scatterOption = {
    tooltip: { trigger: 'item' },
    grid: baseGrid,
    xAxis: { name: '广告投入', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    yAxis: { name: '销售额', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
    series: [
      { type: 'scatter', symbolSize: 10, data: [[10, 20], [20, 40], [30, 60], [40, 58], [50, 90], [60, 110]] }
    ]
  }

  // 仪表图
  const gaugeOption = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '55%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        itemStyle: { color: '#34d399' },
        progress: { show: true, roundCap: true, width: 10 },
        axisLine: { lineStyle: { width: 10 } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { color: subTextColor },
        pointer: { show: true },
        title: { show: false },
        detail: { valueAnimation: true, formatter: '{value}%', color: subTextColor },
        data: [{ value: 72 }]
      }
    ]
  }

  // 树图
  const treemapOption = {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'treemap',
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: { show: true, color: subTextColor },
        upperLabel: { show: true, height: 20, color: subTextColor },
        data: [
          { name: '华东', value: 35, children: [{ name: '上海', value: 12 }, { name: '江苏', value: 10 }, { name: '浙江', value: 13 }] },
          { name: '华南', value: 25, children: [{ name: '广东', value: 18 }, { name: '福建', value: 7 }] },
          { name: '华北', value: 20, children: [{ name: '北京', value: 12 }, { name: '天津', value: 8 }] },
          { name: '西部', value: 20 }
        ]
      }
    ]
  }

  // 桑基图
  const sankeyOption = {
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'sankey',
        emphasis: { focus: 'adjacency' },
        lineStyle: { color: 'gradient', curveness: 0.5 },
        data: [
          { name: '浏览' }, { name: '加购' }, { name: '下单' }, { name: '支付' },
          { name: '流失' }
        ],
        links: [
          { source: '浏览', target: '加购', value: 70 },
          { source: '浏览', target: '流失', value: 30 },
          { source: '加购', target: '下单', value: 45 },
          { source: '加购', target: '流失', value: 25 },
          { source: '下单', target: '支付', value: 30 },
          { source: '下单', target: '流失', value: 15 }
        ]
      }
    ]
  }

  const funnelOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [
      {
        type: 'funnel',
        left: '10%',
        width: '80%',
        label: { color: subTextColor },
        data: [
          { value: 100, name: '浏览' },
          { value: 70, name: '加购' },
          { value: 45, name: '下单' },
          { value: 30, name: '支付' },
          { value: 28, name: '签收' }
        ]
      }
    ]
  }

  const heatmapData = [] as number[][]
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 24; j++) {
      heatmapData.push([j, i, Math.floor(Math.random() * 120)])
    }
  }
  const heatmapOption = {
    tooltip: {},
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: Array.from({ length: 24 }, (_, i) => `${i}:00`), splitArea: { show: true }, axisLabel: { color: subTextColor } },
    yAxis: { type: 'category', data: ['周日','周六','周五','周四','周三','周二','周一'], splitArea: { show: true }, axisLabel: { color: subTextColor } },
    visualMap: { min: 0, max: 120, calculable: true, orient: 'horizontal', left: 'center', bottom: 0, textStyle: { color: subTextColor } },
    series: [{ name: '访问量', type: 'heatmap', data: heatmapData, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } } }]
  }

  const boxRaw = [
    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880],
    [960, 940, 960, 1120, 970, 960, 1120, 1050, 1040, 980],
    [880, 880, 880, 1000, 880, 880, 890, 940, 980, 980]
  ]
  const boxplotOption = {
    dataset: [
      { source: boxRaw },
      { transform: { type: 'boxplot' } },
      { fromDatasetIndex: 1, fromTransformResult: 1 }
    ],
    tooltip: { trigger: 'item' },
    xAxis: { type: 'category', data: ['A区', 'B区', 'C区'], axisLabel: { color: subTextColor } },
    yAxis: { type: 'value', axisLabel: { color: subTextColor }, splitLine: { lineStyle: { color: axisLineColor } } },
    series: [
      { name: '箱线', type: 'boxplot', datasetIndex: 1 },
      { name: '异常点', type: 'scatter', datasetIndex: 2 }
    ]
  }

  const radarOption = {
    tooltip: {},
    radar: {
      indicator: [
        { name: '价格', max: 100 },
        { name: '功能', max: 100 },
        { name: '口碑', max: 100 },
        { name: '售后', max: 100 }
      ],
      name: { textStyle: { color: subTextColor } }
    },
    series: [
      { type: 'radar', areaStyle: { opacity: 0.1 }, data: [{ value: [70, 85, 80, 75], name: '产品A' }, { value: [60, 78, 88, 70], name: '产品B' }] }
    ]
  }
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
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>3. 图表类型与应用场景</span>
            </div>
            <Link href="/visualization" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>3. 图表类型与应用场景</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ChartCard title="柱状图（对比）" option={barOption} />
          <ChartCard title="堆叠柱（组成/分布）" option={stackedBarOption} />
          <ChartCard title="折线图（趋势）" option={lineOption} />
          <ChartCard title="面积图（累计/趋势）" option={areaOption} />
          <ChartCard title="饼/环形图（占比）" option={pieOption} />
          <ChartCard title="散点图（相关性）" option={scatterOption} />
          <ChartCard title="漏斗图（转化）" option={funnelOption} />
          <ChartCard title="热力图（密度）" option={heatmapOption} />
          <ChartCard title="箱线图（分布/异常）" option={boxplotOption} />
          <ChartCard title="雷达图（多维对比）" option={radarOption} />
          <ChartCard title="仪表图（进度/目标）" option={gaugeOption} />
          <ChartCard title="树图（层级占比）" option={treemapOption} />
          <ChartCard title="桑基图（流向）" option={sankeyOption} />
        </div>
      </div>
    </div>
  )
}


