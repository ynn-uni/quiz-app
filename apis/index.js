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
