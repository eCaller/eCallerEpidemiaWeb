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
export default {
  state: {
        id: null,
        username: null,
        nombre: null,
        imagen: null,
        rol: null,
        access_token: null,
        refresh_token: null,
  },
  getters: {
    usuario (state) {
      if (!state.imagen){
        state.imagen = "static/img/avatarx.png";
      } else {
        if (!state.imagen.startsWith("data:image/")) {
          state.imagen = "static/img/avatarx2.png";
        }
      }

      if (!state.rol){
        state.rol = "N";
      }

      return state;
    }
  }
};
