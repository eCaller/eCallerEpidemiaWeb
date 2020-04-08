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
  <div>

    <div id="page-wrapper" v-if="caso===null">
      <div class="row"><div class="col-md-12"><h1 class="page-header-clean"></h1></div></div>
      <div class="row">
        <div class="col-md-12">
          <h3>{{mensajeError}}</h3>
        </div>
        <div class="col-md-12">
          <button class="btn btn-default pull-right my-btn" @click="volver()">{{$t('messages.volver')}}</button>
        </div>
      </div>
    </div>

    <div id="page-wrapper" v-if="caso!==null">
      <alert v-model="mensajeError" placement="top-right" type="danger" duration="3000" width="400px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <strong>{{$t('messages.error')}}!</strong>
        <p>{{mensajeError}}</p>
      </alert>
      <alert v-model="mensajeInfo" placement="top-right" type="success" duration="3000" width="400px" dismissable>
        <span class="icon-info-circled alert-icon-float-left"></span>
        <strong>{{$t('messages.informacion')}}</strong>
        <p>{{mensajeInfo}}</p>
      </alert>

      <spinner ref="spinner" v-model="spinner" size="xl" :text="$t('messages.loading')"></spinner>

      <div class="row">
        <div class="col-md-12">
        	<h3>
        	   <i class="far fa-file fa-fw"></i> <label> {{ $t('caso.caso') }} </label><span> {{caso.codigo}} </span><i class="far fa-clock fa-fw"></i><span> {{hora}} </span>
             <span><resultadofisico :codigo="caso.resultadotest"></resultadofisico></span>
             <span class="pull-right"><estado :codigo="caso.estado"></estado></span>
    			</h3>
    		</div>
  		</div>

      <tabs v-model="activeTab" nav-style="tabs">
        <tab :header="'<i class=\'far fa-file fa-fw\'></i> ' + $t('caso.datos-caso') ">
          <panel type="info">
            <template slot="header">
              <i class="far fa-file fa-fw"></i> <label> {{$t('caso.caso')}} </label><span> {{caso.codigo}} </span>
              <i class="far fa-clock fa-fw"></i><span> {{hora}} </span>
              <div class="pull-right">
                <button type="button" class="btn btn-default btn-xs" @click="reload()">
                  <i class="fa fa-sync fa-fw"></i>
                </button>
              </div>
            </template>

            <div class="row">
              <div class="col-md-8">

                <div class="row">
                  <div class="col-md-12">
                    <bs-input :label="$t('caso.nombre') + '*'" :placeholder="$t('caso.nombre')" v-model="caso.nombre" :disabled="isDisabled"></bs-input>
                  </div>
                  <div class="col-md-8">
                    <label for="mapadir" class="control-label">{{$t('caso.direccion') + '*'}}</label>
                    <div class="input-group">
                      <gmap-autocomplete
                        ref="direccion"
                        id="mapadir"
                        class="form-control"
                        :disabled="isDisabled"
                        @place_changed="setPlace"
                        @focus="focusAddress"
                        @blur="lostfocusAddress">
                      </gmap-autocomplete>
                       <span class="input-group-btn">
                         <button class="btn btn-default" type="button" @click="centrar()"><i class="fa fa-search"></i></button>
                       </span>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label class="control-label">{{$t('caso.municipio') + '*'}}</label>
                    <button-group justified>
                      <v-select v-model="idmunicipio" :options="municipios" options-label="nombre" options-value="id" :disabled="isDisabled"
                        show-count
                        :placeholder="$t('messages.combo-seleccione')"
                        search justified
                        clear-button
                      ></v-select></button-group>
                  </div>

                  <div class="col-md-3">
                    <bs-input :label="$t('caso.telefono') + '*'" :placeholder="$t('caso.telefono')" v-model="caso.telefono" :disabled="isDisabled"></bs-input>
                  </div>

                  <div class="col-md-3">
                    <bs-input :label="$t('caso.email')" :placeholder="$t('caso.email')" v-model="caso.email" :disabled="isDisabled"></bs-input>
                  </div>

                  <div class="col-md-1">
                    <bs-input :label="$t('caso.edad')" :placeholder="$t('caso.edad')" v-model="caso.edad" :disabled="isDisabled"></bs-input>
                  </div>

                  <div class="col-md-2">
                    <bs-input :label="$t('caso.dni') + '*'" :placeholder="$t('caso.dni')" v-model="caso.dni" :disabled="isDisabled"></bs-input>
                  </div>

                  <div class="col-md-12 cell-textArea-display">
                    <bs-input id="observaciones" :label="$t('caso.observaciones')" type="textarea" :rows="3" :placeholder="$t('caso.observaciones')"
                        v-model.lazy.trim="caso.observaciones"
                        :disabled="caso.estado==='FI'"></bs-input>
                  </div>

                  <div class="col-md-12">
                    <div class="row">

                      <div class="col-md-3">
                        <label for="resultado" class="control-label">{{$t('caso.resultado-prueba-fisica')}}</label>
                        <div class="btn-group btn-group-justified">
                          <v-select id="resultado" close-on-select placeholder=" "
                              v-model="caso.resultadotest" clear-button
                              :disabled="caso.estado==='FI'">
                              <v-option :value="null"></v-option>
                              <v-option value="P">{{$t('caso.resultado-positivo')}}</v-option>
                              <v-option value="N">{{$t('caso.resultado-negativo')}}</v-option>
                          </v-select>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <label for="resultado" class="control-label">{{$t('caso.resultado-final')}}</label>
                        <div class="btn-group btn-group-justified">
                          <v-select id="resultado" close-on-select placeholder=" "
                              v-model="caso.resultado" clear-button
                              :disabled="caso.estado==='FI'">
                              <v-option :value="null"></v-option>
                              <v-option value="R">{{$t('caso.resultado-recuperado')}}</v-option>
                              <v-option value="D">{{$t('caso.resultado-deceso')}}</v-option>
                          </v-select>
                        </div>
                      </div>

                      <div class="col-md-2"></div>

                      <div class="col-md-4">
                        <table class="table table-bordered">
                          <thead><tr><th>{{$t('messages.fecha')}}</th><th>{{$t('caso.estado')}}</th></tr></thead>
                          <tbody>
                            <tr v-for="es in caso.casosxestados" :key="es.id">
                              <td>{{getFechaFormated(es.fecha)}}</td><td><estado :codigo="es.estado"></estado></td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div class="col-md-4">
                <gmap-map ref="mapa"
                    :center="center"
                    :zoom="11"
                    :clickable="false"
                    :draggable="false"
                    :mapTypeControl="false"
                    :scaleControl="false"
                    :streetViewControl="false"
                    :rotateControl="false"
                    :fullscreenControl="false"
                    style="width: 100%; height: 400px"
                >
                <gmap-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      :clickable="true"
                      :draggable="true"
                      @click="center=m.position"
                    ></gmap-marker>
                </gmap-map>
              </div>

            </div>

          </panel>
        </tab>

        <tab :header="'<i class=\'fa fa-mobile-alt fa-fw\'></i> ' + $t('caso.respuestas-triage') " v-if="triagecaso">
          <panel type="danger">
            <template slot="header">
              <i class="fa fa-mobile-alt fa-fw"></i> <label> {{$t('caso.respuestas-triage')}}</label>
            </template>

            <div class="row">
              <div class="col-md-12" v-for="res in triagecaso" :key="res.idrespuesta">
                <dl>
                  <dt>{{res.pregunta}}</dt>
                  <dd><span style="margin-left:10px">- {{res.respuesta}}</span></dd>
                </dl>
              </div>

            </div>
          </panel>
        </tab>

        <tab :header="'<i class=\'far fa-calendar fa-fw\'></i> ' + $t('caso.cita') " >
          <panel type="warning">
            <template slot="header">
              <i class="far fa-calendar fa-fw"></i> <label> {{$t('caso.cita')}} </label>
            </template>

            <div class="row" v-if="caso.citas && caso.citas.length>0">
              <div class="col-md-2">
                <label class="control-label">{{ $t('messages.fecha') + '*' }}</label>
                <div class="btn-group btn-group-justified">
                  <datetimepicker name="dtpicker"
                    ref="fechacita"
                    :disabled="isDisabledCita" @change="fechaCita"></datetimepicker>
                </div>
              </div>
              <div class="col-md-2">
                <label class="control-label">{{$t('messages.hora') + '*'}}</label>
                <div class="btn-group btn-group-justified">
                  <timepicker
                    ref="horacita" :disabled="isDisabledCita" @change="horaCita"></timepicker>
                </div>
              </div>

              <div class="col-md-2">
                <label for="tipo" class="control-label">{{$t('messages.tipo') + '*'}}</label>
                <div class="btn-group btn-group-justified">
                  <v-select id="tipo" close-on-select :placeholder="$t('messages.combo-seleccione')" :disabled="isDisabledCita"
                      v-model="caso.citas[0].tipo" @change="chageTipoCita">
                      <v-option :value="null"></v-option>
                      <v-option value="D">{{$t('caso.domicilio')}}</v-option>
                      <v-option value="C">{{$t('caso.centro')}}</v-option>
                  </v-select>
                </div>
              </div>

              <div class="col-md-6" v-if="caso.citas[0].tipo==='C' && caso.citas[0].centro !== null">
                <label class="control-label">{{$t('caso.centro')}}</label>
                <div class="btn-group btn-group-justified">
                  <v-select close-on-select :placeholder="$t('messages.combo-seleccione')" :disabled="isDisabledCita"
                      v-model="caso.citas[0].centro.id" :options="centros" options-label="nombre" options-value="id"
                      search justified
                      clear-button>
                  </v-select>
                </div>
              </div>

              <div class="col-md-12 cell-textArea-display">
                <bs-input id="comentario" :label="$t('caso.comentarios')" type="textarea" :rows="3" :placeholder="$t('caso.comentarios')" :disabled="isDisabledCita"
                    v-model.lazy.trim="caso.citas[0].comentarios"></bs-input>
              </div>

            </div>
          </panel>
        </tab>

      </tabs>

      <div class="col-md-12">
        <button class="btn btn-primary pull-right my-btn" @click="guardarDatos()" v-if="caso.estado!=='FI'">{{$t('caso.guardar-caso')}}</button>
        <button class="btn btn-info pull-right my-btn" @click="setcontactado()" v-if="caso.estado==='PC'">{{$t('caso.estado-paciente-contactado')}}</button>
        <button class="btn btn-info pull-right my-btn" @click="setresultadotest()" v-if="caso.estado==='PT'">{{$t('caso.pendiente-resultado-test')}}</button>
        <button class="btn btn-info pull-right my-btn" @click="gestionarcita()" v-if="(caso.estado==='PC' || caso.estado==='CO') && activeTab!==2">{{$t('caso.gestionar-cita')}}</button>
        <button class="btn btn-default pull-right my-btn" @click="volver()">{{$t('messages.volver')}}</button>
      </div>
      <div class="col-md-12"><br></div>

  	</div>
  </div>
