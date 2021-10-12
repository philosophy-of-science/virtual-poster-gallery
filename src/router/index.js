import Vue from 'vue';
import VueRouter from 'vue-router';
import supabase from '@/db';
import store from '../store';
import Home from '../views/Home.vue';
import Poster from '../views/Poster.vue';
import Auth from '../views/Auth.vue';
import Topic from '../views/Topic.vue';
import Topics from '../views/Topics.vue';

const SubmissionForm = () => import('../views/SubmissionForm.vue');
const Profile = () => import('../views/Profile.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/topic/:topicId',
    name: 'Topic',
    component: Topic,
  },
  {
    path: '/form',
    name: 'SubmissionForm',
    component: SubmissionForm,
    beforeEnter: (to, from, next) => {
      if (!store.state.user) {
        store.dispatch('launchToast', {
          type: 'error',
          show: true,
          content: 'Please sign in first.',
        });
        next('/sign-in');
      } else {
        next();
      }
    },
  },
  {
    path: '/poster/:id',
    name: 'Poster',
    component: Poster,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: Auth,
    props: { type: 'signUp' },
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: Auth,
    props: { type: 'signIn' },
  },
  {
    path: '/reset',
    name: 'reset',
    component: Auth,
    props: { type: 'reset' },
  },
  {
    path: '/new-password',
    name: 'newPassword',
    component: Auth,
    props: { type: 'newPassword' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.state.user) {
        store.dispatch('launchToast', {
          type: 'error',
          show: true,
          content: 'Please sign in first.',
        });
        next('/sign-in');
      } else {
        next();
      }
    },
  },
  {
    path: '/topics',
    name: 'topics',
    component: Topics,
  },
  {
    path: '*',
    name: '404',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (/recovery/.test(to.hash)) {
    const accessToken =
      to.hash.match(/access_token=([^&]+)/) && to.hash.match(/access_token=([^&]+)/)[1];
    if (accessToken) {
      next({ path: '/new-password', query: { accessToken } });
    } else {
      next('/');
    }
  } else if (/signup/.test(to.hash)) {
    supabase.auth.onAuthStateChange(() => {
      const user = supabase.auth.user();
      store.dispatch('setUser', user);
      store.dispatch('launchToast', {
        type: 'success',
        show: true,
        content: "Your email has been confirmed. You're now logged in.",
      });

      next();
    });
  } else {
    next();
  }
});

export default router;
