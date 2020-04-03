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
