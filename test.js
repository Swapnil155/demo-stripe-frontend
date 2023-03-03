/* eslint-disable no-undef */
price = 4.95
n = 7
dedect= 0.5
result = 4.95

for(var i = 2; i <= n; i++){
    dedected_amount = dedect
    console.log(`i`,i)
    for(var j = 3 ; j <= i; j++){
        console.log(`before *`,dedected_amount, j)
            console.log(`j is less then 7`)
            dedected_amount += 0.5
            console.log(`* j is less  ` , dedected_amount)
    }
    result += price-dedected_amount
    console.log(result)
}

console.log(`result : ` , result)



// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Welcome to Programiz!");

price = 4.95
n = 10
dedect= 0.5
result = 4.95

for(var i = 2; i <= n; i++){
    dedected_amount = dedect
    console.log(` ============ itration I ============= `,i)
    for(var j = 3 ; j <= i; j++){
            console.log(`------------------ \n before Dedect value ${dedected_amount} \n ****** itration J ***** `, j)
            dedected_amount += 0.5
            console.log(`Dedet amount ` , dedected_amount)
    }
    
    if(i >= 8){
        console.log(`heello`)
        result += 1.5
    }else{
        console.log(`hii`)
        result += price-dedected_amount
    }
    console.log(result)
}

console.log(`++++++++++++++++++++ \n result : ` , result)