const userModel = require("../models/user");
const { hashPassword, comparePassword, generateToken } = require("../helpers/userHelper");
const dotenv = require("dotenv");
const verificationTokenModel = require("../models/verificationToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
dotenv.config();

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name.length < 3 || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || password.length < 3) {
            return res.status(400).send({ success: false, message: 'Some fields are invalid' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({ success: false, message: 'This email is already registered' });
        }


        const hashedPassword = await hashPassword(password);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const verificationToken = await new verificationTokenModel({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/user/${user.id}/verify/${verificationToken.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res.status(201).send({ success: true, message: "An email is sent to ypur account.please verify", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || password.length < 3) {
            return res.status(400).send({ success: false, message: 'email or password is invalid' })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'Invalid username or password' });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({ success: false, message: 'Invalid username or password' });
        }
        if (!user.isVerified) {
            let verificationToken = await verificationTokenModel.findOne({ userId: user._id });
            if (!verificationToken) {
                const verificationToken = await new verificationTokenModel({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}/user/${user.id}/verify/${verificationToken.token}`;
                await sendEmail(user.email, "Verify Email", url);
            }

            return res.status(400).send({ success: false, message: "Verify your email" });
        }


        const token = await generateToken(user._id);
        res.status(201).send({ success: true, message: 'User logined', token })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

const verifyEmailController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.userId });
        if (!user) {
            console.log("error in user")
            return res.status(400).send({ success: false, message: "Invalid link" });
        }
        const verificationToken = await verificationTokenModel.findOne({
            userId: user._id,
            token: req.params.verificationToken,
        });
        if (!verificationToken) {
            console.log("error in token")
            return res.status(400).send({ success: false, message: "Invalid link" });
        }

        await userModel.updateOne({ _id: user._id }, { $set: { isVerified: true } });
        await verificationTokenModel.deleteOne({ userId: user._id });

        res.status(200).send({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
}


const getUserInfoController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        user.password = undefined;
        res.status(200).send({ success: true, user: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Internal server erorr" })
    }
}

const sendResetPasswordLinkController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ success: false, message: "Email not found" });
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.status(400).send({ success: false, message: "invalid Email" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: "No user found with this Email" });
        }

        let verificationToken = await verificationTokenModel.findOne({ userId: user._id });
        if (!verificationToken) {
            verificationToken = await new verificationTokenModel({ userId: user._id, token: crypto.randomBytes(32).toString("hex") }).save();
        }

        const url = `${process.env.BASE_URL}/user/reset-password/${user._id}/${verificationToken.token}`;
        await sendEmail(user.email, "Reset Password", url);
        res.status(200).send({ success: true, message: "Password reset link sent to your email account" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in sending reset password link", error })
    }
}

const verifyResetPasswordLinkController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.userId });
        if (!user) {
            console.log("error in user");
            return res.status(400).send({ success: false, message: "invalid Email" });
        }

        const verificationToken = await verificationTokenModel.findOne({ userId: user._id });
        if (!verificationToken) {
            console.log("error in user");
            return res.status(400).send({ success: false, message: "Invalid link" });
        }
        res.status(200).send({ success: true, message: "valid link" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in verifying reset password link", error })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(400).send({ success: false, message: "invalid Email" });
        }
        const verificationToken = await verificationTokenModel.findOne({
            userId: user._id,
            token: req.params.verificationToken,
        });
        if (!verificationToken) {
            return res.status(400).send({ success: false, message: "Invalid link" });
        }

        if (!user.isVerified) {
            user.isVerified = true;
        }
        user.password = await hashPassword(req.body.password);
        await user.save();
        await verificationTokenModel.deleteOne({ userId: user._id });

        res.status(200).send({ success: true, message: "Password reset successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in resetting password", error })
    }
}

module.exports = {
    registerController,
    loginController,
    getUserInfoController,
    verifyEmailController,
    sendResetPasswordLinkController,
    verifyResetPasswordLinkController,
    resetPasswordController
}