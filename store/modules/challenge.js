import WebsocketUtils from '../../utils/websocket';

export default {
  namespaced: true,
  state: {
    socketInstance: null,
    opponentInfo: {},
    questionList: null,
    userScore: 0,
    opponentScore: 0,
    settlementInfo: {},
    isMatched: true,
    isReady: false,
    isQuiz: false,
    isFinished: false
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
      state.userScore += score;
    },
    updateOpponentScore(state, score) {
      state.opponentScore += score;
    },
    changeMatchStatus(state, status) {
      state.isMatched = status;
    },
    changeReadyStatus(state, status) {
      state.isReady = status;
    },
    changeQuizStatus(state, status) {
      state.isQuiz = status;
    },
    changeFinishStatus(state, status) {
      state.isFinished = status;
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
          // url: 'ws://mahy-mac.local:8888/'
          url: 'ws://192.168.1.65:9502/Battle',
          header: {
            Authorization: rootState.user.token
          }
        });
        instance.onmessage = evt => {
          listenMessage(context, evt);
        };
        instance.onopen = () => {
          resolve(instance);
        };
        commit('updateSocketInstance', instance);
      });
    },
    closeWebsocket({ state, commit }) {
      state.socketInstance.close();
      commit('changeMatchStatus', true);
      commit('changeReadyStatus', false);
      commit('changeQuizStatus', false);
      commit('changeFinishStatus', false);
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
      commit('changeQuizStatus', false);
      commit('changeFinishStatus', true);
      commit('updateUserScore', 0);
      commit('updateOpponentScore', 0);
      state.socketInstance.send({
        operate: 'OVER',
        data: 'OVER'
      });
    }
  }
};

function listenMessage(context, evt) {
  const { commit } = context;
  console.log('----', evt);
  const { operate, data } = JSON.parse(evt.data);
  if (operate === 'MATCH') {
    const { rival, subjects } = data;
    const opponentInfo = {
      name: rival.nickname,
      avatar: rival.portrait,
      score: rival.score,
      victory: rival.streak,
      level: rival.level
    };
    commit('updateOpponentInfo', opponentInfo);
    commit('updateQuestionList', subjects);
    commit('changeMatchStatus', false);
    commit('changeReadyStatus', true);
    setTimeout(() => {
      commit('changeReadyStatus', false);
    }, 3000);
    console.log(context.state);
  }
  if (operate === 'SCORE') {
    commit('updateOpponentScore', data.score);
  }
  if (operate === 'OVER') {
    commit('updateSettlementInfo', data);
  }
}
