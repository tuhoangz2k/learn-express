const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonSchmema = new Schema({
    name: { type: String, default: 'hahaha' },
    password: { type: String, default: '123456'},
    role: { type: String, }
},{collection:'person'})

const Person=mongoose.model('person',PersonSchmema)
module.exports = Person

