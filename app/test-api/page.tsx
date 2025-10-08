"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function TestAPI() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('测试中...')
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123'
        })
      })
      
      const data = await response.json()
      setResult(`响应: ${JSON.stringify(data, null, 2)}`)
      
    } catch (error: any) {
      setResult(`错误: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">API连接测试</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? '测试中...' : '测试API连接'}
          </Button>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">测试结果：</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {result || '点击按钮开始测试'}
            </pre>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">预期结果：</h3>
          <p className="text-blue-700 text-sm">
            如果连接成功，应该看到包含access_token的JSON响应。<br/>
            如果看到"Failed to fetch"，说明后端服务未启动或端口被阻止。
          </p>
        </div>
      </div>
    </div>
  )
}
