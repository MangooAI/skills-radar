import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/radar', name: 'Radar', component: () => import('../views/Radar.vue') },
  { path: '/categories', name: 'Categories', component: () => import('../views/Categories.vue') },
  { path: '/category/:id', name: 'CategoryDetail', component: () => import('../views/CategoryDetail.vue') },
  { path: '/tech/:id', name: 'TechDetail', component: () => import('../views/TechDetail.vue') },
  { path: '/docs/:path(.*)', name: 'DocsViewer', component: () => import('../views/DocsViewer.vue') }
]

const router = createRouter({
  // 开发模式用根路径，生产模式用 GitHub Pages 路径
  history: createWebHistory(import.meta.env.DEV ? '/' : '/skills-radar/'),
  routes,
  // 每次路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），则恢复
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0 }
  }
})

export default router