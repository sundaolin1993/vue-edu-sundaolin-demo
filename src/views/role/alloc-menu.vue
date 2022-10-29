<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header
          @back="$router.push({ name: 'role' })"
          content="角色菜单管理"
        >
        </el-page-header>
      </div>
      <el-tree
        ref="menuList"
        :data="menuList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      >
      </el-tree>
      <el-row>
        <el-button type="primary" @click="saveRoleMenu">保存</el-button>
        <el-button @click="clearMenu">清空</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/services/menu'
export default {
  name: 'allocMenu',
  props: {
    roleid: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      menuList: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  methods: {
    clearMenu () {
      this.$refs.menuList.setCheckedKeys([])
    },
    async saveRoleMenu () {
      const { data } = await allocateRoleMenus({
        roleId: this.roleid,
        menuIdList: this.$refs.menuList.getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.$router.push({ name: 'role' })
      }
    },
    async loadMenuNodeList () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menuList = data.data
      }
    },
    filterRoleMenu (menus) {
      const roleMenu = []
      if (!menus) return roleMenu
      menus.forEach(menu => {
        if (!menu.selected) return
        if (menu.subMenuList && menu.subMenuList.length > 0) {
          roleMenu.push(...this.filterRoleMenu(menu.subMenuList))
        } else {
          roleMenu.push(menu.id)
        }
      })
      return roleMenu
    },
    async loadRoleMenu () {
      const { data } = await getRoleMenus(this.roleid)
      if (data.code === '000000') {
        this.checkedKeys = this.filterRoleMenu(data.data)
      }
    }
  },
  created () {
    this.loadMenuNodeList()
    this.loadRoleMenu()
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin: 1rem;
  text-align: center;
}
</style>
