const request = require('./request.js');

const host = "https://www.getyugo.com/api/v1/";
const token = "NeZFLot18UR8PUfNyvjtxESEQGafTTFh3nv52k1CtAgiBJVQOr4GoMok9OCR";

async function getYugoNearby(req, res) {
  const _coords = req.params.coords;
  const arrayCoords = _coords.split(',');
  const newCoords = arrayCoords[0]+"/"+arrayCoords[1];

  const endpoint = (coords, token) => {return "scooters/2/"+coords+"/?api_token="+token}
  const data = await request(host, endpoint(newCoords, token))

  res.json(data)
}

module.exports = {
  getYugoNearby
 }
