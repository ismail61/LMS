const Order = require("../../../models/order"),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const order = await Order.find({ _id: req.params.id, userId: req.user._id, });
    if (!order[0]) return error().resourceError(res, "This order has been deleted", 404);
    if (order[0].status !== "pending") return error().resourceError(res, `Already ${order[0].status} stage.So you can not able to delete this order.`, 409);
    const data = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id, })
    if (!data) return error().resourceError(res, "Updated failed", 404);
    //Event IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderDeleted', data)
    res.status(200).json({ message: "Deleted Successful", data });
}