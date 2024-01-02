const productModel = require("../models/product");

const addProductController = async (req, res) => {
    try {
        const product = new productModel({ ...req.body, sellerId: req.body.userId });
        product.save();
        res.status(201).send({ success: true, message: 'created new product', product });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error adding product', error });
    }
}

const getAllproductsController = async (req, res) => {
    try {
        const products = await productModel.find({ sellerId: req.body.userId });
        res.status(200).send({ success: true, message: `All new products of the seller:${req.body.userId}`, products })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error fetching all products', error });
    }
}

const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete({ _id: req.body.productId });
        res.status(200).send({ success: true, message: 'Deleted product' })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error deleting product', error });
    }
}

const editProductController = async (req, res) => {
    try {
        await productModel.findByIdAndUpdate({ _id: req.body.productId }, { ...req.body.productData });
        res.status(200).send({ success: true, message: 'product updated' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error updating product', error });
    }
}

module.exports = {
    addProductController,
    getAllproductsController,
    deleteProductController,
    editProductController
}