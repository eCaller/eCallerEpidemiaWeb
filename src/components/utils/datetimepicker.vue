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
<template>
    <div class='input-group date'>
        <input type='text' class="form-control" ref="fecha" :disabled="disabled" />
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
        </span>
    </div>
</template>

<script>
var $ = window.jQuery = require('jquery')
import moment from 'moment'
import eonosdandatetimepicker from 'eonasdan-bootstrap-datetimepicker'

export default {
  name: 'vue-datetimepicker',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      value: '',
    }
  },
  watch: {
    value (newValue, oldValue) {},
    options: function (options) {
      // update options
      $(this.$el).datetimepicker({ data: options })
    }
  },
  mounted: function () {
    var vm = this
    var mycomp = $(this.$el).datetimepicker({format: 'DD/MM/YYYY', locale: 'es'})
    mycomp.on('dp.change', function (e) {
      vm.value = e.date
      vm.$emit('change', vm.value)
    })
  },
  destroyed: function () {
    $(this.$el).off().datetimepicker('destroy')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group-addon {
    padding: 5px 10px;
}
.bootstrap-datetimepicker-widget.dropdown-menu {
    display: block;
    margin: 2px 0;
    padding: 4px;
    width: 100%;
}
</style>
