const Book = require('../../../models/book'),
error = require('../../../utils/error/error')
module.exports = async (req, res) => {
    const book = await Book.findOneAndUpdate({ _id: req.params.id, adminId: req.user._id }, { deleted: true })
    if (!book) return error().resourceError(res, "Deleted Failed", 409);
    //Event IO
    const eventEmitter = req.app.get('eventEmitter')
    eventEmitter.emit('bookDeleted', book)
    res.status(200).json({ message: "Deleted Successful", book })
}