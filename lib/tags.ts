// 标签类型定义
export interface Tag {
  id: string
  name: string
  color: string
  category: TagCategory
}

export type TagCategory = 'difficulty' | 'skill' | 'application' | 'tool'

// 预定义标签
export const tags: Tag[] = [
  // 难度标签
  { id: 'beginner', name: '入门', color: 'bg-green-100 text-green-800', category: 'difficulty' },
  { id: 'intermediate', name: '进阶', color: 'bg-yellow-100 text-yellow-800', category: 'difficulty' },
  { id: 'advanced', name: '高级', color: 'bg-red-100 text-red-800', category: 'difficulty' },
  
  // 技能标签
  { id: 'analysis', name: '数据分析', color: 'bg-blue-100 text-blue-800', category: 'skill' },
  { id: 'programming', name: '编程', color: 'bg-purple-100 text-purple-800', category: 'skill' },
  { id: 'visualization', name: '可视化', color: 'bg-indigo-100 text-indigo-800', category: 'skill' },
  { id: 'statistics', name: '统计学', color: 'bg-teal-100 text-teal-800', category: 'skill' },
  { id: 'machine-learning', name: '机器学习', color: 'bg-pink-100 text-pink-800', category: 'skill' },
  { id: 'automation', name: '自动化', color: 'bg-orange-100 text-orange-800', category: 'skill' },
  
  // 应用领域标签
  { id: 'business', name: '商业应用', color: 'bg-emerald-100 text-emerald-800', category: 'application' },
  { id: 'finance', name: '金融分析', color: 'bg-cyan-100 text-cyan-800', category: 'application' },
  { id: 'marketing', name: '市场营销', color: 'bg-lime-100 text-lime-800', category: 'application' },
  { id: 'operations', name: '运营分析', color: 'bg-amber-100 text-amber-800', category: 'application' },
  { id: 'research', name: '科学研究', color: 'bg-violet-100 text-violet-800', category: 'application' },
  
  // 工具标签
  { id: 'excel', name: 'Excel', color: 'bg-green-200 text-green-900', category: 'tool' },
  { id: 'python', name: 'Python', color: 'bg-blue-200 text-blue-900', category: 'tool' },
  { id: 'sql', name: 'SQL', color: 'bg-indigo-200 text-indigo-900', category: 'tool' },
  { id: 'pandas', name: 'Pandas', color: 'bg-purple-200 text-purple-900', category: 'tool' },
  { id: 'numpy', name: 'NumPy', color: 'bg-teal-200 text-teal-900', category: 'tool' },
  { id: 'matplotlib', name: 'Matplotlib', color: 'bg-orange-200 text-orange-900', category: 'tool' },
]

// 标签分类配置
export const tagCategories = {
  difficulty: { name: '难度', icon: '📊' },
  skill: { name: '技能', icon: '🎯' },
  application: { name: '应用', icon: '💼' },
  tool: { name: '工具', icon: '🔧' },
}

// 获取标签by ID
export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id)
}

// 获取特定分类的标签
export const getTagsByCategory = (category: TagCategory): Tag[] => {
  return tags.filter(tag => tag.category === category)
}

// 搜索标签
export const searchTags = (query: string): Tag[] => {
  const lowercaseQuery = query.toLowerCase()
  return tags.filter(tag => 
    tag.name.toLowerCase().includes(lowercaseQuery) ||
    tag.id.toLowerCase().includes(lowercaseQuery)
  )
}
