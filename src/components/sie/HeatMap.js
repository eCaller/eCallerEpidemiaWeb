/*
Copyright 2020, Ingenia, S.A.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
*/
import {MapElementFactory} from 'vue2-google-maps';

const props = {
	options: {
		type: Object,
		twoWay: false,
		default: () => {},
	},
	data: {
		type: Array,
		twoWay: true
	},
};

const events = [];

export default MapElementFactory({
	name: 'heatmap',
	ctr: () => google.maps.visualization.HeatmapLayer,
	events: events,
	mappedProps: props,
});
