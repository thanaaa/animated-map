import React, {useState, useEffect} from 'react'
import MapGL from 'react-map-gl';
import {TripsLayer} from '@deck.gl/geo-layers';
import { DeckGL } from 'deck.gl';
import torontoData from './toronto.json';

export default function Map({ 
    width, 
    height, 
    viewState, 
    onChangeViewState, 
}) {

    const [time, setTime] = useState(0);
    const [animation] = useState({});

    const animate = () => {
        setTime(t => (t + 1) % 1800);
        animation.id = window.requestAnimationFrame(animate);
    };
    useEffect(() => {
        animation.id = window.requestAnimationFrame(animate);
        return () => window.cancelAnimationFrame(animation.id);
    }, [animation]);
    
    const layers = [
        new TripsLayer({
            id: 'trips',
            data: torontoData,
            getPath: d => d.path,
            getTimestamps: d => d.timestamps,
            getColor: [255, 93, 93],
            opacity: 0.9,
            widthMinPixels: 2,
            rounded: true,
            trailLength: 180,
            currentTime: time,
            shadowEnabled: false
        }),
    ]

    return (
    <>
        <DeckGL
            initialViewState = {viewState}
            onViewStateChange = {onChangeViewState}
            layers={layers}
        >
            <MapGL
            style={{width, height}}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            />
        </DeckGL>
    </>
    )
}
