import request from '@/utils/request'

enum API {
  ADD = '/blogArticle/saveOrUpdate',
  UPLOAD = '/blogUpload/upload',
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
