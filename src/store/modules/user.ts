//创建用户相关的小仓库
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import {constantRoute} from "@/router/routes";
import {login, logout, userInfo} from "@/api/auth";
import router from "@/router";

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据地方
  state: (): UserState => {
    return {
      tokenName: localStorage.getItem('TOKEN_NAME'), //用户唯一标识token
      tokenValue: localStorage.getItem('TOKEN_VALUE'), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      user: null,
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  //异步|逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data) {
      //登录请求
      const result = await login(data)
      //pinia仓库存储一下token
      //由于pinia|vuex存储数据其实利用js对象
      this.tokenName = result.data.tokenName as string
      this.tokenValue = result.data.tokenValue as string
      //本地存储持久化存储一份
      localStorage.setItem('TOKEN_NAME', this.tokenName)
      localStorage.setItem('TOKEN_VALUE', this.tokenValue)
    },


    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result = await userInfo()
      //如果获取用户信息成功，存储一下用户信息
      this.user = result.data
    },

    // 登出
    async userLogout() {
      const result =  await logout()
      localStorage.clear()
      this.tokenName = ''
      this.tokenValue = ''
      this.user = null
      router.push("/login")
    }
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
