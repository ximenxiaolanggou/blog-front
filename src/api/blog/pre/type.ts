//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  flag: boolean
  code: number
  msg: string
}

export interface PreArticle {
  id: string
  title: string
  content: string
  categories: number[]
  categoryIds: string
  categoryNames: string
  tags: number[]
  tagIds: string
  tagNames: string
  createtime: string
  updatetime: string
}

export interface PreCategoryRelativeArticle {
  id: number
  name: string
  relaticeArticleCount: number
  selected?: boolean | null
}
