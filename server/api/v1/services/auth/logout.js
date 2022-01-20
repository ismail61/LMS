const error = require('../../utils/error/error'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    if (req.user?.role === 'admin' || req.user?.role === 'user') {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: null }, { new: true }).exec();
        res.status(200).json({ role: req.user?.role, message: 'Successfully Logout' })
    } else { return error().resourceError(res, "You don't have enough permission to perform this action"), 403 }
}