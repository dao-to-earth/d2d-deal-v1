import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '@/views/Home.vue'
import StartDeal from '@/views/StartDeal.vue'
import DealDetail from '@/views/DealDetail.vue'

const routes: any[] = []

routes.push(
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/start-deal',
    name: 'startDeal',
    component: StartDeal
  },
  {
    path: '/proposal/:dealID',
    name: 'proposalDetail',
    component: DealDetail
  },
  {
    path: '/running-deal/:dealID',
    name: 'runningDealDetail',
    component: DealDetail
  },
  {
    path: '/past-deal/:dealID',
    name: 'pastDealDetail',
    component: DealDetail
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
