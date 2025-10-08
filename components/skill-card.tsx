import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

export interface SkillCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  levelLabel?: string
}

export function SkillCard({ title, description, icon: Icon, levelLabel }: SkillCardProps) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow">
      <CardHeader>
        {Icon && <Icon className="h-12 w-12 mx-auto text-gray-600" />}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      {(description || levelLabel) && (
        <CardContent>
          {description && <CardDescription>{description}</CardDescription>}
          {levelLabel && (
            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {levelLabel}
            </span>
          )}
        </CardContent>
      )}
    </Card>
  )
} 