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
import axios from "axios";
import axiosCustom from "../store/axios-custom";
import qs from "qs";
import conf from '../store/configuracion.js';

export default {
    getCentros() {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.territorios.urlCentros)
              .then((respuesta) => {
                  resolve(respuesta);
              })
              .catch((error) => {
                  reject({data: []})
              });
      });
    },

    getDepartamentos() {
      return new Promise((resolve, reject) => {
        axiosCustom.axiosJwtToken().get(conf.state.territorios.urlDepartamentos)
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
        axiosCustom.axiosJwtToken().get(conf.state.territorios.urlProvincias, {
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
        axiosCustom.axiosJwtToken().get(conf.state.territorios.urlMunicipios, {
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
        axiosCustom.axiosJwtToken().get(conf.state.territorios.urlDistritos, {
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
