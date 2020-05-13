//检测表单是否填写完整
export const hasEmpty = function hasEmpty(obj) {
    let hasEmpty = false;
    for (let key in obj) {
        if (obj[key] === "") {
            hasEmpty = true;
            break;
        }
    }
    return hasEmpty;
}
//时间处理函数
export const getDate = function getDate(data) {
    // 判断下是否为空，否则split会报错
    // if (data) {
    //     if (data instanceof Number) { var ago = new Date(data.split(" ")).getTime(); } else {
    //         ago = data;
    //     }
    // }
    if (data) { var ago = new Date(data.split(" ")).getTime(); }
    let result = '';
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var year = month * 12;
    var now = new Date().getTime();
    var diffValue = now - ago;
    if (diffValue < 0) { return; }
    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (yearC >= 1) {
        result = "" + parseInt(yearC) + "年前";
    }
    else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}
// 正则
const REGEX = {
    phone: /^1([0-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
};
export const validator = function (method, val) {
    return REGEX[method].test(val);
};
