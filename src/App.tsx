import React, { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Page from './components/Page/Page';
import Map from './components/Map/Map';
import Menu from './components/Menu/Menu';
import { Context, ContextProvider } from './context';

const render = (status: Status) => {
	return <p>{status}</p>;
};

const App: React.FC = () => {
	// Initial zoom
	const [zoom, setZoom] = useState(12);
	// Initial centre
	const [center, setCenter] = useState<google.maps.LatLngLiteral>({
		lat: -35.33346955669174,
		lng: 149.11833202684267
	});

	return (
		<ContextProvider>
			<Page>
				<Context.Consumer>
					{(contextValue) => {
						// console.log(contextValue);
						return (
							<Wrapper apiKey={process.env.REACT_APP_GMAPS_API_KEY || ''} render={render}>
								<Map center={center} zoom={zoom} pins={contextValue.pins} />
							</Wrapper>
						);
					}}
				</Context.Consumer>
				<Menu/>
			</Page>
		</ContextProvider>
	);
};

export default App;