import moment from 'moment';

export default {
  state: {
      autenticacion: {
        url: "https://127.0.0.1:8443/autenticacion/login",
      },
      general: {
        url: "https://127.0.0.1:8443",
        mapkey: "AIzaSyCMfZc6jsxjU8-tZ3PJp3pNNYAb4wTHNtY",
      },

      triage: {
        url: "https://127.0.0.1:8443/triage",
        urlCasospositivos: "https://127.0.0.1:8443/casospositivos"
      },
      variables: {
        url: "https://127.0.0.1:8443/variables",
      },

      listados: {
        urlCasos: "https://127.0.0.1:8443/casos",
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
