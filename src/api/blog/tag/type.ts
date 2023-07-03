//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  flag: boolean
  code: number
  msg: string
}

export interface BlogTag {
  id?: number | null
  name: string
  description: string
  createtime?: string
  updatetime?: string
}

// 列表返回信息
export interface BlogCategoryData extends ResponseData {
  data: BlogTag[]
}
