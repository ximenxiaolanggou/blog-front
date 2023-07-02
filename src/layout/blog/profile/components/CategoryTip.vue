<template>
  <div class="category">
    <div class="category-name">{{ category.name }}</div>
    <div class="category-count"><el-tag effect="dark">{{ category.relaticeArticleCount }}</el-tag></div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps(['category'])
</script>

<style scoped lang="scss">
.category {
  border-radius: 5px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 45px;
  width: 300px;
  line-height: 45px;
  display: flex;
  font-weight: bold;
  justify-content: space-between;
  .category-name {
    margin-left: 10px;
  }
  .category-count {
    margin-right: 10px;
  }
}
.category:hover {
  //background-color: yellow;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
