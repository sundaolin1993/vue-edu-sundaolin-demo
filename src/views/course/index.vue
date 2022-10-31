<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input
              v-model="form.courseName"
              placeholder="课程名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status">
              <el-option label="全部" value=""> </el-option>
              <el-option label="下架" value="0"> </el-option>
              <el-option label="上架" value="1"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button
              type="primary"
              @click="$router.push({ name: 'saveOrUpdateCourse' })"
              >添加课程+</el-button
            >
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
        <el-table-column prop="id" label="课程ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="courseName" label="课程名称" align="center">
        </el-table-column>
        <el-table-column prop="price" label="价格（¥）" align="center">
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" align="center">
        </el-table-column>
        <el-table-column label="下架/上架" align="center" width="100">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.row)"
              :active-value="1"
              :inactive-value="0"
              :disabled="isloading"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template v-slot="scope">
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'saveOrUpdateCourse',
                  params: { courseId: scope.row.id },
                })
              "
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="allocRole(scope.row)"
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="isloading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getQueryCourses, changeState } from '@/services/course'

export default {
  name: 'UserIndex',
  data () {
    return {
      rangeDate: [],
      form: {
        courseName: null,
        status: '',
        pageSize: 50,
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
    async changeStatus (course) {
      this.isloading = true
      const { data } = await changeState({
        courseId: course.id,
        status: course.status
      })
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      } else {
        this.loadCourseList()
      }
      this.isloading = false
    },
    onSubmit () {
      this.form.currentPage = 1
      this.loadCourseList()
    },
    async loadCourseList () {
      const { data } = await getQueryCourses(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.total = data.data.total
      }
    },
    async allocRole (user) {

    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadCourseList()
    },
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadCourseList()
    },
    async handleGetRoleOptions () {

    },
    async handleDialogOk () {

    }
  },
  created () {
    this.loadCourseList()
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
