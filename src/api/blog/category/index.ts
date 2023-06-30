import request from '@/utils/request'

enum API {
  LIST = '/blogCategory/list',
}

export function list() {
  return request({
    url: API.LIST,
    method: 'get',
  })
}
