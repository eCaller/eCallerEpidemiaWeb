import triageservice from '@/apis/triageservice'

export default {
  state: {
    /////////////////////////////////////////////////////////////////////////////////// triage, preguntas y respuestas
    triage: [],

    ////////////////////////////////////////////////////////////////////////////////////////////////////////// Respuestas combinaciones
    casospositivos: [],

  },
  getters: {
    triage: (state) => {
      return state.triage;
    },

    casospositivos: (state) => {
      return state.casospositivos;
    },

    pregunta: (state) => {
      let ls = state.triage;
      let ret= {id: null, codigo:"A", pregunta: null, orden: 1, tipo: "R",  respuestas: null};

      if (ls && ls.length>0) {
        let t = ls[ls.length-1];
        let c= t.codigo.charCodeAt(0); //Siguiente letra del abecedario
        ret.codigo = String.fromCharCode(++c);
        ret.orden = t.orden+1;
      }

      return ret;
    },

    getPregunta: (state) => (idrespuesta) => {
      let ls = state.triage;
      let ret =[];

      for (let i in ls) {
        if (ls[i].respuestas!== null) {
          let lp = ls[i].respuestas.find(p => p.id===idrespuesta);

          if (lp!==undefined && lp!==null) {
            ret.push(ls[i]);
          }
        }
      }
      return ret;
    },

    getPreguntasRespuestas: (state) => {
      let ls = state.triage;
      let ret =[{val: null, label: ''}];

      for (let i in ls) {
        if (ls[i].respuestas!== null) {
          for (let j in ls[i].respuestas) {
            let r = {val: ls[i].respuestas[j].id, label: ls[i].codigo + " - " + ls[i].respuestas[j].codigo};
            ret.push(r);
          }
        }
      }

      return ret;
    },

    maxIdRespuestas: (state) => {
      //Máximo id de respuestas
      let ret = 0;
      let ls = state.triage;
      if (ls) {
        for (let i in ls) {
          if (ls[i].respuestas) {
            for (let j in ls[i].respuestas) {
              if (ls[i].respuestas[j].id>ret) {
                ret = ls[i].respuestas[j].id;
              }
            }
          }
        }
      }

      return ret;
    }

  },

  actions: {
    fetchTriage ({commit}) {
      triageservice.getTriage()
        .then((respuesta) => {
          commit('setTriage', {triage: respuesta.data});

          triageservice.getCombinaciones()
            .then((respuesta) => {
              commit('setCasospositivos', {casospositivos: respuesta.data})
            })
            .catch((error) => {
              commit('setCasospositivos', {casospositivos: error.data})
            });

        })
        .catch((error) => {
          commit('setTriage', {triage: error.data});
        });

    },
    saveTriage (state) {
      //enviamos tanto el triage como el casospositivos, para que se actualice todo en el servidor
      return triageservice.saveTriage({triage: state.getters.triage, casospositivos: state.getters.casospositivos});
    }
  },
  mutations: {
    setTriage(state, response) {
      console.log(response)
      state.triage = response.triage;
    },
    setCasospositivos(state, response) {
      console.log(response)
      state.casospositivos = response.casospositivos;
    },

  }
}
