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

      <casos :titulo="titulo" :filtroDefecto="filtros" :filtrar="filtrar"></casos>
    </div>
</template>

<script>
import {usuario} from '../../store/usuario.js';
import VueStrap from 'vue-strap';
import casos from './casos.vue';

export default {
  data () {
    return {
      titulo: "Pendientes de cita",
      filtros: ['PC', 'CO'],
      filtrar: false
    }
  },
  components: {
    casos,
  },
  computed: {
    pendientes() {
      return this.$store.getters.casos.filter(item => item!==null && (item.estado==='PC' || item.estado==='CO')).length;
    },
    programados() {
      return this.$store.getters.casos.filter(item => item!==null && (item.estado==='PT' || item.estado==='PR')).length;
    },
    evolucion() {
      return this.$store.getters.casos.filter(item => item!==null && (item.estado==='PE' || item.estado==='FI')).length;
    }

  },
  methods: {
    filtrarCita() {
      this.titulo="Pendientes de cita";
      this.filtros=['PC', 'CO'];
      this.filtrar=false;
    },
    filtrarPrueba() {
      this.titulo="Pendientes de prueba física";
      this.filtros=['PT', 'PR'];
      this.filtrar=false;
    },
    filtrarEvolucion() {
      this.titulo="Pendientes evolución";
      this.filtros=['PE', 'FI'];
      this.filtrar=true;
    },

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
