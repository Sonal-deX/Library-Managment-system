const mongoose = require('mongoose');
const Paper = require('./paper')

const userthaspaperSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper'
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    qty: {
        type: 'number',
        required: true
    }
})

module.exports = mongoose.model('UserHasPaper', userthaspaperSchema)