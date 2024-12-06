const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8080");

const generateCoords = () => {
  // let coords = [
  //   { lat: 12.972442, lon: 77.580643 },
  //   { lat: 13.067439, lon: 80.237617 },
  //   { lat: 11.004556, lon: 76.961632 },
  //   { lat: 17.491659, lon: 78.391983 },
  //   { lat: 28.6448, lon: 77.216721 },
  //   { lat: 19.07609, lon: 72.877426 },
  // ];
  let coords = { lat: 12.972442, lon: 77.580643 };
  let index = 0;

  try {
    const intervel = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        // ws.send(JSON.stringify(coords[index]));
        ws.send(JSON.stringify(coords));
        coords.lon += 0.001;
        coords.lon = Number(coords.lon.toFixed(6));
        index += 1;
      }

      if (index > 9) {
        clearInterval(intervel);
      }
    }, 2500);
  } catch (error) {
    console.log("Error at simulator: ", error);
  }
};

ws.on("open", () => {
  console.log("Connected to WebSocket Server");
  generateCoords();
});
ws.on("close", () => {
  console.log("WebSocket server is disconnected");
});
