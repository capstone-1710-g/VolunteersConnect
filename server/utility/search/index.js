const path = require('path');
const fs = require('fs');

const {codes} = require('./codes');

const lookup = function(zip) {
  console
  return codes[zip];
};

const degToRad = function(lat){
  return lat * (Math.PI / 180);
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

const readdZipCodeFile = function(){
  // let lines, result;
  // let zipcodes = {}

  // fs.readFile(__dirname + '/zipcodesRaw.txt','utf8',function read(err, data) {
  //   if (err) {
  //       throw err;
  //   }

  //   let result, zip, latitude, longitude;
  //   lines = data.split('\n');
  //   lines.shift();
  //   lines.forEach((line) => {
  //     result = line.split('\t');
  //     zip = result[0];
  //     latitude = result[result.length - 2];
  //     longitude = result[result.length - 1];

  //     if (zip && latitude && longitude) zipcodes[zip] = {latitude, longitude};
  //   });
  //   fs.writeFileSync(__dirname + "/codesJson.txt", JSON.stringify(zipcodes));
  //  // console.log(JSON.stringify(zipcodes))
  // });

}
const getZipCodes = function() { return codes };

module.exports = {
  lookup,
  getDistance,
  byRadius,
  haversine,
  getZipCodes
}
