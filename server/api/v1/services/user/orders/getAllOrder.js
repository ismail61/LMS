const Order = require("../../../models/order")
module.exports = async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }, { adminId: 0 }).populate([{ path: "bookId" }]).sort({ createdAt: -1 }).exec()
    res.status(200).json(orders);
}