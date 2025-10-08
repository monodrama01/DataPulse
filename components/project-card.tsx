import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export interface ProjectCardProps {
  id: number | string
  title: string
  description: string
  skills: string[]
  status: string
  date?: string
  href: string
  image?: string
}

export function ProjectCard({ id, title, description, skills, status, date, href, image }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <div className="aspect-video rounded-t-lg overflow-hidden relative">
        {image ? (
          <>
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100" />
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
            {title}
          </CardTitle>
          <Badge variant={status === "完成" ? "default" : "secondary"}>{status}</Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((s) => (
            <Badge key={s} variant="outline" className="text-xs">
              {s}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{date}</span>
        </div>
        <Button asChild className="w-full group">
          <Link href={href}>
            查看详情
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
} 