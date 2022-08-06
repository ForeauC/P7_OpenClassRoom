import { createRouter, createWebHistory } from 'vue-router'
import Connect from '../views/Connect.vue'

const routes = [
  {
    path: '/',
    name: 'Connect',
    component: Connect
  },
  {
    path: '/NewPublication',
    name: 'NewPublication',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewPublication.vue')
  },
  {
    path: '/Profil',
    name: 'Profil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profil.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
