<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="注册手机号">
            <el-input v-model="form.phone" placeholder="注册手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- Table 组件 -->
      <el-table
        :data="tableData"
        height="730"
        border
        style="width: 100%"
        v-loading="isloading"
      >
        <el-table-column prop="id" label="用户ID" width="100" align="center">
        </el-table-column>
        <el-table-column label="头像" width="200" align="center">
          <template v-slot="scope">
            <el-avatar :src="scope.row.portrait">
              <img
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
        </el-table-column>
        <el-table-column label="注册时间" width="200" align="center">
          <template v-slot="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="禁用/启用" align="center" width="100">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.accountNonLocked"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeUserStatus"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="allocRole(scope.row)"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[10, 15, 25, 35]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="isloading"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="分配角色" :visible.sync="dialogSelectVisible" width="30%">
      <el-select
        v-model="roles"
        multiple
        placeholder="请选择"
        style="width: 80%"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPages } from '@/services/user'
import { dateFormat } from '@/utils/format'
import { getAllRoles, allocateUserRoles, getRolesByUserId } from '@/services/role'

export default {
  name: 'UserIndex',
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      rangeDate: [],
      form: {
        phone: null,
        startCreateTime: null,
        endCreateTime: null,
        pageSize: 15,
        currentPage: 1
      },
      total: 0,
      tableData: [],
      isloading: false,
      roleOptions: [],
      dialogSelectVisible: false,
      roles: [],
      editUserId: null
    }
  },
  methods: {
    changeUserStatus () {
      this.$message.warning('对不起，测试版系统不支持此操作')
    },
    onSubmit () {
      if (this.rangeDate.length > 0) {
        this.form.startCreateTime = this.rangeDate[0]
        this.form.endCreateTime = this.rangeDate[1]
      }
      this.form.currentPage = 1
      this.loadUserList()
    },
    async loadUserList () {
      const { data } = await getUserPages(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.total = data.data.total
      }
    },
    async allocRole (user) {
      this.dialogSelectVisible = true
      this.editUserId = user.id
      const { data } = await getRolesByUserId(user.id)
      this.roles = data.data.map(role => role.id)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadUserList()
    },
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadUserList()
    },
    async handleGetRoleOptions () {
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roleOptions = data.data
      }
    },
    async handleDialogOk () {
      const { data } = await allocateUserRoles({
        userId: this.editUserId,
        roleIdList: this.roles
      })
      if (data.code === '000000') {
        this.dialogSelectVisible = false
        this.$message.success(data.mesg)
      }
    }
  },
  created () {
    this.loadUserList()
    this.handleGetRoleOptions()
  },
  filters: {
    dateFormat
  }
}
</script>
<style lang="scss" scoped>
.el-form .el-form-item {
  margin-bottom: 0;
}

.el-pagination {
  float: right;
  margin: 2px 0;
}
</style>
