import React, { useRef, useState, useEffect, useReducer, useCallback } from 'react';
import { useDeepCompareEffectForMaps } from '../../hooks/useDeepCompareEffectForMaps';
import { MapWrapper } from './Map.style';
import { MapPinDataItem } from '../../hooks/useFormattedMapPinData';
import Marker from '../Marker/Marker';

interface MapProps extends google.maps.MapOptions {
	onClick?: (e: google.maps.MapMouseEvent) => void;
	pins: MapPinDataItem[]
}

const Map: React.FC<MapProps> = ({ onClick, pins, ...options }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();
	const [markers, setMarkers] = useState<google.maps.Marker[]>();
	const mapId = 'd5e9e462cb07ac43'; // allows use of a styled map set up in the Cloud console
	options.mapId = mapId;

	// Create map if it doesn't exist yet
	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, { mapId: mapId }));
		}
	}, [ref, map]);

	// Update markers when 'pins' stored in Context update
	// A bit hacky: This re-creates and reloads the whole map
	// TODO: Work out how to re-render just markers, not the whole map
	useEffect(() => {
		if(ref.current) {
			const updatedMap = new window.google.maps.Map(ref.current, { mapId: mapId });
			const currentPins: google.maps.Marker[] = [];

			if(map) {
				pins.map((pin) => {
					return (
						currentPins.push(new google.maps.Marker({
							position: pin.position,
							title: pin.label,
							map: updatedMap,
							icon: pin.icon
						}))
					);
				});

				setMarkers(currentPins);
			}

			if(ref.current) {
				setMap(updatedMap);
			}
		}

	}, [pins]);

	// because React does not do deep comparisons, a custom hook is used
	// see discussion in https://github.com/googlemaps/js-samples/issues/946
	// Ref: https://developers.google.com/maps/documentation/javascript/react-map
	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	return (
		<MapWrapper>
			<div ref={ref} />
			{markers && markers.map((marker: google.maps.Marker, index: number) => {
				return (
					<Marker key={index}
							title={marker.getTitle()}
							position={marker.getPosition()}
							map={marker.getMap()}
							icon={marker.getIcon()}
					/>
				);
			})}
		</MapWrapper>
	);
};

export default Map;