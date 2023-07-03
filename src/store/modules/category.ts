import { defineStore } from 'pinia'
import { CategoryState } from '@/store/modules/types/type'

const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      selectedCategory: -1,
    }
  },
})

export default useCategoryStore
