// 页面跳转插件

export default {
  // 关闭所有页面，打开到应用内的某个页面 uni.reLaunch方法是uniapp提供的一个API，可以用于重新加载当前页面，从而实现强制刷新当前页面的目的
  reLaunch(url) {
    return uni.reLaunch({
      url: url
    })
  },
  // 跳转到tabBar页面，并关闭其他所有非tabBar页面
  switchTab(url) {
    return uni.switchTab({
      url: url
    })
  },
  // 关闭当前页面，跳转到应用内的某个页面
  redirectTo(url) {
    return uni.redirectTo({
      url: url
    })
  },
  // 保留当前页面，跳转到应用内的某个页面
  navigateTo(url) {
    return uni.navigateTo({
      url: url
    })
  },
  // 关闭当前页面，返回上一页面或多级页面
  navigateBack() {
    return uni.navigateBack()
  }
}
