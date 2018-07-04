const WebSocket = require("ws");
const ADD_TOPIC = "ADD_TOPIC";
const ADD_VOTE = "ADD_VOTE";
const port = 3002;

let dataStore = {};
let topicsObj = { react: "", css: "" };

function Votes({ TYPE, vote, topic }, ip) {
  const result = {
    [ip]: {
      vote,
      topic
    }
  };
  dataStore[topic] = { ...dataStore[topic], ...result };
}

const sendReply = message =>
  JSON.stringify({
    message: message,
    votes: dataStore,
    topics: Object.keys(topicsObj)
  });

function addNewTopic(newTopic) {
  console.log(topicsObj);
  topicsObj[newTopic.toLowerCase()] = "";
  console.log(topicsObj);
}
// fix topic by adding in to a function to object, and lowercase it

const wss = new WebSocket.Server({ port });

wss.on("connection", (ws, req) => {
  ws.send(sendReply("Hi there, I am a Constructor Labs Websocket monster"));

  ws.on("message", dataIn => {
    const data = JSON.parse(dataIn);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        if (data.TYPE === ADD_TOPIC) {
          addNewTopic(data.newTopic);
          client.send(sendReply("New Vote just in"));
        }
        if (data.TYPE === ADD_VOTE) {
          Votes(data, req.connection.remoteAddress);
          client.send(sendReply("New Vote just in"));
        }
      }
    });
  });
});
