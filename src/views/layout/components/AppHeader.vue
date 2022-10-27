<template>
  <!-- 左侧面包屑 -->
  <div class="app-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧用户信息头像 -->
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        <el-avatar :src="userInfo.portrait">
          <img
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="logoutHandler"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { userInfo } from '@/services/user'
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {
        portrait: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName: '用户',
        isUpdatedPassword: true
      }
    }
  },
  methods: {
    async loadUserInfo () {
      const { data } = await userInfo()
      if (data && data.content) {
        const { portrait, userName, isUpdatedPassword } = data.content
        portrait && (this.userInfo.portrait = portrait)
        userName && (this.userInfo.userName = userName)
        isUpdatedPassword && (this.userInfo.isUpdatedPassword = isUpdatedPassword)
      }
    },
    logoutHandler () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出，清空vuex保存的用户信息
        this.$store.commit('setUserInfo', null)
        // 跳转登录页
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  created () {
    this.loadUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.el-breadcrumb {
  font-size: 16px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
