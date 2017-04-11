var mongoose = require('mongoose')


if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/express-authentication')
} else {
  mongoose.connect('mongodb://localhost/express-authentication-test')
}

var User = require('./models/user')

User.create({
  name: 'New User',
  password: 'password123',
  email: 'test@test.com'
}, function(err, data){
  if(err) console.error(err)
  console.log('this is after save', data);
})
