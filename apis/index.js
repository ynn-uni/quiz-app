import { getAction, postAction } from '../utils/request';
export function getQuestions() {
  return getAction('/Subject/getSubjectList');
}

export function login() {
  return {
    name: '空城',
    avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
    level: 4,
    victory: 2,
    credit: 1000 // 积分
  };
}
export function loginOrRegister(data = {}) {
  return postAction('/User/loginOrRegister', data);
}
export function getUserInfoApi(data = {}) {
  return getAction('/User/getUserInfo', data);
}
///Score/getScoreRankingList
export function getScoreRankingList(data = {}) {
  return getAction('/Score/getScoreRankingList', data);
}
// http://192.168.1.65/Score/getLotteryUserList
export function getLotteryUserList(data = {}) {
  return getAction('/Lottery/getLotteryUserList', data);
}
// http://192.168.1.65/Score/getLotteryList
export function getLotteryList(data = {}) {
  return getAction('/Lottery/getLotteryList', data);
}
