<template>
  <div class="login">
    <div class="login-form">
      <div class="login-title">登录</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="65px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            },
          ]"
        >
          <el-input placeholder="请输入用户名" v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[
            {
              required: true,
              message: '请输入用密码',
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="ruleForm.password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
import { useRouter } from 'vue-router'
let $router = useRouter()
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

interface RuleForm {
  username: string
  passowrd: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await useStore.userLogin(ruleForm)
      $router.push('/home')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.login {
  background-color: whitesmoke;
  height: 100vh;
}
.login-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}
.login-form {
  border-radius: 8px;
  position: fixed;
  right: 50px;
  bottom: 200px;
  padding: 20px;
  width: 400px;
  background-color: white;
}
</style>
