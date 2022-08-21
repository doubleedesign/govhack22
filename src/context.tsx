import React, { useEffect, useState } from 'react';
import { MapPinDataItem, useFormattedMapPinData } from './hooks/useFormattedMapPinData';

interface DataGroup {
	label: string;
	domain: string[],
	selected: boolean,
	icon: string;
	data: MapPinDataItem[],
}

interface DataContext {
	pins: MapPinDataItem[],
	selectedGroups: DataGroup[],
	setSelectedGroups: any
	setPins: any
}

// @ts-ignore
export const Context: React.Context<DataContext> = React.createContext({
	selectedGroups: [],
	setSelectedGroups: undefined,
	pins: [],
	setPins: undefined
});

// @ts-ignore
export const ContextProvider = ({ children }) => {
	const [selectedGroups, setSelectedGroups] = useState<DataGroup[]>([
		{
			label: 'Public bus stops',
			domain: ['Access and connectivity'],
			selected: false,
			icon: '/icons/bus-stops.svg',
			data: useFormattedMapPinData(
				'data/bus-stops.json',
				'properties.stop_name',
				'',
				'geometry.coordinates[1]',
				'geometry.coordinates[0]',
				'/icons/bus-stops.svg'
			)
		},
		{
			label: 'School bus stops',
			domain: ['Access and connectivity', 'Education and lifelong learning'],
			selected: false,
			icon: '/icons/bus-stops.svg',
			data: useFormattedMapPinData(
				'data/school-buses.json',
				'properties.description',
				'school_name',
				'geometry.coordinates[1]',
				'geometry.coordinates[0]',
				'/icons/bus-stops.svg'
			)
		},
		{
			label: 'TAFE Campuses',
			domain: ['Education and lifelong learning'],
			selected: false,
			icon: '/icons/education.svg',
			data: useFormattedMapPinData(
				'data/tafe-campuses.json',
				'Site',
				'Location 1',
				'Long/Lat[0]',
				'Long/Lat[1]',
				'/icons/education.svg'
			)
		},
		{
			label: 'University Campuses',
			domain: ['Education and lifelong learning'],
			selected: false,
			icon: '/icons/education.svg',
			data: useFormattedMapPinData(
				'data/universities.json',
				'Institute',
				'',
				'Long/Lat[0]',
				'Long/Lat[1]',
				'/icons/education.svg'
			)
		},
		{
			label: 'Park and Ride locations',
			domain: ['Access and connectivity'],
			selected: false,
			icon: '/icons/car.svg',
			data: useFormattedMapPinData(
				'data/park-and-ride.json',
				'Location',
				'Permit Type',
				'Point[0]',
				'Point[1]',
				'/icons/car.svg'
			)
		},
		{
			label: 'Unplanned road closures',
			domain: ['Access and connectivity'],
			selected: false,
			icon: '/icons/road-closures.svg',
			data: useFormattedMapPinData(
				'data/unplanned-road-closures.json',
				'properties.roads_closed',
				'properties.closure_description',
				'geometry.coordinates[1]',
				'geometry.coordinates[0]',
				'/icons/road-closures.svg'
			)
		},
		{
			label: 'Youth mental health services',
			domain: ['Health'],
			selected: false,
			icon: 'icons/youth.svg',
			data: useFormattedMapPinData(
				'data/youth-mental-health.json',
				'name',
				'location',
				'latitude',
				'longitude',
				'icons/youth.svg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   '
			)
		},
		{
			label: 'Hospitals',
			domain: ['Health'],
			selected: false,
			icon: '/icons/hospital.svg',
			data: useFormattedMapPinData(
				'data/hospitals.json',
				'Name',
				'',
				'Coords[0]',
				'Coords[1]',
				'/icons/hospital.svg'
			)
		},
		{
			label: 'Fitness equipment',
			domain: ['Health'],
			selected: false,
			icon: '/icons/sport.svg',
			data: useFormattedMapPinData(
				'data/fitness-equipment.json',
				'LOCATION',
				'TYPE',
				'LATITUDE',
				'LONGITUDE',
				'/icons/sport.svg'
			)
		},
		{
			label: 'Basketball courts',
			domain: ['Health'],
			selected: false,
			icon: '/icons/sport.svg',
			data: useFormattedMapPinData(
				'data/basketball-courts.json',
				'Location',
				'',
				'LATITUDE',
				'LONGITUDE',
				'/icons/sport.svg'
			)
		},
		{
			label: 'Arts Facilities',
			domain: ['Identity and Belonging', 'Social Connection'],
			selected: false,
			icon: '/icons/arts.svg',
			data: useFormattedMapPinData(
				'data/arts-facilities.json',
				'Facility',
				'Address',
				'lat',
				'lng',
				'/icons/arts.svg'
			)
		},
		{
			label: 'Fenced dog parks',
			domain: ['Social Connection'],
			selected: false,
			icon: '/icons/pets.svg',
			data: useFormattedMapPinData(
				'data/dog-parks.json',
				'Location',
				'',
				'LATITUDE',
				'LONGITUDE',
				'/icons/pets.svg'
			)
		},
		{
			label: 'Playgrounds',
			domain: ['Social Connection', 'Health'],
			selected: false,
			icon: '/icons/playground.svg',
			data: useFormattedMapPinData(
				'data/playgrounds.json',
				'LOCATION',
				'EQUIPMENT',
				'LATITUDE',
				'LONGITUDE',
				'/icons/playground.svg'
			)
		},
	]);

	const [pins, setPins] = useState([]);

	useEffect(() => {
		// @ts-ignore
		let updated: any = [];
		selectedGroups.map((group) => {
			if(group.selected) {
				updated = updated.concat(group.data);
			}
		});

		// @ts-ignore
		setPins(updated);

	}, [selectedGroups]);

	return (
		<Context.Provider value={{ selectedGroups, setSelectedGroups, pins, setPins }}>
			{children}
		</Context.Provider>
	);
};