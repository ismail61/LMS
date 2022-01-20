
const getAllOrder = require('../../services/admin/orders/getAllOrder'),
    acceptOrder = require('../../services/admin/orders/acceptOrder'),
    rejectOrder = require('../../services/admin/orders/rejectOrder'),
    returnAssignDate = require('../../services/admin/orders/returnAssignDate'),
    finePaid = require('../../services/admin/orders/finePaid'),
    returnOrder = require('../../services/admin/orders/returnOrder')
function orderController() {
    return {
        getAllOrder: getAllOrder,
        /* getSingleOrder: async (req, res) => {
            const order = await Order.find({ _id: req.params.id, adminId: req.user._id }).populate([{ path: "userId" }]).sort({ createdAt: -1 }).exec()
            res.status(200).json(order);
        }, */
        acceptOrder: acceptOrder,
        rejectOrder: rejectOrder,
        returnAssignDate: returnAssignDate,
        returnOrder: returnOrder,
        finePaid: finePaid
    }
}
module.exports = orderController