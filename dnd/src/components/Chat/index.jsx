import React, { useState, useEffect, useMemo } from "react";
import socketIOClient from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
const ENDPOINT = "http://localhost:3000";

function Chat({ user }) {
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient();
  //   socket.on("/chat", (data) => {
  //     setResponse(data);
  //   });
  // }, []);

  // return (
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socket = useMemo(() => socketIOClient.connect("/"), []);

  useEffect(() => {
    socket.on("your id", (id) => {
      setYourID(id);
    });

    socket.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    console.log(socket);
    socket.emit("message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="chat">
      <div className="Container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return <p key={index}>{message.body}</p>;
          }
          return <p key={index}>{message.body}</p>;
        })}
      </div>
      <form className="form" onSubmit={sendMessage}>
        <a>{user.userName}</a>
        <input
          value={message}
          onChange={handleChange}
          placeholder="Say something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;

// <div>
//     <a>{user.userName}</a>
//     <p>
//       It's <time dateTime={response}>{response}</time>
//     </p>
//   </div>
