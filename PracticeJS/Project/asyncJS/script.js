'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// XMLHttpRequest() this is used to connect the api from its http link, we have use 'open', 'GET and then "send"

const fetchCountry= function(country){
const request= new XMLHttpRequest()
request.open('GET',`https://restcountries.com/v3.1/name/${country}` )
request.send()
//we cannot directly get the request from the request.send(), since it will take time to fetch the data from the api, so we have to wait for the data to arrive by adding the addEventListener to the request

request.addEventListener('load',function(){
    const dataJSON= request.responseText     //here we will get the result in the json file formaty so we need to convert it in the js object
    const [data]=JSON.parse(dataJSON)
    console.log(data)
    const html=`
    <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(2)}M</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
    `

    countriesContainer.insertAdjacentHTML('beforeend', html)

    countriesContainer.style.opacity=1

})
}
fetchCountry('usa')
fetchCountry('united kingdom')
