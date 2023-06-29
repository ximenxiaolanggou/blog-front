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
import { ref } from 'vue'
import {useRouter} from "vue-router";
const $router = useRouter();
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

// 博客添加
const blogAdd = () => $router.push({name: 'blog-add'})
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
