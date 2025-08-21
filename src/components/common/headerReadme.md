# 公用头部组件使用说明

## 组件功能
这个公用头部组件实现了三种状态的显示：
1. **未登录状态** - 显示登录和注册按钮
2. **用户登录状态** - 显示购物车、用户信息下拉菜单
3. **服务商登录状态** - 显示工作台、用户信息下拉菜单

## 文件结构
```
src/
├── components/
│   └── CommonHeader.vue        # 公用头部组件
├── lang/
│   ├── zh-cn/
│   │   └── header.js          # 中文语言包
│   └── en/
│       └── header.js          # 英文语言包
└── assets/
    └── icon/                  # 图标资源
        ├── facebook.svg
        ├── google.svg
        └── wechat.svg
```

## 使用方法

### 1. 在主布局中引入组件

```vue
// src/layouts/MainLayout.vue
<template>
  <div class="main-layout">
    <common-header />
    <div class="main-content" style="margin-top: 60px;">
      <router-view />
    </div>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'

export default {
  name: 'MainLayout',
  components: {
    CommonHeader
  }
}
</script>
```

### 2. 在 App.vue 中使用

```vue
// src/App.vue
<template>
  <div id="app">
    <common-header />
    <router-view style="margin-top: 60px;" />
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue'

export default {
  name: 'App',
  components: {
    CommonHeader
  }
}
</script>
```

## 组件属性和方法

### Props
组件当前没有对外暴露的 props，所有状态都在组件内部管理。

### 内部状态
- `isLoggedIn`: 是否已登录
- `userType`: 用户类型 ('user' | 'provider' | '')
- `userInfo`: 用户信息对象
- `cartCount`: 购物车数量
- `showLoginDialog`: 是否显示登录弹窗
- `loginType`: 登录方式 ('account' | 'verification')

### 主要方法
- `handleLogin()`: 处理登录
- `handleLogout()`: 处理退出登录
- `sendVerificationCode()`: 发送验证码
- `handleQuickLogin(type)`: 快捷登录
- `handleLanguageChange(lang)`: 切换语言

## 登录弹窗功能

### 两种登录方式
1. **账号密码登录**
    - 输入账号（用户名/手机号/邮箱）
    - 输入密码
    - 支持忘记密码功能

2. **验证码登录**
    - 输入手机号或邮箱
    - 获取并输入验证码
    - 60秒倒计时重发机制

### 快捷登录
支持三种第三方登录：
- Facebook
- Google
- 微信

### 用户协议
登录前必须勾选同意用户协议和隐私政策

## API 集成点

需要在以下位置集成后端 API：

```javascript
// 1. 账号登录 API
handleAccountLogin() {
  // TODO: 调用登录API
  // POST /api/auth/login
  // body: { account, password }
}

// 2. 验证码登录 API
handleVerificationLogin() {
  // TODO: 调用登录API
  // POST /api/auth/login-by-code
  // body: { phoneEmail, code }
}

// 3. 发送验证码 API
sendVerificationCode() {
  // TODO: 调用发送验证码API
  // POST /api/auth/send-code
  // body: { phoneEmail }
}

// 4. 第三方登录 API
handleQuickLogin(type) {
  // TODO: 调用第三方登录
  // GET /api/auth/oauth/{type}
}

// 5. 退出登录 API
handleLogout() {
  // TODO: 调用退出登录API
  // POST /api/auth/logout
}
```

## 路由配置

组件中使用了以下路由，需要在路由配置中定义：

```javascript
// src/router/auth/index.js
export default [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue')
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import('@/views/auth/ForgetPassword.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/user/Profile.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/user/Settings.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/user/Orders.vue')
  }
]
```

## 样式定制

### 主题色
默认主题色为 `#00a6e6`，可以通过修改组件内的颜色值来自定义：

```scss
// 主题色变量
$primary-color: #00a6e6;
$primary-hover: #33b8e8;
```

### 响应式设计
组件已适配 PC 端和 iPad 端，使用了 Element UI 的栅格系统进行布局。

## 图标资源

需要在 `@/assets/icon/` 目录下放置以下 SVG 图标：
- facebook.svg
- google.svg
- wechat.svg

如果没有这些图标，可以使用 Element UI 的图标替代：

```vue
<i class="el-icon-share"></i>  <!-- 替代 Facebook -->
<i class="el-icon-search"></i> <!-- 替代 Google -->
<i class="el-icon-chat-dot-round"></i> <!-- 替代微信 -->
```

## 注意事项

1. **登录状态管理**：建议将登录状态迁移到 Vuex 进行全局管理
2. **Token 处理**：登录成功后需要保存 token 到 localStorage 或 cookie
3. **权限控制**：根据用户类型控制不同功能的显示
4. **安全性**：密码输入已设置 type="password"，验证码有防重复发送机制
5. **国际化**：已支持中英文切换，可扩展更多语言

## 待补充说明项

以下细节需要进一步确认：
1. Logo 图片资源的具体设计
2. 用户头像的默认图片
3. 第三方登录的具体实现方式
4. 购物车数量的实时更新机制
5. 服务商和普通用户的具体权限差异
6. 退出登录后的页面跳转逻辑