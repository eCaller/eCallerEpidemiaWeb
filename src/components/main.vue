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
