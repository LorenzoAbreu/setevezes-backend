const mongoose = require("mongoose");

const Fake = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    new: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Fake", Fake);
