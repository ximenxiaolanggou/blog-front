<template>
  <div>Home</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
//获取存储用户信息的仓库对象
let userStore = useUserStore()
</script>

<style scoped></style>
