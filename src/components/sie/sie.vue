<template lang="html">
  <div id="page-wrapper" :class="[{'full-width-div': fullscreen}]">
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
           </div>
        </h3>
  		</div>
		</div>

    <div class="row">
      <div class="col-md-2">
        <panel type="primary">
          <template slot="header">
            <i class="far fa-map fa-fw"></i> <label> Provincias</label>
          </template>

          <div class="row">
            <div class="col-md-12" v-for="p in provincias" :key="p.id"><checkbox v-model="p.select" type="info" style="margin-top: 0px; margin-bottom: 0px; font-weight: 100;">{{p.nombre}}</checkbox></div>
          </div>
        </panel>

        <panel type="warning">
          <template slot="header">
            <i class="far fa-map fa-fw"></i> <label> Municipios</label>
          </template>

          <div class="row">
            <div class="col-md-12">
              <button-group justified><v-select v-model="municipiosselect" :options="municipios" options-label="nombre" options-value="nombre"
                  multiple show-count
                  placeholder="Nada seleccionado"
                  search justified
                  clear-button
                ></v-select></button-group>
            </div>
            <div class="col-md-12"><br></div>
            <div class="col-md-12">
              <p><code v-for="i in municipiosselect" style="margin-right: 5px; margin-top: 3px; float: left;">{{i}}</code></p>
            </div>
          </div>
        </panel>

        <panel type="success">
          <template slot="header">
            <i class="far fa-map fa-fw"></i> <label> Distritos</label>
          </template>

          <div class="row">
            <div class="col-md-12">
              <button-group justified><v-select v-model="distritosselect" :options="distritos" options-label="nombre" options-value="nombre"
                  multiple show-count
                  placeholder="Nada seleccionado"
                  search justified
                  clear-button
                ></v-select></button-group>
            </div>
            <div class="col-md-12"><br></div>
            <div class="col-md-12">
              <p><code v-for="i in distritosselect" style="margin-right: 5px; margin-top: 3px; float: left;">{{i}}</code></p>
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
                  @click="center=m.position"
                />
              </gmap-map>

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

          <div class="row" v-for="d2 in resumen" :key="d2.id">
            <div class="col-md-6"><checkbox v-model="d2.select" type="info" style="margin-top: 0px; margin-bottom: 0px; font-weight: 100;">{{d2.nombre}}</checkbox></div>
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
import {mapGetters} from 'vuex';
import axios from 'axios';
import moment from 'moment';
import ECharts from 'vue-echarts';

