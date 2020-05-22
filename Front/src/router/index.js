import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: "/mapa",
    name: "Mapa",
    component: () => import("../views/Mapa.vue")
  },
  {
    path: "/productos",
    name: "Productos",
    component: () => import("../views/Productos.vue")
  },
  {
    path: "/detalle/:id",
    name: "Detalle",
    component: () => import("../views/Detalle.vue")
  },
  {
    path: "/list",
    name: "List",
    component: () => import("../views/List.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
