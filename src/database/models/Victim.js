const mongoose = require("mongoose");

const Victim = new mongoose.Schema({
    id: {
        required: true,
        type: String,
    },
    owner: {
        required: true,
        type: String,
    },
    data: {
        required: true,
        type: Object,
    },
    url: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Victim", Victim);
