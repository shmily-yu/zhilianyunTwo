const path = require("path");
const theme = path.resolve(__dirname, "src/css/theme.less");
module.exports = {
  // publicPath: '/search/'部署在一个子路径上,
  lintOnSave: false,
  //图标修改
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${theme}";`
        }
      },
      postcss: {
        plugins: [
          //vh适配方案
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 750,
            unitPrecision: 5,
            propList: [
              "*"
            ],
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: ['ex'],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
          })
        ]
      }
    }
  },
  // 命令行输入 spy-debugger 真机模拟测试
  devServer: {
    open: true,
    host: 'localhost',
    // host: '192.168.43.66',//手机打开热点输入这个IP，在同一网络内手机可以访问电脑网址
    port: 8088,
    https: false,
    proxy: {
      '/api': {
        target: 'http://crm.zjzhilianyun.com/api.php/Main',//线上地址
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }

    }
  }
}
//默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
//如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
//例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
