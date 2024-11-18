import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import iconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const ResetView = (props) => {
  const { lat, lon } = props.coords;
  const map = useMap();
  map.setView(L.latLng(lat, lon), map.getZoom(), {
    animate: true,
  });
};
const Map = (props) => {
  //const coords = props.coords || { lat: 12.972442, lon: 77.580643 };
  const { lat, lon } = props.coords;
  const path = props.route;
  const icon = L.icon({
    iconUrl: iconPng,
    shadowUrl: markerShadow,
    iconAnchor: [10, 40],
  });

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {path && <Polyline positions={path} color="red"></Polyline>}
      <Marker position={[lat, lon]} icon={icon}></Marker>

      <ResetView coords={{ lat, lon }} />
    </MapContainer>
  );
};
export default Map;
