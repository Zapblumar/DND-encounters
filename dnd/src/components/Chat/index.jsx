import React, { useState, useEffect, useMemo } from "react";
import socketIOClient from "socket.io-client";

import { Button, Form, Col, Container, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
const ENDPOINT = "http://localhost:3000";

function Chat({ character }) {
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
      <div className="container">
        <Container style={{ width: "250px" }} className="d-flex flex-column">
          <Tab.Content className=" justify-content-center overflow-auto flex-grow-1">
            {messages.map((message, index) => {
              if (message.id === yourID) {
                return <p key={index}>{message.body}</p>;
              }
              return <p key={index}>{message.body}</p>;
            })}
          </Tab.Content>
          <Form
            className=" border-top border-right border-bottom border-left "
            onSubmit={sendMessage}
          >
            <a>{character.race}</a>
            <input
              value={message}
              onChange={handleChange}
              placeholder="Say something..."
            />
            <Button style={{ width: "200px" }} className="center" type="submit">
              Send
            </Button>
          </Form>

          <Tab.Content className="overflow-auto flex-grow-1">
            <Col className="justify-content-center">CHARACTER </Col>
          </Tab.Content>
        </Container>
      </div>
    </div>
  );
}

export default Chat;
