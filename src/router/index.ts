import DefaultLayout from '@/layouts/default-layout.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home-page.vue'),
      meta: { layout: DefaultLayout },
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/auth/login.vue'),
      meta: { layout: DefaultLayout },
   },
   {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/auth/register.vue'),
      meta: { layout: DefaultLayout },
   },
   {
      path: '/books',
      name: 'books',
      component: () => import('@/pages/books.vue'),
      meta: { layout: DefaultLayout, requireAuth: true },
   },
   {
      path: '/books/:id',
      name: 'book-detail',
      component: () => import('@/pages/book-detail.vue'),
      meta: { layout: DefaultLayout, requireAuth: true },
   },
   {
      path: '/borrows',
      name: 'borrows',
      component: () => import('@/pages/borrows.vue'),
      meta: { layout: DefaultLayout, requireAuth: true },
   },
   {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found.vue'),
      meta: { layout: DefaultLayout },
   },
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
})

router.beforeEach((to, from, next) => {
   const { isAuthenticated } = useAuthStore()

   if (to.meta.requireAuth && !isAuthenticated) {
      next({ name: 'login' })
   } else {
      next()
   }
})

export default router
