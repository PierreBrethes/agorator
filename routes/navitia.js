var express = require('express');
var router = express.Router();
const navitiaController = require('../controllers/navitiaController.js')
const vlsController = require('../controllers/vlsController.js')

/* GET users listing. */
// router.get('/:city/:line', function(req, res, next) {
//   return navitiaController.getLineByName(req, res)
//   res.end()
// });

router.get('/lines', function(req, res, next) {
  return navitiaController.getLines(req, res)
  res.end()
});

router.get('/lines/:code', function(req, res, next) {
  return navitiaController.getLineByCode(req, res)
  res.end()
});

router.get('/lines/:line/routes/:route', function(req, res, next) {
  return navitiaController.getStop_AreasByRoute(req, res)
  res.end()
});

router.get('/coverage/:coords/stop_areas/:code', function(req, res, next) {
  return navitiaController.getStopSchedulesByStopAreas(req, res)
  res.end()
})

router.get('/coverage/:coords/places_nearby/tram', function(req, res, next) {
  return navitiaController.getStopAreasTramNearby(req, res)
  res.end()
})

module.exports = router;
