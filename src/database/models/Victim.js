const mongoose = require("mongoose");

function genRandNumber() {
    return Math.floor(Math.random() * 999999);
}

const Victim = new mongoose.Schema({
    id: {
        required: true,
        type: String,
        default:
            "t" + genRandNumber() + "d" + genRandNumber() + "7" + genRandNumber,
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
