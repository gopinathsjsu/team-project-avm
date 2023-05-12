import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import './Maps.css'
import "leaflet/dist/leaflet.css";

const Maps = () => {
    const position = [37.3351874, -121.883260]
    const position2 = [37.3304796, -121.9070951]

    const markerIcon = new L.Icon({
        iconUrl: require("../../assets/images/marker.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46], //[left/right, top/bottom]
        popupAnchor: [0, -46], //[left/right, top/bottom]
    });

    return (
        <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={markerIcon}>
                <Popup>
                    Fitfinity San Jose
                </Popup>
            </Marker>
            <Marker position={position2} icon={markerIcon}>
                <Popup>
                    Fitfinity San Jose
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Maps;