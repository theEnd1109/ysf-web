<template>
  <div class="common-header">
    <el-row class="header-container">
      <!-- Logo区域 -->
      <el-col :span="4" class="logo-section">
        <router-link to="/" class="logo-link">
          <span class="logo-text">LOGO</span>
        </router-link>
      </el-col>

      <!-- 语言切换区域 -->
      <el-col :span="4" class="language-section">
        <el-dropdown @command="handleLanguageChange">
          <span class="language-dropdown">
            {{ $t('common.header.language') }}: {{ currentLanguageText }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

      <!-- 服务中心 -->
      <el-col :span="4" class="service-center">
        <span class="service-text">{{ $t('common.header.serviceCenter') }}</span>
      </el-col>

      <!-- 右侧操作区域 -->
      <el-col :span="12" class="right-section">
        <!-- 服务商登录后显示 -->
        <div v-if="userType === 'provider' && isLoggedIn" class="provider-section">
          <span class="workspace-text">{{ $t('common.header.workspace') }}</span>
          <el-dropdown @command="handleUserCommand" class="user-dropdown">
            <span class="user-info">
              <el-avatar :size="32" class="user-avatar">
                <span>{{ userInfo.name ? userInfo.name.charAt(0) : '你' }}</span>
              </el-avatar>
              <span class="user-name">{{ userInfo.name || '你好' }}，{{ userInfo.organization || '组织翰' }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">{{ $t('common.header.profile') }}</el-dropdown-item>
              <el-dropdown-item command="settings">{{ $t('common.header.settings') }}</el-dropdown-item>
              <el-dropdown-item divided command="logout">{{ $t('common.header.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 用户登录后显示 -->
        <div v-else-if="userType === 'user' && isLoggedIn" class="user-section">
          <span class="service-provider-text">{{ $t('common.header.becomeProvider') }}</span>
          <el-button type="text" class="cart-btn">
            <i class="el-icon-shopping-cart-2"></i>
            {{ $t('common.header.cart') }}
            <span class="cart-count" v-if="cartCount > 0">({{ cartCount }})</span>
          </el-button>
          <el-dropdown @command="handleUserCommand" class="user-dropdown">
            <span class="user-info">
              <el-avatar :size="32" class="user-avatar">
                <span>{{ userInfo.name ? userInfo.name.charAt(0) : '你' }}</span>
              </el-avatar>
              <span class="user-name">{{ userInfo.name || '你好' }}，{{ userInfo.organization || '组织翰' }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">{{ $t('common.header.profile') }}</el-dropdown-item>
              <el-dropdown-item command="orders">{{ $t('common.header.orders') }}</el-dropdown-item>
              <el-dropdown-item command="settings">{{ $t('common.header.settings') }}</el-dropdown-item>
              <el-dropdown-item divided command="logout">{{ $t('common.header.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <!-- 未登录显示 -->
        <div v-else class="guest-section">
          <el-button @click="showLoginDialog = true" type="primary" class="login-btn">
            {{ $t('common.header.login') }}
          </el-button>
          <el-button @click="goToRegister" plain class="register-btn">
            {{ $t('common.header.register') }}
          </el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 登录弹窗 -->
    <el-dialog
        :title="$t('common.header.welcomeLogin')"
        :visible.sync="showLoginDialog"
        width="480px"
        :close-on-click-modal="false"
        custom-class="login-dialog"
        center
    >
      <!-- 选项卡切换 -->
      <div class="login-tabs">
        <div
            class="tab-item"
            :class="{ active: loginType === 'account' }"
            @click="loginType = 'account'"
        >
          {{ $t('common.header.accountLogin') }}
        </div>
        <div
            class="tab-item"
            :class="{ active: loginType === 'verification' }"
            @click="loginType = 'verification'"
        >
          {{ $t('common.header.verificationLogin') }}
        </div>
      </div>

      <!-- 账号登录表单 -->
      <el-form
          v-if="loginType === 'account'"
          ref="accountForm"
          :model="accountForm"
          :rules="accountRules"
          class="login-form"
      >
        <el-form-item prop="account">
          <el-input
              v-model="accountForm.account"
              :placeholder="$t('common.header.accountPlaceholder')"
              prefix-icon="el-icon-user"
              clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="accountForm.password"
              type="password"
              :placeholder="$t('common.header.passwordPlaceholder')"
              prefix-icon="el-icon-lock"
              show-password
              @keyup.enter.native="handleAccountLogin"
          >
            <el-button
                slot="suffix"
                type="text"
                class="forget-pwd"
                @click="handleForgetPassword"
            >
              {{ $t('common.header.forgetPassword') }}
            </el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 验证码登录表单 -->
      <el-form
          v-else
          ref="verificationForm"
          :model="verificationForm"
          :rules="verificationRules"
          class="login-form"
      >
        <el-form-item prop="phoneEmail">
          <el-input
              v-model="verificationForm.phoneEmail"
              :placeholder="$t('common.header.phoneEmailPlaceholder')"
              prefix-icon="el-icon-mobile"
              clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
              v-model="verificationForm.code"
              :placeholder="$t('common.header.codePlaceholder')"
              prefix-icon="el-icon-key"
              @keyup.enter.native="handleVerificationLogin"
          >
            <el-button
                slot="suffix"
                type="text"
                :disabled="codeBtnDisabled"
                @click="sendVerificationCode"
                class="code-btn"
            >
              {{ codeButtonText }}
            </el-button>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 协议勾选 -->
      <div class="agreement-section">
        <el-checkbox v-model="agreementChecked">
          <span class="agreement-text">
            {{ $t('common.header.readAndAgree') }}
            <el-link type="primary" :underline="false" @click="openUserAgreement">
              {{ $t('common.header.userAgreement') }}
            </el-link>
            {{ $t('common.header.and') }}
            <el-link type="primary" :underline="false" @click="openPrivacyPolicy">
              {{ $t('common.header.privacyPolicy') }}
            </el-link>
          </span>
        </el-checkbox>
      </div>

      <!-- 登录按钮 -->
      <el-button
          type="primary"
          class="login-submit-btn"
          :loading="loginLoading"
          @click="handleLogin"
      >
        {{ $t('common.header.login') }}
      </el-button>

      <!-- 忘记密码链接（验证码登录时显示） -->
      <div v-if="loginType === 'verification'" class="extra-link">
        <el-link type="info" :underline="false" @click="handleForgetPassword">
          {{ $t('common.header.forgetPassword') }}?
        </el-link>
      </div>

      <!-- 快捷登录 -->
      <div class="quick-login-section">
        <div class="divider-text">{{ $t('common.header.quickLogin') }}</div>
        <div class="quick-login-icons">
          <i class="quick-icon" @click="handleQuickLogin('facebook')">
            <img src="@/assets/icon/facebook.svg" alt="Facebook" />
          </i>
          <i class="quick-icon" @click="handleQuickLogin('google')">
            <img src="@/assets/icon/google.svg" alt="Google" />
          </i>
          <i class="quick-icon" @click="handleQuickLogin('wechat')">
            <img src="@/assets/icon/wechat.svg" alt="WeChat" />
          </i>
        </div>
      </div>

      <!-- 注册链接 -->
      <div class="register-link-section">
        <span>{{ $t('common.header.noAccount') }}，</span>
        <el-link type="primary" :underline="false" @click="goToRegister">
          {{ $t('common.header.goRegister') }}
        </el-link>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  data() {
    return {
      // 用户信息
      isLoggedIn: false,
      userType: '', // 'user' | 'provider' | ''
      userInfo: {
        name: '',
        organization: '',
        avatar: ''
      },
      cartCount: 0,

      // 登录弹窗
      showLoginDialog: false,
      loginType: 'account', // 'account' | 'verification'
      loginLoading: false,
      agreementChecked: false,

      // 账号登录表单
      accountForm: {
        account: '',
        password: ''
      },
      accountRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不少于6位', trigger: 'blur' }
        ]
      },

      // 验证码登录表单
      verificationForm: {
        phoneEmail: '',
        code: ''
      },
      verificationRules: {
        phoneEmail: [
          { required: true, message: '请输入手机号/邮箱', trigger: 'blur' },
          { validator: this.validatePhoneEmail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码为6位', trigger: 'blur' }
        ]
      },

      // 验证码倒计时
      codeButtonText: '获取验证码',
      codeBtnDisabled: false,
      countdown: 60
    }
  },
  computed: {
    currentLanguageText() {
      return this.$i18n.locale === 'zh-cn' ? '中文' : 'English'
    }
  },
  methods: {
    // 语言切换
    handleLanguageChange(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('locale', lang)
    },

    // 用户下拉菜单命令
    handleUserCommand(command) {
      switch (command) {
        case 'logout':
          this.handleLogout()
          break
        case 'profile':
          this.$router.push('/profile')
          break
        case 'settings':
          this.$router.push('/settings')
          break
        case 'orders':
          this.$router.push('/orders')
          break
      }
    },

    // 跳转注册页
    goToRegister() {
      this.showLoginDialog = false
      this.$router.push('/register')
    },

    // 登录处理
    handleLogin() {
      if (this.loginType === 'account') {
        this.handleAccountLogin()
      } else {
        this.handleVerificationLogin()
      }
    },

    // 账号登录
    handleAccountLogin() {
      this.$refs.accountForm.validate(valid => {
        if (valid && this.agreementChecked) {
          this.loginLoading = true
          // TODO: 调用登录API
          setTimeout(() => {
            this.loginLoading = false
            this.showLoginDialog = false
            this.isLoggedIn = true
            this.userType = 'user' // 根据实际返回设置
            this.userInfo = {
              name: '你好',
              organization: '组织翰'
            }
            this.$message.success('登录成功')
          }, 1500)
        } else if (!this.agreementChecked) {
          this.$message.warning('请阅读并接受用户协议和隐私政策')
        }
      })
    },

    // 验证码登录
    handleVerificationLogin() {
      this.$refs.verificationForm.validate(valid => {
        if (valid && this.agreementChecked) {
          this.loginLoading = true
          // TODO: 调用登录API
          setTimeout(() => {
            this.loginLoading = false
            this.showLoginDialog = false
            this.isLoggedIn = true
            this.userType = 'provider' // 根据实际返回设置
            this.userInfo = {
              name: '你好',
              organization: '组织翰'
            }
            this.$message.success('登录成功')
          }, 1500)
        } else if (!this.agreementChecked) {
          this.$message.warning('请阅读并接受用户协议和隐私政策')
        }
      })
    },

    // 发送验证码
    sendVerificationCode() {
      this.$refs.verificationForm.validateField('phoneEmail', error => {
        if (!error) {
          // TODO: 调用发送验证码API
          this.codeBtnDisabled = true
          this.startCountdown()
          this.$message.success('验证码已发送')
        }
      })
    },

    // 验证码倒计时
    startCountdown() {
      const timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
          this.codeButtonText = `${this.countdown}秒后重试`
        } else {
          clearInterval(timer)
          this.countdown = 60
          this.codeButtonText = '获取验证码'
          this.codeBtnDisabled = false
        }
      }, 1000)
    },

    // 验证手机/邮箱格式
    validatePhoneEmail(rule, value, callback) {
      const phoneReg = /^1[3-9]\d{9}$/
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!phoneReg.test(value) && !emailReg.test(value)) {
        callback(new Error('请输入正确的手机号或邮箱'))
      } else {
        callback()
      }
    },

    // 忘记密码
    handleForgetPassword() {
      this.showLoginDialog = false
      this.$router.push('/forget-password')
    },

    // 快捷登录
    handleQuickLogin(type) {
      if (!this.agreementChecked) {
        this.$message.warning('请阅读并接受用户协议和隐私政策')
        return
      }
      // TODO: 调用第三方登录
      this.$message.info(`${type} 登录开发中`)
    },

    // 打开用户协议
    openUserAgreement() {
      window.open('/user-agreement', '_blank')
    },

    // 打开隐私政策
    openPrivacyPolicy() {
      window.open('/privacy-policy', '_blank')
    },

    // 退出登录
    handleLogout() {
      this.isLoggedIn = false
      this.userType = ''
      this.userInfo = {}
      this.$message.success('已退出登录')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.common-header {
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .header-container {
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    align-items: center;
    display: flex;
  }

  // Logo区域
  .logo-section {
    .logo-link {
      text-decoration: none;
    }
    .logo-text {
      font-size: 24px;
      font-weight: bold;
      color: #00a6e6;
      letter-spacing: 1px;
    }
  }

  // 语言切换
  .language-section {
    .language-dropdown {
      cursor: pointer;
      color: #606266;
      font-size: 14px;
      &:hover {
        color: #00a6e6;
      }
    }
  }

  // 服务中心
  .service-center {
    .service-text {
      color: #606266;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #00a6e6;
      }
    }
  }

  // 右侧区域
  .right-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 服务商区域
  .provider-section {
    display: flex;
    align-items: center;
    gap: 24px;

    .workspace-text {
      color: #606266;
      font-size: 14px;
    }
  }

  // 用户区域
  .user-section {
    display: flex;
    align-items: center;
    gap: 24px;

    .service-provider-text {
      color: #606266;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: #00a6e6;
      }
    }

    .cart-btn {
      font-size: 14px;
      color: #00a6e6;
      padding: 0;
      .cart-count {
        margin-left: 4px;
      }
    }
  }

  // 用户下拉菜单
  .user-dropdown {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 8px;

      .user-avatar {
        background: #00a6e6;
        color: #fff;
      }

      .user-name {
        color: #303133;
        font-size: 14px;
      }
    }
  }

  // 访客区域
  .guest-section {
    display: flex;
    gap: 16px;

    .login-btn {
      height: 36px;
      padding: 0 24px;
      font-size: 14px;
      background: #00a6e6;
      border-color: #00a6e6;
      &:hover {
        background: #33b8e8;
        border-color: #33b8e8;
      }
    }

    .register-btn {
      height: 36px;
      padding: 0 24px;
      font-size: 14px;
      color: #00a6e6;
      border-color: #00a6e6;
      &:hover {
        color: #33b8e8;
        border-color: #33b8e8;
        background: rgba(0, 166, 230, 0.05);
      }
    }
  }
}

// 登录弹窗样式
.login-dialog {
  /deep/ .el-dialog__header {
    padding: 24px 24px 0;
    text-align: center;
    .el-dialog__title {
      font-size: 20px;
      font-weight: 500;
      color: #303133;
    }
  }

  /deep/ .el-dialog__body {
    padding: 24px 40px 32px;
  }

  // 登录选项卡
  .login-tabs {
    display: flex;
    margin-bottom: 32px;
    border-bottom: 1px solid #e4e7ed;

    .tab-item {
      flex: 1;
      text-align: center;
      padding: 12px 0;
      font-size: 16px;
      color: #606266;
      cursor: pointer;
      position: relative;
      transition: color 0.3s;

      &:hover {
        color: #00a6e6;
      }

      &.active {
        color: #00a6e6;
        font-weight: 500;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 3px;
          background: #00a6e6;
        }
      }
    }
  }

  // 登录表单
  .login-form {
    .el-form-item {
      margin-bottom: 24px;

      /deep/ .el-input__inner {
        height: 42px;
        line-height: 42px;
      }

      .forget-pwd {
        font-size: 14px;
        color: #00a6e6;
      }

      .code-btn {
        font-size: 14px;
        color: #00a6e6;
        padding: 0 12px;
        &:disabled {
          color: #c0c4cc;
        }
      }
    }
  }

  // 协议区域
  .agreement-section {
    margin: 16px 0 24px;

    .agreement-text {
      font-size: 13px;
      color: #606266;

      .el-link {
        font-size: 13px;
      }
    }
  }

  // 登录按钮
  .login-submit-btn {
    width: 100%;
    height: 42px;
    font-size: 16px;
    background: #00a6e6;
    border-color: #00a6e6;
    &:hover {
      background: #33b8e8;
      border-color: #33b8e8;
    }
  }

  // 额外链接
  .extra-link {
    text-align: center;
    margin-top: 16px;
    .el-link {
      font-size: 14px;
    }
  }

  // 快捷登录
  .quick-login-section {
    margin-top: 32px;

    .divider-text {
      text-align: center;
      color: #909399;
      font-size: 14px;
      margin-bottom: 20px;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 80px;
        height: 1px;
        background: #dcdfe6;
      }

      &::before {
        left: 50px;
      }

      &::after {
        right: 50px;
      }
    }

    .quick-login-icons {
      display: flex;
      justify-content: center;
      gap: 32px;

      .quick-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          border-color: #00a6e6;
          box-shadow: 0 2px 8px rgba(0, 166, 230, 0.15);
        }

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  // 注册链接
  .register-link-section {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: #606266;

    .el-link {
      font-size: 14px;
    }
  }
}
</style>