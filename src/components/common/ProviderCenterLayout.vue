<template>
  <div class="provider-center-layout">
    <!-- 公共头部 -->
    <common-header />

    <!-- 主体内容区域 -->
    <div class="main-container">
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside :width="sidebarWidth">
          <provider-sidebar-menu
              :is-collapse="isCollapse"
              :active-menu.sync="activeMenu"
          />
        </el-aside>

        <!-- 右侧内容区域 -->
        <el-container>
          <!-- 面包屑导航和页面标题 -->
          <el-header class="page-header" height="auto">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/provider' }">
                {{ $t('common.providerSidebar.providerCenter') }}
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="currentPageTitle">
                {{ currentPageTitle }}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="page-title-wrapper">
              <h2 class="page-title">{{ currentPageTitle }}</h2>
              <div class="page-actions">
                <slot name="page-actions"></slot>
              </div>
            </div>
          </el-header>

          <!-- 页面内容 -->
          <el-main class="main-content">
            <slot></slot>
          </el-main>
        </el-container>
      </el-container>
    </div>

    <!-- 右侧悬浮卡片区域 -->
    <div class="floating-cards">
      <!-- 用户信息卡片 -->
      <el-card class="user-info-card" shadow="hover">
        <div class="user-avatar-section">
          <el-avatar :size="80" :src="userInfo.avatar" class="user-avatar">
            <span>{{ userInfo.name ? userInfo.name.charAt(0) : '里' }}</span>
          </el-avatar>
          <h3 class="user-name">{{ userInfo.name || '里约翰' }}</h3>
          <el-button type="primary" size="small" plain @click="goToMemberCenter">
            {{ $t('common.providerSidebar.memberCenter') }}
          </el-button>
        </div>

        <div class="user-info-details">
          <div class="info-item">
            <span class="info-label">{{ $t('common.providerSidebar.credits') }}:</span>
            <span class="info-value credits">50</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('common.providerSidebar.phone') }}:</span>
            <span class="info-value">159******7859</span>
          </div>
          <div class="info-item">
            <span class="info-label">{{ $t('common.providerSidebar.email') }}:</span>
            <span class="info-value">159******7859@gmail.com</span>
          </div>
          <el-button type="text" @click="logout" class="logout-btn">
            {{ $t('common.providerSidebar.logout') }}
          </el-button>
        </div>
      </el-card>

      <!-- 帮助中心卡片 -->
      <el-card class="help-card" shadow="hover">
        <div class="help-header">
          <i class="el-icon-question"></i>
          <h4>{{ $t('common.providerSidebar.helpCenter') }}</h4>
        </div>
        <p class="help-text">
          {{ $t('common.providerSidebar.helpText') }}
        </p>
        <div class="help-contact">
          <i class="el-icon-phone-outline"></i>
          <span>XXX-XXXX-XXXX</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import CommonHeader from './Header.vue'
import ProviderSidebar from './ProviderSidebar.vue'

export default {
  name: 'ProviderCenterLayout',
  components: {
    CommonHeader,
    ProviderSidebarMenu: ProviderSidebar
  },
  props: {
    // 当前页面标题
    pageTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isCollapse: false,
      activeMenu: '',
      userInfo: {
        name: '里约翰',
        avatar: '',
        credits: 50,
        phone: '159******7859',
        email: '159******7859@gmail.com'
      }
    }
  },
  computed: {
    sidebarWidth() {
      return this.isCollapse ? '64px' : '240px'
    },
    currentPageTitle() {
      // 根据路由获取页面标题
      return this.pageTitle || this.$route.meta?.title || ''
    }
  },
  mounted() {
    // 监听窗口大小变化
    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    // 获取用户信息
    this.getUserInfo()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      // 小屏幕自动折叠菜单
      if (window.innerWidth < 1200) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    },
    toggleSidebar() {
      this.isCollapse = !this.isCollapse
    },
    getUserInfo() {
      // TODO: 从API获取用户信息
    },
    goToMemberCenter() {
      this.$router.push('/provider/member-center')
    },
    logout() {
      // TODO: 调用退出登录API
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除登录信息
        this.$message.success('已退出登录')
        this.$router.push('/login')
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.provider-center-layout {
  min-height: 100vh;
  background-color: #f5f7fa;

  .main-container {
    margin-top: 60px; // 头部高度
    position: relative;

    .el-container {
      min-height: calc(100vh - 60px);
    }

    .el-aside {
      background-color: #ffffff;
      transition: width 0.3s;
      box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
    }

    // 页面头部
    .page-header {
      background-color: #ffffff;
      padding: 16px 24px;
      border-bottom: 1px solid #e4e7ed;

      .el-breadcrumb {
        font-size: 13px;
        margin-bottom: 12px;
      }

      .page-title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .page-title {
          font-size: 20px;
          font-weight: 500;
          color: #303133;
          margin: 0;
        }

        .page-actions {
          display: flex;
          gap: 12px;
        }
      }
    }

    // 主内容区域
    .main-content {
      padding: 24px;
      background-color: #f5f7fa;
      margin-right: 320px; // 为右侧悬浮卡片留出空间
    }
  }

  // 右侧悬浮卡片
  .floating-cards {
    position: fixed;
    right: 24px;
    top: 84px; // 60px头部 + 24px间距
    width: 280px;
    z-index: 100;

    // 用户信息卡片
    .user-info-card {
      margin-bottom: 20px;

      /deep/ .el-card__body {
        padding: 20px;
      }

      .user-avatar-section {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e4e7ed;

        .user-avatar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          font-size: 32px;
          margin-bottom: 12px;
        }

        .user-name {
          font-size: 18px;
          font-weight: 500;
          color: #303133;
          margin: 12px 0;
        }
      }

      .user-info-details {
        padding-top: 16px;

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;

          .info-label {
            color: #909399;
            margin-right: 8px;
          }

          .info-value {
            color: #606266;
            flex: 1;

            &.credits {
              color: #e6a23c;
              font-weight: bold;
              font-size: 16px;
            }
          }
        }

        .logout-btn {
          width: 100%;
          margin-top: 16px;
          padding: 8px 0;
          color: #00a6e6;

          &:hover {
            color: #33b8e8;
          }
        }
      }
    }

    // 帮助中心卡片
    .help-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;

      /deep/ .el-card__body {
        padding: 20px;
      }

      .help-header {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        i {
          font-size: 24px;
          margin-right: 8px;
        }

        h4 {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }
      }

      .help-text {
        font-size: 13px;
        line-height: 1.6;
        margin-bottom: 16px;
        opacity: 0.95;
      }

      .help-contact {
        display: flex;
        align-items: center;
        font-size: 14px;

        i {
          margin-right: 8px;
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 1440px) {
  .provider-center-layout {
    .main-container {
      .main-content {
        margin-right: 0;
      }
    }

    .floating-cards {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .provider-center-layout {
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