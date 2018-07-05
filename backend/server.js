const WebSocket = require("ws");
const ADD_TOPIC = "ADD_TOPIC";
const ADD_VOTE = "ADD_VOTE";
const port = 3002;

let dataStore = {};
let topicsObj = { react: "", css: "" };

function addNewVote({ vote, topic }, ip) {
  const result = {
    [ip]: {
      vote,
      topic
    }
  };
  dataStore[topic] = { ...dataStore[topic], ...result };
}

function formatReply(message) {
  return JSON.stringify({
    message: message,
    votes: dataStore,
    topics: Object.keys(topicsObj)
  });
}

function addNewTopic(newTopic) {
  topicsObj[newTopic.toLowerCase()] = "";
}

const wss = new WebSocket.Server({ port });

wss.on("connection", (ws, req) => {
  ws.send(formatReply("Hi there, I am a Constructor Labs Websocket monster"));

  ws.on("message", dataIn => {
    const data = JSON.parse(dataIn);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        if (data.TYPE === ADD_TOPIC) {
          addNewTopic(data.newTopic);
          client.send(formatReply("New Vote just in"));
        }
        if (data.TYPE === ADD_VOTE) {
          addNewVote(data, req.connection.remoteAddress);
          client.send(formatReply("New Vote just in"));
        }
      }
    });
  });
});
