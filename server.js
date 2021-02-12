const express = require('express');
const mongoose = require('mongoose');
const socket = require("socket.io")
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DND-encounters', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// passport
const passport = require('./passport')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(passport.initialize())
//app.use(passport.session());
//app.use(require('./routes'));

const server = app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


const io = socket(server);

io.on('connection', (socket) => console.log(`connection is made`))