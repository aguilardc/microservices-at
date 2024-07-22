import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'product',
      component: () => import('../views/products/Products.vue')
    },
    {
      path: '/products/add',
      name: 'add-product',
      component: () => import('../views/products/Add.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/orders/List.vue')
    },
    {
      path: '/orders/add',
      name: 'add-order',
      component: () => import('../views/orders/Add.vue')
    },
    {
      path: '/orders/:id',
      name: 'detail-order',
      component: () => import('../views/orders/details.vue')
    }
  ]
})

export default router
