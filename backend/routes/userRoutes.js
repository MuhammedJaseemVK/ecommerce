const express = require("express");
const router = express.Router();
const { loginController, registerController, getUserInfoController, verifyEmailController, sendResetPasswordLinkController, verifyResetPasswordLinkController, resetPasswordController, applyForSellerController, getAllNotificationController, markAllReadController, deleteAllNotificationController } = require("../controllers/userController")
const verifyUser = require("../middlewares/userMiddleware");

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/get-user-info', verifyUser, getUserInfoController);
router.get('/:userId/verify/:verificationToken', verifyEmailController);
// password routes
router.post('/reset-password', sendResetPasswordLinkController);
router.get('/reset-password/:userId/:verificationToken', verifyResetPasswordLinkController);
router.post('/reset-password/:userId/:verificationToken', resetPasswordController);
// apply for seller
router.post('/apply-for-seller', verifyUser, applyForSellerController);
// notifications
router.get('/get-all-notifications', verifyUser, getAllNotificationController);
router.get('/mark-all-read', verifyUser, markAllReadController);
router.get('/delete-all-notifications', verifyUser, deleteAllNotificationController)

module.exports = router