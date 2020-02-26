const baseUrl = 'http://192.168.1.65:9501';
export async function request(url = '', method = 'GET', data = {}, token = '') {
  return uni
    .request({
      url: `${baseUrl}${url}`,
      data,
      header: {
        Authorization: token
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

export async function getAction(url, data, token) {
  return request(url, 'GET', data, token);
}
