// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import App from './App';
import router from './router';
import { getStore, setStore, removeStore } from './util/util'

Vue.bus = new Vue();
Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});