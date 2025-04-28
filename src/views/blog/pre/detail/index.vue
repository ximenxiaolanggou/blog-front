<template>
  <div id="main" class="detail">
    <el-icon @click="back" class="back" size="70px"><Back /></el-icon>
    <div class="detail-content">
      <MdPreview
        v-model="article.content"
        :editorId="state.id"
        previewTheme="vuepress"
      />
    </div>
    <div class="detail-catalog">
      <MdCatalog :editorId="state.id" :scrollElement="scrollElement" />
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import { LocationQuery, LocationQueryValue, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { detail } from '@/api/blog/pre'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import { BlogArticle } from '@/api/blog/article/type'

let $router = useRouter()
let article = ref<BlogArticle>({
  id: null,
  content: '',
})
const state = reactive({
  theme: 'smart-blue',
  text: '标题',
  id: 'my-editor',
})

let scrollElement = document.documentElement

// 获取文章详情
const getArticle = async (id: number) => {
  const res = await detail(id)
  article.value = res.data
}

/**
 * 回退
 */
const back = () => {
  $router.back()
}

onMounted(() => {
  let id: string | null | LocationQueryValue[] =
    $router.currentRoute.value.query.id
  getArticle(parseInt(id as string))
})
</script>

<style scoped lang="scss">
.detail {
  .back {
    padding: 10px;
    color: lightblue;
    &:hover {
      cursor: pointer;
      transform: scale(1.5);
      transition: 0.5s;
    }
  }
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  width: 70%;
  margin-left: 30px;
  .detail-catalog {
    height: 800px;
    overflow: auto;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    width: 400px;
    position: fixed;
    right: 30px;
    top: 50px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
