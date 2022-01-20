const User = require('../../../models/user'),
    passwordValidator = require('../../../validations/password.validator'),
    error = require('../../../utils/error/error'),
    bcrypt = require('bcrypt')
module.exports = async (req, res) => {
    const { password, newPassword } = req.body
    const validator = await passwordValidator(newPassword)
    if (!validator.isValid) return error().resourceError(res, validator.error?.password, 422)
    const user = await User.findOne({ _id: req.user._id })
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return error().resourceError(res, 'Invalid Password', 401)
    const hashPassword = await bcrypt.hash(newPassword, 10)
    const data = await User.findOneAndUpdate({ _id: req.user._id }, { password: hashPassword }, { new: true })
    if (!data) return error().resourceError(res, "Updated Failed", 409);
    res.status(200).json(data)
}