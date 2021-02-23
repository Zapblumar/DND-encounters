const express = require('express');
const mongoose = require('mongoose');
const socket = require("socket.io");
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
app.use(express.static('./public'));
//app.use(require('cookie-parser')());
const session = require('express-session');
app.use(passport.initialize())
app.use(
  session({
    secret: 'Super secret secret',
    cookie: { expires: 10 * 60 * 1000 },
    resave: false,
  })
);

//app.use('/', indexRouter);
app.use('/user', userRouter)

const server = app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


const io = socket(server);

io.on('connection', (socket) => console.log(`connection is made`))

module.exports = app;