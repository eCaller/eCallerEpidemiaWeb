export default {
  state: {
    centro: {
        id: null,
        nombre: null,
        lat: null,
        lng: null
    },
    centros: [
      {id: 1, nombre: "Centro 1"},
      {id: 2, nombre: "Centro 2"}
    ]
  },
  getters: {
    centro (state) {
      return state.centro;
    },
    centros (state) {
      return state.centros;
    },
  }
};
