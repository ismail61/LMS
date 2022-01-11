const jwt = require("jsonwebtoken"),
    User = require('../model/user'),
    authentication = async (req, res, next) => {
        const token = req.header('Authorization') || req.cookies?.userwebtoken || req.cookies?.adminwebtoken || req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return next();
        }
        else {
            try {
                const verify_token = await jwt.verify(token, process.env.TOKEN_KEY);
                const user = await User.findOne({ _id: verify_token._id, token: verify_token.verifyToken }).select('-password')
                if (!user) return res.json({ err: "Invalid Token" });
                req.user = verify_token;
            } catch (err) {
                console.log(err)
                return res.json({ err: "Something went wrong" });
            }
            return next();
        }
    };

module.exports = authentication;