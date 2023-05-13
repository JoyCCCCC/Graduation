import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  user: {
    type: '222'
  },
  device: 'desktop',
  requestInfo: {
    requestHistory: [],
    isRefreshing: true // 是否可以发起刷新token请求
  },
  userType: 0
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CHANGE_STU: state => {
    state.userType = 1
  },
  CHANGE_TEA: state => {
    state.userType = 2
  },
  CHANGE_ADM: state => {
    state.userType = 3
  },

  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  ADD_REQUEST: (state, request) => {
    state.requestInfo.requestHistory.push(request)
  },
  CLEAR_REQUEST: (state, request) => {
    state.requestInfo.requestHistory = []
  },
  CHANGE_IS_REFRESH: (state) => {
    state.requestInfo.isRefreshing = !state.requestInfo.isRefreshing
  }

}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
