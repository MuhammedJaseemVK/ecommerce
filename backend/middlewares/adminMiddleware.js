const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, JWT_SECRET,async (error, decode) => {
            if (error) {
                console.log(error);
                return res.status(200).send({ success: false, message: "Admin Auth failed" });
            }
            else {
                req.body.userId = decode._id
                const user = await userModel.findById(decode._id);
                if (!(user.role === "admin")) {
                    return res.status(200).send({ success: false, message: "not an admin.Admin Auth failed" });
                }
                next();
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ success: false, message: "Admin Auth failed" })
    }
}

module.exports = verifyAdmin