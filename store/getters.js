export default {
  userInfo: state => {
    return state.user.userInfo
  },
  opponentInfo: state => {
    return state.challenge.opponentInfo
  }
}