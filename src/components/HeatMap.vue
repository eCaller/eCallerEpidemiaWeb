<template>
  <div
    ref="heatmap"
    :style="`width: ${mapWidth}; height: ${mapHeight}`"/>
</template>

<script>
export default {
  name: 'c-heat-map',
  props: {
    lat: {
      type: Number,
      default: () => 37.775
    },
    lng: {
      type: Number,
      default: () => -122.434
    },
    initialZoom: {
      type: Number,
      default: () => 13
    },
    mapType: {
      type: String,
      default: () => 'roadmap'
    },
    points: {
      type: Array,
      required: true
    },
    width: {
      type: [String, Number],
      default: () => '100%'
    },
    height: {
      type: [String, Number],
      default: () => '100%'
    },
    opacity: {
      type: Number,
      default: () => 1
    },
    maxIntensity: {
      type: Number,
      default: () => 5
    }
  },
  computed: {
    mapWidth () {
      if (typeof this.width === 'string') {
        return this.width
      } else {
        return `${this.width}px`
      }
    },
    mapHeight () {
      if (typeof this.height === 'string') {
        return this.height
      } else {
        return `${this.height}px`
      }
    },
    heatmapPoints () {
      return this.points.map(
        function (point) {
            return { location: new google.maps.LatLng(point.lat, point.lng), weight: point.weight }
        }
      )
    }
  },
  mounted () {
    return this.$gmapApiPromiseLazy().then(() => {
      // eslint-disable-next-line
      this.$mapObject = new google.maps.Map(this.$refs.heatmap, {
        zoom: this.initialZoom,
        center: { lat: this.lat, lng: this.lng },
        mapTypeId: this.mapType
      })
      // eslint-disable-next-line
      this.$heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatmapPoints,
        map: this.$mapObject,
        opacity: this.opacity,
        maxIntensity: this.maxIntensity
      })

      this.$heatmap.setMap(this.$mapObject)
    })
  }
}
</script>
