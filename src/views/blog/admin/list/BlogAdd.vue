<template>
  <el-form class="blog-list-form container" :inline="true" :model="formInline">
    <el-form-item label="标题">
      <el-input v-model="formInline" placeholder="请输入标题" clearable />
    </el-form-item>
    <el-form-item label="类别">
      <el-select v-model="formInline" placeholder="请选择类别" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-select v-model="formInline" placeholder="请选择标签" clearable>
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="blogAdd">添加</el-button>
    </el-form-item>
  </el-form>
  <MdEditor class="md" :toolbarsExclude="['github']" v-model="text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'

const text = ref('# Hello Editor')
</script>

<style scoped lang="scss">
.container {
  border-radius: 10px;
  box-shadow: 2px 1px 5px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
}
.blog-list-form {
  height: 75px;
  line-height: 65px;
}
.md {
  border-radius: 10px;
  margin-top: 20px;
  padding: 20px;
  height: calc(100vh - $base-tabbar-height - 140px);
}
</style>
