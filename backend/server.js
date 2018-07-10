import { expressServer } from "./express.js";
import { websocketServer } from "./websockets.js";

const expressPort = process.env.PORT || 8080;

expressServer(expressPort);
websocketServer({ PORT: 3002 });
