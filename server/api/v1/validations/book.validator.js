const Joi = require('joi');
const validateValue = ({ isbn, title, author, edition, quantity }) => {
    const joiSchema = Joi.object().keys({
        isbn: Joi.string().regex(new RegExp("^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$")).min(5).max(100).trim().required()
            .messages({
                "string.pattern.base": `Invalid ISBN! ISBN number should be 10 or 13 digits`,
                "string.empty": `ISBN cannot be an empty field`,
                "any.required": `ISBN is a required.`
            }),
        title: Joi.string().trim().required()
            .messages({
                "string.base": `Title should be a type of String`,
                "string.empty": `Title cannot be an empty field`,
                "any.required": `Title is a required.`
            }),
        author: Joi.string().trim().required()
            .messages({
                "string.base": `Author should be a type of String`,
                "string.empty": `Author cannot be an empty field`,
                "any.required": `Author is a required.`
            }),
        quantity: Joi.number().required()
            .messages({
                "number.base": `Quantity should be a type of Number`,
                "number.empty": `Quantity cannot be an empty field`,
                "any.required": `Quantity is a required.`
            }),
        edition: Joi.string().regex(/^1.th|(^|[^1])(1st|2nd|3rd|[^1-3]th)$/).required()
            .messages({
                "string.base": `Edition should be a type of Text`,
                "string.pattern.base": `Invalid Edition! `,
                "string.empty": `Edition cannot be an empty field`,
                "any.required": `Edition is a required.`
            })
    })
    const { value, error } = joiSchema.validate({ isbn, title, author, quantity, edition }, { escapeHtml: true })
    return { value, error }
}
module.exports = validateValue