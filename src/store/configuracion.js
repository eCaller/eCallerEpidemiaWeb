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
import moment from 'moment';

export default {
  state: {
      general: {
        url: "https://127.0.0.1:8443",
        mapkey: "AIzaSyCMfZc6jsxjU8-tZ3PJp3pNNYAb4wTHNtY",
        center: {lat: -16.2901535, lng: -63.5886536},
        zoom: 5, //4
      },

      autenticacion: {
        url: "https://127.0.0.1:8443/autenticacion/login",
      },

      triage: {
        url: "https://127.0.0.1:8443/triage",
        urlCasospositivos: "https://127.0.0.1:8443/casospositivos"
      },

      variables: {
        url: "https://127.0.0.1:8443/variables"
      },

      territorios: {
        urlDepartamentos: "https://127.0.0.1:8443/departamentos",
        urlProvincias: "https://127.0.0.1:8443/provincias",
        urlMunicipios: "https://127.0.0.1:8443/municipios",
        urlDistritos: "https://127.0.0.1:8443/distritos",
      },

      casos: {
        url: "https://127.0.0.1:8443/caso",
        urlResumen: "https://127.0.0.1:8443/caso/resumen",
        urlResumenFiltro: "https://127.0.0.1:8443/caso/resumenfiltro",
        urlEstadisticas: "https://127.0.0.1:8443/caso/estadisticas",
        urlMapa: "https://127.0.0.1:8443/caso/mapa"
      },

  },

  getters: {
    configuracion (state) {
      return state;
    }
  },

  mutations: {
    formatDate (state, value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? '<span></span>'
        : '<span>'+ moment(value, 'YYYY-MM-DD').format(fmt) + '</span>';
    },
  }

};
