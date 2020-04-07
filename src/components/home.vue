<!--
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
-->
<template lang="html">
  <section>
    <div id="page-wrapper" class="fondo">
      <div class="row">
        <div class="col-md-12">
          <a class="myheader" href="index.html"><img :alt="$t('messages.name')" src="../assets/logo.png" class="logo" width="20%" /><h2>{{$t('messages.name')}}</h2></a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title"><i class="fa fa-user fa-fw"></i> {{$t('login.title')}}</h3>
            </div>
            <div class="panel-body">
              <spinner ref="spinner" v-model="spinner" size="xl" :text="$t('messages.loading')"></spinner>
              <form role="form" @submit.prevent="login" class="login">
                  <fieldset>
                      <div class="form-group">
                          <bs-input  :placeholder="$t('messages.user')" :error="$t('login.error-user')" icon name="usuario" id="usuario" required v-model.trim="username"></bs-input>
                      </div>
                      <div class="form-group">
                          <bs-input type="password" :placeholder="$t('login.password')" :error="$t('login.error-password')" icon required name="password" id="password" v-model.trim="password"></bs-input>
                      </div>
                      <br>
                      <input type="submit" name="submit" class="btn btn-lg btn-warning btn-block" :value="$t('login.sign-in')">
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
    }
  },
  methods: {
    login() {
      //show spinner
      this.spinner = true;
      this.$store.commit("LOGIN");
      this.$store.dispatch("login", {username: this.username, password: this.password})
        .then((res) => {
          this.spinner = false;
          this.$router.push("/main");
        }, (error)=> {
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
