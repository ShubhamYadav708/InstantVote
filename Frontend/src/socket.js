import { io } from "socket.io-client";

export const socket = io("https://instantvote-backend.onrender.com", {
  transports: ["websocket"]
});
