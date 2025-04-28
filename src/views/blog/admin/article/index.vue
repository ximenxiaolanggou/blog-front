<template>
  <el-form
    class="blog-list-form container"
    :inline="true"
    ref="formRef"
    :model="queryParams"
  >
    <el-form-item label="标题" prop="title">
      <el-input
        v-model="queryParams.searchKey"
        placeholder="请输入标题"
        clearable
      />
    </el-form-item>
    <el-form-item label="类别" prop="categories">
      <el-select
        v-model="queryParams.categories"
        placeholder="请选择类别"
        multiple
        clearable
        style="width: 200px"
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
        v-model="queryParams.tags"
        multiple
        placeholder="请选择标签"
        clearable
        style="width: 200px"
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
      <el-button type="primary" @click="onSearch">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="blogAdd">添加</el-button>
    </el-form-item>
  </el-form>

  <div class="blog-list-table container">
    <el-table header-align="center" :data="tableData">
      <el-table-column prop="title" label="标题" width="400" />
      <el-table-column prop="categoryNames" label="类别" />
      <el-table-column prop="tagNames" label="标签" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-popconfirm
            title="确定删除?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="blog-list-pagination"
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalRecord"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { list as blogCategoryList } from '@/api/blog/category'
import { list as blogTagList } from '@/api/blog/tag'
import { BlogCategory } from '@/api/blog/category/type'
import { page, del } from '@/api/blog/article'
import { BlogTag } from '@/api/blog/tag/type'
import { ArticleQueryParams, BlogArticle } from '@/api/blog/article/type'

const $router = useRouter()

let queryParams = reactive<ArticleQueryParams>({
  searchKey: '',
  categories: [],
  tags: [],
})
let pageNumber = ref<number>(1)
let pageSize = ref<number>(10)
let blogCategories = ref<BlogCategory[]>([])
let blogTags = ref<BlogTag[]>([])
const formRef = ref<FormInstance>()
let tableData = ref<BlogArticle[]>([])
let totalRecord = ref<number>(0)

// 删除文章
let handleDelete = async (index: number, record: BlogArticle) => {
  await del(record.id as number)
  ElMessage({ type: 'success', message: '操作成功' })
  selectPage()
}

const handleCurrentChange = (arg: any) => {
  pageNumber.value = arg
  selectPage()
}

// 查询按钮
const onSearch = () => {
  selectPage()
}

const getBlogCategories = async () => {
  const res = await blogCategoryList('')
  blogCategories.value = res.data
}

// 修改
const handleEdit = (index: number, record: BlogArticle) => {
  $router.push({ path: '/blog/admin/article/modify', query: { id: record.id } })
}

const getBlogTags = async () => {
  const res = await blogTagList('')
  blogTags.value = res.data
}

// 分页
const selectPage = async () => {
  let res = await page(pageNumber.value, pageSize.value, queryParams)
  totalRecord.value = res.data.total
  tableData.value = res.data.data
}

onMounted(() => {
  getBlogCategories()
  getBlogTags()
  selectPage()
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
