import { login as loginApi } from '../../apis';
export default {
  namespaced: true,
  state: {
    userInfo: null,
    token: ''
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    login({ commit }) {
      const userInfo = loginApi();
      commit('updateUserInfo', userInfo);
    }
  }
};
