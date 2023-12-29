const express = require("express");
const router = express.Router();
const { loginController, registerController, getUserInfoController,verifyEmailController } = require("../controllers/userController")
const verifyUser = require("../middlewares/authMiddleware");

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/get-user-info', verifyUser, getUserInfoController);
router.get('/:userId/verify/:verificationToken',verifyEmailController);

module.exports = router