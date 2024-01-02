const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const verifySeller = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, JWT_SECRET,async (error, decode) => {
            if (error) {
                console.log(error);
                return res.status(200).send({ success: false, message: "Seller Auth failed" });
            }
            else {
                req.body.userId = decode._id
                const user = await userModel.findById(decode._id);
                if (!(user.role === "seller")) {
                    return res.status(200).send({ success: false, message: "not an Seller.Seller Auth failed" });
                }
                next();
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ success: false, message: "seller Auth failed" })
    }
}

module.exports = verifySeller