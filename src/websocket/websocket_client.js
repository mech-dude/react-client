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

console.log(getWebSocketUrl());
export const socket = io(getWebSocketUrl(), {
    autoConnect: true,
    transports: ["websocket"]
});