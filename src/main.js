import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/address-card';
import 'vue-awesome/icons/hashtag';
import 'vue-awesome/icons/expand';
import App from './App.vue';
import router from './router';

Vue.component('v-icon', Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
