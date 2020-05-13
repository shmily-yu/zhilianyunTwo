import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const host = process.env.VUE_APP_HOST//上线打包的环境变量
const OnLineURL = "http://crm.zjzhilianyun.com/api.php/Main"//上线地址
const URL = host === 'production' ? OnLineURL : "/api";//本地测试和打包切换

const api = {
    //登录
    getLogin(params) {
        return axios.post(`${URL}/login`, qs.stringify(params));
    },
    //获取
    getIndexShow(params) {
        return axios.post(`${URL}/indexshow`, qs.stringify(params));
    },
    //图片
    getPic(params) {
        let headers = { "Content-Type": "multipart/form-data" }
        //上传图片不要用qs
        return axios.post(`${URL}/uploadsimg`, params, headers)
    }
}

export default api;