const l1 = [2,4,3]
const l2 = [5,6,4]

const revL1 = Number(l1.reverse().join(""));
const revL2 = Number(l2.reverse().join(""));
const sum = String(revL1 + revL2);
const ans= sum.split('').reverse().map(num=>Number(num))
console.log(ans);
