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
