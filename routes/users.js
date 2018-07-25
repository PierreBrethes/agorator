var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  return usersController.getAllUsers(req, res)
  res.end()
});

router.get('/:data', function(req, res, next) {
  return usersController.getUser(req, res)
  res.end()
});

router.delete('/:mail', function(req, res, next) {
  return usersController.deleteUser(req, res)
  res.end()
})

module.exports = router;
