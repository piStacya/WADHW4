import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import AddPost from '../views/AddPost.vue'
import SinglePost from '../views/SinglePost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/contact',
      name: 'contact',
      // Contact lehe teeme hiljem, praegu kasutame HomeView-d kohahoidjana
      component: HomeView
    },
    {
      path: '/addpost',
      name: 'addpost',
      component: AddPost
    },
    {
      path: '/post/:id', // :id tähendab, et siia tuleb number
      name: 'singlepost',
      component: SinglePost
    }
  ]
})

export default router