export default {
  userInfo: state => {
    return state.user.userInfo
  },
  opponentInfo: state => {
    return state.challenge.opponentInfo
  },
  socketInstance: state => {
    return state.challenge.socketInstance
  },
  userScore: state => {
    return state.challenge.userScore
  },
  opponentScore: state => {
    return state.challenge.opponentScore
  }
}
