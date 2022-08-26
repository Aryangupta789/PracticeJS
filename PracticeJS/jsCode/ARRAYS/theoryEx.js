//ARRAYS METHODS

let arr=['a','b','c','d','e']

//SLICE
console.log(arr.slice(2));    
//slice method gives the new sliced array from the index mention it includes the first index but excludes the last in .slice(2,4) ==>['c','d']
//slice method can also be used to shallow copy any array
console.log(arr.slice())
console.log([...arr])  //this is also an approch to make a copy of any array

//SPLICE
//SPLICE is same as slice but instead of making a new array it mutates the original one
console.log(arr)
console.log(arr.splice(-1))
console.log(arr)
// IN SPLICE method first first parameter indicates the first element and the second element indicates the no of elements

//REVERSE
//it mutates the array and reverse the order of the array
const arr2=['j','i','h','g','f']
console.log(arr2.reverse())


//CONCAT
//it adds two arrays without mutating any of them, i.e. it forms a new array with elements of both array
const letters= arr.concat(arr2)
console.log(letters)
console.log([...arr, ...arr2])   //this will also give the concatenated array


//JOIN Method
//it reaturns the string by joing the elements of the array by the specified seperator as parameter of join method.
console.log(letters.join('~'))


//at Method: (ES2020)
//gives the element at the given index , also works for strings
const arr3=[23,11,64] 
console.log(arr3.at(0))
console.log(arr3[0]) //same result

console.log(arr3[-1])// undefined sice -1 is not an index
console.log(arr3[arr3.length-1]) //gives last elemnt 
console.log(arr3.at(-1))  //gives the last elemnt

console.log('namaskar'.at(-1)) //at method also works with string 

//FOREACH : for looping over the arrays
//it takes a callback function and then pass the each elemnt of the array in this function for every loop
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for finding the index of the arrays we use -- for(const [i, move] of movement.entries())
for(const move of movements){  
    move>0?console.log('you deposited: '+move):console.log('you withdrew: '+ Math.abs(move));
}
console.log("~~~~FOR EACH~~~~")

//in the foreach loop we can pass 3 arguments in the functions which can be 1> the element name, 2> index of thtat elemnt, 3> the full array
//eg: movements.foreach(function (move, index, array){}) 
movements.forEach(move=> move>0?console.log('you deposited: '+move):console.log('you withdrew: '+ Math.abs(move))
)

movements.forEach(function(mov, i, arr){
    mov>0?console.log(`Movement ${i+1}: You have deposited $${mov}`):console.log(`Movementv ${i+1}: You have withdraw $${Math.abs(mov)}`)
})

//forEach with Maps and Sets
//Map
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
currencies.forEach(function(value, key, map){
    console.log(`${key}: ${value}`)
})

//Set
const currenciesUniq= new Set(['INR','USD','EUR','USD','INR'])
currenciesUniq.forEach(function(value, _value, set){
    console.log(`${value}: ${_value}`)
})
// Since in the set there is not key value pairs so the first and second argument in the callback function of the forEach loop is same.

//MAP
// map returns a new array containg the results of appling an operation on all original arrays elements
const eurToUsd=1.1
const usdMove=movements.map(mov=> mov*eurToUsd)

console.log(movements)
console.log(usdMove)

const movDescription=movements.map((move, i, arr)=>{
    return `Movement ${i+1}: You have ${move>0?'deposited':'withdraw'} $${move}`
})
console.log(movDescription)


//FILTER
// filter returns a new array conataing the array elements that passed a specified test condition
const deposite= movements.filter(function (mov){
    return mov>0
})
const withdraw= movements.filter(move=>move<0)
console.log(movements)
console.log(deposite)
console.log(withdraw)


//REDUCE
// reduce resuces all the array elements down to one single value(E.g add all elements together)
const total= movements.reduce(function(acc, curr, i,arr){
    console.log(`iteraion: ${i+1}, accumulator: ${acc}, current: ${curr}`)
    return acc+curr
},0)
console.log(total)
// also be use to find the max and min of t he value
const max= movements.reduce((c,a)=>{
    // console.log(c)
    return c>a?c:a
}, movements[0] )   //here we have specified that the starting point will be first elemnt of the array, although it is defult value 
console.log(max)

const avg= movements.reduce((a,c, i, arr)=>a+c/arr.length,0)
console.log(avg)

//FIND Method
// it takes the callback function which applys the condition and the find method gives the first element wich satisfy the given condition.
//find is similar to filter method where in filter method a new array is returned whereas in the find method only the first element which satisfy the condition is returned.
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstNegative= movements.find(mov=>mov<0)
console.log(firstNegative)
