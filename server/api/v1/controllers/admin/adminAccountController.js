const adminInfo = require('../../services/common/account/getUserInformation'),
    updateAdminInfo = require('../../services/common/account/updateUserInformation'),
    changePassword = require('../../services/common/account/changeUserPassword')
function accountController() {
    return {
        getAdminInformation: adminInfo,
        updateAdminInformation: updateAdminInfo,
        changePassword: changePassword
    }
}
module.exports = accountController