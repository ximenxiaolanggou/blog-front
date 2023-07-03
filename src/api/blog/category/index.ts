import request from '@/utils/request'
import { BlogCategory } from '@/api/blog/category/type'

enum API {
  LIST = '/blogCategory/list',
  ADD = '/blogCategory',
  DELETE = '/blogCategory',
  MODIFY = '/blogCategory',
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
export function add(data: BlogCategory) {
  return request({
    url: API.ADD,
    method: 'post',
    data,
  })
}

// 修改
export function update(data: BlogCategory) {
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
