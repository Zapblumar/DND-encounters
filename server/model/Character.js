const { Schema, model } = require('mongoose');



// for Tylor to complete
const characterSchema = new Schema({
  userName: {
    User: userName
  },
  race: {
    type: String,
  },
  class: {
    type: String,
  },
  hp: {
    type: Int
  },
  stat: {
    type: Int
  }
})



const Character = model('Character', userSchema);
module.exports = Character;