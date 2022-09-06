'use strict'
/* 
👉constractor Function:
-In javascript the constructor function is created similar to the normal function, but by convention the constructor function name starts with a capital letter
-In a constructor function "this" does not have a value. It is a substitute for the new object. The value of "this" will become the new object when a new object is created.
*/

const Person= function(fName, bYear){
    this.firstName= fName;
    this.birthYear= bYear;

    // Never Use this =>because the more we create a instance like jonas the more copy of this function will be atteched. 
    // this.calcAge= function(){
    //     console.log(2022-this.birthYear)
    // }
}

const jonas= new Person('Jonas', 2000)
console.log(jonas)
// as soon as new instance is created by using the word 'new', following work is done
// 1.New empty object {} is created
// 2.function is called and the value of 'this' is assigned with the object
// 3.{} is linekd to prototype
// 4. function automatically returns the object '{}'
 
const jack= new Person('Jack', 1996)
const mohit= 'Mohit'
//to check wether the object created is instance of constructor
console.log(jack instanceof Person)
console.log(mohit instanceof Person)

/*
👉Prototype:
-Prototypes are the mechanism by which JavaScript objects inherit features from one another.
-whenever we create any object , array or any thing , an object is atteched to it which cointains various methods that can be accessed by the dot(.) operator 
-any object which we created like array object or date object , it inherits from Array.prototype or Date.prototype respectively.
- The Object.prototype is on the top of the inheritance chain. The Array, or Datew or any other object which we created  inherit from the Object.prototype

*/
const arr=['arar', 4154]
console.log(arr.__proto__===Array.prototype)
console.log(arr.__proto__.__proto__===Array.prototype.__proto__)
console.log(Array.prototype.__proto__===Object.prototype)



console.log(Person.prototype)

Person.prototype.calcAge= function(){
    console.log(2022-this.birthYear)
}   

jonas.calcAge()

console.log(jonas.__proto__)
console.log(jonas.__proto__=== Person.prototype)

console.log((Person.prototype).isPrototypeOf(jonas))
console.log((Person.prototype).isPrototypeOf(Person))
console.log((Object.prototype).isPrototypeOf(Person))

Person.prototype.species='Homo Sepiens'; //added properties to the Person Prototype
console.log(jonas.species, jack.species)  //since the property species are present in the Person Object so the jonas object can inhert this property but this property is not its now property

console.log(jonas.hasOwnProperty('species'))  //=> false
console.log(jonas.hasOwnProperty('firstName'))  //=> true

//static methods: cannot be accessd by the instance
Person.hey= function(){
    console.log("Hello!!")
}

Person.hey()
// jonas.hey()     =>cannot be accessed by the jonas, will give error



//ES6 Classes

//class expresssion:
// const PersonCl= {}

//class decleration:
class PersonCl{
    constructor(fullName, bYear){
        this.fullName= fullName;
        this.birthYear= bYear
    }

    //Below methods will be added to .prototype property and can be accesed by the instances ince called the instance method
    calcAge(){
        console.log(2022-this.birthYear)
    }
    greet(){
        console.log(`hello ${this.fullName}`)
    }

    get age(){
        return 2022-this.birthYear
    }
    //static method: only accesed by the class and not the instances
    static hey(){
        console.log("Hello!!")
    }


    //set property that is already exists
    set fullName(name){
        if(name.includes(' ')){
            this._fullName= name
        }else alert('Enter full name')
    }

    get fullName(){
        return this._fullName
    }

}

const jessica = new PersonCl('Jessica Davis', 1995);
console.log(jessica)

//static methods
PersonCl.hey()
// jessica.hey()   =>this will give an error


jessica.calcAge()   //calcAge as the method or function
console.log(jessica.age)   //accessing the age as a property
//here also we can use the prototyoe to add the methods or properties

PersonCl.prototype.signOff= function(){
    console.log(`Bye, ${this.fullName}`)
}

jessica.greet()
jessica.signOff()


//getter and setter
//Getters and setters allow us to define Object Accessors (Computed Properties)
//get is use to access a method as a property



// Object.create:it creates a new object, using an existing object as the prototype of the newly created object.
const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },
  
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
};
  
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//Inheritance between the clasess: construction function

