const validator = require('validator')

const validateValue = ({ isbn, title, author, edition, quantity }) => {
    error = {}
    const regexISBN = new RegExp("^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$")
    if (!isbn) {
        error.isbn = "Please Provide book's ISBN"
    }
    if (!regexISBN.test(isbn)) {
        error.isbn = "Invalid ISBN! ISBN number should be 10 or 13 digits"
    }
    if (!title) {
        error.title = "Please Provide book's Title"
    }
    if (!author) {
        error.author = "Please Provide book's Author"
    }
    if (!quantity) {
        error.edition = "Please Provide book's Quantity"
    }
    if (!edition) {
        error.edition = "Please Provide book's edition"
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validateValue