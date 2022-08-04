const data1= [17, 21, 23]
const data2=[12, 5, -5, 0, 4]

function printForcast(arr){
    if(arr.length!=0){
        var str=`... ${arr[0]}ºC in 1 days ... `
        for(let i=1; i<arr.length; i++ ){
            str+=`${arr[i]}ºC in ${i+1} days ... `
        
        }
        console.log(str);
    }else{
        console.error("Enter the non empty array");
    }
    
}

printForcast(data1);
printForcast(data2);
printForcast([]);