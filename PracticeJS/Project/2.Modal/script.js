'use strict';

const btnShowModal= document.querySelectorAll('.show-modal')
const btnCloseModal= document.querySelector(".close-modal")
const overlay= document.querySelector('.overlay')
const modal= document.querySelector('.modal')

const showModal=()=>{
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}
const hideModal= function(){
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
    // console.log("hide modal")
}

for(let i=0; i<btnShowModal.length; i++){
    btnShowModal[i].addEventListener("click", showModal)
}

btnCloseModal.addEventListener("click", hideModal)
overlay.addEventListener("click", hideModal)

document.addEventListener("keydown", function(e){
    console.log(e.key)
    if(e.key==="Escape" && !modal.classList.contains('hidden')) hideModal()
})