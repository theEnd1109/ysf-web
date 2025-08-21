<template>
  <div class="user-center-layout">
    <!-- 公共头部 -->
    <common-header />
    <!-- 主体内容区域 -->
    <div class="main-container">
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside :width="sidebarWidth">
          <user-sidebar
              :is-collapse="isCollapse"
              :active-menu.sync="activeMenu"
          />
        </el-aside>

        <!-- 右侧内容区域 -->
        <el-main class="main-content">
          <slot></slot>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import CommonHeader from './Header.vue'
import UserSidebar from './UserSidebar.vue'

export default {
  name: 'UserCenterLayout',
  components: {
    CommonHeader,
    UserSidebar
  },
  data() {
    return {
      isCollapse: false,
      activeMenu: ''
    }
  },
  computed: {
    sidebarWidth() {
      return this.isCollapse ? '64px' : '200px'
    }
  },
  mounted() {
    // 监听窗口大小变化，自动折叠菜单
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      // 小屏幕自动折叠菜单
      if (window.innerWidth < 992) {
        this.isCollapse = true
      }
    },
    toggleSidebar() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.user-center-layout {
  min-height: 100vh;
  background-color: #f5f7fa;

  .main-container {
    margin-top: 60px; // 头部高度

    .el-container {
      min-height: calc(100vh - 60px);
    }

    .el-aside {
      background-color: #ffffff;
      transition: width 0.3s;
      box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
    }

    .main-content {
      padding: 24px;
      background-color: #f5f7fa;
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .user-center-layout {
    .main-container {
      .el-aside {
        position: fixed;
        left: 0;
        top: 60px;
        bottom: 0;
        z-index: 999;
      }

      .main-content {
        margin-left: 0;
        padding: 16px;
      }
    }
  }
}
</style>