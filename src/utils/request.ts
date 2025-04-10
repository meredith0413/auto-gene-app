import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';

// declare module 'axios' {
//   interface AxiosInstance {
//     (config: AxiosRequestConfig): any,
//   }
// }
// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const { user } = useStore();
    if (user.token) {
      config.headers.Authorization = `${localStorage.get('token')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { code, msg } = response.data;
    // if (code === '000000') {
    //   return response.data;
    // } else {
    //   // 响应数据为二进制流处理(Excel导出)
    //   if (response.data instanceof ArrayBuffer) {
    //     return response;
    //   }
    //
    //   ElMessage({
    //     message: msg || '系统出错',
    //     type: 'error'
    //   });
    //   return Promise.reject(new Error(msg || 'Error'));
    // }
    // if(response.data.code == '401'){
    //   window.location.href = response.data.loginUrl;
    // }
    return response;
  },
  error => {
    const { code, msg } = error.response.data;
    if (code === '401') {
      // token 过期
      alert('token过期了');
      localStorage.clear(); // 清除浏览器全部缓存
      window.location.href = '/'; // 跳转登录页
      ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {});
    } else {

      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      });
    }
    // return Promise.reject(new Error(msg || 'Error'));
  }
);

// 导出 axios 实例
export default service;
