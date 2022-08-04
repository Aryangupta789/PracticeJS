JavaScript:  
"JS is high level, object-oriented, multi-paradigm programing language"  
"It allows dynamic effects and web applications in the browsers"  
"JS has dnamic typing i.e. we do not have to manually define the data type 
 of the value stored in a variable.Instead, data types are determined automatically"  


Adding JavaScript in code:
1. By using the "<script>....</script>" tag.
   Scripts can be placed in the <body>, or in the <head> section of an HTML page,
   or in both.
2. By adding the external file.
   Name of the script file is put in the src attribute of the 'script tag.
   Eg: <script src = "myfunc.js" > </script>
   External file can be added in 3 ways:
   1. With a full url. Eg: <script src="https://www.w3schools.com/js/myScript.js"></script>
   2. With a file path. Eg: <script src="/js/myScript.js"></script>
   3. Without any path. Eg: <script src="myScript.js"></script>

Variable name rules:
1. camelCase (conventional)
2. cannot start with number. (Eg: 'func' is not allowed)
3. can only contains letters, numbers, '_' and '$'.
4. cannot use the reserve js keyword like new, function etc.
5. 'name' is a reserve keyword but can be used as a variable.
6. By convention do not start the variable with capital letters
7. By convention, use only uppercase for constant term like PI=3.14

Data Types:
1. Number: Floating point numbers 👉 Used for decimals and integers
2. String: Sequence of characters 👉 Used for text
3. Boolean: Logical type that can only be true or false 👉 Used for taking decisions
4. Undefined: Value taken by a variable that is not yet defined (‘empty value’)
5. Null: Also means ‘empty value’
6. Symbol (ES2015): Value that is unique and cannot be changed [Not useful for now]
7. BigInt (ES2020): Larger integers than the Number type can hold

"In JS Value has type and not the variable."

Comment:
1. //   => single line Comment
2. /* .. */   => Multiline Comment

let, const and var:
let:
   When the value can be changed (Reassigning the variable or mutate the variable).
const:
   When we donot change the value at any time in the program(Variables are immutable).
var:
   used before ES6;


if-else Syntex:
   if(condition){
      statement when condition is true;
   }else{
      statement when the condition is false;
   }

Type conversion and Type coercion:
Type conversion:
   When we convert the data type explecitely from one type to another.
   Eg: const inputYear='2001';
       year= Number(inputYear);  =>This will convert the string to number(int);
Type coercion:
   Conversion happens automatically by the JS;
   But take care that=> '2'+'2'+2 will give 222;
   but => '2'-'2'-2 will give -2

Truthy and Falsy vales:
   5 Falsy values: 0, '', undefined, null, NaN. 
   these values will be convert to false.

   Anything other than falsy is truthy.


== VS ===
   18=='18'  ==>Gives true
   18==='18' ==> Gives False.

Switch Statements:
   switch(expression) {
      case x:
          // code block
         break;
      case y:
         // code block
         break;
      default:
          // code block
   }


Conditional expression:
   condition? statement if true: statement if false;


JavaScript:
1995:
   Brendan Eich creates the very first version of JavaScript in just 10 days. It was called
   Mocha, but already had many fundamental features of modern JavaScript!
1996:
   Mocha changes to LiveScript and then to JavaScript, in order to attract Java developers.
   However, JavaScript has almost nothing to do with Java
   Microsoft launches IE, copying JavaScript from Netscape and calling it JScript;
1997:
   With a need to standardize the language, ECMA releases ECMAScript 1 (ES1), the first official
   standard for JavaScript (ECMAScript is the standard, JavaScript the language in practice);
2009:
   ES5 (ECMAScript 5) is released with lots of great new features;
2015:
   ES6/ES2015 (ECMAScript 2015) was released: the biggest update to the language ever!
   ECMAScript changes to an annual release cycle in order to ship less features per update 🙏