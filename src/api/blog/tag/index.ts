import request from '@/utils/request'

enum API {
  LIST = '/blogTag/list',
}

export function list() {
  return request({
    url: API.LIST,
    method: 'get',
  })
}
