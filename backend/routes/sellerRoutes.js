const express = require("express");
const { addProductController, getAllproductsController, deleteProductController,editProductController } = require("../controllers/sellerController");
const verifySeller = require("../middlewares/sellerMiddleware");
const router = express.Router();


router.post('/add-product', verifySeller, addProductController);
router.get('/get-all-products', verifySeller, getAllproductsController);
router.post('/delete-product', verifySeller, deleteProductController);
router.post('/edit-product', verifySeller, editProductController);

module.exports = router;