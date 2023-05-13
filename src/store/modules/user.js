import { login, getInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import request from '@/utils/request'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    name: '',
    avatar: '',
    type: 1
  }
}

const state = getDefaultState()

const mutations = {
  SET_TYPE_STU:(state) =>{
    state.type = 1
  },
  SET_TYPE_Tea:(state) =>{
    state.type = 2
  },
  SET_TYPE_Adm:(state) =>{
    state.type = 3
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response)
        setToken(response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // console.log(response, 'responseresponse')
        const { userName } = response
        // if (!userName) {
        //   return reject('Verification failed, please Login again.')
        // }
        commit('SET_NAME', userName)
        commit('SET_USERINFO', response)
        // commit('SET_AVATAR', avatar)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  refreshToken({ commit, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      refreshToken(state.token).then(res => {
        if (res.token) {
          removeToken() // must remove  token  first
          commit('SET_TOKEN', res.token)
          setToken(res.token)
          rootState.app.requestHistory.forEach(v => {
            request(v)
          })
          resolve()
        } else {
          dispatch('user/logout')
          this.$router.push(`/login`)
        }
        commit('app/CLEAR_REQUEST', {}, { root: true })
        commit('app/CHANGE_IS_REFRESH', {}, { root: true })
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

