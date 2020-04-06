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
import variablesservice from '@/apis/variablesservice'

export default {
  state: {
    variables: []
  },

  getters: {
    variables (state) {
      return state.variables;
    },

    respuestapositivo: (state) => {
      if (state.variables && state.variables.length>0) {
        return state.variables.find(p => p.nombre==='RESPUESTA_POSITIVO');
      } else {
        return {valor:null};
      }
    },

    respuestanegativo: (state) => {
      if (state.variables && state.variables.length>0) {
        return state.variables.find(p => p.nombre==='RESPUESTA_NEGATIVO');
      } else {
        return {valor:null};
      }
    }
  },
  actions: {
    fetchVariables ({commit}) {
      variablesservice.getVariables()
        .then((respuesta) => {
          commit('setVariables', {variables: respuesta.data})
        })
        .catch((error) => {
          commit('setVariables', {variables: error.data})
        });
    },
    saveVariables (state) {
      return variablesservice.saveVariables({variables: state.getters.variables});
    }
  },
  mutations: {
    setVariables(state, response) {
      state.variables = response.variables;
    },

  }
};
