<template>
  <div>
    <el-form
      ref="from"
      :model="from"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="from.name"
          placeholder="请输入角色名称"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色文本" prop="code">
        <el-input
          v-model="from.code"
          placeholder="请输入角色文本"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input
          v-model="from.description"
          type="textarea"
          placeholder="请输入角色描述"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { saveOrUpdateRole } from '@/services/role'
export default {
  name: 'roleCreateOrEdit',
  props: ['editRole'],
  data () {
    return {
      from: {
        name: undefined,
        code: undefined,
        description: undefined,
        id: null
      },
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          message: '请输入角色文本',
          trigger: 'blur'
        }],
        description: []
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.from.validate(async valid => {
        if (!valid) return
        const { data } = await saveOrUpdateRole(this.from)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
          this.from = {}
          this.$emit('closeDialog', true)
        }
      })
    },
    resetForm () {
      this.from = {}
      this.$emit('closeDialog', false)
    }
  },
  created () {
    this.editRole && (this.from = this.editRole)
  }
}

</script>
