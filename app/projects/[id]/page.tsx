// 服务端文件：用于静态导出时预生成路径，并渲染客户端页面
import ClientProjectPage from "./ClientPage"
import { mockProjects } from "@/lib/projects"

export async function generateStaticParams() {
  return mockProjects.map((p) => ({ id: p.id }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <ClientProjectPage initialProjectId={params.id} />
} 