const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookId: {
        type: 'number',
        required: true,
        unique: true
    },
    title: {
        type: 'string',
        required: true, 
    },
    author: {
        type: 'string',
        required: true,  
    },
    description: {
        type: 'string',  
    },
    language: {
        type: 'string',
        required: true,  
    },
    category: {
        type: 'string',
        required: true,
    },
    img: {
        type: 'string',
        required: true
    },
    qty:{
        type: 'number',
        required: true
    },
    availability: {
        type: 'number',
        required: true,
        enum:[1,2]
    },
    status: {
        // for deletetion activities
        type: 'number',
        required: true,
        enum: [1, 2] 
    }
})


module.exports = mongoose.model('Book', bookSchema);