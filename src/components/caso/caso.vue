<template lang="html">
  <div id="page-wrapper" :class="[{'full-width-div': fullscreen}]">
    <spinner ref="spinner" v-model="spinner" size="xl" text="Cargando"></spinner>

    <div class="row"><div class="col-md-12"><h1 class="page-header-clean"></h1></div></div>

    <alert v-model="mensajeError" placement="top-right" type="danger" duration="3000" dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>¡Error!</strong>
      <p>{{mensajeError}}</p>
    </alert>

    <div class="row">
      <div class="col-md-12">
      	<h3>
      	   <i class="far fa-file fa-fw"></i> <label> Caso </label><span> {{caso.codigo}} </span><i class="far fa-clock fa-fw"></i><span> {{hora}} </span>
           <span><resultadofisico :codigo="caso.resultadotest"></resultadofisico></span>
           <span class="pull-right"><estado :codigo="caso.estado"></estado></span>
  			</h3>
  		</div>
		</div>

    <tabs v-model="activeTab" nav-style="tabs">
      <tab header="<i class='far fa-file fa-fw'></i> Datos caso">
        <panel type="info">
          <template slot="header">
            <i class="far fa-file fa-fw"></i> <label> Caso </label><span> {{caso.codigo}} </span>
            <i class="far fa-clock fa-fw"></i><span> {{hora}} </span>
          </template>

          <div class="row">
            <div class="col-md-8">

              <div class="row">
                <div class="col-md-12">
                  <bs-input label="Nombre" placeholder="Nombre" v-model="caso.nombre" :disabled="isDisabled"></bs-input>
                </div>
                <div class="col-md-12" style="padding-bottom:5px">
                  <label for="mapadir" class="control-label">Dirección</label>
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

                <div class="col-md-2">
                  <bs-input label="Teléfono" placeholder="Teléfono" v-model="caso.telefono" :disabled="isDisabled"></bs-input>
                </div>

                <div class="col-md-3">
                  <bs-input label="Email" placeholder="Email" v-model="caso.email" :disabled="isDisabled"></bs-input>
                </div>

                <div class="col-md-1">
                  <bs-input label="Edad" placeholder="Edad" v-model="caso.edad" :disabled="isDisabled"></bs-input>
                </div>

                <div class="col-md-2">
                  <bs-input label="DNI" placeholder="DNI" v-model="caso.dni" :disabled="isDisabled"></bs-input>
                </div>

                <div class="col-md-12 cell-textArea-display">
                  <bs-input id="observaciones" label="Observaciones" type="textarea" :rows="3" placeholder="Observaciones"
                      v-model.lazy.trim="caso.observaciones"
                      :disabled="isDisabled"></bs-input>
                </div>

                <div class="col-md-12">
                  <div class="row">

                    <div class="col-md-3">
                      <label for="resultado" class="control-label">Resultado prueba física</label>
                      <div class="btn-group btn-group-justified">
                        <v-select id="resultado" close-on-select placeholder=" "
                            v-model="caso.resultadotest"
                            :disabled="isDisabled">
                            <v-option :value="null"></v-option>
                            <v-option value="P">Positivo</v-option>
                            <v-option value="N">Negativo</v-option>
                        </v-select>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <label for="resultado" class="control-label">Resultado final</label>
                      <div class="btn-group btn-group-justified">
                        <v-select id="resultado" close-on-select placeholder=" "
                            v-model="caso.resultado"
                            :disabled="isDisabled">
                            <v-option :value="null"></v-option>
                            <v-option value="R">Recuperado</v-option>
                            <v-option value="D">Deceso</v-option>
                        </v-select>
                      </div>
                    </div>

                    <div class="col-md-2"></div>

                    <div class="col-md-4">
                      <table class="table table-bordered">
                        <thead><tr><th>Fecha</th><th>Estado</th></tr></thead>
                        <tbody>
                          <tr v-for="es in caso.estados" :key="es.id">
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






      <tab header="<i class='fa fa-mobile-alt fa-fw'></i> Respuestas triage">
        <panel type="danger">
          <template slot="header">
            <i class="fa fa-mobile-alt fa-fw"></i> <label> Respuestas triage</label>
          </template>

          <div class="row">
            <div class="col-md-12" v-for="res in caso.respuestas" :key="res.id">
              <dl>
                <dt>{{getPregunta(res.id)[0].pregunta}}</dt>
                <dd><span style="margin-left:10px">- {{res.respuesta}}</span></dd>
              </dl>
            </div>

          </div>
        </panel>
      </tab>








      <tab header="<i class='far fa-calendar fa-fw'></i> Cita">
        <panel type="warning">
          <template slot="header">
            <i class="fa fa-fcalendar fa-fw"></i> <label> Cita </label>
          </template>

          <div class="row">
            <div class="col-md-2">
              <label class="control-label">Fecha</label>
              <datepicker v-model="caso.cita.fecha" format="dd/MM/yyyy" placeholder="Fecha"></datepicker>
            </div>
            <div class="col-md-1">
              <bs-input label="Hora" placeholder="Hora" v-model="caso.cita.hora" type="time"></bs-input>
            </div>

            <div class="col-md-2">
              <label for="tipo" class="control-label">Tipo</label>
              <div class="btn-group btn-group-justified">
                <v-select id="tipo" close-on-select placeholder="Tipo"
                    v-model="caso.cita.tipo">
                    <v-option :value="null"></v-option>
                    <v-option value="D">Domicilio</v-option>
                    <v-option value="C">Centro</v-option>
                </v-select>
              </div>
            </div>

            <div class="col-md-12" v-if="caso.cita.tipo==='C'">
              <label class="control-label">Centro</label>
              <div class="btn-group btn-group-justified">
                <v-select close-on-select placeholder="Centro"
                    v-model="caso.cita.idcentro" :options="centros" options-label="nombre" options-value="id"
                    search justified
                    clear-button>
                </v-select>
              </div>
            </div>

            <div class="col-md-12 cell-textArea-display">
              <bs-input id="comentario" label="Comentarios" type="textarea" :rows="3" placeholder="Comentarios"
                  v-model.lazy.trim="caso.cita.comentario"></bs-input>
            </div>

          </div>
        </panel>
      </tab>









    </tabs>

    <div class="col-md-12">
      <button class="btn btn-primary pull-right my-btn" v-if="caso.estado!=='FI'">Guardar caso</button>
      <button class="btn btn-primary pull-right my-btn" v-if="caso.estado==='PC'">Contactado</button>
      <button class="btn btn-default pull-right my-btn" v-if="caso.estado==='PC'">Borrar caso</button>
      <button class="btn btn-default pull-right my-btn" @click="volver()">Volver</button>
    </div>
    <div class="col-md-12"><br></div>

	</div>
