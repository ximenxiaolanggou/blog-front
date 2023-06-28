<template>
  <div class="main">
    <h3>333</h3>
    <h3>333</h3>
    <h3>333</h3>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
//获取存储用户信息的仓库对象
let userStore = useUserStore()
</script>

<style scoped>
.main {
  box-shadow: 2px 1px 5px 2px rgba(0, 0, 0, 0.2);
}
</style>
