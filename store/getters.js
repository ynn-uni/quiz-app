export default {
  token: state => {
    return state.user.token;
  },
  userInfo: state => {
    return state.user.userInfo;
  },
  opponentInfo: state => {
    return state.challenge.opponentInfo;
  },
  questionList: state => {
    return state.challenge.questionList;
  },
  socketInstance: state => {
    return state.challenge.socketInstance;
  },
  userScore: state => {
    return state.challenge.userScore;
  },
  opponentScore: state => {
    return state.challenge.opponentScore;
  },
  settlementInfo: state => {
    return state.challenge.settlementInfo;
  }
};
