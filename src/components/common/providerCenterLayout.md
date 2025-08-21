# 服务商左侧菜单组件使用说明

## 组件结构

创建了两个核心组件：
1. **ProviderSidebarMenu.vue** - 服务商左侧菜单组件
2. **ProviderCenterLayout.vue** - 服务商中心布局组件（包含头部、侧边栏和右侧信息卡片）

## 文件结构
```
src/
├── components/
│   ├── CommonHeader.vue              # 公共头部组件
│   ├── ProviderSidebarMenu.vue       # 服务商左侧菜单组件
│   └── ProviderCenterLayout.vue      # 服务商中心布局组件
├── lang/
│   ├── zh-cn/
│   │   └── common/
│   │       └── providerSidebar.js    # 服务商菜单中文语言包
│   └── en/
│       └── common/
│           └── providerSidebar.js    # 服务商菜单英文语言包
└── views/
    └── provider/                     # 服务商中心页面
        ├── AccountInfo.vue            # 账户信息页
        ├── RevenueStatistics.vue      # 营业额统计页
        └── ...
```

## 使用方法

### 1. 单独使用服务商侧边栏组件

```vue
<template>
  <div class="page">
    <provider-sidebar-menu 
      :active-menu="'/provider/account-info'"
      :is-collapse="false"
    />
  </div>
</template>

<script>
import ProviderSidebarMenu from '@/components/ProviderSidebarMenu.vue'

export default {
  components: {
    ProviderSidebarMenu
  }
}
</script>
```

### 2. 使用服务商中心布局（推荐）

```vue
// src/views/provider/AccountInfo.vue
<template>
  <provider-center-layout page-title="账户信息">
    <!-- 页面操作按钮（可选） -->
    <template #page-actions>
      <el-button type="primary" size="small">添加项目</el-button>
    </template>
    
    <!-- 页面主要内容 -->
    <el-card>
      <div class="account-info-content">
        <!-- 空状态 -->
        <div class="empty-state">
          <img src="@/assets/images/empty-box.svg" alt="暂无数据" />
          <p>当前没有落加项目照片，赶快添加吧！</p>
          <el-button type="primary">添加项目</el-button>
        </div>
      </div>
    </el-card>
  </provider-center-layout>
</template>

<script>
import ProviderCenterLayout from '@/components/ProviderCenterLayout.vue'

export default {
  name: 'AccountInfo',
  components: {
    ProviderCenterLayout
  }
}
</script>
```

## 组件属性

### ProviderSidebarMenu 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| isCollapse | Boolean | false | 是否折叠菜单 |
| activeMenu | String | '/provider/account-info' | 当前激活的菜单项路径 |

### ProviderCenterLayout 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| pageTitle | String | '' | 页面标题 |

#### 插槽
- `default`: 页面主内容区域
- `page-actions`: 页面头部右侧操作按钮区域

## 菜单项配置

根据设计图提取的完整菜单项：

1. **营业额统计** - `/provider/revenue-statistics`
2. **任务大厅** - `/provider/task-hall`
3. **标准服务管理** (子菜单)
    - 标准服务订单管理 - `/provider/standard-service`
    - 标准服务订单管理 - `/provider/standard-service-orders`
4. **定制服务报价记录** - `/provider/custom-quote-records`
5. **定制服务订单管理** - `/provider/custom-service-orders`
6. **收件箱** - `/provider/inbox`
7. **交易记录** - `/provider/transaction-records`
8. **等级与订阅机制** - `/provider/level-subscription`
9. **收到的评论** - `/provider/received-reviews`
10. **已开具发票** - `/provider/issued-invoices`
11. **合同管理** - `/provider/contract-management`
12. **账户信息** - `/provider/account-info` (当前激活)
13. **修改密码** - `/provider/change-password`
14. **收款方式** - `/provider/payment-methods`
15. **服务区域管理** - `/provider/service-area`
16. **服务时间管理** - `/provider/service-time`

## 路由配置

需要在路由中配置对应的页面：

