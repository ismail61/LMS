const Order = require('../../../models/order'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const data = await Order.findOneAndUpdate({ _id: req.params?.id, status: { $nin: ['rejected', 'pending', 'returned'] } }, { returnDate: req.body.date }, { new: true })
    if(!data) return error().resourceError(res, "Date Assigned Failed", 409);
    //Event IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderReturnedDateAssign', data)
    res.status(200).json(data)
}