</template>

<script>
import VueStrap from 'vue-strap';
import estado from './estado.vue';
import resultadofisico from './resultadofisico.vue';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import moment from 'moment';
import datetimepicker from '../utils/datetimepicker.vue';
import timepicker from '../utils/timepicker.vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { i18n } from '@/plugins/i18n';

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
    'datepicker': VueStrap.datepicker,

    datetimepicker: datetimepicker,
    timepicker: timepicker,
    estado: estado,
    resultadofisico: resultadofisico,
  },
  data () {
    return {
      spinner: false,
      fullscreen: false,
      mensajeError: null,
      mensajeInfo: null,
      activeTab: 0,

      idmunicipio: null,
      valoranterior: null,
      center: this.$store.getters.configuracion.general.center,

      contactado: false,
      resultadotestp: false,

    }
  },
  computed: {
    ...mapGetters(['caso','triagecaso','municipios','centros']),
    hora() {
      if (this.caso && this.caso.fecha) {
        var date = moment(this.caso.fecha);
        return date.format(i18n.t('formatos.fecha-hora'));
      } else {
        return "";
      }
    },
    isDisabled() {return this.caso===null || this.caso.estado===null || (this.caso.estado!=='PC' && this.caso.estado!=='CO')},
    isDisabledCita() {return this.caso===null || this.caso.estado===null || (this.caso.estado!=='PC' && this.caso.estado!=='CO' && this.caso.estado!=='PT')},
    markers() {
      if (this.center) {
        return [{
          position: this.center
        }];
      } else {
        return null;
      }
    }
  },
  watch: {
    triagecaso (newValue, oldValue) {},
    municipios(newValue, oldValue) {},
    idmunicipio(newValue, oldValue) {
      this.selectMunicipio(this.idmunicipio);
    },
    activeTab (newValue, oldValue) {},
  },
  created() {
  },
  mounted() {
    console.log("-- RECUPERA LOS DATOS DEL CASO " + this.$route.params.id);
    this.fetchCaso(this.$route.params.id).then((respuesta) => {
        if (respuesta.status == 200) {
          if (respuesta.data.success) {
            //guardamos el dato en store
            this.$store.dispatch("changecaso", respuesta.data.data).then(() => {
              console.log(this.caso);
              if (this.caso) {
                //console.log(this.caso);
                if (this.$refs.direccion) {
                  this.$refs.direccion.$el.value = this.caso.direccion;
                }
                this.center = {lat: this.caso.lat, lng: this.caso.lng};
                this.fetchMunicipios();
                this.fetchCentros();
                this.rellenaPreguntas(this.caso.id);

                this.idmunicipio = (this.caso.municipio && this.caso.municipio.id?this.caso.municipio.id:null);
                if (!this.caso.citas || this.caso.citas.length<=0) {
                    this.caso.citas=[{id:null, fecha: null, hora: null, tipo: null, centro: null}];
                }

                if (this.caso.citas && this.caso.citas.length>0) {
                  if (this.$refs.fechacita && this.caso.citas[0].fecha) {
                    this.$refs.fechacita.$refs.fecha.value = moment(this.caso.citas[0].fecha).format(i18n.t('formatos.fecha'));
                  }

                  if (this.$refs.horacita && this.caso.citas[0].hora) {
                    this.$refs.horacita.$refs.hora.value = moment(this.caso.citas[0].hora, "LTS").format(i18n.t('formatos.hora')); //this.caso.citas[0].hora.substring(0, 5);
                  }

                  this.chageTipoCita(this.caso.citas[0].tipo);
                }

              } else {
                this.mensajeError = i18n.t('caso.error-carga-caso');
              }
            }, (error)=> {
              this.mensajeError = i18n.t('caso.error-recuperar-caso');
              console.error(error);
            });
          } else {
            console.error(respuesta.data.message);
            this.mensajeError = respuesta.data.message;
          }
        } else {
          console.error("Respuesta status: " + respuesta.status);
          this.mensajeError = i18n.t('caso.error-recuperar-caso');
        }
      }).catch((error) => {
        console.error(error);
        this.mensajeError = i18n.t('caso.error-recuperar-caso');
      });

  },
  methods: {
    getObjetoLista(campo, valor) {
      var ret = null;
      if (this.combos[campo]) {
        ret = this.combos[campo][this.combos[campo].findIndex(el => el.id === valor)];
      }
      return ret;
    },

    rellenaPreguntas(id) {
        if (id) {
          this.fetchTriageCaso(id);
        }
    },

    guardarDatos() {
      if (!this.caso.nombre || this.isEmpty(this.caso.nombre)) {
        this.mensajeError = i18n.t('caso.error-indicar-nombre');
        return;
      } else if (!this.caso.direccion || this.isEmpty(this.caso.direccion)) {
        this.mensajeError = i18n.t('caso.error-indicar-direccion');
        return;
      } else if (!this.caso.dni || this.isEmpty(this.caso.dni)) {
        this.mensajeError = i18n.t('caso.error-indicar-dni');
        return;
      } else if (!this.caso.telefono || this.isEmpty(this.caso.telefono)) {
        this.mensajeError = i18n.t('caso.error-indicar-telefono');
        return;
      } else {
        if (this.caso.citas && this.caso.citas.length>0) {
          //Datos de la cita. Si hay datos de la fecha, se deben rellenar el resto de datos obligatorios
          if (this.caso.citas[0].fecha) {
            if (!this.caso.citas[0].hora) {
              this.mensajeError = i18n.t('caso.error-indicar-hora-cita');
              return;
            } else if (!this.caso.citas[0].tipo) {
              this.mensajeError = i18n.t('caso.error-tipo-cita');
              return;
            } else if (moment(this.caso.citas[0].hora, "LTS").isValid()) {
              //Formateo de fecha de la cita (si el fotmato es LTS hay que tranformarlo en date)
              this.caso.citas[0].hora = moment(this.caso.citas[0].hora, "LTS");
            }
          }
        }

        //Guardamos el caso
        this.spinner = true;
        try {
          this.saveCaso().then((respuesta) => {
              if (respuesta.status == 200) {
                console.log(respuesta.data.success);
                if (respuesta.data.success) {
                  console.log("** caso guardado")
                  this.spinner = false;
                  this.mensajeInfo = i18n.t('caso.guardar-correcto');

                  //recargamos la página de nuevo
                  this.reload();
                } else {
                  this.addMensajeError(respuesta.data.message, respuesta.data.message);
                }
              } else {
                this.addMensajeError(i18n.t('caso.error-guardar-caso'), i18n.t('caso.respuesta-status',[respuesta.status]));
              }
            }).catch((e) => {
              this.addMensajeError(i18n.t('caso.error-guardar-caso'), e);
            });
          } catch (e) {
            this.addMensajeError(i18n.t('caso.error-guardar-caso'), e);
          }
      }
    },

    reload() {
      var location = this.$route.fullPath
      this.$router.replace('/')
      this.$nextTick(() => this.$router.replace(location))
    },

    addMensajeError(mensaje, e) {
      this.spinner = false;
      this.mensajeError = mensaje;
      if (this.contactado) {
        this.caso.estado="PC";
        this.contactado = false;
      }
      if (this.resultadotestp) {
        this.caso.estado="PT";
        this.resultadotestp = false;
      }

      if (e) {
        console.error(e);
      }
    },

    setcontactado() {
      this.contactado = true;
      this.caso.estado = 'CO';
      this.guardarDatos();
    },

    setresultadotest() {
      this.resultadotestp = true;
      this.caso.estado = 'PR';
      this.guardarDatos();
    },

    gestionarcita() {
      this.activeTab=2;
    },

    fechaCita(fecha) {
      if (this.caso.citas && this.caso.citas.length>0) {
        this.caso.citas[0].fecha = fecha;
      }
    },

    horaCita(hora) {
      if (this.caso.citas && this.caso.citas.length>0) {
        this.caso.citas[0].hora = hora;
      }
    },

    chageTipoCita(tipo) {
      if (tipo==='D') {
        if (this.caso.citas && this.caso.citas.length>0) {
          this.caso.citas[0].centro = null;
        }
      } else if (tipo==='C') {
        if (this.caso.citas && this.caso.citas.length>0 && this.caso.citas[0].centro === null) {
          this.caso.citas[0].centro = {id: null, nombre: null};
        }
      }
    },

    selectMunicipio(idmunicipio) {
      if (idmunicipio && this.municipios) {
        this.caso.municipio = this.municipios.find(i=>i.id === idmunicipio);
      } else {
        this.caso.municipio = null;
      }
    },

    setPlace(place){
      console.log(place)
      this.caso.direccion=place.formatted_address;
      this.caso.lat=place.geometry.location.lat();
      this.caso.lng=place.geometry.location.lng();
      this.center= {lat: this.caso.lat, lng: this.caso.lng};

      this.valoranterior = "-1"; //forzamos el guardado
    },

    focusAddress() {
      this.valoranterior = this.caso.direccion;
    },

    lostfocusAddress() {
      this.caso.direccion=this.$refs.direccion.$el.value;
      if (this.caso.direccion=='') {
        this.caso.lat=null;
        this.caso.lng=null;

        this.center = null;
      }
    },

    getFechaFormated(fecha) {
      if (fecha) {
        var date = moment(new Date(fecha));
        return date.format(i18n.t("formatos.fecha-hora"));
      } else {
        return "";
      }
    },

    centrar() {
      this.$refs.mapa.panTo({
        lat : this.caso.lat,
        lng : this.caso.lng
      });
    },

    volver() {
      this.$router.push("/main/");
    },

    isEmpty(e) {
      switch (e) {
        case "":
        case null:
        case false:
        case typeof(e) == "undefined":
          return true;
        default:
          return false;
      }
    },
    //////////////////////////////////////////////////////////////////////
    ...mapActions({
      fetchCaso: 'fetchCaso',
      fetchTriageCaso: 'fetchTriageCaso',
      fetchMunicipios: 'fetchMunicipios',
      fetchCentros: 'fetchCentros',
      saveCaso: 'saveCaso',
    }),
  },

}
</script>

<style lang="css">
.mapaconf {
  max-height: 400px;
  overflow: auto;
}
.t-primary {
    color: #337ab7;
}
.bootstrap-datetimepicker-widget.dropdown-menu {
    display: block;
    margin: 2px 0;
    padding: 4px;
    width: 100%;
}
</style>
