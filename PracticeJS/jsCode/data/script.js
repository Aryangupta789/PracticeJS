'use strict';
let n;  //just for better console log result
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  orderDelivery: function({starterIndex=0, mainMenuIndex=0, time, address}){
    console.log(`Order Recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainMenuIndex]} will be recieved by ${time} to ${address}`)
  },

  orderPizza:function(top1,top2,top3){
    console.log(`order confirmend! for pizza with the toping ${top1}, ${top2} and ${top3}`)
  },

  orderPasta: function(...indgri){
    console.log(`The pasta order is conformed with ${indgri[0]} as main ingrideant from `+indgri)
    console.log(indgri)
  }
};

// calling a object property function by an object as argument and also assiging the default values
restaurant.orderDelivery({
  time: "16:30",
  starterIndex:2,
  mainMenuIndex:1,
  address:"CP, Delhi"
});
restaurant.orderDelivery({
  time: "16:30",
  address:"CP, Delhi"
});

//Destructuring objects
const {name, openingHours, categories}=restaurant
console.log(name, openingHours, categories)

//destracturing objects by the assigning a new variable name
const {name: restroNane, openingHours:hours, categories:tags}= restaurant
console.log(restroNane, hours, tags)

// giving the default value (so that if the property is not in the object then the default value will be stored)
const {menu=[], starterMenu:starters=[]}= restaurant
console.log(n="defaultValue: ",starters, menu)

//mutating the variables
let a= 111
let b= 899
const obj = { a:23, b:7, c:9};  //use semi-colon
({a, b} = obj)      //here use (), if not then when js encounter the {} it thiks of a code block hence giving the error
console.log(n="mutating: ",a,b)

// nested objects:
const { fri:{open : openTime, close: closeTime} }=openingHours;
console.log(n="nestedObjects: ",openTime, closeTime)

//Spread Operator(...):
const arr= [7,2,3]
const badNewArray= [1,2,arr[0], arr[1], arr[2]]
const newArray=[1,2,...arr]
console.log(n="SpreadOperator: ", badNewArray, newArray)

const newStarterMenu=[...restaurant.starterMenu, 'samosa']
console.log(newStarterMenu)

//joinng two arrays using the spread operator 
const newMenu= [...restaurant.starterMenu, ...restaurant.mainMenu ]
console.log(newMenu)

//🔴 spread operator can only be used for iterables(arrays, strings, maps, sets and 'Not objects')
const str= "Harry"
const letters= [...str, " ", "💥"]
console.log(letters)

//calling the function with the spread operator arguments:
// const topping=[prompt("toping 1: "), prompt("toping 2: "), prompt("toping 3: ")]
// restaurant.orderPizza(...topping)

//using the spread operator in objects:

const newRestaurant= {...restaurant, founder:"mark", establiseYear: 1989}
console.log(newRestaurant)
newRestaurant.name='Ristorante Rona'  // here we changed the property value in the copied object without changing the original one
console.log(newRestaurant.name)
console.log(restaurant.name)


// 🔴spread operator unpacks the elements wheras the rest elemnt packs the elment
// SPREAD, beacause on the right hand side:
const arr1= [1,2,...[3,4]]
//REST, because on left side of the '='
const [x,y,...others]=[1,2,3,3]

const [pizz, , Riso, ...otherFoods]=[...restaurant.starterMenu, ...restaurant.mainMenu]
console.log(pizz, Riso, otherFoods)

//rest element should be at last

//rest for object:
const {sat, ...weekdays}=restaurant.openingHours
console.log(weekdays)

const add= function(...number){
  let sum=0;
  for(let i=0; i<number.length; i++){
    sum+=number[i];
  }
  console.log(sum)
}

add(1,4,5,5,5)
add(1,32,2)

restaurant.orderPasta("mushroom",'onion', 'olives')


// Short Circuiting (AND(&&) and OR(||) Operators)
// in the case of or operator if the first operant is truty value then it will not ignore the secound oerator and directly give the first operant as answer, this is called SHORT CIRCUITING

console.log(3||'jonas')
console.log(""||'jonas') //here first operant is falsy value, it will reurn the first truthy value

const guest1= restaurant.numGuests?restaurant.numGuests:restaurant.numGuests=10

restaurant.numGuests= 23;
const guest2= restaurant.numGuests||10
console.log(guest2)
// it will not work if the number is 0
// short cruiting using AND
console.log("Hello"&& 23 && null ||'jonas');  //it will return the first falsy value
//example:
if(restaurant.orderPasta){
  restaurant.orderPasta('onions','extra cheese')
}
// same can be done as-
restaurant.orderPasta && restaurant.orderPasta('onions','extra cheese')


//NULLISH COALESCING OPERATOR
//nullish operant works will nullish values i.e null and undifined and not 0 or ""
restaurant.numGuests=0;
const guest= restaurant.numGuests||10;
console.log(guest);

const guestCorrect= restaurant.numGuests??10;
console.log(guestCorrect);