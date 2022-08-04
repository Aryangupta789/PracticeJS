'use strict';

// console.log(document.querySelector(".message").textContent)
// document.querySelector('.guess').value=12
// console.log(document.querySelector('.guess').value)
let randomNumber= Math.trunc(Math.random()*20)+1

let score= document.querySelector('.score').textContent=15

let highScore= document.querySelector(".highscore").textContent
highScore=0

document.querySelector(".check").addEventListener('click', function(){
    const guess= Number(document.querySelector('.guess').value)
    
    console.log(guess,randomNumber, typeof(guess))
    
    if(!guess){
        document.querySelector(".message").textContent= "❌ No Number Entered "
    }else if(guess=== randomNumber){
        document.querySelector(".message").textContent= "🏆 Correct Answer"
        document.querySelector("body").style.backgroundColor='#60b347'
        document.querySelector(".number").style.width='30rem'
        document.querySelector('.number').textContent=randomNumber

        if(score>highScore){
            highScore=score
            document.querySelector(".highscore").textContent=highScore
        }

    }else if(guess>randomNumber){
        if(score>1){
            document.querySelector('.message').textContent= "👆 Too HIGH"
            score-=1
            document.querySelector('.score').textContent=score

        }else{
            document.querySelector('.message').textContent= "You loose 😞"
            document.querySelector('.score').textContent=0
        }
        

    }else if(guess<randomNumber){
        if(score>1){
            document.querySelector('.message').textContent= "👇 Too Low"
            score-=1
            document.querySelector('.score').textContent=score
        }else{
            document.querySelector('.message').textContent= "You loose 😞"
            document.querySelector('.score').textContent=0
        }
    }
    

})
document.querySelector(".again").addEventListener('click', function(){
    document.querySelector(".message").textContent= "Start guessing..."
    randomNumber= Math.trunc(Math.random()*20)+1
    score=15
    document.querySelector('.score').textContent=score
    document.querySelector(".number").textContent="?"
    document.querySelector("body").style.backgroundColor="#222"
    document.querySelector(".guess").value=" "

})
