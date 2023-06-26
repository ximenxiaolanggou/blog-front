<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="">
    <p>{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题与logo这配置文件
import setting from '@/setting';

</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img{
    height: 100%;
  }
  p{
    font-size: $base-logo-title-fontSize;
    margin-left: 15px;
  }
}
</style>
