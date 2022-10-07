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
        lowercase:true
    },
    author: {
        type: 'string',
        required: true,
        lowercase:true
    },
    description: {
        type: 'string',
        lowercase:true
    },
    language: {
        type: 'string',
        required: true,
        lowercase:true
    },
    category: {
        type: 'string',
        required: true,
        lowercase:true
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