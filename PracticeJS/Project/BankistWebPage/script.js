'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); //to stop the default behaviour of a link( it move to top as soon as the link is clicked, by default)
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); //gives info about to currrent web page view size(view port), here aim is to find the coordinates of the destination position(section-1)
  //here all the values are relative to the top-left corner of the screen
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // this will give the coordinate of the button which we clicked
  console.log('current scroll(x/y): ', window.pageXOffset, window.pageYOffset); // it will tell how much page is being scrolled

  // //scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  //scrollTo(x-coOrdinates, y-coOrdinates)  => it will scroll to x and y coordinates specified

  //  // smooth scrolling
  //   window.scrollTo({
  //     left: s1coords.left+window.pageXOffset,
  //     top:s1coords.top + window.pageYOffset,
  //     behavior: 'smooth'
  //   })

  //modern method for smooth scrolling: but mostly works in the modern web browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});
// navigation
// document.querySelectorAll('.nav__link').forEach(el=>{
//   el.addEventListener('click', function(e){
//     e.preventDefault()
//     const id= this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' })

//   })
// })


//by Event Deligations
//1.Add event listener to the common parent elemnt
// 2.Determine which elemnt originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();

  //matching strategy
  if(e.target.classList.contains('nav__link')){
    const id= e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

//tabbed component
const tab= document.querySelectorAll('.operations__tab')
const tabContainer= document.querySelector('.operations__tab-container')
const tabContent=document.querySelectorAll('.operations__content')

tabContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab')
  
  //guard clause
  if(!clicked) return;
  
  //remove the active classses
  tab.forEach(tb=> tb.classList.remove('operations__tab--active'))
  tabContent.forEach(tb=>tb.classList.remove('operations__content--active'))

  // add the tab
  clicked.classList.add("operations__tab--active")

  //activate the content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

//menu fade animation
const nav= document.querySelector('.nav')

const handleHover= function(e){
  const link= e.target
  const siblings= link.closest('.nav').querySelectorAll('.nav__link')
  const logo= link.closest('.nav').querySelector('img');

  siblings.forEach(el=>{
    if(el !==link) el.style.opacity=this;
  })
  logo.style.opacity=this;
}

//passing the arguments into the handlers
nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))

// //sticky Navigation
// const initialCoords= section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if(window.scrollY>initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

//sticky navigation using the intersection observer API
const header= document.querySelector('.header')
const navHeight= nav.getBoundingClientRect().height

const stickyNav= function(entries){
  const [entry]= entries;
  // console.log(entry)

  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
};

const interObser= new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
interObser.observe(header)



/*
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
/*
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
*/
/*
//Events and events Handlers
//Events are actions or occurrences that happen in the system you are programming, which the system tells you about so your code can react to them. Example 'click'
// 📕Note: Web events are not part of the core JavaScript language — they are defined as part of the APIs built into the browser.

const h1= document.querySelector("h1")
// //their are 3 methods to add  a event listener
// // 1.by using the addEventListener()  =>which is most comman and now used
// h1.addEventListener('mouseenter', function(){
//   alert("addEventListener: reading Heading")
// })

// // 2.by using the on-property like onclick, or onmouseenter, this method was used before
// h1.onmouseenter= function(){
//   alert("addEventListener: reading Heading")
// }

// //3. inline event handelers, (DONT USE THIS) these are directly added in the html code like
// //  <h1 mouseenter="alert("addEventListener: reading Heading")"></h1> 

//if want to listen to the event only one then :
const alth1= function(){
  alert("addEventListener: reading Heading")

  // h1.removeEventListener('mouseenter',alth1)   //=>this will remove the event listener as soon as it is listen one time
}

h1.addEventListener('mouseenter',alth1)

setTimeout(()=>{
  return h1.removeEventListener('mouseenter',alth1)
}, 3000)     //it will remove the event listener after 3 seconds


//bubbling : When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.i.e the events propogates in the upward direction of the dom. hince called bubbling up
//capturing: here the events propogates the the downward direction of the dom.

const randomInt= (min, max)=>{
  return Math.floor(Math.random()*(max-min+1)+min)
}
const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor=  randomColor()
  console.log('Link', e.target, e.currentTarget)
  console.log(e.currentTarget==this)
    //stop propogation
    e.stopPropagation()
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor=  randomColor()
  console.log('CONTAINER', e.target, e.currentTarget)
  console.log(e.currentTarget==this)
  

})

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor=  randomColor()
  console.log('NAV', e.target, e.currentTarget)
  console.log(e.currentTarget==this)
})

//by default the evenntListner is in bubbling phase that is it does not consider the capturing phase but we can define it by giving the third boolean parameter to the addEventListener method as true.(by default it is false)

*/

// //dom traversing

// const h1= document.querySelector('h1')

// //going downwards:child
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.getElementsByClassName.color='white'
// h1.lastElementChild.getElementsByClassName.color='white'


// //going upwards: parent
// console.log(h1.parentNode)
// console.log(h1.parentElement)

// h1.closest('.header').style.background=`var(--gradient-secondary)`

// h1.closest('h1').style.background= 'var (--gradient-primary)'

// //going sideways: siblings
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el){
//   if(el!==h1) el.style.transform='scale(0.5)'
// })