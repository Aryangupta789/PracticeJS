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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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

const dispalyMovents = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
          <div class="movements__value">${mov}€</div>
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
  labelBalance.textContent = `${acc.balance}€`;
};
// calcDisplayBalance(account1.movements);

//calculating and displaying the incommings, outgoing and intrest
const calcDisplaySummary = function (acc) {
  const inBal = acc.movements
    .filter(mov => {
      return mov > 0;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumIn.textContent = `${inBal}€`;

  const outBal = acc.movements
    .filter(mov => {
      return mov < 0;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = `${Math.abs(outBal)}€`;
  //intrest is 1.1% and only intrest is calulated which is greater than or equal to 1
  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(diposit => (diposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((a, c) => a + c);
  labelSumInterest.textContent = `${intrest.toFixed(2)}€`;
};
// calcDisplaySummary(account1.movements);

//update the ui
const updateUI= function(acc){
  //display movements
  dispalyMovents(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //display summary
  calcDisplaySummary(acc);
}

//implimenting the login
let currentAccount;
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
     //update UI
    updateUI(currentAccount)
    
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
  inputTransferAmount.value=inputTransferTo.value=''

  if (recieverAccount && 
    amount <= currentAccount.balance && 
    amount > 0 &&
    recieverAccount?.userName !== currentAccount.userName) {
      recieverAccount.movements.push(amount)
      currentAccount.movements.push(-amount)

      //update UI
      updateUI(currentAccount)
  }
  console.log('invalid')
});
