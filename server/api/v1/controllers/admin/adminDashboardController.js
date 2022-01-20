const getAllReturnedOrdersCount = require('../../services/admin/dashboard/getAllReturnedOrdersCount'),
    getTotalFine = require('../../services/admin/dashboard/getTotalFine'),
    getAllPendingOrdersCount = require('../../services/admin/dashboard/getAllPendingOrdersCount')
function dashboardController() {
    return {
        getAllPendingOrdersCount: getAllPendingOrdersCount,
        getAllReturnedOrdersCount: getAllReturnedOrdersCount,
        getTotalFine: getTotalFine
    }
}
module.exports = dashboardController