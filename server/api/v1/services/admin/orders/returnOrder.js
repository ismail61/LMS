const Order = require('../../../models/order'),
    Book = require('../../../models/book')
module.exports = async (req, res) => {
    const order = await Order.findOneAndUpdate({ _id: req.params?.id, status: { $nin: ['rejected', 'pending'] } }, { status: 'returned' }, { new: true })
    await Book.findOneAndUpdate({ _id: order.bookId }, { $inc: { quantity: 1 } })
    //Event IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderReturned', order)
    res.status(200).json(order)
}