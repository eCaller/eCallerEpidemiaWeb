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
import territoriosservice from '@/apis/territoriosservice'

export default {
  state: {
    municipios: []
  },

  getters: {
    municipios (state) {
      return state.municipios;
    },

  },
  actions: {
    fetchMunicipios({commit}, provincias) {
      territoriosservice.getMunicipios(provincias)
        .then((respuesta) => {
          commit('setMunicipios', {municipios: respuesta.data})
        })
        .catch((error) => {
          commit('setMunicipios', {municipios: error.data})
        });
    },
    reloadMunicipios ({commit}, municipios) {
      commit('setMunicipios', {municipios: municipios})
    },
  },
  mutations: {
    setMunicipios(state, response) {
      state.municipios = response.municipios;
    },

  }
};
