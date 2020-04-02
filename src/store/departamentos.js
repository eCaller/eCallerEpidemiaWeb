import territoriosservice from '@/apis/territoriosservice'

export default {
  state: {
    departamentos: []
  },

  getters: {
    departamentos (state) {
      return state.departamentos;
    },

  },
  actions: {
    fetchDepartamentos ({commit}) {
      territoriosservice.getDepartamentos()
        .then((respuesta) => {
          commit('setDepartamentos', {departamentos: respuesta.data})
        })
        .catch((error) => {
          commit('setDepartamentos', {departamentos: error.data})
        });
    },
  },
  mutations: {
    setDepartamentos(state, response) {
      state.departamentos = response.departamentos;
    },

  }
};
