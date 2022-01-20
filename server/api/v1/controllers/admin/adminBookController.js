const addBook = require('../../services/admin/books/addBook'),
    editBook = require('../../services/admin/books/editBook'),
    getAllBooks = require('../../services/admin/books/getBooks'),
    getAllDeletedBook = require('../../services/admin/books/getDeleteBooks'),
    temporaryDeleteBook = require('../../services/admin/books/temporaryDeleteBook'),
    permanentDeleteBook = require('../../services/admin/books/permanentDeleteBook'),
    restoreBook = require('../../services/admin/books/restoreBook')
function bookController() {
    return {
        addBook: addBook,
        addBookShow: (req, res) => { res.status(200).json(req.user) },
        editBook: editBook,
        getAllBook: getAllBooks,
        getAllDeletedBook: getAllDeletedBook,
        temporaryDeleteBook: temporaryDeleteBook,
        permanentDeleteBook: permanentDeleteBook,
        restoreBook: restoreBook
    }
}
module.exports = bookController