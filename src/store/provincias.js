import territoriosservice from '@/apis/territoriosservice'

export default {
  state: {
    provincias: []
  },

  getters: {
    provincias (state) {
      return state.provincias;
    },

  },
  actions: {
    fetchProvincias ({commit}, departamentos) {
      territoriosservice.getProvincias(departamentos)
        .then((respuesta) => {
          commit('setProvincias', {provincias: respuesta.data})
        })
        .catch((error) => {
          commit('setProvincias', {provincias: error.data})
        });
    },
    reloadProvincias ({commit}, provincias) {
      commit('setProvincias', {provincias: provincias})
    },
  },
  mutations: {
    setProvincias(state, response) {
      state.provincias = response.provincias;
    },

  }
};
