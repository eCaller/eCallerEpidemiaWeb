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
