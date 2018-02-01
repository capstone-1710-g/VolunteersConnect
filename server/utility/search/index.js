const path = require('path');
const fs = require('fs');
const {codes} = require('./codes');
const kd = require('kdtree');

const lookup = function(zip) {

  return codes[zip];
};

const degToRad = function(degrees){
  return degrees * (Math.PI / 180);
}

const getDistance = function(zipA, zipB){
  zipA = lookup(zipA);
  zipB = lookup(zipB);

  // const EARTH_RADIUS = 3958.56540656; // in miles
  // const zipALatitudeRadians = degToRad(zipA.latitude);
  // const zipBLatitudeRadians = degToRad(zipB.latitude);

  // let distance = Math.sin(zipALatitudeRadians)
  //             * Math.sin(zipBLatitudeRadians)
  //             + Math.cos(zipALatitudeRadians)
  //             * Math.cos(zipBLatitudeRadians)
  //             * Math.cos(degToRad(zipA.longitude - zipB.longitude));

  // distance = Math.acos(distance) * EARTH_RADIUS;
  // return Math.round(distance*100)/100;

  return haversine(zipA.latitude, zipA.longitude, zipB.latitude, zipB.longitude);
}

const byRadius = function(zip, radius){

  if (codes[zip]){
    //console.log(codes[zip])
    return Object.keys(codes).reduce((result, code) => {
        if(getDistance(zip, code) <= radius) result.push(code);
        return result;
    }, []);
  }
};

const haversine = function (lat1,lon1, lat2,lon2) {		// Retuns the great circle distance between two coordinate points in miles
	const dLat = degToRad(lat2 - lat1);
	const dLon = degToRad(lon2 - lon1);
	lat1 = degToRad(lat1);
	lat2 = degToRad(lat2);

	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return 3960 * c;
}

const getNearest = function(zipCodeInfo, radius){

  let mileInMeters = 1609.34;

  const tree = new kd.KDTree(3);
  let coords, codeInfo;

  for(let code in codes){
    codeInfo = lookup(code);
    coords = toECEF(codeInfo.latitude, codeInfo.longitude);
    //console.log(coords)
    tree.insert(coords.x, coords.y, coords.z, code);
  }

  let key, result;
  for(let code in codes){
    codeInfo = lookup(code);
    coords = toECEF(codeInfo.latitude, codeInfo.longitude);
    key = radius + 'miles';

    result = tree.nearestRange(coords.x, coords.y, coords.z, radius * mileInMeters);

    for(let i = 0; i < result.length; i++){
      key = radius + 'miles';

        if(zipCodeInfo[code]){
          if(zipCodeInfo[code][key]) zipCodeInfo[code][key][result[i][3]] = true;
          else {
            zipCodeInfo[code][key] = {};
            zipCodeInfo[code][key][result[i][3]] = true;
          }
        } else {
          zipCodeInfo[code] = {};
          zipCodeInfo[code][key] = {};
          zipCodeInfo[code][key][result[i][3]] = true;
        }

    }

  }

}

const zipcodesInfoToJson = function(){

  let results = {};
  getNearest(results, 5);
  getNearest(results, 10);
  getNearest(results, 25);

  let codesJson = JSON.stringify(results);
  fs.writeFile( __dirname + '/codesJsoncomplete.JSON', codesJson, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

};

const toECEF = function(lat, lon) {

  let cosLat = Math.cos(degToRad(lat));
  let sinLat = Math.sin(degToRad(lat));
  let cosLon = Math.cos(degToRad(lon));
  let sinLon = Math.sin(degToRad(lon));
  let R = 6378137.0 // earth radius

  let f = 1.0 / 298.257224;
  let C = 1.0 / Math.sqrt(cosLat * cosLat + (1 - f) * (1 - f) * sinLat * sinLat);
  let S = (1.0 - f) * (1.0 - f) * C;
  let h = 0.0;

  let x = (R * C + h) * cosLat * cosLon;
  let y = (R * C + h) * cosLat * sinLon;
  let z = (R * S + h) * sinLat;

  return {x, y, z};
}


const toCartesian = function(){

  let item = {};
  let caretesiancoords = [];
  let codeLocation;

  return Object.keys(codes).map((code) => {
    codeLocation = lookup(code);
    caretesiancoords = toECEF(codeLocation.latitude, codeLocation.longitude);

    item = {
      'minX': caretesiancoords[0],
      'minY': caretesiancoords[1],
      'maxX': caretesiancoords[0],
      'maxY': caretesiancoords[1],
      'zipCode': code
    }
    return item;
  });


};


module.exports = {
  zipcodesInfoToJson
}
