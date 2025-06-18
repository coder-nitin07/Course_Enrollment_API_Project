const Joi = require('joi');

const qulificationSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().trim().regex(/^[a-zA-Z0-9 .,&()-]+$/).messages({
      'string.pattern.base': 'Qualification name can only contain letters, numbers, spaces, and common punctuation.',
    }),

    level: Joi.number().integer().min(1).max(100).required()
});

const qualificationValidation = (req, res, next)=>{
    const { error } = qulificationSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { qualificationValidation };