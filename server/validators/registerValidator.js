const Joi = require('joi')


const validateValue = ({ name, email, password, role }) => {
    const joiSchema = Joi.object().keys({
        name: Joi.string().trim().required()
            .messages({
                "string.base": `Name should be a type of String`,
                "string.empty": `Name cannot be an empty field`,
                "any.required": `Name is a required.`
            }),
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"]`
            }),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).min(6).required()
            .messages({
                "string.base": `Password should be a type of Text`,
                "string.pattern.base": `Password must be minimum 6 Characters and one letter and one number! `,
                "string.empty": `Password cannot be an empty field`,
                "any.required": `Password is a required.`,
            }),
        role: Joi.string().required().valid('user','admin')
            .messages({
                "any.required": `Authentication Required.`,
                "any.only" : "Role must be user or admin"
            })
    })
    const { value, error } = joiSchema.validate({ name, email, password, role }, { escapeHtml: true })
    return { value, error }
}

module.exports = validateValue