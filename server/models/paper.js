const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    paperId:{
        type:'number',
        required: true,
    },
    title:{
        type:'string',
        required: true,
        lowercase:true
    },
    grade:{
        type:'number',
        required: true,
    },
    subject:{
        type:'string',
        required: true,
        lowercase:true
    },
    year:{
        type:'number',
        required: true
    },
    paperType:{
        type:'string',
        required: true,
        enum:["school paper","provincial paper","divisional paper","past paper"]  
    },
    language:{
        type: 'string',
        required: true,
        lowercase:true
    },
    qty:{
        type:'number',
        required: true
    },
    status:{
        type:'number',
        required: true,
        enum:[1,2]
    }

})

module.exports = mongoose.model('Paper',paperSchema);