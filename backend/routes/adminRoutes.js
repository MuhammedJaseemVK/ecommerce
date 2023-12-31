const express = require("express");
const router = express.Router();
const { getAllSellersController, getAllUsersController, changeAccountStatusController } = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/adminMiddleware");


router.get('/get-all-sellers', verifyAdmin, getAllSellersController);
router.get('/get-all-users', verifyAdmin, getAllUsersController);
router.post('/change-account-status', verifyAdmin, changeAccountStatusController);

module.exports = router;