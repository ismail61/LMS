const validator = require('validator')

const validateValue = (password) => {
    error = {}
    if (!password) {
        error.password = 'Please Provide your new Password'
    } else if (password.length < 6) {
        error.password = 'Password must be greater than 6 characters'
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
        error.password = 'Password must be minimum 6 Characters and one letter and one number'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validateValue