import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/CustomerView.vue')
  },
  {
    path: '/customer/:id',
    name: 'customeredit',
    component: () => import(/* webpackChunkName: "customeredit" */ '../views/CustomerEditView.vue')
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('rutas',from );
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    if (store.state.token !== null && store.state.token !== "") {
      
      if (to.matched.some((record) => record.meta.verificarRol)) {
        console.log('store',store.state );
        if (store.state.rol === to.meta.rol) {
          next();
        } else {
          next({ name: "login" });
        }
      } 
      
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router
