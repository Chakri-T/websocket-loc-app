import { Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
const Btn = () => {
  const [connection, setConnection] = useState(0);
  const [info, setInfo] = useState(null);
  const handleConnection = () => {
    if (connection === 1) {
      setConnection(0);
      setInfo(1);
      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 100); // Small delay to allow state update
    } else {
      setConnection(1);
    }
  };

  useEffect(() => {
    let interval;
    const ws = new WebSocket("ws://localhost:8080");
    const generateCoords = () => {
      // let coords = [
      //   { lat: 12.972442, lon: 77.580643 },
      //   { lat: 13.067439, lon: 80.237617 },
      //   { lat: 11.004556, lon: 76.961632 },
      //   { lat: 17.491659, lon: 78.391983 },
      //   { lat: 28.6448, lon: 77.216721 },
      //   { lat: 19.07609, lon: 72.877426 },
      // ]; //cities coords like mumbai,delhi etc..
      let coords = [
        { lat: 12.94102, lon: 77.68898 },
        { lat: 12.94126, lon: 77.68932 },
        { lat: 12.94092, lon: 77.6897 },
        { lat: 12.94016, lon: 77.68976 },
        { lat: 12.93957, lon: 77.68984 },
        { lat: 12.93973, lon: 77.69038 },
        { lat: 12.93992, lon: 77.69086 },
        { lat: 12.94008, lon: 77.69165 },
        { lat: 12.94016, lon: 77.69213 },
        { lat: 12.9401, lon: 77.69274 },
        { lat: 12.93994, lon: 77.69363 },
        { lat: 12.93965, lon: 77.69455 },
        { lat: 12.93937, lon: 77.69542 },
        { lat: 12.93821, lon: 77.69428 },
        { lat: 12.93689, lon: 77.69287 },
        { lat: 12.93522, lon: 77.69078 },
        { lat: 12.93424, lon: 77.68985 },
        { lat: 12.93156, lon: 77.68687 },
        { lat: 12.92994, lon: 77.6851 },
        { lat: 12.92837, lon: 77.68162 },
        { lat: 12.92818, lon: 77.68158 },
        { lat: 12.92787, lon: 77.68098 },
        { lat: 12.92771, lon: 77.68108 },
        { lat: 12.92757, lon: 77.681 },
        { lat: 12.9265, lon: 77.68121 },
        { lat: 12.92547, lon: 77.68131 },
        { lat: 12.92439, lon: 77.68137 },
        { lat: 12.9244, lon: 77.68149 },
        { lat: 12.92421, lon: 77.68153 },
        { lat: 12.92392, lon: 77.6818 },
        { lat: 12.92377, lon: 77.68177 },
        { lat: 12.92323, lon: 77.68146 },
        { lat: 12.9228, lon: 77.68121 },
        { lat: 12.92272, lon: 77.68181 },
      ];
      // let coords = { lat: 12.972442, lon: 77.580643 };
      let index = 0;
      let temp = connection;

      try {
        interval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            if (temp === 1) {
              // ws.send(JSON.stringify(coords));
              // coords.lon += 0.001;
              // coords.lon = Number(coords.lon.toFixed(6));
              // index += 1;
              ws.send(JSON.stringify(coords[index]));
              index += 1;
            }
            if (index > coords.length - 1) {
              clearInterval(interval);
            }
            if (temp === 0) {
              clearInterval(interval);
            }
          }
        }, 3000);
      } catch (error) {
        console.log("Error at simulator: ", error);
      }
    };

    ws.onopen = () => {
      console.log("Connected to WebSocket:Btn");
      if (connection === 1) generateCoords();
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket:Btn");

      clearInterval(interval);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
        clearInterval(interval);
      }
    };
  }, [connection]);

  return (
    <>
      {connection ? (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={handleConnection}
            sx={{ mx: "auto" }}
          >
            Disconnect
          </Button>
          <Alert severity="success" sx={{ mx: "auto", my: 2 }}>
            Connected to WebSocket.
          </Alert>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={handleConnection}
            sx={{ mx: "auto" }}
          >
            Connect
          </Button>
          {info ? (
            <Alert severity="error" sx={{ mx: "auto", my: 2 }}>
              {" "}
              Disconnected from WebSocket.
            </Alert>
          ) : (
            <Alert severity="error" sx={{ mx: "auto", my: 2 }}>
              WebSocket is not connected.
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default Btn;
