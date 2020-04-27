import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

const Map = props => {
	const mapRef = useRef();

	mapboxgl.accessToken =
		"pk.eyJ1Ijoic3RldmVwZXRlYnJ1Y2UiLCJhIjoiY2s3ZGtyNmQ0MGFwdjNlcWszeWFpdXRoaCJ9.gX0ObolyQ3zfyMmIaV-l_Q";

	const { center, zoom } = props;

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: center,
			zoom: zoom
		});
		new mapboxgl.Marker({ position: center, map: map });
	}, [center, zoom]);

	return (
		<div
			ref={mapRef}
			className={`map ${props.className}`}
			style={props.style}></div>
	);
};

export default Map;
