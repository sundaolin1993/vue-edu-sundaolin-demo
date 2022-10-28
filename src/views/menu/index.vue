<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="tableData" height="750" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <i :class="'el-icon-' + scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
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
    </el-card>
  </div>
</template>

<script>
import { getAll, deleteMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getAllMenu () {
      const { data } = await getAll()
      this.tableData = data.data
    },
    deleteMenu (line) {
      this.$confirm(`确认删除菜单<${line.name}>吗？`, '删除提示', {
        confirmButtonText: '删除',
        cancelButtonText: '放弃'
      })
        .then(async () => {
          const { data } = await deleteMenu(line.id)
          if (data.code !== '000000') return
          this.getAllMenu()
          this.$message.success(data.mesg)
        })
        .catch(action => {
          this.$message.info('放弃删除')
        })
    },
    editMenu (line) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: line.id
        }
      })
    }
  },
  created () {
    this.getAllMenu()
  }
}
</script>
