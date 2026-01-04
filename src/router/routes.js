const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
      { path: 'dashboard', component: () => import('pages/UserDashboard.vue'), meta: { requiresAuth: true } },
      { path: 'book', component: () => import('pages/BookingPage.vue'), meta: { requiresAuth: true } },
      { path: 'admin', component: () => import('pages/AdminDashboard.vue'), meta: { requiresAuth: true } },
      { path: 'services', component: () => import('pages/ServicesPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'contact', component: () => import('pages/ContactPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
