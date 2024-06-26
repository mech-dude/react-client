import { io } from "socket.io-client";

const wsURLs = {
  production: `wss://${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`,
  development: `ws://${process.env.REACT_APP_WEBSOCKET_SERVER_PORT}`,
};

function getWebSocketUrl() {
  const REACT_APP_NODE_ENV = process.env.REACT_APP_NODE_ENV || null;
  if (!REACT_APP_NODE_ENV || !wsURLs[REACT_APP_NODE_ENV]) {
    throw new Error("Unknown environment");
  }
  return wsURLs[REACT_APP_NODE_ENV];
}

console.log("WebSocket URL:", getWebSocketUrl());
export const socket = io(getWebSocketUrl(), {
  autoConnect: true,
  transports: ["websocket"],
  upgrade: false
});

socket.on('connect', () => {
  console.log('Successfully connected to the WebSocket server');
  const transport = socket.io.engine.transport.name; // in most cases, "polling"

  socket.io.engine.on("upgrade", () => {
    const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from the WebSocket server');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
  console.log(err.code);
  console.log(err.message); 
  console.log(err.context);
});