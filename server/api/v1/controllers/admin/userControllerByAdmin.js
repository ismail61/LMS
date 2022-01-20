const User = require('../../models/user')
function userControllerByAdmin() {
    return {
        getAllUsers: async (req, res) => {
            const data = await User.find({ role: 'user' }, { name: 1, email: 1 }).sort({ createdAt: -1 }).exec()
            res.status(200).json(data)
        }
    }
}
module.exports = userControllerByAdmin