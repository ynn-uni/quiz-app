// TODO store 中存储获取token  http://192.168.1.65
// const baseUrl = 'http://47.107.151.209:9801';
const baseUrl = 'http://192.168.1.65:9501';
export async function request(url = '', method = 'GET', data = {},token='') {
	// console.log(token)
  return uni.request({
    url: `${baseUrl}${url}`,
    data,
    header: {
      // token: ''
	  Authorization:token
    },
    method
  });
}

export async function postAction(url, data) {
  return request(url, 'POST', data);
}

export async function getAction(url, data,token) {
	console.log(token)
  return request(url, 'GET', data,token);
}
