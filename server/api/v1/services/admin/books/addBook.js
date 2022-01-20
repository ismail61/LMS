const Book = require('../../../models/book'),
    bookValidator = require('../../../validations/book.validator'),
    cloudinary = require('cloudinary'),
    npmValidator = require('validator'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
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
}