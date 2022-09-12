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

    if(!neighbourCountry) return;

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

fetchCountryAndNeighbour('usa');


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