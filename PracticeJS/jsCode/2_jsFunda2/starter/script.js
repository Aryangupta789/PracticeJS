console.log("_____CC1_____")

const dol1= 44;
const dol2= 23;
const dol3= 71;

const koal1 = 65;
const koal2 = 54;
const koal3 = 49;

const calcAverage =(sc1, sc2, sc3) => (sc1+sc2+sc3)/3;

const avgDol = calcAverage(dol1, dol2, dol3);
const avgKoal = calcAverage(koal1,koal2, koal3);

console.log(`average of Dolphine team is ${calcAverage(dol1,dol2,dol3)} and the average of Koalas team is ${calcAverage(koal1,koal2, koal3)}`);

function checkWinner(avgDol, avgKoal){
    if(avgDol==avgKoal){
        return "DRAW"
    }else{
        return avgDol>avgKoal?"Dolphine":"Koalas";
    }
}
const winner= checkWinner(avgDol,avgKoal);
if(winner=="Dolphine"){
    console.log(`${winner} win ${avgDol} vs ${avgKoal}`)
}else if(winner=="Koalas"){
    console.log(`${winner} win ${avgKoal} vs ${avgDol}`)
}else{
    console.log("MATCH DRAW")
}

console.log("_____CC2_____");

const testData=[125,555,44]

const calcTip=bill =>(bill>=50 && bill <=300)?0.15*bill:0.2*bill;

console.log(calcTip(100));

const tips= []
for(let i=0; i<testData.length;i++){
    tips.push(calcTip(testData[i]))
}

console.log(tips)



const total=[]
for(let i=0; i<testData.length;i++ ){
    total.push(testData[i]+tips[i])
}
console.log(total)

console.log("_____CC3_____");

const mark= {
    fullName:"Marks",
    mass:78,
    height:1.69,
    calcBMI: function(){
        this.bmi= this.mass/(this.height**2);
        return this.bmi

    }
}
const john= {
    fullName:"John",
    mass:92,
    height:1.95,
    calcBMI: function(){
        this.bmi= this.mass/(this.height**2);
        return this.bmi

    }
}
console.log(john.calcBMI().toFixed(2)+"  "+ mark.calcBMI().toFixed(2))

const moreBMI= mark.calcBMI()>john.calcBMI()?mark:john;
const lessBMI= mark.calcBMI()>john.calcBMI()?john:mark;

console.log(`"${moreBMI.fullName}'s BMI (${moreBMI.calcBMI().toFixed(2)}) is higher than ${lessBMI.fullName}'s (${lessBMI.calcBMI().toFixed(2)})!" `)

console.log("_____CC4_____");
const bills= [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]

const tipss=[]
const totals=[]

for(bill of bills){
    tipss.push(calcTip(bill));
    totals.push(calcTip(bill)+bill)
}

// console.log(bills)
// console.log(tipss)
// console.log(totals)

const calAverage= function(arr){
    sum= 0;
    for(x of arr){
        sum+=x;
    }
    const avg= sum/arr.length;
    return avg
}
console.log(calAverage(bills))