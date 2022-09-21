//importing the module   //it will only work if we specify the type of this file in the html as module.
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//es6 module will work fine if we ommit the extension of the file

//import module will run first then the code in the page  SINCE imporing modules are hosted on the top.
//all modules are executed in the strict mode by default

console.log('importing module');
addToCart('Breads', 5);
console.log(price, tq);

import * as shoppingCart from './shoppingCart.js'; //here we can call all the functions from the module and this will work as a class
shoppingCart.addToCart('chocolate', 10);
console.log(shoppingCart.totalPrice);

//importing the default
import add from './shoppingCart.js';
add('Pizzas', 1);
//here we can import only on thing from the default export

//ANY OBJECT WHICH WE IMPORTED IS NOT THE COPY OF THAT OBJECT BUT IT IS THE LIVE CONNECTIONS OF THE OBJECTS.

//////////////////////////////////
//TOP LEVEL AWAIT (ES2022)
//only works in the modules, chcek the type is set to module in the html
//here await is working outside the async function, no need to define the async function
/*

console.log('fetching data....')
const res= await  fetch('https://jsonplaceholder.typicode.com/posts')
const data = await res.json()
console.log(data)
console.log('fetching completed.')

*/

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);
//this will not give the correct anser since till now the data is not fetched

//not clean
lastPost.then(last => console.log(last));

//practical use of top level await
const lastPost2 = await getLastPost();
console.log(lastPost2);

//IF ONE MODULE IMPORTS THE MODULE WHICH HAVE THE TOP LEVEL AWAIT THEN THE IMPORTING MODULE WILL WAIT FOR THE IMPORTED MODULE TO FINISH THE BLOCKING CODE

/////////////////////////////////////
//the Module Pattern
const shoppingCart2 = (function () {
  const cart = [];
  const shoppingCost = 10;
  const totalPrice = 237;
  const totalQuanty = 23;
  const addToCart = function (product, quantity) {
    cart.push(product, quantity);
    console.log(
      `${quantity} ${product} are added to the cart with shopping cost of ${shoppingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} Orderd from the supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuanty,
  }; //only these data will be accessecible ouside this function
})();

shoppingCart2.addToCart('apple', 4);
console.log(shoppingCart2);
console.log(shoppingCart2.shoppingCost); //here shoppingCost is not accesseble
