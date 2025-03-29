import { getToken } from '@/utils/auth'

// 登录页面
const loginPage = "/pages/login"

// 白名单页面不需要登录验证 (你在上线时候需要去掉'/pages/index'白名单 不然就不检验token了  你可以吧他注释掉然后测试一下看效果)
const whiteList = ['/pages/login', '/pages/register', '/pages/index']

// 检查地址白名单
function checkWhite(url) {
  const path = url.split('?')[0]
  return whiteList.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
  uni.addInterceptor(item, {
    invoke(to) {
      if (getToken()) {
        if (to.url === loginPage) {
          uni.reLaunch({ url: "/" })
        }
        return true
      } else {
        if (checkWhite(to.url)) {
          return true
        }
        uni.reLaunch({ url: loginPage })
        return false
      }
    },
    fail(err) {
      console.log(err)
    }
  })
})
