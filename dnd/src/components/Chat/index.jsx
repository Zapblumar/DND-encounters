import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

function Chat({ user }) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("/chat", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <a>{user.userName}</a>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
}
export default Chat;
