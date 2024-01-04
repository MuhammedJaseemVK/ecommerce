const express = require("express");
const { addProductController, getAllSellerproductsController, deleteProductController, editProductController, getAProductController } = require("../controllers/sellerController");
const verifySeller = require("../middlewares/sellerMiddleware");
const router = express.Router();


router.post('/add-product', verifySeller, addProductController);
router.get('/get-all-seller-products', verifySeller, getAllSellerproductsController);
router.post('/delete-product', verifySeller, deleteProductController);
router.post('/edit-product', verifySeller, editProductController);
module.exports = router;