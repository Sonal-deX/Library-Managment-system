const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userId: {
        type: 'number',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    userType: {
        type: 'string',
        required: true,
        enum: ["student", "teacher", "admin"]
    },
    name: {
        type: 'string',
        required: true,
        lowercase: true
    },
    grade: {
        type: 'number',
        required: true,
        enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    class: {
        type: 'string',
        required: true,
        enum: ['NULL', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    contactNo: {
        type: 'number',
        required: true,
    },
    subject: {
        type: 'string',
        required: true,
        lowercase: true
    },
    status: {
        type: 'number',
        required: true,
        enum: [1, 2]
    }
});

userSchema.pre('save', async function (next) {
    const salt  = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


module.exports = mongoose.model('User', userSchema);