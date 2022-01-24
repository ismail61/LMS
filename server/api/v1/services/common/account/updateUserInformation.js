const User = require('../../../models/user'),
    error = require('../../../utils/error/error'),
    npmValidator = require('validator')
module.exports = async (req, res) => {
    const { name, description } = req.body
    const data = await User.findOneAndUpdate({ _id: req.user._id }, { name: npmValidator.escape(name), description: description ? npmValidator.escape(description) : description }, { new: true })
    if (!data) return error().resourceError(res, "Updated Failed", 409);
    res.status(200).json(data)
}