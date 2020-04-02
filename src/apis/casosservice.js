import axios from "axios";
import conf from '../store/configuracion.js';

export default {
    getResumen() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.casos.urlResumen)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    getEstadisticas() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.casos.urlEstadisticas)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    getCasosMapa() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.casos.urlMapa)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

}
