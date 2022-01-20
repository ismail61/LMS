const Order = require("../../../models/order"),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const data = await Order.findOneAndUpdate({ _id: req.body?._id, status: { $nin: ['rejected', 'pending', 'returned'] } }, { fine: req.body.fine }, { new: true })
    if (!data) return error().resourceError(res, "Failed!", 409);
    res.status(200).json(data)
}