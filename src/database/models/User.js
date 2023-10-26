const mongoose = require("mongoose");

const User = new mongoose.Schema({
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
  allowedOrigins: [
    {
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
      screenshot: {
        type: String,
      },
      options: {
        pgbrasil: Boolean,
        pgcelular: Boolean,
        pgsegura: Boolean,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", User);
