<template>
  <el-dialog
    width="500"
    v-model="visiable"
    :close-on-click-modal="false"
    :show-close="false"
    title="修改类别"
  >
    <el-form :model="form" ref="formRef">
      <el-form-item
        label="名称"
        prop="name"
        :rules="[
          {
            required: true,
            message: '请输入类别名称',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.name" placeholder="请输入类别名称" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入类别描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
        <el-button @click="cancelAction">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { update } from '@/api/blog/tag'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { BlogTag } from '@/api/blog/tag/type'
const props = defineProps(['tag'])
let visiable = ref(true)
//自定义事件的方法
let $emit = defineEmits(['cancelAction', 'submitAction'])
const formRef = ref<FormInstance>()
const form = reactive<BlogTag>({
  id: null,
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
      await update(form)
      ElMessage({ type: 'success', message: '操作成功' })
      $emit('submitAction')
      Promise.resolve()
    } else {
      Promise.reject()
    }
  })
}

onMounted(() => {
  form.id = props.tag.id
  form.name = props.tag.name
  form.description = props.tag.description
})
</script>

<style scoped lang="scss"></style>
