const mongoose = require('mongoose')

const Household = new mongoose.Schema({
    name: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }]
})


module.exports = mongoose.model('Household', Household)