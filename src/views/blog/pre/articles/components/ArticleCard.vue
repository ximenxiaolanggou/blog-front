<template>
  <div class="article-card">
    <h1 class="article-card-title" @click="showArticle">{{ article.title }}</h1>
    <div class="article-card-tip">
      <div class="article-card-tip-calendar"><el-icon size="20" ><Calendar /></el-icon><span class="article-card-tip-calendar-detail">{{ article.createtime }}</span></div>
      <div class="article-card-tip-category" v-if="!!article.categoryNames"><el-icon size="20"><Folder /></el-icon><span class="article-card-tip-category-detail">{{ article.categoryNames }}</span></div>
    </div>
    <div class="article-card-content">
      <el-text :truncated="true" size="large">{{ article.content }}</el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {defineProps} from "vue";
const $router = useRouter()
let props = defineProps(['article'])

// 文章详情事件
const showArticle = () => {
  $router.push({path: '/articles/detail', query: {id: props.article.id}})
}

</script>

<style scoped lang="scss">
.article-card {
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 30px;
  width: 800px;
  height: 150px;
  .article-card-title {
    font-size: 18px;
    font-weight: bold;
  }
  .article-card-tip {
    color: #999;
    margin-top: 20px;
    display: flex;
    .article-card-tip-calendar {
      .article-card-tip-calendar-detail {
        font-size: 16px;
        margin-left: 5px;
      }
    }
    .article-card-tip-category {
      margin-left: 20px;
      .article-card-tip-category-detail {
        margin-left: 5px;
      }
    }
  }
  .article-card-content {
    margin-top: 10px;
  }
}
.article-card:hover {
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
}
.article-card-title:hover {
  cursor: pointer;
  color: deepskyblue;
}
</style>
