const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, "firstName is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    website: {
        type: String,
        required: [true, "email is required"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const sellerModel = mongoose.model('seller', sellerSchema);
module.exports = sellerModel;