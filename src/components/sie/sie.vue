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
  <div id="page-wrapper" >
    <spinner ref="spinner" v-model="spinner" size="xl" text="Cargando"></spinner>

    <alert v-model="mensajeError" placement="top-right" type="danger" duration="3000" dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>¡Error!</strong>
      <p>{{mensajeError}}</p>
    </alert>

    <div class="row">
      <div class="col-md-12">
      	<h3><i class="fa fa-chart-bar fa-fw"></i> <label>Sistema de información epidemiológica </label>
           <div class="pull-right ">
             <i class="far fa-clock fa-fw"></i>
             <label> {{dateFormat(fecha)}} </label>
             <button class="btn btn-default" @click="reload()"><i class="fa fa-sync fa-fw"></i></button>
           </div>
        </h3>
  		</div>
		</div>

    <div class="row">
      <div class="col-md-2">
        <panel type="danger">
          <template slot="header">
            <i class="far fa-map fa-fw"></i> <label> Departamentos</label>
          </template>

          <div class="row">
            <div class="col-md-12">

            <button-group v-model="departamentosselect" :buttons="false">
                <checkbox v-for="d in departamentos" :key="d.id" :true-value="d.id" type="info"
                  style="margin-top: 0px; margin-bottom: 0px; font-weight: 100;">{{d.nombre}}</checkbox>
            </button-group>
            </div>
          </div>
        </panel>

        <panel type="warning">
          <template slot="header">
            <i class="fa fa-map fa-fw"></i> <label> Provincias</label>
          </template>

          <div class="row">
            <div class="col-md-12">
              <button-group justified>
                <v-select v-model="provinciasselect" :options="provincias" options-label="nombre" options-value="id"
                  multiple show-count
                  placeholder="Nada seleccionado"
                  search justified
                  clear-button
                ></v-select>
              </button-group>
            </div>
            <div class="col-md-12"><br></div>
            <div class="col-md-12">
              <p><code v-for="i in provinciasselobject" :key="i.id" style="margin-right: 5px; margin-top: 3px; float: left;">{{i.nombre}}</code></p>
            </div>
          </div>
        </panel>

        <panel type="success">
          <template slot="header">
            <i class="fa fa-map-marked fa-fw"></i> <label> Municipios</label>
          </template>

          <div class="row">
            <div class="col-md-12">
              <button-group justified>
                <v-select v-model="municipiosselect" :options="municipios" options-label="nombre" options-value="id"
                  multiple show-count
                  placeholder="Nada seleccionado"
                  search justified
                  clear-button
                ></v-select></button-group>
            </div>
            <div class="col-md-12"><br></div>
            <div class="col-md-12">
              <p><code v-for="i in municipiosselobject" :key="i.id" style="margin-right: 5px; margin-top: 3px; float: left;">{{i.nombre}}</code></p>
            </div>
          </div>

        </panel>

      </div>

      <div class="col-md-8">
        <panel type="info">
          <template slot="header">
            <i class="fa fa-chart-bar fa-fw"></i> <label> Gráfica</label>
          </template>

          <div class="row">

            <div class="col-md-12">
              <gmap-map ref="mapa"
                  :center="center"
                  :zoom="zoom"
                  style="width: 100%; height: 60vh; margin-top: 10px; "
                  :options="mapOptions"
                  v-if="grafica=='M'"
              >
                <gmap-heatmap v-if="markers" :data="markers" :options="{maxIntensity: 120, dissipating: false}" />
              </gmap-map>

              <gmap-map ref="mapaCasos"
                  :center="center"
                  :zoom="zoom"
                  style="width: 100%; height: 60vh; margin-top: 10px; "
                  :options="mapOptions"
                  v-if="grafica=='C'"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.location"
                  :clickable="true"
                  :draggable="false"
                  :icon = "m.icon"
                  @click="center=m.position"
                />
              </gmap-map>

              <v-chart v-if="grafica=='S'" :options="graficalineoption" />

              <v-chart v-if="grafica=='E'" :options="graficaop" />
            </div>

            <div class="col-md-12"><br></div>

            <div class="col-md-12">
              <button-group justified>
                <radio v-model="grafica" v-for="g in tiposGrafica" :key="g.tipo" :selected-value="g.tipo">{{g.nombre}}</radio>
              </button-group>
            </div>

          </div>
        </panel>
      </div>


      <div class="col-md-2">

        <panel type="primary">
          <template slot="header">
            <i class="far fa-calendar-alt fa-fw"></i> <label> Estado general actual</label>
          </template>

          <div class="row" v-for="d in resumen" :key="d.id">
            <div class="col-md-6">{{d.nombre}}</div>
            <div class="col-md-1"><label :class="d.clase">{{d.value}}</label></div>
            <div class="col-md-1"><i :class="d.flecha"></i></div>
            <div class="col-md-1">{{d.percent}}%</div>
          </div>
        </panel>

        <panel type="info">
          <template slot="header">
            <i class="far fa-calendar-alt fa-fw"></i> <label> Estado por selección</label>
          </template>

          <div class="row" v-for="d2 in resumenfiltro" :key="d2.id">
            <div class="col-md-6"><checkbox v-model="d2.select" type="info" style="margin-top: 0px; margin-bottom: 0px; font-weight: 100;" @checked="filtraestados(d2.id, $event)">{{d2.nombre}}</checkbox></div>
            <div class="col-md-1"><label :class="d2.clase">{{d2.value}}</label></div>
            <div class="col-md-1"><i :class="d2.flecha"></i></div>
            <div class="col-md-1">{{d2.percent}}%</div>
          </div>
        </panel>

      </div>

    </div>
	</div>
