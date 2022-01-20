const findTotalFine = require('../../services/user/fine/findTotalFine'),
    addFine = require('../../services/user/fine/addFine')
function fineController() {
    return {
        addFineAUser: addFine,
        findTotalFineAUser: findTotalFine
    }
}
module.exports = fineController