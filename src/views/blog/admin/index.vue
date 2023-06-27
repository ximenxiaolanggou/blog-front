<template>
  <div class="container">
    <MdEditor class="md-class" toolbarsExclude="['github']" v-model="text" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const text = ref('# Hello Editor');
</script>

<style scoped lang="scss">
.container {

}
.md-class {
  height: calc(100vh - $base-tabbar-height - 40px);
}
</style>
