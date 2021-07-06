import axios from "axios";
import { Toast } from "vant";
import { validateTokenUrls } from 'network/url'

export const request = (config) => {
    const instance = axios.create({
        baseURL: "http://www.kangliuyong.com:10002",
        timeout: 5000,
        params: {
            appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
            tokenString: sessionStorage.getItem('token')
        },

    });
    //请求拦截器
    instance.interceptors.request.use(config => {
        //发送请求前
        //对数据处理
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
        let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';
        let token = sessionStorage.getItem('token');
        if (config.method === 'post') {
            // console.log(config.data);
            //进行post请求参数序列化
            config.params.data = config.params.data || {};
            let dataString = '';
            for (let key in config.params.data) {
                dataString += `${key}=${config.params.data[key]}&`
            }

            config.data = dataString + 'appkey=' + appkey;
            //找到则需要验证token
            if (validateTokenUrls.indexOf(config.url) > -1) {
                config.data += `&tokenString=${token}`;
            }

        } else if (config.method === 'get') {
            //找到则需要验证token
            if (validateTokenUrls.indexOf(config.url) > -1) {
                config.params.tokenString = token;
            }
        }
        return config;

    }, error => {
        //关闭加载提示
        Toast.clear();
        //对错误处理
        return Promise.reject(error);
    });
    //响应拦截器
    instance.interceptors.request.use(response => {

        setTimeout(() => {
                Toast.clear();

            }, 0)
            //关闭加载提示
            //对响应数据处理
        return response;
    }, error => {
        // 对响应错误做点什么
        Toast.clear();
        return Promise.reject(error);
    });

    return instance(config)

};