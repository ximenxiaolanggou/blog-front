<template>
  <div class="container">
    <Profile class="profile" />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Profile from './profile/index.vue'

</script>

<style scoped lang="scss">
.container {
  background-color: whitesmoke;
  display: flex;
  height: 100vh;
  .profile {
    flex: 1;
  }
  .main {
    border-left: 1px solid gainsboro;
    flex: 4;
  }
}
</style>
