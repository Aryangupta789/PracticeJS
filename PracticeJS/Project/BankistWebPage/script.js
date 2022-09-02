'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()   //to stop the default behaviour of a link( it move to top as soon as the link is clicked, by default)
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=> btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



//////////////////////////////////////
/// selecting the document
console.log(document.documentElement)    //selcting the whole document
console.log(document.head)    //selecting the head elemnt of the whole page
console.log(document.body)    //selecting the body elemnt of the whole page

const header=document.querySelector('.header')  //it will select the first element with the class name of header

document.querySelectorAll('.section')  // it will select the all the elements with the class name as section  // it will give the nodeList

document.getElementById('section--1')  // it will select the elemnts by the name of the id
const buttons= document.getElementsByTagName('button')  //it gives the html collections
console.log(buttons)

//html collects are live collections so they get updated as soon as any changes occurs whereas in nodeLists they are created in the beggiging and not gets updated.

//Creating and inserting the elements

/* 
.insertAdjacentHTML(position, text)
=> here position can be :
  1. "beforebegin"  :>Before the element. Only valid if the element is in the DOM tree and has a parent element.
  
  2. "afterbegin"   :> just inside the elemnt, before its first child
  
  3. "beforeend"   :> just inside the elelmnt , after its last child

  4.  "afterend"   :> after the element. only valid if the elemnt is in the DOM tree and has parent element
=> text  can be string to be parsed in as HTML or XML
*/  
const message= document.createElement('div')     //here we have just created the dom elemnt but it is still not present in the page, we need to manually add this to the page
message.classList.add('cookie-message');
// message.textContent= 'We use cookies for improved functionality and analytics.'
message.innerHTML= 'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button> '
header.prepend(message)
header.append(message)
//append will add the dom elemnt at the end of the selected dom element (here: header) wheras the prepend will place the elemnt at the first position i.e  before the first child
// here we applied both prepend and and append but the final result is according to the last command which is append because the created live dom elemnt can only be placed at one position, so here the prepend elemnt inserted the dom elemnt wereas the append method only moved it to the last.
// header.append(message.cloneNode(true))  //=> if we have to use the dom elemnt at two position, clone the elemnt.

// header.before(message)
// header.after(message)

////////delete the element
document.querySelector(".btn--close-cookie").addEventListener("click", function(){
  message.remove()  //this is new method
  // message.parentElement.removeChild(message)    //this was the old method and so can be seen in any code base
})

//////////////////////////////////////////
//styles
message.style.backgroundColor= '#37383d'
message.style.width="120%"
// these styles are actually sets as inline styles in the dom

//.style property can only be used to reset the properties which are inline style properties which are created by the style property itself but we cannot set the style wich are hidden or in the class
console.log(message.style.color)  //==> it will  show nothing

//so to acess the use getComputedStyle()
console.log(getComputedStyle(message).color)

//reset any value
console.log(getComputedStyle(message).height)
message.style.height=Number.parseFloat( getComputedStyle(message).height) + 30 +'px'
console.log(getComputedStyle(message).height)

//custom Properties in css, like variables in js
//root in css is equivalent to domcument in javascript
document.documentElement.style.setProperty("--color-primary", 'red')

//////////////////////////////////////////
//Atrribute
const logo= document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.className)
logo.alt= 'changed alt Bankist logo'
console.log(logo.alt)

//if non-standard attributes properties
console.log(logo.getAttribute('designer'))
logo.setAttribute('company', 'Bankist')  //it will create a attribute 
console.log(logo.getAttribute('company'))

console.log(logo.src)   //=>it will give the absolute path
console.log(logo.getAttribute('src'))  //=> it will give the relative version

//data Attributes
//these attributes starts with 'data-'
console.log(logo.dataset.versionNumber) //here we have to ues the camelCase Character although we have written as vaersion-number

//////////////////////////////////////
//classes
logo.classList.add('c','j')
logo.classList.remove('c','j')
logo.classList.toggle('c')
logo.classList.contains('c')

//don't use these, but can work; since these can completely overwite the class name
// logo.className='jonas'