const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    projectName : {
        type: String,
        required: [true, 'Add project name.']
    },
    projectDuration : {
        type: [Number, 'Days'],
    },
    //Array
    projectTeam : {
        type : Map,
        of: String
    },
    //Boolean
    projectComplete : {
        type: Boolean,
    }
}, {timestamps: true,})

module.exports = mongoose.model('Project', projectSchema)