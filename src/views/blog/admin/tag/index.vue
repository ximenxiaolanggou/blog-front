<template>
  <div class="container blog-tag-header">
    <el-input
      style="width: 200px"
      clearable
      v-model="searchKey"
      placeholder="关键字"
    />
    <el-button style="margin-left: 30px" type="primary" @click="getTagList">
      查询
    </el-button>
    <el-button type="primary" @click="tagAddAction">添加</el-button>
  </div>
  <div class="blog-tag-table container">
    <el-table header-align="center" :data="tableData">
      <el-table-column prop="name" label="标签" width="400" />
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
  <TagAdd
    v-if="tagAddVisiable"
    @cancelAction="addCancelAction"
    @submitAction="addSubmitAction"
  />
  <TagModify
    v-if="tagModifyVisiable"
    @cancelAction="modifyCancelAction"
    @submitAction="modifySubmitAction"
    :tag="selectedRecord"
  />
</template>

<script setup lang="ts">
import TagAdd from './components/TagAdd.vue'
import TagModify from './components/TagModify.vue'
import { ref, reactive, onMounted } from 'vue'
import { list as blogTagList, del } from '@/api/blog/tag'
import { BlogTag } from '@/api/blog/tag/type'
import { ElMessage } from 'element-plus'

let tagAddVisiable = ref<boolean>(false)
let tagModifyVisiable = ref<boolean>(false)
let tableData = ref<BlogTag[]>([])
let selectedRecord = ref<BlogTag>()
let searchKey = ref<string>('')
// 添加标签成功事件
const addSubmitAction = () => {
  getTagList()
  tagAddVisiable.value = false
}
const tagAddAction = () => {
  tagAddVisiable.value = true
}
const getTagList = async () => {
  let res = await blogTagList(searchKey.value)
  tableData.value = res.data
}

// 删除
const handleDelete = async (index: number, record: BlogTag) => {
  await del(record.id as number)
  ElMessage({ type: 'success', message: '操作成功' })
  getTagList()
}

// 修改
const handleEdit = async (index: number, record: BlogTag) => {
  selectedRecord.value = record
  tagModifyVisiable.value = true
}

const modifyCancelAction = () => {
  tagModifyVisiable.value = false
}

const modifySubmitAction = () => {
  tagModifyVisiable.value = false
  getTagList()
}

onMounted(() => {
  getTagList()
})

// 取消操作
const addCancelAction = () => (tagAddVisiable.value = false)
</script>

<style scoped lang="scss">
.container {
  border-radius: 10px;
  box-shadow: 2px 1px 5px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
}
.blog-tag-header {
  height: 75px;
  line-height: 50px;
}
.blog-tag-table {
  padding: 10px;
  height: calc(100vh - $base-tabbar-height - 140px);
  width: 100%;
  margin-top: 20px;
}
</style>
