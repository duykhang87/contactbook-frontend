import { createWebHistory, createRouter } from 'vue-router';

import ContactBook from '../views/ContactBook.vue';
import ContactEdit from '../views/ContactEdit.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import UserProfile from '../views/UserProfile.vue';

import store from '../store';

const routes = [
   {
      path: '/login',
      name: 'Login',
      component: UserLogin
   },
   {
      path: '/register',
      name: 'Register',
      component: UserRegister
   },
   {
      path: '/profile',
      name: 'Profile',
      component: UserProfile
   },
   {
      path: '/',
      alias: '/contactbook',
      name: 'ContactBook',
      component: ContactBook
   },
   {
      path: '/contacts/:id',
      name: 'EditContact',
      component: ContactEdit
   },
   {
      path: '/add',
      name: 'AddContact',
      component: ContactEdit
   }
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
});

router.beforeEach((to, from, next) => {
   const publicPages = ['/login', '/register'];
   const authRequired = !publicPages.includes(to.path);
   const loggedIn = store.getters.userLoggedIn;

   if (authRequired && !loggedIn) {
      next('/login');
   } else {
      next();
   }
});

export default router;