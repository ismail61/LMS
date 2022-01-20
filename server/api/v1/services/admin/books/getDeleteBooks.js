const Book = require('../../../models/book')
module.exports = async (req, res) => {
    const deletedBooks = await Book.find({ adminId: req.user._id, deleted: true }).sort({ createdAt: -1 }).exec()
    res.status(200).json(deletedBooks)
}