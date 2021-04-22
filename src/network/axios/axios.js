import axios from 'axios'

if(process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1/farmshop_server'
} else if(process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = 'http://127.0.0.1/farmshop_server'
}

axios.defaults.timeout = 6000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data';

axios.interceptors.request.use(config => {
  let token = window.sessionStorage.getItem('token');
  token && (config.headers['TOKEN'] = token);
  return config;
})

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}