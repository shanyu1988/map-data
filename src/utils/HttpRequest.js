import Vue from 'vue'
import axios from 'axios'




//应用 HTTP 请求地址处理
const httpRequestUrl = ' http://39.104.61.91:8020/';

const http = axios.create({
    timeout: 1000 * 30,//超时设置
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
    return config
}, error => {
    return Promise.reject(error)
});
/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
});

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = false) => {
    var defaults = {
        'aceTimestamp': new Date().getTime()
    };
    return openDefultParams ? merge(defaults, params) : params
};

http.adornData = (data = {}, openDefultdata = false, contentType = 'json') => {
    var defaults = {
        'aceTimestamp': new Date().getTime()
    };
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
};


//自定义地址装饰方法  参考
http.adornAppRequestUrl = (actionName) => {
    return httpRequestUrl  + actionName
};


export default http
