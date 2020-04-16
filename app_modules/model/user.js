const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: String,
    userType: String,
    image:  String
});
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model("user", userSchema);