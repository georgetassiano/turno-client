import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'baseLayout',
      component: () => import('@/layouts/LayoutDefault.vue'),
      meta: {
        auth: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomePage.vue')
        },
        {
          path: 'expenses',
          name: 'expenses',
          component: () => import('@/views/expenses/ExpensePage.vue')
        },
        {
          path: 'expenses/new',
          name: 'expenses-new',
          component: () => import('@/views/expenses/CreateExpensePage.vue')
        },
        {
          path: 'checks',
          name: 'checks',
          component: () => import('@/views/checks/CheckPage.vue')
        },
        {
          path: 'checks/new',
          name: 'checks-new',
          component: () => import('@/views/checks/CreateCheckPage.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterPage.vue')
    }
  ]
})

export default router
