const registerValidator = require('../../validations/register.validator'),
    error = require('../../utils/error/error'),
    bcrypt = require('bcrypt'),
    modelFactory = require('../../patterns/factory/modelFactory'),
    npmValidator = require('validator'),
    User = require('../../models/user')
module.exports = async (req, res) => {
    const { name, email, password, role } = req.body
    const validator = await registerValidator(req.body)
    if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)

    const user = await User.findOne({ email: email, role: role });
    if (user) return error().resourceError(res, 'Email already exists. Please choose a different Email', 409)

    const hashPassword = await bcrypt.hash(password, 10)
    let newUser
    if (role === 'admin') newUser = modelFactory('user', { name: npmValidator.escape(name), email: npmValidator.escape(email?.toLowerCase()), password: hashPassword, role, activated: false })
    else newUser = modelFactory('user', { name: npmValidator.escape(name), email: npmValidator.escape(email?.toLowerCase()), password: hashPassword, role })

     const data = await newUser.save()
     res.status(201).json(data)
}