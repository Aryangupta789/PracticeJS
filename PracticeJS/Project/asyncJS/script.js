'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// // XMLHttpRequest() this is used to connect the api from its http link, we have use 'open', 'GET and then "send"

// const fetchCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   //we cannot directly get the request from the request.send(), since it will take time to fetch the data from the api, so we have to wait for the data to arrive by adding the addEventListener to the request

//   request.addEventListener('load', function () {
//     const dataJSON = request.responseText; //here we will get the result in the json file formaty so we need to convert it in the js object
//     const [data] = JSON.parse(dataJSON);
//     console.log(data);
//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${Object.values(data.name)[0]}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(2)}M</p>
//             <p class="country__row"><span>🗣️</span>${
//               Object.values(data.languages)[0]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.values(data.currencies)[0].name
//             }</p>
//           </div>
//         </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   });
// };
// fetchCountry('usa');
// fetchCountry('united kingdom');

////////////////////////////////////////
//adding the callback hell: adding one ajax call inside another ajax call

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const fetchCountryData = function (data, className = '') {
  const html = `
    <article class= "country ${className}" >
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(2)}M</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const fetchCountryAndNeighbour = function (country) {
  //first ajax call
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    fetchCountryData(data);

    const neighbourCountry = data.borders?.[0];

    if (!neighbourCountry) return;

    //second ajax call inside first ajax call
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(request2.responseText);
      console.log(data2);
      fetchCountryData(data2, 'neighbour');
    });
  });
};

// fetchCountryAndNeighbour('usa');

// //callbackHell: one ajax call is done inside another ajax
// setTimeout(() => {
//     console.log('1 second passed');
//     setTimeout(() => {
//       console.log('2 seconds passed');
//       setTimeout(() => {
//         console.log('3 second passed');
//         setTimeout(() => {
//           console.log('4 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);

//Consuming Promises
/*
const getCountrydata = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then(function (response) {
    console.log(response)    
    return response.json()     //.json also create a promise so we have to add json here also, 
  }).then(function(data){    //the value which is returned fromn the previous then method will used here as data. 
    console.log(data[0])
    fetchCountryData(data[0])
  });
};
*/
const getCountrydata = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
        console.log(response)
        if(!response.ok)
            throw new Error(`Country not found ${response.status}`)
        return response.json()
    })
    .then(data => {
      fetchCountryData(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response1 => response1.json())
    .then(data2 => fetchCountryData(data2[0], 'neighbour'))
    .catch(err => {        
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function(){
    getCountrydata('USA');
})
//catch method will run if the promis is not fullfiled i.e rejected, 
//then method will run if it is fullfilled
//and finally will run either the promise is fullfilled or not



/*

Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
promises to get the data. Do not use the 'getJSON' function we created, that
is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the
console
5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.
7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474

*/