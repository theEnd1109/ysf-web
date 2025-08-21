<template>
  <div class="provider-sidebar-menu">
    <el-menu
        :default-active="activeMenu"
        class="sidebar-el-menu"
        background-color="#ffffff"
        text-color="#606266"
        active-text-color="#00a6e6"
        :collapse="isCollapse"
        :router="true"
    >
      <!-- 营业额统计 -->
      <el-menu-item index="/provider/revenue-statistics">
        <i class="el-icon-data-line"></i>
        <span slot="title">{{ $t('common.providerSidebar.revenueStatistics') }}</span>
      </el-menu-item>

      <!-- 任务大厅 -->
      <el-menu-item index="/provider/task-hall">
        <i class="el-icon-office-building"></i>
        <span slot="title">{{ $t('common.providerSidebar.taskHall') }}</span>
      </el-menu-item>

      <!-- 服务管理分组 -->
      <el-submenu index="service-management">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>{{ $t('common.providerSidebar.serviceManagement') }}</span>
        </template>

        <!-- 标准服务管理 -->
        <el-menu-item index="/provider/standard-service">
          <span slot="title">{{ $t('common.providerSidebar.standardService') }}</span>
        </el-menu-item>

        <!-- 标准服务订单管理 -->
        <el-menu-item index="/provider/standard-service-orders">
          <span slot="title">{{ $t('common.providerSidebar.standardServiceOrders') }}</span>
        </el-menu-item>
      </el-submenu>

      <!-- 定制服务报价记录 -->
      <el-menu-item index="/provider/custom-quote-records">
        <i class="el-icon-document-copy"></i>
        <span slot="title">{{ $t('common.providerSidebar.customQuoteRecords') }}</span>
      </el-menu-item>

      <!-- 定制服务订单管理 -->
      <el-menu-item index="/provider/custom-service-orders">
        <i class="el-icon-document-checked"></i>
        <span slot="title">{{ $t('common.providerSidebar.customServiceOrders') }}</span>
      </el-menu-item>

      <!-- 收件箱 -->
      <el-menu-item index="/provider/inbox">
        <i class="el-icon-message"></i>
        <span slot="title">{{ $t('common.providerSidebar.inbox') }}</span>
      </el-menu-item>

      <!-- 交易记录 -->
      <el-menu-item index="/provider/transaction-records">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{ $t('common.providerSidebar.transactionRecords') }}</span>
      </el-menu-item>

      <!-- 等级与订阅机制 -->
      <el-menu-item index="/provider/level-subscription">
        <i class="el-icon-trophy"></i>
        <span slot="title">{{ $t('common.providerSidebar.levelSubscription') }}</span>
      </el-menu-item>

      <!-- 收到的评论 -->
      <el-menu-item index="/provider/received-reviews">
        <i class="el-icon-star-off"></i>
        <span slot="title">{{ $t('common.providerSidebar.receivedReviews') }}</span>
      </el-menu-item>

      <!-- 已开具发票 -->
      <el-menu-item index="/provider/issued-invoices">
        <i class="el-icon-tickets"></i>
        <span slot="title">{{ $t('common.providerSidebar.issuedInvoices') }}</span>
      </el-menu-item>

      <!-- 合同管理 -->
      <el-menu-item index="/provider/contract-management">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t('common.providerSidebar.contractManagement') }}</span>
      </el-menu-item>

      <!-- 账户信息 (当前选中状态) -->
      <el-menu-item index="/provider/account-info" class="active-menu-item">
        <i class="el-icon-user"></i>
        <span slot="title">{{ $t('common.providerSidebar.accountInfo') }}</span>
      </el-menu-item>

      <!-- 修改密码 -->
      <el-menu-item index="/provider/change-password">
        <i class="el-icon-lock"></i>
        <span slot="title">{{ $t('common.providerSidebar.changePassword') }}</span>
      </el-menu-item>

      <!-- 收款方式 -->
      <el-menu-item index="/provider/payment-methods">
        <i class="el-icon-bank-card"></i>
        <span slot="title">{{ $t('common.providerSidebar.paymentMethods') }}</span>
      </el-menu-item>

      <!-- 服务区域管理 -->
      <el-menu-item index="/provider/service-area">
        <i class="el-icon-location-outline"></i>
        <span slot="title">{{ $t('common.providerSidebar.serviceArea') }}</span>
      </el-menu-item>

      <!-- 服务时间管理 -->
      <el-menu-item index="/provider/service-time">
        <i class="el-icon-time"></i>
        <span slot="title">{{ $t('common.providerSidebar.serviceTime') }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ProviderSidebarMenu',
  props: {
    // 是否折叠菜单
    isCollapse: {
      type: Boolean,
      default: false
    },
    // 当前激活的菜单项
    activeMenu: {
      type: String,
      default: '/provider/account-info'
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
.provider-sidebar-menu {
  width: 240px;
  min-height: calc(100vh - 60px);
  background-color: #ffffff;
  border-right: 1px solid #e4e7ed;

  .sidebar-el-menu {
    border-right: none;
    height: 100%;

    &:not(.el-menu--collapse) {
      width: 240px;
    }
  }

  // 菜单项样式
  .el-menu-item {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    padding: 0 20px !important;
    position: relative;

    i {
      color: #909399;
      margin-right: 12px;
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    &:hover {
      background-color: #f5f7fa;

      i {
        color: #00a6e6;
      }
    }

    // 激活状态 - 账户信息项
    &.active-menu-item,
    &.is-active {
      background-color: #ecf5ff;
      color: #00a6e6;
      font-weight: 500;

      i {
        color: #00a6e6;
      }

      &::before {
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

  // 子菜单样式
  .el-submenu {
    .el-submenu__title {
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      padding: 0 20px !important;

      i {
        color: #909399;
        margin-right: 12px;
        font-size: 16px;
        width: 20px;
        text-align: center;
      }

      &:hover {
        background-color: #f5f7fa;

        i {
          color: #00a6e6;
        }
      }
    }

    // 子菜单项
    .el-menu-item {
      padding-left: 52px !important;
      font-size: 13px;
      height: 44px;
      line-height: 44px;
    }
  }

  // 折叠状态
  &.is-collapse {
    width: 64px;

    .el-menu-item {
      padding: 0 20px !important;

      span {
        display: none;
      }

      i {
        margin: 0;
      }
    }

    .el-submenu {
      .el-submenu__title {
        padding: 0 20px !important;

        span {
          display: none;
        }

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .provider-sidebar-menu {
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

    &.is-open {
      transform: translateX(0);
    }
  }
}
</style>