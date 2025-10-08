import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我</h1>
            <p className="text-lg text-gray-600">欢迎就数据分析项目或合作沟通联系</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
              <CardDescription>选择你习惯的方式找到我</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="mailto:youremail@example.com" className="block">
                  <Button variant="outline" className="w-full">邮件</Button>
                </Link>
                <Link href="https://www.linkedin.com" className="block">
                  <Button variant="outline" className="w-full">LinkedIn</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>合作期望</CardTitle>
              <CardDescription>告知你的需求、数据类型与时间安排</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>项目目标与成功标准</li>
                <li>可提供的数据样本与字段说明</li>
                <li>期望交付时间与预算范围</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 数据分析师. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  )
}


