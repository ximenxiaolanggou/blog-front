<template>
  <div class="profile">
    <!-- 介绍 -->
    <div class="profile-intrduce">
      <div class="profile-introduce-img-container">
        <img
          class="profile-introduce-img"
          src="../../../assets/images/blog/avatar.png"
        />
      </div>
      <div class="profile-introduce-name-container" @click="goHome">
        <span class="profile-introduce-name">Damoncai</span>
      </div>
      <div class="profile-introduce-motto-container">逝者如斯夫，不舍昼夜</div>
      <div class="profile-introduce-article-container">
        <div class="profile-introduce-article-total">
          <div>{{ ac }}</div>
          <div style="margin-top: 15px">Articles</div>
        </div>
        <div class="profile-introduce-article-spliter"></div>
        <div class="profile-introduce-article-categories">
          <div>{{ cc }}</div>
          <div style="margin-top: 15px">Categories</div>
        </div>
      </div>
    </div>
    <!-- 类别 -->
    <div class="profile-categories">
      <div class="profile-categories-tip">
        <el-icon><Grid /></el-icon>
        <span style="font-size: 20px">Categories</span>
      </div>
      <div class="profile-categories-contents">
        <div
          style="margin-bottom: 5px; margin-top: 5px"
          v-for="category in cac"
          :key="category.name"
        >
          <CategoryTip
            @click="categorySelected(category)"
            :class="{ bisque: category.selected }"
            :category="category"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryTip from './components/CategoryTip.vue'
import { defineProps, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PreCategoryRelativeArticle } from '@/api/blog/pre/type'
import {
  categoryCount,
  articleCount,
  categoryArticleCount,
} from '@/api/blog/pre'
import useCategoryStore from '@/store/modules/category'
import { CategoryState } from '@/store/modules/types/type'
import * as path from 'path'
const $router = useRouter()
let categoryStore: CategoryState = useCategoryStore()
let ac = ref(0)
let cc = ref(0)
let cac = ref<PreCategoryRelativeArticle[]>([])
// 文章数量
const getArticleCount = async () => {
  let res = await articleCount()
  ac.value = res.data
}

// 回首页
const goHome = () => {
  cac.value.forEach((category) => (category['selected'] = false))
  categoryStore.selectedCategory = -1
  $router.push({ path: '/' })
}

// 类别选择
const categorySelected = (record: PreCategoryRelativeArticle) => {
  const id: number = record.id
  cac.value.forEach((category) => {
    if (category.id == id) {
      if (category['selected']) {
        categoryStore.selectedCategory = -1
      } else {
        categoryStore.selectedCategory = id
      }
      category['selected'] = !category['selected']
    } else {
      category['selected'] = false
    }
  })
}

// 类别数量
const getCategoryCount = async () => {
  let res = await categoryCount()
  cc.value = res.data
}

// 类别关联文章数量
const getCategoryArticleCount = async () => {
  let res = await categoryArticleCount()
  cac.value = res.data
}
onMounted(() => {
  getArticleCount()
  getCategoryCount()
  getCategoryArticleCount()
})
</script>

<style scoped lang="scss">
.profile {
  .profile-intrduce {
    .profile-introduce-img-container {
      margin: 50px auto 20px auto;
      width: 150px;
      border-radius: 50%;
      overflow: hidden;
      .profile-introduce-img {
        width: 150px;
      }
    }
    .profile-introduce-name-container {
      color: #363636;
      white-space: nowrap;
      font-weight: bold;
      font-size: 20px;
      line-height: 1.5;
      text-align: center;
    }
    .profile-introduce-motto-container {
      font-family: 'Josefin Sans', 'PingFang SC';
      color: #5e5e5e;
      line-height: 1.5;
      opacity: 0.7;
      margin-top: 15px;
      text-align: center;
    }
    .profile-introduce-article-container {
      margin-top: 15px;
      justify-content: center;
      text-align: center;
      display: flex;
      .profile-introduce-article-total {
        margin-right: 10px;
      }
      .profile-introduce-article-spliter {
        border: 1px solid black;
        height: 50px;
      }
      .profile-introduce-article-categories {
        margin-left: 10px;
      }
    }
  }
  .profile-categories {
    margin-top: 30px;
    .profile-categories-tip {
      padding-left: 20px;
      line-height: 30px;
      height: 30px;
    }
    .profile-categories-contents {
      margin-left: 20px;
    }
  }
}
.bisque {
  background-color: bisque;
}
.profile-introduce-name:hover {
  cursor: pointer;
  color: bisque;
}
</style>
