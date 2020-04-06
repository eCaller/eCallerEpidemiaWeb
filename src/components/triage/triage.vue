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
    <spinner ref="spinner" v-model="spinner" size="xl" text="Cargando"></spinner>

    <alert v-model="mensajeError" placement="top-right" type="danger" duration="3000" dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>¡Error!</strong>
      <p>{{mensajeError}}</p>
    </alert>
    <alert v-model="mensajeInfo" placement="top-right" type="success" duration="3000" dismissable>
      <span class="icon-info-circled alert-icon-float-left"></span>
      <strong>Información</strong>
      <p>{{mensajeInfo}}</p>
    </alert>

    <div class="row">
      <div class="col-md-12">
      	<h3>
      	   <i class="fa fa-edit fa-fw"></i> <label>Diseño del triage </label>
           <span class="pull-right"><button class="btn btn-default" @click="reload()"><i class="fa fa-sync fa-fw"></i></button></span>
  			</h3>
  		</div>
		</div>

    <div class="row">
      <div class="col-md-8">

        <accordion type="info">
          <panel type="info" is-open v-for="preg in triage" :key="preg.orden">
            <template slot="header">
              <i class="fa fa-question fa-fw"></i> <label> Pregunta {{preg.codigo}}.</label><span> {{preg.pregunta}}</span>
              <div class="pull-right">
                <i class="fa fa-chevron-up fa-fw"></i>
              </div>
            </template>

            <div class="row">
              <div class="col-md-8">
                <bs-input label="Pregunta*" placeholder="Pregunta" v-model="preg.pregunta" :maxlength="5000"></bs-input>
              </div>
              <div class="col-md-3">
                <label for="tipo" class="control-label">Tipo*</label>
                <div class="btn-group btn-group-justified">
                  <v-select id="tipo" close-on-select placeholder=" "
                        v-model="preg.tipo">
                      <v-option value="R"><i class='far fa-dot-circle'></i> Seleccionar</v-option>
                      <v-option value="C"><i class='far fa-check-square'></i> Casillas verificación</v-option>
                  </v-select>
                </div>
              </div>
              <div class="col-md-1" style="display: grid;">
                <label class="control-label">&nbsp;</label>
                <button class="btn btn-warning" @click="borrarPregunta(preg.orden)">Borrar</i></button>
              </div>
              <div class="col-md-12"><br></div>
              <div class="col-md-1"></div>
              <div class="col-md-11">


                <panel type="default" >
                  <template slot="header">
                    <i class="fa fa-arrow-right fa-fw"></i> <label> Respuestas </label>
                  </template>
                  <div class="row">
                    <div class="col-md-10">
                      <div class="row" v-for="resp in preg.respuestas" :key="resp.orden">
                        <div class="col-md-2" style="text-align: right;">{{preg.codigo}} - {{resp.codigo}}</div>
                        <div class="col-md-8">
                          <bs-input placeholder="Respuesta" v-model="resp.respuesta" :maxlength="1000"></bs-input>
                        </div>
                        <div class="col-md-2">
                          <button class="btn btn-danger" @click="borrarRespuesta(preg.orden, resp.orden)"><i class="fa fa-times fa-fw"></i></button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <button class="btn btn-info" @click="nuevaRespuesta(preg.orden)">Añadir respuesta</button>
                    </div>
                  </div>

                </panel>



              </div>
            </div>
          </panel>

        </accordion>
        <div class="col-md-10"></div>
        <div class="col-md-2">
          <button class="btn btn-primary" @click="nuevaPregunta()">Añadir pregunta</button>
        </div>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-12">



            <panel type="danger" >
              <template slot="header">
                <i class="fa fa-arrow-right fa-fw"></i> <label> Respuestas caso positivo </label>
              </template>
              <div class="row">
                <div class="col-md-12" v-for="conf in casospositivos" :key="conf.id">
                  <label> Combinación {{conf.id}} </label> <button class="btn btn-warning margencombinacion" @click="borrarCombinacion(conf.id)">Borrar</button><br>
                  <span v-for="opconf in conf.respuestas" :key="opconf.id">
                    <v-select close-on-select class="margencombinacion"
                        :value="opconf.id" placeholder="Seleccione"
                        :options="opcionesrespuesta" v-model="opconf.id"
                        options-value="val"></v-select><button class="btn btn-danger margencombinacion" @click="borrarOpcionCombinacion(conf.id, opconf.id)"><i class="fa fa-times fa-fw"></i></button>&nbsp;
                  </span>
                  <button class="btn btn-default margencombinacion" @click="nuevaOpcionCombinacion(conf.id)"><i class="fa fa-plus fa-fw"></i></button>

                  <div class="col-md-12"><br></div>
                </div>

                <div class="col-md-12"><button class="btn btn-info pull-right my-btn" @click="nuevaCombinacion()">Añadir combinación</button></div>
                <div class="col-md-12"><br></div>
                <div class="col-md-12">
                  <bs-input type="textarea" label="Respuesta en caso positivo" v-model="respuestapositivo.valor" :rows="5"></bs-input>
                  <br>
                  <span v-html="respuestapositivo.valor"></span>
                </div>
              </div>
            </panel>
          </div>

          <div class="col-md-12">
            <panel type="success" >
              <template slot="header">
                <i class="fa fa-arrow-right fa-fw"></i> <label> Respuesta caso negativo </label>
              </template>
              <div class="row">
                <div class="col-md-12">
                  <bs-input type="textarea" v-model="respuestanegativo.valor" :rows="5"></bs-input>
                  <br>
                  <span v-html="respuestanegativo.valor"></span>
                </div>
              </div>
            </panel>


          </div>

          <div class="col-md-12"><br></div>

          <div class="col-md-12">
            <input type="button" class="btn btn-warning pull-right my-btn" @click="guardar()" value="Publicar">
            <input type="button" class="btn btn-default pull-right my-btn" @click="cancelar()" value="Cancelar">
          </div>

        </div>
      </div>

      <div class="col-md-12"><br></div>
    </div>



	</div>
