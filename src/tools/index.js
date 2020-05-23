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
export const reg = {
    phone: /^1([0-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
};


//压缩图片
export const compressImage = function compressImage(file) {
    if (file.size > 1024 * 30) {
        return new Promise((resolve, reject) => {
            // 获取图片（加载图片是为了获取图片的宽高）
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onerror = error => reject(error);
            img.onload = () => {
                // 画布宽高
                const canvasWidth =
                    document.documentElement.clientWidth * window.devicePixelRatio;
                const canvasHeight =
                    document.documentElement.clientHeight * window.devicePixelRatio;

                // 计算缩放因子
                // 这里我取水平和垂直方向缩放因子较大的作为缩放因子，这样可以保证图片内容全部可见
                const scaleX = canvasWidth / img.width;
                const scaleY = canvasHeight / img.height;
                // const scale = Math.min(scaleX, scaleY);//选这种可能会有黑色区域，但可以保证图片内容全部可见
                const scale = Math.max(scaleX, scaleY); //选这种图片内容可能不完整，但不会有黑色区域，图片是充满的

                // 将原始图片按缩放因子缩放后，绘制到画布上
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                const imageWidth = img.width * scale;
                const imageHeight = img.height * scale;
                const dx = (canvasWidth - imageWidth) / 2;
                const dy = (canvasHeight - imageHeight) / 2;
                ctx.drawImage(img, dx, dy, imageWidth, imageHeight);
                // 导出新图片
                // 指定图片 MIME 类型为 'image/jpeg', 通过 quality 控制导出的图片质量，进行实现图片的压缩
                const quality = 0.1;
                canvas.toBlob(file => resolve(file), "image/jpeg", quality); //压缩返回bolb文件
            };
        });
    } else {
        return file; //不用压缩则直接返回file文件
    }
}

// 将图片转为base64格式
export const img2base64 = function img2base64(url, crossOrigin) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            const c = document.createElement("canvas");
            c.width = img.naturalWidth;
            c.height = img.naturalHeight;
            const cxt = c.getContext("2d");
            cxt.drawImage(img, 0, 0);
            // 得到图片的base64编码数据
            resolve(c.toDataURL("image/png"));
        };
        // 结合合适的CORS响应头，实现在画布中使用跨域<img>元素的图像
        crossOrigin && img.setAttribute("crossOrigin", crossOrigin);
        img.src = url;
    });
}

