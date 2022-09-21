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

// const fetchCountryAndNeighbour = function (country) {
//   //first ajax call
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);
//     fetchCountryData(data);

//     const neighbourCountry = data.borders?.[0];

//     if (!neighbourCountry) return;

//     //second ajax call inside first ajax call
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${neighbourCountry}`
//     );
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(request2.responseText);
//       console.log(data2);
//       fetchCountryData(data2, 'neighbour');
//     });
//   });
// };

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
const getJSON = function (url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
  };

const getCountrydata = function (country) {
    getJSON(`https://restcountries.com/v3.1/name/${country}`,"Country not found")
    .then(data => {
      fetchCountryData(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
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


//EVENT LOOP EXAMPLE
console.log('test start')    //this will go directly to the call stack
setTimeout(()=>console.log('0 sec time'), 0)     //this willl first go to the web api and after 0 secound will go to callback queue and wait for the trun to go to call stack
Promise.resolve('resolved promise 1').then(res=>console.log(res));       //Promise.resolve will resolve the query instantly and will send it to the 'microtasks queue', which have more priority for execution that of callback queue
console.log('test end')   // will be go directly to the call stack

//so here the output will be first for the code which goes directly to the call stack i.e first and last line.
// then since both the tasks (setTimeout and promise) will be ready to execute in same time but the priority will be give to the task which is in the microtask queue, so no first promise will go to the execution than the setTimeout 