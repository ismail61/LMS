const Book = require('../../../models/book')
module.exports = async (req, res) => {
    const books = await Book.find({ adminId: req.user._id, deleted: false }).sort({ createdAt: -1 }).exec()
    res.status(200).json(books)
}