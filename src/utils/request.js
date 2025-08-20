import axios from 'axios';
// import {wechatLogin} from '@/api/login'; // 根据你的项目修改
import {Message} from 'element-ui';
import {getLocal, setLocal} from "@/utils/storage"; // 提示用

let platform = 'web';

let refreshTokenRunning = false;
let requestQueue = [];
console.log(process.env.VUE_APP_BASE_API)
// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API || '/api',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

// 请求拦截器
service.interceptors.request.use(config => {
    const token = getLocal('token') || '';
    config.headers = {
        platform,
        BaUserToken: token,
        'think-lang': 'zh-cn',
        server: true,
        ...config.headers,
    };
    return config;
});

// 响应拦截器
service.interceptors.response.use(
    res => res.data,
    err => {
        Message.error(err.message || '请求失败');
        return Promise.reject(err);
    }
);

// 处理 token 刷新队列
const runQueue = () => {
    const queue = [...requestQueue];
    requestQueue = [];
    queue.forEach(fn => fn());
};

const refreshAndRetry = async () => {
    try {
        // 假设你有 refreshToken 接口
        // const {token} = await wechatLogin(); // 可换成 refreshToken 接口
        let token = '123123'
        setLocal('token', token);
        runQueue();
    } catch (error) {
        requestQueue = []; // 刷新失败清空队列
        throw error;
    } finally {
        refreshTokenRunning = false;
    }
};

const baseRequest = async (url, method, data = {}, config = {}) => {
    const requestConfig = {
        url,
        method,
        ...((method.toLowerCase() === 'get' || method.toLowerCase() === 'delete')
            ? {params: data}
            : {data}),
        ...config,
    };

    try {
        const res = await service(requestConfig);
        if (res.code === 1) {
            return res.data;
        } else if ([303, 402].includes(res.code)) {
            if (!refreshTokenRunning) {
                refreshTokenRunning = true;
                return refreshAndRetry().then(() => baseRequest(url, method, data, config));
            } else {
                return new Promise(resolve => {
                    requestQueue.push(() => resolve(baseRequest(url, method, data, config)));
                });
            }
        } else {
            Message.error(res.msg || '请求失败');
            return Promise.reject(res.msg);
        }
    } catch (err) {
        Message.error(err.message || '请求失败');
        return Promise.reject(err);
    }
};

// 封装请求方法
const request = {};
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach(method => {
    request[method] = (url, data, config) => baseRequest(url, method, data, config);
});

export default request;