const Book = require('../../model/book'),
    bookValidator = require('../../validators/bookValidator'),
    cloudinary = require('cloudinary'),
    error = require('../../error/error'),
    npmValidator = require('validator')
function bookController() {
    return {
        addBook: async (req, res) => {
            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415)
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409)
            const { isbn, title, author, edition, quantity } = req.body
            const validator = await bookValidator(req.body)
            if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)
            const book = await Book.findOne({ isbn: isbn })
            if (book) return error().resourceError(res, 'ISBN must be unique.Please choose a different ISBN', 409)
            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'lms/books', use_filename: true })
            if (!image_upload?.url) return error().resourceError(res, 'Image Saved Failed', 500)
            const newBook = new Book({ isbn: npmValidator.escape(isbn), title: npmValidator.escape(title), author: npmValidator.escape(author), edition: npmValidator.escape(edition), quantity: npmValidator.escape(quantity), image: image_upload?.url, adminId: req.user._id })
            const data = await newBook.save()
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('bookAdded', data)
            res.status(200).json(data)
        },
        addBookShow: (req, res) => {
            res.status(200).json(req.user)
        },
        editBook: async (req, res) => {
            const { isbn, title, author, edition, quantity, image } = req.body
            const validator = await bookValidator(req.body)
            if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)
            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415)
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409)
            let newImage;
            if (req.file) {
                /*const book = await Book.findOne({_id : req.params.id})
                const filename = book.image.substring(book.image.lastIndexOf('/')+1)
                const del = await cloudinary.v2.uploader.destroy(`lms/books/${filename}`)
                console.log(del) */
                const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'lms/books', use_filename: true })
                if (!image_upload?.url) return error().resourceError(res, 'Image Saved Failed', 500)
                newImage = image_upload?.url
            }
            image ? newImage = image : newImage
            const book = await Book.findByIdAndUpdate(req.params.id, { isbn: npmValidator.escape(isbn), title: npmValidator.escape(title), author: npmValidator.escape(author), edition: npmValidator.escape(edition), quantity: npmValidator.escape(quantity), image: newImage }, { new: true })
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('bookUpdated', book)
            res.status(200).json(book)
        },
        getAllBook: async (req, res) => {
            const books = await Book.find({ adminId: req.user._id, deleted: false }).sort({ createdAt: -1 }).exec()
            res.status(200).json(books)
        },
        getSingleBook: async (req, res) => {
            const book = await Book.findOne({ _id: req.params.id, adminId: req.user._id, deleted: false }).sort({ createdAt: -1 }).exec()
            res.status(200).json(book)
        },
        getAllDeletedBook: async (req, res) => {
            const deletedBooks = await Book.find({ adminId: req.user._id, deleted: true }).sort({ createdAt: -1 }).exec()
            res.status(200).json(deletedBooks)
        },
        temporaryDeleteBook: async (req, res) => {
            const book = await Book.findOneAndUpdate({ _id: req.params.id, adminId: req.user._id }, { deleted: true })
            if (!book) return error().resourceError(res, "Deleted Failed", 409);
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('bookDeleted', book)
            res.status(200).json({ message: "Deleted Successful", book })
        },
        permanentDeleteBook: async (req, res) => {
            const book = await Book.findOneAndDelete({ _id: req.params.id, adminId: req.user._id, ordered: false })
            if (!book) return error().resourceError(res, "Deleted Failed", 409);
            res.status(200).json({ message: "Deleted Successful", book })
        },
        restoreBook: async (req, res) => {
            const book = await Book.findOneAndUpdate({ _id: req.params.id, adminId: req.user._id }, { deleted: false })
            if (!book) return error().resourceError(res, "Restored Failed", 409);
            res.status(200).json({ message: "Restored Successful", book })
        }
    }
}
module.exports = bookController