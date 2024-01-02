const express = require("express");
const { addProductController } = require("../controllers/sellerController");
const verifySeller = require("../middlewares/sellerMiddleware");
const router = express.Router();


router.post('/add-product', verifySeller, addProductController);

module.exports = router;