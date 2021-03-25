import React, { useState, useEffect, useMemo, useLocalStorage } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import socketIOClient from "socket.io-client";
import { Button, Form, Col, Container, Tab, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
const ENDPOINT = "http://localhost:3000";

function Chat() {
  const { loading, data } = useQuery(GET_ME);
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socket = useMemo(() => {
    if (!loading && data?.me) return socketIOClient.connect("/");
  }, [loading, data]);

  useEffect(() => {
    if (!socket) return;
    socket.on("your id", (id) => {
      console.log("here", id);
      setYourID(id);
    });

    socket.on("message", (message) => {
      console.log("socket", message);
      receivedMessage(message);
    });
  }, [socket]);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: data.me.userName,
    };
    setMessage("");
    console.log(messageObject);
    socket.emit("message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }
  if (loading) return <> </>;
  if (!data?.me) return <Redirect to="/" />;
  const { character } = data.me;
  return (
    <Row className="chat">
      <div id="chat" className="col-12 col-md-6">
        <Tab.Content className=" justify-content-center overflow-auto flex-grow-1">
          {messages.map((message, index) => {
            if (message.id === yourID) {
              return (
                <p key={index}>
                  [{message.id}] {message.body}
                </p>
              );
            }
            return (
              <p key={index}>
                [{message.id}] {message.body}
              </p>
            );
          })}
        </Tab.Content>
        <Form
          className=" border-top border-right border-bottom border-left "
          onSubmit={sendMessage}
        >
          <a value={data.me.userName}>
            {data.me.userName}

            <input
              value={message}
              onChange={handleChange}
              placeholder="Say something..."
            />
          </a>
          <Button style={{ width: "200px" }} className="center" type="submit">
            Send
          </Button>
        </Form>
      </div>
      <Col>
        <div className="characterSheet">
          <ul className=" justify-content-center overflow-auto flex-grow-1">
            <h3> CHARACTER</h3>
            <br />
            <li>{data.me.userName}</li>
            <br />
            <li>{character.race}</li>
            <br />
            <li>{character.class}</li>
            <br />
            <li>{character.hp}</li>
            <br />
            <li>{character.stat}</li>
          </ul>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
