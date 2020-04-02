import axios from "axios";
import qs from "qs";
import conf from '../store/configuracion.js';

export default {

    getDepartamentos() {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.territorios.urlDepartamentos)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    getProvincias(departamentos) {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.territorios.urlProvincias, {
            params: {
              departamentos: departamentos
            },
            paramsSerializer: params => {
              return qs.stringify(params)
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

    getMunicipios(provincias) {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.territorios.urlMunicipios, {
            params: {
              provincias: provincias
            },
            paramsSerializer: params => {
              return qs.stringify(params)
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

    getDistritos(municipios) {
      return new Promise((resolve, reject) => {
        axios.get(conf.state.territorios.urlDistritos, {
            params: {
              municipios: municipios
            },
            paramsSerializer: params => {
              return qs.stringify(params)
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
