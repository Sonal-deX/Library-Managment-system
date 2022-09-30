const mongoose = require('mongoose');

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
    }
})

module.exports = mongoose.model('Book',bookSchema);