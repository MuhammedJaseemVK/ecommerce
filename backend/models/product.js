const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    sellerId: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "product name is required"]
    },
    description: {
        type: String,
        required: [true, "product name is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "imageUrl is required"]
    },
    rating: {
        type: Number,
        default: 3
    },
    price: {
        type: String,
        required: [true, "price is required"]
    },
    count: {
        type: Number,
        required: [true, "price is required"]
    },
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;


