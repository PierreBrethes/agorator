var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js')
const authController = require('../controllers/authController.js')

// auth -> after login verify token front and token back
router.post('/', function(req, res, next) {
  return authController.auth(req, res)
  res.end()
})

// create new user
router.post('/register', function(req, res, next) {
  return usersController.createUser(req, res)
  res.end()
})

// verify username and password, give user with token
router.post('/login', function(req, res, next) {
  return authController.login(req, res)
  res.end()
})

module.exports = router;