import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/grid'

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
    ...mapGetters(['triage']), //TODO Recuperar los datos de WS
    google: gmapApi,
  },
  created () {
  },
  mounted () {
    var self =this;
    this.$refs.mapa.$mapPromise.then(() => {
        self.markers = [{location: new google.maps.LatLng(36.724, -4.483), weight: 0.5},
                  new google.maps.LatLng(36.724, -4.481),
                  {location: new google.maps.LatLng(36.724, -4.479), weight: 2},
                  {location: new google.maps.LatLng(36.724, -4.477), weight: 3},
                  {location: new google.maps.LatLng(36.724, -4.475), weight: 2},
                  new google.maps.LatLng(36.724, -4.473),
                  {location: new google.maps.LatLng(36.724, -4.471), weight: 50 },



                  {location: new google.maps.LatLng(36.726, -4.483), weight: 3},
                  {location: new google.maps.LatLng(36.726, -4.481), weight: 2},
                  new google.maps.LatLng(36.726, -4.479),
                  {location: new google.maps.LatLng(36.726, -4.477), weight: 0.5},
                  new google.maps.LatLng(36.726, -4.475),
                  {location: new google.maps.LatLng(36.726, -4.473), weight: 2},
                  {location: new google.maps.LatLng(36.726, -4.471), weight: 3},

                  {location: new google.maps.LatLng(36.742, -4.476), weight: 2},
                  {location: new google.maps.LatLng(36.742, -4.474), weight: 3},
                  new google.maps.LatLng(36.742, -4.472),
                  {location: new google.maps.LatLng(36.742, -4.470), weight: 0.5},
                  new google.maps.LatLng(36.742, -4.469),
                  {location: new google.maps.LatLng(36.742, -4.468), weight: 100},
                  {location: new google.maps.LatLng(36.742, -4.467), weight: 3},

                  {location: new google.maps.LatLng(36.710, -4.420), weight: 100},
                ];

    })
    console.log(this.markers)
  },
  data () {
    let fechas = ['21/03/2020', '22/03/2020', '23/03/2020', '24/03/2020', '25/03/2020', '26/03/2020', '27/03/2020']

    return {
      spinner: false,
      fullscreen: false,
      mensajeError: null,
      showConfirm: false,
      showParte: false,

      fecha: new Date(),

      resumen: [
        {id:1, nombre:'Sospechosos', value: 650, percent: 12, clase: "t-warning", flecha: "fa fa-arrow-up fa-fw t-danger", select: true},
        {id:2, nombre:'Confirmados', value: 45, percent: 3, clase: "t-danger", flecha: "fa fa-arrow-up fa-fw t-danger", select: true},
        {id:3, nombre:'Activos', value: 50, percent: 23, clase: "t-danger", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
        {id:4, nombre:'Recuperados', value: 100, percent: 23, clase: "t-success", flecha: "fa fa-arrow-up fa-fw t-success", select: true},
        {id:5, nombre:'Decesos', value: 23, percent: 6, clase: "t-danger", flecha: "fa fa-arrow-down fa-fw t-success", select: true},
      ],

      provincias: [
        {id:1, nombre: "Málaga", select: true},
        {id:2, nombre: "Granada", select: false},
        {id:3, nombre: "Almería", select: false},
        {id:4, nombre: "Jaén", select: false},
        {id:5, nombre: "Cordoba", select: false},
        {id:6, nombre: "Sevilla", select: false},
        {id:7, nombre: "Huelva", select: false},
        {id:8, nombre: "Cádiz", select: false},
      ],

      municipios: [
        {id:1, nombre: "Málaga", select: true},
        {id:2, nombre: "Marbella", select: false},
        {id:3, nombre: "Mijas", select: false},
        {id:4, nombre: "Fuengirola", select: false},
        {id:5, nombre: "Torremolinos", select: false},
        {id:6, nombre: "Benalmádena", select: false},
        {id:7, nombre: "Estepona", select: false},
        {id:8, nombre: "Rincón de la Victoria", select: false},
        {id:9, nombre: "Antequera", select: false},
        {id:10, nombre: "Alhaurín de la Torre", select: false}

      ],

      municipiosselect: ["Málaga"],

      distritos: [
        {id:1, nombre: "Centro", select: true},
        {id:2, nombre: "Este", select: true},
        {id:3, nombre: "Ciudad Jardín", select: true},
        {id:4, nombre: "Bailén-Miraflores", select: true},
        {id:5, nombre: "Palma-Palmilla", select: true},
        {id:6, nombre: "Cruz de Humilladero", select: true},
        {id:7, nombre: "Carretera de Cádiz", select: true},
        {id:8, nombre: "Churriana", select: true},
        {id:9, nombre: "Campanillas", select: true},
        {id:10, nombre: "Puerto de la Torre", select: true},
        {id:11, nombre: "Teatinos-Universidad", select: true}
      ],

      distritosselect: ["Centro", "Este", "Ciudad Jardín", "Bailén-Miraflores", "Palma-Palmilla", "Cruz de Humilladero", "Carretera de Cádiz", "Churriana", "Campanillas", "Puerto de la Torre", "Teatinos-Universidad"],


      grafica: "M",
      tiposGrafica: [
        {tipo: "M", nombre: "Mapa de calor"},
        {tipo: "C", nombre: "Mapa de casos"},
        {tipo: "S", nombre: "Seguimiento de casos"},
        {tipo: "E", nombre: "Evolución diaria"},
      ],


      graficaop: {
        title: { text: 'Evolución diaria' },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Sospechosos', 'Confirmados', 'Activos', 'Recuperados', 'Decesos']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: fechas
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Sospechosos',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Confirmados',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Activos',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Recuperados',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Decesos',
                type: 'line',
                stack: 'Total',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {},
                data: [5, 10, 13, 14, 100, 120, 130]
            }
        ]
    },








      mapOptions: {fullscreenControl: false},
      center: {lat: 36.724933, lng: -4.471145},
      zoom: 13,

      markers: null,
    }
  },

  methods: {
    addMensajeError(mensaje) {
      if (!this.mensajeError) {
        this.mensajeError="";
      }
      this.mensajeError += " " + mensaje;
    },

    guardarDatos() {
    },

    noResultsAddress() {
      console.log("noResultsAddress");
    },

    dateFormat: function(date) {
  		return moment(date, 'YYYY-MM-DD hh:mm').format('DD/MM/YYYY HH:mm');
  	},

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

.titulo-menu {
  color: rgba(38,38,38,0.7);
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  white-space: nowrap;
  text-transform: uppercase;
}
.label-destino {
  background-color: #D63E2A !important;
  text-transform: capitalize !important;
}
.label-disponible {
  background-color: #2D9BB7 !important;
  text-transform: capitalize !important;
}
.label-origen {
  background-color: #E18247 !important;
  text-transform: capitalize !important;
}
.my-title {
  font-size: 14px !important;
  font-weight: 700 !important;
  padding: 8px !important;
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
