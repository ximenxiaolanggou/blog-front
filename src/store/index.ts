//仓库大仓库
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
//创建大仓库
const pinia = createPinia()
pinia.use(createPersistedState())
//对外暴露：入口文件需要安装仓库
export default pinia
