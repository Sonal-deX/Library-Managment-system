const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    pdfId: {
        type: 'number',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    pdfCategory: {
        type: 'string',
        required: true
    },
    status: {
        type: 'number',
        required: true,
        enum: [1, 2]
    }
});

module.exports = mongoose.model('Pdf', pdfSchema)