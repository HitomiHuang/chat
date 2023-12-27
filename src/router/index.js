import Vue from 'vue'
import VueRouter from 'vue-router'
import MainEntry from '../views/MainEntry.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: MainEntry,
  },
  {
    path: '/chat-room/:name',
    name: 'chat-room',
    component: () => import('../views/ChatRoom.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active'
})

export default router
