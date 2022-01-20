const Order = require('../../../models/order'),
    Book = require('../../../models/book'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const order = await Order.find({ adminId: req.user._id, _id: req.params.id })
    if (!order[0]) return error().resourceError(res, "This order has been deleted", 404)
    if (order[0].status !== 'pending') return error().resourceError(res, `Already ${order[0].status} stage.So you can not able to update order-status.`, 409)
    const updateOrder = await Order.findOneAndUpdate({ adminId: req.user._id, _id: req.params.id }, { status: 'accepted' }, { new: true }).exec();
    await Book.findOneAndUpdate({ _id: updateOrder.bookId }, { $inc: { quantity: -1 }, ordered: true })
    //Event Emit for Socket IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderUpdated', { _id: updateOrder._id, status: 'accepted' })
    res.status(200).json(updateOrder)
}