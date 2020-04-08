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
  <span>
    <span v-if="codigo=='PC'" class='label label-danger'>{{$t('caso.estado-pendiente-contacto')}}</span>
    <span v-else-if="codigo=='CO'" class='label label-info'>{{$t('caso.estado-contactado')}}</span>
    <span v-else-if="codigo=='PT'" class='label label-warning'>{{$t('caso.estado-pendiente-prueba')}}</span>
    <span v-else-if="codigo=='PR'" class='label label-default'>{{$t('caso.estado-pendiente-resultado')}}</span>
    <span v-else-if="codigo=='PE'" class='label label-primary'>{{$t('caso.estado-pendiente-evolucion')}}</span>
    <span v-else-if="codigo=='FI'" class='label label-success'>{{$t('caso.estado-finalizado')}}</span>
    <span v-else ></span>
  </span>
</template>

<script>
export default {
  props: {
    codigo: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
