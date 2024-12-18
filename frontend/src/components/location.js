import Box from "@mui/material/Box";
import {
  Grid2,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Btn from "./btn";
import GaugeMeter from "./gauge";
const Map = lazy(() => import("./map"));
const Weather = lazy(() => import("./weather"));

const Location = () => {
  const [location, setLocation] = useState({ lat: 12.972442, lon: 77.580643 });
  const [path, setPath] = useState([]);
  const indexRef = useRef(0); // Persistent value for the index
  const selectedValueRef = useRef(450);

  const getCo2Data = () => {
    const arr = [450, 900, 1900, 350, 950, 1800];

    selectedValueRef.current = arr[indexRef.current];
    indexRef.current = (indexRef.current + 1) % arr.length;
  };
  useEffect(() => {
    getCo2Data();
  }, [location]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected to WebSocket:App");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLocation(data);
      setPath((prevPath) => [...prevPath, [data.lat, data.lon]]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket:App");
    };
  }, []);

  console.log(location);
  console.log(path);
  return (
    <Box>
      <Box sx={{ mx: 0, mt: 6, p: 0, width: "100%" }}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                borderRadius: 5,
                paddingBottom: 0,
              }}
            >
              <CardContent sx={{ "&:last-child": { paddingBottom: 0 }, p: 1 }}>
                <Suspense
                  fallback={
                    <Box sx={{ pb: 0 }}>
                      <CircularProgress />
                    </Box>
                  }
                >
                  <Map
                    coords={{
                      lat: location.lat,
                      lon: location.lon,
                    }}
                    route={path}
                    co2data={selectedValueRef.current}
                  />
                </Suspense>
                <Box sx={{ textAlign: "center", my: 1 }}>
                  <Typography variant="subtitle2">
                    Latitude: {location.lat}
                    {"   |   "}
                    Longitude: {location.lon}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 5 }}>
            <Suspense
              fallback={
                <Box>
                  <CircularProgress />
                </Box>
              }
            >
              <Weather
                coords={{
                  lat: location.lat,
                  lon: location.lon,
                }}
              />
            </Suspense>
            <GaugeMeter data={selectedValueRef.current} />
          </Grid2>
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          flexDirection: "column",
        }}
      >
        <Btn />
      </Box>
    </Box>
  );
};
export default Location;
