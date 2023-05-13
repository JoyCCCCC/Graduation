import { getSysParams } from '@/api/system'
import { fetchAreaData } from '@/api/dict'
const state = {
  sysConfig: {},
  areaConfig: {}
}

const mutations = {

  SET_SYS_PARAMS: (state, sysConfig) => {
    state.sysConfig = sysConfig
  },
  SET_AREA_DATA: (state, areaConfig) => {
    state.areaConfig = areaConfig
  }
}

const actions = {
  getSysParams({ commit }) {
    return new Promise((resolve, reject) => {
      getSysParams().then(res => {
        commit('SET_SYS_PARAMS', res)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAreaData({ commit }) {
    return new Promise((resolve, reject) => {
      fetchAreaData().then(res => {
        commit('SET_AREA_DATA', res)
        resolve()
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

