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
