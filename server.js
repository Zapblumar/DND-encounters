const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const morgan = require('morgan')
const passport = require('passport');
require('dotenv').config();

//const indexRouter = require('./routes/index');
const userRouter = require('./routes/users')
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
//app.use('/', indexRouter);
app.use('/user', userRouter)

//const SERVER = http.createServer();

app.listen(PORT);
app.on("listening", () => {
  console.log("[Server]: LISTEN:%s", PORT);
});

app.on("error", error => {
  throw new Error(`[Server]::ERROR:${error.message}`)
})

const io = require('socket.io')(5000)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})
module.exports = app;