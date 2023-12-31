const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, JWT_SECRET, (error, decode) => {
            if (error) {
                console.log(error);
                return res.status(200).send({ success: false, message: "Auth failed" });
            }
            else {
                req.body.userId = decode._id
                next();
            }
        })
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ success: false, message: "Auth failed" })
    }
}

module.exports = verifyUser;