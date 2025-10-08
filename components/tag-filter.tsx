"use client"

import { useState } from "react"
import { Tag, tags, tagCategories, TagCategory, getTagsByCategory } from "@/lib/tags"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Filter } from "lucide-react"

interface TagFilterProps {
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
  onClearAll: () => void
  className?: string
}

export function TagFilter({ selectedTags, onTagToggle, onClearAll, className = "" }: TagFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<TagCategory>>(new Set(['difficulty', 'skill']))

  const toggleCategory = (category: TagCategory) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">筛选标签</h3>
        </div>
        {selectedTags.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            清除全部
          </Button>
        )}
      </div>

      {/* 已选择的标签 */}
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">已选择:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tagId => {
              const tag = tags.find(t => t.id === tagId)
              if (!tag) return null
              return (
                <Badge
                  key={tagId}
                  className={`${tag.color} cursor-pointer hover:opacity-80 flex items-center gap-1`}
                  onClick={() => onTagToggle(tagId)}
                >
                  {tag.name}
                  <X className="h-3 w-3" />
                </Badge>
              )
            })}
          </div>
        </div>
      )}

      {/* 标签分类 */}
      <div className="space-y-3">
        {Object.entries(tagCategories).map(([categoryKey, categoryInfo]) => {
          const category = categoryKey as TagCategory
          const categoryTags = getTagsByCategory(category)
          const isExpanded = expandedCategories.has(category)

          return (
            <div key={category} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 pb-3 last:pb-0">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded p-2 -m-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{categoryInfo.icon}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{categoryInfo.name}</span>
                  <span className="text-xs text-gray-500">({categoryTags.length})</span>
                </div>
                <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {isExpanded && (
                <div className="mt-2 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
                  {categoryTags.map(tag => {
                    const isSelected = selectedTags.includes(tag.id)
                    return (
                      <Badge
                        key={tag.id}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                          isSelected 
                            ? `${tag.color} ring-2 ring-blue-500 ring-offset-1 shadow-md` 
                            : `${tag.color} opacity-70 hover:opacity-100 hover:shadow-sm`
                        }`}
                        onClick={() => onTagToggle(tag.id)}
                      >
                        {tag.name}
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
