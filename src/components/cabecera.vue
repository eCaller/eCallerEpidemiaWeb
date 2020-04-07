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
-->
<template lang="html">
  <div>
    <navbar placement="top" type="default">
      <a class="navbar-brand logo" href="#" @click="logout()"><img alt="Módulo Epidemiológico" src="../assets/logo2.png" /></a>
      <a class="navbar-brand"><h2 class="title">{{$t('messages.name')}}</h2></a>

      <ul class="nav navbar-top-links navbar-right">
          <li><a class="pointer" @click="listadoCasos()"><i class="far fa-copy fa-fw"></i><span> {{$t('menu.gestion-casos')}}</span></a></li>
          <li><a class="pointer" @click="listadoTriage()"><i class="far fa-edit fa-fw"></i><span> {{$t('menu.diseno-triage')}}</span></a></li>
          <li><a class="pointer" @click="sie()"><i class="far fa-chart-bar fa-fw"></i><span> {{$t('menu.sie')}}</span></a></li>
          <li class="dropdown" v-if="false">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-cog fa-fw"></i><span> {{$t('menu.configuracion')}} </span><i class="fa fa-caret-down"></i></a>
            <ul class="dropdown-menu">
                <li><a href="#" @click="usuarios()"><i class="fa fa-user fa-fw"></i> {{$t('menu.usuarios')}}</a></li>
                <li><a href="#" @click="centros()"><i class="far fa-hospital fa-fw"></i> {{$t('menu.centros')}}</a></li>
                <li class="divider"></li>
                <li><a href="#" @click="provincias()"><i class="fa fa-map fa-fw"></i> {{$t('menu.provincias')}}</a></li>
                <li><a href="#" @click="municipios()"><i class="far fa-map fa-fw"></i> {{$t('menu.municipios')}}</a></li>
                <li><a href="#" @click="distritos()"><i class="fa fa-map-marked-alt fa-fw"></i> {{$t('menu.distritos')}}</a></li>
            </ul>
          </li>
          <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                  <strong>{{$t('messages.user')}} </strong><i class="fa fa-caret-down"></i> <img :alt="usuario.nombre" :src="usuario.imagen" class="img-circle" style="width: 39px;">
              </a>
              <ul class="dropdown-menu">
                  <li v-if="false"><a href="#" @click="configuracion()"><i class="fa fa-cog fa-fw"></i> {{$t('menu.configuracion')}}</a></li>
                  <li class="divider"></li>
                  <li><a href="#" @click="logout()"><i class="fa fa-sign-out-alt fa-fw"></i> {{$t('messages.salir')}}</a></li>
              </ul>
          </li>
      </ul>

    </navbar>
    <alert v-model="mensajeError" placement="top-right" duration="3000" type="danger" dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>Error</strong>
      <p>{{mensajeError}}</p>
    </alert>
  </div>
</template>

<script>
import VueStrap from 'vue-strap';
import {mapGetters} from 'vuex';
import axios from 'axios';

export default {
  components: {
    'alert': VueStrap.alert,
    navbar: VueStrap.navbar
  },
  data () {
    return {
      mensajeError: null
    }
  },
  methods: {
      closeMenu() {
        //TODO Pensar mejor como reestructurar esto, por ahora lo deshabilitamos
        //$("#wrapper").toggleClass("active");
      },
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push("/")
        });
      },
      listadoCasos(){
        this.$router.replace({name: "listado"});
      },
      listadoTriage(){
        this.$router.replace({name: "triage"});
      },
      sie(){
        this.$router.replace({name: "sie"});
      },
      configuracion() {
        //TODO en construcción
      },
      usuarios() {
        //TODO en construcción
      },
      centros() {
        //TODO en construcción
      },
      provincias() {
        //TODO en construcción
      },
      municipios() {
        //TODO en construcción
      },
      distritos() {
        //TODO en construcción
      },

  },
  computed: mapGetters(['isLoggedIn','usuario']),

  /*computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
  */
}
</script>

<style lang="css">

</style>
