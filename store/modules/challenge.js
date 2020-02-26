import WebsocketUtils from '../../utils/websocket';

export default {
  namespaced: true,
  state: {
    socketInstance: null,
    opponentInfo: {},
    questionList: null,
    userScore: 0,
    opponentScore: 0,
    settlementInfo: {}
  },
  mutations: {
    updateSocketInstance(state, task) {
      state.socketInstance = task;
    },
    updateOpponentInfo(state, info) {
      state.opponentInfo = info;
    },
    updateQuestionList(state, list = []) {
      state.questionList = list;
    },
    updateUserScore(state, score) {
      state.userScore = score;
    },
    updateOpponentScore(state, score) {
      state.opponentScore = score;
    },
    updateSettlementInfo(state, info) {
      state.settlementInfo = info;
    }
  },
  actions: {
    initWebsocket(context) {
      const { commit, rootState } = context;
      return new Promise((resolve, reject) => {
        const instance = new WebsocketUtils({
          // url: 'ws://mahy-mac.local:8888/',
          url: 'ws://192.168.1.65:9502/Battle',
          header: {
            Authorization: rootState.user.token
          }
        });
        resolve(instance);
        commit('updateSocketInstance', instance);
      });
    },
    closeWebsocket({ state, commit }) {
      state.socketInstance.close();
    },
    uploadSocre({ state }, score) {
      state.socketInstance.send({
        operate: 'SCORE',
        data: {
          score
        }
      });
    },
    finishQuiz({ state, commit }) {
      state.socketInstance.send({
        operate: 'OVER',
        data: 'OVER'
      });
    }
  }
};
