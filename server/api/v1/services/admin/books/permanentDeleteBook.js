const Book = require('../../../models/book'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const book = await Book.findOneAndDelete({ _id: req.params.id, adminId: req.user._id, ordered: false })
    if (!book) return error().resourceError(res, "Deleted Failed", 409);
    res.status(200).json({ message: "Deleted Successful", book })
}