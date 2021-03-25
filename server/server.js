require("dotenv").config();
const path = require("path");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
//const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const DB = require("./config/connection");
const { typeDefs, resolvers } = require('./schema');
const { authMiddleware } = require('./utils/auth');
const userRouter = require("./routes/user");
//const chatRoute = require("./routes/chat");


// Use this to log mongo queries being executed!
mongoose.set("debug", true);

// passport

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app, cors: true });
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

//app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// app.use(passport.initialize());
// app.use(passport.session());
//app.use("/chat", chatRoute);
//app.use("/user", userRouter);





const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["https://localhost:3001", "https://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", ({ body, id }) => {
    console.log(body);
    //check factor
    io.emit("message", { body, id });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = (socket) => {
  // Emitting a new message. Will be consumed by the client
  socket.emit("/chat");
};
// io.on("connection", (socket) => {
//   console.log(socket.handshake.auth); // prints { token: "abcd" }
// });
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../dnd/build")));
// }
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dnd/build/index.html"));
// });

DB.once("open", () => {
  httpServer.listen(PORT, (error) => {
    if (error) throw new Error(`[Server]::ERROR:${error.message}`);
    console.log("[Server]: LISTEN:%s", PORT);
  });
});
module.exports = app;
