const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


// for Tylor to complete
const userSchema = new Schema({
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
  },
  character: {
    type: Schema.Types.ObjectId,
    ref: "character"
  }
})
userSchema.pre('save', async function (next) {
  if (!this.isModified('userPassword')) return next()
  try {
    this.userPassword = await bcrypt.hash(this.userPassword, await bcrypt.genSalt(10))
    next()

  }
  catch (error) {
    next(error)
  }
})
userSchema.methods.isCorrectPassword = function (password) {
  return bcrypt.compare(password, this.userPassword)
}
const User = model('User', userSchema);
module.exports = User;