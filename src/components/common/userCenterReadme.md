# 左侧菜单组件使用说明

## 组件结构

创建了两个组件：
1. **SidebarMenu.vue** - 左侧菜单组件
2. **UserCenterLayout.vue** - 用户中心布局组件（包含头部和侧边栏）

## 文件结构
```
src/
├── components/
│   ├── CommonHeader.vue        # 公共头部组件
│   ├── SidebarMenu.vue         # 左侧菜单组件
│   └── UserCenterLayout.vue    # 用户中心布局组件
├── lang/
│   ├── zh-cn/
│   │   ├── header.js           # 头部中文语言包
│   │   └── sidebar.js          # 侧边栏中文语言包
│   └── en/
│       ├── header.js           # 头部英文语言包
│       └── sidebar.js          # 侧边栏英文语言包
└── views/
    └── user/                   # 用户中心页面
        ├── Profile.vue
        ├── Orders.vue
        └── ...
```

## 使用方法

### 1. 单独使用侧边栏组件

```vue
<template>
  <div class="page">
    <sidebar-menu 
      :active-menu="'/profile'"
      :is-collapse="false"
    />
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'

export default {
  components: {
    SidebarMenu
  }
}
</script>
```

### 2. 使用用户中心布局（推荐）

```vue
// src/views/user/Profile.vue
<template>
  <user-center-layout>
    <!-- 这里是页面内容 -->
    <div class="profile-page">
      <h2>我的资料</h2>
      <!-- 页面具体内容 -->
    </div>
  </user-center-layout>
</template>

<script>
import UserCenterLayout from '@/components/UserCenterLayout.vue'

export default {
  name: 'UserProfile',
  components: {
    UserCenterLayout
  }
}
</script>
```

## 组件属性

### SidebarMenu 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| isCollapse | Boolean | false | 是否折叠菜单 |
| activeMenu | String | '' | 当前激活的菜单项路径 |

### 菜单项配置

菜单项根据图片提取，包含以下功能模块：

1. **我的购物车** - `/profile`
2. **定制服务** - `/custom-services`
3. **我的订单** - `/my-orders`
4. **我的评价** - `/my-reviews`
5. **收件箱** - `/favorites`
6. **我的积分** - `/my-points`
7. **开具发票** - `/coupons`
8. **地址管理** - `/address-management`
9. **付款方式** - `/payment-methods`
10. **个人信息** - `/personal-info`
11. **修改密码** - `/password-settings`
12. **消息通知设置** - `/message-notifications`

## 路由配置

需要在路由中配置对应的页面：

```javascript
// src/router/user/index.js
export default [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/user/Profile.vue'),
    meta: { title: '我的购物车', requireAuth: true }
  },
  {
    path: '/custom-services',
    name: 'CustomServices',
    component: () => import('@/views/user/CustomServices.vue'),
    meta: { title: '定制服务', requireAuth: true }
  },
  {
    path: '/my-orders',
    name: 'MyOrders',
    component: () => import('@/views/user/Orders.vue'),
    meta: { title: '我的订单', requireAuth: true }
  },
  {
    path: '/my-reviews',
    name: 'MyReviews',
    component: () => import('@/views/user/Reviews.vue'),
    meta: { title: '我的评价', requireAuth: true }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/user/Favorites.vue'),
    meta: { title: '收件箱', requireAuth: true }
  },
  {
    path: '/my-points',
    name: 'MyPoints',
    component: () => import('@/views/user/Points.vue'),
    meta: { title: '我的积分', requireAuth: true }
  },
  {
    path: '/coupons',
    name: 'Coupons',
    component: () => import('@/views/user/Coupons.vue'),
    meta: { title: '开具发票', requireAuth: true }
  },
  {
    path: '/address-management',
    name: 'AddressManagement',
    component: () => import('@/views/user/Address.vue'),
    meta: { title: '地址管理', requireAuth: true }
  },
  {
    path: '/payment-methods',
    name: 'PaymentMethods',
    component: () => import('@/views/user/Payment.vue'),
    meta: { title: '付款方式', requireAuth: true }
  },
  {
    path: '/personal-info',
    name: 'PersonalInfo',
    component: () => import('@/views/user/PersonalInfo.vue'),
    meta: { title: '个人信息', requireAuth: true }
  },
  {
    path: '/password-settings',
    name: 'PasswordSettings',
    component: () => import('@/views/user/Password.vue'),
    meta: { title: '修改密码', requireAuth: true }
  },
  {
    path: '/message-notifications',
    name: 'MessageNotifications',
    component: () => import('@/views/user/Notifications.vue'),
    meta: { title: '消息通知设置', requireAuth: true }
  }
]
```

## 样式特点

1. **像素级还原**
    - 菜单宽度：200px
    - 菜单项高度：45px
    - 主题色：#00a6e6
    - 分组标题样式与设计图一致

2. **交互效果**
    - hover 状态背景色：#f5f7fa
    - 激活状态背景色：#ecf5ff
    - 激活状态左侧蓝色指示条
    - 图标颜色变化

3. **响应式设计**
    - 支持菜单折叠/展开
    - 小屏幕自动折叠
    - 移动端抽屉式菜单

## 扩展功能

### 1. 添加菜单折叠按钮

```vue
<template>
  <div class="sidebar-header">
    <el-button
      type="text"
      @click="toggleCollapse"
      class="collapse-btn"
    >
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </el-button>
  </div>
</template>
```

### 2. 添加徽章提示

```vue
<el-menu-item index="/my-orders">
  <i class="el-icon-document"></i>
  <span slot="title">
    {{ $t('sidebar.myOrders') }}
    <el-badge :value="3" class="menu-badge" />
  </span>
</el-menu-item>
```

### 3. 权限控制

```vue
<el-menu-item 
  v-if="hasPermission('view_orders')"
  index="/my-orders"
>
  <i class="el-icon-document"></i>
  <span slot="title">{{ $t('sidebar.myOrders') }}</span>
</el-menu-item>
```

## 注意事项

1. **路由模式**：组件使用了 Element UI 的 router 模式，会自动根据 index 属性进行路由跳转
2. **激活状态**：菜单会自动根据当前路由设置激活状态
3. **图标选择**：使用了 Element UI 的图标，可根据需要替换为自定义图标
4. **权限控制**：建议在实际项目中加入权限控制逻辑
5. **数据动态化**：可以将菜单数据改为从后端获取，实现动态菜单

## 与其他组件配合

这个侧边栏组件可以与之前创建的 CommonHeader 组件配合使用，形成完整的用户中心界面布局。UserCenterLayout 组件已经整合了两个组件，可以直接使用。