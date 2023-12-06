const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    projectName : {
        type: String,
        required: [true, 'Add project name.']
    },
    projectDuration : {
        type: Number,
        required: true,
        default: 0
    },
    // //Array
    // projectTeam : {
    //     type : Map,
    //     of: String
    // },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
      },
}, {timestamps: true,})

module.exports = mongoose.model('Project', projectSchema)