</template>

<script>
import VueStrap from 'vue-strap';
import estado from './estado.vue';
import resultadofisico from './resultadofisico.vue';
import {mapState} from 'vuex';
import axios from 'axios';
import moment from 'moment';
import datetimepicker from '../utils/datetimepicker.vue';
import * as VueGoogleMaps from 'vue2-google-maps';

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
    estado: estado,
    resultadofisico: resultadofisico,
  },
  data () {
    return {
      spinner: false,
      fullscreen: false,
      mensajeError: null,
      showConfirm: false,
      showParte: false,
      activeTab: 0,
      navisos: 0,
      nrecursos: 0,

      caso: this.$store.getters.caso,

      centros: this.$store.getters.centros,

      valoranterior: null,
      center: {lat: this.$store.getters.caso.lat, lng: this.$store.getters.caso.lng},

    }
  },
  computed: mapState({
    hora() {
      if (this.caso.fecha) {
        var date = moment(new Date(this.caso.fecha));
        return date.format("DD/MM/YYYY HH:mm");
      } else {
        return "";
      }
    },
    isDisabled() {return this.caso===null || this.caso.estado===null || (this.caso.estado!=='PC' && this.caso.estado!=='CO')},
    markers() {
      return [{
        position: this.center
      }]
    }
  }),
  watch: {
  },
  created() {
  },
  mounted() {
    this.$refs.direccion.$el.value = this.caso.direccion;
  },
  methods: {
    addMensajeError(mensaje) {
      if (!this.mensajeError) {
        this.mensajeError="";
      }
      this.mensajeError += " " + mensaje;
    },

    getObjetoLista(campo, valor) {
      var ret = null;
      if (this.combos[campo]) {
        ret = this.combos[campo][this.combos[campo].findIndex(el => el.id === valor)];
      }
      return ret;
    },

    guardarDatos() {
      //TODO
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
        return date.format("DD/MM/YYYY HH:mm");
      } else {
        return "";
      }
    },

    getPregunta(idrespuesta) {
      if (idrespuesta) {
        return this.$store.getters.getPregunta(idrespuesta);
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
</style>
