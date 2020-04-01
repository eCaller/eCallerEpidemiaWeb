<template>
    <div class='input-group date'>
        <input type='text' class="form-control" :disabled="disabled" v-model="value" />
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
      required: false,
      default: false
    },
    valor: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      value: this.valor,
    }
  },
  watch: {
    options: function (options) {
      // update options
      $(this.$el).datetimepicker({ data: options })
    }
  },
  mounted: function () {
    /*var vm = this
    var mycomp = $(this.$el).datetimepicker({})
    mycomp.on('dp.change', function (e) {
      if (e) {
        vm.value = moment(e.date).format('DD/MM/YYYY') //e.date
      }
      vm.$emit('change', vm.value)
    })*/
  },
  destroyed: function () {
    $(this.$el).off().datetimepicker('destroy')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group-addon {
    padding: 5px 11px;
}
</style>
