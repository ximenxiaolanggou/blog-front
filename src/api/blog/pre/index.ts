import request from '@/utils/request'
import qs from 'qs'
import { ArticleQueryParams } from '@/api/blog/article/type'

enum API {
  ARTICLE_COUNT = '/blogPre/articleCount',
  CATEGORY_COUNT = '/blogPre/categoryCount',
  CATEGORY_ARTICLE_COUNT = '/blogPre/categoryArticleCount',
  PAGE = '/blogPre/articlePage',
  DETAIL = '/blogPre/detail',
}

// 分页
export function page(pageNumber:number, pageSize:number, params:ArticleQueryParams) {
  return request({
    url: `${API.PAGE}/${pageNumber}/${pageSize}?${qs.stringify(params, {
      arrayFormat: 'repeat',
    })}`,
    method: 'get',
  })
}

// 文章详情
export function detail(id:number) {
  return request({
    url: `${API.DETAIL}/${id}`,
    method: 'get',
  })
}

// 文章数量
export function articleCount() {
  return request({
    url: API.ARTICLE_COUNT,
    method: 'get',
  })
}

// 类别数量
export function categoryCount() {
  return request({
    url: API.CATEGORY_COUNT,
    method: 'get',
  })
}

// 类别对应文章数量
export function categoryArticleCount() {
  return request({
    url: API.CATEGORY_ARTICLE_COUNT,
    method: 'get',
  })
}
