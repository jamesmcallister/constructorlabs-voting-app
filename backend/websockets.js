import WebSocket from "ws";
import dummie from "../dummie.json";

const ADD_TOPIC = "ADD_TOPIC";
const ADD_VOTE = "ADD_VOTE";
let voteDataStore = { ...dummie.votes };
// let topicsObj = { react: "", css: "" };
let topicsObj = { ...dummie.topics };
function addNewVote({ vote, topic }, ip) {
  const result = {
    [ip]: {
      vote,
      topic
    }
  };

  voteDataStore[topic] = { ...voteDataStore[topic], ...result };
}

function formatReply(message) {
  return JSON.stringify({
    message: message,
    votes: voteDataStore,
    topics: Object.keys(topicsObj)
  });
}

function addNewTopic(newTopic) {
  topicsObj[newTopic.toLowerCase()] = "";
}

export const websocketServer = ({ PORT }) => {
  const wss = new WebSocket.Server({ port: PORT });
  wss.listenerCount();
  console.log(`websocketserver is runing on port ${PORT}`);
  return wss.on("connection", (ws, req) => {
    ws.send(formatReply("Hi there, I am a Constructor Labs Websocket monster"));
    ws.on("message", dataIn => {
      const data = JSON.parse(dataIn);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          switch (data.TYPE) {
            case ADD_TOPIC:
              addNewTopic(data.newTopic);
              client.send(formatReply("New Level Added"));
              break;
            case ADD_VOTE:
              addNewVote(data, req.connection.remoteAddress);
              client.send(formatReply(`${data.vote} Vote just in`));
              break;
            default:
              console.log("nope");
          }
          // if (data.TYPE === ADD_TOPIC) {
          //   addNewTopic(data.newTopic);
          //   client.send(formatReply("New Level Added"));
          // }
          // if (data.TYPE === ADD_VOTE) {
          //   addNewVote(data, req.connection.remoteAddress);
          //   client.send(formatReply(`${data.vote} Vote just in`));
          // }
        }
      });
    });
  });
};