const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                res.json("Auth failed")
                return res.status(200).send({
                    message: "Auth Failed",
                    success: false,
                });
            } else {
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: "Auth Failed",
            success: false,
        });
    }
};