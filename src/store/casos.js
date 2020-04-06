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
import casosservice from '@/apis/casosservice'

export default {
  state: {
    /////////////////////////////////////////////////////////////////////////////////// caso
    caso: null,

    //Triage del caso
    triagecaso: null,

    //Filtros de las listas
    filtroslistas: {estados:"cita"},
    tipolistas:'C',

    //Resumen estadísticas
    resumen: [
      {id:1, nombre:'Sospechosos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:2, nombre:'Confirmados', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:3, nombre:'Activos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:4, nombre:'Recuperados', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:5, nombre:'Decesos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
    ],

    //Resumen filtros
    resumenfiltro: [
      {id:1, nombre:'Sospechosos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:2, nombre:'Confirmados', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:3, nombre:'Activos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:4, nombre:'Recuperados', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      {id:5, nombre:'Decesos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
    ],

    //Estadísticas datos
    estadisticas: {
      sospechosos: [],
      confirmados: [],
      activos: [],
      recuperados: [],
      decesos: []
    },

    //Estadísticas mapas
    casosmapa: [],

  },
  getters: {
    caso (state) {
      return state.caso;
    },

    triagecaso (state) {
      return state.triagecaso;
    },

    filtroslistas (state) {
      return state.filtroslistas;
    },

    tipolistas (state) {
      return state.tipolistas;
    },

    resumen (state) {
      return state.resumen;
    },

    resumenfiltro (state) {
      return state.resumenfiltro;
    },

    estadisticas (state) {
      return state.estadisticas;
    },

    casosmapa (state) {
      return state.casosmapa;
    },
  },
  actions: {
    fetchCaso ({commit}, id) {
      return casosservice.getCaso(id);
    },

    fetchContadoresCaso ({commit}) {
      return casosservice.getContadoresCaso();
    },

    changecaso({state, commit}, caso) {
      commit('setCaso', {caso: caso})
    },

    saveCaso({state, commit}) {
      return casosservice.saveCaso(state.caso);
    },

    fetchTriageCaso({commit}, id) {
      casosservice.getTriagecaso(id)
        .then((respuesta) => {
          commit('setTriagecaso', {triagecaso: respuesta.data})
        })
        .catch((error) => {
          commit('setTriagecaso', {triagecaso: error.data})
        });
    },

    fetchResumen ({commit}) {
      casosservice.getResumen()
        .then((respuesta) => {
          commit('setResumen', {resumen: respuesta.data})
        })
        .catch((error) => {
          commit('setResumen', {resumen: error.data})
        });
    },
    fetchEstadisticas ({commit}) {
      casosservice.getEstadisticas()
        .then((respuesta) => {
          commit('setEstadisticas', {estadisticas: respuesta.data})
        })
        .catch((error) => {
          commit('setEstadisticas', {estadisticas: error.data})
        });
    },
    fetchCasosMapa ({commit}) {
      casosservice.getCasosMapa()
        .then((respuesta) => {
          commit('setCasosmapa', {casosmapa: respuesta.data})
        })
        .catch((error) => {
          commit('setCasosmapa', {casosmapa: error.data})
        });
    },

  },
  mutations: {
    setCaso(state, response) {
      state.caso = response.caso;
    },
    setTriagecaso(state, response) {
      state.triagecaso = response.triagecaso.data;
    },
    setFiltroslistas(state, response) {
      state.filtroslistas = response;
    },
    setTipolistas(state, response) {
      state.tipolistas = response;
    },
    setResumen(state, response) {
      if (response.resumen) {
        let resumenr = response.resumen;

        let sospechosos = state.resumen.find(i => i.id===1);
        sospechosos.value = resumenr.sospechosos.value;
        sospechosos.percent = resumenr.sospechosos.percent?parseInt(resumenr.sospechosos.percent):0;
        let estado = resumenr.sospechosos.estado;
        sospechosos.clase=(estado===1?"t-danger":(estado===-1?"t-success":"t-warning"));
        sospechosos.flecha=(estado===1?"fa fa-arrow-up fa-fw t-danger":"fa fa-arrow-down fa-fw t-success");

        let confirmados = state.resumen.find(i => i.id===2);
        confirmados.value = resumenr.confirmados.value;
        confirmados.percent = resumenr.confirmados.percent?parseInt(resumenr.confirmados.percent):0;
        estado = resumenr.confirmados.estado;
        confirmados.clase=(estado===1?"t-danger":(estado===-1?"t-success":"t-warning"));
        confirmados.flecha=(estado===1?"fa fa-arrow-up fa-fw t-danger":"fa fa-arrow-down fa-fw t-success");

        let activos = state.resumen.find(i => i.id===3);
        activos.value = resumenr.activos.value;
        activos.percent = resumenr.activos.percent?parseInt(resumenr.activos.percent):0;
        estado = resumenr.activos.estado;
        activos.clase=(estado===1?"t-danger":(estado===-1?"t-success":"t-warning"));
        activos.flecha=(estado===1?"fa fa-arrow-up fa-fw t-danger":"fa fa-arrow-down fa-fw t-success");

        let recuperados = state.resumen.find(i => i.id===4);
        recuperados.value = resumenr.recuperados.value;
        recuperados.percent = resumenr.recuperados.percent?parseInt(resumenr.recuperados.percent):0;
        estado = resumenr.recuperados.estado;
        recuperados.clase=(estado===1?"t-danger":(estado===-1?"t-success":"t-warning"));
        recuperados.flecha=(estado===1?"fa fa-arrow-up fa-fw t-danger":"fa fa-arrow-down fa-fw t-success");

        let decesos = state.resumen.find(i => i.id===5);
        decesos.value = resumenr.decesos.value;
        decesos.percent = resumenr.decesos.percent?parseInt(resumenr.decesos.percent):0;
        estado = resumenr.decesos.estado;
        decesos.clase=(estado===1?"t-danger":(estado===-1?"t-success":"t-warning"));
        decesos.flecha=(estado===1?"fa fa-arrow-up fa-fw t-danger":"fa fa-arrow-down fa-fw t-success");

      } else {

        let sospechosos = state.resumen.find(i => i.id===1);
        sospechosos = {id:1, nombre:'Sospechosos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true};

        let confirmados = state.resumen.find(i => i.id===2);
        confirmados = {id:2, nombre:'Confirmados', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true};

        let activos = state.resumen.find(i => i.id===3);
        activos = {id:3, nombre:'Activos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true};

        let recuperados = state.resumen.find(i => i.id===4);
        recuperados = {id:4, nombre:'Recuperados', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true};

        let decesos = state.resumen.find(i => i.id===5);
        decesos = {id:5, nombre:'Decesos', value: 0, percent: 0, clase: "t-success", flecha: "fa fa-arrow-down fa-fw t-success", select: true};

      }

      //al principio el resumenfiltro será igual al completo
      state.resumenfiltro = state.resumen;
    },

    setEstadisticas(state, response) {
      state.estadisticas = response.estadisticas;
    },

    setCasosmapa(state, response) {
      state.casosmapa = response.casosmapa;
    },

  }
}
