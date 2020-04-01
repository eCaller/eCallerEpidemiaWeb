<template lang="html">
  <div id="wrapper" class="active">
    <cabecera></cabecera>
    <router-view></router-view>
  </div>
</template>

<script>
import cabecera from './cabecera.vue';

export default {
  components: {
    cabecera: cabecera,
  },
}
</script>

<style lang="css">
</style>
