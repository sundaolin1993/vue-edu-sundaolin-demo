<template>
  <div class="menu-create-or-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header @back="$router.push({ name: 'menu' })" :content="title">
        </el-page-header>
      </div>
      <el-form
        ref="from"
        :model="from"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input
            v-model="from.name"
            placeholder="请输入菜单名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input
            v-model="from.href"
            placeholder="请输入菜单路径"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select
            v-model="from.parentId"
            placeholder="请选择上级菜单"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in parentMenuList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="from.description"
            placeholder="请输入描述"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input
            v-model="from.icon"
            placeholder="请输入前端图标"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="from.shown" size="medium">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number
            v-model="from.orderNum"
            placeholder="排序"
          ></el-input-number>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm" :loading="isloading"
            >提交</el-button
          >
          <el-button @click="resetForm" v-if="isCreateOrEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEditMenuInfo, saveOrUpdate } from '@/services/menu'
export default {
  name: 'menuCreateOrEdit',
  props: {
    title: {
      type: String,
      default: '添加菜单'
    }
  },
  data () {
    return {
      from: {
        name: undefined,
        href: undefined,
        parentId: -1,
        description: undefined,
        icon: undefined,
        shown: true,
        orderNum: 1
      },
      rules: {
        name: [{
          required: true,
          message: '请输入菜单名称',
          trigger: 'blur'
        }],
        href: [{
          required: true,
          message: '请输入菜单路径',
          trigger: 'blur'
        }],
        parentId: [{
          required: true,
          message: '请选择上级菜单',
          trigger: 'change'
        }],
        description: [{
          required: true,
          message: '请输入描述',
          trigger: 'blur'
        }],
        icon: [{
          required: true,
          message: '请输入前端图标',
          trigger: 'blur'
        }],
        shown: [{
          required: true,
          message: '是否显示不能为空',
          trigger: 'change'
        }],
        orderNum: [{
          required: true,
          message: '排序',
          trigger: 'blur'
        }]
      },
      parentMenuList: [],
      isloading: false
    }
  },
  methods: {
    submitForm () {
      this.$refs.from.validate(valid => {
        if (!valid) return
        this.isloading = true
        saveOrUpdate(this.from).then(resolve => {
          this.$message.success('添加成功')
          this.$router.push({ name: 'menu' })
          this.isloading = false
        })
      })
    },
    resetForm () {
      this.$refs.from.resetFields()
    },
    async loadMenuInfo () {
      const id = this.$route.params.id || -1
      const { data } = await getEditMenuInfo(id)
      if (data.code !== '000000') return
      this.parentMenuList = data.data.parentMenuList
      if (!data.data.menuInfo) return
      this.from = data.data.menuInfo
    }
  },
  created () {
    this.loadMenuInfo()
  },
  computed: {
    isCreateOrEdit () {
      return this.title === '添加菜单'
    }
  }
}

</script>
