"use client"

import React from 'react'
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthcarePage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <Card className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
          <CardHeader>
            <CardTitle>医疗健康数据分析</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
              🚧 此页面即将推出，敬请期待！
            </p>
            <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              我们正在精心准备医疗健康行业的数据分析案例和最佳实践。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

