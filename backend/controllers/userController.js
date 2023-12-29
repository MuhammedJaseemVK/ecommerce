const userModel = require("../models/user");
const { hashPassword, comparePassword, generateToken } = require("../helpers/userHelper");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
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

module.exports = {
    registerController,
    loginController,
    getUserInfoController,
    verifyEmailController
}