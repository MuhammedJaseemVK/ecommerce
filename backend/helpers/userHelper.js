const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    }
    catch (error) {
        console.log(error);
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);

    }
    catch (error) {
        console.log(error);
    }
}

const generateToken = async (userId) => {
    try {
        const token = jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '2h' });
        return token
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
}