const PersonIn= function(firstName, birthYear){
    this.firstName=firstName;
    this.birthYear= birthYear
}

PersonIn.prototype.calcAge= function(){
    console.log(2022-this.birthYear)
}

const StudentIn= function(firstName, birthYear, course){
    // this.firstName= firstName;
    // this.birthYear= birthYear;
    Person.call(this, firstName, birthYear)  //Since we have to define the this keyword
    this.course= course;
}

StudentIn.prototype= Object.create(Person.prototype)
//if we donot add the previous line then-
// mike.calcAge() ==>will give the error sice calcAge is not in the prototyor of mike
// console.log(mike instanceof StudentIn)
// console.log(mike instanceof Person)

StudentIn.prototype.intro= function(){
    console.log(`Hello, i am ${this.firstName} and i a studing ${this.course}.`);
}

const mike= new StudentIn('Mike', 1998, 'Computer Science')
mike.intro()
mike.calcAge()

console.log(mike.__proto__)

StudentIn.prototype.constuctor=StudentIn
console.dir(StudentIn.prototype.constuctor)

// StudentIn.prototype= Object.create(Person.prototype)
//if we donot add "StudentIn.prototype= Object.create(Person.prototype)" then-
// mike.calcAge() ==>will give the error since calcAge is not in the prototype of mike
// console.log(mike instanceof StudentIn)  ==>true
// console.log(mike instanceof Person)  ==>false


// Inheritance Between 'Classes': ES6 Classes
//we need extends and super

//if we do not need new property then no need to add the cosntructor function
class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course){
        //always add super first
        super(fullName, birthYear)
        this.course= course
    }
    intro(){
        console.log(`Hello, i am ${this.fullName} and i am studing ${this.course}.`);
    }
    calcAge(){
        console.log(`age is : ${2022-this.birthYear}`)
    }
}

const martha= new StudentCl('Martha Jonas', 2001, 'Math')
console.log(martha)
martha.intro()
martha.calcAge()

//Inheritance Between classes: Object.create
const PersonProtoOb= {
    calcAge(){
        console.log(2022-this.birthYear)
    },
    init(firstName, birthYear){
        this.firstName= firstName;
        this.birthYear=birthYear;
    },
}


const StudentProtoOb= Object.create(PersonProtoOb)
StudentProtoOb.init= function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course= course
}
 StudentProtoOb.intro=function(){
    console.log(`hi, i am ${this.firstName} and i am studying ${this.course}`)
 }

 const jay= Object.create(StudentProtoOb)
 jay.init('Jay', 2010, 'Sociology')
 jay.intro()
 jay.calcAge()

/////////////////////////////////////////
// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class Fields and Methods

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
    // 1) Public fields (instances)
    locale = navigator.language;
  
    // 2) Private fields (instances)
    #movements = [];
    #pin;
  
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin;
  
      // Protected property
      // this._movements = [];
      // this.locale = navigator.language;
  
      console.log(`Thanks for opening an account, ${owner}`);
    }
  
    // 3) Public methods
  
    // Public interface
    getMovements() {
      return this.#movements;
    }
  
    deposit(val) {
      this.#movements.push(val);
      return this;
    }
  
    withdraw(val) {
      this.deposit(-val);
      return this;
    }
  
    requestLoan(val) {
    //   if (this.#approveLoan(val)) {
      if (this._approveLoan(val)) {
        this.deposit(val);
        console.log(`Loan approved`);
        return this;
      }
    }
  
    static helper() {
      console.log('Helper');
    }
  
    // 4) Private methods
    // #approveLoan(val) {
    _approveLoan(val) {
      return true;
    }
  }
  
  const acc1 = new Account('Jonas', 'EUR', 1111);
  
  // acc1._movements.push(250);
  // acc1._movements.push(-140);
  // acc1.approveLoan(1000);
  
  acc1.deposit(250);
  acc1.withdraw(140);
  acc1.requestLoan(1000);
  console.log(acc1.getMovements());
  console.log(acc1);
  Account.helper();
  
//   console.log(acc1.#movements);
//   console.log(acc1.#pin);
//   console.log(acc1.#approveLoan(100));
  
  // Chaining
  acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
//   console.log(acc1.getMovements());