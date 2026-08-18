const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const { request } = require("express");

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true  //Date created and date updated
});

//create models from schema
const user = mongoose.model('user', userschema);

module.exports = user;
