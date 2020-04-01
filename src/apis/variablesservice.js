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

}
