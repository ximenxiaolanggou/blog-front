<template>
  <div class="container">
    <Profile class="profile" />
    <div class="main" id="main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Profile from './profile/index.vue'

</script>

<style scoped lang="scss">
.container {
  margin: 20px;
  display: flex;
  height: 100vh;
  .profile {
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    flex: 1;
  }
  .main {

    flex: 4;
  }
}


::-webkit-scrollbar-thumb{
  width: 10px;
  background-color: bisque;
  border-radius: 10px;
}
</style>
