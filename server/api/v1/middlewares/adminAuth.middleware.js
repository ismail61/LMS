const jwt = require("jsonwebtoken"),
    User = require('../models/user'),
    error = require('../utils/error/error'),
    adminAuthentication = async (req, res, next) => {
        const token = req.header('Authorization') || req.cookies?.adminwebtoken || req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.json({ err: "Access-denied" });
        }
        try {
            const verify_token = await jwt.verify(token, process.env.TOKEN_KEY);
            const admin = await User.findOne({ _id: verify_token._id, token: verify_token.verifyToken, role: verify_token.role }).select('-password')
            if (!admin) return res.json({ err: "Invalid Token" });
            if(admin?.activated === false) return res.json({err : 'Your account has not been activated. Please contact Super Admin or Administrator'})
            req.user = verify_token;
        } catch (err) {console.log(err)
            return res.json({ err: "Invalid Token" });
        }
        return next();
    };

module.exports = adminAuthentication;