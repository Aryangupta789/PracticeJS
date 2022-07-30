console.log("___CC3___")
const scoreDol = 96+108+89;
const scoreKoalas = 88+91+110;

const avgDol= scoreDol/3;
const avgKoalas= scoreKoalas/3;

console.log("The aveg of Dolphine Team is: "+ avgDol);
console.log("The aveg of Koalas Team is: "+ avgKoalas);


if(scoreDol>scoreKoalas){
    console.log("Winner is Dolphine");
}else if(scoreDol<scoreKoalas){
    console.log("Winner is Koalas");
}else{
    console.log("Match Draw");
}

if(scoreDol>scoreKoalas && scoreDol>=100){
    console.log("Winner is Dolphine");
}else if(scoreDol<scoreKoalas && scoreKoalas>=100){
    console.log("Winner is Koalas");
}else if(scoreDol=scoreKoala && scoreDol>=100 && scoreKoalas>=100) {
    console.log("Match Draw");
}else{
    console.log("No Result")
}

console.log("___CC4___")

const billValue= 275;   //40, 430
var tip;
 
(billValue>=50 && billValue<=300)? tip=0.15*billValue: tip=0.2*billValue;

console.log(`The bill was ${billValue}, the tip was ${tip}, and the total value was ${billValue+tip} `)
