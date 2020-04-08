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
import axiosCustom from "../store/axios-custom";
import conf from '../store/configuracion.js';

export default {
  updatePassword(usuario) {
    return new Promise((resolve, reject) => {
      axiosCustom.axiosJwtToken().post(conf.state.configuracionUsuario.url, usuario, {
            headers: {
              "Content-Type": 'application/json'
            }
        }).then((respuesta) => {
          if (respuesta.status === 200) {
            resolve(true);
          } else {
            reject(false)
          }
        }).catch((error) => {
          reject(false)
        });
    });
  },
  checkPassword(usuario) {
    return new Promise((resolve, reject) => {
      axiosCustom.axiosJwtToken().post(conf.state.configuracionUsuario.urlCheck, usuario)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            resolve(true)
          } else {
            reject(false)
          }
        })
        .catch((error) => {
          reject(false);
        })
      })
  }
}
