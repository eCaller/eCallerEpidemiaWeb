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
  <span>
    <span v-if="codigo=='PC'" class='label label-danger'>Pendiente contacto</span>
    <span v-else-if="codigo=='CO'" class='label label-info'>Contactado</span>
    <span v-else-if="codigo=='PT'" class='label label-warning'>Pendiente prueba</span>
    <span v-else-if="codigo=='PR'" class='label label-default'>Pendiente resultado</span>
    <span v-else-if="codigo=='PE'" class='label label-primary'>Pendiente evolución</span>
    <span v-else-if="codigo=='FI'" class='label label-success'>Finalizado</span>
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
