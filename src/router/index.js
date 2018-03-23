import Vue from 'vue';
import Router from 'vue-router';
// import Portait from '@/pages/portait';
import App from '../App.vue'

Vue.use(Router);

const Home = r => require.ensure([], () => r(require('../pages/home.vue')), 'home')

const routes = [{
    path: '/',
    name: 'home',
    component: Home
}];


export default new Router({
    routes: routes,
    base: __dirname
});