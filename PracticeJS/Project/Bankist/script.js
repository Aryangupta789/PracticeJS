'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2022-08-15T14:11:59.604Z',
    '2022-08-26T17:01:17.194Z',
    '2022-08-30T08:36:17.929Z',
    '2022-08-29T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2020-01-25T14:18:46.235Z',
    '2020-04-10T14:43:26.374Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPased = calcDaysPassed(new Date(), date);
  // console.log(daysPased)
  if (daysPased == 0) return 'Today';
  if (daysPased == 1) return 'Yesterday';
  if (daysPased <= 7) return `${daysPased} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//format numbers by intl
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const dispalyMovents = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  //sorting the movement
  const movs = sort ? acc.movements.slice().sort((a, b) => b - a) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatDate(date, acc.locale);
    const formattedCur = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
        <div class="movements__date">${displayDate} </div>
          <div class="movements__value">${formattedCur}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// dispalyMovents(account1.movements);

//ceating the initials
const createUserName = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(num => num[0])
      .join('');
  });
};
createUserName(accounts);

//calculating and displaying the total balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((a, c) => {
    return a + c;
  }, 0);
  // console.log(bal);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};
// calcDisplayBalance(account1.movements);

//calculating and displaying the incommings, outgoing and intrest
const calcDisplaySummary = function (acc) {
  const inBal = acc.movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = `${formatCur(inBal, acc.locale, acc.currency)}`;

  const outBal = acc.movements
    .filter(mov => {
      return mov < 0;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = `${formatCur(
    Math.abs(outBal),
    acc.locale,
    acc.currency
  )}`;
  //intrest is 1.1% and only intrest is calulated which is greater than or equal to 1
  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(diposit => (diposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((a, c) => a + c);
  labelSumInterest.textContent = `${formatCur(
    intrest.toFixed(2),
    acc.locale,
    acc.currency
  )}`;
};
// calcDisplaySummary(account1.movements);

//update the ui
const updateUI = function (acc) {
  //display movements
  dispalyMovents(acc);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
};
let currentAccount, timer;

// ///Fake Login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting with the internationalisation API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric', //+> inplace of numeric we can also write 'long', '2-digit',
  year: '2-digit',
  weekday: 'long',
};
const locale = navigator.language; //this will tell the language which is using in the web browser, so in place of  'en-US', we can use locale and can set the users language
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(now);

//timmer Function
const startTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };
  // Set time to 5 minutes
  let time = 600;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

//implimenting the login

btnLogin.addEventListener('click', function (e) {
  //prevents from refreshing the page
  e.preventDefault();

  //check for the username and store the account
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //resetting the login and pin and bluring the cursur in the login Pin
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    //display the ui
    containerApp.style.opacity = 100;

    //display Welcome message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    }`;
    //adding the time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
    };
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Timer
    if (timer) clearInterval(timer);
    timer = startTimer();

    //update UI
    updateUI(currentAccount);
  }
  /*
//  this is also same as the previous approch to chcek the account exits and also validate the account
  if(currentAccount && currentAccount.pin===Number(inputLoginPin.value)){
    console.log('Loged In')
  }

*/
});

//adding the money transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // prevents from reloading the page

  const recieverAccount = accounts.find(acc => {
    return acc.userName === inputTransferTo.value;
  });
  const amount = Number(inputTransferAmount.value);

  //RESET the transfer account and balance field form
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    recieverAccount &&
    amount <= currentAccount.balance &&
    amount > 0 &&
    recieverAccount?.userName !== currentAccount.userName
  ) {
    recieverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);

    //add transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    recieverAccount.movementsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentAccount);

    //reset the timer
    clearInterval(timer);
    timer = startTimer();
  }
  console.log('invalid');
});

//implementing the close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const confUserInd = accounts.findIndex(
    acc => acc.userName === inputCloseUsername.value
  );
  const confPin = Number(inputClosePin.value);
  if (
    inputCloseUsername.value === currentAccount.userName &&
    confPin === currentAccount.pin
  ) {
    //deleteing the current user
    accounts.splice(confUserInd, 1);
    //hiding UI
    containerApp.style.opacity = 0;
    //reseting the welcome message
    labelWelcome.textContent = 'Log in to get started';
  } else {
    console.log('Invalid');
  }
});

//Request Loan
//bank only approves the loan if any deposit is more than 10% of the requested money
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loan = Number(inputLoanAmount.value);
  if (currentAccount.movements.some(mov => mov > 0.1 * loan)) {
    setTimeout(function () {
      currentAccount.movements.push(loan);
      //add transfer Date
      currentAccount.movementsDates.push(new Date().toISOString());

      //update UI
      updateUI(currentAccount);
    }, 3500);
    inputLoanAmount.value=''
    //reset the timer
    clearInterval(timer);
    timer = startTimer();
  }
});

//sort movement
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  dispalyMovents(currentAccount, !sorted);
  sorted = !sorted;
});
/*
//EXTRA: just for use of Array.from 
//if we want to take the sum of arrays which are currently in the ui and not from the database

labelBalance.addEventListener('click', function(){
  const movemensUI= Array.from( document.querySelectorAll('.movements__value'),
  el=>Number(el.textContent.replace('€', '')));
  console.log(movemensUI)
  
})

//find the total amount deposited in all the accounts
let sum=0
const totalBalance= accounts.forEach(acc=>{
  sum+=acc.movements.filter(mov=>mov>0).reduce((a,c)=> a+c)
})
console.log(sum)
//another approch
const totalBalance1= accounts.flatMap(acc=>acc.movements).filter(mov=>mov>0).reduce((a,c)=>a+c,0)
console.log(totalBalance1)

//find no of deposites which are more han 1000
const depo1000= accounts.flatMap(acc=> acc.movements).filter(mov=>mov>1000).length
console.log(depo1000)

//second approch
const depo1000_= accounts.flatMap(acc=> acc.movements).reduce((count,curr)=>curr>1000?count+1:count,0)
console.log(depo1000_)


//return an object which is ahving the toatl sum of all the deposites and all the withdraws from all the accounts

const objDepWith= accounts
.flatMap(acc=>acc.movements)
.reduce((acc, cur)=>{
  acc[cur>0?'deposite':'withdraw']+=cur
  return acc
},{'deposite':0,'withdraw':0 })

console.log(objDepWith)
*/
