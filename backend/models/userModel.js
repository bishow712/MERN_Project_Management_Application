const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName : {
        type: String,
        required: [true, 'Add project name.']
    },
}, {timestamps: true,})

module.exports = mongoose.model('User', userSchema)