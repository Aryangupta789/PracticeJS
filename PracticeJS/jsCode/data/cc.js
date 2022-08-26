//code challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [player1,player2]=game.players
console.log(player1, player2)
// 2
const [gk, ...fieldPlayers]=player1
console.log(gk, fieldPlayers)
// 3
const allPlayers=[...player1, ...player2]
console.log(allPlayers)
// 4
const player1Final=[...player1, 'Thiago', 'Coutinho' ,'Perisic']
console.log(player1Final)

//5📕👉📕
const{ odds:{team1, x:draw, team2}}=game
console.log(team1, draw, team2)

//6
const printGoals=function(...nums){
    for(let i=0; i<nums.length; i++){
        console.log(nums[i])
    }
    console.log(nums.length)

}

printGoals('Davies', 'Muller', 'Lewandowski','Kimmich')

// 7
game.odds.team1<game.odds.team2 && console.log("team 1 is likely to win")
game.odds.team1>game.odds.team2 && console.log("team 2 is likely to win")




// code Challenge #2

//1
const scores= game.scored.entries()
for(const [i, name] of scores){
  console.log(`score: ${i+1}, ${name} `)
}

//2
let sum=0
// console.log(Object.values(game.odds))
for(const odd of Object.values(game.odds)){
  sum+=odd
}
console.log(`Average: ${sum/Object.values(game.odds).length}`)

//3
for(const [team, odd] of Object.entries(game.odds) ){
  const win=team==='x'?`odd of draw: ${odd}`:`Odd of victory ${game[team]}: ${odd}`
  console.log(win)
}

//4
const scoress={}
for(score of game.scored){
  scoress[score]?scoress[score]++:scoress[score]=1;
}
console.log(scoress)



// Coading challenge#3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
const events=[...new Set([...gameEvents.values()])]
console.log(events)

// 2
gameEvents.delete(64)
console.log(gameEvents)


//3
console.log(`An event happened, on average, every ${90/gameEvents.size} minutes`)
// in reality the game happend for 92 minutes so we can improve the code as
const gameTime= [...gameEvents.keys()].pop()  //it will return th elast element
console.log(`An event happened, on average, every ${gameTime/gameEvents.size} minutes`)

//4
console.log(gameEvents.entries())
for(const[key , values] of gameEvents.entries()){
  key<=45?console.log(`[First Half] ${key}: ${values}`):console.log(`[Second Half] ${key}: ${values}`)
}


// Coading challenge#4

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function (){
  const text = document.querySelector('textarea').value
  const rows= text.split('\n')

  for ( const [i,row] of rows.entries()){
    const [first, last]=row.trim().toLowerCase().split('_')
    // console.log(row)
    const camelCase=`${first}${last.replace(last[0],last[0].toUpperCase())}`
    console.log(`${camelCase.padEnd(20)}${'✅'.repeat(i+1)}`)
  }

})