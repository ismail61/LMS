const Order = require('../../../models/order')
module.exports = async (req, res) => {
    const data = await Order.find({ adminId: req.user._id, status: { $eq: 'returned' } }).countDocuments(1)
    res.status(200).json(data)
}