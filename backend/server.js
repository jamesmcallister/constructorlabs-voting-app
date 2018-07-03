const WebSocket = require("ws");
const ADD_TOPIC = "ADD_TOPIC";
const ADD_VOTE = "ADD_VOTE";

let dataStore = {};
let topics = ["react", "css"];

function Votes({ TYPE, vote, topic }, ip) {
  const result = {
    [ip]: {
      vote,
      topic
    }
  };

  dataStore[topic] = { ...dataStore[topic], ...result };

  // if (TYPE === ADD_TOPIC) {
  //   dataStore[topic]
  //     ? (dataStore[topic] = { ...dataStore[topic], ...result })
  //     : (dataStore[topic] = { ...dataStore[topic], ...result });
  // }
  // if (TYPE === ADD_VOTE) {
  //   dataStore[topic]
  //     ? (dataStore[topic] = { ...dataStore[topic], ...result })
  //     : (dataStore[topic] = { ...dataStore[topic], ...result });
  // }
}

const wss = new WebSocket.Server({ port: 3002 });

wss.on("connection", (ws, req) => {
  ws.send(
    JSON.stringify({
      message: "Hi there, I am a Constructor Labs Websocket monster",
      votes: dataStore,
      topics
    })
  );

  ws.on("message", dataIn => {
    const data = JSON.parse(dataIn);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        if (data.TYPE === ADD_TOPIC) {
          console.log(ADD_TOPIC);
          topics.push(data.newTopic);
          client.send(
            JSON.stringify({
              message: "New Vote just in",
              votes: dataStore,
              topics
            })
          );
        }
        if (data.TYPE === ADD_VOTE) {
          console.log(ADD_VOTE);
          Votes(data, req.connection.remoteAddress);
          client.send(
            JSON.stringify({
              message: "New Vote just in",
              votes: dataStore,
              topics
            })
          );
        }
      }
    });
  });
});
