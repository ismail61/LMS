const User = require('../../model/user'),
    bcrypt = require('bcrypt'),
    passwordValidator = require('../../validators/passwordValidator')
function accountController() {
    return {
        getUserInformation: async (req, res) => {
            const data = await User.findOne({ _id: req.user._id }).select("-password").select("-token");
            res.json(data)
        },
        updateUserInformation: async (req, res) => {
            const data = await User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true })
            res.json(data)
        },
        changePassword: async (req, res) => {
            const { password, newPassword } = req.body
            const validator = await passwordValidator(newPassword)
            if (!validator.isValid) res.json({ err: validator.error.password })
            const user = await User.findOne({ _id: req.user._id })
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return error().resourceError(res, 'Invalid Password')
            const hashPassword = await bcrypt.hash(newPassword, 10)
            const data = await User.findOneAndUpdate({ _id: req.user._id }, { password: hashPassword }, { new: true })
            res.json(data)
        }
    }
}
module.exports = accountController