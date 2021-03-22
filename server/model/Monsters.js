
const { Schema, model } = require('mongoose');

//for Tylor
const monstersSchema = new Schema({
  MonsterName: {
    type: String,
  },
  AC: {
    type: Number,
  },
  Health: {
    type: Number,
  },
});
const Monsters = model('Monsters', monstersSchema);

module.exports = Monsters;
