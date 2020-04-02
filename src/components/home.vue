<template lang="html">
  <section>
    <div id="page-wrapper" class="fondo">
      <div class="row">
        <div class="col-md-12">
          <a class="myheader" href="index.html"><img alt="Módulo Epidemiológico" src="../assets/logo.png" class="logo" /><h2>Módulo Epidemiológico</h2></a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-user fa-fw"></i> Acceso al sistema</h3>
            </div>
            <div class="panel-body">
              <spinner ref="spinner" v-model="spinner" size="xl" text="Cargando"></spinner>
              <form role="form" @submit.prevent="login" class="login">
                  <fieldset>
                      <div class="form-group">
                          <bs-input placeholder="Usuario" error="Indique el nombre del usuario" icon name="usuario" id="usuario" required v-model.trim="username"></bs-input>
                      </div>
                      <div class="form-group">
                          <bs-input type="password" placeholder="Password" error="Indique la password del usuario" icon required name="password" id="password" v-model.trim="password"></bs-input>
                      </div>
                      <br>
                      <input type="submit" name="submit" class="btn btn-lg btn-warning btn-block" value="Entrar">
                      <br>
                      <alert v-model="mensajeError" type="danger" width="400px" dismissable>
                        <span class="icon-info-circled alert-icon-float-left"></span>
                        <strong>¡Error!</strong>
                        <p>{{mensajeError}}</p>
                      </alert>
                  </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import VueStrap from 'vue-strap';
import axiosCustom from '../store/axios-custom.js';

export default {
  components: {
    'bs-input': VueStrap.input,
    'alert': VueStrap.alert,
    'spinner': VueStrap.spinner,
  },
  data () {
    return {
      username: null,
      password: null,
      mensajeError: null,
      spinner: false,

      usuario: {
            id: 1,
            username: "jfpastor",
            nombre: "Juan Fernando Pastor Ruiz",
            imagen: null,
            centro: "Prueba",
      },
    }
  },
  methods: {
    login() {
      //show spinner
      this.spinner = true;
      this.$store.commit("LOGIN");
      this.$store.commit('encode', this.username + ':' + this.password);

      this.$store.commit('encode', 'vue' + ':' + 'secret');
      // this.getToken(this.$store.state.configuracion.autenticacion.url);

      this.$store.dispatch("login", this.usuario).then(() => {
          this.spinner = false;
          this.$router.push("/main");
        }, (error)=> {
          console.error(error);
          this.mensajeError="Se ha producido un error al validar al usuario.";
          this.spinner = false;
        });
    },
    //Conseguir un token bearer
  	getToken(baseURL){
      let datosAutenticacion = {
        url: baseURL,
        authdata: this.$store.state.base64.authdata,
        username: this.username,
        password: this.password,
      }
      axiosCustom
        .axiosConParams(datosAutenticacion)
        .post('/oauth/token')
      		.then((res) => {
      			if(res.status == 200) {
      				this.$store.dispatch("guardarToken",res.data).then(() => {
      					this.getUsuario(baseURL);
      				}, (error)=> {
      					console.error(error);
                this.validado = false;
                this.mensajeError="Se ha producido un error al validar al usuario.";
                this.spinner = false;
      				});
      			} else {
          		console.error("Respuesta status: " + res.status);
          		this.validado = false;
          		this.mensajeError="Se ha producido un error al validar al usuario.";
          		this.spinner = false;
           	}
      		})
      		.catch((error) => {
      			console.error(error);
          	this.validado = false;
          	this.mensajeError="Se ha producido un error al validar al usuario.";
          	this.spinner = false;
      		});
      	//return true;
  	},
  	// Información del usuario
  	getUsuario(baseURL){
		//Usuarios disponibles
      if (this.$store.state.base64.authdata) {
      	axiosCustom
          .axiosAutenticadoConUrl(baseURL, this.$store.state.usuario.access_token)
          .post('/user')
      			.then((respuesta) => {
        			if(respuesta.status == 200) {
        				if(respuesta.data.authenticated){
                  this.$store.dispatch("login", respuesta.data.principal).then(() => {
                    this.spinner = false;
                    this.$router.push("/main");
                  })
                  .catch((error) => {
                    console.error(error);
                    this.validado = false;
                    this.mensajeError="Se ha producido un error al validar al usuario.";
                    this.spinner = false;
                  })
        				} else {
              		console.error(respuesta.statusText);
              		this.validado = false;
              		this.mensajeError=respuesta.statusText;
              		this.spinner = false;
            		}
        			} else {
            		console.error("Respuesta status: " + respuesta.status);
            		this.validado = false;
            		this.mensajeError="Se ha producido un error al validar al usuario.";
            		this.spinner = false;
           		}
      			})
      			.catch((error) => {
        			console.error(error);
              	this.validado = false;
              	this.mensajeError="Se ha producido un error al validar al usuario.2";
              	this.spinner = false;
        		});
    	} else {
     	 	console.error("Error authdata");
      	this.validado = false;
      	this.mensajeError="Se ha producido un error al validar al usuario.3";
     		this.spinner = false;
    	}
  	},
  }
}
</script>

<style lang="css">
  @media (min-width: 768px) {
    #page-wrapper {
      margin: 0 0 0 0;
    }
  }

  .myheader, .myheader:hover {
      color: #777;
      text-decoration: none;
      align-content: center;
  }

  .fondo {
    background-image: url(../assets/fondo1.jpg);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    display: table;
    font-family: Open Sans,Arial,sans-serif;
    height: 100%;
    width: 100%;
  }
</style>
