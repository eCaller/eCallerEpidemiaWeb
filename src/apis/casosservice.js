/*
Copyright 2020, Ingenia, S.A.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
*/
import axiosCustom from '../store/axios-custom'
import qs from "qs";
import conf from '../store/configuracion.js';

export default {
    getCaso(id) {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.casos.url + "/" + id)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject(error)
              });
      });
    },

    getTriagecaso(id) {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.triage.urlcaso + "/" + id)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject(error)
              });
      });
    },

    saveCaso(caso) {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().put(conf.state.casos.url, caso, {
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

    getContadoresCaso() {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.casos.urlContadores)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    /////////////////////////////////////////////////////////////////////////

    getResumen(estados, tipo, lista) {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.casos.urlResumen, {
            params: {
              estados: estados,
              tipo: tipo,
              lista: lista
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

    getEstadisticas(acumulado, estados, tipo, lista) {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.casos.urlEstadisticas, {
            params: {
              acumulado: acumulado,
              estados: estados,
              tipo: tipo,
              lista: lista
            },
            paramsSerializer: params => {
              return qs.stringify(params)
            }
          })
          .then((respuesta) => {
              resolve(respuesta);
          })
          .catch((error) => {
            console.error(error);
              reject({data: []})
          });
      });
    },

    getCasosMapa(estados, tipo, lista) {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.casos.urlMapa, {
            params: {
              estados: estados,
              tipo: tipo,
              lista: lista
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
