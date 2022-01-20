const generateToken = require('../../utils/generateToken'),
    fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)),
    error = require('../../utils/error/error'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    modelFactory = require('../../patterns/factory/modelFactory'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    const { accessToken, userID, role } = req.body
    let urlGraphFB = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
    const response = await fetch(urlGraphFB)
    const data = await response.json()
    if (!data || !role) return error().resourceError(res, 'Email Verification Failed', 401)
    const { email, name } = data
    const user = await User.findOne({ email, role })
    if (user) {
        const verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
            token = await generateToken(user, verifyTokenTracker)
        await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
        res.status(200).json({ token: token, role: user.role })
    } else {
        let password = email + 'password'
        const hashPassword = await bcrypt.hash(password, 10),
            newUser = modelFactory('user', { name, email, password: hashPassword, role }),
            newRegisteredUser = await newUser.save(),
            verifyTokenTracker = await crypto.randomBytes(8).toString("hex"),
            token = await generateToken(newRegisteredUser, verifyTokenTracker)
        await User.findByIdAndUpdate(newRegisteredUser._id, { token: verifyTokenTracker }, { new: true })
        res.status(200).json({ token: token, role: newRegisteredUser.role })
    }
}