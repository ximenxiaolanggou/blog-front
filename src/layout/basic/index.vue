<template>
  <div>
    <div class="layout_container">
      <!-- 左侧菜单 -->
      <div class="layout_slider">
        <Logo></Logo>
      </div>
      <!-- 顶部侧菜单 -->
      <div class="layout_tabbar">layout_tabbar</div>
      <!-- 内容展示区 -->
      <div class="layout_main">layout_main</div>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'

</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
      height: 100vh;
      width: $base-menu-width;
      background-color: $base-menu-background;
    }
    .layout_tabbar {
      position: fixed;
      width: calc(100% - $base-menu-width);
      height: $base-tabbar-height;
      background-color: cyan;
      top: 0px;
      left: $base-menu-width;
    }
    .layout_main {
      position: absolute;
      width: calc(100% - $base-menu-width);
      height: calc(100vh - $base-tabbar-height);
      background-color: yellow;
      left: $base-menu-width;
      top: $base-tabbar-height;
      padding: 20px;
      overflow: auto;
    }
  }
</style>
