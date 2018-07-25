const request = require('./request.js');
const host = "https://opendata.paris.fr/api/records/1.0/";

async function getAutoLibNearby(req, res) {

  const endpoint = (coords) => {return "search/?dataset=stations_et_espaces_autolib_de_la_metropole_parisienne&geofilter.distance="+coords+",550&facet=ville&facet=cp&facet=type"}
  const data = await request(host, endpoint(req.params.coords))

  res.json(data)
}

module.exports = {
  getAutoLibNearby
 }
