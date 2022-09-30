const mongoose = require('mongoose');

const userthasbook = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
})

module.exports = mongoose.model('UserHasBook',userthasbook)