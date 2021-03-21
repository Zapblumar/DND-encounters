const { Schema, model } = require('mongoose');



// for Tylor to complete need to link user to it
const characterSchema = new Schema({

  race: {
    type: String,
  },
  class: {
    type: String,
  },
  hp: {
    type: Number
  },
  stat: {
    type: Number
  }
})



const Character = model('Character', characterSchema);
module.exports = Character;