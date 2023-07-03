import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useUserStore from '../store/modules/user'
import {UserState} from "@/store/modules/types/type";
import pinia from '../store'
const $router = useRouter()
let userStore:UserState
//获取存储用户信息的仓库对象
//创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  const tokenName = localStorage.getItem('TOKEN_NAME')
  const tokenValue = localStorage.getItem('TOKEN_VALUE')
  if (tokenName) {
    config.headers[tokenName] = `bearer ${tokenValue}`
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = error.response.data.msg
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    // token异常
    if (error.response.data.code == 6) {
      if (!userStore) {
        userStore = useUserStore(pinia)
      }
      localStorage.clear()
      userStore.tokenName = ''
      userStore.tokenValue = ''
      userStore.user = null
      $router.push('/')
    }
    return Promise.reject(error.response.data)
  },
)
export default request
