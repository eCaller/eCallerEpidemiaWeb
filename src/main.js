/*
Copyright 2020, Ingenia, S.A.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
*/
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import {store} from './store/store.js';
import {routes} from './routes.js';
import * as VueGoogleMaps from 'vue2-google-maps';
import conf from './store/configuracion.js';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: conf.state.general.mapkey,
    libraries: 'places,visualization'
  }
});

const router = new VueRouter({
  //mode: 'history',
  base: '/trasladosWeb', //TODO Esto no es correcto hacerlo así, hay que ver cómo hacerlo de forma dinámica
  routes: routes
});

/* eslint-disable no-new */
var principal = new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
})
