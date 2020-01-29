import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {
	Popup,
	NavigationControl,
	FullscreenControl,
	ScaleControl
} from "react-map-gl";

import Pin from "./Pin";
import CityInfo from "./CityInfo";

import CITIES from "./cities.json";

const MyToken =
	"pk.eyJ1IjoibG9ja2ppbyIsImEiOiJjazV5Z3ZxNmYwMWNqM21vNHFxc2VpNHlwIn0.QHlnXrXw0yRza1IC3w2RbQ";

const fullscreenControlStyle = {
	position: "absolute",
	top: 0,
	left: 0,
	padding: "10px"
};

const navStyle = {
	position: "absolute",
	top: 36,
	left: 0,
	padding: "10px"
};

const scaleControlStyle = {
	position: "absolute",
	bottom: 36,
	left: 0,
	padding: "10px"
};

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewport: {
				latitude: 41.69324,
				longitude: -86.22862,
				zoom: 14,
				bearing: 0,
				pitch: 0
			},
			popupInfo: null
		};
	}

	_updateViewport = viewport => {
		this.setState({ viewport });
	};

	_onClickMarker = city => {
		this.setState({ popupInfo: city });
	};

	_renderPopup() {
		const { popupInfo } = this.state;

		return (
			popupInfo && (
				<Popup
					tipSize={5}
					anchor="top"
					longitude={popupInfo.longitude}
					latitude={popupInfo.latitude}
					closeOnClick={false}
					onClose={() => this.setState({ popupInfo: null })}
				>
					<CityInfo info={popupInfo} />
				</Popup>
			)
		);
	}

	render() {
		const { viewport } = this.state;

		return (
			<MapGL
				{...viewport}
				width="450px"
				height="450px"
				mapStyle="mapbox://styles/mapbox/light-v10"
				onViewportChange={this._updateViewport}
				mapboxApiAccessToken={MyToken}
				className="viewport"
			>
				<Pin data={CITIES} onClick={this._onClickMarker} />

				{this._renderPopup()}

				<div style={fullscreenControlStyle}>
					<FullscreenControl />
				</div>
				<div style={navStyle}>
					<NavigationControl />
				</div>
				<div style={scaleControlStyle}>
					<ScaleControl />
				</div>
			</MapGL>
		);
	}
}

export function renderToDom(container) {
	render(<App />, container);
}

{
	/*class Map extends Component {
	state = {
		viewport: {
			latitude: 41.5868,
			longitude: -93.625,
			zoom: 14,
			bearing: 0,
			pitch: 0
		}
	};

	render() {
		const { showPopup } = this.state;
		return (
			<ReactMapGL
				width="500px"
				height="500px"
				mapStyle="mapbox://styles/mapbox/light-v10"
				mapboxApiAccessToken={MyToken}
				onViewportChange={viewport => this.setState({ viewport })}
				{...this.state.viewport}
				className="viewport"
			>
				<Marker latitude={41.5868} longitude={-93.625}>
					<div className="overview-box">
						<div className="row h-100 justify-content-center align-items-center">
							<div className="col-lg-6 col-md-6 overview-content">
								<div className="icon">
									<i className="icofont-school-bag"></i>
								</div>
							</div>
						</div>
					</div>
				</Marker>
			</ReactMapGL>
		);
	}
}

export default Map;*/
}