const userInfo = require('../../services/common/account/getUserInformation'),
    updateUserInfo = require('../../services/common/account/updateUserInformation'),
    changePassword = require('../../services/common/account/changeUserPassword')
function accountController() {
    return {
        getUserInformation: userInfo,
        updateUserInformation: updateUserInfo,
        changePassword: changePassword
    }
}
module.exports = accountController