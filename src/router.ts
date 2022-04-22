import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '@/views/Home.vue'

const routes: any[] = []

routes.push(
  {
    path: '/',
    name: 'home',
    component: Home
  }
)

routes.push({
  path: '/pathMatch(.*)',
  name: 'error-404',
  redirect: '/'
})

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.params.retainScrollPosition) return {}
    if (to.hash) {
      const position = { selector: to.hash }
      return {
        el: position,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router
