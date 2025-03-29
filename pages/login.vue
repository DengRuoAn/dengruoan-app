<template>
  <view class="login-container">
    <!-- 背景装饰元素 -->
    <view class="decorate-circle circle-1"></view>
    <view class="decorate-circle circle-2"></view>

    <view class="login-content">
      <!-- 头部LOGO -->
      <view class="header">
        <image
            class="logo"
            :src="globalConfig.appInfo.logo"
            mode="aspectFit"
        />
        <text class="app-name">欢迎回来</text>
        <text class="welcome-text">请登录您的账户</text>
      </view>

      <!-- 登录表单 -->
      <view class="form-container">
        <!-- 用户名输入 -->
        <view class="input-group">
          <text class="iconfont icon-user input-icon"></text>
          <input
              v-model="loginForm.username"
              class="form-input"
              placeholder="用户名"
              placeholder-class="input-placeholder"
              @focus="handleInputFocus('username')"
              @blur="handleInputBlur('username')"
          />
        </view>

        <!-- 密码输入 -->
        <view class="input-group">
          <text class="iconfont icon-lock input-icon"></text>
          <input
              v-model="loginForm.password"
              class="form-input"
              password
              placeholder="密码"
              placeholder-class="input-placeholder"
              @focus="handleInputFocus('password')"
              @blur="handleInputBlur('password')"
          />
        </view>

        <!-- 登录按钮 -->
        <button
            class="login-btn"
            hover-class="btn-hover"
            @click="handleLogin"
        >
          立即登录
        </button>

        <!-- 辅助操作 -->
        <view class="action-links">
          <text class="link-text">忘记密码?</text>
          <text class="link-text">注册账号</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import globalConfig from "../config";

export default {
  computed: {
    globalConfig() {
      return globalConfig
    }
  },
  components: {},

  data() {
    return {
      loginForm: {
        username: "dengruoan",
        password: "dengruoan",
      }
    }
  },

  created() {
  },

  methods: {
    // 登录方法
    async handleLogin() {
      if (this.loginForm.username === "") {
        this.$modal.msgError("请输入账号")
      } else if (this.loginForm.password === "") {
        this.$modal.msgError("请输入密码")
      } else {
        this.$modal.loading("登录中，请耐心等待...")
        this.pwdLogin()
      }
    },
    // 密码登录  （以下是你的业务逻辑代码 请求就去api目录下加个请求 是否需要token都可以设置的）
    async pwdLogin() {
      // 1.这里是根据自己业务需求进行登录， 这里是去请求接口获取token，然后保存到vuex中 文件在store/modules/user.js
      // this.$store.dispatch('Login', this.loginForm).then(() => {
      //   this.$modal.closeLoading()
      //   this.loginSuccess()
      // }).catch(() => {
      // })
      this.$tab.reLaunch('/pages/index')
    },


    // 2.登录成功后，需要获取用户信息
    loginSuccess(result) {
      // 设置用户信息
      this.$store.dispatch('GetInfo').then(res => {
        this.$tab.reLaunch('/pages/index')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;

  .decorate-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    &.circle-1 {
      width: 600rpx;
      height: 600rpx;
      right: -300rpx;
      top: -300rpx;
    }
    &.circle-2 {
      width: 400rpx;
      height: 400rpx;
      left: -200rpx;
      bottom: -200rpx;
    }
  }
}

.login-content {
  position: relative;
  padding: 0 60rpx;
  z-index: 1;

  .header {
    padding-top: 120rpx;
    text-align: center;
    .logo {
      width: 160rpx;
      height: 160rpx;
      border-radius: 24rpx;
      box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.1);
    }
    .app-name {
      display: block;
      font-size: 48rpx;
      color: #fff;
      font-weight: 600;
      margin-top: 40rpx;
      letter-spacing: 2rpx;
    }
    .welcome-text {
      display: block;
      font-size: 28rpx;
      color: rgba(255,255,255,0.8);
      margin-top: 20rpx;
    }
  }
}

.form-container {
  margin-top: 80rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 20rpx 60rpx rgba(0,0,0,0.15);

  .input-group {
    position: relative;
    margin-bottom: 50rpx;
    border-bottom: 2rpx solid #eee;
    transition: border-color 0.3s ease;

    &:focus-within {
      border-color: #667eea;
      .input-icon {
        color: #667eea !important;
      }
    }

    .input-icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 40rpx;
      color: #999;
      transition: color 0.3s ease;
    }

    .form-input {
      height: 90rpx;
      padding-left: 60rpx;
      font-size: 32rpx;
      color: #333;
    }

    .input-placeholder {
      color: #ccc;
      font-size: 32rpx;
    }
  }

  .login-btn {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: #fff;
    font-size: 34rpx;
    border-radius: 12rpx;
    transition: transform 0.2s ease;

    &.btn-hover {
      transform: scale(0.98);
    }
  }

  .action-links {
    display: flex;
    justify-content: space-between;
    margin-top: 40rpx;
    .link-text {
      color: #666;
      font-size: 28rpx;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -6rpx;
        left: 0;
        width: 0;
        height: 2rpx;
        background: #667eea;
        transition: width 0.3s ease;
      }
      &:active::after {
        width: 100%;
      }
    }
  }
}
</style>
