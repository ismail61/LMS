const validator = require('validator')

const validateValue = (email, password,role) => {
    error = {}
    if (!email) {
        error.email = 'Invalid Credentials'
    } else if (!validator.isEmail(email)) {
        error.email = 'Invalid Credentials'
    }
    if (!password) {
        error.password = 'Invalid Credentials'
    }
    else if (password.length < 6) {
        error.password = 'Invalid Credentials'
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
        error.password = 'Invalid Credentials'
    }
    if (!role) {
        error.role = 'Invalid Credentials'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validateValue