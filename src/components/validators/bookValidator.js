
function bookValidateValue({ isbn, title, author, edition }) {
    let error = ""
    const regexISBN = new RegExp("^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$")
    if (!isbn) {
        error = "Please Provide book's ISBN"
    }
    if (!regexISBN.test(isbn)) {
        error = "Invalid ISBN!"
    }
    if(isbn?.trim().length !== 13 && isbn?.trim().length !== 10){
        error = "ISBN number should be 10 or 13 digits"
    }
    if (!title) {
        error = "Please Provide book's Title"
    }
    if (!author) {
        error = "Please Provide book's Author"
    }
    if (!edition) {
        error = "Please Provide book's edition"
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

export {bookValidateValue}