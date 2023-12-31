const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    role:{
        type:String,
        default:"user"
    },
    notification:{
        type:Array,
        default:[]
    },
    seenNotification:{
        type:Array,
        default:[]
    },
    isVerified: {
        type: Boolean,
        default:false
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema,);
module.exports = userModel;