import Box from "@mui/material/Box";
import { Grid2, Card, CardContent, CircularProgress } from "@mui/material";

import { useEffect, useState, Suspense, lazy } from "react";
import Btn from "./btn";

const Map = lazy(() => import("./map"));
const Weather = lazy(() => import("./weather"));

const Location = () => {
  const [location, setLocation] = useState({});
  const [path, setPath] = useState([]);

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
          <Grid2 size={{ xs: 12, sm: 7 }}>
            <Card>
              <CardContent>
                <Suspense
                  fallback={
                    <Box>
                      <CircularProgress />
                    </Box>
                  }
                >
                  <Map
                    coords={{
                      lat: location.lat || 12.972442,
                      lon: location.lon || 77.580643,
                    }}
                    route={path}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 5 }}>
            <Suspense
              fallback={
                <Box>
                  <CircularProgress />
                </Box>
              }
            >
              <Weather
                coords={{
                  lat: location.lat || 12.972442,
                  lon: location.lon || 77.580643,
                }}
              />
            </Suspense>
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
