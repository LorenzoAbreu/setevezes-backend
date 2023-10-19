const mongoose = require('mongoose')

const Victim = new mongoose.Schema({
    owner: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Object
    }
})

module.exports = mongoose.model('Victim', Victim)