const mongoose = require('mongoose')

module.exports = {
    connect: mongoose.connect(process.env.MONGODB_URI)
        .then()
        .catch(console.log)
}