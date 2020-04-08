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

    <spinner ref="spinner" v-model="spinner" size="xl" :text="$t('configUser.load')"></spinner>

    <div class="row">
      <div class="col-md-12">
      	<h3>
      	   <i class="fa fa-cog fa-fw"></i> <label>{{$t('configUser.config-user')}}</label>
  			</h3>
  		</div>
    </div>

    <div class="row">
      <div class="col-md-12">

          <panel type="info" is-open>
            <template slot="header">
              <i class="fa fa-user fa-fw"></i> <label> {{$t('configUser.date-user')}}</label>
            </template>

            <div class="row">
              <div class="col-md-11">
                <div class="row">
                  <div class="col-md-3">
                    <bs-input :label="$t('configUser.user')" :placeholder="$t('configUser.user')" name="usuario" id="usuario" disabled v-model.trim="usuario.username"></bs-input>
                  </div>
                  <div class="col-md-5">
                    <bs-input :label="$t('configUser.name')" :placeholder="$t('configUser.name')" name="nombre" id="nombre" disabled v-model.trim="usuario.nombre"></bs-input>
                  </div>
                </div>
                <div class="row">&nbsp;</div>
                <div class="row">
                  <div class="col-md-3">
                    <bs-input :label="$t('configUser.intro-old-pass')" type="password" :placeholder="$t('configUser.old-pass')" 
                    :error="$t('configUser.error-pass')" icon required name="password" id="passwordA" v-model.trim="passwordA"></bs-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <bs-input :label="$t('configUser.intro-new-pass')" type="password" :placeholder="$t('configUser.new-pass')" 
                    :error="$t('configUser.error-pass')" icon required name="password" id="passwordN" v-model.trim="passwordN"></bs-input>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <bs-input :label="$t('configUser.repeat-pass-new')" type="password" :placeholder="$t('configUser.repeat-pass-new')"
                    :error="$t('configUser.error-pass')" icon required name="password" id="passwordR" v-model.trim="passwordR"></bs-input>
                  </div>
                </div>
                <alert v-model="mensajeError" type="danger" width="400px" dismissable>
                  <span class="icon-info-circled alert-icon-float-left"></span>
                  <strong>¡{{$t('configUser.error')}}!</strong>
                  <p>{{mensajeError}}</p>
                </alert>
              </div>
              <div class="col-md-1">
                <img :alt="usuario.nombre" :src="usuario.imagen" width="100%">
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-primary pull-right my-btn"  @click="cambiarPass()">{{$t('configUser.update-data')}}</button>
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
import {i18n} from '@/plugins/i18n';

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
      testContraseña() {        
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (this.passwordN != this.passwordR) {
          this.mensajeError=i18n.t('configUser.same-pass');
        } else if (this.passwordN == null || this.passwordN.length < 7) {
          this.mensajeError=i18n.t('configUser.lenght-min');
        } else if(!/[A-Z]/.test(this.passwordN)) {
          this.mensajeError=i18n.t('configUser.contain-upper');
        } else if(!/[a-z]/.test(this.passwordN)) {
          this.mensajeError=i18n.t('configUser.contain-lower');
        } else if(!/[0-9]/.test(this.passwordN)) {
          this.mensajeError=i18n.t('configUser.contain-number');
        } else if(!format.test(this.passwordN)) {
          this.mensajeError=i18n.t('configUser.contain-character');
        }
        return this.mensajeError == null;
      },
      cambiarPass(){
        //show spinner
        this.spinner = true;
        this.mensajeError = null;
        if (this.testContraseña()) {
          this.$store.dispatch('checkPassword', {
            oldPassword: this.passwordA          
          }).then((respuesta) => {
              // Si llega aqui, las contraseña antigua y la nueva
              // son correctas
              this.savePass();
            })
            .catch((error) => {
              // Si llega aquí, la contraseña antigua no es válida
              this.spinner = false;
              this.mensajeError = i18n.t('configUser.error-password');;
            })
        } else {
          this.spinner = false;
        }
      },
      savePass() {
        try {
          this.$store.dispatch('updatePassword', {
            newPassword: this.passwordN          
          }).then((respuesta) => {
              this.spinner = false;
          }).catch((error) => {
              this.spinner = false;
              this.mensajeError = i18n.t('configUser.error-update');;
          });
        }catch (e) {
          this.spinner = false;
          this.mensajeError = i18n.t('configUser.error-update');;
          console.error(e);
        }
      }
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
.has-feedback label~.form-control-feedback{
  top:20px;
}
</style>
