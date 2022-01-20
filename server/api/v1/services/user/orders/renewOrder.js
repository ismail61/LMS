const Order = require("../../../models/order"),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const order = await Order.findOneAndUpdate({ _id: req.params.id, returnDate: { $exists: true }, status: 'accepted', fine: { $eq: 0 } }, { returnDate: null }, { new: true })
    if (!order) return error().resourceError(res, "Sorry! You cannot renewed it.Please Reorder Now", 409);
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderRenewed', order)
    res.status(200).json(order);
}