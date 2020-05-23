import axios from '@/request/http.js'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const host = process.env.VUE_APP_HOST//上线打包的环境变量
const OnLineURL = "http://crm.zjzhilianyun.com/api.php/Main"//上线地址
const URL = host === 'production' ? OnLineURL : "/api";//本地测试和打包切换

const api = {
    //图片
    getPic(params) {
        let headers = { "Content-Type": "multipart/form-data" }
        //上传图片不要用qs
        return axios.post(`${URL}/uploadsimg`, params, headers)
    }
    // 首页信息
    , getHome(params) {
        return axios.post(`${URL}/indexshow`, qs.stringify(params));
    }
    // 资讯类型
    , getNewType(params) {
        return axios.post(`${URL}/newtype`, qs.stringify(params));
    }
    // 资讯列表
    , getListData(params) {
        return axios.post(`${URL}/grtNews`, qs.stringify(params));
    }
    // 新闻详情页
    , getDetailData(params) {
        return axios.post(`${URL}/newsditel`, qs.stringify(params));
    }
    // 注册
    , getSign(params) {
        return axios.post(`${URL}/register`, qs.stringify(params));
    }
    // 获取验证码
    , getPhoneCode(params) {
        return axios.post(`${URL}/registerphonecode`, qs.stringify(params));
    }
    // 登录接口
    , getLogin(params) {
        return axios.post(`${URL}/login`, qs.stringify(params));
    }
    // 修改登录密码
    , getPwd(params) {
        return axios.post(`${URL}/save_pwd`, qs.stringify(params));
    }
    // 我的专属讲师
    , getTeacher(params) {
        return axios.post(`${URL}/myownteacher`, qs.stringify(params));
    }
    // 客户信息
    , getUserInfo(params) {
        return axios.post(`${URL}/userinfo`, qs.stringify(params));
    }
    // 我的推荐
    , getMyInvite(params) {
        return axios.post(`${URL}/myinviter`, qs.stringify(params));
    }
    // 分享
    , getShare(params) {
        return axios.post(`${URL}/sharecode`, qs.stringify(params));
    }
    // 我的信息
    , getMyInfo(params) {
        return axios.post(`${URL}/mypersonalinfo`, qs.stringify(params));
    }
    // 关于我们
    , getAboutUs(params) {
        return axios.post(`${URL}/aboutus`, qs.stringify(params));
    }
    //修改沟通状态
    , getStatus(params) {
        return axios.post(`${URL}/change_status`, qs.stringify(params));
    }
    //搜索
    , getSearch(params) {
        return axios.post(`${URL}/grtNews_search`, qs.stringify(params));
    }
    //公告
    , getNoticeId(params) {
        return axios.post(`${URL}/norcieinfo`, qs.stringify(params));
    }
}
export default api;