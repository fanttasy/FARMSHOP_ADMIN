import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:80";
axios.defaults.timeout = 60000;
axios.defaults.header = {'Content-Type': 'application/x-www-form-urlencoded'}

export default axios;