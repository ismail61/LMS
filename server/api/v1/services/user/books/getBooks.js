const Book = require('../../../models/book')
module.exports = async (req, res) => {
    const books = await Book.find({ deleted: false }).sort({ createdAt: -1 }).exec()
    res.status(200).json(books)
}