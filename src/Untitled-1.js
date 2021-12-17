import { from, join } from "core-js/core/array";
import { MAX_SAFE_INTEGER } from "core-js/core/number";

const stockArray = [10,15,12,13,8,9];
const budget = 27;
const stock=[];
function returnComboinationStock(){
    arr={}
    for(let i=0;i<stockArray.length;i++){
        let remainingPrice = budget-stockArray[i];
        arr.remainingPrice = stockArray[i];
    }

    for(let i=0;i<stockArray.length;i++){
       if(arr.stockArray[i]!==undefined){
        stock.push[[arr.stockArray[i],]]
       }
    }


}


let  a = true;
setTimeout(()=>{
    a=false;
},2000)
let i=0;
setInterval(() => {
    if(a){
        console.log(i);
        i++;
    }
}, 100);