const productModel = require("../models/product");
const sellerModel = require("../models/seller");
const userModel = require("../models/user");

const addProductController = async (req, res) => {
    try {
        const seller = await sellerModel.findOne({ userId: req.body.userId });
        const product = new productModel({ ...req.body, sellerId: seller.userId });
        product.save();
        res.status(201).send({ success: true, message: 'created new product', product });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error adding product', error });
    }
}
module.exports = {
    addProductController
}