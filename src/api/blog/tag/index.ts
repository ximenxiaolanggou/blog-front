import request from '@/utils/request'
import { BlogTag } from '@/api/blog/tag/type'

enum API {
  LIST = '/blogTag/list',
  ADD = '/blogTag',
  DELETE = '/blogTag',
  MODIFY = '/blogTag',
}

// 列表
export function list(searchKey: string) {
  return request({
    url: API.LIST,
    method: 'get',
    params: { searchKey },
  })
}

// 添加
export function add(data: BlogTag) {
  return request({
    url: API.ADD,
    method: 'post',
    data,
  })
}

// 修改
export function update(data: BlogTag) {
  return request({
    url: `${API.MODIFY}/${data.id}`,
    method: 'put',
    data,
  })
}

// 删除
export function del(id: number) {
  return request({
    url: `${API.DELETE}/${id}`,
    method: 'delete',
  })
}
