
const state = {
  showLoading: false,
  loadingCount: 0
}

const mutations = {

  SHOW_LOADING: (state, { ignore }) => {
    // console.log(ignore, 'ignoreignore')
    state.loadingCount++
    if (!state.showLoading && !ignore) {
      state.showLoading = true
    }
  },

  HIDE_LOADING: (state) => {
    if (state.loadingCount > 0) {
      state.loadingCount--
      if (state.showLoading && state.loadingCount === 0) {
        state.showLoading = false
      }
    }
  },

  INIT: (state) => {
    state.loadingCount = 0
    state.showLoading = false
  }

}

const actions = {
  // changeSetting({ commit }, data) {
  //   commit('CHANGE_SETTING', data)
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

