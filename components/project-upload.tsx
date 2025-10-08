"use client"

import { useState } from "react"
import { ProjectCategory, getProjectCategory } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Link as LinkIcon, FileText, AlertCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface ProjectUploadProps {
  category: ProjectCategory
  onUpload: (projectData: any) => void
  isAdmin?: boolean
}

export function ProjectUpload({ category, onUpload, isAdmin = false }: ProjectUploadProps) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    file: null as File | null,
    linkUrl: '',
    newTag: ''
  })

  const categoryInfo = getProjectCategory(category)

  // 如果不是管理员，不显示上传按钮
  if (!isAdmin) {
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 检查文件大小
      if (file.size > categoryInfo.maxFileSize && categoryInfo.maxFileSize > 0) {
        alert(`文件大小超过限制 (${categoryInfo.maxFileSize / 1024 / 1024}MB)`)
        return
      }
      
      setFormData(prev => ({ ...prev, file }))
    }
  }

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      // 这里应该调用API上传文件和保存项目信息
      // 目前只是模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const projectData = {
        title: formData.title,
        description: formData.description,
        category,
        tags: formData.tags,
        file: formData.file,
        linkUrl: formData.linkUrl || undefined
      }

      onUpload(projectData)
      
      // 重置表单
      setFormData({
        title: '',
        description: '',
        tags: [],
        file: null,
        linkUrl: '',
        newTag: ''
      })
      setIsOpen(false)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('上传失败，请重试')
    } finally {
      setIsUploading(false)
    }
  }

  const canSubmit = formData.title.trim() && formData.description.trim() && 
    (category === 'dashboard' ? formData.linkUrl.trim() : formData.file)

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="mb-6"
        size="lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        上传{categoryInfo.name}
      </Button>
    )
  }

  return (
    <Card className={`mb-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{categoryInfo.icon}</span>
            <div>
              <CardTitle className="text-lg">上传{categoryInfo.name}</CardTitle>
              <CardDescription>{categoryInfo.description}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 项目标题 */}
          <div>
            <label className="text-sm font-medium mb-2 block">项目标题 *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="输入项目标题"
              required
              disabled={isUploading}
            />
          </div>

          {/* 项目描述 */}
          <div>
            <label className="text-sm font-medium mb-2 block">项目描述 *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="描述项目的主要内容和特点"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              required
              disabled={isUploading}
            />
          </div>

          {/* 文件上传 / 链接输入 */}
          {category === 'dashboard' ? (
            <div>
              <label className="text-sm font-medium mb-2 block">
                <LinkIcon className="h-4 w-4 inline mr-1" />
                Dashboard 链接 *
              </label>
              <Input
                type="url"
                value={formData.linkUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                placeholder="https://app.powerbi.com/view?r=..."
                required
                disabled={isUploading}
              />
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium mb-2 block">
                <FileText className="h-4 w-4 inline mr-1" />
                文件上传 *
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept={categoryInfo.acceptedFiles}
                  onChange={handleFileChange}
                  className="hidden"
                  id={`file-upload-${category}`}
                  disabled={isUploading}
                />
                <label
                  htmlFor={`file-upload-${category}`}
                  className="cursor-pointer"
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formData.file ? formData.file.name : '点击选择文件或拖拽到此处'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    支持格式: {categoryInfo.acceptedFiles}
                    {categoryInfo.maxFileSize > 0 && ` (最大 ${categoryInfo.maxFileSize / 1024 / 1024}MB)`}
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* 标签输入 */}
          <div>
            <label className="text-sm font-medium mb-2 block">项目标签</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={formData.newTag}
                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                placeholder="添加标签"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                disabled={isUploading}
              />
              <Button type="button" onClick={handleAddTag} disabled={isUploading}>
                添加
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={!canSubmit || isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  上传中...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  上传项目
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              取消
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
