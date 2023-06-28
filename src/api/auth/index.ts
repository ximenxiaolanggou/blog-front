//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './type'

//项目用户相关的请求地址

enum API {
  AUTH_URL = '/auth/login',
  USERINFO_URL = '/auth/userInfo',
  LOGOUT_URL = '/auth/logout',
}
//登录接口
/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login(data) {
  return request({
    url: API.AUTH_URL,
    method: 'post',
    data,
  })
}

export function userInfo() {
  return request({
    url: API.USERINFO_URL,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: API.LOGOUT_URL,
    method: 'delete',
  })
}
