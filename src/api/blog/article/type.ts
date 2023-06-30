//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  flag: boolean
  code: number
  msg: string
}

export interface BlogCategory {
  id: string
  name: string
  description: string
  createtime: string
  updatetime: string
}

// 列表返回信息
export interface BlogCategoryData extends ResponseData {
  data: BlogCategory[]
}
