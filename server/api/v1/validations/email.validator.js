const validator = require('validator')

const validateValue = (email) => {
    error = {}
    if (!email) {
        error.email = 'Please Provide your Email'
    } else if (!validator.isEmail(email)) {
        error.email = 'Please Provide your Correct Email'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validateValue