import { createRouter, createWebHistory } from 'vue-router'

// 生产模式用 GitHub Pages 子路径，开发模式用根路径
const base = import.meta.env.DEV ? '/' : '/skills-radar/'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/insights', name: 'Insights', component: () => import('../views/Insights.vue') }
]

const router = createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash }
    return { top: 0 }
  }
})

export default router
