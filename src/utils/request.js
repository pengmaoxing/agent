import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

//export const url = "http://47.104.225.200:80";
// export const url = "http://yunqufu.yunqufu.com";
const {BASEURL, API} = process.env
 export const url = `${BASEURL}${API}`
console.log(process.env.BASEURL)
// export const url = "http://127.0.0.1";

const instance = axios.create({
  baseURL: url,
  timeout: 60000,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  if (sessionStorage.token) {
    config.headers['authorized'] = sessionStorage.token
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
});


// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对返回的数据进行预处理
  if (response.headers.accesstoken) {
    sessionStorage.token = response.headers.authorized
  }
  const res = response.data;

  //下载文件
  //下载文件
  if (response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8') {
    return res
  }

  if (res.code !== 200) {
    if (res.code === 401 || res.code === 422) {
      MessageBox.alert('您尚未登录', '', {
        confirmButtonText: '前往登录',
        callback: action => {
          sessionStorage.clear();
          location.reload()
        }
      })
    } else {
      Message({
        type: 'error',
        message: res.msg
      })
    }
    // 返回 resolved 或者 rejected状态，供后续操作
    return Promise.reject(new Error('error'))
  } else {
    return res
  }
}, error => {
  // 响应错误
  console.log(error);

  if (error.message === 'Network Error') {
    error.message = '网络错误'
  }

  Message({
    message: error.message,
    type: 'error'
  });

  return Promise.reject(error)
});


export default instance
