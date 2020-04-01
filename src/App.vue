<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
  @import '../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
  @import '../static/css/sb-admin-2.css';
  @import '../static/css/master.css';
  @import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

  [v-cloak] {
    display: none;
  }
</style>
