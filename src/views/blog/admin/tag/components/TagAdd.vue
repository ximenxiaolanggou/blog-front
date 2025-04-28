<template>
  <el-dialog
    width="500"
    v-model="visiable"
    :close-on-click-modal="false"
    :show-close="false"
    title="添加标签"
  >
    <el-form :model="form" ref="formRef">
      <el-form-item
        label="名称"
        prop="name"
        :rules="[
          {
            required: true,
            message: '请输入标签名称',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.name" placeholder="请输入标签名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入标签描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button @click="cancelAction">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { add } from '@/api/blog/tag'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
//自定义事件的方法
let $emit = defineEmits(['cancelAction', 'submitAction'])
const formRef = ref<FormInstance>()
const form = reactive({
  name: '',
  description: '',
})

// 取消
const cancelAction = () => {
  $emit('cancelAction')
}

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      await add(form)
      ElMessage({ type: 'success', message: '操作成功' })
      $emit('submitAction')
      Promise.resolve()
    } else {
      Promise.reject()
    }
  })
}
let visiable = ref(true)
</script>

<style scoped lang="scss"></style>
