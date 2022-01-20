const error = require('../../utils/error/error'),
    bcrypt = require('bcrypt'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    //if (req.user) return error().resourceError(res, 'You are already Logged In', 409)
    const { password, resetPasswordToken } = req.body
    if (resetPasswordToken?.length != 32) return error().resourceError(res, 'Invalid Token', 401)
    const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordTokenDate: { $gt: Date.now() } })

    if (!user) return error().resourceError(res, 'Reset Token has been expired.', 401)
    const hashPassword = await bcrypt.hash(password, 10)

    const data = await User.findOneAndUpdate({ _id: user._id }, { password: hashPassword, resetPasswordToken: null, resetPasswordTokenDate: null, token: null }, { new: true }).exec()
    if (!data) return error().resourceError(res, "Password Reset Failed", 409);
    res.status(200).json({ role: data.role })
}