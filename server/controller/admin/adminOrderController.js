
const Order = require('../../model/order'),
    Book = require('../../model/book')
function orderController() {
    return {
        getAllOrder: async (req, res) => {
            const orders = await Order.find({ adminId: req.user._id }).populate([{ path: 'userId' }]).populate([{ path: 'bookId' }]).sort({ createdAt: -1 }).exec()
            res.status(200).json(orders)
        },
        getSingleOrder: async (req, res) => {
            const order = await Order.find({ _id: req.params.id, adminId: req.user._id }).populate([{ path: "userId" }]).sort({ createdAt: -1 }).exec()
            res.json(order);
        },
        acceptOrder: async (req, res) => {
            const order = await Order.find({ adminId: req.user._id, _id: req.params.id })
            if (!order[0]) return error().resourceError(res, "This order has been deleted")
            if (order[0].status !== 'pending') return error().resourceError(res, `Already ${order[0].status} stage.So you can not able to update order-status.`)
            const updateOrder = await Order.findOneAndUpdate({ adminId: req.user._id, _id: req.params.id }, { status: 'accepted' }, { new: true }).exec();
            const book = await Book.findOneAndUpdate({ _id: updateOrder.bookId }, { $inc: { quantity: -1 } })
            //Event Emit for Socket IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderUpdated', { _id: updateOrder._id, status: 'accepted' })
            res.status(200).json(updateOrder)
        },
        rejectOrder: async (req, res) => {
            const order = await Order.find({ adminId: req.user._id, _id: req.params.id })
            if (!order[0]) return error().resourceError(res, "This order has been deleted")
            if (order[0].status !== 'pending') return error().resourceError(res, `Already ${order[0].status} mode.So you can not able to update order-status.`)
            const updateOrder = await Order.findOneAndUpdate({ adminId: req.user._id, _id: req.params.id }, { status: 'rejected' }, { new: true }).exec();
            //Event Emit for Socket IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderUpdated', { _id: updateOrder._id, status: 'rejected' })
            res.status(200).json(updateOrder)
        },
        returnAssignDate: async (req, res) => {
            const data = await Order.findOneAndUpdate({ _id: req.params?.id, status: { $nin: ['rejected', 'pending', 'returned'] } }, { returnDate: req.body.date }, { new: true })
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderReturnedDateAssign', data)
            res.json(data)
        },
        returnOrder: async (req, res) => {
            const data = await Order.findOneAndUpdate({ _id: req.params?.id, status: { $nin: ['rejected', 'pending'] } }, { status: 'returned' }, { new: true })
            await Book.findOneAndUpdate({ _id: data.bookId }, { $inc: { quantity: 1 } })
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderReturned', data)
            res.json(data)
        },
        finePaid: async (req, res) => {
            const data = await Order.findOneAndUpdate({ _id: req.params?.id, status: { $nin: ['rejected', 'pending', 'accepted'] } }, { paid: true }, { new: true })
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderPaid', data)
            res.json(data)
        }
    }
}
module.exports = orderController