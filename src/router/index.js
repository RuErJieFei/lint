import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import HMM from '@/views/HMM'
import JS from '@/views/JS'
import YY from '@/views/YY'
import ZMW from '@/views/ZMW'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/yy',
        name: 'YY',
        component: YY
      },
      {
        path: '/js',
        name: 'js',
        component: JS
      },
      {
        path: '/zmw',
        name: 'ZMW',
        component: ZMW
      },
      {
        path: '/hmm',
        name: 'HMM',
        component: HMM
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
