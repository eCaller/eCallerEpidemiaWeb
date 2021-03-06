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

@author jfpastor@ingenia.es
*/

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import axiosCustom from './axios-custom';
import {mapGetters} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import base64 from './base64.js';

import configuracion from './configuracion.js';
import usuario from './usuario.js';
import triage from './triage.js';
import casos from './casos.js';
import centros from './centros.js';
import variables from './variables.js';
import departamentos from './departamentos.js';
import provincias from './provincias.js';
import municipios from './municipios.js';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ASIGNAR = "ASIGNAR";
const GUARDAR_TOKEN = "GUARDAR_TOKEN";

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
    departamentos: departamentos,
    provincias: provincias,
    municipios: municipios
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  mutations: {
    [LOGIN] (state) {
      state.isLoggedIn = false;
      state.pending = true;
      state.base64.authdata = null;
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    [LOGOUT](state) {
      state.isLoggedIn = false;
      state.usuario.id = null;
      state.usuario.username = null;
      state.usuario.nombre = null;
      state.usuario.imagen = null;
      state.usuario.rol = null;
      state.usuario.token = null;
    },
    [ASIGNAR](state, usuario) {
      state.usuario.id = usuario.id;
      state.usuario.username = usuario.username;
      state.usuario.nombre = usuario.nombre;
      state.usuario.imagen = usuario.imagen;
      state.usuario.rol = usuario.rol;
    },
    [GUARDAR_TOKEN](state, datos) {
      localStorage.setItem("token", datos.token);
      state.usuario.token = datos.token;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },

  },
  actions: {
    login({state, commit}, datos) {
      return new Promise((resolve, reject) => {
        let instance = {
          method: 'POST',
          url: state.configuracion.autenticacion.url,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            username: datos.username, 
            password: datos.password
          }
        };
        axios(instance)
          .then((respuesta) => {
            if (respuesta.status === 200) {
              commit(ASIGNAR, respuesta.data);
              commit(LOGIN_SUCCESS);
              commit(GUARDAR_TOKEN, {token: 'JWT ' + respuesta.data.token})
              resolve(respuesta);
            }
          }).catch((error) => {
            reject('Usuario incorrecto')
          });
      })
    },
    logout({state, commit}) {  
      axiosCustom.axiosJwtToken().get(state.configuracion.autenticacion.urlLogout); 
      commit(LOGOUT);   
      localStorage.clear();
    }
  },

});
