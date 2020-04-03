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
  <div class="row">
    <div class="col-lg-12">
      <panel>
        <template slot="header">
          <i class="far fa-file fa-fw"></i> <label> {{titulo}}</label>
          <div class="pull-right">
            <button type="button" class="btn btn-default btn-xs" @click="refresh()">
              <i class="fa fa-sync fa-fw"></i>
            </button>
          </div>
        </template>
        <div class="row">
          <div class="col-md-12">
            <spinner ref="spinner" v-model="spinner" size="xl" text="Cargando"></spinner>

            <div class="row bottom-align ">
              <div class="col-md-2" v-if="filtrar">
                <label class="control-label">Fecha inicio</label>
                <datepicker name="fini" v-model="fechainicio" format="dd/MM/yyyy" ></datepicker>
              </div>
              <div class="col-md-2" v-if="filtrar">
                <label class="control-label">Fecha fin</label>
                <datepicker name="ffin" v-model="fechafin" format="dd/MM/yyyy" ></datepicker>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label">Texto</label>
                  <bs-input placeholder="Texto" style="width: 100%;"></bs-input>
                </div>
              </div>

              <div class="col-md-1" style="display: grid;">
                <label class="control-label">&nbsp;</label>
                <button class="btn btn-primary" @click="doFilter">Buscar</button>
              </div>
            </div>

            <br>
            <vuetable ref="vuetable" v-show="!spinner"
              :api-url="''"
              :api-mode=false
              :data=datos
              pagination-path=""
              :fields="fields"
              :sort-order="sortOrder"
              :css="css.table"
              :per-page="6"
              :append-params="moreParams"
              :row-class="rowClassCB"
              no-data-template="Sin datos"
              @vuetable:pagination-data="onPaginationData"
              @vuetable:loading="onLoading"
              @vuetable:loaded="onLoaded"
              @vuetable:row-clicked="onRowClicked"
            >
              <template slot="horainicio" slot-scope="props">
                <div v-if="props.rowData.paradas!==null && props.rowData.paradas.length>0">{{props.rowData.paradas[0].hora}}</div>
                <div v-else>{{props.rowData.horainicio}}</div>
              </template>
              <template slot="horafin" slot-scope="props">
                <div v-if="props.rowData.paradas!==null && props.rowData.paradas.length>0">{{props.rowData.paradas[props.rowData.paradas.length-1].hora}}</div>
                <div v-else>{{props.rowData.horafin}}</div>
              </template>
            </vuetable>
            <vuetable-pagination ref="pagination"
              :css="css.pagination"
              @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
            <nav aria-label="Page navigation" class="pull-right">
              <ul class="pagination" style="margin:0px">
                <li>
                  <a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                </li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li>
                  <a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-primary pull-right my-btn" @click="abrirCaso()">Abrir caso</button>
            <slot name='botones'></slot>
          </div>
        </div>

      </panel>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueStrap from 'vue-strap';
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination.vue';
import tableConf from '../../store/table-configuration.js';
import axios from 'axios';
import moment from 'moment';
import datetimepicker from '../utils/datetimepicker.vue';

