const mongoose = require('mongoose');
module.exports = mongoose.model('user', mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
    phoneNumber: String,
    userType: String
}));