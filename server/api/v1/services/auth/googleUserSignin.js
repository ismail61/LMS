const generateToken = require('../../utils/generateToken'),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.BACKEND_GOOGLE_CLIENT_ID),
    error = require('../../utils/error/error'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    modelFactory = require('../../patterns/factory/modelFactory'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    const { tokenId, role } = req.body
    const response = await client.verifyIdToken({ idToken: tokenId, audience: process.env.BACKEND_GOOGLE_CLIENT_ID }),
        { email_verified, name, email } = response.payload
    if (!email_verified || !role) return error().resourceError(res, 'Email Verification Failed', 401)
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