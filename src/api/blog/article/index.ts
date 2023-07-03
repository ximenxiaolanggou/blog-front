import request from '@/utils/request'
import qs from 'qs'
import { ArticleQueryParams, BlogArticle } from '@/api/blog/article/type'

enum API {
  ADD = '/blogArticle/saveOrUpdate',
  UPLOAD = '/blogUpload/upload',
  PAGE = '/blogArticle/page',
  DEL = '/blogArticle/del',
  FINDBYID = '/blogArticle/findById',
}

export function add(data:BlogArticle) {
  return request({
    url: API.ADD,
    method: 'post',
    data,
  })
}

/**
 * 上传
 * @param data
 * @returns {AxiosPromise}
 */
export function upload(data:any) {
  return request({
    url: API.UPLOAD,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  })
}

export function page(pageNumber:number, pageSize:number, params:ArticleQueryParams) {
  return request({
    url: `${API.PAGE}/${pageNumber}/${pageSize}?${qs.stringify(params, {
      arrayFormat: 'repeat',
    })}`,
    method: 'get',
  })
}

export function findById(id:number) {
  return request({
    url: `${API.FINDBYID}/${id}`,
    method: 'get',
  })
}

export function del(id:number) {
  return request({
    url: `${API.DEL}/${id}`,
    method: 'delete',
  })
}
