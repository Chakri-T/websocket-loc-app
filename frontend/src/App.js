import { CssBaseline, Typography } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Location from "./components/location";
import "leaflet/dist/leaflet.css";
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <AppBar sx={{ mx: "auto", alignItems: "center", py: 3 }}>
          <Typography>Location and Weather App</Typography>
        </AppBar>
        <Container sx={{ pt: 5 }}>
          <Location />
        </Container>
      </Container>
    </div>
  );
}

export default App;
