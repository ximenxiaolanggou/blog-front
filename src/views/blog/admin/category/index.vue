<template>
  <div class="container blog-category-header">
    <el-input
      style="width: 200px"
      clearable
      v-model="searchKey"
      placeholder="关键字"
    />
    <el-button
      style="margin-left: 30px"
      type="primary"
      @click="getCategoryList"
    >
      查询
    </el-button>
    <el-button
      style="margin-left: 50px"
      type="primary"
      @click="categoryAddAction"
    >
      添加
    </el-button>
  </div>
  <div class="blog-category-table container">
    <el-table header-align="center" :data="tableData">
      <el-table-column prop="name" label="类别" width="400" />
      <el-table-column prop="description" label="描述" />
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
  </div>
  <CategoryAdd
    v-if="categoryAddVisiable"
    @cancelAction="addCancelAction"
    @submitAction="addSubmitAction"
  />
  <CategoryModify
    v-if="categoryModifyVisiable"
    @cancelAction="modifyCancelAction"
    @submitAction="modifySubmitAction"
    :category="selectedRecord"
  />
</template>

<script setup lang="ts">
import CategoryAdd from './components/CategoryAdd.vue'
import CategoryModify from './components/CategoryModify.vue'
import { ref, reactive, onMounted } from 'vue'
import { list as blogCategoryList, del } from '@/api/blog/category'
import { BlogCategory } from '@/api/blog/category/type'
import { ElMessage } from 'element-plus'

let categoryAddVisiable = ref<boolean>(false)
let categoryModifyVisiable = ref<boolean>(false)
let tableData = ref<BlogCategory[]>([])
let selectedRecord = ref<BlogCategory>()
let searchKey = ref<string>('')
// 添加类别成功事件
const addSubmitAction = () => {
  getCategoryList()
  categoryAddVisiable.value = false
}
const categoryAddAction = () => {
  categoryAddVisiable.value = true
}
const getCategoryList = async () => {
  let res = await blogCategoryList(searchKey.value)
  tableData.value = res.data
}

// 删除
const handleDelete = async (index:number, record:BlogCategory) => {
  await del(record.id as number)
  ElMessage({ type: 'success', message: '操作成功' })
  getCategoryList()
}

// 修改
const handleEdit = async (index:number, record:BlogCategory) => {
  selectedRecord.value = record
  categoryModifyVisiable.value = true
}

const modifyCancelAction = () => {
  categoryModifyVisiable.value = false
}

const modifySubmitAction = () => {
  categoryModifyVisiable.value = false
  getCategoryList()
}

onMounted(() => {
  getCategoryList()
})

// 取消操作
const addCancelAction = () => (categoryAddVisiable.value = false)
</script>

<style scoped lang="scss">
.container {
  border-radius: 10px;
  box-shadow: 2px 1px 5px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
}
.blog-category-header {
  height: 75px;
  line-height: 50px;
}
.blog-category-table {
  padding: 10px;
  height: calc(100vh - $base-tabbar-height - 140px);
  width: 100%;
  margin-top: 20px;
}
</style>
