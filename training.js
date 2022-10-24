const jwt=require('jsonwebtoken')

const data={username:'wiburach'}
 jwt.sign(data,'nodeumy1211212',{expiresIn:30},(err, data) => {
    console.log('inside');
    console.log(data);
})
// const encode='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpYnVyYWNoIiwiaWF0IjoxNjY2NTg2MTY5LCJleHAiOjE2NjY1ODYxOTl9.l2dq9NvfJH1wFkzZUVvkObk15ALzrpAwoAzllX4th5U'
const result=jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndpYnVyYWNoIiwiaWF0IjoxNjY2NTg2MzQyLCJleHAiOjE2NjY1ODYzNzJ9.LdN4ymWAReSUFUyDe0fiJ-RwHheG8_qN681dIGAzvbI','nodeumy1211212');
console.log(result);
// console.log('outside');
