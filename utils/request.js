// TODO store 中存储获取token
const baseUrl = 'http://47.107.151.209:9801';

export async function request(url = '', method = 'GET', data = {}) {
  return uni.request({
    url: `${baseUrl}${url}`,
    data,
    header: {
      token: ''
    },
    method
  });
}

export async function postAction(url, data) {
  return request(url, 'POST', data);
}

export async function getAction(url, data) {
  return request(url, 'GET', data);
}