</template>

<script>
import VueStrap from 'vue-strap';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import axios from 'axios';
import moment from 'moment';
import ECharts from 'vue-echarts';

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/markPoint'

import * as VueGoogleMaps from 'vue2-google-maps';
import { gmapApi } from 'vue2-google-maps'
import GmapHeatmapLayer from '@/components/sie/HeatMap';

export default {
  components: {
    'panel': VueStrap.panel,
    'spinner': VueStrap.spinner,
    'alert': VueStrap.alert,
    'tabs': VueStrap.tabs,
    'tab': VueStrap.tab,
    'bs-input': VueStrap.input,
    'v-select': VueStrap.select,
    'v-option': VueStrap.option,
    'modal': VueStrap.modal,
    'checkbox': VueStrap.checkbox,
    'button-group': VueStrap.buttonGroup,
    'accordion': VueStrap.accordion,
    'radio': VueStrap.radio,

    'v-chart': ECharts,
    gmapHeatmap: GmapHeatmapLayer,
  },
  computed: {
    ...mapGetters(['departamentos', 'provincias', 'municipios', 'resumen', 'resumenfiltro', 'estadisticas', 'casosmapa']),
    google: gmapApi,
  },
  created () {
  },
  mounted () {
    this.fetchDepartamentos();
    this.fetchResumen();
    this.fetchCasosMapa({tipo: "D", lista: []});
  },
  watch: {
    departamentosselect(newValue, oldValue) {
      if (this.departamentosselect && this.departamentosselect.length>0) {
        this.fetchProvincias(this.departamentosselect);
      } else {
        this.reloadProvincias([]);
        this.provinciasselect = [];
        this.municipiosselect = [];
      }
      if (newValue && newValue.length>0) {
        let p = this.departamentos.find(i => i.id === newValue[newValue.length-1]);
        if (p) {
          this.centrar(p.lat, p.lng);
        }
      }

      this.cambiaGrafica();
    },
    provinciasselect(newValue, oldValue) {
      if (this.provinciasselect && this.provinciasselect.length>0) {
        this.fetchMunicipios(this.provinciasselect);
      } else {
        this.reloadMunicipios([]);
        this.municipiosselect = [];
      }
      this.provinciasselobject = this.getprovinciasselobject();
      this.municipiosselobject = this.getmunicipiosselobject();

      this.cambiaGrafica();
    },
    municipiosselect(newValue, oldValue) {
      this.municipiosselobject = this.getmunicipiosselobject();

      this.cambiaGrafica();
    },
    estadisticas(newValue, oldValue) {
      this.asignaEstadisticas();
      this.asignaEstadisticasLine();
    },
    grafica(newValue, oldValue) {
      this.cambiaGrafica();
    },
    casosmapa(newValue, oldValue) {
      this.cambiaPuntosMapa();
    },
  },
  data () {
    return {
      spinner: false,
      mensajeError: null,

      fecha: new Date(),

      departamentosselect: [],
      provinciasselect: [],
      provinciasselobject: [],
      municipiosselect: [],
      municipiosselobject: [],

      grafica: "M",
      tiposGrafica: [
        {tipo: "M", nombre: "Mapa de calor"},
        {tipo: "C", nombre: "Mapa de casos"},
        {tipo: "S", nombre: "Seguimiento de casos"},
        {tipo: "E", nombre: "Evolución diaria"},
      ],

      graficalineoption: null,
      graficaop: null,

      mapOptions: {fullscreenControl: false},
      center: this.$store.getters.configuracion.general.center,
      zoom: this.$store.getters.configuracion.general.zoom,

      markers: null,
    }
  },

  methods: {
    dateFormat: function(date) {
  		return moment(date, 'YYYY-MM-DD hh:mm').format('DD/MM/YYYY HH:mm');
  	},
    getprovinciasselobject() {
      if (this.provinciasselect && this.provinciasselect.length>0) {
        let arr = [];
        for (let i in this.provinciasselect) {
          let pr = this.provincias.find(item => item.id===this.provinciasselect[i]);
          if (pr) {
            arr.push(pr);
          }
        }
        return arr;
      } else {
        return [];
      }
    },
    getmunicipiosselobject() {
      if (this.municipiosselect && this.municipiosselect.length>0) {
        let arr = [];
        for (let i in this.municipiosselect) {
          let pr = this.municipios.find(item => item.id===this.municipiosselect[i]);
          if (pr) {
            arr.push(pr);
          }
        }
        return arr;
      } else {
        return [];
      }
    },

    cambiaGrafica() {
      this.spinner = true;
      let tipo = "D";
      let lista = [];
      if (this.municipiosselobject && this.municipiosselobject.length>0) {
        tipo="M";
        for (let i in this.municipiosselobject) {
          lista.push(this.municipiosselobject[i].id);
        }
      } else if (this.provinciasselobject && this.provinciasselobject.length>0) {
        tipo="P";
        for (let i in this.provinciasselobject) {
          lista.push(this.provinciasselobject[i].id);
        }
      } else if (this.departamentosselect && this.departamentosselect.length>0) {
        tipo="D";
        lista = this.departamentosselect;
      }

      if (this.grafica==="E") {
        this.fetchEstadisticas({acumulado: true, tipo: tipo, lista: lista});
      } else if (this.grafica==="S") {
        this.fetchEstadisticas({acumulado: false, tipo: tipo, lista: lista});
      } else if (this.grafica==="M" || this.grafica==="C") {
        this.fetchCasosMapa({tipo: tipo, lista: lista});
      }

      //Actualizamos el resumen filtrado
      this.fetchResumenFiltro({tipo: tipo, lista: lista});
    },

    asignaEstadisticasLine() {
      let fechas = this.getFechasEstadistica();

      this.graficalineoption = {
        title: { text: 'Seguimiento de casos' },
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['Sospechosos', 'Confirmados', 'Activos', 'Recuperados', 'Decesos']
        },
        toolbox: { show: true,
          feature: {
            dataView: {title: 'Ver datos', show: true, readOnly: false, lang:['Datos', 'Volver', 'Actualizar']},
            magicType: {title: 'Tipo gráfica', show: true, type: ['line', 'bar']},
            saveAsImage: {title: 'Guardar como imagen', show: true},
          }
        },
        calculable: true,
        xAxis: [ { type: 'category', data: fechas } ],
        yAxis: [ { type: 'value' } ],
        series: [
          { name: 'Sospechosos', type: 'bar', color:'#E89612', smooth: 0.3, data: this.estadisticas.sospechosos,
            markPoint: { data: [ {type: 'max', name: 'Max'} ] }
          },
          { name: 'Confirmados', type: 'bar', color:'#0085AA', smooth: 0.3, data: this.estadisticas.confirmados,
            markPoint: { data: [ {type: 'max', name: 'Max'} ] }
          },
          { name: 'Activos', type: 'bar', color:'#A8AA23', smooth: 0.3, data: this.estadisticas.activos,
            markPoint: { data: [ {type: 'max', name: 'Max'} ] }
          },
          { name: 'Recuperados', type: 'bar', color:'#4DB717', smooth: 0.3, data: this.estadisticas.recuperados,
            markPoint: { data: [ {type: 'max', name: 'Max'} ] }
          },
          { name: 'Decesos', type: 'bar', color:'#DD0000', smooth: 0.3, data: this.estadisticas.decesos,
            markPoint: { data: [ {type: 'max', name: 'Max'} ] }
          },
        ]
      };
      this.spinner = false;
    },

    asignaEstadisticas() {
      let fechas = this.getFechasEstadistica();

      this.graficaop = {
        title: { text: 'Evolución diaria' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985'} } },
        legend: { data: ['Sospechosos', 'Confirmados', 'Activos', 'Recuperados', 'Decesos'] },
        toolbox: { feature: { saveAsImage: {title: 'Guardar como imagen', show: true} } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: [ { type: 'category', boundaryGap: false, data: fechas } ],
        yAxis: [ { type: 'value' } ],
        series: [
            { name: 'Sospechosos', type: 'line', color:'#E89612', smooth: 0.3, stack: 'Total', areaStyle: {}, data: this.estadisticas.sospechosos },
            { name: 'Confirmados', type: 'line', color:'#0085AA', smooth: 0.3, stack: 'Total', areaStyle: {}, data: this.estadisticas.confirmados },
            { name: 'Activos', type: 'line', color:'#A8AA23', smooth: 0.3, stack: 'Total', areaStyle: {}, data: this.estadisticas.activos },
            { name: 'Recuperados', type: 'line', color:'#4DB717', smooth: 0.3, stack: 'Total', areaStyle: {}, data: this.estadisticas.recuperados },
            { name: 'Decesos', type: 'line', color:'#DD0000', smooth: 0.3, stack: 'Total', label: { normal: { show: true, position: 'top' } }, areaStyle: {}, data: this.estadisticas.decesos }
        ]
      };
      this.spinner = false;
    },
    getFechasEstadistica() {
      let hoy = new Date();
      return [
        moment(hoy.setDate(hoy.getDate()-6)).format('DD/MM/YYYY'),
        moment(hoy.setDate(hoy.getDate()+1)).format('DD/MM/YYYY'),
        moment(hoy.setDate(hoy.getDate()+1)).format('DD/MM/YYYY'),
        moment(hoy.setDate(hoy.getDate()+1)).format('DD/MM/YYYY'),
        moment(hoy.setDate(hoy.getDate()+1)).format('DD/MM/YYYY'),
        moment(hoy.setDate(hoy.getDate()+1)).format('DD/MM/YYYY'),
        moment(hoy.setDate(hoy.getDate()+1)).format('DD/MM/YYYY')];
    },

    cambiaPuntosMapa() {
      var self =this;
      let mapa = null;

      if (this.grafica==="M"){
        mapa = this.$refs.mapa;
      } else if (this.grafica==="C") {
        mapa = this.$refs.mapaCasos;
      }

      if (mapa) {
        mapa.$mapPromise.then(() => {
          self.markers = [];
          let icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          for (let i in self.casosmapa) {
            if (self.casosmapa[i].tipo === "S") {
              icon = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
            } else if (self.casosmapa[i].tipo === "C") {
              icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            } else if (self.casosmapa[i].tipo === "A") {
              icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
            } else if (self.casosmapa[i].tipo === "R") {
              icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
            } else { //"D"
            }
            self.markers.push(
                {location: new google.maps.LatLng(self.casosmapa[i].lat, self.casosmapa[i].lng), weight: 3, icon:icon}
              );
          }
        });
      }
      this.spinner = false;
    },
    centrar(lat, lng) {
      this.center={lat: lat, lng: lng};
      this.zoom = 7;
    },

    filtraestados(id, e) {
      let op = this.resumenfiltro.find(i=>i.id===id);
      if (op) {
        op.select = e;
      }
      this.cambiaGrafica();
    },

    reload() {
      var location = this.$route.fullPath
      this.$router.replace('/')
      this.$nextTick(() => this.$router.replace(location))
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ...mapActions({
      fetchDepartamentos: 'fetchDepartamentos',
      fetchProvincias: 'fetchProvincias',
      fetchMunicipios: 'fetchMunicipios',
      reloadProvincias: 'reloadProvincias',
      reloadMunicipios: 'reloadMunicipios',
      fetchResumen: 'fetchResumen',
      fetchResumenFiltro: 'fetchResumenFiltro',
      fetchEstadisticas: 'fetchEstadisticas',
      fetchCasosMapa: 'fetchCasosMapa'
    }),
  },

}
</script>

<style lang="css">
.echarts {
  width: 100% !important;
  height: 60vh !important;
}

.small-font {
  font-size: 12px;
}

.t-danger {
  color: #d9534f;
}
.t-warning {
  color: #ff9800;
}
.t-success {
  color: #4caf50;
}
</style>
