var areAlmostEqual = function(s1, s2) {
        for(let i=0; i<s1.length; i++){
            for(let j=i+1; j<s1.length; j++){
                let temp=s1[i]
                s1[i]=s1[j]
                s1[j]=temp
                console.log(s1)
                if(s1===s2) return true
            }
        }
        return false
    
    };

console.log(areAlmostEqual('bank', 'kanb'))