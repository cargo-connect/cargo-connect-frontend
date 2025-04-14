"use client"

import { useState, useRef, useEffect } from "react"
import { Map, Marker, NavigationControl, GeolocateControl, Source, Layer, type MapRef, ViewStateChangeEvent } from 'react-map-gl/mapbox' // Correct import path
import "mapbox-gl/dist/mapbox-gl.css"
// mapboxgl object is implicitly handled by react-map-gl v7+

interface MapboxMapProps {
  initialViewState?: {
    longitude: number
    latitude: number
    zoom: number
  }
  markers?: Array<{
    longitude: number
    latitude: number;
    color?: string; // Color for default marker
    title?: string;
    element?: React.ReactNode; // Optional custom element for the marker
  }>;
  routeCoordinates?: Array<[number, number]>;
  height?: string;
  width?: string;
  className?: string;
  showNavigation?: boolean;
  showGeolocate?: boolean;
  interactive?: boolean;
}

export function MapboxMap({
  initialViewState = {
    longitude: 3.3792, // Default to Lagos
    latitude: 6.5244,
    zoom: 12,
  },
  markers = [],
  routeCoordinates,
  height = "100%",
  width = "100%",
  className = "",
  showNavigation = true,
  showGeolocate = true,
  interactive = true,
}: MapboxMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState(initialViewState);

  // Fit map to route bounds if route coordinates are provided
  useEffect(() => {
    if (routeCoordinates && routeCoordinates.length > 0 && mapRef.current) {
			// Calculate bounds manually since mapboxgl is not directly imported
			let minLng = Infinity,
				minLat = Infinity,
				maxLng = -Infinity,
				maxLat = -Infinity;
			for (const coord of routeCoordinates) {
				const [lng, lat] = coord;
				minLng = Math.min(minLng, lng);
				minLat = Math.min(minLat, lat);
				maxLng = Math.max(maxLng, lng);
				maxLat = Math.max(maxLat, lat);
			}

			// Ensure bounds are valid before fitting
			if (
				isFinite(minLng) &&
				isFinite(minLat) &&
				isFinite(maxLng) &&
				isFinite(maxLat)
			) {
				const boundsArray: [[number, number], [number, number]] = [
					[minLng, minLat],
					[maxLng, maxLat],
				];
				mapRef.current?.fitBounds(boundsArray, { padding: 40, duration: 1000 });
			}
		}
	}, [routeCoordinates]);

	// Route data for the map
	const routeData = routeCoordinates
		? {
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates: routeCoordinates,
				},
			}
		: null;

	// Route layer style
	const routeLayer = {
		id: "route",
		type: "line",
		layout: {
			"line-join": "round",
			"line-cap": "round",
		},
		paint: {
			"line-color": "#3b82f6", // Default blue, consider making this a prop if needed
			"line-width": 4,
			"line-opacity": 0.8,
		},
	};

  return (
    <div style={{ height, width }} className={className}>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        interactive={interactive}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
      >
        {showNavigation && <NavigationControl position="top-right" />}
				{showGeolocate && <GeolocateControl position="top-right" />}

				{markers.map((marker, index) => (
					<Marker
						key={index}
						longitude={marker.longitude}
						latitude={marker.latitude}
						color={marker.element ? undefined : marker.color || "#3b82f6"} // Only set color if no custom element
						anchor="bottom"
					>
						{/* Render custom element if provided */}
						{marker.element}
					</Marker>
				))}

				{routeData && (
          <Source id="route" type="geojson" data={routeData as any}>
            <Layer {...(routeLayer as any)} />
          </Source>
        )}
      </Map>
    </div>
  )
}
