"use client"

import { Navigation } from "@/components/navigation"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function BusinessScenariosPage() {
  const { theme } = useTheme()
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"><Home size={20} /><span className="font-medium">主页</span></Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <Link href="/business" className="text-blue-600 hover:text-blue-700 font-medium">业务模块</Link>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>/</span>
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} font-medium`}>5. 业务场景与管理</span>
            </div>
            <Link href="/business" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"><ArrowLeft size={16} /><span>返回</span></Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>5. 业务场景与管理</h1>
        <div className={`${theme === 'dark' ? 'bg-white/5' : 'bg-white'} rounded-lg shadow-sm p-8 space-y-6`}>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>如何应对各种业务场景</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>拉新：重点监控 CAC、渠道转化率；CAC 过高优化渠道组合。</li>
              <li>促活：聚焦 DAU、功能使用率；活跃度低设计签到、任务激励。</li>
              <li>留存：关注留存率、流失原因；调研需求痛点并优化。</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>小练习</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>场景1：某 APP 月活下降。先看新用户增长，再看老用户活跃频次，排查功能更新是否导致体验变差。</li>
              <li>场景2：某电商平台客单价下降。从商品维度看高客单价商品销量占比，从用户维度看高价值用户消费频次。</li>
            </ul>
          </section>
          <section>
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>数据化管理业务</h2>
            <ul className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} list-disc pl-6 space-y-2`}>
              <li>建立监控看板，实时跟踪销售额、留存率等核心指标波动。</li>
              <li>设定预警阈值（如 CAC &gt; 50 触发预警），及时发现异常。</li>
              <li>定期输出分析报告，总结变化原因与优化方案，推动持续迭代。</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}



