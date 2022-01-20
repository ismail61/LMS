const Joi = require('joi')

const validateValue = (email, password, role) => {
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": "Please enter Correct Email"
            }),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).min(6).required()
            .messages({
                "string.base": `Invalid Credentials`,
                "string.pattern.base": `Invalid Credentials`,
                "string.empty": `Invalid Credentials`,
                "any.required": `Invalid Credentials.`,
            }),
        role: Joi.string().required().valid('user', 'admin')
            .messages({
                "any.required": `Authentication Required.`,
                "any.only": "Role must be user or admin"
            })
    })
    const { value, error } = joiSchema.validate({ email, password, role }, { escapeHtml: true })
    return { value, error }
}

module.exports = validateValue