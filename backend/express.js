import express from "express";

const app = express();

export const expressServer = PORT =>
  app.listen(PORT, () => console.log(`express is runing on port ${PORT}`));

export const serverIpPort = () => app.address();
