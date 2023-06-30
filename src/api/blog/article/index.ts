import request from '@/utils/request'
import qs from 'qs'

enum API {
  ADD = '/blogArticle/saveOrUpdate',
  UPLOAD = '/blogUpload/upload',
  PAGE = '/blogArticle/page',
  DEL = '/blogArticle/del',
  FINDBYID = '/blogArticle/findById',
}

export function add(data) {
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
export function upload(data) {
  return request({
    url: API.UPLOAD,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  })
}

export function page(pageNumber, pageSize, params) {
  return request({
    url: `${API.PAGE}/${pageNumber}/${pageSize}?${qs.stringify(params, {
      arrayFormat: 'repeat',
    })}`,
    method: 'get',
  })
}

export function findById(id) {
  return request({
    url: `${API.FINDBYID}/${id}`,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: `${API.DEL}/${id}`,
    method: 'delete',
  })
}
