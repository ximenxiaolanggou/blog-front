<template>
  <!-- 用户 header -->
  <div class="container user-header">
    <el-input
      class="user-search-input"
      v-model="formInline"
      placeholder="用户名/手机号/邮箱"
      clearable
    />
    <el-button class="user-search-btn" type="primary" @click="onSubmit">
      查询
    </el-button>
    <el-button type="primary" @click="onSubmit">添加</el-button>
  </div>

  <!-- 用户 table -->
  <div class="user-list-table container">
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
      class="user-list-pagination"
      small
      background
      layout="prev, pager, next"
      :total="50"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
const text = ref('# Hello Editor')
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style scoped lang="scss">
.container {
  border-radius: 10px;
  box-shadow: 2px 1px 5px 2px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: white;
}
.user-header {
  height: 75px;
  line-height: 50px;
  .user-search-input {
    width: 300px;
  }
  .user-search-btn {
    margin-left: 20px;
  }
}
.user-list-table {
  padding: 10px;
  height: calc(100vh - $base-tabbar-height - 140px);
  width: 100%;
  margin-top: 20px;
}
.user-list-pagination {
  margin-top: 20px;
}
</style>
