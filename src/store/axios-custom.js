import axios from 'axios';

export default {
	//Recibe un objeto con los campos url, que es la url de configuración 
	// y el access_token del usuario
	axiosAutenticado(datosPeticion) {
		return axios.create({
			baseURL: datosPeticion.url, 
			headers: {
				'Authorization':'Bearer ' + datosPeticion.access_token,
				'Content-Type':'application/json',
			}
		})
	},
	// Lo misma que la anterior, pero para casos donde el componente solo use un axios con otra 
	// url y no construir el objeto en cada parte
	axiosAutenticadoConUrl(url, access_token) {
		return axios.create({
			baseURL: url, 
			headers: {
				'Authorization':'Bearer ' + access_token,
				'Content-Type':'application/json'
			}
		})
	},
	axiosParaVueTable(access_token) {
		return axios.create({
			headers: {'Authorization':'Bearer ' + access_token},
		});
	},
	axiosConParams(datosAutenticacion) {
		return axios.create({
			baseURL: datosAutenticacion.url,
  		headers: {
      			'Content-Type':'application/x-www-form-urlencoded',
      			'Authorization':'Basic ' + datosAutenticacion.authdata,
      		},
      		params: {
      			'grant_type':'password',
      			'username': datosAutenticacion.username,
      			'password': datosAutenticacion.password,
      		}
  	});
	}
}