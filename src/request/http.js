import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Toast } from 'vant';

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/acc',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        case 404:
            tip('请求不存在');
            break;
        case 500:
            tip('服务器异常，请重新尝试');
            break;
        default:
            console.log(other);
    }
}

// 创建axios实例
var instance = axios.create({
    timeout: 1000 * 12, withCredentials: true,
    responseType: "json",
    maxContentLength: 2000,
    traditional: true,
    maxRedirects: 5
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
    config => {
        store.commit('showLoading')
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        store.commit('hideLoading')
        return Promise.error(error)
    }

)

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    res => {
        // console.log(res);
        store.commit('hideLoading')
        // 如果返回的状态码为200，说明接口请求成功
        if (res.status === 200) {
            if (res.data.result.Code === '200') {
                res = res.data.result//这里做下处理
                return Promise.resolve(res);//只有成功才有返回，所以在页面不用再做判断处理
            }
            else if (res.data.result.Code === '300') {
                res = res.data.result//这里做下处理
                tip(res.Msg)
            }
            else if (res.data.result.Code === '400') {
                res = res.data.result//这里做下处理
                toLogin()//登录超时 跳去登录页
                tip('请先登录！')
            } else {
                console.log(res);
            }
        } else {
            return Promise.reject(res)
        }
    },

    // 请求失败
    error => {
        store.commit('hideLoading')
        const { resp } = error;
        if (resp) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(resp.status, resp);
            return Promise.reject(resp);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                tip('断网了，请刷新！')
                // store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    });

export default instance;