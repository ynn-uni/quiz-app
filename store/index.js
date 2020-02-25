import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import challenge from './modules/challenge';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    challenge,
    user
  },
  getters
});

export default store;
