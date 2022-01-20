const jwt = require('jsonwebtoken')
const token = (user,verifyTokenTracker) => {
    const ONE_DAY = '24h'
    return jwt.sign({
        _id: user._id,
        role: user.role,
        verifyToken : verifyTokenTracker
    }, process.env.TOKEN_KEY, {
        expiresIn: ONE_DAY
    })
}
module.exports = token