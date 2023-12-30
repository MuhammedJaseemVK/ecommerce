const express = require("express");
const router = express.Router();
const { loginController, registerController, getUserInfoController, verifyEmailController, sendResetPasswordLinkController,verifyResetPasswordLinkController,resetPasswordController } = require("../controllers/userController")
const verifyUser = require("../middlewares/authMiddleware");

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/get-user-info', verifyUser, getUserInfoController);
router.get('/:userId/verify/:verificationToken', verifyEmailController);
// password routes
router.post('/reset-password', sendResetPasswordLinkController);
router.get('/reset-password/:userId/:verificationToken',verifyResetPasswordLinkController);
router.post('/reset-password/:userId/:verificationToken',resetPasswordController);

module.exports = router