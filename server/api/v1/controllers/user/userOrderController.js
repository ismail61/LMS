const makeOrder = require('../../services/user/orders/makeOrder'),
    getAllOrder = require('../../services/user/orders/getAllOrder'),
    deleteOrder = require('../../services/user/orders/deleteOrder'),
    renewOrder = require('../../services/user/orders/renewOrder')
function orderController() {
    return {
        makeOrder: makeOrder,
        getAllOrder: getAllOrder,
        /* getSingleOrder: async (req, res) => {
            const orders = await Order.find({ _id: req.params.id, userId: req.user._id }, { adminId: 0 }).populate([{ path: "bookId" }]).sort({ createdAt: -1 }).exec()
            res.status(200).json(orders);
        }, */
        deleteOrder: deleteOrder,
        renewOrder: renewOrder,
    };
}
module.exports = orderController;
