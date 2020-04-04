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
        url: "https://localhost:8443",
        mapkey: "",
        center: {lat: -16.2901535, lng: -63.5886536},
        zoom: 5, //4
      },

      autenticacion: {
        url: "https://localhost:8443/autenticacion/login",
      },

      triage: {
        url: "https://localhost:8443/triage",
        urlCasospositivos: "https://localhost:8443/casospositivos"
      },

      variables: {
        url: "https://localhost:8443/variables"
      },

      territorios: {
        urlDepartamentos: "https://localhost:8443/departamentos",
        urlProvincias: "https://localhost:8443/provincias",
        urlMunicipios: "https://localhost:8443/municipios",
        urlDistritos: "https://localhost:8443/distritos",
      },

      casos: {
        url: "https://localhost:8443/caso",
        urlResumen: "https://localhost:8443/caso/resumen",
        urlResumenFiltro: "https://localhost:8443/caso/resumenfiltro",
        urlEstadisticas: "https://localhost:8443/caso/estadisticas",
        urlMapa: "https://localhost:8443/caso/mapa"
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
