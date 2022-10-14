const Basejoi = require('joi')
const sanitizeHtml = require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const joi = Basejoi.extend(extension)

module.exports.bookValidation = (req, res, next) => {
    const schema = joi.object({
        bookId: joi.number().required(),
        title: joi.string().required().escapeHTML(),
        author: joi.string().required().escapeHTML(),
        descriptin: joi.string().escapeHTML(),
        language: joi.string().required().escapeHTML(),
        category: joi.string().required().escapeHTML(),
        qty: joi.number().required(),
        availability: joi.number(),
        status: joi.number(),
        img: joi.string()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json({
            message:'validation error',
            error: error.details[0].message
        });
    } else {
        next()
    }

}

module.exports.paperValidation = (req, res, next) => {
    const schema = joi.object({
        paperId: joi.number().required(),
        title: joi.string().required().escapeHTML(),
        grade: joi.number().required(),
        subject: joi.string().required().escapeHTML(),
        year: joi.number().required(),
        paperType: joi.string().required().escapeHTML(),
        language: joi.string().required().escapeHTML(),
        qty: joi.number().required(),
        status: joi.number().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json({
            error: error.details[0].message
        });
    } else {
        next()
    }

}

module.exports.userValidation = (req, res, next) => {
    const schema = joi.object({
        userId: joi.number().required(),
        email: joi.string().trim().email().required().escapeHTML(),
        password: joi.string().trim().min(4).required().escapeHTML(),
        userType: joi.string().required().escapeHTML(),
        name: joi.string().required().escapeHTML(),
        grade: joi.number(),
        class: joi.string().escapeHTML(),
        contactNo: joi.number().required(),
        subject: joi.string().escapeHTML(),
        status: joi.number().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json({
            error: error.details[0].message
        });
    } else {
        next()
    }

}

module.exports.pdfValidation = (req, res, next) => {
    const schema = joi.object({
        pdfId: joi.number().required(),
        title: joi.string().required().escapeHTML(),
        pdfCategory: joi.string().required().escapeHTML(),
        status: joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        res.status(400).json({
            error: error.details[0].message
        });
    } else {
        next()
    }

}