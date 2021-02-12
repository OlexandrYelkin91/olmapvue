import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloPage from '../views/HelloPage'
import MapPage from '../views/MapPage'
import TablePage from '../views/TablePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HelloPage',
    component: HelloPage
  },
  {
    path: '/mappage',
    name: 'MapPage',
    component: MapPage
  },
  {
    path: '/tablepage',
    name: 'TablePage',
    component: TablePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
