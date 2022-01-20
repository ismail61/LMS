const Order = require('../../../models/order')
module.exports = async (req, res) => {
    const orders = await Order.find({ adminId: req.user._id }).populate([{ path: 'userId' }]).populate([{ path: 'bookId' }]).sort({ createdAt: -1 }).exec()
    res.status(200).status(200).json(orders)
}