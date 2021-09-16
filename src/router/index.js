import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Form from '../views/Form.vue';
import Admin from '../views/Admin.vue';
import Poster from '../views/Poster.vue';
import Auth from '../views/Auth.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/form',
    name: 'Form',
    component: Form,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
