import { loginOrRegister, getUserInfoApi } from '../../apis';
export default {
  namespaced: true,
  state: {
    userInfo: {},
    token: '',
    code: ''
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateToken(state, token) {
      state.token = token;
    },
    updateCodeOnce(state, code) {
      state.code = code;
    }
  },
  actions: {
    // 登录
    wxLogin({ commit, dispatch }) {
      uni.login({
        success: res => {
          // 获取code
          commit('updateCodeOnce', res.code);
          dispatch('checkUserSetting');
        }
      });
    },
    // 检查用户授权设置
    checkUserSetting({ dispatch }) {
      uni.getSetting().then(res => {
        const [error, data] = res;
        if (error) {
          console.error(error);
        }
        if (data.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          dispatch('getWxUserInfo');
        }
      });
    },
    // 获取微信的用户信息
    getWxUserInfo({ dispatch }) {
      uni
        .getUserInfo({
          withCredentials: true
        })
        .then(res => {
          const [error, data] = res;
          if (error) {
            console.error(error);
          }
          if (data) {
            const { iv, encryptedData } = data;
            dispatch('loginWithUserInfo', { iv, encryptedData });
          }
        });
    },
    // 在后端登录或注册
    loginWithUserInfo({ state, commit, dispatch }, payload) {
      return loginOrRegister({
        code: state.code,
        ...payload // iv, encryptedData
      }).then(res => {
        commit('updateToken', res.data.token);
        dispatch('fatchUserInfoByToken');
      });
    },
    // 从后端获取用户信息
    fatchUserInfoByToken({ commit }) {
      getUserInfoApi().then(res => {
        console.log(res);
        const {
          battle,
          defeat,
          id,
          level,
          nickname,
          portrait,
          score,
          sex,
          streak,
          train,
          today_rank,
          today_score,
          experience,
          address,
          truename,
          phone
        } = res.data;
        const userinfo = {
          name: nickname,
          avatar: portrait,
          level: level,
          victory: streak, //胜场
          credit: score, // 积分
          battle,
          defeat, //败场
          id,
          sex,
          train,
          today_rank,
          today_score,
          experience,
          address, //收货地址相关信息
          truename,
          phone
        };
        commit('updateUserInfo', userinfo);
      });
    }
  }
};
