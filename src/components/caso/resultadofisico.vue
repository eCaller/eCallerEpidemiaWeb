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
