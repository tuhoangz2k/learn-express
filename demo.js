const jwt=require('jsonwebtoken')
const fs=require('fs')
const fileKey=fs.readFileSync('./key/privatekey.pem')

// const token=jwt.sign({name:'nobita'},fileKey,{algorithm:'RS256'})
jwt.verify('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibm9iaXRhIiwiaWF0IjoxNjY2Njc5MzUyfQ.7nvw_LhJITsoYYQnvLcMW3F7Z2de7LHdJqn_e2mve7P6A5lHamK-6vS0E5Q7A3FebwEBXInQo9kiBm3kvhnv3hzRzlX49seR8vuQNTrzd3GpoxWE8ItIqKmDh3jglk-N1SE96vzWy0RRwCUZUCe1mhTd6vKg5ndGnkwGPa2yJL1PDJyLj9YrgjAbsBfply0GMV2WeV60gZaw6yoVdwpM3IcWBDrzSxH9kqQCMK64uhhFOoBOT-4akp2fNiZjKH8i8uBrsbQ4tQN0Sq6VkuESGl9gt6PFgnj547Xt6DiXfhQ69kyxHNWiuSGJHQa1Xl3EDJ-BWbCJA0oXivXo0hGAyQ',
fileKey,{ algorithms: ['RS256'] },function(err,data){
    console.log(err);
    console.log(data);
}
) 

const fs=require('fs')
console.log('1');
const p1=new Promise((resolve,reject)=>{
    console.log('promise constructor');
    fs.readFile('./key/privatekey.pem',(err,data)=>{
        console.log('result');
        if(err) throw new Error(err)
        else resolve(data);
    })
})

p1.then((data)=>{
    console.log('then');
})
console.log('2');

