//exporting the module

console.log('exporting the module');

const shippingCost = 10;
const cart = [];
//currently the shipping costr and cart are scoped in the current module only, to use then in the other module we have to use the exports, which is of two types:
//1. name exports
//2. default exports

//it is the name export
export const addToCart = function (product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} are added to the cart`);
};
//always remenber that the export should be decleared in the main code and not in the block of any function.

const totalPrice = 237;
const totalQuanty = 23;

export { totalPrice, totalQuanty as tq };
//can export multiply objects in a single export an can even change the name in either the exported module or in the imported module

//default export
//these are used when we want to export only one thing per module
export default function defaultFun(product, quantity) {
  cart.push(product, quantity);
  console.log(`${quantity} ${product} are added to the cart`);
}

/*
///////////TOP LEVEL AWAIT////////
//blocking the code
console.log('fetching start.....');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
console.log('Finished Fetching..');
*/