export default {
  components: {
    'panel': VueStrap.panel,
    'spinner': VueStrap.spinner,
    'v-select': VueStrap.select,
    'v-option': VueStrap.option,
    'bs-input': VueStrap.input,
    'datepicker': VueStrap.datepicker,

    datetimepicker: datetimepicker,
    Vuetable,
    VuetablePagination,
  },
  props: {
    verBotonNuevo: {
      type: Boolean,
      default: true
    },
    verBotonFiltro: {
      type: Boolean,
      default: true
    },
    apiUrl: {
      type: String,
      required: true
    },
    titulo: {
      type: String,
      default: 'Casos'
    },
    filtrar: {
      type: Boolean,
      default: true
    },
    moreParamsDefault: {
      type: Object
    },
    filtroDefecto: {
      type: Array,
      default: () => ['PC', 'CO']
    }
  },

  watch: {
  	titulo: function(newVal, oldVal) {
      //console.log('Prop changed: ', newVal, ' | was: ', oldVal);
    },
    filtroDefecto: function(newVal, oldVal) {
      //console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.datos.data=this.$store.getters.casos.filter(item => (item.estado===newVal[0] || item.estado===newVal[1]));
      this.refresh();
    },
    filtrar: function(newVal, oldVal) {
    }
  },
  data () {
    return {
      spinner: false,
      selected: null,
      filterText: '',
      total: 0,
      moreParams: this.moreParamsDefault,

      fechainicio: new Date(),
      fechafin: new Date(),

      datos: {
        "links": {
            "pagination": {
              "total": 50, "per_page": 10, "current_page": 1,"last_page": 5,"next_page_url": "...","prev_page_url": "...","from": 1, "to": 10,
            }
          },
          "data": this.$store.getters.casos.filter(item => (item.estado===this.filtroDefecto[0] || item.estado===this.filtroDefecto[1]))
      },

      fields: [
        {
          name: 'id',
          title: 'id',
          visible: false
        },
        {
            name: 'fecha',
            title: '<span class="orderList"><i class="far fa-calendar-alt"></i> Fecha</span>',
            titleClass: 'text-center',
            dataClass: 'text-center',
            sortField: 'fecha',
            callback: (value) => {
              return this.formatDate(value, 'DD/MM/YYYY');
            }
        },
        {
          name: 'codigo',
          title: '<span class="orderList"><i class="far fa-file"></i> Código</span>',
          sortField: 'codigo'
        },
        {
          name: 'nombre',
          title: '<span class="orderList"><i class="glyphicon glyphicon-user"></i> Nombre</span>'
        },
        {
          name: 'direccion',
          title: '<span class="orderList"><i class="fa fa-map-signs"></i> Dirección</span>'
        },
        {
          name: 'telefono',
          title: '<span class="orderList"><i class="fa fa-phone-alt"></i> Teléfono</span>'
        },
        {
          name: 'email',
          title: '<span class="orderList"><i class="far fa-envelope"></i> Email</span>'
        },

        {
          name: 'estado',
          title: '<span class="orderList">Estado</span>',
          sortField: 'estado',
          callback: (value) => {
            return this.estadoLabel (value);
          },
        }
      ],
      sortOrder: [
        { field: 'fecha', direction: 'desc' }
      ],
      css: tableConf.css,
    }
  },
  computed: {

  },
  methods: {
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
        this.total = (paginationData.total?paginationData.total:0);
        this.$emit('updateTotal', this.total);
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      onLoading() {
        this.spinner = true
      },
      onLoaded() {
        this.spinner = false;
      },

      doFilter () {
        if (!this.moreParams) {
          this.moreParams = {};
        }
        this.moreParams['filter'] = this.filterText;
        Vue.nextTick( () => this.$refs.vuetable.refresh());
      },
      refresh() {
        Vue.nextTick( () => this.$refs.vuetable.refresh());
      },
      rowClassCB (data, index) {
        if (this.selected && this.selected.id === data.id) {
          return 'selectedRow';
        } else {
          return (index % 2) === 0 ? 'odd' : 'even';
        }
      },

      onRowClicked (data, field, event) {
        this.selected = data;
      },
      getSelected() {
        return this.selected;
      },
      abrirCaso() {
        this.$store.commit('changecaso', this.selected);
        this.$router.replace({name: "caso", params: {id: this.selected.id}});
      },


    //////////////////////////////////////////////////////////////
    estadoLabel (value) {
      let ret ='<span></span>';
      switch (value) {
        case "PC":
          ret = "<span class='label label-danger'>Pendiente contacto</span>";
          break;
        case "CO":
          ret = "<span class='label label-info'>Contactado</span>";
          break;
        case "PT":
          ret = "<span class='label label-warning'>Pendiente prueba</span>";
          break;
        case "PR":
          ret = "<span class='label label-default'>Pendiente resultado</span>";
          break;
        case "PE":
          ret = "<span class='label label-primary'>Pendiente evolución</span>";
          break;
        case "FI":
          ret = "<span class='label label-success'>Finalizado</span>";
          break;
        default:
          ret =  "<span></span>";
      }
      return ret;
    },

    formatDate (value, fmt = 'DD/MM/YYYY') {
      return (value == null)
        ? '<span></span>'
        : '<span>'+ moment(value).format(fmt) + '</span>';
    },
    //////////////////////////////////////////////////////////////

  },
}
</script>

<style lang="css">
.t-danger {
  color: #d9534f;
}
.bottom-align {

}

</style>
