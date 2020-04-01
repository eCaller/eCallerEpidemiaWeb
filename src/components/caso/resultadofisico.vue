<template lang="html">
  <span>
    <span v-if="codigo=='P'" class='label label-danger'>Positivo</span>
    <span v-else-if="codigo=='N'" class='label label-success'>Negativo</span>
    <span v-else ></span>
  </span>
</template>

<script>
export default {
  props: {
    codigo: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="css">
</style>
