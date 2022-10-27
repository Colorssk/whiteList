import Axios from 'axios';
import { message } from 'antd';
import { store } from '@/store';

const instance = Axios.create();
instance.defaults.timeout = 30000;

instance.interceptors.request.use(config => {
  // 自动置入token
  const { user } = store.getState();
  if (user.token) {
    config.headers.Authorization = user.token;
  }

  return config;
}, error => {
  Promise.reject(error);
});

instance.interceptors.response.use(response => {
  switch (response.status) {
  case 200:
    if (response.data.code === 401 && response.config.url !== '/api/auth') {
      message.warn('身份认证已失效，请重新登录');
      break;
    }
    return response.data;
  case 401:
    console.warn('请求失败', response);
    message.warn('身份认证已失效，请重新登录');
    break;
  default:
    message.warn('请求失败');
    console.warn('请求失败', response);
  }

}, error => {
  message.warn('请求失败');
  console.warn('请求失败', error.data);
  Promise.reject(error);
});

export default instance;