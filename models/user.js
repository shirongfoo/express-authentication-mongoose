var mongoose = require('mongoose')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
var bcrypt = require('bcrypt')

// draw the schema
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  name: {
    type: String,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  }
})

// do sth before we create new user
userSchema.pre('save', function (next) {
  var user = this
  console.log('about toe save user', user)
  // hash the password here
  // by the end of this prehook, password should not be password123
  var hash = bcrypt.hashSync(user.password, 10)
  console.log('original password is ', user.password)
  console.log('hashed password is ', hash)
  user.password = hash
  next() // calling next runs the create function
})

var User = mongoose.model('User', userSchema)

module.exports = User
