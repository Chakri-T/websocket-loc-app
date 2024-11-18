import { Grid2, Card, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
const Weather = (props) => {
  const { lat, lon } = props.coords;
  const [weatherData, setWeatherData] = useState(null);
  const API_key = "de3bff2d6d718bb79bda5653e997946a";

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log("Error fetching weather data", error);
      }
    };
    getWeather();
  }, [lat, lon]);

  // weatherData && console.log(weatherData);
  return (
    <div>
      {weatherData && (
        <Card sx={{ mx: "auto", mt: 3 }}>
          <Grid2 container size={{ xs: 12 }} sx={{ mt: 4 }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  px: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  style={{ width: "100", height: "100" }}
                ></img>
                <Typography variant="h3">
                  {weatherData.main.temp}
                  {"°C"}
                </Typography>

                <Typography variant="h6">
                  {weatherData.main.temp_min} ~ {weatherData.main.temp_max}
                </Typography>
                <Typography>Humidity: {weatherData.main.humidity}</Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  px: 3,
                  py: 7,
                  mx: "auto",
                }}
              >
                <Typography variant="h4">
                  {weatherData.weather[0].description.toUpperCase()}{" "}
                </Typography>

                <Typography>
                  Feels like: {weatherData.main.feels_like}
                </Typography>
                <Typography>Pressure:{weatherData.main.pressure}</Typography>
                <Typography> Wind: {weatherData.wind.speed}</Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Card>
      )}
    </div>
  );
};
export default Weather;
