var expect = require('chai').expect
var request = require('supertest')
var app = require('../index')
var mongoose = require('mongoose')
var dropMongooseDB = require('./drop_mongoose_db.js')

before(function (done) {
  dropMongooseDB(done)
})

describe('Auth Controller', function () {
  describe('GET /register', function () {
    it('should return a 200 response', function (done) {
      request(app).get('/register').expect(200, done)
    })
  })

  describe('POST /register', function () {
    it('should redirect to / on success', function (done) {
      request(app).post('/register')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'new@new.co',
          name: 'Brian',
          password: 'password'
        })
        .expect('Location', '/')
        .expect(302, done)
    })

    it('should redirect to /register on failure', function (done) {
      request(app).post('/register')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'new',
          name: 'Brian',
          password: 'p'
        })
        .expect('Location', '/register')
        .expect(302, done)
    })
  })

  describe('GET /auth/login', function () {
    it('should return a 200 response', function (done) {
      request(app).get('/auth/login')
        .expect(200, done)
        .end(function(err, res){
          if(err) return done(err)
        })
    })
  })

  describe('POST /auth/login', function () {
    it('should redirect to / on success', function (done) {
      request(app).post('/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'new@new.co',
          password: 'password'
        })
        .expect('Location', '/')
        .expect(302, done)
        .end(function(err, res){
          if(err) return done(err)
        })
    })

    it('should redirect to /auth/login on failure', function (done) {
      request(app).post('/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'new@new.co',
          password: 'p'
        })
        .expect('Location', '/auth/login')
        .expect(302, done)
        .end(function(err, res){
          if(err) return done(err)
        })
    })
  })

  describe('GET /auth/logout', function () {
    it('should redirect to /', function (done) {
      request(app).get('/auth/logout')
        .expect('Location', '/')
        .expect(302, done)
        .end(function(err, res){
          if(err) return done(err)
        })
    })
  })
})
