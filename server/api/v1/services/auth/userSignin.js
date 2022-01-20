const loginValidator = require('../../validations/login.validator'),
    error = require('../../utils/error/error'),
    bcrypt = require('bcrypt'),
    generateToken = require('../../utils/generateToken'),
    crypto = require('crypto'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    const { email, password, role } = req.body
    const validator = await loginValidator(email, password, role)
    if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)

    const user = await User.findOne({ email, role })
    if (!user) return error().resourceError(res, 'Invalid Credentials', 401)

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials', 401)

    if (user.role === 'admin' && user?.activated === false) return error().resourceError(res, 'Your account has not been activated. Please contact Super Admin or Administrator', 401)

    const verifyTokenTracker = await crypto.randomBytes(8).toString("hex")
    const token = await generateToken(user, verifyTokenTracker)

    await User.findByIdAndUpdate(user._id, { token: verifyTokenTracker }, { new: true })
    res.status(200).json({ token: token, role: user.role })
}