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
    <div id="page-wrapper">
      <div class="row">
			  <div class="col-lg-3 col-md-4">
          <div class="panel panel-yellow">
              <div class="panel-heading">
                  <div class="row">
                      <div class="col-xs-3">
                          <i class="fa fa-home fa-5x"></i>
                      </div>
                      <div class="col-xs-9 text-right">
                          <div class="huge">{{pendientes}}</div>
                          <div>Pendientes de cita</div>
                      </div>
                  </div>
              </div>
              <a class="pointer" @click="filtrarCita()">
                  <div class="panel-footer">
                      <span class="pull-left">Ver Detalles</span>
                      <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                      <div class="clearfix"></div>
                  </div>
              </a>
          </div>
        </div>
        <div class="col-lg-3 col-md-4">
            <div class="panel panel-green">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-briefcase-medical fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{programados}}</div>
                            <div>Pendiente de prueba física</div>
                        </div>
                    </div>
                </div>
                <a class="pointer" @click="filtrarPrueba()">
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>

        <div class="col-lg-3 col-md-4">
            <div class="panel panel-red">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-user-md fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{evolucion}}</div>
                            <div>Pendientes evolución</div>
                        </div>
                    </div>
                </div>
                <a class="pointer" @click="filtrarEvolucion()">
                    <div class="panel-footer">
                        <span class="pull-left">Ver Detalles</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>

      </div>

      <casos
          :apiUrl="this.$store.state.configuracion.casos.url"
          :titulo="titulo"
          :moreParamsDefault="filtroslistas"
          :tipo="tipolistas"
          :filtrar="filtrar"
          @updateTotal="refrescaTotal($event)"
          >
      </casos>
    </div>
</template>

<script>
import {usuario} from '../../store/usuario.js';
import VueStrap from 'vue-strap';
import casos from './casos.vue';
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  components: {
    casos,
  },
  computed: {
    ...mapGetters(['filtroslistas','tipolistas']),
  },
  mounted() {
    this.fetchContadoresCaso(this.$route.params.id).then((respuesta) => {
        if (respuesta.status == 200) {
          if (respuesta.data.success) {
            this.pendientes = (respuesta.data.data.pendientes?respuesta.data.data.pendientes:0);
            this.programados = (respuesta.data.data.programados?respuesta.data.data.programados:0);
            this.evolucion = (respuesta.data.data.evolucion?respuesta.data.data.evolucion:0);
          } else {
            console.error("Respuesta success: " + respuesta.data.success);
          }
        } else {
          console.error("Respuesta status: " + respuesta.status);
        }
      }).catch((error) => {
        console.error(error);
      });
  },
  data () {
    return {
      pendientes: 0,
      programados: 0,
      evolucion: 0,

      titulo: "Pendientes de cita",
      filtrar: false,
    }
  },
  methods: {
    filtrarCita() {
      this.titulo="Pendientes de cita";
      this.setFiltroslistas({estados:"cita"});
      this.setTipolistas('C');
      this.filtrar=false;
    },
    filtrarPrueba() {
      this.titulo="Pendientes de prueba física";
      this.setFiltroslistas({estados:"fisica"});
      this.setTipolistas('P');
      this.filtrar=false;
    },
    filtrarEvolucion() {
      this.titulo="Pendientes evolución";
      this.setFiltroslistas({estados:"evolucion"});
      this.setTipolistas('F');
      this.filtrar=true;
    },
    refrescaTotal(value) {
      if (value) {
        if (value.tipo==='C') {
          this.pendientes = (value.total?value.total:0);
        } else if (value.tipo==='P') {
          this.programados = (value.total?value.total:0);
        } else if (value.tipo==='F') {
          this.evolucion = (value.total?value.total:0);
        }
      }
    },
    //////////////////////////////////////////////////////////////
    ...mapMutations({
      setFiltroslistas: 'setFiltroslistas',
      setTipolistas: 'setTipolistas'
    }),
    ...mapActions({
      fetchContadoresCaso: 'fetchContadoresCaso',
    }),
  },
}
</script>

<style lang="css">
  .page-header-my {
    padding-bottom: 9px;
    margin: 20px 0 20px;
    border-bottom: 0px solid #eee;
  }
</style>
