import axios from "axios";
import conf from '../store/configuracion.js';

export default {
    getTriage() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.triage.url)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    getCombinaciones() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.triage.urlCasospositivos)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    saveTriage(triage) {
      return new Promise((resolve, reject) => {
        axios.post(conf.state.triage.url, triage, {
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
