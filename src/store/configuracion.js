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
import moment from 'moment';
import config from '../config.js';

export default {
  state: {
      general: {
        url: config.url,
        mapkey: config.googlemapkey,
        center: config.center,
        zoom: config.zoom,
      },

      autenticacion: {
        url: config.url + "/autenticacion/login",
        urlLogout: config.url + "/autenticacion/logout"
      },

      triage: {
        url: config.url + "/triage",
        urlCasospositivos: config.url + "/casospositivos",
        urlcaso: config.url + "/triage/caso",
      },

      variables: {
        url: config.url + "/variables"
      },

      territorios: {
        urlCentros: config.url + "/centros",
        urlDepartamentos: config.url + "/departamentos",
        urlProvincias: config.url + "/provincias",
        urlMunicipios: config.url + "/municipios",
        urlDistritos: config.url + "/distritos",
      },

      casos: {
        url: config.url + "/caso",
        urlContadores: config.url + "/casos/contadores",
        urlResumen: config.url + "/casos/resumen",
        urlResumenFiltro: config.url + "/casos/resumenfiltro",
        urlEstadisticas: config.url + "/casos/estadisticas",
        urlMapa: config.url + "/casos/mapa"
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
