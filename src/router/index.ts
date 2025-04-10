// src/router/index.ts
import { createRouter, createWebHistory, type Router } from 'vue-router'
import routes from './routes'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 路由守卫示例
router.beforeEach((to, from) => {
  // 修改页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} | 我的应用`
  }
  
  // 认证检查示例
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return { name: 'Login' }
  }
})

export default router