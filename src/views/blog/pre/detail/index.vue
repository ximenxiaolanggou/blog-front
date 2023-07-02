<template>
  <div>

  </div>
  <div  class="detail" >
    <div   class="detail-content"><MdPreview  v-model="article.content" :editorId="state.id" :modelValue="state.text" previewTheme="vuepress"/></div>
    <div class="detail-catalog"><MdCatalog :editorId="state.id" :scrollElement="scrollElement"/></div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {detail} from "@/api/blog/pre";
import {MdPreview, MdCatalog } from "md-editor-v3";


let $router = useRouter()
let article = ref({})
const state = reactive({
  theme: 'smart-blue',
  text: '标题',
  id: 'my-editor'
});

let scrollElement = ref()


// 获取文章详情
const getArticle = async (id) => {
  const res = await detail(id)
  article.value = res.data
}

onMounted(() => {
  scrollElement.value = document.getElementById('deta');
  console.log(1,scrollElement.value)
  getArticle($router.currentRoute.value.query.id)
})
</script>

<style scoped lang="scss">
.detail {
  overflow: scroll;
  height: 100vh;
  background-color: white;
  width: 70%;
  margin-left: 30px;
  .detail-catalog {
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
