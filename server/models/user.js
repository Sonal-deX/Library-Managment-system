const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    admissionNo:{
        type: 'number',
        required: true,
        unique: true
    },
    userType:{
        type: 'string',
        required: true,
        enum:["student","teacher","admin"]
    },
    name:{
        type: 'string',
        required: true,
    },
    grade:{
        type: 'number',
        required: true,
        enum:[0,1,2,3,4,5,6,7,8,9,10,11,12,13]
    },
    class:{
        type: 'string',
        required: true,
        enum:['NULL','A','B','C','D','E','F','G']
    },
    contactNo:{
        type: 'number',
        required: true,
    },
    subject:{
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model('User',userSchema);