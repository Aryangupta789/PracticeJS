'use strict';
let n; //just for better console log result
// Data needed for a later exercise

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

  orderDelivery: function ({
    starterIndex = 0,
    mainMenuIndex = 0,
    time,
    address,
  }) {
    console.log(
      `Order Recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainMenuIndex]} will be recieved by ${time} to ${address}`
    );
  },

  orderPizza: function (top1, top2, top3) {
    console.log(
      `order confirmend! for pizza with the toping ${top1}, ${top2} and ${top3}`
    );
  },

  orderPasta: function (...indgri) {
    console.log(
      `The pasta order is conformed with ${indgri[0]} as main ingrideant from ` +
        indgri
    );
    console.log(indgri);
  },
};

// calling a object property function by an object as argument and also assiging the default values
restaurant.orderDelivery({
  time: '16:30',
  starterIndex: 2,
  mainMenuIndex: 1,
  address: 'CP, Delhi',
});
restaurant.orderDelivery({
  time: '16:30',
  address: 'CP, Delhi',
});

//Destructuring objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//destracturing objects by the assigning a new variable name
const { name: restroNane, openingHours: hours, categories: tags } = restaurant;
console.log(restroNane, hours, tags);

// giving the default value (so that if the property is not in the object then the default value will be stored)
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log((n = 'defaultValue: '), starters, menu);

//mutating the variables
let a = 111;
let b = 899;
const obj = { a: 23, b: 7, c: 9 }; //use semi-colon
({ a, b } = obj); //here use (), if not then when js encounter the {} it thiks of a code block hence giving the error
console.log((n = 'mutating: '), a, b);

// nested objects:
const {
  fri: { open: openTime, close: closeTime },
} = openingHours;
console.log((n = 'nestedObjects: '), openTime, closeTime);

//Spread Operator(...):
const arr = [7, 2, 3];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
const newArray = [1, 2, ...arr];
console.log((n = 'SpreadOperator: '), badNewArray, newArray);

const newStarterMenu = [...restaurant.starterMenu, 'samosa'];
console.log(newStarterMenu);

//joinng two arrays using the spread operator
const newMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(newMenu);

//🔴 spread operator can only be used for iterables(arrays, strings, maps, sets and 'Not objects')
const str = 'Harry';
const letters = [...str, ' ', '💥'];
console.log(letters);

//calling the function with the spread operator arguments:
// const topping=[prompt("toping 1: "), prompt("toping 2: "), prompt("toping 3: ")]
// restaurant.orderPizza(...topping)

//using the spread operator in objects:

const newRestaurant = { ...restaurant, founder: 'mark', establiseYear: 1989 };
console.log(newRestaurant);
newRestaurant.name = 'Ristorante Rona'; // here we changed the property value in the copied object without changing the original one
console.log(newRestaurant.name);
console.log(restaurant.name);

// 🔴spread operator unpacks the elements wheras the rest elemnt packs the elment
// SPREAD, beacause on the right hand side:
const arr1 = [1, 2, ...[3, 4]];
//REST, because on left side of the '='
const [x, y, ...others] = [1, 2, 3, 3];

const [pizz, , Riso, ...otherFoods] = [
  ...restaurant.starterMenu,
  ...restaurant.mainMenu,
];
console.log(pizz, Riso, otherFoods);

//rest element should be at last

//rest for object:
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

const add = function (...number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    sum += number[i];
  }
  console.log(sum);
};

add(1, 4, 5, 5, 5);
add(1, 32, 2);

restaurant.orderPasta('mushroom', 'onion', 'olives');

// Short Circuiting (AND(&&) and OR(||) Operators)
// in the case of or operator if the first operant is truty value then it will not ignore the secound oerator and directly give the first operant as answer, this is called SHORT CIRCUITING

console.log(3 || 'jonas');
console.log('' || 'jonas'); //here first operant is falsy value, it will reurn the first truthy value

const guest1 = restaurant.numGuests
  ? restaurant.numGuests
  : (restaurant.numGuests = 10);

restaurant.numGuests = 23;
const guest2 = restaurant.numGuests || 10;
console.log(guest2);
// it will not work if the number is 0
// short cruiting using AND
console.log(('Hello' && 23 && null) || 'jonas'); //it will return the first falsy value
//example:
if (restaurant.orderPasta) {
  restaurant.orderPasta('onions', 'extra cheese');
}
// same can be done as-
restaurant.orderPasta && restaurant.orderPasta('onions', 'extra cheese');

//NULLISH COALESCING OPERATOR
//nullish operant works will nullish values i.e null and undifined and not 0 or ""
restaurant.numGuests = 0;
const guest = restaurant.numGuests || 10;
console.log(guest);

const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

const rest1 = {
  name: 'capri',
  numGuest: 0,
};

const rest2 = {
  name: 'La Plazza',
  Owner: 'Giovanni Rossi',
};

// OR assignment:
// rest1.numGuest= rest1.numGuest||10;
// rest2.numGuest= rest2.numGuest||10;
// rest1.numGuest||=10
// rest2.numGuest||=10
// console.log(rest1, rest2)
rest1.numGuest ??= 10;
rest2.numGuest ??= 10;
console.log(rest1, rest2);

//And assignment
//to change the name of the owner, if this property is present

rest1.ower &&= '<ANONYMOUS';
rest2.ower &&= '<ANONYMOUS';

//📕 use the FOR -OF loop for iterating the arrays

//SETS: COLLECTION OF UNIQUE VALUES
//
const orderSet = new Set([
  'pasta',
  'pizza',
  'pasta',
  'Samosa',
  'pizza',
  'Samosa',
  'pasta',
]);
console.log(orderSet);
console.log(new Set('Samosa'));

console.log(orderSet.size);
console.log(orderSet.has('Samosa'));
console.log(orderSet.has('Jalebi'));
orderSet.add('Pane sciocco');
orderSet.add('Pane sciocco');
console.log(orderSet);
orderSet.delete('Samosa');
console.log(orderSet);

// MAP:: Strores in key value pairs
const rest = new Map();
rest.set('name', 'classico Italiano');
rest.set(1, 'Firenze Italy');
console.log(rest.set(2, 'Lisbon Portugal'));

rest
  .set('categories', ['Italian', 'Pizzaerian', '  Vegatarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are Open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size);

// rest.set([1,2], "Test")
// console.log(rest.get([1,2]))    This will not work

const array = [1, 2];
rest.set(array, 'Test');
console.log(rest.get(array));

// we can also use query selector method
rest.set(document.querySelector('h1'), 'heading');

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

/*
// Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('portugal'));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1));

*/
/*
// Working With Strings - Part 2

const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
*/

/*
// Working With Strings - Part 3

// Split and join
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

*/

// string Practice
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//answer should be
//// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const unClearArr= flights.split('+')
for(const unClear of unClearArr){
  const unclearSplitArr= unClear.split(';')
  unclearSplitArr[0]=unclearSplitArr[0].slice(1).replace('_'," ");
  unclearSplitArr[1]=unclearSplitArr[1].slice(0,3).toUpperCase()
  unclearSplitArr[2]=unclearSplitArr[2].slice(0,3).toUpperCase()
  unclearSplitArr[3]=unclearSplitArr[3].replace(':',"h")
  
  const message=`${unclearSplitArr[0]} from ${unclearSplitArr[1]} to ${unclearSplitArr[2]} (${unclearSplitArr[3]})`.padStart(54)
  unclearSplitArr[0].slice(0,7)==='Delayed'?console.log(`🔴 ${message}`):console.log(`${message}`)
  // console.log(message)
}
