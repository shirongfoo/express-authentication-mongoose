var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.route('/register')
.get(function(req, res){
  res.render('auth/signup')
})
.post(function(req, res){
  var newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  })

  newUser.save(function(err, data){
    if(err) res.redirect('/register')
    res.redirect('/')
  })
})

router.route('/login')
router.get('/login', function(req, res) {
  res.render('auth/login');
});

module.exports = router;
