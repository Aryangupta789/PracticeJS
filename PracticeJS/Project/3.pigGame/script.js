'use strict';

const player1Score = document.querySelector("#score--0")
const player2Score = document.getElementById("score--1")
const playerCurrent1 = document.getElementById("current--0")
const playerCurrent2 = document.getElementById("current--1")
const dice = document.querySelector(".dice")
const btnRollDice = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const btnNewGame = document.querySelector(".btn--new")
const player1 = document.querySelector(".player--0")
const player2 = document.querySelector(".player--1")

let currentPlayer, currentScore, isPlaying, score;

const startGame = () => {
    currentScore = 0;
    currentPlayer = 0;
    score = [0, 0]
    isPlaying = true

    player1Score.textContent = 0
    player2Score.textContent = 0
    playerCurrent1.textContent = 0
    playerCurrent2.textContent = 0

    dice.classList.add("hidden")
    player1.classList.remove("player--winner")
    player2.classList.remove("player--winner")
    player1.classList.add("player--active")
    player2.classList.remove("player--active")
}


startGame()

const displayDice = (num) => {
    const imgName = "dice-" + num + ".png"
    dice.classList.remove("hidden")
    dice.src = imgName
}

btnRollDice.addEventListener("click", function () {
    if (isPlaying) {
        const randomRoll = (Math.trunc(Math.random() * 6) + 1)
        displayDice(randomRoll)

        if (randomRoll === 1) {
            score[currentPlayer] = 0
            document.getElementById(`score--${currentPlayer}`).textContent = score[currentPlayer]
            currentScore = 0
            document.getElementById(`current--${currentPlayer}`).textContent = 0;
            currentPlayer = currentPlayer === 0 ? 1 : 0
            console.log("current player:" + currentPlayer)
            player1.classList.toggle("player--active")
            player2.classList.toggle("player--active")

        } else {
            currentScore += randomRoll
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore
        }

    }

})
btnHold.addEventListener("click", function () {
    if (isPlaying) {
        score[currentPlayer] += currentScore
        document.getElementById(`score--${currentPlayer}`).textContent = score[currentPlayer]

        if (score[currentPlayer] >= 20) {
            isPlaying = false
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active')
        } else {
            currentScore = 0
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore
            currentPlayer = currentPlayer === 0 ? 1 : 0
            player1.classList.toggle("player--active")
            player2.classList.toggle("player--active")
        }
    }
})

btnNewGame.addEventListener('click', startGame)
