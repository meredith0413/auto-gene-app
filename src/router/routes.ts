// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/index.vue'),
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/apiList',
    name: 'apiList',
    component: () => import('@/views/apiManage/index.vue'),
    meta: {
      title: 'Api管理'
    },
    // children: [
    //   // 子模块路由
    //   {
    //     path: 'addApi', // 注意不要以 / 开头
    //     name: 'ChildModule1',
    //     meta: {
    //       title: 'Api新增'
    //     },
    //     component: () => import('@/views/apiManage/addApi/index.vue')
    //   },]
  },
  {
    path: '/tinyMce',
    name: 'tinyMce',
    component: () => import('@/views/tinyMceEditor/index.vue'),
    meta: {
      title: 'tinyMce编辑器'
    }
  },
  {
    path: '/addApi',
    name: 'addApi',
    component: () => import('@/views/apiManage/addApi/index.vue'),
    meta: {
      title: 'api新增'
    }
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404.vue'),
  }
]

export default routes