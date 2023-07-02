<template>
  <el-form class="blog-list-form container" :inline="true" :model="articleData">
    <el-form-item label="标题">
      <el-input
        v-model="articleData.title"
        placeholder="请输入标题"
        clearable
      />
    </el-form-item>
    <el-form-item label="类别">
      <el-select
        v-model="articleData.categories"
        placeholder="请选择类别"
        multiple
        clearable
      >
        <el-option
          v-for="blogCategory in blogCategories"
          :key="blogCategory.id"
          :label="blogCategory.name"
          :value="blogCategory.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-select
        v-model="articleData.tags"
        multiple
        placeholder="请选择标签"
        clearable
      >
        <el-option
          v-for="blogTag in blogTags"
          :key="blogTag.id"
          :label="blogTag.name"
          :value="blogTag.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="blogSaveAction">保存</el-button>
    </el-form-item>
  </el-form>

  <MdEditor
    class="md"
    :toolbarsExclude="['github']"
    v-model="articleData.content"
    @onSave="onSave"
    @onUploadImg="onUploadImg"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { MdEditor } from 'md-editor-v3'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { add, upload } from '@/api/blog/article'
import { list as blogCategoryList } from '@/api/blog/category'
import { list as blogTagList } from '@/api/blog/tag'
import { BlogCategory } from '@/api/blog/category/type'
import { BlogTag } from '@/api/blog/tag/type'

let $router = useRouter()
let articleData = reactive({
  id: null,
  title: '',
  content: '',
  categories: [],
  tags: [],
})
let blogCategories = ref<BlogCategory[]>([])
let blogTags = ref<BlogTag[]>([])

// 上传图片
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)
        upload(form)
          .then((res) => rev(res))
          .catch((error) => rej(error))
      })
    }),
  )

  callback(res.map((item) => item.data))
}

// 保存
const onSave = async () => {
  if (!articleData.title || articleData.title.trim() == '') {
    ElMessage({ type: 'warning', message: '请输入标题' })
    return
  }
  const res = await add(articleData)
  articleData.id = res.data
  ElMessage({ type: 'success', message: '保存成功' })
}
const getBlogCategories = async () => {
  const res = await blogCategoryList()
  blogCategories.value = res.data
}

const getBlogTags = async () => {
  const res = await blogTagList()
  blogTags.value = res.data
}

// 保存按钮
let blogSaveAction = async () => {
  if (!articleData.title || articleData.title.trim() == '') {
    ElMessage({ type: 'warning', message: '请输入标题' })
    return
  }
  const res = await add(articleData)
  articleData.id = res.data
  ElMessage({ type: 'success', message: '添加成功' })
  $router.go(-1)
}

onMounted(() => {
  getBlogCategories()
  getBlogTags()
})
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
