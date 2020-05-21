import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/Home.vue'),
    name: 'Home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/home.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/home/my.vue')
      }
    ]
  },
  // 账号登录
  {
    path: '/acc',
    name: 'acc',
    component: () => import('../views/enter/acc.vue')
  },
  // 手机号登录
  {
    path: '/phone',
    name: 'phone',
    component: () => import('../views/enter/phone.vue')
  },
  // 注册
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/enter/signup.vue')
  },
  // 忘记密码1
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/password/forget.vue')
  },
  // 忘记密码2
  {
    path: '/forgetnext',
    name: 'forgetnext',
    component: () => import('../views/password/forget-next.vue')
  },

  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search')
  },
  // 搜索
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/notice/index.vue')
  },
  // 新闻
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news')
  },
  // 新闻内容
  {
    path: '/newsdetail/:id/:createcode/:mobile_phone/',
    name: 'newsdetail',
    component: () => import('../views/news/detail.vue')
  },
  // 我的推荐
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/my/recommend.vue')
  },
  // 客户信息
  {
    path: '/custinfo',
    name: 'custinfo',
    component: () => import('../views/my/custinfo.vue')
  },
  // 专属讲师
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/my/teacher.vue')
  },
  // 分享
  {
    path: '/share',
    name: 'share',
    component: () => import('../views/my/share.vue')
  },
  // 用户信息
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('../views/my/userinfo.vue')
  },
  // 关于我们
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/my/about.vue')
  },
  // 404页面设置
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '*',    // 此处需特别注意至于最底部
    redirect: '/404'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 获取当前的token是否存在
      console.log("token存在");
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // query: { redirect: to.fullPath }
      })
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});

export default router
