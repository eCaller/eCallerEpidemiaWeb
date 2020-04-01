export default {
  state: {
        id: null,
        username: null,
        nombre: null,
        imagen: null,
        rol: null
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
