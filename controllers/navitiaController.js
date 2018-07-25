const request = require('./request.js');
const host = "https://api.navitia.io/v1/";
const token = "f83dfac2-6962-4cc8-a33a-70252aacfe67";

async function getLines(req, res) {
  const endpoint = (coverage) => {return "coverage/"+coverage+"/physical_modes/physical_mode:Tramway/lines"};
  // ---------- FR-SW --------- //
  const fr_sw = await request(host, endpoint("fr-sw"), token);
  const linesfr_sw = [];
  fr_sw.lines.forEach((line) => {
    const routes = [];
    line.routes.forEach((route) => {
      routes.push({direction: route.name, code: route.id})
    })
    query = {line: line.code, code: line.id, routes: routes}
    linesfr_sw.push(query);
  });
  // ---------- FR-SE --------- //
  const fr_se = await request(host, endpoint("fr-se"), token);
  const linesfr_se = [];
  fr_se.lines.forEach((line) => {
    const routes = [];
    line.routes.forEach((route) => {
      routes.push({direction: route.name, code: route.id})
    })
    query = {line: line.code, code: line.id, routes: routes}
    linesfr_se.push(query);
  });
  // ---------- FR-NW --------- //
  const fr_nw = await request(host, endpoint("fr-nw"), token);
  const linesfr_nw = [];
  fr_nw.lines.forEach((line) => {
    const routes = [];
    line.routes.forEach((route) => {
      routes.push({direction: route.name, code: route.id})
    })
    query = {line: line.code, code: line.id, routes: routes}
    linesfr_nw.push(query);
  });
  // ---------- FR-NE --------- //
  const fr_ne = await request(host, endpoint("fr-ne"), token);
  const linesfr_ne = [];
  fr_ne.lines.forEach((line) => {
    const routes = [];
    line.routes.forEach((route) => {
      routes.push({direction: route.name, code: route.id})
    })
    query = {line: line.code, code: line.id, routes: routes}
    linesfr_ne.push(query);
  });
  // ---------- FR-IDF --------- //
  const fr_idf = await request(host, endpoint("fr-idf"), token);
  const linesfr_idf = [];
  fr_idf.lines.forEach((line) => {
    const routes = [];
    line.routes.forEach((route) => {
      routes.push({direction: route.name, name: route.id})
    })
    query = {line: line.code, code: line.id, routes: routes}
    linesfr_idf.push(query);
  });

  const result = [{"coverage":"fr-sw", data: linesfr_sw}, {"coverage":"fr-se", data: linesfr_se}, {"coverage":"fr-nw", data: linesfr_nw}, {"coverage":"fr-ne", data: linesfr_ne}, {"coverage":"fr-idf", data: linesfr_idf}];
  res.json(result);
}
async function getLineByCode(req, res) {
  const endpoint = (coverage, code) => {
    return "coverage/"+coverage+"/physical_modes/physical_mode:Tramway/lines/"+code+"/routes?"
  }
  const data = await request(host, endpoint("fr-sw", req.params.code), token);
  const routes = [];
  data.routes.forEach((query)=>{
    routes.push({direction: query.name, code: query.id})
  })
  res.json(routes);
}
async function getStop_AreasByRoute(req, res) {
  const endpoint = (coverage, line, route) => {
    return "coverage/"+coverage+"/physical_modes/physical_mode:Tramway/lines/"+line+"/routes/"+route+"/route_schedules?"
  }
  const data = await request(host, endpoint("fr-sw", req.params.line, req.params.route), token)
  const queries = []
  data.route_schedules.forEach((query) => {
    queries.push(query.table)
  })
  res.json(queries)
}
async function getStopSchedulesByStopAreas(req, res) {
  var date = new Date();
  var day = date.getUTCDate();
  var month = "0" +(1 + date.getUTCMonth());
  var year = date.getUTCFullYear();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var formattedTime = year + month + day + "T" + hours +''+ minutes.substr(-2) + '' + seconds.substr(-2);

  const endpoint = (coords, code) => {
    return "coverage/"+coords+"/stop_areas/stop_area"+code+"/departures?from_datetime="+formattedTime
  }
  const array = req.params.coords.split(',');
  const _coords = array[1]+";"+array[0];
  const data = await request(host, endpoint(_coords, req.params.code), token)
  res.json(data)
}

async function getStopAreasTramNearby(req, res) {
  const endpoint = (coords) => {
    return "coord/"+coords+"/places_nearby?distance=500&type%5B%5D=stop_area&coverage=region_id&filter=physical_mode.uri%3Dphysical_mode%3ATramway&"
  }
  const array = req.params.coords.split(',');
  const _coords = array[1]+";"+array[0];
  const data = await request(host, endpoint(_coords), token)
  if (data.places_nearby) {
    res.json(data.places_nearby)
  } else {
    res.json({status: "No places nearby within 500m."})
  }
}

async function getRoutesByLine(req, res) {
  switch (req.params.city) {
    case 'bordeaux':
      console.log('Vous êtes dans Bordeaux');
      coverage = 'coverage/fr-sw/';
      switch (req.params.line) {
        case 'A':
          line = "lines/line:OBX:59/";
          endpoint = coverage+"physical_modes/physical_mode%3ATramway/"+line+"route_schedules?";
          break;
        case 'B':
          line = "lines/line:OBX:60/";
          endpoint = coverage+"physical_modes/physical_mode%3ATramway/"+line+"route_schedules?";
          break;
        case 'BC':
          line = "lines/line:OBX:61/";
          endpoint = coverage+"physical_modes/physical_mode%3ATramway/"+line+"route_schedules?";
          break;
      }
      break;
    case 'nantes':
      console.log('Vous êtes dans Nantes');
      break;
    case 'paris':
      console.log('Vous êtes dans Paris');
      break;
    default:
      console.log('Sorry, ' + expr + ' doesn\'t correspond to our cities');
  }
  const result = await request(host, endpoint, token);
  res.json(result);
}

module.exports = {
  getLines,
  getLineByCode,
  getStop_AreasByRoute,
  getStopAreasTramNearby,
  getStopSchedulesByStopAreas
 }
