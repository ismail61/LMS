const Book = require('../../model/book'),
    bookValidator = require('../../validators/bookValidator'),
    cloudinary = require('cloudinary')
function bookController() {
    return {
        addBook: async (req, res) => {
            if (req.fileExtensionValidationError) res.json({ err: 'Only .png, .jpg and .jpeg format allowed!' })
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB')
            const { isbn, title, author, edition, quantity } = req.body
            const validator = await bookValidator(req.body)
            if (!validator.isValid) { res.json({ err: validator.error }) }
            const book = await Book.findOne({ isbn: isbn })
            if (book) return error().resourceError(res, 'ISBN must be unique.Please choose a different ISBN')
            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'lms/books', use_filename: true })
            if (!image_upload?.url) return error().resourceError(res, 'Image Saved Failed')
            const newBook = new Book({ isbn, title, author, edition, quantity, image: image_upload?.url, adminId: req.user._id })
            const data = await newBook.save()
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('bookAdded', data)
            res.json(data)
        },
        addBookShow: (req, res) => {
            res.json(req.user)
        },
        editBook: async (req, res) => {
            const { isbn, title, author, edition, quantity, image } = req.body
            const validator = await bookValidator(req.body)
            if (!validator.isValid) { res.json({ err: validator.error }) }
            if (req.fileExtensionValidationError) res.json({ err: 'Only .png, .jpg and .jpeg format allowed!' })
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB')
            let newImage;
            if (req.file) {
                /*const book = await Book.findOne({_id : req.params.id})
                const filename = book.image.substring(book.image.lastIndexOf('/')+1)
                const del = await cloudinary.v2.uploader.destroy(`lms/books/${filename}`)
                console.log(del) */
                const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'lms/books', use_filename: true })
                if (!image_upload?.url) return error().resourceError(res, 'Image Saved Failed')
                newImage = image_upload?.url
            }
            image ? newImage = image : newImage
            const book = await Book.findByIdAndUpdate(req.params.id, { title, author, edition, quantity, image: newImage }, { new: true })
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('bookUpdated', book)
            res.json(book)
        },
        getAllBook: async (req, res) => {
            const books = await Book.find({ adminId: req.user._id, deleted: false }).sort({ createdAt: -1 }).exec()
            res.json(books)
        },
        getSingleBook: async (req, res) => {
            const book = await Book.findOne({ _id: req.params.id, adminId: req.user._id, deleted: false }).sort({ createdAt: -1 }).exec()
            res.json(book)
        },
        getAllDeletedBook: async (req, res) => {
            const deletedBooks = await Book.find({ adminId: req.user._id, deleted: true }).sort({ createdAt: -1 }).exec()
            res.json(deletedBooks)
        },
        deleteBook: async (req, res) => {
            const book = await Book.findOneAndUpdate({ _id: req.params.id, adminId: req.user._id }, { deleted: true })
            //Event IO
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('bookDeleted', book)
            res.json({ message: "Deleted Successful", book })
        },
        restoreBook: async (req, res) => {
            const book = await Book.findOneAndUpdate({ _id: req.params.id, adminId: req.user._id }, { deleted: false })
            res.json({ message: "Restored Successful", book })
        }
    }
}
module.exports = bookController