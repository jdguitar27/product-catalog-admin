import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Dashboard from "../views/Dashboard";
import Products from "../views/Products";
import Categories from "../views/Categories";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (store.getters['auth/loggedIn'])
      next()
    else
      next({name: 'login'})
  } else
    next();
})

export default router
