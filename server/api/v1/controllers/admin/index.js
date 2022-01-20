const adminAccountController = require('./adminAccountController'),
    adminDashboardController = require('./adminDashboardController'),
    adminBookController = require('./adminBookController'),
    adminOrderController = require('./adminOrderController'),
    userControllerByAdmin = require('./userControllerByAdmin')
module.exports = {
    adminAccountController,
    adminDashboardController,
    adminBookController,
    adminOrderController,
    userControllerByAdmin
}