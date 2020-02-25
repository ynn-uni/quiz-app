import WebsocketUtils from '../../utils/websocket';

export default {
  namespaced: true,
  state: {
    socketInstance: null,
    opponentInfo: {},
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
    updateUserScore(state, score) {
      state.userScore += score;
    },
    updateOpponentScore(state, score) {
      state.opponentScore = score;
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
      const { commit } = context;
      return new Promise((resolve, reject) => {
        const instance = new WebsocketUtils({
          url: 'ws://mahy-mac.local:8888/'
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
      state.socketInstance.send({ data: `score#${score}` });
    },
    finishQuiz({ state, commit }) {
      commit('changeQuizStatus', false);
      commit('changeFinishStatus', true);
      commit('updateUserScore', 0);
      commit('updateOpponentScore', 0);
      state.socketInstance.send({ data: 'finish' });
    }
  }
};

function listenMessage(context, evt) {
  const { commit } = context;
  console.log('----', evt);
  const [sign, message] = evt.data.split('#');

  if (!message) return;
  if (sign === 'opponent') {
    const opponent = JSON.parse(message);
    commit('updateOpponentInfo', opponent);
    commit('changeMatchStatus', false);
    commit('changeReadyStatus', true);
    setTimeout(() => {
      commit('changeReadyStatus', false);
    }, 3000);
  }
  if (sign === 'score') {
    commit('updateOpponentScore', message);
  }
  if (sign === 'settlement') {
    const info = JSON.parse(message);
    commit('updateSettlementInfo', info);
  }
}
