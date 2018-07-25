var express = require('express');
var router = express.Router();
const vlsController = require('../controllers/vlsController.js')
const yugoController = require('../controllers/yugoController.js')
const autolibController = require('../controllers/autolibController.js')

router.get('/coverage/:coords/places_nearby/vls', function(req, res, next) {
  return vlsController.getSationVLSNearby(req, res)
  res.end()
})

router.get('/coverage/:coords/places_nearby/yugo', function(req, res, next) {
  return yugoController.getYugoNearby(req, res)
  res.end()
})

router.get('/coverage/:coords/places_nearby/autolib', function(req, res, next) {
  return autolibController.getAutoLibNearby(req, res)
  res.end()
})

module.exports = router;
