/**
 * sunrise-sunset-promise.js
 *
 * This example shows how we can use Promises to make the async code more readable.
 */
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY;
const MAPQUEST_URL = `https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}`;
const SS_API = 'https://api.sunrise-sunset.org/json?';

const cityName = process.argv[2] || 'New York,NY';
const cityMapUrl = `${MAPQUEST_URL}&location=${cityName}`;

console.log(`Sunrise/sunset in: ${cityName}`);

fetch(cityMapUrl)
  .then(res => res.json())
  .then(json => json.results[0].locations[0].latLng)
  .catch(err => {
    console.error('first error', err);
    throw err;
  })
  .then(city => fetch(`${SS_API}&lat=${city.lat}&lng=${city.lng}`))
  .then(res => res.json())
  .then(sunriseSunset => console.log(sunriseSunset))
  .catch(err => console.error('second error', err));

// promise.then(onSuccess).catch(onError);

// =

// promise.then(onSuccess).then(null, onError);

// let p1 = promise.then(onSuccess);
// p1.then(null, onError);

// =

// promise.then(onSuccess, onError);
