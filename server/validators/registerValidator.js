const validator = require('validator')

const validateValue = ({ name, email, password ,role}) => {
    error = {}
    if (!name) {
        error.name = 'Please Provide your Name'
    }
    if (!email) {
        error.email = 'Please Provide your Email'
    } else if (!validator.isEmail(email)) {
        error.email = 'Please Provide your Correct Email'
    }
    if (!password) {
        error.password = 'Please Provide your Password'
    } else if (password.length < 6) {
        error.password = 'Password must be greater than 6 characters'
    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
        error.password = 'Password must be minimum 6 Characters and one letter and one number'
    }
    if (!role) {
        error.role = 'Authentication Required'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validateValue