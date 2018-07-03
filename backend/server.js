const express = require("express");

const WebSocket = require("ws");

// const app = express();

// app.get("/", (req, res) => res.send("hello"));

const wss = new WebSocket.Server({ port: 3002 });

wss.on("connection", function connection(ws) {
  // send welcome on first connecttion
  ws.send("Hi there, I am a Constructor Labs Websocket server");

  // now send ech message reviced to each client
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      console.log(client !== ws, client.readyState === WebSocket.OPEN);
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
