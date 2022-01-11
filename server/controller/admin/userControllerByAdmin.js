const User = require('../../model/user')
function userControllerByAdmin() {
    return {
        getAllUsers: async (req, res) => {
            const data = await User.find({ role: 'user' }, { name: 1, email: 1 }).sort({ createdAt: -1 }).exec()
            res.json(data)
        }
    }
}
module.exports = userControllerByAdmin