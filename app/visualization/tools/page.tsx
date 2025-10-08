 "use client"

 import { Navigation } from "@/components/navigation"
 import { Home, ArrowLeft } from "lucide-react"
 import Link from "next/link"
 import { useTheme } from "@/components/theme-provider"
 import ChartCard from "@/components/ChartCard"

 export default function VizToolsPage() {
   const { theme } = useTheme()

   const textMain = theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
   const textSub = theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
   const card = `${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-6 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`

   const axisLineColor = theme === 'dark' ? '#374151' : '#e5e7eb'
   const subTextColor = theme === 'dark' ? '#9ca3af' : '#6b7280'
   const baseGrid = { left: 40, right: 20, top: 30, bottom: 40 }

   // ECharts 示例配置（占位演示）
   const demoBar = {
     color: ['#60a5fa', '#34d399'],
     tooltip: { trigger: 'axis' },
     legend: { textStyle: { color: subTextColor } },
     grid: baseGrid,
     xAxis: { type: 'category', data: ['Q1','Q2','Q3','Q4'], axisLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
     yAxis: { type: 'value', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
     series: [
       { type: 'bar', name: '销售额', data: [320, 420, 500, 650], barMaxWidth: 28 },
       { type: 'bar', name: '利润', data: [80, 120, 160, 210], barMaxWidth: 28 }
     ]
   }

   const demoLine = {
     color: ['#f59e0b'],
     tooltip: { trigger: 'axis' },
     grid: baseGrid,
     xAxis: { type: 'category', data: Array.from({ length: 12 }, (_, i) => `${i + 1}月`), axisLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
     yAxis: { type: 'value', axisLine: { lineStyle: { color: axisLineColor } }, splitLine: { lineStyle: { color: axisLineColor } }, axisLabel: { color: subTextColor } },
     series: [{ type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210, 260, 200, 220, 240, 280], areaStyle: { opacity: 0.08 } }]
   }

   const demoPie = {
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
           { value: 1048, name: 'Excel' },
           { value: 735, name: 'Power BI' },
           { value: 580, name: 'Tableau' },
           { value: 484, name: 'Matplotlib' },
           { value: 300, name: 'Seaborn' }
         ]
       }
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
               <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>4. 主流工具与实操</span>
             </div>
             <Link href="/visualization" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
           </div>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <h1 className={`text-3xl font-bold mb-6 ${textMain}`}>4. 主流工具与实操</h1>

         {/* 工具概览 */}
         <section className="mb-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className={card}>
               <h3 className="text-lg font-semibold mb-2">Excel 图表与透视表</h3>
               <p className={textSub}>适合轻量分析与办公报告，配合 Power Query/透视表可快速完成数据整合与多维分析。</p>
             </div>
             <div className={card}>
               <h3 className="text-lg font-semibold mb-2">Power BI</h3>
               <p className={textSub}>企业级自助式 BI，支持强大的数据建模、DAX 度量、交互式仪表盘与权限治理。</p>
             </div>
             <div className={card}>
               <h3 className="text-lg font-semibold mb-2">Tableau</h3>
               <p className={textSub}>擅长可视化表达与交互分析，拖拽式分析体验，适合探索式数据洞察。</p>
             </div>
             <div className={card}>
               <h3 className="text-lg font-semibold mb-2">Python · Matplotlib/Seaborn</h3>
               <p className={textSub}>科研与数据科学常用绘图库，精细控制图形元素，适合可复现实验与批量生成图表。</p>
             </div>
             <div className={card}>
               <h3 className="text-lg font-semibold mb-2">ECharts</h3>
               <p className={textSub}>Web 端交互可视化库，支持丰富图表、联动与大屏场景，适合前端展示与交互讲述。</p>
             </div>
           </div>
         </section>

         {/* ECharts 演示（与站内风格一致）*/}
         <section>
           <h2 className={`text-2xl font-bold mb-4 ${textMain}`}>快速演示</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             <ChartCard title="对比分析 · 柱状图" option={demoBar} />
             <ChartCard title="趋势分析 · 折线图" option={demoLine} />
             <ChartCard title="工具占比 · 饼图" option={demoPie} />
           </div>
         </section>

         {/* 实操建议 */}
         <section className="mt-8">
           <div className={`rounded-lg border p-4 ${theme === 'dark' ? 'border-blue-600 bg-blue-900/20' : 'border-blue-200 bg-blue-50'}`}>
             <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-200">实践建议</h3>
             <ul className={`${textSub} list-disc pl-6 space-y-1`}>
               <li>Excel：Power Query → 透视表 → 图表；建立参数化与切片器联动。</li>
               <li>Power BI：星型模型建模，使用 DAX 定义度量，发布并配置行级权限。</li>
               <li>Tableau：维度与度量的拖拽分析，仪表板交互动作与设备适配。</li>
               <li>Python：用 Matplotlib 精细控制与 Seaborn 高级图形，脚本化批量出图。</li>
               <li>ECharts：统一主题与调色板，Grid/Tooltip/Legend/VisualMap 一致化，支持导出与响应式。</li>
             </ul>
           </div>
         </section>
       </div>
     </div>
   )
 }


