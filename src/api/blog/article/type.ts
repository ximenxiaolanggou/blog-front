//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  flag: boolean
  code: number
  msg: string
}

export interface BlogArticle {
  id?: number | null
  title?: string
  content?: string
  categories?: number[]
  categoryIds?: string
  categoryNames?: string
  tags?: number[]
  tagIds?: string
  tagNames?: string
  createtime?: string
  updatetime?: string
}

export interface ArticleQueryParams {
  searchKey: string | null,
  categories: number[],
  tags: number[],
}

// 列表返回信息
export interface BlogCategoryData extends ResponseData {
  data: BlogArticle[]
}
