<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- form 组件 筛选区 -->
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="角色名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleResetQuery">重置查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" :loading="isloading"
              >查询搜索</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOrEditVisible = true"
              >添加角色</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- Table 组件 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="isloading"
      >
        <el-table-column prop="id" label="编号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="code"
          label="角色编码"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="添加时间" width="200" align="center">
          <template v-slot="scope">
            {{ scope.row.createdTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="allocMenu(scope.row.id)"
              >分配菜单</el-button
            >
            <el-button type="text" size="small" @click="deleteMenu(scope.row)"
              >分配资源</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleEditRole(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDeleteRole(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="editRole ? '编辑角色' : '添加角色'"
      :visible.sync="createOrEditVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <create-or-edit
        v-if="createOrEditVisible"
        :editRole="editRole"
        @closeDialog="handleCloseDialog"
      ></create-or-edit>
    </el-dialog>
  </div>
</template>

<script>
import createOrEdit from './component/createoredit.vue'
import { getRolePages, deleteRole, getRole } from '@/services/role'
import { dateFormat } from '@/utils/format'
export default {
  name: 'ResourceIndex',
  data () {
    return {
      createOrEditVisible: false,
      form: {
        name: null
      },
      tableData: [],
      isloading: false,
      editRole: null
    }
  },
  methods: {
    handleCloseDialog (result) {
      this.editRole = null
      this.createOrEditVisible = false
      if (result) this.handleResetQuery()
    },
    async loadRolePages () {
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
      }
    },
    handleResetQuery () {
      this.$refs.form.resetFields()
      this.loadRolePages()
    },
    handleQuery () {
      this.loadRolePages()
    },
    handleDeleteRole (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteRole(id)
        if (data.code === '000000') {
          this.loadRolePages()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleEditRole (id) {
      const { data } = await getRole(id)
      if (data.code === '000000') {
        this.editRole = data.data
        this.createOrEditVisible = true
      }
    },
    allocMenu (id) {
      this.$router.push({ name: 'alloc-menu', params: { roleid: id } })
    }
  },
  created () {
    this.loadRolePages()
  },
  filters: {
    dateFormat
  },
  components: {
    createOrEdit
  }
}
</script>
<style lang="scss" scoped>
.el-form .el-form-item {
  margin-bottom: 0;
}
</style>
