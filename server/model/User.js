const { Schema, model } = require('mongoose');

// for Tylor to complete
const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: 'Username is Required'
  },
  userEmail: {
    type: String,
    unique: true,
    required: 'Email is Required',
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please enter a valid e-mail address']
  },
  userPassword: {
    type: String,
    required: 'Password is Required',
    minLength: 6
  }
})

const User = model('User', UserSchema);
module.exports = User;