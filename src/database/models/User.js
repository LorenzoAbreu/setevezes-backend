const mongoose = require("mongoose");

const User = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    ips: [
        {
            ip: String,
            access: Number,
        },
    ],
    maxOriginsLimit: {
        type: Number,
        required: false,
    },
    admin: {
        required: true,
        type: Boolean,
    },
    approved: {
        required: true,
        type: Boolean,
    },
    apiKey: {
        required: true,
        type: String,
    },
    disabled: {
        required: true,
        type: Boolean,
        default: false,
    },
    fakes: [
        {
            id: String,
            options: {
                pgbrasil: Boolean,
                pgcelular: Boolean,
                pgsegura: Boolean,
                pgredirecionar: {
                    on: Boolean,
                    url: String,
                },
                pgcapturar: Boolean,
            },
        },
    ],
    allowedOrigins: [
        {
            id: {
                type: String,
            },
            title: {
                type: String,
            },
            hostname: {
                type: String,
            },
            url: {
                type: String,
            },
            status: {
                type: Boolean,
            },
            options: {
                pgbrasil: Boolean,
                pgcelular: Boolean,
                pgsegura: Boolean,
                pgredirecionar: {
                    on: Boolean,
                    url: String,
                },
                pgcapturar: Boolean,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", User);
