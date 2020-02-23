import { login as loginApi } from '../../apis'
export default {
  namespaced: true,
  state: {
    userInfo: null,
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login({ commit }) {
      const userInfo = loginApi()
      commit('updateUserInfo', userInfo)
    }
  }
}
