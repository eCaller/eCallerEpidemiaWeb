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
