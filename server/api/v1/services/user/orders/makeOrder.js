const Book = require("../../../models/book"),
Order = require("../../../models/order"),
error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const { bookId } = req.body;
    const book = await Book.findOne({ _id: bookId, quantity: { $gt: 0 } });
    if(!book) return error().resourceError(res, `Book Not Found.`, 404);

    const order = await new Order({ bookId: book._id, userId: req.user._id, adminId: book.adminId });
    const data = await order.save();
    //Event IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('orderPlaced', data)
    res.status(201).json(data);
}