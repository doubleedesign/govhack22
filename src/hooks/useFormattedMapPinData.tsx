import React from 'react';
import _ from 'lodash';

export type MapPinDataItem = {
	label: string,
	description: string,
	position: google.maps.LatLngLiteral,
	icon: string
}

export function useFormattedMapPinData(filepath: string, labelProp: string, descriptionProp: string, latProp: string, lngProp: string, icon: string) {
	const formatted: MapPinDataItem[] = [];

	fetch(filepath, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((data => {
			data.map((item: any) => {
				formatted.push({
					label: _.get(item, labelProp),
					description: _.get(item, descriptionProp),
					position: { lat: _.get(item, latProp), lng: _.get(item, lngProp) },
					icon: icon
				});
			});
		}));

	return formatted;
}