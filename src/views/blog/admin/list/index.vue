<template>
  <el-form
    class="blog-list-form container"
    :inline="true"
    ref="formRef"
    :model="blogData"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="blogData.title" placeholder="请输入标题" clearable />
    </el-form-item>
    <el-form-item label="类别" prop="categories">
      <el-select
        v-model="blogData.categories"
        placeholder="请选择类别"
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
    <el-form-item label="标签" prop="tags">
      <el-select
        v-model="blogData.tags"
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
      <el-button type="primary" @click="onSearch(ruleFormRef)">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="blogAdd">添加</el-button>
    </el-form-item>
  </el-form>

  <div class="blog-list-table container">
    <el-table header-align="center" :data="tableData">
      <el-table-column prop="date" label="标题" width="400" />
      <el-table-column prop="address" label="类别" />
      <el-table-column prop="address" label="标签" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="blog-list-pagination"
      small
      background
      layout="prev, pager, next"
      :total="50"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { list as blogCategoryList } from '@/api/blog/category'
import { list as blogTagList } from '@/api/blog/tag'
import { BlogCategory } from '@/api/blog/category/type'
import { BlogTag } from '@/api/blog/tag/type'
import type { FormInstance } from 'element-plus'
const $router = useRouter()

let blogData = reactive({
  title: '',
  categories: null,
  tags: [],
})
let pageNumber = ref<number>(1)
let pageSize = ref<number>(1)
let blogCategories = ref<BlogCategory[]>([])
let blogTags = ref<BlogTag[]>([])
const formRef = ref<FormInstance>()

// 查询按钮
const onSearch = (formEl: FormInstance | undefined) => {}

const getBlogCategories = async () => {
  const res = await blogCategoryList()
  blogCategories.value = res.data
}

const getBlogTags = async () => {
  const res = await blogTagList()
  blogTags.value = res.data
}

// 分页
const page = () => {}

onMounted(() => {
  getBlogCategories()
  getBlogTags()
  page()
})

// 博客添加
const blogAdd = () => $router.push({ name: 'blog-add' })
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
.blog-list-table {
  padding: 10px;
  height: calc(100vh - $base-tabbar-height - 140px);
  width: 100%;
  margin-top: 20px;
}
.blog-list-pagination {
  margin-top: 20px;
}
</style>
