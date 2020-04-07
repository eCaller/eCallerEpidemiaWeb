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
  <div class="row">
    <div class="col-lg-12">
      <alert v-model="mensajeError" placement="top-right" type="danger" duration="3000" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <strong>{{$t('messages.error')}}</strong>
        <p>{{mensajeError}}</p>
      </alert>

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
            <spinner ref="spinner" v-model="spinner" size="xl" :text="$t('messages.loading')"></spinner>

            <div class="row bottom-align ">
              <div class="col-md-2" v-if="filtrar && false">
                <label class="control-label">Fecha inicio</label>
                <datepicker name="fini" v-model="fechainicio" :format="$t('formatos.fecha')" ></datepicker>
              </div>
              <div class="col-md-2" v-if="filtrar && false">
                <label class="control-label">Fecha fin</label>
                <datepicker name="ffin" v-model="fechafin" :format="$t('formatos.fecha')" ></datepicker>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label">{{$t('messages.buscar')}}</label>
                  <bs-input v-model="filterText" :placeholder="$t('caso.busqueda-codigo-nombre-direccion')" style="width: 100%;"></bs-input>
                </div>
              </div>

              <div class="col-md-1" style="display: grid;">
                <label class="control-label">&nbsp;</label>
                <button class="btn btn-primary" @click="doFilter">{{$t('messages.buscar')}}</button>
              </div>
              <div class="col-md-1" style="display: grid;">
                <label class="control-label">&nbsp;</label>
                <button class="btn btn-default" @click="resetFilter">{{$t('messages.limpiar')}}</button>
              </div>
            </div>

            <br>
            <vuetable ref="vuetable" v-show="!spinner"
              :api-url="apiUrl"
              pagination-path=""
              :fields="fields"
              :sort-order="sortOrder"
              :css="css.table"
              :per-page="6"
              :append-params="moreParams"
              :row-class="rowClassCB"
              :http-fetch="myFetch"
              :no-data-template="$t('messages.sin-datos')"
              @vuetable:pagination-data="onPaginationData"
              @vuetable:loading="onLoading"
              @vuetable:loaded="onLoaded"
              @vuetable:row-clicked="onRowClicked"
            ></vuetable>
            <div class="col-md-1">
              <vuetable-pagination-info ref="paginationInfo"
                :info-template="$t('messages.total-total-filas')"
                no-data-template=""
              ></vuetable-pagination-info>
            </div>
            <div class="col-md-11">
              <vuetable-pagination-bootstrap ref="pagination"
                :css="css.pagination"
                @vuetable-pagination:change-page="onChangePage"
              ></vuetable-pagination-bootstrap>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-primary pull-right my-btn" @click="abrirCaso()">{{$t('caso.abrir-caso')}}</button>
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
import VuetablePaginationBootstrap  from 'vuetable-2/src/components/VuetablePagination.vue';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import tableConf from '../../store/table-configuration.js';
import axiosCustom from '../../store/axios-custom.js';
import moment from 'moment';
import {mapMutations} from 'vuex';
import { i18n } from '@/plugins/i18n';

export default {
  components: {
    'panel': VueStrap.panel,
    'spinner': VueStrap.spinner,
    'alert': VueStrap.alert,
    'v-select': VueStrap.select,
    'v-option': VueStrap.option,
    'bs-input': VueStrap.input,
    'datepicker': VueStrap.datepicker,

    Vuetable,
    VuetablePaginationBootstrap,
    VuetablePaginationInfo
  },
  props: {
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
      type: Object,
      default: () => {estados: "cita"}
    },
    tipo: {
      type: String,
      default: 'C'
    }
  },

  watch: {
  	titulo (newVal, oldVal) { },
    moreParamsDefault (newVal, oldVal) {
      this.moreParams = this.moreParamsDefault;
      this.filterText = "";
      this.refresh();
    },
  },
  data () {
    return {
      spinner: false,
      selected: null,
      mensajeError: null,
      filterText: '',
      total: 0,
      moreParams: this.moreParamsDefault,

      fechainicio: moment().format('DD/MM/YYYY'),
      fechafin: moment().format('DD/MM/YYYY'),

      fields: [
        { name: 'id', title: 'id', visible: false },
        { name: 'fecha', title: () =>'<span class="orderList"><i class="far fa-calendar-alt"></i> ' + i18n.t('messages.fecha') +'</span>',
          titleClass: 'text-center', dataClass: 'text-center', sortField: 'fecha',
          callback: (value) => {
            return this.formatDate(value, i18n.t('formatos.fecha'));
          }
        },
        { name: 'codigo', title: () => '<span class="orderList"><i class="far fa-file"></i> '+ i18n.t('messages.codigo') + '</span>', sortField: 'codigo' },
        { name: 'nombre', title:  () => '<span class="orderList"><i class="glyphicon glyphicon-user"></i> '+ i18n.t('caso.nombre') + '</span>', sortField: 'nombre' },
        { name: 'direccion', title: () => '<span class="orderList"><i class="fa fa-map-signs"></i> '+ i18n.t('caso.direccion') + '</span>' },
        { name: 'telefono', title: () => '<span class="orderList"><i class="fa fa-phone-alt"></i> '+ i18n.t('caso.telefono') + '</span>' },
        { name: 'email', title: () => '<span class="orderList"><i class="far fa-envelope"></i> '+ i18n.t('caso.email') + '</span>' },
        { name: 'estado', title: () => '<span class="orderList">'+ i18n.t('caso.estado') + '</span>', sortField: 'estado',
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
      myFetch(apiUrl, httpOptions){
        return axiosCustom.axiosParaVueTable(this.$store.state.usuario.access_token).get(apiUrl, httpOptions);
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData);
        this.$refs.paginationInfo.setPaginationData(paginationData);
        this.total = (paginationData.total?paginationData.total:0);
        this.$emit('updateTotal', {tipo:this.tipo, total: this.total});
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
        this.refresh();
      },
      resetFilter () {
        this.filterText = '';
        this.moreParams['filter'] = null;
        this.refresh();
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
        if (!this.selected) {
          this.mensajeError = i18n.t('messages.seleccionar-una-fila');
        } else {
          this.setCaso({caso:null});
          this.$router.replace({name: "caso", params: {id: this.selected.id}});
        }
      },


    //////////////////////////////////////////////////////////////
    estadoLabel (value) {
      let ret ='<span></span>';
      switch (value) {
        case "PC":
          ret = "<span class='label label-danger'>" + i18n.t('caso.estado-pendiente-contacto') + "</span>";
          break;
        case "CO":
          ret = "<span class='label label-info'>" + i18n.t('caso.estado-contactado') + "</span>";
          break;
        case "PT":
          ret = "<span class='label label-warning'>" + i18n.t('caso.estado-pendiente-prueba') + "</span>";
          break;
        case "PR":
          ret = "<span class='label label-default'>" + i18n.t('caso.estado-pendiente-resultado') + "</span>";
          break;
        case "PE":
          ret = "<span class='label label-primary'>" + i18n.t('caso.estado-pendiente-evolucion') + "</span>";
          break;
        case "FI":
          ret = "<span class='label label-success'>" + i18n.t('caso.estado-finalizado') + "</span>";
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
    ...mapMutations({
      setCaso: 'setCaso',
    }),


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
