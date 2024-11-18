const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8080");

const generateCoords = () => {
  let coords = { lat: 12.972442, lon: 77.580643 };
  let index = 0;

  try {
    const intervel = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(coords));
        coords.lon += 0.102;
        coords.lon = Number(coords.lon.toFixed(6));
        index += 1;
      }

      if (index > 9) {
        clearInterval(intervel);
      }
    }, 2000);
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