```javascript
// src/router/provider/index.js
export default [
  {
    path: '/provider',
    redirect: '/provider/account-info'
  },
  {
    path: '/provider/revenue-statistics',
    name: 'RevenueStatistics',
    component: () => import('@/views/provider/RevenueStatistics.vue'),
    meta: { title: '营业额统计', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/task-hall',
    name: 'TaskHall',
    component: () => import('@/views/provider/TaskHall.vue'),
    meta: { title: '任务大厅', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/standard-service',
    name: 'StandardService',
    component: () => import('@/views/provider/StandardService.vue'),
    meta: { title: '标准服务管理', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/standard-service-orders',
    name: 'StandardServiceOrders',
    component: () => import('@/views/provider/StandardServiceOrders.vue'),
    meta: { title: '标准服务订单管理', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/custom-quote-records',
    name: 'CustomQuoteRecords',
    component: () => import('@/views/provider/CustomQuoteRecords.vue'),
    meta: { title: '定制服务报价记录', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/custom-service-orders',
    name: 'CustomServiceOrders',
    component: () => import('@/views/provider/CustomServiceOrders.vue'),
    meta: { title: '定制服务订单管理', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/inbox',
    name: 'ProviderInbox',
    component: () => import('@/views/provider/Inbox.vue'),
    meta: { title: '收件箱', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/transaction-records',
    name: 'TransactionRecords',
    component: () => import('@/views/provider/TransactionRecords.vue'),
    meta: { title: '交易记录', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/level-subscription',
    name: 'LevelSubscription',
    component: () => import('@/views/provider/LevelSubscription.vue'),
    meta: { title: '等级与订阅机制', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/received-reviews',
    name: 'ReceivedReviews',
    component: () => import('@/views/provider/ReceivedReviews.vue'),
    meta: { title: '收到的评论', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/issued-invoices',
    name: 'IssuedInvoices',
    component: () => import('@/views/provider/IssuedInvoices.vue'),
    meta: { title: '已开具发票', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/contract-management',
    name: 'ContractManagement',
    component: () => import('@/views/provider/ContractManagement.vue'),
    meta: { title: '合同管理', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/account-info',
    name: 'AccountInfo',
    component: () => import('@/views/provider/AccountInfo.vue'),
    meta: { title: '账户信息', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/change-password',
    name: 'ProviderChangePassword',
    component: () => import('@/views/provider/ChangePassword.vue'),
    meta: { title: '修改密码', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/payment-methods',
    name: 'ProviderPaymentMethods',
    component: () => import('@/views/provider/PaymentMethods.vue'),
    meta: { title: '收款方式', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/service-area',
    name: 'ServiceArea',
    component: () => import('@/views/provider/ServiceArea.vue'),
    meta: { title: '服务区域管理', requireAuth: true, role: 'provider' }
  },
  {
    path: '/provider/service-time',
    name: 'ServiceTime',
    component: () => import('@/views/provider/ServiceTime.vue'),
    meta: { title: '服务时间管理', requireAuth: true, role: 'provider' }
  }
]
```

## 样式特点

1. **像素级还原**
    - 菜单宽度：240px
    - 菜单项高度：48px
    - 主题色：#00a6e6
    - 激活状态背景色：#ecf5ff
    - 左侧蓝色指示条宽度：3px

2. **交互效果**
    - hover 状态背景色：#f5f7fa
    - 激活状态左侧蓝色指示条
    - 图标颜色响应状态变化
    - 子菜单缩进显示

3. **响应式设计**
    - 1200px 以下自动折叠菜单
    - 1440px 以下隐藏右侧信息卡片
    - 移动端抽屉式菜单

## 右侧信息卡片

ProviderCenterLayout 组件包含两个右侧悬浮卡片：

### 1. 用户信息卡片
- 用户头像（渐变背景）
- 用户名称
- 申请成为服务商按钮
- 积分显示（橙色高亮）
- 手机号码（脱敏显示）
- 邮箱地址（脱敏显示）
- 退出登录按钮

### 2. 帮助中心卡片
- 紫色渐变背景
- 帮助说明文字
- 客服联系电话

## 扩展功能

### 1. 添加消息提醒徽章

```vue
<el-menu-item index="/provider/inbox">
  <el-badge :value="unreadCount" :hidden="unreadCount === 0">
    <i class="el-icon-message"></i>
  </el-badge>
  <span slot="title">{{ $t('common.providerSidebar.inbox') }}</span>
</el-menu-item>
```

### 2. 动态菜单权限控制

```javascript
computed: {
  menuItems() {
    return this.allMenuItems.filter(item => {
      return this.hasPermission(item.permission)
    })
  }
}
```

### 3. 菜单搜索功能

```vue
<el-input
  v-model="searchKeyword"
  placeholder="搜索菜单"
  prefix-icon="el-icon-search"
  clearable
  size="small"
/>
```

## 注意事项

1. **路由模式**：菜单使用 Element UI 的 router 模式自动跳转
2. **权限控制**：建议添加 role: 'provider' 的路由守卫
3. **数据获取**：用户信息和积分等数据需要从后端API获取
4. **空状态处理**：参考账户信息页的空状态设计
5. **国际化**：语言包已放置在 `common/providerSidebar` 路径下

## API 集成点

需要集成的后端接口：

```javascript
// 1. 获取用户信息
getUserInfo() {
  // GET /api/provider/user-info
}

// 2. 获取未读消息数
getUnreadCount() {
  // GET /api/provider/unread-count
}

// 3. 获取菜单权限
getMenuPermissions() {
  // GET /api/provider/menu-permissions
}

// 4. 退出登录
logout() {
  // POST /api/auth/logout
}
```

组件已完全实现设计图中的服务商左侧菜单功能，包括所有菜单项、用户信息卡片和帮助中心卡片。