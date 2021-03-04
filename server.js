const express = require('express');
const socketIo = require('socket.io');

const mongoose = require('mongoose');
const router = express.Router();
const morgan = require('morgan')
const passport = require('passport');
require('dotenv').config();

//const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const chatRoute = require("./routes/chat")
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DND-encounters', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// passport


const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(require('cookie-parser')());
const session = require('express-session');

app.use(
  session({
    secret: 'Super secret secret',
    cookie: { expires: 10 * 60 * 1000 },
    resave: false,
  })
);
app.use(passport.initialize())
app.use(passport.session())
app.use('/chat', chatRoute);
app.use('/user', userRouter)

//const SERVER = http.createServer();

app.listen(PORT);
app.on("listening", () => {
  console.log("[Server]: LISTEN:%s", PORT);
});

app.on("error", error => {
  throw new Error(`[Server]::ERROR:${error.message}`)
})
const server = require("https").createServer(app)

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("/chat", response);
};
// io.on("connection", (socket) => {
//   console.log(socket.handshake.auth); // prints { token: "abcd" }
// });



module.exports = app;