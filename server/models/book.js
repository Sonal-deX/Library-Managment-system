const mongoose = require('mongoose');
const UHB = require('./userHasbook')

const bookSchema = new mongoose.Schema({
    bookId:{
        type: 'number',
        required: true,
        unique: true
    },
    name:{
        type: 'string',
        required: true,
    },
    author: {
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
    },
    language:{
        type: 'string',
        required: true
    },
    category:{
        type: 'string',
        required: true
    },
    img:{
        url:'string',
        filename:'string'
    },
    status:{
        type:'number',
        required: true
    }
})


module.exports = mongoose.model('Book',bookSchema);