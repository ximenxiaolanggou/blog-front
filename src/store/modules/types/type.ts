//定义小仓库数据state类型
import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  tokenName: string | null
  tokenValue: string | null
  menuRoutes: RouteRecordRaw[]
  user: UserInfo | null
  avatar: string
}

//定义分类仓库state对象的ts类型
export interface CategoryState {
  selectedCategory: number
}

export interface UserInfo {
  username: string
  permissions: string[]
  mobile: string
  mail: string
}
