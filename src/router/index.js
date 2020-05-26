import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

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
        component: () => import('../views/home/home.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/home/my.vue'),
        meta: {
          requireAuth: true
        }
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
    path: '/Signup',
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
  // 修改密码1
  {
    path: '/change',
    name: 'change',
    component: () => import('../views/password/change.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 修改密码2
  {
    path: '/changenext',
    name: 'changenext',
    component: () => import('../views/password/change-next.vue'),
    meta: {
      requireAuth: true
    }
  },

  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search'),
    meta: {
      requireAuth: true
    }
  },
  // 公告
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../views/notice/index.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 新闻
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news'),
    meta: {
      requireAuth: true
    }
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
    component: () => import('../views/my/recommend.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 客户信息
  {
    path: '/custinfo',
    name: 'custinfo',
    component: () => import('../views/my/custinfo.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 专属讲师
  {
    path: '/teacher',
    name: 'teacher',
    component: () => import('../views/my/teacher.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 分享
  {
    path: '/share',
    name: 'share',
    component: () => import('../views/my/share.vue'),
    meta: {
      requireAuth: true
    }
  },
  // 用户信息
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('../views/my/userinfo.vue'),
    meta: {
      requireAuth: true
    }
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
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.token) {  // 获取当前的token是否存在
      next();
    } else {
      next({
        path: '/acc', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // query: { redirect: to.fullPath }
      })
    }
  }
  else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});

export default router
