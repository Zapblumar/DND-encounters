import React, { Component } from "react";
import { io } from "socket.io-client";

function chat() {
  const fs = require("fs");
  //http will be changed when live
  const socket = require("socket.io-client")("http://localhost:3001", {
    ca: fs.readFileSync("./cert.pem"),
  });
  // const socket = io({
  //   auth: {
  //     token: "abcd",
  //   },
  // });
  const socket = io({
    query: {
      x: 42,
    },
  });

  socket.io.on("reconnect_attempt", () => {
    socket.io.opts.query.x++;
  });
  //JSX
  return (
    <div>
      socket.connect()
      <h1>Chat</h1>
    </div>
  );
}

export default chat;
