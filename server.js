const express = require('express');
const app = express();
const mongoose = require('mongoose');

// env config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// port define
const PORT = process.env.PORT;

// db url
const DB_URL = process.env.DB_URL

// db connection
mongoose.connect(DB_URL)
    .then(()=>{
        console.log("db connection success");
    })
    .catch(()=>{
        console.log("db connection error");
    })

// server start
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})