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
  <div id="page-wrapper" :class="[{'full-width-div': fullscreen}]">

    <spinner ref="spinner" v-model="spinner" size="xl" text="Cargando"></spinner>

    <div class="row">
      <div class="col-md-12">
      	<h3>
      	   <i class="fa fa-cog fa-fw"></i> <label>Configuración del usuario</label>
  			</h3>
  		</div>
    </div>

    <div class="row">
      <div class="col-md-12">

          <panel type="info" is-open>
            <template slot="header">
              <i class="fa fa-user fa-fw"></i> <label> Datos de su usuario</label>
            </template>

            <div class="row">
              <div class="col-md-11">
                <div class="row">
                  <div class="col-md-3">
                    <bs-input label="Usuario" placeholder="Usuario" name="usuario" id="usuario" disabled v-model.trim="usuario.username"></bs-input>
                  </div>
                  <div class="col-md-5">
                    <bs-input label="Nombre" placeholder="Nombre" name="nombre" id="nombre" disabled v-model.trim="usuario.nombre"></bs-input>
                  </div>
                </div>
                <div class="row">&nbsp;</div>
                <div class="row">
                  <div class="col-md-3">
                    <bs-input label="Introduce la password antigua" type="password" placeholder="Password antigua" error="Indique la password del usuario" icon required name="password" id="passwordA" v-model.trim="passwordA"></bs-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <bs-input label="Introduce la password nueva" type="password" placeholder="Nueva password" error="Indique la password del usuario" icon required name="password" id="passwordN" v-model.trim="passwordN"></bs-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <bs-input label="Repita la password nueva" type="password" placeholder="Repita password nueva"
                    error="Indique la password del usuario" icon required name="password" id="passwordR" v-model.trim="passwordR"></bs-input>
                  </div>
                </div>
                <alert v-model="mensajeError" type="danger" width="400px" dismissable>
                  <span class="icon-info-circled alert-icon-float-left"></span>
                  <strong>¡Error!</strong>
                  <p>{{mensajeError}}</p>
                </alert>
              </div>
              <div class="col-md-1">
                <img :alt="usuario.nombre" :src="usuario.imagen" width="100%">
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-primary pull-right my-btn"  @click="cambiarPass()">Actualizar datos</button>
                <slot name='botones'></slot>
              </div>
            </div>

          </panel>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueStrap from 'vue-strap';
import {mapGetters, mapActions, mapMutations} from 'vuex';
//import { i18n } from '@/plugins/i18n';

export default {
  components: {
    'panel': VueStrap.panel,
    'spinner': VueStrap.spinner,
    'alert': VueStrap.alert,
    'bs-input': VueStrap.input,
  },
  data () {
    return {
      spinner: false,
      mensajeError: null,
      passwordA: null,
      passwordN: null,
      passwordR: null,
      mensajeError: null,
      spinner: false,
      fullscreen: false,
    }
  },
  computed: {
    ...mapGetters(['usuario']),
  },
  mounted() {
  },
  methods: {
      onLoading() {
        this.spinner = true
      },
      onLoaded() {
        this.spinner = false;
      },
      cambiarPass(){
        //show spinner
        this.spinner = true;
        this.$store.commit("LOGIN");
        this.$store.commit('encode', this.usuario.username + ':' + this.passwordA);

        this.$store.dispatch("login")
        .then((res) => {
          if(this.passwordN != this.passwordR){
            this.mensajeError="Las password no coinciden.";
          }else if(this.passwordN.length < 7){
            this.mensajeError="El tamaño no deber ser inferior a 8 caracteres.";
          }else{
            //actualizamos la pass en BD
            this.savePass();
          }

          this.spinner = false;
        }, (error)=> {
          this.spinner = false;
        });
      },
      savePass(){
        try {

          let user={
            username: this.usuario.username,
            password: this.passwordN,
          }
          this.updateUser(user).then((respuesta) => {
            this.spinner = false;
          })
          .catch((error) => {
            this.spinner = false;
          });
        }catch (e) {
          this.spinner = false;
          this.mensajeError = "Se ha producido un error al actualizar.";
          console.error(e);
        }
      },
      ...mapActions({
        fetchUser:'fetchUser',
        updateUser: 'updateUser',
      }),

  },

}
</script>

<style lang="css">
.t-danger {
  color: #d9534f;
}
.margin-lateral{
  margin-left: 9px;
}
</style>
