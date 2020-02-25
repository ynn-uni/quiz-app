// TODO store 中存储获取token
// const baseUrl = 'http://47.107.151.209:9801';
const baseUrl = 'http://192.168.1.65:9501';

export async function request(url = '', method = 'GET', data = {}) {
  return uni
    .request({
      url: `${baseUrl}${url}`,
      data,
      header: {
        token: ''
      },
      method
    })
    .then(data => {
      const [error, res] = data;
      if (error) {
        console.log(error);
      }
      return res.data;
    });
}

export async function postAction(url, data) {
  return request(url, 'POST', data);
}

export async function getAction(url, data) {
  return request(url, 'GET', data);
}
