const Order = require('../../../models/order'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const order = await Order.findOneAndUpdate({ _id: req.params?.id, status: { $nin: ['rejected', 'pending', 'accepted'] } }, { paid: true }, { new: true })
    if(!order) return error().resourceError(res, "Failed!", 409);
    //Event IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderPaid', order)
    res.status(200).json(order)
}