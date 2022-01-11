const Book = require("../../model/book"),
    Order = require("../../model/order")
function orderController() {
    return {
        makeOrder: async (req, res) => {
            const { bookId } = req.body;
            const book = await Book.findOne({ _id: bookId, quantity: { $gt: 0 } });
            const order = await new Order({ bookId: book._id, userId: req.user._id, adminId: book.adminId });
            const data = await order.save();
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderPlaced', data)
            res.json(data);
        },
        getAllOrder: async (req, res) => {
            const orders = await Order.find({ userId: req.user._id }, { adminId: 0 }).populate([{ path: "bookId" }]).sort({ createdAt: -1 }).exec()
            res.status(200).json(orders);
        },
        getSingleOrder: async (req, res) => {
            const orders = await Order.find({ _id: req.params.id, userId: req.user._id }, { adminId: 0 }).populate([{ path: "bookId" }]).sort({ createdAt: -1 }).exec()
            res.status(200).json(orders);
        },
        deleteOrder: async (req, res) => {
            const order = await Order.find({ _id: req.params.id, userId: req.user._id, });
            if (!order[0]) return error().resourceError(res, "This order has been deleted");
            if (order[0].status !== "pending") return error().resourceError(res, `Already ${order[0].status} stage.So you can not able to delete this order.`);
            const data = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id, })
            if (!data) return res.status(400).json({ err: "Noting Found" });
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderDeleted', data)
            res.status(200).json({ message: "Deleted Successful", data });
        },
        renewOrder: async (req, res) => {
            const order = await Order.findOneAndUpdate({ _id: req.params.id, returnDate: { $exists: true }, status: 'accepted', fine: { $eq: 0 } }, { returnDate: null }, { new: true })
            if (!order) return error().resourceError(res, "Sorry! You cannot renewed it.Please Reorder Now");
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderRenewed', order)
            res.json(order);
        },
    };
}
module.exports = orderController;
