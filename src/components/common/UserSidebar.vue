<template>
  <div class="sidebar-menu">
    <el-menu
        :default-active="activeMenu"
        class="sidebar-el-menu"
        background-color="#ffffff"
        text-color="#606266"
        active-text-color="#00a6e6"
        :collapse="isCollapse"
        :router="true"
    >
      <!-- 用户中心 -->
      <div class="menu-section">
        <div class="section-title">{{ $t('common.userSidebar.userCenter') }}</div>

        <el-menu-item index="/profile">
          <i class="el-icon-user"></i>
          <span slot="title">{{ $t('common.userSidebar.myProfile') }}</span>
        </el-menu-item>

        <el-menu-item index="/custom-services">
          <i class="el-icon-service"></i>
          <span slot="title">{{ $t('common.userSidebar.customServices') }}</span>
        </el-menu-item>

        <el-menu-item index="/my-orders">
          <i class="el-icon-document"></i>
          <span slot="title">{{ $t('common.userSidebar.myOrders') }}</span>
        </el-menu-item>

        <el-menu-item index="/my-reviews">
          <i class="el-icon-star-off"></i>
          <span slot="title">{{ $t('common.userSidebar.myReviews') }}</span>
        </el-menu-item>

        <el-menu-item index="/favorites">
          <i class="el-icon-collection"></i>
          <span slot="title">{{ $t('common.userSidebar.favorites') }}</span>
        </el-menu-item>

        <el-menu-item index="/my-points">
          <i class="el-icon-trophy"></i>
          <span slot="title">{{ $t('common.userSidebar.myPoints') }}</span>
        </el-menu-item>

        <el-menu-item index="/coupons">
          <i class="el-icon-ticket"></i>
          <span slot="title">{{ $t('common.userSidebar.coupons') }}</span>
        </el-menu-item>

        <el-menu-item index="/address-management">
          <i class="el-icon-location"></i>
          <span slot="title">{{ $t('common.userSidebar.addressManagement') }}</span>
        </el-menu-item>

        <el-menu-item index="/payment-methods">
          <i class="el-icon-bank-card"></i>
          <span slot="title">{{ $t('common.userSidebar.paymentMethods') }}</span>
        </el-menu-item>

        <el-menu-item index="/personal-info">
          <i class="el-icon-user-solid"></i>
          <span slot="title">{{ $t('common.userSidebar.personalInfo') }}</span>
        </el-menu-item>

        <el-menu-item index="/password-settings">
          <i class="el-icon-lock"></i>
          <span slot="title">{{ $t('common.userSidebar.passwordSettings') }}</span>
        </el-menu-item>

        <el-menu-item index="/message-notifications">
          <i class="el-icon-bell"></i>
          <span slot="title">{{ $t('common.userSidebar.messageNotifications') }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    // 是否折叠菜单
    isCollapse: {
      type: Boolean,
      default: false
    },
    // 当前激活的菜单项
    activeMenu: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 菜单数据可以在这里定义或从props传入
    }
  },
  mounted() {
    // 根据当前路由设置激活菜单
    this.setActiveMenu()
  },
  watch: {
    $route() {
      this.setActiveMenu()
    }
  },
  methods: {
    setActiveMenu() {
      // 根据当前路由自动设置激活的菜单项
      if (!this.activeMenu) {
        this.$emit('update:activeMenu', this.$route.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  width: 200px;
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
  border-right: 1px solid #e4e7ed;

  .sidebar-el-menu {
    border-right: none;
    height: 100%;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  // 菜单分组
  .menu-section {
    .section-title {
      padding: 20px 20px 10px;
      font-size: 12px;
      color: #00a6e6;
      font-weight: 500;
      line-height: 1;
      border-bottom: none;
    }
  }

  // 菜单项样式
  .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    padding: 0 20px !important;

    i {
      color: #909399;
      margin-right: 10px;
      font-size: 16px;
    }

    &:hover {
      background-color: #f5f7fa;

      i {
        color: #00a6e6;
      }
    }

    &.is-active {
      background-color: #ecf5ff;
      color: #00a6e6;
      font-weight: 500;

      i {
        color: #00a6e6;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background-color: #00a6e6;
      }
    }
  }

  // 折叠状态
  &.is-collapse {
    width: 64px;

    .section-title {
      display: none;
    }

    .el-menu-item {
      padding: 0 20px !important;

      span {
        display: none;
      }

      i {
        margin: 0;
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .sidebar-menu {
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s;

    &.is-open {
      transform: translateX(0);
    }
  }
}
</style>