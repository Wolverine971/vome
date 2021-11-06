import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
// import env from "react-dotenv";

import './map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZGp3YXluZTMiLCJhIjoiY2t1b2Q2N2xtMmVsYTJ4bXh5MTVna2kyMiJ9.qs9ffyy-AcnWcLUgEJNO_w'

export default function Map(){
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [lng, setLng] = useState(-82.0)
    const [lat, setLat] = useState(40.35)
    const [zoom, setZoom] = useState(9)

    useEffect(() => {
        if (map.current) return
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom
        })
    })

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    })
    
    return (
        <div className="map-parent-container">
            <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

