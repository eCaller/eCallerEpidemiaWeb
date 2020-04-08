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

@author jfpastor@ingenia.es
*/
import usuarioService from '@/apis/usuariosservice'

export default {
  state: {
        id: null,
        username: null,
        nombre: null,
        imagen: null,
        rol: null,
        token: null
  },
  getters: {
    usuario (state) {
      if (!state.imagen){
        state.imagen = "static/img/avatarx.png";
      } else {
        if (state!= null && state.imagen != null /*&& !state.imagen.startsWith("data:image/")*/) {
          state.imagen = "static/img/avatarx2.png";
        }
      }

      if (!state.rol){
        state.rol = "N";
      }

      return state;
    }
  },
  actions: {
    updatePassword ({state}, payload) {
      let usuario = {
        username: state.username,
        password: payload.newPassword
      }
      return new Promise((resolve, reject) => {
        usuarioService.updatePassword(usuario)
          .then((respuesta) => {
            resolve(true)
          })
          .catch((error) => {
            reject(false);
          });
      })
    },
    checkPassword ({state}, payload) {
      return new Promise((resolve, reject) => {
        usuarioService.checkPassword({
          username: state.username,
          password: payload.oldPassword
          }).then((respuesta) => {
            resolve(true)
          }).catch((error) => {
            reject(false)
          })
      })
    }
  }
};
