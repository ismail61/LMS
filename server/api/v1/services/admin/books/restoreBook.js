const Book = require('../../../models/book'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const book = await Book.findOneAndUpdate({ _id: req.params.id, adminId: req.user._id }, { deleted: false })
    if (!book) return error().resourceError(res, "Restored Failed", 409);
    res.status(200).json({ message: "Restored Successful", book })
}