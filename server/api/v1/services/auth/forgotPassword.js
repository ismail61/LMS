const  emailValidator = require('../../validations/email.validator'),
    error = require('../../utils/error/error'),
    crypto = require('crypto'),
    { mailSend } = require('../../utils/emailTransport'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    //const { email, role } = req.query
    const TEN_MINUTES = 10 * 60 * 1000,
        { email, role } = req.body,
        url = req.get('origin'),
        RESET_PASSWORD_EXPIRE_DATE = TEN_MINUTES // 10 minutes
    const validator = await emailValidator(email)
    if (!validator.isValid) return error().resourceError(res, validator.error?.email, 422)

    const user = await User.findOne({ email: email, role: role })
    if (!user) return error().resourceError(res, 'This email address have no account', 401)

    const resetPasswordToken = await crypto.randomBytes(16).toString("hex")
    await User.findOneAndUpdate({ _id: user._id }, { resetPasswordToken, resetPasswordTokenDate: Date.now() + RESET_PASSWORD_EXPIRE_DATE }, { new: true }).exec()
    const urlWithToken = `${url}/reset-password?token=${resetPasswordToken}`

    const response = await mailSend(email, urlWithToken)
    if (!response) return error().resourceError(res, "Email Send Failed", 409);
    res.status(200).json(response)
    //res.json(`http://localhost:3000/reset-password?token=${resetPasswordToken}`)
}