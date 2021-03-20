require("dotenv").config();
const path = require("path");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const DB = require("./config/connection");
const { typeDefs, resolvers } = require('./schema');
const { GraphQLLocalStrategy, buildContext } = require("graphql-passport");
const userRouter = require("./routes/users");
const chatRoute = require("./routes/chat");

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

// passport

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(require('cookie-parser')());

app.use(
  session({
    secret: "Super secret secret",
    cookie: { expires: 10 * 60 * 1000 },
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/chat", chatRoute);
app.use("/user", userRouter);


// context.authenticate("graphql-local", { email, password }); // not available for subscriptions
// context.login(user); // not available for subscriptions
// context.logout(); // not available for subscriptions
// context.isAuthenticated();
// context.isUnauthenticated();
// context.getUser();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req, res }) => buildContext({ req, res, User })
});

server.applyMiddleware({ app, cors: false });


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
    io.emit("message", { body });
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
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dnd/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dnd/build/index.html"));
});

DB.once("open", () => {
  httpServer.listen(PORT, (error) => {
    if (error) throw new Error(`[Server]::ERROR:${error.message}`);
    console.log("[Server]: LISTEN:%s", PORT);
  });
});
module.exports = app;
