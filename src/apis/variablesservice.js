import axios from "axios";
import conf from '../store/configuracion.js';

export default {
    getVariables() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.variables.url)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    saveVariables(variables) {
      return new Promise((resolve, reject) => {
        axios.put(conf.state.variables.url, variables, {
              headers: {
              "Content-Type": 'application/json'
            }
          })
          .then((respuesta) => {
              resolve(respuesta);
          })
          .catch((error) => {
              reject({data: []})
          });
      });
    },
}
