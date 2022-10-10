const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    empname: {
        type: String,
        required: true

    },
    empemail:{
        type: String,
        required: true,
        unique: true
    },
    empcontact:{
        type: String,
        required: true,
    },
    empdept:{
        type: String,
        required: true,
    },
    empjoin:{
        type: Date,
        default: Date.now
    },
    emppassword:{
        type: String,
        required: true,
    },

 
});

const User = mongoose.model('user', UserSchema);
module.exports = User;