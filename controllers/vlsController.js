const request = require('./request.js');
const btoa = require('btoa');

const host = "https://api.qucit.com/bikepredict/v2/";
const usernamePassword = btoa("facebots:4hzXAhpvhOjDkFNb");
const base64 = "Basic "+usernamePassword;

async function getSationVLSNearby(req, res) {
  const endpoint = () => {return "token"}
  const data = await request(host, endpoint(), base64)
  const access_token = data.data.access_token

  const endpoint2 = (token, coords) => {return "stations?access_token="+token+"&radius=550&location="+coords}
  const data2 = await request(host, endpoint2(access_token, req.params.coords))

  if (data2.data.length == 0 ) {
    res.json({"message": "No VLS station nearby this location."})
  } else {
    const coords2 = data2.data[0].lat+","+data2.data[0].lng;

    const endpoint3 = (token, coords) => {return "occupations?access_token="+token+"&radius=550&date=in-0-minutes&location="+coords}
    const data3 = await request(host, endpoint3(access_token, coords2), base64)

    for (var i = 0; i < data2.data.length; i++) {
      data3.data.forEach((query) => {
        if(data2.data[i].sid === query.sid) {
          data2.data[i].realtime = query.realtime;
        }
      })
    }

    res.json(data2)
  }
}

module.exports = {
  getSationVLSNearby
 }

//
// "https://api.qucit.com/bikepredict/v2/stations?access_token="+token+"&radius=550&location="+_coords";
// "https://api.qucit.com/bikepredict/v2/occupations?access_token="+token+"&radius=550&date=in-0-minutes&location="+json2.data[0].lat+","+json2.data[0].lng"
//
//
//
//
