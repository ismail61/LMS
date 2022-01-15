
const Book = require('../../model/book')
function userBookController() {
    return {
        getAllBook: async (req, res) => {
            const books = await Book.find({ deleted: false }).sort({ createdAt: -1 }).exec()
            res.status(200).json(books)
        }
    }
}
module.exports = userBookController