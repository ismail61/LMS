const Book = require('../../../models/book'),
    bookValidator = require('../../../validations/book.validator'),
    cloudinary = require('cloudinary'),
    npmValidator = require('validator'),
    error = require('../../../utils/error/error')
module.exports = async (req, res) => {
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
}