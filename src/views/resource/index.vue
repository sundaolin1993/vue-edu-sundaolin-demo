<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="资源名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="资源名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input
              v-model="form.url"
              placeholder="资源路径"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="全部" clearable>
              <el-option
                v-for="item in categoryIdList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleResetQuery">重置搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>所有资源分类</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>添加资源</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- Table 组件 -->
      <el-table :data="tableData" height="750" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="url" label="资源路径"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="添加时间" width="200" align="center">
          <template v-slot="scope">
            {{ scope.row.createdTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="editMenu(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="deleteMenu(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 15, 25, 35]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages, getCategoryAll } from '@/services/resource'
import { dateFormat } from '@/utils/format'
export default {
  name: 'ResourceIndex',
  data () {
    return {
      form: {
        name: null,
        url: null,
        categoryId: null,
        size: 15,
        current: 1
      },
      total: 0,
      tableData: [],
      categoryIdList: []
    }
  },
  methods: {
    async handleGetResourcePages () {
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.total = data.data.total
      }
    },
    async handleGetAll () {
      const { data } = await getCategoryAll()
      if (data.code === '000000') {
        this.categoryIdList = data.data
      }
    },
    handleSizeChange (size) {
      this.form.size = size
      this.form.current = 1
      this.handleGetResourcePages()
    },
    handleCurrentChange (current) {
      this.form.current = current
      this.handleGetResourcePages()
    },
    async handleQuery () {
      this.form.current = 1
      this.handleGetResourcePages()
    },
    handleResetQuery () {
      this.$refs.form.resetFields()
    }
  },
  created () {
    this.handleGetResourcePages()
    this.handleGetAll()
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
