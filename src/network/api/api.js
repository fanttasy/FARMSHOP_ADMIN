import axios from '../axios/axios'

//登录
const getLogin = (params) => {
  return axios.post('/test.php',params)
}


export {
  getLogin,

}