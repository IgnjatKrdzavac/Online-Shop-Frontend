import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Products from '@/views/Products.vue';
import SingleItemView from '@/views/SingleItemView.vue';
import  Acc from '@/views/Acc.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/acc',
    name: 'Acc',
    component: Acc
  },
  {
    path: '/singleItem:id',
    name: 'SingleItemView',
    component: SingleItemView
  }

  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
