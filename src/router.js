import { createRouter, createWebHistory } from 'vue-router';

import home from './pages/homePage.vue';
import authentication from './pages/authenticationPage.vue';
import coachRegistration from './pages/coachRegistration.vue';
import contactCoach from './pages/contactCoach.vue';
import requests from './pages/requestsPage.vue';
import coachDetail from './pages/coachDetail.vue';

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    {
      path: '/authentication',
      component: authentication,
      name: 'authentication',
      meta: { requiresUnauth: true },
    },
    {
      path: '/registration',
      component: coachRegistration,
      name: 'registration',
      meta: { requiresAuth: true },
    },
    { path: '/home/:id/contact', component: contactCoach, props: true },
    {
      path: '/requests',
      component: requests,
      meta: { requiresAuth: true },
    },
    { path: '/home/:id/detail', component: coachDetail, props: true },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/authentication');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
