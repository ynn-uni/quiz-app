import { getAction, postAction } from '../utils/request';
export function getQuestions() {
  return getAction('/Subject/getSubjectList');
}

export function loginOrRegister(data = {}) {
  return postAction('/User/loginOrRegister', data);
}
export function getUserInfoApi(data = {}) {
  return getAction('/User/getUserInfo', data);
}

export function getScoreRankingList(data = {}) {
  return getAction('/Score/getScoreRankingList', data);
}

export function getLotteryUserList(data = {}) {
  return getAction('/Lottery/getLotteryUserList', data);
}

export function getLotteryList(data = {}) {
  return getAction('/Lottery/getLotteryList', data);
}

export function setUserInfo(data = {}) {
  return postAction('/User/setUserInfo', data);
}
