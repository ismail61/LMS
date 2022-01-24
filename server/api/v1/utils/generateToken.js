const jwt = require('jsonwebtoken')
const { jwtToken } = require('../../../config/config')
const token = (user, verifyTokenTracker) => {
    const ONE_DAY = '24h'
    return jwt.sign({
        _id: user._id,
        role: user.role,
        verifyToken: verifyTokenTracker
    }, jwt.key, {
        expiresIn: ONE_DAY
    })
}
module.exports = token