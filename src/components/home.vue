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
                          <bs-input placeholder="Usuario" error="Indique el nombre del usuario" icon name="usuario" id="usuario" v-model.trim="username"></bs-input>
                      </div>
                      <div class="form-group">
                          <bs-input type="password" placeholder="Password" error="Indique la password del usuario" icon name="password" id="password" v-model.trim="password"></bs-input>
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
import axios from 'axios';

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

      this.$store.dispatch("login", this.usuario).then(() => {
          this.spinner = false;
          this.$router.push("/main");
        }, (error)=> {
          console.error(error);
          this.mensajeError="Se ha producido un error al validar al usuario.";
          this.spinner = false;
        });
    }
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
