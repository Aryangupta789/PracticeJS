Strict Mode:
  👉It helps you to write cleaner code, like preventing you from using undeclared variables.
  👉"use strict"
  👉Not Allowed in Strict mode:
    1. Using a variable, without declaring it
    2. Using an object, without declaring it
    3. Deleting a variable (or object)
    4. Deleting a function
    5. Duplicating a parameter name etc..

Functions:
   👉Block of code designed to perform a particular task.
   👉Define the code once, and use it many times.    
   👉Syntax:
       ✨function decleration:::
        function funName(parameters){
            code to be executed;
        }
       ✨function Experation:::
        const funName = fuunction(parameters){
            code to be executed;
        }
       ✨Arrow Function:::
        const funName = (parameters) =>{
            code to be executed;
        } 
        - If the function has only one statement, and the statement returns a value, 
          remove the brackets and the return keyword:
          Eg: const hello = () => "Hello World!";  (This works only if the function has only one statement.)
        - if the function has only one parameter, you can skip the parentheses as well
          Eg: const hello = val => "Hello " + val;

   👉Inside the function, the arguments (the parameters) behave as local variables.
   👉Variables declared within a JavaScript function, become LOCAL to the function and can only be accesed within the function.
      ✨Since local variables are only recognized inside their functions, 
         variables with the same name can be used in different functions.
      ✨Local variables are created when a function starts, and deleted when the function is completed.

ARRAYS:
  👉An array can hold many values under a single name, and you can access the values by referring to an index number.
  👉Syntex:
    const array_name= [item1,itea2,...]
    OR
    const array_name= new Array(item1, iteam2,.. )
  👉Array index starts at 0.
  👉arrays are mutable although they are defined with the const keyword since arrays are not primative.
  👉Arrays are a special type of objects. The typeof operator in JavaScript returns "object" for arrays.
  👉Arrays can contain Objects, functions, or even another array. 
  👉Array Methods::
    ✨concat() -- joins the arrays and return the new joinned array.  
    ✨push() -- adds new elements to the end of the array and returns the length of the resultant array.
    ✨pop()  -- removes the last element of an array and returns the popped element from the array.
    ✨forEach() -- calls a function for each element of the array.
    ✨indexOf()  -- returns the index of the passed element.
    ✨includes() -- returns true if the element is present in the arrays and false if the element is not present.

OBJECTS:
  👉A JavaScript object is a collection of named values.
  👉The named values, in JavaScript objects, are called properties.
  👉SYNTEX:
    ✨Using an Object Literal:
      const obj= { firstName:"Harry", lastName:"Potter", school:"hogwards"}
    
    ✨Using the JavaScript Keyword new:
      const obj= new object();
      obj.firstName="Harry";
      obj.lastName="Potter"
      obj.school="hogwards"

LOOPS:
  👉For to run the same code over and over again, each time with a different value.
  👉FOR LOOP:
    ✨Syntex:
      for(initialisation; condition; incremnet/decrement ){
        code to be repeted;
      }
    ✨for in loop:
      for(key in object){
        code;
      }
      or:
      for(variables in array){

      }
      Do not use for in over an Array if the index order is important.
    ✨for of:
      for (variable of iterable) {
          // code block to be executed
        }

  👉while loop:
    ✨syntex:
      decleration of variable
      while(condition){
        code;
        iteration
      }

  👉do-while loop:
    ✨The do while loop is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true
    ✨syntex:
    do{
      code;
    }while(condition)
      
      