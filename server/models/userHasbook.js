const mongoose = require('mongoose');

const userthasbookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    status:{
        type:"number",
        required: true,
        // issue 1 returned 2
        enum:[1,2]
    },
    borrowDate: {
        type: Date,
        required: true
    },
    returnDate:{
        type:Date
    }
})

module.exports = mongoose.model('UserHasBook', userthasbookSchema)