export default {
  state: {
    /////////////////////////////////////////////////////////////////////////////////// caso
    caso: null,

    /////////////////////////////////////////////////////////////////////////////////// casos
    casos: [
      {
        id: 1, fecha: "2020/03/27 14:00:00", codigo: "00001/20",
        nombre: "Juan Nadie",
        direccion: "Av. José Ortega y Gasset, s/n, Málaga", lat: 36.681819, lng: -4.470394,
        telefono: "987654321", email: "jnadie@email.com", edad: 32, dni: "123456789F",
        observaciones: null,
        estado: "CO",
        estados: [
          {id:1, estado:"PC", fecha: "2020/03/27 14:00:00"},
          {id:2, estado:"CO", fecha: "2020/03/27 14:40:00"},
        ],
        resultadotest: null, resultado: null,
        cita: {id:1, fecha: "2020/03/29", hora:"14:00", tipo: "C", idcentro: null, comentario:null},
        respuestas: [
          {id:1, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:3, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:5, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:8, codigo:"2", respuesta: "No", orden: 2, valor:"false"},
          {id:12, codigo:"1", respuesta: "Diabetes", orden: 1, valor:"false"},
        ]
      },
      {
        id: 2, fecha: "2020/03/27 14:30:00", codigo: "00002/20",
        nombre: "Juan Otro",
        direccion: "Av. José Ortega y Gasset, 5, Málaga", lat: 36.683, lng: -4.478,
        telefono: "987654321", email: "jotro@email.com", edad: 32, dni: "123456789F",
        observaciones: null,
        estado: "PC",
        estados: [
          {id:21, estado:"PC", fecha: "2020/03/27 14:30:00"},
        ],
        resultadotest: null, resultado: null,
        cita: {id:2, fecha: "2020/03/29", hora:"14:10", tipo: "C", idcentro: null, comentario:null},
        respuestas: [
          {id:1, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:3, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:5, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:8, codigo:"2", respuesta: "No", orden: 2, valor:"false"},
          {id:12, codigo:"1", respuesta: "Diabetes", orden: 1, valor:"false"},
          {id:16, codigo:"5", respuesta: "Enfermedad renal crónica", orden: 5, valor:"false"},
        ]
      },

      {
        id: 3, fecha: "2020/03/28 14:30:00", codigo: "00003/20",
        nombre: "Ana Otra",
        direccion: "Av. Ancha, 15, Málaga", lat: 36.687, lng: -4.480,
        telefono: "987654321", email: "aotra@email.com", edad: 23, dni: "123456789F",
        observaciones: null,
        estado: "PT",
        estados: [
          {id:31, estado:"PC", fecha: "2020/03/28 14:00:00"},
          {id:32, estado:"CO", fecha: "2020/03/28 14:40:00"},
          {id:33, estado:"PT", fecha: "2020/03/28 14:45:00"},
        ],
        resultadotest: null, resultado: null,
        cita: {id:2, fecha: "2020/03/29", hora:"14:10", tipo: "C", idcentro: null, comentario:null},
        respuestas: [
          {id:1, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:3, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:5, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:8, codigo:"2", respuesta: "No", orden: 2, valor:"false"},
          {id:12, codigo:"1", respuesta: "Diabetes", orden: 1, valor:"false"},
          {id:16, codigo:"5", respuesta: "Enfermedad renal crónica", orden: 5, valor:"false"},
        ]
      },

      {
        id: 4, fecha: "2020/03/29 14:30:00", codigo: "00004/20",
        nombre: "Sara Nadie",
        direccion: "Av. Santurce, 5, Málaga", lat: 36.690, lng: -4.485,
        telefono: "987654321", email: "snadie@email.com", edad: 57, dni: "123456789F",
        observaciones: null,
        estado: "PR",
        estados: [
          {id:41, estado:"PC", fecha: "2020/03/29 14:00:00"},
          {id:42, estado:"CO", fecha: "2020/03/29 14:40:00"},
          {id:43, estado:"PT", fecha: "2020/03/29 14:45:00"},
          {id:44, estado:"PR", fecha: "2020/03/29 14:50:00"},
        ],
        resultadotest: null, resultado: null,
        cita: {id:2, fecha: "2020/03/29", hora:"14:10", tipo: "C", idcentro: null, comentario:null},
        respuestas: [
          {id:1, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:3, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:5, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:8, codigo:"2", respuesta: "No", orden: 2, valor:"false"},
          {id:12, codigo:"1", respuesta: "Diabetes", orden: 1, valor:"false"},
          {id:16, codigo:"5", respuesta: "Enfermedad renal crónica", orden: 5, valor:"false"},
        ]
      },

      {
        id: 5, fecha: "2020/03/30 14:30:00", codigo: "00005/20",
        nombre: "Lola Nadie",
        direccion: "Av. Santurce, 4, Málaga", lat: 36.690, lng: -4.484,
        telefono: "987654321", email: "lnadie@email.com", edad: 34, dni: "123456789F",
        observaciones: null,
        estado: "PE",
        estados: [
          {id:51, estado:"PC", fecha: "2020/03/30 14:00:00"},
          {id:52, estado:"CO", fecha: "2020/03/30 14:40:00"},
          {id:53, estado:"PT", fecha: "2020/03/30 14:45:00"},
          {id:54, estado:"PR", fecha: "2020/03/30 14:50:00"},
          {id:55, estado:"PE", fecha: "2020/03/30 15:00:00"},
        ],
        resultadotest: 'P', resultado: null,
        cita: {id:2, fecha: "2020/03/29", hora:"14:10", tipo: "C", idcentro: null, comentario:null},
        respuestas: [
          {id:1, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:3, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:5, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:8, codigo:"2", respuesta: "No", orden: 2, valor:"false"},
          {id:12, codigo:"1", respuesta: "Diabetes", orden: 1, valor:"false"},
          {id:16, codigo:"5", respuesta: "Enfermedad renal crónica", orden: 5, valor:"false"},
        ]
      },

      {
        id: 6, fecha: "2020/03/30 14:30:00", codigo: "00005/20",
        nombre: "Victos Nadie",
        direccion: "Av. Santurce, 4, Málaga", lat: 36.690, lng: -4.484,
        telefono: "987654321", email: "vnadie@email.com", edad: 10, dni: "123456789F",
        observaciones: null,
        estado: "FI",
        estados: [
          {id:61, estado:"PC", fecha: "2020/03/30 14:00:00"},
          {id:62, estado:"CO", fecha: "2020/03/30 14:40:00"},
          {id:63, estado:"PT", fecha: "2020/03/30 14:45:00"},
          {id:64, estado:"PR", fecha: "2020/03/30 14:50:00"},
          {id:65, estado:"PE", fecha: "2020/03/30 15:00:00"},
          {id:65, estado:"FI", fecha: "2020/03/30 15:10:00"},
        ],
        resultadotest: 'P', resultado: 'R',
        cita: {id:2, fecha: "2020/03/29", hora:"14:10", tipo: "C", idcentro: null, comentario:null},
        respuestas: [
          {id:1, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:3, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:5, codigo:"1", respuesta: "Sí", orden: 1, valor:"false"},
          {id:8, codigo:"2", respuesta: "No", orden: 2, valor:"false"},
          {id:12, codigo:"1", respuesta: "Diabetes", orden: 1, valor:"false"},
          {id:16, codigo:"5", respuesta: "Enfermedad renal crónica", orden: 5, valor:"false"},
        ]
      },

    ],


  },
  getters: {
    casos (state) {
      return state.casos;
    },
    caso (state) {
      return state.caso;
    },

  },

}
