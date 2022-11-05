const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    paperId: {
        type: 'number',
        required: true,
        unique: true,
    },
    grade: {
        type: 'number',
        required: true,
    },
    subject: {
        type: 'string',
        required: true,
    },
    year: {
        type: 'number',
        required: true,
    },
    paperType: {
        type: 'string',
        required: true,
        enum: ["School Paper", "Provincial Paper", "Zonal Paper", "GCE O/L Past Paper","GCE A/L Past Paper"]
    },
    language: {
        type: 'string',
        required: true,
        enum: ["English", "Sinhala", "Tamil"]
    },
    qty: {
        type: 'number',
        required: true
    },
    availability: {
        type: 'number',
        required: true,
        enum: [1, 2]
    },
    status: {
        type: 'number',
        required: true,
        enum: [1, 2]
    }

})

module.exports = mongoose.model('Paper', paperSchema);