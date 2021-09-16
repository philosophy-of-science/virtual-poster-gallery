import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/address-card';
import 'vue-awesome/icons/hashtag';
import 'vue-awesome/icons/expand-alt';
import 'vue-awesome/icons/check-circle';
import 'vue-awesome/icons/exclamation-circle';
import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/eye-slash';
import 'vue-awesome/icons/spinner';

import App from './App.vue';
import router from './router';

Vue.component('v-icon', Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
