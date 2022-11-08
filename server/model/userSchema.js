const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    Cpassword: {
        type:String,
        required:true
    },
})

const User = mongoose.model('REGISTRATION', userSchema);

module.export = User;