</template>

<script>
import VueStrap from 'vue-strap';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
  components: {
    'panel': VueStrap.panel,
    'spinner': VueStrap.spinner,
    'alert': VueStrap.alert,
    'bs-input': VueStrap.input,
    'v-select': VueStrap.select,
    'v-option': VueStrap.option,
    'accordion': VueStrap.accordion,
  },
  computed: {...mapGetters(['triage', 'casospositivos','variables']),
  },
  data () {
    return {
      spinner: false,
      fullscreen: false,
      mensajeError: null,
      mensajeInfo: null,
      showConfirm: false,
      showParte: false,

      respuestanegativo: this.$store.getters.respuestanegativo,
      respuestapositivo: this.$store.getters.respuestapositivo,

      opcionesrespuesta: this.$store.getters.getPreguntasRespuestas,
    }
  },
  created() {
  },
  mounted() {
    this.fetchTriage();
    this.fetchVariables();
  },
  watch: {
    variables(newValue, oldValue) {
      this.respuestanegativo= this.$store.getters.respuestanegativo;
      this.respuestapositivo= this.$store.getters.respuestapositivo;
    },
    triage(newValue, oldValue) {
      this.opcionesrespuesta = this.$store.getters.getPreguntasRespuestas;
    }
  },
  methods: {
    nuevaPregunta() {
      let pregunta = this.$store.getters.pregunta;
      if (this.triage) {
        this.triage.push(pregunta);
      } else {
        this.triage = [pregunta];
      }

      this.opcionesrespuesta = this.$store.getters.getPreguntasRespuestas;
    },

    borrarPregunta(preg) {
      //No deja borrar si está en alguna de las combinaciones
      let pregunta = this.triage.find(item => item.orden === preg);
      if (pregunta.respuestas && pregunta.respuestas.length>0) {
        if (this.casospositivos && this.casospositivos.length>0) {
          for (let i in this.casospositivos) {
            if (this.casospositivos[i].respuestas && this.casospositivos[i].respuestas.length>0) {

              for (let j in pregunta.respuestas) {
                if (this.casospositivos[i].respuestas.find(item => item.id === pregunta.respuestas[j].id)) {
                  this.mensajeError = "La pregunta está en alguna de las combinaciones y no se puede borrar";
                  return;
                }
              }
            }
          }
        }
      }

      this.triage.splice(this.triage.findIndex(item => item.orden === preg), 1); //Borramos por orden ya que puede haber preguntas sin id
      this.opcionesrespuesta = this.$store.getters.getPreguntasRespuestas;
    },

    nuevaRespuesta(preg) {
      let respuesta = {id:this.$store.getters.maxIdRespuestas + 1, codigo:"1", respuesta: null, orden: 1};
      let pregunta = this.triage.find(item => item.orden === preg);
      if (pregunta) {
        if (pregunta.respuestas && pregunta.respuestas.length>0) {
          //Ponemos el orden y el id correspondiente a la pregunta
          let orden = pregunta.respuestas.length+1;
          respuesta.orden = orden;
          respuesta.codigo = orden;
          pregunta.respuestas.push(respuesta);
        } else {
          pregunta.respuestas = [respuesta];
        }

        this.opcionesrespuesta = this.$store.getters.getPreguntasRespuestas;
      }

    },

    borrarRespuesta(preg, resp){
      //Borramos por orden ya que puede haber preguntas y respuestas sin id
      let ls = this.triage.find(item => item.orden === preg);
      if (ls) {
        let respuesta = ls.respuestas.find(item => item.orden === resp);
        //No deja borrar si está en alguna de las combinaciones
        if (this.casospositivos && this.casospositivos.length>0) {
          for (let i in this.casospositivos) {
            if (this.casospositivos[i].respuestas && this.casospositivos[i].respuestas.length>0) {
              if (this.casospositivos[i].respuestas.find(item => item.id === respuesta.id)) {
                this.mensajeError = "La respuesta está en alguna de las combinaciones y no se puede borrar";
                return;
              }
            }
          }
        }

        ls.respuestas.splice(ls.respuestas.findIndex(item => item.orden === resp), 1);
        this.opcionesrespuesta = this.$store.getters.getPreguntasRespuestas;
      }


    },

    nuevaCombinacion() {
      let combinacion = {id:1, respuestas: null};
      if (this.casospositivos && this.casospositivos.length>0) {
        let orden = this.casospositivos[this.casospositivos.length-1].id + 1;
        combinacion.id=orden;
        this.casospositivos.push(combinacion);
      } else {
        this.setCasospositivos({casospositivos: [combinacion]});
      }
    },

    borrarCombinacion(idconf) {
      this.casospositivos.splice(this.casospositivos.findIndex(item => item.id === idconf), 1);
    },

    nuevaOpcionCombinacion(idconf) {
      let respuesta = {id:null, codigo:null, respuesta: null, orden: null};
      let ls = this.casospositivos.find(item => item.id === idconf);

      if (ls) {
        if (ls.respuestas) {
          ls.respuestas.push(respuesta);
        } else {
          ls.respuestas = [respuesta];
        }
      }
    },

    borrarOpcionCombinacion(idconf, idopconf) {
      let ls = this.casospositivos.find(item => item.id === idconf);
      if (ls && ls.respuestas) {
        ls.respuestas.splice(ls.respuestas.findIndex(item => item.id === idopconf), 1);
      }
    },

    guardar() {
      //Guardamos todo el triage.
      this.mensajeError = null;
      //Comprobamos primero que los datos están correctos.

      // - exista al menos una pregunta con una respuesta
      if (!this.triage || this.triage.length<=0) {
        this.mensajeError = "Debe indicar al menos una pregunta y una respuesta";
        return;
      }

      // - todas las preguntas y respuestas rellenas
      for (let i in this.triage) {
          if (!this.triage[i].pregunta || this.isEmpty(this.triage[i].pregunta)) {
            this.mensajeError = "Todas las preguntas deben tener algún texto";
            return;
          } else {
            if (!this.triage[i].respuestas || this.triage[i].respuestas.length<=0) {
              this.mensajeError = "Todas las preguntas deben tener al menos una respuesta";
              return;
            } else {
              for (let j in this.triage[i].respuestas) {
                if (!this.triage[i].respuestas[j] || this.isEmpty(this.triage[i].respuestas[j].respuesta)) {
                  this.mensajeError = "Todas las respuestas deben tener algún texto";
                  return;
                }
              }
            }
          }
      }

      // - Al menos una combinación

      if (!this.casospositivos || this.casospositivos.length<=0) {
        this.mensajeError = "Debe indicar al menos una combinación";
        return;
      }

      // - Todas las combinaciones rellenas o con al menos un dato
      // - Las opciones de las combinaciones no estén repetidas para una misma combinación
      for (let i in this.casospositivos) {
        if (!this.casospositivos[i].respuestas || this.casospositivos[i].respuestas.length<=0) {
          this.mensajeError = "Todas las combinaciones deben tener al menos una respuesta";
          return;
        } else {
          for (let j in this.casospositivos[i].respuestas) {
            if (!this.casospositivos[i].respuestas[j] || !this.casospositivos[i].respuestas[j].id) {
              this.mensajeError = "Todas las combinaciones deben estar rellenas";
              return;
            }

            //Que no estén repetidas

            for (let j in this.casospositivos[i].respuestas) {
              let count = this.casospositivos[i].respuestas.filter(r => r.id === this.casospositivos[i].respuestas[j].id).length;
              if (count!==1) {
                this.mensajeError = "No pueden repetirse opciones en una misma combinaciones";
                return;
              }
            }
          }
        }

      }

      // - Las respuestas en caso positivo y negativo están rellenas

      if (!this.respuestanegativo || !this.respuestanegativo.valor || this.isEmpty(this.respuestanegativo.valor)) {
        this.mensajeError = "La respuesta en caso negativo debe rellenarse";
        return;
      }

      if (!this.respuestapositivo || !this.respuestapositivo.valor || this.isEmpty(this.respuestapositivo.valor)) {
        this.mensajeError = "La respuesta en caso positivo debe rellenarse";
        return;
      }

      // Guardamos los datos
      console.log("guardamos los datos")

      // Guardamos los datos del triage y las combinaciones
      this.spinner = true;
      try {
        this.saveTriage().then((respuesta) => {
          //TODO Guardamos los datos de las variables
          console.log("** triage guardado")
          this.saveVariables().then((respuesta) => {
            console.log("** variables guardado")
            this.spinner = false;
            this.mensajeInfo = "Datos guardados correctamente.";

            //recargamos la página de nuevo
            this.reload();
          })
          .catch((error) => {
            this.spinner = false;
            this.mensajeError = "Se ha producido un error al guardar el triage.";
            console.error(error);
          });

        })
        .catch((error) => {
          this.spinner = false;
          this.mensajeError = "Se ha producido un error al guardar el triage.";
          console.error(error);
        });
      } catch (e) {
        this.spinner = false;
        this.mensajeError = "Se ha producido un error al guardar el triage.";
        console.error(e)
      }
    },

    cancelar() {
      //recarga de nuevo la página
      this.reload();
    },

    reload() {
      var location = this.$route.fullPath
      this.$router.replace('/')
      this.$nextTick(() => this.$router.replace(location))
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
    ...mapActions({
      fetchTriage: 'fetchTriage',
      saveTriage: 'saveTriage',
      fetchVariables:'fetchVariables',
      saveVariables: 'saveVariables',
    }),
    ...mapMutations({
      setCasospositivos: 'setCasospositivos',
    }),
  },

}
</script>

<style lang="css">
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

.margencombinacion {
   margin-top:5px
}
</style>
