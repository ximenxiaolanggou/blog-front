import { defineStore } from 'pinia'
import { CategoryState } from '@/store/modules/types/type'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      selectedCategory: -1,
    }
  },
  persist: {
    // 自定义存储键名
    key: 'category-data',
    // 指定存储方式（localStorage/sessionStorage）
    storage: sessionStorage,
    // 自定义序列化方法（可选）
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  }
})

export default useCategoryStore
