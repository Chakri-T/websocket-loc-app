import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import iconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import "../styles/mapStyle.css";
const ResetView = (props) => {
  const { lat, lon } = props.coords;
  const map = useMap();
  map.setView(L.latLng(lat, lon), map.getZoom(), {
    animate: true,
  });
};
const Map = (props) => {
  //const coords = props.coords || { lat: 12.972442, lon: 77.580643 };

  const [filteredData, setFilteredData] = useState();
  const { lat, lon } = props.coords;
  const path = props.route;
  const icon = L.icon({
    iconUrl: iconPng,
    shadowUrl: markerShadow,
    iconAnchor: [10, 40],
  });
  const d = new Date();
  let hour = d.getHours();

  useEffect(() => {
    const getCO2 = async () => {
      try {
        const CO2 = await axios.get(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=carbon_dioxide`
        );

        setFilteredData(CO2.data.hourly.carbon_dioxide[hour]);
        // setFilteredData(2000);
        // console.log(filteredData);
      } catch (error) {
        console.log("Error fetching CO2 data", error);
      }
    };
    getCO2();
  }, [lat, lon, hour]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "60vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {path && <Polyline positions={path} color="red"></Polyline>}
      <Marker position={[lat, lon]} icon={icon}>
        {filteredData && (
          <Tooltip
            className="tool-tip"
            direction="right"
            offset={[13, -35]}
            permanent
          >
            <GaugeChart
              id="co2-gauge"
              nrOfLevels={3}
              percent={filteredData / 2000}
              colors={["#00FF00", "#FFA500", "#FF0000"]}
              needleColor="#a3acee"
              arcWidth={0.2}
            />
            CO2 level - <br />
            {filteredData} ppm
          </Tooltip>
        )}
      </Marker>

      <ResetView coords={{ lat, lon }} />
    </MapContainer>
  );
};
export default Map;
