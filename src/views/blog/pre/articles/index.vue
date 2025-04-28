<template>
  <div v-if="articles && articles.length > 0" class="article">
    <div class="article-card" v-for="article in articles" :key="article.id">
      <ArticleCard :article="article" />
    </div>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="pageNumber"
        v-model:page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <el-empty v-else description="No Data" />
</template>

<script setup lang="ts">
import ArticleCard from './components/ArticleCard.vue'
import { page as prePage } from '@/api/blog/pre'
import { PreArticle } from '@/api/blog/pre/type'
import { reactive, onMounted, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { CategoryState } from '@/store/modules/types/type'
import { ArticleQueryParams } from '@/api/blog/article/type'
let categoryStore: CategoryState = useCategoryStore()
let pageNumber = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let params = reactive<ArticleQueryParams>({
  searchKey: '',
  categories: [],
  tags: [],
})
let articles = ref<PreArticle[]>([])
const page = async () => {
  if (categoryStore.selectedCategory != -1) {
    params.categories = [categoryStore.selectedCategory]
  }
  const res = await prePage(pageNumber.value, pageSize.value, params)
  total.value = res.data.total
  articles.value = res.data.data
}

watch(
  () => categoryStore.selectedCategory,
  () => {
    params.categories = []
    if (categoryStore.selectedCategory != -1) {
      params.categories.push(categoryStore.selectedCategory)
    }
    page()
  },
)

// 页码切换事件
const handleCurrentChange = (arg: any) => {
  pageNumber.value = arg
  page()
}
onMounted(() => {
  page()
})
</script>

<style scoped lang="scss">
.article {
  width: 80%;
  margin: 20px auto;
  .article-card {
    margin: 10px 0;
  }
}
</style>
