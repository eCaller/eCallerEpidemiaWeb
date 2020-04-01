import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {mapGetters} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import base64 from './base64.js';

import configuracion from './configuracion.js';
import usuario from './usuario.js';
import triage from './triage.js';
import casos from './casos.js';
import centros from './centros.js';
import variables from './variables.js';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ASIGNAR = "ASIGNAR";

export const store = new Vuex.Store({
  namespaced: true,
  state: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
  modules: {
    configuracion: configuracion,
    base64: base64,
    usuario: usuario,
    // servicios: servicios,

    triage: triage,
    casos: casos,
    centros: centros,
    variables: variables,
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  mutations: {
    [LOGIN] (state) {
      state.pending = true;
      state.base64.authdata = null;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) { //TODO
      state.isLoggedIn = false;
      state.usuario.id = null;
      state.usuario.username = null;
      state.usuario.nombre = null;
      state.usuario.imagen = null;
      state.usuario.rol = null;
    },
    [ASIGNAR](state, usuario) {
      state.usuario.id = usuario.id;
      state.usuario.username = usuario.username;
      state.usuario.nombre = usuario.nombre;
      state.usuario.imagen = usuario.imagen;
      state.usuario.rol = usuario.rol;
    },


    changecaso(state, caso) {
      state.casos.caso = caso;
    },



  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },

  },
  actions: {
    login({state, commit}, usuario) {
      localStorage.setItem("token", "Basic " + state.base64.authdata);
      commit(ASIGNAR, usuario);
      commit(LOGIN_SUCCESS);
    },
    logout({commit}) {
      localStorage.removeItem("token");
      localStorage.clear();
      commit(LOGOUT);
    }
  },

});
