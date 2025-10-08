"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon";
import { Home, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function InventoryABCPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"><Home size={20} /></Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <Link href="/excel" className="text-blue-600 hover:text-blue-700">Excel</Link>
            <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>库存ABC分析表</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/excel#templates" className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700 border'}`}>
          <ArrowLeft size={20} /> 返回
        </Link>
        <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>📦 库存ABC分析表</h1>
        <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>帕累托分析 | 自动分类 | 库存优化</p>
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader className="pb-3 border-b bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
            <CardTitle>ABC分析主表</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <table className={`w-full text-xs border-collapse ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <thead>
                <tr className={theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50'}>
                  <th className="border border-gray-300 dark:border-gray-600 p-2">商品</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2">年销量</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2">销售额(万)</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2">累计占比</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2">ABC类别</th>
                </tr>
              </thead>
              <tbody>
                <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">iPhone 15</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">5000</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">3500</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">50%</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold">A类</span>
                  </td>
                </tr>
                <tr className={theme === 'dark' ? 'bg-gray-750' : 'bg-gray-50'}>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">iPad Pro</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">3000</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right font-bold">2100</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">80%</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-bold">B类</span>
                  </td>
                </tr>
                <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">AirPods</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">8000</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">800</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-right">92%</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400">C类</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={`mt-4 p-3 rounded text-xs ${theme === 'dark' ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
              <p><strong>分类标准：</strong>A类(0-80%)重点管理 | B类(80-95%)常规管理 | C类(95-100%)简化管理</p>
            </div>
          </CardContent>
        </Card>
        <Card className={`mt-6 ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} border-2`}>
          <CardContent className="pt-6 text-center">
            <button className={`px-6 py-3 rounded-lg font-bold ${theme === 'dark' ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}>
              <Download className="inline mr-2" size={20} />下载模板
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

