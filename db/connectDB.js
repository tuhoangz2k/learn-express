const mongoose = require('mongoose');
async function connect (){
    try {
       await mongoose.connect('mongodb://localhost:27017/K5-nodemy');
       console.log('connect to MongoDB successfully');
    } catch (error) {
       console.log('connect to MongoDB faild',error);
    }
}
module.exports =connect
