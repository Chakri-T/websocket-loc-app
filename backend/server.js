const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

try {
  wss.on("connection", (ws) => {
    console.log("Simulator is Connected");
    ws.on("message", (message) => {
      const data = JSON.parse(message);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });

      console.log(data);
    });
    ws.on("close", () => {
      console.log("Simulator is Disconnected");
    });
  });
} catch (error) {
  console.log("Error at server:", error);
}
