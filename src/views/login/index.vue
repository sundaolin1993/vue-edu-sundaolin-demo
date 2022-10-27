<template>
  <div class="login">
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="formData.phone"
          placeholder="请输入手机号"
          :maxlength="11"
          show-word-limit
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          placeholder="请输入密码"
          clearable
          show-password
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm" :loading="isloading"
          >登录</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from '@/services/user'
export default {
  name: 'loginIndex',
  data () {
    return {
      isloading: false,
      formData: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 18,
          message: '密码长度为 6 到 18 位',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async submitForm () {
      try {
        await this.$refs.elForm.validate() // 1.校验表单数据
        this.isloading = true
        const { data } = await login(this.formData) // 2.发送登录请求
        if (data.state === 1) { // 3.响应数据处理
          this.$store.commit('setUserInfo', data.content)
          this.$router.push(this.$route.query.redirect || '/')
          this.$message.success('登录成功')
        } else {
          this.$store.commit('setUserInfo', null)
          this.$message.error(data.message)
        }
        this.isloading = false
      } catch (error) {
      }
    },
    resetForm () {
      this.$refs.elForm.resetFields()
    }
  }
}

</script>
<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .el-form {
    width: 300px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 1rem;

    .el-button {
      width: 100%;
      margin: 0.5rem 0;
    }
  }
}
</style>
