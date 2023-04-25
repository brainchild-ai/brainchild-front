import { message } from 'antd';
import axios from 'axios';

// 环境变量判断打包方式
const _URLS = {
  dev: 'https://dns.youxinyue.com:5500/',
  test: 'https://dns.youxinyue.com:5500/',
  pre: 'https://dns.youxinyue.com:5500/',
  production: 'https://dns.youxinyue.com:5500/',
  local: 'https://dns.youxinyue.com:5500/',
};
const _baseURL = _URLS[process.env.NODE_ENV];


axios.defaults.withCredentials = true;

const axiosHttp = (options: any, configs?: any) => {
  /**
   * @description: 用来初始化承诺的回调。
   * 这个回调被传递了两个参数：
   * 一个解析回调用一个值或另一个承诺的结果来解析承诺，
   * 以及一个拒绝回调，用来拒绝承诺的原因或错误。
   * @constructor: Promise
   */
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        ...configs.headers,
      },
      baseURL:_baseURL,
    });
    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    // 响应拦截器
    instance.interceptors.response.use(
      response => {
        let data: any;
        if (!response.data.success && response.status !== 200) {
          message.error(response.data.msg || response.data.message);
          throw new Error(response.data.msg);
        }
        if (!response.data && response.status !== 200) {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        return data;
      },
      err => {
        console.info('err', err);
        if (err && err.response) {
          let msg = {
            400: '请求错误 或者 参数错误请求体解析失败',
            401: '未授权，请登录',
            403: '拒绝访问',
            404: `请求地址出错: ${err.response.request.responseURL}`,
            408: '请求超时',
            500: `服务器内部错误: ${err.response.request.responseURL}`,
            501: '服务未实现',
            502: '网关错误',
            503: '服务不可用',
            504: '网关超时',
            505: 'HTTP版本不受支持',
          };
          let status = parseInt(err.response.status, 10);
          message.error(err.response.status + msg[status]);
          if (status === 401) {
            window.location.href = '/login';
          }
          return Promise.reject(err.response.status + msg[status]);
        }
        return Promise.reject(err);
      },
    );
    // 请求
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
};

const get = (url: string, data: any, configs = {}) => {
  return axiosHttp(
    {
      url,
      method: 'get',
      params: data,
    },
    configs,
  );
};
const post = (url: string, data: any, configs = {}) => {
  return axiosHttp(
    {
      url,
      method: 'post',
      data,
    },
    configs,
  );
};
const del = (url: string, data: any, configs = {}) => {
  return axiosHttp(
    {
      url,
      method: 'delete',
      params: data,
    },
    configs,
  );
};
const put = (url: string, data: any, configs = {}) => {
  return axiosHttp(
    {
      url,
      method: 'put',
      data,
    },
    configs,
  );
};

export { get, post, del, put };
