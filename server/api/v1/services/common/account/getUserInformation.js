const User = require('../../../models/user')
module.exports = async (req, res) => {
    const data = await User.findOne({ _id: req.user._id }).select("-password").select("-token");
    res.status(200).json(data)
}