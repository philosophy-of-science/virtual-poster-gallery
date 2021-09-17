import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    toast: {
      type: '',
      show: false,
      content: '',
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    launchToast(state, payload) {
      state.toast = payload;
    },
  },

  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },

    launchToast({ commit }, toast) {
      commit('launchToast', toast);
      setTimeout(() => {
        commit('launchToast', { type: '', show: false, content: '' });
      }, 10000);
    },
  },
});

export default store;
