const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  loading: state => state.loading.showLoading,
  requestInfo: state => state.app.requestInfo,
  sysConfig: state => state.system.sysConfig,
  areaConfig: state => state.system.areaConfig,
  userType: state => state.user.type
}
export default getters
