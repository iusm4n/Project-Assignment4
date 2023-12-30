var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
},{ versionKey: false })


var users = mongoose.model("user",userSchema);

module.exports = users;