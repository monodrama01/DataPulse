"use client"

import { SkillGroup, Skill, getSkillLevel } from "@/lib/skills"
import { mockProjects } from "@/lib/projects"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, TrendingUp, Award, BookOpen } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

interface SkillGroupCardProps {
  skillGroup: SkillGroup
  className?: string
}

export function SkillGroupCard({ skillGroup, className = "" }: SkillGroupCardProps) {
  const { theme } = useTheme()

  // 获取该技能组的相关项目
  const getRelatedProjects = () => {
    const projectIds = new Set<string>()
    skillGroup.skills.forEach(skill => {
      skill.relatedProjects.forEach(projectId => {
        projectIds.add(projectId)
      })
    })
    
    return Array.from(projectIds).map(id => 
      mockProjects.find(project => project.id === id)
    ).filter(Boolean).slice(0, 3) // 最多显示3个项目
  }

  const relatedProjects = getRelatedProjects()
  const averageLevel = Math.round(
    skillGroup.skills.reduce((sum, skill) => sum + skill.level, 0) / skillGroup.skills.length
  )

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} ${className}`}>
      <CardHeader className="pb-4">
        {/* 技能组头部 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`text-3xl p-3 rounded-lg bg-gradient-to-r ${skillGroup.color} text-white`}>
              {skillGroup.icon}
            </div>
            <div>
              <CardTitle className="text-xl mb-1 flex items-center gap-2">
                {skillGroup.name}
                <Badge variant="outline" className="text-xs">
                  {skillGroup.skills.length} 项技能
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm">
                {skillGroup.description}
              </CardDescription>
            </div>
          </div>
          
          {/* 平均熟练度 */}
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {averageLevel}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              平均熟练度
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 技能列表 */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            具体技能
          </h4>
          
          <div className="space-y-3">
            {skillGroup.skills.map((skill) => {
              const skillLevel = getSkillLevel(skill.level)
              return (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <Badge variant="outline" className={`text-xs ${skillLevel.color}`}>
                        {skillLevel.label}
                      </Badge>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={skill.level} 
                    className="h-2"
                  />
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {skill.description}
                  </p>
                  
                  {/* 工具标签 */}
                  <div className="flex flex-wrap gap-1">
                    {skill.tools.map(tool => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 相关项目 */}
        {relatedProjects.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              相关项目
            </h4>
            
            <div className="space-y-2">
              {relatedProjects.map((project) => (
                <div key={project!.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {project!.title}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                      {project!.description}
                    </p>
                    
                    {/* 项目标签 */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project!.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Link href={`/projects/${project!.id}`}>
                    <Button variant="ghost" size="sm" className="ml-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* 查看更多项目按钮 */}
            <Link href="/projects">
              <Button variant="outline" size="sm" className="w-full">
                查看所有相关项目
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* 技能亮点 */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-yellow-500" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">技能亮点</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {skillGroup.skills.filter(s => s.level >= 85).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">精通技能</div>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {skillGroup.skills.reduce((sum, s) => sum + s.relatedProjects.length, 0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">项目应用</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 技能统计卡片
interface SkillStatsCardProps {
  className?: string
}

export function SkillStatsCard({ className = "" }: SkillStatsCardProps) {
  const { theme } = useTheme()
  
  // 从技能数据计算统计信息
  const stats = {
    totalSkills: 18,
    expertSkills: 8, // 85分以上
    proficientSkills: 7, // 80-84分
    totalProjects: 4,
    avgLevel: 83
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'} ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          技能统计
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.totalSkills}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总技能数</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.expertSkills}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">精通技能</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.totalProjects}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">实战项目</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {stats.avgLevel}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">平均水平</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
